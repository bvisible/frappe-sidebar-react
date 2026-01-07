// src/FrappeSidebar.tsx
import { useState, useEffect, useMemo } from "react";
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
  Globe
} from "lucide-react";

// src/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/FrappeSidebar.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var iconMap = {
  // Accounting & Finance
  "accounting": Calculator,
  "income": TrendingUp,
  "expenses": TrendingDown,
  "assets": Briefcase,
  "liabilities": TrendingDown,
  "receivables": ArrowRight,
  "payables": ArrowLeft,
  "money-coins-1": DollarSign,
  // Sales & CRM
  "sell": ShoppingCart,
  "selling": ShoppingCart,
  "buying": Package,
  "crm": Target,
  "customer": Users,
  "users": Users,
  // Stock & Manufacturing
  "stock": Package,
  "organization": Factory,
  "manufacturing": Factory,
  "tag": Tag,
  "change": RefreshCw,
  // HR
  "hr": Users,
  "assign": Users,
  "milestone": FileCheck,
  "non-profit": Calendar,
  // Projects
  "project": FolderOpen,
  "list": ListOrdered,
  "list-alt": ListOrdered,
  "mark-as-read": CheckSquare,
  // Support & Quality
  "support": Headphones,
  "quality": Award,
  // Settings & Tools
  "setting": Settings,
  "settings": Settings,
  "customization": Settings,
  "tool": Wrench,
  "integration": Layers,
  "getting-started": Star,
  // Files & Documents
  "file": FileText,
  "small-file": FileText,
  "folder-normal": FolderOpen,
  // Navigation & UI
  "filter": Filter,
  "edit": Edit,
  "add": Plus,
  "menu": Menu,
  "down": ChevronDown,
  "right": ArrowRight,
  "left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "insert-below": Plus,
  "group-by": LayoutGrid,
  // Communication
  "message-1": MessageSquare,
  "external-link": ExternalLink,
  // Media & Content
  "image": Image,
  "image-view": Home,
  "website": Globe,
  "web": Globe,
  // Education
  "education": BookOpen,
  // Time & Status
  "refresh": RefreshCw,
  "map": MapPin,
  "star": Star,
  "unread-status": Circle,
  "primitive-dot": Circle,
  "table": LayoutGrid,
  // Default
  "default": Circle
};
var FrappeSidebar = ({ defaultAppFilter, className, logoUrl, fixed = true } = {}) => {
  const [pinned, setPinned] = useState(() => {
    if (!fixed) return true;
    const saved = localStorage.getItem("frappe-sidebar-pinned");
    return saved ? JSON.parse(saved) : false;
  });
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [apps, setApps] = useState([]);
  const [currentApp, setCurrentApp] = useState("");
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
  useEffect(() => {
    localStorage.setItem("frappe-sidebar-pinned", JSON.stringify(pinned));
  }, [pinned]);
  const getIcon = (iconName) => {
    if (!iconName) return iconMap["default"];
    return iconMap[iconName] || iconMap["default"];
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
  if (pinned) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn("w-56 h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0", className),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-2 relative", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setAppMenuOpen(!appMenuOpen),
                className: "w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors justify-start",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 flex items-center justify-center flex-shrink-0", children: appLogoUrl ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: appLogoUrl,
                      alt: "",
                      className: "w-8 h-8 object-contain"
                    }
                  ) : /* @__PURE__ */ jsx(Briefcase, { className: "w-8 h-8 text-gray-600", strokeWidth: 1.5 }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium truncate flex-1 text-left", children: currentAppData?.app_title || "ERPNext" }),
                  /* @__PURE__ */ jsx(ChevronDown, { className: cn(
                    "w-4 h-4 text-gray-400 transition-transform",
                    appMenuOpen && "rotate-180"
                  ), strokeWidth: 1.5 })
                ]
              }
            ),
            appMenuOpen && /* @__PURE__ */ jsxs("div", { className: "absolute left-2 right-2 top-14 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 max-h-80 overflow-y-auto", children: [
              apps.map((app) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => navigateToApp(app),
                  className: cn(
                    "w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-left",
                    app.app_name === currentApp && "bg-gray-50"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-5 h-5 flex items-center justify-center flex-shrink-0", children: app.app_logo_url ? /* @__PURE__ */ jsx("img", { src: app.app_logo_url, alt: "", className: "w-4 h-4 object-contain" }) : /* @__PURE__ */ jsx(Circle, { className: "w-3 h-3", strokeWidth: 1.5 }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm truncate", children: app.app_title })
                  ]
                },
                app.app_name
              )),
              /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 my-1" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    window.location.href = "/";
                  },
                  className: "w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-left",
                  children: [
                    /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4", strokeWidth: 1.5 }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Website" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden py-1", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0.5 px-2", children: filteredWorkspaces.map((workspace) => {
            const Icon = getIcon(workspace.icon);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => navigateToWorkspace(workspace),
                className: "w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900 justify-start",
                children: [
                  /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 flex-shrink-0", strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm truncate", children: workspace.title || workspace.name })
                ]
              },
              workspace.name
            );
          }) }) }),
          fixed && /* @__PURE__ */ jsx("div", { className: "p-2 border-t border-gray-100", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleCollapseClick,
              className: "w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 justify-start",
              children: [
                /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4", strokeWidth: 1.5 }),
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Collapse" })
              ]
            }
          ) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "w-[50px] flex-shrink-0" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-200 z-50",
          expanded ? "w-56 shadow-lg" : "w-[50px]",
          className
        ),
        onMouseEnter: () => setHoverExpanded(true),
        onMouseLeave: () => {
          setHoverExpanded(false);
          setAppMenuOpen(false);
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-2 relative", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => expanded ? setAppMenuOpen(!appMenuOpen) : navigateToDesk(),
                className: cn(
                  "w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors",
                  expanded ? "justify-start" : "justify-center"
                ),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 flex items-center justify-center flex-shrink-0", children: appLogoUrl ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: appLogoUrl,
                      alt: "",
                      className: "w-8 h-8 object-contain"
                    }
                  ) : /* @__PURE__ */ jsx(Briefcase, { className: "w-8 h-8 text-gray-600", strokeWidth: 1.5 }) }),
                  expanded && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium truncate flex-1 text-left", children: currentAppData?.app_title || "ERPNext" }),
                    /* @__PURE__ */ jsx(ChevronDown, { className: cn(
                      "w-4 h-4 text-gray-400 transition-transform",
                      appMenuOpen && "rotate-180"
                    ) })
                  ] })
                ]
              }
            ),
            appMenuOpen && expanded && /* @__PURE__ */ jsxs("div", { className: "absolute left-2 right-2 top-14 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 max-h-80 overflow-y-auto", children: [
              apps.map((app) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => navigateToApp(app),
                  className: cn(
                    "w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-left",
                    app.app_name === currentApp && "bg-gray-50"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-5 h-5 flex items-center justify-center flex-shrink-0", children: app.app_logo_url ? /* @__PURE__ */ jsx("img", { src: app.app_logo_url, alt: "", className: "w-4 h-4 object-contain" }) : /* @__PURE__ */ jsx(Circle, { className: "w-3 h-3", strokeWidth: 1.5 }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm truncate", children: app.app_title })
                  ]
                },
                app.app_name
              )),
              /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 my-1" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    window.location.href = "/";
                  },
                  className: "w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-left",
                  children: [
                    /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4", strokeWidth: 1.5 }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Website" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden py-1", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0.5 px-2", children: filteredWorkspaces.map((workspace) => {
            const Icon = getIcon(workspace.icon);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => navigateToWorkspace(workspace),
                className: cn(
                  "w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900",
                  expanded ? "justify-start" : "justify-center"
                ),
                children: [
                  /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 flex-shrink-0", strokeWidth: 1.5 }),
                  expanded && /* @__PURE__ */ jsx("span", { className: "text-sm truncate", children: workspace.title || workspace.name })
                ]
              },
              workspace.name
            );
          }) }) }),
          /* @__PURE__ */ jsx("div", { className: "p-2 border-t border-gray-100", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleCollapseClick,
              className: cn(
                "w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400",
                expanded ? "justify-start" : "justify-center"
              ),
              children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4", strokeWidth: 1.5 }),
                expanded && /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Collapse" })
              ]
            }
          ) })
        ]
      }
    )
  ] });
};
var FrappeSidebar_default = FrappeSidebar;
export {
  FrappeSidebar_default as FrappeSidebar,
  cn
};
