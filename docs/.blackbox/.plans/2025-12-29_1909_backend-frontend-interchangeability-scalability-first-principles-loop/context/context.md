# Rolling Context (read first)

Keep this compact and current. This file is the “always read” memory.

## Current goal

- Produce an implementation-ready plan to make Luminelle:
  - frontend-swappable (new UI speaks `/api/*` + DTOs, not Shopify/Stripe/Clerk details)
  - provider-swappable (Shopify today; Stripe/other services later)
  - multi-tenant ready (one Supabase project can serve many client domains)
- Keep the “canonical boundary” unambiguous:
  - `/api/*` lives in Cloudflare Pages Functions at `functions/api/**`
  - legacy `api/**` must be consolidated to avoid contract drift
  Evidence:  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/repo-top-level.ls.txt`  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`

## Current assumptions / constraints

- Docs-only loop right now: no behavior changes in `src/` or `functions/` yet (planning + evidence snapshots only).
- Evidence-first: any “current state” claim must cite a snapshot under `artifacts/snapshots/`.  
  Evidence index: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/_snapshot-index.ls.txt`
- Cloudflare Pages Functions is the intended backend boundary for future frontends.  
  Evidence (current route inventory): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
- Current provider posture (not permanent, but current reality):
  - Shopify: commerce provider (swap later behind ports/adapters)
  - Supabase: data store (multi-tenant later)

## Current best candidates / hypotheses

- The “ports → runtime → adapters” pattern is the correct seam for provider swaps, and already exists in `src/domains/platform/**`.  
  Evidence inventories:  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-adapters-files.txt`
- UI/client code should never import adapters directly (enforced by scan; currently 0 violations).  
  Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
- Vendor identifiers (e.g., Shopify GIDs) must not appear above adapters; remove via internal keys + mapping.  
  Evidence baseline (currently 5 disallowed lines): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`
- Tenant resolution should be host-first and backend-owned (cache-safe), then passed through `/api/*` and platform ports.  
  Spec: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenancy-context-rules.md`

## Open questions / decisions needed

1) P0.3 cleanup: decide the fate of the remaining `api_only` endpoints (delete/archive vs migrate).  
   Evidence (current list + usage triage):  
   - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.txt`  
   - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
2) Resolve the last script dependency on legacy `api/**`:
   - `scripts/test-webhook.mjs` still calls `/api/shopify/webhooks/products_create`.  
   Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
3) Next “contract” stop point after P0.3 cleanup:
   - PR3 tenant resolution wiring (make tenant resolution centralized and cache-safe across endpoint families).  
   Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-3-tenant-resolution-detailed-plan.md`
4) When to flip vendor leak scan from report-only → hard gate (now that disallowed lines are 0, the gating decision is mostly process).  
   Evidence baseline: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

## Recent progress (latest 3–5)

- Refreshed the full “swappability gate suite” and stop-point dashboard; current at-risk signals include:
  - backend surface drift `api_only=13`
  - vendor leak scan `disallowed_lines=0`
  Evidence:  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`
- Generated the `/api/*` contract v1.1 endpoint table (from `functions/api/**`) and a heuristic gaps report to guide PR sequencing.  
  Evidence:  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v1.1-endpoint-table.md`  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/contract-gaps-report-v1.1.md`
- Triaged api-only endpoints by repo usage and snapshotted key legacy implementations to de-risk P0.3 migration.  
  Evidence:  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`
