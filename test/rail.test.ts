//// Neoffice — added file (no upstream equivalent): the menu's variant C (Jérémy, 21.10.2026, « on va partir sur C »), and
// since 19.11.2026 its lighter foot (canvas « Barre Neoffice plus légère », B and B5). Unfolded, the spaces - or the open
// application's own entries - take the menu's whole width; the applications stand in a dock at its foot, the ones the reader
// pinned in sight, the others and the tools behind « ⋯ »; the mode stays one click away and the four other settings of the
// display go behind one button, « Display ». The logo and the entries are links, for a new tab. These tests read the
// component's source, as menuRows.test.ts does: what they keep is where things are drawn and on what condition. The dock's
// rule itself (which applications, how many) is tested in navLink.test.ts.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
const css = readFileSync(new URL('../src/cockpit.css', import.meta.url), 'utf8')
const dockSource = source.slice(source.indexOf('const appDock = () =>'), source.indexOf('const panelHead = () =>'))
const foot = source.slice(source.indexOf('{ifaceInFoot ? ('), source.indexOf(') : (!deskless && hasModes && !exp && ('))

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

test('unfolded, in Advanced mode, for the desk\'s people, the panel takes the whole width: no more rail beside it', () => {
    assert.match(source, /const railOn = !isSimple && !deskless && twoLevels && appTiles\.length > 0/)
    // « Customize the menu » still takes the whole width
    assert.match(source, /return railOn && exp && !customizing \? \(\s*<div className="nc-railbody">\s*<div className="nc-railpanel">\{panelHead\(\)\}\{navBlock\}<\/div>\s*<\/div>/)
    assert.doesNotMatch(source, /railColumn|className="nc-rail"|nc-tools-menu/)
    // no card « Applications · Tools » there either: the dock lists the applications, its « ⋯ » the tools
    assert.match(source, /\{!isSimple && !deskless && !\(railOn && exp\) && \(\s*<div style=\{\{ position: 'relative' \}\}>\s*<button className=\{cn\('nc-switch'/)
})

test('the dock stands at the foot, under the row a page lends and above the mode, in the unfolded menu only', () => {
    const pageDock = source.indexOf('{pageDock && (')
    const appDock = source.indexOf('{railOn && exp && !customizing && appDock()}')
    const mode = source.indexOf('className="nc-mode-block nc-iface nc-iface-one"')
    assert.ok(pageDock > 0 && appDock > pageDock && mode > appDock)
})

test('the dock\'s entries are links: the pinned ones, Neoffice first away from the desk, the one on screen lit at the end', () => {
    assert.match(source, /const dock = dockTiles\(appTiles, dockPins, lentCard\)/)
    assert.match(dockSource, /const here = lentCard\?\.name === t\.name/)
    assert.match(dockSource, /aria-current=\{here \? 'page' : undefined\}/)
    assert.match(dockSource, /linkTo\(t\.route, openTile\(t, here\)\)/)
    const row = dockSource.slice(dockSource.indexOf('<nav className="nc-appdock"'))
    assert.ok(row.indexOf('{!home && (') < row.indexOf('dock.pinned.map(dockButton)'), 'Neoffice before the pinned ones')
    assert.ok(row.indexOf('dock.pinned.map(dockButton)') < row.indexOf('dockButton(dock.extra)'), 'the one on screen after them')
    assert.ok(row.indexOf('dockButton(dock.extra)') < row.indexOf('nc-appdock-more'), '« ⋯ » last')
    assert.match(row, /linkTo\(homeHref, /)
})

test('« ⋯ » opens every application by its name with its pin, then the tools, « Customize the menu » with them', () => {
    const menu = dockSource.slice(dockSource.indexOf('className="nc-menu nc-apps-menu"'), dockSource.indexOf('<nav className="nc-appdock"'))
    assert.ok(menu.indexOf('dock.pinned.map(t => appRow(t, true))') < menu.indexOf('dock.others.map(t => appRow(t, false))'))
    assert.ok(menu.indexOf('dock.others.map') < menu.indexOf("tr('Tools')"))
    assert.match(menu, /\{canCustomize && <button className="item"[^\n]*openCustomize\(\)/)
    assert.match(menu, /canManageDevices && <button className="item"[^\n]*openBornes\(\)/)
    // a pin only where the theme keeps it; refused when the dock is full, its tip saying why
    assert.match(dockSource, /\{canPin && \(\s*<button type="button" className=\{cn\('nc-pin', isPinned && 'on'\)\} aria-pressed=\{isPinned\} aria-disabled=\{refused \|\| undefined\}/)
    assert.match(dockSource, /const next = nextPins\(pinnedNames, t\.name\); if \(next\)/)
    assert.match(source, /const canPin = Boolean\(boot\) && Object\.prototype\.hasOwnProperty\.call\(boot, 'neo_dock_pins'\)/)
    assert.match(source, /'\/api\/method\/neoffice_theme\.space_layout\.set_dock_pins'/)
    // a refusal of the server puts the pins back as they were, and says so
    assert.match(source, /\.catch\(\(\) => \{ setDockPins\(before\); setDockError\(/)
})

test('the foot holds on one line: Simple | Advanced, then « Display », which holds the four other settings in words', () => {
    assert.doesNotMatch(foot, /nc-mode-head/)
    const row = foot.slice(foot.indexOf('<div className="nc-iface-row">'))
    assert.ok(row.indexOf('data-track="mode"') < row.indexOf("className={cn('nc-display-btn'"))
    const menu = foot.slice(foot.indexOf('className="nc-menu nc-display-menu"'), foot.indexOf('<div className="nc-iface-row">'))
    for (const track of ['size', 'color', 'width', 'touch']) assert.match(menu, new RegExp(`data-track="${track}"`))
    // the touch screen only where the theme defines it, as in the account's menu before
    assert.match(menu, /\{env === 'desk' && touchApi\(\) && \(/)
})

test('the account\'s menu is the account\'s: no setting of the display while the foot holds them, « Customize » in « ⋯ »', () => {
    assert.match(source, /const prefsInMenu = !ifaceInFoot \|\| \(!deskless && !hasModes\)/)
    assert.match(source, /\{prefsInMenu && <div className=\{cn\('nc-prefs', railOn && 'nc-prefs-line'\)\}>/)
    assert.match(source, /\{env === 'desk' && touchApi\(\) && !ifaceInFoot && \(\s*<div className="nc-pref" role="group" aria-label=\{tr\('Touch mode'\)\}>/)
    assert.equal(source.match(/openCustomize\(\) \}\}><SlidersHorizontal size=\{16\} \/><span>\{tr\('Customize the menu'\)\}/g)?.length, 1)
    // the account's line: the name alone, the address in the menu's head
    assert.match(source, /\{!ifaceInFoot && <span className="e">\{boot\?\.user\?\.email \|\| ''\}<\/span>\}/)
    assert.match(source, /\{railOn && exp && !forceExpanded && \(\s*<button className="nc-iconbtn nc-foot-collapse"/)
})

test('« Customize the menu » lists the applications apart, and says why the instance hides one', () => {
    assert.match(source, /const tiles = rows\.filter\(r => r\.kind === 'tile'\)/)
    assert.match(source, /r\.kind !== 'app' && r\.kind !== 'tile'/)
    for (const why of ['website', 'alone', 'unused']) assert.match(source, new RegExp(`row\\.hidden_by === '${why}'`))
})

test('the menu is 264 px wide, its rows 34 px high; the dock\'s cells give way, its menus scroll on a short screen', () => {
    assert.match(css, /--nc-w-railed: 264px;/)
    assert.match(css, /\.nc-railpanel \.nc-navitem \{ height: 34px;/)
    assert.match(source, /railOn \? 'var\(--nc-w-railed\)' : 'var\(--nc-w-expanded\)'/)
    assert.match(css, /\.nc-appdock-btn \{\s*flex: 0 1 36px; min-width: 26px;/)
    assert.match(css, /max-height: calc\(100vh - 150px\); overflow-y: auto;/)
    // grey at rest, in colour under the pointer and on the application on screen
    assert.match(css, /\.nc-appdock-btn img \{[^}]*filter: grayscale\(1\)/)
    assert.match(css, /\.nc-appdock-btn:hover img, \.nc-appdock-btn:focus-visible img, \.nc-appdock-btn\.active img \{ filter: none; opacity: 1; \}/)
})
