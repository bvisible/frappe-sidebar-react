//// Neoffice — added file (no upstream equivalent): the tests of src/neofficeTab.ts, Neoffice's icon and name in the tab (08.10).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { applyNeofficeTab, keepNeofficeTab, stripFrappeBrand, themeIconFor } from '../src/neofficeTab.ts'

// A document small enough for node: <link> elements with attributes, a title, a head, and a MutationObserver
// that the test triggers by hand, the way the browser does after the app rewrites its icon.
class FakeLink {
    attrs: Record<string, string> = {}
    constructor(attrs: Record<string, string> = {}) {
        this.attrs = { ...attrs }
    }
    getAttribute(name: string) {
        return name in this.attrs ? this.attrs[name] : null
    }
    setAttribute(name: string, value: string) {
        this.attrs[name] = value
    }
    hasAttribute(name: string) {
        return name in this.attrs
    }
    removeAttribute(name: string) {
        delete this.attrs[name]
    }
}

function fakeDocument(links: FakeLink[], title: string) {
    const observers: (() => void)[] = []
    const doc = {
        title,
        head: { appendChild: (link: FakeLink) => links.push(link) },
        createElement: () => new FakeLink(),
        querySelectorAll: () => links.filter(l => (l.getAttribute('rel') || '').split(/\s+/).includes('icon')),
        defaultView: {
            MutationObserver: class {
                constructor(callback: () => void) {
                    observers.push(callback)
                }
                observe() {}
                disconnect() {
                    observers.length = 0
                }
            },
        },
    }
    return { doc: doc as unknown as Document, links, fire: () => observers.forEach(cb => cb()), observers }
}

const HELPDESK = '/assets/neoffice_theme/icons/apps_v2/helpdesk.svg'

test('the brand « Frappe » leaves the tab title, a bare word stays', () => {
    assert.equal(stripFrappeBrand('Espaces | Frappe Wiki'), 'Espaces | Wiki')
    assert.equal(stripFrappeBrand('Frappe Meet'), 'Meet')
    assert.equal(stripFrappeBrand('Frappe'), 'Frappe')
    assert.equal(stripFrappeBrand('Tableaux de bord | Insights'), 'Tableaux de bord | Insights')
})

test('every icon link of the page takes the theme icon, and loses its sizes hint', () => {
    const { doc, links } = fakeDocument(
        [new FakeLink({ rel: 'icon', href: '/assets/helpdesk/desk/favicon.svg', sizes: '32x32' }), new FakeLink({ rel: 'shortcut icon', href: '/favicon.ico' }), new FakeLink({ rel: 'apple-touch-icon', href: '/a.png' })],
        'Helpdesk',
    )
    applyNeofficeTab(doc, HELPDESK)
    assert.deepEqual(links.slice(0, 2).map(l => l.getAttribute('href')), [HELPDESK, HELPDESK])
    assert.equal(links[0].getAttribute('type'), 'image/svg+xml')
    assert.equal(links[0].hasAttribute('sizes'), false)
    // the installable app's icon is the app's own business
    assert.equal(links[2].getAttribute('href'), '/a.png')
})

test('a page without an icon link gets one', () => {
    const { doc, links } = fakeDocument([], 'CRM')
    applyNeofficeTab(doc, '/x/crm.svg')
    assert.equal(links.length, 1)
    assert.equal(links[0].getAttribute('href'), '/x/crm.svg')
})

test('when the app rewrites its icon and title on navigation, the cockpit puts them back', () => {
    const { doc, links, fire } = fakeDocument([new FakeLink({ rel: 'icon', href: '/assets/wiki/frontend/favicon.png' })], 'Frappe Wiki')
    keepNeofficeTab(doc, '/x/wiki.svg')
    assert.equal(links[0].getAttribute('href'), '/x/wiki.svg')
    assert.equal(doc.title, 'Wiki')
    links[0].setAttribute('href', '/assets/wiki/frontend/favicon.png')
    ;(doc as unknown as { title: string }).title = 'Espaces | Frappe Wiki'
    fire()
    assert.equal(links[0].getAttribute('href'), '/x/wiki.svg')
    assert.equal(doc.title, 'Espaces | Wiki')
})

test('the stop function disconnects the observer', () => {
    const { doc, observers } = fakeDocument([new FakeLink({ rel: 'icon', href: '/a.svg' })], 'X')
    const stop = keepNeofficeTab(doc, '/b.svg')
    assert.equal(observers.length, 1)
    stop()
    assert.equal(observers.length, 0)
})

test('the icon comes from the theme, never from the app itself', () => {
    const boot = {
        surface_apps: [{ name: 'helpdesk', logo: HELPDESK }],
        app_data: [{ app_name: 'crm', app_logo_url: '/assets/neoffice_theme/icons/apps_v2/crm.svg' }],
    }
    assert.equal(themeIconFor(boot, 'helpdesk'), HELPDESK)
    assert.equal(themeIconFor(boot, 'crm'), '/assets/neoffice_theme/icons/apps_v2/crm.svg')
    assert.equal(themeIconFor(boot, 'unknown'), null)
    assert.equal(themeIconFor(null, 'helpdesk'), null)
})

test('the cockpit keeps the tab only on a standalone surface, never on the desk', () => {
    const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
    const at = source.indexOf('keepNeofficeTab(')
    assert.ok(at > 0, 'NeoCockpit no longer calls keepNeofficeTab')
    const effect = source.slice(source.lastIndexOf('useEffect(', at), at)
    assert.match(effect, /if \(!surfaceApp/, 'the effect must stop on the desk, whose tab is already Neoffice')
})
