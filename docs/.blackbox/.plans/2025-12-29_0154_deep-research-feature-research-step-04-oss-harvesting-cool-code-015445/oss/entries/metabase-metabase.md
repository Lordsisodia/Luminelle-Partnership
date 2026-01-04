# OSS Project Entry

## Identity

- Name: metabase
- Repo: https://github.com/metabase/metabase
- Full name: metabase/metabase
- License: AGPL-3.0
- Stars (approx): 45330
- Forks (approx): 6133
- Primary language: Clojure
- Last updated: 2025-12-28T17:51:23Z
- Topics: analytics, bi, business-intelligence, businessintelligence, clojure, dashboard, data, data-analysis, data-visualization, database, metabase, mysql, postgres, postgresql, reporting, slack, sql-editor, visualization

## What it gives us (plain English)

- A very approachable BI tool for internal analytics and investigations
- A fast way to explore “event-like” tables (audit events, webhook deliveries, job runs) without building custom UI
- Dashboards and saved questions that can become the internal “support console” for data-driven troubleshooting
- A good way to validate what our product audit log *should* show before we build bespoke UI

## What feature(s) it maps to

## License notes (evidence-first)

- Proof file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-metabase-metabase.txt`
- License is copyleft (AGPL-3.0). Treat as “flag” under our preferred permissive posture.

- Implication: likely internal-only use (if at all) unless legal approves AGPL; still useful for patterns and prototypes.

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Best as internal BI tool connected to Postgres/warehouse. Do not embed into merchant-facing admin unless licensing and data controls are resolved.
- Setup friction (self-host? SaaS? Docker?): Medium. Docker-friendly but still a service with auth and data governance needs.
- Data model alignment: Works well if we have clean tables/views for `audit_events`, `webhook_deliveries`, and `job_runs`.

## Adoption path

- 1 day POC:
  - Run Metabase locally and connect to staging Postgres.
  - Create 3 “questions” useful for support: failed webhooks, integration errors, recent admin changes.
  - Validate row-level access expectations (likely internal-only).
- 1 week integration:
  - Create curated dashboards and document the canonical queries.
  - Add strict internal SSO/RBAC and isolate environments.
  - Add redaction and least-privilege DB credentials; consider read-only replicas.
- 1 month hardening:
  - Add governance for dashboard changes, backups, and alerting workflows.

## Risks

- Maintenance risk: Medium. BI tools require ongoing updates and governance.
- Security risk: High. Query access can expose sensitive tenant data; lock down strictly.
- Scope mismatch: Medium. Useful for internal investigations; not a replacement for product audit viewer UX.
- License risk: High. AGPL-3.0 is restrictive; treat as “flag” unless approved.

## Sources

- https://github.com/metabase/metabase
- https://raw.githubusercontent.com/metabase/metabase/master/LICENSE-AGPL.txt

## Score (0–100) + reasoning

- Score: 52
- Why: Great internal exploration UX, but AGPL makes it a license risk for permissive-first adoption; still valuable as a prototype/pattern reference.

---

## Repo description (from GitHub)

The easy-to-use open source Business Intelligence and Embedded Analytics tool that lets everyone work with data :bar_chart:
