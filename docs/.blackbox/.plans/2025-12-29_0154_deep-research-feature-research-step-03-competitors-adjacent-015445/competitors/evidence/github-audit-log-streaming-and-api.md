# Evidence Extract — GitHub Enterprise Cloud Audit Log (streaming + API)

- slug: `github-audit-log-streaming-and-api`
- category: audit log streaming destinations + export + configuration APIs (SIEM/storage)
- license: proprietary SaaS docs (GitHub). Use as pattern reference only (not code).

## Cycle 22 — Evidence-backed primitives (audit log streaming as a first-class admin product)

### Notable features (3)

1) Supports streaming audit logs to multiple destination types (storage, event bus, SIEM/log tooling) including Amazon S3, Azure Blob Storage, Azure Event Hubs, Datadog, Splunk, Google Cloud Storage  
Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise

2) Provides a connectivity validation step (“Check endpoint”) when configuring destinations (reduces setup friction + support load)  
Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise

3) Exposes a configuration API surface for streaming: stream key retrieval (public key for encrypting secrets) + CRUD for stream configs (`/audit-log/streams`) + provider-specific `stream_type` and `stream_details`  
Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

### Copyable workflows (2)

1) Admin setup workflow: choose provider → enter credentials/connection info → “Check endpoint” → stream begins → verify events arrive in destination  
Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise

2) Infra-as-code workflow: list stream configs → create/update/pause/resume/delete via API → manage secret encryption using stream key endpoint  
Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

### 3 steal ideas (easy / medium / hard)

- Easy: “Check endpoint” button for any outbound sink configuration (webhook, SIEM, storage) + show what was validated.
- Medium: provider abstraction: `stream_type` + typed `stream_details` schemas + status (`enabled/paused`) and last_success/last_error.
- Hard: key management UX: fetch public key for encrypting secrets + rotate secrets with audit trail and non-breaking updates.

### Thin-slice implementation (1–3 days)

- Day 1: implement `destinations` config (webhook + one storage provider) with “Check endpoint” (connectivity + auth + write permission).
- Day 2: add run history for destination writes (success/failure + response/error).
- Day 3: add minimal config API endpoints (list/create/update/pause/delete) and audit events for config changes.

