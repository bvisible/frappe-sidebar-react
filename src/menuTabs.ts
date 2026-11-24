//// Neoffice — added file (no upstream equivalent): the tabs of a space listed under its entry of the menu (Jérémy, 24.11.2026).
// Off by default: a space's tabs are above its page, and its entry opens it. A person may have them in the menu instead, or in
// both (« Display », the « Tabs » row). neoffice_theme owns the choice and the lists (public/js/menu_tabs.js, read from the
// same function as the bar); the cockpit draws them, and says which entries unfold in the menu on screen, so that the bar only
// leaves a page whose tabs the menu shows.

export type TabsPlace = 'top' | 'menu' | 'both'

/** One tab of a space, as its bar shows it. */
export interface MenuTab {
    key: string
    label: string
    /** Its number, written as the bar writes it; empty for none. */
    count?: string
    tone?: string
    active?: boolean
    isNew?: boolean
    /** Why it is closed to the reader; empty when it opens. */
    closed?: string
    /** Its address, for a new browser tab; empty when it has none of its own. */
    href?: string
}

/** The tabs of the space of a menu entry. */
export interface MenuTabs { entry: string; space: string; items: MenuTab[] }

export interface MenuTabsApi {
    now: () => TabsPlace
    set: (place: TabsPlace) => void
    of: (entry: string) => Promise<MenuTabs | null>
    go: (space: string, key: string) => boolean
    here: () => MenuTabs | null
    drawn: (entries: string[]) => void
}

const MEMBERS = ['now', 'set', 'of', 'go', 'here', 'drawn'] as const

/** The theme's side, or null with an older theme (and outside the desk): every member is checked, the cockpit ships with the
 *  desk and runs beside a theme older than itself. */
export function menuTabsApi(win: unknown): MenuTabsApi | null {
    const api = (win as { neoffice_tabs?: MenuTabsApi } | undefined)?.neoffice_tabs
    return api && MEMBERS.every((k) => typeof api[k] === 'function') ? api : null
}

/** The list of an entry: what the page on screen says when it is in that space (its tab is lit), else what was read for it, where
 *  no tab is lit. */
export function tabsOf(entry: string, here: MenuTabs | null, read: Record<string, MenuTabs>): MenuTabs | null {
    if (here && here.entry === entry) return here
    const known = read[entry]
    return known ? { ...known, items: known.items.map((it) => (it.active ? { ...it, active: false } : it)) } : null
}

/** The entries whose tabs the menu on screen can unfold: none while the menu is folded, a phone's drawer, or shows an
 *  application's own navigation. */
export function unfoldable(input: { place: TabsPlace; menuOpen: boolean; phone: boolean; ownNav: boolean; entries: string[] }): string[] {
    return input.place === 'top' || !input.menuOpen || input.phone || input.ownNav ? [] : input.entries
}
