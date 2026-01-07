# Issue 182 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`

## 1) Repro summary

- Environment:
- Route:
- Browser/device:
- Expected:
- Actual:

## 1.1) New evidence (Jan 7, 2026)

- Screenshot(s): `codex-clipboard-K7AGzc.png`, `codex-clipboard-WYi8EU.png`
- Likely correlated platform errors:
  - `/api/storefront/cart/create` returning 500 / Cloudflare Worker exception (see Issue 184)
  - If cart/checkout URL cannot be computed, drawer CTA can remain stuck on “Preparing checkout…”

## 2) Evidence collected

- Screenshots:
- Console errors:
- Network traces:
  - cart fetch responses (do they include a valid `checkoutUrl`?)
  - any failing `/api/storefront/*` calls

## 3) Code structure map

### Drawer checkout CTA state machine

- Files:
- What determines `Preparing...` vs a working CTA:

### Checkout URL/session creation

- Files:
- How checkout URL is computed:
- When it is refreshed:

## 4) Root cause hypothesis

- Hypothesis A:
- Hypothesis B:
- Hypothesis C:

## 5) Three solution options

### Option 1 — Fix checkout URL refresh + state transitions

- What:
- Pros:
- Cons:
- Implementation notes:

### Option 2 — Derive checkout URL directly from Shopify cart `checkoutUrl`

- What:
- Pros:
- Cons:
- Implementation notes:

### Option 3 — Add explicit error state + retry mechanism

- What:
- Pros:
- Cons:
- Implementation notes:

## 6) Recommendation

- Suggested option:
- Why:
