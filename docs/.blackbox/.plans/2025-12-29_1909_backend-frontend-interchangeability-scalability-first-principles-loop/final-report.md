# Final Report

Start here:
- `START-HERE.md`
- `CANONICAL.md` (what is authoritative vs supporting)

## ✅ 1) Summary (what we now know)

- Luminelle already implements a “ports → runtime → adapter” pattern for at least commerce + payments, which is the right foundation for swapping providers without rewriting UI logic.  
  Evidence:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-adapters-files.txt`

- The de-facto backend boundary is Cloudflare Pages Functions under `functions/api/**` (Fetch `Request` → `Response` handlers), so the stable contract should be `/api/*` there.  
  Evidence:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/cloudflare-api-surface.rg.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`

- The current “swap risk” is *vendor leakage above adapters* (e.g., Shopify GIDs embedded in UI/client domains), which makes swaps expensive unless we introduce internal keys/capabilities and enforce them with a hard gate.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

- Tenancy must be treated as a backend concern (host-first tenant resolution, cache-safe), and multitenant secrets/config must not rely on per-tenant env vars.  
  Evidence:  
  - `tenancy-context-rules.md`  
  - `tenant-secrets-and-public-config-spec-v0.1.md`

- The plan is implementation-ready: gate scripts + dashboard provide continuous “are we regressing?” feedback.  
  Evidence:  
  - `stop-point-status-dashboard.md`  
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`

- The “swap seams” are now also documented as explicit runbooks (so client work stays checklist-driven):
  - Swap UI: `frontend-swap-playbook.md`
  - Swap provider: `provider-swap-playbook.md`

## 🧭 2) “Current state” architecture (evidence-first)

- Payments:
  - UI calls the `PaymentsPort` contract and uses runtime-selected capabilities.  
    Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-ports-payments.ts.head.txt`
  - Provider selection is runtime-driven (`PAYMENTS_PROVIDER`, dev mocks).  
    Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-runtime.ts.head.txt`
  - Stripe adapter calls the internal API boundary (`/api/payments/intent/create`) and maps errors into `PortError`.  
    Evidence:  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-adapters-stripe-index.ts.head.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-payments-intent-create.ts.head80.txt`

- Commerce:
  - Provider selection is runtime-driven (`SHOPIFY_STORE_DOMAIN`, dev mocks).  
    Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`
  - Shopify adapter is behind an “internal API” implementation boundary (adapter entrypoint exists).  
    Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-index.ts.head.txt`
  - `/api/shopify/auth` and `/api/storefront/cart/*` endpoints already exist on the Cloudflare side.  
    Evidence:  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-shopify-auth.ts.head80.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-storefront-cart-create.ts.head80.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

- Identity + data:
  - Clerk exists in both the Cloudflare API surface (webhooks) and UI/app code, so the long-term “swappable frontend” boundary should avoid *frontends depending on Clerk implementation details*.  
    Evidence:  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-webhooks-clerk.ts.head80.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-clerk-matches.txt`
  - Supabase client is currently browser-constructed from Vite env vars, which strongly suggests that tenancy and access control must be modeled via RLS + tokens (or moved behind `/api/*` for certain flows).  
    Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`

## 🧱 3) Target architecture (“swap anything” boundary)

- Stable boundary (BFF):
  - Treat `functions/api/**` as the stable backend boundary and define `/api/*` contracts in ports-aligned terms (errors, keys, capabilities).  
    Evidence that this boundary exists and is Fetch-style: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`
  - Boundary contract (v1) is already written (ports-aligned), including tenancy propagation and caching requirements.  
    Evidence anchor for the contract decision trail: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/summary.md`

- Provider adapters:
  - Vendor-specific code stays in `src/domains/platform/**/adapters/**` and/or Cloudflare functions, never in `src/domains/client/**` or `src/ui/**`.  
    Evidence that UI/client currently do *not* import adapters directly (scan is empty):  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.rg.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`

- Frontend swap-ability:
  - A new frontend should only need to speak `/api/*` and consume the platform “ports” surface (types + semantics), not Shopify/Stripe/Clerk specifics.  
    Evidence that the platform ports already exist: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`

## 🧭 4) Scalability plan (what we decided)

- Scaling guardrails and caching approach are written down in the plan (edge + backend + DB).  
  Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-scalability-plan.md.head120.txt`

## 🧪 5) Verification (what you can run today)

- Evidence/traceability snapshot exists for this run (git head + status).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/run-metadata.now.txt`
- One-command “run the loop now” wrapper exists (refreshes gates + dashboard, then prints current stop-point metrics):
  - `./.blackbox/scripts/run-1909-loop.sh`
- Vendor leak scan output exists and is the baseline for a later hard gate.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`
- A clean route + handler inventory exists for `/api/*` on Cloudflare Pages Functions.  
  Evidence:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`

## ❓ 6) Open questions (resolved defaults + remaining unknowns)

1) Supabase access mode:
   - Default direction is backend-first for tenant-owned data (service role in `/api/*`), with explicit exceptions only when necessary (e.g., realtime).  
   Evidence anchors:
   - `adrs/0005-backend-first-supabase-access.md`
   - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`

2) Tenant identity:
   - Direction is “tenant = client/org”, resolved host-first via `tenant_domains`, and restricted by memberships for admin actions.  
   Evidence anchors:
   - `tenant-data-model-proposal.md`
   - `tenancy-context-rules.md`

3) Tenant secrets implementation details:
   - The plan specifies encrypted-at-rest secrets in Supabase, but exact key-rotation mechanics and rollout need implementation decisions.  
   Evidence anchors:
   - `adrs/0006-tenant-secrets-and-public-config.md`
   - `tenant-secrets-and-public-config-spec-v0.1.md`

## 🏁 7) What’s next (implementation-ready)

- Avoid further plan sprawl:
  - Treat `CANONICAL.md` as the authoritative index; update existing canonical docs instead of creating new ones.

- Follow the stop-point dashboard’s recommended next PR:
  - Current recommendation (see dashboard “Updated” timestamp): **P0.3 — Consolidate backend boundary surface (api/** → functions/api/**)**  
    Evidence: `stop-point-status-dashboard.md`, `artifacts/snapshots/run-1909-loop.latest.txt`

- Follow the execution sequencing:
  - Dashboard (current risk + recommended next PR): `stop-point-status-dashboard.md`
  - PR plan: `pr-by-pr-stop-points-plan.md`
  - PR 2 detailed plan (auth guard wiring): `pr-2-auth-guards-detailed-plan.md`
  - PR 3 detailed plan (tenant resolution wiring): `pr-3-tenant-resolution-detailed-plan.md`
  - PR 4 detailed plan (cache headers): `pr-4-cache-headers-detailed-plan.md`
  - PR 5 detailed plan (tenancy tables): `pr-5-tenancy-tables-detailed-plan.md`
  - PR 6 detailed plan (tenant integration config lookup): `pr-6-tenant-integration-config-lookup-detailed-plan.md`
  - PR 7 detailed plan (vendor key mapping): `pr-7-vendor-key-mapping-detailed-plan.md`
  - PR 8 detailed plan (tenant #2 onboarding): `pr-8-tenant-2-onboarding-detailed-plan.md`
  - PR 9 detailed plan (identity decoupling): `pr-9-identity-decoupling-detailed-plan.md`
  - PR 10 detailed plan (storefront DTO normalization): `pr-10-storefront-dto-normalization-detailed-plan.md`

- Storefront swappability (new, concrete docs-only outputs):
  - Endpoint → DTO mapping: `storefront-contract-dto-mapping-v0.1.md`
  - Acceptance gate definition (future): `acceptance-gates.md` (Gate G7) + `acceptance-gates-runbook.md` (Gate F)

- After every PR, refresh evidence and record a diff summary:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
  - Store evidence diffs under: `context/pr-diffs/`
