# Client Shop
Purpose: Shopping flow (PDP, cart, checkout, confirmation).

Subdomains:
- products/, cart/, checkout/

Data sources:
- Shopify storefront, Supabase for ancillary data, feature flags.

Key modules:
- data/ (per subdomain), logic/, hooks/, ui/ pages/components.

Roadmap:
- Ensure SSR/SEO coverage, streamline Shopify handoff, add observability on cart/checkout.
