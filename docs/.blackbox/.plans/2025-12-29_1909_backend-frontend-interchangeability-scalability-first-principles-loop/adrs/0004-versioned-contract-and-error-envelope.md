# ADR 0004 — Versioned contract + stable error envelope

Status:
- Proposed (docs-only phase; implement later)

Decision:
- All `/api/*` endpoints should emit:
  - a stable JSON success/error envelope
  - stable error codes (machine-readable)
  - an explicit contract version indicator (header and/or `meta`)

Context / problem:
- We want to swap frontends without “stringly-typed” error handling and implicit, undocumented response shapes.
- As we add more domains (authz/audit/flags/automation/cms/analytics), response consistency becomes an scalability requirement.

Evidence:
- DTO and error envelope conventions are codified in: `dto-and-capabilities-spec-v0.1.md`
- Platform already has the concept of stable error codes (`PortError` codes):  
  - `artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`
- `/api/*` surface is real and inventoried:  
  - `artifacts/snapshots/functions-api-files.clean.find.txt`

Consequences:
- Pros:
  - New frontends can implement one error handler and one pagination model.
  - Contract evolution is explicit (versioning).
  - Better observability: requestId + stable codes.
- Cons:
  - Requires consistent endpoint templates and shared helpers.

Related docs:
- Endpoint template: `functions-endpoint-template.md`
- Observability plan: `observability-and-telemetry-plan-v0.1.md`

