# Issue 125: The “Sign up” page uses the `signIn` Clerk API (sign-up flow is ambiguous and may fail)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `125`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
- Impact (1–5): `5`
- Reach (1–5): `3`
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

The “Sign up” page should initiate a sign-up flow, but it was using the `signIn` Clerk API — making the behavior ambiguous and potentially failing for new users.

Audit (issue 125): `docs/reviews/app-ui-review-2025-12-26.md` — “The ‘Sign up’ page uses the `signIn` Clerk API”.

Likely file:
- `src/domains/platform/auth/ui/pages/SignUpPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `SignUpPage` imported `useSignIn()` and called `signIn.authenticateWithRedirect(...)` even though the route is `/sign-up`.

Repro (before fix):
1. Visit `/sign-up`.
2. Click “Continue with Google”.
3. The code path uses the sign-in API; behavior depends on Clerk configuration and can be confusing or fail for true “new user” flows.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This directly impacts onboarding conversion for creators.
- Fix is straightforward and isolated to the sign-up page.

## Step 4 — Options
- [x] Option A: Use Clerk’s `useSignUp()` and `signUp.authenticateWithRedirect(...)` on the sign-up route.
- [ ] Option B: Keep using `signIn` and rely on Clerk to route users (ambiguous + harder to reason about).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: aligns code intent with the route semantics and reduces ambiguity.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Replace `useSignIn()` usage with `useSignUp()` in `SignUpPage`.
- Call `signUp.authenticateWithRedirect(...)` with the same redirect URLs.

Acceptance criteria:
- `/sign-up` uses the sign-up API surface.
- Typecheck passes.

Risks:
- Low; only changes which Clerk object is used.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Updated `SignUpPage` to use `useSignUp()` and `signUp.authenticateWithRedirect(...)`.

Files touched:
- `src/domains/platform/auth/ui/pages/SignUpPage.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 125)
- Code refs:
  - `src/domains/platform/auth/ui/pages/SignUpPage.tsx` (useSignUp + signUp.authenticateWithRedirect)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The sign-up route now uses Clerk’s sign-up API instead of the sign-in API, reducing onboarding ambiguity and failure risk.
