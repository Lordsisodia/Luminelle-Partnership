# OSS Project Entry

## Identity

- Name: ToolJet
- Repo: https://github.com/ToolJet/ToolJet
- Full name: ToolJet/ToolJet
- License: 🧨 copyleft (flag) — AGPL-3.0
- Stars (approx): 37084
- Primary language: JavaScript
- Last updated: 2025-12-28T06:47:23Z
- Topics: ai-app-builder, docker, hacktoberfest, internal-applications, internal-project, internal-tool, internal-tools, javascript, kubernetes, low-code, low-code-development-platform, low-code-framework, no-code, nodejs, reactjs, self-hosted, typescript, web-development-tools, workflow-automation

## What it gives us (plain English)

- ToolJet is the open-source foundation of ToolJet AI - the AI-native platform for building internal tools, dashboard, business applications, workflows and AI agents 🚀
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
- License risk: Copyleft detected; treat as high-risk for embedding — verify obligations before use.

## Sources

- https://github.com/ToolJet/ToolJet

## Score (0–100) + reasoning

- Score: …
- Why: …
