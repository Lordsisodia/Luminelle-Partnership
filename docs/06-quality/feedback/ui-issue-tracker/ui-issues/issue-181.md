# Issue 181: Multi-buy discount codes don’t apply at checkout (tiered discounts requested)

Source: Client feedback `docs/06-quality/feedback/2026-01-07-client-feedback.md`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `PLANNED`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `(4×4×2)−3 = 29`
- Owner: `AI`
- Created: `2026-01-07`

---

## ✅ Outputs (what “done” produces)

- Verified repro steps showing whether discounts do/don’t apply in checkout.
- A clear root-cause explanation (where the discount state is lost or not applied).
- A short decision doc that lists **three viable solutions** with tradeoffs and a recommended approach.
- Acceptance criteria (testable) for the implementation agent.

---

## Client requirement

- Tiered discounts should be:
  - Qty **2** → **5% off**
  - Qty **3** → **10% off**
  - Qty **4** → **15% off**
  - Remove the “5th” tier

## Problem statement

The cart UI may show/compute the tier choice, but the discount may not reliably carry through into the actual Shopify checkout (or appears missing once checkout opens).

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + codebase understanding (NO CODE CHANGES)

**Goal:** reproduce the issue, understand why the discount isn’t applied at checkout, and map the code structure.

#### Tasks

1. Reproduce the issue (prefer production/staging with real Shopify config)
   - Add **2–4** of the eligible product(s) to cart
   - Confirm the discount appears as expected in Shopify checkout
   - Record “expected vs actual” with screenshots and URLs

2. Trace discount application end-to-end
   - Identify where the tier is computed in UI state
   - Identify where the discount is applied to the Shopify cart (API calls)
   - Identify where checkout URL/session is computed
   - Confirm whether the cart returned by Shopify contains discount codes / discounted pricing

3. Confirm Shopify admin configuration dependencies
   - Are the discount codes created and active?
   - Are they applicable to the target products/collections?
   - Any “one per customer”, “minimum quantity”, or “stacking” restrictions that would prevent application?

4. Write up findings + propose options
   - Create/update the research doc: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-181-research.md`
   - Include **3 solutions** with tradeoffs and implementation notes (so the “implementation agent” can pick one)

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-181-research.md`

---

## Candidate code hotspots (starting points)

These are likely areas to inspect during research (update this list with confirmed evidence):

- Tier logic:
  - `src/domains/client/shop/cart/logic/volumeDiscounts.ts`
- Cart state + discount persistence/sync:
  - `src/domains/client/shop/cart/providers/CartContext.tsx`
- Shopify cart adapter + discount update endpoint:
  - `src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts`
  - `functions/api/storefront/cart/discount-codes-update.ts`
- Checkout start:
  - `src/domains/platform/commerce/adapters/shopify/internal-api/checkout.ts`

---

## Acceptance criteria (for the later implementation agent)

- When cart contains eligible quantities (2/3/4), checkout opens with the matching discount applied.
- Discount tier selection is deterministic and stable:
  - Qty 2 → 5%
  - Qty 3 → 10%
  - Qty 4+ → 15% (no 5th tier)
- If discount cannot be applied (missing code / restriction), UI shows a clear, non-deceptive message.
- No regression in checkout flow (checkout still loads reliably).
