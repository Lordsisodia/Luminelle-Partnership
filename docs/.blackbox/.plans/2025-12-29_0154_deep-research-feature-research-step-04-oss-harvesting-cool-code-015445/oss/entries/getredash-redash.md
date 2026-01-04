# OSS Project Entry

## Identity

- Name: redash
- Repo: https://github.com/getredash/redash
- Full name: getredash/redash
- License: BSD-2-Clause
- Stars (approx): 28108
- Forks (approx): 4537
- Primary language: Python
- Last updated: 2025-12-28T17:52:22Z
- Topics: analytics, athena, bi, bigquery, business-intelligence, dashboard, databricks, hacktoberfest, javascript, mysql, postgresql, python, redash, redshift, spark, spark-sql, visualization

## What it gives us (plain English)

- A SQL-first dashboarding tool for internal analytics and investigations
- A quick way to build “event log analytics” views without building custom UI
- A practical place to centralize operational queries (webhook failures, job runtimes, integration health)
- Sharing and permissions around queries/dashboards (internal governance)

## What feature(s) it maps to

- Audit/event investigations (internal support/ops)
- Operational dashboards (integrations, jobs, webhook delivery)
- “Query library” for recurring debugging tasks

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Best as an internal tool; connect to Postgres/warehouse/event DB. Keep merchant admin separate.
- Setup friction (self-host? SaaS? Docker?): Medium. It’s a service (DB, workers); typically docker-compose friendly.
- Data model alignment: Works well if we keep clean tables/views for `audit_events`, `webhook_deliveries`, `job_runs`.

## Adoption path

- 1 day POC:
  - Run Redash locally and connect it to staging Postgres.
  - Create 3 saved queries for ops:
    - “webhook deliveries failing in last 24h”
    - “tenants with highest retry counts”
    - “most frequent audit actions”
  - Create one dashboard and share it with a small internal group.
- 1 week integration:
  - Formalize a set of curated operational queries with owners and documentation.
  - Add deep-link patterns from our admin to Redash with prefilled filters (tenantId/correlationId).
  - Add access controls, data redaction, and environment separation (dev/stage/prod).
  - Add alerting for query-based thresholds (if used).
- 1 month hardening:
  - Add governance and review flow for “production dashboards”.
  - Add backups and monitoring, and lock down network access.

## Risks

- Maintenance risk: Medium. BI tooling requires upkeep; lower complexity than some alternatives but still a service.
- Security risk: High. Query tools can expose sensitive data; treat as internal-only and enforce least privilege.
- Scope mismatch: Medium. It complements a product audit viewer; doesn’t replace product-grade UX and permissions.
- License risk: Low (BSD-2-Clause).

## Sources

- https://github.com/getredash/redash

## Score (0–100) + reasoning

- Score: 66
- Why: Very useful internal investigation tool with permissive license; best ROI when paired with a clean event schema and strict internal access controls.

---

## Repo description (from GitHub)

Make Your Company Data Driven. Connect to any data source, easily visualize, dashboard and share your data.
