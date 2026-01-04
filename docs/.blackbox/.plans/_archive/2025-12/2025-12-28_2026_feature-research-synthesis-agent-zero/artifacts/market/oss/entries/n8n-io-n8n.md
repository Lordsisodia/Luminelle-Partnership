# OSS Project Entry

## Identity

- Name: n8n
- Repo: https://github.com/n8n-io/n8n
- Full name: n8n-io/n8n
- License: ⚠️ unknown (verify) — NOASSERTION
- Stars (approx): 165129
- Primary language: TypeScript
- Last updated: 2025-12-28T13:33:47Z
- Topics: ai, apis, automation, cli, data-flow, development, integration-framework, integrations, ipaas, low-code, low-code-platform, mcp, mcp-client, mcp-server, n8n, no-code, self-hosted, typescript, workflow, workflow-automation

## What it gives us (plain English)

- Fair-code workflow automation platform with native AI capabilities. Combine visual building with custom code, self-host or cloud, 400+ integrations.
- Why this matters: Adds a durable automation layer (triggers → actions → approvals) without us building every integration.

## What feature(s) it maps to

- workflow automation

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth):
  - TS/JS-native; can integrate via package, embed UI patterns, or run as a service with API boundary.
- Setup friction (self-host? SaaS? Docker?): Run as a separate service (Docker). Integrate via webhooks/HTTP; mirror run logs back into our admin.
- Data model alignment: Model actions as idempotent tasks; store execution/audit logs in our DB for compliance.

## Adoption path

- 1 day POC: Self-host + create 1 HTTP-triggered workflow that writes a run record into our system.
- 1 week integration: Add approvals UI + 2–3 core integrations (Shopify, email/SMS, Slack) + retries/timeouts.
- 1 month hardening: Permissioned actions + per-client secrets vaulting + RBAC/audit log integration.

## Risks

- Maintenance risk: upgrades + ecosystem drift; mitigate with pinning + quarterly update cadence.
- Security risk: treat as privileged system; isolate network + secrets; audit write actions.
- Scope mismatch: avoid "replace our platform" scope; extract one slice at a time.
- License risk: License not asserted; confirm actual license + commercial terms before any integration.

## Sources

- https://github.com/n8n-io/n8n

## Score (0–100) + reasoning

- Score: …
- Why: …
