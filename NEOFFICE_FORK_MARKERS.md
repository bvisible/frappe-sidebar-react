# Neoffice fork markers

<!-- //// Neoffice — added file (no upstream equivalent): what of our changes cannot carry a marker in place. -->

Every change Neoffice makes to this code carries a `//// Neoffice — …` marker in place, with its reason: `//// Neoffice — …`
in TypeScript, `/* //// Neoffice — … */` in CSS. This file holds what cannot carry a comment.

## Files that cannot carry a comment

| File | Why it is ours |
|---|---|
| `package.json` | The `test` and `test:cockpit-browser` scripts list the test files Neoffice added under `test/` (each one says why in its own header); `test:cockpit-browser` runs the cockpit in offline Chromium (`collapseTooltip.test.mjs`, `pageDock.test.mjs` since 21.10.2026: the row of icons and the search box a desk page lends; `buttonReset.test.mjs` since 11.11.2026: the button reset yields to the classes of the hosted app). |
| `LICENSE` | The MIT licence of this package (its `package.json` already declared MIT); a licence text cannot carry a comment. |
