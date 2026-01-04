# OSS Project Entry

## Identity

- Name: unleash
- Repo: https://github.com/Unleash/unleash
- Full name: Unleash/unleash
- License: Apache-2.0
- Stars (approx): 13008
- Forks (approx): 821
- Primary language: TypeScript
- Last updated: 2025-12-28T13:40:12Z
- Topics: activation-strategies, collaboration, continuous-delivery, continuous-deployment, devops, devtool, experiments, feature, feature-flags, feature-toggle, feature-toggles, feature-toggling, hacktoberfest, integration, platform-engineering, sdk, toggles, unleash, variants

## What it gives us (plain English)

- A self-hostable “source of truth” for feature flags, rollouts, and targeting rules
- Environments (dev/stage/prod) + projects to organize flags by product area
- Rollout strategies (gradual rollout, user targeting, segments) + variants for A/B-ish toggling
- SDK ecosystem (server + client) so we can evaluate flags inside apps and services
- Admin UI + audit-ish history (who changed what) via Unleash’s own UI/logs (still likely want our own app-level audit log)

## What feature(s) it maps to

- Feature flags / staged rollouts
- Per-tenant config toggles (“remote config” style)
- Operational kill-switches (“turn off a risky integration”)
- Experiment variants (lightweight; not a full experimentation analytics stack)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong. Unleash core is TS; SDKs exist for common stacks. We can wrap evaluation behind a small internal `featureFlags` service.
- Setup friction (self-host? SaaS? Docker?): Moderate. Self-host needs Postgres + Unleash service (Docker/K8s). SaaS exists if we ever want to offload infra.
- Data model alignment: Good for “global flags” and “per-tenant targeting”. Multi-tenant use is typically modeled via projects/environments + constraints (e.g., `tenantId`).

## Adoption path

- 1 day POC:
  - Spin up Unleash locally (Docker Compose) with Postgres.
  - Create 2–3 flags: `new_admin_nav`, `enable_integration_X`, `checkout_v2`.
  - Wire a tiny demo app/service to evaluate flags (SDK) and gate UI + API behavior.
  - Validate targeting by `tenantId` and a “percent rollout” rule.
  - Decide where evaluation should live (edge/UI vs API only) and document the rule.
- 1 week integration:
  - Define a minimal flag taxonomy: naming, ownership, environments, and lifecycle (create → rollout → cleanup).
  - Build a thin internal wrapper (`FeatureFlagsService`) so the rest of the codebase doesn’t depend on a specific vendor.
  - Add tenant-aware evaluation patterns (constraints like `tenantId`, `plan`, `region`) and standard context keys.
  - Add “change management”: who can edit flags, review process, and emergency kill-switch procedure.
  - Emit app-level audit events on flag changes (via webhooks/polling) into our own audit log stream.
  - Add CI checks / linting for “stale flags” and ensure defaults are safe.
- 1 month hardening:
  - Productionize deployment (K8s/Helm), backups, and SLOs (flags must be available).
  - Add caching + fallback defaults for degraded mode.
  - Build “flag health” dashboards (flag eval volume, error rates, stale flags).

## Risks

- Maintenance risk: Medium. Running a stateful service + Postgres; manageable if we already operate similar services.
- Security risk: Medium. Admin UI must be locked down; flag leakage can expose hidden features.
- Scope mismatch: Low. This is a well-scoped primitive; don’t try to use it as a full experimentation platform.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/Unleash/unleash

## Score (0–100) + reasoning

- Score: 88
- Why: Best-in-class OSS primitive for feature flags with a permissive license; integration is straightforward, main “cost” is operating the service + governance.

---

## Repo description (from GitHub)

Open-source feature management platform
