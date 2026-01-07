import * as react_jsx_runtime from 'react/jsx-runtime';
import { ClassValue } from 'clsx';

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
}
declare global {
    interface Window {
        frappe?: {
            boot?: {
                sidebar_pages?: {
                    pages?: WorkspacePage[];
                };
                app_data?: AppData[];
            };
        };
    }
}
declare const FrappeSidebar: ({ defaultAppFilter, className, logoUrl }?: FrappeSidebarProps) => react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

export { FrappeSidebar, type FrappeSidebarProps, cn };
