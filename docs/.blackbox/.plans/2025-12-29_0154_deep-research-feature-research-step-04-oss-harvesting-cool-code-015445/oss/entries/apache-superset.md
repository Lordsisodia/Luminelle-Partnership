# OSS Project Entry

## Identity

- Name: superset
- Repo: https://github.com/apache/superset
- Full name: apache/superset
- License: Apache-2.0
- Stars (approx): 69556
- Forks (approx): 16392
- Primary language: TypeScript
- Last updated: 2025-12-28T20:40:10Z
- Topics: analytics, apache, apache-superset, asf, bi, business-analytics, business-intelligence, data-analysis, data-analytics, data-engineering, data-science, data-visualization, data-viz, flask, python, react, sql-editor, superset

## What it gives us (plain English)

- A full BI “explore and dashboard” product we can self-host for internal ops + analytics
- A SQL-first data exploration UI that can sit on top of Postgres (and other sources)
- A fast way to build internal “audit log analytics” dashboards if we write audit events into queryable tables
- A mature permissions model for dashboards/charts (separate from our product RBAC)

## What feature(s) it maps to

- Audit/event analytics dashboards (internal ops + support investigations)
- Admin operational reporting (webhook failures over time, top failing tenants, job backlog)
- “Who did what” reporting if we store audit events in DB (and redact safely)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Best as an internal tool. It queries databases; do not expose it as the merchant-facing admin.
- Setup friction (self-host? SaaS? Docker?): Medium–High. It’s a full platform (workers, caching, DB connections, auth).
- Data model alignment: Works best if we model events as append-only tables (e.g., `audit_events`, `webhook_deliveries`, `job_runs`) with clean schemas.

## Adoption path

- 1 day POC:
  - Run Superset locally and connect it to a staging Postgres.
  - Create one table/view `audit_events` and build 2 charts:
    - events over time (by tenantId)
    - top actions / top failing integrations
  - Validate access controls (internal-only) and confirm we can limit data exposure.
- 1 week integration:
  - Formalize the event/audit schema and create stable views for Superset consumption.
  - Add dashboards for “webhook reliability” and “integration health”.
  - Add a “support playbook” linking from admin tickets → Superset dashboards (via correlationId filters).
  - Add retention policy and redaction rules at the data layer.
- 1 month hardening:
  - Productionize deployment and updates; add monitoring/backups.
  - Add governance for who can create/edit dashboards; audit dashboard changes.

## Risks

- Maintenance risk: Medium–High. Operating a BI platform is non-trivial (auth, upgrades, perf).
- Security risk: High. BI tools can expose sensitive data if schemas/permissions are lax.
- Scope mismatch: Medium. Excellent internal analytics; not a replacement for a product-grade audit log viewer UX.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/apache/superset

## Score (0–100) + reasoning

- Score: 68
- Why: Strong internal audit/event analytics option with permissive license, but heavier ops and not the primary merchant-facing audit viewer.

---

## Repo description (from GitHub)

Apache Superset is a Data Visualization and Data Exploration Platform
