//// Neoffice — added file (no upstream equivalent): the glow of a space's sidebar entry (Jérémy, 20.11.2026).
// The count pills of the sidebar were too heavy (« ne pas avoir des pastilles parce que c'est trop lourd visuellement »).
// Where the site switched it on (boot `neo_sidebar_signal`), an entry whose space received something someone waits an
// answer for breathes three times, then stays pale until the reader opens the space. neoffice_theme decides what lights
// an entry and counts it (workspace_tabs.space_signals, its words with it); this file decides how the glow moves, and
// cockpit.css draws it. Rule and motion: the design system's §6.1 (explorations/sidebar-signal).

/** What the server says of an entry: how many arrived since the reader last opened its space, and in which words. */
export type SpaceSignal = { new: number; words?: string }
export type SpaceSignals = Record<string, SpaceSignal>

/** `arrive`: three breaths, then the pale rest; `remind`: one breath, then the rest; `out`: it goes out. */
export type Glow = 'arrive' | 'remind' | 'out'
/** `run` names the drawn element: a new run draws it anew, so that its breath plays again. */
export type GlowOf = { glow: Glow; run: number; breathedAt: number; count: number }
export type Glows = Record<string, GlowOf>

export const BREATH_MS = 1600
export const ARRIVAL_MS = 3 * BREATH_MS
export const REMIND_EVERY_MS = 5 * 60 * 1000

export const lit = (glow?: GlowOf | null): boolean => Boolean(glow && glow.glow !== 'out')

/** The glows after an answer of the server. `first`: the boot's answer (a page that loads with something waiting
 *  breathes once, not three times: it is not an arrival). */
export function afterSignals(prev: Glows, signals: SpaceSignals | null | undefined, now: number, first = false): Glows {
    const next: Glows = {}
    for (const [entry, signal] of Object.entries(signals || {})) {
        const was = prev[entry]
        const count = Math.max(0, Math.floor(Number(signal && signal.new) || 0))
        if (count > 0) {
            if (!was || !lit(was)) next[entry] = { glow: first ? 'remind' : 'arrive', run: (was ? was.run : 0) + 1, breathedAt: now, count }
            else if (count > was.count) next[entry] = { glow: 'arrive', run: was.run + 1, breathedAt: now, count }
            else next[entry] = { ...was, count }
        } else if (was) {
            // From where it rests: the same element, so that it fades instead of vanishing.
            next[entry] = lit(was) ? { ...was, glow: 'out', count: 0 } : was
        }
    }
    return next
}

/** A change of page: what is lit and was not seen breathes once, at most every five minutes; never the space on screen,
 *  which is being seen. */
export function afterPageChange(prev: Glows, now: number, active?: string | null): Glows {
    const next: Glows = { ...prev }
    for (const [entry, glow] of Object.entries(prev)) {
        if (lit(glow) && entry !== active && now - glow.breathedAt >= REMIND_EVERY_MS) {
            next[entry] = { ...glow, glow: 'remind', run: glow.run + 1, breathedAt: now }
        }
    }
    return next
}

/** The entry to mark seen: the space on screen, when it is lit. Something that arrived while the reader is in it
 *  breathes once before it goes out. */
export function toMarkSeen(glows: Glows, active?: string | null): { entry: string; after: number } | null {
    if (!active) return null
    const glow = glows[active]
    if (!glow || !lit(glow)) return null
    return { entry: active, after: glow.glow === 'arrive' ? BREATH_MS : 0 }
}

/** The entry's tip and label: its name, then what waits in words (« Commercial · 2 messages du site »). */
export function glowWords(title: string, signal?: SpaceSignal | null): string {
    return signal && signal.new > 0 && signal.words ? `${title} · ${signal.words}` : title
}

/** The number an icon of the top row shows (« 99+ » reads 99, nothing reads 0). */
export function countIn(text?: string | null): number {
    return parseInt(String(text || '').replace(/\D/g, ''), 10) || 0
}

/** An icon of the top row (help, bell, messages) breathes when its number grows. */
export function grew(before?: string | null, after?: string | null): boolean {
    return countIn(after) > countIn(before)
}

/** An icon of the top row glows while its number is above the one the reader saw last by opening its panel, as a
 *  space goes out once opened. The first number seen counts as seen: what waited before (the trainings the help counts)
 *  does not light it - a glow that never goes out was the stock the pills were (neoffice-tester, 20.11). A number that
 *  falls (read elsewhere) takes the start with it, so the next arrival lights it again. */
export function topUnseen(seen: number | undefined, count: number): { unseen: boolean; seen: number } {
    if (seen === undefined || count < seen) return { unseen: false, seen: count }
    return { unseen: count > seen, seen }
}
