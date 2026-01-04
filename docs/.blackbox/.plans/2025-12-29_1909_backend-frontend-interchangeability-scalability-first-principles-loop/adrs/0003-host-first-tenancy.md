# ADR 0003 — Host-first tenancy (auth restricts; does not override)

Status:
- Accepted (already codified in this plan; implement/verify later)

Decision:
- Tenant context is resolved server-side from the effective host first.
- Auth claims restrict which tenant actions are allowed, but do not silently override host-based tenant selection.

Evidence:
- Tenancy rule set is codified as a plan invariant (host-first, cache-safe):  
  - `tenancy-context-rules.md`
- This is baked into the backend contract expectations (tenant required for `/api/*`):  
  - `backend-boundary-contract-v1.md`

Consequences:
- Pros:
  - Cache-safe multi-tenancy (host is part of cache key).
  - Predictable routing for storefront and admin.
  - Avoids “cross-tenant surprise” where auth silently switches tenant.
- Cons:
  - Requires careful domain management and tenant-domain registry.

