# OSS Project Entry

## Identity

- Name: React JSON View
- Repo: https://github.com/uiwjs/react-json-view
- Package: `@uiw/react-json-view`
- License: MIT (npm metadata)
- Primary language: TypeScript
- Homepage: https://uiwjs.github.io/react-json-view
- Notes: GitHub API rate-limited; metadata sourced from npm registry.

## What it gives us (plain English)

- A polished JSON viewer component (expand/collapse, pretty-print) for React
- Perfect for audit/webhook detail panels where we need to show:
  - event payloads (redacted)
  - headers
  - error objects
  - metadata
- Helps avoid hand-rolling unsafe “render JSON” UIs

## What feature(s) it maps to

- Audit/event drill-down panels (payload display)
- Webhook delivery detail viewer (headers/body/error)
- Job run detail panels (payload + stack traces)

## Integration notes (vibe-coding lens)

- Stack fit: Great in any React admin.
- Setup friction: Low.
- Data model alignment: Requires us to store payloads safely and apply redaction before returning to the UI.

## Adoption path

- 1 day POC:
  - Add a “Details” drawer to the audit viewer showing the event JSON and associated metadata.
  - Implement redaction of known sensitive fields (`token`, `authorization`, `password`, `secret`, etc.).
- 1 week integration:
  - Add “copy as JSON” with redaction and “download” behavior.
  - Add diff rendering integration: show both snapshot/diff and raw payload.
  - Add permission checks on which staff roles can view raw payloads.
- 1 month hardening:
  - Add “sensitive data scanning” and prevent accidental storage of secrets.

## Risks

- Maintenance risk: Low.
- Security risk: Medium–High. JSON viewers make it easy to leak secrets; enforce redaction and strict RBAC.
- Scope mismatch: Low.
- License risk: Low (MIT).

## Sources

- https://registry.npmjs.org/@uiw/react-json-view
- https://github.com/uiwjs/react-json-view

## Score (0–100) + reasoning

- Score: 79
- Why: Small component with big UX payoff for drill-down panels; must pair with redaction and permissioning.
