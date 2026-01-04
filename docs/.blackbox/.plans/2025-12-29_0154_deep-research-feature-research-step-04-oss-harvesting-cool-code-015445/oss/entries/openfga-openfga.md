# OSS Project Entry

## Identity

- Name: openfga
- Repo: https://github.com/openfga/openfga
- Full name: openfga/openfga
- License: Apache-2.0
- Stars (approx): 4585
- Forks (approx): 336
- Primary language: Go
- Last updated: 2025-12-29T19:59:18Z
- Topics: abac, authorization, entitlements, fga, fine-grained-access-control, fine-grained-authorization, go, golang, hacktoberfest, openfga, pbac, permissions, rbac, rebac, security, zanzibar

## What it gives us (plain English)

- A production-grade authorization service inspired by Google Zanzibar (relationship-based access control)
- A central, language-agnostic “permissions brain” with a clear API for checking access
- Flexible modeling for complex org/tenant structures (users ↔ roles ↔ resources ↔ groups ↔ inheritance)
- A way to avoid implementing and duplicating fine-grained permissions logic in every service

## What feature(s) it maps to

- RBAC / permissions (especially if permissions become complex over time)
- Multi-tenant admin authorization (tenant, org, team models)
- “Sharing” and delegated access (support access, contractors, per-resource grants)
- Auditable permission changes (tuple writes become first-class audit events)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Best enforced at the API boundary; UI asks the API what actions are allowed. Works with any identity provider (JWT/OIDC).
- Setup friction (self-host? SaaS? Docker?): Medium. It’s a service you run (plus datastore). Easier than “full IAM”, heavier than a library (Casbin).
- Data model alignment: Strong if we’re willing to model permissions explicitly (relationships/tuples) and treat authz as a service.

## Adoption path

- 1 day POC:
  - Run OpenFGA locally (with its datastore).
  - Define a minimal model for our world (e.g., `tenant`, `store`, `order`, `user`, `role`).
  - Write a handful of tuples (owner/admin/support) and prove `check` calls for 2–3 admin endpoints.
  - Add a thin `AuthorizationService` wrapper in our backend so we can swap engines later if needed.
- 1 week integration:
  - Decide the v1 authorization model and naming conventions (objects/relations) with examples.
  - Build policy/tuple management flows:
    - backend APIs for role grants/revokes
    - admin UI for assignments + support “break-glass” access
  - Add caching strategy + timeouts and degraded-mode defaults (fail closed for sensitive actions).
  - Add audit logging for all tuple writes and “why denied?” troubleshooting logs.
  - Add test fixtures to validate the permission matrix (golden tests).
- 1 month hardening:
  - Add migration/versioning strategy for model evolution (deploy-safe).
  - Add monitoring (check latency, tuple write failures) and runbooks.
  - Add higher-level abstractions so product teams don’t write raw tuples everywhere.

## Risks

- Maintenance risk: Medium. It’s an additional service; needs reliability and observability.
- Security risk: Medium–High. Incorrect models can create privilege escalation; requires strong tests + audit.
- Scope mismatch: Medium. If we only need simple tenant roles, Casbin may be sufficient; OpenFGA shines when permissions get complex.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/openfga/openfga

## Score (0–100) + reasoning

- Score: 79
- Why: Excellent long-term bet for complex permissions, but introduces service/ops overhead; best if we foresee richer sharing/delegation models.

---

## Repo description (from GitHub)

OpenFGA is a high performance and flexible authorization/permission engine built for developers and inspired by Google Zanzibar.
