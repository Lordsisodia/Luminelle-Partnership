# Evidence Extract — Okta Log Streaming destination schemas (typed provider configs)

- slug: `okta-logstream-destination-schemas`
- category: log streaming destination schemas + config lifecycle endpoints
- license: OpenAPI spec declares Apache-2.0; Okta service is SaaS (pattern reference).

## Cycle 24 — Evidence-backed primitives (destination configs as typed schemas)

### Notable features (3)

1) Log Streaming supports a provider-type discriminator with explicit supported providers (`aws_eventbridge`, `splunk_cloud_logstreaming`)  
Evidence: `LogStreamType` enum and description in OpenAPI: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

2) Okta exposes meta schema endpoints for log stream configuration, including list schemas and retrieve a schema by type (`/api/v1/meta/schemas/logStream` and `/api/v1/meta/schemas/logStream/{logStreamType}`)  
Evidence: OpenAPI paths: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

3) Log stream configs have lifecycle endpoints separate from CRUD (`/api/v1/logStreams/{logStreamId}/lifecycle/activate` and `/lifecycle/deactivate`)  
Evidence: OpenAPI paths: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

### Copyable workflows (2)

1) UI config builder driven by schemas: list destination schemas → show provider-specific required fields → validate → create stream → activate  
Evidence: meta schema and create/activate endpoints present in OpenAPI: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

2) IaC lifecycle management: create/replace log stream configs via API → activate/deactivate without deleting → rotate/replace destination settings safely  
Evidence: CRUD + lifecycle endpoints present in OpenAPI: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

### 3 steal ideas (easy / medium / hard)

- Easy: publish destination schemas behind “list schemas” endpoints so frontends can be schema-driven.
- Medium: add activate/deactivate lifecycle endpoints separate from update/delete (safer ops workflows).
- Hard: enforce platform-level limits on number of destinations (Okta notes “up to two log stream integrations per org” in the pageContext description): https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

### Thin-slice implementation (1–3 days)

- Day 1: implement `destinations` with `type` enum and `settings` JSON; add `GET /destinations/schemas` and `GET /destinations/schemas/:type`.
- Day 2: implement activation lifecycle (`POST /destinations/:id/activate`, `/deactivate`) + “last delivery status”.
- Day 3: add hard limits (max N destinations per tenant) + audit events when destinations change state.

