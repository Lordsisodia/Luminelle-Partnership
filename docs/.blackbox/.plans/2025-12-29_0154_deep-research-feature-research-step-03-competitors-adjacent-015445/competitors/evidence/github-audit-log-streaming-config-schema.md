# Evidence Extract — GitHub Enterprise Cloud Audit Log Streaming (config schema + encryption + endpoint validation)

- slug: `github-audit-log-streaming-config-schema`
- category: audit log streaming destinations + config schema + secret encryption + endpoint validation
- license: proprietary SaaS docs (GitHub). Use as pattern reference only (not code).

## Cycle 23 — Evidence-backed primitives (stream config object model)

### Notable features (3)

1) Streaming configuration is a first-class object with a provider discriminator (`stream_type`) and typed details (`stream_details`)  
Evidence: GitHub REST docs for audit log streaming config: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

2) Stream configuration includes an `enabled` field and exposes `paused_at` in responses (implies lifecycle/state)  
Evidence: response schema fields listed in REST docs: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

3) Provider-specific config schemas exist (Azure Blob, Azure Event Hubs, Amazon S3 OIDC, Amazon S3 access keys, Splunk, Google Cloud Storage, Datadog) with a common pattern of `key_id` for encrypted secrets  
Evidence: provider schema sections in REST docs: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

### Copyable workflows (2)

1) Secure config creation: fetch stream key → encrypt secrets → create stream config → verify delivery  
Evidence: stream key endpoint + create stream config endpoint in REST docs: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

2) Ops lifecycle: pause/resume by toggling `enabled` + track `paused_at` and last delivery attempts (implied by state fields)  
Evidence: `enabled` and `paused_at` fields described in REST docs: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

### 3 steal ideas (easy / medium / hard)

- Easy: treat “stream configs” as first-class objects with a provider discriminator and typed config details.
- Medium: add an encryption step and record which key/version was used (`key_id`) so secret rotation is auditable.
- Hard: unify UI “Check endpoint” validation (GitHub UI docs) with API-managed stream config (IaC) so both paths converge on the same backend.

### Thin-slice implementation (1–3 days)

- Day 1: implement `audit_stream_configs` object model (`stream_type`, `enabled`, `details` JSON, `created_by`, `updated_at`).
- Day 2: implement typed config validation per `stream_type` + “Check endpoint” connectivity test.
- Day 3: implement secret encryption/rotation and emit audit events for every config lifecycle change.

