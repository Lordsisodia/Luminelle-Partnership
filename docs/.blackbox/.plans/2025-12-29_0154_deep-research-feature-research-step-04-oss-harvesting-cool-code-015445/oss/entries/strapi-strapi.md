# OSS Project Entry

## Identity

- Name: strapi
- Repo: https://github.com/strapi/strapi
- Full name: strapi/strapi
- License: Mixed (MIT Expat + `ee/` directory under separate license)
- Stars (approx): 70815
- Forks (approx): 9339
- Primary language: TypeScript
- Last updated: 2025-12-28T17:07:48Z
- Topics: api, cms, cms-framework, content-management, content-management-system, customizable, dashboard, graphql, hacktoberfest, headless-cms, jamstack, javascript, koa, koa2, mysql, no-code, nodejs, rest, strapi, typescript

## What it gives us (plain English)

- A widely adopted headless CMS with a strong admin UI and plugin ecosystem
- A clean way to run “content ops” for storefronts: pages, sections, navigation, assets
- A practical solution for building admin CRUD around content without maintaining it ourselves
- A large ecosystem of community patterns (roles, content modeling, publish workflows)

## What feature(s) it maps to

### Potential uses

- Content ops / CMS for generated storefronts (pages/collections/landing content)
- Internal “template library” management (sections, layouts, reusable blocks)
- Editorial workflows (draft/review/publish) depending on edition/features

## License notes (evidence-first)

- Proof file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-strapi-strapi.txt`
- Interpreting the repo LICENSE: Community Edition usage is MIT Expat when not using `ee/`; `ee/` paths are under a separate license (see proof file for the referenced path).

- Takeaway: treat Strapi as “mostly permissive” but still **mixed-license at repo level**. Confirm the exact features we need don’t rely on `ee/` paths before adopting.

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Good. Strapi is Node/TS; we can integrate it as a separate service with its own admin UI.
- Setup friction (self-host? SaaS? Docker?): Medium. It’s a full backend service with DB and operational needs.
- Data model alignment: Strong for “content as data”. We should keep commerce/admin authorization in our core services and use Strapi for content only.

## Adoption path

- 1 day POC:
  - Confirm license boundaries (avoid `ee/` features).
  - Run Strapi locally and define a minimal content model for a storefront (e.g., Home page sections + navigation).
  - Validate the admin editing workflow and API consumption in a simple renderer.
- 1 week integration:
  - Define a “content contract” for storefront generation (fields, validation, versioning).
  - Add role model and permissions for editors (internal) and optionally merchants.
  - Implement audit events for content changes and integrate with our audit viewer/diff rendering.
  - Add backup/restore and environment separation (dev/stage/prod content).
- 1 month hardening:
  - Add schema migration strategy + promotion workflow for content types.
  - Add staged publishing and rollback/version history.
  - Formalize security hardening and secrets management for integrations/plugins.

## Risks

- Maintenance risk: Medium. Running a CMS requires ongoing patching and plugin management.
- Security risk: Medium. CMS surfaces are high-value targets; enforce auth, rate limits, and least privilege.
- Scope mismatch: Medium. Great for content ops, not a replacement for our admin backend primitives (RBAC/workflows/audit).
- License risk: Medium–High. Mixed-license repo; confirm required features are covered by the MIT portion and avoid `ee/` paths.

## Sources

- https://github.com/strapi/strapi
- https://raw.githubusercontent.com/strapi/strapi/main/LICENSE

## Score (0–100) + reasoning

- Score: 72
- Why: Strong content ops platform with huge adoption, but mixed-license complexity and operational footprint mean we should scope it tightly (content only) and confirm licensing up front.

---

## Repo description (from GitHub)

🚀 Strapi is the leading open-source headless CMS. It’s 100% JavaScript/TypeScript, fully customizable, and developer-first.
