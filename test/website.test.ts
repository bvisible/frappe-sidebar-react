//// Neoffice — added file (no upstream equivalent): « View Website » follows the boot (maintenance#2592).
// An instance without a website (the entry offer, Neoffice Go) says so in the boot, and no menu offers the entry there.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { hasWebsite } from '../src/website.ts'

test('a boot that says the instance has no website hides the entry', () => {
    assert.equal(hasWebsite({ neoffice_has_website: false }), false)
})

test('a boot without the flag, or saying yes, keeps it', () => {
    assert.equal(hasWebsite({}), true)
    assert.equal(hasWebsite(undefined), true)
    assert.equal(hasWebsite({ neoffice_has_website: true }), true)
})

test('every « View Website » entry of the cockpit reads the rule', () => {
    const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
    assert.match(source, /const showWebsite = hasWebsite\(/)
    const lines = source.split('\n').filter(line => line.includes("tr('View Website')"))
    assert.ok(lines.length >= 4, `the four entries are there (${lines.length})`)
    for (const line of lines) assert.match(line, /showWebsite &&/, line.trim().slice(0, 120))
})
