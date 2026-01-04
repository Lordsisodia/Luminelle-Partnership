# PR 6 — Provider Config Lookup (env → tenant_integrations) (detailed plan)

Scope: **plan-only** (no `src/` or `functions/` changes in this PR doc).

This PR is the “multi-tenant unlock”: it moves provider configuration out of global env vars and into tenant-scoped database records so adding a new client does not require a new deploy or per-tenant env sprawl.

---

## Why PR 6 exists (first principles)

To swap providers and frontends safely, all provider-specific configuration must be:
- tenant-scoped,
- backend-resolved,
- never shipped to the browser (except allowlisted public config).

Evidence that env currently contains provider config (works for 1 tenant; does not scale):
- `artifacts/snapshots/env-example-secrets.rg.txt`
- `artifacts/snapshots/functions-_lib-types.ts.head160.txt`

Specs that define the intended end state:
- `tenant-integrations-config-spec.md`
- `tenant-secrets-and-public-config-spec-v0.1.md`
- `backend-boundary-contract-v1.md`

---

## Target outcome (PR 6 acceptance checks)

After the implementation PR (not this doc) lands:

- Provider config lookup is tenant-scoped:
  - resolved from `tenant_integrations` (and secret blobs via `secret_ref`)
  - not from “random env reads in deep business logic”
- Adding tenant #2 does not require new provider env vars:
  - only DB rows + encrypted secrets.
- A swappable frontend can fetch public tenant config via a stable endpoint:
  - `GET /api/config/public` (tenant-scoped, allowlisted, cache-safe)
- No secrets are ever returned to the browser or logged.

---

## Dependencies / ordering

This PR assumes:
- PR 3 exists (tenant context is resolved for requests):
  - `pr-3-tenant-resolution-detailed-plan.md`
- PR 5 exists (tenancy tables exist):
  - `pr-5-tenancy-tables-detailed-plan.md`

Roadmap reference:
- `pr-by-pr-stop-points-plan.md`

---

## Data model additions (if not already present)

In addition to `tenant_integrations`, the secrets spec requires:
- `tenant_integration_secrets` (encrypted secret blobs)

Canonical design:
- `tenant-secrets-and-public-config-spec-v0.1.md`

If PR 5 did not add this table, PR 6 should add it (still safe; does not affect runtime behavior until used).

---

## Implementation plan (backend boundary)

### 1) Create a single “integration config loader”

Add a shared helper in `functions/_lib/` (name/location illustrative; actual naming should match repo conventions):
- `loadTenantIntegrationConfig({ tenantId, provider })`

Behavior:
- Query `tenant_integrations` for `(tenant_id, provider)`
- If `secret_ref` exists:
  - fetch corresponding `tenant_integration_secrets`
  - decrypt the payload server-side (key lives in Cloudflare env)
- Return a merged config object:
  - `{ config: config_json, secrets: decryptedSecrets, status }`

Evidence that service-role Supabase access exists in functions:
- `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

### 2) Add `/api/config/public` (tenant-scoped allowlist)

Spec source:
- `tenant-secrets-and-public-config-spec-v0.1.md`

Contract requirements:
- tier: public
- tenant-scoped: host-first
- cache: tenant-public (short TTL) and tenant-safe

This endpoint becomes the stable way for any frontend (present or future) to learn:
- brand/tenant display config
- public feature flags
- payments publishable keys (Stripe) (future)

### 3) Migrate provider modules to use the loader (still single tenant)

Strategy to keep PR 6 safe and reversible:
- Add loader + DB rows first.
- Update provider boundary modules to read from loader with an env fallback:
  - if `tenant_integrations` row is missing, fall back to current env behavior for tenant #1 only.

This preserves production behavior while moving configuration into the scalable path.

---

## Evidence deltas expected after PR 6 (when implemented)

Expected “good” signs:
- env usage for provider configuration decreases over time (can be tracked by a simple rg snapshot).
- tenant integration rows exist for tenant #1 (DB evidence outside this repo).

Repo evidence refresh:
- `./.blackbox/scripts/refresh-1909-all-gates.sh`
- `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

Optional new snapshot to add after implementation:
- `artifacts/snapshots/functions-provider-env-reads.rg.txt` (track remaining env coupling)

