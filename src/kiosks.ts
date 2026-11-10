//// Neoffice — added file (no upstream equivalent): who the cockpit offers « Bornes » to (maintenance#896).
// The kiosks are managed by the customer's admin identity and by Administrator: that is the server's rule
// (neoffice_theme mobile._can_manage_bornes), carried to the cockpit by the boot (`neoffice_can_manage_bornes`, set by
// neoffice_theme access_refusal.can_manage_bornes). The cockpit used to read the role Admin, which the fiduciary holds
// too, and the page opened to System Manager only: the one account the kiosks belong to was shown a door that refused it.

export interface KioskBoot {
    neoffice_can_manage_bornes?: boolean
    user?: { roles?: string[] }
}

/** Whether the cockpit offers « Bornes ». A boot without the flag (a theme older than the cockpit) keeps the old reading. */
export function canManageKiosks(boot: KioskBoot | undefined): boolean {
    if (typeof boot?.neoffice_can_manage_bornes === 'boolean') return boot.neoffice_can_manage_bornes
    return Boolean(boot?.user?.roles?.some(r => r === 'System Manager' || r === 'Administrator' || r === 'Admin'))
}
