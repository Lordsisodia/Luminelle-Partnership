# OSS Project Entry

## Identity

- Name: supabase
- Repo: https://github.com/supabase/supabase
- Full name: supabase/supabase
- License: Apache-2.0
- Stars (approx): 95291
- Forks (approx): 11111
- Primary language: TypeScript
- Last updated: 2025-12-28T18:36:46Z
- Topics: ai, alternative, auth, database, deno, embeddings, example, firebase, nextjs, oauth2, pgvector, postgis, postgres, postgresql, postgrest, realtime, supabase, vectors, websockets

## What it gives us (plain English)

- A large collection of backend “platform primitives” patterns (auth, Postgres, storage, realtime)
- A production-quality dashboard UX for “ops/admin” surfaces (tables, logs, settings, project management)
- Useful reference implementations for:
  - audit/log viewing patterns (filters, time ranges, drill-down)
  - multi-tenant / multi-project control-plane UX
  - developer experience and docs patterns
- Highly relevant if we already build on Supabase: patterns are directly portable

## What feature(s) it maps to

- Admin control-plane UX patterns (internal)
- Audit/log viewer UX patterns (internal)
- “Platform primitives” reference (auth, storage, DB)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent. Useful patterns for our stack and can inform our own admin conventions.
- Setup friction (self-host? SaaS? Docker?): Not applicable unless we adopt components; primary value is learning and borrowing patterns.
- Data model alignment: Strong for “tenant + project + environment” modeling and operational views over Postgres-backed data.

## Adoption path

- 1 day POC:
  - Identify 3 Supabase dashboard patterns we want to replicate: logs viewer, table editor, and settings/audit.
  - Define our admin API conventions (filters/sort/paginate) so our admin UI scaffolds work cleanly.
  - Implement a minimal internal “admin logs” page with consistent filtering and correlation IDs.
- 1 week integration:
  - Build a shared “admin UI toolkit”:
    - table component + filters
    - log/event list with drill-down
    - consistent empty/error/loading states
  - Align naming and permission boundaries (Casbin/OpenFGA/OPA) and enforce server-side authz everywhere.
  - Add audit events for control-plane actions (integration changes, webhook replays, permission changes).
- 1 month hardening:
  - Add observability for the admin itself (slow queries, error rates).
  - Add onboarding docs and runbooks mirroring the “platform” style UX.

## Risks

- Maintenance risk: Low. We’re primarily borrowing patterns.
- Security risk: Medium. Admin/log viewers must avoid PII leakage; require strict authz and redaction rules.
- Scope mismatch: Low. Supabase is directly relevant to our platform and admin patterns.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/supabase/supabase

## Score (0–100) + reasoning

- Score: 78
- Why: High-quality admin/control-plane UX patterns and platform primitives; best as a “reference and patterns” repo rather than a direct dependency.

---

## Repo description (from GitHub)

The Postgres development platform. Supabase gives you a dedicated Postgres database to build your web, mobile, and AI applications.
