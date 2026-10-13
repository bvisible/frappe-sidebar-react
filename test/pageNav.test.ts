//// Neoffice — added file (no upstream equivalent): the tests of src/pageNav.ts (Neodesk plan W1).
// A desk page lends the cockpit its navigation and gives it back when it leaves; the cockpit, subscribed, redraws.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getPageNav, setPageNav, subscribePageNav } from '../src/pageNav.ts'

const MAIL = {
    app: { name: 'webmail', title: 'Courrier' },
    nav: [{ label: 'camille.favre@', items: [{ label: 'Réception', icon: 'lucide-inbox', badge: 12, badgeTone: 'accent' as const }] }],
}

test('a page lends its navigation, the cockpit is told, and the page gives it back', () => {
    let told = 0
    const stop = subscribePageNav(() => {
        told += 1
    })
    assert.equal(getPageNav(), null)
    setPageNav(MAIL)
    assert.equal(getPageNav(), MAIL)
    setPageNav(null)
    assert.equal(getPageNav(), null)
    assert.equal(told, 2)
    stop()
    setPageNav(MAIL)
    assert.equal(told, 2, 'a cockpit that left is not told any more')
    setPageNav(null)
})
