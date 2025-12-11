# Pilot Branch Checklist (do when greenlit; keeps main untouched)

Branch setup
- [ ] Create branch `feat/token-engine-pilot`.
- [ ] Copy `docs/future features/design-token-engine/code/tokens.default.json` → `src/theme/tokens.json` (for pilot only).
- [ ] Move `code/build-tokens.ts`, `tokens.schema.json`, `validate-tokens.ts` into `scripts/` or `src/theme/` per README; add temporary npm scripts locally (do not commit to main until approved).
- [ ] Run `npm install ajv ajv-formats ts-node` (dev) if needed for validator; keep changes local if not approved.

Wire (pilot scope only: PDP + Checkout + Landing hero)
- [ ] Run `npm run tokens` to generate `generated.css`, `tailwind-colors.js`, `tokens.resolved.json`.
- [ ] Import `generated.css` in `src/index.css` (pilot branch).
- [ ] Update `tailwind.config.js` to require `./src/theme/tailwind-colors.js` and merge into `extend.colors`.
- [ ] Add tailwind plugin `tailwind-plugin.cjs` to plugins array.
- [ ] Add runtime helper `runtime-theme.ts`; call `applyBrandTheme(tokens)` at app bootstrap (pilot only).

Codemod (pilot pages only)
- [ ] Swap utilities per codemod-plan on PDP + Checkout + Landing hero.
- [ ] Replace gradients/hexes on those pages with semantic equivalents.
- [ ] Leave global aliases intact to avoid regressions elsewhere.

Validation
- [ ] Run `npm run build` and `npm run lint`.
- [ ] Run Playwright screenshots (see vrt-plan.md) for default + Noir.
- [ ] Contrast spot-check on pilot pages.
- [ ] Perf trace: measure style recalc on theme swap (<4ms target).

Review
- [ ] Export before/after screenshots + diff gallery for stakeholders.
- [ ] Note any components pulling colors from elsewhere (flags for full rollout).

Exit
- [ ] Keep pilot branch open for review; do NOT merge until approvals.
