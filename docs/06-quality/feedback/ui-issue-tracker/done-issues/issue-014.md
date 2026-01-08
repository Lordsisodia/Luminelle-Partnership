# Issue 014: Drawer shows quantity “Save X%” labels that don’t actually apply

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `14`
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
  - The drawer quantity picker shows “Save X%” tier labels even though no tier-pricing/discount logic is applied.
- [x] Link to the audit issue and copy the key claim.
  - Audit issue `14` (`docs/06-quality/reviews/app-ui-review-2025-12-26.md`): drawer quantity dropdown claims savings percentages that aren’t reflected in cart totals.
- [x] Identify likely files/components.
  - `src/ui/providers/DrawerProvider.tsx` (quantity dropdown)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
  - `src/ui/providers/DrawerProvider.tsx` rendered “Save {discountForQty(n)}%” labels in the qty dropdown, but cart totals were still computed as `unitPrice × qty` with no discount application.
- [x] Write repro steps (route + actions).
  1. Add an item to cart.
  2. Open the drawer cart tab.
  3. Open the “Qty” dropdown and observe “Save X%” labels for higher quantities.
- [x] Mark `Verified: YES/NO` and set status accordingly.
  - Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
  - Impact `2`, Reach `5`, Effort `3`, Confidence `2` → Priority = `(2×5×2)−3 = 17`
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
  - Decision: `FIX`
- [x] Note dependencies (data, product decision, auth, etc.).
  - Real tier pricing would require pricing rules (Shopify discounts, line-item pricing, or custom promotions). Until that exists, the UI must not claim % savings.

## Step 4 — Options
- [x] Option A: Remove the “Save X%” labels from the qty dropdown.
  - Pros: Eliminates mismatch between claim and price immediately.
  - Cons: Loses merchandising hook.
- [x] Option B: Implement real tier-pricing/discount logic to match the labels.
  - Pros: Keeps the conversion affordance.
  - Cons: Larger scope; needs pricing source-of-truth and validation.
- [x] Pick one + rationale (fit with domain architecture).
  - Selected: **Option A** — fix trust mismatch now; tier pricing can be added later when backed by real pricing rules.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
  - Remove the `discountForQty` helper and the “Save X%” UI from the qty dropdown.
- [x] Write acceptance criteria (testable).
  - Qty dropdown shows only quantities (no “Save %” claim).
  - Typecheck passes.
- [x] Risks/rollback notes.
  - Low risk (UI-only).

## Step 6 — Execute + Validate
- [x] Implement changes.
  - Updated `src/ui/providers/DrawerProvider.tsx` to remove the “Save X%” labels from the qty dropdown.
- [x] Validate (tests or best-effort manual checks).
  - Ran `npm run typecheck` (passed).
  - Manual QA checklist:
    - Open drawer qty dropdown: only quantity values appear.
- [x] Record results and any regressions found.
  - No regressions observed.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
  - Marked issue `14` as `DONE`.
- [x] Summarize what changed + where.
  - Removed misleading “Save X%” labels from the drawer qty dropdown.
- [x] Mark DONE/DEFERRED/etc.
  - Final status: `DONE`

---

## Evidence / Links

- Code refs:
  - `src/ui/providers/DrawerProvider.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes:
  - Tier pricing can be reintroduced later once there is a real discount/pricing rule source of truth.
