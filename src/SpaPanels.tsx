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
                            // mini-boots may lack user_info — prettify the email local part
                            const pretty = peer.split('@')[0].replace(/[._-]+/g, ' ')
                                .replace(/\b\w/g, ch => ch.toUpperCase())
                            const name = userInfo[peer]?.fullname || pretty || c.channel_name || ''
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

// ── mail (synk + webmail behind one envelope) ───────────────────────
interface WebmailAccount { name: string; email_address?: string; email?: string }
interface WebmailEmail {
    uid: number
    subject?: string
    from_name?: string
    from_email?: string
    date?: string
    seen?: boolean
}

/** Envelope click → tiny chooser: team chat (synk) or inbox (webmail).
 *  Webmail entry adapts: hidden when the app is absent, CTA when no
 *  account is configured. */
export function MailMenu({ tr, onSynk, onMail, onConfigure, onClose }: {
    tr: (s: string) => string
    onSynk: (() => void) | null
    onMail: () => void
    onConfigure: () => void
    onClose: () => void
}) {
    // 'loading' → probe; 'ready' (accounts) | 'none' (no account) | 'absent' (app missing)
    const [mailState, setMailState] = useState<'loading' | 'ready' | 'none' | 'absent'>('loading')
    const [synkCount, setSynkCount] = useState(0)
    const [mailCount, setMailCount] = useState(0)
    useEffect(() => {
        if (onSynk) {
            api<{ name: string; unread_count: number }[]>(
                'raven.api.raven_message.get_unread_count_for_channels'
            ).then(res => setSynkCount((res || []).reduce((a, c) => a + (c.unread_count || 0), 0)))
        }
        api<WebmailAccount[]>('frappe_webmail.webmail_api.get_accounts').then(accounts => {
            if (accounts === null) { setMailState('absent'); return }
            if (!accounts.length) { setMailState('none'); return }
            setMailState('ready')
            api<{ emails?: WebmailEmail[] }>('frappe_webmail.webmail_api.get_emails', {
                account_name: accounts[0].name, folder: 'INBOX', limit: '20',
            }).then(res => setMailCount((res?.emails || []).filter(e => !e.seen).length))
        })
    }, [onSynk])
    return (
        <div className="nc-spa-panel nc-mini">
            <div className="head">
                <span className="t">{tr('Messages')}</span>
                <button className="x" onClick={onClose}>&times;</button>
            </div>
            <div className="body">
                {onSynk && (
                    <button className="row" onClick={onSynk}>
                        <span className="av sq">#</span>
                        <span className="main">
                            <span className="s" style={{ fontFamily: '"Cal Sans", inherit' }}>synk</span>
                            <span className="m">{tr('Team messaging')}</span>
                        </span>
                        {synkCount > 0 && <span className="badge">{synkCount}</span>}
                    </button>
                )}
                {mailState === 'ready' && (
                    <button className="row" onClick={onMail}>
                        <span className="av">@</span>
                        <span className="main">
                            <span className="s">{tr('Email')}</span>
                            <span className="m">{tr('Inbox')}</span>
                        </span>
                        {mailCount > 0 && <span className="badge">{mailCount}</span>}
                    </button>
                )}
                {mailState === 'none' && (
                    <button className="row" onClick={onConfigure}>
                        <span className="av">@</span>
                        <span className="main">
                            <span className="s">{tr('Email')}</span>
                            <span className="m">{tr('Set up an email address')}</span>
                        </span>
                    </button>
                )}
            </div>
        </div>
    )
}

export function MailPanel({ tr, onOpenWebmail, onClose }: {
    tr: (s: string) => string
    onOpenWebmail: () => void
    onClose: () => void
}) {
    const [state, setState] = useState<'loading' | 'ready' | 'none'>('loading')
    const [emails, setEmails] = useState<WebmailEmail[]>([])
    useEffect(() => {
        api<WebmailAccount[]>('frappe_webmail.webmail_api.get_accounts').then(accounts => {
            if (!accounts || !accounts.length) { setState('none'); return }
            api<{ emails?: WebmailEmail[] }>('frappe_webmail.webmail_api.get_emails', {
                account_name: accounts[0].name, folder: 'INBOX', limit: '10',
            }).then(res => {
                setEmails(res?.emails || [])
                setState('ready')
            })
        })
    }, [])
    return (
        <div className="nc-spa-panel">
            <div className="head">
                <span className="t">{tr('Email')}</span>
                <button className="x" onClick={onClose}>&times;</button>
            </div>
            <div className="body">
                {state === 'loading' && <div className="empty">…</div>}
                {state === 'none' && (
                    <div className="empty">
                        <p style={{ margin: '6px 0 14px' }}>{tr('No email account configured yet.')}</p>
                        <button className="cta" onClick={onOpenWebmail}>{tr('Set up an email address')}</button>
                    </div>
                )}
                {state === 'ready' && !emails.length && <div className="empty">{tr('Inbox is empty')}</div>}
                {state === 'ready' && emails.map(e => {
                    const who = e.from_name || e.from_email || '?'
                    return (
                        <button key={e.uid} className={cn('row', !e.seen && 'unread')} onClick={onOpenWebmail}>
                            <span className="dot" />
                            <span className="av">{(who[0] || '?').toUpperCase()}</span>
                            <span className="main">
                                <span className="s">{e.subject || tr('(no subject)')}</span>
                                <span className="m">{who} · {fmtTime(e.date || undefined)}</span>
                            </span>
                        </button>
                    )
                })}
            </div>
            {state === 'ready' && (
                <div className="foot">
                    <a className="wiki" onClick={onOpenWebmail} style={{ cursor: 'pointer' }}>
                        <ExternalLink size={14} /> {tr('Open the webmail')}
                    </a>
                </div>
            )}
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

// ── favorites (user-pinned routes, theme-backed) ────────────────────
export interface CockpitFavorite {
    name: string
    label: string
    route: string
    fav_type?: string
    icon?: string
}

export async function fetchFavorites(): Promise<CockpitFavorite[]> {
    return (await api<CockpitFavorite[]>('neoffice_theme.cockpit_favorites.get_favorites')) || []
}

export function FavoritesPanel({ tr, favorites, onNavigate, onRemove, onClose }: {
    tr: (s: string) => string
    favorites: CockpitFavorite[]
    onNavigate: (route: string) => void
    onRemove: (fav: CockpitFavorite) => void
    onClose: () => void
}) {
    const [q, setQ] = useState('')
    const TYPE_HINT: Record<string, string> = {
        Workspace: tr('Workspace'), List: tr('List'), Form: tr('Document'),
        Report: tr('Report'), Page: tr('Page'),
    }
    const list = q
        ? favorites.filter(f => (f.label + ' ' + (f.fav_type || '')).toLowerCase().includes(q.toLowerCase()))
        : favorites
    return (
        <div className="nc-spa-panel">
            <div className="head">
                <span className="t">{tr('Favorites')}</span>
                <button className="x" onClick={onClose}>&times;</button>
            </div>
            <div className="body">
                {favorites.length > 6 && (
                    <div className="searchbox">
                        <Search size={15} strokeWidth={1.8} />
                        <input placeholder={tr('Filter…')} value={q} onChange={e => setQ(e.target.value)} autoFocus />
                    </div>
                )}
                {!list.length && <div className="empty">{tr('No favorites yet — star a page to pin it here.')}</div>}
                {list.map(f => (
                    <div key={f.name} className="row fav-row">
                        <button className="main fav-go" onClick={() => onNavigate(f.route)}>
                            <span className="s">{f.label}</span>
                            <span className="m">{TYPE_HINT[f.fav_type || ''] || f.fav_type || ''}</span>
                        </button>
                        <button className="fav-x" title={tr('Remove')} onClick={() => onRemove(f)}>&times;</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
