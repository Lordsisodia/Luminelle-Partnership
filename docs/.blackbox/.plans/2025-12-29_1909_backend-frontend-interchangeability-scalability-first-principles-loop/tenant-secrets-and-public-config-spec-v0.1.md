# Tenant Secrets + Public Config Spec (v0.1)

Purpose:
- Make multitenancy operational by defining:
  - how per-tenant secrets are stored and retrieved (server-side)
  - how *public* tenant config is safely exposed to any frontend

Evidence rule:
- Any “current repo state” claim cites snapshots under `artifacts/snapshots/`.

Current repo evidence anchors:
- Functions env bindings currently include provider secrets as global env vars:  
  - `artifacts/snapshots/functions-_lib-types.ts.head160.txt`
- Functions already have a service-role Supabase helper (backend-first access is available):  
  - `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`
- Existing plan introduces tenant integrations + `secret_ref` concept:  
  - `tenant-integrations-config-spec.md`

ADR:
- `adrs/0006-tenant-secrets-and-public-config.md`

---

## 0) Non-negotiable rules

- Secrets never reach the browser.
- Secrets are never written to logs.
- Secrets are tenant-scoped (no cross-tenant access).
- Public config is allowlisted and tenant-scoped.
- Public config endpoints are cache-safe by tenant host.

Tenancy baseline:
- `tenancy-context-rules.md`

---

## 1) Data model (minimum)

### 1.1 `tenant_integrations` (already proposed)

Fields (conceptual):
- `tenant_id`
- `provider` (`shopify`, `stripe`, `clerk`, etc.)
- `config_json` (non-secret config)
- `secret_ref` (pointer to secret record; not the secret itself)

See:
- `tenant-data-model-proposal.md`
- `tenant-integrations-config-spec.md`

### 1.2 `tenant_integration_secrets` (new)

New table (tenant-owned; service-role only initially):
- `id uuid primary key`
- `tenant_id uuid not null references tenants(id) on delete cascade`
- `provider text not null`
- `kind text not null` (e.g. `shopify_admin`, `shopify_storefront`, `stripe_secret`)
- `encrypted_json text not null` (encrypted blob)
- `key_id text not null` (which encryption key version was used)
- `created_at timestamptz not null default now()`
- `rotated_at timestamptz null`

Constraints:
- unique `(tenant_id, provider, kind, key_id)` if you want versioning; or keep only latest and store history separately.

Security posture:
- Enable RLS; default deny for anon/auth roles; service role uses backend boundary.
  - `supabase-rls-multitenancy-strategy.md`

---

## 2) Encryption strategy (v0.1)

Goal:
- Store tenant secrets in Supabase encrypted at rest using an application-managed key.

Mechanism (conceptual):
- Cloudflare Functions store a single encryption key (or key ring) in env/secret storage.
- When writing secrets, encrypt JSON payload with `key_id`.
- When reading secrets, fetch encrypted_json by secret_ref, decrypt using matching key_id.

Notes:
- This keeps the “one deploy supports many tenants” property while avoiding per-tenant env vars.
- Key rotation is supported by maintaining multiple `key_id` values during transition.

---

## 3) Resolution algorithm (per request)

For any endpoint that needs provider configuration:

1) Resolve tenant (host-first):
   - `tenant = resolveTenantContext(request)`
   - Spec: `functions-tenant-resolution-spec.md`

2) Load integration row:
   - `tenant_integrations` by `(tenant_id, provider)`

3) If `secret_ref` exists:
   - Fetch `tenant_integration_secrets` record
   - Decrypt to JSON object

4) Construct adapter config:
   - merge `config_json` + decrypted secrets (never log)
   - pass config into adapter/runtime

Caching:
- Optional in-memory cache per isolate:
  - key: `tenant_id:provider`
  - TTL: short (e.g. 60s)
  - never cache decrypted secrets globally across isolates

Evidence that service-role Supabase access exists in functions:
- `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

---

## 4) `/api/config/public` (public config allowlist)

Goal:
- Provide a stable way for any frontend to fetch public tenant config without embedding vendor knowledge.

Proposed endpoint:
- `GET /api/config/public`

Tier:
- public (no auth required)
- tenant-scoped (host-first)
- cacheable (short TTL) and tenant-safe

Response allowlist examples:
- `tenantSlug`, `brandName` (non-sensitive)
- `featureFlagsPublic` (subset)
- `payments.publicKey` (Stripe publishable key, future)

Explicitly disallowed:
- Shopify admin/storefront tokens
- Supabase anon key/service role key
- any private integration secrets

Contract references:
- `backend-boundary-contract-v1.md`
- `dto-and-capabilities-spec-v0.1.md`

---

## 5) `/api/config/admin` (optional)

Goal:
- Allow admins to debug configuration state without exposing secrets.

Proposed endpoint:
- `GET /api/config/admin`

Tier:
- admin (authz required)
- tenant-scoped
- `Cache-Control: no-store`

Response allowlist:
- integration status, last rotated timestamp, provider capabilities
- never raw secrets

AuthZ references:
- `authz-rbac-design-v0.1.md`
- `audit-log-design-v0.1.md` (audit config changes)

---

## 6) Acceptance checks (implementation phase)

- Onboarding tenant #2 requires:
  - inserting rows into `tenants`, `tenant_domains`, `tenant_integrations`
  - adding encrypted secret records
  - no new deployment env vars per tenant
- `/api/config/public` returns only allowlisted values and is tenant-safe cached.
- No secrets are logged during config resolution.

