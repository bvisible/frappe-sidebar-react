//// Neoffice — added file (no upstream equivalent): the module card at the top of the sidebar.
//
// The card under the Neoffice logo says which module the reader is in: its logo, its name, « Active module ». A desk
// page that lends its navigation (the webmail) has one, and so does a standalone application the cockpit runs in
// (Drive, LMS, Helpdesk, CRM…) while its own navigation is the one drawn. Without it the card read « Applications /
// Tools » in Drive, where the webmail named itself (Jérémy, 14.10.2026: « il marque pas "Drive" dans la liste
// déroulante en haut à gauche »).

export interface ModuleApp {
    name: string
    title: string
    logo?: string
}

export interface ModuleCard {
    title: string
    logo?: string
    /** The logo is the theme's, drawn in currentColor: the card paints it white on its ink square. */
    mono: boolean
}

/** The card of the module on screen, or null when the sidebar's own switcher stands for it.
 *  `lent`: the page whose navigation is drawn; `surfaceApp` is the standalone application, `onSurface` that it is
 *  the module on screen; `tiles` are the theme's logos of the applications (boot.surface_apps). */
export function moduleCardOf(opts: {
    lent: { app: ModuleApp } | null
    surfaceApp?: ModuleApp
    onSurface: boolean
    tiles: { name: string; logo?: string }[]
}): ModuleCard | null {
    const app = opts.lent ? opts.lent.app : opts.onSurface ? opts.surfaceApp : undefined
    if (!app) return null
    const theme = opts.tiles.find((t) => t.name === app.name)?.logo
    return { title: app.title, logo: theme || app.logo, mono: Boolean(theme) }
}
