//// Neoffice — added file (no upstream equivalent): the row of icons and the search box a desk page lends the cockpit
//// (src/pageNav.ts `dock` and `search`, 21.10.2026), in the real React sidebar, in offline Chromium.
// Jérémy, seeing NeoMail in the desk: its views as icons side by side, always in sight just above « Interface », and the
// sidebar's search box searching in NeoMail while its folders are shown. The desk wires its own search overlay on the
// sidebar's box by hand (frappe desk.js setup_cockpit_awesomebar); the fixture wires it the same way, to show that the
// page's box is free of it, and that the desk's box comes back, wired, when the reader leaves the page.
// Run npm run test:cockpit-browser; an installed Chrome/Chromium is required (override discovery with CHROME_BIN).
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'tsup'

const repository = fileURLToPath(new URL('../', import.meta.url))
const chromium = process.env.CHROME_BIN || [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
].find(existsSync)

// The debugging pipe keeps this fixture offline, without opening a TCP port (as collapseTooltip.test.mjs).
function protocol(browser) {
    let sequence = 0
    let buffered = Buffer.alloc(0)
    const pending = new Map()
    browser.stdio[4].on('data', chunk => {
        buffered = Buffer.concat([buffered, chunk])
        assert.ok(buffered.length < 2 * 1024 * 1024, 'bounded browser protocol output')
        let end
        while ((end = buffered.indexOf(0)) !== -1) {
            const message = JSON.parse(buffered.subarray(0, end).toString())
            buffered = buffered.subarray(end + 1)
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
    return (method, params = {}, sessionId) => new Promise((resolve, reject) => {
        const id = ++sequence
        const timeout = setTimeout(() => {
            pending.delete(id)
            reject(new Error(`Browser command timed out: ${method}`))
        }, 10_000)
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
    // The desk's translator, made to change every word it is given: the cockpit's own words go through it, the words a
    // page lends (its icons' names, its placeholder) come already translated by the page, in their context (« Notes »
    // is not the « Remarques » of another app), and must be shown as they are.
    window.__ = (text) => 'tr:' + text
    window.frappe = { boot: { lang: 'en', neo_mode: 'Advanced', user: { name: 'ada@example.org', email: 'ada@example.org' },
        sidebar_pages: { pages: [] }, app_data: [] } }
    window.fetch = async () => new Response('{"message":[]}', { headers: { 'Content-Type': 'application/json' } })
    const here = decodeURIComponent(location.pathname)
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
    // A mailbox long enough for the navigation to scroll.
    const folders = Array.from({ length: 40 }, (_, i) => ({ label: 'Folder ' + i, icon: 'lucide-folder', onClick: () => {} }))
    window.lend = ({ dock = false, search = false, route = here, active = 'mail' } = {}) => setPageNav({
        app: { name: 'mail', title: 'Mail' }, route, nav: [{ label: 'ada@example.org', items: folders }],
        ...(dock ? { dock: ['mail', 'calendar', 'users', 'sticky-note'].map((icon, i) => ({
            id: ['mail', 'calendar', 'people', 'notes'][i], title: ['Mail', 'Calendar', 'People', 'Notes'][i], icon,
            active: ['mail', 'calendar', 'people', 'notes'][i] === active, badge: i === 0 ? 3 : undefined,
            onClick: () => window.clicked.push(['mail', 'calendar', 'people', 'notes'][i]),
        })) } : {}),
        ...(search ? { search: { placeholder: 'Search the mail', onQuery: (q) => window.heard.push(q) } } : {}),
    })
    window.giveBack = () => setPageNav(null)
    window.NeoCockpit_lendBare = () => setPageNav({ app: { name: 'mail', title: 'Mail' }, route: here, nav: [],
        search: { onQuery: (q) => window.heard.push(q) } })
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
`

test('a page\'s row of icons sits above « Interface » and its search box stands in for the desk\'s while it is shown', { timeout: 60_000 }, async () => {
    assert.ok(chromium && existsSync(chromium), 'Chromium is required: set CHROME_BIN to an installed executable')
    const temporary = await mkdtemp(path.join(tmpdir(), 'neoffice-page-dock-'))
    let browser
    try {
        const entry = path.join(temporary, 'fixture.tsx')
        await writeFile(entry, FIXTURE(path.join(repository, 'src/NeoCockpit.tsx'), path.join(repository, 'src/pageNav.ts')))
        await build({
            entry: { fixture: entry }, outDir: temporary, format: ['iife'], platform: 'browser',
            config: false, dts: false, clean: false, silent: true, injectStyle: true,
            noExternal: [/.*/], define: { 'process.env.NODE_ENV': '"production"' },
            outExtension: () => ({ js: '.js' }),
            esbuildOptions: options => { options.nodePaths = [path.join(repository, 'node_modules')] },
        })
        await writeFile(path.join(temporary, 'fixture.html'), `<!doctype html><meta charset="utf-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src file:; style-src 'unsafe-inline'; img-src data: file:; font-src data: file:; connect-src 'none'">
            <style>html, body { height: 100%; margin: 0 } #root { height: 100vh; display: flex }</style>
            <div id="root"></div><script src="fixture.js"></script>`)
        browser = spawn(chromium, [
            '--headless=new', '--remote-debugging-pipe', '--disable-background-networking', '--disable-component-update',
            '--disable-sync', '--no-first-run', '--no-default-browser-check',
            `--user-data-dir=${path.join(temporary, 'profile')}`, 'about:blank',
        ], { stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] })
        const send = protocol(browser)
        const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
        const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
        const command = (method, params) => send(method, params, sessionId)
        const evaluate = async expression => {
            const response = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
            assert.equal(response.exceptionDetails, undefined, `fixture JavaScript ran successfully: ${expression.slice(0, 80)}`)
            return response.result.value
        }
        await command('Network.enable')
        await command('Network.setBlockedURLs', { urls: ['http://*', 'https://*'] })
        await command('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false })
        await command('Page.navigate', { url: pathToFileURL(path.join(temporary, 'fixture.html')).href })
        for (let attempt = 0; attempt < 200; attempt++) {
            if (await evaluate('Boolean(window.wired && document.querySelector(".nc-side.responsive .nc-mode-block"))')) break
            await new Promise(resolve => setTimeout(resolve, 25))
        }
        const painted = () => evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))')
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        const SIDE = '.nc-side.responsive'
        const center = selector => evaluate(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()`)
        const click = async selector => {
            const point = await center(selector)
            await command('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point })
            await command('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point })
            await painted()
        }
        const hover = async selector => { await command('Input.dispatchMouseEvent', { type: 'mouseMoved', ...await center(selector) }); await painted() }
        const key = async (keyName, code, keyCode, modifiers = 0) => {
            for (const type of ['keyDown', 'keyUp']) {
                await command('Input.dispatchKeyEvent', { type, key: keyName, code, windowsVirtualKeyCode: keyCode, modifiers })
            }
            await painted()
        }
        const ctrlG = () => key('g', 'KeyG', 71, 2)

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
                pressed: buttons.map((b) => b.getAttribute('aria-pressed')),
                lit: buttons.map((b) => b.classList.contains('active')),
                icons: buttons.map((b) => b.querySelector('svg')?.getAttribute('class') || ''),
                badge: dock.querySelector('.nc-dock-badge')?.textContent,
            }
        })()`)
        assert.deepEqual({ ...layout, icons: undefined }, {
            insideNav: false, justAboveInterface: true, navScrolls: true, inSight: true, oneRow: true, sameWidth: true,
            labels: ['Mail (3)', 'Calendar', 'People', 'Notes'],
            pressed: ['true', 'false', 'false', 'false'],
            lit: [true, false, false, false],
            icons: undefined, badge: '3',
        })
        // the cockpit's own words are the desk translator's; the page's are shown as it lent them, translated by the page
        assert.equal(await evaluate(`document.querySelector('${SIDE} .nc-mode-head span').textContent`), 'tr:Interface')
        assert.equal(await evaluate(`document.querySelector('${SIDE} .nc-dock').getAttribute('aria-label')`), 'Mail')
        // the lucide icons the page names, none fallen back to the circle of an unknown name
        assert.deepEqual(layout.icons.map((c) => /lucide-(mail|calendar|users|sticky-note)\b/.test(c)), [true, true, true, true], layout.icons.join(' | '))
        // scrolled to the end of its folders, the row has not moved
        const before = await evaluate(`document.querySelector('${SIDE} .nc-dock').getBoundingClientRect().top`)
        await evaluate(`document.querySelector('${SIDE} .nc-nav').scrollTop = 1e6; true`)
        await painted()
        assert.equal(await evaluate(`document.querySelector('${SIDE} .nc-dock').getBoundingClientRect().top`), before)

        // a click tells the page; the tip names the icon, over it
        await click(`${SIDE} .nc-dock-btn:nth-child(2)`)
        assert.deepEqual(await evaluate('window.clicked'), ['calendar'])
        await hover(`${SIDE} .nc-dock-btn:nth-child(3)`)
        assert.deepEqual(await evaluate(`(() => {
            const tip = document.querySelector('.nc-tooltip'), button = document.querySelector('${SIDE} .nc-dock-btn:nth-child(3)')
            return { text: tip?.textContent, above: tip?.classList.contains('above'),
                over: tip ? tip.getBoundingClientRect().bottom <= button.getBoundingClientRect().top + 1 : false }
        })()`), { text: 'People', above: true, over: true })

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
        await command('Input.insertText', { text: 'inv' })
        await painted()
        assert.deepEqual(await evaluate('window.heard'), [], 'not while the person types')
        await wait(400)
        assert.deepEqual(await evaluate('window.heard'), ['inv'], 'after a short pause')
        await key('Enter', 'Enter', 13)
        assert.deepEqual(await evaluate('window.heard'), ['inv', 'inv'], 'at once on Enter')
        await key('Escape', 'Escape', 27)
        assert.deepEqual(await evaluate(`({ heard: window.heard, value: document.querySelector('${SIDE} .nc-pagesearch input').value })`),
            { heard: ['inv', 'inv', ''], value: '' }, "'' on Escape, the box emptied")
        await evaluate('document.activeElement.blur(); true')
        await ctrlG()
        assert.deepEqual(await evaluate(`({ opened: window.deskOpened,
            focused: document.activeElement === document.querySelector('${SIDE} .nc-pagesearch input') })`),
            { opened: 2, focused: true }, '⌘G goes to the page\'s box, the desk\'s overlay stays shut')

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
                inSight: rects[rects.length - 1].bottom <= innerHeight }
        })()`), { folded: true, stacked: true, column: true, justAboveInterface: true, insideNav: false, inSight: true })
        await hover(`${SIDE} .nc-dock-btn:nth-child(4)`)
        assert.deepEqual(await evaluate(`({ text: document.querySelector('.nc-tooltip')?.textContent,
            above: document.querySelector('.nc-tooltip')?.classList.contains('above') })`), { text: 'Notes', above: false })
        await click(`${SIDE} .nc-collapse`)
        await wait(350)

        // ── the reader leaves the page; NeoMail goes on publishing from the background
        await evaluate(`window.lend({ dock: true, search: true, route: '/app/neomail' }); true`)
        await painted()
        assert.deepEqual(await evaluate(`({
            dock: document.querySelectorAll('.nc-dock').length,
            pageBox: document.querySelectorAll('.nc-pagesearch').length,
            sameDeskBox: document.querySelector('${SIDE} .nc-search') === window.deskBox,
            deskBoxShown: getComputedStyle(window.deskBox).display !== 'none',
        })`), { dock: 0, pageBox: 0, sameDeskBox: true, deskBoxShown: true })
        await ctrlG()
        assert.equal(await evaluate('window.deskOpened'), 3, 'the desk\'s ⌘G is back')
        await click(`${SIDE} .nc-search`)
        assert.equal(await evaluate('window.deskOpened'), 4, 'and its box opens its overlay as before: the same wired node')
        assert.deepEqual(await evaluate('window.heard'), ['inv', 'inv', ''], 'the page was told nothing more')
        assert.equal(await evaluate(`document.querySelector('${SIDE} .nc-search input').placeholder`), 'tr:Search…',
            'the desk\'s own placeholder, translated by the desk')

        // ── a page that lends a search with no placeholder of its own: the cockpit's own word, translated
        await evaluate(`window.NeoCockpit_lendBare(); true`)
        await painted()
        assert.equal(await evaluate(`document.querySelector('${SIDE} .nc-pagesearch input').placeholder`), 'tr:Search…')
        await evaluate('window.giveBack(); true')
    } finally {
        if (browser?.pid && browser.exitCode === null && browser.signalCode === null) {
            const exited = new Promise(resolve => browser.once('exit', resolve))
            browser.kill('SIGKILL')
            await exited
        }
        await rm(temporary, { recursive: true, force: true })
    }
})
