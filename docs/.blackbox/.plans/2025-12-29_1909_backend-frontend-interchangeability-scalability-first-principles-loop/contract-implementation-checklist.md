# Contract Implementation Checklist (turn plan → code safely)

This is the “do this next” checklist derived from:
- `/api/*` contract v1 + v1.1 endpoint table
- contract gaps report
- tenancy + auth + cache specs

Evidence anchors:
- Endpoint table: `backend-boundary-contract-v1.1-endpoint-table.md`
- Gaps report: `contract-gaps-report-v1.1.md`
- Tenant resolver spec: `functions-tenant-resolution-spec.md`
- Auth guards spec: `functions-auth-guards-spec.md`
- Cache policy spec: `functions-cache-policy-spec.md`
- PR gate pack (commands + expected deltas): `pr-stop-point-gate-pack.md`

---

## Phase 0 — Consolidate backend boundary surface (`api/**` → `functions/api/**`)

Objective:
- Ensure there is one canonical `/api/*` surface for “frontend swappable” operation.
- Prevent contract drift between the legacy `api/**` tree and the canonical Cloudflare `functions/api/**` tree.

Inputs / evidence:
- Drift summary (quantified): `artifacts/snapshots/api-vs-functions.summary.txt`
- Api-only endpoints list: `artifacts/snapshots/api-only-endpoints.txt`
- Usage triage (latest): `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

Actions:
- [ ] For any api-only endpoint that is called by the current UI, add an equivalent handler under `functions/api/**` with the same route path.
- [ ] Keep `api/**` as frozen legacy (no new features) until it can be deleted/archived.

Stop condition:
- `api_only` in `api-vs-functions.summary.txt` is shrinking (toward 0), and all UI-called endpoints are available in `functions/api/**`.

---

## Phase 1 — Add shared boundary primitives (no behavior change first)

- [ ] Add `functions/_lib/tenant.ts` implementing host normalization + `resolveTenantContext()`.  
      Spec: `functions-tenant-resolution-spec.md`
- [ ] Add `functions/_lib/authGuards.ts` implementing tier guards:
      - `internal` uses existing `requireInternalAuth`  
        Evidence helper exists: `artifacts/snapshots/functions-_lib-internalAuth.ts.head160.txt`
      - `integration` uses existing Shopify verification helpers  
        Evidence helpers exist:  
        - `artifacts/snapshots/functions-_lib-shopifyWebhooks.ts.head160.txt`  
        - `artifacts/snapshots/functions-_lib-shopifyOAuth.ts.head160.txt`
      Spec: `functions-auth-guards-spec.md`
- [ ] Extend `functions/_lib/response.ts` with cache helpers:
      - `jsonNoStore`
      - `jsonTenantPublic`  
      Spec: `functions-cache-policy-spec.md`
      Evidence current helper is minimal: `artifacts/snapshots/functions-_lib-response.ts.head160.txt`

Stop condition:
- Shared helpers exist; endpoints still compile and behave unchanged.

---

## Phase 2 — Wire primitives into endpoints (mechanical refactor)

This phase addresses gaps flagged in `contract-gaps-report-v1.1.md`.

- [ ] Ensure every endpoint calls `resolveTenantContext()` once at the start (tenant-required families).  
      Gap evidence: “no tenant cues in-file” across most families: `contract-gaps-report-v1.1.md`
- [ ] Ensure `admin/**`, `exports/**`, `metrics/**`, and `orders/**` enforce `admin` or `internal` tier.
      Gap evidence: these endpoints look unauthenticated by scan: `contract-gaps-report-v1.1.md`
- [ ] Ensure public cacheable endpoints set explicit cache headers:
      - `storefront/landing/sections`
      - `storefront/product/*`
      - `experiment/*`  
      Gap evidence: `contract-gaps-report-v1.1.md`

Stop condition:
- All endpoints follow a consistent template: tenant → auth guard → handler → response helper.

---

## Phase 3 — Enforce key mapping (remove vendor IDs above adapters)

- [ ] Execute key mapping migration (UI/config leak removal) following:
  - `key-mapping-spec-v1.md`
  - Baseline evidence to drive to zero: `artifacts/snapshots/check-vendor-leaks.txt`

Stop condition:
- Vendor leak scan shows 0 disallowed lines in UI/client/lib.

---

## Phase 4 — Tenancy tables + tenant #2 (proof)

- [ ] Implement Supabase tenancy tables per `tenant-data-model-proposal.md`.
- [ ] Use `tenant-2-onboarding-runbook.md` to onboard tenant #2 and verify isolation.
