//// Neoffice — added file (no upstream equivalent): the navigation a desk page lends the cockpit (Neodesk plan, lot W1).
//
// A desk page with a navigation of its own — the webmail: its mailboxes, its folders and their unread mail — lends
// it to the cockpit instead of drawing a second sidebar beside it (Jérémy, 13.10.2026: « quand on clique sur Webmail,
// ça déploie en sous-menu »). The cockpit draws it under the page's module card, the way it draws a surface app's own
// navigation (contextNav: Drive, the calendar), and drops it when the page gives it back:
//
//   window.NeoCockpit.setPageNav({ app: { name: 'webmail', title: 'Courrier' }, nav: [...sections], footer })
//   window.NeoCockpit.setPageNav(null)
//
// One store for the whole page: the desk mounts the cockpit once, and the pages come and go under it.

import type { NeoCockpitProps } from './NeoCockpit'

export interface PageNav {
    /** The module card above the navigation: the app's name looks its logo up in boot.surface_apps. */
    app: NonNullable<NeoCockpitProps['surfaceApp']>
    nav: NonNullable<NeoCockpitProps['contextNav']>
    footer?: NeoCockpitProps['contextFooter']
}

let current: PageNav | null = null
const listeners = new Set<() => void>()

export function setPageNav(next: PageNav | null): void {
    current = next
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
