# Client — Account orders (Feedback)

## Routes
- `/account/orders`
- `/account/orders/:orderId`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/client/account/ui/pages/OrdersPage.tsx`
- `src/domains/client/account/ui/pages/OrderDetailPage.tsx`

## Purpose
Customer order history + order detail view.

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [x] (#3) Orders list/detail pages are stubbed (“temporarily unavailable”); replace with branded pages or link out to Shopify order status. — Black-box: `DONE` ([issue-003](../ui-issue-tracker/ui-issues/issue-003.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
