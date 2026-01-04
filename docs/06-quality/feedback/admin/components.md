# Admin — Components (Feedback)

## Routes
- `/admin/components`
- `/admin/components/:key`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/admin/catalog/ui/pages/ComponentsPage.tsx`
- `src/domains/admin/catalog/ui/pages/ComponentDetailPage.tsx`

## Purpose
Edit and preview reusable UI/content components used across pages + PDPs.

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [ ] (#49) Components editor is localStorage-only (not publishable); define real persistence/publish flow. — Black-box: `UNTRIAGED` ([issue-049](../ui-issue-tracker/ui-issues/issue-049.md))
- [x] (#58) Component detail route is a hard-coded placeholder; implement read-only detail or hide until ready. — Black-box: `DONE` ([issue-058](../ui-issue-tracker/ui-issues/issue-058.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
