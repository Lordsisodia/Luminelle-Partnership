# Client — Order tracking (Feedback)

## Routes
- `/order/track`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`

## Purpose
Order tracking entry + status view.

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [x] (#2) Order tracking is a stub (“temporarily unavailable”); ship a branded tracking entry + status page (or redirect to a real tracking provider). — Black-box: `DONE` ([issue-002](../ui-issue-tracker/ui-issues/issue-002.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
