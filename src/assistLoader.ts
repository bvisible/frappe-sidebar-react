//// Neoffice — added file (no upstream equivalent). Remote assistance away from the desk (Obsidian
//// Neoffice/Assistance-A-Distance/14): on the standalone apps (Drive, Helpdesk, LMS…) the cockpit loads the theme's
//// client, which the desk loads itself. The cockpit decides nothing: whether assistance is set up here and which
//// script to load come from the boot (neoffice_theme.assist.extend_bootinfo, through get_cockpit_boot).

export interface NeoAssist {
    open_request?: () => void
    /** Draws « Demander de l'aide » in `container`; returns what removes it. */
    render_help_entry: (container: HTMLElement) => () => void
    available?: () => boolean
}

interface AssistConfig {
    enabled?: boolean
    script?: unknown
}

interface AssistWindow {
    frappe?: { boot?: { neo_assist?: AssistConfig | null; user?: { name?: string; portal?: boolean } } }
    fetch?: (url: string, init?: object) => Promise<{ ok: boolean; json: () => Promise<{ message?: unknown }> }>
    neo_assist?: NeoAssist
    neoAssistLoading?: Promise<NeoAssist | null>
    document: {
        createElement: (tag: 'script') => { src: string; onload: null | (() => void); onerror: null | (() => void) }
        head: { appendChild: (element: never) => unknown }
    }
}

// The theme's own client, served by this site: the boot never makes the cockpit load anything else.
const CLIENT = /^\/assets\/neoffice_theme\/js\/assist_client\.js(\?v=[\w.-]+)?$/

export function assistScript(win: AssistWindow): string | null {
    const conf = win.frappe?.boot?.neo_assist
    if (!conf || !conf.enabled || typeof conf.script !== 'string') return null
    return CLIENT.test(conf.script) ? conf.script : null
}

// Asked when the boot says nothing: Raven and mint build a curated boot without the boot hooks (03.10).
const CONFIG = '/api/method/neoffice_theme.assist.client_config'

async function askConfig(win: AssistWindow): Promise<void> {
    let conf: AssistConfig | null = null
    try {
        const response = await win.fetch!(CONFIG, { credentials: 'same-origin', headers: { Accept: 'application/json' } })
        const message = response.ok ? (await response.json()).message : null
        if (message && typeof message === 'object') conf = message as AssistConfig
    } catch {
        // no assistance on this page
    }
    // null rather than nothing: the page does not ask again.
    win.frappe = win.frappe || {}
    win.frappe.boot = win.frappe.boot || {}
    win.frappe.boot.neo_assist = conf
}

/** The client, loaded once per page; null where assistance is not set up or the script did not load. */
export function loadAssist(win: AssistWindow = window as unknown as AssistWindow): Promise<NeoAssist | null> {
    if (win.neo_assist) return Promise.resolve(win.neo_assist)
    if (win.neoAssistLoading) return win.neoAssistLoading
    const user = win.frappe?.boot?.user
    // The boot names a visitor or a portal customer (cockpit_boot): assistance is for the desk users only.
    const desk = !user || (user.name !== 'Guest' && !user.portal)
    if (win.frappe?.boot?.neo_assist === undefined && win.fetch && desk) {
        win.neoAssistLoading = askConfig(win).then(() => {
            win.neoAssistLoading = undefined
            return loadScript(win)
        })
        return win.neoAssistLoading
    }
    return loadScript(win)
}

function loadScript(win: AssistWindow): Promise<NeoAssist | null> {
    const src = assistScript(win)
    if (!src) return Promise.resolve(null)
    win.neoAssistLoading = new Promise((resolve) => {
        const script = win.document.createElement('script')
        script.src = src
        script.onload = () => resolve(win.neo_assist || null)
        script.onerror = () => {
            win.neoAssistLoading = undefined
            resolve(null)
        }
        win.document.head.appendChild(script as never)
    })
    return win.neoAssistLoading
}
