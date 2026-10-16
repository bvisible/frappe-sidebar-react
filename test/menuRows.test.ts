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
    assert.match(source, /if \(wasModuleMenu\) switchRef\.current\?\.focus\(\)/)
    // the sidebar is drawn twice (the visible one, the mobile drawer's off screen): a `ref` on the button would point at the drawer's
    assert.match(source, /onClick=\{\(e\) => \{ switchRef\.current = e\.currentTarget; setAppMenuOpen/)
    assert.doesNotMatch(source, /ref=\{switchRef\}/)
})

test('the four entries under the module list wear the theme\'s duotone icons, with the line icon as the fallback', () => {
    for (const [name, line] of [['smartphone', 'Smartphone'], ['monitor', 'MonitorSmartphone'], ['globe', 'Globe'], ['gear', 'Settings']]) {
        assert.ok(source.includes(`<ThemeIcon name="${name}" fallback={<${line} size={16} />} />`), `${name} entry`)
    }
})
