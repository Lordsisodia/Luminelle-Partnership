# Tenant Integrations Config Spec (Shopify now, Stripe later)

Goal:
- Make provider configuration tenant-scoped and backend-resolved so:
  - one Supabase project can serve many clients
  - frontends remain swappable
  - swapping providers is “change adapter/config”, not “rewrite UI”

Evidence anchors:
- Env currently contains provider config (works for 1 tenant; does not scale):  
  `artifacts/snapshots/env-example-secrets.rg.txt`
- Proposed multitenancy tables include `tenant_integrations`:  
  `tenant-data-model-proposal.md`
- Functions env binding type includes Shopify and Stripe secrets today (global env):  
  `artifacts/snapshots/functions-_lib-types.ts.head160.txt`
- Service-role Supabase client exists in functions (enables backend-resolved config):  
  `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

---

## 1) Principles

- Provider config lookup happens in the backend boundary (Cloudflare `/api/*`).
- Frontend never reads provider credentials/config directly.
- Adapters receive a resolved, tenant-scoped config object (no env reads deep in business logic).

---

## 2) Data model (minimum)

Use the tenancy schema proposal:
- `tenants`
- `tenant_domains`
- `tenant_integrations` with `(tenant_id, provider)` unique

See: `tenant-data-model-proposal.md`

---

## 3) Provider config objects (v1)

### 3.1 Shopify integration config (non-secret vs secret)

Non-secret (stored in `config_json`):
- `store_domain` (may also be in `tenant_integrations.external_id`)
- feature flags/capabilities:
  - `supports_customer_accounts`
  - `supports_checkout_proxy`
  - api version (if not global)

Secrets (stored as `secret_ref` or in a secrets store; not in `config_json`):
- storefront private token
- admin API access token / app secret

Evidence that Shopify secrets are currently env-based (global):  
`artifacts/snapshots/env-example-secrets.rg.txt`

### 3.2 Stripe integration config (future)

Non-secret:
- publishable key (frontend might need it, but should be served via `/api/payments/config` per tenant)
- payment mode (embedded/redirect)

Secrets:
- `STRIPE_SECRET_KEY` (must stay server-side)

Evidence that Stripe secret is present in function env typing today:  
`artifacts/snapshots/functions-_lib-types.ts.head160.txt`

---

## 4) Resolution algorithm (per request)

For a given request:

1) Resolve tenant:
   - `tenant = resolveTenantContext(request)`
   - Spec: `functions-tenant-resolution-spec.md`

2) Load integrations:
   - Query `tenant_integrations` by `tenant_id` (service role).
   - Cache in memory per tenant for short TTL (optional; later).
   - Evidence for service role client: `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

3) Construct adapter config:
   - Merge:
     - tenant-specific non-secret config
     - secret material retrieved via `secret_ref` (implementation detail)
   - Pass into provider adapters / runtime

---

## 5) Endpoints needed (contract additions; docs-only now)

To keep frontends swappable and avoid exposing secrets:

- `GET /api/config/public` (Tier: public, tenant-scoped)
  - returns allowlisted *public* config (e.g. Stripe publishable key, feature flags)

- `GET /api/config/admin` (Tier: admin, tenant-scoped)
  - returns debug information (no secrets) for operations

Note:
- These endpoints are not in the current route inventory (so they are planned work).  
  Evidence of current inventory: `artifacts/snapshots/functions-api-files.clean.find.txt`

---

## 6) Acceptance checks (implementation phase)

- No provider secrets are required in browser runtime.
- Adding tenant #2 does not require new env vars for provider config (only database rows + secrets).
- Provider adapters accept config objects and do not read global env directly (except in a single boundary module).

