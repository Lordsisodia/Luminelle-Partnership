# Per-Tenant Token Loader (spec draft)

Use case
- Multi-tenant or reseller brands need their own token JSON applied at runtime.

Flow
1) Determine tenant: from domain, query param, or user session.
2) Fetch brand token JSON (CDN or API): `/tokens/{tenant}.json`.
3) Cache in localStorage with `version`/etag; use cached copy on next load; refresh in background.
4) Apply via `applyBrandTheme(tokens)` before app render; fallback to default tokens on failure.

API contract
- JSON matches `tokens.schema.json` (base + semantic + optional modes).
- Response headers: `ETag`/`Last-Modified` for cache validation.

Error handling
- If fetch fails → fall back to default tokens and log once.
- If validation fails → discard and fallback; optionally report to Sentry.

Security
- Tokens are public brand data; no secrets. Host on CDN with immutable caching and hashed filenames.

Open items
- Where to store brand JSON (Shopify metafield vs internal CDN).
- Maximum size budget (target <10KB gzipped).
