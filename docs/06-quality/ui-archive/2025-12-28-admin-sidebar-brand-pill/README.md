# Admin sidebar brand pill (archive)

This folder is a **UI preservation snapshot** of the Lumelle Admin sidebar “brand pill” UI (the `L` badge + `LUMELLE™` + `Admin console` + the circular collapse/expand button).

It exists because this UI is easy to accidentally delete/overwrite during refactors, and we want a clean copy to refer back to.

## Provenance

- Source file: `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
- Source lines: ~312–343 (see the “Desktop sidebar” header area)
- Archived on: **2025-12-28**
- Git HEAD at archive time: `55aea83`

## What’s included

- `AdminSidebarBrandPill.tsx`: a standalone React/JSX extraction that keeps the **exact Tailwind classnames** from the source.

## Notes

- The appearance depends on the project’s Tailwind config + semantic token classes (e.g. `text-semantic-text-primary`, `bg-brand-porcelain`, `border-semantic-legacy-brand-blush/60`).
- This file is stored under `docs/` so it won’t affect builds even if it’s not used.

