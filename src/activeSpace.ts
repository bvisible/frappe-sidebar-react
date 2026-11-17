//// Neoffice — added file (no upstream equivalent): which space of the sidebar a page lights (maintenance#2813).
// A page lights the space it is in, read from the page itself, and never the space of the page before. « Bornes »
// (Paramètres › Bornes) and « Comptes annuels » (Finance › Comptes annuels) lit « Commercial », the space the menu kept
// from the page before: the theme's tab bar named no space for them, no workspace of theirs is a route of the menu, and
// their module (Neoffice Theme) is shared by many spaces, so nothing was found and the menu fell back on the space it
// kept. The rule is in one place, kept out of the component so that it can be tested alone.

/** What the cockpit knows of the page in front, to choose the space it lights. */
export interface ActiveSpaceInput {
    /** Two levels of navigation (the sidebar lists the spaces): otherwise only a workspace route lights its space. */
    twoLevels: boolean
    /** « Mon espace » is the page: no space lights up beside it. */
    mySpaceActive: boolean
    /** The space the theme's tab bar publishes for the page (`neo_space_change`); null when it publishes none. */
    tabSpace: string | null
    /** The space one of whose workspaces the route opens. */
    byRoute?: string
    /** The space found for THIS route (`spaceOfPage`), null when none: never the space kept from the page before. */
    routeSpace: string | null
    /** Whether the sidebar lists this space for the reader. */
    listed: (name: string) => boolean
}

/** The space the sidebar lights for the page in front, or none. */
export function activeSpace(input: ActiveSpaceInput): string | undefined {
    if (!input.twoLevels) return input.byRoute
    if (input.mySpaceActive) return undefined
    if (input.tabSpace) return input.listed(input.tabSpace) ? input.tabSpace : input.byRoute
    if (input.byRoute) return input.byRoute
    return input.routeSpace && input.listed(input.routeSpace) ? input.routeSpace : undefined
}

/** The space a page belongs to when the tab bar names none, in this order:
 *  - the space of the workspace its route opens;
 *  - for a desk page (not a list, a form or a tree), the space of the workspace its breadcrumb declares: the breadcrumb
 *    the reader sees above the page, which frappe keeps in `frappe.breadcrumbs.all`;
 *  - the space of its module (`appOfModule`);
 *  - none. */
export function spaceOfPage(input: {
    isDoctypeRoute: boolean
    workspaceSpace?: string | null
    breadcrumbSpace?: string | null
    moduleSpace?: string | null
}): string | null {
    if (input.workspaceSpace) return input.workspaceSpace
    if (!input.isDoctypeRoute && input.breadcrumbSpace) return input.breadcrumbSpace
    return input.moduleSpace || null
}

/** The workspace the breadcrumb of the page in front declares (« Setup » for « Paramètres › Bornes »), if any. */
export function breadcrumbWorkspace(frappe: unknown): string | null {
    const crumbs = (frappe as { breadcrumbs?: { all?: Record<string, { workspace?: unknown } | undefined>; current_page?: () => string } } | undefined)
        ?.breadcrumbs
    if (!crumbs || typeof crumbs.current_page !== 'function') return null
    let page: string
    try {
        page = crumbs.current_page()
    } catch {
        return null
    }
    const workspace = crumbs.all?.[page]?.workspace
    return typeof workspace === 'string' && workspace ? workspace : null
}
