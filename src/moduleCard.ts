//// Neoffice — added file (no upstream equivalent): the module card at the top of the sidebar.
//
// The card under the Neoffice logo says which module the reader is in: its logo, its name, « Active module ». A desk
// page that lends its navigation (the webmail) has one, and so does a standalone application the cockpit runs in
// (Drive, LMS, Helpdesk, CRM…) while its own navigation is drawn, and one the cockpit runs in without being its
// surface (Synk: Raven passes `tabApp`). Without it the card read « Applications / Tools » in Drive, where the
// webmail named itself (Jérémy, 14.10.2026: « il marque pas "Drive" dans la liste déroulante en haut à gauche »).
//
// The name is the theme's (the tile of the switcher, translated for the reader) before the application's own: the
// card said « Calendar » and « Learning » in a French desk, where the list under it said « Calendrier » and
// « Formation » (15.10).

export interface ModuleApp {
    name: string
    title: string
    logo?: string
}

export interface ModuleTile {
    name: string
    title?: string
    logo?: string
}

export interface ModuleCard {
    /** The application's name: the one the switcher's list marks as the module on screen. */
    name: string
    title: string
    logo?: string
    /** The logo is the theme's, drawn in currentColor: the card paints it white on its ink square. */
    mono: boolean
}

/** The card of the module on screen, or null when the sidebar's own switcher stands for it.
 *  `lent`: the page whose navigation is drawn. `surfaceApp` is the standalone application and `currentApp` the module
 *  the cockpit has pinned: the application is on screen when they are the same. `tabApp` names an application the
 *  cockpit runs in without being its surface. `tiles` are the theme's applications (boot.surface_apps). */
export function moduleCardOf(opts: {
    lent: { app: ModuleApp } | null
    surfaceApp?: ModuleApp
    currentApp?: string
    tabApp?: string
    tiles: ModuleTile[]
}): ModuleCard | null {
    const tile = (name: string) => opts.tiles.find((t) => t.name === name)
    let app: ModuleApp | undefined
    if (opts.lent) {
        app = opts.lent.app
    } else if (opts.surfaceApp) {
        if (opts.currentApp === opts.surfaceApp.name) app = opts.surfaceApp
    } else if (opts.tabApp) {
        const named = tile(opts.tabApp)
        if (named) app = { name: named.name, title: named.title || named.name, logo: named.logo }
    }
    if (!app) return null
    const own = tile(app.name)
    return { name: app.name, title: (own && own.title) || app.title, logo: (own && own.logo) || app.logo, mono: Boolean(own && own.logo) }
}
