# OSS Project Entry

## Identity

- Name: TanStack Table
- Repo: https://github.com/TanStack/table
- Package: `@tanstack/react-table`
- License: MIT (npm metadata)
- Primary language: TypeScript
- Homepage: https://tanstack.com/table
- Notes: GitHub API rate-limited; metadata sourced from npm registry.

## What it gives us (plain English)

- A best-in-class table “engine” for React UIs: sorting, filtering, pagination, column defs, row models
- Great building block for an audit/event viewer where tables are the core UX (events list, deliveries list, job runs list)
- Extensible enough to support “saved views”, column presets, and complex filters

## What feature(s) it maps to

- Product audit/event viewer UX (tables + filters)
- Admin dashboards (lists of resources with advanced filtering)
- Support tooling (quickly slice by tenantId, correlationId, status)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent. Requires a predictable API for filtering/sorting/pagination and strict server-side authz.
- Setup friction (self-host? SaaS? Docker?): Low. Library only.
- Data model alignment: Strong when we keep event rows normalized (timestamp, actor, action, resource, correlationId, metadata).

## Adoption path

- 1 day POC:
  - Build a single “Audit Events” page with a TanStack Table instance.
  - Implement basic filters: time range, tenantId, actorId, action, free-text (server-side).
  - Add column presets and a “copy correlation ID” affordance.
- 1 week integration:
  - Implement saved views (persist filters/columns per user/role).
  - Add server-driven pagination and a standardized filter DSL for list endpoints.
  - Add diff drill-down panel (jsondiffpatch) and export (CSV).
- 1 month hardening:
  - Add virtualization (TanStack Virtual / react-virtuoso) for very large result sets.
  - Add performance budgets + test coverage for filtering/pagination correctness.

## Risks

- Maintenance risk: Low. Widely used OSS.
- Security risk: Medium. Easy to accidentally implement client-side filtering that leaks data; enforce server-side filtering + RBAC.
- Scope mismatch: Low. This is exactly the kind of primitive we need for admin/audit tables.
- License risk: Low (MIT).

## Sources

- https://registry.npmjs.org/@tanstack/react-table
- https://github.com/TanStack/table

## Score (0–100) + reasoning

- Score: 88
- Why: High leverage, low friction, and directly applicable to the audit/event viewer UX we need.
