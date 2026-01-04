# ADR 0005 — Backend-first Supabase access (service role as default)

Status:
- Proposed (docs-only phase; implement later)

Decision:
- For tenant-owned data, the default access path is:
  - Cloudflare `/api/*` (service-role Supabase client)
  - backend enforces tenant scope
  - RLS is defense-in-depth

Context / problem:
- Direct Supabase access from the browser can couple UI to:
  - table schemas
  - RLS policy logic
  - auth provider claims
- That coupling makes “frontend swappable” much harder.

Evidence:
- The plan’s recommended posture is documented in: `supabase-rls-multitenancy-strategy.md`
- A service-role Supabase helper exists in functions today:  
  - `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

Consequences:
- Pros:
  - UI stays plug-in friendly (HTTP+JSON boundary).
  - Tenant enforcement can be centralized and audited.
  - Easier to evolve schemas without breaking frontends.
- Cons:
  - Requires good backend ergonomics for all data access.
  - Client-side realtime needs a deliberate exception mechanism.

