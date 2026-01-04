# OSS Project Entry

## Identity

- Name: opa
- Repo: https://github.com/open-policy-agent/opa
- Full name: open-policy-agent/opa
- License: Apache-2.0
- Stars (approx): 11023
- Forks (approx): 1492
- Primary language: Go
- Last updated: 2025-12-27T22:33:34Z
- Topics: authorization, cloud-native, compliance, declarative, json, opa, open-policy-agent, policy

## What it gives us (plain English)

- A general-purpose policy decision engine (“should this request be allowed?”)
- Policy-as-code (Rego) so authorization and compliance logic can be versioned, tested, reviewed, and shipped like software
- A clean separation of concerns: apps ask OPA for decisions; OPA evaluates policy + input data
- Reusable for more than authz: data access rules, configuration guardrails, compliance checks, “policy gates” in CI/CD

## What feature(s) it maps to

- RBAC / ABAC / PBAC (policy-based access control) as a backend primitive
- Admin governance rules (e.g., “only owners can change billing settings”)
- Audit/compliance posture (decision logging + policy change history)
- Potential alternative to Casbin if we want policy-as-code over policy-as-data

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Best enforced in the API layer; UI should not talk to OPA directly. Works with any auth (JWT/OIDC) by passing claims as input.
- Setup friction (self-host? SaaS? Docker?): Medium. Running OPA as a sidecar/service is easy; the “hard part” is policy modeling + distribution (bundles) + data inputs.
- Data model alignment: Strong when decisions depend on request attributes + resource attributes (ABAC). Harder to build a friendly admin UI for non-devs (policies are code).

## Adoption path

- 1 day POC:
  - Run OPA locally and write a tiny policy for 2–3 admin endpoints (allow/deny based on role + tenantId).
  - Implement one API middleware: build an input document (user claims + request + resource metadata), call OPA, enforce decision.
  - Add unit tests for the policy (golden cases: allow/deny).
  - Decide where policy data comes from (JWT claims, DB lookups, cached resource attrs).
- 1 week integration:
  - Define a v1 policy structure and conventions (packages, rules, error reasons).
  - Set up policy distribution (bundles) + CI validation (lint, tests, policy review).
  - Implement decision logging and “deny reasons” so support can debug.
  - Add guardrails: timeouts, caching, fail-closed for sensitive actions.
  - Integrate policy-change events into our audit log (who changed policy, when).
- 1 month hardening:
  - Add policy versioning/migrations and safe rollout (canary policies).
  - Add performance profiling and reduce input payload size.

## Risks

- Maintenance risk: Medium. OPA is stable, but policy-as-code requires ongoing discipline and tooling.
- Security risk: High. Bad policies can grant access; must have strong tests + audit + review gates.
- Scope mismatch: Medium. If we want a “CRUD roles UI”, Casbin may fit better; OPA excels when rules are complex and code-reviewed.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/open-policy-agent/opa

## Score (0–100) + reasoning

- Score: 78
- Why: Powerful and permissive, but increases complexity for “vibe coding” teams because policies are code and UX for managing them is non-trivial.

---

## Repo description (from GitHub)

Open Policy Agent (OPA) is an open source, general-purpose policy engine.
