# PR 4 — Cache header normalization (public endpoints)

## PR

- PR number/name: PR 4 — Normalize cache headers for public endpoints (`pr-by-pr-stop-points-plan.md`)
- Goal (1 line): make edge caching explicit and safe by adding `tenant-public` cache policy helpers and using them on cacheable endpoints (`functions-cache-policy-spec.md`)
- Stop point (from `pr-by-pr-stop-points-plan.md`): PR 4

## Gates run

- Command:
  - `./.blackbox/scripts/run-1909-loop.sh`
- Evidence:
  - `artifacts/snapshots/stop-point-metrics.latest.txt`
  - `contract-gaps-report-v1.1.md`

## Evidence snapshot deltas (what changed and why)

- `contract-gaps-report-v1.1.md`:
  - expected: section B (“missing explicit cache headers”) becomes `(none)`
  - observed: section B is `(none)`
- `artifacts/snapshots/stop-point-metrics.latest.txt`:
  - expected/observed: `contract_gaps_missing_cache=0`

- `artifacts/snapshots/functions-_lib-response.ts.head160.txt`:
  - expected: shared cache helpers exist (avoid copy/paste headers)
  - observed: `jsonTenantPublic`, `jsonNoStore`, `notModifiedTenantPublic` implemented

- `artifacts/snapshots/functions-api-experiment-config.ts.head220.txt`:
  - expected: explicit tenant-public caching + 304 path preserves cache headers
  - observed: returns `jsonTenantPublic(..., { ttlSeconds, etag })` and `notModifiedTenantPublic(...)`
- `artifacts/snapshots/functions-api-storefront-landing-sections.ts.head220.txt`:
  - expected: explicit tenant-public caching (short TTL, vary by host)
  - observed: returns `jsonTenantPublic(...)`
- `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`:
  - expected: explicit tenant-public caching for product payloads; avoid caching 400 responses
  - observed: returns `jsonTenantPublic(...)` and uses `Cache-Control: no-store` for missing-handle 400
- `artifacts/snapshots/functions-api-storefront-product-sections.ts.head220.txt`:
  - expected: explicit tenant-public caching for product sections; avoid caching 400 responses
  - observed: returns `jsonTenantPublic(...)` and uses `Cache-Control: no-store` for missing-handle 400

- `artifacts/snapshots/check-vendor-leaks.txt`:
  - expected/observed: unchanged (`disallowed_lines=0`)
- `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`:
  - expected/observed: unchanged (`0` violations)

## Notes / risks

- Cache TTLs are currently uniform (`ttlSeconds=60`) and vary-by-host is enforced via `Vary: Host` inside `jsonTenantPublic` (`artifacts/snapshots/functions-_lib-response.ts.head160.txt`)
- Next recommended work has shifted away from cache gaps; dashboard now points at remaining backend surface drift cleanup (P0.3) (`artifacts/snapshots/stop-point-metrics.latest.txt`)

