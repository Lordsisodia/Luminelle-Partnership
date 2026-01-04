# Issue 170: PDP bottom CTA chips are hard-coded to shower-cap features (“Waterproof satin”, “No-frizz seal”) for every product

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `170`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `29`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The PDP’s bottom conversion CTA renders a hard-coded set of “feature” chips that are only true for the shower cap, but they show up for other products too.

Audit (issue 170): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “PDP bottom CTA chips are hard-coded to shower-cap features (‘Waterproof satin’, ‘No-frizz seal’) for every product”.

Likely files:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (bottom CTA chip UI)
- `src/domains/client/shop/products/data/product-config.ts` + `product-types.ts` (product-specific copy/config)
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (thread props into sections)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` renders:
  - “Waterproof satin”
  - “No-frizz seal”
  - “UK free returns”
  …for **all** products, regardless of handle.

Repro (before fix):
1. Visit the curler PDP (e.g. `/products/satin-overnight-curler`).
2. Scroll to the bottom CTA (“Ready when you are”).
3. Observe cap-specific chips (“Waterproof satin”, “No-frizz seal”) rendering on a non-cap product.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This copy appears immediately before purchase actions, so incorrect claims are a direct trust/conversion risk.
- This is not blocked on a broader product decision — we can make chips handle-specific via the existing product config system.

## Step 4 — Options
- [x] Option A: Add `bottomCtaChips` to product config and render chips from that.
- [x] Option B: Only render cap-specific chips for the cap (if handle matches) and remove chips for other products.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** because it’s explicit, scalable, and keeps marketing copy in the product config (instead of hidden in a shared component).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Extend `ProductConfig` with an optional `bottomCtaChips?: string[]`.
- Add appropriate chips to the shower cap and curler configs.
- Thread `bottomCtaChips` through `ProductPage` → `renderSections`.
- Replace hard-coded chip `<span>` elements with a mapping over `bottomCtaChips` (render nothing if empty).

Acceptance criteria:
- Shower cap PDP shows cap-appropriate chips.
- Curler PDP shows curler-appropriate chips.
- No non-cap PDP renders “Waterproof satin” / “No-frizz seal”.

Risks:
- Copy correctness: if the chip text is later changed, it should be changed in config (single source of truth).
- Rollback is trivial: remove the config field and render no chips.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added `bottomCtaChips` to product config and rendered chips from config instead of hard-coded shower-cap claims.

Files touched:
- `src/domains/client/shop/products/data/product-types.ts`
- `src/domains/client/shop/products/data/product-config.ts`
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`

Validation:
- `npm run typecheck` ✅

Manual QA checklist:
- Visit shower cap PDP → bottom CTA chips show shower-cap-appropriate values.
- Visit curler PDP → bottom CTA chips no longer show “Waterproof satin” / “No-frizz seal”.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 170)
- Code refs:
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (bottom CTA now maps chips from props)
  - `src/domains/client/shop/products/data/product-config.ts` (per-product chips)
  - `src/domains/client/shop/products/data/product-types.ts` (new field)
  - `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (threads config → sections)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Bottom CTA chip copy is now product-specific (via config) instead of globally hard-coded shower-cap claims.
