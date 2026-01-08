# Issue 088: PDP hero media uses generic alt text for key product imagery (accessibility + SEO loss)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `88`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `27`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The PDP hero media uses generic alt/title text (“Lumelle product detail/video”) instead of product-specific descriptions.

Audit (issue 88): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “PDP hero media uses generic alt text for key product imagery”.

Likely files:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` (main `<img>` alt + `<iframe>` title)
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (passes props into `HeroMedia`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` sets:
  - `<img alt="Lumelle product detail" />` (always)
  - `<iframe title="Lumelle product video" />` (always)

Repro (before fix):
1. Visit `/product/shower-cap` and `/product/satin-overnight-curler`.
2. Inspect the main hero image `alt` text: it’s identical (“Lumelle product detail”) across products.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a straightforward a11y/polish improvement with low risk.
- No product decision needed; we can generate a deterministic alt/title from `productTitle`.

## Step 4 — Options
- [x] Option A: Pass `productTitle` into `HeroMedia` and generate alt/title strings from it.
- [x] Option B: Hard-code per-handle alt strings in the gallery config.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** because `productTitle` is already available at render time and avoids duplicating copy in multiple places.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add `productTitle` prop to `HeroMedia`.
- Thread `productTitle` from `SectionsMap` into `HeroMedia`.
- Use it to generate:
  - main image alt: “{productTitle} — product photo {n}”
  - video title: “{productTitle} — product video”

Acceptance criteria:
- The hero image alt differs between products and references the product title.
- Typecheck passes.

Risks:
- Minimal. If `productTitle` is empty, fall back to a generic “Product image” label.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `HeroMedia` now receives `productTitle` and uses it for:
  - hero image alt text (“{productTitle} — product photo {n}”)
  - video iframe title (“{productTitle} — product video”)

Files touched:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx`
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`

Validation:
- `npm run typecheck` ✅

Manual QA checklist:
- Visit `/product/shower-cap` and `/product/satin-overnight-curler` and confirm hero alt/title are product-specific.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 88)
- Code refs:
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` (alt/title now product-aware)
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (threads `productTitle`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: PDP hero media now uses product-specific alt/title strings instead of generic “Lumelle product detail/video”.
