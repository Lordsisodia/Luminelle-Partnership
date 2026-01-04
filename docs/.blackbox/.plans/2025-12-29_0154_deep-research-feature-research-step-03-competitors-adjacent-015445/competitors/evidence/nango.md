# Evidence Extract — Nango

- slug: `nango`
- category: integration auth + sync/workflow primitives (OSS-ish)
- license: Elastic License 2.0 (ELv2) — restrictive (not permissive)

## Cycle 2 — Evidence-backed primitives (connections + sync status + environments)

### Notable features (3)

1) Connections are first-class API objects (create/list/get/update/delete)  
Evidence: https://nango.dev/docs/reference/api/connections/list

2) Syncs as a first-class “use case” with guidance for continuous data sync  
Evidence: https://nango.dev/docs/guides/use-cases/syncs

3) Sync status as an explicit API surface (operability primitive)  
Evidence: https://nango.dev/docs/reference/api/sync/status

### Copyable workflows (2)

1) Connection lifecycle: list connections → create/authorize → monitor connection state via your UI  
Evidence (connections API): https://nango.dev/docs/reference/api/connections/post  
Evidence (connections list): https://nango.dev/docs/reference/api/connections/list

2) Operate syncs: start/trigger → observe status → remediate  
Evidence (sync status): https://nango.dev/docs/reference/api/sync/status  
Evidence (sync start): https://nango.dev/docs/reference/api/sync/start

### 3 steal ideas (easy / medium / hard)

- Easy: treat “connections” as a shared platform primitive reused by all integrations and workflows.
- Medium: make “sync status” visible to ops/merchant users (last success, lag, records processed).
- Hard: adopt Nango directly given ELv2 constraints for a hosted SaaS product.

### Thin-slice implementation (1–3 days)

- Day 1: `connections` object + UI (status, provider, created_at, last_auth_refresh_at).
- Day 2: `syncs` object + status dashboard (last run, next run, lag, error reason).
- Day 3: add environment separation (dev/staging/prod) inspired by Nango “environments” concept.  
  Evidence (environments): https://nango.dev/docs/guides/platform/environments

## License evidence

- ELv2 text: https://raw.githubusercontent.com/NangoHQ/nango/master/LICENSE

