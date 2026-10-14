//// Neoffice — added file (no upstream equivalent): the tests of src/moduleCard.ts.
// The card under the logo names the module on screen: a desk page that lends its navigation, and a standalone
// application (Drive…) while its own navigation is drawn - it read « Applications / Tools » there (14.10.2026).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { moduleCardOf } from '../src/moduleCard.ts'

const TILES = [
    { name: 'drive', logo: '/assets/neoffice_theme/icons/apps/drive.svg' },
    { name: 'mail', logo: '/assets/neoffice_theme/icons/apps/mail.svg' },
]
const DRIVE = { name: 'drive', title: 'Drive', logo: '/assets/drive/frontend/favicon-144x144.png' }

test('Drive, on its own navigation, is the module on screen, with the theme\'s logo', () => {
    const card = moduleCardOf({ lent: null, surfaceApp: DRIVE, onSurface: true, tiles: TILES })
    assert.deepEqual(card, { name: 'drive', title: 'Drive', logo: '/assets/neoffice_theme/icons/apps/drive.svg', mono: true })
})

test('an application the theme has no logo for keeps its own, in its colours', () => {
    const card = moduleCardOf({ lent: null, surfaceApp: DRIVE, onSurface: true, tiles: [] })
    assert.deepEqual(card, { name: 'drive', title: 'Drive', logo: DRIVE.logo, mono: false })
})

test('a standalone application the reader left for another module is no card', () => {
    assert.equal(moduleCardOf({ lent: null, surfaceApp: DRIVE, onSurface: false, tiles: TILES }), null)
    assert.equal(moduleCardOf({ lent: null, surfaceApp: undefined, onSurface: false, tiles: TILES }), null)
})

test('a page that lends its navigation is the card, whatever surface the cockpit runs in', () => {
    const lent = { app: { name: 'mail', title: 'Courrier' } }
    const card = moduleCardOf({ lent, surfaceApp: undefined, onSurface: false, tiles: TILES })
    assert.deepEqual(card, { name: 'mail', title: 'Courrier', logo: '/assets/neoffice_theme/icons/apps/mail.svg', mono: true })
    const both = moduleCardOf({ lent, surfaceApp: DRIVE, onSurface: true, tiles: TILES })
    assert.equal(both?.title, 'Courrier', 'the lent page is on screen, not the surface behind it')
})

test('an application with no logo anywhere is a card without one (the cockpit draws its own icon)', () => {
    const card = moduleCardOf({ lent: null, surfaceApp: { name: 'x', title: 'X' }, onSurface: true, tiles: TILES })
    assert.deepEqual(card, { name: 'x', title: 'X', logo: undefined, mono: false })
})
