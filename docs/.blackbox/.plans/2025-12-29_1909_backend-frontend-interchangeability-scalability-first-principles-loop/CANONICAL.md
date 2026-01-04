# Canonical Docs Map (1909 plan)

Purpose:
- Prevent the plan from getting worse as it grows by making it obvious:
  - which docs are **authoritative** (source of truth)
  - which docs are **supporting** (useful, but not canonical)
  - which docs are **historical** (kept for context, not direction)

Scope:
- This map is only for:  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/`

Evidence rule:
- Canonical docs should be runnable/grounded via evidence snapshots in `artifacts/snapshots/`.

---

## 1) If you only read 6 docs

1) `START-HERE.md`
   - Reading order and entrypoint.

1b) `NEXT.md`
   - The “what do we do next?” answer (single view).

2) `final-report.md`
   - Executive narrative: current state → decisions → next steps.

3) `backend-boundary-contract-v1.md`
   - What *any* frontend can assume about `/api/*` (auth/tenant/cache tiers).

4) `dto-and-capabilities-spec-v0.1.md`
   - The response envelope + capabilities model that makes frontends swappable.

5) `tenancy-context-rules.md`
   - Deterministic host-first tenancy rules (cache-safe).

6) `pr-by-pr-stop-points-plan.md`
   - The actual execution sequence (what to change first when code changes are allowed).

---

## 2) Canonical operational artifacts (run these)

- Gate refresh (writes evidence):
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

- Dashboard (current “what’s risky and what’s next”):
  - `stop-point-status-dashboard.md`

---

## 3) Canonical “expansion” docs (when growing to a reusable client platform)

These docs define the scalable path for new capabilities without breaking swap boundaries:

- Domain recipe: `platform-domain-template.md`
- Research→architecture mapping: `architecture-expansion-from-research.md`
- Platform event vocabulary: `platform-events-catalog-v0.1.md`
- Implementation skeletons (paths-only): `implementation-skeletons-v0.1.md`
- Frontend contract test kit: `frontend-contract-test-kit.md`

---

## 4) Supporting docs (valuable, but not primary)

- Architecture maps (how the repo is laid out today):
  - `architecture-atlas.md` (evidence-first repo topology + swap seams)
  - `architecture-component-catalog.md` (swap units + seams table)
  - `domain-module-conventions.md` (`src/domains/**` conventions for swappable UI)
  - `backend-boundary-conventions.md` (`functions/**` conventions for stable `/api/*`)
  - `data-layer-conventions.md` (Supabase + migrations posture for multitenancy)

- API surface mapping:
  - `api-endpoints-to-ports-map.md`
  - `backend-boundary-contract-v1.1-endpoint-table.md`
  - `storefront-contract-dto-mapping-v0.1.md` (storefront endpoints → provider-neutral storefront DTOs)
  - `contract-gaps-report-v1.1.md` (heuristic scan report)

- Inspection helpers:
  - `inspect-first.md` (frontend `src/**`)
  - `inspect-first-backend.md` (backend `functions/**` + legacy `api/**`)

- Tenancy + data:
  - `tenant-data-model-proposal.md`
- `tenant-integrations-config-spec.md`
- `tenant-secrets-and-public-config-spec-v0.1.md`
- `supabase-rls-multitenancy-strategy.md`
- `multitenant-deployment-topologies.md`

- Ops/scalability:
  - `scalability-plan.md` (overview narrative)
  - `observability-and-telemetry-plan-v0.1.md`
  - `cache-invalidation-playbook-v0.1.md`

- Swappability enforcement:
  - `key-mapping-spec-v1.md`
  - `artifacts/invariants-and-acceptance.md`
  - `acceptance-gates.md`
  - `acceptance-gates-runbook.md`
  - `frontend-swap-playbook.md`
  - `provider-swap-playbook.md`
  - `research-index.md` (what research runs were ingested)

- Optional OSS accelerators (mapped to platform domains; still optional):
  - `oss-platform-primitives-map.md`

- Implementation notes:
  - `p0-3-boundary-consolidation-detailed-plan.md` (implementation-ready plan for consolidating `api/**` → `functions/api/**`)
  - `pr-2-auth-guards-detailed-plan.md` (implementation-ready PR2 wiring plan)
  - `pr-3-tenant-resolution-detailed-plan.md` (implementation-ready PR3 wiring plan)
  - `pr-4-cache-headers-detailed-plan.md` (implementation-ready PR4 caching plan)
  - `pr-5-tenancy-tables-detailed-plan.md` (implementation-ready PR5 Supabase tables plan)
  - `pr-6-tenant-integration-config-lookup-detailed-plan.md` (implementation-ready PR6 provider config lookup plan)
  - `pr-7-vendor-key-mapping-detailed-plan.md` (implementation-ready PR7 vendor key mapping plan)
  - `pr-8-tenant-2-onboarding-detailed-plan.md` (implementation-ready PR8 tenant #2 onboarding plan)
  - `pr-9-identity-decoupling-detailed-plan.md` (implementation-ready PR9 identity decoupling plan; drives Clerk coupling out of UI/client domains)
  - `pr-10-storefront-dto-normalization-detailed-plan.md` (implementation-ready PR10 storefront DTO normalization plan; removes provider object/ID dependence from storefront boundary)

---

## 5) Historical docs (kept for context)

- `backend-boundary-contract-v0.md`
  - Historical earlier draft; superseded by `backend-boundary-contract-v1.md` and the v1.1 endpoint table.

---

## 6) Decision records (ADRs)

Source of truth for architectural decisions:
- `adrs/README.md`
