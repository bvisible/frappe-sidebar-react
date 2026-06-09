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
    Briefcase, Building2, Calculator, CalendarDays, CheckSquare, ChevronDown,
    Circle, DollarSign, Edit, ExternalLink, Factory, FileCheck, FileText,
    Filter, FolderOpen, Globe, GraduationCap, HandCoins, Headphones, Home,
    Image, Landmark, Layers, LayoutGrid, ListChecks, ListOrdered, MapPin,
    Maximize, Menu, MessageSquare, Minimize, Moon, MoreVertical, Package,
    PieChart, Plus, Receipt, RefreshCw, Scale, Search, Settings, ShoppingBag,
    ShoppingCart, SlidersHorizontal, Sparkles, Star, Store, Sun, Tag, Target,
    TrendingDown, TrendingUp, Trophy, UserCheck, Users, Wallet, Warehouse,
    Wrench, Bell, Monitor, ChevronsUpDown, LogOut, PanelLeftClose, PanelLeftOpen, type LucideIcon,
} from 'lucide-react'
import { cn } from './utils'
import { NeoLogo } from './NeoLogo'
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
    /** Page content. When provided (shell layout), NeoCockpit renders the full
     *  shell: gray frame + sidebar + a floating white rounded panel wrapping it. */
    children?: ReactNode
    /** 'shell' (SPAs) renders frame + floating panel around `children`.
     *  'sidebar' (Frappe desk) renders only the sidebar as an in-flow flex child
     *  (wrapper is display:contents) — the host's own content area is the panel. */
    layout?: 'shell' | 'sidebar'
    className?: string
}

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

function NeoCockpit({ env: envProp, onNavigate, homeUrl = '/app/home', children, layout = 'shell', className }: NeoCockpitProps = {}) {
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
    const [time, setTime] = useState(formatTime)
    const [route, setRoute] = useState(() => (typeof location !== 'undefined' ? location.pathname + location.hash : ''))
    const [interfaceMode, setInterfaceMode] = useState<string>(() =>
        boot?.neoffice_settings?.interface_mode || boot?.user?.view_interface || 'Avancé')
    const [colorMode, setColorMode] = useState<'system' | 'light' | 'dark'>(() => {
        try { return (localStorage.getItem('neocockpit-colormode') as 'system' | 'light' | 'dark') || 'system' } catch { return 'system' }
    })

    const isSimple = interfaceMode === 'Simple' || interfaceMode === 'Simplified'
    const expanded = pinned

    // ── boot → workspaces + apps
    useEffect(() => {
        if (!boot) return
        const pages = (boot.sidebar_pages?.pages || []).filter(p => !p.parent_page && (p.public === true || p.public === 1))
        setWorkspaces(pages)
        const appData = boot.app_data || []
        setApps(appData)
        if (appData.length) {
            const saved = localStorage.getItem('neocockpit-app')
            const ok = saved && appData.some(a => a.app_name === saved)
            setCurrentApp(ok ? (saved as string) : appData[0].app_name)
        }
    }, [boot])

    useEffect(() => { if (currentApp) localStorage.setItem('neocockpit-app', currentApp) }, [currentApp])
    useEffect(() => { localStorage.setItem('neocockpit-pinned', JSON.stringify(pinned)) }, [pinned])
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

    // close menus on outside click
    const rootRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) { setAppMenuOpen(false); setUserMenuOpen(false) }
        }
        document.addEventListener('mousedown', onDown)
        return () => document.removeEventListener('mousedown', onDown)
    }, [])

    const currentAppData = useMemo(() => apps.find(a => a.app_name === currentApp), [apps, currentApp])
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

    // ── the sidebar body (shared between fixed desktop + mobile drawer)
    const SidebarBody = ({ forceExpanded = false }: { forceExpanded?: boolean }) => {
        const exp = forceExpanded || expanded
        return (
            <>
                {/* s-top: logo + wordmark + NORA + collapse + bell */}
                <div className="nc-top">
                    <LogoLink onClick={() => navigate(homeUrl)} mark={!exp} height={exp ? 19 : 26} />
                    {exp && <span className="grow nc-hide-collapsed" />}
                    {/* collapse/expand toggle — ALWAYS visible (incl. collapsed rail) */}
                    {!forceExpanded && (
                        <button className="nc-iconbtn ring" title={pinned ? tr('Collapse') : tr('Expand')} onClick={() => setPinned(!pinned)}>
                            {pinned ? <PanelLeftClose size={17} strokeWidth={1.7} /> : <PanelLeftOpen size={17} strokeWidth={1.7} />}
                        </button>
                    )}
                    <button className="nc-iconbtn" title={tr('Ask NORA')} onClick={() => navigate('/app/nora-chat')}>
                        <Sparkles size={18} strokeWidth={1.6} style={{ color: 'var(--nc-accent)' }} />
                    </button>
                    <button className="nc-iconbtn" title={tr('Notifications')}>
                        <Bell size={16} strokeWidth={1.7} /><span className="pip" />
                    </button>
                </div>

                {/* module switcher (= app switcher) */}
                <div style={{ position: 'relative' }}>
                    <button className="nc-switch" title={tr('Switch module')} onClick={() => setAppMenuOpen(o => !o)}>
                        <span className="sq">
                            {appLogoUrl ? <img src={appLogoUrl} alt="" /> : <Briefcase size={17} strokeWidth={1.6} />}
                        </span>
                        {exp && <span className="meta nc-hide-collapsed">
                            <span className="n">{currentAppData?.app_title || 'ERPNext'}</span>
                            <span className="s">{tr('Active module')}</span>
                        </span>}
                        {exp && <span className="ch nc-hide-collapsed"><ChevronsUpDown size={15} /></span>}
                    </button>
                    {appMenuOpen && (
                        <div className="nc-menu" style={{ top: '100%', left: 0, right: 0, marginTop: 4 }}>
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

                {/* search (⌘G) — prominent slot (no org switcher in Neoffice) */}
                <div className="nc-search" onClick={() => searchRef.current?.focus()}>
                    <span className="si"><Search size={16} strokeWidth={1.7} /></span>
                    {exp && <input ref={searchRef} placeholder={tr('Search…')}
                        onKeyDown={e => { if (e.key === 'Enter') submitSearch((e.target as HTMLInputElement).value) }} />}
                    {exp && <span className="kbd">{isMac ? '⌘G' : 'Ctrl G'}</span>}
                </div>

                {/* navigation (workspaces, read-only — ADR-007) */}
                <nav className="nc-nav" style={{ marginTop: 4 }}>
                    {filteredWorkspaces.map(ws => {
                        const Icon = getIcon(ws.icon)
                        const slug = ws.name.toLowerCase().replace(/\s+/g, '-')
                        const active = route.includes('/' + slug)
                        // `label` is the pre-translated FR display name (desk); fall back to tr(title)
                        const wsLabel = ws.label || tr(ws.title || ws.name)
                        return (
                            <button key={ws.name} className={cn('nc-navitem', active && 'active')} title={wsLabel} onClick={() => goWorkspace(ws)}>
                                <span className="ni"><Icon size={19} strokeWidth={1.6} /></span>
                                {exp && <span className="nl">{wsLabel}</span>}
                            </button>
                        )
                    })}
                </nav>

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
                            <div className="sep" />
                            <button className="item" onClick={() => navigate('/app/user-profile')}><Settings size={16} /><span>{tr('Account settings')}</span></button>
                            <button className="item" onClick={() => navigate('/wiki')}><BookOpen size={16} /><span>{tr('Documentation')}</span></button>
                            <button className="item" onClick={openCalculator}><Calculator size={16} /><span>{tr('Calculator')}</span></button>
                            <button className="item" onClick={() => navigate(homeUrl)}><Home size={16} /><span>{tr('Home')}</span></button>
                            <div className="sep" />
                            <button className="item" onClick={() => { window.location.href = '/api/method/logout' }}><LogOut size={16} /><span>{tr('Logout')}</span></button>
                        </div>
                    )}
                    <button className="nc-user" title={userName} onClick={() => setUserMenuOpen(o => !o)}>
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

    const sideClass = cn('nc-side', expanded ? 'expanded' : 'collapsed', 'responsive')

    const mobileBar = (
        <div className="nc-mobilebar">
            <button className="nc-iconbtn" aria-label={tr('Open navigation')} onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
            <LogoLink onClick={() => navigate(homeUrl)} height={18} />
            <div className="nc-search" style={{ margin: 0, flex: 1, maxWidth: 420 }} onClick={() => { setMobileOpen(true) }}>
                <span className="si"><Search size={16} /></span>
                <input placeholder={tr('Search…')} onKeyDown={e => { if (e.key === 'Enter') submitSearch((e.target as HTMLInputElement).value) }} />
            </div>
            <span className="grow" />
            <button className="nc-iconbtn" title={tr('Notifications')}><Bell size={18} /><span className="pip" /></button>
            <button className="nc-user" style={{ padding: 4, width: 'auto' }} onClick={() => navigate('/app/user-profile')}>
                <span className="ua" style={{ width: 30, height: 30, background: userImage ? 'transparent' : colorFromName(userName) }}>
                    {userImage ? <img src={userImage} alt="" /> : userAbbr}
                </span>
            </button>
        </div>
    )
    const desktopAside = (
        <aside className={sideClass} style={{ width: expanded ? 'var(--nc-w-expanded)' : 'var(--nc-w-collapsed)' }}>
            <SidebarBody />
        </aside>
    )
    const drawer = (
        <>
            <div className={cn('nc-overlay', mobileOpen && 'open')} onClick={() => setMobileOpen(false)} />
            <div className={cn('nc-drawer', mobileOpen && 'open')}>
                <aside className="nc-side expanded"><SidebarBody forceExpanded /></aside>
            </div>
        </>
    )

    // Desk: sidebar-only. display:contents wrapper → the <aside> is an in-flow
    // flex child of the host (body styled as .nc-frame by neoffice_theme); the
    // desk's own main-section plays the floating panel. CSS vars still cascade.
    if (layout === 'sidebar') {
        return (
            <div className={cn('neocockpit', className)} ref={rootRef} style={{ display: 'contents' }}>
                {mobileBar}
                {desktopAside}
                {drawer}
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
        </div>
    )
}

export default NeoCockpit
export type NeoCockpitNode = ReactNode
