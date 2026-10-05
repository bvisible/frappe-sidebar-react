/**
 * Desk mount entry — bundled as an IIFE (React inlined, CSS injected) so the
 * jQuery Frappe desk can drop in NeoCockpit without a build step of its own.
 * neoffice_theme loads dist/neocockpit.global.js and calls:
 *   window.NeoCockpit.mount(el, { env: 'desk', onNavigate, homeUrl })
 */
import { createRoot, type Root } from 'react-dom/client'
import NeoCockpit, { type NeoCockpitProps } from './NeoCockpit'

const roots = new WeakMap<Element, Root>()

//// Neoffice — the frame of an app of its own (05.10, « la même gueule » everywhere). Its bridge
//// (NeoCockpitBridge.vue) tags the host's parent .nc-frame-host, expecting the row that holds the
//// cockpit beside the app's content, which then floats as the desk's rounded panel (Drive, Helpdesk,
//// Builder). LMS, CRM and Insights wrap the cockpit in an element of its own: the frame held the sidebar
//// alone and their content had no panel. The row is the first ancestor holding something beside the
//// cockpit; the wrapper becomes .nc-frame-side, out of the panel's styling (cockpit.css).
function frameRow(el: Element): void {
    if (!el.classList.contains('neocockpit-host')) return
    let side: Element = el
    let row = el.parentElement
    while (row && row.children.length === 1 && row.parentElement && row.parentElement !== document.body) {
        side = row
        row = row.parentElement
    }
    if (!row || side === el) return
    side.classList.remove('nc-frame-host')
    side.classList.add('nc-frame-side')
    row.classList.add('nc-frame-host')
}

function unframeRow(el: Element): void {
    const side = el.closest('.nc-frame-side')
    if (!side) return
    side.classList.remove('nc-frame-side')
    side.parentElement?.classList.remove('nc-frame-host')
}

export function mount(el: Element, props: NeoCockpitProps = {}): Root {
    let root = roots.get(el)
    if (!root) {
        root = createRoot(el)
        roots.set(el, root)
    }
    root.render(<NeoCockpit {...props} />)
    if (props.env === 'spa') frameRow(el) //// Neoffice — the whole row is the frame (05.10)
    return root
}

export function unmount(el: Element): void {
    unframeRow(el) //// Neoffice — the row stops being the frame with the cockpit (05.10)
    const root = roots.get(el)
    if (root) {
        root.unmount()
        roots.delete(el)
    }
}

export { default as NeoCockpit } from './NeoCockpit'
