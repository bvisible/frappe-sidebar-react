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
var iconMap = {
  // Accounting & Finance
  "accounting": import_lucide_react.Calculator,
  "income": import_lucide_react.TrendingUp,
  "expenses": import_lucide_react.TrendingDown,
  "assets": import_lucide_react.Briefcase,
  "liabilities": import_lucide_react.TrendingDown,
  "receivables": import_lucide_react.ArrowRight,
  "payables": import_lucide_react.ArrowLeft,
  "money-coins-1": import_lucide_react.DollarSign,
  // Sales & CRM
  "sell": import_lucide_react.ShoppingCart,
  "selling": import_lucide_react.ShoppingCart,
  "buying": import_lucide_react.Package,
  "crm": import_lucide_react.Target,
  "customer": import_lucide_react.Users,
  "users": import_lucide_react.Users,
  // Stock & Manufacturing
  "stock": import_lucide_react.Package,
  "organization": import_lucide_react.Factory,
  "manufacturing": import_lucide_react.Factory,
  "tag": import_lucide_react.Tag,
  "change": import_lucide_react.RefreshCw,
  // HR
  "hr": import_lucide_react.Users,
  "assign": import_lucide_react.Users,
  "milestone": import_lucide_react.FileCheck,
  "non-profit": import_lucide_react.Calendar,
  // Projects
  "project": import_lucide_react.FolderOpen,
  "list": import_lucide_react.ListOrdered,
  "list-alt": import_lucide_react.ListOrdered,
  "mark-as-read": import_lucide_react.CheckSquare,
  // Support & Quality
  "support": import_lucide_react.Headphones,
  "quality": import_lucide_react.Award,
  // Settings & Tools
  "setting": import_lucide_react.Settings,
  "settings": import_lucide_react.Settings,
  "customization": import_lucide_react.Settings,
  "tool": import_lucide_react.Wrench,
  "integration": import_lucide_react.Layers,
  "getting-started": import_lucide_react.Star,
  // Files & Documents
  "file": import_lucide_react.FileText,
  "small-file": import_lucide_react.FileText,
  "folder-normal": import_lucide_react.FolderOpen,
  // Navigation & UI
  "filter": import_lucide_react.Filter,
  "edit": import_lucide_react.Edit,
  "add": import_lucide_react.Plus,
  "menu": import_lucide_react.Menu,
  "down": import_lucide_react.ChevronDown,
  "right": import_lucide_react.ArrowRight,
  "left": import_lucide_react.ArrowLeft,
  "arrow-right": import_lucide_react.ArrowRight,
  "arrow-left": import_lucide_react.ArrowLeft,
  "insert-below": import_lucide_react.Plus,
  "group-by": import_lucide_react.LayoutGrid,
  // Communication
  "message-1": import_lucide_react.MessageSquare,
  "external-link": import_lucide_react.ExternalLink,
  // Media & Content
  "image": import_lucide_react.Image,
  "image-view": import_lucide_react.Home,
  "website": import_lucide_react.Globe,
  "web": import_lucide_react.Globe,
  // Education
  "education": import_lucide_react.BookOpen,
  // Time & Status
  "refresh": import_lucide_react.RefreshCw,
  "map": import_lucide_react.MapPin,
  "star": import_lucide_react.Star,
  "unread-status": import_lucide_react.Circle,
  "primitive-dot": import_lucide_react.Circle,
  "table": import_lucide_react.LayoutGrid,
  // Default
  "default": import_lucide_react.Circle
};
var FrappeSidebar = ({ defaultAppFilter, className, logoUrl, fixed = true } = {}) => {
  const [pinned, setPinned] = (0, import_react.useState)(() => {
    const saved = localStorage.getItem("frappe-sidebar-pinned");
    return saved ? JSON.parse(saved) : false;
  });
  const [hoverExpanded, setHoverExpanded] = (0, import_react.useState)(false);
  const [workspaces, setWorkspaces] = (0, import_react.useState)([]);
  const [apps, setApps] = (0, import_react.useState)([]);
  const [currentApp, setCurrentApp] = (0, import_react.useState)("");
  const [appMenuOpen, setAppMenuOpen] = (0, import_react.useState)(false);
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
        const filterKeywords = defaultAppFilter || ["accounting", "finance"];
        const filteredApp = appData.find(
          (app) => app.workspaces?.some(
            (ws) => filterKeywords.some((keyword) => ws.toLowerCase().includes(keyword))
          )
        );
        if (filteredApp) {
          setCurrentApp(filteredApp.app_name);
        } else {
          const sorted = [...appData].sort(
            (a, b) => (b.workspaces?.length || 0) - (a.workspaces?.length || 0)
          );
          setCurrentApp(sorted[0].app_name);
        }
      }
    }
  }, [defaultAppFilter]);
  (0, import_react.useEffect)(() => {
    localStorage.setItem("frappe-sidebar-pinned", JSON.stringify(pinned));
  }, [pinned]);
  const getIcon = (iconName) => {
    if (!iconName) return iconMap["default"];
    return iconMap[iconName] || iconMap["default"];
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
    window.location.href = "/app";
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
  const sidebarContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p-2 relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          onClick: () => expanded ? setAppMenuOpen(!appMenuOpen) : navigateToDesk(),
          className: cn(
            "w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors",
            expanded ? "justify-start" : "justify-center"
          ),
          style: { backgroundColor: "transparent", border: "none", outline: "none", boxShadow: "none" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-8 flex items-center justify-center flex-shrink-0", children: appLogoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "img",
              {
                src: appLogoUrl,
                alt: "",
                className: "w-8 h-8 object-contain"
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Briefcase, { className: "w-8 h-8 text-gray-600", strokeWidth: 1.5 }) }),
            expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-medium truncate flex-1 text-left", children: currentAppData?.app_title || "ERPNext" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronDown, { className: cn(
                "w-4 h-4 text-gray-400 transition-transform",
                appMenuOpen && "rotate-180"
              ), strokeWidth: 1.5 })
            ] })
          ]
        }
      ),
      appMenuOpen && expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute left-2 right-2 top-14 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 max-h-80 overflow-y-auto", children: [
        apps.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: () => navigateToApp(app),
            className: cn(
              "w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-left",
              app.app_name === currentApp && "bg-gray-50"
            ),
            style: { backgroundColor: app.app_name === currentApp ? void 0 : "transparent", border: "none", outline: "none", boxShadow: "none" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-5 flex items-center justify-center flex-shrink-0", children: app.app_logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: app.app_logo_url, alt: "", className: "w-4 h-4 object-contain" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Circle, { className: "w-3 h-3", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm truncate", children: app.app_title })
            ]
          },
          app.app_name
        )),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-gray-200 my-1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            onClick: () => {
              window.location.href = "/";
            },
            className: "w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-left",
            style: { backgroundColor: "transparent", border: "none", outline: "none", boxShadow: "none" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Globe, { className: "w-4 h-4", strokeWidth: 1.5 }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm", children: "Website" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 overflow-y-auto overflow-x-hidden py-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-0.5 px-2", children: filteredWorkspaces.map((workspace) => {
      const Icon = getIcon(workspace.icon);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          onClick: () => navigateToWorkspace(workspace),
          className: cn(
            "w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900",
            expanded ? "justify-start" : "justify-center"
          ),
          style: { backgroundColor: "transparent", border: "none", outline: "none", boxShadow: "none" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 flex-shrink-0", strokeWidth: 1.5 }),
            expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm truncate", children: workspace.title || workspace.name })
          ]
        },
        workspace.name
      );
    }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-2 border-t border-gray-100", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        onClick: handleCollapseClick,
        className: cn(
          "w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400",
          expanded ? "justify-start" : "justify-center"
        ),
        style: { backgroundColor: "transparent", border: "none", outline: "none", boxShadow: "none" },
        children: [
          pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowLeft, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowRight, { className: "w-4 h-4", strokeWidth: 1.5 }),
          expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm", children: pinned ? "Collapse" : "Expand" })
        ]
      }
    ) })
  ] });
  if (fixed) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      !pinned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[50px] flex-shrink-0" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: cn(
            "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 flex-shrink-0",
            pinned ? "w-56" : "fixed left-0 top-0 z-50",
            !pinned && (expanded ? "w-56 shadow-lg" : "w-[50px]"),
            className
          ),
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
        expanded ? "w-56" : "w-[50px]",
        className
      ),
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
