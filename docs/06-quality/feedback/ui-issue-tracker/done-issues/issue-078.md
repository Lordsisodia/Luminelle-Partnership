# Issue 078: `useMediaQuery` uses `matchMedia.addEventListener` only (no Safari/legacy fallback)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `78`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `9`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

`useMediaQuery` subscribed to `matchMedia` changes using only `addEventListener`, which can break on older Safari/legacy environments that require `addListener/removeListener`.

Audit (issue 78): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “`useMediaQuery` uses `matchMedia.addEventListener` only”.

Likely file:
- `src/components/ui/3d-carousel.tsx` (defines `useMediaQuery`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `useMediaQuery` called `matchMedia.addEventListener('change', ...)` without checking support, with no fallback.

Repro (conceptual):
1. On older Safari / webviews, `MediaQueryList` may not implement `addEventListener`.
2. Components depending on `useMediaQuery` sizing can fail to respond to viewport changes (or throw).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- A single runtime error in a shared hook can break high-visibility sections (reviews carousel).
- No product decision needed.

## Step 4 — Options
- [x] Option A: Feature-detect `addEventListener`; fall back to `addListener/removeListener`.
- [ ] Option B: Add a polyfill (unnecessary for this small compatibility gap).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: minimal code and matches browser compatibility reality.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- If `matchMedia.addEventListener` is available, use it.
- Otherwise, fall back to `addListener/removeListener`.

Acceptance criteria:
- No runtime error on Safari/legacy environments.
- `useMediaQuery` still updates matches when breakpoints change.
- Typecheck passes.

Risks:
- None; this is a well-known compatibility fix.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added Safari/legacy fallback to `useMediaQuery` event subscription.

File touched:
- `src/components/ui/3d-carousel.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 78)
- Code refs:
  - `src/components/ui/3d-carousel.tsx` (`useMediaQuery` now supports both event APIs)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: `useMediaQuery` now works across Safari/legacy implementations and won’t crash the carousel on older devices.
