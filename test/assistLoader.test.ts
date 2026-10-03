//// Neoffice — added file (no upstream equivalent): the tests of src/assistLoader.ts (remote assistance away from the desk).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { assistScript, loadAssist } from '../src/assistLoader.ts'

const SCRIPT = '/assets/neoffice_theme/js/assist_client.js?v=4'

function fakeWindow(boot?: object, loaded?: object) {
    const appended: { src: string; onload: null | (() => void); onerror: null | (() => void) }[] = []
    const win = {
        frappe: boot === undefined ? undefined : { boot },
        neo_assist: loaded,
        document: {
            createElement: () => ({ src: '', onload: null, onerror: null }),
            head: { appendChild: (element: (typeof appended)[number]) => { appended.push(element) } },
        },
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { win: win as any, appended }
}

test('nothing is loaded where remote assistance is not set up', async () => {
    for (const boot of [undefined, {}, { neo_assist: { enabled: false, script: SCRIPT } }]) {
        const { win, appended } = fakeWindow(boot)
        assert.equal(await loadAssist(win), null)
        assert.equal(appended.length, 0)
    }
})

test("only the theme's own client is ever loaded", () => {
    const refused = [
        'https://elsewhere.example/assist_client.js',
        '//elsewhere.example/assets/neoffice_theme/js/assist_client.js',
        '/assets/other_app/js/assist_client.js',
        '/assets/neoffice_theme/js/assist_client.js?v=4"><script>',
        '',
    ]
    for (const script of refused) {
        const { win } = fakeWindow({ neo_assist: { enabled: true, script } })
        assert.equal(assistScript(win), null, script)
    }
    const { win } = fakeWindow({ neo_assist: { enabled: true, script: SCRIPT } })
    assert.equal(assistScript(win), SCRIPT)
})

test('the client is loaded once, and what it registers is handed back', async () => {
    const { win, appended } = fakeWindow({ neo_assist: { enabled: true, script: SCRIPT } })
    const first = loadAssist(win)
    const second = loadAssist(win)
    assert.equal(appended.length, 1)
    assert.equal(appended[0].src, SCRIPT)
    win.neo_assist = { render_help_entry: () => () => {} }
    appended[0].onload?.()
    assert.equal(await first, win.neo_assist)
    assert.equal(await second, win.neo_assist)
})

test('a client already there, as on the desk, is used as it is', async () => {
    const assist = { render_help_entry: () => () => {} }
    const { win, appended } = fakeWindow({ neo_assist: { enabled: true, script: SCRIPT } }, assist)
    assert.equal(await loadAssist(win), assist)
    assert.equal(appended.length, 0)
})

test('a client that failed to load is tried again the next time', async () => {
    const { win, appended } = fakeWindow({ neo_assist: { enabled: true, script: SCRIPT } })
    const first = loadAssist(win)
    appended[0].onerror?.()
    assert.equal(await first, null)
    void loadAssist(win)
    assert.equal(appended.length, 2)
})

// 03.10: Raven and mint build a curated boot without the boot hooks: it says nothing of remote assistance.
test('a surface whose boot says nothing asks the theme, once', async () => {
    const calls: string[] = []
    const { win, appended } = fakeWindow({})
    win.fetch = async (url: string) => {
        calls.push(url)
        return { ok: true, json: async () => ({ message: { enabled: true, script: SCRIPT } }) }
    }
    const first = loadAssist(win)
    const second = loadAssist(win)
    await new Promise((resolve) => setTimeout(resolve, 0))
    assert.deepEqual(calls, ['/api/method/neoffice_theme.assist.client_config'])
    assert.equal(appended.length, 1)
    assert.equal(appended[0].src, SCRIPT)
    win.neo_assist = { render_help_entry: () => () => {} }
    appended[0].onload?.()
    assert.equal(await first, win.neo_assist)
    assert.equal(await second, win.neo_assist)
})

test('when the theme says nothing either, nothing is loaded and it is not asked again', async () => {
    const calls: string[] = []
    const { win, appended } = fakeWindow(undefined)
    win.fetch = async (url: string) => {
        calls.push(url)
        return { ok: false, json: async () => ({}) }
    }
    assert.equal(await loadAssist(win), null)
    assert.equal(await loadAssist(win), null)
    assert.equal(calls.length, 1)
    assert.equal(appended.length, 0)
})

test('a boot that says assistance is off is not second-guessed', async () => {
    const { win } = fakeWindow({ neo_assist: { enabled: false } })
    let asked = false
    win.fetch = async () => {
        asked = true
        return { ok: true, json: async () => ({ message: { enabled: true, script: SCRIPT } }) }
    }
    assert.equal(await loadAssist(win), null)
    assert.equal(asked, false)
})

test('a visitor or a portal customer is not asked about: assistance is for the desk users', async () => {
    for (const user of [{ name: 'Guest' }, { name: 'anna@client.ch', portal: true }]) {
        const { win } = fakeWindow({ user })
        let asked = false
        win.fetch = async () => {
            asked = true
            return { ok: true, json: async () => ({ message: null }) }
        }
        assert.equal(await loadAssist(win), null)
        assert.equal(asked, false, user.name)
    }
})
