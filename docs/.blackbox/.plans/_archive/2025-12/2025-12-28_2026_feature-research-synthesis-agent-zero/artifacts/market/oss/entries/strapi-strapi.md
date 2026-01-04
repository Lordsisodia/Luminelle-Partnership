# OSS Project Entry

## Identity

- Name: strapi
- Repo: https://github.com/strapi/strapi
- Full name: strapi/strapi
- License: ⚠️ unknown (verify) — NOASSERTION
- Stars (approx): 70813
- Primary language: TypeScript
- Last updated: 2025-12-28T13:03:02Z
- Topics: api, cms, cms-framework, content-management, content-management-system, customizable, dashboard, graphql, hacktoberfest, headless-cms, jamstack, javascript, koa, koa2, mysql, no-code, nodejs, rest, strapi, typescript

## What it gives us (plain English)

- 🚀 Strapi is the leading open-source headless CMS. It’s 100% JavaScript/TypeScript, fully customizable, and developer-first.
- Why this matters: Ships admin CRUD + bulk ops faster; reduces custom UI effort for internal tooling surfaces.

## What feature(s) it maps to

- admin scaffolding
- cms/content

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth):
  - TS/JS-native; can integrate via package, embed UI patterns, or run as a service with API boundary.
- Setup friction (self-host? SaaS? Docker?): Adopt as a UI layer or pattern library; keep our domain logic/APIs as the source of truth.
- Data model alignment: Map our existing resource APIs to the framework’s data provider adapters.

## Adoption path

- 1 day POC: Stand up one resource (e.g., Products) with list/detail/edit + filters using our API.
- 1 week integration: Add RBAC gates, saved views, bulk actions, and a consistent design system wrapper.
- 1 month hardening: Harden: codegen for resources, testing harness, and extension/plugin points.

## Risks

- Maintenance risk: upgrades + ecosystem drift; mitigate with pinning + quarterly update cadence.
- Security risk: treat as privileged system; isolate network + secrets; audit write actions.
- Scope mismatch: avoid "replace our platform" scope; extract one slice at a time.
- License risk: License not asserted; confirm actual license + commercial terms before any integration.

## Sources

- https://github.com/strapi/strapi

## Score (0–100) + reasoning

- Score: …
- Why: …
