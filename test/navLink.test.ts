//// Neoffice — added file (no upstream equivalent): the tests of src/navLink.ts.
// The sidebar's entries are links: a plain click moves inside the page, every other click is the browser's - a new
// tab from the right-click, ⌘-click or the middle button (21.10.2026). The rail lists the applications with a page,
// and keeps the one on screen even when the reader's menu hides it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { plainClick, railTiles, dockTiles, nextPins, pinRows, DOCK_DEFAULT, DOCK_MAX } from '../src/navLink.ts'

test('a plain click with the main button is the page\'s', () => {
    assert.equal(plainClick({ button: 0 }), true)
    assert.equal(plainClick({}), true)
})

test('⌘, Ctrl, Shift and Alt leave the click to the browser', () => {
    for (const key of ['metaKey', 'ctrlKey', 'shiftKey', 'altKey'] as const) {
        assert.equal(plainClick({ button: 0, [key]: true }), false, key)
    }
})

test('the middle button and a click someone already handled are not the page\'s', () => {
    assert.equal(plainClick({ button: 1 }), false)
    assert.equal(plainClick({ button: 0, defaultPrevented: true }), false)
})

const TILES = [
    { name: 'drive', title: 'Drive', route: '/drive' },
    { name: 'calendar', title: 'Calendrier', route: '/calendar' },
    { name: 'sheets', title: 'Tableur' },
]

test('the rail lists the applications that have a page to open', () => {
    assert.deepEqual(railTiles(TILES).map(t => t.name), ['drive', 'calendar'])
})

test('the application on screen stays in the rail when the reader\'s menu hides it', () => {
    const rail = railTiles(TILES, { name: 'crm', title: 'CRM', logo: '/x.svg' })
    assert.deepEqual(rail.map(t => t.name), ['drive', 'calendar', 'crm'])
    assert.equal(rail[2].title, 'CRM')
})

test('an application on screen that the rail already lists is not added twice', () => {
    assert.deepEqual(railTiles(TILES, { name: 'drive' }).map(t => t.name), ['drive', 'calendar'])
})

//// Neoffice — the dock at the foot of the menu (19.11.2026): five applications to who never chose, the reader's pins
//// otherwise, six at most, the one on screen lit at the end when it is not pinned.
const SUITE = [
    { name: 'mail', title: 'E-mail', route: '/app/neomail' },
    { name: 'calendar', title: 'Calendrier', route: '/calendar' },
    { name: 'drive', title: 'Drive', route: '/drive' },
    { name: 'meet', title: 'Meet', route: '/meet' },
    { name: 'raven', title: 'Messagerie d\'entreprise', route: '/raven' },
    { name: 'builder', title: 'Builder', route: '/builder' },
    { name: 'lms', title: 'Formation', route: '/lms' },
    { name: 'wiki', title: 'Wiki', route: '/wiki' },
    { name: 'helpdesk', title: 'Service d\'assistance', route: '/helpdesk' },
    { name: 'sheets', title: 'Tableur' },
]

test('who never chose gets the first five applications of the rail\'s order, the rest behind « ⋯ »', () => {
    const dock = dockTiles(SUITE, null)
    assert.equal(DOCK_DEFAULT, 5)
    assert.deepEqual(dock.pinned.map(t => t.name), ['mail', 'calendar', 'drive', 'meet', 'raven'])
    assert.deepEqual(dock.others.map(t => t.name), ['builder', 'lms', 'wiki', 'helpdesk'])
    assert.equal(dock.extra, null)
})

test('the reader\'s pins keep their order; one the menu no longer shows, or a repeated one, drops out', () => {
    const dock = dockTiles(SUITE, ['wiki', 'mail', 'crm', 'mail', 'sheets'])
    assert.deepEqual(dock.pinned.map(t => t.name), ['wiki', 'mail'])
    assert.equal(dock.others.length, 7)
})

test('an empty choice is a choice: no application pinned, all of them behind « ⋯ »', () => {
    const dock = dockTiles(SUITE, [])
    assert.deepEqual(dock.pinned, [])
    assert.equal(dock.others.length, 9)
})

test('never more than six applications in the dock', () => {
    const all = SUITE.map(t => t.name)
    assert.equal(DOCK_MAX, 6)
    assert.equal(dockTiles(SUITE, all).pinned.length, 6)
})

test('the application on screen is lit at the end of the row when it is not pinned, even when the menu hides it', () => {
    assert.equal(dockTiles(SUITE, null, { name: 'lms' }).extra?.name, 'lms')
    assert.equal(dockTiles(SUITE, null, { name: 'drive' }).extra, null)
    const hidden = dockTiles(SUITE, null, { name: 'crm', title: 'CRM', logo: '/crm.svg' }).extra
    assert.deepEqual(hidden, { name: 'crm', title: 'CRM', logo: '/crm.svg' })
})

test('a pin pins at the end, unpins what was pinned, and is refused when the dock is full', () => {
    assert.deepEqual(nextPins(['mail', 'drive'], 'wiki'), ['mail', 'drive', 'wiki'])
    assert.deepEqual(nextPins(['mail', 'drive'], 'mail'), ['drive'])
    assert.equal(nextPins(['a', 'b', 'c', 'd', 'e', 'f'], 'g'), null)
    assert.deepEqual(nextPins(['a', 'b', 'c', 'd', 'e', 'f'], 'a'), ['b', 'c', 'd', 'e', 'f'])
})

test('while « ⋯ » is open, its rows keep the order they had when it opened; the pins say the live state (maintenance#3145)', () => {
    const opened = { pinned: ['mail', 'calendar', 'drive', 'meet', 'raven'], others: ['builder', 'lms', 'wiki', 'helpdesk'] }
    // Meet unpinned, Wiki pinned: nothing moves under the pointer
    const live = dockTiles(SUITE, ['mail', 'calendar', 'drive', 'raven', 'wiki'])
    const rows = pinRows(live, opened)
    assert.deepEqual(rows.pinned.map(t => t.name), opened.pinned)
    assert.deepEqual(rows.others.map(t => t.name), opened.others)
    // closed: the sections are sorted again
    assert.deepEqual(pinRows(live, null).pinned.map(t => t.name), ['mail', 'calendar', 'drive', 'raven', 'wiki'])
    // an application gone since drops out, one shown since comes at the end of the others
    const fewer = dockTiles(SUITE.filter(t => t.name !== 'lms'), null)
    assert.deepEqual(pinRows(fewer, { pinned: ['mail'], others: ['lms', 'wiki'] }).others.map(t => t.name).slice(0, 1), ['wiki'])
    assert.ok(pinRows(fewer, { pinned: ['mail'], others: ['lms', 'wiki'] }).others.some(t => t.name === 'helpdesk'))
})
