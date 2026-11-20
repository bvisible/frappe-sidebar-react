//// Neoffice — added file (no upstream equivalent): the tests of src/spaceSignals.ts (the glow of a space, 20.11.2026).
// The count pills of the sidebar were too heavy (Jérémy, 20.11: « ne pas avoir des pastilles parce que c'est trop lourd
// visuellement »). An entry whose space received something someone waits an answer for breathes three times, then stays
// pale until the reader opens the space; at a change of page it breathes once, at most every five minutes.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { afterPageChange, afterSignals, glowWords, grew, lit, toMarkSeen, REMIND_EVERY_MS, BREATH_MS } from '../src/spaceSignals.ts'

const T0 = 1_000_000

test('something that arrives makes the entry breathe three times; nothing new leaves it dark', () => {
    const glows = afterSignals({}, { Commercial: { new: 2, words: '2 messages' }, RH: { new: 0, words: '' } }, T0)
    assert.equal(glows.Commercial.glow, 'arrive')
    assert.equal(glows.Commercial.count, 2)
    assert.equal(lit(glows.Commercial), true)
    assert.equal(glows.RH, undefined)
})

test('a page that loads with something waiting breathes once, not three times', () => {
    const glows = afterSignals({}, { Commercial: { new: 1, words: '1 message' } }, T0, true)
    assert.equal(glows.Commercial.glow, 'remind')
})

test('the same answer again moves nothing; one more arrival breathes again', () => {
    const first = afterSignals({}, { Commercial: { new: 1 } }, T0)
    const same = afterSignals(first, { Commercial: { new: 1 } }, T0 + 60_000)
    assert.equal(same.Commercial.run, first.Commercial.run, 'no new breath: the element is not drawn again')
    const more = afterSignals(same, { Commercial: { new: 2 } }, T0 + 120_000)
    assert.equal(more.Commercial.glow, 'arrive')
    assert.equal(more.Commercial.run, first.Commercial.run + 1)
})

test('when nothing is new any more the glow goes out, on the same element', () => {
    const on = afterSignals({}, { Commercial: { new: 1 } }, T0)
    const off = afterSignals(on, { Commercial: { new: 0 } }, T0 + 1000)
    assert.equal(off.Commercial.glow, 'out')
    assert.equal(off.Commercial.run, on.Commercial.run, 'it fades from where it rests')
    assert.equal(lit(off.Commercial), false)
    // and the next arrival lights it again, drawn anew
    const again = afterSignals(off, { Commercial: { new: 1 } }, T0 + 2000)
    assert.equal(again.Commercial.glow, 'arrive')
    assert.equal(again.Commercial.run, on.Commercial.run + 1)
})

test('an entry the server no longer names is forgotten', () => {
    const on = afterSignals({}, { Commercial: { new: 1 } }, T0)
    assert.deepEqual(afterSignals(on, {}, T0 + 1000), {})
})

test('a change of page breathes once what is lit and was not seen, at most every five minutes, never the space on screen', () => {
    const on = afterSignals({}, { Commercial: { new: 1 }, RH: { new: 1 } }, T0)
    const soon = afterPageChange(on, T0 + REMIND_EVERY_MS - 1, null)
    assert.equal(soon.Commercial.run, on.Commercial.run, 'too soon: no breath')
    const later = afterPageChange(on, T0 + REMIND_EVERY_MS, 'RH')
    assert.equal(later.Commercial.glow, 'remind')
    assert.equal(later.Commercial.run, on.Commercial.run + 1)
    assert.equal(later.RH.run, on.RH.run, 'the space on screen is being seen, it does not breathe')
    const out = afterSignals(on, { Commercial: { new: 0 }, RH: { new: 1 } }, T0 + 10)
    assert.equal(afterPageChange(out, T0 + REMIND_EVERY_MS * 2, null).Commercial.glow, 'out', 'a glow gone out stays out')
})

test('the space on screen is marked seen: at once, or after one breath when it just arrived', () => {
    const loaded = afterSignals({}, { Commercial: { new: 1 } }, T0, true)
    assert.deepEqual(toMarkSeen(loaded, 'Commercial'), { entry: 'Commercial', after: 0 })
    const arrived = afterSignals({}, { Commercial: { new: 1 } }, T0)
    assert.deepEqual(toMarkSeen(arrived, 'Commercial'), { entry: 'Commercial', after: BREATH_MS })
    assert.equal(toMarkSeen(arrived, 'RH'), null, 'another space on screen marks nothing')
    assert.equal(toMarkSeen(arrived, null), null)
    assert.equal(toMarkSeen(afterSignals(arrived, { Commercial: { new: 0 } }, T0 + 1), 'Commercial'), null, 'already out')
})

test('what waits is said in words, never as a number alone', () => {
    assert.equal(glowWords('Commercial', { new: 2, words: '2 messages du site, 1 réponse à un devis' }),
        'Commercial · 2 messages du site, 1 réponse à un devis')
    assert.equal(glowWords('Commercial', { new: 0, words: '' }), 'Commercial')
    assert.equal(glowWords('Commercial', undefined), 'Commercial')
})

test('an icon of the top row breathes when its number grows, not when it falls', () => {
    assert.equal(grew('', '1'), true)
    assert.equal(grew('3', '4'), true)
    assert.equal(grew('99', '99+'), false)
    assert.equal(grew('4', '3'), false)
    assert.equal(grew('2', ''), false)
    assert.equal(grew(null, undefined), false)
})
