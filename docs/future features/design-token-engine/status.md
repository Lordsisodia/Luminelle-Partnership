# Design Token Engine — Status Snapshot

Last updated: 2025-12-14

Scope
- Single-brand per app; no multi-tenant runtime switching.
- Themeable surfaces: landing, PDP, blog, account, admin. Checkout (Shopify) out-of-scope.
- Tokens cover colors, typography, spacing, radii, shadows, assets (logos, font URLs).

What’s built
- Live app wiring (no visual change): `tailwind.config.js` reads `src/theme/tokens.json`, resolves token refs, injects CSS variables, and defines `brand.*` colors via token-backed CSS vars (including opacity-safe RGB vars).
- Semantic alias utilities (no adoption yet): `tailwind.config.js` registers token-backed convenience classes like `text-primary`, `bg-cta`, `bg-subtle`, `border-subtle`, `text-success`, etc.
- Exact-match legacy palette tokens: `src/theme/tokens.json` exposes `semantic.legacy.brand.*` for safe 1:1 migration of `brand-*` usage (esp. blush).
- Wave 1 migration in progress (no visual change): key shared surfaces now use semantic token utilities (`src/ui/providers/DrawerProvider.tsx`, `src/ui/components/PublicHeader.tsx`, `src/ui/components/GlobalFooter.tsx`, `src/ui/pages/NotFoundPage.tsx`, `src/ui/components/SectionHeading.tsx`, `src/components/ui/3d-carousel.tsx`, `src/domains/brand/ui/pages/BrandStoryPage.tsx`, landing sections like `src/domains/landing/ui/sections/hero/HeroSection.tsx` + `src/domains/landing/ui/sections/whatsapp/WhatsAppCtaSection.tsx`, blog surfaces like `src/domains/blog/ui/pages/BlogIndexPage.tsx` + `src/domains/blog/ui/pages/BlogPostPage.tsx`, creators sections like `src/domains/creators/ui/sections/*`, products pages/sections like `src/domains/products/ui/pages/SearchResultsPage.tsx` + `src/domains/products/ui/pages/ProductPage/sections/*`, auth pages/layout like `src/domains/auth/ui/pages/*` + `src/domains/auth/ui/layouts/AuthLayout.tsx`, account pages/layouts like `src/domains/account/ui/pages/*` + `src/domains/account/ui/layouts/AccountLayout.tsx`, cart/checkout flows like `src/domains/cart/ui/pages/CartPage.tsx` + `src/domains/checkout/ui/pages/*`, and the admin console under `src/domains/admin/ui/**/*`, etc.).
- Regression guard (optional): `npm run lint:tokens` blocks reintroducing legacy `*-brand-(cocoa|peach|blush)` utilities outside of `src/archive/`.
- Token validation: `npm run validate:tokens` validates `src/theme/tokens.json` (JSON parses + `{refs}` resolve); CI runs it on PRs/pushes.
- CI enforcement: `.github/workflows/ci.yml` runs `npm run lint:tokens` on PRs/pushes.
- CI build check: `.github/workflows/ci.yml` runs `npm run build` (tsc + vite) on PRs/pushes.
- CI lint: `.github/workflows/ci.yml` runs `npm run lint` (eslint) on PRs/pushes.
- Audit (report-only): `npm run report:colors` lists remaining raw hex literals in `src/` (excluding `src/archive/` and token files).
- Audit (contexts): `npm run report:colors:contexts` reports Tailwind `bg-[...gradient...]` and SVG `fill/stroke="#..."` hex literals, grouped by file.
- Docs bundle (still available): tokens (Lumelle/Noir/Fresh Mint), Style Dictionary config + reference outputs, custom generator, Ajv schema/validator, Tailwind plugin, runtime applier, audit + VRT samples.
- Plans/guardrails: research checklist, rollout plan, timeline, governance proposal, risk register, comms, acceptance criteria, pilot checklist, VRT plan, codemod plan, per-page token map.

Open decisions
- Compiler of record: Style Dictionary vs. custom script.
- Token folder path standard: `theme/` vs. `src/theme/` for live apps.
- Font hosting: remote (Google/Adobe) vs. self-host (@font-face flow provided).
- Token hosting: repo-only vs. CDN/API for future brand swaps.
- CI: add validate/build job and lint for raw hex/brand-* utilities.
- PR template adoption and governance owner/SLA sign-off.

Next actions (non-breaking)
- Start codemod in small waves per `codemod-plan.md` with VRT/smoke checks.
- Add CI guards: schema validation and “no raw hex / no legacy brand-*” lint (after migration starts).
