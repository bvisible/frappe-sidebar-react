//// Neoffice — added file (no upstream equivalent): whether the cockpit offers « View Website » (maintenance#2592).
// An instance of the entry offer (Neoffice Go) has no website: the server closes its pages and says so in the boot
// (`neoffice_has_website: false`, set by neoffice_theme offer_gate.extend_bootinfo). The menu offered the entry anyway,
// and the customer clicked a door the server refused.

export interface WebsiteBoot {
    neoffice_has_website?: boolean
}

/** Whether the cockpit offers « View Website ». A boot without the flag (every instance with a website, and a theme
 *  older than the cockpit) keeps the entry. */
export function hasWebsite(boot: WebsiteBoot | undefined): boolean {
    return boot?.neoffice_has_website !== false
}
