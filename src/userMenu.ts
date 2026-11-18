//// Neoffice — added file (no upstream equivalent): what an app adds to the person's menu, from the boot (18.11.2026).
// The menu under the person's name had only the cockpit's own entries, so an app's page for the person (« My mail »,
// frappe_webmail: their mailboxes and their signature, for everyone, administrator or not) needed a release of the
// cockpit for each. The server says it instead, in the boot (`neo_user_menu`: one entry per app, with a label, an icon,
// a count, the script to load and the function to call), and the cockpit only draws and runs it: no business logic here
// (Neoffice/Refonte-Workspaces/08-Architecture-Ce-Qui-Vit-Ou).

export interface UserMenuEntry {
    key: string
    label: string
    icon: string
    badge: number
    script: string | null
    call: string
}

export interface UserMenuBoot {
    neo_user_menu?: unknown
}

// The functions an entry may call: a dotted path of plain names, read from `window` (`frappe_webmail.mail_team.open_mine`)
const CALL = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*$/
// A script of the instance's own assets, never another site's
const SCRIPT = /^\/assets\/[\w./-]+\.js(\?[\w=&.-]*)?$/
// The most entries the menu takes from the apps
const MOST = 6

/** The entries the boot gives that the cockpit can draw and run; anything else is left out. */
export function userMenuEntries(boot: UserMenuBoot | undefined): UserMenuEntry[] {
    const list = boot?.neo_user_menu
    if (!Array.isArray(list)) return []
    const out: UserMenuEntry[] = []
    const keys = new Set<string>()
    for (const raw of list) {
        if (!raw || typeof raw !== 'object') continue
        const e = raw as Record<string, unknown>
        const key = typeof e.key === 'string' ? e.key : ''
        const label = typeof e.label === 'string' ? e.label.trim() : ''
        const call = typeof e.call === 'string' ? e.call : ''
        if (!key || keys.has(key) || !label || !CALL.test(call)) continue
        const script = typeof e.script === 'string' && SCRIPT.test(e.script) && !e.script.includes('..') ? e.script : null
        if (typeof e.script === 'string' && e.script && !script) continue
        const badge = typeof e.badge === 'number' && Number.isFinite(e.badge) && e.badge > 0 ? Math.floor(e.badge) : 0
        keys.add(key)
        out.push({ key, label, icon: typeof e.icon === 'string' ? e.icon : '', badge, script, call })
        if (out.length >= MOST) break
    }
    return out
}

const loaded: Record<string, Promise<void>> = {}

function load(src: string): Promise<void> {
    if (!loaded[src]) {
        loaded[src] = new Promise<void>((resolve, reject) => {
            const el = document.createElement('script')
            el.src = src
            el.onload = () => resolve()
            el.onerror = () => {
                delete loaded[src]
                reject(new Error(src + ' did not load'))
            }
            document.head.appendChild(el)
        })
    }
    return loaded[src]
}

/** The function an entry names, found on `root` (window), or null. */
export function resolveCall(root: unknown, path: string): ((...args: unknown[]) => unknown) | null {
    if (!CALL.test(path)) return null
    let at: unknown = root
    let owner: unknown = null
    for (const part of path.split('.')) {
        if (at == null || (typeof at !== 'object' && typeof at !== 'function')) return null
        // Its own names only: never what every object inherits (`constructor`, `__proto__`)
        if (!Object.prototype.hasOwnProperty.call(at, part)) return null
        owner = at
        at = (at as Record<string, unknown>)[part]
    }
    return typeof at === 'function' ? (at as (...args: unknown[]) => unknown).bind(owner) : null
}

/** Runs an entry: its script first when it has one (once), then its function. */
export function runUserMenuEntry(entry: UserMenuEntry): Promise<void> {
    const go = () => {
        const fn = resolveCall(window, entry.call)
        if (fn) fn()
    }
    return (entry.script ? load(entry.script) : Promise.resolve()).then(go)
}
