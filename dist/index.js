"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FrappeSidebar: () => FrappeSidebar_default,
  cn: () => cn
});
module.exports = __toCommonJS(index_exports);

// src/FrappeSidebar.tsx
var import_react = require("react");
var import_lucide_react = require("lucide-react");

// src/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/FrappeSidebar.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var FiduciaryIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", ...props, children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 10H4V6h11a1 1 0 0 1 1 1v3z", opacity: ".5" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 18H4v-8h17a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z" }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 22a1 1 0 0 1-1-.999V3a1 1 0 0 1 2 0v18a1 1 0 0 1-.999 1H3z", opacity: ".25" })
] });
var lucideIconMap = {
  "activity": import_lucide_react.Activity,
  "banknote": import_lucide_react.Banknote,
  "bar-chart-2": import_lucide_react.BarChart2,
  "bar-chart-3": import_lucide_react.BarChart3,
  "book-open": import_lucide_react.BookOpen,
  "briefcase": import_lucide_react.Briefcase,
  "building-2": import_lucide_react.Building2,
  "calculator": import_lucide_react.Calculator,
  "calendar-days": import_lucide_react.CalendarDays,
  "chart-pie": import_lucide_react.PieChart,
  "credit-card": import_lucide_react.Banknote,
  "factory": import_lucide_react.Factory,
  "fiduciary": FiduciaryIcon,
  "file-text": import_lucide_react.FileText,
  "globe": import_lucide_react.Globe,
  "graduation-cap": import_lucide_react.GraduationCap,
  "hand-coins": import_lucide_react.HandCoins,
  "headphones": import_lucide_react.Headphones,
  "home": import_lucide_react.Home,
  "landmark": import_lucide_react.Landmark,
  "layout-grid": import_lucide_react.LayoutGrid,
  "life-buoy": import_lucide_react.Headphones,
  "list-checks": import_lucide_react.ListChecks,
  "package": import_lucide_react.Package,
  "pie-chart": import_lucide_react.PieChart,
  "receipt": import_lucide_react.Receipt,
  "scale": import_lucide_react.Scale,
  "settings": import_lucide_react.Settings,
  "shopping-bag": import_lucide_react.ShoppingBag,
  "shopping-cart": import_lucide_react.ShoppingCart,
  "sliders-horizontal": import_lucide_react.SlidersHorizontal,
  "star": import_lucide_react.Star,
  "store": import_lucide_react.Store,
  "tag": import_lucide_react.Tag,
  "trending-up": import_lucide_react.TrendingUp,
  "trophy": import_lucide_react.Trophy,
  "user-check": import_lucide_react.UserCheck,
  "users": import_lucide_react.Users,
  "wallet": import_lucide_react.Wallet,
  "warehouse": import_lucide_react.Warehouse,
  "wrench": import_lucide_react.Wrench
};
var legacyIconMap = {
  "accounting": import_lucide_react.Calculator,
  "income": import_lucide_react.TrendingUp,
  "expenses": import_lucide_react.TrendingDown,
  "assets": import_lucide_react.Briefcase,
  "receivables": import_lucide_react.ArrowRight,
  "payables": import_lucide_react.ArrowLeft,
  "money-coins-1": import_lucide_react.DollarSign,
  "sell": import_lucide_react.ShoppingCart,
  "selling": import_lucide_react.ShoppingCart,
  "buying": import_lucide_react.Package,
  "crm": import_lucide_react.Target,
  "customer": import_lucide_react.Users,
  "users": import_lucide_react.Users,
  "stock": import_lucide_react.Package,
  "organization": import_lucide_react.Factory,
  "manufacturing": import_lucide_react.Factory,
  "tag": import_lucide_react.Tag,
  "hr": import_lucide_react.Users,
  "assign": import_lucide_react.Users,
  "project": import_lucide_react.FolderOpen,
  "list": import_lucide_react.ListOrdered,
  "support": import_lucide_react.Headphones,
  "quality": import_lucide_react.Award,
  "setting": import_lucide_react.Settings,
  "settings": import_lucide_react.Settings,
  "tool": import_lucide_react.Wrench,
  "integration": import_lucide_react.Layers,
  "getting-started": import_lucide_react.Star,
  "file": import_lucide_react.FileText,
  "folder-normal": import_lucide_react.FolderOpen,
  "filter": import_lucide_react.Filter,
  "edit": import_lucide_react.Edit,
  "add": import_lucide_react.Plus,
  "menu": import_lucide_react.Menu,
  "down": import_lucide_react.ChevronDown,
  "message-1": import_lucide_react.MessageSquare,
  "external-link": import_lucide_react.ExternalLink,
  "image": import_lucide_react.Image,
  "website": import_lucide_react.Globe,
  "web": import_lucide_react.Globe,
  "education": import_lucide_react.BookOpen,
  "refresh": import_lucide_react.RefreshCw,
  "map": import_lucide_react.MapPin,
  "star": import_lucide_react.Star,
  "milestone": import_lucide_react.FileCheck,
  "mark-as-read": import_lucide_react.CheckSquare,
  "group-by": import_lucide_react.LayoutGrid,
  "table": import_lucide_react.LayoutGrid,
  "change": import_lucide_react.RefreshCw,
  "non-profit": import_lucide_react.Calendar,
  "default": import_lucide_react.Circle
};
var SidebarButton = ({
  className,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = (0, import_react.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const [pinned, setPinned] = (0, import_react.useState)(() => {
    const saved = localStorage.getItem("frappe-sidebar-pinned");
    return saved ? JSON.parse(saved) : false;
  });
  const [hoverExpanded, setHoverExpanded] = (0, import_react.useState)(false);
  const [workspaces, setWorkspaces] = (0, import_react.useState)([]);
  const [apps, setApps] = (0, import_react.useState)([]);
  const [currentApp, setCurrentApp] = (0, import_react.useState)(() => {
    return localStorage.getItem("frappe-sidebar-current-app") || "";
  });
  const [appMenuOpen, setAppMenuOpen] = (0, import_react.useState)(false);
  const [interfaceMode, setInterfaceMode] = (0, import_react.useState)(() => {
    const boot = window.frappe?.boot;
    return boot?.neoffice_settings?.interface_mode || boot?.user?.view_interface || "Avanc\xE9";
  });
  const [isDark, setIsDark] = (0, import_react.useState)(() => {
    return document.documentElement.getAttribute("data-theme") === "dark";
  });
  const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
  const isSimple = interfaceMode === "Simple" || interfaceMode === "Simplified";
  const expanded = pinned || hoverExpanded;
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
    if (currentApp) {
      localStorage.setItem("frappe-sidebar-current-app", currentApp);
    }
  }, [currentApp]);
  (0, import_react.useEffect)(() => {
    localStorage.setItem("frappe-sidebar-pinned", JSON.stringify(pinned));
  }, [pinned]);
  const getIcon = (iconName) => {
    if (!iconName) return import_lucide_react.Circle;
    if (iconName.startsWith("lucide-")) {
      const name = iconName.slice(7);
      return lucideIconMap[name] || import_lucide_react.Circle;
    }
    return legacyIconMap[iconName] || import_lucide_react.Circle;
  };
  const currentAppData = (0, import_react.useMemo)(() => {
    return apps.find((a) => a.app_name === currentApp);
  }, [apps, currentApp]);
  const filteredWorkspaces = (0, import_react.useMemo)(() => {
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
  const switchMode = (0, import_react.useCallback)((mode) => {
    const dbMode = mode === "Simple" ? "Simplified" : "Advanced";
    setInterfaceMode(mode);
    if (mode === "Simple") {
      document.body.classList.add("simplified_view");
    } else {
      document.body.classList.remove("simplified_view");
    }
    window.frappe?.db?.set_value("User", window.frappe?.session?.user || "", "view_interface", dbMode)?.then(() => {
      window.location.href = "/app/home";
    });
  }, []);
  const toggleTheme = (0, import_react.useCallback)(() => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDark(!isDark);
    localStorage.setItem("theme_active", newTheme);
    const cap = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
    window.frappe?.db?.set_value("User", window.frappe?.session?.user || "", "desk_theme", cap);
    setTimeout(() => window.frappe?.ui?.toolbar?.clear_cache(), 300);
  }, [isDark]);
  const toggleFullscreen = (0, import_react.useCallback)(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);
  const openCalculator = (0, import_react.useCallback)(() => {
    window.frappe?.ui?.NeofficeCalculatorDialog?.show();
  }, []);
  const appLogoUrl = logoUrl || currentAppData?.app_logo_url;
  const sidebarContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p-2 relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: cn(
        "w-full flex items-center gap-2 p-1.5 rounded-lg",
        expanded ? "justify-start" : "justify-center"
      ), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "w-8 h-8 flex items-center justify-center flex-shrink-0",
            onClick: navigateToDesk,
            style: { cursor: "pointer" },
            children: appLogoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "img",
              {
                src: appLogoUrl,
                alt: "",
                className: "w-8 h-8 object-contain",
                style: { pointerEvents: "none" }
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Briefcase, { className: "w-8 h-8 text-gray-600", strokeWidth: 1.5, style: { pointerEvents: "none" } })
          }
        ),
        expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          SidebarButton,
          {
            onClick: () => setAppMenuOpen(!appMenuOpen),
            className: "flex items-center gap-2 flex-1",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "span",
                {
                  className: "truncate flex-1 text-left",
                  style: { fontWeight: 500, lineHeight: "16.1px" },
                  children: currentAppData?.app_title || "ERPNext"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronDown, { className: cn(
                "w-4 h-4 text-gray-400 transition-transform",
                appMenuOpen && "rotate-180"
              ), strokeWidth: 1.5 })
            ]
          }
        )
      ] }),
      appMenuOpen && expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className: "absolute right-2 top-14 bg-white border border-gray-200 shadow-lg z-50 py-1 overflow-y-auto",
          style: { left: "8px", borderRadius: "0.65em" },
          children: [
            apps.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              SidebarButton,
              {
                onClick: () => navigateToApp(app),
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                style: app.app_name === currentApp ? { backgroundColor: "#f9fafb" } : void 0,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-5 flex items-center justify-center flex-shrink-0", children: app.app_logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: app.app_logo_url, alt: "", className: "w-4 h-4 object-contain" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Circle, { className: "w-3 h-3", strokeWidth: 1.5 }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate", children: app.app_title })
                ]
              },
              app.app_name
            )),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-gray-200 my-1" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              SidebarButton,
              {
                onClick: () => {
                  window.location.href = "/";
                },
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Globe, { className: "w-4 h-4", strokeWidth: 1.5 }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Website" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-gray-200 my-1" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "px-3 pt-2 pb-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", marginBottom: "6px" }, children: "Interface Mode" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex rounded-lg overflow-hidden", style: { border: "2px solid #3b82f6" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      switchMode("Simple");
                    },
                    className: "flex-1 py-1.5 text-center",
                    style: {
                      fontSize: "12px",
                      fontWeight: 600,
                      backgroundColor: isSimple ? "#3b82f6" : "transparent",
                      color: isSimple ? "white" : "#3b82f6",
                      border: "none",
                      cursor: "pointer"
                    },
                    children: "Simple"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      switchMode("Avanc\xE9");
                    },
                    className: "flex-1 py-1.5 text-center",
                    style: {
                      fontSize: "12px",
                      fontWeight: 600,
                      backgroundColor: !isSimple ? "#3b82f6" : "transparent",
                      color: !isSimple ? "white" : "#3b82f6",
                      border: "none",
                      cursor: "pointer"
                    },
                    children: "Advanced"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-2 px-3 pb-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                SidebarButton,
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    toggleTheme();
                  },
                  className: "flex-1 flex items-center justify-center gap-2 py-1.5",
                  children: [
                    isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Sun, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Moon, { className: "w-4 h-4", strokeWidth: 1.5 }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "12px" }, children: isDark ? "Light" : "Dark" })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                SidebarButton,
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  },
                  className: "flex items-center justify-center py-1.5 px-3",
                  children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Minimize, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Maximize, { className: "w-4 h-4", strokeWidth: 1.5 })
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-3 pb-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              SidebarButton,
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setAppMenuOpen(false);
                  openCalculator();
                },
                className: "w-full flex items-center justify-center gap-2 py-1.5",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Calculator, { className: "w-4 h-4", strokeWidth: 1.5 }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "12px" }, children: "Calculator" })
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-gray-200 my-1" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              SidebarButton,
              {
                onClick: () => {
                  window.location.href = "/app/settings";
                },
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Settings, { className: "w-4 h-4", strokeWidth: 1.5 }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Settings" })
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 overflow-y-auto overflow-x-hidden py-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-0.5 px-2", children: filteredWorkspaces.map((workspace) => {
      const Icon = getIcon(workspace.icon);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        SidebarButton,
        {
          onClick: () => navigateToWorkspace(workspace),
          className: cn(
            "w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900",
            expanded ? "justify-start" : "justify-center"
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 flex-shrink-0", strokeWidth: 1.5 }),
            expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate", children: workspace.title || workspace.name })
          ]
        },
        workspace.name
      );
    }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-2 border-t border-gray-100", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      SidebarButton,
      {
        onClick: handleCollapseClick,
        className: cn(
          "w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-gray-400",
          expanded ? "justify-start" : "justify-center"
        ),
        children: [
          pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowLeft, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowRight, { className: "w-4 h-4", strokeWidth: 1.5 }),
          expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pinned ? "Collapse" : "Expand" })
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      !pinned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-shrink-0", style: { width: "50px" } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FrappeSidebar,
  cn
});
