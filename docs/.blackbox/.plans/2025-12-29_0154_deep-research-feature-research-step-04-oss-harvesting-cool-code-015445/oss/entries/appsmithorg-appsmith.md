# OSS Project Entry

## Identity

- Name: appsmith
- Repo: https://github.com/appsmithorg/appsmith
- Full name: appsmithorg/appsmith
- License: Apache-2.0
- Stars (approx): 38760
- Forks (approx): 4411
- Primary language: TypeScript
- Last updated: 2025-12-28T15:33:47Z
- Topics: admin-dashboard, admin-panels, app-builder, automation, crud, custom-internal, developer-tools, gui, gui-application, hacktoberfest, internal-tools, java, javascript, low-code, low-code-framework, react, self-hosted, typescript, webdevelopment, workflows

## What it gives us (plain English)

- A self-hostable low-code internal tools builder (admin panels, dashboards, workflows)
- A fast way to build “ops consoles” without building a custom React admin app from scratch
- Lots of built-in connectors (DBs/APIs) and UI widgets to move quickly
- A pragmatic option for support/ops tooling even if merchant-facing admin stays custom

## What feature(s) it maps to

- Internal ops tooling (support dashboards, data exploration, manual operations)
- Admin workflow tooling (one-off utilities, backfills, reprocessing) with guardrails
- Rapid prototyping for operational UIs

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Best as a separate internal tool. It can call our APIs/DB; we should avoid giving it direct DB superpowers unless carefully permissioned.
- Setup friction (self-host? SaaS? Docker?): Medium. It’s a full platform service; docker/k8s deploy, auth, updates.
- Data model alignment: Great for operational views and CRUD-like ops pages; less ideal for deeply customized merchant experiences.

## Adoption path

- 1 day POC:
  - Run Appsmith locally (Docker) and connect to a staging API.
  - Build 2 internal pages:
    - “Webhook deliveries viewer” (search by tenantId/correlationId; replay button calls our API)
    - “Integration health” dashboard (failed jobs, DLQ counts, last sync time)
  - Validate access control and ensure least privilege (internal only).
- 1 week integration:
  - Implement a dedicated “ops API surface” with strict RBAC + auditing (do not call raw internal endpoints).
  - Add SSO/role gating for staff and environment separation (dev/stage/prod).
  - Build a small library of shared queries/components to standardize ops tooling.
  - Add audit logging for any destructive actions triggered via Appsmith.
- 1 month hardening:
  - Add runbooks and guardrails (approval flows, break-glass access, action confirmations).
  - Add change management for Appsmith apps (versioning, review, promotion across envs).

## Risks

- Maintenance risk: Medium. It’s a platform you operate; upgrades and security patches matter.
- Security risk: High. Low-code tools can become “god-mode UIs” if they can hit DB/admin APIs; enforce strict RBAC and audit.
- Scope mismatch: Medium. Great for internal ops; not a substitute for merchant-facing admin UX and product-grade authorization.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/appsmithorg/appsmith

## Score (0–100) + reasoning

- Score: 74
- Why: Excellent internal ops accelerator with permissive license; biggest risk is governance/security, not engineering.

---

## Repo description (from GitHub)

Platform to build admin panels, internal tools, and dashboards. Integrates with 25+ databases and any API.
