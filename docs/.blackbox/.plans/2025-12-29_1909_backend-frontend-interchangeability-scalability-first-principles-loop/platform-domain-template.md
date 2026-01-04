# Platform Domain Template (ports + adapters + runtime + `/api/*`)

Purpose:
- Standardize how we add a new “platform domain” so it is:
  - frontend-swappable
  - provider-swappable
  - tenant-ready
  - measurable via gates

This is a docs-only template to reduce future architectural drift.

Evidence anchors (why this shape matches reality today):
- Platform ports/runtime/adapters already exist in the repo:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-adapters-files.txt`
- “Internal API first” is the recommended default for port implementations:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`

---

## 0) Pick a domain name (examples)

Example domains:
- `platform/authz` (RBAC)
- `platform/audit` (audit log)
- `platform/flags` (feature flags)
- `platform/automation` (workflow hooks)
- `platform/cms` (sections/content)
- `platform/analytics` (usage analytics)

Rule:
- Domain name should represent the *capability*, not the vendor.

---

## 1) Define the port (contract) first

Create:
- `src/domains/platform/<domain>/ports/<domain>.ts`

What belongs in ports:
- DTOs (stable IDs only; no vendor IDs)
- method signatures
- error semantics (via stable error codes)
- capability flags (so UI can branch without vendor knowledge)

Evidence that stable key primitives and error codes already exist:
- `artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`
- `artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

---

## 2) Decide the primary implementation boundary (default: internal API)

Default (recommended):
- Port implementation calls `/api/*` endpoints implemented in `functions/api/**`.

Rationale:
- Keeps vendor tokens/endpoints out of UI.
- Centralizes caching/rate-limiting/observability.

Evidence that `/api/*` exists as Pages Functions today:
- `artifacts/snapshots/functions-api-handlers.clean.rg.txt`

---

## 3) Add adapters only when needed (providers are optional)

If the domain needs external providers:
- `src/domains/platform/<domain>/adapters/<provider>/**`

Rules:
- UI/client code never imports adapters directly.
- All vendor identifiers live at/below adapter boundary only.

Gates:
- Adapter import boundary scan should remain empty:  
  - `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
- Vendor leak scan must go to zero above adapters in implementation phase:  
  - `artifacts/snapshots/check-vendor-leaks.txt`

---

## 4) Runtime selection: environment now, tenant later

Create:
- `src/domains/platform/<domain>/runtime.ts`

Runtime is responsible for:
- selecting implementation (mock vs real adapter)
- reading “provider config” via a single mechanism
- exposing capabilities to UI without vendor branching

Evidence that runtime selection exists today (commerce/payments):
- `artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`
- `artifacts/snapshots/src-domains-platform-payments-runtime.ts.head.txt`

Tenant-aware config later:
- Spec: `tenant-integrations-config-spec.md`

---

## 5) `/api/*` endpoints (the stable frontend boundary)

Create endpoint families aligned to the port:
- `functions/api/<domain>/**`

Rules:
- Implement auth tiers and cache headers per `backend-boundary-contract-v1.md`.
- Tenant resolution is host-first per `tenancy-context-rules.md`.
- Emit stable DTOs per `dto-and-capabilities-spec-v0.1.md`.

Evidence that we already inventory `/api/*` endpoints and scan cues:
- `artifacts/snapshots/functions-api-files.clean.find.txt`
- `artifacts/snapshots/functions-api-cues.matrix.txt`

---

## 6) Supabase data model (tenant_id everywhere)

If the domain stores tenant-owned data:
- add `tenant_id` columns and indexes
- keep the “backend first” access mode as default

Specs:
- `tenant-data-model-proposal.md`
- `supabase-rls-multitenancy-strategy.md`

---

## 7) Acceptance checks (turn architecture into enforcement)

Minimum checks for any new domain:
- Contract doc exists (port methods + DTOs + capabilities).
- `/api/*` endpoints exist and are added to endpoint inventory.
- Gate outputs are clean or trending in the right direction:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

