# OSS Project Entry

## Identity

- Name: appsmith
- Repo: https://github.com/appsmithorg/appsmith
- Full name: appsmithorg/appsmith
- License: ✅ permissive — Apache-2.0
- Stars (approx): 38758
- Primary language: TypeScript
- Last updated: 2025-12-28T11:36:18Z
- Topics: admin-dashboard, admin-panels, app-builder, automation, crud, custom-internal, developer-tools, gui, gui-application, hacktoberfest, internal-tools, java, javascript, low-code, low-code-framework, react, self-hosted, typescript, webdevelopment, workflows

## What it gives us (plain English)

- Platform to build admin panels, internal tools, and dashboards. Integrates with 25+ databases and any API.
- Why this matters: Ships admin CRUD + bulk ops faster; reduces custom UI effort for internal tooling surfaces.

## What feature(s) it maps to

- admin scaffolding
- workflow automation

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
- License risk: Verify LICENSE file + terms (flag for legal review if copyleft/fair-code/unknown).

## Sources

- https://github.com/appsmithorg/appsmith

## Score (0–100) + reasoning

- Score: …
- Why: …
