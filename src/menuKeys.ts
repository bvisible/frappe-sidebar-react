//// Neoffice — added file (no upstream equivalent). The keyboard rule of the dropdown menus of the cockpit (maintenance#1622).

/** Escape closes a dropdown menu that is open. With none open the key belongs to someone else (a dialog, a field): leave it alone. */
export function closesOnEscape(key: string, aMenuIsOpen: boolean): boolean {
    return key === 'Escape' && aMenuIsOpen
}
