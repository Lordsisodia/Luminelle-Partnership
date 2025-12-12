# Products domain

Owns storefront merchandising pages (Shop landing, PDP, search). Imports: `@products/*`.

Standard structure (aligned with other domains):
- data/            – hard-coded configs, types, loaders
- hooks/           – domain React hooks (data merge, gallery, etc.)
- logic/           – pure helpers/selectors (no React)
- state/           – shared domain state (reserved)
- ui/
  - components/    – shared atoms/molecules for product UI
  - layouts/       – layout wrappers if product pages need custom chrome
  - pages/         – ProductPage, ShopLandingPage, SearchResultsPage
  - providers/     – domain-scoped providers (currently empty)
  - sections/      – reusable PDP/landing sections
  - archive/       – parked/unused sections

Notes:
- Configs live in data/product-config.ts; loaders in data/product-loaders.ts.
- Sections are split for PDP; landing-specific sections moved to landing/ui/sections/shop.
