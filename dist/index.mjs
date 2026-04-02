// src/FrappeSidebar.tsx
import { useState, useEffect, useMemo } from "react";
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
  MapPin,
  Menu,
  MessageSquare,
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
  Tag,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Wallet,
  Warehouse,
  Wrench
} from "lucide-react";

// src/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/FrappeSidebar.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var FiduciaryIcon = (props) => /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", ...props, children: [
  /* @__PURE__ */ jsx("path", { d: "M16 10H4V6h11a1 1 0 0 1 1 1v3z", opacity: ".5" }),
  /* @__PURE__ */ jsx("path", { d: "M21 18H4v-8h17a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z" }),
  /* @__PURE__ */ jsx("path", { d: "M3 22a1 1 0 0 1-1-.999V3a1 1 0 0 1 2 0v18a1 1 0 0 1-.999 1H3z", opacity: ".25" })
] });
var lucideIconMap = {
  "activity": Activity,
  "banknote": Banknote,
  "bar-chart-2": BarChart2,
  "bar-chart-3": BarChart3,
  "book-open": BookOpen,
  "briefcase": Briefcase,
  "building-2": Building2,
  "calculator": Calculator,
  "calendar-days": CalendarDays,
  "chart-pie": PieChart,
  "credit-card": Banknote,
  "factory": Factory,
  "fiduciary": FiduciaryIcon,
  "file-text": FileText,
  "globe": Globe,
  "graduation-cap": GraduationCap,
  "hand-coins": HandCoins,
  "headphones": Headphones,
  "home": Home,
  "landmark": Landmark,
  "layout-grid": LayoutGrid,
  "life-buoy": Headphones,
  "list-checks": ListChecks,
  "package": Package,
  "pie-chart": PieChart,
  "receipt": Receipt,
  "scale": Scale,
  "settings": Settings,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  "sliders-horizontal": SlidersHorizontal,
  "star": Star,
  "store": Store,
  "tag": Tag,
  "trending-up": TrendingUp,
  "trophy": Trophy,
  "user-check": UserCheck,
  "users": Users,
  "wallet": Wallet,
  "warehouse": Warehouse,
  "wrench": Wrench
};
var legacyIconMap = {
  "accounting": Calculator,
  "income": TrendingUp,
  "expenses": TrendingDown,
  "assets": Briefcase,
  "receivables": ArrowRight,
  "payables": ArrowLeft,
  "money-coins-1": DollarSign,
  "sell": ShoppingCart,
  "selling": ShoppingCart,
  "buying": Package,
  "crm": Target,
  "customer": Users,
  "users": Users,
  "stock": Package,
  "organization": Factory,
  "manufacturing": Factory,
  "tag": Tag,
  "hr": Users,
  "assign": Users,
  "project": FolderOpen,
  "list": ListOrdered,
  "support": Headphones,
  "quality": Award,
  "setting": Settings,
  "settings": Settings,
  "tool": Wrench,
  "integration": Layers,
  "getting-started": Star,
  "file": FileText,
  "folder-normal": FolderOpen,
  "filter": Filter,
  "edit": Edit,
  "add": Plus,
  "menu": Menu,
  "down": ChevronDown,
  "message-1": MessageSquare,
  "external-link": ExternalLink,
  "image": Image,
  "website": Globe,
  "web": Globe,
  "education": BookOpen,
  "refresh": RefreshCw,
  "map": MapPin,
  "star": Star,
  "milestone": FileCheck,
  "mark-as-read": CheckSquare,
  "group-by": LayoutGrid,
  "table": LayoutGrid,
  "change": RefreshCw,
  "non-profit": Calendar,
  "default": Circle
};
var SidebarButton = ({
  className,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return /* @__PURE__ */ jsx(
    "button",
    {
      className,
      style: {
        backgroundColor: isHovered ? "#f3f4f6" : "transparent",
        border: "none",
        outline: "none",
        boxShadow: "none",
        borderRadius: "0.65rem",
        padding: "calc(0.25rem * 2)",
        ...style
      },
      onMouseEnter: (e) => {
        setIsHovered(true);
        props.onMouseEnter?.(e);
      },
      onMouseLeave: (e) => {
        setIsHovered(false);
        props.onMouseLeave?.(e);
      },
      ...props,
      children
    }
  );
};
var FrappeSidebar = ({ defaultAppFilter, className, logoUrl, fixed = true, homeUrl = "/app" } = {}) => {
  const [pinned, setPinned] = useState(() => {
    const saved = localStorage.getItem("frappe-sidebar-pinned");
    return saved ? JSON.parse(saved) : false;
  });
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [apps, setApps] = useState([]);
  const [currentApp, setCurrentApp] = useState(() => {
    return localStorage.getItem("frappe-sidebar-current-app") || "";
  });
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const expanded = pinned || hoverExpanded;
  useEffect(() => {
    const boot = window.frappe?.boot;
    if (boot) {
      const pages = boot.sidebar_pages?.pages || [];
      const appData = boot.app_data || [];
      const parentPages = pages.filter(
        (p) => !p.parent_page && (p.public === true || p.public === 1)
      );
      setWorkspaces(parentPages);
      setApps(appData);
      if (appData.length > 0) {
        const savedApp = localStorage.getItem("frappe-sidebar-current-app");
        const savedAppExists = savedApp && appData.some((app) => app.app_name === savedApp);
        if (savedAppExists) {
          setCurrentApp(savedApp);
        } else {
          setCurrentApp(appData[0].app_name);
        }
      }
    }
  }, [defaultAppFilter]);
  useEffect(() => {
    if (currentApp) {
      localStorage.setItem("frappe-sidebar-current-app", currentApp);
    }
  }, [currentApp]);
  useEffect(() => {
    localStorage.setItem("frappe-sidebar-pinned", JSON.stringify(pinned));
  }, [pinned]);
  const getIcon = (iconName) => {
    if (!iconName) return Circle;
    if (iconName.startsWith("lucide-")) {
      const name = iconName.slice(7);
      return lucideIconMap[name] || Circle;
    }
    return legacyIconMap[iconName] || Circle;
  };
  const currentAppData = useMemo(() => {
    return apps.find((a) => a.app_name === currentApp);
  }, [apps, currentApp]);
  const filteredWorkspaces = useMemo(() => {
    if (!currentAppData?.workspaces) return workspaces.slice(0, 20);
    return workspaces.filter(
      (w) => currentAppData.workspaces.includes(w.name)
    ).slice(0, 20);
  }, [workspaces, currentAppData]);
  const navigateToWorkspace = (workspace) => {
    const slug = workspace.name.toLowerCase().replace(/\s+/g, "-");
    window.location.href = `/app/${slug}`;
  };
  const navigateToApp = (app) => {
    setCurrentApp(app.app_name);
    setAppMenuOpen(false);
    if (app.app_route) {
      window.location.href = app.app_route;
    }
  };
  const navigateToDesk = () => {
    window.location.href = homeUrl;
  };
  const handleCollapseClick = () => {
    if (pinned) {
      setPinned(false);
      setHoverExpanded(false);
    } else {
      setPinned(true);
    }
  };
  const appLogoUrl = logoUrl || currentAppData?.app_logo_url;
  const sidebarContent = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "p-2 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: cn(
        "w-full flex items-center gap-2 p-1.5 rounded-lg",
        expanded ? "justify-start" : "justify-center"
      ), children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-8 h-8 flex items-center justify-center flex-shrink-0",
            onClick: navigateToDesk,
            style: { cursor: "pointer" },
            children: appLogoUrl ? /* @__PURE__ */ jsx(
              "img",
              {
                src: appLogoUrl,
                alt: "",
                className: "w-8 h-8 object-contain",
                style: { pointerEvents: "none" }
              }
            ) : /* @__PURE__ */ jsx(Briefcase, { className: "w-8 h-8 text-gray-600", strokeWidth: 1.5, style: { pointerEvents: "none" } })
          }
        ),
        expanded && /* @__PURE__ */ jsxs(
          SidebarButton,
          {
            onClick: () => setAppMenuOpen(!appMenuOpen),
            className: "flex items-center gap-2 flex-1",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "truncate flex-1 text-left",
                  style: { fontWeight: 500, lineHeight: "16.1px" },
                  children: currentAppData?.app_title || "ERPNext"
                }
              ),
              /* @__PURE__ */ jsx(ChevronDown, { className: cn(
                "w-4 h-4 text-gray-400 transition-transform",
                appMenuOpen && "rotate-180"
              ), strokeWidth: 1.5 })
            ]
          }
        )
      ] }),
      appMenuOpen && expanded && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute right-2 top-14 bg-white border border-gray-200 shadow-lg z-50 py-1 overflow-y-auto",
          style: { left: "8px", borderRadius: "0.65em" },
          children: [
            apps.map((app) => /* @__PURE__ */ jsxs(
              SidebarButton,
              {
                onClick: () => navigateToApp(app),
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                style: app.app_name === currentApp ? { backgroundColor: "#f9fafb" } : void 0,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 flex items-center justify-center flex-shrink-0", children: app.app_logo_url ? /* @__PURE__ */ jsx("img", { src: app.app_logo_url, alt: "", className: "w-4 h-4 object-contain" }) : /* @__PURE__ */ jsx(Circle, { className: "w-3 h-3", strokeWidth: 1.5 }) }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: app.app_title })
                ]
              },
              app.app_name
            )),
            /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 my-1" }),
            /* @__PURE__ */ jsxs(
              SidebarButton,
              {
                onClick: () => {
                  window.location.href = "/";
                },
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                children: [
                  /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4", strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsx("span", { children: "Website" })
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden py-1", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0.5 px-2", children: filteredWorkspaces.map((workspace) => {
      const Icon = getIcon(workspace.icon);
      return /* @__PURE__ */ jsxs(
        SidebarButton,
        {
          onClick: () => navigateToWorkspace(workspace),
          className: cn(
            "w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900",
            expanded ? "justify-start" : "justify-center"
          ),
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 flex-shrink-0", strokeWidth: 1.5 }),
            expanded && /* @__PURE__ */ jsx("span", { className: "truncate", children: workspace.title || workspace.name })
          ]
        },
        workspace.name
      );
    }) }) }),
    /* @__PURE__ */ jsx("div", { className: "p-2 border-t border-gray-100", children: /* @__PURE__ */ jsxs(
      SidebarButton,
      {
        onClick: handleCollapseClick,
        className: cn(
          "w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-gray-400",
          expanded ? "justify-start" : "justify-center"
        ),
        children: [
          pinned ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4", strokeWidth: 1.5 }),
          expanded && /* @__PURE__ */ jsx("span", { children: pinned ? "Collapse" : "Expand" })
        ]
      }
    ) })
  ] });
  const sidebarFontStyle = {
    fontFamily: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    fontSize: "13px",
    fontWeight: 420
  };
  if (fixed) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      !pinned && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", style: { width: "50px" } }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 flex-shrink-0",
            !pinned && "fixed left-0 top-0 z-50",
            !pinned && !expanded && "shadow-none",
            !pinned && expanded && "shadow-lg",
            className
          ),
          style: {
            ...sidebarFontStyle,
            width: pinned ? "208px" : expanded ? "208px" : "50px"
          },
          onMouseEnter: () => !pinned && setHoverExpanded(true),
          onMouseLeave: () => {
            if (!pinned) {
              setHoverExpanded(false);
              setAppMenuOpen(false);
            }
          },
          children: sidebarContent
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 flex-shrink-0",
        className
      ),
      style: {
        ...sidebarFontStyle,
        width: expanded ? "208px" : "50px"
      },
      onMouseEnter: () => !pinned && setHoverExpanded(true),
      onMouseLeave: () => {
        if (!pinned) {
          setHoverExpanded(false);
          setAppMenuOpen(false);
        }
      },
      children: sidebarContent
    }
  );
};
var FrappeSidebar_default = FrappeSidebar;
export {
  FrappeSidebar_default as FrappeSidebar,
  cn
};
