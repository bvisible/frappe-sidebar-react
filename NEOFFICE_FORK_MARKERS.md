# Neoffice fork markers

Every change Neoffice makes to this code carries a `//// Neoffice — …` marker in place, with its reason: `//// Neoffice — …`
in TypeScript, `/* //// Neoffice — … */` in CSS. This file holds what cannot carry a comment.

## Files that cannot carry a comment

| File | Why it is ours |
|---|---|
| `package.json` | The `test` and `test:cockpit-browser` scripts list the test files Neoffice added under `test/` (each one says why in its own header); `test:cockpit-browser` runs the cockpit in offline Chromium (`collapseTooltip.test.mjs`, and `pageDock.test.mjs` since 21.10.2026: the row of icons and the search box a desk page lends). |
