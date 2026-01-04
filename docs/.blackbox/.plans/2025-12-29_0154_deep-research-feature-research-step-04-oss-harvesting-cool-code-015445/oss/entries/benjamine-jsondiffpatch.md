# OSS Project Entry

## Identity

- Name: jsondiffpatch
- Repo: https://github.com/benjamine/jsondiffpatch
- Full name: benjamine/jsondiffpatch
- License: MIT
- Stars (approx): 5262
- Forks (approx): 440
- Primary language: TypeScript
- Last updated: 2025-12-26T08:08:29Z
- Topics: diff, json, patch

## What it gives us (plain English)

- A JSON diff + patch engine, plus optional HTML formatters for “before/after” visualization
- A concrete building block for an audit log viewer: “what changed?” at the field level
- A lightweight way to implement change history and human-friendly diffs for settings/content objects
- A pattern we can reuse across admin surfaces (settings changes, integration config changes, permission changes)

## What feature(s) it maps to

- Audit logs / event log viewer (diff view)
- Activity feeds (“changed X from A → B”)
- Change approval workflows (“review changes” before apply), if we add that later

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent. Use in backend (compute diffs) and/or frontend (render diffs) for our React admin.
- Setup friction (self-host? SaaS? Docker?): Low. It’s a library.
- Data model alignment: Best for JSON-ish objects; we should store diffs and/or snapshots with redaction to avoid leaking secrets.

## Adoption path

- 1 day POC:
  - Pick 2–3 entity types where diffs matter: `tenant_settings`, `integration_settings`, `role_bindings`.
  - Compute diffs on write (before/after) and store an `audit_event` with:
    - `actorId`, `tenantId`, `resource`, `action`, `diff`, `timestamp`
  - Render a basic “diff viewer” component in admin (collapse/expand fields).
  - Add redaction rules (never diff/emit secret fields).
- 1 week integration:
  - Define canonical “diff event” schema and a shared renderer component.
  - Add formatting rules per field type (currency, enums, arrays, large blobs).
  - Add change context: correlationId, reason, request metadata, source (UI/API).
  - Integrate with search/index (OpenSearch/ClickHouse) for querying by field name/value changes.
- 1 month hardening:
  - Add snapshot strategy (store minimal before/after references; avoid storing sensitive values).
  - Add export and support tooling (copy diff as text, linkable events).

## Risks

- Maintenance risk: Low. Stable library, but we must standardize how/where diffs are computed.
- Security risk: Medium. Diffs can leak secrets or PII if we don’t redact aggressively.
- Scope mismatch: Low. This is a focused “diff primitive” that complements any audit/event system.
- License risk: Low (MIT).

## Sources

- https://github.com/benjamine/jsondiffpatch
- https://raw.githubusercontent.com/benjamine/jsondiffpatch/master/MIT-LICENSE.txt

## Score (0–100) + reasoning

- Score: 84
- Why: High-leverage, low-cost building block for audit log UX and “change history” narratives in admin.

---

## Repo description (from GitHub)

Diff & patch for JavaScript objects.
