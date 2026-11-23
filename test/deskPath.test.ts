//// Neoffice — added file (no upstream equivalent): the desk's address in the /app spelling on Frappe 16.
// On Frappe 16 the desk lives under /desk, sometimes with a shell in front of the page; the cockpit's comparisons are
// written for /app. Without this, the home did not light « Mon espace » and the space of a page was guessed wrong.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { deskPath } from '../src/pageNav.ts'

test('a Frappe 15 address and a website address stay as they are', () => {
    assert.equal(deskPath('/app/selling'), '/app/selling')
    assert.equal(deskPath('/app'), '/app')
    assert.equal(deskPath('/me'), '/me')
    assert.equal(deskPath('/desktop-wallpapers'), '/desktop-wallpapers')
})

test('the Frappe 16 prefix is respelt, the home included', () => {
    assert.equal(deskPath('/desk'), '/app')
    assert.equal(deskPath('/desk/'), '/app/')
    assert.equal(deskPath('/desk/sales-invoice/ACC-SINV-0001'), '/app/sales-invoice/ACC-SINV-0001')
})

test('the shell in front of the page is left out when the router says there is one', () => {
    const router = { path_on_screen: () => '/desk/sales-invoice' }
    assert.equal(deskPath('/desk/accounts/sales-invoice', router), '/app/sales-invoice')
})

test('a router that has no answer, or a wrong one, leaves the address as it is', () => {
    assert.equal(deskPath('/desk/selling', {}), '/app/selling')
    assert.equal(deskPath('/desk/selling', { path_on_screen: () => { throw new Error('not ready') } }), '/app/selling')
    assert.equal(deskPath('/desk/selling', { path_on_screen: () => '/app/elsewhere' }), '/app/selling')
})

test('every read of the address in the cockpit goes through deskPath', () => {
    const cockpit = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
    const reads = cockpit.split('\n').filter((line) => /location\.pathname/.test(line) && !/redirect-to/.test(line))
    assert.ok(reads.length >= 1, 'the cockpit reads the address somewhere')
    for (const line of reads) assert.match(line, /deskPath\(/, line.trim().slice(0, 120))
    const pageNav = readFileSync(new URL('../src/pageNav.ts', import.meta.url), 'utf8')
    for (const line of pageNav.split('\n').filter((l) => /location\.pathname/.test(l))) {
        assert.match(line, /deskPath\(/, line.trim().slice(0, 120))
    }
})
