//// Neoffice — added file (no upstream equivalent): the tests of src/moduleCard.ts.
// The card under the logo names the module on screen: a desk page that lends its navigation, a standalone
// application (Drive…) while its own navigation is drawn - it read « Applications / Tools » there (14.10.2026) -,
// and an application the cockpit runs in without being its surface (Synk). In the name the reader's language has.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { moduleCardOf } from '../src/moduleCard.ts'

const TILES = [
    { name: 'drive', title: 'Drive', logo: '/assets/neoffice_theme/icons/apps/drive.svg' },
    { name: 'calendar', title: 'Calendrier', logo: '/assets/neoffice_theme/icons/apps/calendar.svg' },
    { name: 'mail', title: 'Messagerie', logo: '/assets/neoffice_theme/icons/apps/mail.svg' },
    { name: 'raven', title: 'Synk', logo: '/assets/neoffice_theme/icons/apps/chat.svg' },
]
const DRIVE = { name: 'drive', title: 'Drive', logo: '/assets/drive/frontend/favicon-144x144.png' }

test('Drive, on its own navigation, is the module on screen, with the theme\'s logo', () => {
    const card = moduleCardOf({ lent: null, surfaceApp: DRIVE, currentApp: 'drive', tiles: TILES })
    assert.deepEqual(card, { name: 'drive', title: 'Drive', logo: '/assets/neoffice_theme/icons/apps/drive.svg', mono: true })
})

test('the theme\'s name wins over the application\'s own: « Calendrier », not « Calendar »', () => {
    const card = moduleCardOf({ lent: null, surfaceApp: { name: 'calendar', title: 'Calendar' }, currentApp: 'calendar', tiles: TILES })
    assert.equal(card?.title, 'Calendrier')
})

test('an application the theme has no logo for keeps its own, in its colours, and its own name', () => {
    const card = moduleCardOf({ lent: null, surfaceApp: DRIVE, currentApp: 'drive', tiles: [] })
    assert.deepEqual(card, { name: 'drive', title: 'Drive', logo: DRIVE.logo, mono: false })
})

test('a standalone application the reader left for another module is no card', () => {
    assert.equal(moduleCardOf({ lent: null, surfaceApp: DRIVE, currentApp: 'erpnext', tiles: TILES }), null)
    assert.equal(moduleCardOf({ lent: null, tiles: TILES }), null)
})

test('a page that lends its navigation is the card, whatever surface the cockpit runs in', () => {
    const lent = { app: { name: 'mail', title: 'Courrier' } }
    const card = moduleCardOf({ lent, tiles: TILES })
    assert.deepEqual(card, { name: 'mail', title: 'Messagerie', logo: '/assets/neoffice_theme/icons/apps/mail.svg', mono: true })
    const both = moduleCardOf({ lent, surfaceApp: DRIVE, currentApp: 'drive', tiles: TILES })
    assert.equal(both?.name, 'mail', 'the lent page is on screen, not the surface behind it')
})

test('an application the cockpit runs in without being its surface is named by its tile (Synk)', () => {
    const card = moduleCardOf({ lent: null, tabApp: 'raven', tiles: TILES })
    assert.deepEqual(card, { name: 'raven', title: 'Synk', logo: '/assets/neoffice_theme/icons/apps/chat.svg', mono: true })
})

test('an application with no tile is no card (Mint is in the cockpit and has none)', () => {
    assert.equal(moduleCardOf({ lent: null, tabApp: 'mint', tiles: TILES }), null)
})

test('an application with no logo anywhere is a card without one (the cockpit draws its own icon)', () => {
    const card = moduleCardOf({ lent: null, surfaceApp: { name: 'x', title: 'X' }, currentApp: 'x', tiles: TILES })
    assert.deepEqual(card, { name: 'x', title: 'X', logo: undefined, mono: false })
})
