# Issue 039: PDP always shows the “New Heatless Curler Launched” banner (even on the curler PDP)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `39`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `13`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The PDP “New Heatless Curler Launched” banner should not appear on the curler product itself; it should only promote the curler from other product pages.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (in current codebase) — already addressed.

Evidence:
- `HeroMedia` supports a `showLaunchBanner` flag: `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx`.
- The PDP section map gates the banner by product handle:
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` sets `showLaunchBanner = !productHandle.startsWith('satin-overnight-curler')`
  - and passes it to `<HeroMedia showLaunchBanner={showLaunchBanner} />`.

Expected behavior:
- On `/product/satin-overnight-curler` (and related curler handles), the banner is hidden.
- On other product pages, the banner can be shown to promote the curler.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **CLOSE** (already fixed).

## Step 4 — Options
- [x] Option A: always show the banner.
- [x] Option B: gate the banner by product handle so it’s hidden on the curler PDP.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B** (already implemented).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

N/A — no new code changes required.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

No changes required in this pass; behavior is already gated by handle.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The curler launch banner is already gated by product handle and should not show on curler PDP routes.
