# Frontend Contract Test Kit (docs-only, CLI-first)

Purpose:
- Provide a repeatable checklist + commands to validate that a frontend is truly “swappable” against the backend boundary.
- This is **docs-only** in the current phase (no tests are added to the codebase yet).

Evidence rule:
- Every “current state” assertion cites a snapshot under `artifacts/snapshots/`.

Core evidence anchors:
- `/api/*` inventory exists: `artifacts/snapshots/functions-api-files.clean.find.txt`
- Backend handler inventory exists: `artifacts/snapshots/functions-api-handlers.clean.rg.txt`
- Vendor leak baseline exists (must drive to 0 in implementation): `artifacts/snapshots/check-vendor-leaks.txt`
- Adapter import scans exist (must stay empty):  
  - `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
- Vendor SDK import report exists (review-only; keeps coupling intentional):  
  - `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

---

## 0) What this validates

If these checks pass, we have strong evidence that:
- A different UI (new SPA/SSR/mobile) can call `/api/*` without needing vendor SDKs or vendor IDs.
- Provider swaps are possible without UI changes (UI only depends on capabilities + DTOs).
- Multi-tenant expansion remains safe (tenant resolution is backend-owned).

---

## 1) Hard swappability checks (must pass)

### 1.1 UI/client does not import provider adapters

Command (already included in gate bundle):
- `./.blackbox/scripts/refresh-1909-all-gates.sh`

Evidence output:
- `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt` should be empty.

### 1.2 UI/client contains no vendor IDs (Shopify GIDs, Stripe IDs, etc.)

Command (already included in gate bundle):
- `./.blackbox/scripts/refresh-1909-all-gates.sh`

Evidence output:
- `artifacts/snapshots/check-vendor-leaks.txt` should reach `disallowed_lines=0` (implementation phase gate).

Related spec:
- `key-mapping-spec-v1.md`

### 1.3 Vendor SDK imports outside platform are reviewed (report-only)

Command (already included in gate bundle):
- `./.blackbox/scripts/refresh-1909-all-gates.sh`

Evidence output:
- `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

What good looks like:
- Match set stays small and intentional (identity UI + capability-gated embedded flows only).

---

## 2) Boundary contract checks (must be true for any new frontend)

### 2.1 `/api/*` surface is stable and inventoried

Commands (already included in gate bundle):
- `./.blackbox/scripts/refresh-1909-contract-evidence.sh`

Evidence outputs:
- `artifacts/snapshots/functions-api-files.clean.find.txt`
- `artifacts/snapshots/functions-api-handlers.clean.rg.txt`
- `backend-boundary-contract-v1.1-endpoint-table.md`

### 2.2 Sensitive endpoints are auth-guarded (admin/exports/metrics/orders)

Evidence report (heuristic scan):
- `contract-gaps-report-v1.1.md`

Note:
- The scan is heuristic; final correctness is ensured when endpoints uniformly call shared auth helpers.

---

## 3) DTO + capability checks (what a new UI should rely on)

Reference:
- `dto-and-capabilities-spec-v0.1.md`

Rules for any new UI:
- Always treat IDs crossing the boundary as opaque internal keys.
- Always branch on capability flags, not provider strings.

ADR references:
- `adrs/0002-capability-driven-ui.md`
- `adrs/0001-internal-api-first.md`

---

## 4) Tenancy checks (multi-client readiness)

Reference:
- `tenancy-context-rules.md`

Rules:
- Tenant is resolved by host-first logic in backend boundary.
- Auth restricts allowed operations; it does not silently override tenant.

ADR reference:
- `adrs/0003-host-first-tenancy.md`

---

## 5) How to run this as a standard workflow

After any change (docs-only or code PR):
- `./.blackbox/scripts/refresh-1909-all-gates.sh`
- `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- Record evidence summary: `context/pr-diffs/` using `pr-evidence-diff-summary-template.md`
