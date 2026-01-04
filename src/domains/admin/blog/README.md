# Admin Blog subdomain

Purpose
- Admin tooling for blog list and detail (/admin/blogs, /admin/blogs/:slug).

Structure
- data/ — data fetching/loading or CMS adapters for blogs.
- logic/ — pure helpers for sorting/filtering/transforming blog data.
- hooks/ — view-model hooks consumed by UI pages/components.
- ui/ — pages/components/render-only pieces; keep business logic in hooks/logic.

Notes
- `ui/pages/BlogsPage.tsx` and `ui/pages/BlogDetailPage.tsx` remain the render surfaces; shift stateful/filter logic into hooks/logic over time.
