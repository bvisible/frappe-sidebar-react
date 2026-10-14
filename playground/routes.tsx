//// Neoffice — added file (no upstream equivalent): the cockpit's module card and the navigation a page lends it,
//// across routes (src/pageNav.ts, src/moduleCard.ts; 14.10.2026). `npx vite --port 5299`, then
//// /routes.html?mode=mail (a desk page lends its folders; Mon espace must take them back) or /routes.html?mode=drive
//// (a standalone application: its card names it). Dark: &dark=1.
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './mockBoot'
import NeoCockpit from '../src/NeoCockpit'
import { setPageNav } from '../src/pageNav'

const params = new URLSearchParams(location.search)
const which = params.get('mode') === 'drive' ? 'drive' : 'mail'
// The cockpit follows the colour mode it keeps in this browser, over the attribute.
for (const mode of ['dark', 'light']) {
  if (params.get(mode)) {
    localStorage.setItem('neocockpit-colormode', mode)
    document.documentElement.setAttribute('data-theme', mode)
  }
}

const boot = (window as unknown as { frappe: { boot: Record<string, unknown> } }).frappe.boot
boot.neocockpit_two_levels = 1
boot.surface_apps = [
  { name: 'drive', title: 'Drive', logo: '/tile-drive.svg', route: '/drive' },
  { name: 'mail', title: 'Messagerie', logo: '/tile-mail.svg', route: '/app/webmail' },
  { name: 'wiki', title: 'Wiki', logo: '/tile-wiki.svg', route: '/wiki' },
]

// &notile=1: the theme has no logo for the application (its own favicon, in colour, then).
if (params.get('notile')) boot.surface_apps = (boot.surface_apps as { name: string }[]).filter((t) => t.name !== 'drive')

const here = () => location.pathname
const go = (path: string) => {
  history.pushState({}, '', path + location.search)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const MAILBOX = (open: string) => [
  { label: 'camille.favre@', items: [
    { label: 'Réception', icon: 'lucide-inbox', badge: 12, badgeTone: 'accent' as const, active: open === 'INBOX' },
    { label: 'Envoyés', icon: 'lucide-send' },
    { label: 'Brouillons', icon: 'lucide-file-pen', badge: 1 },
  ] },
  { label: 'Dossiers', items: [{ label: 'Clients', icon: 'lucide-folder' }] },
]

function MailMode() {
  const [log, setLog] = useState<string[]>([])
  const note = (s: string) => setLog((l) => [s, ...l].slice(0, 8))
  const lend = (why: string) => {
    setPageNav({ app: { name: 'mail', title: 'Messagerie' }, nav: MAILBOX('INBOX'), route: '/app/webmail' })
    note(`${why}: lent at /app/webmail (the reader is on ${here()})`)
  }
  useEffect(() => { go('/app/webmail'); lend('mounted') }, [])
  return (
    <NeoCockpit env="desk" onNavigate={(r) => note(`navigate ${r}`)}>
      <div style={{ padding: '32px 40px' }} id="page">
        <h1 style={{ fontSize: 24, margin: 0 }}>Page : {here()}</h1>
        <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button id="go-home" onClick={() => go('/app/home')}>Aller sur Mon espace</button>
          <button id="go-mail" onClick={() => { go('/app/webmail'); lend('back on the page') }}>Revenir au webmail</button>
          <button id="bg" onClick={() => lend('background publish')}>Le webmail republie depuis l&apos;arrière-plan</button>
          <button id="give" onClick={() => { setPageNav(null); note('given back') }}>Le webmail rend la navigation</button>
        </p>
        <ul id="log" style={{ fontFamily: 'monospace', fontSize: 13 }}>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>
      </div>
    </NeoCockpit>
  )
}

function DriveMode() {
  return (
    <NeoCockpit
      env="spa"
      onNavigate={(r) => console.log('[navigate]', r)}
      surfaceApp={{ name: 'drive', title: 'Drive', logo: '/favicon-144x144.png.svg' }}
      contextNav={[
        { items: [{ label: 'Boîte de réception', icon: 'lucide-inbox', route: '/inbox' }] },
        { label: 'Drive', items: [
          { label: 'Accueil', icon: 'lucide-home', route: '/', active: true },
          { label: 'Récents', icon: 'lucide-clock', route: '/recents' },
          { label: 'Partagé', icon: 'lucide-users', route: '/shared' },
        ] },
      ]}
      contextFooter={{ label: 'Stockage', sub: '17 MB / 5 GB', percent: 3 }}
    >
      <div style={{ padding: '32px 40px' }} id="page"><h1 style={{ fontSize: 24, margin: 0 }}>Drive</h1></div>
    </NeoCockpit>
  )
}

// &open=1: the module switcher's list opened, as a click on the card does.
if (params.get('open')) setTimeout(() => (document.querySelector('.nc-switch') as HTMLButtonElement | null)?.click(), 900)

createRoot(document.getElementById('root')!).render(<StrictMode>{which === 'drive' ? <DriveMode /> : <MailMode />}</StrictMode>)
