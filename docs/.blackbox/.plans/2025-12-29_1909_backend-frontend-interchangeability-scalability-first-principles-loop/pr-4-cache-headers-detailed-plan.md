# PR 4 — Cache Headers Normalization (detailed plan)

Scope: **plan-only** (no `src/` or `functions/` changes in this PR doc).

This PR makes public endpoints explicitly cacheable **at the edge** (tenant-safe) and makes the cache policy mechanically enforceable (so a frontend swap can rely on it).

---

## Why PR 4 exists (first principles)

If the frontend is swappable, the backend boundary must:
- declare which endpoints are cacheable and how, and
- enforce cache safety (no cross-tenant leaks).

Contract requirements:
- Public endpoints MUST set `Cache-Control` explicitly.
- Tenant-public endpoints must be tenant-safe (host-first) and cache-partitioned.  
Source: `backend-boundary-contract-v1.md`

Evidence that several edge-cacheable endpoints currently lack explicit cache policy (heuristic):
- `contract-gaps-report-v1.1.md` (section B)
- Extracted scope list: `artifacts/snapshots/pr4-cache-missing-endpoints.list.txt`

Evidence that the current response helper does not provide cache helpers yet (so endpoints likely default to “no explicit policy”):
- `artifacts/snapshots/functions-_lib-response.ts.head160.txt`

---

## Target outcome (PR 4 acceptance checks)

After the implementation PR (not this doc) lands:

- `contract-gaps-report-v1.1.md` section **B** should be **(none)**.
- `stop-point-status-dashboard.md` should show:
  - “Contract gaps (missing cache headers, heuristic): `0`”
- The cache policy for each public endpoint is:
  - explicit (`Cache-Control`)
  - tenant-safe (`Vary: Host` or equivalent cache key partitioning)

---

## Scope: endpoints to change

Current “missing explicit cache policy” list (from the gaps report):
- `artifacts/snapshots/pr4-cache-missing-endpoints.list.txt`

As of the latest evidence, that includes:
- `functions/api/experiment/config.ts`
  - Evidence: `artifacts/snapshots/functions-api-experiment-config.ts.head220.txt`
- `functions/api/storefront/landing/sections.ts`
  - Evidence: `artifacts/snapshots/functions-api-storefront-landing-sections.ts.head220.txt`
- `functions/api/storefront/product/by-handle.ts`
  - Evidence: `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
- `functions/api/storefront/product/sections.ts`
  - Evidence: `artifacts/snapshots/functions-api-storefront-product-sections.ts.head220.txt`

Intentionally not in scope:
- `experiment/track` is **no-store** (event ingest) and should never be edge cached.  
  Contract section: `backend-boundary-contract-v1.md` (3.9)

---

## Mechanism: how to implement cache policy safely

PR 4 should **not** hand-roll cache headers in every endpoint.

Instead:
- Add (or use, if added in PR 1) response helpers in `functions/_lib/response.ts`:
  - `jsonTenantPublic(data, { ttlSeconds, etag? }, init?)`
  - `jsonNoStore(data, init?)`

Spec source:
- `functions-cache-policy-spec.md`

This makes cache behavior:
- consistent
- grep-able
- enforceable by the cue scans

---

## Recommended cache semantics (v1)

### 1) `storefront/landing/sections` (tenant-public)

Current behavior:
- Fetches Shopify metaobjects and returns JSON with no explicit cache policy.  
  Evidence: `artifacts/snapshots/functions-api-storefront-landing-sections.ts.head220.txt`

Required behavior:
- `Cache-Control: public, s-maxage=<ttl>, max-age=<ttl>` (edge-cacheable)
- `Vary: Host` (tenant-safe)

Recommended initial TTL:
- `ttlSeconds = 60` (short TTL; safe and effective for load shedding)

### 2) `storefront/product/by-handle` (tenant-public)

Current behavior:
- Queries Shopify product data and returns JSON with no explicit cache policy.  
  Evidence: `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`

Required behavior:
- Same as above (`tenant-public`, TTL ~60s, `Vary: Host`)

### 3) `storefront/product/sections` (tenant-public)

Current behavior:
- Queries Shopify metafield sections and returns JSON with no explicit cache policy.  
  Evidence: `artifacts/snapshots/functions-api-storefront-product-sections.ts.head220.txt`

Required behavior:
- Same as above (`tenant-public`, TTL ~60s, `Vary: Host`)

### 4) `experiment/config` (tenant-public + ETag)

Current behavior:
- Generates and returns an `ETag`, but does not set `Cache-Control`.  
  Evidence: `artifacts/snapshots/functions-api-experiment-config.ts.head220.txt`

Required behavior:
- Keep `ETag` / `If-None-Match` support for conditional requests.
- Add explicit `Cache-Control` and `Vary: Host` (tenant-safe).

Recommended TTL:
- `ttlSeconds = 60` (or `30` if experiments update frequently)

---

## Evidence deltas expected after PR 4 (when implemented)

After implementation:
- `artifacts/snapshots/functions-api-cache-cues.rg.txt` gains matches for `Cache-Control` and/or `jsonTenantPublic(` in the scoped files.
- `contract-gaps-report-v1.1.md` section B becomes `(none)`.

Run:
- `./.blackbox/scripts/refresh-1909-all-gates.sh`
- `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

