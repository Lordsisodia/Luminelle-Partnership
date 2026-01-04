# Functions Endpoint Template (standard handler shape)

Goal:
- Make every `/api/*` handler follow the same structure so tenant/auth/cache behavior is consistent and auditable.
- Reduce the “contract gaps” found by endpoint scans by making invariants obvious in code.

Evidence anchors:
- `/api/*` surface exists in `functions/api/**`:  
  `artifacts/snapshots/functions-api-files.clean.find.txt`
- Shared helpers exist today (and will be extended):
  - Response helpers: `artifacts/snapshots/functions-_lib-response.ts.head160.txt`
  - Internal auth helper: `artifacts/snapshots/functions-_lib-internalAuth.ts.head160.txt`
  - Shopify verification helpers: `artifacts/snapshots/functions-_lib-shopifyWebhooks.ts.head160.txt`
  - Service-role Supabase client: `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`
- Contract gaps report motivating consistency: `contract-gaps-report-v1.1.md`

---

## Template A — Public, tenant-scoped, cacheable (e.g. landing sections, product sections)

Pseudocode structure (not code to paste yet):

- Parse request + method guard.
- `tenant = resolveTenantContext(request, env)`
- `auth = public` (no-op)
- Execute domain logic (read-only).
- Return using `jsonTenantPublic(...)` with explicit TTL + ETag if relevant.

Contract mapping:
- `backend-boundary-contract-v1.md`
- `functions-cache-policy-spec.md`

---

## Template B — Tenant-scoped mutation (no-store) (e.g. cart mutations)

- Parse JSON body.
- `tenant = resolveTenantContext(...)`
- `auth = public_or_user` depending on endpoint (buyer identity likely user).
- Execute mutation.
- Return using `jsonNoStore(...)`.

---

## Template C — Admin endpoint (no-store, admin tier)

- `tenant = resolveTenantContext(...)`
- `auth = requireAdmin(...)` (implementation-defined; tiered guard)
- Execute read/write (Supabase service role).
- Return using `jsonNoStore(...)`.

Motivation:
- Gap report shows many admin endpoints have no visible auth cues: `contract-gaps-report-v1.1.md`

---

## Template D — Integration endpoint (Shopify webhooks / OAuth)

- Verify signature/HMAC first:
  - webhooks: `verifyShopifyWebhook(...)`
  - oauth callback: `verifyShopifyHmac(...)`
- Resolve tenant mapping deterministically:
  - from host if applicable
  - or from provider payload (store domain) → tenant_integrations lookup (future)
- Return `no-store`.

Evidence helpers exist:
- `artifacts/snapshots/functions-_lib-shopifyWebhooks.ts.head160.txt`
- `artifacts/snapshots/functions-_lib-shopifyOAuth.ts.head160.txt`

