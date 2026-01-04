# Contract Gaps Report (v1.1 heuristics)

This report compares contract expectations (tier/tenant/cache) to a string-cue scan of `functions/api/**`.
These are heuristics: some behaviors may live in shared helpers (`functions/_lib/**`).

Evidence inputs:
- `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-cues.matrix.txt`
- `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-auth-tenant-cues.rg.txt`
- `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-cache-cues.rg.txt`

---
## A) Endpoints that look like they lack auth enforcement (by cue scan)

- (none)

## B) Endpoints that look like they lack explicit cache headers (but are expected edge-cacheable)

- (none)

## C) Endpoints with no tenant/host cues in-file (tenant required by contract)

- `admin/**` — 8 files
- `customer/**` — 2 files
- `customer-auth/**` — 3 files
- `experiment/**` — 1 files
- `exports/**` — 2 files
- `metrics/**` — 8 files
- `orders/**` — 3 files
- `payments/**` — 1 files
- `shopify/**` — 12 files
- `storefront/**` — 8 files
- `webhooks/**` — 1 files

Interpretation:
- If tenant resolution is centralized (recommended), it may not appear in each endpoint file; it should appear in a shared helper and be called by every endpoint.
