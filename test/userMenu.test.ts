//// Neoffice — added file (no upstream equivalent): the person's menu takes what an app adds from the boot (18.11.2026).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolveCall, userMenuEntries } from '../src/userMenu.ts'

const MY_MAIL = {
    key: 'my_mail',
    label: 'Mon courrier',
    icon: 'mail',
    badge: 1,
    script: '/assets/frappe_webmail/js/mail_team.js?v=1',
    call: 'frappe_webmail.mail_team.open_mine',
}

test('an entry the boot gives is drawn with its count', () => {
    assert.deepEqual(userMenuEntries({ neo_user_menu: [MY_MAIL] }), [MY_MAIL])
})

test('a boot without entries, or an older server, draws none', () => {
    assert.deepEqual(userMenuEntries(undefined), [])
    assert.deepEqual(userMenuEntries({}), [])
    assert.deepEqual(userMenuEntries({ neo_user_menu: 'nope' }), [])
})

test('an entry that would run something else than a function of the page, or load another site, is left out', () => {
    const bad = [
        { ...MY_MAIL, key: 'a', call: 'alert(1)' },
        { ...MY_MAIL, key: 'b', call: 'frappe_webmail["x"]' },
        { ...MY_MAIL, key: 'c', script: 'https://evil.example/x.js' },
        { ...MY_MAIL, key: 'd', script: '//evil.example/x.js' },
        { ...MY_MAIL, key: 'e', script: '/assets/../../x.js' },
        { ...MY_MAIL, key: 'f', label: '  ' },
    ]
    assert.deepEqual(userMenuEntries({ neo_user_menu: bad }), [])
})

test('a count that is not a positive number is no count, and a key is drawn once', () => {
    const entries = userMenuEntries({ neo_user_menu: [{ ...MY_MAIL, badge: -2 }, { ...MY_MAIL, badge: 9 }] })
    assert.equal(entries.length, 1)
    assert.equal(entries[0].badge, 0)
})

test('the function an entry names is found on the page and keeps its object', () => {
    const root = { frappe_webmail: { mail_team: { who() { return this === root.frappe_webmail.mail_team } } } }
    const fn = resolveCall(root, 'frappe_webmail.mail_team.who')
    assert.ok(fn)
    assert.equal(fn!(), true)
    assert.equal(resolveCall(root, 'frappe_webmail.nothing.here'), null)
    assert.equal(resolveCall(root, 'constructor.constructor'), null)
    assert.equal(resolveCall(root, 'frappe_webmail.__proto__'), null)
})

test('the person menu draws the entries the boot gives, after « Account settings »', () => {
    const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
    assert.match(source, /const userMenu = useMemo\(\(\) => userMenuEntries\(/)
    const settings = source.indexOf("tr('Account settings')")
    const entries = source.indexOf('userMenu.map(')
    assert.ok(settings > 0 && entries > settings, 'the apps’ entries come after « Account settings »')
})
