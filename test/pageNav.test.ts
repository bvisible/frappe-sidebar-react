//// Neoffice — added file (no upstream equivalent): the tests of src/pageNav.ts (Neodesk plan W1).
// A desk page lends the cockpit its navigation and gives it back when it leaves; the cockpit, subscribed, redraws.
// And a page that is never told it was left (Frappe wires no on_page_hide) cannot leave it under another page.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getPageNav, lendsOn, pathOf, setPageNav, subscribePageNav } from '../src/pageNav.ts'

const MAIL = {
    app: { name: 'webmail', title: 'Courrier' },
    nav: [{ label: 'camille.favre@', items: [{ label: 'Réception', icon: 'lucide-inbox', badge: 12, badgeTone: 'accent' as const }] }],
    route: '/app/webmail',
}

test('a page lends its navigation, the cockpit is told, and the page gives it back', () => {
    let told = 0
    const stop = subscribePageNav(() => {
        told += 1
    })
    assert.equal(getPageNav(), null)
    setPageNav(MAIL)
    assert.equal(getPageNav(), MAIL)
    setPageNav(null)
    assert.equal(getPageNav(), null)
    assert.equal(told, 2)
    stop()
    setPageNav(MAIL)
    assert.equal(told, 2, 'a cockpit that left is not told any more')
    setPageNav(null)
})

test('a navigation belongs to its page: drawn there and below it, not on another page', () => {
    assert.equal(lendsOn('/app/webmail', '/app/webmail'), true)
    assert.equal(lendsOn('/app/webmail', '/app/webmail/INBOX'), true)
    assert.equal(lendsOn('/app/webmail', '/app/webmail?folder=Sent#top'), true, 'a query or a hash is not another page')
    assert.equal(lendsOn('/app/webmail', '/app/webmail/'), true)
    assert.equal(lendsOn('/app/webmail', '/app/home'), false, 'Mon espace: the folders go')
    assert.equal(lendsOn('/app/webmail', '/app/webmail-settings'), false, 'a page whose name starts the same is another page')
    assert.equal(lendsOn('/app/webmail', '/app'), false)
    assert.equal(lendsOn('/app/webmail', '/'), false)
    assert.equal(lendsOn(undefined, '/app/home'), true, 'a navigation that names no page is drawn wherever the reader is')
    assert.equal(lendsOn('', '/app/home'), true)
})

test('the path of an address: decoded, no query, no hash, no trailing slash', () => {
    assert.equal(pathOf('/app/webmail/'), '/app/webmail')
    assert.equal(pathOf('/app/webmail?x=1#y'), '/app/webmail')
    assert.equal(pathOf('/app/caf%C3%A9'), '/app/café')
    assert.equal(pathOf('/'), '/')
    assert.equal(pathOf('/app/%E0%A4%A'), '/app/%E0%A4%A', 'a path that does not decode stays as it is')
})

test('a page that does not name itself keeps the address it first lent at, from the background too', () => {
    const w = globalThis as unknown as { window?: { location: { pathname: string } } }
    const before = w.window
    try {
        w.window = { location: { pathname: '/app/webmail' } }
        const lent = { app: { name: 'webmail', title: 'Courrier' }, nav: MAIL.nav }
        setPageNav(lent)
        assert.equal(getPageNav()?.route, '/app/webmail')
        // The reader went to Mon espace; the page's mounted app publishes again from the background.
        w.window = { location: { pathname: '/app/home' } }
        setPageNav({ ...lent, nav: [] })
        assert.equal(getPageNav()?.route, '/app/webmail', 'the page it lent at, not the page the reader is on')
        // Another page lending is not the first one's.
        setPageNav({ app: { name: 'calendar', title: 'Agenda' }, nav: [] })
        assert.equal(getPageNav()?.route, '/app/home')
        // A page that names itself is taken at its word.
        setPageNav(MAIL)
        assert.equal(getPageNav(), MAIL)
    } finally {
        setPageNav(null)
        if (before === undefined) delete w.window
        else w.window = before
    }
})
