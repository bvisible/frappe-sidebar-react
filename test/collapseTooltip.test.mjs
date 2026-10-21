//// Neoffice — added file (no upstream equivalent): exercise the real React rail in offline Chromium.
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

// The debugging pipe keeps this fixture offline, without opening a TCP port or adding a browser dependency.
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

test('expanding the real collapsed rail dismisses its tooltip before and after pointer exit', { timeout: 45_000 }, async () => {
    assert.ok(chromium && existsSync(chromium), 'Chromium is required: set CHROME_BIN to an installed executable')
    const temporary = await mkdtemp(path.join(tmpdir(), 'neoffice-collapse-tooltip-'))
    let browser
    try {
        const entry = path.join(temporary, 'fixture.tsx')
        await writeFile(entry, `
            import { createElement } from 'react'
            import { createRoot } from 'react-dom/client'
            import NeoCockpit from ${JSON.stringify(path.join(repository, 'src/NeoCockpit.tsx'))}
            localStorage.clear()
            localStorage.setItem('neocockpit-pinned', 'false')
            window.frappe = { boot: { lang: 'en', user: { name: 'Guest' }, sidebar_pages: { pages: [] }, app_data: [] } }
            window.fetch = async () => new Response('{"message":[]}', { headers: { 'Content-Type': 'application/json' } })
            createRoot(document.getElementById('root')).render(createElement(NeoCockpit, { env: 'desk', layout: 'sidebar', utilities: [] }))
        `)
        await build({
            entry: { fixture: entry }, outDir: temporary, format: ['iife'], platform: 'browser',
            config: false, dts: false, clean: false, silent: true, injectStyle: true,
            noExternal: [/.*/], define: { 'process.env.NODE_ENV': '"production"' },
            outExtension: () => ({ js: '.js' }),
            esbuildOptions: options => { options.nodePaths = [path.join(repository, 'node_modules')] },
        })
        await writeFile(path.join(temporary, 'fixture.html'), `<!doctype html><meta charset="utf-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src file:; style-src 'unsafe-inline'; img-src data: file:; font-src data: file:; connect-src 'none'">
            <div id="root"></div><script src="fixture.js"></script>`)
        browser = spawn(chromium, [
            '--headless=new', '--remote-debugging-pipe', '--disable-background-networking', '--disable-component-update',
            '--disable-sync', '--no-first-run', '--no-default-browser-check',
            `--user-data-dir=${path.join(temporary, 'profile')}`, 'about:blank',
        ], { stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] })
        const send = protocol(browser)
        // The first command waits for Chromium to start, which can be slow on a busy machine (21.10.2026: 10 s were not enough).
        const { targetId } = await send('Target.createTarget', { url: 'about:blank' }, undefined, 45_000)
        const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
        const command = (method, params) => send(method, params, sessionId)
        const evaluate = async expression => {
            const response = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
            assert.equal(response.exceptionDetails, undefined, 'fixture JavaScript ran successfully')
            return response.result.value
        }
        await command('Network.enable')
        await command('Network.setBlockedURLs', { urls: ['http://*', 'https://*'] })
        await command('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false })
        await command('Page.navigate', { url: pathToFileURL(path.join(temporary, 'fixture.html')).href })
        let ready = false
        for (let attempt = 0; attempt < 100 && !ready; attempt++) {
            ready = await evaluate('Boolean(document.querySelector(".nc-collapse"))')
            if (!ready) await new Promise(resolve => setTimeout(resolve, 25))
        }
        assert.ok(ready, 'the rail rendered') // rather than going on and failing further down for another reason
        const painted = () => evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))')
        const position = () => evaluate('(() => { const r = document.querySelector(".nc-collapse").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()')
        const hover = async () => { await command('Input.dispatchMouseEvent', { type: 'mouseMoved', ...await position() }); await painted() }
        const click = async () => {
            const point = await position()
            await command('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point })
            await command('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point })
            await painted()
        }
        const leave = async () => { await command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 1100, y: 100 }); await painted() }
        const state = () => evaluate('({ tooltip: document.querySelector(".nc-tooltip")?.textContent ?? null, expanded: Boolean(document.querySelector(".nc-side.responsive.expanded")), savedPinned: localStorage.getItem("neocockpit-pinned") })')
        await hover()
        const hovered = await state()
        await click()
        const clicked = await state()
        await leave()
        const left = await state()
        await click()
        await leave()
        await hover()
        const hoveredAgain = await state()
        await leave()
        const leftAgain = await state()
        assert.deepEqual({ hovered, clicked, left, hoveredAgain, leftAgain }, {
            hovered: { tooltip: 'Expand', expanded: false, savedPinned: 'false' },
            clicked: { tooltip: null, expanded: true, savedPinned: 'true' },
            left: { tooltip: null, expanded: true, savedPinned: 'true' },
            hoveredAgain: { tooltip: 'Expand', expanded: false, savedPinned: 'false' },
            leftAgain: { tooltip: null, expanded: false, savedPinned: 'false' },
        })
    } finally {
        if (browser?.pid && browser.exitCode === null && browser.signalCode === null) {
            const exited = new Promise(resolve => browser.once('exit', resolve))
            browser.kill('SIGKILL')
            await exited
        }
        await rm(temporary, { recursive: true, force: true })
    }
})
