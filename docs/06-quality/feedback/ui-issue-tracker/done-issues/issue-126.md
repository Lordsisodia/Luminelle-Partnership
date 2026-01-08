# Issue 126: No global error boundary: any runtime error or chunk-load failure can white-screen the app

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `126`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
- Impact (1–5): `4`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `37`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

There was no top-level React error boundary, so runtime errors or failed lazy-loaded chunks could white-screen the app with no recovery UI.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/App.tsx` uses `React.lazy()` for routes.
- `src/main.tsx` wrapped the tree in `Suspense`, but there was no error boundary at all.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Chunk-load failures are rare but catastrophic; users see “the site is down”.
- A recovery UI (refresh/home) materially reduces support + churn.

## Step 4 — Options
- [x] Option A: Add a single global error boundary around the app with a branded fallback.
- [x] Option B: Add per-route error boundaries (more granular but inconsistent).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** for maximum coverage and the simplest “always recover” UX.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Create `AppErrorBoundary` with a branded fallback UI and chunk-load detection copy.
- Wrap `BrowserRouter` + providers in `src/main.tsx` inside the boundary.

Acceptance criteria:
- If any route throws, user sees a recovery screen (not a blank app).
- If a dynamic import fails (ChunkLoadError), UI suggests refresh.

Risks:
- Error boundaries don’t catch errors thrown outside React render (e.g., async callbacks), but they cover render/chunk-load failures which are the biggest “white screen” class here.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 126)
- Code refs:
  - `src/ui/components/AppErrorBoundary.tsx` (new)
  - `src/main.tsx` (wrap tree in error boundary)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: App now has a global recovery UI instead of white-screening on render/chunk-load failures.
