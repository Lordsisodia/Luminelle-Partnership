# Admin Media subdomain

Purpose
- Media library and asset management surfaces at /admin/media.

Structure
- data/ — storage/CMS adapters for media items.
- logic/ — transformations/helpers (grouping, sorting, metadata extraction).
- hooks/ — view-model hooks for UI consumption.
- ui/ — pages/components/render-only; push business logic into hooks/logic.

Notes
- Keep MediaPage lean; derive lists and filters via hooks.
