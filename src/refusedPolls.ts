//// Neoffice — added file (no upstream equivalent): a poll the server refuses stops until the page is reloaded (maintenance#1424).
//
// The cockpit polls the server every minute (notifications, Synk's unread count, the day's events and reminders, the
// numbers beside the spaces). A page left open after its session ended was refused every minute, for ever: four 403 a
// minute from a single desk in the hub's access log (11.10), and a portal page, whose user may read none of it, did
// the same. A refusal - 401 or 403 - now stops THAT poll until the page is loaded again, after a login for instance.
// A server error or a lost network stops nothing: the next minute has its chance.

export interface PollResponse {
    ok: boolean
    status: number
    json(): Promise<unknown>
}

/** The server says no: the session is over, or this user may not read this. Asking again changes nothing. */
export function isRefusal(status: number): boolean {
    return status === 401 || status === 403
}

/** What makes a poll one poll. get_list is asked about a doctype: two doctypes are two polls. */
export function pollKey(method: string, params?: Record<string, string>): string {
    return params?.doctype ? `${method}|${params.doctype}` : method
}

/** The polls refused since the page was loaded. */
export class RefusedPolls {
    private readonly refused = new Set<string>()

    allows(key: string): boolean {
        return !this.refused.has(key)
    }

    refuse(key: string): void {
        this.refused.add(key)
    }
}

/** One ledger for the whole page: every poll of the cockpit reads and writes it. */
export const refusedPolls = new RefusedPolls()

/** A GET of /api/method/<method>: its `message`, or null - for a failure, and for a poll already refused (no request). */
export async function guardedGet<T>(
    ledger: RefusedPolls,
    method: string,
    params: Record<string, string> | undefined,
    doFetch: (url: string) => Promise<PollResponse>,
): Promise<T | null> {
    const key = pollKey(method, params)
    if (!ledger.allows(key)) return null
    try {
        const qs = params ? '?' + new URLSearchParams(params).toString() : ''
        const r = await doFetch(`/api/method/${method}${qs}`)
        if (isRefusal(r.status)) ledger.refuse(key)
        if (!r.ok) return null
        return (((await r.json()) as { message?: T }) || {}).message ?? null
    } catch {
        return null
    }
}
