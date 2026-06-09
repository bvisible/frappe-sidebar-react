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
    /** Page content. When provided, NeoCockpit renders the full shell:
     *  gray frame + sidebar + a floating white rounded panel wrapping children. */
    children?: ReactNode;
    className?: string;
}
declare function NeoCockpit({ env: envProp, onNavigate, homeUrl, children, className }?: NeoCockpitProps): react_jsx_runtime.JSX.Element;

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
