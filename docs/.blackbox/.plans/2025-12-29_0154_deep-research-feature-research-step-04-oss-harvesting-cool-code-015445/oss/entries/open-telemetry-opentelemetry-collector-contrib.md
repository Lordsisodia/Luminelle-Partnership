# OSS Project Entry

## Identity

- Name: OpenTelemetry Collector Contrib
- Repo: https://github.com/open-telemetry/opentelemetry-collector-contrib
- Full name: open-telemetry/opentelemetry-collector-contrib
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- A large set of extra receivers/processors/exporters for the OpenTelemetry Collector
- Practical power for our use case:
  - ingest logs from proxies/viewers
  - add filtering/redaction processors
  - export to whichever backend we choose (OpenSearch, S3, etc.)
- A rich source of “how to wire log pipelines” patterns without building custom glue

## What feature(s) it maps to

- Access log ingestion for artifact viewers (oauth2-proxy, nginx, app logs)
- Redaction/masking in the telemetry pipeline
- Export plumbing to search/analytics backends for audit views

## Integration notes (vibe-coding lens)

- Stack fit: Strong if we adopt OTel collector; contrib is “where the adapters live”.
- Setup friction: Medium (same as collector; careful selection of components is required).
- Data model alignment: High for audit logging and internal tool observability.

## Adoption path

- 1 day POC:
  - Stand up collector-contrib and ingest:
    - a sample access log line (proxy log)
    - a sample JSON event (artifact access event)
  - Verify we can transform/export to a sink.
- 1 week integration:
  - Pick a minimal set of components:
    - receivers for proxy/app logs
    - processors for redaction and attribute normalization
    - exporters to our chosen backend
  - Standardize labels/attributes:
    - `merchant_id`, `user_id`, `artifact_id`, `request_id`
  - Connect to an admin “access audit” view.
- 1 month hardening:
  - Add reliability controls:
    - buffering/retries
    - backpressure handling
  - Add sampling strategies for non-audit logs while keeping audit logs complete.
  - Add compliance retention policies and access controls for the logs themselves.

## Risks

- Maintenance risk: Medium. Contrib surface is large; pin versions and stay minimal.
- Security risk: Medium. Must ensure redaction happens before persistence.
- Scope mismatch: Medium if centralized telemetry is overkill early.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/open-telemetry/opentelemetry-collector-contrib
- https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/LICENSE

## Score (0–100) + reasoning

- Score: 62
- Why: Essential companion if we adopt OTel collector; best value is in reducing custom integration work for log ingestion and exports.

