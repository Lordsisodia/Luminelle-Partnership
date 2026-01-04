# ADR 0006 — Tenant secrets storage + `/api/config/public` allowlist

Status:
- Proposed (docs-only phase; implement later)

Decision:
- For multi-tenant provider integrations, store per-tenant secrets in the database **encrypted at rest**, referenced by `tenant_integrations.secret_ref`.
- Expose only allowlisted *public* configuration to the frontend via a tenant-scoped endpoint (e.g. `/api/config/public`).

Context / problem:
- Today, provider credentials are typed as global environment bindings in Cloudflare functions.  
  Evidence: `artifacts/snapshots/functions-_lib-types.ts.head160.txt`
- Global env vars do not scale to “one Supabase project for many tenants” because you cannot realistically provision N tenant credentials as env vars in one deployment.
- We need:
  - a tenant-scoped config lookup (`tenant_integrations`)
  - a safe secret storage approach
  - a clear rule for what can be returned to frontends (public vs secret)

Existing plan inputs:
- Tenant integrations spec already introduces `secret_ref` as a pointer concept: `tenant-integrations-config-spec.md`
- Functions already have a service-role Supabase client helper (backend-first access mode exists):  
  - `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

Decision details:
- Store secrets encrypted in Supabase (one shared Supabase project).
- Use a single encryption key (or key ring) stored as a Cloudflare secret/env var.
  - This preserves “one deploy supports many tenants” while keeping tenant secrets out of the browser.
- `tenant_integrations.config_json` stores non-secret config.
- `tenant_integrations.secret_ref` points to an encrypted secret blob record.
- `/api/config/public` (tenant-scoped) returns allowlisted public config only:
  - e.g. Stripe publishable key (future), feature flags (public subset), marketing/public settings
  - never Shopify admin/storefront tokens, never Supabase service role key

Consequences:
- Pros:
  - Multi-tenant capable without per-tenant env vars.
  - Keeps secrets server-side and decoupled from any frontend.
  - Allows rotation by updating secret records without redeploying UI.
- Cons:
  - Requires careful implementation (encryption, key rotation, log hygiene).
  - Requires a clear “public config allowlist” process.

Related docs:
- Tenancy rules (host-first): `tenancy-context-rules.md`
- Supabase posture (backend-first): `supabase-rls-multitenancy-strategy.md`
- Spec: `tenant-secrets-and-public-config-spec-v0.1.md`

