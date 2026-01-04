# OSS Project Entry

## Identity

- Name: React Query Builder
- Repo: https://github.com/react-querybuilder/react-querybuilder
- Package: `react-querybuilder`
- License: MIT (npm metadata)
- Primary language: TypeScript
- Homepage: https://react-querybuilder.js.org/
- Notes: GitHub API rate-limited; metadata sourced from npm registry.

## What it gives us (plain English)

- A UI component to let users build complex boolean filters (AND/OR groups, field operators)
- Exactly what an advanced audit/event viewer needs for power users (support/ops)
- A way to avoid building a fragile bespoke “filter builder” UI

## What feature(s) it maps to

- Audit/event viewer advanced filtering (saved searches)
- Webhook delivery logs filtering (status + time + endpoint + tenant)
- Job runs filtering (status + type + integrationId)

## Integration notes (vibe-coding lens)

- Stack fit: Great for React admins (React Admin/Refine) and internal tools.
- Setup friction: Low.
- Data model alignment: Requires us to define a server-side filter DSL and map UI filters to safe queries (never raw SQL/DSL from browser).

## Adoption path

- 1 day POC:
  - Add a query builder to the “Audit Events” page and support 6–10 fields (action, actorId, tenantId, resourceType, status, correlationId).
  - Serialize filters into a safe JSON DSL and implement server-side translation.
- 1 week integration:
  - Add “saved filters” and shareable links.
  - Add validation and field-type aware operators (dates, enums, free-text).
  - Add query cost guardrails (max time range, max conditions) to prevent expensive queries.
- 1 month hardening:
  - Add an “explain query” mode for support (“why are results empty?”).
  - Add a safe export pipeline (CSV with redaction).

## Risks

- Maintenance risk: Low.
- Security risk: High if we implement unsafe query translation. Must enforce a safe DSL and strict RBAC.
- Scope mismatch: Low. This is directly useful for audit/log viewers.
- License risk: Low (MIT).

## Sources

- https://registry.npmjs.org/react-querybuilder
- https://github.com/react-querybuilder/react-querybuilder

## Score (0–100) + reasoning

- Score: 83
- Why: Saves a lot of UI engineering time and improves power-user experience; security depends on safe server-side query translation.
