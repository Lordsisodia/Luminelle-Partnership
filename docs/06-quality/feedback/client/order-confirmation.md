# Client — Order confirmation (Feedback)

## Routes
- `/order/:orderId/confirm`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/client/shop/checkout/ui/pages/OrderConfirmationPage.tsx`

## Purpose
Post-purchase confirmation page (summary, next steps, tracking links).

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [x] (#2) Order confirmation is a stub (“temporarily unavailable”); replace with a branded confirmation page or redirect/embed Shopify confirmation safely. — Black-box: `DONE` ([issue-002](../ui-issue-tracker/ui-issues/issue-002.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
