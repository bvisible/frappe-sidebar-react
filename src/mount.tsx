/**
 * Desk mount entry — bundled as an IIFE (React inlined, CSS injected) so the
 * jQuery Frappe desk can drop in NeoCockpit without a build step of its own.
 * neoffice_theme loads dist/neocockpit.global.js and calls:
 *   window.NeoCockpit.mount(el, { env: 'desk', onNavigate, homeUrl })
 */
import { createRoot, type Root } from 'react-dom/client'
import NeoCockpit, { type NeoCockpitProps } from './NeoCockpit'

const roots = new WeakMap<Element, Root>()

export function mount(el: Element, props: NeoCockpitProps = {}): Root {
    let root = roots.get(el)
    if (!root) {
        root = createRoot(el)
        roots.set(el, root)
    }
    root.render(<NeoCockpit {...props} />)
    return root
}

export function unmount(el: Element): void {
    const root = roots.get(el)
    if (root) {
        root.unmount()
        roots.delete(el)
    }
}

export { default as NeoCockpit } from './NeoCockpit'
