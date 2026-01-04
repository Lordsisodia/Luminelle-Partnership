# Client — Returns (Feedback)

## Routes
- `/returns`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/client/shop/checkout/ui/pages/ReturnsPage.tsx`

## Purpose
Returns information and/or self-serve returns flow.

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [x] (#2) Returns route is a stub (“temporarily unavailable”); ship a minimal, branded returns page (even if it links out to Shopify/helpdesk). — Black-box: `DONE` ([issue-002](../ui-issue-tracker/ui-issues/issue-002.md))
- [x] (#27) Other pages link to `/returns`; avoid linking to stub routes until this is real. — Black-box: `DONE` ([issue-027](../ui-issue-tracker/ui-issues/issue-027.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
