//// Neoffice — added file (no upstream equivalent): the dropdown menus of the cockpit (maintenance#1622).
// Jérémy, 15.10, with a screenshot of Drive: the module menu lit no row under the pointer, and the module on screen was
// told apart by its weight alone. Measured on osiris: in light, the colour of a hovered or active row WAS the colour of the
// menu (`--nc-sunken` equals `--nc-surface` in the desk's own values: contrast 1.000). The rows have their own tokens now,
// and these tests keep them apart from the menu in both themes.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { closesOnEscape } from '../src/menuKeys.ts'

const css = readFileSync(new URL('../src/cockpit.css', import.meta.url), 'utf8')
const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')

/** The `--nc-*` custom properties declared in the first block whose selector line is `selector`. */
function tokens(selector: RegExp): Record<string, string> {
    const open = css.search(selector)
    assert.ok(open >= 0, `${selector} block not found`)
    const close = css.indexOf('\n}', open)
    const out: Record<string, string> = {}
    for (const m of css.slice(open, close).matchAll(/(--nc-[a-z-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim()
    return out
}

const LIGHT = () => tokens(/^\.neocockpit \{/m)
const DARK = () => tokens(/^\[data-theme="dark"\] \.neocockpit \{/m)

for (const [theme, read] of [['light', LIGHT], ['dark', DARK]] as const) {
    test(`${theme}: a row under the pointer and the row the reader is on are not the colour of the menu, nor of each other`, () => {
        const t = read()
        assert.ok(t['--nc-hover'] && t['--nc-hover-strong'] && t['--nc-surface'], 'the three tokens exist')
        assert.notEqual(t['--nc-hover'], t['--nc-surface'])
        assert.notEqual(t['--nc-hover-strong'], t['--nc-surface'])
        assert.notEqual(t['--nc-hover'], t['--nc-hover-strong'])
    })
}

test('the rows of a menu use those tokens, not --nc-sunken, and a focused row shows it', () => {
    assert.match(css, /\.nc-menu \.item:hover \{ background: var\(--nc-hover\); \}/)
    assert.match(css, /\.nc-menu \.item\.active \{ background: var\(--nc-hover-strong\);/)
    assert.match(css, /\.nc-menu \.item:focus-visible \{ outline:/)
    assert.doesNotMatch(css, /\.nc-menu \.item(:hover|\.active) \{ background: var\(--nc-sunken\)/)
})

test('Escape closes a dropdown menu that is open, and only then', () => {
    assert.equal(closesOnEscape('Escape', true), true)
    assert.equal(closesOnEscape('Escape', false), false) // nothing open: the key belongs to a dialog or a field
    assert.equal(closesOnEscape('Enter', true), false)
    assert.equal(closesOnEscape('ArrowDown', true), false)
    assert.equal(closesOnEscape('Tab', true), false)
})

test('both menu buttons announce their state, and the focus goes back to the module button that was USED', () => {
    assert.match(source, /aria-haspopup="true" aria-expanded=\{appMenuOpen\}/)
    assert.match(source, /aria-haspopup="true" aria-expanded=\{userMenuOpen\}/)
    // on the NEXT turn: the desk's own Escape handler blurs the focused element after this one has run
    assert.match(source, /if \(button\) setTimeout\(\(\) => button\.focus\(\), 0\)/)
    // the sidebar is drawn twice (the visible one, the mobile drawer's off screen): a `ref` on the button would point at the drawer's
    assert.match(source, /onClick=\{\(e\) => \{ switchRef\.current = e\.currentTarget; setAppMenuOpen/)
    assert.doesNotMatch(source, /ref=\{switchRef\}/)
})

test('the four entries under the module list wear the theme\'s duotone icons, with the line icon as the fallback', () => {
    for (const [name, line] of [['smartphone', 'Smartphone'], ['monitor', 'MonitorSmartphone'], ['globe', 'Globe'], ['gear', 'Settings']]) {
        assert.ok(source.includes(`<ThemeIcon name="${name}" fallback={<${line} size={16} />} />`), `${name} entry`)
    }
})

test('the applications\' list opens with a « Neoffice » row that leads back to the desk, marked where the desk is on screen', () => {
    const at = source.indexOf("{...tipProps('Neoffice', tr('Home'))}")
    assert.ok(at > 0, 'the row exists')
    const row = source.slice(source.lastIndexOf('<button', at), source.indexOf('</button>', at))
    // the marked one where the desk is on screen - not « no card », which Mint has too
    assert.match(row, /cn\('item', deskOnScreen\(env, lentCard\) && 'active'\)/)
    assert.match(row, /aria-current=\{deskOnScreen\(env, lentCard\) \? 'true' : undefined\}/)
    assert.match(row, /goHome\(\)/) // the logo's own destination
    assert.match(row, /setMobileOpen\(false\)/) // the phone's drawer closes behind it
    assert.match(row, /<ThemeIcon name="house" fallback=\{<Home size=\{16\} \/>\} \/>/) // « My space »'s icon
    assert.match(row, /<span[^>]*>Neoffice<\/span>/)
    // first of the list: above the theme's applications, and only in the two levels' menu
    assert.ok(at < source.indexOf('{appsMenu && appTiles.map('), 'above the theme\'s applications')
    assert.match(source.slice(source.lastIndexOf('{appsMenu && (', at), at), /^\{appsMenu && \(\s*<>\s*<button/)
})

test('the tools stay set apart from the list even when the theme lists no application', () => {
    assert.doesNotMatch(source, /\(!appsMenu \|\| appTiles\.length > 0\) && <div className="sep" \/>/)
})

test('a tip goes with the module menu: no « mouseleave » reaches a row that is gone, so the tip is cleared when the menu closes', () => {
    // seen on osiris: after a click on « Neoffice » on the desk (a route change, no page load) its tip stayed on the screen
    assert.match(source, /useEffect\(\(\) => \{ if \(!appMenuOpen\) setTip\(null\) \}, \[appMenuOpen\]\)/)
})

test('in Simple mode, inside an application whose own navigation is drawn, the sidebar opens with a « Neoffice » row that leads where the logo does', () => {
    // no module menu in this mode and the spaces' list (with its home row) is not drawn there: only the logo led back (Jérémy, 16.10)
    const at = source.indexOf('{isSimple && surfaceNavActive() && (')
    assert.ok(at > 0, 'the row exists')
    const row = source.slice(at, source.indexOf('</button>', at))
    assert.match(row, /onClick=\{\(\) => \{ hideTip\(\); setMobileOpen\(false\); goHome\(\) \}\}/) // the logo's destination, the tip and the drawer closed
    assert.match(row, /<ThemeIcon name="house" size=\{18\} fallback=\{<Home size=\{18\} strokeWidth=\{1\.6\} \/>\} \/>/)
    // « Neoffice », not « Home »: Drive, Meet, Learning and the help desk each have a « Home » row of their own in that navigation
    assert.match(row, /\{exp && <span className="nl">Neoffice<\/span>\}/)
    assert.match(row, /tipProps\('Neoffice', tr\('Home'\)\)/)
    assert.ok(at < source.indexOf('{surfaceNavActive() && navSections && navSections.map('), 'above the application\'s own navigation')
    // and set apart from it by a separator
    assert.match(source.slice(at, at + 1400), /<\/button>\s*\{\/\*[^*]*\*\/\}\s*<div className="nc-nav-sep" role="separator" \/>/)
    // never two home rows: the spaces' list keeps its own, and only where the application's navigation is not drawn
    assert.match(source, /\(!isSimple \|\| simpleSpaces\) && !surfaceNavActive\(\) && !moduleMode && mySpace/)
})
