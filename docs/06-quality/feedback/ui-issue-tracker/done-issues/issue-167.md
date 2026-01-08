# Issue 167: Service worker forces immediate activation (`skipWaiting` + `clients.claim`) with no “Update available” UX

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `167`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
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

The service worker was configured to immediately activate and claim clients with no user-visible “Update available” UX, which can cause confusing mid-session behavior when a new deploy lands.

Audit (issue 167): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Service worker forces immediate activation (`skipWaiting` + `clients.claim`) with no “Update available” UX”.

Likely files:
- `public/sw.js` (service worker behavior)
- `src/main.tsx` (service worker registration)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `public/sw.js` called `self.skipWaiting()` during install and `self.clients.claim()` during activate.
- `src/main.tsx` registered the SW with no UX when updates are detected.

Repro (before fix):
1. Load the site once (SW becomes active).
2. Deploy a new version.
3. Reload (or wait for the browser to pick up the new SW) — the SW can activate/claim without any in-app notice, leading to “it changed mid-session” vibes and potential cache edge cases.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is mostly a “polish + reliability” improvement, but it affects the entire app when enabled.
- No product decision required; standard PWA pattern is “prompt to refresh”.

## Step 4 — Options
- [x] Option A: Add an in-app “Update available” toast and only call `skipWaiting` on user action.
- [ ] Option B: Remove the service worker entirely (lose offline/PWA value).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: preserves offline/PWA benefits while making updates predictable and user-driven.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Change `public/sw.js`:
  - Remove unconditional `skipWaiting()` from install.
  - Add a `message` handler to call `skipWaiting()` when the client requests it.
- Add update UX in app:
  - Enhance SW registration to detect `waiting` updates and dispatch an in-app event.
  - Render a small “Update available” toast with “Refresh” action.
  - On refresh: postMessage `{ type: 'SKIP_WAITING' }` to the waiting worker and reload on `controllerchange`.

Acceptance criteria:
- A new deploy surfaces a non-blocking “Update available” UI while the user is on the site.
- Updates only activate after user clicks “Refresh” (no silent mid-session takeovers).
- `npm run typecheck` passes.

Risks:
- SW update UX can be browser-sensitive; we use a conservative pattern (waiting worker + controllerchange reload) to avoid weird partial-update states.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added an in-app update toast and SW registration update detection.
- Updated SW install flow to wait for an explicit “skip waiting” message.

Files touched:
- `public/sw.js`
- `src/main.tsx`
- `src/lib/serviceWorkerUpdates.ts` (event helper)
- `src/ui/components/ServiceWorkerUpdateToast.tsx` (UI)

Validation:
- `npm run typecheck` ✅
- Manual QA (best-effort, in production build):
  - Load site, then deploy a new version.
  - Confirm “Update available” toast appears.
  - Click “Refresh” and confirm the page reloads into the new version.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 167)
- Code refs:
  - `public/sw.js` (message-driven skipWaiting)
  - `src/main.tsx` (updatefound detection + event dispatch)
  - `src/ui/components/ServiceWorkerUpdateToast.tsx` (UI prompt)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Service worker updates are now user-driven with an explicit “Update available” prompt, avoiding silent mid-session takeovers.
