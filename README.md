# @neoffice/frappe-sidebar-react

<!-- //// Neoffice — added file (no upstream equivalent): what this package is, how it is installed and built. -->

NeoCockpit, the sidebar and header shared by the Neoffice desk and its apps, as a React component in the Frappe
style. `FrappeSidebar`, the earlier sidebar-only component, is still exported for the apps that use it.

## Install

```bash
yarn add git+https://github.com/bvisible/frappe-sidebar-react.git#version-15
```

`dist/` is committed, so an app installs the built package without building it.

## Use

```tsx
import { NeoCockpit } from "@neoffice/frappe-sidebar-react"
```

The props are described in `src/NeoCockpit.tsx` (`NeoCockpitProps`). React 18 or later is a peer dependency.

## Develop

```bash
yarn install
yarn build     # tsup, writes dist/
yarn dev       # playground on http://localhost:5199
yarn test      # node --test
```

## Licence

MIT, see [LICENSE](LICENSE).
