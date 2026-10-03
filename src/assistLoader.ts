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

interface AssistWindow {
    frappe?: { boot?: { neo_assist?: { enabled?: boolean; script?: unknown } } }
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

/** The client, loaded once per page; null where assistance is not set up or the script did not load. */
export function loadAssist(win: AssistWindow = window as unknown as AssistWindow): Promise<NeoAssist | null> {
    if (win.neo_assist) return Promise.resolve(win.neo_assist)
    if (win.neoAssistLoading) return win.neoAssistLoading
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
