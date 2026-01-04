# Admin Domain Overview
Purpose: Internal admin console for operators/editors.

Routes & surfaces:
- /admin (shell), dashboard, products, components, pages, media, blogs, analytics, orders, settings.

Data sources:
- Supabase (cms_* tables), Shopify (products), storage (media), feature flags.

Key modules:
- shared/ (ui, data, hooks, logic), subdomains blog/analytics/catalog/media/orders/pages/settings.

Auth/roles:
- AdminGuard + Clerk JWT roles; requires admin role.

Roadmap/TODO:
- Consolidate nav, define ownership per subdomain, add analytics data wiring.
