# Issue 079: Spin-wheel “Sign in to claim” loses the user’s place (no redirect back to the wheel)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `79`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client` (Spin wheel)
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `17`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: Clicking “Sign in to claim” on the spin wheel should return the user to the same page (so the wheel can finish claiming), but it sent them to `/account` instead.

Audit claim (Issue 79): The spin wheel sign-in CTA loses the user’s place because it doesn’t include a redirect back to the wheel route.

Likely source:
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- Auth flow: `src/domains/platform/auth/ui/pages/SignInPage.tsx` (supports `?redirect=...`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before):
- `SpinWheelLocal` used `window.location.assign('/sign-in')` without a `redirect` param.
- `SignInPage` defaults `redirectTo` to `/account` when no redirect param is present.
- The wheel only auto-claims pending preview spins when it mounts while signed in, so sending users away breaks the flow.

Repro (before):
1) Visit `/` (shop landing) or a surface that renders the wheel.
2) Spin while signed out (preview mode), then click “Sign in to claim”.
3) You land on `/account` after sign-in, not back on the wheel page.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `FIX`

Dependencies:
- Relies on the existing sign-in `redirect` query param behavior in `SignInPage`.

## Step 4 — Options
- [x] Option A: Redirect to `/sign-in?redirect=<current-path>` so sign-in returns to the wheel page.
- [ ] Option B: Hardcode redirect to `/` (shop landing) always.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option A** — preserves user context and works for any page that renders the wheel.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Build a redirect URL from `window.location.pathname + search + hash`.
- Navigate to `/sign-in?redirect=<encoded>` instead of `/sign-in`.

Acceptance criteria:
- Clicking “Sign in to claim” sends users to sign in and then returns them to the wheel page.
- No change to signed-in flow.

Risks/rollback:
- Minimal; this only changes the sign-in URL construction for one CTA.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implementation:
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
  - updated the sign-in CTA to include `?redirect=<current-page>`

Validation:
- Best-effort: `npm run typecheck`
- Manual QA:
  1) Spin while signed out, click “Sign in to claim”, complete sign-in → returns to the same page.
  2) Confirm the wheel can then auto-claim pending preview spins (when applicable).

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- The spin wheel sign-in flow now preserves user context by redirecting back to the current page after authentication.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- `src/domains/platform/auth/ui/pages/SignInPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: This fixes the “lost place” problem without requiring Playwright; it leverages the existing `redirect` param behavior.
