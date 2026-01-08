# Issue 061: Auth can silently break if Clerk is not configured (placeholder key)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `61`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `16` (=(2×3×3)−2)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

When Clerk isn’t configured, the app still tries to boot with a placeholder publishable key, producing confusing auth failures instead of a clear, actionable error screen.

Audit claim (Issue 61): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` calls out `src/main.tsx` defaulting `VITE_CLERK_PUBLISHABLE_KEY` to `pk_test_placeholder`, causing auth to “silently break”.

Likely files:
- `src/main.tsx` (ClerkProvider initialization)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence:
- `src/main.tsx` previously set `const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? 'pk_test_placeholder'`.
- This causes the app to boot with an invalid/misleading Clerk key, so auth and Clerk-backed routes can fail in non-obvious ways.

Repro (dev):
1) Unset `VITE_CLERK_PUBLISHABLE_KEY` (or leave it as `pk_test_placeholder`)
2) Start the app and navigate to `/sign-in` or `/account`
3) Observe broken/unstable auth behavior without a clear “missing config” UI.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Impact: 2 (auth/admin/account surfaces become confusingly broken)
- Reach: 3 (affects anyone running the app in a misconfigured env)
- Effort: 2 (small boot-time guard + UI)
- Confidence: 3 (deterministic)
- Decision: **FIX**
- Dependencies: none (pure client-side guard)

## Step 4 — Options
- [x] Option A: Keep placeholder key; accept confusing runtime failures.
- [x] Option B: Fail fast at boot with a clear “auth not configured” screen (and don’t mount ClerkProvider).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option B**: this prevents downstream crashes and makes the failure mode obvious + actionable.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace placeholder key fallback with an explicit configuration check.
- If misconfigured, render a minimal, branded error screen with dev instructions (in DEV) and support email (in PROD).
- Run `npm run typecheck`.

Acceptance criteria:
- With missing/placeholder `VITE_CLERK_PUBLISHABLE_KEY`, the app renders a clear configuration screen (no broken Clerk UI).
- With a real key, the app boots normally and continues to mount `ClerkProvider`.

Risks / rollback:
- Low risk; rollback is reverting `src/main.tsx` to always mount ClerkProvider.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/main.tsx`: added `isClerkConfigured` guard and replaced placeholder behavior with an explicit “Sign-in is temporarily unavailable” screen when misconfigured.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
  - `src/main.tsx` (Clerk config guard + fallback UI)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Misconfigured auth no longer “silently breaks”; the app now fails fast with a clear, actionable configuration screen.
