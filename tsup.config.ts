import { defineConfig } from 'tsup'

export default defineConfig([
  // 1) npm library — React external (consumed by Mint / Raven / Neoconstruction)
  {
    entry: { index: 'src/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    external: ['react', 'react-dom'],
    injectStyle: true,
    clean: true,
  },
  // 2) self-contained desk bundle — React + CSS inlined, exposes window.NeoCockpit
  //    neoffice_theme loads dist/neocockpit.global.js and calls NeoCockpit.mount(el, props)
  {
    entry: { neocockpit: 'src/mount.tsx' },
    format: ['iife'],
    globalName: 'NeoCockpit',
    platform: 'browser',
    noExternal: ['react', 'react-dom'],
    injectStyle: true,
    minify: true,
    sourcemap: false,
    outExtension: () => ({ js: '.global.js' }),
  },
])
