# OSS Project Entry

## Identity

- Name: OpenSearch-Dashboards
- Repo: https://github.com/opensearch-project/OpenSearch-Dashboards
- Full name: opensearch-project/OpenSearch-Dashboards
- License: Apache-2.0
- Stars (approx): 1974
- Forks (approx): 1141
- Primary language: TypeScript
- Last updated: 2025-12-30T02:31:08Z
- Topics: analytics, apache2, foss, opensearch, search

## What it gives us (plain English)

- A Kibana-like UI for exploring OpenSearch indexes: search, filters, saved views, dashboards
- Fast internal “event log viewer” capability if we index audit events into OpenSearch
- Ready-made visualizations to build ops dashboards (volumes, error spikes, “who did what” trends)
- A pragmatic internal tool for support/ops even if our merchant-facing admin has its own UX

## What feature(s) it maps to

- Audit logs / event log viewer (internal ops + support)
- Operational dashboards (job runs, webhook failures, integration errors)
- Investigations/debugging (correlate `requestId`/`correlationId` across events)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Best used as an internal ops UI; keep merchant UI separate. Can coexist with our React admin.
- Setup friction (self-host? SaaS? Docker?): Medium. Requires OpenSearch cluster + Dashboards + auth/security configuration.
- Data model alignment: Works well if we define an explicit `audit_events` index mapping (tenantId, actor, action, resource, before/after refs, correlationId, timestamp).

## Adoption path

- 1 day POC:
  - Run OpenSearch + OpenSearch Dashboards locally (Docker Compose).
  - Create an `audit_events` index and ingest 200–1k sample events (JSON).
  - Create index pattern, a few saved searches (by `tenantId`, `actorId`, `action`) and a basic dashboard (events over time + top actions).
  - Validate that we can restrict access (SSO/RBAC) to internal staff only.
- 1 week integration:
  - Define the canonical audit event schema and mapping (including redaction rules).
  - Build ingestion pipeline from our app into OpenSearch (async queue; retries; DLQ).
  - Create a standard set of dashboards for: authz changes, settings changes, integrations/webhooks, workflow runs.
  - Decide embedding strategy:
    - Internal ops: use Dashboards directly
    - Merchant-facing: build our own viewer UI backed by a safe “audit query API”
  - Add retention, ILM-style index rotation, and export flows.
- 1 month hardening:
  - Add SLOs + monitoring for ingestion lag, query latency, and cluster health.
  - Implement strict access control + tenant isolation at the query layer (never expose raw OpenSearch DSL to the browser).

## Risks

- Maintenance risk: Medium–High. OpenSearch clusters and dashboards need ops maturity (upgrades, scaling, backups).
- Security risk: High if misconfigured. Audit logs contain sensitive data; lock down network + auth; enforce redaction.
- Scope mismatch: Medium. Great internal ops tool; avoid making it the primary merchant-facing audit UX unless we’re comfortable exposing it.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/opensearch-project/OpenSearch-Dashboards

## Score (0–100) + reasoning

- Score: 72
- Why: Great “instant event viewer” for internal ops if we adopt OpenSearch; still carries meaningful ops + security surface.

---

## Repo description (from GitHub)

OpenSearch Dashboards is the visualization tool for OpenSearch.
