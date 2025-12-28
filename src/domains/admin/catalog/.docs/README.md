# Admin Catalog
Purpose: Manage products and components in the admin console.

Routes:
- /admin/products, /admin/components, /admin/components/:key, /admin/product-preview-frame.

Data sources:
- Shopify product data, Supabase CMS metadata, component defaults (shared/data/componentMeta).

Key modules:
- data/ (fetchers), logic/ (filters/transforms), hooks/ (view models), ui/pages (ProductsPage, ComponentsPage, ComponentDetailPage, ProductPreviewFramePage).

Roadmap:
- Hook up live Shopify data, add bulk actions, clarify component vs product ownership.
