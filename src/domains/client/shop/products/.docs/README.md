# Client Products
Purpose: Product discovery (PDP, search results).

Routes:
- /product/:slug, /search

Data sources:
- Shopify products, content enrichments, Supabase for extras.

Key modules:
- data/ (product-config/loaders), hooks/ (content), ui/pages (ProductPage, SearchResultsPage), sections/*.

Roadmap:
- Variant handling, inventory badges, richer search filters.
