# Issue 026: PDP delivery countdown / delivery date are “fake” (not tied to real shipping rules)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `26`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Client`
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

The audit claims the PDP shows a ticking “Order within …” countdown and a “Free delivery {date}” promise derived from the user’s local clock, which can be wrong and misleading.

Audit claim (from `docs/06-quality/reviews/app-ui-review-2025-12-26.md`, Issue 26):
- PDP shows “Order within X hrs Y mins…” and “Free delivery {weekday, day, month}”, computed from `now + 2 days` and a countdown to midnight.

Likely files:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (on `dev` as of `2025-12-28`).

Current code evidence:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
  - No `deliveryInfo` timer logic exists.
  - Shipping/dispatch messaging is now static copy like:
    - `• Free returns • Ships in 48h` (in `TrustMicro`)
    - `Dispatch target: 48h · Free 30-day returns` (below the price)

Quick repro:
1. Open any PDP (e.g. `/product/luxury-satin-sleep-cap`).
2. Look for “Order within …” and “Free delivery {date}” messaging.
3. Confirm it does **not** exist in the current UI.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **NOT_AN_ISSUE** (audit finding no longer matches current code).

Notes:
- The risky “fake countdown + fake delivery date” UI appears to have already been replaced by simpler, non-ticking copy (“Ships in 48h”).
- If we ever reintroduce delivery promises, they should be driven by real fulfillment rules (region/weekends/cutoffs).

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] (Optional) Option C: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Not applicable (issue is not present).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Not applicable (issue is not present).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

No code changes required.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: The fake “order within …” countdown and computed delivery date are not present on `dev` anymore; the PDP now uses simplified static dispatch/shipping copy.
