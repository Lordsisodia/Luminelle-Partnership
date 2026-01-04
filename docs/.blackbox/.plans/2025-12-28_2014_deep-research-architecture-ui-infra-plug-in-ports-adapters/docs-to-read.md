# Docs To Read (and why)

- [ ] `docs/02-engineering/architecture/ARCHITECTURE-HOWTO.md` — repo layering + naming conventions.
- [ ] `src/domains/README.md` — import rules + how platform/domain boundaries are intended.
- [ ] `src/domains/platform/commerce/.docs/README.md` — intended scope of platform commerce.
- [ ] `src/domains/platform/commerce/runtime.ts` — adapter selection + capability model (mock vs real).
- [ ] `src/domains/platform/commerce/ports/*` — current contracts + DTOs (what UI/domain should depend on).
- [ ] `src/domains/platform/commerce/adapters/shopify/internal-api/*` — Shopify mapping behind ports (internal API).
- [ ] `src/domains/client/shop/cart/providers/CartContext.tsx` — confirm UI consumes ports (and what legacy cleanup remains).
- [ ] `src/ui/providers/DrawerProvider.tsx` — vendor-specific UI copy + IDs.
- [ ] `src/lib/product.ts` — legacy “shared lib” catalog plumbing (verify no vendor types leak).
- [ ] `src/lib/sections.ts` — legacy “shared lib” sections plumbing (verify no vendor queries leak).
- [ ] `src/domains/platform/payments/runtime.ts` — proof the Stripe-later pattern already exists (runtime + adapter).
