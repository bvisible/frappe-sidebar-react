import { useState, useEffect, useMemo, useCallback, ButtonHTMLAttributes, type SVGProps } from 'react'
import {
    Activity,
    ArrowLeft,
    ArrowRight,
    Award,
    Banknote,
    BarChart2,
    BarChart3,
    BookOpen,
    Briefcase,
    Building2,
    Calculator,
    Calendar,
    CalendarDays,
    CheckSquare,
    ChevronDown,
    Circle,
    DollarSign,
    Edit,
    ExternalLink,
    Factory,
    FileCheck,
    FileText,
    Filter,
    FolderOpen,
    Globe,
    GraduationCap,
    HandCoins,
    Headphones,
    Home,
    Image,
    Landmark,
    Layers,
    LayoutGrid,
    ListChecks,
    ListOrdered,
    Maximize,
    MapPin,
    Menu,
    MessageSquare,
    Minimize,
    Moon,
    Package,
    PieChart,
    Plus,
    Receipt,
    RefreshCw,
    Scale,
    Settings,
    ShoppingBag,
    ShoppingCart,
    SlidersHorizontal,
    Star,
    Store,
    Sun,
    Tag,
    Target,
    TrendingDown,
    TrendingUp,
    Trophy,
    UserCheck,
    Users,
    Wallet,
    Warehouse,
    Wrench,
    type LucideIcon
} from 'lucide-react'
import { cn } from './utils'

// Custom SVG icon for Fiduciary (not in lucide-react)
const FiduciaryIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16 10H4V6h11a1 1 0 0 1 1 1v3z" opacity=".5"/>
        <path d="M21 18H4v-8h17a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"/>
        <path d="M3 22a1 1 0 0 1-1-.999V3a1 1 0 0 1 2 0v18a1 1 0 0 1-.999 1H3z" opacity=".25"/>
    </svg>
)

// Map lucide-* icon names (from workspace.icon field) to Lucide React components
const lucideIconMap: Record<string, LucideIcon | typeof FiduciaryIcon> = {
    'activity': Activity,
    'banknote': Banknote,
    'bar-chart-2': BarChart2,
    'bar-chart-3': BarChart3,
    'book-open': BookOpen,
    'briefcase': Briefcase,
    'building-2': Building2,
    'calculator': Calculator,
    'calendar-days': CalendarDays,
    'chart-pie': PieChart,
    'credit-card': Banknote,
    'factory': Factory,
    'fiduciary': FiduciaryIcon,
    'file-text': FileText,
    'globe': Globe,
    'graduation-cap': GraduationCap,
    'hand-coins': HandCoins,
    'headphones': Headphones,
    'home': Home,
    'landmark': Landmark,
    'layout-grid': LayoutGrid,
    'life-buoy': Headphones,
    'list-checks': ListChecks,
    'package': Package,
    'pie-chart': PieChart,
    'receipt': Receipt,
    'scale': Scale,
    'settings': Settings,
    'shopping-bag': ShoppingBag,
    'shopping-cart': ShoppingCart,
    'sliders-horizontal': SlidersHorizontal,
    'star': Star,
    'store': Store,
    'tag': Tag,
    'trending-up': TrendingUp,
    'trophy': Trophy,
    'user-check': UserCheck,
    'users': Users,
    'wallet': Wallet,
    'warehouse': Warehouse,
    'wrench': Wrench,
}

// Legacy map: old Frappe/Espresso icon names → Lucide (fallback for non-migrated workspaces)
const legacyIconMap: Record<string, LucideIcon> = {
    'accounting': Calculator,
    'income': TrendingUp,
    'expenses': TrendingDown,
    'assets': Briefcase,
    'receivables': ArrowRight,
    'payables': ArrowLeft,
    'money-coins-1': DollarSign,
    'sell': ShoppingCart,
    'selling': ShoppingCart,
    'buying': Package,
    'crm': Target,
    'customer': Users,
    'users': Users,
    'stock': Package,
    'organization': Factory,
    'manufacturing': Factory,
    'tag': Tag,
    'hr': Users,
    'assign': Users,
    'project': FolderOpen,
    'list': ListOrdered,
    'support': Headphones,
    'quality': Award,
    'setting': Settings,
    'settings': Settings,
    'tool': Wrench,
    'integration': Layers,
    'getting-started': Star,
    'file': FileText,
    'folder-normal': FolderOpen,
    'filter': Filter,
    'edit': Edit,
    'add': Plus,
    'menu': Menu,
    'down': ChevronDown,
    'message-1': MessageSquare,
    'external-link': ExternalLink,
    'image': Image,
    'website': Globe,
    'web': Globe,
    'education': BookOpen,
    'refresh': RefreshCw,
    'map': MapPin,
    'star': Star,
    'milestone': FileCheck,
    'mark-as-read': CheckSquare,
    'group-by': LayoutGrid,
    'table': LayoutGrid,
    'change': RefreshCw,
    'non-profit': Calendar,
    'default': Circle,
}

// Button component with hover handling via inline styles
const SidebarButton = ({
    className,
    style,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <button
            className={className}
            style={{
                backgroundColor: isHovered ? '#f3f4f6' : 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                borderRadius: '0.65rem',
                padding: 'calc(0.25rem * 2)',
                ...style
            }}
            onMouseEnter={(e) => {
                setIsHovered(true)
                props.onMouseEnter?.(e)
            }}
            onMouseLeave={(e) => {
                setIsHovered(false)
                props.onMouseLeave?.(e)
            }}
            {...props}
        >
            {children}
        </button>
    )
}

interface WorkspacePage {
    name: string
    title: string
    icon?: string
    public?: boolean | number
    app?: string
    module?: string
    parent_page?: string
}

interface AppData {
    app_name: string
    app_title: string
    app_logo_url?: string
    app_route?: string
    workspaces: string[]
}

export interface FrappeSidebarProps {
    /** Default app to select (e.g., 'erpnext' for finance context) */
    defaultAppFilter?: string[]
    /** Custom class name for the sidebar container */
    className?: string
    /** Logo URL override */
    logoUrl?: string
    /** If true, sidebar uses fixed positioning with spacer. If false, uses normal document flow. Default: true */
    fixed?: boolean
    /** URL to navigate when clicking on the logo. Default: '/app' */
    homeUrl?: string
}

declare global {
    interface Window {
        frappe?: {
            boot?: {
                sidebar_pages?: {
                    pages?: WorkspacePage[]
                }
                app_data?: AppData[]
                neoffice_settings?: {
                    interface_mode?: string
                }
                user?: {
                    name?: string
                    view_interface?: string
                }
            }
            db?: {
                set_value: (doctype: string, name: string, field: string, value: string) => Promise<unknown>
            }
            session?: {
                user?: string
            }
            ui?: {
                toolbar?: {
                    clear_cache: () => void
                }
                NeofficeCalculatorDialog?: {
                    show: () => void
                }
            }
            set_route?: (route: string) => void
        }
    }
}

const FrappeSidebar = ({ defaultAppFilter, className, logoUrl, fixed = true, homeUrl = '/app' }: FrappeSidebarProps = {}) => {
    // Pinned state - when true, sidebar stays expanded
    const [pinned, setPinned] = useState(() => {
        const saved = localStorage.getItem('frappe-sidebar-pinned')
        return saved ? JSON.parse(saved) : false
    })
    // Hover expanded state - temporary expansion on hover
    const [hoverExpanded, setHoverExpanded] = useState(false)
    const [workspaces, setWorkspaces] = useState<WorkspacePage[]>([])
    const [apps, setApps] = useState<AppData[]>([])
    const [currentApp, setCurrentApp] = useState<string>(() => {
        // Restore last selected app from localStorage
        return localStorage.getItem('frappe-sidebar-current-app') || ''
    })
    const [appMenuOpen, setAppMenuOpen] = useState(false)

    // Interface mode & tools
    const [interfaceMode, setInterfaceMode] = useState<string>(() => {
        const boot = window.frappe?.boot
        return boot?.neoffice_settings?.interface_mode ||
               boot?.user?.view_interface || 'Avancé'
    })
    const [isDark, setIsDark] = useState(() => {
        return document.documentElement.getAttribute('data-theme') === 'dark'
    })
    const [isFullscreen, setIsFullscreen] = useState(false)

    const isSimple = interfaceMode === 'Simple' || interfaceMode === 'Simplified'

    // Sidebar is expanded if pinned OR hover expanded
    const expanded = pinned || hoverExpanded

    useEffect(() => {
        const boot = window.frappe?.boot
        if (boot) {
            const pages = boot.sidebar_pages?.pages || []
            const appData = boot.app_data || []

            // Filter to parent pages only (no parent_page) and public ones
            const parentPages = pages.filter((p: WorkspacePage) =>
                !p.parent_page && (p.public === true || p.public === 1)
            )
            setWorkspaces(parentPages)
            setApps(appData)

            // Set default app only if no saved selection
            if (appData.length > 0) {
                const savedApp = localStorage.getItem('frappe-sidebar-current-app')
                // Check if saved app still exists in appData
                const savedAppExists = savedApp && appData.some((app: AppData) => app.app_name === savedApp)

                if (savedAppExists) {
                    setCurrentApp(savedApp)
                } else {
                    // No saved app or saved app no longer exists - use first app
                    setCurrentApp(appData[0].app_name)
                }
            }
        }
    }, [defaultAppFilter])

    // Save current app to localStorage when it changes
    useEffect(() => {
        if (currentApp) {
            localStorage.setItem('frappe-sidebar-current-app', currentApp)
        }
    }, [currentApp])

    useEffect(() => {
        localStorage.setItem('frappe-sidebar-pinned', JSON.stringify(pinned))
    }, [pinned])

    const getIcon = (iconName?: string): LucideIcon | typeof FiduciaryIcon => {
        if (!iconName) return Circle
        // Handle lucide-* prefix (new icon system)
        if (iconName.startsWith('lucide-')) {
            const name = iconName.slice(7)
            return lucideIconMap[name] || Circle
        }
        // Fallback to legacy Frappe/Espresso icon names
        return legacyIconMap[iconName] || Circle
    }

    const currentAppData = useMemo(() => {
        return apps.find(a => a.app_name === currentApp)
    }, [apps, currentApp])

    // Filter workspaces for current app
    const filteredWorkspaces = useMemo(() => {
        if (!currentAppData?.workspaces) return workspaces.slice(0, 20)
        return workspaces.filter(w =>
            currentAppData.workspaces.includes(w.name)
        ).slice(0, 20)
    }, [workspaces, currentAppData])

    const navigateToWorkspace = (workspace: WorkspacePage) => {
        const slug = workspace.name.toLowerCase().replace(/\s+/g, '-')
        window.location.href = `/app/${slug}`
    }

    const navigateToApp = (app: AppData) => {
        setCurrentApp(app.app_name)
        setAppMenuOpen(false)
        if (app.app_route) {
            window.location.href = app.app_route
        }
    }

    const navigateToDesk = () => {
        window.location.href = homeUrl
    }

    const handleCollapseClick = () => {
        if (pinned) {
            setPinned(false)
            setHoverExpanded(false)
        } else {
            setPinned(true)
        }
    }

    // Helper: call Frappe REST API directly (works in SPA context without frappe.db)
    const frappeSetValue = useCallback((doctype: string, name: string, field: string, value: string) => {
        return fetch('/api/method/frappe.client.set_value', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': ((window as unknown) as Record<string, string>).csrf_token || '',
            },
            body: JSON.stringify({ doctype, name, fieldname: field, value }),
        })
    }, [])

    const switchMode = useCallback((mode: string) => {
        const dbMode = mode === 'Simple' ? 'Simplified' : 'Advanced'
        setInterfaceMode(mode)
        if (mode === 'Simple') {
            document.body.classList.add('simplified_view')
        } else {
            document.body.classList.remove('simplified_view')
        }
        const user = window.frappe?.session?.user || window.frappe?.boot?.user?.name || ''
        frappeSetValue('User', user, 'view_interface', dbMode)
            .then(() => { window.location.href = '/app/home' })
    }, [frappeSetValue])

    const toggleTheme = useCallback(() => {
        const newTheme = isDark ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', newTheme)
        setIsDark(!isDark)
        localStorage.setItem('theme_active', newTheme)
        const cap = newTheme.charAt(0).toUpperCase() + newTheme.slice(1)
        const user = window.frappe?.session?.user || window.frappe?.boot?.user?.name || ''
        frappeSetValue('User', user, 'desk_theme', cap)
            .then(() => { window.location.reload() })
    }, [isDark, frappeSetValue])

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {})
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }, [])

    const appLogoUrl = logoUrl || currentAppData?.app_logo_url

    // Sidebar content (shared between fixed and non-fixed modes)
    const sidebarContent = (
        <>
            {/* App Switcher */}
            <div className="p-2 relative">
                <div className={cn(
                    "w-full flex items-center gap-2 p-1.5 rounded-lg",
                    expanded ? "justify-start" : "justify-center"
                )}>
                    {/* Logo - clickable to navigate home */}
                    <div
                        className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                        onClick={navigateToDesk}
                        style={{ cursor: 'pointer' }}
                    >
                        {appLogoUrl ? (
                            <img
                                src={appLogoUrl}
                                alt=""
                                className="w-8 h-8 object-contain"
                                style={{ pointerEvents: 'none' }}
                            />
                        ) : (
                            <Briefcase className="w-8 h-8 text-gray-600" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
                        )}
                    </div>
                    {/* App name + dropdown toggle */}
                    {expanded && (
                        <SidebarButton
                            onClick={() => setAppMenuOpen(!appMenuOpen)}
                            className="flex items-center gap-2 flex-1"
                        >
                            <span
                                className="truncate flex-1 text-left"
                                style={{ fontWeight: 500, lineHeight: '16.1px' }}
                            >
                                {currentAppData?.app_title || 'ERPNext'}
                            </span>
                            <ChevronDown className={cn(
                                "w-4 h-4 text-gray-400 transition-transform",
                                appMenuOpen && "rotate-180"
                            )} strokeWidth={1.5} />
                        </SidebarButton>
                    )}
                </div>

                {/* App Menu Dropdown */}
                {appMenuOpen && expanded && (
                    <div
                        className="absolute right-2 top-14 bg-white border border-gray-200 shadow-lg z-50 py-1 overflow-y-auto"
                        style={{ left: '8px', borderRadius: '0.65em' }}
                    >
                        {apps.map((app) => (
                            <SidebarButton
                                key={app.app_name}
                                onClick={() => navigateToApp(app)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-left"
                                style={app.app_name === currentApp ? { backgroundColor: '#f9fafb' } : undefined}
                            >
                                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                    {app.app_logo_url ? (
                                        <img src={app.app_logo_url} alt="" className="w-4 h-4 object-contain" />
                                    ) : (
                                        <Circle className="w-3 h-3" strokeWidth={1.5} />
                                    )}
                                </div>
                                <span className="truncate">{app.app_title}</span>
                            </SidebarButton>
                        ))}
                        <div className="border-t border-gray-200 my-1" />
                        <SidebarButton
                            onClick={() => { window.location.href = '/' }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left"
                        >
                            <Globe className="w-4 h-4" strokeWidth={1.5} />
                            <span>Website</span>
                        </SidebarButton>

                        {/* Interface Mode Toggle */}
                        <div className="border-t border-gray-200 my-1" />
                        <div className="px-3 pt-2 pb-2">
                            <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: '6px' }}>
                                Interface Mode
                            </div>
                            <div className="flex rounded-lg overflow-hidden" style={{ border: '2px solid #3b82f6' }}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); switchMode('Simple') }}
                                    className="flex-1 py-1.5 text-center"
                                    style={{
                                        fontSize: '12px', fontWeight: 600,
                                        backgroundColor: isSimple ? '#3b82f6' : 'transparent',
                                        color: isSimple ? 'white' : '#3b82f6',
                                        border: 'none', cursor: 'pointer',
                                    }}
                                >Simple</button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); switchMode('Avancé') }}
                                    className="flex-1 py-1.5 text-center"
                                    style={{
                                        fontSize: '12px', fontWeight: 600,
                                        backgroundColor: !isSimple ? '#3b82f6' : 'transparent',
                                        color: !isSimple ? 'white' : '#3b82f6',
                                        border: 'none', cursor: 'pointer',
                                    }}
                                >Advanced</button>
                            </div>
                        </div>

                        {/* Quick Actions: Dark mode + Fullscreen */}
                        <div className="flex gap-2 px-3 pb-2">
                            <SidebarButton
                                onClick={(e) => { e.stopPropagation(); toggleTheme() }}
                                className="flex-1 flex items-center justify-center gap-2 py-1.5"
                            >
                                {isDark ? <Sun className="w-4 h-4" strokeWidth={1.5} /> : <Moon className="w-4 h-4" strokeWidth={1.5} />}
                                <span style={{ fontSize: '12px' }}>{isDark ? 'Light' : 'Dark'}</span>
                            </SidebarButton>
                            <SidebarButton
                                onClick={(e) => { e.stopPropagation(); toggleFullscreen() }}
                                className="flex items-center justify-center py-1.5 px-3"
                            >
                                {isFullscreen ? <Minimize className="w-4 h-4" strokeWidth={1.5} /> : <Maximize className="w-4 h-4" strokeWidth={1.5} />}
                            </SidebarButton>
                        </div>

                        {/* Settings */}
                        <div className="border-t border-gray-200 my-1" />
                        <SidebarButton
                            onClick={() => { window.location.href = '/app/settings' }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left"
                        >
                            <Settings className="w-4 h-4" strokeWidth={1.5} />
                            <span>Settings</span>
                        </SidebarButton>
                    </div>
                )}
            </div>

            {/* Workspace Items */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-1">
                <div className="flex flex-col gap-0.5 px-2">
                    {filteredWorkspaces.map((workspace) => {
                        const Icon = getIcon(workspace.icon)
                        return (
                            <SidebarButton
                                key={workspace.name}
                                onClick={() => navigateToWorkspace(workspace)}
                                className={cn(
                                    "w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900",
                                    expanded ? "justify-start" : "justify-center"
                                )}
                            >
                                <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                                {expanded && (
                                    <span className="truncate">
                                        {workspace.title || workspace.name}
                                    </span>
                                )}
                            </SidebarButton>
                        )
                    })}
                </div>
            </div>

            {/* Collapse Toggle */}
            <div className="p-2 border-t border-gray-100">
                <SidebarButton
                    onClick={handleCollapseClick}
                    className={cn(
                        "w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-gray-400",
                        expanded ? "justify-start" : "justify-center"
                    )}
                >
                    {pinned ? (
                        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                    ) : (
                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    )}
                    {expanded && (
                        <span>{pinned ? 'Collapse' : 'Expand'}</span>
                    )}
                </SidebarButton>
            </div>
        </>
    )

    // Base font styles for the sidebar
    const sidebarFontStyle = {
        fontFamily: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        fontSize: '13px',
        fontWeight: 420
    }

    // Fixed mode: use fixed positioning with spacer for collapsed state
    if (fixed) {
        return (
            <>
                {/* Spacer - only when collapsed in fixed mode */}
                {!pinned && <div className="flex-shrink-0" style={{ width: '50px' }} />}

                {/* Sidebar */}
                <div
                    className={cn(
                        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 flex-shrink-0",
                        !pinned && "fixed left-0 top-0 z-50",
                        !pinned && !expanded && "shadow-none",
                        !pinned && expanded && "shadow-lg",
                        className
                    )}
                    style={{
                        ...sidebarFontStyle,
                        width: pinned ? '208px' : (expanded ? '208px' : '50px')
                    }}
                    onMouseEnter={() => !pinned && setHoverExpanded(true)}
                    onMouseLeave={() => {
                        if (!pinned) {
                            setHoverExpanded(false)
                            setAppMenuOpen(false)
                        }
                    }}
                >
                    {sidebarContent}
                </div>
            </>
        )
    }

    // Non-fixed mode: sidebar is always in normal document flow
    return (
        <div
            className={cn(
                "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 flex-shrink-0",
                className
            )}
            style={{
                ...sidebarFontStyle,
                width: expanded ? '208px' : '50px'
            }}
            onMouseEnter={() => !pinned && setHoverExpanded(true)}
            onMouseLeave={() => {
                if (!pinned) {
                    setHoverExpanded(false)
                    setAppMenuOpen(false)
                }
            }}
        >
            {sidebarContent}
        </div>
    )
}

export default FrappeSidebar
