# Design Token Engine — How to Use (kept in future-features folder)

Audience: a dev or AI assistant wiring this into the app when approved.

What’s here (all under `docs/future features/design-token-engine/`)
- `code/` — ready artifacts: tokens (default + Noir), Style Dictionary config, custom generator, Tailwind plugin, runtime applier, schema, validator, audit script, VRT sample, generated reference outputs.
- Plans/guardrails — research plan, governance, rollout, codemod plan, VRT plan, risk register, comms, acceptance criteria.

Quick start (when allowed to integrate)
1) Install dev deps: `npm i -D style-dictionary@4 ajv ajv-formats ts-node` (and Playwright later if desired).
2) Copy `code/tokens.default.json` to `src/theme/tokens.json` (or keep in `theme/`).
3) Run `npx style-dictionary build --config docs/future\ features/design-token-engine/code/style-dictionary.config.cjs` (or use `build-tokens.ts`). Outputs: `generated.css`, `tailwind-colors.js`, `tokens.resolved.json`.
4) Wire Tailwind:
   - import semanticColors from generated `tailwind-colors.js`;
   - add to `extend.colors` and keep brand aliases during migration;
   - add plugin `tailwind-plugin.cjs`.
5) Import CSS vars: `@import './theme/generated.css';` near top of `src/index.css`.
6) Runtime (optional): `applyBrandTheme(tokens)` from `runtime-theme.ts` at app bootstrap.
7) Codemod: follow `codemod-plan.md` to swap utilities/hexes; leave aliases until grep=0.
8) Validate: run `validate-tokens.ts` (Ajv) and VRT script if desired.

Folder map (key files)
- `code/style-dictionary.config.cjs` — SD build config.
- `code/generated/` — sample outputs for reference.
- `code/tokens.default.json`, `code/tokens.alt-noir.json` — brand token sets.
- `code/tailwind-plugin.cjs`, `code/runtime-theme.ts` — wiring helpers.
- `codemod-plan.md` — mappings for classes/hexes.
- `rollout-plan.md`, `pilot-branch-checklist.md` — phased rollout guidance.
- `acceptance-criteria.md`, `risk-register.md`, `governance-proposal.md` — guardrails.

Safety
- Nothing here is imported by the app; copying/wiring is a deliberate step.
- Keep legacy brand color aliases during migration to avoid breakage.
