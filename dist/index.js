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
var src_exports = {};
__export(src_exports, {
  FrappeSidebar: () => FrappeSidebar_default,
  NeoCockpit: () => NeoCockpit_default,
  cn: () => cn
});
module.exports = __toCommonJS(src_exports);

// src/NeoCockpit.tsx
var import_react2 = require("react");
var import_lucide_react2 = require("lucide-react");

// src/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/NeoLogo.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  const [count, setCount] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
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
  const [logs, setLogs] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    api(
      "frappe.desk.doctype.notification_log.notification_log.get_notification_logs",
      { limit: "20" }
    ).then((res) => setLogs(res?.notification_logs || []));
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "t", children: tr2("Notifications") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { className: "open", href: "/app/notification-log", title: tr2("Open"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.ExternalLink, { size: 14 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "body", children: [
      logs === null && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "empty", children: "\u2026" }),
      logs !== null && !logs.length && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "empty", children: tr2("No notifications") }),
      (logs || []).map((l) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "a",
        {
          className: cn("row", !l.read && "unread"),
          href: l.document_type && l.document_name ? `/app/${l.document_type.toLowerCase().replace(/ /g, "-")}/${encodeURIComponent(l.document_name)}` : "/app/notification-log",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dot" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "main", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "s", dangerouslySetInnerHTML: { __html: l.subject || "" } }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "m", children: fmtTime(l.creation) })
            ] })
          ]
        },
        l.name
      ))
    ] })
  ] });
}
function useUnreadSynk(enabled) {
  const [count, setCount] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
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
  const [channels, setChannels] = (0, import_react.useState)(null);
  const [dms, setDms] = (0, import_react.useState)([]);
  const [unread, setUnread] = (0, import_react.useState)({});
  (0, import_react.useEffect)(() => {
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
  const row = (c, label, avatar) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("a", { className: "row", href: `/raven/channel/${encodeURIComponent(c.name)}`, children: [
    avatar,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "main", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "s", children: label }),
      last(c) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "m", children: last(c) })
    ] }),
    unread[c.name] ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "badge", children: unread[c.name] }) : null
  ] }, c.name);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "t", style: { fontFamily: '"Cal Sans", inherit' }, children: "synk" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { className: "open", href: "/raven", title: tr2("Open"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.ExternalLink, { size: 14 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "body", children: [
      channels === null && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "empty", children: "\u2026" }),
      channels !== null && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        channels.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "sect", children: tr2("Channels") }),
        channels.map((c) => row(
          c,
          c.channel_name || c.name,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "av sq", children: "#" })
        )),
        dms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "sect", children: tr2("Direct messages") }),
        dms.map((c) => {
          const peer = c.peer_user_id || "";
          const pretty = peer.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());
          const name = userInfo[peer]?.fullname || pretty || c.channel_name || "";
          return row(
            c,
            name,
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "av", children: (name[0] || "?").toUpperCase() })
          );
        }),
        !channels.length && !dms.length && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "empty", children: tr2("No conversations") })
      ] })
    ] })
  ] });
}
function MailMenu({ tr: tr2, onSynk, onMail, onConfigure, onClose }) {
  const [mailState, setMailState] = (0, import_react.useState)("loading");
  const [synkCount, setSynkCount] = (0, import_react.useState)(0);
  const [mailCount, setMailCount] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    if (onSynk) {
      api(
        "raven.api.raven_message.get_unread_count_for_channels"
      ).then((res) => setSynkCount((res || []).reduce((a, c) => a + (c.unread_count || 0), 0)));
    }
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "nc-spa-panel nc-mini", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "t", children: tr2("Messages") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "body", children: [
      onSynk && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "row", onClick: onSynk, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "av sq", children: "#" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "main", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "s", style: { fontFamily: '"Cal Sans", inherit' }, children: "synk" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "m", children: tr2("Team messaging") })
        ] }),
        synkCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "badge", children: synkCount })
      ] }),
      mailState === "ready" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "row", onClick: onMail, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "av", children: "@" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "main", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "s", children: tr2("Email") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "m", children: tr2("Inbox") })
        ] }),
        mailCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "badge", children: mailCount })
      ] }),
      mailState === "none" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "row", onClick: onConfigure, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "av", children: "@" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "main", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "s", children: tr2("Email") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "m", children: tr2("Set up an email address") })
        ] })
      ] })
    ] })
  ] });
}
function MailPanel({ tr: tr2, onOpenWebmail, onClose }) {
  const [state, setState] = (0, import_react.useState)("loading");
  const [emails, setEmails] = (0, import_react.useState)([]);
  const [account, setAccount] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "t", children: tr2("Email") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "body", children: [
      state === "loading" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "empty", children: "\u2026" }),
      state === "none" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "empty", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { style: { margin: "6px 0 14px" }, children: tr2("No email account configured yet.") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "cta", onClick: () => onOpenWebmail(), children: tr2("Set up an email address") })
      ] }),
      state === "ready" && !emails.length && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "empty", children: tr2("Inbox is empty") }),
      state === "ready" && emails.map((e) => {
        const who = e.from_name || e.from_email || "?";
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            className: cn("row", !e.seen && "unread"),
            onClick: () => onOpenWebmail(`?account=${encodeURIComponent(account)}&folder=INBOX&uid=${e.uid}`),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dot" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "av", children: (who[0] || "?").toUpperCase() }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "main", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "s", children: e.subject || tr2("(no subject)") }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "m", children: [
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
    state !== "loading" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "foot mail-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("a", { className: "wiki accent", onClick: () => onOpenWebmail("?compose=1"), style: { cursor: "pointer" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.SquarePen, { size: 14 }),
        " ",
        tr2("New email")
      ] }),
      state === "ready" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("a", { className: "wiki", onClick: () => onOpenWebmail(), style: { cursor: "pointer" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.ExternalLink, { size: 14 }),
        " ",
        tr2("Open the webmail")
      ] })
    ] })
  ] });
}
function HelpPanel({ tr: tr2, wikiUrl, onClose }) {
  const [results, setResults] = (0, import_react.useState)(null);
  const timer = (0, import_react.useRef)();
  const search = (0, import_react.useCallback)((q) => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "t", children: tr2("Help & Training") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "searchbox", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Search, { size: 15, strokeWidth: 1.8 }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { placeholder: tr2("Search the wiki..."), onChange: (e) => search(e.target.value), autoFocus: true })
      ] }),
      results !== null && !results.length && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "empty", children: tr2("No wiki page found") }),
      (results || []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("a", { className: "row", href: r.url || wikiUrl, target: "_blank", rel: "noopener", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "main", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "s link", children: r.title || r.name }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.ExternalLink, { size: 13, className: "arr" })
      ] }, r.name))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "foot", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("a", { className: "wiki", href: wikiUrl, target: "_blank", rel: "noopener", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.ExternalLink, { size: 14 }),
      " ",
      tr2("Open the Neoffice wiki")
    ] }) })
  ] });
}
async function fetchFavorites() {
  return await api("neoffice_theme.cockpit_favorites.get_favorites") || [];
}
function FavoritesPanel({ tr: tr2, favorites, onNavigate, onRemove, onClose }) {
  const [q, setQ] = (0, import_react.useState)("");
  const TYPE_HINT = {
    Workspace: tr2("Workspace"),
    List: tr2("List"),
    Form: tr2("Document"),
    Report: tr2("Report"),
    Page: tr2("Page")
  };
  const list = q ? favorites.filter((f) => (f.label + " " + (f.fav_type || "")).toLowerCase().includes(q.toLowerCase())) : favorites;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "nc-spa-panel", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "t", children: tr2("Favorites") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "x", onClick: onClose, children: "\xD7" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "body", children: [
      favorites.length > 6 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "searchbox", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Search, { size: 15, strokeWidth: 1.8 }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { placeholder: tr2("Filter\u2026"), value: q, onChange: (e) => setQ(e.target.value), autoFocus: true })
      ] }),
      !list.length && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "empty", children: tr2("No favorites yet \u2014 star a page to pin it here.") }),
      list.map((f) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "row fav-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "main fav-go", onClick: () => onNavigate(f.route), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "s", children: f.label }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "m", children: TYPE_HINT[f.fav_type || ""] || f.fav_type || "" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "fav-x", title: tr2("Remove"), onClick: () => onRemove(f), children: "\xD7" })
      ] }, f.name))
    ] })
  ] });
}

// src/noraLoader.ts
var loadingChain = null;
var loadScript = (src) => new Promise((resolve, reject) => {
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
  f.require = f.require || ((srcs, cb) => Promise.all((Array.isArray(srcs) ? srcs : [srcs]).map(loadScript)).then(() => cb && cb()));
}
function openNoraQuickChat() {
  const w = window;
  if (!loadingChain) {
    loadingChain = (async () => {
      try {
        if (!w.$ || !w.jQuery) await loadScript("/assets/frappe/js/lib/jquery/jquery.min.js");
        installShims(w);
        loadCss("/assets/nora/css/nora_voice_overlay.css?v=2");
        loadCss("/assets/nora/css/nora_quick_chat.css?v=23");
        await loadScript("/assets/nora/js/nora_quick_chat.js?v=45");
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
styleInject('.neocockpit {\n  --nc-accent: #4e72ac;\n  --nc-accent-deep: #3d5c8c;\n  --nc-accent-soft: #e3ebf6;\n  --nc-accent-tint: #f1f5fb;\n  --nc-on-accent: #ffffff;\n  --nc-page: var(--bg-color, #f4f5f6);\n  --nc-surface: var(--card-bg, #ffffff);\n  --nc-sunken: var(--control-bg, #f1f3f5);\n  --nc-deep: var(--gray-200, #e9ecef);\n  --nc-ink: var(--text-color, #1f272e);\n  --nc-ink-soft: var(--text-light, #4c5a67);\n  --nc-ink-mute: var(--text-muted, #8d99a6);\n  --nc-line: var(--border-color, #e2e6e9);\n  --nc-line-soft:var(--border-color, #eef0f2);\n  --nc-line-strong: var(--gray-400, #c0c8ce);\n  --nc-sage: #4f8a6e;\n  --nc-sage-soft: #dcefe4;\n  --nc-ochre: #a98233;\n  --nc-ochre-soft:#f1e6c8;\n  --nc-font-sans:\n    "Manrope",\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  --nc-font-mono:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  --nc-r-lg: 18px;\n  --nc-r-md: 14px;\n  --nc-r-sm: 10px;\n  --nc-r-pill: 999px;\n  --nc-w-expanded: 256px;\n  --nc-w-collapsed: 76px;\n  font-family: var(--nc-font-sans);\n  font-size: 13px;\n  color: var(--nc-ink);\n  -webkit-font-smoothing: antialiased;\n}\n.neocockpit *,\n.neocockpit *::before,\n.neocockpit *::after {\n  box-sizing: border-box;\n}\n.neocockpit button {\n  font-family: inherit;\n  cursor: pointer;\n  border: 0;\n  background: transparent;\n  color: inherit;\n}\n[data-theme=dark] .neocockpit {\n  --nc-accent-soft: color-mix(in srgb, var(--nc-accent) 26%, transparent);\n  --nc-accent-tint: color-mix(in srgb, var(--nc-accent) 14%, transparent);\n  --nc-page: var(--bg-color, #14181c);\n  --nc-surface: var(--card-bg, #1c2127);\n  --nc-sunken: var(--control-bg, #232a31);\n  --nc-deep: var(--gray-800, #2b333b);\n  --nc-ink: var(--text-color, #e9edf0);\n  --nc-ink-soft: var(--text-light, #aeb8c2);\n  --nc-ink-mute: var(--text-muted, #7a8794);\n  --nc-line: var(--border-color, #2a323a);\n  --nc-line-soft:var(--border-color, #232a31);\n  --nc-line-strong: var(--gray-600, #46505a);\n}\n.nc-frame {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  height: 100vh;\n  width: 100%;\n  background: var(--nc-page);\n  padding: 8px;\n  gap: 8px;\n  overflow: hidden;\n}\n.nc-panel {\n  flex: 1;\n  min-width: 0;\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  border-radius: 18px;\n  box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset, 0 8px 30px rgba(20, 30, 50, .06);\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.nc-side {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  padding: 6px 4px 4px;\n  background: transparent;\n  transition: width .25s cubic-bezier(.2, .7, .2, 1);\n  flex-shrink: 0;\n}\n.nc-side.expanded {\n  width: var(--nc-w-expanded);\n}\n.nc-side.collapsed {\n  width: var(--nc-w-collapsed);\n  align-items: center;\n}\n.nc-top {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  padding: 12px 10px 10px;\n}\n.nc-top .nc-logo-slot {\n  display: flex;\n  align-items: center;\n  margin-right: auto;\n}\n.nc-side.collapsed .nc-top {\n  flex-direction: column;\n  height: auto;\n  gap: 10px;\n  padding: 10px 0 2px;\n}\n.nc-side.collapsed .nc-top .nc-logo-slot {\n  margin-right: 0;\n  margin-bottom: 2px;\n  order: -1;\n}\n.nc-side.expanded .nc-top.nc-actions {\n  flex-wrap: wrap;\n  row-gap: 8px;\n  justify-content: space-between;\n  padding: 12px 14px 8px;\n}\n.nc-side.expanded .nc-top.nc-actions .nc-logo-slot {\n  flex: 0 0 100%;\n  margin-right: 0;\n  margin-bottom: 2px;\n}\n.nc-top .nc-iconbtn {\n  width: 30px;\n  height: 30px;\n  flex-shrink: 0;\n  border: none;\n  border-radius: 9px;\n  background: transparent;\n  color: var(--nc-ink);\n}\n.nc-top .nc-iconbtn > svg {\n  width: 18px;\n  height: 18px;\n}\n.nc-top .nc-iconbtn:hover {\n  background: var(--nc-deep);\n}\n.nc-top .nc-iconbtn.nc-nora {\n  color: var(--nc-accent);\n}\n.nc-top .nc-iconbtn.nc-nora:hover {\n  background: var(--nc-accent-soft);\n}\n.nc-iconbtn .nc-count {\n  position: absolute;\n  top: -3px;\n  right: -4px;\n  min-width: 15px;\n  height: 15px;\n  padding: 0 4px;\n  border-radius: 999px;\n  background: #b4533a;\n  color: #fff;\n  font-size: 9.5px;\n  font-weight: 700;\n  line-height: 15px;\n  text-align: center;\n  box-shadow: 0 0 0 2px var(--nc-page);\n}\n.nc-iconbtn .nc-count:empty {\n  display: none;\n}\n.nc-collapse {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  width: 100%;\n  padding: 8px 12px;\n  margin-bottom: 2px;\n  border: none;\n  background: transparent;\n  border-radius: 10px;\n  color: var(--nc-ink-mute);\n  font-size: 12.5px;\n  font-weight: 500;\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.nc-collapse:hover {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n}\n.nc-side.collapsed .nc-collapse {\n  width: 38px;\n  justify-content: center;\n  padding: 8px 0;\n}\n.nc-iconbtn .nc-bell-pip {\n  display: none;\n}\n.nc-iconbtn.has-unseen .nc-bell-pip {\n  display: block;\n}\n.nc-top .softphone-nav-item {\n  position: relative;\n  display: grid;\n  place-items: center;\n  padding: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 9px;\n}\n.nc-top .softphone-nav-item:hover {\n  background: var(--nc-deep);\n}\n.nc-top .softphone-nav-item .softphone-trigger {\n  padding: 0 !important;\n}\n.nc-top .softphone-nav-item .softphone-icon-wrapper {\n  width: 18px;\n  height: 18px;\n  position: static !important;\n}\n.nc-top .softphone-nav-item svg {\n  display: block;\n  width: 18px;\n  height: 18px;\n}\n.nc-top .softphone-nav-item .softphone-status-dot {\n  position: absolute;\n  bottom: 2px;\n  right: 1px;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  box-shadow: 0 0 0 2px var(--nc-page);\n}\n.nc-top .nc-iconbtn.nc-more {\n  display: none;\n}\n.nc-side.collapsed .nc-top .nc-iconbtn.nc-more {\n  display: grid;\n}\n.nc-side.collapsed .nc-top .nc-nora {\n  order: 0;\n}\n.nc-side.collapsed .nc-top .nc-bell {\n  order: 1;\n}\n.nc-side.collapsed .nc-top .nc-more {\n  order: 2;\n}\n.nc-side.collapsed .nc-top .nc-synk {\n  order: 3;\n}\n.nc-side.collapsed .nc-top .softphone-nav-item {\n  order: 4;\n}\n.nc-side.collapsed .nc-top .nc-help {\n  order: 5;\n}\n.nc-side.collapsed .nc-top.nc-actions-folded .nc-synk,\n.nc-side.collapsed .nc-top.nc-actions-folded .softphone-nav-item,\n.nc-side.collapsed .nc-top.nc-actions-folded .nc-help {\n  display: none;\n}\n.nc-more .nc-more-pip {\n  display: none;\n}\n.nc-top.nc-actions-folded .nc-more .nc-more-pip.show {\n  display: block;\n}\n.nc-logo {\n  color: var(--nc-ink);\n  cursor: pointer;\n  flex-shrink: 0;\n  display: block;\n}\n.nc-logo .st1 {\n  fill: currentColor;\n}\n.nc-logo .st0 {\n  fill: var(--nc-page);\n}\n.nc-top .grow {\n  flex: 1;\n}\n.nc-iconbtn {\n  width: 38px;\n  height: 38px;\n  border-radius: var(--nc-r-pill);\n  display: grid;\n  place-items: center;\n  color: var(--nc-ink-soft);\n  border: 1px solid transparent;\n  position: relative;\n  transition:\n    background .14s,\n    border-color .14s,\n    color .14s;\n}\n.nc-iconbtn:hover {\n  background: var(--nc-surface);\n  border-color: var(--nc-line);\n  color: var(--nc-ink);\n}\n.nc-iconbtn.ring {\n  border-color: var(--nc-line);\n}\n.nc-iconbtn .pip {\n  position: absolute;\n  top: 6px;\n  right: 7px;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--nc-accent);\n  box-shadow: 0 0 0 2px var(--nc-page);\n}\n.nc-side.collapsed .nc-hide-collapsed {\n  display: none;\n}\n.nc-switch {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 9px 11px;\n  margin: 8px 0 12px;\n  width: 100%;\n  border-radius: var(--nc-r-md);\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  transition: border-color .14s;\n  text-align: left;\n}\n.nc-switch:hover {\n  border-color: var(--nc-line-strong);\n}\n.nc-switch .sq {\n  width: 36px;\n  height: 36px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  background: var(--nc-deep);\n  color: var(--nc-ink-soft);\n  display: grid;\n  place-items: center;\n  font-weight: 700;\n  font-size: 13px;\n  overflow: hidden;\n}\n.nc-switch .sq img {\n  width: 22px;\n  height: 22px;\n  object-fit: contain;\n}\n.nc-switch .meta {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.nc-switch .meta .n {\n  font-weight: 600;\n  font-size: 13.5px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nc-switch .meta .s {\n  font-size: 11.5px;\n  color: var(--nc-ink-mute);\n}\n.nc-switch .ch {\n  color: var(--nc-ink-mute);\n  flex-shrink: 0;\n}\n.nc-side.collapsed .nc-switch {\n  padding: 0;\n  border: 0;\n  background: transparent;\n  margin: 4px 0 10px;\n  justify-content: center;\n  width: auto;\n}\n.nc-side.collapsed .nc-switch .meta,\n.nc-side.collapsed .nc-switch .ch {\n  display: none;\n}\n.nc-menu {\n  position: absolute;\n  z-index: 1200;\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  border-radius: var(--nc-r-md);\n  box-shadow: 0 10px 30px rgba(20, 30, 50, .14);\n  padding: 6px;\n  min-width: 220px;\n}\n.nc-menu .item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  padding: 8px 10px;\n  border-radius: var(--nc-r-sm);\n  font-size: 13px;\n  color: var(--nc-ink);\n  text-align: left;\n}\n.nc-menu .item:hover {\n  background: var(--nc-sunken);\n}\n.nc-menu .item.active {\n  background: var(--nc-sunken);\n  color: var(--nc-ink);\n  font-weight: 600;\n}\n.nc-menu .uhead {\n  padding: 8px 10px 10px;\n  border-bottom: 1px solid var(--nc-line-soft);\n  margin-bottom: 4px;\n}\n.nc-menu .uhead .n {\n  font-weight: 600;\n  font-size: 13.5px;\n  color: var(--nc-ink);\n}\n.nc-menu .uhead .e {\n  font-size: 11.5px;\n  color: var(--nc-ink-mute);\n}\n.nc-cmode {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 10px;\n}\n.nc-cmode .lbl {\n  font-size: 13px;\n  color: var(--nc-ink);\n}\n.nc-cmode .seg {\n  display: flex;\n  gap: 2px;\n  background: var(--nc-sunken);\n  border-radius: var(--nc-r-pill);\n  padding: 3px;\n}\n.nc-cmode .seg button {\n  width: 30px;\n  height: 26px;\n  border-radius: var(--nc-r-pill);\n  display: grid;\n  place-items: center;\n  color: var(--nc-ink-mute);\n}\n.nc-cmode .seg button.on {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, .14);\n}\n.nc-menu .item img {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n}\n.nc-menu .sep {\n  height: 1px;\n  background: var(--nc-line-soft);\n  margin: 6px 4px;\n}\n.nc-menu .label {\n  font-size: 10.5px;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n  font-weight: 700;\n  padding: 6px 10px 4px;\n}\n.nc-search {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  width: 100%;\n  height: 42px;\n  padding: 0 13px;\n  margin-bottom: 12px;\n  border-radius: var(--nc-r-md);\n  background: var(--nc-sunken);\n  border: 1px solid var(--nc-line);\n  color: var(--nc-ink-mute);\n  font-size: 13px;\n  cursor: text;\n  transition:\n    border-color .14s,\n    background .14s,\n    box-shadow .14s;\n}\n.nc-search:hover {\n  border-color: var(--nc-line-strong);\n}\n.nc-search:focus-within {\n  border-color: var(--nc-line-strong);\n  background: var(--nc-surface);\n  box-shadow: 0 0 0 3px var(--nc-sunken);\n}\n.nc-search .si {\n  color: var(--nc-ink-mute);\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n}\n.nc-search input {\n  flex: 1;\n  min-width: 0;\n  border: 0;\n  background: transparent;\n  outline: none;\n  font: inherit;\n  color: var(--nc-ink);\n}\n.nc-search input::placeholder {\n  color: var(--nc-ink-mute);\n}\n.nc-search .kbd {\n  font: 10.5px var(--nc-font-mono);\n  color: var(--nc-ink-mute);\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  border-radius: 5px;\n  padding: 2px 6px;\n  flex-shrink: 0;\n}\n.nc-side.collapsed .nc-search {\n  width: 48px;\n  padding: 0;\n  justify-content: center;\n  cursor: pointer;\n}\n.nc-side.collapsed .nc-search input,\n.nc-side.collapsed .nc-search .kbd {\n  display: none;\n}\n.nc-navlabel {\n  font-size: 10px;\n  letter-spacing: .1em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n  font-weight: 700;\n  padding: 0 10px;\n  margin: 4px 0 7px;\n}\n.nc-side.collapsed .nc-navlabel {\n  display: none;\n}\n.nc-nav {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.nc-nav::-webkit-scrollbar {\n  width: 8px;\n}\n.nc-nav::-webkit-scrollbar-thumb {\n  background: var(--nc-line-strong);\n  border-radius: 6px;\n  border: 2px solid var(--nc-page);\n}\n.nc-navitem {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  height: 44px;\n  padding: 0 13px;\n  border-radius: var(--nc-r-md);\n  border: 1px solid transparent;\n  color: var(--nc-ink-soft);\n  font-size: 14px;\n  font-weight: 500;\n  text-align: left;\n  transition:\n    background .14s,\n    color .14s,\n    border-color .14s;\n}\n.nc-navitem .ni {\n  width: 20px;\n  display: grid;\n  place-items: center;\n  color: var(--nc-ink-mute);\n  flex-shrink: 0;\n}\n.nc-navitem .nl {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nc-navitem:hover {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n}\n.nc-navitem:hover .ni {\n  color: var(--nc-ink-soft);\n}\n.nc-navitem.active {\n  background: var(--nc-surface);\n  border-color: var(--nc-line);\n  color: var(--nc-ink);\n  font-weight: 600;\n}\n.nc-navitem.active .ni {\n  color: var(--nc-ink);\n}\n.nc-side.collapsed .nc-navitem {\n  width: 48px;\n  padding: 0;\n  justify-content: center;\n}\n.nc-side.collapsed .nc-navitem .nl {\n  display: none;\n}\n.nc-group {\n  display: flex;\n  flex-direction: column;\n}\n.nc-sub {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin: 4px 0 6px;\n  padding-left: 38px;\n}\n.nc-sub::before {\n  content: "";\n  position: absolute;\n  left: 23px;\n  top: 2px;\n  bottom: 2px;\n  width: 1px;\n  background: var(--nc-line);\n}\n.nc-subitem {\n  display: block;\n  width: 100%;\n  padding: 7px 10px;\n  border-radius: var(--nc-r-sm);\n  color: var(--nc-ink-mute);\n  font-size: 13.5px;\n  text-align: left;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  transition: background .14s, color .14s;\n}\n.nc-subitem:hover {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n}\n.nc-subitem.on {\n  color: var(--nc-ink);\n  font-weight: 600;\n}\n.nc-foot {\n  margin-top: auto;\n  padding-top: 8px;\n}\n.nc-user {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  width: 100%;\n  padding: 9px 10px;\n  border-radius: var(--nc-r-md);\n  text-align: left;\n}\n.nc-user:hover {\n  background: var(--nc-surface);\n}\n.nc-user .ua {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font-weight: 700;\n  font-size: 12.5px;\n  overflow: hidden;\n}\n.nc-user .ua img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.nc-user .um {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.nc-user .um .n {\n  font-weight: 600;\n  font-size: 13px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nc-user .um .e {\n  font-size: 11px;\n  color: var(--nc-ink-mute);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nc-user .uk {\n  color: var(--nc-ink-mute);\n  flex-shrink: 0;\n}\n.nc-side.collapsed .nc-user {\n  padding: 0;\n  justify-content: center;\n}\n.nc-side.collapsed .nc-user .um,\n.nc-side.collapsed .nc-user .uk {\n  display: none;\n}\n.nc-qs {\n  display: flex;\n  gap: 8px;\n  padding: 6px 4px;\n}\n.nc-qs button {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 7px;\n  border-radius: var(--nc-r-sm);\n  border: 1px solid var(--nc-line);\n  font-size: 12px;\n}\n.nc-qs button:hover {\n  background: var(--nc-sunken);\n}\n.nc-seg {\n  display: flex;\n  background: var(--nc-sunken);\n  border-radius: var(--nc-r-pill);\n  padding: 3px;\n  margin: 4px 10px 8px;\n}\n.nc-seg button {\n  flex: 1;\n  padding: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--nc-ink-mute);\n  border-radius: var(--nc-r-pill);\n}\n.nc-seg button.on {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, .14);\n}\n.nc-seg .lbl {\n  flex: 0 0 auto;\n  align-self: center;\n  padding: 0 8px;\n  color: var(--nc-ink);\n  font-weight: 500;\n}\n.nc-tooltip {\n  position: fixed;\n  transform: translateY(-50%);\n  z-index: 1300;\n  pointer-events: none;\n  background: var(--nc-ink);\n  color: var(--nc-page);\n  font-size: 12.5px;\n  font-weight: 600;\n  padding: 6px 11px;\n  border-radius: 9px;\n  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);\n  white-space: nowrap;\n  animation: nc-tip-in 0.13s cubic-bezier(0.2, 0.7, 0.2, 1);\n}\n@keyframes nc-tip-in {\n  from {\n    opacity: 0;\n    transform: translateY(-50%) translateX(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(-50%) translateX(0);\n  }\n}\n.nc-mobilebar {\n  display: none;\n  align-items: center;\n  gap: 10px;\n  height: 52px;\n  padding: 0 12px;\n  background: var(--nc-surface);\n  border-bottom: 1px solid var(--nc-line);\n  position: sticky;\n  top: 0;\n  z-index: 1005;\n}\n.nc-mobilebar .grow {\n  flex: 1;\n}\n.nc-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, .42);\n  z-index: 1099;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity .2s;\n}\n.nc-overlay.open {\n  opacity: 1;\n  pointer-events: auto;\n}\n.nc-drawer {\n  position: fixed;\n  left: 0;\n  top: 0;\n  height: 100vh;\n  width: min(86vw, 300px);\n  z-index: 1100;\n  transform: translateX(-100%);\n  transition: transform .25s cubic-bezier(.2, .7, .2, 1);\n}\n.nc-drawer.open {\n  transform: translateX(0);\n}\n@media (max-width: 767.98px) {\n  .nc-frame {\n    flex-direction: column;\n    padding: 0;\n    gap: 0;\n  }\n  .nc-side.responsive {\n    display: none;\n  }\n  .nc-mobilebar {\n    display: flex;\n  }\n  .nc-panel {\n    border-radius: 0;\n    border: 0;\n    box-shadow: none;\n  }\n  .nc-drawer .nc-side {\n    display: flex;\n    width: 100%;\n    height: 100vh;\n    box-shadow: none;\n    background: var(--nc-surface);\n    padding: 6px 8px 8px;\n  }\n}\n.nc-spa-panel-anchor {\n  position: fixed;\n  top: 56px;\n  z-index: 1056;\n}\n.nc-spa-panel {\n  width: 400px;\n  max-width: calc(100vw - 110px);\n  max-height: min(76vh, 680px);\n  display: flex;\n  flex-direction: column;\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  border-radius: 16px;\n  box-shadow: 0 18px 50px rgba(0, 0, 0, .18);\n  overflow: hidden;\n}\n.nc-spa-panel .head {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 12px 10px 16px;\n  border-bottom: 1px solid var(--nc-line);\n}\n.nc-spa-panel .head .t {\n  flex: 1;\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--nc-ink);\n}\n.nc-spa-panel .head .open {\n  color: var(--nc-ink-mute);\n  display: grid;\n  place-items: center;\n}\n.nc-spa-panel .head .x {\n  border: none;\n  background: transparent;\n  font-size: 20px;\n  line-height: 1;\n  color: var(--nc-ink-mute);\n  cursor: pointer;\n  flex-shrink: 0;\n  width: 30px;\n  height: 30px;\n  display: grid;\n  place-items: center;\n  border-radius: 8px;\n}\n.nc-spa-panel .head .x:hover {\n  background: var(--nc-deep);\n  color: var(--nc-ink);\n}\n.nc-spa-panel .body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 8px;\n}\n.nc-spa-panel .sect {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: .07em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n  padding: 10px 8px 4px;\n}\n.nc-spa-panel .row {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 9px 8px;\n  border-radius: 10px;\n  color: var(--nc-ink);\n  text-decoration: none;\n  cursor: pointer;\n}\n.nc-spa-panel .row:hover {\n  background: var(--nc-page);\n  text-decoration: none;\n  color: var(--nc-ink);\n}\n.nc-spa-panel .row .av {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n  border-radius: 10px;\n  display: grid;\n  place-items: center;\n  background: var(--nc-page);\n  color: var(--nc-ink-soft);\n  font-size: 13px;\n  font-weight: 700;\n}\n.nc-spa-panel .row .main {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.nc-spa-panel .row .s {\n  font-size: 13.5px;\n  font-weight: 600;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.nc-spa-panel .row .s.link {\n  text-decoration: underline;\n  text-underline-offset: 2px;\n  font-weight: 500;\n}\n.nc-spa-panel .row .s :is(b, strong) {\n  font-weight: 700;\n}\n.nc-spa-panel .row .m {\n  font-size: 11.5px;\n  color: var(--nc-ink-mute);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.nc-spa-panel .row .badge {\n  min-width: 19px;\n  height: 19px;\n  padding: 0 5px;\n  flex-shrink: 0;\n  border-radius: 999px;\n  background: #b4533a;\n  color: #fff;\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 19px;\n  text-align: center;\n}\n.nc-spa-panel .row .dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: transparent;\n  flex-shrink: 0;\n}\n.nc-spa-panel .row.unread .dot {\n  background: var(--nc-accent);\n}\n.nc-spa-panel .row .arr {\n  color: var(--nc-ink-mute);\n  flex-shrink: 0;\n}\n.nc-spa-panel .empty {\n  padding: 18px 10px;\n  font-size: 12.5px;\n  color: var(--nc-ink-mute);\n  text-align: center;\n}\n.nc-spa-panel .searchbox {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 6px 6px 8px;\n  padding: 9px 12px;\n  border-radius: 12px;\n  background: var(--nc-page);\n  color: var(--nc-ink-mute);\n}\n.nc-spa-panel .searchbox input {\n  flex: 1;\n  border: none;\n  background: transparent;\n  outline: none;\n  font-size: 13px;\n  color: var(--nc-ink);\n}\n.nc-spa-panel .foot {\n  padding: 10px 12px 12px;\n  border-top: 1px solid var(--nc-line);\n}\n.nc-spa-panel .foot .wiki {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 10px;\n  border: 1px solid var(--nc-line);\n  border-radius: 999px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--nc-ink);\n  text-decoration: none;\n}\n.nc-spa-panel .foot .wiki:hover {\n  background: var(--nc-page);\n  text-decoration: none;\n}\n.nc-spa-panel .foot.mail-foot {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.nc-spa-panel .foot .wiki.accent {\n  background: #4e72ac;\n  border-color: #4e72ac;\n  color: #fff;\n}\n.nc-spa-panel .foot .wiki.accent:hover {\n  background: #41639a;\n  border-color: #41639a;\n}\n.nc-spa-panel.nc-mini {\n  width: 300px;\n}\n.nc-spa-panel.nc-mini .row {\n  width: 100%;\n  border: none;\n  background: transparent;\n  text-align: left;\n  font-family: inherit;\n}\n.nc-spa-panel .row {\n  width: 100%;\n  border: none;\n  background: transparent;\n  text-align: left;\n  font-family: inherit;\n}\n.nc-spa-panel .empty .cta {\n  padding: 9px 18px;\n  border: 1px solid var(--nc-accent);\n  border-radius: 999px;\n  background: var(--nc-accent);\n  color: #fff;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  font-family: inherit;\n}\n.nc-spa-panel .empty .cta:hover {\n  filter: brightness(1.08);\n}\n@media (min-width: 768px) and (max-width: 1023.5px) {\n  .nc-collapse {\n    display: none;\n  }\n}\n.nc-ctx-sec {\n  margin-bottom: 6px;\n}\n.nc-ctx-label {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: .07em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n  padding: 10px 12px 4px;\n}\n.nc-ctx-badge {\n  margin-left: auto;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 999px;\n  background: var(--nc-deep);\n  color: var(--nc-ink-soft);\n  font-size: 10.5px;\n  font-weight: 700;\n  line-height: 18px;\n  text-align: center;\n}\n.nc-ctx-footer {\n  margin: 0 6px 4px;\n  padding: 9px 10px;\n  border: 1px solid var(--nc-line);\n  border-radius: 12px;\n  background: var(--nc-surface);\n  flex-shrink: 0;\n}\n.nc-ctx-footer.clickable {\n  cursor: pointer;\n}\n.nc-ctx-footer.clickable:hover {\n  border-color: var(--nc-ink-mute);\n}\n.nc-ctx-footer .row {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  color: var(--nc-ink);\n  font-size: 12px;\n  font-weight: 600;\n}\n.nc-ctx-footer .bar {\n  height: 4px;\n  border-radius: 999px;\n  background: var(--nc-deep);\n  margin: 7px 0 4px;\n  overflow: hidden;\n}\n.nc-ctx-footer .bar span {\n  display: block;\n  height: 100%;\n  border-radius: 999px;\n  background: var(--nc-accent);\n}\n.nc-ctx-footer .s {\n  font-size: 10.5px;\n  color: var(--nc-ink-mute);\n}\n@media (min-width: 768px) {\n  .nc-frame-host {\n    background: var(--nc-page) !important;\n    padding: 8px !important;\n    gap: 8px !important;\n    box-sizing: border-box;\n  }\n  .nc-frame-host > *:not(.neocockpit-host) {\n    background: var(--nc-surface);\n    border: 1px solid var(--nc-line);\n    border-radius: 18px;\n    overflow: hidden;\n  }\n}\n.nc-frame-host {\n  --nc-page: #f4f5f6;\n  --nc-surface: #ffffff;\n  --nc-line: #e2e6e9;\n}\n[data-theme=dark] .nc-frame-host {\n  --nc-page: #14181c;\n  --nc-surface: #1c2127;\n  --nc-line: #2a323a;\n}\n.nc-menu .nc-app-tiles {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  padding: 8px 10px;\n}\n.nc-menu .nc-app-tiles .tile {\n  width: 48px;\n  height: 48px;\n  display: grid;\n  place-items: center;\n  border: 1px solid var(--nc-line);\n  border-radius: 12px;\n  background: var(--nc-surface);\n  cursor: pointer;\n}\n.nc-menu .nc-app-tiles .tile:hover {\n  border-color: var(--nc-accent);\n  background: var(--nc-accent-tint);\n}\n.nc-menu .nc-app-tiles .tile img {\n  width: 33px;\n  height: 33px;\n  object-fit: contain;\n}\n[data-theme=dark] .neocockpit img[src*="/icons/apps/"] {\n  filter: invert(1);\n}\n[data-theme=dark] .nc-menu .nc-app-tiles .tile {\n  background: #eef0f2;\n  border-color: transparent;\n}\n[data-theme=dark] .nc-menu .nc-app-tiles .tile:hover {\n  background: #fff;\n  border-color: var(--nc-accent);\n}\n.nc-flyout {\n  position: fixed;\n  z-index: 1200;\n  min-width: 210px;\n  max-width: 280px;\n  max-height: 70vh;\n  overflow-y: auto;\n  background: var(--nc-surface);\n  border: 1px solid var(--nc-line);\n  border-radius: 14px;\n  box-shadow: 0 16px 44px rgba(0, 0, 0, .16);\n  padding: 6px;\n}\n.nc-flyout .fh {\n  font-size: 10.5px;\n  font-weight: 700;\n  letter-spacing: .07em;\n  text-transform: uppercase;\n  color: var(--nc-ink-mute);\n  padding: 8px 10px 5px;\n}\n.nc-flyout .fi {\n  display: block;\n  width: 100%;\n  padding: 8px 10px;\n  border: none;\n  background: transparent;\n  border-radius: 9px;\n  text-align: left;\n  font-size: 13px;\n  color: var(--nc-ink);\n  cursor: pointer;\n  font-family: inherit;\n}\n.nc-flyout .fi:hover {\n  background: var(--nc-page);\n}\n.nc-flyout .fi.on {\n  background: var(--nc-accent-tint);\n  color: var(--nc-accent-deep);\n  font-weight: 600;\n}\n.nc-side.collapsed .nc-top .nc-logo-slot {\n  padding: 2px 4px;\n}\n.nc-tooltip {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  max-width: 240px;\n}\n.nc-tooltip .tt {\n  font-weight: 600;\n}\n.nc-tooltip .ts {\n  font-size: 11px;\n  font-weight: 400;\n  opacity: .75;\n  white-space: normal;\n}\n.nc-fav-trigger {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  margin: 6px 6px 0;\n  padding: 8px 11px;\n  border: none;\n  border-radius: 11px;\n  background: transparent;\n  color: var(--nc-ink-soft);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: inherit;\n  cursor: pointer;\n  flex-shrink: 0;\n  width: calc(100% - 12px);\n}\n.nc-fav-trigger:hover {\n  background: var(--nc-surface);\n  color: var(--nc-ink);\n}\n.nc-fav-trigger.active {\n  background: var(--nc-accent-tint);\n  color: var(--nc-accent-deep);\n}\n.nc-fav-trigger .fi {\n  display: grid;\n  place-items: center;\n  color: #d9a13c;\n}\n.nc-fav-trigger .fl {\n  flex: 1;\n  text-align: left;\n}\n.nc-fav-trigger .fc {\n  min-width: 19px;\n  height: 19px;\n  padding: 0 5px;\n  border-radius: 999px;\n  background: var(--nc-deep);\n  color: var(--nc-ink-soft);\n  font-size: 10.5px;\n  font-weight: 700;\n  line-height: 19px;\n  text-align: center;\n}\n.nc-side.collapsed .nc-fav-trigger {\n  width: 38px;\n  justify-content: center;\n  padding: 8px 0;\n  margin: 6px auto 0;\n}\n.nc-spa-panel .fav-row {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  padding: 0;\n}\n.nc-spa-panel .fav-row .fav-go {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  text-align: left;\n  font-family: inherit;\n  padding: 9px 8px;\n  border-radius: 10px;\n  cursor: pointer;\n  color: var(--nc-ink);\n}\n.nc-spa-panel .fav-row .fav-go .s {\n  font-size: 13.5px;\n  font-weight: 600;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.nc-spa-panel .fav-row .fav-go .m {\n  font-size: 11.5px;\n  color: var(--nc-ink-mute);\n}\n.nc-spa-panel .fav-row .fav-go:hover {\n  background: var(--nc-page);\n}\n.nc-spa-panel .fav-row .fav-x {\n  border: none;\n  background: transparent;\n  color: var(--nc-ink-mute);\n  font-size: 18px;\n  cursor: pointer;\n  flex-shrink: 0;\n  width: 30px;\n  height: 30px;\n  display: grid;\n  place-items: center;\n  border-radius: 8px;\n}\n.nc-spa-panel .fav-row .fav-x:hover {\n  background: var(--nc-deep);\n  color: var(--nc-ink);\n}\n');

// src/NeoCockpit.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var FiduciaryIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", ...props, children: [
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M16 10H4V6h11a1 1 0 0 1 1 1v3z", opacity: ".5" }),
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M21 18H4v-8h17a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z" }),
  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M3 22a1 1 0 0 1-1-.999V3a1 1 0 0 1 2 0v18a1 1 0 0 1-.999 1H3z", opacity: ".25" })
] });
var lucideIconMap = {
  "activity": import_lucide_react2.Activity,
  "banknote": import_lucide_react2.Banknote,
  "bar-chart-2": import_lucide_react2.BarChart2,
  "bar-chart-3": import_lucide_react2.BarChart3,
  "book-open": import_lucide_react2.BookOpen,
  "briefcase": import_lucide_react2.Briefcase,
  "building-2": import_lucide_react2.Building2,
  "calculator": import_lucide_react2.Calculator,
  "calendar-days": import_lucide_react2.CalendarDays,
  "chart-pie": import_lucide_react2.PieChart,
  "credit-card": import_lucide_react2.Banknote,
  "factory": import_lucide_react2.Factory,
  "fiduciary": FiduciaryIcon,
  "file-text": import_lucide_react2.FileText,
  "globe": import_lucide_react2.Globe,
  "graduation-cap": import_lucide_react2.GraduationCap,
  "hand-coins": import_lucide_react2.HandCoins,
  "headphones": import_lucide_react2.Headphones,
  "home": import_lucide_react2.Home,
  "landmark": import_lucide_react2.Landmark,
  "layout-grid": import_lucide_react2.LayoutGrid,
  "life-buoy": import_lucide_react2.Headphones,
  "list-checks": import_lucide_react2.ListChecks,
  "package": import_lucide_react2.Package,
  "pie-chart": import_lucide_react2.PieChart,
  "receipt": import_lucide_react2.Receipt,
  "scale": import_lucide_react2.Scale,
  "settings": import_lucide_react2.Settings,
  "shopping-bag": import_lucide_react2.ShoppingBag,
  "shopping-cart": import_lucide_react2.ShoppingCart,
  "sliders-horizontal": import_lucide_react2.SlidersHorizontal,
  "star": import_lucide_react2.Star,
  "store": import_lucide_react2.Store,
  "tag": import_lucide_react2.Tag,
  "trending-up": import_lucide_react2.TrendingUp,
  "trophy": import_lucide_react2.Trophy,
  "clock": import_lucide_react2.Clock,
  "cloud": import_lucide_react2.Cloud,
  "inbox": import_lucide_react2.Inbox,
  "trash": import_lucide_react2.Trash2,
  "trash-2": import_lucide_react2.Trash2,
  "gallery-vertical-end": import_lucide_react2.GalleryVerticalEnd,
  "search": import_lucide_react2.Search,
  "building": import_lucide_react2.Building2,
  "bell": import_lucide_react2.Bell,
  "mail": import_lucide_react2.Mail,
  "route": import_lucide_react2.Route,
  "circle-help": import_lucide_react2.HelpCircle,
  "help-circle": import_lucide_react2.HelpCircle,
  "headset": import_lucide_react2.Headphones,
  "ticket": import_lucide_react2.Ticket,
  "contact": import_lucide_react2.Contact,
  "contact-2": import_lucide_react2.Contact,
  "phone": import_lucide_react2.Phone,
  "layout-dashboard": import_lucide_react2.LayoutDashboard,
  "sticky-note": import_lucide_react2.StickyNote,
  "check-square": import_lucide_react2.CheckSquare,
  "notebook": import_lucide_react2.StickyNote,
  "message-square": import_lucide_react2.MessageSquare,
  "book": import_lucide_react2.Book,
  "database": import_lucide_react2.Database,
  "database-zap": import_lucide_react2.DatabaseZap,
  "rocket": import_lucide_react2.Rocket,
  "git-branch": import_lucide_react2.GitBranch,
  "user-check": import_lucide_react2.UserCheck,
  "users": import_lucide_react2.Users,
  "wallet": import_lucide_react2.Wallet,
  "warehouse": import_lucide_react2.Warehouse,
  "wrench": import_lucide_react2.Wrench
};
var legacyIconMap = {
  "accounting": import_lucide_react2.Calculator,
  "income": import_lucide_react2.TrendingUp,
  "expenses": import_lucide_react2.TrendingDown,
  "assets": import_lucide_react2.Briefcase,
  "receivables": import_lucide_react2.ArrowRight,
  "payables": import_lucide_react2.ArrowRight,
  "money-coins-1": import_lucide_react2.DollarSign,
  "sell": import_lucide_react2.ShoppingCart,
  "selling": import_lucide_react2.ShoppingCart,
  "buying": import_lucide_react2.Package,
  "crm": import_lucide_react2.Target,
  "customer": import_lucide_react2.Users,
  "users": import_lucide_react2.Users,
  "stock": import_lucide_react2.Package,
  "organization": import_lucide_react2.Factory,
  "manufacturing": import_lucide_react2.Factory,
  "tag": import_lucide_react2.Tag,
  "hr": import_lucide_react2.Users,
  "assign": import_lucide_react2.Users,
  "project": import_lucide_react2.FolderOpen,
  "list": import_lucide_react2.ListOrdered,
  "support": import_lucide_react2.Headphones,
  "quality": import_lucide_react2.Award,
  "setting": import_lucide_react2.Settings,
  "settings": import_lucide_react2.Settings,
  "tool": import_lucide_react2.Wrench,
  "integration": import_lucide_react2.Layers,
  "getting-started": import_lucide_react2.Star,
  "file": import_lucide_react2.FileText,
  "folder-normal": import_lucide_react2.FolderOpen,
  "filter": import_lucide_react2.Filter,
  "edit": import_lucide_react2.Edit,
  "add": import_lucide_react2.Plus,
  "menu": import_lucide_react2.Menu,
  "down": import_lucide_react2.ChevronDown,
  "message-1": import_lucide_react2.MessageSquare,
  "external-link": import_lucide_react2.ExternalLink,
  "image": import_lucide_react2.Image,
  "website": import_lucide_react2.Globe,
  "web": import_lucide_react2.Globe,
  "education": import_lucide_react2.BookOpen,
  "refresh": import_lucide_react2.RefreshCw,
  "map": import_lucide_react2.MapPin,
  "star": import_lucide_react2.Star,
  "milestone": import_lucide_react2.FileCheck,
  "mark-as-read": import_lucide_react2.CheckSquare,
  "group-by": import_lucide_react2.LayoutGrid,
  "table": import_lucide_react2.LayoutGrid,
  "change": import_lucide_react2.RefreshCw,
  "non-profit": import_lucide_react2.CalendarDays,
  "default": import_lucide_react2.Circle
};
var getIcon = (iconName) => {
  if (!iconName) return import_lucide_react2.Circle;
  if (iconName.startsWith("lucide-")) return lucideIconMap[iconName.slice(7)] || import_lucide_react2.Circle;
  return legacyIconMap[iconName] || import_lucide_react2.Circle;
};
var tr = (text, args) => {
  const w = window;
  let s = typeof w.__ === "function" ? w.__(text, args) : text;
  if (args && s === text) s = text.replace(/\{(\d+)\}/g, (_, i) => String(args[+i] ?? ""));
  return s;
};
var ALL_APP = "__all__";
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
var LogoLink = ({ onClick, mark = false, height }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { onClick, style: { display: "inline-flex", cursor: "pointer" }, title: "Neoffice", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(NeoLogo, { mark, height }) });
function NeoCockpit({ env: envProp, onNavigate, homeUrl = "/app/home", onNora, onBell, onSynk, onHelp, defaultApp, surfaceApp, contextNav, contextFooter, onSearch, searchKbd, children, layout = "shell", className } = {}) {
  const env = envProp ?? detectEnv();
  const boot = typeof window !== "undefined" ? window.frappe?.boot : void 0;
  const [pinned, setPinned] = (0, import_react2.useState)(() => {
    try {
      return JSON.parse(localStorage.getItem("neocockpit-pinned") || "true");
    } catch {
      return true;
    }
  });
  const [workspaces, setWorkspaces] = (0, import_react2.useState)([]);
  const [apps, setApps] = (0, import_react2.useState)([]);
  const [currentApp, setCurrentApp] = (0, import_react2.useState)(() => localStorage.getItem("neocockpit-app") || "");
  const [appMenuOpen, setAppMenuOpen] = (0, import_react2.useState)(false);
  const [userMenuOpen, setUserMenuOpen] = (0, import_react2.useState)(false);
  const [mobileOpen, setMobileOpen] = (0, import_react2.useState)(false);
  const [moreOpen, setMoreOpen] = (0, import_react2.useState)(false);
  const [narrow, setNarrow] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    if (typeof matchMedia === "undefined") return;
    const mq = matchMedia("(min-width: 768px) and (max-width: 1023.5px)");
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  const [hiddenAlert, setHiddenAlert] = (0, import_react2.useState)(false);
  const [openGroup, setOpenGroup] = (0, import_react2.useState)("");
  const [flyout, setFlyout] = (0, import_react2.useState)(null);
  const flyTimer = (0, import_react2.useRef)(null);
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
  const [favorites, setFavorites] = (0, import_react2.useState)([]);
  (0, import_react2.useEffect)(() => {
    const load = () => {
      fetchFavorites().then(setFavorites).catch(() => {
      });
    };
    load();
    window.addEventListener("nf-favorites-changed", load);
    return () => window.removeEventListener("nf-favorites-changed", load);
  }, []);
  const [openPanel, setOpenPanel] = (0, import_react2.useState)(null);
  const spaPanels = env === "spa";
  const spaSynkCount = useUnreadSynk(spaPanels && !onSynk);
  const spaNotifCount = useUnreadNotifications(spaPanels && !onBell);
  const wikiUrl = boot?.neoffice_wiki_url || "https://neoservice.neoffice.me/wiki";
  const surfaceTiles = (0, import_react2.useMemo)(() => {
    const list = boot?.surface_apps || [];
    return list.filter((t) => t.route && t.name !== surfaceApp?.name);
  }, [boot, surfaceApp?.name]);
  const [time, setTime] = (0, import_react2.useState)(formatTime);
  const [route, setRoute] = (0, import_react2.useState)(() => typeof location !== "undefined" ? location.pathname + location.hash : "");
  const [interfaceMode, setInterfaceMode] = (0, import_react2.useState)(() => boot?.neoffice_settings?.interface_mode || boot?.user?.view_interface || "Avanc\xE9");
  const [formWidth, setFormWidth] = (0, import_react2.useState)(() => boot?.user?.form_width || "Standard");
  const [colorMode, setColorMode] = (0, import_react2.useState)(() => {
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
  const expanded = pinned;
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
    if (currentApp) localStorage.setItem("neocockpit-app", currentApp);
  }, [currentApp]);
  (0, import_react2.useEffect)(() => {
    localStorage.setItem("neocockpit-pinned", JSON.stringify(pinned));
  }, [pinned]);
  (0, import_react2.useEffect)(() => {
    if (pinned) setMoreOpen(false);
  }, [pinned]);
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
    const id = setInterval(() => setTime(formatTime()), 6e4);
    return () => clearInterval(id);
  }, []);
  (0, import_react2.useEffect)(() => {
    const sysDark = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", colorMode === "system" ? sysDark ? "dark" : "light" : colorMode);
  }, []);
  (0, import_react2.useEffect)(() => {
    const update = () => setRoute(location.pathname + location.hash);
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
  const [tip, setTip] = (0, import_react2.useState)(null);
  const showTip = (text, sub) => (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTip({ text, sub, x: r.right + 10, y: r.top + r.height / 2 });
  };
  const hideTip = () => setTip(null);
  const tipProps = (text, sub) => ({ onMouseEnter: showTip(text, sub), onMouseLeave: hideTip });
  const rootRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
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
  const allMode = currentApp === ALL_APP;
  const currentAppData = (0, import_react2.useMemo)(() => apps.find((a) => a.app_name === currentApp), [apps, currentApp]);
  const appGroups = (0, import_react2.useMemo)(
    () => apps.map((app) => ({ app, items: workspaces.filter((w) => app.workspaces?.includes(w.name)) })).filter((g) => g.items.length > 0 || !!g.app.app_route),
    [apps, workspaces]
  );
  const isWsActive = (ws) => route.includes("/" + ws.name.toLowerCase().replace(/\s+/g, "-"));
  const activeGroupName = (0, import_react2.useMemo)(
    () => appGroups.find((g) => g.items.some(isWsActive))?.app.app_name,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appGroups, route]
  );
  const filteredWorkspaces = (0, import_react2.useMemo)(() => {
    if (!currentAppData?.workspaces) return workspaces.slice(0, 20);
    return workspaces.filter((w) => currentAppData.workspaces.includes(w.name)).slice(0, 20);
  }, [workspaces, currentAppData]);
  const navigate = (0, import_react2.useCallback)((route2) => {
    if (onNavigate) return onNavigate(route2);
    const w = window;
    if (env === "desk" && w.frappe?.set_route) {
      const path = route2.replace(/^https?:\/\/[^/]+/, "").replace(/^\/app\/?/, "");
      w.frappe.set_route(path || "home");
    } else {
      window.location.href = route2;
    }
  }, [env, onNavigate]);
  const goWorkspace = (ws) => {
    setMobileOpen(false);
    navigate("/app/" + ws.name.toLowerCase().replace(/\s+/g, "-"));
  };
  const goApp = (app) => {
    setCurrentApp(app.app_name);
    setAppMenuOpen(false);
    setMobileOpen(false);
    if (app.app_route) navigate(app.app_route);
  };
  const frappeSetValue = (0, import_react2.useCallback)((doctype, name, field, value) => {
    return fetch("/api/method/frappe.client.set_value", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Frappe-CSRF-Token": window.csrf_token || "" },
      body: JSON.stringify({ doctype, name, fieldname: field, value })
    });
  }, []);
  const currentUser = () => {
    const w = window;
    return w.frappe?.session?.user || boot?.user?.name || "";
  };
  const switchMode = (0, import_react2.useCallback)((mode) => {
    const dbMode = mode === "Simple" ? "Simplified" : "Advanced";
    setInterfaceMode(mode);
    document.body.classList.toggle("simplified_view", mode === "Simple");
    frappeSetValue("User", currentUser(), "view_interface", dbMode).then(() => {
      window.location.href = "/app/home";
    });
  }, [frappeSetValue]);
  const applyColorMode = (0, import_react2.useCallback)((mode) => {
    setColorMode(mode);
    try {
      localStorage.setItem("neocockpit-colormode", mode);
    } catch {
    }
    const sysDark = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = mode === "system" ? sysDark ? "dark" : "light" : mode;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme_active", theme);
    } catch {
    }
    const deskTheme = mode === "system" ? "Automatic" : mode[0].toUpperCase() + mode.slice(1);
    frappeSetValue("User", currentUser(), "desk_theme", deskTheme).catch(() => {
    });
  }, [frappeSetValue]);
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
  const switchFormWidth = (0, import_react2.useCallback)((value) => {
    setFormWidth(value);
    document.body.classList.remove("form-width-large", "form-width-full");
    if (value === "Large") document.body.classList.add("form-width-large");
    if (value === "Full Width") document.body.classList.add("form-width-full");
    frappeSetValue("User", currentUser(), "form_width", value).catch(() => {
    });
  }, [frappeSetValue]);
  const searchRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "g") {
        e.preventDefault();
        setMobileOpen(false);
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const submitSearch = (q) => {
    if (q.trim()) navigate("/app/search?q=" + encodeURIComponent(q.trim()));
  };
  const myEmail = boot?.user?.email || boot?.user?.name || "";
  const myInfo = boot?.user_info && boot.user_info[myEmail] || {};
  const userName = myInfo.fullname || boot?.user?.full_name || boot?.user?.email || tr("User");
  const userImage = myInfo.image || boot?.user?.user_image || "";
  const userAbbr = myInfo.abbr || computeAbbr(userName);
  const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);
  const appLogoUrl = currentAppData?.app_logo_url;
  const sidebarBody = (forceExpanded = false) => {
    const exp = forceExpanded || (narrow ? false : expanded);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: cn("nc-top nc-actions", !exp && !moreOpen && "nc-actions-folded"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "nc-logo-slot", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(LogoLink, { onClick: () => navigate(homeUrl), mark: false, height: exp ? 22 : 12 }) }),
        (onHelp || spaPanels) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            className: "nc-iconbtn nc-help",
            ...!exp ? tipProps(tr("Help & Training")) : {},
            title: exp ? tr("Help & Training") : void 0,
            onClick: onHelp || (() => setOpenPanel((p) => p === "help" ? null : "help")),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.LifeBuoy, { size: 17, strokeWidth: 1.7 }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "nc-count" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            className: "nc-iconbtn nc-synk",
            ...!exp ? tipProps(tr("Messages")) : {},
            title: exp ? tr("Messages") : void 0,
            onClick: () => setOpenPanel((p) => p === "mailmenu" || p === "mail" || p === "synk" ? null : "mailmenu"),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Mail, { size: 17, strokeWidth: 1.7 }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "nc-count", children: spaPanels && !onSynk && spaSynkCount > 0 ? spaSynkCount : void 0 })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "nc-phone-slot", style: { display: "contents" } }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            className: cn("nc-iconbtn nc-bell", spaPanels && !onBell && spaNotifCount > 0 && "has-unseen"),
            ...!exp ? tipProps(tr("Notifications")) : {},
            title: exp ? tr("Notifications") : void 0,
            onClick: onBell ? triggerBell : spaPanels ? () => setOpenPanel((p) => p === "bell" ? null : "bell") : triggerBell,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Bell, { size: 17, strokeWidth: 1.7 }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "pip nc-bell-pip" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: "nc-iconbtn nc-nora", ...!exp ? tipProps(tr("Ask NORA")) : {}, title: exp ? tr("Ask NORA") : void 0, onClick: triggerNora, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Sparkles, { size: 17, strokeWidth: 1.7 }) }),
        !forceExpanded && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            className: "nc-iconbtn nc-more",
            ...!exp ? tipProps(moreOpen ? tr("Less") : tr("More")) : {},
            onClick: () => setMoreOpen((o) => !o),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.MoreHorizontal, { size: 17, strokeWidth: 1.7 }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: cn("pip nc-more-pip", hiddenAlert && "show") })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "nc-switch", ...!exp ? tipProps(allMode ? tr("All") : currentAppData?.app_title || tr("Switch module")) : {}, title: exp ? tr("Switch module") : void 0, onClick: () => setAppMenuOpen((o) => !o), children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "sq", children: allMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.LayoutGrid, { size: 17, strokeWidth: 1.6 }) : appLogoUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: appLogoUrl, alt: "" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Briefcase, { size: 17, strokeWidth: 1.6 }) }),
          exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "meta nc-hide-collapsed", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "n", children: allMode ? tr("All") : currentAppData?.app_title || "ERPNext" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "s", children: allMode ? tr("All Modules") : tr("Active module") })
          ] }),
          exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ch nc-hide-collapsed", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.ChevronsUpDown, { size: 15 }) })
        ] }),
        appMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-menu", style: { top: "100%", left: 0, right: 0, marginTop: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "button",
            {
              className: cn("item", allMode && "active"),
              onClick: () => {
                setCurrentApp(ALL_APP);
                setAppMenuOpen(false);
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.LayoutGrid, { size: 16 }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: { flex: 1 }, children: tr("All") })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "sep" }),
          apps.filter((app) => app.app_route !== "/app/setup").map((app) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: cn("item", app.app_name === currentApp && "active"), onClick: () => goApp(app), children: [
            app.app_logo_url ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: app.app_logo_url, alt: "" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Circle, { size: 14 }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: { flex: 1 }, children: app.app_title })
          ] }, app.app_name)),
          surfaceTiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "sep" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "nc-app-tiles", children: surfaceTiles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                className: "tile",
                ...tipProps(t.title, t.description),
                onClick: () => {
                  setAppMenuOpen(false);
                  if (t.route) window.location.href = t.route;
                },
                children: t.logo ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: t.logo, alt: "" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.LayoutGrid, { size: 18 })
              },
              t.name
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "sep" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "item", onClick: () => navigate("/"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Globe, { size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: tr("Website") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "item", onClick: () => navigate("/app/settings"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Settings, { size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: tr("Settings") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "si", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Search, { size: 16, strokeWidth: 1.7 }) }),
            exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
            exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "kbd", children: searchKbd || (isMac ? "\u2318G" : "Ctrl G") })
          ]
        }
      ),
      favorites.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "button",
        {
          className: cn("nc-fav-trigger", openPanel === "favorites" && "active"),
          ...!exp ? tipProps(tr("Favorites")) : {},
          title: exp ? tr("Favorites") : void 0,
          onClick: () => setOpenPanel((p) => p === "favorites" ? null : "favorites"),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "fi", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Star, { size: 16, strokeWidth: 1.7 }) }),
            exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "fl", children: tr("Favorites") }),
            exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "fc", children: favorites.length })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("nav", { className: "nc-nav", style: { marginTop: 4 }, children: [
        surfaceApp && currentApp === surfaceApp.name && contextNav && contextNav.map((sec, si) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-ctx-sec", children: [
          sec.label && exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "nc-ctx-label", children: tr(sec.label) }),
          sec.items.map((it, ii) => {
            const Icon = getIcon(it.icon);
            return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ni", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { size: 18, strokeWidth: 1.6 }) }),
                  exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "nl", children: it.label }),
                  exp && it.badge != null && it.badge !== "" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "nc-ctx-badge", children: it.badge })
                ]
              },
              ii
            );
          })
        ] }, si)),
        !(surfaceApp && currentApp === surfaceApp.name && contextNav) && allMode && exp && appGroups.map(({ app, items }) => {
          const groupActive = env === "spa" ? openGroup === app.app_name : app.app_name === activeGroupName;
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "button",
              {
                className: cn("nc-navitem", groupActive && "active"),
                title: app.app_title,
                onClick: () => {
                  if (env === "spa" && items.length) {
                    setOpenGroup((g) => g === app.app_name ? "" : app.app_name);
                    return;
                  }
                  items.length ? goWorkspace(items[0]) : goApp(app);
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ni", children: app.app_logo_url ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: app.app_logo_url, alt: "", style: { width: 18, height: 18, objectFit: "contain" } }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.LayoutGrid, { size: 18, strokeWidth: 1.6 }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "nl", children: app.app_title })
                ]
              }
            ),
            groupActive && items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "nc-sub", children: items.map((ws) => {
              const wsLabel = ws.label || tr(ws.title || ws.name);
              return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: cn("nc-subitem", isWsActive(ws) && "on"), title: wsLabel, onClick: () => goWorkspace(ws), children: wsLabel }, ws.name);
            }) })
          ] }, app.app_name);
        }),
        !(surfaceApp && currentApp === surfaceApp.name && contextNav) && allMode && !exp && appGroups.map(({ app, items }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            className: cn("nc-navitem", app.app_name === activeGroupName && "active"),
            ...items.length ? {} : tipProps(app.app_title),
            onMouseEnter: items.length ? (e) => {
              flyKeep();
              const r = e.currentTarget.getBoundingClientRect();
              setFlyout({ app, items, top: r.top });
            } : void 0,
            onMouseLeave: items.length ? flyClose : void 0,
            onClick: () => {
              setFlyout(null);
              items.length ? goWorkspace(items[0]) : goApp(app);
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ni", children: app.app_logo_url ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: app.app_logo_url, alt: "", style: { width: 18, height: 18, objectFit: "contain" } }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.LayoutGrid, { size: 18, strokeWidth: 1.6 }) })
          },
          app.app_name
        )),
        !(surfaceApp && currentApp === surfaceApp.name && contextNav) && !allMode && filteredWorkspaces.map((ws) => {
          const Icon = getIcon(ws.icon);
          const slug = ws.name.toLowerCase().replace(/\s+/g, "-");
          const active = route.includes("/" + slug);
          const wsLabel = ws.label || tr(ws.title || ws.name);
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "button",
            {
              className: cn("nc-navitem", active && "active"),
              title: exp ? wsLabel : void 0,
              ...!exp ? tipProps(wsLabel) : {},
              onClick: () => goWorkspace(ws),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ni", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { size: 19, strokeWidth: 1.6 }) }),
                exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "nl", children: wsLabel })
              ]
            },
            ws.name
          );
        })
      ] }),
      contextFooter && exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: cn("nc-ctx-footer", contextFooter.onClick && "clickable"),
          onClick: contextFooter.onClick,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "row", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Cloud, { size: 14, strokeWidth: 1.7 }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "l", children: contextFooter.label })
            ] }),
            contextFooter.percent != null && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "bar", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: { width: Math.min(100, contextFooter.percent) + "%" } }) }),
            contextFooter.sub && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "s", children: contextFooter.sub })
          ]
        }
      ),
      !forceExpanded && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "button",
        {
          className: "nc-collapse",
          ...!exp ? tipProps(tr("Expand")) : {},
          title: exp ? void 0 : tr("Expand"),
          onClick: () => setPinned(!pinned),
          children: [
            pinned ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.PanelLeftClose, { size: 16, strokeWidth: 1.7 }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.PanelLeftOpen, { size: 16, strokeWidth: 1.7 }),
            exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "nc-hide-collapsed", children: tr("Collapse menu") })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-foot", style: { position: "relative" }, children: [
        userMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-menu", style: { bottom: "100%", left: 0, right: 0, marginBottom: 6 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "uhead", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "n", children: userName }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "e", children: boot?.user?.email || "" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-cmode", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "lbl", children: tr("Color mode") }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "seg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: cn(colorMode === "system" && "on"), title: tr("System"), onClick: () => applyColorMode("system"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Monitor, { size: 15 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: cn(colorMode === "light" && "on"), title: tr("Light"), onClick: () => applyColorMode("light"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Sun, { size: 15 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: cn(colorMode === "dark" && "on"), title: tr("Dark"), onClick: () => applyColorMode("dark"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Moon, { size: 15 }) })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-seg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "lbl", children: tr("Interface") }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: cn(isSimple && "on"), onClick: () => switchMode("Simple"), children: tr("Simple") }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: cn(!isSimple && "on"), onClick: () => switchMode("Avanc\xE9"), children: tr("Advanced") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-seg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "lbl", children: tr("Width") }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: cn(formWidth === "Standard" && "on"), title: tr("Standard"), onClick: () => switchFormWidth("Standard"), children: "S" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: cn(formWidth === "Large" && "on"), title: tr("Large"), onClick: () => switchFormWidth("Large"), children: "M" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: cn(formWidth === "Full Width" && "on"), title: tr("Full Width"), onClick: () => switchFormWidth("Full Width"), children: "L" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "sep" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "item", onClick: () => navigate("/app/user-profile"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Settings, { size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: tr("Account settings") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "item", onClick: () => navigate("/wiki"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.BookOpen, { size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: tr("Documentation") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "item", onClick: openCalculator, children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Calculator, { size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: tr("Calculator") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "item", onClick: () => navigate(homeUrl), children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Home, { size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: tr("Home") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "sep" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "item", onClick: () => {
            window.location.href = "/api/method/logout";
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.LogOut, { size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: tr("Logout") })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "nc-user", title: exp ? userName : void 0, ...!exp ? tipProps(userName) : {}, onClick: () => setUserMenuOpen((o) => !o), children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ua", style: { background: userImage ? "transparent" : colorFromName(userName) }, children: userImage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: userImage, alt: "" }) : userAbbr }),
          exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "um nc-hide-collapsed", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "n", children: userName }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "e", children: boot?.user?.email || "" })
          ] }),
          exp && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "uk nc-hide-collapsed", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.MoreVertical, { size: 16 }) })
        ] })
      ] })
    ] });
  };
  const effExpanded = narrow ? false : expanded;
  const sideClass = cn("nc-side", effExpanded ? "expanded" : "collapsed", "responsive");
  const mobileBar = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-mobilebar", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: "nc-iconbtn", "aria-label": tr("Open navigation"), onClick: () => setMobileOpen(true), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Menu, { size: 20 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(LogoLink, { onClick: () => navigate(homeUrl), height: 18 }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-search", style: { margin: 0, flex: 1, maxWidth: 420 }, onClick: () => {
      setMobileOpen(true);
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "si", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Search, { size: 16 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { placeholder: tr("Search\u2026"), onKeyDown: env === "desk" ? void 0 : (e) => {
        if (e.key === "Enter") submitSearch(e.target.value);
      } })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "grow" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "nc-iconbtn nc-bell", title: tr("Notifications"), onClick: triggerBell, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Bell, { size: 18 }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "pip nc-bell-pip" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: "nc-user", style: { padding: 4, width: "auto" }, onClick: () => navigate("/app/user-profile"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ua", style: { width: 30, height: 30, background: userImage ? "transparent" : colorFromName(userName) }, children: userImage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: userImage, alt: "" }) : userAbbr }) })
  ] });
  const desktopAside = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("aside", { className: sideClass, style: { width: effExpanded ? "var(--nc-w-expanded)" : "var(--nc-w-collapsed)" }, children: sidebarBody() });
  const drawer = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: cn("nc-overlay", mobileOpen && "open"), onClick: () => setMobileOpen(false) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: cn("nc-drawer", mobileOpen && "open"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("aside", { className: "nc-side expanded", children: sidebarBody(true) }) })
  ] });
  const tooltipNode = tip ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-tooltip", style: { left: tip.x, top: tip.y }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "tt", children: tip.text }),
    tip.sub && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ts", children: tip.sub })
  ] }, tip.text + ":" + Math.round(tip.y)) : null;
  const showPanels = openPanel && (spaPanels || openPanel === "mailmenu" || openPanel === "mail" || openPanel === "favorites");
  const anchorLeft = (() => {
    if (typeof document === "undefined") return expanded ? 268 : 90;
    const aside = document.querySelector(".nc-side");
    return aside ? Math.round(aside.getBoundingClientRect().right) + 10 : effExpanded ? 268 : 90;
  })();
  const flyoutNode = flyout ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      className: "nc-flyout",
      style: { left: anchorLeft, top: Math.max(60, flyout.top - 8) },
      onMouseEnter: flyKeep,
      onMouseLeave: flyClose,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "fh", children: flyout.app.app_title }),
        flyout.items.map((ws) => {
          const wsLabel = ws.label || tr(ws.title || ws.name);
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
  const panelsNode = showPanels ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "nc-spa-panel-anchor", style: { left: anchorLeft }, children: [
    openPanel === "bell" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(NotificationsPanel, { tr, onClose: () => setOpenPanel(null) }),
    openPanel === "synk" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      SynkPanel,
      {
        tr,
        userInfo: boot?.user_info || {},
        onClose: () => setOpenPanel(null)
      }
    ),
    openPanel === "help" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HelpPanel, { tr, wikiUrl, onClose: () => setOpenPanel(null) }),
    openPanel === "mailmenu" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    openPanel === "favorites" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    openPanel === "mail" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    )
  ] }) : null;
  if (layout === "sidebar") {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: cn("neocockpit", className), ref: rootRef, style: { display: "contents" }, children: [
      mobileBar,
      desktopAside,
      drawer,
      tooltipNode,
      panelsNode,
      flyoutNode
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: cn("neocockpit nc-frame", className), ref: rootRef, children: [
    mobileBar,
    desktopAside,
    children !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("main", { className: "nc-panel", children }),
    drawer,
    tooltipNode,
    panelsNode,
    flyoutNode
  ] });
}
var NeoCockpit_default = NeoCockpit;

// src/FrappeSidebar.tsx
var import_react3 = require("react");
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var FiduciaryIcon2 = (props) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", ...props, children: [
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M16 10H4V6h11a1 1 0 0 1 1 1v3z", opacity: ".5" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M21 18H4v-8h17a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M3 22a1 1 0 0 1-1-.999V3a1 1 0 0 1 2 0v18a1 1 0 0 1-.999 1H3z", opacity: ".25" })
] });
var lucideIconMap2 = {
  "activity": import_lucide_react3.Activity,
  "banknote": import_lucide_react3.Banknote,
  "bar-chart-2": import_lucide_react3.BarChart2,
  "bar-chart-3": import_lucide_react3.BarChart3,
  "book-open": import_lucide_react3.BookOpen,
  "briefcase": import_lucide_react3.Briefcase,
  "building-2": import_lucide_react3.Building2,
  "calculator": import_lucide_react3.Calculator,
  "calendar-days": import_lucide_react3.CalendarDays,
  "chart-pie": import_lucide_react3.PieChart,
  "credit-card": import_lucide_react3.Banknote,
  "factory": import_lucide_react3.Factory,
  "fiduciary": FiduciaryIcon2,
  "file-text": import_lucide_react3.FileText,
  "globe": import_lucide_react3.Globe,
  "graduation-cap": import_lucide_react3.GraduationCap,
  "hand-coins": import_lucide_react3.HandCoins,
  "headphones": import_lucide_react3.Headphones,
  "home": import_lucide_react3.Home,
  "landmark": import_lucide_react3.Landmark,
  "layout-grid": import_lucide_react3.LayoutGrid,
  "life-buoy": import_lucide_react3.Headphones,
  "list-checks": import_lucide_react3.ListChecks,
  "package": import_lucide_react3.Package,
  "pie-chart": import_lucide_react3.PieChart,
  "receipt": import_lucide_react3.Receipt,
  "scale": import_lucide_react3.Scale,
  "settings": import_lucide_react3.Settings,
  "shopping-bag": import_lucide_react3.ShoppingBag,
  "shopping-cart": import_lucide_react3.ShoppingCart,
  "sliders-horizontal": import_lucide_react3.SlidersHorizontal,
  "star": import_lucide_react3.Star,
  "store": import_lucide_react3.Store,
  "tag": import_lucide_react3.Tag,
  "trending-up": import_lucide_react3.TrendingUp,
  "trophy": import_lucide_react3.Trophy,
  "user-check": import_lucide_react3.UserCheck,
  "users": import_lucide_react3.Users,
  "wallet": import_lucide_react3.Wallet,
  "warehouse": import_lucide_react3.Warehouse,
  "wrench": import_lucide_react3.Wrench
};
var legacyIconMap2 = {
  "accounting": import_lucide_react3.Calculator,
  "income": import_lucide_react3.TrendingUp,
  "expenses": import_lucide_react3.TrendingDown,
  "assets": import_lucide_react3.Briefcase,
  "receivables": import_lucide_react3.ArrowRight,
  "payables": import_lucide_react3.ArrowLeft,
  "money-coins-1": import_lucide_react3.DollarSign,
  "sell": import_lucide_react3.ShoppingCart,
  "selling": import_lucide_react3.ShoppingCart,
  "buying": import_lucide_react3.Package,
  "crm": import_lucide_react3.Target,
  "customer": import_lucide_react3.Users,
  "users": import_lucide_react3.Users,
  "stock": import_lucide_react3.Package,
  "organization": import_lucide_react3.Factory,
  "manufacturing": import_lucide_react3.Factory,
  "tag": import_lucide_react3.Tag,
  "hr": import_lucide_react3.Users,
  "assign": import_lucide_react3.Users,
  "project": import_lucide_react3.FolderOpen,
  "list": import_lucide_react3.ListOrdered,
  "support": import_lucide_react3.Headphones,
  "quality": import_lucide_react3.Award,
  "setting": import_lucide_react3.Settings,
  "settings": import_lucide_react3.Settings,
  "tool": import_lucide_react3.Wrench,
  "integration": import_lucide_react3.Layers,
  "getting-started": import_lucide_react3.Star,
  "file": import_lucide_react3.FileText,
  "folder-normal": import_lucide_react3.FolderOpen,
  "filter": import_lucide_react3.Filter,
  "edit": import_lucide_react3.Edit,
  "add": import_lucide_react3.Plus,
  "menu": import_lucide_react3.Menu,
  "down": import_lucide_react3.ChevronDown,
  "message-1": import_lucide_react3.MessageSquare,
  "external-link": import_lucide_react3.ExternalLink,
  "image": import_lucide_react3.Image,
  "website": import_lucide_react3.Globe,
  "web": import_lucide_react3.Globe,
  "education": import_lucide_react3.BookOpen,
  "refresh": import_lucide_react3.RefreshCw,
  "map": import_lucide_react3.MapPin,
  "star": import_lucide_react3.Star,
  "milestone": import_lucide_react3.FileCheck,
  "mark-as-read": import_lucide_react3.CheckSquare,
  "group-by": import_lucide_react3.LayoutGrid,
  "table": import_lucide_react3.LayoutGrid,
  "change": import_lucide_react3.RefreshCw,
  "non-profit": import_lucide_react3.Calendar,
  "default": import_lucide_react3.Circle
};
var SidebarButton = ({
  className,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = (0, import_react3.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  const [pinned, setPinned] = (0, import_react3.useState)(() => {
    const saved = localStorage.getItem("frappe-sidebar-pinned");
    return saved ? JSON.parse(saved) : false;
  });
  const [hoverExpanded, setHoverExpanded] = (0, import_react3.useState)(false);
  const [workspaces, setWorkspaces] = (0, import_react3.useState)([]);
  const [apps, setApps] = (0, import_react3.useState)([]);
  const [currentApp, setCurrentApp] = (0, import_react3.useState)(() => {
    return localStorage.getItem("frappe-sidebar-current-app") || "";
  });
  const [appMenuOpen, setAppMenuOpen] = (0, import_react3.useState)(false);
  const [interfaceMode, setInterfaceMode] = (0, import_react3.useState)(() => {
    const boot = window.frappe?.boot;
    return boot?.neoffice_settings?.interface_mode || boot?.user?.view_interface || "Avanc\xE9";
  });
  const [isDark, setIsDark] = (0, import_react3.useState)(() => {
    return document.documentElement.getAttribute("data-theme") === "dark";
  });
  const [isFullscreen, setIsFullscreen] = (0, import_react3.useState)(false);
  const isSimple = interfaceMode === "Simple" || interfaceMode === "Simplified";
  const expanded = pinned || hoverExpanded;
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
    if (currentApp) {
      localStorage.setItem("frappe-sidebar-current-app", currentApp);
    }
  }, [currentApp]);
  (0, import_react3.useEffect)(() => {
    localStorage.setItem("frappe-sidebar-pinned", JSON.stringify(pinned));
  }, [pinned]);
  const getIcon2 = (iconName) => {
    if (!iconName) return import_lucide_react3.Circle;
    if (iconName.startsWith("lucide-")) {
      const name = iconName.slice(7);
      return lucideIconMap2[name] || import_lucide_react3.Circle;
    }
    return legacyIconMap2[iconName] || import_lucide_react3.Circle;
  };
  const currentAppData = (0, import_react3.useMemo)(() => {
    return apps.find((a) => a.app_name === currentApp);
  }, [apps, currentApp]);
  const filteredWorkspaces = (0, import_react3.useMemo)(() => {
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
  const frappeSetValue = (0, import_react3.useCallback)((doctype, name, field, value) => {
    return fetch("/api/method/frappe.client.set_value", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frappe-CSRF-Token": window.csrf_token || ""
      },
      body: JSON.stringify({ doctype, name, fieldname: field, value })
    });
  }, []);
  const switchMode = (0, import_react3.useCallback)((mode) => {
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
  const toggleTheme = (0, import_react3.useCallback)(() => {
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
  const toggleFullscreen = (0, import_react3.useCallback)(() => {
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
  const sidebarContent = /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-2 relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: cn(
        "w-full flex items-center gap-2 p-1.5 rounded-lg",
        expanded ? "justify-start" : "justify-center"
      ), children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "div",
          {
            className: "w-8 h-8 flex items-center justify-center flex-shrink-0",
            onClick: navigateToDesk,
            style: { cursor: "pointer" },
            children: appLogoUrl ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "img",
              {
                src: appLogoUrl,
                alt: "",
                className: "w-8 h-8 object-contain",
                style: { pointerEvents: "none" }
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Briefcase, { className: "w-8 h-8 text-gray-600", strokeWidth: 1.5, style: { pointerEvents: "none" } })
          }
        ),
        expanded && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          SidebarButton,
          {
            onClick: () => setAppMenuOpen(!appMenuOpen),
            className: "flex items-center gap-2 flex-1",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "span",
                {
                  className: "truncate flex-1 text-left",
                  style: { fontWeight: 500, lineHeight: "16.1px" },
                  children: currentAppData?.app_title || "ERPNext"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.ChevronDown, { className: cn(
                "w-4 h-4 text-gray-400 transition-transform",
                appMenuOpen && "rotate-180"
              ), strokeWidth: 1.5 })
            ]
          }
        )
      ] }),
      appMenuOpen && expanded && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: "absolute right-2 top-14 bg-white border border-gray-200 shadow-lg z-50 py-1 overflow-y-auto",
          style: { left: "8px", borderRadius: "0.65em" },
          children: [
            apps.map((app) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              SidebarButton,
              {
                onClick: () => navigateToApp(app),
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                style: app.app_name === currentApp ? { backgroundColor: "#f9fafb" } : void 0,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-5 h-5 flex items-center justify-center flex-shrink-0", children: app.app_logo_url ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("img", { src: app.app_logo_url, alt: "", className: "w-4 h-4 object-contain" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Circle, { className: "w-3 h-3", strokeWidth: 1.5 }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "truncate", children: app.app_title })
                ]
              },
              app.app_name
            )),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "border-t border-gray-200 my-1" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              SidebarButton,
              {
                onClick: () => {
                  window.location.href = "/";
                },
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Globe, { className: "w-4 h-4", strokeWidth: 1.5 }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "Website" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "border-t border-gray-200 my-1" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "px-3 pt-2 pb-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", marginBottom: "6px" }, children: "Interface Mode" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex rounded-lg overflow-hidden", style: { border: "2px solid #3b82f6" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex gap-2 px-3 pb-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                SidebarButton,
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    toggleTheme();
                  },
                  className: "flex-1 flex items-center justify-center gap-2 py-1.5",
                  children: [
                    isDark ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Sun, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Moon, { className: "w-4 h-4", strokeWidth: 1.5 }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { style: { fontSize: "12px" }, children: isDark ? "Light" : "Dark" })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                SidebarButton,
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  },
                  className: "flex items-center justify-center py-1.5 px-3",
                  children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Minimize, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Maximize, { className: "w-4 h-4", strokeWidth: 1.5 })
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "border-t border-gray-200 my-1" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              SidebarButton,
              {
                onClick: () => {
                  window.location.href = "/app/settings";
                },
                className: "w-full flex items-center gap-2 px-3 py-2 text-left",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.Settings, { className: "w-4 h-4", strokeWidth: 1.5 }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "Settings" })
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-1 overflow-y-auto overflow-x-hidden py-1", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex flex-col gap-0.5 px-2", children: filteredWorkspaces.map((workspace) => {
      const Icon = getIcon2(workspace.icon);
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        SidebarButton,
        {
          onClick: () => navigateToWorkspace(workspace),
          className: cn(
            "w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900",
            expanded ? "justify-start" : "justify-center"
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { className: "w-4 h-4 flex-shrink-0", strokeWidth: 1.5 }),
            expanded && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "truncate", children: workspace.title || workspace.name })
          ]
        },
        workspace.name
      );
    }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "p-2 border-t border-gray-100", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      SidebarButton,
      {
        onClick: handleCollapseClick,
        className: cn(
          "w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-gray-400",
          expanded ? "justify-start" : "justify-center"
        ),
        children: [
          pinned ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.ArrowLeft, { className: "w-4 h-4", strokeWidth: 1.5 }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react3.ArrowRight, { className: "w-4 h-4", strokeWidth: 1.5 }),
          expanded && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: pinned ? "Collapse" : "Expand" })
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
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      !pinned && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-shrink-0", style: { width: "50px" } }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  NeoCockpit,
  cn
});
//# sourceMappingURL=index.js.map