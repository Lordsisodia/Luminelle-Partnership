# OSS Project Entry

## Identity

- Name: casbin
- Repo: https://github.com/casbin/casbin
- Full name: casbin/casbin
- License: Apache-2.0
- Stars (approx): 19604
- Forks (approx): 1711
- Primary language: Go
- Last updated: 2025-12-28T18:23:04Z
- Topics: abac, access-control, acl, auth, authentication, authn, authorization, authz, cas, casbin, cloudos, cloudsecurity, iam, oauth, oidc, permission, rbac, saml, sso

## What it gives us (plain English)

- A battle-tested authorization engine (policy evaluation) we can embed into services
- Support for multiple models: ACL, RBAC, RBAC-with-domains (multi-tenant), ABAC, and hybrids
- Policy storage adapters (e.g., DB-backed) + watchers for policy updates (so changes propagate)
- A clean “enforcement” boundary: `enforce(subject, object, action)` with configurable policy model
- Portability: implementations exist across languages; we can mirror policies in multiple services if needed

## What feature(s) it maps to

- RBAC / permissions for admin dashboards
- Multi-tenant authorization (“domain” == `tenantId` pattern)
- Fine-grained permissions (ABAC conditions like `resource.ownerId == userId`)
- Policy-driven access control for internal tools and “ops” endpoints

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Best used on the backend (API) as the source of truth; UI consumes “what actions can I do?” via API. Works with any auth provider (OIDC/JWT).
- Setup friction (self-host? SaaS? Docker?): Low. It’s a library, not a platform. Biggest work is defining your permission model and policies.
- Data model alignment: Excellent if we accept policy-as-data (tables for roles, bindings, and rules) and want to evolve without hardcoding permission logic everywhere.

## Adoption path

- 1 day POC:
  - Pick a starting model: RBAC with domains (`tenantId`) is the usual “least regret” for SaaS admin.
  - Implement a single middleware in the API: `authorize(user, tenantId, resource, action)`.
  - Hardcode (or seed) 3 roles: `owner`, `admin`, `support`, and ~10 permissions.
  - Persist policies in Postgres using an adapter (or start with file-based for speed).
  - Prove the loop end-to-end: admin UI calls API → API enforces via Casbin → 403 vs 200.
- 1 week integration:
  - Define a permission taxonomy and naming convention (resources + actions) aligned to product surfaces.
  - Build policy management APIs (CRUD) and minimal admin UI for role assignments.
  - Add caching + invalidation (Casbin watcher) so permission changes take effect quickly.
  - Add “explain” tooling for support: why was access denied? (log subject/object/action + matched policy).
  - Emit audit events on policy changes (role grants, revocations, policy edits).
  - Add test suite coverage for the permission matrix and critical paths.
- 1 month hardening:
  - Add policy migration/versioning (so model changes are deploy-safe).
  - Add break-glass support flows (temporary access, timeboxed grants).
  - Add “permission introspection” endpoints for UI feature gating (avoid duplicating logic client-side).

## Risks

- Maintenance risk: Low–Medium. Library is stable; most complexity is our policy design and operational safety.
- Security risk: Medium–High if misconfigured. Authorization bugs are catastrophic; requires strong tests + audit logging.
- Scope mismatch: Low. This is exactly the RBAC/ABAC primitive we need; avoid turning it into a full IAM suite.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/casbin/casbin

## Score (0–100) + reasoning

- Score: 86
- Why: Great “primitive” to avoid building authorization evaluation ourselves; biggest work is designing roles/permissions and building the management UX.

---

## Repo description (from GitHub)

An authorization library that supports access control models like ACL, RBAC, ABAC in Golang: https://discord.gg/S5UjpzGZjN
