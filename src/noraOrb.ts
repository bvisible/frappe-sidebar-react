//// Neoffice — added file (no upstream equivalent). NORA's icon in the cockpit is her orb, the nora app's image (06.10:
//// one Nora icon everywhere). Until then the button drew a spark: the desk and Drive swapped it for the orb at run time
//// (nora_cockpit_orb.js), while Raven, mint, Helpdesk, CRM, LMS, Builder and Insights kept the spark.
import { createElement, useEffect, useState, type ReactElement } from 'react'

export const NORA_ORB = {
    light: '/assets/nora/images/nora-orb.svg',
    dark: '/assets/nora/images/nora-orb-dark.svg',
} as const

/** The page's colour: Frappe's data-theme, else the system's preference. */
export function pageIsDark(doc: Document | undefined = typeof document === 'undefined' ? undefined : document): boolean {
    if (!doc) return false
    const theme = doc.documentElement.getAttribute('data-theme')
    if (theme) return theme === 'dark'
    return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
}

/** Follows data-theme and the system's preference, so the orb changes with the page. */
export function usePageDark(): boolean {
    const [dark, setDark] = useState(() => pageIsDark())
    useEffect(() => {
        if (typeof document === 'undefined') return
        const update = () => setDark(pageIsDark())
        const observer = new MutationObserver(update)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
        const media = typeof matchMedia !== 'undefined' ? matchMedia('(prefers-color-scheme: dark)') : null
        media?.addEventListener?.('change', update)
        update()
        return () => {
            observer.disconnect()
            media?.removeEventListener?.('change', update)
        }
    }, [])
    return dark
}

/**
 * NORA's orb, or `fallback` when the image does not load (a site without the nora app).
 * The class and data-nora-icon="auto" are what nora_cockpit_orb.js gives the image: where that script runs (the desk,
 * Drive) it finds the button already done and keeps the variant in step with the theme as well.
 */
export function NoraOrbIcon({ fallback }: { fallback: ReactElement }): ReactElement {
    const dark = usePageDark()
    const [failed, setFailed] = useState(false)
    if (failed) return fallback
    return createElement('img', {
        className: 'nora-orbbtn',
        src: dark ? NORA_ORB.dark : NORA_ORB.light,
        'data-nora-icon': 'auto',
        alt: '',
        'aria-hidden': true,
        draggable: false,
        width: 20,
        height: 20,
        style: { display: 'block', width: 20, height: 20, flex: 'none', pointerEvents: 'none' },
        onError: () => setFailed(true),
    })
}
