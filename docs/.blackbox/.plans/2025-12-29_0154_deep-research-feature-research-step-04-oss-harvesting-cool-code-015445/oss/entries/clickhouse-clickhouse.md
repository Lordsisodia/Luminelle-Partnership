# OSS Project Entry

## Identity

- Name: ClickHouse
- Repo: https://github.com/ClickHouse/ClickHouse
- Full name: ClickHouse/ClickHouse
- License: Apache-2.0
- Stars (approx): 44914
- Forks (approx): 8276
- Primary language: C++
- Last updated: 2025-12-30T10:03:17Z
- Topics: analytics, clickhouse, column-oriented, columnstore, database, dbms, distributed, high-performance, olap

## What it gives us (plain English)

- A high-performance OLAP database ideal for append-only event data (audit logs, integration events, product events)
- Fast filtering/aggregation over billions of rows (time series, per-tenant rollups, top actions, anomaly detection)
- A strong backbone for “activity feeds” and analytics that would overwhelm Postgres
- A common pattern for event/audit pipelines: Postgres/queue → ClickHouse for queries + dashboards

## What feature(s) it maps to

- Audit logs / event log analytics (volumes, trends, queries across long retention)
- Integration observability (failures, retry counts, latency, throughput)
- Admin “activity feed” + operational dashboards (support + internal ops)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Usually paired with a small query service/API; do not expose ClickHouse directly to the browser.
- Setup friction (self-host? SaaS? Docker?): Medium. It’s another database to run; docker for POC is easy, ops is non-trivial.
- Data model alignment: Excellent for append-only event tables; requires careful schema + partitioning (by date, tenant).

## Adoption path

- 1 day POC:
  - Run ClickHouse locally (Docker).
  - Create a single `audit_events` table with a minimal schema (timestamp, tenantId, actorId, action, resourceType, resourceId, correlationId).
  - Ingest sample data (1–10M rows) and validate query latency for key support queries.
  - Build one API endpoint: `GET /admin/audit?tenantId=...&from=...&to=...&q=...`.
- 1 week integration:
  - Define canonical event schema + redaction strategy and implement ingestion (async jobs; retries; DLQ).
  - Add retention policy and partitioning strategy; define “hot” vs “cold” storage if needed.
  - Add dashboards for: authz changes, settings changes, integration failures, workflow runs.
  - Compare with OpenSearch approach:
    - OpenSearch: search-first + viewer
    - ClickHouse: analytics-first + aggregations
- 1 month hardening:
  - Productionize ops: monitoring, backups, scaling, and runbooks.
  - Implement strict access control and query guardrails (rate limiting, max time ranges).

## Risks

- Maintenance risk: Medium–High. Operating a second database increases operational complexity.
- Security risk: Medium. Audit/event data is sensitive; enforce redaction and access boundaries.
- Scope mismatch: Medium. If event volume is low, Postgres may suffice; ClickHouse shines at high volume + long retention + aggregations.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/ClickHouse/ClickHouse
- https://raw.githubusercontent.com/ClickHouse/ClickHouse/master/LICENSE

## Score (0–100) + reasoning

- Score: 76
- Why: Excellent event/audit analytics engine, but likely premature unless we have high volume or long retention needs; best as a later-stage optimization.

---

## Repo description (from GitHub)

ClickHouse® is a free analytics DBMS for big data.
