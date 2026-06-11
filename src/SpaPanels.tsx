/**
 * SPA companion panels — notifications · synk (Raven) · help.
 *
 * On the desk these features are provided by desk-only modules (native
 * frappe.ui.Notifications, the docked Raven widget, nora's help panel).
 * SPA surfaces (Mint / Raven / Neoconstruction — and tomorrow Drive, LMS,
 * Helpdesk, CRM) don't load any of that, so NeoCockpit ships LIGHT panels
 * that talk to the same whitelisted APIs directly (same origin, session
 * cookies — no extra runtime). One implementation here = every surface
 * that mounts NeoCockpit gets the full rail for free.
 *
 * v1 scope: read-only lists + deep links (no realtime in SPAs — badges
 * poll every 60s and refresh when a panel opens).
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import { ExternalLink, Search } from 'lucide-react'
import { cn } from './utils'

const POLL_MS = 60_000

async function api<T>(method: string, params?: Record<string, string>): Promise<T | null> {
    try {
        const qs = params ? '?' + new URLSearchParams(params).toString() : ''
        const r = await fetch(`/api/method/${method}${qs}`, {
            headers: { 'X-Frappe-Site-Name': window.location.hostname },
            credentials: 'include',
        })
        if (!r.ok) return null
        return ((await r.json()) || {}).message ?? null
    } catch {
        return null
    }
}

const fmtTime = (ts?: string) => {
    if (!ts) return ''
    const d = new Date(ts.replace(' ', 'T'))
    if (isNaN(d.getTime())) return ''
    const today = new Date()
    return d.toDateString() === today.toDateString()
        ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : d.toLocaleDateString([], { day: 'numeric', month: 'short' })
}

// ── notifications ───────────────────────────────────────────────────
interface NotificationLog {
    name: string
    subject?: string
    document_type?: string
    document_name?: string
    from_user?: string
    read?: 0 | 1
    creation?: string
}

export function useUnreadNotifications(enabled: boolean) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!enabled) return
        const load = async () => {
            const res = await api<{ notification_logs?: NotificationLog[] }>(
                'frappe.desk.doctype.notification_log.notification_log.get_notification_logs',
                { limit: '20' }
            )
            setCount((res?.notification_logs || []).filter(l => !l.read).length)
        }
        load()
        const id = setInterval(load, POLL_MS)
        return () => clearInterval(id)
    }, [enabled])
    return count
}

export function NotificationsPanel({ tr, onClose }: { tr: (s: string) => string; onClose: () => void }) {
    const [logs, setLogs] = useState<NotificationLog[] | null>(null)
    useEffect(() => {
        api<{ notification_logs?: NotificationLog[] }>(
            'frappe.desk.doctype.notification_log.notification_log.get_notification_logs',
            { limit: '20' }
        ).then(res => setLogs(res?.notification_logs || []))
    }, [])
    return (
        <div className="nc-spa-panel">
            <div className="head">
                <span className="t">{tr('Notifications')}</span>
                <a className="open" href="/app/notification-log" title={tr('Open')}><ExternalLink size={14} /></a>
                <button className="x" onClick={onClose}>&times;</button>
            </div>
            <div className="body">
                {logs === null && <div className="empty">…</div>}
                {logs !== null && !logs.length && <div className="empty">{tr('No notifications')}</div>}
                {(logs || []).map(l => (
                    <a key={l.name}
                        className={cn('row', !l.read && 'unread')}
                        href={l.document_type && l.document_name
                            ? `/app/${l.document_type.toLowerCase().replace(/ /g, '-')}/${encodeURIComponent(l.document_name)}`
                            : '/app/notification-log'}>
                        <span className="dot" />
                        <span className="main">
                            {/* subject is server-rendered trusted HTML (same as the desk panel) */}
                            <span className="s" dangerouslySetInnerHTML={{ __html: l.subject || '' }} />
                            <span className="m">{fmtTime(l.creation)}</span>
                        </span>
                    </a>
                ))}
            </div>
        </div>
    )
}

// ── synk (Raven) ────────────────────────────────────────────────────
interface RavenChannel {
    name: string
    channel_name?: string
    is_direct_message?: 0 | 1
    peer_user_id?: string
    last_message_details?: { content?: string; owner?: string } | string
    last_message_timestamp?: string
}

export function useUnreadSynk(enabled: boolean) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!enabled) return
        const load = async () => {
            const res = await api<{ name: string; unread_count: number }[]>(
                'raven.api.raven_message.get_unread_count_for_channels'
            )
            setCount((res || []).reduce((a, c) => a + (c.unread_count || 0), 0))
        }
        load()
        const id = setInterval(load, POLL_MS)
        return () => clearInterval(id)
    }, [enabled])
    return count
}

export function SynkPanel({ tr, userInfo, onClose }: {
    tr: (s: string) => string
    userInfo: Record<string, { fullname?: string }>
    onClose: () => void
}) {
    const [channels, setChannels] = useState<RavenChannel[] | null>(null)
    const [dms, setDms] = useState<RavenChannel[]>([])
    const [unread, setUnread] = useState<Record<string, number>>({})
    useEffect(() => {
        api<{ channels?: RavenChannel[]; dm_channels?: RavenChannel[] }>(
            'raven.api.raven_channel.get_all_channels', { hide_archived: '1' }
        ).then(res => {
            setChannels(res?.channels || [])
            setDms(res?.dm_channels || [])
        })
        api<{ name: string; unread_count: number }[]>(
            'raven.api.raven_message.get_unread_count_for_channels'
        ).then(res => {
            const map: Record<string, number> = {}
            for (const c of res || []) map[c.name] = c.unread_count
            setUnread(map)
        })
    }, [])
    const last = (c: RavenChannel) => {
        const d = c.last_message_details
        if (!d) return ''
        try {
            const o = typeof d === 'string' ? JSON.parse(d) : d
            return String(o.content || '').replace(/<[^>]+>/g, '').slice(0, 60)
        } catch { return '' }
    }
    const row = (c: RavenChannel, label: string, avatar: React.ReactNode) => (
        <a key={c.name} className="row" href={`/raven/channel/${encodeURIComponent(c.name)}`}>
            {avatar}
            <span className="main">
                <span className="s">{label}</span>
                {last(c) && <span className="m">{last(c)}</span>}
            </span>
            {unread[c.name] ? <span className="badge">{unread[c.name]}</span> : null}
        </a>
    )
    return (
        <div className="nc-spa-panel">
            <div className="head">
                <span className="t" style={{ fontFamily: '"Cal Sans", inherit' }}>synk</span>
                <a className="open" href="/raven" title={tr('Open')}><ExternalLink size={14} /></a>
                <button className="x" onClick={onClose}>&times;</button>
            </div>
            <div className="body">
                {channels === null && <div className="empty">…</div>}
                {channels !== null && (
                    <>
                        {channels.length > 0 && <div className="sect">{tr('Channels')}</div>}
                        {channels.map(c => row(c, c.channel_name || c.name,
                            <span className="av sq">#</span>))}
                        {dms.length > 0 && <div className="sect">{tr('Direct messages')}</div>}
                        {dms.map(c => {
                            const peer = c.peer_user_id || ''
                            const name = userInfo[peer]?.fullname || peer || c.channel_name || ''
                            return row(c, name,
                                <span className="av">{(name[0] || '?').toUpperCase()}</span>)
                        })}
                        {!channels.length && !dms.length && <div className="empty">{tr('No conversations')}</div>}
                    </>
                )}
            </div>
        </div>
    )
}

// ── help (shared wiki) ──────────────────────────────────────────────
interface WikiDoc { name: string; title?: string; url?: string; route?: string }

export function HelpPanel({ tr, wikiUrl, onClose }: { tr: (s: string) => string; wikiUrl: string; onClose: () => void }) {
    const [results, setResults] = useState<WikiDoc[] | null>(null)
    const timer = useRef<ReturnType<typeof setTimeout>>()
    const search = useCallback((q: string) => {
        clearTimeout(timer.current)
        if (!q || q.length < 2) { setResults(null); return }
        timer.current = setTimeout(async () => {
            const res = await api<WikiDoc[]>('neoffice_theme.api.search_docs', { query: q, limit: '6' })
            setResults(res || [])
        }, 300)
    }, [])
    return (
        <div className="nc-spa-panel">
            <div className="head">
                <span className="t">{tr('Help & Training')}</span>
                <button className="x" onClick={onClose}>&times;</button>
            </div>
            <div className="body">
                <div className="searchbox">
                    <Search size={15} strokeWidth={1.8} />
                    <input placeholder={tr('Search the wiki...')} onChange={e => search(e.target.value)} autoFocus />
                </div>
                {results !== null && !results.length && <div className="empty">{tr('No wiki page found')}</div>}
                {(results || []).map(r => (
                    <a key={r.name} className="row" href={r.url || wikiUrl} target="_blank" rel="noopener">
                        <span className="main"><span className="s link">{r.title || r.name}</span></span>
                        <ExternalLink size={13} className="arr" />
                    </a>
                ))}
            </div>
            <div className="foot">
                <a className="wiki" href={wikiUrl} target="_blank" rel="noopener">
                    <ExternalLink size={14} /> {tr('Open the Neoffice wiki')}
                </a>
            </div>
        </div>
    )
}
