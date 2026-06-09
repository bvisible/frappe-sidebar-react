// NeoCockpit — the single shared Neoffice chrome (sidebar absorbing the header).
// Canonical export. Supersedes FrappeSidebar (kept below for backward-compat).
export { default as NeoCockpit } from './NeoCockpit'
export type { NeoCockpitProps } from './NeoCockpit'

// Legacy — sidebar-only component, superseded by NeoCockpit (see Obsidian UI-Cockpit/05-Inventory).
export { default as FrappeSidebar } from './FrappeSidebar'
export type { FrappeSidebarProps } from './FrappeSidebar'

export { cn } from './utils'
