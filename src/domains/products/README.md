# Products domain

Owns storefront merchandising pages (PDP, search). Imports: `@products/*`.

Standard structure (aligned with other domains):
- data/            – hard-coded configs, types, loaders
- hooks/           – domain React hooks (data merge, gallery, etc.)
- logic/           – pure helpers/selectors (no React)
- state/           – shared domain state (reserved)
- ui/
  - components/    – shared atoms/molecules for product UI
  - layouts/       – layout wrappers if product pages need custom chrome
  - pages/         – ProductPage, SearchResultsPage
  - providers/     – domain-scoped providers (currently empty)
  - sections/      – reusable PDP sections
  - archive/       – parked/unused sections (now in `src/archive/products/ui`)

Notes:
- Configs live in data/product-config.ts; loaders in data/product-loaders.ts.
- Sections are split for PDP; landing-specific sections live in `@landing/ui/sections/shop`.
