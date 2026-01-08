# Issue 182 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`
Date closed: `2026-01-08`

Status: `DONE` (see `docs/06-quality/feedback/ui-issue-tracker/done-issues/issue-182.md`)

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
  - `src/ui/providers/DrawerProvider.tsx`
  - `src/domains/client/shop/cart/providers/CartContext.tsx`
- What determines `Preparing...` vs a working CTA (pre-fix):
  - Drawer CTA was driven only by `checkoutUrl` (undefined → “Preparing…”), and did not surface `checkoutStart.mode === 'none'` as a terminal “unavailable” state.
  - Result: if checkout URL computation fails, UI can appear “stuck” indefinitely.

### Checkout URL/session creation

- Files:
  - `src/domains/platform/commerce/adapters/shopify/internal-api/checkout.ts`
  - `functions/api/storefront/cart/fetch.ts`
- How checkout URL is computed:
  - Checkout port fetches the Shopify Cart and uses `cart.checkoutUrl`.
  - It prefers a first-party handoff URL (same origin) when possible.
- When it is refreshed:
  - `CartContext` recomputes after cart changes / rehydrate.
  - Fix added: explicit `refreshCheckout()` to re-attempt without requiring cart mutations.

## 4) Root cause hypothesis

- Root cause (confirmed):
  - Drawer CTA lacked a terminal error state for checkout URL computation failures and had no retry mechanism, so it could remain on “Preparing checkout…” indefinitely.
- Possible upstream triggers:
  - `/api/storefront/cart/fetch` failing (env/config or Shopify upstream) → `beginCheckout()` throws → `checkoutUrl` remains undefined.

## 5) Three solution options

### Option 1 — Fix checkout URL refresh + state transitions

- What: Add loading/error states + retry to the cart provider and use them in the drawer CTA.
- Outcome: **implemented** (see `done-issues/issue-182.md`).

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

- Suggested option: Option 1
- Why: fixes the user-facing “stuck” state while keeping checkout logic centralized and allowing recovery from transient backend failures.
