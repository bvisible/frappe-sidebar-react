//// Neoffice — added file (no upstream equivalent): the tests of src/pageNav.ts (Neodesk plan W1).
// A desk page lends the cockpit its navigation and gives it back when it leaves; the cockpit, subscribed, redraws.
// And a page that is never told it was left (Frappe wires no on_page_hide) cannot leave it under another page.
import { test, mock } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
    createQueryRelay, dockOf, getPageNav, lendsOn, pageNavFeatures, pathOf, searchOf, setPageNav, shownPageNav, subscribePageNav,
} from '../src/pageNav.ts'

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

//// Neoffice — the row of icons and the search box a page lends with its navigation (21.10.2026: NeoMail's views as
//// icons above « Interface », the sidebar's search box searching in NeoMail; neoffice-apps
//// docs/neomail-desk-menu-contract.md, section 4).
const noop = () => {}
const NEOMAIL = {
    app: { name: 'mail', title: 'Courrier' },
    nav: [],
    route: '/app/neomail',
    dock: [
        { id: 'mail', title: 'Courrier', icon: 'mail', active: true, onClick: noop },
        { id: 'calendar', title: 'Calendrier', icon: 'lucide-calendar', badge: 2, onClick: noop },
        { id: 'people', title: 'Contacts', icon: 'users', onClick: noop },
        { id: 'notes', title: 'Notes', icon: 'sticky-note', onClick: noop },
    ],
    search: { placeholder: 'Rechercher dans le courrier', onQuery: noop },
}

test('the row and the search go with their navigation: drawn on the lending page, dropped on another page', () => {
    const there = shownPageNav(NEOMAIL, '/app/neomail', true)
    assert.equal(there, NEOMAIL)
    assert.deepEqual(dockOf(there)?.map((it) => it.id), ['mail', 'calendar', 'people', 'notes'])
    assert.equal(searchOf(there), NEOMAIL.search)
    assert.equal(shownPageNav(NEOMAIL, '/app/neomail/inbox?x=1', true), NEOMAIL, 'below the page and with a query: the same page')
    // Mon espace, while NeoMail goes on publishing from the background: no icons above « Interface », the desk's box.
    const away = shownPageNav(NEOMAIL, '/app/home', true)
    assert.equal(away, null)
    assert.equal(dockOf(away), null)
    assert.equal(searchOf(away), null)
    assert.equal(shownPageNav(NEOMAIL, '/app/neomail-settings', true), null, 'a page whose name starts the same is another page')
    assert.equal(shownPageNav(NEOMAIL, '/app/neomail', false), null, 'off the desk a lent navigation is never drawn')
    assert.equal(shownPageNav(null, '/app/neomail', true), null)
})

test('a page that lends neither keeps the sidebar as it was: no row, the desk\'s search', () => {
    const webmail = { app: { name: 'webmail', title: 'Courrier' }, nav: [], route: '/app/webmail' }
    assert.equal(dockOf(webmail), null)
    assert.equal(searchOf(webmail), null)
    assert.equal(dockOf({ ...webmail, dock: [] }), null, 'an empty row is no row')
})

test('the row takes the icons it can draw, and a name given with the lucide- prefix loses it', () => {
    const dock = dockOf(NEOMAIL)!
    assert.deepEqual(dock.map((it) => it.icon), ['mail', 'calendar', 'users', 'sticky-note'])
    assert.equal(dock[1].badge, 2)
    assert.equal(dock[0].active, true)
    const odd = dockOf({
        ...NEOMAIL,
        dock: [
            { id: 'mail', title: 'Courrier', icon: 'mail', onClick: noop },
            { id: 'no-action', title: 'Calendrier', icon: 'calendar' } as never,
            { id: 'no-name', title: '', icon: 'users', onClick: noop },
            { id: 'no-icon', title: 'Notes', icon: '', onClick: noop },
            null as never,
        ],
    })
    assert.deepEqual(odd?.map((it) => it.id), ['mail'])
    assert.equal(searchOf({ ...NEOMAIL, search: { placeholder: 'x' } as never }), null, 'a search without onQuery leaves the box to the desk')
})

test('the cockpit names what it draws of a lent navigation, and a page cannot change the list', () => {
    assert.deepEqual([...pageNavFeatures], ['dock', 'search'])
    assert.ok(Object.isFrozen(pageNavFeatures))
    // window.NeoCockpit is the desk bundle's exports (tsup globalName): the list must be one of them.
    const mount = readFileSync(new URL('../src/mount.tsx', import.meta.url), 'utf8')
    assert.match(mount, /export \{[^}]*\bpageNavFeatures\b[^}]*\} from '\.\/pageNav'/)
})

test('the page hears the query after a pause, at once on Enter, and an empty one at once', () => {
    mock.timers.enable({ apis: ['setTimeout'] })
    try {
        const heard: string[] = []
        const relay = createQueryRelay((q) => heard.push(q))
        relay.input('f')
        relay.input('fa')
        relay.input('fac')
        mock.timers.tick(249)
        assert.deepEqual(heard, [], 'not while the person types')
        mock.timers.tick(1)
        assert.deepEqual(heard, ['fac'], 'the last query, once, after the pause')
        relay.input('fact')
        relay.enter('facture')
        assert.deepEqual(heard, ['fac', 'facture'], 'Enter: at once')
        mock.timers.tick(1000)
        assert.deepEqual(heard, ['fac', 'facture'], 'the query typed before Enter is not sent after it')
        relay.enter('facture')
        assert.deepEqual(heard, ['fac', 'facture', 'facture'], 'Enter asks again for the same search')
        relay.input('')
        assert.deepEqual(heard, ['fac', 'facture', 'facture', ''], 'the box emptied: at once')
        relay.input('ab')
        relay.input('a')
        relay.input('ab')
        mock.timers.tick(250)
        assert.deepEqual(heard.slice(4), ['ab'])
        relay.input('a')
        relay.input('ab')
        mock.timers.tick(250)
        assert.deepEqual(heard.slice(4), ['ab'], 'back to the query the page already has: nothing to tell it')
        relay.dispose()
    } finally {
        mock.timers.reset()
    }
})

test('Escape clears the page\'s search once, and nothing is cleared that was never searched', () => {
    mock.timers.enable({ apis: ['setTimeout'] })
    try {
        const heard: string[] = []
        const relay = createQueryRelay((q) => heard.push(q))
        relay.escape()
        relay.enter('')
        relay.input('')
        assert.deepEqual(heard, [], 'NeoMail\'s search brings Mail in front: an empty box while Calendar is shown leaves it there')
        relay.input('devis')
        relay.escape()
        mock.timers.tick(1000)
        assert.deepEqual(heard, [], 'typed and cleared before the pause: the page was never told, there is nothing to clear')
        relay.enter('devis')
        relay.escape()
        relay.escape()
        assert.deepEqual(heard, ['devis', ''], 'Escape clears it once')
        relay.input('x')
        relay.dispose()
        mock.timers.tick(1000)
        assert.deepEqual(heard, ['devis', ''], 'a box that stopped being the page\'s sends nothing more')
    } finally {
        mock.timers.reset()
    }
})

test('the page\'s search box looks the same as the desk\'s, rule for rule (cockpit.css)', () => {
    const css = readFileSync(new URL('../src/cockpit.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
    const rules = new Map<string, string>()
    for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        rules.set(m[1].trim().replace(/\s+/g, ' '), m[2].split(';').map((d) => d.trim().replace(/\s+/g, ' ')).filter(Boolean).join('; '))
    }
    const desk = [...rules.keys()].filter((s) => /^(\.nc-side\.collapsed )?\.nc-search(\S*| \S+)$/.test(s) && !s.includes(','))
    assert.ok(desk.length >= 8, `the desk box's rules are found: ${desk.join(' | ')}`)
    for (const selector of desk) {
        const page = selector.replace('.nc-search', '.nc-pagesearch')
        assert.equal(rules.get(page), rules.get(selector), `${page} mirrors ${selector}`)
    }
})
