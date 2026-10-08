//// Neoffice — added file (no upstream equivalent): Neoffice's icon and name in the browser tab of every app the cockpit
//// runs in (08.10, maintenance#1316). Each app ships its own favicon and tab title, often Frappe's (the Helpdesk, CRM,
//// LMS, Insights and Wiki marks, « Espaces | Frappe Wiki »), and sets them again on every navigation. The cockpit runs
//// in all of them and their updates never touch it: it keeps the tab on the icon neoffice_theme gives that app, and
//// drops the « Frappe » brand from the title.

// The products whose tab title carries the brand (« Frappe Wiki », « Frappe Insights »…). Only these lose it: Synk
// names a conversation after the person, and a person may be called Frappe.
const FRAPPE_PRODUCTS =
    'Builder|Calendar|CRM|Desk|Drive|Gameplan|Helpdesk|HR|Insights|LMS|Learning|Mail|Meet|Sheets|Slides|Suite|Wiki|Writer'
const FRAPPE_BRAND = new RegExp(`\\bFrappe\\s+(?=(?:${FRAPPE_PRODUCTS})\\b)`, 'g')

/** « Espaces | Frappe Wiki » -> « Espaces | Wiki ». A bare « Frappe », or one before anything but a product, stays. */
export function stripFrappeBrand(title: string): string {
    return title.replace(FRAPPE_BRAND, '')
}

function iconType(icon: string): string {
    if (icon.startsWith('data:image/svg+xml')) return 'image/svg+xml'
    const path = icon.split(/[?#]/)[0].toLowerCase()
    if (path.endsWith('.svg')) return 'image/svg+xml'
    if (path.endsWith('.png')) return 'image/png'
    return ''
}

/** Put the tab on `icon` (when given) and take « Frappe » out of its title. Writes only what differs. */
export function applyNeofficeTab(doc: Document, icon: string | null | undefined): void {
    if (icon) {
        const links = Array.from(doc.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]'))
        if (!links.length) {
            const link = doc.createElement('link')
            link.setAttribute('rel', 'icon')
            doc.head.appendChild(link)
            links.push(link)
        }
        const type = iconType(icon)
        for (const link of links) {
            if (link.getAttribute('href') !== icon) link.setAttribute('href', icon)
            if (type && link.getAttribute('type') !== type) link.setAttribute('type', type)
            // a `sizes` hint left from the app's own icon would make the browser prefer another link
            if (link.hasAttribute('sizes')) link.removeAttribute('sizes')
        }
    }
    const title = stripFrappeBrand(doc.title)
    if (title !== doc.title) doc.title = title
}

/** The brand's icons draw their outline in `currentColor`, which is black in a tab: nearly invisible on a dark tab
 *  strip. This is the same drawing with its outline in ink, or in paper when the browser is dark; the clay tone
 *  stays. Returns a data URL, or null when the text is not an SVG. */
export function tabStripSvg(svg: string): string | null {
    const open = svg.match(/<svg\b[^>]*>/i)
    if (!open) return null
    const style = '<style>:root{color:#141414}@media (prefers-color-scheme:dark){:root{color:#F6F1E9}}</style>'
    return 'data:image/svg+xml,' + encodeURIComponent(svg.replace(open[0], open[0] + style))
}

function fetchSvg(url: string): Promise<string | null> {
    return fetch(url, { credentials: 'same-origin' }).then(r => (r.ok ? r.text() : null))
}

/** Apply now, then again each time the app rewrites its icon or title. An SVG icon is swapped, as soon as it is
 *  read, for its tab-strip version. Returns the function that stops it. */
export function keepNeofficeTab(
    doc: Document,
    icon: string | null | undefined,
    readSvg: (url: string) => Promise<string | null> = fetchSvg,
): () => void {
    let current = icon
    let stopped = false
    applyNeofficeTab(doc, current)
    const Observer = (doc.defaultView as (Window & typeof globalThis) | null)?.MutationObserver
    const observer = Observer ? new Observer(() => applyNeofficeTab(doc, current)) : null
    observer?.observe(doc.head, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['href', 'rel'],
    })
    if (icon && iconType(icon) === 'image/svg+xml' && !icon.startsWith('data:')) {
        readSvg(icon)
            .then(svg => {
                const adapted = svg ? tabStripSvg(svg) : null
                if (stopped || !adapted) return
                current = adapted
                applyNeofficeTab(doc, current)
            })
            // the plain icon stays: a tab that cannot read the file keeps the right drawing, only less contrasted
            .catch(() => {})
    }
    return () => {
        stopped = true
        observer?.disconnect()
    }
}

type ThemeBoot = {
    neoffice_app_icons?: Record<string, string>
    surface_apps?: { name: string; logo?: string }[]
    app_data?: { app_name: string; app_logo_url?: string }[]
}

/** The icon neoffice_theme gives an app: its map of every app's icon (`neoffice_app_icons`, the same for every reader),
 *  then the user's tiles, then the app's module. Never the app's own. */
export function themeIconFor(boot: ThemeBoot | null | undefined, appName: string | undefined): string | null {
    if (!boot || !appName) return null
    const mapped = boot.neoffice_app_icons && boot.neoffice_app_icons[appName]
    if (mapped) return mapped
    const tile = (boot.surface_apps || []).find(t => t.name === appName)
    if (tile && tile.logo) return tile.logo
    const module = (boot.app_data || []).find(a => a.app_name === appName)
    return (module && module.app_logo_url) || null
}
