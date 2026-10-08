//// Neoffice — added file (no upstream equivalent): the tests of src/neofficeTab.ts, Neoffice's icon and name in the tab (08.10).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { applyNeofficeTab, keepNeofficeTab, stripFrappeBrand, tabStripSvg, themeIconFor } from '../src/neofficeTab.ts'

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

const HELPDESK = '/assets/neoffice_theme/icons/streamline/question.svg'
// A brand icon as the theme serves it: outline in currentColor, second tone in clay.
const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M1 1h2"/><path fill="#C2723F" d="M2 2h2"/></svg>'
const noRead = () => Promise.resolve(null)
const settle = () => new Promise(resolve => setTimeout(resolve, 0))

test('the brand « Frappe » leaves the tab title, a bare word stays', () => {
    assert.equal(stripFrappeBrand('Espaces | Frappe Wiki'), 'Espaces | Wiki')
    assert.equal(stripFrappeBrand('Frappe Meet'), 'Meet')
    assert.equal(stripFrappeBrand('Frappe Insights'), 'Insights')
    assert.equal(stripFrappeBrand('Frappe'), 'Frappe')
    assert.equal(stripFrappeBrand('Tableaux de bord | Insights'), 'Tableaux de bord | Insights')
})

test('only the name of a Frappe product loses the brand: a person called Frappe keeps their name', () => {
    // Synk names the conversation after the person; a test account was called « Frappe Test ».
    assert.equal(stripFrappeBrand('Frappe | Neoffice | Synk'), 'Frappe | Neoffice | Synk')
    assert.equal(stripFrappeBrand('Frappe Test | Neoffice | Synk'), 'Frappe Test | Neoffice | Synk')
    assert.equal(stripFrappeBrand('Frappe Helpdesk'), 'Helpdesk')
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
    keepNeofficeTab(doc, '/x/wiki.svg', noRead)
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
    const stop = keepNeofficeTab(doc, '/b.svg', noRead)
    assert.equal(observers.length, 1)
    stop()
    assert.equal(observers.length, 0)
})

test('the icon comes from the theme, never from the app itself', () => {
    const boot = {
        surface_apps: [{ name: 'helpdesk', logo: '/tile/helpdesk.svg' }],
        app_data: [{ app_name: 'crm', app_logo_url: '/assets/neoffice_theme/icons/streamline/handshake.svg' }],
    }
    assert.equal(themeIconFor(boot, 'helpdesk'), '/tile/helpdesk.svg')
    assert.equal(themeIconFor(boot, 'crm'), '/assets/neoffice_theme/icons/streamline/handshake.svg')
    assert.equal(themeIconFor(boot, 'unknown'), null)
    assert.equal(themeIconFor(null, 'helpdesk'), null)
})

test("the theme's map of every app wins, and answers for an app the reader has no tile of", () => {
    // A Helpdesk agent without the Helpdesk tile, a visitor of a public course: the tiles are empty for them.
    const boot = {
        neoffice_app_icons: { helpdesk: HELPDESK, lms: '/assets/neoffice_theme/icons/streamline/graduation.svg' },
        surface_apps: [{ name: 'lms', logo: '/tile/lms.svg' }],
        app_data: [],
    }
    assert.equal(themeIconFor(boot, 'helpdesk'), HELPDESK)
    assert.equal(themeIconFor(boot, 'lms'), '/assets/neoffice_theme/icons/streamline/graduation.svg')
})

test('the tab-strip version keeps the drawing and sets its outline to ink, or paper in a dark browser', () => {
    const url = tabStripSvg(SVG)
    assert.ok(url && url.startsWith('data:image/svg+xml,'))
    const text = decodeURIComponent((url as string).slice('data:image/svg+xml,'.length))
    assert.ok(text.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><style>'))
    assert.match(text, /:root\{color:#141414\}/)
    assert.match(text, /@media \(prefers-color-scheme:dark\)\{:root\{color:#F6F1E9\}\}/)
    assert.ok(text.endsWith('<path fill="currentColor" d="M1 1h2"/><path fill="#C2723F" d="M2 2h2"/></svg>'))
    assert.equal(tabStripSvg('<html>not found</html>'), null)
})

test('an SVG icon is swapped for its tab-strip version once read, and stays so when the app rewrites it', async () => {
    const { doc, links, fire } = fakeDocument([new FakeLink({ rel: 'icon', href: '/assets/helpdesk/desk/favicon.svg' })], 'Tickets')
    const asked: string[] = []
    keepNeofficeTab(doc, HELPDESK, url => {
        asked.push(url)
        return Promise.resolve(SVG)
    })
    // the plain theme icon at once, the adapted one as soon as the file is read
    assert.equal(links[0].getAttribute('href'), HELPDESK)
    await settle()
    assert.deepEqual(asked, [HELPDESK])
    const adapted = tabStripSvg(SVG)
    assert.equal(links[0].getAttribute('href'), adapted)
    assert.equal(links[0].getAttribute('type'), 'image/svg+xml')
    links[0].setAttribute('href', '/assets/helpdesk/desk/favicon.svg')
    fire()
    assert.equal(links[0].getAttribute('href'), adapted)
})

test('a file that cannot be read leaves the plain theme icon', async () => {
    for (const read of [() => Promise.resolve(null), () => Promise.reject(new Error('offline')), () => Promise.resolve('<html>404</html>')]) {
        const { doc, links } = fakeDocument([new FakeLink({ rel: 'icon', href: '/a.png' })], 'X')
        keepNeofficeTab(doc, HELPDESK, read)
        await settle()
        assert.equal(links[0].getAttribute('href'), HELPDESK)
    }
})

test('a tab left before the file is read is not touched again', async () => {
    const { doc, links } = fakeDocument([new FakeLink({ rel: 'icon', href: '/a.png' })], 'X')
    const stop = keepNeofficeTab(doc, HELPDESK, () => Promise.resolve(SVG))
    stop()
    await settle()
    assert.equal(links[0].getAttribute('href'), HELPDESK)
})

test('a data URL of an SVG is typed as an SVG, whatever the link said before', () => {
    const { doc, links } = fakeDocument([new FakeLink({ rel: 'icon', href: '/favicon.png', type: 'image/png' })], 'X')
    applyNeofficeTab(doc, tabStripSvg(SVG))
    assert.equal(links[0].getAttribute('type'), 'image/svg+xml')
})

test('a PNG icon is used as it is, without reading it', async () => {
    const { doc, links } = fakeDocument([], 'X')
    let read = 0
    keepNeofficeTab(doc, '/assets/neoffice_theme/images/neoffice_icon.png', () => {
        read++
        return Promise.resolve(SVG)
    })
    await settle()
    assert.equal(read, 0)
    assert.equal(links[0].getAttribute('href'), '/assets/neoffice_theme/images/neoffice_icon.png')
    assert.equal(links[0].getAttribute('type'), 'image/png')
})

test('the cockpit keeps the tab of a surface app or of the app it is told, never on the desk', () => {
    const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
    const at = source.indexOf('keepNeofficeTab(')
    assert.ok(at > 0, 'NeoCockpit no longer calls keepNeofficeTab')
    const effect = source.slice(source.lastIndexOf('useEffect(', at), at)
    assert.match(effect, /if \(!tabAppName/, 'the effect must stop when no app is named: the desk, whose tab is already Neoffice')
    assert.match(source, /const tabAppName = surfaceApp\?\.name \|\| tabApp\b/, 'the tab follows the surface app, or the tabApp prop of Raven and mint')
})
