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

//// Neoffice — the dock at the foot of the unfolded menu (Jérémy, 19.11.2026, canvas « Barre Neoffice plus légère », B5:
//// « 4 icônes visibles par défaut et les autres dans trois petits points, mais pouvoir les épingler aussi », then « messagerie
//// aussi »). The applications the reader pinned stand in one row, the others behind « ⋯ ». Who never chose gets the first five
//// of the rail's order (the theme sends the tiles in that order: E-mail, Calendar, Drive, Meet, the company's chat). Six at
//// most, so that the row stays a row.

/** How many applications the dock shows to who never chose. */
export const DOCK_DEFAULT = 5
/** How many applications one may pin in the dock. */
export const DOCK_MAX = 6

/** The dock: the pinned applications in the reader's order, the others for « ⋯ », and the one on screen when it is not
 *  pinned (lit at the end of the row while the reader is in it, as the rail kept it). */
export interface Dock {
    pinned: RailTile[]
    others: RailTile[]
    extra: RailTile | null
}

/** The dock from the boot's tiles and the reader's pins (`null`: never chose). A pin of an application the reader's menu no
 *  longer shows - hidden since by the company, or gone - drops out; a repeated one counts once. */
export function dockTiles(tiles: RailTile[], pins: string[] | null | undefined,
    onScreen?: { name: string; title?: string; logo?: string } | null): Dock {
    const shown = tiles.filter(t => t.route)
    const byName = new Map(shown.map(t => [t.name, t] as const))
    const wanted = Array.isArray(pins) ? pins : shown.slice(0, DOCK_DEFAULT).map(t => t.name)
    const pinned: RailTile[] = []
    for (const name of wanted) {
        const tile = byName.get(name)
        if (tile && !pinned.includes(tile) && pinned.length < DOCK_MAX) pinned.push(tile)
    }
    const others = shown.filter(t => !pinned.includes(t))
    let extra: RailTile | null = null
    if (onScreen && !pinned.some(t => t.name === onScreen.name)) {
        extra = byName.get(onScreen.name) || { name: onScreen.name, title: onScreen.title || onScreen.name, logo: onScreen.logo }
    }
    return { pinned, others, extra }
}

/** The rows of « ⋯ » while it is open: in the order they had when it opened (`opened`, the names of each section then), so a
 *  row never slides under the pointer when a pin moves an application (maintenance#3145: a double click unpinned two, the
 *  second click landing on the row that slid up). Each row's pin says the live state; the sections are sorted again at the
 *  next opening. An application the menu no longer shows drops out, one it shows since comes at the end of the others. */
export function pinRows(dock: Dock, opened: { pinned: string[]; others: string[] } | null): { pinned: RailTile[]; others: RailTile[] } {
    if (!opened) return { pinned: dock.pinned, others: dock.others }
    const all = [...dock.pinned, ...dock.others]
    const byName = new Map(all.map(t => [t.name, t] as const))
    const pick = (names: string[]) => names.map(n => byName.get(n)).filter((t): t is RailTile => Boolean(t))
    const known = new Set([...opened.pinned, ...opened.others])
    return { pinned: pick(opened.pinned), others: [...pick(opened.others), ...all.filter(t => !known.has(t.name))] }
}

/** The pins after a click on an application's pin: unpinned if it was pinned, pinned at the end if there is room, `null`
 *  when the dock is full (the pin is then refused, and says why). */
export function nextPins(pinned: string[], name: string, max = DOCK_MAX): string[] | null {
    if (pinned.includes(name)) return pinned.filter(n => n !== name)
    if (pinned.length >= max) return null
    return [...pinned, name]
}
