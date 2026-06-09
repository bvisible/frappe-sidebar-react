import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './mockBoot'
import NeoCockpit from '../src/NeoCockpit'

function App() {
  const [, force] = useState(0)
  const toggleDark = () => {
    const el = document.documentElement
    el.setAttribute('data-theme', el.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
    force(n => n + 1)
  }
  return (
    // env="spa" + onNavigate override → no reloads in the playground.
    // children → NeoCockpit renders the full shell (gray frame + floating panel).
    <NeoCockpit env="spa" onNavigate={(r) => console.log('[navigate]', r)}>
      <div style={{ padding: '32px 40px' }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Welcome Admin Test!</h1>
        <p style={{ color: 'var(--text-muted, #8d99a6)' }}>See the latest stats of your awesome business.</p>
        <button onClick={toggleDark} style={{ marginTop: 16, padding: '8px 14px', borderRadius: 999, border: '1px solid #e2e6e9', cursor: 'pointer' }}>
          Toggle dark mode
        </button>
      </div>
    </NeoCockpit>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
