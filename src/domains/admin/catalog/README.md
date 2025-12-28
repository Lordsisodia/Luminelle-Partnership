# Admin Catalog subdomain

Purpose
- Admin product/catalog tooling (products, components) at /admin/products and related routes.

Structure
- data/ — fetchers/adapters for catalog data.
- logic/ — transforms, filtering/sorting helpers for products/components.
- hooks/ — view-model hooks used by UI pages/components.
- ui/ — pages/components/render-only; keep business logic in hooks/logic.

Notes
- Consider separating product vs component helpers within logic/.
