# Issue 181: Multi-buy discount codes don’t apply at checkout (tiered discounts requested)

Source: Client feedback `docs/06-quality/feedback/2026-01-07-client-feedback.md`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `VALIDATING`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `(4×4×2)−3 = 29`
- Owner: `AI`
- Created: `2026-01-07`

---

## Worklog

- 2026-01-08 20:40:31 +0700 — Set tracker row 181 → `IN_PROGRESS`. Starting repro + investigation.
- 2026-01-08 20:50:34 +0700 — Implemented checkout URL discount passthrough + ran build/typecheck. Moving to `VALIDATING` (needs live checkout verification).

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

## AI loop notes (Steps 1–6)

### Step 1 — Intake

- Restatement: when the cart qualifies for a multi-buy tier (2/3/4+), checkout should open with the matching discount already applied.
- Source: client feedback `docs/06-quality/feedback/2026-01-07-client-feedback.md`.
- Likely hotspots (confirmed):
  - Tier computation: `src/domains/client/shop/cart/logic/volumeDiscounts.ts`
  - Cart state + backend syncing: `src/domains/client/shop/cart/providers/CartContext.tsx`
  - Shopify cart discount mutation: `functions/api/storefront/cart/discount-codes-update.ts`
  - Checkout URL handoff: `src/domains/platform/commerce/adapters/shopify/internal-api/checkout.ts`
  - Cart checkout URL source: `functions/api/storefront/cart/fetch.ts` (via `cart.checkoutUrl`)

### Step 2 — Verify

- Evidence in code:
  - Tier logic exists for 2/3/4 quantities and maps to specific discount codes (`volumeDiscounts.ts`).
  - The cart provider *does* attempt to sync the discount to Shopify (`commerce.cart.applyDiscount(...)` → `cartDiscountCodesUpdate`), but the checkout URL previously did **not** carry the discount code explicitly.
  - Checkout is opened via a handoff URL (`/cart/c/*` or `/checkouts/*`) which is frequently copied/transformed across domains (`CheckoutHandoffPage`), making cart-state-only discount application less reliable in practice (race/config/session edge cases).
- Repro (manual / live-env required):
  - Add 2–4 shower caps to cart, then open checkout (including via the handoff page’s “Open on checkout provider” link).
  - Observe whether the discount is present in Shopify checkout summary.
- Verified: **LIKELY** (client report + code evidence). Full repro requires a live Shopify environment + correct discount code configuration.

### Step 3 — Assess

- Decision: **FIX**
- Rationale: pricing trust / conversion-impacting, and the code change is localized to checkout URL construction.

### Step 4 — Options

- Option A: Keep relying solely on `cartDiscountCodesUpdate` (current behavior).
  - Pros: “clean” URLs.
  - Cons: discount application can be flaky across checkout handoff/domain boundaries; harder to debug.
- Option B (selected): Always append `?discount=<CODE>` to the checkout URL when `discountCode` exists.
  - Pros: deterministic in checkout; works even if cart-state sync is delayed.
  - Cons: discount code becomes visible in the URL.
- Option C: Move tier evaluation + discount application server-side (cart fetch/begin-checkout returns a checkout URL already decorated).
  - Pros: hides code mapping from client; can validate configuration centrally.
  - Cons: more moving parts / larger change set.

### Step 5 — Plan

- Implement URL decoration at the cart boundary:
  - When `CartContext` exposes `checkoutUrl`, ensure it includes the current `discountCode` as a `discount` query param.
  - Keep existing `cartDiscountCodesUpdate` syncing as “best effort” so Shopify cart state remains consistent too.
- Acceptance (testable):
  - With qty 2/3/4+, checkout opens with the corresponding discount already applied.
  - No “5th tier” behavior (still 15% at 4+).

### Step 6 — Execute + Validate

- Code changes:
  - `src/domains/client/shop/cart/providers/CartContext.tsx` — `checkoutUrl` now includes `discount=<code>` when a code exists.
- Validation:
  - `npm run typecheck`: OK
  - `npm run build`: OK
  - `npm run lint`: currently fails repo-wide due to pre-existing lint errors, but `npx eslint src/domains/client/shop/cart/providers/CartContext.tsx` passes.

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
