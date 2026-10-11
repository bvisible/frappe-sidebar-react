//// Neoffice — added file (no upstream equivalent): the tests of src/refusedPolls.ts (maintenance#1424).
// A page left open after its session ended polled the server every minute, for ever, and was refused every time
// (seen on the hub, 11.10: four 403 a minute from one desk). A refusal now stops that poll until the page is reloaded.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { RefusedPolls, guardedGet, isRefusal, pollKey, refusedPolls } from '../src/refusedPolls.ts'

// A fetch that answers from a list, one answer per call, and remembers what it was asked.
function answers(...statuses: (number | Error)[]) {
    const asked: string[] = []
    const doFetch = async (url: string) => {
        asked.push(url)
        const next = statuses.shift()
        if (next instanceof Error) throw next
        const status = next ?? 200
        return { ok: status >= 200 && status < 300, status, json: async () => ({ message: { answered: status } }) }
    }
    return { asked, doFetch }
}

test('a 401 and a 403 are refusals, a server error and a success are not', () => {
    assert.equal(isRefusal(401), true)
    assert.equal(isRefusal(403), true)
    for (const status of [200, 204, 404, 429, 500, 502, 503]) assert.equal(isRefusal(status), false, `${status}`)
})

test('get_list asks about a doctype: two doctypes are two polls, other methods are told by their name', () => {
    assert.notEqual(
        pollKey('frappe.client.get_list', { doctype: 'Event' }),
        pollKey('frappe.client.get_list', { doctype: 'Reminder' }),
    )
    assert.equal(pollKey('raven.api.raven_message.get_unread_count_for_channels'), 'raven.api.raven_message.get_unread_count_for_channels')
    assert.equal(pollKey('x.y', { limit: '20' }), 'x.y')
})

test('a poll that is answered gives its message, and is asked again the next minute', async () => {
    const ledger = new RefusedPolls()
    const { asked, doFetch } = answers(200, 200)
    assert.deepEqual(await guardedGet(ledger, 'm.one', undefined, doFetch), { answered: 200 })
    assert.deepEqual(await guardedGet(ledger, 'm.one', undefined, doFetch), { answered: 200 })
    assert.equal(asked.length, 2)
})

for (const status of [403, 401]) {
    test(`a ${status} stops that poll: it is not asked again, and gives nothing`, async () => {
        const ledger = new RefusedPolls()
        const { asked, doFetch } = answers(status, 200, 200)
        assert.equal(await guardedGet(ledger, 'm.one', undefined, doFetch), null)
        for (let minute = 0; minute < 5; minute++) assert.equal(await guardedGet(ledger, 'm.one', undefined, doFetch), null)
        assert.equal(asked.length, 1, 'one request, then silence')
    })
}

test('a refusal stops the poll it answers and no other', async () => {
    const ledger = new RefusedPolls()
    const { asked, doFetch } = answers(403, 200, 200)
    const events = { doctype: 'Event' }
    const reminders = { doctype: 'Reminder' }
    assert.equal(await guardedGet(ledger, 'frappe.client.get_list', events, doFetch), null) // refused
    assert.deepEqual(await guardedGet(ledger, 'frappe.client.get_list', reminders, doFetch), { answered: 200 }) // not
    assert.equal(await guardedGet(ledger, 'frappe.client.get_list', events, doFetch), null) // still stopped, without a request
    assert.equal(asked.length, 2)
})

test('a server error or a lost network does not stop a poll: the next minute has its chance', async () => {
    const ledger = new RefusedPolls()
    const { asked, doFetch } = answers(500, new TypeError('network down'), 502, 200)
    assert.equal(await guardedGet(ledger, 'm.one', undefined, doFetch), null)
    assert.equal(await guardedGet(ledger, 'm.one', undefined, doFetch), null)
    assert.equal(await guardedGet(ledger, 'm.one', undefined, doFetch), null)
    assert.deepEqual(await guardedGet(ledger, 'm.one', undefined, doFetch), { answered: 200 })
    assert.equal(asked.length, 4)
})

test('the parameters go into the address', async () => {
    const { asked, doFetch } = answers(200)
    await guardedGet(new RefusedPolls(), 'm.one', { doctype: 'Event', limit: '20' }, doFetch)
    assert.equal(asked[0], '/api/method/m.one?doctype=Event&limit=20')
})

test('the cockpit asks through the guard, in both places that poll', () => {
    const panels = readFileSync(new URL('../src/SpaPanels.tsx', import.meta.url), 'utf8')
    const cockpit = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
    // ok(regex.test()) and not assert.match(): a failure of the latter prints the whole source file
    assert.ok(/import \{[^}]*guardedGet[^}]*\} from '\.\/refusedPolls'/.test(panels), 'SpaPanels imports guardedGet')
    assert.ok(/guardedGet</.test(panels), 'api() reads through the guard')
    assert.ok(/import \{[^}]*refusedPolls[^}]*\} from '\.\/refusedPolls'/.test(cockpit), 'NeoCockpit imports the ledger')
    assert.ok(/refusedPolls\.allows\(/.test(cockpit), 'the space counts ask the ledger before they fetch')
    assert.ok(/refusedPolls\.refuse\(/.test(cockpit), 'and tell it when they are refused')
})

test('one ledger is shared by the whole page', () => {
    assert.ok(refusedPolls instanceof RefusedPolls)
})
