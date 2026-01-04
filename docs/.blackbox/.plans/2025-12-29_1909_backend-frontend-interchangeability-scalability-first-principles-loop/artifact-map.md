# Artifact Map (1909 plan outputs)

Purpose:
- List the most relevant artifacts produced by this plan so humans can quickly find:
  - what’s canonical
  - what’s supporting
  - what’s evidence output

Canonical map:
- `CANONICAL.md`

---

## Entry points

- `START-HERE.md` — reading order for this plan
- `CANONICAL.md` — which docs are authoritative vs supporting
- `final-report.md` — executive narrative + decisions + next actions
- `inspect-first.md` — minimal frontend (`src/**`) inspection list
- `inspect-first-backend.md` — minimal backend (`functions/**` + `api/**`) inspection list
- `./.blackbox/scripts/run-1909-loop.sh` — one-command loop runner (refresh gates + dashboard, print stop-point metrics)

## Architecture maps (repo-level)

- `architecture-atlas.md` — evidence-first repo topology + swap seams
- `architecture-component-catalog.md` — swap units + seams table
- `domain-module-conventions.md` — how `src/domains/**` stays swappable
- `backend-boundary-conventions.md` — how `/api/*` stays stable and swappable
- `data-layer-conventions.md` — Supabase posture + migrations + multitenancy readiness

## Contracts (backend/frontend boundary)

- `backend-boundary-contract-v1.md` — `/api/*` contract by endpoint family (tiers/tenant/cache)
- `dto-and-capabilities-spec-v0.1.md` — response envelope + capability conventions for swappable UIs
- `storefront-contract-dto-mapping-v0.1.md` — map `/api/storefront/*` endpoints → provider-neutral storefront DTOs (thin-slice plan)
- `backend-boundary-contract-v1.1-endpoint-table.md` — generated table of current `/api/*` endpoints
- `contract-gaps-report-v1.1.md` — heuristic scan of auth/cache/tenant cues in `functions/api/**`

## Tenancy + Supabase posture

- `tenancy-context-rules.md` — host-first tenancy rules (cache-safe)
- `tenant-data-model-proposal.md` — proposed multitenancy schema
- `tenant-integrations-config-spec.md` — per-tenant provider config resolution plan
- `tenant-secrets-and-public-config-spec-v0.1.md` — per-tenant secrets strategy + `/api/config/public` allowlist
- `supabase-rls-multitenancy-strategy.md` — recommended RLS posture (backend-first)
- `multitenant-deployment-topologies.md` — one UI vs many UIs with one Supabase project

## Swappability enforcement

- `key-mapping-spec-v1.md` — eliminate vendor IDs above adapters
- `artifacts/invariants-and-acceptance.md` — first-principles invariants + acceptance checks (evidence-linked)
- `frontend-swap-playbook.md` — how to plug in a new UI against `/api/*`
- `provider-swap-playbook.md` — how to add/replace Shopify/Stripe/etc. behind ports/adapters
- `acceptance-gates.md` — gate list and definitions
- `acceptance-gates-runbook.md` — copy/paste commands that write evidence snapshots
- `frontend-contract-test-kit.md` — checklist for “frontend is swappable”

## Expansion (research-driven platform domains)

- `research-index.md` — what research was actually ingested (prevents sprawl)
- `architecture-expansion-from-research.md` — convert research to modular domains
- `platform-domain-template.md` — standard recipe for adding a new platform domain
- `platform-events-catalog-v0.1.md` — stable platform event vocabulary
- `implementation-skeletons-v0.1.md` — paths-only skeletons for future PRs
- `oss-platform-primitives-map.md` — optional OSS accelerators mapped to platform domains

Domain v0.1 specs:
- `authz-rbac-design-v0.1.md` — tenant-scoped RBAC/AuthZ
- `audit-log-design-v0.1.md` — append-only audit log
- `feature-flags-per-tenant-design-v0.1.md` — staged rollouts per tenant
- `workflow-automation-hooks-design-v0.1.md` — triggers/actions/approvals/run log
- `cms-content-ops-design-v0.1.md` — tenant-scoped content ops + caching
- `admin-usage-analytics-design-v0.1.md` — UI-agnostic admin usage analytics
- `observability-and-telemetry-plan-v0.1.md` — requestId, stable codes, tenant-tagged telemetry
- `cache-invalidation-playbook-v0.1.md` — cache classification + invalidation strategy

## Execution / migration

- `pr-by-pr-stop-points-plan.md` — ordered PR plan for implementation phase
- `p0-3-boundary-consolidation-detailed-plan.md` — implementation-ready plan for consolidating `api/**` → `functions/api/**` (canonical boundary)
- `pr-2-auth-guards-detailed-plan.md` — implementation-ready plan for wiring consistent auth into admin/metrics/orders
- `pr-3-tenant-resolution-detailed-plan.md` — implementation-ready plan for wiring host-first tenant context into tenant-scoped endpoints
- `pr-4-cache-headers-detailed-plan.md` — implementation-ready plan for normalizing tenant-safe cache headers on public endpoints
- `pr-5-tenancy-tables-detailed-plan.md` — implementation-ready plan for adding tenancy config tables in Supabase
- `pr-6-tenant-integration-config-lookup-detailed-plan.md` — implementation-ready plan for switching provider config from env → tenant_integrations
- `pr-7-vendor-key-mapping-detailed-plan.md` — implementation-ready plan for removing Shopify GIDs from UI/client code via internal keys
- `pr-8-tenant-2-onboarding-detailed-plan.md` — implementation-ready plan for onboarding tenant #2 (proof of isolation + ops readiness)
- `pr-stop-point-gate-pack.md` — which commands to run per PR and expected deltas
- `stop-point-status-dashboard.md` — current risk signals + recommended next PR
- `architecture-backlog.md` — build-ready backlog (includes research-driven expansion)
- `pr-10-storefront-dto-normalization-detailed-plan.md` — implementation-ready plan for provider-neutral storefront DTOs at the `/api/storefront/*` boundary

## Decision records

- `adrs/README.md` — ADR index (why the plan is shaped this way)

## Evidence (snapshots)

All “current state” evidence is stored under:
- `artifacts/snapshots/`
  - index: `artifacts/snapshots/_snapshot-index.ls.txt`
