// src/NeoCockpit.tsx
import {
  Fragment as Fragment2,
  useState as useState2,
  useEffect as useEffect2,
  useLayoutEffect,
  useMemo,
  useCallback as useCallback2,
  useRef as useRef2
} from "react";
import {
  Activity,
  ArrowRight,
  Award,
  Banknote,
  BarChart2,
  BarChart3,
  BookOpen,
  Book,
  Briefcase,
  Building2,
  Calculator,
  CalendarDays as CalendarDays2,
  CheckSquare,
  ChevronDown,
  Clock,
  Cloud,
  Contact,
  Database,
  DatabaseZap,
  Circle,
  DollarSign,
  Edit,
  ExternalLink as ExternalLink2,
  Factory,
  FileCheck,
  FileText,
  Filter,
  FolderOpen,
  GalleryVerticalEnd,
  GitBranch,
  Globe,
  GraduationCap,
  HandCoins,
  Headphones,
  HelpCircle,
  Home,
  Inbox,
  Image,
  Landmark,
  Layers,
  LayoutGrid,
  LifeBuoy,
  ListChecks,
  ListOrdered,
  Mail,
  MapPin,
  LayoutDashboard,
  LogIn,
  Menu,
  MessageSquare,
  MoreHorizontal,
  MoreVertical,
  Package,
  Phone,
  Route as RouteIcon,
  PieChart,
  Plus,
  Receipt,
  RefreshCw,
  Rocket,
  Scale,
  Search as Search2,
  Settings,
  ShoppingBag,
  ScreenShare,
  Server,
  Repeat,
  Moon,
  Presentation,
  Archive,
  HardDrive,
  Network,
  AtSign,
  Send,
  Brain,
  MessageCircle,
  Camera,
  KeyRound,
  HeartPulse,
  PackagePlus,
  Signpost,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Tag,
  Target,
  StickyNote,
  NotebookPen,
  Ticket,
  Trash2,
  TrendingDown,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  User as UserIcon,
  Wallet,
  Warehouse,
  Wrench,
  Bell,
  ChevronsUpDown,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Eye,
  EyeOff,
  UserPlus,
  Share2,
  Calendar,
  Smartphone,
  MonitorSmartphone
} from "lucide-react";

// src/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/NeoLogo.tsx
import { jsx } from "react/jsx-runtime";
var INNER = `<g>
<g>
<g>
<path class="st0" d="M144.2,74.5V35.3h-7.1V22.8h7.1v-2.7c0-10.5,7-17.6,17.4-17.6h6.1v12.5h-4.1c-3.4,0-5,1.7-5,5.3v2.5h10.3v12.5h-10.3v39.2H144.2z"/>
<path class="st1" d="M167,3.1v11.1h-3.4c-3.9,0-5.7,2-5.7,6v3.2h10.3v11.1h-10.3v39.2h-13.1V34.6h-7.1V23.5h7.1v-3.4c0-10.2,6.6-16.9,16.8-16.9H167 M168.4,1.8H167h-5.4c-10.8,0-18.1,7.4-18.1,18.3v2h-5.7h-1.3v1.3v11.1v1.3h1.3h5.7v37.9v1.3h1.3h13.1h1.3v-1.3V35.9h8.9h1.3v-1.3V23.5v-1.3h-1.3h-8.9v-1.9c0-3.3,1.3-4.7,4.4-4.7h3.4h1.3v-1.3V3.1V1.8L168.4,1.8z"/>
</g>
<g>
<path class="st0" d="M203.7,74.5V22.8h14.4v51.7H203.7z M176,74.5V35.3H169V22.8h7.1v-2.7c0-10.5,7-17.6,17.4-17.6h6.1v12.5h-4.1c-3.4,0-5,1.7-5,5.3v2.5h10.3v12.5h-10.3v39.2H176z M210.9,20c-4.8,0-8.5-3.7-8.5-8.4c0-4.6,3.8-8.3,8.5-8.3c4.8,0,8.5,3.7,8.5,8.3C219.4,16.3,215.7,20,210.9,20z"/>
<path class="st1" d="M198.9,3.1v11.1h-3.4c-3.9,0-5.7,2-5.7,6v3.2H200v11.1h-10.3v39.2h-13.1V34.6h-7.1V23.5h7.1v-3.4c0-10.2,6.6-16.9,16.8-16.9H198.9 M210.9,3.9c4.6,0,7.8,3.5,7.8,7.7c0,4.4-3.3,7.7-7.8,7.7c-4.5,0-7.8-3.5-7.8-7.7C203,7.4,206.4,3.9,210.9,3.9 M217.5,23.5v50.4h-13.1V23.5H217.5 M200.2,1.8h-1.3h-5.4c-10.8,0-18.1,7.4-18.1,18.3v2h-5.7h-1.3v1.3v11.1v1.3h1.3h5.7v37.9v1.3h1.3h13.1h1.3v-1.3V35.9h8.9h1.3v-1.3V23.5v-1.3H200h-8.9v-1.9c0-3.3,1.3-4.7,4.4-4.7h3.4h1.3v-1.3V3.1V1.8L200.2,1.8z M210.9,2.6c-5.1,0-9.2,4-9.2,9c0,5.1,4,9.1,9.2,9.1c5.2,0,9.2-3.9,9.2-9.1C220.1,6.5,216,2.6,210.9,2.6L210.9,2.6z M218.8,22.1h-1.3h-13.1h-1.3v1.3v50.4v1.3h1.3h13.1h1.3v-1.3V23.5V22.1L218.8,22.1z"/>
</g>
<g>
<path class="st0" d="M249.7,75.8c-14.7,0-26.6-12.2-26.6-27.1c0-15.4,11.7-27,27.3-27.1l0.4,0c9,0,16.7,3.5,21.1,9.7l0.4,0.5l-11.1,9.1l-0.4-0.6c-2.3-3.4-6-5.4-10.1-5.4c-7.5,0-13.1,6-13.1,13.9s5.7,13.9,13.4,13.9c4.2,0,7.4-1.8,10.4-5.7l0.4-0.6l10.5,9.1l-0.4,0.5C266.7,72.4,259.3,75.8,249.7,75.8z"/>
<path class="st1" d="M250.8,22.2c9,0,16.4,3.6,20.6,9.4l-10.1,8.2c-2.3-3.5-6.2-5.7-10.7-5.7c-8.3,0-13.8,6.7-13.8,14.5c0,7.8,5.7,14.5,14,14.5c5,0,8.3-2.5,10.9-6l9.5,8.2c-4.7,6.1-11.7,9.7-21.6,9.7c-14.4,0-26-11.8-26-26.4s11.2-26.3,26.6-26.4C250.5,22.2,250.6,22.2,250.8,22.2 M250.8,20.9l-0.4,0c-15.9,0.1-28,12-28,27.8c0,15.3,12.2,27.8,27.3,27.8c9.8,0,17.4-3.4,22.7-10.2l0.8-1l-1-0.8l-9.5-8.2l-1.1-0.9l-0.9,1.2c-2.8,3.8-5.9,5.5-9.9,5.5c-7.2,0-12.7-5.7-12.7-13.2c0-8.7,6.2-13.2,12.4-13.2c3.9,0,7.4,1.9,9.5,5.1l0.8,1.2l1.1-0.9l10.1-8.2l1-0.8l-0.7-1C267.8,24.5,259.9,20.9,250.8,20.9L250.8,20.9z"/>
</g>
<g>
<path class="st0" d="M301,75.8c-15.2,0-26.7-11.6-26.7-27c0-15.3,11.7-27.2,26.7-27.2c15,0,26.2,11.7,26.2,27.2c0,1.7-0.1,3.2-0.4,4.8l-0.1,0.6h-37.4c1.7,5.5,6,8.7,11.6,8.7c4.9,0,9.3-2.4,11.7-6.5l0.4-0.6l11.3,8.5l-0.3,0.5C319.7,71.5,310.8,75.8,301,75.8z M312.5,42.9c-1.5-4.5-5.6-8.8-11.7-8.8c-5.4,0-9.8,3.4-11.4,8.8H312.5z"/>
<path class="st1" d="M301,22.2c15.1,0,25.6,12,25.6,26.5c0,1.5-0.1,3-0.4,4.6h-37.7c1.5,5.9,5.9,10.1,12.5,10.1c5.6,0,10-2.9,12.3-6.8l10.2,7.7c-4.1,6.3-12.5,10.7-22.5,10.7c-15.6,0-26-11.8-26-26.3C275,34.2,285.9,22.2,301,22.2 M288.5,43.6h24.9c-1.5-5.6-6.2-10.2-12.6-10.2C294.6,33.4,290,37.6,288.5,43.6 M301,20.9c-15.4,0-27.4,12.2-27.4,27.9c0,7.5,2.7,14.5,7.6,19.5c5,5.2,12.1,8.1,19.8,8.1c10,0,19.1-4.4,23.6-11.4l0.7-1.1l-1-0.8l-10.2-7.7l-1.2-0.9h13.2h1.1l0.2-1.1c0.3-1.6,0.4-3.2,0.4-4.9C327.9,32.8,316.4,20.9,301,20.9L301,20.9z M290.4,42.3c1.7-4.7,5.6-7.5,10.5-7.5c5.4,0,9.1,3.5,10.7,7.5H290.4L290.4,42.3z M290.4,54.7h22.6l-0.8,1.3c-2.3,3.8-6.5,6.1-11.1,6.1C296,62.1,292.1,59.4,290.4,54.7L290.4,54.7z"/>
</g>
</g>
<g>
<g>
<path class="st1" d="M38.3,74.5V46.2c0-7.7-3.5-11.8-10.2-11.8c-4.7,0-9.8,3.1-9.8,11.8v28.3H3.9V22.8h14.2v5.5c3-4.4,7.9-6.6,14.7-6.6c11.7,0,19.8,8.8,19.8,21.4v31.5H38.3z"/>
<path class="st0" d="M32.9,22.3c10.8,0,19.2,8,19.2,20.7v30.8H39V46.2c0-8.7-4.4-12.5-10.8-12.5c-5.5,0-10.5,3.8-10.5,12.5v27.6H4.6V23.5h12.9v7.4C20.1,25.2,25.1,22.3,32.9,22.3 M32.9,21c-6.2,0-10.9,1.8-14.1,5.4v-2.8v-1.3h-1.3H4.6H3.3v1.3v50.4v1.3h1.3h13.1H19v-1.3V46.2c0-10.3,7-11.1,9.1-11.1c6.3,0,9.5,3.8,9.5,11.1v27.6v1.3H39h13.1h1.3v-1.3V43C53.4,30,45,21,32.9,21L32.9,21z"/>
</g>
<g>
<path class="st1" d="M72.8,75.8c-15.2,0-26.7-11.6-26.7-27c0-15.3,11.7-27.2,26.7-27.2c15,0,26.2,11.7,26.2,27.2c0,1.7-0.1,3.2-0.4,4.8l-0.1,0.6H61.2c1.7,5.5,6,8.7,11.6,8.7c4.9,0,9.3-2.4,11.7-6.5l0.4-0.6l11.3,8.5l-0.3,0.5C91.4,71.5,82.6,75.8,72.8,75.8z M84.3,42.9c-1.5-4.5-5.6-8.8-11.7-8.8c-5.4,0-9.8,3.4-11.4,8.8H84.3z"/>
<path class="st0" d="M72.8,22.2c15.1,0,25.6,12,25.6,26.5c0,1.5-0.1,3-0.4,4.6H60.3c1.5,5.9,5.9,10.1,12.5,10.1c5.6,0,10-2.9,12.3-6.8l10.2,7.7c-4.1,6.3-12.5,10.7-22.5,10.7c-15.6,0-26.1-11.8-26.1-26.3C46.7,34.2,57.7,22.2,72.8,22.2 M60.3,43.6h24.9C83.7,38,79,33.4,72.6,33.4C66.4,33.4,61.7,37.6,60.3,43.6 M72.8,20.9c-15.4,0-27.4,12.2-27.4,27.9c0,7.5,2.7,14.5,7.6,19.5c5,5.2,12.1,8.1,19.8,8.1c10,0,19.1-4.4,23.6-11.4L97,64l-1-0.8l-10.2-7.7l-1.2-0.9H98h1.1l0.2-1.1c0.3-1.6,0.4-3.2,0.4-4.9C99.7,32.8,88.1,20.9,72.8,20.9L72.8,20.9z M62.1,42.3c1.7-4.7,5.6-7.5,10.5-7.5c5.4,0,9.1,3.5,10.7,7.5H62.1L62.1,42.3z M62.1,54.7h22.6L83.9,56c-2.3,3.8-6.5,6.1-11.1,6.1C67.7,62.1,63.8,59.4,62.1,54.7L62.1,54.7z"/>
</g>
<g>
<path class="st1" d="M118.3,75.8c-15.7,0-27.5-11.6-27.5-27c0-15.2,12.1-27.1,27.5-27.1s27.5,11.9,27.5,27.1C145.8,64.1,134,75.8,118.3,75.8z M118.3,34.9c-7.5,0-13.1,6-13.1,13.9c0,8,5.5,13.8,13.1,13.8c7.6,0,13.1-5.8,13.1-13.8C131.4,40.8,125.7,34.9,118.3,34.9z"/>
<path class="st0" d="M118.3,22.3c15.6,0,26.8,11.9,26.8,26.4c0,14.5-11.2,26.3-26.8,26.3c-15.6,0-26.8-11.8-26.8-26.3C91.5,34.2,102.7,22.3,118.3,22.3 M118.3,63.2c8.3,0,13.8-6.6,13.8-14.4s-5.4-14.5-13.8-14.5c-8.3,0-13.8,6.7-13.8,14.5S110,63.2,118.3,63.2 M118.3,21c-7.8,0-15,2.9-20.2,8.2c-5.1,5.2-8,12.1-8,19.6c0,7.5,2.8,14.4,8,19.6c5.2,5.2,12.4,8.1,20.2,8.1c7.8,0,15-2.9,20.2-8.1c5.1-5.1,8-12.1,8-19.6c0-7.5-2.8-14.4-8-19.6C133.3,23.9,126.1,21,118.3,21L118.3,21z M118.3,61.8c-7.2,0-12.4-5.5-12.4-13.1c0-8.7,6.2-13.2,12.4-13.2c6.2,0,12.4,4.5,12.4,13.2C130.7,56.3,125.5,61.8,118.3,61.8L118.3,61.8z"/>
</g>
</g>
</g>`;
function NeoLogo({ height = 20, mark = false, className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: ["nc-logo", className].filter(Boolean).join(" "),
      viewBox: mark ? "0 0 54 78.2" : "0 0 331.2 78.2",
      role: "img",
      "aria-label": "Neoffice",
      style: { height, width: "auto", display: "block", flexShrink: 0 },
      dangerouslySetInnerHTML: { __html: INNER }
    }
  );
}

// src/SpaPanels.tsx
import { useState, useEffect, useCallback, useRef } from "react";
import { ExternalLink, Search, SquarePen, CalendarDays, CalendarClock, AlarmClock } from "lucide-react";

// src/assistLoader.ts
var CLIENT = /^\/assets\/neoffice_theme\/js\/assist_client\.js(\?v=[\w.-]+)?$/;
function assistScript(win) {
  const conf = win.frappe?.boot?.neo_assist;
  if (!conf || !conf.enabled || typeof conf.script !== "string") return null;
  return CLIENT.test(conf.script) ? conf.script : null;
}
var CONFIG = "/api/method/neoffice_theme.assist.client_config";
async function askConfig(win) {
  let conf = null;
  try {
    const response = await win.fetch(CONFIG, { credentials: "same-origin", headers: { Accept: "application/json" } });
    const message = response.ok ? (await response.json()).message : null;
    if (message && typeof message === "object") conf = message;
  } catch {
  }
  win.frappe = win.frappe || {};
  win.frappe.boot = win.frappe.boot || {};
  win.frappe.boot.neo_assist = conf;
}
function loadAssist(win = window) {
  if (win.neo_assist) return Promise.resolve(win.neo_assist);
  if (win.neoAssistLoading) return win.neoAssistLoading;
  const user = win.frappe?.boot?.user;
  const desk = !user || user.name !== "Guest" && !user.portal;
  if (win.frappe?.boot?.neo_assist === void 0 && win.fetch && desk) {
    win.neoAssistLoading = askConfig(win).then(() => {
      win.neoAssistLoading = void 0;
      return loadScript(win);
    });
    return win.neoAssistLoading;
  }
  return loadScript(win);
}
function loadScript(win) {
  const src = assistScript(win);
  if (!src) return Promise.resolve(null);
  win.neoAssistLoading = new Promise((resolve) => {
    const script = win.document.createElement("script");
    script.src = src;
    script.onload = () => resolve(win.neo_assist || null);
    script.onerror = () => {
      win.neoAssistLoading = void 0;
      resolve(null);
    };
    win.document.head.appendChild(script);
  });
  return win.neoAssistLoading;
}

// src/SpaPanels.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var POLL_MS = 6e4;
async function api(method, params) {
  try {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    const r = await fetch(`/api/method/${method}${qs}`, {
      headers: { "X-Frappe-Site-Name": window.location.hostname },
      credentials: "include"
    });
    if (!r.ok) return null;
    return (await r.json() || {}).message ?? null;
  } catch {
    return null;
  }
}
async function apiPost(method, args) {
  try {
    const w = window;
    const r = await fetch(`/api/method/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frappe-Site-Name": window.location.hostname,
        "X-Frappe-CSRF-Token": w.csrf_token || w.frappe?.csrf_token || ""
      },
      credentials: "include",
      body: JSON.stringify(args || {})
    });
    if (!r.ok) return null;
    return (await r.json() || {}).message ?? null;
  } catch {
    return null;
  }
}
var fmtTime = (ts) => {
  if (!ts) return "";
  const d = new Date(ts.replace(" ", "T"));
  if (isNaN(d.getTime())) return "";
  const today = /* @__PURE__ */ new Date();
  return d.toDateString() === today.toDateString() ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : d.toLocaleDateString([], { day: "numeric", month: "short" });
};
function useUnreadNotifications(enabled) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const load = async () => {
      const res = await api(
        "frappe.desk.doctype.notification_log.notification_log.get_notification_logs",
        { limit: "20" }
      );
      setCount((res?.notification_logs || []).filter((l) => !l.read).length);
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [enabled]);
  return count;
}
function NotificationsPanel({ tr: tr2, onClose }) {
  const [logs, setLogs] = useState(null);
  useEffect(() => {
    api(
      "frappe.desk.doctype.notification_log.notification_log.get_notification_logs",
      { limit: "20" }
    ).then((res) => setLogs(res?.notification_logs || []));
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ jsxs("div", { className: "head", children: [
      /* @__PURE__ */ jsx2("span", { className: "t", children: tr2("Notifications") }),
      /* @__PURE__ */ jsx2("a", { className: "open", href: "/app/notification-log", title: tr2("Open notifications"), children: /* @__PURE__ */ jsx2(ExternalLink, { size: 14 }) }),
      /* @__PURE__ */ jsx2("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "body", children: [
      logs === null && /* @__PURE__ */ jsx2("div", { className: "empty", children: "\u2026" }),
      logs !== null && !logs.length && /* @__PURE__ */ jsx2("div", { className: "empty", children: tr2("No notifications") }),
      (logs || []).map((l) => /* @__PURE__ */ jsxs(
        "a",
        {
          className: cn("row", !l.read && "unread"),
          href: l.document_type && l.document_name ? `/app/${l.document_type.toLowerCase().replace(/ /g, "-")}/${encodeURIComponent(l.document_name)}` : "/app/notification-log",
          children: [
            /* @__PURE__ */ jsx2("span", { className: "dot" }),
            /* @__PURE__ */ jsxs("span", { className: "main", children: [
              /* @__PURE__ */ jsx2("span", { className: "s", dangerouslySetInnerHTML: { __html: l.subject || "" } }),
              /* @__PURE__ */ jsx2("span", { className: "m", children: fmtTime(l.creation) })
            ] })
          ]
        },
        l.name
      ))
    ] })
  ] });
}
function useUnreadSynk(enabled) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const load = async () => {
      const res = await api(
        "raven.api.raven_message.get_unread_count_for_channels"
      );
      setCount((res || []).reduce((a, c) => a + (c.unread_count || 0), 0));
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [enabled]);
  return count;
}
function SynkPanel({ tr: tr2, userInfo, onClose }) {
  const [channels, setChannels] = useState(null);
  const [dms, setDms] = useState([]);
  const [unread, setUnread] = useState({});
  useEffect(() => {
    api(
      "raven.api.raven_channel.get_all_channels",
      { hide_archived: "1" }
    ).then((res) => {
      setChannels(res?.channels || []);
      setDms(res?.dm_channels || []);
    });
    api(
      "raven.api.raven_message.get_unread_count_for_channels"
    ).then((res) => {
      const map = {};
      for (const c of res || []) map[c.name] = c.unread_count;
      setUnread(map);
    });
  }, []);
  const last = (c) => {
    const d = c.last_message_details;
    if (!d) return "";
    try {
      const o = typeof d === "string" ? JSON.parse(d) : d;
      return String(o.content || "").replace(/<[^>]+>/g, "").slice(0, 60);
    } catch {
      return "";
    }
  };
  const row = (c, label, avatar) => /* @__PURE__ */ jsxs("a", { className: "row", href: `/raven/channel/${encodeURIComponent(c.name)}`, children: [
    avatar,
    /* @__PURE__ */ jsxs("span", { className: "main", children: [
      /* @__PURE__ */ jsx2("span", { className: "s", children: label }),
      last(c) && /* @__PURE__ */ jsx2("span", { className: "m", children: last(c) })
    ] }),
    unread[c.name] ? /* @__PURE__ */ jsx2("span", { className: "badge", children: unread[c.name] }) : null
  ] }, c.name);
  return /* @__PURE__ */ jsxs("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ jsxs("div", { className: "head", children: [
      /* @__PURE__ */ jsx2("span", { className: "t", style: { fontFamily: '"Cal Sans", inherit' }, children: "synk" }),
      /* @__PURE__ */ jsx2("a", { className: "open", href: "/raven", title: tr2("Open Synk"), children: /* @__PURE__ */ jsx2(ExternalLink, { size: 14 }) }),
      /* @__PURE__ */ jsx2("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "body", children: [
      channels === null && /* @__PURE__ */ jsx2("div", { className: "empty", children: "\u2026" }),
      channels !== null && /* @__PURE__ */ jsxs(Fragment, { children: [
        channels.length > 0 && /* @__PURE__ */ jsx2("div", { className: "sect", children: tr2("Channels") }),
        channels.map((c) => row(
          c,
          c.channel_name || c.name,
          /* @__PURE__ */ jsx2("span", { className: "av sq", children: "#" })
        )),
        dms.length > 0 && /* @__PURE__ */ jsx2("div", { className: "sect", children: tr2("Direct messages") }),
        dms.map((c) => {
          const peer = c.peer_user_id || "";
          const pretty = peer.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());
          const name = userInfo[peer]?.fullname || pretty || c.channel_name || "";
          return row(
            c,
            name,
            /* @__PURE__ */ jsx2("span", { className: "av", children: (name[0] || "?").toUpperCase() })
          );
        }),
        !channels.length && !dms.length && /* @__PURE__ */ jsx2("div", { className: "empty", children: tr2("No conversations") })
      ] })
    ] })
  ] });
}
function MailMenu({ tr: tr2, onSynk, onMail, onConfigure, onClose }) {
  const [mailState, setMailState] = useState("loading");
  const [synkCount, setSynkCount] = useState(0);
  const [mailCount, setMailCount] = useState(0);
  const [smsReady, setSmsReady] = useState(false);
  useEffect(() => {
    if (onSynk) {
      api(
        "raven.api.raven_message.get_unread_count_for_channels"
      ).then((res) => setSynkCount((res || []).reduce((a, c) => a + (c.unread_count || 0), 0)));
    }
    api("neoffice_theme.sms.can_use_sms").then((res) => setSmsReady(!!(res && res.enabled && res.allowed))).catch(() => setSmsReady(false));
    api("frappe_webmail.webmail_api.get_accounts").then((accounts) => {
      if (accounts === null) {
        setMailState("absent");
        return;
      }
      if (!accounts.length) {
        setMailState("none");
        return;
      }
      setMailState("ready");
      api("frappe_webmail.webmail_api.get_emails", {
        account_name: accounts[0].name,
        folder: "INBOX",
        limit: "20"
      }).then((res) => setMailCount((res?.emails || []).filter((e) => !e.seen).length));
    });
  }, [onSynk]);
  return /* @__PURE__ */ jsxs("div", { className: "nc-spa-panel nc-mini", children: [
    /* @__PURE__ */ jsxs("div", { className: "head", children: [
      /* @__PURE__ */ jsx2("span", { className: "t", children: tr2("Messages") }),
      /* @__PURE__ */ jsx2("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "body", children: [
      onSynk && /* @__PURE__ */ jsxs("button", { className: "row", onClick: onSynk, children: [
        /* @__PURE__ */ jsx2("span", { className: "av sq", children: "#" }),
        /* @__PURE__ */ jsxs("span", { className: "main", children: [
          /* @__PURE__ */ jsx2("span", { className: "s", style: { fontFamily: '"Cal Sans", inherit' }, children: "synk" }),
          /* @__PURE__ */ jsx2("span", { className: "m", children: tr2("Team messaging") })
        ] }),
        synkCount > 0 && /* @__PURE__ */ jsx2("span", { className: "badge", children: synkCount })
      ] }),
      mailState === "ready" && /* @__PURE__ */ jsxs("button", { className: "row", onClick: onMail, children: [
        /* @__PURE__ */ jsx2("span", { className: "av", children: "@" }),
        /* @__PURE__ */ jsxs("span", { className: "main", children: [
          /* @__PURE__ */ jsx2("span", { className: "s", children: tr2("Email") }),
          /* @__PURE__ */ jsx2("span", { className: "m", children: tr2("Inbox") })
        ] }),
        mailCount > 0 && /* @__PURE__ */ jsx2("span", { className: "badge", children: mailCount })
      ] }),
      smsReady && /* @__PURE__ */ jsxs("button", { className: "row", onClick: () => {
        onClose();
        const w = window;
        w.neoffice?.sms?.quick_send?.();
      }, children: [
        /* @__PURE__ */ jsx2("span", { className: "av", children: "\u2709" }),
        /* @__PURE__ */ jsxs("span", { className: "main", children: [
          /* @__PURE__ */ jsx2("span", { className: "s", children: tr2("SMS") }),
          /* @__PURE__ */ jsx2("span", { className: "m", children: tr2("Send a text message") })
        ] })
      ] }),
      mailState === "none" && /* @__PURE__ */ jsxs("button", { className: "row", onClick: onConfigure, children: [
        /* @__PURE__ */ jsx2("span", { className: "av", children: "@" }),
        /* @__PURE__ */ jsxs("span", { className: "main", children: [
          /* @__PURE__ */ jsx2("span", { className: "s", children: tr2("Email") }),
          /* @__PURE__ */ jsx2("span", { className: "m", children: tr2("Set up an email address") })
        ] })
      ] })
    ] })
  ] });
}
function MailPanel({ tr: tr2, onOpenWebmail, onClose }) {
  const [state, setState] = useState("loading");
  const [emails, setEmails] = useState([]);
  const [account, setAccount] = useState("");
  useEffect(() => {
    api("frappe_webmail.webmail_api.get_accounts").then((accounts) => {
      if (!accounts || !accounts.length) {
        setState("none");
        return;
      }
      setAccount(accounts[0].name);
      api("frappe_webmail.webmail_api.get_emails", {
        account_name: accounts[0].name,
        folder: "INBOX",
        limit: "10"
      }).then((res) => {
        setEmails(res?.emails || []);
        setState("ready");
      });
    });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ jsxs("div", { className: "head", children: [
      /* @__PURE__ */ jsx2("span", { className: "t", children: tr2("Email") }),
      /* @__PURE__ */ jsx2("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "body", children: [
      state === "loading" && /* @__PURE__ */ jsx2("div", { className: "empty", children: "\u2026" }),
      state === "none" && /* @__PURE__ */ jsxs("div", { className: "empty", children: [
        /* @__PURE__ */ jsx2("p", { style: { margin: "6px 0 14px" }, children: tr2("No email account configured yet.") }),
        /* @__PURE__ */ jsx2("button", { className: "cta", onClick: () => onOpenWebmail(), children: tr2("Set up an email address") })
      ] }),
      state === "ready" && !emails.length && /* @__PURE__ */ jsx2("div", { className: "empty", children: tr2("Inbox is empty") }),
      state === "ready" && emails.map((e) => {
        const who = e.from_name || e.from_email || "?";
        return /* @__PURE__ */ jsxs(
          "button",
          {
            className: cn("row", !e.seen && "unread"),
            onClick: () => onOpenWebmail(`?account=${encodeURIComponent(account)}&folder=INBOX&uid=${e.uid}`),
            children: [
              /* @__PURE__ */ jsx2("span", { className: "dot" }),
              /* @__PURE__ */ jsx2("span", { className: "av", children: (who[0] || "?").toUpperCase() }),
              /* @__PURE__ */ jsxs("span", { className: "main", children: [
                /* @__PURE__ */ jsx2("span", { className: "s", children: e.subject || tr2("(no subject)") }),
                /* @__PURE__ */ jsxs("span", { className: "m", children: [
                  who,
                  " \xB7 ",
                  fmtTime(e.date || void 0)
                ] })
              ] })
            ]
          },
          e.uid
        );
      })
    ] }),
    state !== "loading" && /* @__PURE__ */ jsxs("div", { className: "foot mail-foot", children: [
      /* @__PURE__ */ jsxs("a", { className: "wiki accent", onClick: () => onOpenWebmail("?compose=1"), style: { cursor: "pointer" }, children: [
        /* @__PURE__ */ jsx2(SquarePen, { size: 14 }),
        " ",
        tr2("New email")
      ] }),
      state === "ready" && /* @__PURE__ */ jsxs("a", { className: "wiki", onClick: () => onOpenWebmail(), style: { cursor: "pointer" }, children: [
        /* @__PURE__ */ jsx2(ExternalLink, { size: 14 }),
        " ",
        tr2("Open the webmail")
      ] })
    ] })
  ] });
}
function startOfToday() {
  const d = /* @__PURE__ */ new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} 00:00:00`;
}
function isToday(ts) {
  if (!ts) return false;
  const d = new Date(ts.replace(" ", "T"));
  return !isNaN(d.getTime()) && d.toDateString() === (/* @__PURE__ */ new Date()).toDateString();
}
function useDayEvents() {
  const [events, setEvents] = useState([]);
  const load = useCallback(() => {
    api("frappe.client.get_list", {
      doctype: "Event",
      filters: JSON.stringify([["starts_on", ">=", startOfToday()]]),
      fields: JSON.stringify(["name", "subject", "starts_on", "ends_on", "all_day", "color"]),
      order_by: "starts_on asc",
      limit_page_length: "20"
    }).then((rows) => setEvents(Array.isArray(rows) ? rows : []));
  }, []);
  useEffect(() => {
    load();
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [load]);
  const todayCount = events.filter((e) => isToday(e.starts_on)).length;
  return { events, todayCount };
}
function useDayReminders() {
  const [reminders, setReminders] = useState([]);
  const load = useCallback(() => {
    api("frappe.client.get_list", {
      doctype: "Reminder",
      filters: JSON.stringify([["remind_at", ">=", startOfToday()], ["notified", "=", 0]]),
      fields: JSON.stringify(["name", "description", "remind_at", "reminder_doctype", "reminder_docname"]),
      order_by: "remind_at asc",
      limit_page_length: "20"
    }).then((rows) => setReminders(Array.isArray(rows) ? rows : [])).catch(() => setReminders([]));
  }, []);
  useEffect(() => {
    load();
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [load]);
  return { reminders };
}
function reminderWhen(r, tr2) {
  if (!r.remind_at) return "";
  const d = new Date(r.remind_at.replace(" ", "T"));
  if (isNaN(d.getTime())) return "";
  const day = isToday(r.remind_at) ? tr2("Today") : d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const on = r.reminder_docname ? ` \xB7 ${r.reminder_docname}` : "";
  return `${day} \xB7 ${time}${on}`;
}
function eventWhen(e, tr2) {
  if (!e.starts_on) return "";
  const d = new Date(e.starts_on.replace(" ", "T"));
  if (isNaN(d.getTime())) return "";
  const day = isToday(e.starts_on) ? tr2("Today") : d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
  if (e.all_day) return day;
  return `${day} \xB7 ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}
function EventsPanel({ tr: tr2, events, reminders = [], onNavigate, onClose }) {
  const today = events.filter((e) => isToday(e.starts_on));
  const showingToday = today.length > 0;
  const list = showingToday ? today : events;
  return /* @__PURE__ */ jsxs("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ jsxs("div", { className: "head", children: [
      /* @__PURE__ */ jsx2("span", { className: "t", children: showingToday ? tr2("Today") : tr2("Upcoming events") }),
      /* @__PURE__ */ jsx2("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "body", children: [
      !list.length && /* @__PURE__ */ jsx2("div", { className: "empty", children: tr2("No upcoming events.") }),
      list.map((e) => /* @__PURE__ */ jsxs("button", { className: "row", onClick: () => onNavigate(`/app/event/${encodeURIComponent(e.name)}`), children: [
        /* @__PURE__ */ jsx2("span", { className: "av", style: e.color ? { background: e.color + "22", color: e.color } : void 0, children: /* @__PURE__ */ jsx2(CalendarDays, { size: 15, strokeWidth: 1.9 }) }),
        /* @__PURE__ */ jsxs("span", { className: "main", children: [
          /* @__PURE__ */ jsx2("span", { className: "s", children: e.subject || tr2("(untitled)") }),
          /* @__PURE__ */ jsx2("span", { className: "m", children: eventWhen(e, tr2) })
        ] })
      ] }, e.name)),
      reminders.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx2("div", { className: "sect", children: tr2("Reminders") }),
        reminders.map((r) => /* @__PURE__ */ jsxs(
          "button",
          {
            className: "row",
            onClick: () => onNavigate(
              r.reminder_doctype && r.reminder_docname ? `/app/${encodeURIComponent(r.reminder_doctype.toLowerCase().replace(/ /g, "-"))}/${encodeURIComponent(r.reminder_docname)}` : "/app/reminder"
            ),
            children: [
              /* @__PURE__ */ jsx2("span", { className: "av", children: /* @__PURE__ */ jsx2(AlarmClock, { size: 15, strokeWidth: 1.9 }) }),
              /* @__PURE__ */ jsxs("span", { className: "main", children: [
                /* @__PURE__ */ jsx2("span", { className: "s", children: r.description || tr2("Reminder") }),
                /* @__PURE__ */ jsx2("span", { className: "m", children: reminderWhen(r, tr2) })
              ] })
            ]
          },
          r.name
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "foot", children: /* @__PURE__ */ jsxs("a", { className: "wiki", onClick: () => onNavigate("/app/event/view/calendar"), style: { cursor: "pointer" }, children: [
      /* @__PURE__ */ jsx2(CalendarClock, { size: 14 }),
      " ",
      tr2("Open the calendar")
    ] }) })
  ] });
}
function HelpPanel({ tr: tr2, wikiUrl, onClose }) {
  const [results, setResults] = useState(null);
  const assistSlot = useRef(null);
  useEffect(() => {
    let alive = true;
    let remove;
    void loadAssist().then((assist) => {
      if (alive && assist && assistSlot.current) remove = assist.render_help_entry(assistSlot.current);
    });
    return () => {
      alive = false;
      remove?.();
    };
  }, []);
  const timer = useRef();
  const search = useCallback((q) => {
    clearTimeout(timer.current);
    if (!q || q.length < 2) {
      setResults(null);
      return;
    }
    timer.current = setTimeout(async () => {
      const res = await api("neoffice_theme.api.search_docs", { query: q, limit: "6" });
      setResults(res || []);
    }, 300);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ jsxs("div", { className: "head", children: [
      /* @__PURE__ */ jsx2("span", { className: "t", children: tr2("Help & Training") }),
      /* @__PURE__ */ jsx2("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "body", children: [
      /* @__PURE__ */ jsx2("div", { className: "nc-assist-slot", ref: assistSlot }),
      /* @__PURE__ */ jsxs("div", { className: "searchbox", children: [
        /* @__PURE__ */ jsx2(Search, { size: 15, strokeWidth: 1.8 }),
        /* @__PURE__ */ jsx2("input", { placeholder: tr2("Search the wiki..."), onChange: (e) => search(e.target.value), autoFocus: true })
      ] }),
      results !== null && !results.length && /* @__PURE__ */ jsx2("div", { className: "empty", children: tr2("No wiki page found") }),
      (results || []).map((r) => /* @__PURE__ */ jsxs("a", { className: "row", href: r.url || wikiUrl, target: "_blank", rel: "noopener", children: [
        /* @__PURE__ */ jsx2("span", { className: "main", children: /* @__PURE__ */ jsx2("span", { className: "s link", children: r.title || r.name }) }),
        /* @__PURE__ */ jsx2(ExternalLink, { size: 13, className: "arr" })
      ] }, r.name))
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "foot", children: /* @__PURE__ */ jsxs("a", { className: "wiki", href: wikiUrl, target: "_blank", rel: "noopener", children: [
      /* @__PURE__ */ jsx2(ExternalLink, { size: 14 }),
      " ",
      tr2("Open the Neoffice wiki")
    ] }) })
  ] });
}
async function fetchFavorites() {
  return await api("neoffice_theme.cockpit_favorites.get_favorites") || [];
}
function FavoritesPanel({ tr: tr2, favorites, onNavigate, onRemove, onClose }) {
  const [q, setQ] = useState("");
  const TYPE_HINT = {
    Workspace: tr2("Workspace"),
    List: tr2("List"),
    Form: tr2("Document"),
    Report: tr2("Report"),
    Page: tr2("Page")
  };
  const list = q ? favorites.filter((f) => (f.label + " " + (f.fav_type || "")).toLowerCase().includes(q.toLowerCase())) : favorites;
  return /* @__PURE__ */ jsxs("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ jsxs("div", { className: "head", children: [
      /* @__PURE__ */ jsx2("span", { className: "t", children: tr2("Favorites") }),
      /* @__PURE__ */ jsx2("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "body", children: [
      favorites.length > 6 && /* @__PURE__ */ jsxs("div", { className: "searchbox", children: [
        /* @__PURE__ */ jsx2(Search, { size: 15, strokeWidth: 1.8 }),
        /* @__PURE__ */ jsx2("input", { placeholder: tr2("Filter\u2026"), value: q, onChange: (e) => setQ(e.target.value), autoFocus: true })
      ] }),
      !list.length && /* @__PURE__ */ jsx2("div", { className: "empty", children: tr2("No favorites yet \u2014 star a page to pin it here.") }),
      list.map((f) => /* @__PURE__ */ jsxs("div", { className: "row fav-row", children: [
        /* @__PURE__ */ jsxs("button", { className: "main fav-go", onClick: () => onNavigate(f.route), children: [
          /* @__PURE__ */ jsx2("span", { className: "s", children: f.label }),
          /* @__PURE__ */ jsx2("span", { className: "m", children: TYPE_HINT[f.fav_type || ""] || f.fav_type || "" })
        ] }),
        /* @__PURE__ */ jsx2("button", { className: "fav-x", title: tr2("Remove"), onClick: () => onRemove(f), children: "\xD7" })
      ] }, f.name))
    ] })
  ] });
}

// src/noraLoader.ts
var loadingChain = null;
var loadScript2 = (src) => new Promise((resolve, reject) => {
  const s = document.createElement("script");
  s.src = src;
  s.onload = () => resolve();
  s.onerror = () => reject(new Error("failed: " + src));
  document.head.appendChild(s);
});
var loadCss = (href) => {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  document.head.appendChild(l);
};
function installShims(w) {
  w.__ = w.__ || ((t, args) => {
    let s = String(t);
    if (args) s = s.replace(/\{(\d+)\}/g, (_, i) => String(args[+i] ?? ""));
    return s;
  });
  const f = w.frappe = w.frappe || {};
  f.provide = f.provide || ((ns) => {
    let o = w;
    ns.split(".").forEach((p) => {
      o[p] = o[p] || {};
      o = o[p];
    });
  });
  f.boot = f.boot || {};
  f.session = f.session || {};
  f.session.user = f.session.user || f.boot?.user?.name || f.boot?.user?.email || "Guest";
  f.ui = f.ui || {};
  if (!f.call) {
    f.call = (opts) => {
      const headers = {
        "Content-Type": "application/json",
        "X-Frappe-CSRF-Token": w.csrf_token || f.csrf_token || ""
      };
      return fetch("/api/method/" + opts.method, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(opts.args || {})
      }).then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (r.ok) opts.callback && opts.callback(data);
        else opts.error && opts.error(data);
        opts.always && opts.always(data);
        return data;
      }).catch((e) => {
        opts.error && opts.error(e);
        opts.always && opts.always(e);
      });
    };
  }
  f.xcall = f.xcall || ((method, args) => new Promise((resolve, reject) => f.call({ method, args, callback: (r) => resolve(r.message), error: reject })));
  f.show_alert = f.show_alert || ((o) => console.info("[nora]", typeof o === "string" ? o : o?.message));
  f.get_route = f.get_route || (() => location.pathname.split("/").filter(Boolean));
  f.realtime = f.realtime || { on() {
  }, off() {
  } };
  f.after_ajax = f.after_ajax || ((fn) => Promise.resolve().then(() => fn && fn()));
  f.require = f.require || ((srcs, cb) => Promise.all((Array.isArray(srcs) ? srcs : [srcs]).map(loadScript2)).then(() => cb && cb()));
}
function openNoraQuickChat() {
  const w = window;
  if (!loadingChain) {
    loadingChain = (async () => {
      try {
        if (!w.$ || !w.jQuery) await loadScript2("/assets/frappe/js/lib/jquery/jquery.min.js");
        installShims(w);
        loadCss("/assets/nora/css/nora_voice_overlay.css?v=2");
        loadCss("/assets/nora/css/nora_quick_chat.css?v=23");
        await loadScript2("/assets/nora/js/nora_quick_chat.js?v=45");
        return true;
      } catch (e) {
        console.warn("[neocockpit] NORA quick chat unavailable on this surface", e);
        return false;
      }
    })();
  }
  loadingChain.then((ok) => {
    if (!ok) return;
    if (w.frappe?.ui?.NoraQuickChat?.show) w.frappe.ui.NoraQuickChat.show();
    else if (w.nora?.quick_chat?.show) w.nora.quick_chat.show();
  });
}

// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/cockpit.css
styleInject('.neocockpit {\n  --nc-accent: #d68a59;\n  --nc-accent-deep: #a15a2e;\n  --nc-accent-soft: #faefe6;\n  --nc-accent-tint: #fdf6f0;\n  --nc-on-accent: #ffffff;\n  --nc-page: oklch(0.985 0.004 80);\n  --nc-surface: oklch(0.995 0.003 80);\n  --nc-sunken: oklch(0.995 0.003 80);\n  --nc-deep: #ededed;\n  --nc-ink: oklch(0.25 0.015 60);\n  --nc-ink-soft: oklch(0.62 0.012 70);\n  --nc-ink-mute: oklch(0.45 0.015 65);\n  --nc-line: oklch(0.90 0.012 80);\n  --nc-line-soft:oklch(0.90 0.012 80);\n  --nc-line-strong: #c7c7c7;\n  --nc-frame: #f5f3ef;\n  --nc-sage: #4f8a6e;\n  --nc-sage-soft: #dcefe4;\n  --nc-ochre: #a98233;\n  --nc-ochre-soft:#f1e6c8;\n  --nc-font-sans:\n    "Manrope",\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  --nc-font-mono:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  --nc-r-lg: 18px;\n  --nc-r-md: 14px;\n  --nc-r-sm: 10px;\n  --nc-r-pill: 999px;\n  --nc-w-expanded: 256px;\n  --nc-w-collapsed: 76px;\n  font-family: var(--nc-font-sans);\n  font-size: 13px;\n  color: var(--nc-ink);\n  -webkit-font-smoothing: antialiased;\n}\n.neocockpit *,\n.neocockpit *::before,\n.neocockpit *::after {\n  box-sizing: border-box;\n}\n.neocockpit button {\n  font-family: inherit;\n  cursor: pointer;\n  border: 0;\n  color: inherit;\n}\n.neocockpit button:where(:not([class*=bg-])) {\n  background: transparent;\n}\n[data-theme=dark] .neocockpit {\n  --nc-accent: #dda479;\n  --nc-accent-soft: color-mix(in srgb, var(--nc-accent) 26%, transparent);\n  --nc-accent-tint: color-mix(in srgb, var(--nc-accent) 14%, transparent);\n  --nc-page: #171717;\n  --nc-surface: #171717;\n  --nc-sunken: #232323;\n  --nc-deep: #232323;\n  --nc-ink: #f8f8f8;\n  --nc-ink-soft: #e2e2e2;\n  --nc-ink-mute: #c7c7c7;\n  --nc-line: #232323;\n  --nc-line-soft:#232323;\n  --nc-line-strong: #7c7c7c;\n  --nc-frame: #1b1917;\n}\n.nc-frame {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  height: 100vh;\n  width: 100%;\n  background: var(--nc-frame);\n  padding: 8px;\n  gap: 8px;\n  overflow: hidden;\n}\n.nc-panel {\n  flex: 1;\n  min-width: 0;\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  border-radius: 18px;\n  box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset, 0 8px 30px rgba(20, 30, 50, .06);\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.nc-side {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  padding: 6px 4px 4px;\n  background: transparent;\n  transition: width .25s cubic-bezier(.2, .7, .2, 1);\n  flex-shrink: 0;\n}\n.nc-side.expanded {\n  width: var(--nc-w-expanded);\n}\n.nc-side.collapsed {\n  width: var(--nc-w-collapsed);\n  align-items: center;\n}\n.nc-top {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  padding: 12px 10px 10px;\n}\n.nc-top .nc-logo-slot {\n  display: flex;\n  align-items: center;\n  margin-right: auto;\n}\n.nc-side.collapsed .nc-top {\n  flex-direction: column;\n  height: auto;\n  gap: 10px;\n  padding: 10px 0 2px;\n}\n.nc-side.collapsed .nc-top .nc-logo-slot {\n  margin-right: 0;\n  margin-bottom: 2px;\n  order: -1;\n}\n.nc-side.expanded .nc-top.nc-actions {\n  flex-wrap: wrap;\n  row-gap: 10px;\n  justify-content: space-between;\n  padding: 12px 16px 8px 12px;\n}\n.nc-brandrow {\n  flex: 0 0 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px;\n}\n.nc-brandrow .nc-logo-slot {\n  margin-right: 0;\n  flex-shrink: 0;\n}\n.nc-date {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  padding: 3px 2px;\n  border-radius: 11px;\n  font-family: inherit;\n  color: var(--nc-ink);\n  min-width: 0;\n  flex: 0 1 auto;\n}\n.nc-date:hover {\n  background: var(--nc-page);\n}\n.nc-date-ring {\n  position: relative;\n  display: grid;\n  place-items: center;\n  width: 30px;\n  height: 30px;\n  flex-shrink: 0;\n}\n.nc-date-ring svg {\n  display: block;\n}\n.nc-date-day {\n  position: absolute;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--nc-ink);\n  line-height: 1;\n}\n.nc-date-badge {\n  position: absolute;\n  top: -3px;\n  right: -3px;\n  min-width: 15px;\n  height: 15px;\n  padding: 0 4px;\n  border-radius: 999px;\n  background: #c2603e;\n  color: #fff;\n  font-size: 9.5px;\n  font-weight: 700;\n  line-height: 15px;\n  text-align: center;\n}\n.nc-date-text {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 1px;\n  min-width: 0;\n}\n.nc-date-text .d {\n  font-size: 11.5px;\n  font-weight: 600;\n  color: var(--nc-ink);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n}\n.nc-date-text .t {\n  font-size: 11px;\n  color: var(--nc-ink-mute);\n  line-height: 1;\n}\n.nc-top .nc-iconbtn {\n  width: 30px;\n  height: 30px;\n  flex-shrink: 0;\n  border: none;\n  border-radius: 9px;\n  background: transparent;\n  color: var(--nc-ink);\n}\n.nc-top .nc-iconbtn > svg {\n  width: 18px;\n  height: 18px;\n}\n.nc-top .nc-iconbtn:hover {\n  background: var(--nc-deep);\n}\n.nc-top .nc-iconbtn.nc-nora {\n  color: var(--nc-accent);\n}\n.nc-top .nc-iconbtn.nc-nora:hover {\n  background: var(--nc-accent-soft);\n}\n.nc-iconbtn .nc-count {\n  position: absolute;\n  top: -3px;\n  right: -4px;\n  min-width: 15px;\n  height: 15px;\n  padding: 0 4px;\n  border-radius: 999px;\n  background: #b4533a;\n  color: #fff;\n  font-size: 9.5px;\n  font-weight: 700;\n  line-height: 15px;\n  text-align: center;\n  box-shadow: 0 0 0 2px var(--nc-page);\n}\n.nc-iconbtn .nc-count:empty {\n  display: none;\n}\n.nc-mode {\n  display: flex;\n  gap: 2px;\n  width: 100%;\n  padding: 3px;\n  margin: 2px 0 4px;\n  background: var(--nc-sunken);\n  border-radius: 10px;\n  flex-shrink: 0;\n}\n.nc-mode button {\n  flex: 1 1 0;\n  min-width: 0;\n  height: 26px;\n  padding: 0 6px;\n  border: none;\n  border-radius: 8px;\n  background: transparent;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--nc-ink-mute);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  cursor: pointer;\n  transition: background-color .15s ease, color .15s ease;\n}\n.nc-mode button:hover {\n  color: var(--nc-ink);\n}\n.nc-mode button.busy {\n  cursor: progress;\n}\n.nc-mode button.on.busy {\n  opacity: .75;\n}\n.nc-mode button.on {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n  box-shadow: 0 1px 2px rgba(26, 24, 23, .12);\n  cursor: default;\n}\n.nc-mode button:focus-visible,\n.nc-mode-pip:focus-visible {\n  outline: 2px solid var(--nc-accent);\n  outline-offset: 1px;\n}\n.nc-mode-pip {\n  display: grid;\n  place-items: center;\n  width: 38px;\n  height: 28px;\n  margin: 2px 0 4px;\n  border: none;\n  border-radius: 9px;\n  background: var(--nc-sunken);\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--nc-ink);\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.nc-mode-pip:hover {\n  background: var(--nc-surface);\n}\n.nc-mode-block {\n  width: 100%;\n  flex-shrink: 0;\n}\n.nc-mode-head {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 6px 4px 3px;\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: .07em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n}\n.nc-mode-info {\n  display: inline-grid;\n  place-items: center;\n  width: 16px;\n  height: 16px;\n  border-radius: 999px;\n  color: var(--nc-ink-mute);\n  cursor: help;\n}\n.nc-mode-info:hover {\n  color: var(--nc-ink);\n}\n.nc-mode-info:focus-visible {\n  color: var(--nc-ink);\n  outline: 2px solid var(--nc-accent);\n  outline-offset: 1px;\n}\n.nc-collapse {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  width: 100%;\n  padding: 8px 12px;\n  margin-bottom: 2px;\n  border: none;\n  background: transparent;\n  border-radius: 10px;\n  color: var(--nc-ink-mute);\n  font-size: 12.5px;\n  font-weight: 500;\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.nc-collapse:hover {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n}\n.nc-side.collapsed .nc-collapse {\n  width: 38px;\n  justify-content: center;\n  padding: 8px 0;\n}\n.nc-iconbtn .nc-bell-pip {\n  display: none;\n}\n.nc-iconbtn.has-unseen .nc-bell-pip {\n  display: block;\n}\n.nc-top .softphone-nav-item {\n  position: relative;\n  display: grid;\n  place-items: center;\n  padding: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 9px;\n}\n.nc-top .softphone-nav-item:hover {\n  background: var(--nc-deep);\n}\n.nc-top .softphone-nav-item .softphone-trigger {\n  padding: 0 !important;\n}\n.nc-top .softphone-nav-item .softphone-icon-wrapper {\n  width: 18px;\n  height: 18px;\n  position: static !important;\n}\n.nc-top .softphone-nav-item svg {\n  display: block;\n  width: 18px;\n  height: 18px;\n}\n.nc-top .softphone-nav-item .softphone-status-dot {\n  position: absolute;\n  bottom: 2px;\n  right: 1px;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  box-shadow: 0 0 0 2px var(--nc-page);\n}\n.nc-top .nc-iconbtn.nc-more {\n  display: none;\n}\n.nc-side.collapsed .nc-top .nc-iconbtn.nc-more {\n  display: grid;\n}\n.nc-side.collapsed .nc-top .nc-nora {\n  order: 0;\n}\n.nc-side.collapsed .nc-top .nc-bell {\n  order: 1;\n}\n.nc-side.collapsed .nc-top .nc-more {\n  order: 2;\n}\n.nc-side.collapsed .nc-top .nc-synk {\n  order: 3;\n}\n.nc-side.collapsed .nc-top .softphone-nav-item {\n  order: 4;\n}\n.nc-side.collapsed .nc-top .nc-help {\n  order: 5;\n}\n.nc-side.collapsed .nc-top.nc-actions-folded .nc-synk,\n.nc-side.collapsed .nc-top.nc-actions-folded .softphone-nav-item,\n.nc-side.collapsed .nc-top.nc-actions-folded .nc-help {\n  display: none;\n}\n.nc-more .nc-more-pip {\n  display: none;\n}\n.nc-top.nc-actions-folded .nc-more .nc-more-pip.show {\n  display: block;\n}\n.nc-logo {\n  color: var(--nc-ink);\n  cursor: pointer;\n  flex-shrink: 0;\n  display: block;\n}\n.nc-logo .st1 {\n  fill: currentColor;\n}\n.nc-logo .st0 {\n  fill: var(--nc-page);\n}\n.nc-top .grow {\n  flex: 1;\n}\n.nc-iconbtn {\n  width: 38px;\n  height: 38px;\n  border-radius: var(--nc-r-pill);\n  display: grid;\n  place-items: center;\n  color: var(--nc-ink-soft);\n  border: 1px solid transparent;\n  position: relative;\n  transition:\n    background .14s,\n    border-color .14s,\n    color .14s;\n}\n.nc-iconbtn:hover {\n  background: var(--nc-surface);\n  border-color: var(--nc-line);\n  color: var(--nc-ink);\n}\n.nc-iconbtn.ring {\n  border-color: var(--nc-line);\n}\n.nc-iconbtn .pip {\n  position: absolute;\n  top: 6px;\n  right: 7px;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--nc-accent);\n  box-shadow: 0 0 0 2px var(--nc-page);\n}\n.nc-side.collapsed .nc-hide-collapsed {\n  display: none;\n}\n.nc-switch {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 9px 11px;\n  margin: 8px 0 12px;\n  width: 100%;\n  border-radius: var(--nc-r-md);\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  transition: border-color .14s;\n  text-align: left;\n}\n.nc-switch:hover {\n  border-color: var(--nc-line-strong);\n}\n.nc-switch .sq {\n  width: 36px;\n  height: 36px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  background: var(--nc-deep);\n  color: var(--nc-ink-soft);\n  display: grid;\n  place-items: center;\n  font-weight: 700;\n  font-size: 13px;\n  overflow: hidden;\n}\n.nc-switch .sq img {\n  width: 22px;\n  height: 22px;\n  object-fit: contain;\n}\n.nc-switch .meta {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.nc-switch .meta .n {\n  font-weight: 600;\n  font-size: 13.5px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nc-switch .meta .s {\n  font-size: 11.5px;\n  color: var(--nc-ink-mute);\n}\n.nc-switch .ch {\n  color: var(--nc-ink-mute);\n  flex-shrink: 0;\n}\n.nc-side.collapsed .nc-switch {\n  padding: 0;\n  border: 0;\n  background: transparent;\n  margin: 4px 0 10px;\n  justify-content: center;\n  width: auto;\n}\n.nc-side.collapsed .nc-switch .meta,\n.nc-side.collapsed .nc-switch .ch {\n  display: none;\n}\n.nc-switch.nc-module .sq {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  background: #141414;\n  color: #fffdf8;\n}\n.nc-switch.nc-module .sq img {\n  width: 22px;\n  height: 22px;\n  filter: brightness(0) invert(1);\n}\n.nc-switch.nc-module .meta .n {\n  font-size: 15px;\n}\n.nc-switch.nc-module .meta .s {\n  font-size: 12.5px;\n}\n.nc-menu {\n  position: absolute;\n  z-index: 1200;\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  border-radius: var(--nc-r-md);\n  box-shadow: 0 10px 30px rgba(20, 30, 50, .14);\n  padding: 6px;\n  min-width: 220px;\n}\n.nc-menu .item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  padding: 8px 10px;\n  border-radius: var(--nc-r-sm);\n  font-size: 13px;\n  color: var(--nc-ink);\n  text-align: left;\n}\n.nc-menu .item:hover {\n  background: var(--nc-sunken);\n}\n.nc-menu .item.active {\n  background: var(--nc-sunken);\n  color: var(--nc-ink);\n  font-weight: 600;\n}\n.nc-menu .uhead {\n  padding: 8px 10px 10px;\n  border-bottom: 1px solid var(--nc-line-soft);\n  margin-bottom: 4px;\n}\n.nc-menu .uhead .n {\n  font-weight: 600;\n  font-size: 13.5px;\n  color: var(--nc-ink);\n}\n.nc-menu .uhead .e {\n  font-size: 11.5px;\n  color: var(--nc-ink-mute);\n}\n.nc-foot .nc-menu {\n  min-width: 248px;\n}\n.nc-prefs {\n  display: grid;\n  gap: 10px;\n  padding: 4px 2px 8px;\n}\n.nc-pref .lbl {\n  display: block;\n  padding: 0 6px 5px;\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n}\n.nc-pref .seg {\n  display: flex;\n  gap: 2px;\n  padding: 3px;\n  background: var(--nc-sunken);\n  border-radius: var(--nc-r-pill);\n}\n.nc-pref .seg button {\n  flex: 1 1 0;\n  min-width: 0;\n  height: 28px;\n  padding: 0 4px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  border-radius: var(--nc-r-pill);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--nc-ink-mute);\n  white-space: nowrap;\n  transition: background-color .15s ease, color .15s ease;\n}\n.nc-pref .seg button span {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nc-pref .seg button svg {\n  flex: 0 0 auto;\n}\n.nc-pref .seg button:hover {\n  color: var(--nc-ink);\n}\n.nc-pref .seg button.on {\n  background: var(--nc-ink);\n  color: var(--nc-surface);\n}\n.nc-pref .seg button:focus-visible {\n  outline: 2px solid var(--nc-accent);\n  outline-offset: 1px;\n}\n.nc-menu .item img {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n}\n.nc-menu .sep {\n  height: 1px;\n  background: var(--nc-line-soft);\n  margin: 6px 4px;\n}\n.nc-menu .label {\n  font-size: 10.5px;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n  font-weight: 700;\n  padding: 6px 10px 4px;\n}\n.nc-search {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  width: 100%;\n  height: 42px;\n  padding: 0 13px;\n  margin-bottom: 12px;\n  border-radius: var(--nc-r-md);\n  background: var(--nc-sunken);\n  border: 1px solid var(--nc-line);\n  color: var(--nc-ink-mute);\n  font-size: 13px;\n  cursor: text;\n  transition:\n    border-color .14s,\n    background .14s,\n    box-shadow .14s;\n}\n.nc-search:hover {\n  border-color: var(--nc-line-strong);\n}\n.nc-search:focus-within {\n  border-color: var(--nc-line-strong);\n  background: var(--nc-surface);\n  box-shadow: 0 0 0 3px var(--nc-sunken);\n}\n.nc-search .si {\n  color: var(--nc-ink-mute);\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n}\n.nc-search input {\n  flex: 1;\n  min-width: 0;\n  border: 0;\n  background: transparent;\n  outline: none;\n  font: inherit;\n  color: var(--nc-ink);\n}\n.nc-search input::placeholder {\n  color: var(--nc-ink-mute);\n}\n.nc-search .kbd {\n  font: 10.5px var(--nc-font-mono);\n  color: var(--nc-ink-mute);\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  border-radius: 5px;\n  padding: 2px 6px;\n  flex-shrink: 0;\n}\n.nc-side.collapsed .nc-search {\n  width: 48px;\n  padding: 0;\n  justify-content: center;\n  cursor: pointer;\n}\n.nc-side.collapsed .nc-search input,\n.nc-side.collapsed .nc-search .kbd {\n  display: none;\n}\n.nc-navlabel {\n  font-size: 10px;\n  letter-spacing: .1em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n  font-weight: 700;\n  padding: 0 10px;\n  margin: 4px 0 7px;\n}\n.nc-side.collapsed .nc-navlabel {\n  display: none;\n}\n.nc-nav {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.nc-nav::-webkit-scrollbar {\n  width: 8px;\n}\n.nc-nav::-webkit-scrollbar-thumb {\n  background: var(--nc-line-strong);\n  border-radius: 6px;\n  border: 2px solid var(--nc-page);\n}\n.nc-navitem {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  height: 44px;\n  padding: 0 13px;\n  border-radius: var(--nc-r-md);\n  border: 1px solid transparent;\n  color: var(--nc-ink-soft);\n  font-size: 14px;\n  font-weight: 500;\n  text-align: left;\n  transition:\n    background .14s,\n    color .14s,\n    border-color .14s;\n}\n.nc-navitem .ni {\n  width: 20px;\n  display: grid;\n  place-items: center;\n  color: var(--nc-ink-mute);\n  flex-shrink: 0;\n}\n.nc-navitem .nl {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nc-navitem:hover {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n}\n.nc-navitem:hover .ni {\n  color: var(--nc-ink-soft);\n}\n.nc-navitem.active {\n  background: var(--nc-surface);\n  border-color: var(--nc-line);\n  color: var(--nc-ink);\n  font-weight: 600;\n}\n.nc-navitem.active .ni {\n  color: var(--nc-ink);\n}\n.nc-side.collapsed .nc-navitem {\n  width: 48px;\n  padding: 0;\n  justify-content: center;\n}\n.nc-side.collapsed .nc-navitem .nl {\n  display: none;\n}\n.nc-nav > * {\n  flex-shrink: 0;\n}\n.nc-nav-sep {\n  height: 1px;\n  background: var(--nc-line-soft);\n  margin: 6px 12px;\n}\n.nc-navitem.nc-others .nl {\n  color: var(--nc-ink-2, inherit);\n  opacity: .8;\n}\n.nc-navitem.nc-others .ni {\n  opacity: .7;\n}\n.nc-navitem.nc-newspace .nl {\n  color: var(--nc-ink-2, inherit);\n  opacity: .75;\n}\n.nc-navitem.nc-newspace .ni {\n  opacity: .6;\n}\n.nc-navitem.nc-newspace:hover .nl,\n.nc-navitem.nc-newspace:hover .ni {\n  opacity: 1;\n}\n.nc-group.nc-folded .nc-navitem {\n  padding-left: 22px;\n}\n.nc-side.collapsed .nc-group.nc-folded .nc-navitem {\n  padding-left: 0;\n}\n.nc-side.collapsed .nc-nav-sep {\n  margin: 6px 14px;\n}\n.nc-navitem .nc-caret {\n  width: 7px;\n  height: 7px;\n  margin-left: auto;\n  flex-shrink: 0;\n  border-right: 1.5px solid currentColor;\n  border-bottom: 1.5px solid currentColor;\n  transform: rotate(-45deg);\n  opacity: .45;\n  transition: transform .15s;\n}\n.nc-navitem.open .nc-caret {\n  transform: rotate(45deg);\n}\n.nc-side.collapsed .nc-navitem .nc-caret {\n  display: none;\n}\n.nc-group {\n  display: flex;\n  flex-direction: column;\n}\n.nc-sub {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin: 4px 0 6px;\n  padding-left: 38px;\n}\n.nc-sub::before {\n  content: "";\n  position: absolute;\n  left: 23px;\n  top: 2px;\n  bottom: 2px;\n  width: 1px;\n  background: var(--nc-line);\n}\n.nc-subitem {\n  display: block;\n  width: 100%;\n  padding: 7px 10px;\n  border-radius: var(--nc-r-sm);\n  color: var(--nc-ink-mute);\n  font-size: 13.5px;\n  text-align: left;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  transition: background .14s, color .14s;\n}\n.nc-subitem:hover {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n}\n.nc-subitem.on {\n  color: var(--nc-ink);\n  font-weight: 600;\n}\n.nc-foot {\n  margin-top: auto;\n  padding-top: 8px;\n}\n.nc-user {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  width: 100%;\n  padding: 9px 10px;\n  border-radius: var(--nc-r-md);\n  text-align: left;\n}\n.nc-user:hover {\n  background: var(--nc-surface);\n}\n.nc-user .ua {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font-weight: 700;\n  font-size: 12.5px;\n  overflow: hidden;\n}\n.nc-user .ua img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.nc-user .um {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.nc-user .um .n {\n  font-weight: 600;\n  font-size: 13px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nc-user .um .e {\n  font-size: 11px;\n  color: var(--nc-ink-mute);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nc-user .uk {\n  color: var(--nc-ink-mute);\n  flex-shrink: 0;\n}\n.nc-side.collapsed .nc-user {\n  padding: 0;\n  justify-content: center;\n}\n.nc-side.collapsed .nc-user .um,\n.nc-side.collapsed .nc-user .uk {\n  display: none;\n}\n.nc-qs {\n  display: flex;\n  gap: 8px;\n  padding: 6px 4px;\n}\n.nc-qs button {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 7px;\n  border-radius: var(--nc-r-sm);\n  border: 1px solid var(--nc-line);\n  font-size: 12px;\n}\n.nc-qs button:hover {\n  background: var(--nc-sunken);\n}\n.nc-tooltip {\n  position: fixed;\n  transform: translateY(-50%);\n  z-index: 1300;\n  pointer-events: none;\n  background: var(--nc-ink);\n  color: var(--nc-page);\n  font-size: 12.5px;\n  font-weight: 600;\n  padding: 6px 11px;\n  border-radius: 9px;\n  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);\n  white-space: nowrap;\n  animation: nc-tip-in 0.13s cubic-bezier(0.2, 0.7, 0.2, 1);\n}\n@keyframes nc-tip-in {\n  from {\n    opacity: 0;\n    transform: translateY(-50%) translateX(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(-50%) translateX(0);\n  }\n}\n.nc-mobilebar {\n  display: none;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  height: 52px;\n  padding: 0 12px;\n  background: var(--nc-surface);\n  border-bottom: 1px solid var(--nc-line);\n  position: sticky;\n  top: 0;\n  z-index: 1005;\n}\n.nc-mobilebar .grow {\n  flex: 1;\n}\n.nc-mobilebar .nc-mobilesearch {\n  flex: 1 1 auto;\n  min-width: 0;\n  max-width: 360px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 38px;\n  padding: 0 12px;\n  border: 1px solid var(--nc-line);\n  border-radius: var(--nc-r-sm);\n  background: var(--nc-page);\n  color: var(--nc-ink-mute);\n  cursor: pointer;\n  overflow: hidden;\n}\n.nc-mobilebar .nc-mobilesearch:hover {\n  border-color: var(--nc-line-strong);\n  background: var(--nc-surface);\n}\n.nc-mobilebar .nc-mobilesearch svg {\n  flex-shrink: 0;\n}\n.nc-mobilebar .nc-mobilesearch .ph {\n  flex: 1;\n  min-width: 0;\n  text-align: left;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 13px;\n}\n@media (max-width: 480px) {\n  .nc-mobilebar .nc-mobilesearch {\n    flex: 0 0 auto;\n    width: 38px;\n    max-width: none;\n    padding: 0;\n    justify-content: center;\n  }\n  .nc-mobilebar .nc-mobilesearch .ph {\n    display: none;\n  }\n}\n.nc-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, .42);\n  z-index: 1099;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity .2s;\n}\n.nc-overlay.open {\n  opacity: 1;\n  pointer-events: auto;\n}\n.nc-drawer {\n  position: fixed;\n  left: 0;\n  top: 0;\n  height: 100vh;\n  width: min(86vw, 300px);\n  z-index: 1100;\n  transform: translateX(-100%);\n  transition: transform .25s cubic-bezier(.2, .7, .2, 1);\n}\n.nc-drawer.open {\n  transform: translateX(0);\n}\n@media (max-width: 767.98px) {\n  .nc-frame {\n    flex-direction: column;\n    padding: 0;\n    gap: 0;\n  }\n  .nc-side.responsive {\n    display: none;\n  }\n  .nc-mobilebar {\n    display: flex;\n  }\n  .nc-panel {\n    border-radius: 0;\n    border: 0;\n    box-shadow: none;\n  }\n  .nc-drawer .nc-side {\n    display: flex;\n    width: 100%;\n    height: 100vh;\n    box-shadow: none;\n    background: var(--nc-surface);\n    padding: 6px 8px 8px;\n  }\n}\n.nc-spa-panel-anchor {\n  position: fixed;\n  top: 56px;\n  z-index: 1056;\n}\n.nc-spa-panel {\n  width: 400px;\n  max-width: calc(100vw - 110px);\n  max-height: min(76vh, 680px);\n  display: flex;\n  flex-direction: column;\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  border-radius: 16px;\n  box-shadow: 0 18px 50px rgba(0, 0, 0, .18);\n  overflow: hidden;\n}\n.nc-spa-panel .head {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 12px 10px 16px;\n  border-bottom: 1px solid var(--nc-line);\n}\n.nc-spa-panel .head .t {\n  flex: 1;\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--nc-ink);\n}\n.nc-spa-panel .head .open {\n  color: var(--nc-ink-mute);\n  display: grid;\n  place-items: center;\n}\n.nc-spa-panel .head .x {\n  border: none;\n  background: transparent;\n  font-size: 20px;\n  line-height: 1;\n  color: var(--nc-ink-mute);\n  cursor: pointer;\n  flex-shrink: 0;\n  width: 30px;\n  height: 30px;\n  display: grid;\n  place-items: center;\n  border-radius: 8px;\n}\n.nc-spa-panel .head .x:hover {\n  background: var(--nc-deep);\n  color: var(--nc-ink);\n}\n.nc-spa-panel .body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 8px;\n}\n.nc-spa-panel .row {\n  margin: 0;\n}\n.nc-spa-panel .sect {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: .07em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n  padding: 10px 8px 4px;\n}\n.nc-spa-panel .row {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 9px 8px;\n  border-radius: 10px;\n  color: var(--nc-ink);\n  text-decoration: none;\n  cursor: pointer;\n}\n.nc-spa-panel .row:hover {\n  background: var(--nc-page);\n  text-decoration: none;\n  color: var(--nc-ink);\n}\n.nc-spa-panel .row .av {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n  border-radius: 10px;\n  display: grid;\n  place-items: center;\n  background: var(--nc-page);\n  color: var(--nc-ink-soft);\n  font-size: 13px;\n  font-weight: 700;\n}\n.nc-spa-panel .row .main {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.nc-spa-panel .row .s {\n  font-size: 13.5px;\n  font-weight: 600;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.nc-spa-panel .row .s.link {\n  text-decoration: underline;\n  text-underline-offset: 2px;\n  font-weight: 500;\n}\n.nc-spa-panel .row .s :is(b, strong) {\n  font-weight: 700;\n}\n.nc-spa-panel .row .m {\n  font-size: 11.5px;\n  color: var(--nc-ink-mute);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.nc-spa-panel .row .badge {\n  min-width: 19px;\n  height: 19px;\n  padding: 0 5px;\n  flex-shrink: 0;\n  border-radius: 999px;\n  background: #b4533a;\n  color: #fff;\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 19px;\n  text-align: center;\n}\n.nc-spa-panel .row .dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: transparent;\n  flex-shrink: 0;\n}\n.nc-spa-panel .row.unread .dot {\n  background: var(--nc-accent);\n}\n.nc-spa-panel .row .arr {\n  color: var(--nc-ink-mute);\n  flex-shrink: 0;\n}\n.nc-spa-panel .empty {\n  padding: 18px 10px;\n  font-size: 12.5px;\n  color: var(--nc-ink-mute);\n  text-align: center;\n}\n.nc-spa-panel .searchbox {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 6px 6px 8px;\n  padding: 9px 12px;\n  border-radius: 12px;\n  background: var(--nc-page);\n  color: var(--nc-ink-mute);\n}\n.nc-spa-panel .searchbox input {\n  flex: 1;\n  border: none;\n  background: transparent;\n  outline: none;\n  font-size: 13px;\n  color: var(--nc-ink);\n}\n.nc-spa-panel .foot {\n  padding: 10px 12px 12px;\n  border-top: 1px solid var(--nc-line);\n}\n.nc-spa-panel .foot .wiki {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 10px;\n  border: 1px solid var(--nc-line);\n  border-radius: 999px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--nc-ink);\n  text-decoration: none;\n}\n.nc-spa-panel .foot .wiki:hover {\n  background: var(--nc-page);\n  text-decoration: none;\n}\n.nc-spa-panel .foot.mail-foot {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.nc-spa-panel .foot .wiki.accent {\n  background: var(--nc-accent);\n  border-color: var(--nc-accent);\n  color: #fff;\n}\n.nc-spa-panel .foot .wiki.accent:hover {\n  background: var(--nc-accent-deep);\n  border-color: var(--nc-accent-deep);\n}\n.nc-spa-panel.nc-mini {\n  width: 300px;\n}\n.nc-spa-panel.nc-mini .row {\n  width: 100%;\n  border: none;\n  background: transparent;\n  text-align: left;\n  font-family: inherit;\n}\n.nc-spa-panel .row {\n  width: 100%;\n  border: none;\n  background: transparent;\n  text-align: left;\n  font-family: inherit;\n}\n.nc-spa-panel .empty .cta {\n  padding: 9px 18px;\n  border: 1px solid var(--nc-accent);\n  border-radius: 999px;\n  background: var(--nc-accent);\n  color: #fff;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: inherit;\n}\n.nc-spa-panel .empty .cta:hover {\n  filter: brightness(1.08);\n}\n@media (min-width: 768px) and (max-width: 1023.5px) {\n  .nc-collapse {\n    display: none;\n  }\n}\n.nc-ctx-sec {\n  margin-bottom: 6px;\n}\n.nc-ctx-label {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: .07em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n  padding: 10px 12px 4px;\n}\n.nc-ctx-badge {\n  margin-left: auto;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 999px;\n  background: var(--nc-deep);\n  color: var(--nc-ink-soft);\n  font-size: 10.5px;\n  font-weight: 700;\n  line-height: 18px;\n  text-align: center;\n}\n.nc-navitem .nc-space-count {\n  margin-left: auto;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 7px;\n  flex-shrink: 0;\n  border-radius: 999px;\n  background: #c2723f;\n  color: #fff;\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 22px;\n  text-align: center;\n  font-variant-numeric: tabular-nums;\n}\n.nc-side.collapsed .nc-navitem {\n  position: relative;\n}\n.nc-side.collapsed .nc-navitem .nc-space-count {\n  position: absolute;\n  top: 7px;\n  right: 9px;\n  min-width: 0;\n  width: 8px;\n  height: 8px;\n  padding: 0;\n  font-size: 0;\n  line-height: 0;\n  box-shadow: 0 0 0 2px var(--nc-page);\n}\n.nc-ctx-footer {\n  margin: 0 6px 4px;\n  padding: 9px 10px;\n  border: 1px solid var(--nc-line);\n  border-radius: 12px;\n  background: var(--nc-surface);\n  flex-shrink: 0;\n}\n.nc-ctx-footer.clickable {\n  cursor: pointer;\n}\n.nc-ctx-footer.clickable:hover {\n  border-color: var(--nc-ink-mute);\n}\n.nc-ctx-footer .row {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  color: var(--nc-ink);\n  font-size: 12px;\n  font-weight: 600;\n}\n.nc-ctx-footer .bar {\n  height: 4px;\n  border-radius: 999px;\n  background: var(--nc-deep);\n  margin: 7px 0 4px;\n  overflow: hidden;\n}\n.nc-ctx-footer .bar span {\n  display: block;\n  height: 100%;\n  border-radius: 999px;\n  background: var(--nc-accent);\n}\n.nc-ctx-footer .s {\n  font-size: 10.5px;\n  color: var(--nc-ink-mute);\n}\n@media (min-width: 768px) {\n  .nc-frame-host {\n    background: var(--nc-frame) !important;\n    padding: 8px !important;\n    gap: 8px !important;\n    box-sizing: border-box;\n  }\n  .nc-frame-host > *:not(.neocockpit-host):not(.nc-frame-side) {\n    background: var(--nc-surface);\n    border: 1px solid var(--nc-line);\n    border-radius: 18px;\n    overflow: hidden;\n  }\n}\n.nc-frame-host {\n  --nc-frame: #f5f3ef;\n  --nc-surface: oklch(0.995 0.003 80);\n  --nc-line: oklch(0.90 0.012 80);\n}\n[data-theme=dark] .nc-frame-host {\n  --nc-frame: #1b1917;\n  --nc-surface: #171717;\n  --nc-line: #232323;\n}\n.nc-menu .nc-app-tiles {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  padding: 8px 10px;\n}\n.nc-menu .nc-app-tiles .tile {\n  width: 48px;\n  height: 48px;\n  display: grid;\n  place-items: center;\n  border: 1px solid var(--nc-line);\n  border-radius: 12px;\n  background: var(--nc-surface);\n  cursor: pointer;\n}\n.nc-menu .nc-app-tiles .tile:hover {\n  border-color: var(--nc-accent);\n  background: var(--nc-accent-tint);\n}\n.nc-menu .nc-app-tiles .tile img {\n  width: 33px;\n  height: 33px;\n  object-fit: contain;\n}\n[data-theme=dark] .neocockpit img[src*="/icons/apps/"],\n[data-theme=dark] .neocockpit img[src*="/icons/streamline/"] {\n  filter: invert(1) hue-rotate(180deg);\n}\n[data-theme=dark] .nc-menu .nc-app-tiles .tile {\n  background: rgba(255, 255, 255, 0.06);\n  border-color: rgba(255, 255, 255, 0.08);\n}\n[data-theme=dark] .nc-menu .nc-app-tiles .tile:hover {\n  background: rgba(255, 255, 255, 0.12);\n  border-color: var(--nc-accent);\n}\n.nc-flyout {\n  position: fixed;\n  z-index: 1200;\n  min-width: 210px;\n  max-width: 280px;\n  max-height: 70vh;\n  overflow-y: auto;\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  border-radius: 14px;\n  box-shadow: 0 16px 44px rgba(0, 0, 0, .16);\n  padding: 6px;\n}\n.nc-flyout .fh {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: .07em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n  padding: 8px 10px 5px;\n}\n.nc-flyout .fi {\n  display: block;\n  width: 100%;\n  padding: 8px 10px;\n  border: none;\n  background: transparent;\n  border-radius: 9px;\n  text-align: left;\n  font-size: 13px;\n  color: var(--nc-ink);\n  cursor: pointer;\n  font-family: inherit;\n}\n.nc-flyout .fi:hover {\n  background: var(--nc-page);\n}\n.nc-flyout .fi.on {\n  background: var(--nc-accent-tint);\n  color: var(--nc-accent-deep);\n  font-weight: 600;\n}\n.nc-side.collapsed .nc-top .nc-logo-slot {\n  padding: 2px 4px;\n}\n.nc-tooltip {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  max-width: 240px;\n}\n.nc-tooltip .tt {\n  font-weight: 600;\n}\n.nc-tooltip .ts {\n  font-size: 11px;\n  font-weight: 400;\n  opacity: .75;\n  white-space: normal;\n}\n.nc-fav-trigger {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  margin: 6px 6px 0;\n  padding: 8px 11px;\n  border: none;\n  border-radius: 11px;\n  background: transparent;\n  color: var(--nc-ink-soft);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: inherit;\n  cursor: pointer;\n  flex-shrink: 0;\n  width: calc(100% - 12px);\n}\n.nc-fav-trigger:hover {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n}\n.nc-fav-trigger.active {\n  background: var(--nc-accent-tint);\n  color: var(--nc-accent-deep);\n}\n.nc-fav-trigger .fi {\n  display: grid;\n  place-items: center;\n  color: #d9a13c;\n}\n.nc-fav-trigger .fl {\n  flex: 1;\n  text-align: left;\n}\n.nc-fav-trigger .fc {\n  min-width: 19px;\n  height: 19px;\n  padding: 0 5px;\n  border-radius: 999px;\n  background: var(--nc-deep);\n  color: var(--nc-ink-soft);\n  font-size: 10.5px;\n  font-weight: 700;\n  line-height: 19px;\n  text-align: center;\n}\n.nc-side.collapsed .nc-fav-trigger {\n  width: 38px;\n  justify-content: center;\n  padding: 8px 0;\n  margin: 6px auto 0;\n}\n.nc-spa-panel .fav-row {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  padding: 0;\n}\n.nc-spa-panel .fav-row .fav-go {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  text-align: left;\n  font-family: inherit;\n  padding: 9px 8px;\n  border-radius: 10px;\n  cursor: pointer;\n  color: var(--nc-ink);\n}\n.nc-spa-panel .fav-row .fav-go .s {\n  font-size: 13.5px;\n  font-weight: 600;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.nc-spa-panel .fav-row .fav-go .m {\n  font-size: 11.5px;\n  color: var(--nc-ink-mute);\n}\n.nc-spa-panel .fav-row .fav-go:hover {\n  background: var(--nc-page);\n}\n.nc-spa-panel .fav-row .fav-x {\n  border: none;\n  background: transparent;\n  color: var(--nc-ink-mute);\n  font-size: 18px;\n  cursor: pointer;\n  flex-shrink: 0;\n  margin: 0;\n  padding: 0;\n  width: 30px;\n  height: 30px;\n  display: grid;\n  place-items: center;\n  border-radius: 8px;\n}\n.nc-spa-panel .fav-row .fav-x:hover {\n  background: var(--nc-deep);\n  color: var(--nc-ink);\n}\n.nc-top.nc-simple-chrome > :not(.nc-brandrow):not(.nc-logo-slot):not(.nc-nora) {\n  display: none !important;\n}\n.nc-top.nc-simple-chrome .nc-brandrow .nc-nora {\n  margin-left: auto;\n}\n');

// src/NeoCockpit.tsx
import { Fragment as Fragment3, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var FiduciaryIcon = (props) => /* @__PURE__ */ jsxs2("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", ...props, children: [
  /* @__PURE__ */ jsx3("path", { d: "M16 10H4V6h11a1 1 0 0 1 1 1v3z", opacity: ".5" }),
  /* @__PURE__ */ jsx3("path", { d: "M21 18H4v-8h17a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z" }),
  /* @__PURE__ */ jsx3("path", { d: "M3 22a1 1 0 0 1-1-.999V3a1 1 0 0 1 2 0v18a1 1 0 0 1-.999 1H3z", opacity: ".25" })
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
  "calendar-days": CalendarDays2,
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
  "clock": Clock,
  "cloud": Cloud,
  "inbox": Inbox,
  "trash": Trash2,
  "trash-2": Trash2,
  "gallery-vertical-end": GalleryVerticalEnd,
  "search": Search2,
  "building": Building2,
  "bell": Bell,
  "mail": Mail,
  "route": RouteIcon,
  "circle-help": HelpCircle,
  "help-circle": HelpCircle,
  "headset": Headphones,
  "ticket": Ticket,
  "contact": Contact,
  "contact-2": Contact,
  "phone": Phone,
  "layout-dashboard": LayoutDashboard,
  "sticky-note": StickyNote,
  "check-square": CheckSquare,
  "notebook": StickyNote,
  "message-square": MessageSquare,
  "book": Book,
  "database": Database,
  "database-zap": DatabaseZap,
  "rocket": Rocket,
  "git-branch": GitBranch,
  "user-check": UserCheck,
  "users": Users,
  "wallet": Wallet,
  "warehouse": Warehouse,
  "wrench": Wrench,
  // //// Neoffice: calendar/meet sidebar icons (visibility toggle, create, share) ////
  "eye": Eye,
  "eye-off": EyeOff,
  "plus": Plus,
  "user-plus": UserPlus,
  "share-2": Share2,
  "calendar": Calendar,
  "calendar-plus": Plus,
  // //// Neoffice: the entries of a module drawn in the sidebar (neo_sidebar_tabs, the remote assistance boards) ////
  "screen-share": ScreenShare,
  "server": Server,
  "repeat": Repeat,
  "moon": Moon,
  "presentation": Presentation,
  "archive": Archive,
  "hard-drive": HardDrive,
  "network": Network,
  "at-sign": AtSign,
  "send": Send,
  "brain": Brain,
  "message-circle": MessageCircle,
  "camera": Camera,
  "key-round": KeyRound,
  "heart-pulse": HeartPulse,
  "package-plus": PackagePlus,
  "signpost": Signpost,
  "sparkles": Sparkles,
  "refresh-cw": RefreshCw,
  "external-link": ExternalLink2,
  "map-pin": MapPin
};
var legacyIconMap = {
  "accounting": Calculator,
  "income": TrendingUp,
  "expenses": TrendingDown,
  "assets": Briefcase,
  "receivables": ArrowRight,
  "payables": ArrowRight,
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
  "external-link": ExternalLink2,
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
  "non-profit": CalendarDays2,
  "default": Circle
};
var getIcon = (iconName) => {
  if (!iconName) return Circle;
  if (iconName.startsWith("lucide-")) return lucideIconMap[iconName.slice(7)] || Circle;
  return legacyIconMap[iconName] || Circle;
};
var tr = (text, args, context) => {
  const w = window;
  let s = typeof w.__ === "function" ? w.__(text, args, context) : text;
  if (args && s === text) s = text.replace(/\{(\d+)\}/g, (_, i) => String(args[+i] ?? ""));
  return s;
};
var touchApi = () => {
  const t = window.neoffice_touch;
  if (!t) return null;
  const complet = ["on", "off", "auto", "active", "decided"].every((k) => typeof t[k] === "function");
  return complet ? t : null;
};
var ALL_APP = "__all__";
var csrfToken = () => {
  if (typeof window === "undefined") return "";
  const w = window;
  return w.frappe?.csrf_token || w.csrf_token || "";
};
function detectEnv() {
  if (typeof window === "undefined") return "spa";
  const w = window;
  if (w.__FRAPPE_INTEGRATION__ === true) return "spa";
  if (w.frappe?.set_route) return "desk";
  return "spa";
}
var computeAbbr = (name) => {
  if (!name) return "?";
  const words = name.trim().split(/\s+/).filter(Boolean);
  return ((words[0]?.[0] || "") + (words[1]?.[0] || "")).toUpperCase() || "?";
};
var colorFromName = (name) => {
  if (!name) return "#94a3b8";
  let h = 0;
  for (let i = 0; i < name.length; i++) h = h * 31 + name.charCodeAt(i) >>> 0;
  return `hsl(${h % 360}, 52%, 52%)`;
};
var formatTime = () => (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
var LogoLink = ({ onClick, mark = false, height, src, alt }) => /* @__PURE__ */ jsx3("span", { onClick, style: { display: "inline-flex", cursor: "pointer" }, title: alt || "Neoffice", children: src ? /* @__PURE__ */ jsx3("img", { src, alt: alt || "", style: { height: height ? height + "px" : void 0, width: "auto" } }) : /* @__PURE__ */ jsx3(NeoLogo, { mark, height }) });
function DateWidget({ tr: tr2, locale, eventCount, onClick }) {
  const [now, setNow] = useState2(() => /* @__PURE__ */ new Date());
  useEffect2(() => {
    const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 2e4);
    return () => clearInterval(id);
  }, []);
  const day = now.getDate();
  const frac = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;
  const R = 15, C = 2 * Math.PI * R;
  const weekday = now.toLocaleDateString(locale, { weekday: "long" });
  const month = now.toLocaleDateString(locale, { month: "short" });
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const time = now.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", hour12: false });
  return /* @__PURE__ */ jsxs2("button", { className: "nc-date", onClick, title: tr2("Calendar"), children: [
    /* @__PURE__ */ jsxs2("span", { className: "nc-date-ring", children: [
      /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 36 36", width: "30", height: "30", children: [
        /* @__PURE__ */ jsx3("circle", { cx: "18", cy: "18", r: R, fill: "none", stroke: "var(--nc-line)", strokeWidth: "2.6" }),
        /* @__PURE__ */ jsx3(
          "circle",
          {
            cx: "18",
            cy: "18",
            r: R,
            fill: "none",
            stroke: "var(--nc-accent)",
            strokeWidth: "2.6",
            strokeLinecap: "round",
            strokeDasharray: C,
            strokeDashoffset: C * (1 - frac),
            transform: "rotate(-90 18 18)"
          }
        )
      ] }),
      /* @__PURE__ */ jsx3("span", { className: "nc-date-day", children: day }),
      eventCount > 0 && /* @__PURE__ */ jsx3("span", { className: "nc-date-badge", children: eventCount })
    ] }),
    /* @__PURE__ */ jsxs2("span", { className: "nc-date-text", children: [
      /* @__PURE__ */ jsxs2("span", { className: "d", children: [
        cap(weekday),
        " ",
        day,
        " ",
        month
      ] }),
      /* @__PURE__ */ jsx3("span", { className: "t", children: time })
    ] })
  ] });
}
var decodePath = (path) => {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
};
var currentPath = () => decodePath(location.pathname) + location.hash;
function NeoCockpit({ env: envProp, onNavigate, homeUrl = "/app/home", onNora, onBell, onSynk, onHelp, defaultApp, surfaceApp, utilities, contextNav, contextFooter, onSearch, searchKbd, children, layout = "shell", className } = {}) {
  const env = envProp ?? detectEnv();
  const boot = typeof window !== "undefined" ? window.frappe?.boot : void 0;
  const [pinned, setPinned] = useState2(() => {
    try {
      return JSON.parse(localStorage.getItem("neocockpit-pinned") || "true");
    } catch {
      return true;
    }
  });
  const [workspaces, setWorkspaces] = useState2([]);
  const [apps, setApps] = useState2([]);
  const [currentApp, setCurrentApp] = useState2(() => localStorage.getItem("neocockpit-app") || "");
  const [appMenuOpen, setAppMenuOpen] = useState2(false);
  const [userMenuOpen, setUserMenuOpen] = useState2(false);
  const [mobileOpen, setMobileOpen] = useState2(false);
  const [moreOpen, setMoreOpen] = useState2(false);
  const [narrow, setNarrow] = useState2(false);
  useEffect2(() => {
    if (typeof matchMedia === "undefined") return;
    const mq = matchMedia("(min-width: 768px) and (max-width: 1023.5px)");
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  const [hiddenAlert, setHiddenAlert] = useState2(false);
  const [openGroup, setOpenGroup] = useState2("");
  const [flyout, setFlyout] = useState2(null);
  const flyRef = useRef2(null);
  useLayoutEffect(() => {
    const el = flyRef.current;
    if (!el || !flyout) return;
    const over = el.getBoundingClientRect().bottom - (window.innerHeight - 12);
    if (over > 0) el.style.top = `${Math.max(60, el.getBoundingClientRect().top - over)}px`;
  }, [flyout]);
  const flyTimer = useRef2(null);
  const flyKeep = () => {
    if (flyTimer.current) {
      clearTimeout(flyTimer.current);
      flyTimer.current = null;
    }
  };
  const flyClose = () => {
    flyKeep();
    flyTimer.current = setTimeout(() => setFlyout(null), 260);
  };
  const [favorites, setFavorites] = useState2([]);
  useEffect2(() => {
    const load = () => {
      fetchFavorites().then(setFavorites).catch(() => {
      });
    };
    load();
    window.addEventListener("nf-favorites-changed", load);
    return () => window.removeEventListener("nf-favorites-changed", load);
  }, []);
  const [openPanel, setOpenPanel] = useState2(null);
  const spaPanels = env === "spa";
  const { events, todayCount } = useDayEvents();
  const { reminders } = useDayReminders();
  const dateLocale = boot?.lang || (typeof navigator !== "undefined" ? navigator.language : "fr") || "fr";
  const spaSynkCount = useUnreadSynk(spaPanels && !onSynk);
  const spaNotifCount = useUnreadNotifications(spaPanels && !onBell);
  const wikiUrl = boot?.neoffice_wiki_url || "https://neoservice.neoffice.me/wiki";
  const surfaceTiles = useMemo(() => {
    const list = boot?.surface_apps || [];
    return list.filter((t) => t.route && t.name !== surfaceApp?.name);
  }, [boot, surfaceApp?.name]);
  const [time, setTime] = useState2(formatTime);
  const [route, setRoute] = useState2(() => typeof location !== "undefined" ? currentPath() : "");
  const [interfaceMode] = useState2(() => boot?.neo_mode || boot?.neoffice_settings?.interface_mode || boot?.user?.view_interface || "Advanced");
  const hasModes = Boolean(boot?.neo_mode);
  const [formWidth, setFormWidth] = useState2(() => boot?.user?.form_width || "Standard");
  const [touchMode, setTouchMode] = useState2(() => {
    const t = touchApi();
    if (!t || !t.decided()) return "auto";
    return t.active() ? "on" : "off";
  });
  const [colorMode, setColorMode] = useState2(() => {
    const deskTheme = boot?.user?.desk_theme;
    if (deskTheme === "Light") return "light";
    if (deskTheme === "Dark") return "dark";
    if (deskTheme === "Automatic") return "system";
    try {
      return localStorage.getItem("neocockpit-colormode") || "system";
    } catch {
      return "system";
    }
  });
  const isSimple = interfaceMode === "Simple" || interfaceMode === "Simplified";
  const [modeOnItsWay, setModeOnItsWay] = useState2(null);
  const shownSimple = modeOnItsWay ? modeOnItsWay === "Simple" : isSimple;
  const isGuest = boot?.user?.name === "Guest";
  const isPortal = !isGuest && boot?.user?.portal === true;
  const deskless = isGuest || isPortal;
  const canConfigureCompany = (() => {
    const user = boot?.user;
    if (Array.isArray(user?.can_read)) return user.can_read.includes("Neoffice Company Settings");
    return Boolean(user?.roles?.some(
      (r) => ["System Manager", "Administrator", "Admin", "Accounts Manager"].includes(r)
    ));
  })();
  const canManageDevices = Boolean(
    boot?.user?.roles?.some(
      (r) => r === "System Manager" || r === "Administrator" || r === "Admin"
    )
  );
  const surfaceNavActive = () => Boolean(surfaceApp && currentApp === surfaceApp.name && contextNav);
  const expanded = pinned;
  useEffect2(() => {
    if (!boot) return;
    const pages = (boot.sidebar_pages?.pages || []).filter((p) => !p.parent_page && (p.public === true || p.public === 1));
    setWorkspaces(pages);
    let appData = boot.app_data || [];
    if (surfaceApp && !appData.some((a) => a.app_name === surfaceApp.name)) {
      const unified = (boot.surface_apps || []).find((t) => t.name === surfaceApp.name);
      appData = [
        { app_name: surfaceApp.name, app_title: surfaceApp.title, app_logo_url: unified && unified.logo || surfaceApp.logo, workspaces: [] },
        ...appData
      ];
    }
    setApps(appData);
    if (appData.length) {
      const pin = defaultApp || surfaceApp && surfaceApp.name;
      if (pin && (pin === ALL_APP || appData.some((a) => a.app_name === pin))) {
        setCurrentApp(pin);
        return;
      }
      const saved = localStorage.getItem("neocockpit-app");
      const ok = saved && (saved === ALL_APP || appData.some((a) => a.app_name === saved));
      setCurrentApp(ok ? saved : appData[0].app_name);
    }
  }, [boot]);
  useEffect2(() => {
    if (currentApp) localStorage.setItem("neocockpit-app", currentApp);
  }, [currentApp]);
  useEffect2(() => {
    localStorage.setItem("neocockpit-pinned", JSON.stringify(pinned));
  }, [pinned]);
  useEffect2(() => {
    if (pinned) setMoreOpen(false);
  }, [pinned]);
  useEffect2(() => {
    const check = () => {
      const synk = document.querySelector(".nc-side .nc-synk .nc-count");
      const help = document.querySelector(".nc-side .nc-help");
      setHiddenAlert(!!(synk && synk.textContent || help && (help.querySelector(".nc-count")?.textContent || help.classList.contains("nc-glow"))));
    };
    const top = document.querySelector(".nc-side .nc-top");
    if (!top || typeof MutationObserver === "undefined") return;
    const obs = new MutationObserver(check);
    obs.observe(top, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["class"] });
    check();
    return () => obs.disconnect();
  }, []);
  useEffect2(() => {
    const id = setInterval(() => setTime(formatTime()), 6e4);
    return () => clearInterval(id);
  }, []);
  useEffect2(() => {
    void loadAssist();
  }, []);
  useEffect2(() => {
    document.body.classList.toggle("simplified_view", isSimple);
  }, [isSimple]);
  const applyColorModeToDom = useCallback2((mode) => {
    const html = document.documentElement;
    const sysDark = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;
    html.setAttribute("data-theme-mode", mode === "system" ? "automatic" : mode);
    html.setAttribute("data-theme", mode === "system" ? sysDark ? "dark" : "light" : mode);
  }, []);
  useEffect2(() => {
    applyColorModeToDom(colorMode);
  }, [colorMode, applyColorModeToDom]);
  useEffect2(() => {
    document.body.classList.remove("form-width-large", "form-width-full");
    if (formWidth === "Large") document.body.classList.add("form-width-large");
    else if (formWidth === "Full Width") document.body.classList.add("form-width-full");
  }, [formWidth]);
  useEffect2(() => {
    const onStorage = (e) => {
      if (e.key !== "neocockpit-colormode" && e.key !== "theme_active") return;
      let mode = "system";
      try {
        mode = localStorage.getItem("neocockpit-colormode") || "system";
      } catch {
      }
      setColorMode(mode);
      applyColorModeToDom(mode);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [applyColorModeToDom]);
  useEffect2(() => {
    const update = () => setRoute(currentPath());
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    const fr = window.frappe?.router;
    fr?.on?.("change", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
      fr?.off?.("change", update);
    };
  }, []);
  const [tip, setTip] = useState2(null);
  const showTip = (text, sub) => (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTip({ text, sub, x: r.right + 10, y: r.top + r.height / 2 });
  };
  const hideTip = () => setTip(null);
  const tipProps = (text, sub) => ({ onMouseEnter: showTip(text, sub), onMouseLeave: hideTip });
  const rootRef = useRef2(null);
  useEffect2(() => {
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) {
        setAppMenuOpen(false);
        setUserMenuOpen(false);
        setOpenPanel(null);
        setFlyout(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);
  const moduleOfRoute = (slug) => {
    const fr = typeof window === "undefined" ? void 0 : window.frappe;
    if (!fr) return null;
    const page = fr.boot?.page_info;
    if (page) {
      const hit = Object.entries(page).find(([name]) => name.toLowerCase() === slug);
      if (hit && hit[1]?.module) return hit[1].module;
    }
    const doctype = doctypeOfRoute();
    if (doctype && fr.get_meta) {
      try {
        return fr.get_meta(doctype)?.module || null;
      } catch {
        return null;
      }
    }
    return null;
  };
  const doctypeOfRoute = () => {
    const fr = typeof window === "undefined" ? void 0 : window.frappe;
    const parts = fr?.get_route?.() || [];
    return parts[0] === "List" || parts[0] === "Form" || parts[0] === "Tree" ? parts[1] || null : null;
  };
  const appOfModule = (module) => {
    const declared = apps.find((a) => a.modules?.includes(module));
    if (declared) return declared;
    const homes = workspaces.filter((w) => w.module === module).map((w) => w.name);
    if (!homes.length) return void 0;
    const candidates = apps.map((a) => ({ app: a, n: (a.workspaces || []).filter((w) => homes.includes(w)).length })).filter((c) => c.n > 0);
    if (!candidates.length) return void 0;
    const staying = candidates.find((c) => c.app.app_name === currentApp);
    if (staying) return staying.app;
    return candidates.sort((a, b) => b.n - a.n)[0].app;
  };
  const [metaTick, setMetaTick] = useState2(0);
  const [tabSpaceApp, setTabSpaceApp] = useState2(() => {
    const w = typeof window === "undefined" ? void 0 : window;
    return w?.frappe?.neo_workspace_tabs?.app || null;
  });
  useEffect2(() => {
    const jq = typeof window === "undefined" ? void 0 : window.jQuery;
    if (!jq) return;
    const onSpace = (_event, space) => {
      const app = space?.app;
      setTabSpaceApp(app || null);
    };
    jq(document).on("neo_space_change", onSpace);
    return () => {
      jq(document).off("neo_space_change", onSpace);
    };
  }, []);
  useEffect2(() => {
    if (!apps.length || !workspaces.length) return;
    const tabbed = tabSpaceApp ? apps.find((a) => a.app_name === tabSpaceApp) : void 0;
    if (tabbed) {
      if (tabbed.app_name !== currentApp) setCurrentApp(tabbed.app_name);
      return;
    }
    const pathname = typeof location === "undefined" ? "" : decodePath(location.pathname);
    const slug = (pathname.replace(/^\/app\/?/, "").split("/")[0] || "").toLowerCase();
    if (!slug) return;
    const toSlug = (n) => n.toLowerCase().replace(/\s+/g, "-");
    const workspace = workspaces.find((w) => toSlug(w.name) === slug);
    let owner;
    if (workspace) {
      owner = apps.find((a) => a.workspaces?.includes(workspace.name));
    } else {
      const module = moduleOfRoute(slug);
      if (module) {
        owner = appOfModule(module);
      } else {
        const doctype = doctypeOfRoute();
        const fr = typeof window === "undefined" ? void 0 : window.frappe;
        if (doctype && fr?.model?.with_doctype && !fr.get_meta?.(doctype)) {
          Promise.resolve(fr.model.with_doctype(doctype)).then(() => setMetaTick((t) => t + 1)).catch(() => {
          });
        }
      }
    }
    if (!owner || owner.app_name === currentApp) return;
    setCurrentApp(owner.app_name);
  }, [route, apps, workspaces, metaTick, tabSpaceApp]);
  const mySpace = boot?.neo_my_space;
  const mySpaceActive = Boolean(mySpace) && /^\/app\/?(home)?\/?$/.test(route.split(/[?#]/)[0]);
  const twoLevels = Boolean(boot?.neocockpit_two_levels);
  const tabbedApps = useMemo(
    () => new Set(boot?.neo_tabbed_apps || []),
    [boot]
  );
  const unfolds = (appName) => !(twoLevels && tabbedApps.has(appName));
  const bootCounts = boot?.neo_space_counts;
  const [spaceCounts, setSpaceCounts] = useState2(() => bootCounts || {});
  const keepsCounts = env === "desk" && Boolean(bootCounts && Object.keys(bootCounts).length);
  const refreshCounts = useCallback2(() => {
    if (!keepsCounts || typeof document !== "undefined" && document.visibilityState === "hidden") return;
    fetch("/api/method/neoffice_theme.workspace_tabs.get_space_counts", {
      credentials: "same-origin",
      headers: { Accept: "application/json" }
    }).then((r) => r.ok ? r.json() : null).then((r) => {
      if (r && r.message && typeof r.message === "object") setSpaceCounts(r.message);
    }).catch(() => {
    });
  }, [keepsCounts]);
  useEffect2(() => {
    if (!keepsCounts) return;
    const timer = setInterval(refreshCounts, 6e4);
    return () => clearInterval(timer);
  }, [keepsCounts, refreshCounts]);
  const countsRoute = useRef2(route);
  useEffect2(() => {
    if (countsRoute.current === route) return;
    countsRoute.current = route;
    refreshCounts();
  }, [route, refreshCounts]);
  const countOf = (name) => spaceCounts[name]?.count || 0;
  const sidebarTabs = env === "desk" && Boolean(boot?.neo_sidebar_tabs);
  const [spaceNav, setSpaceNav] = useState2(() => (typeof window === "undefined" ? null : window.frappe?.neo_space_nav) || null);
  const [spacesShown, setSpacesShown] = useState2(false);
  useEffect2(() => {
    if (!sidebarTabs) return;
    const jq = typeof window === "undefined" ? void 0 : window.jQuery;
    if (!jq) return;
    const onNav = (_event, nav) => setSpaceNav(nav || null);
    jq(document).on("neo_space_nav", onNav);
    return () => {
      jq(document).off("neo_space_nav", onNav);
    };
  }, [sidebarTabs]);
  useEffect2(() => {
    setSpacesShown(false);
  }, [route]);
  const moduleMode = sidebarTabs && !isSimple && !spacesShown && Boolean(spaceNav && spaceNav.items && spaceNav.items.length);
  const moduleApp = moduleMode ? apps.find((a) => a.app_name === spaceNav.app) : void 0;
  const goSpaceTab = (key) => {
    const w = window;
    if (typeof w.frappe?.neo_go_tab === "function") w.frappe.neo_go_tab(key);
  };
  const allMode = currentApp === ALL_APP || twoLevels;
  const currentAppData = useMemo(() => apps.find((a) => a.app_name === currentApp), [apps, currentApp]);
  const appGroups = useMemo(
    () => apps.map((app) => ({ app, items: workspaces.filter((w) => app.workspaces?.includes(w.name)) })).filter((g) => g.items.length > 0 || !!g.app.app_route),
    [apps, workspaces]
  );
  const isWsActive = (ws) => route.includes("/" + ws.name.toLowerCase().replace(/\s+/g, "-"));
  const activeGroupName = useMemo(() => {
    const byRoute = appGroups.find((g) => g.items.some(isWsActive))?.app.app_name;
    if (!twoLevels) return byRoute;
    if (mySpaceActive) return void 0;
    const listed = (name) => !!name && appGroups.some((g) => g.app.app_name === name);
    if (tabSpaceApp) return listed(tabSpaceApp) ? tabSpaceApp : byRoute;
    return byRoute || (currentApp !== ALL_APP && listed(currentApp) ? currentApp : void 0);
  }, [appGroups, route, twoLevels, currentApp, tabSpaceApp, mySpaceActive]);
  const settingsApp = boot?.neo_settings_app || "";
  const leadApps = useMemo(
    () => new Set(boot?.neo_lead_apps || []),
    [boot]
  );
  const folds = (name) => twoLevels && leadApps.size > 0 && tabbedApps.has(name) && !leadApps.has(name);
  const kindOf = (name) => !twoLevels ? 0 : name === settingsApp ? 2 : tabbedApps.has(name) ? folds(name) ? 0.5 : 0 : 1;
  const menuGroups = useMemo(
    () => twoLevels ? [...appGroups].sort((a, b) => kindOf(a.app.app_name) - kindOf(b.app.app_name)) : appGroups,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appGroups, twoLevels, tabbedApps, settingsApp]
  );
  const sepBefore = (i) => i > 0 && kindOf(menuGroups[i].app.app_name) !== kindOf(menuGroups[i - 1].app.app_name);
  const [othersOpen, setOthersOpen] = useState2(() => {
    try {
      return window.localStorage.getItem("neocockpit-other-spaces") === "1";
    } catch {
      return false;
    }
  });
  const othersShown = othersOpen || menuGroups.some((g) => folds(g.app.app_name) && g.app.app_name === activeGroupName);
  const firstFolded = (i) => folds(menuGroups[i].app.app_name) && (i === 0 || !folds(menuGroups[i - 1].app.app_name));
  const toggleOthers = () => {
    const next = !othersOpen;
    setOthersOpen(next);
    try {
      window.localStorage.setItem("neocockpit-other-spaces", next ? "1" : "0");
    } catch {
    }
  };
  const newSpace = () => {
    const w = window;
    const create = w.frappe?.neo_atelier?.create;
    return env === "desk" && typeof create === "function" ? create : null;
  };
  const lastSpace = (() => {
    let at = -1;
    if (twoLevels) menuGroups.forEach((g, i) => {
      if (kindOf(g.app.app_name) < 1) at = i;
    });
    return at;
  })();
  const opensAList = (items, appName) => items.length > 1 && unfolds(appName);
  useEffect2(() => {
    if (env === "desk") setOpenGroup(activeGroupName || "");
  }, [env, activeGroupName, route]);
  const filteredWorkspaces = useMemo(() => {
    if (!currentAppData?.workspaces) return workspaces.slice(0, 20);
    return workspaces.filter((w) => currentAppData.workspaces.includes(w.name)).slice(0, 20);
  }, [workspaces, currentAppData]);
  const cleanSimpleLabel = (s) => (s || "").replace(/\s*simplifi(?:ées|ée|és|é)/gi, "").trim();
  const stripModulePrefix = (label, appTitle) => {
    if (!label || !appTitle) return label;
    const re = new RegExp("^" + appTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s+", "i");
    const out = label.replace(re, "").trim();
    return out || label;
  };
  const simpleWorkspaces = useMemo(
    () => workspaces.filter((w) => w.name.startsWith("Simple ")).map((w) => ({ ...w, label: cleanSimpleLabel(w.label || w.title || w.name) })),
    [workspaces]
  );
  const simpleSpaces = useMemo(() => {
    const list = boot?.neo_simple_spaces;
    return Array.isArray(list) && list.length ? list : null;
  }, [boot]);
  const simpleChrome = isSimple && Boolean(simpleSpaces);
  const goSimpleSpace = (sp) => {
    setMobileOpen(false);
    const w = window;
    if (env === "desk" && typeof w.frappe?.neo_open_space === "function" && w.frappe.neo_open_space(sp.space)) return;
    navigate(sp.route);
  };
  const appsMenu = (twoLevels || Boolean(isSimple && simpleSpaces)) && !moduleMode;
  const homeLabel = isSimple && simpleSpaces ? tr("Home") : tr("My space");
  const modeHelp = tr("Simple shows the essentials of every day, without distraction: a few spaces in everyday words, short lists and forms. Advanced shows all of Neoffice, for the settings and the rare cases. Your choice is kept on your account.");
  const simpleSpaceActive = (sp) => !mySpaceActive && (tabSpaceApp ? tabSpaceApp === sp.app : route.split(/[?#]/)[0] === sp.route);
  const navigate = useCallback2((route2) => {
    if (onNavigate) return onNavigate(route2);
    const w = window;
    if (env === "desk" && w.frappe?.set_route) {
      const path = route2.replace(/^https?:\/\/[^/]+/, "").replace(/^\/app\/?/, "");
      w.frappe.set_route(path || "home");
    } else {
      window.location.href = route2;
    }
  }, [env, onNavigate]);
  const goHome = () => {
    if (isPortal) window.location.href = "/me";
    else navigate(homeUrl);
  };
  const openCompanyConfig = useCallback2(() => {
    const f = window.frappe;
    if (env === "desk" && f?.db?.get_list && f?.set_route) {
      f.db.get_list("Neoffice Company Settings", { fields: ["name"], limit: 2 }).then((rows) => {
        if (rows && rows.length === 1) f.set_route("Form", "Neoffice Company Settings", rows[0].name);
        else navigate("/app/neoffice-company-settings");
      }).catch(() => navigate("/app/neoffice-company-settings"));
    } else {
      navigate("/app/neoffice-company-settings");
    }
  }, [env, navigate]);
  const openMobileApp = useCallback2(() => {
    const w = window;
    if (w.showMobileAppsDialog) w.showMobileAppsDialog();
    else console.warn("[cockpit] showMobileAppsDialog missing \u2014 neoffice_theme not loaded?");
  }, []);
  const openBornes = useCallback2(() => {
    navigate("/app/neoffice-devices");
  }, [navigate]);
  const goWorkspace = (ws) => {
    setMobileOpen(false);
    navigate("/app/" + ws.name.toLowerCase().replace(/\s+/g, "-"));
  };
  const reachable = (route2) => {
    const m = route2.match(/^\/app\/([^/?#]+)\/?$/);
    if (!m) return true;
    const slug = decodeURIComponent(m[1]).toLowerCase();
    return slug === "home" || workspaces.some((w) => w.name.toLowerCase().replace(/\s+/g, "-") === slug);
  };
  const goApp = (app) => {
    setCurrentApp(app.app_name);
    setAppMenuOpen(false);
    setMobileOpen(false);
    if (app.app_route) navigate(reachable(app.app_route) ? app.app_route : homeUrl);
  };
  const frappeSetValue = useCallback2((doctype, name, field, value) => {
    return fetch("/api/method/frappe.client.set_value", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Frappe-CSRF-Token": csrfToken() },
      body: JSON.stringify({ doctype, name, fieldname: field, value })
    }).then((r) => {
      if (!r.ok) throw new Error(`set_value ${field}: HTTP ${r.status}`);
      return r;
    });
  }, []);
  const currentUser = () => {
    const w = window;
    return w.frappe?.session?.user || boot?.user?.name || "";
  };
  const setUserUiPref = useCallback2((field, value) => {
    if (!hasModes) return frappeSetValue("User", currentUser(), field, value);
    return fetch("/api/method/neoffice_theme.boot_override.set_user_ui_pref", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Frappe-CSRF-Token": csrfToken() },
      body: JSON.stringify({ field, value })
    }).then((r) => {
      if (!r.ok) throw new Error(`set_user_ui_pref ${field}: HTTP ${r.status}`);
      return r;
    });
  }, [frappeSetValue, hasModes]);
  const MODE_SWITCH_NOTICE = "neocockpit-mode-switch-notice";
  const MODE_SWITCH_ATTEMPT = "neocockpit-mode-switch-attempt";
  useEffect2(() => {
    if (!isSimple) return;
    const advancedOnly = boot?.neoffice_advanced_only_workspaces || [];
    if (!advancedOnly.length) return;
    const pathname = typeof location === "undefined" ? "" : decodePath(location.pathname);
    const slug = (pathname.replace(/^\/app\/?/, "").split("/")[0] || "").toLowerCase();
    if (!slug) return;
    const toSlug = (n) => n.toLowerCase().replace(/\s+/g, "-");
    const target = advancedOnly.find((n) => toSlug(n) === slug);
    if (!target) return;
    const attempt = `${target}|${Date.now()}`;
    try {
      const [last, at] = (sessionStorage.getItem(MODE_SWITCH_ATTEMPT) || "").split("|");
      if (last === target && Date.now() - Number(at) < 6e4) return;
      sessionStorage.setItem(MODE_SWITCH_ATTEMPT, attempt);
    } catch {
    }
    try {
      sessionStorage.setItem(MODE_SWITCH_NOTICE, target);
    } catch {
    }
    const w0 = window;
    try {
      w0.frappe?.hide_msgprint?.();
    } catch {
    }
    document.body.classList.remove("simplified_view");
    setUserUiPref("view_interface", "Advanced").then(() => window.location.reload()).catch(() => {
      document.body.classList.add("simplified_view");
      try {
        sessionStorage.removeItem(MODE_SWITCH_NOTICE);
      } catch {
      }
    });
  }, [route, isSimple, boot]);
  useEffect2(() => {
    let switchedFor = boot?.neoffice_mode_switched || null;
    if (!switchedFor) {
      try {
        switchedFor = sessionStorage.getItem(MODE_SWITCH_NOTICE);
        if (switchedFor) sessionStorage.removeItem(MODE_SWITCH_NOTICE);
      } catch {
      }
    }
    if (!switchedFor) return;
    const w = window;
    const message = tr("We switched to advanced mode: \u201C{0}\u201D does not exist in simplified mode.", [switchedFor]);
    if (typeof w.frappe?.show_alert === "function") w.frappe.show_alert({ message, indicator: "blue" }, 10);
    else console.info(message);
  }, [boot]);
  const switchMode = useCallback2((mode) => {
    const dbMode = mode === "Simple" ? "Simplified" : "Advanced";
    setModeOnItsWay(mode);
    let onWorkspace = false;
    try {
      onWorkspace = mode === "Simple" && window.frappe?.get_route?.()?.[0] === "Workspaces";
    } catch {
    }
    setUserUiPref("view_interface", dbMode).then(() => {
      if (onWorkspace) window.location.href = "/app/home";
      else window.location.reload();
    }).catch(() => {
      window.location.reload();
    });
  }, [setUserUiPref]);
  const applyColorMode = useCallback2((mode) => {
    setColorMode(mode);
    try {
      localStorage.setItem("neocockpit-colormode", mode);
    } catch {
    }
    const sysDark = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = mode === "system" ? sysDark ? "dark" : "light" : mode;
    applyColorModeToDom(mode);
    try {
      localStorage.setItem("theme_active", theme);
    } catch {
    }
    const deskTheme = mode === "system" ? "Automatic" : mode[0].toUpperCase() + mode.slice(1);
    setUserUiPref("desk_theme", deskTheme).catch(() => {
    });
  }, [setUserUiPref, applyColorModeToDom]);
  const openCalculator = () => {
    window.frappe?.ui?.NeofficeCalculatorDialog?.show?.();
  };
  const triggerNora = () => {
    if (onNora) onNora();
    else openNoraQuickChat();
  };
  const triggerBell = () => {
    if (onBell) onBell();
    else navigate("/app/notification-log");
  };
  const switchFormWidth = useCallback2((value) => {
    setFormWidth(value);
    setUserUiPref("form_width", value).catch(() => {
    });
  }, [setUserUiPref]);
  const switchTouch = useCallback2((value) => {
    const t = touchApi();
    if (!t) return;
    if (value === "on") t.on();
    else if (value === "off") t.off();
    else t.auto();
    setTouchMode(value);
  }, []);
  useEffect2(() => {
    const suivre = () => {
      const t = touchApi();
      if (!t) return;
      setTouchMode(!t.decided() ? "auto" : t.active() ? "on" : "off");
    };
    window.addEventListener("neo-touch-change", suivre);
    return () => window.removeEventListener("neo-touch-change", suivre);
  }, []);
  const searchRef = useRef2(null);
  useEffect2(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "g") {
        e.preventDefault();
        setMobileOpen(false);
        if (onSearch) onSearch();
        else searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onSearch]);
  const submitSearch = (q) => {
    if (q.trim()) navigate("/app/search?q=" + encodeURIComponent(q.trim()));
  };
  const logout = () => {
    const w = window;
    if (w.frappe?.app?.logout) {
      w.frappe.app.logout();
      return;
    }
    fetch("/api/method/logout", { method: "POST", headers: { "X-Frappe-CSRF-Token": csrfToken() } }).finally(() => {
      window.location.href = "/login";
    });
  };
  const myEmail = boot?.user?.email || boot?.user?.name || "";
  const myInfo = boot?.user_info && boot.user_info[myEmail] || {};
  const userName = myInfo.fullname || boot?.user?.full_name || boot?.user?.email || tr("User");
  const userImage = myInfo.image || boot?.user?.user_image || "";
  const userAbbr = myInfo.abbr || computeAbbr(userName);
  const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);
  const appLogoUrl = currentAppData?.app_logo_url;
  const showUtil = (k) => !isPortal && (!utilities || utilities.includes(k));
  const sidebarBody = (forceExpanded = false) => {
    const exp = forceExpanded || (narrow ? false : expanded);
    const noraButton = showUtil("nora") ? /* @__PURE__ */ jsx3("button", { className: "nc-iconbtn nc-nora", ...!exp ? tipProps(tr("Ask NORA")) : {}, title: exp ? tr("Ask NORA") : void 0, onClick: triggerNora, children: /* @__PURE__ */ jsx3(Sparkles, { size: 17, strokeWidth: 1.7 }) }) : null;
    return /* @__PURE__ */ jsxs2(Fragment3, { children: [
      /* @__PURE__ */ jsxs2("div", { className: cn("nc-top nc-actions", !exp && !moreOpen && "nc-actions-folded", simpleChrome && "nc-simple-chrome"), children: [
        exp ? /* @__PURE__ */ jsxs2("div", { className: "nc-brandrow", children: [
          /* @__PURE__ */ jsx3("span", { className: "nc-logo-slot", children: /* @__PURE__ */ jsx3(LogoLink, { onClick: goHome, mark: false, height: 20 }) }),
          !simpleChrome && /* @__PURE__ */ jsx3(
            DateWidget,
            {
              tr,
              locale: dateLocale,
              eventCount: todayCount,
              onClick: () => setOpenPanel((p) => p === "events" ? null : "events")
            }
          ),
          simpleChrome && noraButton
        ] }) : /* @__PURE__ */ jsx3("span", { className: "nc-logo-slot", children: /* @__PURE__ */ jsx3(LogoLink, { onClick: goHome, mark: false, height: 12 }) }),
        !simpleChrome && showUtil("help") && (onHelp || spaPanels) && /* @__PURE__ */ jsxs2(
          "button",
          {
            className: "nc-iconbtn nc-help",
            ...!exp ? tipProps(tr("Help & Training")) : {},
            title: exp ? tr("Help & Training") : void 0,
            onClick: onHelp || (() => setOpenPanel((p) => p === "help" ? null : "help")),
            children: [
              /* @__PURE__ */ jsx3(LifeBuoy, { size: 17, strokeWidth: 1.7 }),
              /* @__PURE__ */ jsx3("span", { className: "nc-count" })
            ]
          }
        ),
        !simpleChrome && showUtil("mail") && /* @__PURE__ */ jsxs2(
          "button",
          {
            className: "nc-iconbtn nc-synk",
            ...!exp ? tipProps(tr("Messages")) : {},
            title: exp ? tr("Messages") : void 0,
            onClick: () => setOpenPanel((p) => p === "mailmenu" || p === "mail" || p === "synk" ? null : "mailmenu"),
            children: [
              /* @__PURE__ */ jsx3(Mail, { size: 17, strokeWidth: 1.7 }),
              /* @__PURE__ */ jsx3("span", { className: "nc-count", children: spaPanels && !onSynk && spaSynkCount > 0 ? spaSynkCount : void 0 })
            ]
          }
        ),
        !simpleChrome && /* @__PURE__ */ jsx3("span", { className: "nc-phone-slot", style: { display: "contents" } }),
        !simpleChrome && showUtil("bell") && /* @__PURE__ */ jsxs2(
          "button",
          {
            className: cn("nc-iconbtn nc-bell", spaPanels && !onBell && spaNotifCount > 0 && "has-unseen"),
            ...!exp ? tipProps(tr("Notifications")) : {},
            title: exp ? tr("Notifications") : void 0,
            onClick: onBell ? triggerBell : spaPanels ? () => setOpenPanel((p) => p === "bell" ? null : "bell") : triggerBell,
            children: [
              /* @__PURE__ */ jsx3(Bell, { size: 17, strokeWidth: 1.7 }),
              /* @__PURE__ */ jsx3("span", { className: "pip nc-bell-pip" })
            ]
          }
        ),
        !simpleChrome && showUtil("notes") && /* @__PURE__ */ jsx3("button", { className: "nc-iconbtn nc-notes", ...!exp ? tipProps(tr("Notes")) : {}, title: exp ? tr("Notes") : void 0, onClick: () => navigate("/app/notes"), children: /* @__PURE__ */ jsx3(NotebookPen, { size: 17, strokeWidth: 1.7 }) }),
        (!simpleChrome || !exp) && noraButton,
        !forceExpanded && !simpleChrome && /* @__PURE__ */ jsxs2(
          "button",
          {
            className: "nc-iconbtn nc-more",
            ...!exp ? tipProps(moreOpen ? tr("Less") : tr("More")) : {},
            onClick: () => setMoreOpen((o) => !o),
            children: [
              /* @__PURE__ */ jsx3(MoreHorizontal, { size: 17, strokeWidth: 1.7 }),
              /* @__PURE__ */ jsx3("span", { className: cn("pip nc-more-pip", hiddenAlert && "show") })
            ]
          }
        )
      ] }),
      !isSimple && !deskless && /* @__PURE__ */ jsxs2("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ jsxs2("button", { className: cn("nc-switch", moduleMode && "nc-module"), ...!exp ? tipProps(moduleMode ? moduleApp?.app_title || spaceNav.label : appsMenu ? tr("Apps") : allMode ? tr("All") : currentAppData?.app_title || tr("Switch module")) : {}, title: exp ? appsMenu ? tr("Apps") : tr("Switch module") : void 0, onClick: () => setAppMenuOpen((o) => !o), children: [
          /* @__PURE__ */ jsx3("span", { className: "sq", children: moduleMode ? moduleApp?.app_logo_url ? /* @__PURE__ */ jsx3("img", { src: moduleApp.app_logo_url, alt: "" }) : /* @__PURE__ */ jsx3(Briefcase, { size: 19, strokeWidth: 1.6 }) : allMode || appsMenu ? /* @__PURE__ */ jsx3(LayoutGrid, { size: 17, strokeWidth: 1.6 }) : appLogoUrl ? /* @__PURE__ */ jsx3("img", { src: appLogoUrl, alt: "" }) : /* @__PURE__ */ jsx3(Briefcase, { size: 17, strokeWidth: 1.6 }) }),
          exp && /* @__PURE__ */ jsxs2("span", { className: "meta nc-hide-collapsed", children: [
            /* @__PURE__ */ jsx3("span", { className: "n", children: moduleMode ? moduleApp?.app_title || spaceNav.label : appsMenu ? tr("Apps") : allMode ? tr("All") : currentAppData?.app_title || "ERPNext" }),
            /* @__PURE__ */ jsx3("span", { className: "s", children: moduleMode ? tr("Active module") : appsMenu ? tr("Tools") : allMode ? tr("All Modules") : tr("Active module") })
          ] }),
          exp && /* @__PURE__ */ jsx3("span", { className: "ch nc-hide-collapsed", children: /* @__PURE__ */ jsx3(ChevronsUpDown, { size: 15 }) })
        ] }),
        appMenuOpen && /* @__PURE__ */ jsxs2("div", { className: "nc-menu", style: { top: "100%", left: 0, right: 0, marginTop: 0 }, children: [
          appsMenu && surfaceTiles.map((t) => /* @__PURE__ */ jsxs2(
            "button",
            {
              className: "item",
              ...t.description ? tipProps(tr(t.title), t.description) : {},
              onClick: () => {
                setAppMenuOpen(false);
                if (t.route) window.location.href = t.route;
              },
              children: [
                t.logo ? /* @__PURE__ */ jsx3("img", { src: t.logo, alt: "" }) : /* @__PURE__ */ jsx3(LayoutGrid, { size: 16 }),
                /* @__PURE__ */ jsx3("span", { style: { flex: 1 }, children: tr(t.title) })
              ]
            },
            t.name
          )),
          !appsMenu && /* @__PURE__ */ jsxs2(Fragment3, { children: [
            /* @__PURE__ */ jsxs2(
              "button",
              {
                className: cn("item", allMode && !moduleMode && "active"),
                onClick: () => {
                  if (moduleMode) setSpacesShown(true);
                  setCurrentApp(ALL_APP);
                  setAppMenuOpen(false);
                },
                children: [
                  /* @__PURE__ */ jsx3(LayoutGrid, { size: 16 }),
                  /* @__PURE__ */ jsx3("span", { style: { flex: 1 }, children: tr("All") })
                ]
              }
            ),
            /* @__PURE__ */ jsx3("div", { className: "sep" }),
            apps.map((app) => /* @__PURE__ */ jsxs2("button", { className: cn("item", app.app_name === currentApp && "active"), onClick: () => goApp(app), children: [
              app.app_logo_url ? /* @__PURE__ */ jsx3("img", { src: app.app_logo_url, alt: "" }) : /* @__PURE__ */ jsx3(Circle, { size: 14 }),
              /* @__PURE__ */ jsx3("span", { style: { flex: 1 }, children: app.app_title })
            ] }, app.app_name))
          ] }),
          !appsMenu && surfaceTiles.length > 0 && /* @__PURE__ */ jsxs2(Fragment3, { children: [
            /* @__PURE__ */ jsx3("div", { className: "sep" }),
            /* @__PURE__ */ jsx3("div", { className: "nc-app-tiles", children: surfaceTiles.map((t) => /* @__PURE__ */ jsx3(
              "button",
              {
                className: "tile",
                ...tipProps(t.title, t.description),
                onClick: () => {
                  setAppMenuOpen(false);
                  if (t.route) window.location.href = t.route;
                },
                children: t.logo ? /* @__PURE__ */ jsx3("img", { src: t.logo, alt: "" }) : /* @__PURE__ */ jsx3(LayoutGrid, { size: 18 })
              },
              t.name
            )) })
          ] }),
          (!appsMenu || surfaceTiles.length > 0) && /* @__PURE__ */ jsx3("div", { className: "sep" }),
          env === "desk" && /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => {
            setAppMenuOpen(false);
            openMobileApp();
          }, children: [
            /* @__PURE__ */ jsx3(Smartphone, { size: 16 }),
            /* @__PURE__ */ jsx3("span", { children: tr("Mobile App") })
          ] }),
          env === "desk" && canManageDevices && /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => {
            setAppMenuOpen(false);
            openBornes();
          }, children: [
            /* @__PURE__ */ jsx3(MonitorSmartphone, { size: 16 }),
            /* @__PURE__ */ jsx3("span", { children: tr("Bornes") })
          ] }),
          /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => {
            setAppMenuOpen(false);
            window.open("/", "_blank", "noopener");
          }, children: [
            /* @__PURE__ */ jsx3(Globe, { size: 16 }),
            /* @__PURE__ */ jsx3("span", { children: tr("View Website") })
          ] }),
          canConfigureCompany && /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => {
            setAppMenuOpen(false);
            openCompanyConfig();
          }, children: [
            /* @__PURE__ */ jsx3(Settings, { size: 16 }),
            /* @__PURE__ */ jsx3("span", { children: tr("Company Configuration") })
          ] })
        ] })
      ] }),
      (!isPortal || onSearch) && /* @__PURE__ */ jsxs2(
        "div",
        {
          className: "nc-search",
          ...onSearch ? { onClick: () => onSearch() } : {},
          ...!exp ? tipProps(tr("Search\u2026")) : {},
          onClick: (e) => {
            if (env === "desk") return;
            const input = e.currentTarget.querySelector("input");
            if (input) input.focus();
            else setPinned(true);
          },
          children: [
            /* @__PURE__ */ jsx3("span", { className: "si", children: /* @__PURE__ */ jsx3(Search2, { size: 16, strokeWidth: 1.7 }) }),
            exp && /* @__PURE__ */ jsx3(
              "input",
              {
                ref: forceExpanded ? void 0 : searchRef,
                placeholder: tr("Search\u2026"),
                readOnly: !!onSearch,
                style: onSearch ? { cursor: "pointer" } : void 0,
                onClick: onSearch ? () => onSearch() : void 0,
                onKeyDown: onSearch || env === "desk" ? void 0 : (e) => {
                  if (e.key === "Enter") submitSearch(e.target.value);
                }
              }
            ),
            exp && /* @__PURE__ */ jsx3("span", { className: "kbd", children: searchKbd || (isMac ? "\u2318G" : "Ctrl G") })
          ]
        }
      ),
      favorites.length > 0 && /* @__PURE__ */ jsxs2(
        "button",
        {
          className: cn("nc-fav-trigger", openPanel === "favorites" && "active"),
          ...!exp ? tipProps(tr("Favorites")) : {},
          title: exp ? tr("Favorites") : void 0,
          onClick: () => setOpenPanel((p) => p === "favorites" ? null : "favorites"),
          children: [
            /* @__PURE__ */ jsx3("span", { className: "fi", children: /* @__PURE__ */ jsx3(Star, { size: 16, strokeWidth: 1.7 }) }),
            exp && /* @__PURE__ */ jsx3("span", { className: "fl", children: tr("Favorites") }),
            exp && /* @__PURE__ */ jsx3("span", { className: "fc", children: favorites.length })
          ]
        }
      ),
      /* @__PURE__ */ jsxs2("nav", { className: "nc-nav", style: { marginTop: 4 }, children: [
        env === "desk" && (!isSimple || simpleSpaces) && !surfaceNavActive() && !moduleMode && mySpace && /* @__PURE__ */ jsxs2(
          "button",
          {
            className: cn("nc-navitem", mySpaceActive && "active"),
            title: exp ? homeLabel : void 0,
            ...!exp ? tipProps(homeLabel) : {},
            onClick: () => {
              setMobileOpen(false);
              navigate(mySpace.route);
            },
            children: [
              /* @__PURE__ */ jsx3("span", { className: "ni", children: mySpace.icon ? /* @__PURE__ */ jsx3("img", { src: mySpace.icon, alt: "", style: { width: 18, height: 18, objectFit: "contain" } }) : /* @__PURE__ */ jsx3(Home, { size: 18, strokeWidth: 1.6 }) }),
              exp && /* @__PURE__ */ jsx3("span", { className: "nl", children: homeLabel })
            ]
          }
        ),
        isSimple && simpleSpaces && !surfaceNavActive() && simpleSpaces.map((sp) => {
          const active = simpleSpaceActive(sp);
          return /* @__PURE__ */ jsxs2(
            "button",
            {
              className: cn("nc-navitem", active && "active"),
              title: exp ? sp.label : void 0,
              ...!exp ? tipProps(sp.label) : {},
              onClick: () => goSimpleSpace(sp),
              children: [
                /* @__PURE__ */ jsx3("span", { className: "ni", children: sp.icon ? /* @__PURE__ */ jsx3("img", { src: sp.icon, alt: "", style: { width: 18, height: 18, objectFit: "contain" } }) : /* @__PURE__ */ jsx3(Briefcase, { size: 18, strokeWidth: 1.6 }) }),
                exp && /* @__PURE__ */ jsx3("span", { className: "nl", children: sp.label }),
                countOf(sp.app) > 0 && /* @__PURE__ */ jsx3("span", { className: "nc-space-count", children: countOf(sp.app) })
              ]
            },
            sp.app
          );
        }),
        isSimple && !simpleSpaces && !surfaceNavActive() && simpleWorkspaces.map((ws) => {
          const Icon = getIcon(ws.icon);
          const active = route.includes("/" + ws.name.toLowerCase().replace(/\s+/g, "-"));
          return /* @__PURE__ */ jsxs2(
            "button",
            {
              className: cn("nc-navitem", active && "active"),
              title: exp ? ws.label : void 0,
              ...!exp ? tipProps(ws.label) : {},
              onClick: () => goWorkspace(ws),
              children: [
                /* @__PURE__ */ jsx3("span", { className: "ni", children: /* @__PURE__ */ jsx3(Icon, { size: 19, strokeWidth: 1.6 }) }),
                exp && /* @__PURE__ */ jsx3("span", { className: "nl", children: ws.label })
              ]
            },
            ws.name
          );
        }),
        surfaceNavActive() && contextNav && contextNav.map((sec, si) => /* @__PURE__ */ jsxs2("div", { className: "nc-ctx-sec", children: [
          sec.label && exp && /* @__PURE__ */ jsx3("div", { className: "nc-ctx-label", children: tr(sec.label) }),
          sec.items.map((it, ii) => {
            const Icon = getIcon(it.icon);
            return /* @__PURE__ */ jsxs2(
              "button",
              {
                className: cn("nc-navitem", it.active && "active"),
                ...!exp ? tipProps(it.label) : {},
                title: exp ? it.label : void 0,
                onClick: () => {
                  if (it.onClick) it.onClick();
                  else if (it.route) navigate(it.route);
                },
                children: [
                  /* @__PURE__ */ jsx3("span", { className: "ni", children: it.color ? /* @__PURE__ */ jsx3("span", { style: { display: "inline-block", width: 12, height: 12, borderRadius: "50%", border: `2px solid ${it.color}`, backgroundColor: it.dim ? "transparent" : it.color } }) : /* @__PURE__ */ jsx3(Icon, { size: 18, strokeWidth: 1.6 }) }),
                  exp && /* @__PURE__ */ jsx3("span", { className: "nl", children: it.label }),
                  exp && it.shared && /* @__PURE__ */ jsx3("span", { className: "nc-ctx-shared", title: it.sharedTitle, style: { marginLeft: "auto", display: "inline-flex", opacity: 0.7 }, children: /* @__PURE__ */ jsx3(Users, { size: 13, strokeWidth: 1.6 }) }),
                  exp && it.onGear && /* @__PURE__ */ jsx3(
                    "span",
                    {
                      role: "button",
                      title: tr("Settings"),
                      className: "nc-ctx-gear",
                      style: { marginLeft: it.shared ? "6px" : "auto", display: "inline-flex", opacity: 0.55, cursor: "pointer" },
                      onClick: (e) => {
                        e.stopPropagation();
                        it.onGear();
                      },
                      children: /* @__PURE__ */ jsx3(Settings, { size: 14, strokeWidth: 1.6 })
                    }
                  ),
                  exp && it.badge != null && it.badge !== "" && /* @__PURE__ */ jsx3("span", { className: "nc-ctx-badge", children: it.badge })
                ]
              },
              ii
            );
          })
        ] }, si)),
        moduleMode && !surfaceNavActive() && spaceNav.items.map((it) => {
          const Icon = getIcon("lucide-" + (it.icon || "circle"));
          const count = it.count || 0;
          return /* @__PURE__ */ jsxs2(
            "button",
            {
              className: cn("nc-navitem", it.active && "active"),
              title: exp ? it.label : void 0,
              ...!exp ? tipProps(it.label) : {},
              onClick: () => {
                setMobileOpen(false);
                goSpaceTab(it.key);
              },
              children: [
                /* @__PURE__ */ jsx3("span", { className: "ni", children: /* @__PURE__ */ jsx3(Icon, { size: 18, strokeWidth: 1.6 }) }),
                exp && /* @__PURE__ */ jsx3("span", { className: "nl", children: it.label }),
                count > 0 && /* @__PURE__ */ jsx3("span", { className: "nc-space-count", "aria-label": String(count), children: exp ? count : null })
              ]
            },
            it.key
          );
        }),
        !isSimple && !surfaceNavActive() && !moduleMode && allMode && exp && menuGroups.map(({ app, items }, gi) => {
          const groupActive = env === "spa" ? openGroup === app.app_name : app.app_name === activeGroupName;
          const listOpen = env === "spa" ? groupActive : openGroup === app.app_name;
          return /* @__PURE__ */ jsxs2(Fragment2, { children: [
            sepBefore(gi) && /* @__PURE__ */ jsx3("div", { className: "nc-nav-sep", role: "separator" }),
            firstFolded(gi) && /* @__PURE__ */ jsxs2(
              "button",
              {
                className: cn("nc-navitem", "nc-others", othersShown && "open"),
                title: tr("Other spaces"),
                "aria-expanded": othersShown,
                onClick: toggleOthers,
                children: [
                  /* @__PURE__ */ jsx3("span", { className: "ni", children: /* @__PURE__ */ jsx3(LayoutGrid, { size: 18, strokeWidth: 1.6 }) }),
                  /* @__PURE__ */ jsx3("span", { className: "nl", children: tr("Other spaces") }),
                  /* @__PURE__ */ jsx3("span", { className: "nc-caret", "aria-hidden": "true" })
                ]
              }
            ),
            (!folds(app.app_name) || othersShown) && /* @__PURE__ */ jsxs2("div", { className: cn("nc-group", folds(app.app_name) && "nc-folded"), children: [
              /* @__PURE__ */ jsxs2(
                "button",
                {
                  className: cn("nc-navitem", groupActive && "active", listOpen && "open"),
                  title: app.app_title,
                  "aria-expanded": opensAList(items, app.app_name) ? listOpen : void 0,
                  onClick: (e) => {
                    if (env === "spa" && items.length && unfolds(app.app_name) || opensAList(items, app.app_name)) {
                      const opening = openGroup !== app.app_name;
                      setOpenGroup((g) => g === app.app_name ? "" : app.app_name);
                      const group = e.currentTarget.closest(".nc-group");
                      if (opening && group) setTimeout(() => group.scrollIntoView({ block: "nearest", behavior: "smooth" }), 30);
                      return;
                    }
                    app.app_route ? goApp(app) : items.length ? goWorkspace(items[0]) : goApp(app);
                  },
                  children: [
                    /* @__PURE__ */ jsx3("span", { className: "ni", children: app.app_logo_url ? /* @__PURE__ */ jsx3("img", { src: app.app_logo_url, alt: "", style: { width: 18, height: 18, objectFit: "contain" } }) : /* @__PURE__ */ jsx3(LayoutGrid, { size: 18, strokeWidth: 1.6 }) }),
                    /* @__PURE__ */ jsx3("span", { className: "nl", children: app.app_title }),
                    countOf(app.app_name) > 0 && /* @__PURE__ */ jsx3("span", { className: "nc-space-count", children: countOf(app.app_name) }),
                    opensAList(items, app.app_name) && /* @__PURE__ */ jsx3("span", { className: "nc-caret", "aria-hidden": "true" })
                  ]
                }
              ),
              listOpen && items.length > 0 && unfolds(app.app_name) && /* @__PURE__ */ jsx3("div", { className: "nc-sub", children: items.map((ws) => {
                const wsLabel = stripModulePrefix(ws.label || tr(ws.title || ws.name), app.app_title);
                return /* @__PURE__ */ jsx3("button", { className: cn("nc-subitem", isWsActive(ws) && "on"), title: wsLabel, onClick: () => goWorkspace(ws), children: wsLabel }, ws.name);
              }) })
            ] }),
            gi === lastSpace && newSpace() && /* @__PURE__ */ jsxs2(
              "button",
              {
                className: "nc-navitem nc-newspace",
                title: tr("New space"),
                onClick: () => {
                  setMobileOpen(false);
                  newSpace()?.();
                },
                children: [
                  /* @__PURE__ */ jsx3("span", { className: "ni", children: /* @__PURE__ */ jsx3(Plus, { size: 18, strokeWidth: 1.6 }) }),
                  /* @__PURE__ */ jsx3("span", { className: "nl", children: tr("New space") })
                ]
              }
            )
          ] }, app.app_name);
        }),
        !isSimple && !surfaceNavActive() && !moduleMode && allMode && !exp && menuGroups.map(({ app, items }, gi) => /* @__PURE__ */ jsxs2(Fragment2, { children: [
          sepBefore(gi) && /* @__PURE__ */ jsx3("div", { className: "nc-nav-sep", role: "separator" }),
          firstFolded(gi) && /* @__PURE__ */ jsx3(
            "button",
            {
              className: cn("nc-navitem", "nc-others", othersShown && "open"),
              ...tipProps(tr("Other spaces")),
              "aria-expanded": othersShown,
              onClick: toggleOthers,
              children: /* @__PURE__ */ jsx3("span", { className: "ni", children: /* @__PURE__ */ jsx3(LayoutGrid, { size: 18, strokeWidth: 1.6 }) })
            }
          ),
          (!folds(app.app_name) || othersShown) && /* @__PURE__ */ jsxs2(
            "button",
            {
              className: cn("nc-navitem", app.app_name === activeGroupName && "active"),
              ...items.length && unfolds(app.app_name) ? {} : tipProps(app.app_title),
              onMouseEnter: items.length && unfolds(app.app_name) ? (e) => {
                flyKeep();
                const r = e.currentTarget.getBoundingClientRect();
                setFlyout({ app, items, top: r.top });
              } : void 0,
              onMouseLeave: items.length && unfolds(app.app_name) ? flyClose : void 0,
              onClick: (e) => {
                if (opensAList(items, app.app_name)) {
                  flyKeep();
                  const r = e.currentTarget.getBoundingClientRect();
                  setFlyout({ app, items, top: r.top });
                  return;
                }
                setFlyout(null);
                app.app_route ? goApp(app) : items.length ? goWorkspace(items[0]) : goApp(app);
              },
              children: [
                /* @__PURE__ */ jsx3("span", { className: "ni", children: app.app_logo_url ? /* @__PURE__ */ jsx3("img", { src: app.app_logo_url, alt: "", style: { width: 18, height: 18, objectFit: "contain" } }) : /* @__PURE__ */ jsx3(LayoutGrid, { size: 18, strokeWidth: 1.6 }) }),
                countOf(app.app_name) > 0 && /* @__PURE__ */ jsx3("span", { className: "nc-space-count", "aria-label": String(countOf(app.app_name)) })
              ]
            }
          ),
          gi === lastSpace && newSpace() && /* @__PURE__ */ jsx3(
            "button",
            {
              className: "nc-navitem nc-newspace",
              ...tipProps(tr("New space")),
              onClick: () => {
                setFlyout(null);
                newSpace()?.();
              },
              children: /* @__PURE__ */ jsx3("span", { className: "ni", children: /* @__PURE__ */ jsx3(Plus, { size: 18, strokeWidth: 1.6 }) })
            }
          )
        ] }, app.app_name)),
        !isSimple && !surfaceNavActive() && !allMode && filteredWorkspaces.map((ws) => {
          const Icon = getIcon(ws.icon);
          const slug = ws.name.toLowerCase().replace(/\s+/g, "-");
          const active = route.includes("/" + slug);
          const wsLabel = stripModulePrefix(ws.label || tr(ws.title || ws.name), currentAppData?.app_title);
          return /* @__PURE__ */ jsxs2(
            "button",
            {
              className: cn("nc-navitem", active && "active"),
              title: exp ? wsLabel : void 0,
              ...!exp ? tipProps(wsLabel) : {},
              onClick: () => goWorkspace(ws),
              children: [
                /* @__PURE__ */ jsx3("span", { className: "ni", children: /* @__PURE__ */ jsx3(Icon, { size: 19, strokeWidth: 1.6 }) }),
                exp && /* @__PURE__ */ jsx3("span", { className: "nl", children: wsLabel })
              ]
            },
            ws.name
          );
        })
      ] }),
      contextFooter && exp && /* @__PURE__ */ jsxs2(
        "div",
        {
          className: cn("nc-ctx-footer", contextFooter.onClick && "clickable"),
          onClick: contextFooter.onClick,
          children: [
            /* @__PURE__ */ jsxs2("div", { className: "row", children: [
              /* @__PURE__ */ jsx3(Cloud, { size: 14, strokeWidth: 1.7 }),
              /* @__PURE__ */ jsx3("span", { className: "l", children: contextFooter.label })
            ] }),
            contextFooter.percent != null && /* @__PURE__ */ jsx3("div", { className: "bar", children: /* @__PURE__ */ jsx3("span", { style: { width: Math.min(100, contextFooter.percent) + "%" } }) }),
            contextFooter.sub && /* @__PURE__ */ jsx3("div", { className: "s", children: contextFooter.sub })
          ]
        }
      ),
      !deskless && hasModes && (exp ? /* @__PURE__ */ jsxs2("div", { className: "nc-mode-block", children: [
        /* @__PURE__ */ jsxs2("div", { className: "nc-mode-head", children: [
          /* @__PURE__ */ jsx3("span", { children: tr("Interface") }),
          /* @__PURE__ */ jsx3(
            "span",
            {
              className: "nc-mode-info",
              tabIndex: 0,
              role: "img",
              "aria-label": modeHelp,
              ...tipProps(tr("Interface"), modeHelp),
              onFocus: showTip(tr("Interface"), modeHelp),
              onBlur: hideTip,
              children: /* @__PURE__ */ jsx3(HelpCircle, { size: 12, strokeWidth: 1.9 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "nc-mode", role: "group", "aria-label": tr("Interface"), children: [
          /* @__PURE__ */ jsx3("button", { className: cn(shownSimple && "on", modeOnItsWay && "busy"), "aria-pressed": shownSimple, "aria-busy": Boolean(modeOnItsWay), onClick: () => {
            if (!modeOnItsWay && !isSimple) switchMode("Simple");
          }, children: tr("Simple") }),
          /* @__PURE__ */ jsx3("button", { className: cn(!shownSimple && "on", modeOnItsWay && "busy"), "aria-pressed": !shownSimple, "aria-busy": Boolean(modeOnItsWay), onClick: () => {
            if (!modeOnItsWay && isSimple) switchMode("Advanced");
          }, children: tr("Advanced") })
        ] })
      ] }) : /* @__PURE__ */ jsx3(
        "button",
        {
          className: "nc-mode-pip",
          ...tipProps(isSimple ? tr("Simple mode") : tr("Advanced mode"), modeHelp),
          "aria-label": isSimple ? tr("Switch to advanced mode") : tr("Switch to simple mode"),
          onClick: () => {
            if (!modeOnItsWay) switchMode(isSimple ? "Advanced" : "Simple");
          },
          children: (shownSimple ? tr("Simple") : tr("Advanced")).charAt(0).toUpperCase()
        }
      )),
      !forceExpanded && /* @__PURE__ */ jsxs2(
        "button",
        {
          className: "nc-collapse",
          ...!exp ? tipProps(tr("Expand")) : {},
          title: exp ? void 0 : tr("Expand"),
          onClick: () => setPinned(!pinned),
          children: [
            pinned ? /* @__PURE__ */ jsx3(PanelLeftClose, { size: 16, strokeWidth: 1.7 }) : /* @__PURE__ */ jsx3(PanelLeftOpen, { size: 16, strokeWidth: 1.7 }),
            exp && /* @__PURE__ */ jsx3("span", { className: "nc-hide-collapsed", children: tr("Collapse menu") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs2("div", { className: "nc-foot", style: { position: "relative" }, children: [
        userMenuOpen && /* @__PURE__ */ jsxs2("div", { className: "nc-menu", style: { bottom: "100%", left: 0, right: 0, marginBottom: 6 }, children: [
          !isGuest && /* @__PURE__ */ jsxs2("div", { className: "uhead", children: [
            /* @__PURE__ */ jsx3("div", { className: "n", children: userName }),
            /* @__PURE__ */ jsx3("div", { className: "e", children: boot?.user?.email || "" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "nc-prefs", children: [
            /* @__PURE__ */ jsxs2("div", { className: "nc-pref", role: "group", "aria-label": tr("Color mode"), children: [
              /* @__PURE__ */ jsx3("span", { className: "lbl", children: tr("Color mode") }),
              /* @__PURE__ */ jsxs2("div", { className: "seg", children: [
                /* @__PURE__ */ jsx3("button", { className: cn(colorMode === "system" && "on"), "aria-pressed": colorMode === "system", onClick: () => applyColorMode("system"), children: /* @__PURE__ */ jsx3("span", { children: tr("System") }) }),
                /* @__PURE__ */ jsx3("button", { className: cn(colorMode === "light" && "on"), "aria-pressed": colorMode === "light", onClick: () => applyColorMode("light"), children: /* @__PURE__ */ jsx3("span", { children: tr("Light") }) }),
                /* @__PURE__ */ jsx3("button", { className: cn(colorMode === "dark" && "on"), "aria-pressed": colorMode === "dark", onClick: () => applyColorMode("dark"), children: /* @__PURE__ */ jsx3("span", { children: tr("Dark") }) })
              ] })
            ] }),
            !deskless && /* @__PURE__ */ jsxs2(Fragment3, { children: [
              !hasModes && /* @__PURE__ */ jsxs2("div", { className: "nc-pref", role: "group", "aria-label": tr("Interface"), children: [
                /* @__PURE__ */ jsx3("span", { className: "lbl", children: tr("Interface") }),
                /* @__PURE__ */ jsxs2("div", { className: "seg", children: [
                  /* @__PURE__ */ jsx3("button", { className: cn(shownSimple && "on"), "aria-pressed": shownSimple, onClick: () => {
                    if (!modeOnItsWay && !isSimple) switchMode("Simple");
                  }, children: tr("Simple") }),
                  /* @__PURE__ */ jsx3("button", { className: cn(!shownSimple && "on"), "aria-pressed": !shownSimple, onClick: () => {
                    if (!modeOnItsWay && isSimple) switchMode("Advanced");
                  }, children: tr("Advanced") })
                ] })
              ] }),
              /* @__PURE__ */ jsxs2("div", { className: "nc-pref", role: "group", "aria-label": tr("Width"), children: [
                /* @__PURE__ */ jsx3("span", { className: "lbl", children: tr("Width") }),
                /* @__PURE__ */ jsxs2("div", { className: "seg", children: [
                  /* @__PURE__ */ jsx3("button", { className: cn(formWidth === "Standard" && "on"), "aria-pressed": formWidth === "Standard", title: tr("Standard"), onClick: () => switchFormWidth("Standard"), children: "S" }),
                  /* @__PURE__ */ jsx3("button", { className: cn(formWidth === "Large" && "on"), "aria-pressed": formWidth === "Large", title: tr("Large"), onClick: () => switchFormWidth("Large"), children: "M" }),
                  /* @__PURE__ */ jsx3("button", { className: cn(formWidth === "Full Width" && "on"), "aria-pressed": formWidth === "Full Width", title: tr("Full Width"), onClick: () => switchFormWidth("Full Width"), children: "L" })
                ] })
              ] }),
              env === "desk" && touchApi() && /* @__PURE__ */ jsxs2("div", { className: "nc-pref", role: "group", "aria-label": tr("Touch mode"), children: [
                /* @__PURE__ */ jsx3("span", { className: "lbl", children: tr("Touch mode") }),
                /* @__PURE__ */ jsxs2("div", { className: "seg", children: [
                  /* @__PURE__ */ jsx3("button", { className: cn(touchMode === "auto" && "on"), "aria-pressed": touchMode === "auto", onClick: () => switchTouch("auto"), children: tr("Auto", void 0, "Touch mode") }),
                  /* @__PURE__ */ jsx3("button", { className: cn(touchMode === "on" && "on"), "aria-pressed": touchMode === "on", onClick: () => switchTouch("on"), children: tr("On", void 0, "Touch mode") }),
                  /* @__PURE__ */ jsx3("button", { className: cn(touchMode === "off" && "on"), "aria-pressed": touchMode === "off", onClick: () => switchTouch("off"), children: tr("Off", void 0, "Touch mode") })
                ] })
              ] })
            ] })
          ] }),
          !deskless && /* @__PURE__ */ jsxs2(Fragment3, { children: [
            /* @__PURE__ */ jsx3("div", { className: "sep" }),
            /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => navigate("/app/user-profile"), children: [
              /* @__PURE__ */ jsx3(Settings, { size: 16 }),
              /* @__PURE__ */ jsx3("span", { children: tr("Account settings") })
            ] }),
            /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => {
              setUserMenuOpen(false);
              if (onHelp) {
                onHelp();
              } else {
                setOpenPanel("help");
              }
            }, children: [
              /* @__PURE__ */ jsx3(BookOpen, { size: 16 }),
              /* @__PURE__ */ jsx3("span", { children: tr("Documentation") })
            ] }),
            /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => {
              setUserMenuOpen(false);
              openCalculator();
            }, children: [
              /* @__PURE__ */ jsx3(Calculator, { size: 16 }),
              /* @__PURE__ */ jsx3("span", { children: tr("Calculator") })
            ] }),
            /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => navigate(homeUrl), children: [
              /* @__PURE__ */ jsx3(Home, { size: 16 }),
              /* @__PURE__ */ jsx3("span", { children: tr("Home") })
            ] }),
            /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => {
              setUserMenuOpen(false);
              window.open("/", "_blank", "noopener");
            }, children: [
              /* @__PURE__ */ jsx3(Globe, { size: 16 }),
              /* @__PURE__ */ jsx3("span", { children: tr("View Website") })
            ] }),
            /* @__PURE__ */ jsx3("div", { className: "sep" }),
            /* @__PURE__ */ jsxs2("button", { className: "item", onClick: logout, children: [
              /* @__PURE__ */ jsx3(LogOut, { size: 16 }),
              /* @__PURE__ */ jsx3("span", { children: tr("Logout") })
            ] })
          ] }),
          isPortal && /* @__PURE__ */ jsxs2(Fragment3, { children: [
            /* @__PURE__ */ jsx3("div", { className: "sep" }),
            /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => {
              window.location.href = "/me";
            }, children: [
              /* @__PURE__ */ jsx3(UserIcon, { size: 16 }),
              /* @__PURE__ */ jsx3("span", { children: tr("My Account") })
            ] }),
            /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => {
              setUserMenuOpen(false);
              window.open("/", "_blank", "noopener");
            }, children: [
              /* @__PURE__ */ jsx3(Globe, { size: 16 }),
              /* @__PURE__ */ jsx3("span", { children: tr("View Website") })
            ] }),
            /* @__PURE__ */ jsx3("div", { className: "sep" }),
            /* @__PURE__ */ jsxs2("button", { className: "item", onClick: logout, children: [
              /* @__PURE__ */ jsx3(LogOut, { size: 16 }),
              /* @__PURE__ */ jsx3("span", { children: tr("Logout") })
            ] })
          ] }),
          isGuest && /* @__PURE__ */ jsxs2(Fragment3, { children: [
            /* @__PURE__ */ jsx3("div", { className: "sep" }),
            /* @__PURE__ */ jsxs2("button", { className: "item", onClick: () => {
              window.location.href = "/login?redirect-to=" + encodeURIComponent(window.location.pathname);
            }, children: [
              /* @__PURE__ */ jsx3(LogIn, { size: 16 }),
              /* @__PURE__ */ jsx3("span", { children: tr("Log in") })
            ] })
          ] })
        ] }),
        isGuest ? /* @__PURE__ */ jsxs2(
          "button",
          {
            className: "nc-user",
            title: exp ? tr("Log in") : void 0,
            ...!exp ? tipProps(tr("Log in")) : {},
            onClick: () => setUserMenuOpen((o) => !o),
            children: [
              /* @__PURE__ */ jsx3("span", { className: "ua", style: { background: "transparent" }, children: /* @__PURE__ */ jsx3(LogIn, { size: 17, strokeWidth: 1.7 }) }),
              exp && /* @__PURE__ */ jsx3("span", { className: "um nc-hide-collapsed", children: /* @__PURE__ */ jsx3("span", { className: "n", children: tr("Log in") }) }),
              exp && /* @__PURE__ */ jsx3("span", { className: "uk nc-hide-collapsed", children: /* @__PURE__ */ jsx3(MoreVertical, { size: 16 }) })
            ]
          }
        ) : /* @__PURE__ */ jsxs2("button", { className: "nc-user", title: exp ? userName : void 0, ...!exp ? tipProps(userName) : {}, onClick: () => setUserMenuOpen((o) => !o), children: [
          /* @__PURE__ */ jsx3("span", { className: "ua", style: { background: userImage ? "transparent" : colorFromName(userName) }, children: userImage ? /* @__PURE__ */ jsx3("img", { src: userImage, alt: "" }) : userAbbr }),
          exp && /* @__PURE__ */ jsxs2("span", { className: "um nc-hide-collapsed", children: [
            /* @__PURE__ */ jsx3("span", { className: "n", children: userName }),
            /* @__PURE__ */ jsx3("span", { className: "e", children: boot?.user?.email || "" })
          ] }),
          exp && /* @__PURE__ */ jsx3("span", { className: "uk nc-hide-collapsed", children: /* @__PURE__ */ jsx3(MoreVertical, { size: 16 }) })
        ] })
      ] })
    ] });
  };
  const effExpanded = narrow ? false : expanded;
  const sideClass = cn("nc-side", effExpanded ? "expanded" : "collapsed", "responsive");
  const mobileBar = /* @__PURE__ */ jsxs2("div", { className: "nc-mobilebar", children: [
    /* @__PURE__ */ jsx3("button", { className: "nc-iconbtn", "aria-label": tr("Open navigation"), onClick: () => setMobileOpen(true), children: /* @__PURE__ */ jsx3(Menu, { size: 20 }) }),
    /* @__PURE__ */ jsx3(LogoLink, { onClick: goHome, height: 18 }),
    /* @__PURE__ */ jsxs2(
      "button",
      {
        className: "nc-mobilesearch",
        "aria-label": tr("Search\u2026"),
        onClick: () => {
          if (onSearch) onSearch();
          else setMobileOpen(true);
        },
        children: [
          /* @__PURE__ */ jsx3(Search2, { size: 16, strokeWidth: 1.7 }),
          /* @__PURE__ */ jsx3("span", { className: "ph", children: tr("Search\u2026") })
        ]
      }
    ),
    !simpleChrome && /* @__PURE__ */ jsxs2("button", { className: "nc-iconbtn nc-bell", title: tr("Notifications"), onClick: triggerBell, children: [
      /* @__PURE__ */ jsx3(Bell, { size: 18 }),
      /* @__PURE__ */ jsx3("span", { className: "pip nc-bell-pip" })
    ] })
  ] });
  const desktopAside = /* @__PURE__ */ jsx3("aside", { className: sideClass, style: { width: effExpanded ? "var(--nc-w-expanded)" : "var(--nc-w-collapsed)" }, children: sidebarBody() });
  const drawer = /* @__PURE__ */ jsxs2(Fragment3, { children: [
    /* @__PURE__ */ jsx3("div", { className: cn("nc-overlay", mobileOpen && "open"), onClick: () => setMobileOpen(false) }),
    /* @__PURE__ */ jsx3("div", { className: cn("nc-drawer", mobileOpen && "open"), children: /* @__PURE__ */ jsx3("aside", { className: "nc-side expanded", children: sidebarBody(true) }) })
  ] });
  const tooltipNode = tip ? /* @__PURE__ */ jsxs2("div", { className: "nc-tooltip", style: { left: tip.x, top: tip.y }, children: [
    /* @__PURE__ */ jsx3("span", { className: "tt", children: tip.text }),
    tip.sub && /* @__PURE__ */ jsx3("span", { className: "ts", children: tip.sub })
  ] }, tip.text + ":" + Math.round(tip.y)) : null;
  const showPanels = openPanel && (spaPanels || openPanel === "mailmenu" || openPanel === "mail" || openPanel === "favorites" || openPanel === "events");
  const anchorLeft = (() => {
    if (typeof document === "undefined") return expanded ? 268 : 90;
    const aside = document.querySelector(".nc-side");
    return aside ? Math.round(aside.getBoundingClientRect().right) + 10 : effExpanded ? 268 : 90;
  })();
  const flyoutNode = flyout ? /* @__PURE__ */ jsxs2(
    "div",
    {
      className: "nc-flyout",
      ref: flyRef,
      style: { left: anchorLeft, top: Math.max(60, flyout.top - 8) },
      onMouseEnter: flyKeep,
      onMouseLeave: flyClose,
      children: [
        /* @__PURE__ */ jsx3("div", { className: "fh", children: flyout.app.app_title }),
        flyout.items.map((ws) => {
          const wsLabel = stripModulePrefix(ws.label || tr(ws.title || ws.name), flyout.app.app_title);
          return /* @__PURE__ */ jsx3(
            "button",
            {
              className: cn("fi", isWsActive(ws) && "on"),
              onClick: () => {
                setFlyout(null);
                goWorkspace(ws);
              },
              children: wsLabel
            },
            ws.name
          );
        })
      ]
    }
  ) : null;
  const panelsNode = showPanels ? /* @__PURE__ */ jsxs2("div", { className: "nc-spa-panel-anchor", style: { left: anchorLeft }, children: [
    openPanel === "bell" && /* @__PURE__ */ jsx3(NotificationsPanel, { tr, onClose: () => setOpenPanel(null) }),
    openPanel === "synk" && /* @__PURE__ */ jsx3(
      SynkPanel,
      {
        tr,
        userInfo: boot?.user_info || {},
        onClose: () => setOpenPanel(null)
      }
    ),
    openPanel === "help" && /* @__PURE__ */ jsx3(HelpPanel, { tr, wikiUrl, onClose: () => setOpenPanel(null) }),
    openPanel === "mailmenu" && /* @__PURE__ */ jsx3(
      MailMenu,
      {
        tr,
        onSynk: onSynk ? () => {
          setOpenPanel(null);
          onSynk();
        } : spaPanels ? () => setOpenPanel("synk") : null,
        onMail: () => setOpenPanel("mail"),
        onConfigure: () => {
          setOpenPanel(null);
          navigate("/app/webmail");
        },
        onClose: () => setOpenPanel(null)
      }
    ),
    openPanel === "favorites" && /* @__PURE__ */ jsx3(
      FavoritesPanel,
      {
        tr,
        favorites,
        onNavigate: (r) => {
          setOpenPanel(null);
          navigate(r);
        },
        onRemove: (f) => {
          apiPost("neoffice_theme.cockpit_favorites.toggle_favorite", { route: f.route }).then(() => window.dispatchEvent(new CustomEvent("nf-favorites-changed")));
        },
        onClose: () => setOpenPanel(null)
      }
    ),
    openPanel === "mail" && /* @__PURE__ */ jsx3(
      MailPanel,
      {
        tr,
        onOpenWebmail: (q) => {
          setOpenPanel(null);
          if (q) window.location.href = "/app/webmail" + q;
          else navigate("/app/webmail");
        },
        onClose: () => setOpenPanel(null)
      }
    ),
    openPanel === "events" && /* @__PURE__ */ jsx3(
      EventsPanel,
      {
        tr,
        events,
        reminders,
        onNavigate: (r) => {
          setOpenPanel(null);
          navigate(r);
        },
        onClose: () => setOpenPanel(null)
      }
    )
  ] }) : null;
  if (layout === "sidebar") {
    return /* @__PURE__ */ jsxs2("div", { className: cn("neocockpit", className), ref: rootRef, style: { display: "contents" }, children: [
      mobileBar,
      desktopAside,
      drawer,
      tooltipNode,
      panelsNode,
      flyoutNode
    ] });
  }
  return /* @__PURE__ */ jsxs2("div", { className: cn("neocockpit nc-frame", className), ref: rootRef, children: [
    mobileBar,
    desktopAside,
    children !== void 0 && /* @__PURE__ */ jsx3("main", { className: "nc-panel", children }),
    drawer,
    tooltipNode,
    panelsNode,
    flyoutNode
  ] });
}
var NeoCockpit_default = NeoCockpit;

// src/FrappeSidebar.tsx
import { useState as useState3, useEffect as useEffect3, useMemo as useMemo2, useCallback as useCallback3 } from "react";
import {
  Activity as Activity2,
  ArrowLeft,
  ArrowRight as ArrowRight2,
  Award as Award2,
  Banknote as Banknote2,
  BarChart2 as BarChart22,
  BarChart3 as BarChart32,
  BookOpen as BookOpen2,
  Briefcase as Briefcase2,
  Building2 as Building22,
  Calculator as Calculator2,
  Calendar as Calendar2,
  CalendarDays as CalendarDays3,
  CheckSquare as CheckSquare2,
  ChevronDown as ChevronDown2,
  Circle as Circle2,
  DollarSign as DollarSign2,
  Edit as Edit2,
  ExternalLink as ExternalLink3,
  Factory as Factory2,
  FileCheck as FileCheck2,
  FileText as FileText2,
  Filter as Filter2,
  FolderOpen as FolderOpen2,
  Globe as Globe2,
  GraduationCap as GraduationCap2,
  HandCoins as HandCoins2,
  Headphones as Headphones2,
  Home as Home2,
  Image as Image2,
  Landmark as Landmark2,
  Layers as Layers2,
  LayoutGrid as LayoutGrid2,
  ListChecks as ListChecks2,
  ListOrdered as ListOrdered2,
  Maximize as Maximize2,
  MapPin as MapPin2,
  Menu as Menu2,
  MessageSquare as MessageSquare2,
  Minimize as Minimize2,
  Moon as Moon2,
  Package as Package2,
  PieChart as PieChart2,
  Plus as Plus2,
  Receipt as Receipt2,
  RefreshCw as RefreshCw2,
  Scale as Scale2,
  Settings as Settings2,
  ShoppingBag as ShoppingBag2,
  ShoppingCart as ShoppingCart2,
  SlidersHorizontal as SlidersHorizontal2,
  Star as Star2,
  Store as Store2,
  Sun,
  Tag as Tag2,
  Target as Target2,
  TrendingDown as TrendingDown2,
  TrendingUp as TrendingUp2,
  Trophy as Trophy2,
  UserCheck as UserCheck2,
  Users as Users2,
  Wallet as Wallet2,
  Warehouse as Warehouse2,
  Wrench as Wrench2,
  Eye as Eye2,
  EyeOff as EyeOff2,
  UserPlus as UserPlus2,
  Share2 as Share22
} from "lucide-react";
import { Fragment as Fragment4, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var FiduciaryIcon2 = (props) => /* @__PURE__ */ jsxs3("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", ...props, children: [
  /* @__PURE__ */ jsx4("path", { d: "M16 10H4V6h11a1 1 0 0 1 1 1v3z", opacity: ".5" }),
  /* @__PURE__ */ jsx4("path", { d: "M21 18H4v-8h17a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z" }),
  /* @__PURE__ */ jsx4("path", { d: "M3 22a1 1 0 0 1-1-.999V3a1 1 0 0 1 2 0v18a1 1 0 0 1-.999 1H3z", opacity: ".25" })
] });
var lucideIconMap2 = {
  "activity": Activity2,
  "banknote": Banknote2,
  "bar-chart-2": BarChart22,
  "bar-chart-3": BarChart32,
  "book-open": BookOpen2,
  "briefcase": Briefcase2,
  "building-2": Building22,
  "calculator": Calculator2,
  "calendar-days": CalendarDays3,
  "chart-pie": PieChart2,
  "credit-card": Banknote2,
  "factory": Factory2,
  "fiduciary": FiduciaryIcon2,
  "file-text": FileText2,
  "globe": Globe2,
  "graduation-cap": GraduationCap2,
  "hand-coins": HandCoins2,
  "headphones": Headphones2,
  "home": Home2,
  "landmark": Landmark2,
  "layout-grid": LayoutGrid2,
  "life-buoy": Headphones2,
  "list-checks": ListChecks2,
  "package": Package2,
  "pie-chart": PieChart2,
  "receipt": Receipt2,
  "scale": Scale2,
  "settings": Settings2,
  "shopping-bag": ShoppingBag2,
  "shopping-cart": ShoppingCart2,
  "sliders-horizontal": SlidersHorizontal2,
  "star": Star2,
  "store": Store2,
  "tag": Tag2,
  "trending-up": TrendingUp2,
  "trophy": Trophy2,
  "user-check": UserCheck2,
  "users": Users2,
  "wallet": Wallet2,
  "warehouse": Warehouse2,
  "wrench": Wrench2,
  // //// Neoffice: calendar/meet sidebar icons (visibility toggle, create, share) ////
  "eye": Eye2,
  "eye-off": EyeOff2,
  "plus": Plus2,
  "user-plus": UserPlus2,
  "share-2": Share22,
  "calendar": Calendar2,
  "calendar-plus": Plus2
};
var legacyIconMap2 = {
  "accounting": Calculator2,
  "income": TrendingUp2,
  "expenses": TrendingDown2,
  "assets": Briefcase2,
  "receivables": ArrowRight2,
  "payables": ArrowLeft,
  "money-coins-1": DollarSign2,
  "sell": ShoppingCart2,
  "selling": ShoppingCart2,
  "buying": Package2,
  "crm": Target2,
  "customer": Users2,
  "users": Users2,
  "stock": Package2,
  "organization": Factory2,
  "manufacturing": Factory2,
  "tag": Tag2,
  "hr": Users2,
  "assign": Users2,
  "project": FolderOpen2,
  "list": ListOrdered2,
  "support": Headphones2,
  "quality": Award2,
  "setting": Settings2,
  "settings": Settings2,
  "tool": Wrench2,
  "integration": Layers2,
  "getting-started": Star2,
  "file": FileText2,
  "folder-normal": FolderOpen2,
  "filter": Filter2,
  "edit": Edit2,
  "add": Plus2,
  "menu": Menu2,
  "down": ChevronDown2,
  "message-1": MessageSquare2,
  "external-link": ExternalLink3,
  "image": Image2,
  "website": Globe2,
  "web": Globe2,
  "education": BookOpen2,
  "refresh": RefreshCw2,
  "map": MapPin2,
  "star": Star2,
  "milestone": FileCheck2,
  "mark-as-read": CheckSquare2,
  "group-by": LayoutGrid2,
  "table": LayoutGrid2,
  "change": RefreshCw2,
  "non-profit": Calendar2,
  "default": Circle2
};
var SidebarButton = ({
  className,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState3(false);
  return /* @__PURE__ */ jsx4(
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
  const [pinned, setPinned] = useState3(() => {
    const saved = localStorage.getItem("frappe-sidebar-pinned");
    return saved ? JSON.parse(saved) : false;
  });
  const [hoverExpanded, setHoverExpanded] = useState3(false);
  const [workspaces, setWorkspaces] = useState3([]);
  const [apps, setApps] = useState3([]);
  const [currentApp, setCurrentApp] = useState3(() => {
    return localStorage.getItem("frappe-sidebar-current-app") || "";
  });
  const [appMenuOpen, setAppMenuOpen] = useState3(false);
  const [interfaceMode, setInterfaceMode] = useState3(() => {
    const boot = window.frappe?.boot;
    return boot?.neoffice_settings?.interface_mode || boot?.user?.view_interface || "Advanced";
  });
  const [isDark, setIsDark] = useState3(() => {
    return document.documentElement.getAttribute("data-theme") === "dark";
  });
  const [isFullscreen, setIsFullscreen] = useState3(false);
  const isSimple = interfaceMode === "Simple" || interfaceMode === "Simplified";
  const expanded = pinned || hoverExpanded;
  useEffect3(() => {
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
  useEffect3(() => {
    if (currentApp) {
      localStorage.setItem("frappe-sidebar-current-app", currentApp);
    }
  }, [currentApp]);
  useEffect3(() => {
    localStorage.setItem("frappe-sidebar-pinned", JSON.stringify(pinned));
  }, [pinned]);
  const getIcon2 = (iconName) => {
    if (!iconName) return Circle2;
    if (iconName.startsWith("lucide-")) {
      const name = iconName.slice(7);
      return lucideIconMap2[name] || Circle2;
    }
    return legacyIconMap2[iconName] || Circle2;
  };
  const currentAppData = useMemo2(() => {
    return apps.find((a) => a.app_name === currentApp);
  }, [apps, currentApp]);
  const filteredWorkspaces = useMemo2(() => {
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
  const frappeSetValue = useCallback3((doctype, name, field, value) => {
    return fetch("/api/method/frappe.client.set_value", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //// The desk keeps its token on `frappe.csrf_token`; only the SPA pages set `window.csrf_token`.
        "X-Frappe-CSRF-Token": window.frappe?.csrf_token || window.csrf_token || ""
      },
      body: JSON.stringify({ doctype, name, fieldname: field, value })
    });
  }, []);
  const switchMode = useCallback3((mode) => {
    const dbMode = mode === "Simple" ? "Simplified" : "Advanced";
    setInterfaceMode(mode);
    if (mode === "Simple") {
      document.body.classList.add("simplified_view");
    } else {
      document.body.classList.remove("simplified_view");
    }
    const user = window.frappe?.session?.user || window.frappe?.boot?.user?.name || "";
    frappeSetValue("User", user, "view_interface", dbMode).then(() => {
      window.location.href = "/app/home";
    });
  }, [frappeSetValue]);
  const toggleTheme = useCallback3(() => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDark(!isDark);
    localStorage.setItem("theme_active", newTheme);
    const cap = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
    const user = window.frappe?.session?.user || window.frappe?.boot?.user?.name || "";
    frappeSetValue("User", user, "desk_theme", cap).then(() => {
      window.location.reload();
    });
  }, [isDark, frappeSetValue]);
  const toggleFullscreen = useCallback3(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);
  const appLogoUrl = logoUrl || currentAppData?.app_logo_url;
  const sidebarContent = /* @__PURE__ */ jsxs3(Fragment4, { children: [
    /* @__PURE__ */ jsxs3("div", { className: "p-2 relative", children: [
      /* @__PURE__ */ jsxs3("div", { className: cn(
        "w-full flex items-center gap-2 p-1.5 rounded-lg",
        expanded ? "justify-start" : "justify-center"
      ), children: [
        /* @__PURE__ */ jsx4(
          "div",
          {
            className: "w-8 h-8 flex items-center justify-center flex-shrink-0",
            onClick: navigateToDesk,
            style: { cursor: "pointer" },
            children: appLogoUrl ? /* @__PURE__ */ jsx4(
              "img",
              {
                src: appLogoUrl,
                alt: "",
                className: "w-8 h-8 object-contain",
                style: { pointerEvents: "none" }
              }
            ) : /* @__PURE__ */ jsx4(Briefcase2, { className: "w-8 h-8 text-gray-600", strokeWidth: 1.5, style: { pointerEvents: "none" } })
          }
        ),
        expanded && /* @__PURE__ */ jsxs3(
          SidebarButton,
          {
            onClick: () => setAppMenuOpen(!appMenuOpen),
            className: "flex items-center gap-2 flex-1",
            children: [
              /* @__PURE__ */ jsx4(
                "span",
                {
                  className: "truncate flex-1 text-left",
                  style: { fontWeight: 500, lineHeight: "16.1px" },
                  children: currentAppData?.app_title || "ERPNext"
                }
              ),
              /* @__PURE__ */ jsx4(ChevronDown2, { className: cn(
                "w-4 h-4 text-gray-400 transition-transform",
                appMenuOpen && "rotate-180"
              ), strokeWidth: 1.5 })
            ]
          }
        )
      ] }),
      appMenuOpen && expanded && /* @__PURE__ */ jsxs3(
        "div",
        {
          className: "absolute right-2 top-14 bg-white border border-gray-200 shadow-lg z-50 py-1 overflow-y-auto",
          style: { left: "8px", borderRadius: "0.65em" },
          children: [
            apps.map((app) => /* @__PURE__ */ jsxs3(
              SidebarButton,
              {
                onClick: () => navigateToApp(app),
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                style: app.app_name === currentApp ? { backgroundColor: "#f9fafb" } : void 0,
                children: [
                  /* @__PURE__ */ jsx4("div", { className: "w-5 h-5 flex items-center justify-center flex-shrink-0", children: app.app_logo_url ? /* @__PURE__ */ jsx4("img", { src: app.app_logo_url, alt: "", className: "w-4 h-4 object-contain" }) : /* @__PURE__ */ jsx4(Circle2, { className: "w-3 h-3", strokeWidth: 1.5 }) }),
                  /* @__PURE__ */ jsx4("span", { className: "truncate", children: app.app_title })
                ]
              },
              app.app_name
            )),
            /* @__PURE__ */ jsx4("div", { className: "border-t border-gray-200 my-1" }),
            /* @__PURE__ */ jsxs3(
              SidebarButton,
              {
                onClick: () => {
                  window.location.href = "/";
                },
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                children: [
                  /* @__PURE__ */ jsx4(Globe2, { className: "w-4 h-4", strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsx4("span", { children: "Website" })
                ]
              }
            ),
            /* @__PURE__ */ jsx4("div", { className: "border-t border-gray-200 my-1" }),
            /* @__PURE__ */ jsxs3("div", { className: "px-3 pt-2 pb-2", children: [
              /* @__PURE__ */ jsx4("div", { style: { fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", marginBottom: "6px" }, children: "Interface Mode" }),
              /* @__PURE__ */ jsxs3("div", { className: "flex rounded-lg overflow-hidden", style: { border: "2px solid #3b82f6" }, children: [
                /* @__PURE__ */ jsx4(
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
                /* @__PURE__ */ jsx4(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      switchMode("Advanced");
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
            /* @__PURE__ */ jsxs3("div", { className: "flex gap-2 px-3 pb-2", children: [
              /* @__PURE__ */ jsxs3(
                SidebarButton,
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    toggleTheme();
                  },
                  className: "flex-1 flex items-center justify-center gap-2 py-1.5",
                  children: [
                    isDark ? /* @__PURE__ */ jsx4(Sun, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ jsx4(Moon2, { className: "w-4 h-4", strokeWidth: 1.5 }),
                    /* @__PURE__ */ jsx4("span", { style: { fontSize: "12px" }, children: isDark ? "Light" : "Dark" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx4(
                SidebarButton,
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  },
                  className: "flex items-center justify-center py-1.5 px-3",
                  children: isFullscreen ? /* @__PURE__ */ jsx4(Minimize2, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ jsx4(Maximize2, { className: "w-4 h-4", strokeWidth: 1.5 })
                }
              )
            ] }),
            /* @__PURE__ */ jsx4("div", { className: "border-t border-gray-200 my-1" }),
            /* @__PURE__ */ jsxs3(
              SidebarButton,
              {
                onClick: () => {
                  window.location.href = "/app/settings";
                },
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                children: [
                  /* @__PURE__ */ jsx4(Settings2, { className: "w-4 h-4", strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsx4("span", { children: "Settings" })
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx4("div", { className: "flex-1 overflow-y-auto overflow-x-hidden py-1", children: /* @__PURE__ */ jsx4("div", { className: "flex flex-col gap-0.5 px-2", children: filteredWorkspaces.map((workspace) => {
      const Icon = getIcon2(workspace.icon);
      return /* @__PURE__ */ jsxs3(
        SidebarButton,
        {
          onClick: () => navigateToWorkspace(workspace),
          className: cn(
            "w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900",
            expanded ? "justify-start" : "justify-center"
          ),
          children: [
            /* @__PURE__ */ jsx4(Icon, { className: "w-4 h-4 flex-shrink-0", strokeWidth: 1.5 }),
            expanded && /* @__PURE__ */ jsx4("span", { className: "truncate", children: workspace.title || workspace.name })
          ]
        },
        workspace.name
      );
    }) }) }),
    /* @__PURE__ */ jsx4("div", { className: "p-2 border-t border-gray-100", children: /* @__PURE__ */ jsxs3(
      SidebarButton,
      {
        onClick: handleCollapseClick,
        className: cn(
          "w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-gray-400",
          expanded ? "justify-start" : "justify-center"
        ),
        children: [
          pinned ? /* @__PURE__ */ jsx4(ArrowLeft, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ jsx4(ArrowRight2, { className: "w-4 h-4", strokeWidth: 1.5 }),
          expanded && /* @__PURE__ */ jsx4("span", { children: pinned ? "Collapse" : "Expand" })
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
    return /* @__PURE__ */ jsxs3(Fragment4, { children: [
      !pinned && /* @__PURE__ */ jsx4("div", { className: "flex-shrink-0", style: { width: "50px" } }),
      /* @__PURE__ */ jsx4(
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
  return /* @__PURE__ */ jsx4(
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
  NeoCockpit_default as NeoCockpit,
  cn
};
//# sourceMappingURL=index.mjs.map