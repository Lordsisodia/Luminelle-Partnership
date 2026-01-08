# Issue 114: Drawer sign-in copy promises “manage subscriptions” (but there is no subscription management UI)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `114`
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

The drawer sign-in prompt claimed users could “manage subscriptions”, but the app doesn’t provide any subscription management UI, which is misleading and harms trust.

Audit (issue 114): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Drawer sign-in copy promises ‘manage subscriptions’”.

Likely file:
- `src/ui/providers/DrawerProvider.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- Drawer sign-in subcopy included “manage subscriptions.”

Repro (before fix):
1. Sign out (or use a fresh session).
2. Open the drawer.
3. Observe the sign-in prompt copy mentions “manage subscriptions”.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a trust issue (promising features that don’t exist).
- No product decision needed; just remove/adjust the copy.

## Step 4 — Options
- [x] Option A: Remove the subscription claim and replace with truthful benefit copy.
- [ ] Option B: Build subscription management UI (out of scope here).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: keep the drawer honest and avoid over-promising.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Update sign-in prompt copy to remove “manage subscriptions”.

Acceptance criteria:
- Drawer sign-in prompt no longer references subscriptions.
- Typecheck passes.

Risks:
- None; copy-only change.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Updated drawer sign-in prompt copy to remove “manage subscriptions”.

File touched:
- `src/ui/providers/DrawerProvider.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 114)
- Code refs:
  - `src/ui/providers/DrawerProvider.tsx` (sign-in copy updated)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Drawer sign-in copy no longer promises a non-existent subscription management feature.
