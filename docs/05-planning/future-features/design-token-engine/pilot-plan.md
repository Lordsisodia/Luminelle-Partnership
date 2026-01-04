# Pilot & Validation Plan (draft)

Purpose: validate token engine with minimal risk before full rollout.

Proposed pilot screens
- Shop: Product Detail Page (PDP) and Checkout (covering text, CTA, forms, alerts).
- Marketing: Landing Hero + CTA strip (covers gradients, badges, headings).

Brand variants
- Default: `tokens.default.json` (Lumelle current look).
- Alt: `tokens.alt-noir.json` (dark-ish contrasty brand) to prove re-skin.

Steps
1) Wire token engine into a feature branch (PDP + Checkout only).
2) Run codemod for mapped utilities on those pages; leave aliases on globally.
3) Generate screenshots before/after (Playwright) for both brands; compare diffs.
4) A11y spot-check contrasts on pilot pages (expect cocoa text passes; ensure alt brand maintains AA for text on surfaces).
5) Perf check: measure style recalc on runtime swap (<4ms target) and FOUC (should be zero with inline CSS vars).
6) Stakeholder review: share side-by-side gallery; gather sign-off.
7) Decide go/no-go for whole-app codemod.

Open items
- Confirm final pilot screens and alt brand choice with stakeholders.
- Need components-library access to ensure shared components inherit vars.
