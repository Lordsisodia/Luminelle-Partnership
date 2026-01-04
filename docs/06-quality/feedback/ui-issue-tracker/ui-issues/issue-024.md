# Issue 024: Reviews section is biased: it filters to only 5★ reviews

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `24`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `21`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The audit claim was that the reviews UI is biased because it filters to only 5★ reviews.

Audit (issue 24): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Reviews section is biased: it filters to only 5★ reviews”.

Likely files/components:
- `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (homepage reviews section)
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (PDP reviews section)
- `src/components/ui/3d-carousel.tsx` (carousel rendering)
- `src/content/home.config.ts` (review dataset)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (the “filters to only 5★” behavior is not present in the current codebase).

Evidence (current behavior):
- The homepage passes `homeConfig.reviews` directly into `ReviewsAutoCarousel` with no filtering.
- The PDP uses `props.reviews ?? homeConfig.reviews` with no filtering.
- The review dataset itself contains non‑5 values (e.g. `4.5`, `4.7`, `4.8`, `4.9`) in `home.config.ts`.
- The 3D carousel renders whatever it is given; it doesn’t filter out lower-star entries.

Repro:
1. Inspect `homeConfig.reviews` data.
2. Inspect where it is passed into the reviews carousel on `/` and `/product/*`.
3. Confirm there is no `.filter(...)` limiting to 5★.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **NOT_AN_ISSUE**

Notes:
- The reviews set is still curated and skewed toward high ratings, but it is not implemented as a “filter to only 5★” in code.
- If we want to address perceived bias further, it should be tracked as a separate issue (“reviews dataset is heavily skewed / needs disclosure / needs real source of truth”).

## Step 4 — Options
- [x] Option A: Leave as-is; update tracker to reflect the audit claim is no longer accurate.
- [ ] Option B: Create a new issue to source reviews from real data (Shopify reviews) and/or add disclosure that these are curated testimonials.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** for this audit item: close as `NOT_AN_ISSUE` because the specific “filters to only 5★” behavior isn’t present now.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Update tracker status to `NOT_AN_ISSUE`.

Acceptance:
- Tracker top open list no longer includes issue 24.

Risks:
- None (documentation-only change).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Updated the worklog + tracker to reflect that the claimed filtering behavior isn’t present.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 24)
- Code refs:
  - `src/content/home.config.ts` (`reviews` includes non‑5 values)
  - `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (passes reviews unfiltered)
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (uses reviews unfiltered)
  - `src/components/ui/3d-carousel.tsx` (renders provided cards; no filter)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: The audit claim appears outdated; the current reviews UI does not filter to only 5★ reviews.
