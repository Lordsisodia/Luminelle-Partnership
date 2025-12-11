# Products domain

Owns storefront merchandising pages (Shop landing, PDP, search). Imports: `@products/*`.

Suggested structure (current pages only):
- ui/pages — ShopLandingPage, ProductPage, SearchResultsPage
- data/ — per-product configs (to add, e.g., `shower-cap.ts`, `eyelash-curler.ts`)
- hooks/logic — add if/when product-specific logic is needed.

Shared merchandising sections live in `@shared/ui/sections`.
