import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { ClassValue } from 'clsx';

interface NeoCockpitProps {
    /** 'desk' (Frappe desk) or 'spa' (Mint/Raven/Neoconstruction). Auto-detected if omitted. */
    env?: 'desk' | 'spa';
    /** Override navigation. Receives a route like '/app/sales'. */
    onNavigate?: (route: string) => void;
    /** Logo click destination. Default '/app/home'. */
    homeUrl?: string;
    /** NORA trigger. Desk passes the Quick Chat overlay opener; default navigates. */
    onNora?: () => void;
    /** Notifications bell. Desk passes the native dropdown opener; default navigates. */
    onBell?: () => void;
    /** synk (Raven chat) toggle. Button only renders when provided.
     *  Unread badge: host writes into `.nc-synk .nc-count`. */
    onSynk?: () => void;
    /** SPA context module: app_name selected on entry (e.g. Mint passes
     *  'Finance', Neoconstruction 'neoconstruction'). Overrides the saved
     *  choice — the surface you're on wins. */
    defaultApp?: string;
    /** Standalone-app surfaces (Drive, LMS, Helpdesk, CRM): inject this app
     *  into the module switcher and pin it on entry. While it is the current
     *  module the nav shows `contextNav` instead of desk workspaces. */
    surfaceApp?: {
        name: string;
        title: string;
        logo?: string;
    };
    /** The surface app's own navigation (sections of items). Items carry a
     *  lucide-* icon name, a SPA route (handled via onNavigate) or onClick,
     *  an active flag (the host knows its router) and an optional badge. */
    contextNav?: {
        label?: string;
        items: {
            label: string;
            icon?: string;
            route?: string;
            onClick?: () => void;
            active?: boolean;
            badge?: string | number;
        }[];
    }[];
    /** Small meta block pinned above the collapse toggle (e.g. Drive storage). */
    contextFooter?: {
        label: string;
        sub?: string;
        percent?: number;
        onClick?: () => void;
    };
    /** Standalone surfaces: clicking the search bar triggers the app's own
     *  search overlay (e.g. Drive's ⌘K popup) instead of the embedded input. */
    onSearch?: () => void;
    /** Keyboard hint shown in the search bar (default ⌘G / Ctrl G). */
    searchKbd?: string;
    /** Contextual help panel opener (Nora Learn + wiki). Button only renders
     *  when provided. Badge: host writes into `.nc-help .nc-count`. */
    onHelp?: () => void;
    /** Page content. When provided (shell layout), NeoCockpit renders the full
     *  shell: gray frame + sidebar + a floating white rounded panel wrapping it. */
    children?: ReactNode;
    /** 'shell' (SPAs) renders frame + floating panel around `children`.
     *  'sidebar' (Frappe desk) renders only the sidebar as an in-flow flex child
     *  (wrapper is display:contents) — the host's own content area is the panel. */
    layout?: 'shell' | 'sidebar';
    className?: string;
}
declare function NeoCockpit({ env: envProp, onNavigate, homeUrl, onNora, onBell, onSynk, onHelp, defaultApp, surfaceApp, contextNav, contextFooter, onSearch, searchKbd, children, layout, className }?: NeoCockpitProps): react_jsx_runtime.JSX.Element;

interface WorkspacePage {
    name: string;
    title: string;
    icon?: string;
    public?: boolean | number;
    app?: string;
    module?: string;
    parent_page?: string;
}
interface AppData {
    app_name: string;
    app_title: string;
    app_logo_url?: string;
    app_route?: string;
    workspaces: string[];
}
interface FrappeSidebarProps {
    /** Default app to select (e.g., 'erpnext' for finance context) */
    defaultAppFilter?: string[];
    /** Custom class name for the sidebar container */
    className?: string;
    /** Logo URL override */
    logoUrl?: string;
    /** If true, sidebar uses fixed positioning with spacer. If false, uses normal document flow. Default: true */
    fixed?: boolean;
    /** URL to navigate when clicking on the logo. Default: '/app' */
    homeUrl?: string;
}
declare global {
    interface Window {
        frappe?: {
            boot?: {
                sidebar_pages?: {
                    pages?: WorkspacePage[];
                };
                app_data?: AppData[];
                neoffice_settings?: {
                    interface_mode?: string;
                };
                user?: {
                    name?: string;
                    view_interface?: string;
                };
            };
            db?: {
                set_value: (doctype: string, name: string, field: string, value: string) => Promise<unknown>;
            };
            session?: {
                user?: string;
            };
            ui?: {
                toolbar?: {
                    clear_cache: () => void;
                };
                NeofficeCalculatorDialog?: {
                    show: () => void;
                };
            };
            set_route?: (route: string) => void;
        };
    }
}
declare const FrappeSidebar: ({ defaultAppFilter, className, logoUrl, fixed, homeUrl }?: FrappeSidebarProps) => react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

export { FrappeSidebar, type FrappeSidebarProps, NeoCockpit, type NeoCockpitProps, cn };
