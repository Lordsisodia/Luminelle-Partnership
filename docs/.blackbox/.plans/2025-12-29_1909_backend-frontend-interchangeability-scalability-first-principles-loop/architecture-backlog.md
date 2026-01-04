# Architecture Backlog (build-ready, ordered)

Goal: convert the architecture plan into an actionable backlog that can be executed in small, safe slices.

Evidence rule:
- Any “current state” justification cites a snapshot under `artifacts/snapshots/`.

---

## P0 — Make swaps enforceable (stop regressions)

- P0.1 Turn acceptance gates into “default workflow” (docs + optional CI later)
  - Deliverable: adoption of the CLI runbook + consistent snapshot outputs per cycle.
  - Evidence (runbook exists):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/acceptance-gates-runbook.md`

- P0.2 Eliminate vendor ID leaks above adapters (Shopify GIDs in UI/client)
  - Why: leaks currently exist and are measurable; removing them is the cheapest path to “swap commerce provider later”.  
    Evidence baseline:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`
  - Acceptance: `check-vendor-leaks.txt` shows `disallowed_lines=0` (hard gate can be enabled later).

- P0.3 Consolidate the backend boundary surface (avoid drift between `functions/` and `api/`)
  - Why: the repo currently contains both Cloudflare Pages Functions (`functions/api/**`) and a parallel route tree under `api/**`. This is a high-risk source of contract drift and operational confusion for “frontend swappable”.  
    Evidence (repo top-level + api inventory):  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/repo-top-level.ls.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-files.find.txt`
    Evidence (normalized endpoint drift summary):  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`
  - Detailed implementation plan (migration recipes + acceptance checklist):
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`
  - Plan stance:
    - Canonical boundary: `functions/api/**`
    - Legacy/compat: `api/**` (kept until proven unused, then removed or archived)
  - Acceptance (docs-only now; enforce later):
    - No new endpoints are added under `api/**` (all new work lands in `functions/api/**`).
    - The “api-only endpoint count” trends to 0 as required endpoints are migrated into `functions/api/**` (track via `api-vs-functions.summary.txt`).
  - Triage (evidence-first; keep the endpoint list single-sourced):
    - Current api-only endpoints (normalized): `artifacts/snapshots/api-only-endpoints.txt`
    - Exact `/api/<endpoint>` usage scan (latest): `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
    - Parity/decision table (single place we decide fate): `p0-3-boundary-consolidation-detailed-plan.md` (Section 7)
  - Current classification (as of latest gate refresh):
    - Must-migrate by current UI usage: (none)  
      Evidence: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
    - Script/ops usage to resolve before deleting `api/**`:
      - `/api/shopify/webhooks/products_create` (used by `scripts/test-webhook.mjs`)  
        Evidence: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
    - Already migrated into the canonical boundary (do not treat as `api_only` anymore):
      - `/api/newsletter/subscribe` and `/api/cloudinary/sign` (thin slice)  
        Evidence: `context/pr-diffs/2025-12-31_p0-3_consolidate-backend-boundary-thin-slice.md`, `artifacts/snapshots/api-vs-functions.summary.txt`
      - `admin/media/*` (canonical endpoints exist under `functions/api/admin/media/*`)  
        Evidence: `artifacts/snapshots/functions-api-files.clean.find.txt`, `artifacts/snapshots/api-only-endpoints.txt`

---

## P1 — Stabilize `/api/*` contracts (make frontends truly swappable)

- P1.1 Publish `/api/*` contract v1 (explicit auth + tenancy + cache semantics per endpoint family)
  - Inputs: route inventory + ports mapping.
  - Evidence (route inventory):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
  - Evidence (mapping doc exists):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/api-endpoints-to-ports-map.md`
  - New outputs:
    - Contract v1: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v1.md`
    - Contract v1.1 endpoint table: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v1.1-endpoint-table.md`
    - Gaps report (heuristics): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/contract-gaps-report-v1.1.md`

- P1.2 Establish a “frontend contract test kit” (docs-only now; tests later)
  - Deliverable: a minimal checklist that any new frontend must satisfy (capabilities-driven checkout, no vendor leaks, no adapter imports).
  - Evidence (playbook exists):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/frontend-swap-playbook.md`
  - Companion (provider swap is a checklist problem, not a redesign problem):
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/provider-swap-playbook.md`
  - Operational artifacts:
    - Endpoint template: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/functions-endpoint-template.md`
    - PR-by-PR plan: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-by-pr-stop-points-plan.md`

---

## P2 — Tenancy foundations (single tenant stays working)

- P2.1 Decide tenant identity + resolution rules (domain-first) and freeze it
  - Evidence (rules exist):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenancy-context-rules.md`

- P2.2 Add tenancy tables in Supabase (unused initially)
  - Deliverable: `tenants`, `tenant_domains`, `tenant_integrations`, `tenant_memberships`.
  - Evidence (proposal exists):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenant-data-model-proposal.md`
  - RLS posture (default service-role, RLS enabled everywhere):
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/supabase-rls-multitenancy-strategy.md`

---

## P3 — Provider config migration (env → per-tenant config)

- P3.1 Move Shopify config out of env (per tenant integration row)
  - Why: env-based config doesn’t scale to many tenants.  
    Evidence that env contains provider config today:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/env-example-secrets.rg.txt`
  - Spec: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenant-integrations-config-spec.md`

---

## P4 — Prove it with tenant #2

- P4.1 Onboard tenant #2 with isolated domain + config + verification gates
  - Evidence (runbook exists):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenant-2-onboarding-runbook.md`

---

## P5 — Research-driven platform expansion (reusable client primitives)

This section turns the “feature research” into modular platform domains that remain consistent with:
- `/api/*` as the stable boundary (frontend-swappable)
- ports/adapters/runtimes for provider swaps

Research evidence anchor:
- Top-ranked primitives include feature flags, workflow automation hooks, audit log, and RBAC.  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-summary.head220.txt`

### P5.1 Add feature flags per tenant (platform/flags)

- Output spec: `feature-flags-per-tenant-design-v0.1.md`
- Acceptance:
  - tenant-scoped public flags endpoint is cache-safe
  - admin flag changes are audited

### P5.2 Add audit log (platform/audit)

- Output spec: `audit-log-design-v0.1.md`
- Acceptance:
  - every admin mutation emits an audit event
  - tenant isolation holds for reads

### P5.3 Add RBAC/AuthZ (platform/authz)

- Output spec: `authz-rbac-design-v0.1.md`
- Acceptance:
  - sensitive `/api/*` families are authz-gated (admin/exports/metrics/orders)
  - denies are audited

### P5.4 Add workflow automation hooks + approvals + run log (platform/automation)

- Output spec: `workflow-automation-hooks-design-v0.1.md`
- Acceptance:
  - workflow runs are tenant-scoped and auditable
  - UI can be swapped without re-implementing execution

### P5.5 Expand CMS/content ops (platform/cms)

- Output spec: `cms-content-ops-design-v0.1.md`
- Acceptance:
  - public content endpoints have explicit cache headers and invalidation is auditable

### P5.6 Add admin usage analytics (platform/analytics)

- Output spec: `admin-usage-analytics-design-v0.1.md`
- Acceptance:
  - event taxonomy remains UI-agnostic
  - rollups are tenant-scoped

### P5.7 Add ops guardrails (observability + cache)

- Output specs:
  - `observability-and-telemetry-plan-v0.1.md`
  - `cache-invalidation-playbook-v0.1.md`
- Acceptance:
  - every `/api/*` response has a requestId
  - public caching is explicit and tenant-safe
