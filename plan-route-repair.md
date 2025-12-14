# Route & Architecture Repair Plan (30 Steps)

Goal: remove stubs, realign imports/exports after refactor, and get `npm run build` passing with real pages/sections.

## Prep
1. Snapshot current git status for reference.
2. Remove all stub files added during triage (landing pages/sections, shop sections, shared/cart/lib stubs, placeholder wrappers).
3. Remove `@siso/ui` dependency (done); use local helpers instead.

## Alias & Config Hygiene
4. Verify `tsconfig.app.json` paths (one `ui` segment) and remove broad excludes/ts-nocheck reliance.
5. Normalize absolute imports: replace leading `/shared/*`, `/cart/*`, `/state/*`, `/products/*` with alias paths (e.g., `@/shared/*` or domain paths).

## Landing Domain Restore
6. Restore real landing layouts into `src/domains/landing/ui/layouts/` and add index/bridge exports.
7. Restore real landing components into `src/domains/landing/ui/components/` with index/bridge exports.
8. Restore real landing sections into `src/domains/landing/ui/sections/<section>/` and fix their internal imports.
9. Clean landing sections for duplicated vars / undefined identifiers (Hero, SuccessStories, BrandStory).
10. Remove ts-nocheck from landing files once fixed.

## Shop Domain – Products
11. Restore real shop product sections into `src/domains/shop/products/ui/sections/<slug>/` (remove stubs).
12. Fix `src/domains/shop/products/ui/sections/index.ts` to export existing components (default vs named consistently).
13. Restore product pages into `src/domains/shop/products/ui/pages/` and fix imports to sections, SEO, product logic.
14. Restore product logic (`shop/products/logic/product.ts`, `shop/shared/shopify.ts` or equivalent) and remove ts-nocheck.
15. Ensure helper components (HighlightsDots, SpinWheel, SocialProofStrip, PdpTeaserCard, ProblemSolutionGrid) exist with real code or remove their usage.

## Shop Domain – Cart/Checkout
16. Choose cart mode (local-only or Shopify). If local, guard Shopify code paths and avoid null cart IDs; if Shopify, point to real helpers.
17. Fix `CartContext` imports to the chosen helper paths and ensure types are correct.
18. Restore checkout pages (order confirm/track/returns) and adjust imports (MarketingLayout, SEO helpers, cart hooks).

## Shared Helpers
19. Restore real `src/lib/seo.ts` (setMetaTags, injectJsonLd, setNoIndex/NoFollow) and `src/lib/supabase.ts` implementations.
20. Consolidate Shopify helper to a single source (e.g., `src/shared/shopify.ts` or `src/domains/shop/shared/shopify.ts`) and update all imports.
21. Ensure `src/lib/ui.ts` uses local utilities; remove placeholder content.

## Blog/Admin/Auth/Account
22. Restore blog pages to `src/domains/blog/ui/pages/*` and verify SectionHeading/Layout imports.
23. Restore admin pages to `src/domains/admin/ui/pages/*`; fix MarketingLayout/SEO imports.
24. Restore auth pages/providers; ensure `useSyncUserToSupabase` points to real implementation.
25. Restore account pages/stores; ensure AccountStore and SEO imports are valid.

## Barrel & Index Hygiene
26. Add/verify index or bridge files so imports like `@landing/ui/components/SectionHeading` resolve without double `ui`.
27. Remove obsolete barrels/wrappers created during stubbing (products/ui/sections wrappers, etc.).

## Clean-up & Validation
28. Delete remaining ts-nocheck annotations unless absolutely required; fix underlying issues instead.
29. Run `npm install` (if deps change), `npm run typecheck`, then `npm run build`; iterate on remaining errors until green.
30. Commit-ready sweep: remove unused files, ensure README/ARCHITECTURE docs reflect final paths.
