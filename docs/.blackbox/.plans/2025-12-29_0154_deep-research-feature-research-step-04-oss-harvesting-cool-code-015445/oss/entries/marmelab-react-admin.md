# OSS Project Entry

## Identity

- Name: react-admin
- Repo: https://github.com/marmelab/react-admin
- Full name: marmelab/react-admin
- License: MIT
- Stars (approx): 26433
- Forks (approx): 5428
- Primary language: TypeScript
- Last updated: 2025-12-28T17:39:22Z
- Topics: admin, admin-dashboard, admin-on-rest, admin-ui, frontend-framework, graphql, material-ui, react, react-admin, reactjs, rest, single-page-app

## What it gives us (plain English)

- A mature React/TypeScript framework for building admin panels on top of REST/GraphQL APIs
- Standard “admin primitives” out of the box: list/create/edit/show views, filters, pagination, forms
- A consistent way to implement CRUD rapidly (especially for internal/admin tooling)
- Extensibility patterns we can reuse: data providers, auth providers, custom fields, custom routes
- UI patterns that are hard to get right quickly: bulk actions, reference inputs, relationships, tables

## What feature(s) it maps to

- Admin UI scaffolding for our merchant/support admin
- Internal ops dashboards (orders/customers/support tools)
- “Vibe coding” acceleration for CRUD-heavy admin surfaces

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent for React/TS teams. Backend must provide a stable API shape (REST or GraphQL) that supports list/filter/sort/paginate.
- Setup friction (self-host? SaaS? Docker?): Low. Library/framework; no separate service to run.
- Data model alignment: Works best when resources map cleanly to API endpoints and relationships can be expressed (foreign keys / references).

## Adoption path

- 1 day POC:
  - Scaffold an admin app and wire to a simple API data provider.
  - Implement 2–3 resources end-to-end (e.g., `orders`, `customers`, `products`) with list + show + edit.
  - Add basic auth provider (session/JWT) and role gating (admin vs support).
  - Validate “hard parts”: filters, pagination, and relationship fields.
- 1 week integration:
  - Create a shared “admin API contract” (filter/sort/paginate conventions) so admin UI stays predictable.
  - Add RBAC wiring (Casbin/OpenFGA/OPA-backed checks in API) + UI feature gating.
  - Add audit log viewer screens and “diff view” for settings changes (jsondiffpatch).
  - Add ops tooling surfaces: retry failed jobs, replay webhooks, inspect integration failures.
  - Standardize UI theming, navigation, and error states.
- 1 month hardening:
  - Add performance improvements (virtualized lists, caching, optimistic updates where safe).
  - Add testing for critical workflows + visual regressions for admin pages.
  - Build a component library of shared admin widgets (status badges, money/date formatting, diff renderer).

## Risks

- Maintenance risk: Low. Widely used; main maintenance is our own admin UX and API contract stability.
- Security risk: Medium. Admin UIs need strong auth + server-side authorization; don’t rely on UI gating.
- Scope mismatch: Low. This is squarely an admin CRUD framework; avoid using it as a marketing site renderer.
- License risk: Low (MIT).

## Sources

- https://github.com/marmelab/react-admin

## Score (0–100) + reasoning

- Score: 85
- Why: Very high ROI for CRUD-heavy admin surfaces with minimal infra; the “cost” is ensuring our APIs support good list/filter/pagination and enforcing authz server-side.

---

## Repo description (from GitHub)

A frontend Framework for single-page applications on top of REST/GraphQL APIs, using TypeScript, React and Material Design
