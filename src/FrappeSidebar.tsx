import { useState, useEffect, useMemo, ButtonHTMLAttributes } from 'react'
import {
    Briefcase,
    Users,
    FileText,
    Wrench,
    RefreshCw,
    ChevronDown,
    Circle,
    Settings,
    Headphones,
    ArrowRight,
    ArrowLeft,
    Home,
    ShoppingCart,
    Package,
    Factory,
    Calculator,
    FolderOpen,
    Tag,
    Star,
    ListOrdered,
    FileCheck,
    MapPin,
    Calendar,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Filter,
    Edit,
    Plus,
    Menu,
    ExternalLink,
    Image,
    MessageSquare,
    BookOpen,
    Award,
    Target,
    Layers,
    CheckSquare,
    LayoutGrid,
    Globe,
    type LucideIcon
} from 'lucide-react'
import { cn } from './utils'

// Map Frappe icon names to Lucide icons
const iconMap: Record<string, LucideIcon> = {
    // Accounting & Finance
    'accounting': Calculator,
    'income': TrendingUp,
    'expenses': TrendingDown,
    'assets': Briefcase,
    'liabilities': TrendingDown,
    'receivables': ArrowRight,
    'payables': ArrowLeft,
    'money-coins-1': DollarSign,

    // Sales & CRM
    'sell': ShoppingCart,
    'selling': ShoppingCart,
    'buying': Package,
    'crm': Target,
    'customer': Users,
    'users': Users,

    // Stock & Manufacturing
    'stock': Package,
    'organization': Factory,
    'manufacturing': Factory,
    'tag': Tag,
    'change': RefreshCw,

    // HR
    'hr': Users,
    'assign': Users,
    'milestone': FileCheck,
    'non-profit': Calendar,

    // Projects
    'project': FolderOpen,
    'list': ListOrdered,
    'list-alt': ListOrdered,
    'mark-as-read': CheckSquare,

    // Support & Quality
    'support': Headphones,
    'quality': Award,

    // Settings & Tools
    'setting': Settings,
    'settings': Settings,
    'customization': Settings,
    'tool': Wrench,
    'integration': Layers,
    'getting-started': Star,

    // Files & Documents
    'file': FileText,
    'small-file': FileText,
    'folder-normal': FolderOpen,

    // Navigation & UI
    'filter': Filter,
    'edit': Edit,
    'add': Plus,
    'menu': Menu,
    'down': ChevronDown,
    'right': ArrowRight,
    'left': ArrowLeft,
    'arrow-right': ArrowRight,
    'arrow-left': ArrowLeft,
    'insert-below': Plus,
    'group-by': LayoutGrid,

    // Communication
    'message-1': MessageSquare,
    'external-link': ExternalLink,

    // Media & Content
    'image': Image,
    'image-view': Home,
    'website': Globe,
    'web': Globe,

    // Education
    'education': BookOpen,

    // Time & Status
    'refresh': RefreshCw,
    'map': MapPin,
    'star': Star,
    'unread-status': Circle,
    'primitive-dot': Circle,
    'table': LayoutGrid,

    // Default
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
                padding: '0.25rem',
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
}

declare global {
    interface Window {
        frappe?: {
            boot?: {
                sidebar_pages?: {
                    pages?: WorkspacePage[]
                }
                app_data?: AppData[]
            }
        }
    }
}

const FrappeSidebar = ({ defaultAppFilter, className, logoUrl, fixed = true }: FrappeSidebarProps = {}) => {
    // Pinned state - when true, sidebar stays expanded
    const [pinned, setPinned] = useState(() => {
        const saved = localStorage.getItem('frappe-sidebar-pinned')
        return saved ? JSON.parse(saved) : false
    })
    // Hover expanded state - temporary expansion on hover
    const [hoverExpanded, setHoverExpanded] = useState(false)
    const [workspaces, setWorkspaces] = useState<WorkspacePage[]>([])
    const [apps, setApps] = useState<AppData[]>([])
    const [currentApp, setCurrentApp] = useState<string>('')
    const [appMenuOpen, setAppMenuOpen] = useState(false)

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

            // Set default app - prefer one with filter keywords (for context)
            if (appData.length > 0) {
                const filterKeywords = defaultAppFilter || ['accounting', 'finance']
                const filteredApp = appData.find((app: AppData) =>
                    app.workspaces?.some((ws: string) =>
                        filterKeywords.some(keyword => ws.toLowerCase().includes(keyword))
                    )
                )
                if (filteredApp) {
                    setCurrentApp(filteredApp.app_name)
                } else {
                    // Fallback to app with most workspaces
                    const sorted = [...appData].sort((a: AppData, b: AppData) =>
                        (b.workspaces?.length || 0) - (a.workspaces?.length || 0)
                    )
                    setCurrentApp(sorted[0].app_name)
                }
            }
        }
    }, [defaultAppFilter])

    useEffect(() => {
        localStorage.setItem('frappe-sidebar-pinned', JSON.stringify(pinned))
    }, [pinned])

    const getIcon = (iconName?: string): LucideIcon => {
        if (!iconName) return iconMap['default']
        return iconMap[iconName] || iconMap['default']
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
        window.location.href = '/app'
    }

    const handleCollapseClick = () => {
        if (pinned) {
            // If pinned, unpin (collapse)
            setPinned(false)
            setHoverExpanded(false)
        } else {
            // If not pinned, pin it open
            setPinned(true)
        }
    }

    const appLogoUrl = logoUrl || currentAppData?.app_logo_url

    // Sidebar content (shared between fixed and non-fixed modes)
    const sidebarContent = (
        <>
            {/* App Switcher */}
            <div className="p-2 relative">
                <SidebarButton
                    onClick={() => expanded ? setAppMenuOpen(!appMenuOpen) : navigateToDesk()}
                    className={cn(
                        "w-full flex items-center gap-2 p-1.5 rounded-lg transition-colors",
                        expanded ? "justify-start" : "justify-center"
                    )}
                >
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                        {appLogoUrl ? (
                            <img
                                src={appLogoUrl}
                                alt=""
                                className="w-8 h-8 object-contain"
                            />
                        ) : (
                            <Briefcase className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
                        )}
                    </div>
                    {expanded && (
                        <>
                            <span className="text-sm font-medium truncate flex-1 text-left">
                                {currentAppData?.app_title || 'ERPNext'}
                            </span>
                            <ChevronDown className={cn(
                                "w-4 h-4 text-gray-400 transition-transform",
                                appMenuOpen && "rotate-180"
                            )} strokeWidth={1.5} />
                        </>
                    )}
                </SidebarButton>

                {/* App Menu Dropdown */}
                {appMenuOpen && expanded && (
                    <div className="absolute left-2 right-2 top-14 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 max-h-80 overflow-y-auto">
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
                                <span className="text-sm truncate">{app.app_title}</span>
                            </SidebarButton>
                        ))}
                        <div className="border-t border-gray-200 my-1" />
                        <SidebarButton
                            onClick={() => { window.location.href = '/' }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left"
                        >
                            <Globe className="w-4 h-4" strokeWidth={1.5} />
                            <span className="text-sm">Website</span>
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
                                    <span className="text-sm truncate">
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
                        <span className="text-sm">{pinned ? 'Collapse' : 'Expand'}</span>
                    )}
                </SidebarButton>
            </div>
        </>
    )

    // Fixed mode: use fixed positioning with spacer for collapsed state
    if (fixed) {
        return (
            <>
                {/* Spacer - only when collapsed in fixed mode */}
                {!pinned && <div className="w-[50px] flex-shrink-0" />}

                {/* Sidebar */}
                <div
                    className={cn(
                        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 flex-shrink-0",
                        pinned ? "w-56" : "fixed left-0 top-0 z-50",
                        !pinned && (expanded ? "w-56 shadow-lg" : "w-[50px]"),
                        className
                    )}
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
                expanded ? "w-56" : "w-[50px]",
                className
            )}
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
