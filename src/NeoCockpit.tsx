/**
 * NeoCockpit — the single shared Neoffice chrome.
 *
 * One collapsible left sidebar that ABSORBS the global header (no top navbar).
 * Mounted on 4 surfaces via an environment adapter:
 *   - env="desk" → Frappe desk (neoffice_theme mounts it), nav = frappe.set_route, native boot
 *   - env="spa"  → Mint / Raven / Neoconstruction, nav = location.href, mini-boot
 *
 * Design: handoff "Direction C / Cockpit" (structure + radii).
 * Brand:  Neoffice blue (ADR-002) — tokens live in cockpit.css.
 *
 * Plan: Obsidian Neoffice/UI-Cockpit/*. Supersedes the copy-pasted
 * FrappeSidebar.tsx / FrappeNavbar.tsx in each SPA (cf. 05-Inventory).
 */
import {
    useState, useEffect, useMemo, useCallback, useRef,
    type ButtonHTMLAttributes, type SVGProps, type ReactNode,
} from 'react'
import {
    Activity, ArrowRight, Award, Banknote, BarChart2, BarChart3, BookOpen,
    Book, Briefcase, Building2, Calculator, CalendarDays, CheckSquare, ChevronDown, Clock, Cloud, Contact, Database, DatabaseZap,
    Circle, DollarSign, Edit, ExternalLink, Factory, FileCheck, FileText,
    Filter, FolderOpen, GalleryVerticalEnd, GitBranch, Globe, GraduationCap, HandCoins, Headphones, HelpCircle, Home, Inbox,
    Image, Landmark, Layers, LayoutGrid, LifeBuoy, ListChecks, ListOrdered, Mail, MapPin,
    LayoutDashboard, LogIn, Maximize, Menu, MessageSquare, Minimize, Moon, MoreHorizontal, MoreVertical, Package, Phone, Route as RouteIcon,
    PieChart, Plus, Receipt, RefreshCw, Rocket, Scale, Search, Settings, ShoppingBag,
    ShoppingCart, SlidersHorizontal, Sparkles, Star, Store, Sun, Tag, Target,
    StickyNote, NotebookPen, Ticket, Trash2, TrendingDown, TrendingUp, Trophy, UserCheck, Users, Wallet, Warehouse,
    Wrench, Bell, Monitor, ChevronsUpDown, LogOut, PanelLeftClose, PanelLeftOpen,
    Eye, EyeOff, UserPlus, Share2, Calendar, Smartphone, MonitorSmartphone, type LucideIcon,
} from 'lucide-react'
import { cn } from './utils'
import { NeoLogo } from './NeoLogo'
import { NotificationsPanel, SynkPanel, HelpPanel, MailMenu, MailPanel, FavoritesPanel, EventsPanel, useDayEvents, fetchFavorites, apiPost, useUnreadNotifications, useUnreadSynk, type CockpitFavorite } from './SpaPanels'
import { openNoraQuickChat } from './noraLoader'
import './cockpit.css'

// Custom SVG icon for Fiduciary (not in lucide-react)
const FiduciaryIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16 10H4V6h11a1 1 0 0 1 1 1v3z" opacity=".5" />
        <path d="M21 18H4v-8h17a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z" />
        <path d="M3 22a1 1 0 0 1-1-.999V3a1 1 0 0 1 2 0v18a1 1 0 0 1-.999 1H3z" opacity=".25" />
    </svg>
)

// lucide-* icon names (workspace.icon field) → Lucide components
const lucideIconMap: Record<string, LucideIcon | typeof FiduciaryIcon> = {
    'activity': Activity, 'banknote': Banknote, 'bar-chart-2': BarChart2, 'bar-chart-3': BarChart3,
    'book-open': BookOpen, 'briefcase': Briefcase, 'building-2': Building2, 'calculator': Calculator,
    'calendar-days': CalendarDays, 'chart-pie': PieChart, 'credit-card': Banknote, 'factory': Factory,
    'fiduciary': FiduciaryIcon, 'file-text': FileText, 'globe': Globe, 'graduation-cap': GraduationCap,
    'hand-coins': HandCoins, 'headphones': Headphones, 'home': Home, 'landmark': Landmark,
    'layout-grid': LayoutGrid, 'life-buoy': Headphones, 'list-checks': ListChecks, 'package': Package,
    'pie-chart': PieChart, 'receipt': Receipt, 'scale': Scale, 'settings': Settings,
    'shopping-bag': ShoppingBag, 'shopping-cart': ShoppingCart, 'sliders-horizontal': SlidersHorizontal,
    'star': Star, 'store': Store, 'tag': Tag, 'trending-up': TrendingUp, 'trophy': Trophy,
    'clock': Clock, 'cloud': Cloud, 'inbox': Inbox, 'trash': Trash2, 'trash-2': Trash2,
    'gallery-vertical-end': GalleryVerticalEnd, 'search': Search, 'building': Building2,
    'bell': Bell, 'mail': Mail, 'route': RouteIcon, 'circle-help': HelpCircle, 'help-circle': HelpCircle,
    'headset': Headphones, 'ticket': Ticket, 'contact': Contact, 'contact-2': Contact, 'phone': Phone,
    'layout-dashboard': LayoutDashboard, 'sticky-note': StickyNote, 'check-square': CheckSquare,
    'notebook': StickyNote, 'message-square': MessageSquare,
    'book': Book, 'database': Database, 'database-zap': DatabaseZap, 'rocket': Rocket, 'git-branch': GitBranch,
    'user-check': UserCheck, 'users': Users, 'wallet': Wallet, 'warehouse': Warehouse, 'wrench': Wrench,
    // //// Neoffice: calendar/meet sidebar icons (visibility toggle, create, share) ////
    'eye': Eye, 'eye-off': EyeOff, 'plus': Plus, 'user-plus': UserPlus, 'share-2': Share2,
    'calendar': Calendar, 'calendar-plus': Plus,
}

// Legacy Frappe/Espresso icon names → Lucide (fallback for non-migrated workspaces)
const legacyIconMap: Record<string, LucideIcon> = {
    'accounting': Calculator, 'income': TrendingUp, 'expenses': TrendingDown, 'assets': Briefcase,
    'receivables': ArrowRight, 'payables': ArrowRight, 'money-coins-1': DollarSign, 'sell': ShoppingCart,
    'selling': ShoppingCart, 'buying': Package, 'crm': Target, 'customer': Users, 'users': Users,
    'stock': Package, 'organization': Factory, 'manufacturing': Factory, 'tag': Tag, 'hr': Users,
    'assign': Users, 'project': FolderOpen, 'list': ListOrdered, 'support': Headphones, 'quality': Award,
    'setting': Settings, 'settings': Settings, 'tool': Wrench, 'integration': Layers, 'getting-started': Star,
    'file': FileText, 'folder-normal': FolderOpen, 'filter': Filter, 'edit': Edit, 'add': Plus,
    'menu': Menu, 'down': ChevronDown, 'message-1': MessageSquare, 'external-link': ExternalLink,
    'image': Image, 'website': Globe, 'web': Globe, 'education': BookOpen, 'refresh': RefreshCw,
    'map': MapPin, 'star': Star, 'milestone': FileCheck, 'mark-as-read': CheckSquare,
    'group-by': LayoutGrid, 'table': LayoutGrid, 'change': RefreshCw, 'non-profit': CalendarDays,
    'default': Circle,
}

const getIcon = (iconName?: string): LucideIcon | typeof FiduciaryIcon => {
    if (!iconName) return Circle
    if (iconName.startsWith('lucide-')) return lucideIconMap[iconName.slice(7)] || Circle
    return legacyIconMap[iconName] || Circle
}

// ── i18n: use Frappe's __ when present, else identity
const tr = (text: string, args?: (string | number)[]): string => {
    const w = window as unknown as { __?: (t: string, a?: (string | number)[]) => string }
    let s = typeof w.__ === 'function' ? w.__(text, args) : text
    if (args && s === text) s = text.replace(/\{(\d+)\}/g, (_, i) => String(args[+i] ?? ''))
    return s
}

interface WorkspacePage { name: string; title: string; label?: string; icon?: string; public?: boolean | number; app?: string; parent_page?: string }
interface AppData { app_name: string; app_title: string; app_logo_url?: string; app_route?: string; workspaces: string[] }
interface UserInfoEntry { fullname?: string; image?: string; abbr?: string; email?: string }

interface FrappeWin {
    /** Opens the phone-pairing dialog. Defined by neoffice_theme,
     *  loaded across the whole desk (`app_include_js`) — so always present in
     *  the `desk` env, and never anywhere else. */
    showMobileAppsDialog?: () => void
    frappe?: {
        boot?: {
            sidebar_pages?: { pages?: WorkspacePage[] }
            app_data?: AppData[]
            neoffice_settings?: { interface_mode?: string }
            user?: { name?: string; email?: string; full_name?: string; user_image?: string; view_interface?: string }
            user_info?: Record<string, UserInfoEntry>
            app_logo_url?: string
        }
        set_route?: (...parts: string[]) => void
        session?: { user?: string }
        ui?: { NeofficeCalculatorDialog?: { show: () => void } }
        db?: { get_list?: (doctype: string, opts?: { fields?: string[]; limit?: number }) => Promise<Array<{ name: string }>> }
    }
    __FRAPPE_INTEGRATION__?: boolean
    csrf_token?: string
}

export interface NeoCockpitProps {
    /** 'desk' (Frappe desk) or 'spa' (Mint/Raven/Neoconstruction). Auto-detected if omitted. */
    env?: 'desk' | 'spa'
    /** Override navigation. Receives a route like '/app/sales'. */
    onNavigate?: (route: string) => void
    /** Logo click destination. Default '/app/home'. */
    homeUrl?: string
    /** NORA trigger. Desk passes the Quick Chat overlay opener; default navigates. */
    onNora?: () => void
    /** Notifications bell. Desk passes the native dropdown opener; default navigates. */
    onBell?: () => void
    /** synk (Raven chat) toggle. Button only renders when provided.
     *  Unread badge: host writes into `.nc-synk .nc-count`. */
    onSynk?: () => void
    /** SPA context module: app_name selected on entry (e.g. Mint passes
     *  'Finance', Neoconstruction 'neoconstruction'). Overrides the saved
     *  choice — the surface you're on wins. */
    defaultApp?: string
    /** Standalone-app surfaces (Drive, LMS, Helpdesk, CRM): inject this app
     *  into the module switcher and pin it on entry. While it is the current
     *  module the nav shows `contextNav` instead of desk workspaces. */
    surfaceApp?: { name: string; title: string; logo?: string }
    /** Which utility icons the header may show. Omit for all of them (desk and
     *  every existing surface keep their current row). Pass a subset — or [] —
     *  when the surface's audience has no business with them: an LMS learner has
     *  no webmail, no NORA and no desk, and the Notes icon navigates to
     *  /app/notes, which only answers with a permission error. */
    utilities?: ('help' | 'mail' | 'bell' | 'notes' | 'nora')[]
    /** The surface app's own navigation (sections of items). Items carry a
     *  lucide-* icon name, a SPA route (handled via onNavigate) or onClick,
     *  an active flag (the host knows its router) and an optional badge. */
    contextNav?: {
        label?: string
        items: {
            label: string
            icon?: string
            route?: string
            onClick?: () => void
            active?: boolean
            badge?: string | number
            // //// Neoffice: a colour swatch instead of an icon (calendars).
            // `dim` renders it hollow (outline only) to signal hidden. ////
            color?: string
            dim?: boolean
            // //// Neoffice: a trailing "shared" icon + tooltip (shared calendars) ////
            shared?: boolean
            sharedTitle?: string
            // //// Neoffice: a trailing gear that opens a per-item settings menu
            // (calendars: rename / colour / share / delete / CalDAV) ////
            onGear?: () => void
        }[]
    }[]
    /** Small meta block pinned above the collapse toggle (e.g. Drive storage). */
    contextFooter?: { label: string; sub?: string; percent?: number; onClick?: () => void }
    /** Standalone surfaces: clicking the search bar triggers the app's own
     *  search overlay (e.g. Drive's ⌘K popup) instead of the embedded input. */
    onSearch?: () => void
    /** Keyboard hint shown in the search bar (default ⌘G / Ctrl G). */
    searchKbd?: string
    /** Contextual help panel opener (Nora Learn + wiki). Button only renders
     *  when provided. Badge: host writes into `.nc-help .nc-count`. */
    onHelp?: () => void
    /** Page content. When provided (shell layout), NeoCockpit renders the full
     *  shell: gray frame + sidebar + a floating white rounded panel wrapping it. */
    children?: ReactNode
    /** 'shell' (SPAs) renders frame + floating panel around `children`.
     *  'sidebar' (Frappe desk) renders only the sidebar as an in-flow flex child
     *  (wrapper is display:contents) — the host's own content area is the panel. */
    layout?: 'shell' | 'sidebar'
    className?: string
}

// Synthetic "All" module: aggregates every app's workspaces as collapsible
// groups in the nav. Pure UI — built from boot app_data, no backend object.
const ALL_APP = '__all__'

function detectEnv(): 'desk' | 'spa' {
    if (typeof window === 'undefined') return 'spa'
    const w = window as unknown as FrappeWin
    if (w.__FRAPPE_INTEGRATION__ === true) return 'spa'
    if (w.frappe?.set_route) return 'desk'
    return 'spa'
}

const computeAbbr = (name: string): string => {
    if (!name) return '?'
    const words = name.trim().split(/\s+/).filter(Boolean)
    return ((words[0]?.[0] || '') + (words[1]?.[0] || '')).toUpperCase() || '?'
}
const colorFromName = (name: string): string => {
    if (!name) return '#94a3b8'
    let h = 0
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
    return `hsl(${h % 360}, 52%, 52%)`
}
const formatTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

// Prefer the site's own logo (Website Settings → app_logo, surfaced as
// boot.app_logo_url) and fall back to the Neoffice mark. A client selling
// courses to their own customers should show THEIR brand, not ours.
const LogoLink = ({ onClick, mark = false, height, src, alt }: {
    onClick?: () => void; mark?: boolean; height?: number; src?: string; alt?: string
}) => (
    <span onClick={onClick} style={{ display: 'inline-flex', cursor: 'pointer' }} title={alt || 'Neoffice'}>
        {src
            ? <img src={src} alt={alt || ''} style={{ height: height ? height + 'px' : undefined, width: 'auto' }} />
            : <NeoLogo mark={mark} height={height} />}
    </span>
)

// Date + clock widget next to the logo: a ring around today's day-of-month
// (filled by how far through the day we are — a quiet "digital clock"),
// the full date, the live time, and an events badge. Click → events panel.
function DateWidget({ tr, locale, eventCount, onClick }: {
    tr: (s: string) => string; locale: string; eventCount: number; onClick: () => void
}) {
    const [now, setNow] = useState(() => new Date())
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 20_000)
        return () => clearInterval(id)
    }, [])
    const day = now.getDate()
    // fraction of the day elapsed → ring sweep
    const frac = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400
    const R = 15, C = 2 * Math.PI * R
    const weekday = now.toLocaleDateString(locale, { weekday: 'long' })
    const month = now.toLocaleDateString(locale, { month: 'long' })
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
    const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })
    return (
        <button className="nc-date" onClick={onClick} title={tr('Calendar')}>
            <span className="nc-date-ring">
                <svg viewBox="0 0 36 36" width="30" height="30">
                    <circle cx="18" cy="18" r={R} fill="none" stroke="var(--nc-line)" strokeWidth="2.6" />
                    <circle cx="18" cy="18" r={R} fill="none" stroke="var(--nc-accent)" strokeWidth="2.6"
                        strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - frac)}
                        transform="rotate(-90 18 18)" />
                </svg>
                <span className="nc-date-day">{day}</span>
                {eventCount > 0 && <span className="nc-date-badge">{eventCount}</span>}
            </span>
            <span className="nc-date-text">
                <span className="d">{cap(weekday)} {day} {cap(month)}</span>
                <span className="t">{time}</span>
            </span>
        </button>
    )
}

function NeoCockpit({ env: envProp, onNavigate, homeUrl = '/app/home', onNora, onBell, onSynk, onHelp, defaultApp, surfaceApp, utilities, contextNav, contextFooter, onSearch, searchKbd, children, layout = 'shell', className }: NeoCockpitProps = {}) {
    const env = envProp ?? detectEnv()
    const boot = (typeof window !== 'undefined' ? (window as unknown as FrappeWin).frappe?.boot : undefined)

    const [pinned, setPinned] = useState(() => {
        try { return JSON.parse(localStorage.getItem('neocockpit-pinned') || 'true') } catch { return true }
    })
    const [workspaces, setWorkspaces] = useState<WorkspacePage[]>([])
    const [apps, setApps] = useState<AppData[]>([])
    const [currentApp, setCurrentApp] = useState<string>(() => localStorage.getItem('neocockpit-app') || '')
    const [appMenuOpen, setAppMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    // collapsed rail: secondary action icons fold behind a "…" button so the
    // rail stays short (NORA + bell always visible)
    const [moreOpen, setMoreOpen] = useState(false)
    // 768-1023px: force the collapsed rail (mobile strip only below 768).
    // The user's expand choice is kept in state and comes back above 1024.
    const [narrow, setNarrow] = useState(false)
    useEffect(() => {
        if (typeof matchMedia === 'undefined') return
        const mq = matchMedia('(min-width: 768px) and (max-width: 1023.5px)')
        const apply = () => setNarrow(mq.matches)
        apply()
        mq.addEventListener('change', apply)
        return () => mq.removeEventListener('change', apply)
    }, [])
    const [hiddenAlert, setHiddenAlert] = useState(false)
    // "All" view in SPAs: the desk drives the open group from the route, but
    // SPA routes (/mint/…) never match a desk module — groups toggle on click
    const [openGroup, setOpenGroup] = useState('')
    // collapsed rail: hovering a module opens a side flyout with its
    // workspaces; clicking navigates to the module's first workspace
    // (hover-open so the icon itself stays reachable as a destination).
    const [flyout, setFlyout] = useState<null | { app: AppData; items: WorkspacePage[]; top: number }>(null)
    // grace timer so the pointer can travel from the rail icon to the
    // flyout panel without it closing mid-way
    const flyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const flyKeep = () => { if (flyTimer.current) { clearTimeout(flyTimer.current); flyTimer.current = null } }
    const flyClose = () => { flyKeep(); flyTimer.current = setTimeout(() => setFlyout(null), 260) }
    // user favorites (theme-backed) — the section only shows when non-empty
    const [favorites, setFavorites] = useState<CockpitFavorite[]>([])
    useEffect(() => {
        const load = () => { fetchFavorites().then(setFavorites).catch(() => {}) }
        load()
        window.addEventListener('nf-favorites-changed', load)
        return () => window.removeEventListener('nf-favorites-changed', load)
    }, [])
    // SPA companion panels (notifications / synk / help): the desk provides
    // these through its own modules (onBell/onSynk/onHelp); SPA surfaces get
    // the embedded light panels so the rail behaves the same everywhere
    const [openPanel, setOpenPanel] = useState<null | 'bell' | 'synk' | 'help' | 'mailmenu' | 'mail' | 'favorites' | 'events'>(null)
    const spaPanels = env === 'spa'
    const { events, todayCount } = useDayEvents()
    const dateLocale = (boot as { lang?: string } | undefined)?.lang
        || (typeof navigator !== 'undefined' ? navigator.language : 'fr') || 'fr'
    const spaSynkCount = useUnreadSynk(spaPanels && !onSynk)
    const spaNotifCount = useUnreadNotifications(spaPanels && !onBell)
    const wikiUrl = (boot as { neoffice_wiki_url?: string } | undefined)?.neoffice_wiki_url
        || 'https://neoservice.neoffice.me/wiki'
    // standalone application tiles (Drive, synk, …) shown in the switcher menu
    const surfaceTiles = useMemo(() => {
        const list = ((boot as { surface_apps?: { name: string; title: string; logo?: string; route?: string; description?: string }[] } | undefined)?.surface_apps) || []
        return list.filter(t => t.route && t.name !== surfaceApp?.name)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boot, surfaceApp?.name])
    const [time, setTime] = useState(formatTime)
    const [route, setRoute] = useState(() => (typeof location !== 'undefined' ? location.pathname + location.hash : ''))
    const [interfaceMode, setInterfaceMode] = useState<string>(() =>
        boot?.neoffice_settings?.interface_mode || boot?.user?.view_interface || 'Advanced')
    const [formWidth, setFormWidth] = useState<string>(() =>
        (boot?.user as { form_width?: string } | undefined)?.form_width || 'Standard')
    const [colorMode, setColorMode] = useState<'system' | 'light' | 'dark'>(() => {
        // the backend-resolved preference wins (User.desk_theme via boot) so the
        // chrome never fights the server; localStorage is only a fallback.
        const deskTheme = (boot?.user as { desk_theme?: string } | undefined)?.desk_theme
        if (deskTheme === 'Light') return 'light'
        if (deskTheme === 'Dark') return 'dark'
        if (deskTheme === 'Automatic') return 'system'
        try { return (localStorage.getItem('neocockpit-colormode') as 'system' | 'light' | 'dark') || 'system' } catch { return 'system' }
    })

    const isSimple = interfaceMode === 'Simple' || interfaceMode === 'Simplified'
    // An anonymous visitor: no module to switch, and no session to end.
    const isGuest = boot?.user?.name === 'Guest'
    // Company Configuration opens a doctype form. Offering it to someone who
    // cannot open it — a learner, an instructor, an anonymous visitor — buys a
    // permission error, so it is gated on the role that actually governs it.
    const canConfigureCompany = Boolean(
        (boot?.user as { roles?: string[] } | undefined)?.roles?.some(
            r => r === 'System Manager' || r === 'Administrator'))

    // Inside a standalone surface (Drive, LMS, …) the app's own nav REPLACES the
    // desk workspaces — in every interface mode. "Simple" simplifies the desk,
    // and there is no desk here: an LMS learner in simplified mode was getting
    // Selling / Products / Buying / Accounting, i.e. someone else's back-office,
    // with every entry leading to a permission error.
    const surfaceNavActive = () => Boolean(surfaceApp && currentApp === surfaceApp.name && contextNav)
    const expanded = pinned

    // ── boot → workspaces + apps
    useEffect(() => {
        if (!boot) return
        const pages = (boot.sidebar_pages?.pages || []).filter(p => !p.parent_page && (p.public === true || p.public === 1))
        setWorkspaces(pages)
        let appData = boot.app_data || []
        // standalone surface (Drive/LMS/…): present itself as a module.
        // Logo: prefer the theme-unified icon from boot.surface_apps.
        if (surfaceApp && !appData.some(a => a.app_name === surfaceApp.name)) {
            const unified = ((boot as { surface_apps?: { name: string; logo?: string }[] }).surface_apps || [])
                .find(t => t.name === surfaceApp.name)
            appData = [
                { app_name: surfaceApp.name, app_title: surfaceApp.title, app_logo_url: (unified && unified.logo) || surfaceApp.logo, workspaces: [] },
                ...appData,
            ]
        }
        setApps(appData)
        if (appData.length) {
            // SPA surfaces pin their context module (Mint→Finance, OCE→
            // Construction, Drive→itself): it beats the saved choice on entry
            const pin = defaultApp || (surfaceApp && surfaceApp.name)
            if (pin && (pin === ALL_APP || appData.some(a => a.app_name === pin))) {
                setCurrentApp(pin)
                return
            }
            const saved = localStorage.getItem('neocockpit-app')
            const ok = saved && (saved === ALL_APP || appData.some(a => a.app_name === saved))
            setCurrentApp(ok ? (saved as string) : appData[0].app_name)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boot])

    useEffect(() => { if (currentApp) localStorage.setItem('neocockpit-app', currentApp) }, [currentApp])
    useEffect(() => { localStorage.setItem('neocockpit-pinned', JSON.stringify(pinned)) }, [pinned])
    useEffect(() => { if (pinned) setMoreOpen(false) }, [pinned])
    // aggregate alert for the folded "…": any badge/glow on the hidden icons
    // (host-painted DOM, so a MutationObserver is the only reliable signal)
    useEffect(() => {
        const check = () => {
            const synk = document.querySelector('.nc-side .nc-synk .nc-count')
            const help = document.querySelector('.nc-side .nc-help')
            setHiddenAlert(!!(
                (synk && synk.textContent) ||
                (help && (help.querySelector('.nc-count')?.textContent || help.classList.contains('nc-glow')))
            ))
        }
        const top = document.querySelector('.nc-side .nc-top')
        if (!top || typeof MutationObserver === 'undefined') return
        const obs = new MutationObserver(check)
        obs.observe(top, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class'] })
        check()
        return () => obs.disconnect()
    }, [])
    useEffect(() => { const id = setInterval(() => setTime(formatTime()), 60_000); return () => clearInterval(id) }, [])
    // mark the body so the desk (page titles) and CSS can react to the mode
    useEffect(() => { document.body.classList.toggle('simplified_view', isSimple) }, [isSimple])
    // Cockpit colour mode is AUTHORITATIVE: set Frappe's OWN data-theme-mode (the
    // attribute its theme logic reads), not just data-theme. Frappe re-resolves
    // data-theme FROM data-theme-mode on boot / route / system-pref change, so
    // setting data-theme alone got reverted to the native desk_theme; setting the
    // mode makes Frappe keep resolving to our choice — no fight, no observer.
    // 'system' → 'automatic' (Frappe then follows the OS, same as us). //// neoffice
    const applyColorModeToDom = useCallback((mode: 'system' | 'light' | 'dark') => {
        const html = document.documentElement
        const sysDark = typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
        html.setAttribute('data-theme-mode', mode === 'system' ? 'automatic' : mode)
        html.setAttribute('data-theme', mode === 'system' ? (sysDark ? 'dark' : 'light') : mode)
    }, [])
    useEffect(() => { applyColorModeToDom(colorMode) }, [colorMode, applyColorModeToDom])
    // Apply the saved form-width body class on mount + whenever it changes —
    // mirrors the colour-mode effect above. The value lives on User.form_width
    // (exposed via boot), so the size picked in the settings panel now survives
    // reloads/navigation instead of only being applied on the click itself.
    useEffect(() => {
        document.body.classList.remove('form-width-large', 'form-width-full')
        if (formWidth === 'Large') document.body.classList.add('form-width-large')
        else if (formWidth === 'Full Width') document.body.classList.add('form-width-full')
    }, [formWidth])
    // live cross-tab sync: when another surface (POS, Insights, another desk tab)
    // changes the colour mode, follow it WITHOUT a reload. The storage event only
    // fires in OTHER documents, so this never loops on our own writes. //// neoffice
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key !== 'neocockpit-colormode' && e.key !== 'theme_active') return
            let mode: 'system' | 'light' | 'dark' = 'system'
            try { mode = (localStorage.getItem('neocockpit-colormode') as 'system' | 'light' | 'dark') || 'system' } catch { /* noop */ }
            setColorMode(mode)
            applyColorModeToDom(mode)
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [applyColorModeToDom])
    // track the current route to highlight the active workspace (desk + spa)
    useEffect(() => {
        const update = () => setRoute(location.pathname + location.hash)
        window.addEventListener('popstate', update)
        window.addEventListener('hashchange', update)
        const fr = (window as unknown as { frappe?: { router?: { on?: (e: string, cb: () => void) => void; off?: (e: string, cb: () => void) => void } } }).frappe?.router
        fr?.on?.('change', update)
        return () => {
            window.removeEventListener('popstate', update)
            window.removeEventListener('hashchange', update)
            fr?.off?.('change', update)
        }
    }, [])

    // rail tooltip — one shared fixed node, remounted per item (key) so the
    // pop-in animation replays while scanning the rail (supastarter feel)
    const [tip, setTip] = useState<{ text: string; sub?: string; x: number; y: number } | null>(null)
    const showTip = (text: string, sub?: string) => (e: { currentTarget: Element }) => {
        const r = e.currentTarget.getBoundingClientRect()
        setTip({ text, sub, x: r.right + 10, y: r.top + r.height / 2 })
    }
    const hideTip = () => setTip(null)
    const tipProps = (text: string, sub?: string) => ({ onMouseEnter: showTip(text, sub), onMouseLeave: hideTip })

    // close menus on outside click
    const rootRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) { setAppMenuOpen(false); setUserMenuOpen(false); setOpenPanel(null); setFlyout(null) }
        }
        document.addEventListener('mousedown', onDown)
        return () => document.removeEventListener('mousedown', onDown)
    }, [])

    //// Neoffice — THE MODULE FOLLOWS THE ROUTE.
    ////
    //// Landing on /app/fitness via a link or a bookmark used to leave the
    //// switcher on the previous module — "Commercial" above a Fitness
    //// workspace. The sidebar would then announce something other than
    //// what you're looking at, and the first instinct is to think you're
    //// on the wrong page.
    ////
    //// We do NOT touch `neocockpit-app` any other way: it genuinely is the
    //// module of the displayed workspace that becomes active, and it will
    //// be remembered as if it had been chosen — because that's exactly
    //// what happened, by opening the address.
    useEffect(() => {
        if (!apps.length || !workspaces.length) return
        const chemin = typeof location === 'undefined' ? '' : location.pathname
        const slug = (chemin.replace(/^\/app\/?/, '').split('/')[0] || '').toLowerCase()
        if (!slug) return
        const enSlug = (n: string) => n.toLowerCase().replace(/\s+/g, '-')
        const espace = workspaces.find(w => enSlug(w.name) === slug)
        //// Not a workspace: a doc, a list, a page. The active module then
        //// has no reason to change — we stay where the user already was.
        if (!espace) return
        const proprietaire = apps.find(a => a.workspaces?.includes(espace.name))
        if (!proprietaire || proprietaire.app_name === currentApp) return
        setCurrentApp(proprietaire.app_name)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route, apps, workspaces])

    const allMode = currentApp === ALL_APP
    const currentAppData = useMemo(() => apps.find(a => a.app_name === currentApp), [apps, currentApp])
    // All mode: every app with its resolved workspaces (sidebar order preserved)
    const appGroups = useMemo(() =>
        apps
            .map(app => ({ app, items: workspaces.filter(w => app.workspaces?.includes(w.name)) }))
            // SPA apps (e.g. Construction) declare no workspaces — keep them as direct links
            .filter(g => g.items.length > 0 || !!g.app.app_route),
        [apps, workspaces])
    // supastarter pattern: the open group is the one containing the active route
    const isWsActive = (ws: WorkspacePage) => route.includes('/' + ws.name.toLowerCase().replace(/\s+/g, '-'))
    const activeGroupName = useMemo(
        () => appGroups.find(g => g.items.some(isWsActive))?.app.app_name,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [appGroups, route])
    const filteredWorkspaces = useMemo(() => {
        if (!currentAppData?.workspaces) return workspaces.slice(0, 20)
        return workspaces.filter(w => currentAppData.workspaces.includes(w.name)).slice(0, 20)
    }, [workspaces, currentAppData])
    // Simplified interface: a flat list of the "Simple *" workspaces only, with
    // the word "simplifié(e)(s)" stripped from the label — no module switcher,
    // no group, no Fiduciary / Construction (the "Simple " prefix excludes them).
    // longest alternative first; no \b (it treats accented chars as word
    // boundaries → "simplifiées" wrongly matched just "simplifié")
    const cleanSimpleLabel = (s: string) => (s || '').replace(/\s*simplifi(?:ées|ée|és|é)/gi, '').trim()
    // Strip the owning module's title from the front of a workspace label —
    // inside the "Construction" module, "Construction Estimation" reads as just
    // "Estimation". Whole-word prefix only; never returns empty (a workspace
    // named exactly like its module keeps its label, e.g. "Neoconstruction").
    const stripModulePrefix = (label: string, appTitle?: string) => {
        if (!label || !appTitle) return label
        const re = new RegExp('^' + appTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s+', 'i')
        const out = label.replace(re, '').trim()
        return out || label
    }
    const simpleWorkspaces = useMemo(() =>
        workspaces.filter(w => w.name.startsWith('Simple '))
            .map(w => ({ ...w, label: cleanSimpleLabel(w.label || w.title || w.name) })),
        [workspaces])

    // ── navigation adapter
    const navigate = useCallback((route: string) => {
        if (onNavigate) return onNavigate(route)
        const w = window as unknown as FrappeWin
        if (env === 'desk' && w.frappe?.set_route) {
            const path = route.replace(/^https?:\/\/[^/]+/, '').replace(/^\/app\/?/, '')
            w.frappe.set_route(path || 'home')
        } else {
            window.location.href = route
        }
    }, [env, onNavigate])

    // Company config is a normal doctype keyed by Company. On a single-company
    // instance there's exactly one record — open its form directly instead of a
    // one-row list. Falls back to the list (multi-company, or non-desk surfaces).
    const openCompanyConfig = useCallback(() => {
        const f = (window as unknown as FrappeWin).frappe
        if (env === 'desk' && f?.db?.get_list && f?.set_route) {
            f.db.get_list('Neoffice Company Settings', { fields: ['name'], limit: 2 })
                .then(rows => {
                    if (rows && rows.length === 1) f.set_route!('Form', 'Neoffice Company Settings', rows[0].name)
                    else navigate('/app/neoffice-company-settings')
                })
                .catch(() => navigate('/app/neoffice-company-settings'))
        } else {
            navigate('/app/neoffice-company-settings')
        }
    }, [env, navigate])

    // Two entries, because they're two different actions.
    //
    // Pairing a phone is a one-off: you open it, scan, close it — and the
    // dialog explains along the way what the QR code contains, which is
    // half of its usefulness. A kiosk needs to be watched over: is it up,
    // what is it running, on which network. That doesn't fit in a window
    // you close, hence a separate page.
    const openMobileApp = useCallback(() => {
        const w = window as unknown as FrappeWin
        // No fallback to another page: sending the user somewhere other
        // than where they clicked is worse than doing nothing. This entry
        // is only offered in the `desk` env, where neoffice_theme is always loaded.
        if (w.showMobileAppsDialog) w.showMobileAppsDialog()
        else console.warn('[cockpit] showMobileAppsDialog missing — neoffice_theme not loaded?')
    }, [])

    const openBornes = useCallback(() => {
        navigate('/app/neoffice-devices')
    }, [navigate])

    const goWorkspace = (ws: WorkspacePage) => { setMobileOpen(false); navigate('/app/' + ws.name.toLowerCase().replace(/\s+/g, '-')) }
    const goApp = (app: AppData) => { setCurrentApp(app.app_name); setAppMenuOpen(false); setMobileOpen(false); if (app.app_route) navigate(app.app_route) }

    // ── desk/spa helpers reused from the old package logic
    const frappeSetValue = useCallback((doctype: string, name: string, field: string, value: string) => {
        return fetch('/api/method/frappe.client.set_value', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Frappe-CSRF-Token': (window as unknown as FrappeWin).csrf_token || '' },
            body: JSON.stringify({ doctype, name, fieldname: field, value }),
        })
    }, [])
    const currentUser = () => { const w = window as unknown as FrappeWin; return w.frappe?.session?.user || boot?.user?.name || '' }
    //// Neoffice — LANDING IN SIMPLIFIED MODE ON A ROUTE THAT DOESN'T EXIST THERE.
    ////
    //// Simplified mode only shows the workspaces named "Simple …" — four of
    //// them today. Everything else in the product is invisible: a link
    //// received by email, a bookmark, a hand-typed address would therefore
    //// land on "The resource you are looking for is not available." The
    //// message is wrong: the resource exists, it's simply outside the mode.
    ////
    //// We switch to advanced mode, we STAY on the requested route, and we
    //// explain why on the way back. Switching without saying so would leave
    //// someone facing an interface that changed on its own.
    const AVIS_BASCULE = 'neocockpit-mode-bascule'

    useEffect(() => {
        //// FALLBACK for INTERNAL desk navigation. A direct address entry is
        //// already handled at boot by the server — see
        //// boot_override.leave_simple_mode_for_requested_workspace, which
        //// switches before the render and so avoids the "Not found" that
        //// the desk used to show while it corrected itself. Here, there is
        //// no fresh boot: this is the only place that can react.
        if (!isSimple) return
        const horsMode: string[] =
            (boot as unknown as { neoffice_advanced_only_workspaces?: string[] })
                ?.neoffice_advanced_only_workspaces || []
        if (!horsMode.length) return
        const chemin = typeof location === 'undefined' ? '' : location.pathname
        const slug = (chemin.replace(/^\/app\/?/, '').split('/')[0] || '').toLowerCase()
        if (!slug) return
        const enSlug = (n: string) => n.toLowerCase().replace(/\s+/g, '-')
        const cible = horsMode.find(n => enSlug(n) === slug)
        //// Not a workspace outside the mode: a doc, a list, a page, or a
        //// bad address. We don't change anyone's interface over a
        //// typo.
        if (!cible) return

        try { sessionStorage.setItem(AVIS_BASCULE, cible) } catch { /* private browsing */ }
        const w0 = window as unknown as { frappe?: { hide_msgprint?: () => void } }
        try { w0.frappe?.hide_msgprint?.() } catch { /* the desk hadn't opened anything */ }
        document.body.classList.remove('simplified_view')
        frappeSetValue('User', currentUser(), 'view_interface', 'Advanced')
            .then(() => window.location.reload())
            .catch(() => { /* offline: we let the desk respond however it can */ })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route, isSimple, boot])

    //// The message is set AFTER the reload — otherwise it disappears along
    //// with the page that triggered it.
    useEffect(() => {
        //// Two sources, one message. The server sets
        //// `neoffice_mode_switched` when it switched at boot; the client
        //// fallback goes through the session. We read both: otherwise the
        //// cleanest switch — the server's — would be the only silent one.
        let quoi: string | null =
            (boot as unknown as { neoffice_mode_switched?: string })?.neoffice_mode_switched || null
        if (!quoi) {
            try {
                quoi = sessionStorage.getItem(AVIS_BASCULE)
                if (quoi) sessionStorage.removeItem(AVIS_BASCULE)
            } catch { /* private browsing */ }
        }
        if (!quoi) return
        const w = window as unknown as { frappe?: { show_alert?: (o: { message: string; indicator?: string }, s?: number) => void } }
        //// The KEY is English, like every other string here: `__()` falls back
        //// to the key when a language has no translation, so a French key would
        //// have shown French to a German. The French wording lives in
        //// neoffice_theme's fr.po.
        const message = tr('We switched to advanced mode: \u201c{0}\u201d does not exist in simplified mode.', [quoi])
        if (typeof w.frappe?.show_alert === 'function') w.frappe.show_alert({ message, indicator: 'blue' }, 10)
        // eslint-disable-next-line no-console
        else console.info(message)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boot])

    const switchMode = useCallback((mode: string) => {
        const dbMode = mode === 'Simple' ? 'Simplified' : 'Advanced'
        setInterfaceMode(mode)
        document.body.classList.toggle('simplified_view', mode === 'Simple')
        frappeSetValue('User', currentUser(), 'view_interface', dbMode).then(() => { window.location.href = '/app/home' })
    }, [frappeSetValue])
    // Color mode (System / Light / Dark) — applied LIVE via data-theme, no reload (supastarter style)
    const applyColorMode = useCallback((mode: 'system' | 'light' | 'dark') => {
        setColorMode(mode)
        try { localStorage.setItem('neocockpit-colormode', mode) } catch { /* noop */ }
        const sysDark = typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
        const theme = mode === 'system' ? (sysDark ? 'dark' : 'light') : mode
        applyColorModeToDom(mode)
        try { localStorage.setItem('theme_active', theme) } catch { /* noop */ }
        const deskTheme = mode === 'system' ? 'Automatic' : mode[0].toUpperCase() + mode.slice(1)
        frappeSetValue('User', currentUser(), 'desk_theme', deskTheme).catch(() => {})
    }, [frappeSetValue, applyColorModeToDom])
    const openCalculator = () => { (window as unknown as FrappeWin).frappe?.ui?.NeofficeCalculatorDialog?.show?.() }
    // SPA surfaces lazy-load the REAL desk overlay (noraLoader shim) — the
    // /app/nora-chat route never existed, the button only opens the dialog
    const triggerNora = () => { if (onNora) onNora(); else openNoraQuickChat() }
    const triggerBell = () => { if (onBell) onBell(); else navigate('/app/notification-log') }
    const switchFormWidth = useCallback((value: string) => {
        setFormWidth(value) // the [formWidth] effect applies the body class (mount + change)
        frappeSetValue('User', currentUser(), 'form_width', value).catch(() => {})
    }, [frappeSetValue])

    // ── search (⌘G focuses it; Enter routes to global search)
    const searchRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'g') {
                e.preventDefault(); setMobileOpen(false)
                // //// Neoffice: ⌘G opens the app's own / global search overlay when
                // one is wired (spa); in the desk the host binds its awesome bar, so
                // just focus the field there. ////
                if (onSearch) onSearch()
                else searchRef.current?.focus()
            }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [onSearch])
    const submitSearch = (q: string) => { if (q.trim()) navigate('/app/search?q=' + encodeURIComponent(q.trim())) }

    // ── user info
    const myEmail = boot?.user?.email || boot?.user?.name || ''
    const myInfo: UserInfoEntry = (boot?.user_info && boot.user_info[myEmail]) || {}
    const userName = myInfo.fullname || boot?.user?.full_name || boot?.user?.email || tr('User')
    const userImage = myInfo.image || boot?.user?.user_image || ''
    const userAbbr = myInfo.abbr || computeAbbr(userName)
    const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)
    const appLogoUrl = currentAppData?.app_logo_url
    // site_logo comes from Website Settings → app_logo, surfaced explicitly by
    // neoffice_theme. NOT boot.app_logo_url: frappe fills that from Navbar
    // Settings, which holds a square app icon — using it would swap the desk's
    // wordmark for a favicon-sized tile.
    const siteLogo = (boot as { site_logo?: string } | undefined)?.site_logo || undefined
    const siteName = (boot as { site_name?: string } | undefined)?.site_name || undefined
    // undefined => every icon, so nothing changes for desk or existing surfaces.
    const showUtil = (k: 'help' | 'mail' | 'bell' | 'notes' | 'nora') =>
        !utilities || utilities.includes(k)

    // ── the sidebar body (shared between fixed desktop + mobile drawer).
    // Plain render FUNCTION on purpose (not a nested component): a component
    // defined inline gets a new identity on every render, so React would
    // remount the whole subtree (detaching the desk's Awesome Bar binding and
    // dropping input focus) on each clock tick / route change.
    const sidebarBody = (forceExpanded = false) => {
        const exp = forceExpanded || (narrow ? false : expanded)
        return (
            <>
                {/* one line: logo left, borderless action glyphs right (mock).
                    Collapsed rail: column — mark on top, icons below, secondary
                    ones folded behind "…". Keeps the .nc-top class — the
                    theme's SoftphoneWidget targets `.nc-side .nc-top` to mount
                    (CSS-only folding, the softphone node lives outside React). */}
                <div className={cn('nc-top nc-actions', !exp && !moreOpen && 'nc-actions-folded')}>
                    {exp ? (
                        <div className="nc-brandrow">
                            <span className="nc-logo-slot">
                                <LogoLink onClick={() => navigate(homeUrl)} mark={false} height={20} src={siteLogo} alt={siteName} />
                            </span>
                            <DateWidget tr={tr} locale={dateLocale} eventCount={todayCount}
                                onClick={() => setOpenPanel(p => p === 'events' ? null : 'events')} />
                        </div>
                    ) : (
                        <span className="nc-logo-slot">
                            <LogoLink onClick={() => navigate(homeUrl)} mark={false} height={12} src={siteLogo} alt={siteName} />
                        </span>
                    )}
                    {showUtil('help') && (onHelp || spaPanels) && (
                        <button className="nc-iconbtn nc-help" {...(!exp ? tipProps(tr('Help & Training')) : {})} title={exp ? tr('Help & Training') : undefined}
                            onClick={onHelp || (() => setOpenPanel(p => p === 'help' ? null : 'help'))}>
                            <LifeBuoy size={17} strokeWidth={1.7} /><span className="nc-count" />
                        </button>
                    )}
                    {showUtil('mail') && <button className="nc-iconbtn nc-synk" {...(!exp ? tipProps(tr('Messages')) : {})} title={exp ? tr('Messages') : undefined}
                        onClick={() => setOpenPanel(p => p === 'mailmenu' || p === 'mail' || p === 'synk' ? null : 'mailmenu')}>
                        <Mail size={17} strokeWidth={1.7} />
                        <span className="nc-count">{spaPanels && !onSynk && spaSynkCount > 0 ? spaSynkCount : undefined}</span>
                    </button>}
                    {/* the theme's SoftphoneWidget mounts its trigger here (desk only) */}
                    <span className="nc-phone-slot" style={{ display: 'contents' }} />
                    {showUtil('bell') && <button className={cn('nc-iconbtn nc-bell', spaPanels && !onBell && spaNotifCount > 0 && 'has-unseen')}
                        {...(!exp ? tipProps(tr('Notifications')) : {})} title={exp ? tr('Notifications') : undefined}
                        onClick={onBell ? triggerBell : (spaPanels ? () => setOpenPanel(p => p === 'bell' ? null : 'bell') : triggerBell)}>
                        <Bell size={17} strokeWidth={1.7} /><span className="pip nc-bell-pip" />
                    </button>}
                    {showUtil('notes') && <button className="nc-iconbtn nc-notes" {...(!exp ? tipProps(tr('Notes')) : {})} title={exp ? tr('Notes') : undefined} onClick={() => navigate('/app/notes')}>
                        <NotebookPen size={17} strokeWidth={1.7} />
                    </button>}
                    {showUtil('nora') && <button className="nc-iconbtn nc-nora" {...(!exp ? tipProps(tr('Ask NORA')) : {})} title={exp ? tr('Ask NORA') : undefined} onClick={triggerNora}>
                        <Sparkles size={17} strokeWidth={1.7} />
                    </button>}
                    {/* collapsed-rail only: fold/unfold the secondary icons */}
                    {!forceExpanded && (
                        <button className="nc-iconbtn nc-more" {...(!exp ? tipProps(moreOpen ? tr('Less') : tr('More')) : {})}
                            onClick={() => setMoreOpen(o => !o)}>
                            <MoreHorizontal size={17} strokeWidth={1.7} />
                            <span className={cn('pip nc-more-pip', hiddenAlert && 'show')} />
                        </button>
                    )}
                </div>

                {/* module switcher (= app switcher) — hidden in the simplified
                    interface: a single flat workspace list, no module to pick */}
                {!isSimple && !isGuest && (
                <div style={{ position: 'relative' }}>
                    <button className="nc-switch" {...(!exp ? tipProps(allMode ? tr('All') : (currentAppData?.app_title || tr('Switch module'))) : {})} title={exp ? tr('Switch module') : undefined} onClick={() => setAppMenuOpen(o => !o)}>
                        <span className="sq">
                            {allMode ? <LayoutGrid size={17} strokeWidth={1.6} />
                                : appLogoUrl ? <img src={appLogoUrl} alt="" /> : <Briefcase size={17} strokeWidth={1.6} />}
                        </span>
                        {exp && <span className="meta nc-hide-collapsed">
                            <span className="n">{allMode ? tr('All') : (currentAppData?.app_title || 'ERPNext')}</span>
                            <span className="s">{allMode ? tr('All Modules') : tr('Active module')}</span>
                        </span>}
                        {exp && <span className="ch nc-hide-collapsed"><ChevronsUpDown size={15} /></span>}
                    </button>
                    {appMenuOpen && (
                        <div className="nc-menu" style={{ top: '100%', left: 0, right: 0, marginTop: 0 }}>
                            <button className={cn('item', allMode && 'active')}
                                onClick={() => { setCurrentApp(ALL_APP); setAppMenuOpen(false) }}>
                                <LayoutGrid size={16} />
                                <span style={{ flex: 1 }}>{tr('All')}</span>
                            </button>
                            <div className="sep" />
                            {apps.map(app => (
                                <button key={app.app_name} className={cn('item', app.app_name === currentApp && 'active')} onClick={() => goApp(app)}>
                                    {app.app_logo_url ? <img src={app.app_logo_url} alt="" /> : <Circle size={14} />}
                                    <span style={{ flex: 1 }}>{app.app_title}</span>
                                </button>
                            ))}
                            {surfaceTiles.length > 0 && (
                                <>
                                    <div className="sep" />
                                    <div className="nc-app-tiles">
                                        {surfaceTiles.map(t => (
                                            <button key={t.name} className="tile" {...tipProps(t.title, t.description)}
                                                onClick={() => { setAppMenuOpen(false); if (t.route) window.location.href = t.route }}>
                                                {t.logo ? <img src={t.logo} alt="" /> : <LayoutGrid size={18} />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                            <div className="sep" />
                            {env === 'desk' && <button className="item" onClick={() => { setAppMenuOpen(false); openMobileApp() }}><Smartphone size={16} /><span>{tr('Mobile App')}</span></button>}
                            {env === 'desk' && <button className="item" onClick={() => { setAppMenuOpen(false); openBornes() }}><MonitorSmartphone size={16} /><span>{tr('Bornes')}</span></button>}
                            <button className="item" onClick={() => { setAppMenuOpen(false); window.open('/', '_blank', 'noopener') }}><Globe size={16} /><span>{tr('View Website')}</span></button>
                            {canConfigureCompany && <button className="item" onClick={() => { setAppMenuOpen(false); openCompanyConfig() }}><Settings size={16} /><span>{tr('Company Configuration')}</span></button>}
                        </div>
                    )}
                </div>
                )}

                {/* search (⌘G) — prominent slot (no org switcher in Neoffice).
                    In env="desk" the HOST owns submit (the desk binds its Awesome
                    Bar mega-panel onto this input) — no internal Enter handling. */}
                <div className="nc-search" {...(onSearch ? { onClick: () => onSearch() } : {})} {...(!exp ? tipProps(tr('Search…')) : {})}
                    onClick={(e) => {
                        if (env === 'desk') return // the desk opens its centered overlay on mousedown
                        const input = e.currentTarget.querySelector('input') as HTMLInputElement | null
                        if (input) input.focus()
                        else setPinned(true) // collapsed rail: expand so the field appears
                    }}>
                    <span className="si"><Search size={16} strokeWidth={1.7} /></span>
                    {exp && <input ref={forceExpanded ? undefined : searchRef} placeholder={tr('Search…')}
                        readOnly={!!onSearch}
                        style={onSearch ? { cursor: 'pointer' } : undefined}
                        onClick={onSearch ? () => onSearch() : undefined}
                        onKeyDown={onSearch || env === 'desk' ? undefined : e => { if (e.key === 'Enter') submitSearch((e.target as HTMLInputElement).value) }} />}
                    {exp && <span className="kbd">{searchKbd || (isMac ? '⌘G' : 'Ctrl G')}</span>}
                </div>

                {/* favorites — only appears once the user starred something */}
                {favorites.length > 0 && (
                    <button className={cn('nc-fav-trigger', openPanel === 'favorites' && 'active')}
                        {...(!exp ? tipProps(tr('Favorites')) : {})}
                        title={exp ? tr('Favorites') : undefined}
                        onClick={() => setOpenPanel(p => p === 'favorites' ? null : 'favorites')}>
                        <span className="fi"><Star size={16} strokeWidth={1.7} /></span>
                        {exp && <span className="fl">{tr('Favorites')}</span>}
                        {exp && <span className="fc">{favorites.length}</span>}
                    </button>
                )}

                {/* navigation (workspaces, read-only — ADR-007).
                    Standalone surfaces: when their own module is selected the
                    nav renders contextNav (the app's native items). */}
                <nav className="nc-nav" style={{ marginTop: 4 }}>
                    {/* simplified interface: flat "Simple *" workspaces, no group */}
                    {isSimple && !surfaceNavActive() && simpleWorkspaces.map(ws => {
                        const Icon = getIcon(ws.icon)
                        const active = route.includes('/' + ws.name.toLowerCase().replace(/\s+/g, '-'))
                        return (
                            <button key={ws.name} className={cn('nc-navitem', active && 'active')}
                                title={exp ? ws.label : undefined} {...(!exp ? tipProps(ws.label) : {})}
                                onClick={() => goWorkspace(ws)}>
                                <span className="ni"><Icon size={19} strokeWidth={1.6} /></span>
                                {exp && <span className="nl">{ws.label}</span>}
                            </button>
                        )
                    })}
                    {surfaceNavActive() && contextNav && contextNav.map((sec, si) => (
                        <div key={si} className="nc-ctx-sec">
                            {sec.label && exp && <div className="nc-ctx-label">{tr(sec.label)}</div>}
                            {sec.items.map((it, ii) => {
                                const Icon = getIcon(it.icon)
                                return (
                                    <button key={ii}
                                        className={cn('nc-navitem', it.active && 'active')}
                                        {...(!exp ? tipProps(it.label) : {})}
                                        title={exp ? it.label : undefined}
                                        onClick={() => { if (it.onClick) it.onClick(); else if (it.route) navigate(it.route) }}>
                                        {/* //// Neoffice: colour swatch for calendars (hollow when hidden), else the lucide icon //// */}
                                        <span className="ni">
                                            {it.color
                                                ? <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', border: `2px solid ${it.color}`, backgroundColor: it.dim ? 'transparent' : it.color }} />
                                                : <Icon size={18} strokeWidth={1.6} />}
                                        </span>
                                        {exp && <span className="nl">{it.label}</span>}
                                        {/* //// Neoffice: shared-calendar indicator with tooltip //// */}
                                        {exp && it.shared && (
                                            <span className="nc-ctx-shared" title={it.sharedTitle} style={{ marginLeft: 'auto', display: 'inline-flex', opacity: 0.7 }}>
                                                <Users size={13} strokeWidth={1.6} />
                                            </span>
                                        )}
                                        {/* //// Neoffice: per-item gear (calendar settings menu) //// */}
                                        {exp && it.onGear && (
                                            <span
                                                role="button"
                                                title={tr('Settings')}
                                                className="nc-ctx-gear"
                                                style={{ marginLeft: it.shared ? '6px' : 'auto', display: 'inline-flex', opacity: 0.55, cursor: 'pointer' }}
                                                onClick={(e) => { e.stopPropagation(); it.onGear!() }}
                                            >
                                                <Settings size={14} strokeWidth={1.6} />
                                            </span>
                                        )}
                                        {exp && it.badge != null && it.badge !== '' && <span className="nc-ctx-badge">{it.badge}</span>}
                                    </button>
                                )
                            })}
                        </div>
                    ))}
                    {!isSimple && !surfaceNavActive() && allMode && exp && appGroups.map(({ app, items }) => {
                        // desk: the route opens the group; SPA: click toggles it
                        const groupActive = env === 'spa'
                            ? openGroup === app.app_name
                            : app.app_name === activeGroupName
                        return (
                            <div key={app.app_name} className="nc-group">
                                <button
                                    className={cn('nc-navitem', groupActive && 'active')}
                                    title={app.app_title}
                                    onClick={() => {
                                        if (env === 'spa' && items.length) {
                                            setOpenGroup(g => (g === app.app_name ? '' : app.app_name))
                                            return
                                        }
                                        items.length ? goWorkspace(items[0]) : goApp(app)
                                    }}
                                >
                                    <span className="ni">
                                        {app.app_logo_url ? <img src={app.app_logo_url} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} /> : <LayoutGrid size={18} strokeWidth={1.6} />}
                                    </span>
                                    <span className="nl">{app.app_title}</span>
                                </button>
                                {groupActive && items.length > 0 && (
                                    <div className="nc-sub">
                                        {items.map(ws => {
                                            const wsLabel = stripModulePrefix(ws.label || tr(ws.title || ws.name), app.app_title)
                                            return (
                                                <button key={ws.name} className={cn('nc-subitem', isWsActive(ws) && 'on')} title={wsLabel} onClick={() => goWorkspace(ws)}>
                                                    {wsLabel}
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    {!isSimple && !surfaceNavActive() && allMode && !exp && appGroups.map(({ app, items }) => (
                        <button key={app.app_name}
                            className={cn('nc-navitem', app.app_name === activeGroupName && 'active')}
                            {...(items.length ? {} : tipProps(app.app_title))}
                            onMouseEnter={items.length ? (e) => {
                                flyKeep()
                                const r = (e.currentTarget as Element).getBoundingClientRect()
                                setFlyout({ app, items, top: r.top })
                            } : undefined}
                            onMouseLeave={items.length ? flyClose : undefined}
                            onClick={() => {
                                setFlyout(null)
                                items.length ? goWorkspace(items[0]) : goApp(app)
                            }}>
                            <span className="ni">
                                {app.app_logo_url ? <img src={app.app_logo_url} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} /> : <LayoutGrid size={18} strokeWidth={1.6} />}
                            </span>
                        </button>
                    ))}
                    {!isSimple && !surfaceNavActive() && !allMode && filteredWorkspaces.map(ws => {
                        const Icon = getIcon(ws.icon)
                        const slug = ws.name.toLowerCase().replace(/\s+/g, '-')
                        const active = route.includes('/' + slug)
                        // `label` is the pre-translated FR display name (desk); fall back to tr(title)
                        const wsLabel = stripModulePrefix(ws.label || tr(ws.title || ws.name), currentAppData?.app_title)
                        return (
                            <button key={ws.name} className={cn('nc-navitem', active && 'active')}
                                title={exp ? wsLabel : undefined} {...(!exp ? tipProps(wsLabel) : {})}
                                onClick={() => goWorkspace(ws)}>
                                <span className="ni"><Icon size={19} strokeWidth={1.6} /></span>
                                {exp && <span className="nl">{wsLabel}</span>}
                            </button>
                        )
                    })}
                </nav>

                {/* surface meta block (e.g. Drive storage) above the collapse line */}
                {contextFooter && exp && (
                    <div className={cn('nc-ctx-footer', contextFooter.onClick && 'clickable')}
                        onClick={contextFooter.onClick}>
                        <div className="row">
                            <Cloud size={14} strokeWidth={1.7} />
                            <span className="l">{contextFooter.label}</span>
                        </div>
                        {contextFooter.percent != null && (
                            <div className="bar"><span style={{ width: Math.min(100, contextFooter.percent) + '%' }} /></div>
                        )}
                        {contextFooter.sub && <div className="s">{contextFooter.sub}</div>}
                    </div>
                )}

                {/* collapse control — discreet line above the user block */}
                {!forceExpanded && (
                    <button className="nc-collapse" {...(!exp ? tipProps(tr('Expand')) : {})}
                        title={exp ? undefined : tr('Expand')} onClick={() => setPinned(!pinned)}>
                        {pinned ? <PanelLeftClose size={16} strokeWidth={1.7} /> : <PanelLeftOpen size={16} strokeWidth={1.7} />}
                        {exp && <span className="nc-hide-collapsed">{tr('Collapse menu')}</span>}
                    </button>
                )}

                {/* footer: user + kebab menu (quick settings) */}
                <div className="nc-foot" style={{ position: 'relative' }}>
                    {userMenuOpen && (
                        <div className="nc-menu" style={{ bottom: '100%', left: 0, right: 0, marginBottom: 6 }}>
                            {!isGuest && (
                            <div className="uhead">
                                <div className="n">{userName}</div>
                                <div className="e">{boot?.user?.email || ''}</div>
                            </div>
                            )}
                            <div className="nc-cmode">
                                <span className="lbl">{tr('Color mode')}</span>
                                <div className="seg">
                                    <button className={cn(colorMode === 'system' && 'on')} title={tr('System')} onClick={() => applyColorMode('system')}><Monitor size={15} /></button>
                                    <button className={cn(colorMode === 'light' && 'on')} title={tr('Light')} onClick={() => applyColorMode('light')}><Sun size={15} /></button>
                                    <button className={cn(colorMode === 'dark' && 'on')} title={tr('Dark')} onClick={() => applyColorMode('dark')}><Moon size={15} /></button>
                                </div>
                            </div>
                            {!isGuest && <>
                            <div className="nc-seg">
                                <span className="lbl">{tr('Interface')}</span>
                                <button className={cn(isSimple && 'on')} onClick={() => switchMode('Simple')}>{tr('Simple')}</button>
                                <button className={cn(!isSimple && 'on')} onClick={() => switchMode('Advanced')}>{tr('Advanced')}</button>
                            </div>
                            <div className="nc-seg">
                                <span className="lbl">{tr('Width')}</span>
                                <button className={cn(formWidth === 'Standard' && 'on')} title={tr('Standard')} onClick={() => switchFormWidth('Standard')}>S</button>
                                <button className={cn(formWidth === 'Large' && 'on')} title={tr('Large')} onClick={() => switchFormWidth('Large')}>M</button>
                                <button className={cn(formWidth === 'Full Width' && 'on')} title={tr('Full Width')} onClick={() => switchFormWidth('Full Width')}>L</button>
                            </div>
                            <div className="sep" />
                            <button className="item" onClick={() => navigate('/app/user-profile')}><Settings size={16} /><span>{tr('Account settings')}</span></button>
                            <button className="item" onClick={() => { setUserMenuOpen(false); if (onHelp) { onHelp() } else { setOpenPanel('help') } }}><BookOpen size={16} /><span>{tr('Documentation')}</span></button>
                            <button className="item" onClick={openCalculator}><Calculator size={16} /><span>{tr('Calculator')}</span></button>
                            <button className="item" onClick={() => navigate(homeUrl)}><Home size={16} /><span>{tr('Home')}</span></button>
                            <button className="item" onClick={() => { setUserMenuOpen(false); window.open('/', '_blank', 'noopener') }}><Globe size={16} /><span>{tr('View Website')}</span></button>
                            <div className="sep" />
                            <button className="item" onClick={() => {
                                // proper logout: GET /api/method/logout returns raw JSON (no redirect).
                                // Use Frappe's own logout on the desk (clears session + redirects); on SPA
                                // surfaces POST the logout then send the user to /login.
                                const w = window as unknown as { frappe?: { app?: { logout?: () => void } }; csrf_token?: string }
                                if (w.frappe?.app?.logout) { w.frappe.app.logout(); return }
                                fetch('/api/method/logout', { method: 'POST', headers: { 'X-Frappe-CSRF-Token': w.csrf_token || '' } })
                                    .finally(() => { window.location.href = '/login' })
                            }}><LogOut size={16} /><span>{tr('Logout')}</span></button>
                            </>}
                            {isGuest && <>
                                <div className="sep" />
                                <button className="item" onClick={() => {
                                    window.location.href = '/login?redirect-to=' + encodeURIComponent(window.location.pathname)
                                }}><LogIn size={16} /><span>{tr('Log in')}</span></button>
                            </>}
                        </div>
                    )}
                    {isGuest ? (
                        <button className="nc-user" title={exp ? tr('Log in') : undefined} {...(!exp ? tipProps(tr('Log in')) : {})}
                            onClick={() => setUserMenuOpen(o => !o)}>
                            <span className="ua" style={{ background: 'transparent' }}><LogIn size={17} strokeWidth={1.7} /></span>
                            {exp && <span className="um nc-hide-collapsed">
                                <span className="n">{tr('Log in')}</span>
                            </span>}
                            {exp && <span className="uk nc-hide-collapsed"><MoreVertical size={16} /></span>}
                        </button>
                    ) : (
                    <button className="nc-user" title={exp ? userName : undefined} {...(!exp ? tipProps(userName) : {})} onClick={() => setUserMenuOpen(o => !o)}>
                        <span className="ua" style={{ background: userImage ? 'transparent' : colorFromName(userName) }}>
                            {userImage ? <img src={userImage} alt="" /> : userAbbr}
                        </span>
                        {exp && <span className="um nc-hide-collapsed">
                            <span className="n">{userName}</span>
                            <span className="e">{boot?.user?.email || ''}</span>
                        </span>}
                        {exp && <span className="uk nc-hide-collapsed"><MoreVertical size={16} /></span>}
                    </button>
                    )}
                </div>
            </>
        )
    }

    const effExpanded = narrow ? false : expanded
    const sideClass = cn('nc-side', effExpanded ? 'expanded' : 'collapsed', 'responsive')

    const mobileBar = (
        <div className="nc-mobilebar">
            <button className="nc-iconbtn" aria-label={tr('Open navigation')} onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
            <LogoLink onClick={() => navigate(homeUrl)} height={18} />
            {/* search is a BUTTON, not an input: tapping never types here, it opens
                the real search (host overlay, or the drawer as a fallback). It
                shrinks with the bar and collapses to just the loupe on narrow
                screens (the placeholder hides). */}
            <button className="nc-mobilesearch" aria-label={tr('Search…')}
                onClick={() => { if (onSearch) onSearch(); else setMobileOpen(true) }}>
                <Search size={16} strokeWidth={1.7} />
                <span className="ph">{tr('Search…')}</span>
            </button>
            <button className="nc-iconbtn nc-bell" title={tr('Notifications')} onClick={triggerBell}><Bell size={18} /><span className="pip nc-bell-pip" /></button>
        </div>
    )
    const desktopAside = (
        <aside className={sideClass} style={{ width: effExpanded ? 'var(--nc-w-expanded)' : 'var(--nc-w-collapsed)' }}>
            {sidebarBody()}
        </aside>
    )
    const drawer = (
        <>
            <div className={cn('nc-overlay', mobileOpen && 'open')} onClick={() => setMobileOpen(false)} />
            <div className={cn('nc-drawer', mobileOpen && 'open')}>
                <aside className="nc-side expanded">{sidebarBody(true)}</aside>
            </div>
        </>
    )

    const tooltipNode = tip ? (
        <div key={tip.text + ':' + Math.round(tip.y)} className="nc-tooltip" style={{ left: tip.x, top: tip.y }}>
            <span className="tt">{tip.text}</span>
            {tip.sub && <span className="ts">{tip.sub}</span>}
        </div>
    ) : null

    // companion panels — anchored next to the rail. The mail chooser/panel
    // works on BOTH desk and SPA; bell/synk/help fall back to embedded
    // panels only on SPAs (the desk has richer native modules for those).
    const showPanels = openPanel && (spaPanels || openPanel === 'mailmenu' || openPanel === 'mail' || openPanel === 'favorites' || openPanel === 'events')
    // anchor panels just right of the rail's REAL edge (theme may widen it)
    const anchorLeft = (() => {
        if (typeof document === 'undefined') return expanded ? 268 : 90
        const aside = document.querySelector('.nc-side')
        return aside ? Math.round(aside.getBoundingClientRect().right) + 10 : (effExpanded ? 268 : 90)
    })()
    // collapsed-rail module flyout (the side dropdown to reach children);
    // keeps itself open while hovered (grace timer pairs with the rail icon)
    const flyoutNode = flyout ? (
        <div className="nc-flyout" style={{ left: anchorLeft, top: Math.max(60, flyout.top - 8) }}
            onMouseEnter={flyKeep} onMouseLeave={flyClose}>
            <div className="fh">{flyout.app.app_title}</div>
            {flyout.items.map(ws => {
                const wsLabel = ws.label || tr(ws.title || ws.name)
                return (
                    <button key={ws.name} className={cn('fi', isWsActive(ws) && 'on')}
                        onClick={() => { setFlyout(null); goWorkspace(ws) }}>
                        {wsLabel}
                    </button>
                )
            })}
        </div>
    ) : null

    const panelsNode = showPanels ? (
        <div className="nc-spa-panel-anchor" style={{ left: anchorLeft }}>
            {openPanel === 'bell' && <NotificationsPanel tr={tr} onClose={() => setOpenPanel(null)} />}
            {openPanel === 'synk' && (
                <SynkPanel tr={tr}
                    userInfo={(boot?.user_info || {}) as Record<string, { fullname?: string }>}
                    onClose={() => setOpenPanel(null)} />
            )}
            {openPanel === 'help' && <HelpPanel tr={tr} wikiUrl={wikiUrl} onClose={() => setOpenPanel(null)} />}
            {openPanel === 'mailmenu' && (
                <MailMenu tr={tr}
                    onSynk={onSynk ? () => { setOpenPanel(null); onSynk() }
                        : (spaPanels ? () => setOpenPanel('synk') : null)}
                    onMail={() => setOpenPanel('mail')}
                    onConfigure={() => { setOpenPanel(null); navigate('/app/webmail') }}
                    onClose={() => setOpenPanel(null)} />
            )}
            {openPanel === 'favorites' && (
                <FavoritesPanel tr={tr} favorites={favorites}
                    onNavigate={(r) => { setOpenPanel(null); navigate(r) }}
                    onRemove={(f) => {
                        apiPost('neoffice_theme.cockpit_favorites.toggle_favorite', { route: f.route })
                            .then(() => window.dispatchEvent(new CustomEvent('nf-favorites-changed')))
                    }}
                    onClose={() => setOpenPanel(null)} />
            )}
            {openPanel === 'mail' && (
                <MailPanel tr={tr}
                    onOpenWebmail={(q) => {
                        setOpenPanel(null)
                        // deep-links need a full page load: the webmail SPA only
                        // reads its ?compose/?uid intent on mount (applyUrlIntent)
                        if (q) window.location.href = '/app/webmail' + q
                        else navigate('/app/webmail')
                    }}
                    onClose={() => setOpenPanel(null)} />
            )}
            {openPanel === 'events' && (
                <EventsPanel tr={tr} events={events}
                    onNavigate={(r) => { setOpenPanel(null); navigate(r) }}
                    onClose={() => setOpenPanel(null)} />
            )}
        </div>
    ) : null

    // Desk: sidebar-only. display:contents wrapper → the <aside> is an in-flow
    // flex child of the host (body styled as .nc-frame by neoffice_theme); the
    // desk's own main-section plays the floating panel. CSS vars still cascade.
    if (layout === 'sidebar') {
        return (
            <div className={cn('neocockpit', className)} ref={rootRef} style={{ display: 'contents' }}>
                {mobileBar}
                {desktopAside}
                {drawer}
                {tooltipNode}
                {panelsNode}
                {flyoutNode}
            </div>
        )
    }

    // Shell (SPAs): gray frame + sidebar + floating white panel (children).
    return (
        <div className={cn('neocockpit nc-frame', className)} ref={rootRef}>
            {mobileBar}
            {desktopAside}
            {children !== undefined && <main className="nc-panel">{children}</main>}
            {drawer}
            {tooltipNode}
            {panelsNode}
            {flyoutNode}
        </div>
    )
}

export default NeoCockpit
export type NeoCockpitNode = ReactNode
