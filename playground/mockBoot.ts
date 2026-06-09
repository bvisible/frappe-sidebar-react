// Mock window.frappe.boot so NeoCockpit renders standalone (no Frappe backend).
const WORKSPACES = [
  { name: 'Vente', title: 'Vente', icon: 'lucide-tag', public: 1, app: 'erpnext' },
  { name: 'Clients', title: 'Clients', icon: 'lucide-users', public: 1, app: 'erpnext' },
  { name: 'Point de vente', title: 'Point de vente', icon: 'lucide-store', public: 1, app: 'erpnext' },
  { name: 'CRM', title: 'CRM', icon: 'lucide-target', public: 1, app: 'erpnext' },
  { name: 'Service', title: 'Service', icon: 'lucide-headphones', public: 1, app: 'erpnext' },
  { name: 'Achats', title: 'Achats', icon: 'lucide-shopping-cart', public: 1, app: 'erpnext' },
  { name: 'Comptabilité', title: 'Comptabilité', icon: 'lucide-calculator', public: 1, app: 'finance' },
  { name: 'Banque', title: 'Banque', icon: 'lucide-landmark', public: 1, app: 'finance' },
]

const w = window as unknown as { frappe?: Record<string, unknown> }
w.frappe = w.frappe || {}
w.frappe.boot = {
  sidebar_pages: { pages: WORKSPACES },
  app_data: [
    { app_name: 'erpnext', app_title: 'Commercial', app_logo_url: '', app_route: '/app/home',
      workspaces: ['Vente', 'Clients', 'Point de vente', 'CRM', 'Service', 'Achats'] },
    { app_name: 'finance', app_title: 'Finance', app_logo_url: '', app_route: '/app/accounting',
      workspaces: ['Comptabilité', 'Banque'] },
    { app_name: 'hr', app_title: 'Ressources humaines', app_logo_url: '', app_route: '/app/hr', workspaces: [] },
  ],
  user: { name: 'admin@test.ch', email: 'admin@test.ch', full_name: 'Admin Test', view_interface: 'Avancé' },
  user_info: { 'admin@test.ch': { fullname: 'Admin Test', email: 'admin@test.ch' } },
  neoffice_settings: { interface_mode: 'Avancé' },
}

export {}
