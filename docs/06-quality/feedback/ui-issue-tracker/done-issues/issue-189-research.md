# Issue 189 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`
Date closed: `2026-01-08`

## 1) Current state

- Page: `src/domains/client/account/ui/pages/PaymentMethodsPage.tsx` (route: `/account/payments`)
- Why it exists: as a “Payments” info/help destination under Account (not a full payment-methods manager)
- What dev artifacts were present:
  - local-only “payments” scaffolding (`lumelle_payments` in localStorage) that doesn’t reflect Shopify checkout reality
  - confusion risk: implies “saved cards” are managed in this app

## 2) Three solution options

### Option 1 — Remove payment methods entirely

- Remove the route and any “Payments” nav/tile.
- Downside: no place to explain how payments work or where to go for help.

### Option 2 — Replace with support/help page + CTA to Shopify checkout

- Keep a lightweight “Payments” page that clearly states payments are handled at Shopify checkout and provides support CTAs.
- This matches the current product reality and reduces confusion.

### Option 3 — Link out to Shopify customer account (if configured)

- If Shopify customer accounts are enabled/configured, deep-link to the Shopify account portal for payment-method management.
- Requires confirmation of Shopify setup and desired customer experience.

## 3) Recommendation

- Suggested option: Option 2
- Why:
  - Reduces confusion (no fake “saved payment methods” UI)
  - Still gives customers a destination for help + next actions
  - Avoids prematurely committing to a deeper account system decision
