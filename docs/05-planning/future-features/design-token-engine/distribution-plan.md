# Distribution Plan (draft)

Targets
- App (Vite): needs CSS vars + Tailwind utilities.
- Shared UI package (when available): should consume same generated outputs.

Artifacts
- `generated.css` — `:root` CSS vars from semantic tokens.
- `tailwind-colors.js` — nested map of semantic vars for Tailwind `extend.colors`.
- `tokens.resolved.json` — resolved tokens for debugging/inspecting.

Flow
1) Source: `src/theme/tokens.json` (or brand-specific JSON).
2) Build: `npm run tokens` (scripts/build-tokens.ts) emits artifacts into `src/theme/`.
3) App consumption: import `generated.css` in `src/index.css`; require `tailwind-colors.js` in `tailwind.config.js`; optionally load `runtime-theme.ts` for runtime swaps.
4) UI package consumption: publish the same generated files into the package (e.g., `packages/ui/theme/`). Option A: copy on publish; Option B: make app expose a small `@lumelle/tokens` package for reuse.
5) Multi-brand: host additional JSONs (e.g., `tokens.brandX.json`); runtime loader picks correct file based on tenant; server can inline active brand vars to avoid FOUC.

Open items
- Confirm package boundaries once components-library path is available.
- Decide whether to ship tokens as a standalone npm package vs. copied assets.
