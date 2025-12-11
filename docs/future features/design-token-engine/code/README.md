# Design Token Engine — Ready-to-integrate code bundle (do not wired yet)

Contents (all draft, not wired into app):

- `tokens.default.json` — current Lumelle palette mapped to base + semantic tokens.
- `tokens.alt-noir.json` — sample alternate brand to demo re-skinning.
- `style-dictionary.config.cjs` — Style Dictionary config mirroring our desired outputs (CSS vars, Tailwind map, resolved JSON).
- `build-tokens.ts` — Node/TS script; reads `TOKENS_PATH` (default `src/theme/tokens.json`), outputs:
  - `src/theme/generated.css` (`@layer base { :root { --text-primary: ... } }`)
  - `src/theme/tailwind-colors.js` (nested color map for Tailwind)
  - `src/theme/tokens.resolved.json` (resolved references)
  Run with `ts-node` or compile to JS. Not added to build yet.
- `tailwind-plugin.cjs` — Tailwind plugin factory; injects CSS vars + semantic utility aliases (`text-primary`, `bg-cta`, etc.). Wire into `tailwind.config.js` when ready.
- `runtime-theme.ts` — client helper to apply tokens at runtime (per-tenant theming, no reload). Creates/updates a `<style>` block with CSS vars.
- `tokens.schema.json` — JSON Schema draft to validate token files.
- `validate-tokens.ts` — optional Ajv-based validator (`node validate-tokens.ts`) using the schema.
- `style-dictionary-dropin.md` — instructions to run Style Dictionary and wire outputs (not applied).

Suggested integration steps (when approved):
1) Copy `tokens.default.json` to `src/theme/tokens.json`; optional: keep brand-specific JSONs beside it.
2) Move `build-tokens.ts` to `scripts/` and add npm script `"tokens": "ts-node scripts/build-tokens.ts"`.
3) Run `npm run tokens`; import `src/theme/generated.css` in your global CSS entry; require `tailwind-colors.js` in `tailwind.config.js` (`extend.colors = semanticColors`).
4) Add `tailwind-plugin.cjs` to Tailwind plugins for utility aliases.
5) Drop `runtime-theme.ts` into `src/theme/` and call `applyBrandTheme()` at app bootstrap (or `loadAndApply(url)` for per-tenant JSON).

Nothing here is integrated yet; safe to tweak before wiring.
