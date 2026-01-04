# Issue 082: PDP hero image preload can miss the CDN URL (wasted bandwidth + slower hero render)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `82`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `17`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The PDP injects an image preload link using a non-CDN hero URL, while the actual hero image uses `cdnUrl(...)`, which can waste bandwidth and fail to improve LCP.

Audit (issue 82): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “PDP hero image preload can miss the CDN URL”.

Likely files:
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (preload injection)
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` (actual image src uses `cdnUrl`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- Preload link `href` was set to `heroImage` (raw gallery path), but rendered hero uses `encodeURI(cdnUrl(src))`.

Repro (before fix):
1. Visit a PDP with `VITE_USE_ASSET_CDN=1`.
2. Inspect `<head>` for `link[rel="preload"][data-hero="pdp-hero"]`.
3. Compare its `href` to the rendered hero `<img src>`; they can differ (causing duplicate requests / wasted preload).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Preload mismatches don’t help LCP and can increase bandwidth on mobile.
- No product decision needed.

## Step 4 — Options
- [x] Option A: Compute the same CDN/encoded hero URL and use it for the preload `href`.
- [ ] Option B: Remove the preload tag entirely and rely on `loading="eager"` only.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: keep the intended perf hint but point it at the same URL the browser will actually request.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- In the preload effect, derive the primary hero source from `gallery` and set `href` to `cdnUrl(primarySrc)`.
- If a preload link already exists (e.g., navigating between products), update its `href` instead of leaving it stale.

Acceptance criteria:
- With CDN enabled, the preload `href` matches the hero image URL strategy (`cdnUrl`).
- Navigating between products updates the preload `href` (prevents stale preloads).
- Typecheck passes.

Risks:
- Minimal; only affects preload hinting.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Updated the preload injection to use the CDN/encoded hero URL derived from `gallery` (and update the existing preload link if present).

File touched:
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 82)
- Code refs:
  - `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (preload `href` now uses `cdnUrl(primarySrc)`)
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` (hero image uses `cdnUrl`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Preload now targets the same hero URL strategy as the rendered image, reducing duplicate requests and improving the chance it actually helps LCP.
