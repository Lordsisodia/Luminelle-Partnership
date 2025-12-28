# Client — Cart (Feedback)

## Routes
- `/cart`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`

## Purpose
Cart experience (line items, upsells, discounts, proceed-to-checkout).

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [x] (#5) Cart line items show hard-coded image and compare-at pricing; render real line item media and only show compare-at when it exists. — Black-box: `DONE` ([issue-005](../black-box/ui-issues/issue-005.md))
- [x] (#6) “Disabled” checkout CTA is still a clickable link when cart is empty; render a real disabled button/state instead. — Black-box: `DONE` ([issue-006](../black-box/ui-issues/issue-006.md))
- [ ] (#18) Discounts/promo UI is visible but underlying logic is stubbed (apply does nothing, checkout URL undefined). — Black-box: `UNTRIAGED` ([issue-018](../black-box/ui-issues/issue-018.md))
- [x] (#74) Cart links to broken support/account routes and claims “secure checkout” while checkout is unavailable; fix links/copy or implement the destinations. — Black-box: `DONE` ([issue-074](../black-box/ui-issues/issue-074.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
