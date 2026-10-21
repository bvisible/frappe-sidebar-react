//// Neoffice — added file (no upstream equivalent): the sidebar's entries are links, and the applications' rail.
//
// The logo was a <span> with a click handler and every entry a <button>: the browser saw no link, so a right-click
// offered no « Open in a new tab », and ⌘-click and the middle button did nothing (Jérémy, 21.10.2026: « j'aimerais
// bien pouvoir faire un clic droit sur l'icône Neoffice pour ouvrir dans un nouvel onglet »). An entry is now an
// <a href> to its page: a plain click still moves inside the page as before (the desk's router, no reload), any other
// click is the browser's.

/** The parts of a click this rule reads: a mouse event, or a test's plain object. */
export interface ClickLike {
    button?: number
    metaKey?: boolean
    ctrlKey?: boolean
    shiftKey?: boolean
    altKey?: boolean
    defaultPrevented?: boolean
}

/** Whether a click on a link is the page's to handle: the main button, no modifier key, nobody handled it yet.
 *  ⌘ / Ctrl (new tab), Shift (new window), Alt (download) and the middle button are the browser's. */
export function plainClick(e: ClickLike): boolean {
    return !e.defaultPrevented && (e.button ?? 0) === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
}

/** An application of the rail, as the boot's surface_apps names it. */
export interface RailTile {
    name: string
    title: string
    route?: string
    logo?: string
    description?: string
}

/** The rail's applications: those the boot lists with a page to open, and the one on screen even when the reader's
 *  menu hides it - it is where they are, marked, until they leave it (« Customize the menu » hides a display, never
 *  the page one stands on). */
export function railTiles(tiles: RailTile[], onScreen?: { name: string; title?: string; logo?: string } | null): RailTile[] {
    const shown = tiles.filter(t => t.route)
    if (!onScreen || shown.some(t => t.name === onScreen.name)) return shown
    return [...shown, { name: onScreen.name, title: onScreen.title || onScreen.name, logo: onScreen.logo }]
}
