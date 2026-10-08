//// Neoffice — added file (no upstream equivalent): Neoffice's icon and name in the browser tab of every app the cockpit
//// runs in (08.10, maintenance#1316). Each app ships its own favicon and tab title, often Frappe's (the Helpdesk, CRM,
//// LMS, Insights and Wiki marks, « Espaces | Frappe Wiki »), and sets them again on every navigation. The cockpit runs
//// in all of them and their updates never touch it: it keeps the tab on the icon neoffice_theme gives that app, and
//// drops the « Frappe » brand from the title.

/** « Espaces | Frappe Wiki » -> « Espaces | Wiki ». A bare « Frappe » with nothing after it is left alone. */
export function stripFrappeBrand(title: string): string {
    return title.replace(/\bFrappe\s+(?=\S)/g, '')
}

function iconType(icon: string): string {
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

/** Apply now, then again each time the app rewrites its icon or title. Returns the function that stops it. */
export function keepNeofficeTab(doc: Document, icon: string | null | undefined): () => void {
    applyNeofficeTab(doc, icon)
    const Observer = (doc.defaultView as (Window & typeof globalThis) | null)?.MutationObserver
    if (!Observer) return () => {}
    const observer = new Observer(() => applyNeofficeTab(doc, icon))
    observer.observe(doc.head, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['href', 'rel'],
    })
    return () => observer.disconnect()
}

/** The icon neoffice_theme gives a surface app: boot.surface_apps first, then its module in app_data. Never the app's own. */
export function themeIconFor(
    boot: { surface_apps?: { name: string; logo?: string }[]; app_data?: { app_name: string; app_logo_url?: string }[] } | null | undefined,
    appName: string | undefined,
): string | null {
    if (!boot || !appName) return null
    const tile = (boot.surface_apps || []).find(t => t.name === appName)
    if (tile && tile.logo) return tile.logo
    const module = (boot.app_data || []).find(a => a.app_name === appName)
    return (module && module.app_logo_url) || null
}
