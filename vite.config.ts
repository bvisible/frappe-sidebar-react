import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev playground only (lib build stays on tsup). `npx vite` serves ./playground.
export default defineConfig({
  root: 'playground',
  plugins: [react()],
  server: { port: 5199, open: false, host: true },
})
