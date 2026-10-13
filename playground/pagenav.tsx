//// Neoffice — added file (no upstream equivalent): the cockpit on the desk with a page that lends it its navigation
//// (src/pageNav.ts, Neodesk plan W1). `npx vite --port 5299`, then /pagenav.html: a made-up mailbox, as the webmail
//// lends it; what the page would be told (a click, a right-click, a drop) is written under its title.
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './mockBoot'
import NeoCockpit from '../src/NeoCockpit'
import { setPageNav } from '../src/pageNav'

type Folder = { name: string; label: string; icon: string; depth?: number; unread?: number; accent?: boolean }

const OWN: Folder[] = [
  { name: 'INBOX', label: 'Réception', icon: 'lucide-inbox', unread: 12, accent: true },
  { name: 'Sent', label: 'Envoyés', icon: 'lucide-send' },
  { name: 'Drafts', label: 'Brouillons', icon: 'lucide-file-pen', unread: 1 },
  { name: 'Archive', label: 'Archives', icon: 'lucide-archive' },
  { name: 'Junk', label: 'Indésirables', icon: 'lucide-shield-alert' },
  { name: 'Trash', label: 'Corbeille', icon: 'lucide-trash-2' },
]
const FOLDERS: Folder[] = [
  { name: 'Clients', label: 'Clients', icon: 'lucide-folder' },
  { name: 'Clients/2026', label: '2026', icon: 'lucide-folder', depth: 1, unread: 2 },
  { name: 'Fournisseurs', label: 'Fournisseurs', icon: 'lucide-folder' },
]

function lend(open: string, tell: (what: string) => void) {
  const item = (f: Folder) => ({
    label: f.label,
    icon: f.icon,
    depth: f.depth,
    active: f.name === open,
    badge: f.unread || undefined,
    badgeTone: f.accent ? ('accent' as const) : undefined,
    onClick: () => tell(`open ${f.name}`),
    onContextMenu: (e: MouseEvent) => tell(`menu ${f.name} at ${e.clientX},${e.clientY}`),
    onDrop: (e: DragEvent) => tell(`drop « ${e.dataTransfer?.getData('text/plain')} » on ${f.name}`),
  })
  setPageNav({
    app: { name: 'webmail', title: 'Courrier' },
    nav: [
      { label: 'camille.favre@', items: OWN.map(item) },
      {
        label: 'Boîtes partagées',
        items: [
          { label: 'info@', icon: 'lucide-users', badge: 3, onClick: () => tell('account info@') },
          { label: 'compta@', icon: 'lucide-users', onClick: () => tell('account compta@') },
        ],
      },
      { label: 'Dossiers', items: FOLDERS.map(item) },
    ],
    footer: { label: 'Espace de la boîte', sub: '2,1 Go sur 10 Go', percent: 21 },
  })
}

function App() {
  const [open, setOpen] = useState('INBOX')
  const [told, setTold] = useState<string[]>([])
  const tell = (what: string) => {
    setTold((t) => [what, ...t].slice(0, 6))
    if (what.startsWith('open ')) setOpen(what.slice(5))
  }
  lend(open, tell)
  return (
    <NeoCockpit env="desk" onNavigate={(r) => tell(`navigate ${r}`)}>
      <div style={{ padding: '32px 40px' }}>
        <h1 style={{ fontSize: 26, margin: 0 }}>Courrier · {open}</h1>
        <p draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', 'mail 118')} style={{ marginTop: 16, padding: 12, border: '1px dashed #bbb', borderRadius: 10, width: 280, cursor: 'grab' }}>
          Glisser ce message sur un dossier
        </p>
        <button onClick={() => setPageNav(null)} style={{ marginTop: 16 }}>La page rend la navigation</button>
        <ul id="told" style={{ marginTop: 16, fontFamily: 'monospace', fontSize: 13 }}>
          {told.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>
    </NeoCockpit>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
