# OSS Project Entry

## Identity

- Name: directus
- Repo: https://github.com/directus/directus
- Full name: directus/directus
- License: BUSL-1.1 (BUSL-style terms; see license proof)
- Stars (approx): 33812
- Forks (approx): 4511
- Primary language: TypeScript
- Last updated: 2025-12-28T17:15:15Z
- Topics: api, app, cms, composable, data-visualization, database, directus, graphql, headless-cms, javascript, mariadb, mssql, mysql, no-code, node, postgresql, sql, sqlite, typescript, vue

## What it gives us (plain English)

- A “data platform + admin UI” that turns a database into a managed backend with an app-like console
- Strong UX patterns for activity logs, revisions, and “who changed what” (worth borrowing conceptually)
- A powerful permissioning model for data access and admin features (separate from our app RBAC)
- A ready-made admin app surface (but license is BUSL; treat as restrictive)

## What feature(s) it maps to

- Content/data ops admin (internal)
- Activity log + revision history patterns (audit viewer UX ideas)
- Admin permissioning UX patterns (roles/permissions UI)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Technically a great fit as a service boundary, but license constraints likely prevent using it as part of a managed client app offering.
- Setup friction (self-host? SaaS? Docker?): Medium. Full platform service with DB integration, auth, and admin UI.
- Data model alignment: Strong if we want “admin over DB”. For our product, we likely need a domain-specific admin with tighter constraints and safer workflows.

## Adoption path

- 1 day POC:
  - Confirm BUSL-1.1 constraints and whether internal-only usage is acceptable.
  - Run Directus locally against a sample schema and explore activity log/revisions UX.
  - Extract the specific UX patterns we want for our audit log viewer (timeline, actor attribution, diffs, version restore).
- 1 week integration:
  - If internal-only: use Directus as a back-office data ops console for staff (strict access controls).
  - Otherwise: implement “Directus-inspired” UX patterns in our own admin:
    - revision history
    - field-level diffs (jsondiffpatch)
    - restore/version rollback workflows
- 1 month hardening:
  - Ensure any internal data console has strong governance (audit, approvals, break-glass).

## Risks

- Maintenance risk: Medium. Platform service + plugins require upkeep.
- Security risk: High. A DB-console UI is high-risk; enforce least privilege and audit everything.
- Scope mismatch: Medium. Directus is general-purpose “admin over DB”; our needs are domain-specific.
- License risk: Very High. BUSL is not permissive; likely incompatible with a managed service product offering. Treat as “ideas/patterns” unless explicitly approved.

## Sources

- https://github.com/directus/directus

## Score (0–100) + reasoning

- Score: 42
- Why: Great UX patterns and concepts, but BUSL license makes it a poor default for adoption in a managed-service context; best as inspiration.

---

## Repo description (from GitHub)

The flexible backend for all your projects 🐰 Turn your DB into a headless CMS, admin panels, or apps with a custom UI, instant APIs, auth & more.
