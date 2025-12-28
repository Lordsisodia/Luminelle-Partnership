# Issue 124: Sign-in / sign-up pages promise capabilities that don’t exist (orders/addresses/commissions)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `124`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
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

The sign-in and sign-up pages marketed account capabilities (orders, addresses, shipping progress, commissions) that aren’t actually available today, creating a “sign in → nothing works” trust problem.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- `src/domains/platform/auth/ui/pages/SignInPage.tsx`
  - Included claims like “manage orders”, “check shipping progress”, “save delivery addresses”.
- `src/domains/platform/auth/ui/pages/SignUpPage.tsx`
  - Included claims like “track commissions alongside product orders”.

Repro:
1. Visit `/sign-in` or `/sign-up`.
2. Read the benefits list (implies orders/addresses/commissions functionality).
3. After signing in, those features are not available end-to-end (account subpages are still being built).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Auth is a high-friction action; overpromising features at this moment is a trust killer.
- Copy changes are low-risk and don’t require product decisions.

## Step 4 — Options
- [x] Option A: Remove the benefit list entirely (minimal but less compelling).
- [x] Option B: Keep benefits, but reword to match what’s available and clearly label “coming soon” where applicable (preferred).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. Keeps the page helpful while removing misleading claims.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Update sign-in and sign-up benefit copy to remove claims about unsupported capabilities.
- If mentioning future features, label them explicitly as “coming soon”.
- Run `npm run typecheck`.

Acceptance criteria:
- No claims about commissions tracking or “real-time shipping progress” on auth pages.
- Copy matches current state of the account hub.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/platform/auth/ui/pages/SignInPage.tsx`:
  - Removed “manage orders / real-time shipping / saved addresses” promises.
  - Replaced with accurate “account hub” copy and labeled “orders & saved addresses” as coming soon.
- `src/domains/platform/auth/ui/pages/SignUpPage.tsx`:
  - Removed “track commissions alongside product orders” promise.
  - Updated copy to align with current account hub state and labeled future features as coming soon.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/platform/auth/ui/pages/SignInPage.tsx`
- `src/domains/platform/auth/ui/pages/SignUpPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Auth pages now set accurate expectations (no “phantom features” promises), reducing post-sign-in confusion and trust drop-off.
