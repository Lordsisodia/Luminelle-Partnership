# Design Token Engine (plan)

Based on the High ROI feature #1 in `docs/Gemini/high_roi_features_plan.md`.

## Status (as implemented)

As of 2025-12-14, the “engine” is partially implemented in a way that preserves the current look:
- `src/theme/tokens.json` exists and matches the current palette (no visual diffs intended).
- `tailwind.config.js` reads `src/theme/tokens.json`, resolves `{}` refs, injects CSS variables into `:root`, and exposes `semantic.*` as Tailwind color utilities (supports `/NN` opacity).
- Safe codemod waves are in progress, migrating `brand-*` usages to `semantic-*` utilities **only when the token value is an exact match** (see `docs/future features/design-token-engine/codemod-plan.md`).
- For blush: we intentionally use `semantic.legacy.brand.blush` for 1:1 migration (because `bg.subtle` / `border.subtle` are `color-mix()` and are not pixel-identical).

## 1) What we have today (reverse‑engineered palette)
- Tailwind theme: `brand.peach #FBC7B2`, `brand.cocoa #55362A`, `brand.blush #FDD4DC`; shadow uses peach alpha (0.35).
- Usage footprint (grep counts): brand‑cocoa (text) dominates; brand‑blush (borders/surfaces) nearly as common; brand‑peach (CTA fills, badges, gradients) used in most sections (hundreds of class hits across landing, shop, account, admin, auth).
- Additional hard‑coded hexes:
  - Gradient/backdrop tints: `#F9D8D0`, `#FCEBE3`, `#FDE7DA`, `#fff2eb`, `#FFF6F2`, `#fff7f3`, `#FFE8DC`, `#FDD9C3`, `#F7B8A0`, `#F4C7B7`.
  - Spin wheel accents: `#F9A58A`, `#E16F5C`.
  - Testimonial pill colors: `#E0724A`, `#9938CA`, `#8B5CF6`.
  - Success/affirmation: `#0F9D58` (Checkout).
- Patterns: cocoa is our primary text/on-dark; blush is our light surface/border; peach is our CTA/accent; gradients are peach→blush tints; stray purples/oranges are one‑off highlight colors we should map to semantic “promo/accent” slots.

## 2) Objectives
- Single source of truth for brand styles (color, radius, typography) that can be swapped per brand/tenant.
- Zero hardcoded hex/classes in components; everything resolves through semantic tokens.
- Works for Tailwind + component library (`../components-library/packages/ui`) and any plain CSS/inline styles.
- Safe rollout: keep current look as default theme; allow incremental migration.

## 3) Token schema proposal (`src/theme/tokens.json`)
```jsonc
{
  "meta": { "brand": "Lumelle", "version": 1 },
  "base": {
    "brandPrimary": "#FBC7B2",   // peach
    "brandSecondary": "#55362A", // cocoa
    "brandTertiary": "#FDD4DC",  // blush
    "neutral": {
      "0": "#FFFFFF",
      "100": "#FDF8F6",
      "900": "#12100F"
    },
    "accent": {
      "promo": "#E0724A",
      "info": "#8B5CF6"
    },
    "states": {
      "success": "#0F9D58",
      "warning": "#FACC15",
      "danger": "#E16F5C"
    },
    "radius": { "sm": "8px", "md": "16px", "lg": "24px", "pill": "999px" }
  },
  "semantic": {
    "text.primary": "{base.brandSecondary}",
    "text.muted": "color-mix(in srgb, {base.brandSecondary} 70%, white)",
    "bg.canvas": "{base.neutral.0}",
    "bg.surface": "{base.neutral.0}",
    "bg.subtle": "color-mix(in srgb, {base.brandTertiary} 25%, white)",
    "bg.heroGradient": "linear-gradient(135deg, #F9D8D0 0%, #FCEBE3 45%, #FDE7DA 100%)",
    "border.subtle": "color-mix(in srgb, {base.brandTertiary} 65%, white)",
    "accent.cta": "{base.brandPrimary}",
    "accent.ctaText": "{base.brandSecondary}",
    "accent.badge": "{base.brandPrimary}",
    "promo.highlight": "{base.accent.promo}",
    "state.success": "{base.states.success}",
    "state.warning": "{base.states.warning}",
    "state.danger": "{base.states.danger}"
  }
}
```

Notes: semantic keys are what components should consume; base can be replaced per brand; the defaults match today’s palette so rollout is no‑op visually.

## 4) Build pipeline
- **Source:** `src/theme/tokens.json` (committed); allow override later at runtime via brand payload.
- **Current approach (no generator yet):** `tailwind.config.js` reads + resolves tokens at build time, injects CSS variables into `:root`, and maps `semantic.*` tokens into Tailwind `theme.colors.semantic.*`.
- **Optional later upgrade:** add a compiler script to emit `generated.css` and a Tailwind colors export if we want faster builds, validation, or multi-brand packaging.
- **Tailwind helpers:** we expose both:
  - token-backed *colors* (`text-semantic-*`, `bg-semantic-*`, `border-semantic-*`, etc.), which support Tailwind opacity modifiers (`/NN`)
  - token-backed *alias utilities* (`text-primary`, `bg-cta`, `bg-subtle`, etc.) for new code (these are not intended for opacity-heavy codemods).
- **Component library bridge:** add the same generated CSS to `../components-library/packages/ui/src/theme` or consume from app via shared package/import to keep parity.

## 5) Runtime theming
- Optional `applyBrandTheme(brandTokens)` util that:
  1) fetches brand token JSON (e.g., per-tenant setting, local file for now);
  2) writes CSS variables onto `document.documentElement` (or sets `data-theme="brand-id"` with a generated `<style>` block);
  3) caches in `localStorage` with an ETag/version to avoid flicker;
  4) provides `useTheme()` hook to expose resolved values to inline-styled components.
- Server-side pre-render: embed token JSON into HTML to avoid first-paint mismatch.

## 6) Migration plan (incremental, low risk)
1) **Introduce tokens:** add `tokens.json`, generator script, and include `generated.css` in `src/index.css`.
2) **Tailwind wiring:** refactor `tailwind.config.js` to read the generated map; keep existing `brand.peach/cocoa/blush` as aliases to new semantic names to prevent breakage.
3) **Class swap (codemods):**
   - Prefer exact-match swaps only (no visual diffs):
     - `text-brand-cocoa(/NN)` → `text-semantic-text-primary(/NN)`
     - `bg-brand-peach(/NN)` → `bg-semantic-accent-cta(/NN)`
     - `bg-brand-blush(/NN)` / `border-brand-blush(/NN)` → `bg|border-semantic-legacy-brand-blush(/NN)` (1:1 blush)
     - `bg-brand-cocoa(/NN)` / `border-brand-cocoa(/NN)` → `bg|border-semantic-legacy-brand-cocoa(/NN)` (rare)
   - Avoid mapping blush surfaces to `bg-subtle` / `border-subtle` until we explicitly accept a slight visual change (they use `color-mix()` by design).
   - Defer hardcoded gradient hex tokenization until after the class swaps are stable (to avoid unintended diffs).
4) **Inline hex cleanup:** map the stray colors to semantic slots (`promo`, `success`, `warning`, `danger`).
5) **Component library:** mirror utilities or accept CSS variables (preferred) so shared components stay in sync.
6) **Validation:** add a Storybook/visual-regression page that renders tokens and common components under default + a sample alt brand to confirm coverage.

## 7) Deliverables checklist
- [x] `src/theme/tokens.json` committed with current palette.
- [ ] `scripts/build-tokens.ts` + npm script `npm run tokens` (optional; not required for current rollout).
- [x] Tailwind wiring added (token-backed CSS vars + `semantic.*` colors).
- [x] Codemod/grep plan documented for swapping classes (exact-match strategy).
- [ ] One alternate brand sample (e.g., “Noir”) to prove re-skin works.

## 8) Open questions
- Where will per-merchant brand data live (Shopify metafield vs. internal DB)?
- Do we need dark mode tokens now or later? (schema allows `brandMode: dark`).
- Should gradients be tokenized as images or computed from base colors at build time?
