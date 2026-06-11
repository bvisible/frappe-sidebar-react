/**
 * NORA Quick Chat on SPA surfaces — load the REAL desk overlay on demand.
 *
 * nora_quick_chat.js is vanilla JS shipped by the nora app for the desk.
 * Its frappe.* surface is tiny (call/show_alert/get_route/provide/require/
 * realtime/after_ajax/session/boot/ui) and it POLLS for replies (realtime
 * is only a bonus) — so instead of rebuilding a chat, SPA surfaces lazily
 * load jQuery + a minimal frappe shim + the original script and open the
 * exact same overlay the desk uses. CSRF comes from window.csrf_token
 * (inlined by every SPA's www page).
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

let loadingChain: Promise<boolean> | null = null

const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
        const s = document.createElement('script')
        s.src = src
        s.onload = () => resolve()
        s.onerror = () => reject(new Error('failed: ' + src))
        document.head.appendChild(s)
    })

const loadCss = (href: string) => {
    if (document.querySelector(`link[href="${href}"]`)) return
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = href
    document.head.appendChild(l)
}

function installShims(w: any) {
    const f = (w.frappe = w.frappe || {})
    f.provide = f.provide || ((ns: string) => {
        let o: any = w
        ns.split('.').forEach(p => { o[p] = o[p] || {}; o = o[p] })
    })
    f.boot = f.boot || {}
    f.session = f.session || {}
    f.session.user = f.session.user || f.boot?.user?.name || f.boot?.user?.email || 'Guest'
    f.ui = f.ui || {}
    if (!f.call) {
        f.call = (opts: any) => {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': w.csrf_token || f.csrf_token || '',
            }
            return fetch('/api/method/' + opts.method, {
                method: 'POST',
                headers,
                credentials: 'include',
                body: JSON.stringify(opts.args || {}),
            })
                .then(async r => {
                    const data = await r.json().catch(() => ({}))
                    if (r.ok) opts.callback && opts.callback(data)
                    else opts.error && opts.error(data)
                    opts.always && opts.always(data)
                    return data
                })
                .catch(e => {
                    opts.error && opts.error(e)
                    opts.always && opts.always(e)
                })
        }
    }
    f.xcall = f.xcall || ((method: string, args?: any) =>
        new Promise((resolve, reject) =>
            f.call({ method, args, callback: (r: any) => resolve(r.message), error: reject })))
    f.show_alert = f.show_alert || ((o: any) => console.info('[nora]', typeof o === 'string' ? o : o?.message))
    f.get_route = f.get_route || (() => location.pathname.split('/').filter(Boolean))
    f.realtime = f.realtime || { on() { /* no socket on SPAs — the chat polls */ }, off() { /* noop */ } }
    f.after_ajax = f.after_ajax || ((fn?: () => void) => Promise.resolve().then(() => fn && fn()))
    f.require = f.require || ((srcs: string | string[], cb?: () => void) =>
        Promise.all((Array.isArray(srcs) ? srcs : [srcs]).map(loadScript)).then(() => cb && cb()))
}

/** Open the genuine NORA Quick Chat overlay (lazy-loads it on first use). */
export function openNoraQuickChat(): void {
    const w = window as any
    if (!loadingChain) {
        loadingChain = (async () => {
            try {
                if (!w.$ || !w.jQuery) await loadScript('/assets/frappe/js/lib/jquery/jquery.min.js')
                installShims(w)
                // the quick chat root carries .nora-voice-overlay — its fixed
                // overlay positioning lives in nora_voice_overlay.css
                loadCss('/assets/nora/css/nora_voice_overlay.css?v=2')
                loadCss('/assets/nora/css/nora_quick_chat.css?v=23')
                await loadScript('/assets/nora/js/nora_quick_chat.js?v=45')
                return true
            } catch (e) {
                console.warn('[neocockpit] NORA quick chat unavailable on this surface', e)
                return false
            }
        })()
    }
    loadingChain.then(ok => {
        if (!ok) return
        if (w.frappe?.ui?.NoraQuickChat?.show) w.frappe.ui.NoraQuickChat.show()
        else if (w.nora?.quick_chat?.show) w.nora.quick_chat.show()
    })
}
