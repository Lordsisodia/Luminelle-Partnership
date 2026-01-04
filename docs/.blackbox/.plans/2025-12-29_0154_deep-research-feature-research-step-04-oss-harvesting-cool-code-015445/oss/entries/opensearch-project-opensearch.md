# OSS Project Entry

## Identity

- Name: OpenSearch
- Repo: https://github.com/opensearch-project/OpenSearch
- Full name: opensearch-project/OpenSearch
- License: Apache-2.0
- Primary language: Java (expected; verify)
- Topics: search, search-engine, opensearch

## What it gives us (plain English)

- A permissive, self-hostable search engine we can run as a **service boundary**.
- A safer default than “source-available” alternatives for production embedding.
- A scalable index/query backend for **append-only event streams** (audit logs, integration events, workflow runs).
- A foundation for “log-like” queries (time range + filters + full-text) without hand-rolling a bespoke viewer.

## What feature(s) it maps to

- Search + merchandising rules (synonyms/boost/bury)
- Admin search UX primitives (query UI, rules UI, analytics)
- Audit logs / event log storage (index audit events for fast filtering)
- Operational error/event views (webhook failures, job runs, integration sync status)

## Integration notes (vibe-coding lens)

- Stack fit: run as separate service; our admin calls our own search API.
- Setup friction: medium (cluster + indexes), but well-known patterns.
- Data alignment: index products/collections/customers/orders depending on scope.

## Adoption path

- 1 day POC:
  - Run OpenSearch locally (Docker) and create two indexes:
    - `products` (small sample) to validate search basics
    - `audit_events` (sample events) to validate event-log querying
  - Implement a tiny ingestion script for audit events (JSON documents).
  - Prove key queries: time range + tenantId + actorId + action + resource.
- 1 week integration:
  - Define index mappings + conventions (IDs, timestamps, correlationId, redaction rules).
  - Build an ingestion pipeline (async queue; retries; DLQ) from app → OpenSearch.
  - Add a safe query API (no raw OpenSearch DSL from browser) and rate limits.
  - Pair with a viewer:
    - internal: OpenSearch Dashboards
    - merchant-facing: our own UI backed by the safe query API
- 1 month hardening:
  - Add retention/index rotation, monitoring, backups, and scaling runbooks.
  - Add access control boundaries (network, auth, per-tenant isolation enforced by API).

## Risks

- Maintenance risk: operational burden (running a search cluster).
- Security risk: avoid direct exposure; protect query endpoints; prevent injection via DSL.
- Scope mismatch: don’t build a full “Algolia clone” early.
- License risk: low if Apache-2.0 confirmed; verify before adoption.

## License notes (evidence-first)

- Proof file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-opensearch-project-opensearch.txt`

## Sources

- https://github.com/opensearch-project/OpenSearch

## Score (0–100) + reasoning

- Score: 74
- Why: Strong building block for event/audit querying if we accept the ops cost; best paired with a safe query API and an internal viewer.
