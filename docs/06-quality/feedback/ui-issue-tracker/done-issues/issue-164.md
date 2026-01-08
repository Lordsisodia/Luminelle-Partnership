# Issue 164: Client cart recovery feature flags are parsed incorrectly (`Boolean(...)` makes `'0'`/`'false'` truthy)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `164`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
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

Client-side cart recovery feature flags were parsed using `Boolean(...)`, which treats `'0'`/`'false'` as truthy and can unintentionally enable features.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/domains/client/shop/cart/recovery/env.ts` exported:
  - `Boolean(import.meta?.env?.VITE_CART_RECOVERY_ENABLED)`
  - `Boolean(import.meta?.env?.VITE_CART_SHARE_ENABLED)`
  which is incorrect for string env vars.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Mis-parsed flags can enable recovery/share features unexpectedly in production or staging.
- Correct parsing is a small change with high leverage.

## Step 4 — Options
- [x] Option A: Implement a strict env flag parser (`'1'|'true'|'yes'|'on'`).
- [x] Option B: Treat any non-empty string as enabled (current behavior; incorrect).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** to match common env conventions and default to “off” for unknown values.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Replace `Boolean(...)` parsing with a helper that normalizes strings and supports `0/1`, `true/false`, `yes/no`, `on/off`.

Acceptance criteria:
- `VITE_CART_RECOVERY_ENABLED=false` and `VITE_CART_RECOVERY_ENABLED=0` both evaluate to `false`.
- `VITE_CART_RECOVERY_ENABLED=true` and `VITE_CART_RECOVERY_ENABLED=1` evaluate to `true`.

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

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 164)
- Code refs:
  - `src/domains/client/shop/cart/recovery/env.ts` (strict client flag parsing)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Client cart recovery flags now parse correctly and default to off for ambiguous values.
