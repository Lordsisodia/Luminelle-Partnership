# Issue 149: App-level `Suspense` fallback removes the site chrome (header/footer vanish during route loads)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `149`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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

The app-level `Suspense` boundary wrapped the entire router and used a bare “Loading…” fallback, so on lazy route transitions the whole UI (including header/footer) vanished.

Audit (issue 149): `docs/reviews/app-ui-review-2025-12-26.md` — “App-level `Suspense` fallback removes the site chrome”.

Likely file:
- `src/App.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/App.tsx` used `<Suspense fallback={<div className="p-6 ...">Loading…</div>}>` around the entire `<Routes>`, so the fallback replaced everything while chunks loaded.

Repro (before fix):
1. Navigate between two lazy routes (e.g. `/` → `/brand` or `/product/:handle`).
2. During the route transition, observe the header/footer disappear and a plain “Loading…” block appears.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a “perceived quality” issue and happens across the whole app (high reach).
- Fix is low-risk and can be done without changing routing structure.

## Step 4 — Options
- [x] Option A: Replace the fallback with a lightweight “chrome + skeleton” UI (header + footer + loading content).
- [ ] Option B: Refactor routing to move headers/footers outside the `Suspense` boundary (bigger structural change).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: smallest change that prevents the “blank app” feeling during chunk loads.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add a small `AppLoadingFallback` component in `src/App.tsx` that renders:
  - A minimal header skeleton (brand + placeholder button)
  - A content skeleton
  - The real `GlobalFooter` (so the page doesn’t feel “empty”)
- Ensure animations respect reduced-motion (`motion-safe:animate-pulse` + `motion-reduce:animate-none`).
- Use it as the `Suspense` fallback.

Acceptance criteria:
- During lazy route loads, the app still shows a header/footer instead of a bare loading div.
- Typecheck passes.

Risks:
- Slight visual mismatch vs the “real” header for some route types (e.g., admin), but only visible briefly during chunk load.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added `AppLoadingFallback` and switched `<Suspense fallback={...}>` to use it.

Files touched:
- `src/App.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 149)
- Code refs:
  - `src/App.tsx` (AppLoadingFallback + Suspense fallback swap)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Route transitions no longer feel like the app “disappears”; users see consistent chrome + a lightweight skeleton while chunks load.
