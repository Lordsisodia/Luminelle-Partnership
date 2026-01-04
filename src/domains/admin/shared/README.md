# Admin shared utilities

Purpose
- Shared data/logic/hooks used across multiple admin subdomains (catalog, pages, layout, etc.).

Structure
- data/ — shared schemas/defaults.
- logic/ — shared pure helpers.
- hooks/ — reusable view-model hooks.

Importing
- Prefer `@admin/shared/...` paths. Compatibility shims remain in `src/domains/admin/{data,logic,hooks}` for now.
