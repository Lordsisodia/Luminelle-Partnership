# Evidence Extract — Okta System Log API + Log Streaming API (OpenAPI)

- slug: `okta-system-log-and-log-stream-openapi`
- category: audit log API + log streaming configuration APIs (SIEM export + admin automation)
- license: OpenAPI spec declares Apache-2.0 (spec). Okta product/API is SaaS; treat as product pattern reference.

## Cycle 23 — Evidence-backed primitives (code-shaped audit log export surfaces)

### Notable features (3)

1) System Log API provides a queryable, near real-time audit/event stream endpoint (`GET /api/v1/logs`) with time bounds, pagination, filters, keyword search, and ordering  
Evidence: OpenAPI (SystemLog tag) embedded in page-data: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/SystemLog/page-data.json

2) `GET /api/v1/logs` pagination is cursor-based: `after` is an opaque token and Okta returns a `rel=next` link header that includes `after`  
Evidence: OpenAPI parameter description: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/SystemLog/page-data.json

3) Log Streaming API is a first-class configuration surface with lifecycle controls: list/create/replace/delete log streams + activate/deactivate endpoints  
Evidence: OpenAPI (LogStream tag) embedded in page-data: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

### Copyable workflows (2)

1) Polling export loop (bounded or continuous): query `since`/`until` windows → follow `rel=next` with `after` → persist cursor for continuous polling export  
Evidence: `since`/`until`/`after` parameter descriptions: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/SystemLog/page-data.json

2) Admin/IaC workflow: create log stream config → activate/deactivate via lifecycle endpoints → rotate/replace config via PUT/DELETE  
Evidence: LogStreams endpoints in OpenAPI: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

### 3 steal ideas (easy / medium / hard)

- Easy: cursor-based pagination (`after`) + store “last exported cursor” per tenant.
- Medium: support both “bounded export” (since/until) and “polling export” modes with the same endpoint/UX.
- Hard: productized “log streaming configs” object model with activate/deactivate lifecycle actions and typed schemas for destination types.

### Thin-slice implementation (1–3 days)

- Day 1: implement `GET /audit/events` with `since`/`until` + `after` cursor pagination + `limit` and `sortOrder`.
- Day 2: implement `filter` and `q` semantics (start with allowlisted filters and keyword search), and return `Link: <...>; rel=\"next\"`.
- Day 3: add “export cursor state” per destination and an admin UI showing current cursor + last export attempt.

## Extra evidence: product constraint surfaced in docs

- “You can configure up to two log stream integrations per org.”  
  Evidence: pageContext SEO description: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

