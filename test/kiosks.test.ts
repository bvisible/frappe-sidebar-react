//// Neoffice — added file (no upstream equivalent): who the cockpit offers « Bornes » to (maintenance#896).
// The admin identity and Administrator manage the kiosks, by the server's rule carried in the boot. The role Admin,
// which the cockpit read before, is the fiduciary's too: it must no longer open the menu when the boot says no.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { canManageKiosks } from '../src/kiosks.ts'

test('the boot decides: an Admin the server refuses (the fiduciary) is not offered the kiosks', () => {
    assert.equal(canManageKiosks({ neoffice_can_manage_bornes: false, user: { roles: ['Admin'] } }), false)
})

test('the boot decides: the admin identity is offered them, whatever its roles', () => {
    assert.equal(canManageKiosks({ neoffice_can_manage_bornes: true, user: { roles: ['Admin'] } }), true)
    assert.equal(canManageKiosks({ neoffice_can_manage_bornes: true, user: { roles: [] } }), true)
})

test('a boot without the flag (a theme older than the cockpit) keeps the reading by role', () => {
    assert.equal(canManageKiosks({ user: { roles: ['Admin'] } }), true)
    assert.equal(canManageKiosks({ user: { roles: ['Sales User'] } }), false)
    assert.equal(canManageKiosks(undefined), false)
})

test('the menu reads the rule, not the roles', () => {
    const source = readFileSync(new URL('../src/NeoCockpit.tsx', import.meta.url), 'utf8')
    assert.match(source, /const canManageDevices = canManageKiosks\(/)
})
