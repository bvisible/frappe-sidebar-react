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

//// Neoffice — a row of icons and the search box, lent with the navigation (21.10.2026). Jérémy, seeing NeoMail in the
//// desk with its folders in the sidebar: its four views (Mail, Calendar, People, Notes) as icons side by side, in a
//// row that stays in sight just above the « Interface » block, and the sidebar's search box searching in NeoMail while
//// its navigation is shown. The contract: neoffice-apps docs/neomail-desk-menu-contract.md, section 4.

/** One icon of the row a page lends (`PageNav.dock`). */
export interface PageNavDockItem {
    id: string
    /** Its name: the tip over the icon and what a screen reader says. */
    title: string
    /** A lucide icon's name without the `lucide-` prefix (`mail`); a name that carries the prefix is taken too. */
    icon: string
    active?: boolean
    badge?: string | number
    onClick: () => void
}

/** The search a page lends (`PageNav.search`): while its navigation is shown, the sidebar's search box is the page's. */
export interface PageNavSearch {
    /** Shown in the empty box; the cockpit's own « Search… » when left out. */
    placeholder?: string
    /** Called as the person types (after a short pause), at once on Enter, with '' on Escape or when the box is
     *  emptied. */
    onQuery: (query: string) => void
}

export interface PageNav {
    /** The module card above the navigation: the app's name looks its logo up in boot.surface_apps. */
    app: NonNullable<NeoCockpitProps['surfaceApp']>
    nav: NonNullable<NeoCockpitProps['contextNav']>
    footer?: NeoCockpitProps['contextFooter']
    /** The address of the lending page (`/app/webmail`), the one the navigation belongs to. Left out, it is the address
     *  where this page first lent its navigation - what a page that does not name itself would have lent it at. */
    route?: string
    //// Neoffice — the row of icons and the search box (21.10.2026, see above): both optional, a page that sets
    //// neither is drawn as before.
    /** A row of icons side by side, drawn just above the « Interface » block, outside the scrolling navigation
     *  (folded sidebar: the same icons stacked). Only while this navigation is shown. */
    dock?: PageNavDockItem[]
    /** While this navigation is shown, the cockpit's search box is the page's. */
    search?: PageNavSearch
}

//// Neoffice — what this cockpit understands of a lent navigation beyond app, nav, footer and route (21.10.2026): a
//// page reads `window.NeoCockpit.pageNavFeatures` and falls back (its views as items of the navigation, the desk's
//// search) on an older bundle, which has no such list.
export const pageNavFeatures: readonly string[] = Object.freeze(['dock', 'search'])

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

//// Neoffice — the lent navigation the cockpit draws, and with it its row of icons and its search box (21.10.2026):
//// on the desk only, and only while the reader is on the page that lent it. The page's app goes on publishing from
//// the background (see the head of this file): its icons must not stay above « Interface », nor its search box hold
//// the desk's, under another page.
export function shownPageNav(nav: PageNav | null, here: string, onDesk: boolean): PageNav | null {
    return onDesk && nav && lendsOn(nav.route, here) ? nav : null
}

/** The icons of a shown navigation's row, or null for no row: an icon without a name, an icon or an action is left
 *  out, and a name given with the `lucide-` prefix loses it. */
export function dockOf(nav: PageNav | null): PageNavDockItem[] | null {
    if (!nav || !Array.isArray(nav.dock)) return null
    const items = nav.dock
        .filter((it) => it && typeof it.onClick === 'function' && it.id && it.title && typeof it.icon === 'string' && it.icon)
        .map((it) => (it.icon.startsWith('lucide-') ? { ...it, icon: it.icon.slice(7) } : it))
    return items.length ? items : null
}

/** The search of a shown navigation, or null when the box stays the desk's. */
export function searchOf(nav: PageNav | null): PageNavSearch | null {
    return nav && nav.search && typeof nav.search.onQuery === 'function' ? nav.search : null
}

/** What the box hands the page as the person types: `input` on every change, `enter`, `escape`; `dispose` drops what is
 *  waiting for the pause, when the box stops being the page's (or the page leaves the screen); `heard` is the query the
 *  page was last given. */
export interface QueryRelay {
    input(query: string): void
    enter(query: string): void
    escape(): void
    dispose(): void
    heard(): string
}

//// Neoffice — the page hears the query after a pause in the typing, at once on Enter, and '' at once when the box is
//// emptied or on Escape (21.10.2026). It is not told twice in a row that there is nothing to search: NeoMail's `search`
//// command brings Mail in front, and an Escape in an empty box while Calendar is shown must leave it there. Enter on a
//// query is always passed on: the person asks for the search again. A page whose `onQuery` throws is reported in the
//// console and the box goes on (an error thrown from the pause's timer would be nobody's). `send` answers `false` when
//// there was nobody to tell (the page is no longer on screen): the page has not heard that query.
export function createQueryRelay(send: (query: string) => boolean | void, delay = 250): QueryRelay {
    let sent = ''
    let timer: ReturnType<typeof setTimeout> | null = null
    const stop = () => {
        if (timer !== null) clearTimeout(timer)
        timer = null
    }
    const pass = (query: string) => {
        let heard = true
        try {
            heard = send(query) !== false
        } catch (error) {
            console.error('NeoCockpit: the search of the page failed', error)
        }
        if (heard) sent = query
    }
    return {
        input(query) {
            stop()
            if (!query) {
                if (sent) pass('')
                return
            }
            timer = setTimeout(() => {
                timer = null
                if (query !== sent) pass(query)
            }, delay)
        },
        enter(query) {
            stop()
            if (query || sent) pass(query)
        },
        escape() {
            stop()
            if (sent) pass('')
        },
        dispose: stop,
        heard: () => sent,
    }
}

export function setPageNav(next: PageNav | null): void {
    if (next && !next.route) {
        //// Same page lending again (a refresh from its background): it keeps the address it first lent at.
        //// Neoffice — a navigation lent without its `app` is not the same page, and does not throw (21.10.2026).
        const same = current && current.app && next.app && current.app.name === next.app.name ? current.route : undefined
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
