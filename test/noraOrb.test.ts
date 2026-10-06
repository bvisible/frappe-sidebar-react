//// Neoffice — added file (no upstream equivalent): the tests of src/noraOrb.ts, NORA's icon in the cockpit (06.10).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { NORA_ORB, NoraOrbIcon, pageIsDark } from '../src/noraOrb.ts'

const page = (theme: string | null) => ({ documentElement: { getAttribute: () => theme } }) as unknown as Document

test('the Nora button of the cockpit draws her orb, not a spark', () => {
    const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
    const button = source.slice(source.indexOf('className="nc-iconbtn nc-nora"'))
    const inside = button.slice(0, button.indexOf('</button>'))
    assert.ok(inside.length > 0, 'the Nora button was not found')
    assert.match(inside, /<NoraOrbIcon\b/)
    // A spark may only stand in for the image, when the site has no nora app.
    assert.doesNotMatch(inside.replace(/fallback=\{<Sparkles[^>]*\/>\}/, ''), /<Sparkles\b/)
})

test('the orb is an image the nora app serves, which nora_cockpit_orb.js recognises', () => {
    const html = renderToStaticMarkup(createElement(NoraOrbIcon, { fallback: createElement('svg', { className: 'spark' }) }))
    assert.match(html, /^<img [^>]*class="nora-orbbtn"/)
    assert.ok(html.includes(`src="${NORA_ORB.light}"`), html)
    assert.ok(html.includes('data-nora-icon="auto"'), html)
    assert.ok(!html.includes('spark'), html)
})

test('the page decides the variant: Frappe data-theme first', () => {
    assert.equal(pageIsDark(page('dark')), true)
    assert.equal(pageIsDark(page('light')), false)
    assert.equal(pageIsDark(undefined), false)
})
