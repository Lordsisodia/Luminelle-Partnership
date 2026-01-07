# Issue 181 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`

## 1) Repro summary

- Environment:
- Product(s):
- Qty tested (2/3/4):
- Expected:
- Actual:

## 2) Evidence collected

- Screenshots:
- Network traces:
  - Calls to `/api/storefront/cart/discount-codes-update`
  - Cart fetch responses (do they contain discountCodes / discounted totals?)
- Logs:

## 3) Code structure map

### Tier selection

- Files:
- How tiers are computed:

### Discount application to provider cart

- Files:
- When discount is applied:
- When it is not applied:

### Checkout creation/handoff

- Files:
- How checkout URL/session is computed:

## 4) Root cause hypothesis

- Hypothesis A:
- Hypothesis B:
- Hypothesis C:

## 5) Three solution options

### Option 1 — Ensure the Shopify cart always has the code before checkout

- What:
- Pros:
- Cons:
- Implementation notes:

### Option 2 — Use Shopify Automatic Discounts / avoid codes

- What:
- Pros:
- Cons:
- Implementation notes:

### Option 3 — Implement a Shopify Function / more robust discounting

- What:
- Pros:
- Cons:
- Implementation notes:

## 6) Recommendation

- Suggested option:
- Why:

