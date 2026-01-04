# Issue 115: Successful sign-in redirects users to a broken destination (`afterSignInUrl="/account"` but `/account` is unavailable)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `115`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Platform`
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

After a successful sign-in, users should not be redirected to a missing/broken route (the audit claimed `/account` was unavailable).

Audit (issue 115): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Successful sign-in redirects users to a broken destination”.

Likely files:
- `src/main.tsx` (ClerkProvider `afterSignInUrl`)
- `src/App.tsx` (route definitions)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO (not reproducible in current codebase)**

Evidence:
- `src/main.tsx` sets `afterSignInUrl="/account"`.
- `src/App.tsx` defines a `/account` route and renders `AccountPage` for it.

Notes:
- The account sub-pages are still partially stubbed (`TemporarilyUnavailablePage`), but `/account` itself is not missing and does render content. That broader “account is stubbed” concern is tracked as issue `#003`.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **NOT_AN_ISSUE**

Notes:
- No code changes required; the route exists and is wired.

## Step 4 — Options
- [x] Option A: No-op (current code already routes `/account`).
- [ ] Option B: Change `afterSignInUrl` to `/` (product decision: desired post-login destination).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: no change until a separate product decision indicates a better post-login landing route.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Acceptance criteria:
- `/account` route exists and renders without a 404 after sign-in.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- None.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 115)
- Code refs:
  - `src/main.tsx` (ClerkProvider `afterSignInUrl="/account"`)
  - `src/App.tsx` (`/account` route exists)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: `/account` is present and routable in the current app; the audit claim about it being unavailable no longer applies.
