//// Neoffice — added file (no upstream equivalent): the tests of src/navLink.ts.
// The sidebar's entries are links: a plain click moves inside the page, every other click is the browser's - a new
// tab from the right-click, ⌘-click or the middle button (21.10.2026). The rail lists the applications with a page,
// and keeps the one on screen even when the reader's menu hides it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { plainClick, railTiles } from '../src/navLink.ts'

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
