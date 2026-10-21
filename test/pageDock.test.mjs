//// Neoffice — added file (no upstream equivalent): the row of icons and the search box a desk page lends the cockpit
//// (src/pageNav.ts `dock` and `search`, 21.10.2026), in the real React sidebar, in offline Chromium.
// Jérémy, seeing NeoMail in the desk: its views as icons side by side, always in sight just above « Interface », and the
// sidebar's search box searching in NeoMail while its folders are shown. The desk wires its own search overlay on the
// sidebar's box by hand (frappe desk.js setup_cockpit_awesomebar); the fixture wires it the same way, to show that the
// page's box is free of it, and that the desk's box comes back, wired, when the reader leaves the page.
// The fixture is served from a made-up origin (https://cockpit.test/app/neomail) by the browser's own request interception,
// every other request failed: nothing leaves the machine, and the address can change as the desk's router changes it (a
// file:// page cannot pushState to another path). It is built in React's development mode, which warns of duplicate keys.
// Run npm run test:cockpit-browser; an installed Chrome/Chromium is required (override discovery with CHROME_BIN).
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { after, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { build } from 'tsup'

const repository = fileURLToPath(new URL('../', import.meta.url))
const chromium = process.env.CHROME_BIN || [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
].find(existsSync)
const ORIGIN = 'https://cockpit.test'
const SIDE = '.nc-side.responsive'

// The debugging pipe keeps this fixture offline, without opening a TCP port (as collapseTooltip.test.mjs), and hands the
// browser's events (the paused requests, the console) to `onEvent`.
function protocol(browser, onEvent) {
    let sequence = 0
    let buffered = Buffer.alloc(0)
    const pending = new Map()
    browser.stdio[4].on('data', chunk => {
        buffered = Buffer.concat([buffered, chunk])
        assert.ok(buffered.length < 4 * 1024 * 1024, 'bounded browser protocol output')
        let end
        while ((end = buffered.indexOf(0)) !== -1) {
            const message = JSON.parse(buffered.subarray(0, end).toString())
            buffered = buffered.subarray(end + 1)
            if (message.id === undefined) { onEvent(message); continue }
            const waiting = pending.get(message.id)
            if (!waiting) continue
            pending.delete(message.id)
            clearTimeout(waiting.timeout)
            if (message.error) waiting.reject(new Error(message.error.message))
            else waiting.resolve(message.result)
        }
    })
    const rejectPending = () => {
        for (const waiting of pending.values()) {
            clearTimeout(waiting.timeout)
            waiting.reject(new Error('Chromium closed before replying'))
        }
        pending.clear()
    }
    browser.once('exit', rejectPending)
    browser.once('error', rejectPending)
    return (method, params = {}, sessionId, wait = 10_000) => new Promise((resolve, reject) => {
        const id = ++sequence
        const timeout = setTimeout(() => {
            pending.delete(id)
            reject(new Error(`Browser command timed out: ${method}`))
        }, wait)
        pending.set(id, { resolve, reject, timeout })
        browser.stdio[3].write(JSON.stringify({ id, method, params, sessionId }) + '\0')
    })
}

const FIXTURE = (cockpit, pageNav) => `
    import { createElement } from 'react'
    import { createRoot } from 'react-dom/client'
    import NeoCockpit from ${JSON.stringify(cockpit)}
    import { setPageNav } from ${JSON.stringify(pageNav)}
    localStorage.clear()
    if (window.FOLDED) localStorage.setItem('neocockpit-pinned', 'false')
    // Dark as the reader chooses it in the cockpit (its colour mode decides data-theme at mount).
    if (window.DARK) localStorage.setItem('neocockpit-colormode', 'dark')
    // The desk's translator, made to change every word it is given: the cockpit's own words go through it, the words a
    // page lends (its icons' names, its placeholder) come already translated by the page, in their context (« Notes »
    // is not the « Remarques » of another app), and must be shown as they are.
    window.__ = (text) => 'tr:' + text
    // The desk's router, as the cockpit listens to it (frappe.router.on('change')).
    const routed = []
    window.goTo = (address) => { history.pushState(null, '', address); routed.forEach((cb) => cb()) }
    window.frappe = { router: { on: (_event, cb) => routed.push(cb), off: () => {} },
        boot: { lang: 'en', neo_mode: 'Advanced', user: { name: 'ada@example.org', email: 'ada@example.org' },
        sidebar_pages: { pages: [] }, app_data: [] } }
    window.fetch = async () => new Response('{"message":[]}', { headers: { 'Content-Type': 'application/json' } })
    window.heard = []
    window.clicked = []
    window.deskOpened = 0
    // The desk's overlay opens once per gesture (its open() is idempotent: a ⌘G both opens it and focuses the box).
    const open = () => {
        if (window.opening) return
        window.opening = true
        window.deskOpened++
        setTimeout(() => { window.opening = false }, 0)
    }
    const VIEWS = [['mail', 'Mail', 'mail'], ['calendar', 'Calendar', 'calendar'], ['people', 'People', 'users'], ['notes', 'Notes', 'sticky-note']]
    // A mailbox long enough for the navigation to scroll.
    const folders = Array.from({ length: 40 }, (_, i) => ({ label: 'Folder ' + i, icon: 'lucide-folder', onClick: () => {} }))
    window.lend = ({ dock = false, search = false, route = '/app/neomail', active = 'mail', views = VIEWS, noApp = false, placeholder = 'Search the mail' } = {}) => setPageNav({
        ...(noApp ? {} : { app: { name: 'mail', title: 'Mail' } }), route, nav: [{ label: 'ada@example.org', items: folders }],
        ...(dock ? { dock: views.map(([id, title, icon], i) => ({ id, title, icon, active: id === active, badge: i === 0 ? 3 : undefined,
            onClick: () => window.clicked.push(id) })) } : {}),
        ...(search ? { search: { ...(placeholder ? { placeholder } : {}), onQuery: (q) => window.heard.push(q) } } : {}),
    })
    window.giveBack = () => setPageNav(null)
    createRoot(document.getElementById('root')).render(createElement(NeoCockpit, { env: 'desk', layout: 'sidebar', utilities: [] }))
    // The desk's own search, wired as frappe desk.js wires it: once, on the boxes it finds after the first render.
    const wire = () => {
        const boxes = document.querySelectorAll('.neocockpit .nc-search')
        if (!boxes.length) { setTimeout(wire, 20); return }
        boxes.forEach((box) => {
            box.addEventListener('mousedown', (e) => { e.preventDefault(); open() })
            const input = box.querySelector('input')
            if (input) {
                input.readOnly = true
                input.addEventListener('focus', () => { input.blur(); open() })
            }
        })
        window.wired = true
    }
    wire()
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'g') { e.preventDefault(); open() }
    })
    // Something below the root that listens to the same keys (a field, an editor): it must still get them.
    window.belowRoot = 0
    document.getElementById('content').addEventListener('keydown', (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'g') window.belowRoot++ })
`

// One build for every session of this file.
let built
const workdir = mkdtemp(path.join(tmpdir(), 'neoffice-page-dock-'))
after(async () => { await rm(await workdir, { recursive: true, force: true }) })
async function fixture() {
    built ??= (async () => {
        const dir = await workdir
        const entry = path.join(dir, 'fixture.tsx')
        await writeFile(entry, FIXTURE(path.join(repository, 'src/NeoCockpit.tsx'), path.join(repository, 'src/pageNav.ts')))
        await build({
            entry: { fixture: entry }, outDir: dir, format: ['iife'], platform: 'browser',
            config: false, dts: false, clean: false, silent: true, injectStyle: true,
            noExternal: [/.*/], define: { 'process.env.NODE_ENV': '"development"' },
            outExtension: () => ({ js: '.js' }),
            esbuildOptions: options => { options.nodePaths = [path.join(repository, 'node_modules')] },
        })
        return readFile(path.join(dir, 'fixture.js'))
    })()
    return built
}

const PAGE = ({ folded, dark }) => `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' data:; connect-src 'none'">
    <style>html, body { height: 100%; margin: 0 } body { display: flex; background: #f5f3ef }
      [data-theme="dark"] body { background: #1b1917 } #root { display: contents } #content { flex: 1; min-width: 0 }</style>
    <script>window.FOLDED = ${Boolean(folded)}; window.DARK = ${Boolean(dark)}</script>
    <div id="root"></div><main id="content" tabindex="-1">NeoMail</main><script src="/fixture.js"></script>`

async function session({ width, height, mobile = false, folded = false, dark = false }, run) {
    assert.ok(chromium && existsSync(chromium), 'Chromium is required: set CHROME_BIN to an installed executable')
    const script = await fixture()
    const profile = await mkdtemp(path.join(tmpdir(), 'neoffice-page-dock-profile-'))
    const consoleLines = []
    let browser
    try {
        browser = spawn(chromium, [
            '--headless=new', '--remote-debugging-pipe', '--disable-background-networking', '--disable-component-update',
            '--disable-sync', '--no-first-run', '--no-default-browser-check',
            `--user-data-dir=${profile}`, 'about:blank',
        ], { stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] })
        let send
        const onEvent = (message) => {
            if (message.method === 'Fetch.requestPaused') {
                const { requestId, request } = message.params
                const url = new URL(request.url)
                const body = url.origin === ORIGIN && url.pathname === '/fixture.js' ? script
                    : url.origin === ORIGIN && url.pathname.startsWith('/app/') ? Buffer.from(PAGE({ folded, dark })) : null
                if (body) {
                    send('Fetch.fulfillRequest', { requestId, responseCode: 200, body: body.toString('base64'), responseHeaders: [
                        { name: 'Content-Type', value: url.pathname.endsWith('.js') ? 'text/javascript' : 'text/html; charset=utf-8' }] },
                    message.sessionId).catch(() => {})
                } else {
                    send('Fetch.failRequest', { requestId, errorReason: 'BlockedByClient' }, message.sessionId).catch(() => {})
                }
            } else if (message.method === 'Runtime.consoleAPICalled') {
                consoleLines.push(message.params.type + ': ' + message.params.args.map((a) => a.value ?? a.description ?? '').join(' '))
            } else if (message.method === 'Runtime.exceptionThrown') {
                consoleLines.push('exception: ' + (message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text))
            }
        }
        send = protocol(browser, onEvent)
        // The first command waits for Chromium to start, which can be slow on a busy machine.
        const { targetId } = await send('Target.createTarget', { url: 'about:blank' }, undefined, 45_000)
        const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
        const command = (method, params) => send(method, params, sessionId)
        const evaluate = async expression => {
            const response = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
            assert.equal(response.exceptionDetails, undefined, `fixture JavaScript ran successfully: ${expression.slice(0, 80)}`)
            return response.result.value
        }
        await command('Runtime.enable')
        await command('Fetch.enable', { patterns: [{ urlPattern: '*' }] })
        await command('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile })
        await command('Page.navigate', { url: `${ORIGIN}/app/neomail` })
        let ready = false
        for (let attempt = 0; attempt < 400 && !ready; attempt++) {
            ready = await evaluate(`Boolean(window.wired && document.querySelector('${mobile ? '.nc-mobilebar' : SIDE + ' .nc-mode-block, ' + SIDE + ' .nc-mode-pip'}'))`).catch(() => false)
            if (!ready) await new Promise(resolve => setTimeout(resolve, 25))
        }
        assert.ok(ready, 'the cockpit rendered and the desk wired its search')
        const painted = () => evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))')
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        const center = selector => evaluate(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()`)
        const clickAt = async point => {
            await command('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point })
            await command('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point })
            await command('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point })
            await painted()
        }
        const click = async selector => clickAt(await center(selector))
        const hover = async selector => { await command('Input.dispatchMouseEvent', { type: 'mouseMoved', ...await center(selector) }); await painted() }
        const key = async (keyName, code, keyCode, modifiers = 0) => {
            for (const type of ['keyDown', 'keyUp']) {
                await command('Input.dispatchKeyEvent', { type, key: keyName, code, windowsVirtualKeyCode: keyCode, modifiers })
            }
            await painted()
        }
        const ctrlG = () => key('g', 'KeyG', 71, 2)
        const type = async text => { await command('Input.insertText', { text }); await painted() }
        const tooltip = () => evaluate(`(() => { const t = document.querySelector('.nc-tooltip'); if (!t) return null
            const r = t.getBoundingClientRect(); return { text: t.textContent, above: t.classList.contains('above'), left: r.left, right: r.right, bottom: r.bottom } })()`)
        await run({ evaluate, painted, wait, click, clickAt, hover, key, ctrlG, type, tooltip, consoleLines })
        assert.deepEqual(consoleLines.filter((line) => /^(error|warning|assert|exception)/.test(line)), [], 'no error, no React warning')
    } finally {
        if (browser?.pid && browser.exitCode === null && browser.signalCode === null) {
            const exited = new Promise(resolve => browser.once('exit', resolve))
            browser.kill('SIGKILL')
            await exited
        }
        await rm(profile, { recursive: true, force: true })
    }
}

test('wide screen: the row sits above « Interface », the box stands in for the desk\'s, and both go with the page', { timeout: 90_000 }, async (t) => {
    await session({ width: 1280, height: 720 }, async ({ evaluate, painted, wait, click, clickAt, hover, key, ctrlG, type, tooltip }) => {
        // ── before any page lends: the desk's box, its overlay on ⌘G
        await evaluate(`window.deskBox = document.querySelector('${SIDE} .nc-search'); true`)
        await ctrlG()
        assert.equal(await evaluate('window.deskOpened'), 1, '⌘G opens the desk\'s search')

        // ── a page that lends neither (the webmail of /app/webmail, Drive…): nothing changes
        await evaluate('window.lend(); true')
        await painted()
        assert.deepEqual(await evaluate(`({
            dock: document.querySelectorAll('.nc-dock').length,
            pageBox: document.querySelectorAll('.nc-pagesearch').length,
            sameDeskBox: document.querySelector('${SIDE} .nc-search') === window.deskBox,
            deskBoxShown: getComputedStyle(window.deskBox).display !== 'none',
            folders: document.querySelectorAll('${SIDE} .nc-nav .nc-navitem').length,
        })`), { dock: 0, pageBox: 0, sameDeskBox: true, deskBoxShown: true, folders: 40 })
        await ctrlG()
        assert.equal(await evaluate('window.deskOpened'), 2, 'the desk\'s ⌘G is untouched')

        // ── NeoMail lends its views and its search
        await evaluate('window.lend({ dock: true, search: true }); true')
        await painted()
        const layout = await evaluate(`(() => {
            const side = document.querySelector('${SIDE}')
            const dock = side.querySelector('.nc-dock'), nav = side.querySelector('.nc-nav'), mode = side.querySelector('.nc-mode-block')
            const buttons = [...dock.querySelectorAll('.nc-dock-btn')]
            const rects = buttons.map((b) => b.getBoundingClientRect())
            return {
                insideNav: nav.contains(dock),
                justAboveInterface: dock.nextElementSibling === mode,
                navScrolls: nav.scrollHeight > nav.clientHeight + 40,
                inSight: dock.getBoundingClientRect().top >= 0 && dock.getBoundingClientRect().bottom <= mode.getBoundingClientRect().top + 1
                    && mode.getBoundingClientRect().bottom <= innerHeight,
                oneRow: rects.every((r) => Math.abs(r.top - rects[0].top) < 1),
                sameWidth: rects.every((r) => Math.abs(r.width - rects[0].width) < 1),
                labels: buttons.map((b) => b.getAttribute('aria-label')),
                current: buttons.map((b) => b.getAttribute('aria-current')),
                pressed: buttons.map((b) => b.getAttribute('aria-pressed')),
                lit: buttons.map((b) => b.classList.contains('active')),
                icons: buttons.map((b) => b.querySelector('svg')?.getAttribute('class') || ''),
                badge: dock.querySelector('.nc-dock-badge')?.textContent,
                group: dock.getAttribute('aria-label'),
                interface: side.querySelector('.nc-mode-head span').textContent,
            }
        })()`)
        assert.deepEqual({ ...layout, icons: undefined }, {
            insideNav: false, justAboveInterface: true, navScrolls: true, inSight: true, oneRow: true, sameWidth: true,
            // the page's words as it lent them (already translated by the page); the cockpit's own are the desk translator's
            labels: ['Mail (3)', 'Calendar', 'People', 'Notes'], group: 'Mail', interface: 'tr:Interface',
            current: ['true', null, null, null], pressed: [null, null, null, null],
            lit: [true, false, false, false],
            icons: undefined, badge: '3',
        })
        // the lucide icons the page names, none fallen back to the circle of an unknown name
        assert.deepEqual(layout.icons.map((c) => /lucide-(mail|calendar|users|sticky-note)\b/.test(c)), [true, true, true, true], layout.icons.join(' | '))
        // scrolled to the end of its folders, the row has not moved
        const before = await evaluate(`document.querySelector('${SIDE} .nc-dock').getBoundingClientRect().top`)
        await evaluate(`document.querySelector('${SIDE} .nc-nav').scrollTop = 1e6; true`)
        await painted()
        assert.equal(await evaluate(`document.querySelector('${SIDE} .nc-dock').getBoundingClientRect().top`), before)

        // the lit icon: the accent, ≥ 3:1 on its background and on the frame, and a bar that is not a colour only
        const contrast = await evaluate(CONTRAST)
        t.diagnostic('light, the lit icon: ' + JSON.stringify(contrast))
        assert.ok(contrast.iconOnButton >= 3 && contrast.iconOnFrame >= 3 && contrast.barOnFrame >= 3, JSON.stringify(contrast))
        assert.deepEqual([contrast.barOnActive, contrast.barOnOthers], [true, false])

        // a click tells the page and takes the tip away; the tip names the icon, over it, inside the window
        await hover(`${SIDE} .nc-dock-btn:nth-child(1)`)
        const first = await tooltip()
        assert.equal(first.text, 'Mail')
        assert.ok(first.above && first.left >= 5, `the first icon's tip stays inside the window: ${JSON.stringify(first)}`)
        await click(`${SIDE} .nc-dock-btn:nth-child(2)`)
        assert.deepEqual(await evaluate('window.clicked'), ['calendar'])
        assert.equal(await tooltip(), null, 'the tip goes with the click')
        await hover(`${SIDE} .nc-dock-btn:nth-child(3)`)
        const third = await tooltip()
        assert.deepEqual({ text: third.text, above: third.above, over: third.bottom <= await evaluate(`document.querySelector('${SIDE} .nc-dock-btn:nth-child(3)').getBoundingClientRect().top + 1`) },
            { text: 'People', above: true, over: true })

        // the desk's box: the same node, hidden; the page's box in its place, free of the desk's overlay
        assert.deepEqual(await evaluate(`(() => {
            const page = document.querySelector('${SIDE} .nc-pagesearch input')
            return { sameDeskBox: document.querySelector('${SIDE} .nc-search') === window.deskBox,
                deskBoxHidden: getComputedStyle(window.deskBox).display === 'none',
                pageBoxFirst: window.deskBox.previousElementSibling === document.querySelector('${SIDE} .nc-pagesearch'),
                placeholder: page.placeholder, readOnly: page.readOnly,
                kbd: /^(⌘G|Ctrl G)$/.test(document.querySelector('${SIDE} .nc-pagesearch .kbd')?.textContent || '') }
        })()`), { sameDeskBox: true, deskBoxHidden: true, pageBoxFirst: true, placeholder: 'Search the mail', readOnly: false, kbd: true })
        await click(`${SIDE} .nc-pagesearch`)
        await type('inv')
        assert.deepEqual(await evaluate('window.heard'), [], 'not while the person types')
        await wait(400)
        assert.deepEqual(await evaluate('window.heard'), ['inv'], 'after a short pause')
        await key('Enter', 'Enter', 13)
        assert.deepEqual(await evaluate('window.heard'), ['inv', 'inv'], 'at once on Enter')
        await key('Escape', 'Escape', 27)
        assert.deepEqual(await evaluate(`({ heard: window.heard, value: document.querySelector('${SIDE} .nc-pagesearch input').value })`),
            { heard: ['inv', 'inv', ''], value: '' }, "'' on Escape, the box emptied")

        // a word being composed (an accent, an input method) is not a query until it is composed
        await evaluate(`(() => {
            const input = document.querySelector('${SIDE} .nc-pagesearch input')
            const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
            input.focus()
            input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true, data: '' }))
            set.call(input, 'caf')
            input.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true, data: 'caf', inputType: 'insertCompositionText' }))
            return true
        })()`)
        await wait(400)
        assert.deepEqual(await evaluate('window.heard'), ['inv', 'inv', ''], 'nothing while composing')
        await evaluate(`(() => {
            const input = document.querySelector('${SIDE} .nc-pagesearch input')
            const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
            set.call(input, 'café')
            input.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true, data: 'café', inputType: 'insertCompositionText' }))
            input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, data: 'café' }))
            return true
        })()`)
        await wait(400)
        assert.deepEqual(await evaluate('window.heard'), ['inv', 'inv', '', 'café'], 'the composed word, after the pause')
        await key('Escape', 'Escape', 27)

        // ⌘G: to the page's box; the desk's overlay stays shut, and what is below the root still gets the key
        await evaluate(`document.activeElement.blur(); document.getElementById('content').focus(); true`)
        await ctrlG()
        assert.deepEqual(await evaluate(`({ opened: window.deskOpened, belowRoot: window.belowRoot,
            focused: document.activeElement === document.querySelector('${SIDE} .nc-pagesearch input') })`),
            { opened: 2, belowRoot: 1, focused: true }, '⌘G goes to the page\'s box, the desk\'s overlay stays shut')

        // ── the reader leaves by the address (the desk's router), before the pause ends: the page is told nothing
        await type('abc')
        await evaluate(`window.goTo('/app/home'); true`)
        await painted()
        await wait(400)
        assert.deepEqual(await evaluate(`({ heard: window.heard,
            dock: document.querySelectorAll('.nc-dock').length, pageBox: document.querySelectorAll('.nc-pagesearch').length,
            sameDeskBox: document.querySelector('${SIDE} .nc-search') === window.deskBox,
            deskBoxShown: getComputedStyle(window.deskBox).display !== 'none' })`),
            { heard: ['inv', 'inv', '', 'café', ''], dock: 0, pageBox: 0, sameDeskBox: true, deskBoxShown: true })
        // back on the page: the box shows what the page heard, not what it never got
        await evaluate(`window.goTo('/app/neomail'); true`)
        await painted()
        assert.equal(await evaluate(`document.querySelector('${SIDE} .nc-pagesearch input').value`), '')
        await click(`${SIDE} .nc-pagesearch`)
        await type('devis')
        await wait(400)
        assert.deepEqual((await evaluate('window.heard')).slice(-1), ['devis'])
        // a tip on screen when the reader leaves goes with the row
        await hover(`${SIDE} .nc-dock-btn:nth-child(4)`)
        assert.equal((await tooltip())?.text, 'Notes')
        await evaluate(`window.goTo('/app/home'); true`)
        await painted()
        assert.equal(await tooltip(), null, 'no tip left behind by the row')
        await evaluate(`window.goTo('/app/neomail'); true`)
        await painted()
        assert.equal(await evaluate(`document.querySelector('${SIDE} .nc-pagesearch input').value`), 'devis', 'the page\'s search, as the page left it')
        await evaluate(`window.goTo('/app/home'); true`)
        await painted()
        await ctrlG()
        assert.equal(await evaluate('window.deskOpened'), 3, 'away from the page, the desk\'s ⌘G is back')
        await click(`${SIDE} .nc-search`)
        assert.equal(await evaluate('window.deskOpened'), 4, 'and its box opens its overlay as before: the same wired node')
        await evaluate(`window.goTo('/app/neomail'); true`)
        await painted()

        // ── folded: the same icons stacked, at the same place, their tips beside them
        await evaluate('document.activeElement.blur(); true')
        await click(`${SIDE} .nc-collapse`)
        await wait(350)
        assert.deepEqual(await evaluate(`(() => {
            const side = document.querySelector('${SIDE}')
            const dock = side.querySelector('.nc-dock'), rects = [...dock.querySelectorAll('.nc-dock-btn')].map((b) => b.getBoundingClientRect())
            return { folded: side.classList.contains('collapsed'), stacked: dock.classList.contains('nc-dock-stacked'),
                column: rects.every((r, i) => Math.abs(r.left - rects[0].left) < 1 && (i === 0 || r.top >= rects[i - 1].bottom - 1)),
                justAboveInterface: dock.nextElementSibling === side.querySelector('.nc-mode-pip'),
                insideNav: side.querySelector('.nc-nav').contains(dock),
                inSight: rects[rects.length - 1].bottom <= innerHeight, pinned: localStorage.getItem('neocockpit-pinned') }
        })()`), { folded: true, stacked: true, column: true, justAboveInterface: true, insideNav: false, inSight: true, pinned: 'false' })
        await hover(`${SIDE} .nc-dock-btn:nth-child(4)`)
        assert.deepEqual(await tooltip().then((t) => ({ text: t?.text, above: t?.above })), { text: 'Notes', above: false })
        // the folded box: a tip on focus too
        await evaluate(`document.querySelector('${SIDE} .nc-pagesearch').focus(); true`)
        await painted()
        assert.equal((await tooltip())?.text, 'Search the mail')
        // ⌘G unfolds the sidebar for the box, without changing the reader's choice; a touch outside folds it back
        await ctrlG()
        await painted()
        assert.deepEqual(await evaluate(`({ unfolded: document.querySelector('${SIDE}').classList.contains('expanded'),
            pinned: localStorage.getItem('neocockpit-pinned'), drawer: document.querySelectorAll('.nc-drawer.open').length,
            focused: document.activeElement === document.querySelector('${SIDE} .nc-pagesearch input') })`),
            { unfolded: true, pinned: 'false', drawer: 0, focused: true })
        await click(`${SIDE} .nc-dock-btn:nth-child(2)`)
        assert.equal(await evaluate(`document.querySelector('${SIDE}').classList.contains('expanded')`), true, 'a click in the sidebar keeps it open')
        await clickAt({ x: 900, y: 300 })
        await painted()
        assert.deepEqual(await evaluate(`({ folded: document.querySelector('${SIDE}').classList.contains('collapsed'),
            pinned: localStorage.getItem('neocockpit-pinned') })`), { folded: true, pinned: 'false' })

        // ── robustness: two icons lent with the same id are both drawn (no key warning: checked at the end of the session),
        // a navigation lent without its app does not take the sidebar down, and a page without a placeholder gets the cockpit's
        await evaluate(`window.lend({ dock: true, search: true, views: [['mail', 'Mail', 'mail'], ['mail', 'Mail again', 'mail']] }); true`)
        await painted()
        assert.equal(await evaluate(`document.querySelectorAll('${SIDE} .nc-dock-btn').length`), 2)
        await evaluate(`window.lend({ dock: true, search: true, noApp: true, placeholder: '' }); true`)
        await painted()
        assert.deepEqual(await evaluate(`({ sidebar: Boolean(document.querySelector('${SIDE} .nc-nav')),
            placeholder: document.querySelector('${SIDE} .nc-pagesearch')?.getAttribute('aria-label') })`),
            { sidebar: true, placeholder: 'tr:Search…' })
        await evaluate('window.giveBack(); true')
    })
})

// The lit icon against what is around it (WCAG contrast), and its bar; colours read through a canvas, whatever their syntax.
const CONTRAST = `(() => {
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
    const rgb = (color) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3) }
    const lum = (c) => { const [r, g, b] = rgb(c).map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
    const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100 }
    const buttons = [...document.querySelectorAll('${SIDE} .nc-dock-btn')]
    const active = buttons.find((b) => b.classList.contains('active')), other = buttons.find((b) => !b.classList.contains('active'))
    const frame = getComputedStyle(document.body).backgroundColor
    const icon = getComputedStyle(active).color, bar = getComputedStyle(active, '::after').backgroundColor
    return { iconOnButton: ratio(icon, getComputedStyle(active).backgroundColor), iconOnFrame: ratio(icon, frame), barOnFrame: ratio(bar, frame),
        iconAgainstOthers: ratio(icon, getComputedStyle(other).color),
        barOnActive: getComputedStyle(active, '::after').content !== 'none', barOnOthers: getComputedStyle(other, '::after').content !== 'none' }
})()`

test('dark: the lit icon of the row stands out', { timeout: 60_000 }, async (t) => {
    await session({ width: 1280, height: 720, dark: true }, async ({ evaluate, painted }) => {
        await evaluate(`window.lend({ dock: true, search: true, active: 'calendar' }); true`)
        await painted()
        const contrast = await evaluate(CONTRAST)
        t.diagnostic('dark, the lit icon: ' + JSON.stringify(contrast))
        assert.ok(contrast.iconOnButton >= 3 && contrast.iconOnFrame >= 3 && contrast.barOnFrame >= 3, JSON.stringify(contrast))
        assert.deepEqual([contrast.barOnActive, contrast.barOnOthers], [true, false])
        assert.equal(await evaluate(`document.documentElement.getAttribute('data-theme')`), 'dark')
    })
})

test('900 px (the rail is always folded): the box unfolds the sidebar, the mobile drawer stays shut', { timeout: 60_000 }, async () => {
    await session({ width: 900, height: 720 }, async ({ evaluate, painted, wait, click, clickAt, ctrlG }) => {
        await evaluate('window.lend({ dock: true, search: true }); true')
        await painted()
        const state = () => evaluate(`({ unfolded: document.querySelector('${SIDE}').classList.contains('expanded'),
            drawer: document.querySelectorAll('.nc-drawer.open').length, pinned: localStorage.getItem('neocockpit-pinned'),
            focused: document.activeElement === document.querySelector('${SIDE} .nc-pagesearch input') })`)
        assert.deepEqual(await state(), { unfolded: false, drawer: 0, pinned: 'true', focused: false })
        await click(`${SIDE} .nc-pagesearch`)
        await wait(50)
        assert.deepEqual(await state(), { unfolded: true, drawer: 0, pinned: 'true', focused: true })
        await clickAt({ x: 700, y: 300 })
        assert.deepEqual(await state(), { unfolded: false, drawer: 0, pinned: 'true', focused: false })
        await ctrlG()
        await wait(50)
        assert.deepEqual(await state(), { unfolded: true, drawer: 0, pinned: 'true', focused: true })
    })
})

test('375 px: the strip\'s search opens the drawer on the page\'s box, and a view chosen there leaves no tip behind', { timeout: 60_000 }, async () => {
    await session({ width: 375, height: 812, mobile: true }, async ({ evaluate, painted, wait, click, hover, tooltip }) => {
        await evaluate('window.lend({ dock: true, search: true }); true')
        await painted()
        assert.equal(await evaluate(`document.querySelector('.nc-mobilesearch .ph').textContent`), 'Search the mail')
        await click('.nc-mobilesearch')
        await wait(350)
        assert.deepEqual(await evaluate(`({ drawer: document.querySelectorAll('.nc-drawer.open').length,
            focused: document.activeElement === document.querySelector('.nc-drawer .nc-pagesearch input') })`), { drawer: 1, focused: true })
        await hover('.nc-drawer .nc-dock-btn:nth-child(2)')
        assert.equal(await tooltip(), null, 'no tip in the drawer')
        await click('.nc-drawer .nc-dock-btn:nth-child(2)')
        await wait(350)
        assert.deepEqual(await evaluate(`({ clicked: window.clicked, drawer: document.querySelectorAll('.nc-drawer.open').length })`),
            { clicked: ['calendar'], drawer: 0 })
        assert.equal(await tooltip(), null, 'and none left once the drawer has closed')
    })
})
