# Issue 006: Visually “disabled” checkout CTA is still a clickable link

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `6`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

When the cart is empty, the checkout CTA should not be a clickable link (otherwise users can click through to checkout despite the disabled appearance).

Audit (issue 6): `docs/reviews/app-ui-review-2025-12-26.md` — “Visually “disabled” checkout CTA is still a clickable link”.

Likely file:
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO (already fixed in current code)**

Evidence:
- `CartPage` does **not** render a `<RouterLink to="/checkout">` when `items.length === 0`.
- The empty-cart checkout CTA is a disabled `<button type="button" disabled ...>`, so it cannot be clicked.

Repro (current):
1. Visit `/cart`.
2. Ensure the cart is empty.
3. Observe the CTA is disabled and cannot navigate.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX (already applied)**

Notes:
- No further work needed beyond recording/closing the issue.

## Step 4 — Options
- [x] Option A: Use a disabled `<button>` for disabled state (preferred).
- [ ] Option B: Conditionally render no CTA when empty.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** (already in place) because it’s semantically correct and prevents accidental navigation.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Acceptance criteria:
- When `items.length === 0`, checkout CTA is not clickable and does not navigate to `/checkout`.

Risks:
- None; verified in current code.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- No additional changes required; issue is already addressed.

Validation:
- Best-effort code verification in `CartPage`.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 6)
- Code refs:
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (empty cart CTA is a disabled `<button>`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Empty-cart checkout CTA is not a clickable link in the current cart UI; users can’t navigate to checkout when the cart is empty.
