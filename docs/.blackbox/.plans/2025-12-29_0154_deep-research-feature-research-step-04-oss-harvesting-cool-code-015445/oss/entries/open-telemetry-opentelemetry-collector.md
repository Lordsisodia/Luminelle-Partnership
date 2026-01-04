# OSS Project Entry

## Identity

- Name: OpenTelemetry Collector
- Repo: https://github.com/open-telemetry/opentelemetry-collector
- Full name: open-telemetry/opentelemetry-collector
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- A vendor-neutral pipeline for ingesting, processing, and exporting telemetry (logs/metrics/traces)
- A solid foundation for “artifact access is auditable”:
  - emit structured access logs for artifact views/downloads
  - normalize and route them to our storage/analytics backend
- A place to implement org-wide processors (filtering/redaction) before logs are stored

## What feature(s) it maps to

- Access audit logs for upgrade evidence artifacts (“who viewed what, when?”)
- Standardized telemetry pipeline for internal tools (Upgrade Review UI, artifact viewers)
- Redaction processors (strip tokens, remove PII fields) before persistence

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect infrastructure. Very strong if we want consistent audit logs across services.
- Setup friction (self-host? SaaS? Docker?): Medium. Adds an ops component, but it’s standard in modern stacks.
- Data model alignment: High for a managed-service posture; auditability becomes a first-class pipeline concern.

## Adoption path

- 1 day POC:
  - Deploy a local collector (docker).
  - Emit a sample “artifact access log” event from a tiny service:
    - `user_id`, `merchant_id`, `artifact_path`, `action=view/download`, `request_id`
  - Export to a simple sink (stdout/file) to verify structure and processors.
- 1 week integration:
  - Define the canonical “ArtifactAccessEvent” schema and enforce it across:
    - Upgrade Review UI
    - Allure/Unlighthouse viewers (via proxy logs)
  - Add processors:
    - drop sensitive headers
    - redact query params
    - enforce allowlists on logged fields
  - Export to the chosen backend (OpenSearch/ClickHouse/Postgres).
  - Build a minimal “access timeline” view in admin.
- 1 month hardening:
  - Add multi-tenant partitions and retention policies per merchant.
  - Add alerting rules (unusual access volume, access from unexpected IP ranges).
  - Add correlation: connect access events to upgrade PRs and promotion approvals.

## Risks

- Maintenance risk: Medium. Another infra component to manage, tune, and upgrade.
- Security risk: Medium/High if misconfigured: logging can create a new PII surface; must enforce redaction early.
- Scope mismatch: Medium if we are satisfied with basic app logs and don’t need centralized auditing.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/open-telemetry/opentelemetry-collector
- https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector/main/LICENSE

## Score (0–100) + reasoning

- Score: 67
- Why: Strong standard foundation for making artifact access auditable and consistent; value depends on whether we want centralized telemetry versus ad-hoc logs.

