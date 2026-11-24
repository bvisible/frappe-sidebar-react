//// Neoffice — added file (no upstream equivalent): the tabs of a space in the menu (src/menuTabs.ts, Jérémy 24.11.2026).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { menuTabsApi, tabsOf, unfoldable, type MenuTabs } from '../src/menuTabs.ts'

const css = readFileSync(new URL('../src/cockpit.css', import.meta.url), 'utf8')
const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')

const full = { now: () => 'top', set() {}, of: async () => null, go: () => true, here: () => null, drawn() {} }

test('the theme is asked for every member: an older theme, or no desk, gives no list and no row', () => {
    assert.ok(menuTabsApi({ neoffice_tabs: full }))
    for (const member of Object.keys(full)) {
        assert.equal(menuTabsApi({ neoffice_tabs: { ...full, [member]: undefined } }), null, member)
    }
    assert.equal(menuTabsApi({}), null)
    assert.equal(menuTabsApi(undefined), null)
})

const sales: MenuTabs = { entry: 'Commercial', space: 'Commercial', items: [{ key: 'quotations', label: 'Quotations', active: true }, { key: 'orders', label: 'Orders' }] }

test('the space on screen is listed as its page says it, with its tab lit; another one as it was read, with none lit', () => {
    assert.equal(tabsOf('Commercial', sales, {}), sales)
    const read = { Commercial: { ...sales, items: sales.items } }
    const list = tabsOf('Commercial', { entry: 'Finance', space: 'Finance', items: [] }, read)
    assert.deepEqual(list!.items.map((it) => Boolean(it.active)), [false, false])
    assert.ok(read.Commercial.items[0].active, 'what was read is not changed')
    assert.equal(tabsOf('Finance', null, read), null)
})

test('the bar leaves a page only for what the menu on screen unfolds', () => {
    const open = { place: 'menu', menuOpen: true, phone: false, ownNav: false, entries: ['Commercial'] } as const
    const asked = (more: object) => unfoldable({ ...open, entries: ['Commercial'], ...more })
    assert.deepEqual(asked({}), ['Commercial'])
    assert.deepEqual(asked({ place: 'both' }), ['Commercial'])
    assert.deepEqual(asked({ place: 'top' }), [])
    assert.deepEqual(asked({ menuOpen: false }), [], 'folded menu')
    assert.deepEqual(asked({ phone: true }), [], 'a phone: the menu is a drawer')
    assert.deepEqual(asked({ ownNav: true }), [], "an application's own navigation")
})

test('the entry stays a link that opens its space, the caret is a button of its own that says what it does', () => {
    assert.match(source, /className=\{cn\('nc-caret-btn', open && 'open'\)\} aria-expanded=\{open\} aria-label=\{says\}/)
    // beside the entry, never inside its link
    assert.match(source, /<\/RowTag>\s*\{\/\* \/\/\/\/ Neoffice — its tabs under it/)
    assert.match(source, /\{row\}\{tabCaret\(sp\.app, sp\.label\)\}\{tabList\(sp\.app, sp\.label\)\}/)
    assert.match(css, /\.nc-tabbed > \.nc-navitem \{ grid-area: 1 \/ 1; padding-right: 36px; \}/)
})

test('a tab is a link: a plain click opens it as the bar does, a new browser tab its address; a closed one says why', () => {
    assert.match(source, /href=\{it\.href \|\| '#'\} onClick=\{\(e\) => openTab\(e, list\.space, it\.key\)\}/)
    assert.match(source, /title=\{it\.closed \|\| it\.label\}/)
    assert.match(source, /aria-current=\{it\.active \? 'page' : undefined\}/)
})

// neoffice-tester, 24.11: « Back » had to be pressed twice, the desk's router following the link on top of the tab's own opening
test('a plain click stops there: the desk does not follow the address too; a modified click is the browser\'s', () => {
    const open = source.slice(source.indexOf('const openTab ='), source.indexOf('const tabCaret ='))
    assert.match(open, /if \(!plainClick\(e\)\) return\s+e\.preventDefault\(\)\s+e\.stopPropagation\(\)/)
    assert.match(open, /closeMenus\(\)/)
})

test('under a finger the caret and a tab of the list are 44 px', () => {
    for (const scope of ['html\\.neo-touch ', '']) {
        assert.match(css, new RegExp(scope + '\\.nc-tablist \\.nc-subitem \\{ min-height: 44px; \\}'))
        assert.match(css, new RegExp(scope + '\\.nc-caret-btn \\{ width: 44px; min-height: 44px; \\}'))
    }
})

test('« Display » offers the three places, the default first', () => {
    const places = [...source.matchAll(/\['(top|menu|both)', tr\('(\w+)', undefined, 'Place of the tabs'\)/g)].map((m) => m[1] + ':' + m[2])
    assert.deepEqual(places, ['top:Above', 'menu:Menu', 'both:Both'])
})
