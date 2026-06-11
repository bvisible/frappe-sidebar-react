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
    Briefcase, Building2, Calculator, CalendarDays, CheckSquare, ChevronDown, Clock, Cloud,
    Circle, DollarSign, Edit, ExternalLink, Factory, FileCheck, FileText,
    Filter, FolderOpen, GalleryVerticalEnd, Globe, GraduationCap, HandCoins, Headphones, Home, Inbox,
    Image, Landmark, Layers, LayoutGrid, LifeBuoy, ListChecks, ListOrdered, Mail, MapPin,
    Maximize, Menu, MessageSquare, Minimize, Moon, MoreHorizontal, MoreVertical, Package,
    PieChart, Plus, Receipt, RefreshCw, Scale, Search, Settings, ShoppingBag,
    ShoppingCart, SlidersHorizontal, Sparkles, Star, Store, Sun, Tag, Target,
    Trash2, TrendingDown, TrendingUp, Trophy, UserCheck, Users, Wallet, Warehouse,
    Wrench, Bell, Monitor, ChevronsUpDown, LogOut, PanelLeftClose, PanelLeftOpen, type LucideIcon,
} from 'lucide-react'
import { cn } from './utils'
import { NeoLogo } from './NeoLogo'
import { NotificationsPanel, SynkPanel, HelpPanel, MailMenu, MailPanel, useUnreadNotifications, useUnreadSynk } from './SpaPanels'
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
    'user-check': UserCheck, 'users': Users, 'wallet': Wallet, 'warehouse': Warehouse, 'wrench': Wrench,
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
        }[]
    }[]
    /** Small meta block pinned above the collapse toggle (e.g. Drive storage). */
    contextFooter?: { label: string; sub?: string; percent?: number; onClick?: () => void }
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

const LogoLink = ({ onClick, mark = false, height }: { onClick?: () => void; mark?: boolean; height?: number }) => (
    <span onClick={onClick} style={{ display: 'inline-flex', cursor: 'pointer' }} title="Neoffice">
        <NeoLogo mark={mark} height={height} />
    </span>
)

function NeoCockpit({ env: envProp, onNavigate, homeUrl = '/app/home', onNora, onBell, onSynk, onHelp, defaultApp, surfaceApp, contextNav, contextFooter, children, layout = 'shell', className }: NeoCockpitProps = {}) {
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
    // SPA companion panels (notifications / synk / help): the desk provides
    // these through its own modules (onBell/onSynk/onHelp); SPA surfaces get
    // the embedded light panels so the rail behaves the same everywhere
    const [openPanel, setOpenPanel] = useState<null | 'bell' | 'synk' | 'help' | 'mailmenu' | 'mail'>(null)
    const spaPanels = env === 'spa'
    const spaSynkCount = useUnreadSynk(spaPanels && !onSynk)
    const spaNotifCount = useUnreadNotifications(spaPanels && !onBell)
    const wikiUrl = (boot as { neoffice_wiki_url?: string } | undefined)?.neoffice_wiki_url
        || 'https://neoservice.neoffice.me/wiki'
    const [time, setTime] = useState(formatTime)
    const [route, setRoute] = useState(() => (typeof location !== 'undefined' ? location.pathname + location.hash : ''))
    const [interfaceMode, setInterfaceMode] = useState<string>(() =>
        boot?.neoffice_settings?.interface_mode || boot?.user?.view_interface || 'Avancé')
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
    const expanded = pinned

    // ── boot → workspaces + apps
    useEffect(() => {
        if (!boot) return
        const pages = (boot.sidebar_pages?.pages || []).filter(p => !p.parent_page && (p.public === true || p.public === 1))
        setWorkspaces(pages)
        let appData = boot.app_data || []
        // standalone surface (Drive/LMS/…): present itself as a module
        if (surfaceApp && !appData.some(a => a.app_name === surfaceApp.name)) {
            appData = [
                { app_name: surfaceApp.name, app_title: surfaceApp.title, app_logo_url: surfaceApp.logo, workspaces: [] },
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
    // apply saved color mode on mount (local only, no backend write)
    useEffect(() => {
        const sysDark = typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.setAttribute('data-theme', colorMode === 'system' ? (sysDark ? 'dark' : 'light') : colorMode)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
    const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null)
    const showTip = (text: string) => (e: { currentTarget: Element }) => {
        const r = e.currentTarget.getBoundingClientRect()
        setTip({ text, x: r.right + 10, y: r.top + r.height / 2 })
    }
    const hideTip = () => setTip(null)
    const tipProps = (text: string) => ({ onMouseEnter: showTip(text), onMouseLeave: hideTip })

    // close menus on outside click
    const rootRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) { setAppMenuOpen(false); setUserMenuOpen(false); setOpenPanel(null) }
        }
        document.addEventListener('mousedown', onDown)
        return () => document.removeEventListener('mousedown', onDown)
    }, [])

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
        document.documentElement.setAttribute('data-theme', theme)
        try { localStorage.setItem('theme_active', theme) } catch { /* noop */ }
        const deskTheme = mode === 'system' ? 'Automatic' : mode[0].toUpperCase() + mode.slice(1)
        frappeSetValue('User', currentUser(), 'desk_theme', deskTheme).catch(() => {})
    }, [frappeSetValue])
    const openCalculator = () => { (window as unknown as FrappeWin).frappe?.ui?.NeofficeCalculatorDialog?.show?.() }
    // SPA surfaces lazy-load the REAL desk overlay (noraLoader shim) — the
    // /app/nora-chat route never existed, the button only opens the dialog
    const triggerNora = () => { if (onNora) onNora(); else openNoraQuickChat() }
    const triggerBell = () => { if (onBell) onBell(); else navigate('/app/notification-log') }
    const switchFormWidth = useCallback((value: string) => {
        setFormWidth(value)
        document.body.classList.remove('form-width-large', 'form-width-full')
        if (value === 'Large') document.body.classList.add('form-width-large')
        if (value === 'Full Width') document.body.classList.add('form-width-full')
        frappeSetValue('User', currentUser(), 'form_width', value).catch(() => {})
    }, [frappeSetValue])

    // ── search (⌘G focuses it; Enter routes to global search)
    const searchRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'g') { e.preventDefault(); setMobileOpen(false); searchRef.current?.focus() }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [])
    const submitSearch = (q: string) => { if (q.trim()) navigate('/app/search?q=' + encodeURIComponent(q.trim())) }

    // ── user info
    const myEmail = boot?.user?.email || boot?.user?.name || ''
    const myInfo: UserInfoEntry = (boot?.user_info && boot.user_info[myEmail]) || {}
    const userName = myInfo.fullname || boot?.user?.full_name || boot?.user?.email || tr('User')
    const userImage = myInfo.image || boot?.user?.user_image || ''
    const userAbbr = myInfo.abbr || computeAbbr(userName)
    const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform)
    const appLogoUrl = currentAppData?.app_logo_url

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
                    <span className="nc-logo-slot">
                        <LogoLink onClick={() => navigate(homeUrl)} mark={!exp} height={exp ? 22 : 26} />
                    </span>
                    <button className="nc-iconbtn nc-nora" {...(!exp ? tipProps(tr('Ask NORA')) : {})} title={exp ? tr('Ask NORA') : undefined} onClick={triggerNora}>
                        <Sparkles size={17} strokeWidth={1.7} />
                    </button>
                    <button className="nc-iconbtn nc-synk" {...(!exp ? tipProps(tr('Messages')) : {})} title={exp ? tr('Messages') : undefined}
                        onClick={() => setOpenPanel(p => p === 'mailmenu' || p === 'mail' || p === 'synk' ? null : 'mailmenu')}>
                        <Mail size={17} strokeWidth={1.7} />
                        <span className="nc-count">{spaPanels && !onSynk && spaSynkCount > 0 ? spaSynkCount : undefined}</span>
                    </button>
                    {/* the theme's SoftphoneWidget mounts its trigger here (desk only) */}
                    <span className="nc-phone-slot" style={{ display: 'contents' }} />
                    <button className={cn('nc-iconbtn nc-bell', spaPanels && !onBell && spaNotifCount > 0 && 'has-unseen')}
                        {...(!exp ? tipProps(tr('Notifications')) : {})} title={exp ? tr('Notifications') : undefined}
                        onClick={onBell ? triggerBell : (spaPanels ? () => setOpenPanel(p => p === 'bell' ? null : 'bell') : triggerBell)}>
                        <Bell size={17} strokeWidth={1.7} /><span className="pip nc-bell-pip" />
                    </button>
                    {(onHelp || spaPanels) && (
                        <button className="nc-iconbtn nc-help" {...(!exp ? tipProps(tr('Help & Training')) : {})} title={exp ? tr('Help & Training') : undefined}
                            onClick={onHelp || (() => setOpenPanel(p => p === 'help' ? null : 'help'))}>
                            <LifeBuoy size={17} strokeWidth={1.7} /><span className="nc-count" />
                        </button>
                    )}
                    {/* collapsed-rail only: fold/unfold the secondary icons */}
                    {!forceExpanded && (
                        <button className="nc-iconbtn nc-more" {...(!exp ? tipProps(moreOpen ? tr('Less') : tr('More')) : {})}
                            onClick={() => setMoreOpen(o => !o)}>
                            <MoreHorizontal size={17} strokeWidth={1.7} />
                            <span className={cn('pip nc-more-pip', hiddenAlert && 'show')} />
                        </button>
                    )}
                </div>

                {/* module switcher (= app switcher) */}
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
                            <div className="sep" />
                            <button className="item" onClick={() => navigate('/')}><Globe size={16} /><span>{tr('Website')}</span></button>
                            <button className="item" onClick={() => navigate('/app/settings')}><Settings size={16} /><span>{tr('Settings')}</span></button>
                        </div>
                    )}
                </div>

                {/* search (⌘G) — prominent slot (no org switcher in Neoffice).
                    In env="desk" the HOST owns submit (the desk binds its Awesome
                    Bar mega-panel onto this input) — no internal Enter handling. */}
                <div className="nc-search" {...(!exp ? tipProps(tr('Search…')) : {})}
                    onClick={(e) => {
                        if (env === 'desk') return // the desk opens its centered overlay on mousedown
                        const input = e.currentTarget.querySelector('input') as HTMLInputElement | null
                        if (input) input.focus()
                        else setPinned(true) // collapsed rail: expand so the field appears
                    }}>
                    <span className="si"><Search size={16} strokeWidth={1.7} /></span>
                    {exp && <input ref={forceExpanded ? undefined : searchRef} placeholder={tr('Search…')}
                        onKeyDown={env === 'desk' ? undefined : e => { if (e.key === 'Enter') submitSearch((e.target as HTMLInputElement).value) }} />}
                    {exp && <span className="kbd">{isMac ? '⌘G' : 'Ctrl G'}</span>}
                </div>

                {/* navigation (workspaces, read-only — ADR-007).
                    Standalone surfaces: when their own module is selected the
                    nav renders contextNav (the app's native items). */}
                <nav className="nc-nav" style={{ marginTop: 4 }}>
                    {surfaceApp && currentApp === surfaceApp.name && contextNav && contextNav.map((sec, si) => (
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
                                        <span className="ni"><Icon size={18} strokeWidth={1.6} /></span>
                                        {exp && <span className="nl">{it.label}</span>}
                                        {exp && it.badge != null && it.badge !== '' && <span className="nc-ctx-badge">{it.badge}</span>}
                                    </button>
                                )
                            })}
                        </div>
                    ))}
                    {!(surfaceApp && currentApp === surfaceApp.name && contextNav) && allMode && exp && appGroups.map(({ app, items }) => {
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
                                            const wsLabel = ws.label || tr(ws.title || ws.name)
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
                    {!(surfaceApp && currentApp === surfaceApp.name && contextNav) && allMode && !exp && appGroups.map(({ app, items }) => (
                        <button key={app.app_name}
                            className={cn('nc-navitem', app.app_name === activeGroupName && 'active')}
                            {...tipProps(app.app_title)}
                            onClick={() => (items.length ? goWorkspace(items[0]) : goApp(app))}>
                            <span className="ni">
                                {app.app_logo_url ? <img src={app.app_logo_url} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} /> : <LayoutGrid size={18} strokeWidth={1.6} />}
                            </span>
                        </button>
                    ))}
                    {!(surfaceApp && currentApp === surfaceApp.name && contextNav) && !allMode && filteredWorkspaces.map(ws => {
                        const Icon = getIcon(ws.icon)
                        const slug = ws.name.toLowerCase().replace(/\s+/g, '-')
                        const active = route.includes('/' + slug)
                        // `label` is the pre-translated FR display name (desk); fall back to tr(title)
                        const wsLabel = ws.label || tr(ws.title || ws.name)
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
                            <div className="uhead">
                                <div className="n">{userName}</div>
                                <div className="e">{boot?.user?.email || ''}</div>
                            </div>
                            <div className="nc-cmode">
                                <span className="lbl">{tr('Color mode')}</span>
                                <div className="seg">
                                    <button className={cn(colorMode === 'system' && 'on')} title={tr('System')} onClick={() => applyColorMode('system')}><Monitor size={15} /></button>
                                    <button className={cn(colorMode === 'light' && 'on')} title={tr('Light')} onClick={() => applyColorMode('light')}><Sun size={15} /></button>
                                    <button className={cn(colorMode === 'dark' && 'on')} title={tr('Dark')} onClick={() => applyColorMode('dark')}><Moon size={15} /></button>
                                </div>
                            </div>
                            <div className="nc-seg">
                                <span className="lbl">{tr('Interface')}</span>
                                <button className={cn(isSimple && 'on')} onClick={() => switchMode('Simple')}>{tr('Simple')}</button>
                                <button className={cn(!isSimple && 'on')} onClick={() => switchMode('Avancé')}>{tr('Advanced')}</button>
                            </div>
                            <div className="nc-seg">
                                <span className="lbl">{tr('Width')}</span>
                                <button className={cn(formWidth === 'Standard' && 'on')} title={tr('Standard')} onClick={() => switchFormWidth('Standard')}>S</button>
                                <button className={cn(formWidth === 'Large' && 'on')} title={tr('Large')} onClick={() => switchFormWidth('Large')}>M</button>
                                <button className={cn(formWidth === 'Full Width' && 'on')} title={tr('Full Width')} onClick={() => switchFormWidth('Full Width')}>L</button>
                            </div>
                            <div className="sep" />
                            <button className="item" onClick={() => navigate('/app/user-profile')}><Settings size={16} /><span>{tr('Account settings')}</span></button>
                            <button className="item" onClick={() => navigate('/wiki')}><BookOpen size={16} /><span>{tr('Documentation')}</span></button>
                            <button className="item" onClick={openCalculator}><Calculator size={16} /><span>{tr('Calculator')}</span></button>
                            <button className="item" onClick={() => navigate(homeUrl)}><Home size={16} /><span>{tr('Home')}</span></button>
                            <div className="sep" />
                            <button className="item" onClick={() => { window.location.href = '/api/method/logout' }}><LogOut size={16} /><span>{tr('Logout')}</span></button>
                        </div>
                    )}
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
            <div className="nc-search" style={{ margin: 0, flex: 1, maxWidth: 420 }} onClick={() => { setMobileOpen(true) }}>
                <span className="si"><Search size={16} /></span>
                <input placeholder={tr('Search…')} onKeyDown={env === 'desk' ? undefined : e => { if (e.key === 'Enter') submitSearch((e.target as HTMLInputElement).value) }} />
            </div>
            <span className="grow" />
            <button className="nc-iconbtn nc-bell" title={tr('Notifications')} onClick={triggerBell}><Bell size={18} /><span className="pip nc-bell-pip" /></button>
            <button className="nc-user" style={{ padding: 4, width: 'auto' }} onClick={() => navigate('/app/user-profile')}>
                <span className="ua" style={{ width: 30, height: 30, background: userImage ? 'transparent' : colorFromName(userName) }}>
                    {userImage ? <img src={userImage} alt="" /> : userAbbr}
                </span>
            </button>
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
            {tip.text}
        </div>
    ) : null

    // companion panels — anchored next to the rail. The mail chooser/panel
    // works on BOTH desk and SPA; bell/synk/help fall back to embedded
    // panels only on SPAs (the desk has richer native modules for those).
    const showPanels = openPanel && (spaPanels || openPanel === 'mailmenu' || openPanel === 'mail')
    // anchor panels just right of the rail's REAL edge (theme may widen it)
    const anchorLeft = (() => {
        if (typeof document === 'undefined') return expanded ? 268 : 90
        const aside = document.querySelector('.nc-side')
        return aside ? Math.round(aside.getBoundingClientRect().right) + 10 : (effExpanded ? 268 : 90)
    })()
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
            {openPanel === 'mail' && (
                <MailPanel tr={tr}
                    onOpenWebmail={() => { setOpenPanel(null); navigate('/app/webmail') }}
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
        </div>
    )
}

export default NeoCockpit
export type NeoCockpitNode = ReactNode
