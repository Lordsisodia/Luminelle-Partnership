# Issue 033: Signed-in drawer profile uses a random “placekitten” avatar fallback

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `33`
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

When a signed-in user has no profile photo, the drawer should show a neutral, on-brand fallback (not a random external image like “placekitten”).

Audit (issue 33): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Signed-in drawer profile uses a random “placekitten” avatar fallback”.

Likely file:
- `src/ui/providers/DrawerProvider.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO (already fixed in current code)**

Evidence:
- There is no `placekitten` usage in the codebase.
- Drawer profile fallback renders a local initial-based avatar when `user.imageUrl` is absent.

Repro (current):
1. Sign in with an account that has no profile image.
2. Open the drawer.
3. Observe the fallback avatar uses the user’s initial (not an external image).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX (already applied)**

Notes:
- No additional work needed; closing the issue in the tracker.

## Step 4 — Options
- [x] Option A: Render a local initial-based avatar fallback (preferred).
- [ ] Option B: Render a brand icon fallback.
- [ ] Option C: Fetch a default image from a CDN (avoid random external sources).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** (already in place) because it’s deterministic, privacy-friendly, and doesn’t depend on external services.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Acceptance criteria:
- No requests to random/external avatar placeholder services.
- Signed-in users without `imageUrl` see an on-brand fallback avatar.

Risks:
- None; verified in current code.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- No additional changes required; issue is already addressed.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 33)
- Code refs:
  - `src/ui/providers/DrawerProvider.tsx` (initial-based avatar fallback)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The drawer no longer uses any random external avatar fallback; it uses the user’s image when present, otherwise a deterministic initial-based avatar.
