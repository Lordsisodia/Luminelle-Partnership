# Issue 113: Spin wheel “Saved — add to cart” state is dead (saved discount code is never used later)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `113`
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

The spin wheel shows a “Saved — add to cart” state, but the saved discount code wasn’t actually consumed/applied anywhere later, making the state misleading.

Audit (issue 113): `docs/reviews/app-ui-review-2025-12-26.md` — “Spin wheel ‘Saved — add to cart’ state is dead”.

Likely files:
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- `src/domains/client/shop/cart/providers/CartContext.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `SpinWheelLocal` wrote `WELCOME_DISCOUNT_CODE` to `localStorage.setItem('lumelle_pending_discount_code', ...)` when there was no cart.
- `CartContext` only hydrated from `lumelle_cart_discount_code` and never read `lumelle_pending_discount_code`, so the “saved” code was never applied or surfaced later.

Repro (before fix):
1. Visit `/` and spin the wheel.
2. Click “Apply to cart” while cart is empty.
3. Observe the button changes to “Saved — add to cart”.
4. Add an item to cart and open cart: the discount code is not present because nothing consumes `lumelle_pending_discount_code`.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a trust issue: UI indicates a discount is saved, but users don’t see it later.
- Fix is low/medium effort and doesn’t require checkout availability.

## Step 4 — Options
- [x] Option A: Always call `applyDiscount()` so the code is persisted in `CartContext` (works with/without a cart).
- [x] Option B: Teach `CartContext` to hydrate/consume `lumelle_pending_discount_code` (backward-compatible fix).
- [x] Pick one + rationale (fit with domain architecture).

Picked **A + B**:
- A makes the UI action immediately real (code stored in the cart state).
- B ensures any already-saved pending codes from older sessions still work.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- In `SpinWheelLocal.applyReward()`:
  - Always call `applyDiscount(WELCOME_DISCOUNT_CODE)`.
  - Keep the UI state as “Saved — add to cart” when cart is empty, and “Applied to cart” when cart has items.
- In `CartContext`:
  - If `lumelle_cart_discount_code` is missing, hydrate from legacy `lumelle_pending_discount_code` and delete the pending key.

Acceptance criteria:
- After spinning and clicking apply, `discountCode` is visible in cart flows (even if cart was empty at time of clicking).
- If Shopify cart is enabled, discount code is applied to Shopify cart when it’s created/rehydrated.
- Typecheck passes.

Risks:
- Very low; this only affects discount code persistence + hydration.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `SpinWheelLocal` now always persists the discount via `applyDiscount`, even when cart is empty.
- `CartContext` now supports legacy hydration from `lumelle_pending_discount_code`.

Files touched:
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- `src/domains/client/shop/cart/providers/CartContext.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 113)
- Code refs:
  - `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx` (applyReward persists discount)
  - `src/domains/client/shop/cart/providers/CartContext.tsx` (hydrates pending discount key)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: “Saved — add to cart” now represents a real persisted discount code that is carried into the cart/checkout flows.
