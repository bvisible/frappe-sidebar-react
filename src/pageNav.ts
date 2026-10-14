//// Neoffice — added file (no upstream equivalent): the navigation a desk page lends the cockpit (Neodesk plan, lot W1).
//
// A desk page with a navigation of its own — the webmail: its mailboxes, its folders and their unread mail — lends
// it to the cockpit instead of drawing a second sidebar beside it (Jérémy, 13.10.2026: « quand on clique sur Webmail,
// ça déploie en sous-menu »). The cockpit draws it under the page's module card, the way it draws a surface app's own
// navigation (contextNav: Drive, the calendar), and drops it when the page gives it back:
//
//   window.NeoCockpit.setPageNav({ app: { name: 'webmail', title: 'Courrier' }, nav: [...sections], route: '/app/webmail' })
//   window.NeoCockpit.setPageNav(null)
//
// One store for the whole page: the desk mounts the cockpit once, and the pages come and go under it.
//
// A page cannot count on being told it was left: Frappe's page view wires `show` only (`on_page_show`), never
// `on_page_hide`, and the app a page mounted goes on running, so it goes on publishing from the background. The
// navigation therefore carries the address of its page, and the cockpit draws it only while the reader is on that
// address (Jérémy, 14.10.2026: back on « Mon espace », the webmail's folders were still in the sidebar).

import type { NeoCockpitProps } from './NeoCockpit'

export interface PageNav {
    /** The module card above the navigation: the app's name looks its logo up in boot.surface_apps. */
    app: NonNullable<NeoCockpitProps['surfaceApp']>
    nav: NonNullable<NeoCockpitProps['contextNav']>
    footer?: NeoCockpitProps['contextFooter']
    /** The address of the lending page (`/app/webmail`), the one the navigation belongs to. Left out, it is the address
     *  where this page first lent its navigation - what a page that does not name itself would have lent it at. */
    route?: string
}

let current: PageNav | null = null
const listeners = new Set<() => void>()

/** The path of an address: decoded, with no query, no hash and no trailing slash. */
export function pathOf(address: string): string {
    let path = (address || '').split(/[?#]/)[0]
    try { path = decodeURIComponent(path) } catch { /* a path that does not decode stays as it is */ }
    return path.length > 1 ? path.replace(/\/+$/, '') : path
}

/** Whether a navigation lent by the page at `lendRoute` is the one to draw while the reader is at `here`: on that
 *  page, or below it (`/app/webmail/INBOX`). A navigation that names no page is drawn wherever the reader is. */
export function lendsOn(lendRoute: string | undefined, here: string): boolean {
    if (!lendRoute) return true
    const page = pathOf(lendRoute)
    const at = pathOf(here)
    return at === page || at.startsWith(page + '/')
}

export function setPageNav(next: PageNav | null): void {
    if (next && !next.route) {
        //// Same page lending again (a refresh from its background): it keeps the address it first lent at.
        const same = current && current.app.name === next.app.name ? current.route : undefined
        const route = same || (typeof window === 'undefined' ? '' : window.location.pathname)
        current = route ? { ...next, route } : next
    } else {
        current = next
    }
    listeners.forEach((listener) => listener())
}

export function getPageNav(): PageNav | null {
    return current
}

export function subscribePageNav(listener: () => void): () => void {
    listeners.add(listener)
    return () => {
        listeners.delete(listener)
    }
}
