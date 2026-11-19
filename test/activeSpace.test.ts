//// Neoffice — added file (no upstream equivalent): which space of the sidebar a page lights (maintenance#2813).
// « Bornes » (Paramètres › Bornes) and « Comptes annuels » (Finance › Comptes annuels), opened after a page of Commercial,
// lit « Commercial » on osiris (17.11): the space the menu kept from the page before. A page lights the space it is in,
// read from the page itself (the tab bar, its route, the breadcrumb it declares, its module), or nothing.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { activeSpace, breadcrumbWorkspace, spaceOfPage } from '../src/activeSpace.ts'

const SPACES = ['Commercial', 'Finance', 'Paramètres', 'RH']
const listed = (name: string) => SPACES.includes(name)
const base = { twoLevels: true, mySpaceActive: false, tabSpace: null, byRoute: undefined, routeSpace: null, listed }

test('a page that declares « Paramètres › Bornes » lights Paramètres, never the space the menu kept', () => {
    const routeSpace = spaceOfPage({ isDoctypeRoute: false, breadcrumbSpace: 'Paramètres', moduleSpace: 'Commercial' })
    assert.equal(routeSpace, 'Paramètres')
    assert.equal(activeSpace({ ...base, routeSpace }), 'Paramètres')
})

test('« Finance › Comptes annuels » lights Finance', () => {
    const routeSpace = spaceOfPage({ isDoctypeRoute: false, breadcrumbSpace: 'Finance' })
    assert.equal(activeSpace({ ...base, routeSpace }), 'Finance')
})

test('a page whose space is not found lights nothing', () => {
    assert.equal(spaceOfPage({ isDoctypeRoute: false }), null)
    assert.equal(activeSpace({ ...base, routeSpace: null }), undefined)
})

test('the tab bar, then the route, come first; a space the reader is not shown lights nothing', () => {
    assert.equal(activeSpace({ ...base, tabSpace: 'RH', routeSpace: 'Finance' }), 'RH')
    assert.equal(activeSpace({ ...base, tabSpace: 'Fiduciaire', byRoute: 'Finance' }), 'Finance')
    assert.equal(activeSpace({ ...base, byRoute: 'Commercial', routeSpace: 'Finance' }), 'Commercial')
    assert.equal(activeSpace({ ...base, routeSpace: 'Fiduciaire' }), undefined)
})

test('« Mon espace » lights no space, and one level of navigation follows the route only', () => {
    assert.equal(activeSpace({ ...base, mySpaceActive: true, tabSpace: 'RH' }), undefined)
    assert.equal(activeSpace({ ...base, twoLevels: false, routeSpace: 'Finance' }), undefined)
    assert.equal(activeSpace({ ...base, twoLevels: false, byRoute: 'Finance' }), 'Finance')
})

test('a list or a form keeps the module of its doctype: its breadcrumb is frappe\'s guess, not a declaration', () => {
    assert.equal(spaceOfPage({ isDoctypeRoute: true, breadcrumbSpace: 'Paramètres', moduleSpace: 'Commercial' }), 'Commercial')
    assert.equal(spaceOfPage({ isDoctypeRoute: false, workspaceSpace: 'RH', breadcrumbSpace: 'Paramètres' }), 'RH')
})

test('the breadcrumb is read for the page in front, and nothing breaks without one', () => {
    const frappe = { breadcrumbs: { current_page: () => 'neoffice-devices', all: { 'neoffice-devices': { workspace: 'Setup' } } } }
    assert.equal(breadcrumbWorkspace(frappe), 'Setup')
    assert.equal(breadcrumbWorkspace({ breadcrumbs: { current_page: () => 'other', all: {} } }), null)
    assert.equal(breadcrumbWorkspace({ breadcrumbs: { current_page: () => { throw new Error('no route') } } }), null)
    assert.equal(breadcrumbWorkspace(undefined), null)
})

test('the component asks the rule, reads the breadcrumb again once frappe shows a page, and never falls back on the kept space', () => {
    const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
    const lit = source.slice(source.indexOf('const activeGroupName = useMemo'), source.indexOf('}, [appGroups, route, twoLevels'))
    assert.match(lit, /return activeSpace\(\{/)
    assert.match(lit, /routeSpace: routeSpace\.route === route \? routeSpace\.app : null/)
    assert.doesNotMatch(lit, /currentApp/)
    assert.match(source, /jq\(document\)\.on\('page-change', onPage\)/)
    assert.match(source, /\}, \[route, apps, workspaces, metaTick, tabSpaceApp, pageTick\]\)/)
})

//// Neoffice — since 19.11 the foot holds on one line and its « ? » left: what each mode does is in the tip of its own button,
//// above it as the « ? »'s was (maintenance#2813: beside, the long help covered the rows below it).
test('the tip of what each mode does shows above its button, not over the rows below it', () => {
    const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
    const mode = source.slice(source.indexOf('<div className="nc-mode nc-iface-mode" data-track="mode"'), source.indexOf("className={cn('nc-display-btn'"))
    assert.match(mode, /tipProps\(tr\('Simple'\), modeHelp, true\)/)
    assert.match(mode, /tipProps\(tr\('Advanced'\), modeHelp, true\)/)
})
