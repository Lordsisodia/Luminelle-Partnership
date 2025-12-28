# Issue 029: “Sign out” UI exists but sign-out behavior is a no-op

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `29`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Platform` (Auth)
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `15` (audit was outdated)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The audit claims the UI has “Sign out” buttons, but calling `signOut()` does nothing, leaving users unable to reliably sign out.

Audit claim (Issue 29): `signOut` exists but is implemented as a no-op (`async () => {}`).

Likely source:
- `src/domains/platform/auth/providers/AuthContext.impl.tsx`
- Call sites: account page + admin shell sign out buttons

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- `src/domains/platform/auth/providers/AuthContext.impl.tsx` implements `signOut` by calling Clerk’s `signOut` (`clerkSignOut`), not a no-op.
- Sign out buttons in `src/domains/client/account/ui/pages/AccountPage.tsx` and `src/domains/admin/shared/ui/layouts/AdminShell.tsx` call this method.

Repro:
1) Sign in
2) Use “Sign out” from `/account` or admin shell
3) Clerk session is cleared and the UI redirects/navigates away (e.g. account page navigates home).

Verified: **NO** (audit claim is outdated).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `NOT_AN_ISSUE`

## Step 4 — Options
- [ ] Option A: (describe)
- [ ] Option B: (describe)
- [ ] (Optional) Option C: (describe)
- [ ] Pick one + rationale (fit with domain architecture).

## Step 5 — Plan
- [ ] Write implementation plan (bullets).
- [ ] Write acceptance criteria (testable).
- [ ] Risks/rollback notes.

## Step 6 — Execute + Validate
- [ ] Implement changes.
- [ ] Validate (tests or best-effort manual checks).
- [ ] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Recorded outcome:
- Marked `NOT_AN_ISSUE` because `signOut` is wired to Clerk in the current auth context.

---

## Evidence / Links

- Code refs:
- `src/domains/platform/auth/providers/AuthContext.impl.tsx`
- `src/domains/client/account/ui/pages/AccountPage.tsx`
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: The audit claim was based on an older AuthContext implementation where sign-out may have been stubbed; current code calls Clerk sign-out.
