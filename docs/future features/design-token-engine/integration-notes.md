# Integration Notes (do later, not applied)

Dependencies to add (when approved)
- Dev: `ajv`, `ajv-formats`, `ts-node` (for validation/generator if running via ts-node).
- Optional: `playwright`, `pixelmatch` for VRT.

package.json script additions (proposed)
- "tokens": "ts-node scripts/build-tokens.ts"
- "tokens:validate": "ts-node scripts/validate-tokens.ts"
- "vrt": "node scripts/vrt-script.js" (after compiling sample)

Tailwind wiring (when ready)
- Require `./src/theme/tailwind-colors.js` and spread into `extend.colors`.
- Add plugin: `plugins: [require('./src/theme/tailwind-plugin.cjs')(semanticColors)]`.

CSS import
- Import `src/theme/generated.css` in `src/index.css` before other layers.

Runtime bootstrap
- Import `applyBrandTheme` from `runtime-theme.ts` and call once with active tokens before app render (or hydrate from `window.__BRAND_TOKENS__`).

CI guards (proposed)
- Run `npm run tokens` and fail if generated files differ.
- Run `npm run tokens:validate` against schema.
- Optional VRT job on pilot pages.
