# OSS Project Entry

## Identity

- Name: pgaudit
- Repo: https://github.com/pgaudit/pgaudit
- Full name: pgaudit/pgaudit
- License: PostgreSQL License (per LICENSE; GitHub API may show NOASSERTION)
- Stars (approx): 1574
- Forks (approx): 229
- Primary language: C
- Last updated: 2025-12-29T15:39:40Z
- Topics: audit, auditing, database, extension, postgres, postgresql, security

## What it gives us (plain English)

- A Postgres extension for generating detailed audit logs at the database layer
- An “always-on” safety net: we can record sensitive DB actions even if application logging is incomplete
- Strong complement to app-level audit events:
  - DB-level audit (what SQL actions happened)
  - App-level audit (who/why/what business object changed)

## What feature(s) it maps to

- Audit logs (DB-level auditing, compliance posture)
- Security investigations (who accessed what tables, what actions were taken)
- Admin governance (“prove what changed”)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Backend-only. UI consumes our own audit log API; pgaudit emits DB audit records we must route to storage/viewer.
- Setup friction (self-host? SaaS? Docker?): Medium. Requires enabling a Postgres extension and configuring audit settings carefully to avoid noise/overhead.
- Data model alignment: Good for compliance and forensic logs; not a replacement for product audit logs (it doesn’t know “actor intent” unless we propagate metadata).

## Adoption path

- 1 day POC:
  - Enable `pgaudit` in a dev Postgres instance and configure minimal auditing for critical tables.
  - Generate a few writes/reads and confirm audit records are produced.
  - Decide where audit output goes (Postgres logs? table? external log sink).
  - Verify overhead and log volume for typical traffic.
- 1 week integration:
  - Define what must be audited (tables/actions) vs what must not (to avoid sensitive data leakage).
  - Propagate request context into DB session variables where possible (requestId, actorId) so audits can correlate.
  - Route DB audit logs into the same event pipeline as app audit events (OpenSearch/ClickHouse/log sink).
  - Build internal “investigation” dashboards (queries for sensitive actions).
- 1 month hardening:
  - Tune configuration for performance and signal/noise.
  - Formalize retention and access controls (DB audit logs are highly sensitive).
  - Add runbooks for incident response and compliance exports.

## Risks

- Maintenance risk: Medium. Requires careful configuration and ongoing tuning across environments.
- Security risk: Medium–High. Audit logs can leak sensitive values if not redacted/filtered; access must be tightly controlled.
- Scope mismatch: Medium. DB auditing is not the same as product audit logs; treat it as a compliance/forensics layer.
- License risk: Low. PostgreSQL License (per upstream LICENSE text).

## Sources

- https://github.com/pgaudit/pgaudit
- https://raw.githubusercontent.com/pgaudit/pgaudit/main/LICENSE

## Score (0–100) + reasoning

- Score: 71
- Why: Great compliance/forensics primitive if we need DB-level guarantees; requires careful configuration and is not a substitute for app-level audit events.

---

## Repo description (from GitHub)

PostgreSQL Audit Extension.
