# Admin — Products (Feedback)

## Routes
- `/admin/products`
- `/admin/products/:handle`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`
- `src/domains/admin/catalog/` (catalog domain)

## Purpose
Manage the product catalog (list/detail, editing, component composition, preview).

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [ ] (#75) Product cards show “Updated” with no timestamp; render `updated_at` (or remove label). — Black-box: `UNTRIAGED` ([issue-075](../ui-issue-tracker/ui-issues/issue-075.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
