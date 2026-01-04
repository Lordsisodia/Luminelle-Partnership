# START HERE — Swappable Frontend/Backend Architecture Plan (1909)

If you read nothing else, read these in order:

0) **Canonical map (what’s authoritative vs supporting)**  
   - `CANONICAL.md`

0b) **If you’re asking “what now?” (single next-step view)**  
   - `NEXT.md`

1) **Final narrative (current state → decisions → next actions)**  
   - `final-report.md`

2) **What exists today (`/api/*` + ports) and how it maps**  
   - `/api/*` route inventory (evidence):  
     - `artifacts/snapshots/functions-api-files.clean.find.txt`  
     - `artifacts/snapshots/functions-api-handlers.clean.rg.txt`  
   - Note: the repo also contains a legacy/alternate route tree under `api/**`; this plan treats `functions/api/**` as the canonical boundary.  
     Evidence:  
     - `artifacts/snapshots/repo-top-level.ls.txt`  
     - `artifacts/snapshots/api-files.find.txt`
   - Mapping doc: `api-endpoints-to-ports-map.md`
   - Repo architecture map (directories + layer rules): `architecture-atlas.md`
   - Domain + boundary conventions (how we keep components swappable):
     - `domain-module-conventions.md` (`src/domains/**` shape + dependency direction)
     - `backend-boundary-conventions.md` (`functions/**` shape + `/api/*` grouping)
     - `data-layer-conventions.md` (Supabase posture + migrations)
   - If you want the “minimum file list” to inspect code:
     - Frontend (`src/**`): `inspect-first.md`
     - Backend (`functions/**` + legacy `api/**`): `inspect-first-backend.md`

3) **Backend contract (what a frontend is allowed to assume)**  
   - v1 (auth/tenant/cache per endpoint family): `backend-boundary-contract-v1.md`
   - v0 (historical): `backend-boundary-contract-v0.md`
   - DTO + capability conventions (so UIs can swap without vendor knowledge): `dto-and-capabilities-spec-v0.1.md`

4) **Tenancy (how one Supabase project supports many clients)**  
   - Rules: `tenancy-context-rules.md`
   - Schema proposal: `tenant-data-model-proposal.md`
   - Deployment options (single UI vs per-client UIs): `multitenant-deployment-topologies.md`

5) **Research-driven expansion (what to build next as modular domains)**  
   - Research index (what we already gathered + what we actually used): `research-index.md`
   - Turning research into modular platform domains: `architecture-expansion-from-research.md`
   - OSS platform primitives map (optional accelerators; evidence-backed): `oss-platform-primitives-map.md`
   - Standard domain recipe (ports/adapters/runtime/api): `platform-domain-template.md`
   - RBAC plan: `authz-rbac-design-v0.1.md`
   - Audit log plan: `audit-log-design-v0.1.md`
   - Feature flags plan: `feature-flags-per-tenant-design-v0.1.md`
   - Workflow automation plan: `workflow-automation-hooks-design-v0.1.md`
   - CMS/content ops plan: `cms-content-ops-design-v0.1.md`
   - Admin usage analytics plan: `admin-usage-analytics-design-v0.1.md`
   - Observability/telemetry plan: `observability-and-telemetry-plan-v0.1.md`
   - Cache invalidation playbook: `cache-invalidation-playbook-v0.1.md`
   - Decision records (ADRs): `adrs/README.md`
   - Platform event vocabulary (shared triggers/actions naming): `platform-events-catalog-v0.1.md`
   - Implementation skeletons (paths-only, execution-ready): `implementation-skeletons-v0.1.md`
   - Frontend contract test kit (CLI-first): `frontend-contract-test-kit.md`

6) **How to safely add/swap a frontend**  
   - `frontend-swap-playbook.md`

6b) **How to safely add/swap a provider (Shopify/Stripe/etc.)**  
   - `provider-swap-playbook.md`

7) **How to eliminate vendor coupling (keys + mapping)**  
   - `key-mapping-spec-v1.md`
   - Baseline leak scan evidence: `artifacts/snapshots/check-vendor-leaks.txt`

8) **How we enforce this (CLI acceptance gates)**  
   - Gate list: `acceptance-gates.md`
   - Copy/paste runbook: `acceptance-gates-runbook.md`
   - Invariants + acceptance checks (first principles, evidence-linked): `artifacts/invariants-and-acceptance.md`

9) **Execution plan**  
   - Build-ready backlog: `architecture-backlog.md`
   - Phased migration: `migration-stages.md`
   - Tenant #2 runbook: `tenant-2-onboarding-runbook.md`
   - Risk register: `risk-register.md`
   - Contract implementation checklist (turn docs → code safely): `contract-implementation-checklist.md`

10) **Backend boundary primitives (functions/_lib specs)**  
   - Tenant resolution helper spec: `functions-tenant-resolution-spec.md`
   - Auth guards helper spec: `functions-auth-guards-spec.md`
   - Cache policy helper spec: `functions-cache-policy-spec.md`
   - Endpoint surface table + gaps:
     - `backend-boundary-contract-v1.1-endpoint-table.md`
     - `contract-gaps-report-v1.1.md`
   - Endpoint implementation template: `functions-endpoint-template.md`

11) **Provider config + Supabase posture**  
   - Tenant integrations config resolution: `tenant-integrations-config-spec.md`
   - Tenant secrets + public config allowlist (per-tenant, multi-client ready): `tenant-secrets-and-public-config-spec-v0.1.md`
   - Supabase RLS + multitenancy strategy: `supabase-rls-multitenancy-strategy.md`

12) **Implementation roadmap**  
   - PR-by-PR stop points plan: `pr-by-pr-stop-points-plan.md`
   - PR 2 detailed auth wiring plan: `pr-2-auth-guards-detailed-plan.md`
   - PR 3 detailed tenant resolution wiring plan: `pr-3-tenant-resolution-detailed-plan.md`
   - PR 4 detailed cache headers plan: `pr-4-cache-headers-detailed-plan.md`
   - PR 5 detailed tenancy tables plan: `pr-5-tenancy-tables-detailed-plan.md`
   - PR 6 detailed tenant integration config lookup plan: `pr-6-tenant-integration-config-lookup-detailed-plan.md`
   - PR 7 detailed vendor key mapping plan: `pr-7-vendor-key-mapping-detailed-plan.md`
   - PR 8 detailed tenant #2 onboarding plan: `pr-8-tenant-2-onboarding-detailed-plan.md`
   - PR stop-point gate pack (commands + expected snapshot deltas): `pr-stop-point-gate-pack.md`
   - One-command contract evidence refresh script (runs scans + regenerates v1.1 table + gaps report):
     - `./.blackbox/scripts/refresh-1909-contract-evidence.sh`
   - One-command full swappability gate refresh (contract evidence + boundary scans + vendor leaks + platform inventories):
     - `./.blackbox/scripts/refresh-1909-all-gates.sh`
   - PR completion checklist: `pr-completion-checklist.md`
   - PR evidence diff summary template: `pr-evidence-diff-summary-template.md`
     - Store filled PR diffs under: `context/pr-diffs/`
     - PR diffs index: `context/pr-diffs/README.md`
   - Agent parallelization playbook: `agent-parallelization-playbook.md`
   - 6–10 hour / 50‑prompt loop script (docs-only, CLI-first): `agent-cycle-prompts-50.md`
   - Stop-point status dashboard (auto-generated from `context/pr-diffs/`):
     - `stop-point-status-dashboard.md`
     - Refresh: `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

---

## Evidence-first rule (for this plan)

Any claim about “current reality” should cite a file under:
- `artifacts/snapshots/`

Snapshot index:
- `artifacts/snapshots/_snapshot-index.ls.txt`
