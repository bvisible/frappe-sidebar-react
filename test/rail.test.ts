//// Neoffice — added file (no upstream equivalent): the menu's variant C (Jérémy, 21.10.2026, « on va partir sur C »).
// Unfolded, the applications stand in a rail on the left and the spaces - or the open application's own entries - in a
// panel beside it; the logo and the entries are links, for a new tab; the foot holds on two lines. These tests read the
// component's source, as menuRows.test.ts does: what they keep is where things are drawn and on what condition.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
const css = readFileSync(new URL('../src/cockpit.css', import.meta.url), 'utf8')

test('the logo is a link to its page: a right-click offers a new tab, a plain click still goes home in the page', () => {
    const logo = source.slice(source.indexOf('const LogoLink'), source.indexOf('const linkTo'))
    assert.match(logo, /<a href=\{href\}/)
    assert.match(logo, /if \(!onClick \|\| \(href && !plainClick\(e\)\)\) return; e\.preventDefault\(\); onClick\(\)/)
    assert.doesNotMatch(logo, /<span onClick/)
    // every logo of the sidebar names its address
    assert.equal(source.match(/<LogoLink onClick=\{goHome\} href=\{homeHref\} /g)?.length, 3)
})

test('a discreet « + » up against the wordmark opens Neoffice in a new tab', () => {
    const plus = source.slice(source.indexOf('className="nc-newtab"') - 40, source.indexOf('className="nc-newtab"') + 400)
    assert.match(plus, /href=\{homeHref\} target="_blank" rel="noopener"/)
    assert.match(plus, /tr\('Open Neoffice in a new tab'\)/)
    assert.match(css, /\.nc-newtab \{[^}]*align-self: flex-start/)
})

test('the rail is the unfolded menu\'s in Advanced mode, for the desk\'s people, with applications to list', () => {
    assert.match(source, /const railOn = !isSimple && !deskless && twoLevels && appTiles\.length > 0/)
    // « Customize the menu » takes the whole width: the panel beside the rail is too narrow for it
    assert.match(source, /return railOn && exp && !customizing \? \(\s*<div className="nc-railbody">\s*\{railColumn\(\)\}\s*<div className="nc-railpanel">\{panelHead\(\)\}\{navBlock\}<\/div>/)
    // beside it, no card « Applications · Tools »: the rail lists the applications, its « ⋯ » the tools
    assert.match(source, /\{!isSimple && !deskless && !\(railOn && exp\) && \(\s*<div style=\{\{ position: 'relative' \}\}>\s*<button className=\{cn\('nc-switch'/)
})

test('the rail\'s entries are links, Neoffice first, the application on screen marked, the tools at its foot', () => {
    const rail = source.slice(source.indexOf('const railColumn'), source.indexOf('const panelHead'))
    assert.match(rail, /linkTo\(homeHref, /)
    assert.match(rail, /linkTo\(t\.route, open\)/)
    assert.match(rail, /const here = lentCard\?\.name === t\.name/)
    assert.match(rail, /aria-current=\{here \? 'page' : undefined\}/)
    assert.ok(rail.indexOf('aria-label="Neoffice"') < rail.indexOf('rail.map('), 'Neoffice first')
    assert.ok(rail.indexOf('nc-rail-more') > rail.indexOf('rail.map('), '« ⋯ » after the applications')
    // the tools' menu sits beside the rail, outside the part that scrolls
    assert.ok(rail.indexOf('className="nc-menu nc-tools-menu"') > rail.indexOf('</nav>'))
    assert.match(source, /const rail = railTiles\(appTiles, lentCard\)/)
})

test('the row of icons a page lends stays above « Interface », across the whole menu, outside the rail\'s panel', () => {
    const panelEnd = source.indexOf(') : navBlock })()}')
    const dock = source.indexOf('{pageDock && (')
    const mode = source.indexOf("className={cn('nc-mode-block', railOn && 'nc-mode-line')}")
    assert.ok(panelEnd > 0 && dock > panelEnd && mode > dock)
})

test('the foot holds on two lines beside the rail: « Collapse » on the account\'s line, « Customize the menu » in its menu', () => {
    assert.match(source, /\{\(!forceExpanded \|\| \(exp && canCustomize\)\) && !\(railOn && exp\) && \(\s*<div className="nc-collapse-row">/)
    assert.match(source, /\{railOn && exp && !forceExpanded && \(\s*<button className="nc-iconbtn nc-foot-collapse"/)
    assert.match(source, /\{railOn && canCustomize && <button className="item"[^\n]*openCustomize\(\)/)
    // the account's menu loses its second doors to what the menu opens already
    assert.match(source, /\{!railOn && <button className="item"[^\n]*tr\('Documentation'\)/)
    assert.match(source, /\{!railOn && <button className="item" onClick=\{\(\) => navigate\(homeUrl\)\}><Home size=\{16\} \/><span>\{tr\('Home'\)\}/)
})

test('« Customize the menu » lists the rail\'s applications apart, and says why the instance hides one', () => {
    assert.match(source, /const tiles = rows\.filter\(r => r\.kind === 'tile'\)/)
    assert.match(source, /r\.kind !== 'app' && r\.kind !== 'tile'/)
    for (const why of ['website', 'alone', 'unused']) assert.match(source, new RegExp(`row\\.hidden_by === '${why}'`))
})

test('beside the rail the rows are 34 px high and the menu 264 px wide', () => {
    assert.match(css, /--nc-w-railed: 264px;/)
    assert.match(css, /\.nc-railpanel \.nc-navitem \{ height: 34px;/)
    assert.match(source, /railOn \? 'var\(--nc-w-railed\)' : 'var\(--nc-w-expanded\)'/)
})
