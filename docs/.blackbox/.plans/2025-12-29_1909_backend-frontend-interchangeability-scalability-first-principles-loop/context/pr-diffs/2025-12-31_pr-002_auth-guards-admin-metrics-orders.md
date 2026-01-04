# PR 2 Evidence Diff — Auth Guards for admin/metrics/orders

## Stop point

- Stop point: `PR 2 — Wire auth guards into admin/exports/metrics/orders`
- Plan doc: `pr-2-auth-guards-detailed-plan.md`

---

## Goal (1 line)

- Make auth enforcement explicit (not accidental) for sensitive endpoint families, and keep admin UI able to call them using the existing “admin pass” pattern.

---

## Gates run

- Command:
  - `./.blackbox/scripts/run-1909-loop.sh`
- Evidence logs:
  - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_164850.log.txt`
  - `artifacts/snapshots/refresh-1909-contract-evidence.2025-12-31_164851.log.txt`
  - `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_164852.log.txt`

---

## What changed (facts)

- Added `requireInternalAuth()` enforcement to admin orders endpoints:
  - `functions/api/admin/orders/get.ts`
  - `functions/api/admin/orders/list.ts`
- Added `requireInternalAuth()` enforcement to metrics endpoints:
  - `functions/api/metrics/daily.ts`
  - `functions/api/metrics/refund-rate.ts`
  - `functions/api/metrics/refunds-by-sku.ts`
  - `functions/api/metrics/repeat.ts`
  - `functions/api/metrics/source-revenue.ts`
  - `functions/api/metrics/summary.ts`
  - `functions/api/metrics/top-skus.ts`
  - `functions/api/metrics/utm-sources.ts`
- Added `requireInternalAuth()` enforcement to order lookup endpoints (PII surface):
  - `functions/api/orders/by-email.ts`
  - `functions/api/orders/by-name.ts`
  - `functions/api/orders/get.ts`
- Centralized the admin pass → `Authorization: Bearer ...` header into a shared helper:
  - `src/domains/admin/shared/data/adminInternalAuth.ts`
- Updated admin Orders UI to supply the header (and added an input to set the pass):
  - `src/domains/admin/orders/data/adminOrdersApi.ts`
  - `src/domains/admin/orders/ui/pages/OrdersPage.tsx`
- Updated the existing admin Content page to use the shared helper (no behavior change intended):
  - `src/domains/admin/pages/ui/pages/ContentPage.tsx`

---

## Evidence snapshot deltas (what changed and why)

Auth gaps (primary):
- `contract-gaps-report-v1.1.md`
  - observed: section A now has 0 endpoints (auth cues present).
- `artifacts/snapshots/stop-point-metrics.latest.txt`
  - observed: `contract_gaps_missing_auth=0` (was `13`).

Auth cue scan (secondary, heuristic):
- `artifacts/snapshots/functions-api-auth-tenant-cues.rg.txt`
  - observed: contains `requireInternalAuth(` hits under `functions/api/admin/**`, `functions/api/metrics/**`, `functions/api/orders/**`.

No-regression targets:
- `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
  - expected/observed: remains empty.
- `artifacts/snapshots/check-vendor-leaks.txt`
  - expected/observed: unchanged (vendor leaks are handled in PR7).

---

## Notes / risks

- This is an interim “internal tier” guard (bearer secret) to make the surface consistently protected without implementing full RBAC yet.
- Follow-up (future): replace internal bearer secret with a real admin-tier auth model + RBAC once the tenancy/auth roadmap is implemented.

