# Rollout Plan (safe + no visual change)

Goal: switch the app to be *token-driven* while keeping the UI looking **exactly the same** during rollout.

## Current state (already in place)
- `src/theme/tokens.json` exists and matches the Lumelle palette.
- `tailwind.config.js` loads tokens, resolves `{base.*}` references, injects CSS variables into `:root`, and exposes semantic colors to Tailwind.
- `brand-peach/cocoa/blush` utilities are still used heavily in the codebase (migration not done yet).

## Phase 0 — No-op wiring (visuals must not change)
Objective: make existing `brand-*` utilities resolve from tokens (so changing `tokens.json` would re-skin later), while keeping every rendered color identical today.

Do:
- Keep all existing class names in the app (no codemods).
- Ensure `brand.peach/cocoa/blush` in Tailwind are derived from token-backed CSS variables and still support opacity modifiers (`/40`, etc).
- Keep hardcoded fallbacks in Tailwind so missing tokens cannot break styling.

Acceptance criteria:
- `npm run build` succeeds.
- No UI visual differences (spot-check key pages + smoke test).
- No runtime errors from Tailwind config (tokens missing should fall back safely).

## Phase 1 — Enable semantic utilities (still no required migration)
Objective: make it easy to write new code using semantic tokens without touching existing code.

Do:
- Add a small Tailwind plugin that creates short semantic aliases (e.g. `text-primary`, `bg-subtle`, `border-subtle`, `bg-cta`).
- Keep legacy `brand-*` keys in Tailwind during the migration window.
- Document “new code must use semantic tokens” (existing code can remain).

Acceptance criteria:
- New semantic classes exist and compile.
- No changes required across existing pages/components.
Status: implemented (aliases are registered in `tailwind.config.js`).

## Phase 2 — Codemod waves (small, reversible steps)
Objective: gradually replace legacy utilities and raw literals *only where the meaning is the same*.

Principle: only replace where the old value is demonstrably the same color/role.
Tip: for exact 1:1 legacy palette replacements (especially blush), use `semantic.legacy.brand.*` tokens (`bg-semantic-legacy-brand-blush/40`, etc.).

Suggested waves:
- Wave 1: Landing + PDP + Shop flows (highest ROI; most brand usage).
- Wave 2: Account + Auth + Blog.
- Wave 3: Admin + internal tools.

Guardrails per wave:
- Keep changes scoped to one domain/page group per PR.
- Run `npm run build` after each wave.
- Do a quick visual smoke (or VRT if available) on the touched pages.
- Maintain `brand-*` aliases until grep is ~0 in non-archive code.

## Phase 3 — Deprecate legacy aliases (when usage reaches zero)
Objective: remove `brand-peach/cocoa/blush` and any legacy-only helpers once the codebase is migrated.

Do:
- Remove legacy Tailwind color keys after `rg "brand-(peach|cocoa|blush)"` is zero (excluding `src/archive/**`).
- Add CI lint to prevent regressions (raw hex + legacy classnames).

## Phase 4 — Multi-brand (optional, future)
Objective: allow switching token sets per merchant/tenant without code changes.

Do:
- Introduce a token loader (metafield/API/CDN) and runtime applier.
- Provide at least one alternate token set (Noir/Fresh Mint) to prove re-skinning.

## Phase 5 — Hardening (CI + governance)
Objective: make token changes safe and predictable long-term.

Do:
- Validate tokens schema in CI (Ajv).
- Add a “no raw hex” rule (lint/codemod guard).
- Add a lightweight visual regression suite for a small set of canonical pages.
