//// Neoffice — added file (no upstream equivalent): the cockpit's button reset must yield to the hosted app's own classes.
// Run npm run test:cockpit-browser; an installed Chrome/Chromium is required (override discovery with CHROME_BIN).
//
// The cockpit resets every button it holds (font, cursor, border, colour, background). An app mounted in the shell
// (Mint, Raven, Construction: <main class="nc-panel">) colours its buttons with classes: Tailwind v3 utilities
// (unlayered, 0,1,0) and Tailwind v4 / shadcn utilities (inside @layer utilities, where any unlayered rule wins
// whatever its specificity). An unlayered `.neocockpit button { color: inherit }` (0,1,1) beat both: dark ink on the
// primary button, the light text of a filled button flattened (neoffice-maintenance#1000, #2302). The page below is
// loaded the way an app sees it (its own sheet first, the cockpit's injected sheet after) and reads computed styles.
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const repository = fileURLToPath(new URL('../', import.meta.url))
const chromium = process.env.CHROME_BIN || [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
].find(existsSync)

const INK = 'rgb(40, 40, 40)'

// What a Tailwind v4 / shadcn app ships: a layer statement, its preflight in `base`, its utilities in `utilities`.
const TAILWIND_V4 = `
@layer theme, base, components, utilities;
@layer base { *, ::before, ::after { border: 0 solid; } button { color: inherit; background-color: transparent; } }
@layer utilities {
  .text-primary-foreground { color: rgb(250, 250, 250); }
  .bg-primary { background-color: rgb(20, 20, 20); }
  .border { border-style: solid; border-width: 1px; }
}`
// What a Tailwind v3 app ships: the preflight and the utilities, unlayered.
const TAILWIND_V3 = `
*, ::before, ::after { border-width: 0; border-style: solid; }
button { color: inherit; background-color: transparent; cursor: pointer; }
.text-emerald-700 { color: rgb(4, 120, 87); }
.bg-emerald-600 { background-color: rgb(5, 150, 105); }
.border-2 { border-width: 2px; }`
// A host rule on bare buttons (the desk's or a bootstrap sheet), which the cockpit's own buttons must keep beating.
const HOST_SHEET = 'aside button { color: rgb(255, 0, 0); border: 3px solid rgb(255, 0, 0); background: rgb(255, 0, 0); }'

const body = (filled, outlined) => `
<div class="neocockpit nc-frame" style="color: ${INK}">
  <aside><button id="chrome" class="nc-context-row text-sm">menu row</button></aside>
  <main class="nc-panel">
    <button id="filled" class="${filled}">Filled</button>
    <button id="outlined" class="${outlined}">Outlined</button>
    <button id="plain">Plain</button>
  </main>
</div>
<pre id="out"></pre>
<script>
  const read = id => { const s = getComputedStyle(document.getElementById(id));
    return { color: s.color, border: s.borderTopWidth + ' ' + s.borderTopStyle, background: s.backgroundColor, cursor: s.cursor } }
  document.getElementById('out').textContent = JSON.stringify(Object.fromEntries(
    ['chrome', 'filled', 'outlined', 'plain'].map(id => [id, read(id)])))
</script>`

async function computed(appSheet, filled, outlined) {
    assert.ok(chromium && existsSync(chromium), 'Chromium is required: set CHROME_BIN to an installed executable')
    const temporary = await mkdtemp(path.join(tmpdir(), 'neoffice-button-reset-'))
    try {
        const cockpit = await readFile(path.join(repository, 'src/cockpit.css'), 'utf8')
        const page = path.join(temporary, 'fixture.html')
        await writeFile(page, `<!doctype html><meta charset="utf-8">
            <style>${appSheet}</style><style>${HOST_SHEET}</style><style>${cockpit}</style>${body(filled, outlined)}`)
        // Chromium on a busy Mac can end on "Teardown watchdog expired" (exit 2) AFTER printing the page: the output
        // is what counts, the exit code of the browser's own shutdown is not.
        const stdout = await promisify(execFile)(chromium, [
            '--headless=new', '--disable-gpu', '--disable-background-networking', '--disable-component-update',
            '--disable-sync', '--no-first-run', '--no-default-browser-check',
            `--user-data-dir=${path.join(temporary, 'profile')}`, '--dump-dom', pathToFileURL(page).href,
        ], { timeout: 45_000, maxBuffer: 8 * 1024 * 1024 }).then(r => r.stdout, e => e.stdout || '')
        const match = stdout.match(/<pre id="out">([^<]*)<\/pre>/)
        assert.ok(match && match[1], 'the fixture page wrote its measurements')
        return JSON.parse(match[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'))
    } finally {
        await rm(temporary, { recursive: true, force: true })
    }
}

const RESET = { color: INK, background: 'rgba(0, 0, 0, 0)', cursor: 'pointer' }

test("a Tailwind v4 app's classes win over the cockpit's button reset", { timeout: 60_000 }, async () => {
    const styles = await computed(TAILWIND_V4, 'bg-primary text-primary-foreground', 'border')
    assert.equal(styles.filled.color, 'rgb(250, 250, 250)', 'the light text of the primary button')
    assert.equal(styles.filled.background, 'rgb(20, 20, 20)', 'its background')
    assert.equal(styles.outlined.border, '1px solid', 'a border utility')
    // A hosted button that names nothing still gets the reset, over the browser's own button style.
    assert.deepEqual(styles.plain, { ...RESET, border: '0px none' })
    // The cockpit's own button keeps the reset against a host rule on bare buttons, `text-` in its classes or not.
    assert.deepEqual(styles.chrome, { ...RESET, border: '0px none' })
})

test("a Tailwind v3 app's classes win over the cockpit's button reset", { timeout: 60_000 }, async () => {
    const styles = await computed(TAILWIND_V3, 'bg-emerald-600 text-emerald-700', 'border-2')
    assert.equal(styles.filled.color, 'rgb(4, 120, 87)', 'a text colour utility')
    assert.equal(styles.filled.background, 'rgb(5, 150, 105)', 'a background utility')
    assert.equal(styles.outlined.border, '2px solid', 'a border utility, its style from the preflight')
    assert.deepEqual(styles.plain, { ...RESET, border: '0px solid' })
    assert.deepEqual(styles.chrome, { ...RESET, border: '0px none' })
})
