# Domain architecture reshuffle — proposal (2025-12-20)

## Current layout (snapshot)
- `src/domains/`: account, admin, auth, blog, brand, cart, checkout, creators, landing, products, rewards, README.
- Aliases noted in `docs/08-meta/repo/meta/domains-README.md`: `@landing`, `@blog`, `@shop` (products/cart/checkout/shared), `@account`, `@auth`, `@admin`, `@shopify`, plus `@/lib/*`.

## Target top-level domains
- **client/** — all customer-facing experiences (storefront + account + rewards). Contains marketing (landing/brand), shop (products/cart/checkout), account, loyalty/rewards, tracking/analytics hooks.
- **admin/** — merchant/operator console (existing admin domain).
- **creator/** — creator/affiliate experience (rename current `creators` to singular for consistency).
- **blog/** — editorial/blog surfaces.
- **platform/** (new shared services layer) — cross-cutting infra: auth, feature flags, CMS/Shopify/Supabase clients, observability, design tokens (keeps `src/lib/` lean).
- **ui-kit/** (optional) — reusable presentational components that are domain-agnostic; keep small to avoid a new “shared” trap.

## Auth placement options
- Option A: `src/domains/auth/` stays a domain, but consumed only via a thin API exposed from `platform/auth` (UI lives with flows such as client-account sign-in).
- Option B (leaner): move auth into `platform/auth/` (logic, tokens, providers) and keep UI flows inside the consuming domain (e.g., `client/ui/auth`, `admin/ui/auth`).
- Recommendation: adopt Option B to clarify that auth is a cross-cutting capability, not a business domain; expose hooks/providers and typed guards from `platform/auth`.

## Proposed substructure per domain
- `client/`
  - `marketing/` (landing, brand stories, promos)
  - `shop/` (products, cart, checkout, order status)
  - `account/` (profile, orders, addresses)
  - `rewards/` (loyalty, referrals)
  - `ui/`, `logic/`, `data/`, `hooks/`, `state/` inside each slice as needed.
- `admin/`
  - `catalog/`, `orders/`, `content/`, `users/`, `settings/` (mirror existing features later).
- `creator/`
  - `dashboard/`, `payouts/`, `links/`, `content/`.
- `blog/`
  - `ui/`, `data/`, `logic/`, `authors/`.
- `platform/`
  - `auth/`, `cms/`, `commerce/` (Shopify client wrappers), `storage/`, `feature-flags/`, `observability/`, `design-tokens/`.

## Flow splits (only where slices are big)
- **products** → `products/{pdp,listings,reviews,shared}/…` each keeping the A-shape (`data/hooks/logic/providers/state/ui/{components,sections,pages,layouts}`).
- **checkout** → `checkout/{checkout-flow,confirmation,shared}/…`.
- **cart** → keep flat unless promos/eligibility gets heavy; then `cart/{core,promos}/…`.
- **admin** → split by functional areas (see below).
- **creator** → split if it grows: `creator/{dashboard,links,payouts,content}/…`.
- **blog** → stay flat unless authoring/tools expand; then `blog/{posts,authors,shared}/…`.

## Admin domain split plan
- Top-level: `admin/`
  - `catalog/` — products, variants, collections; UX and data for merchandising.
  - `pages/` — site pages management (was “Pages components”).
  - `media/` — asset library and uploads.
  - `blog/` — editorial/admin-side blog management.
  - `orders/` (future-proof for fulfillment/returns if/when added).
  - `analytics/` — analytics + activity streams (can house dashboards/overview widgets).
  - `settings/` — roles, permissions, feature flags, org/shop settings.
- Each admin slice keeps the same layered shape: `data/`, `hooks/`, `logic/`, `providers/`, `state/`, `ui/{components,sections,pages,layouts}`.
- Dashboards live in `analytics/ui/pages/dashboard` (or section) and can compose widgets from other slices (catalog KPIs, orders snapshot, activity feed).

## UI-kit placement (keep tiny)
- Location: `src/domains/ui-kit/` (alias `@ui-kit`) or `src/ui-kit/` if we want it outside domains but still proximate.
- Contents: only domain-agnostic primitives (buttons, inputs, typography, modal/sheet wrappers). No data fetching, routing, or domain terminology.

## Migration plan (no code changes yet)
1) Lock names: confirm `client`, `admin`, `creator`, `blog`, `platform`, optional `ui-kit`.
2) Create alias map changes for `tsconfig.*`/`vite.config.ts`: add `@client`, `@creator`, `@blog`, `@platform`, adjust/remove `@shop`, `@auth`, `@shop/shared` once moved.
3) Directory moves (git mv later):
   - Move `landing`, `brand` -> `client/marketing`.
   - Move `products`, `cart`, `checkout`, `rewards` -> `client/shop`.
   - Move `account` -> `client/account`.
   - Rename `creators` -> `creator`.
   - Keep `admin` where it is (may reorganize internally).
   - Move `blog` -> `blog/`.
   - Extract `auth` logic/providers to `platform/auth`; place sign-in/up UI under `client/ui/auth` and `admin/ui/auth` as needed.
4) Update imports & aliases incrementally per slice; prioritize high-churn areas (shop, auth) to reduce merge pain.
5) Add lint rule (later) to forbid cross-domain imports except via `@platform` or explicit API entrypoints.
6) Refresh docs: `docs/08-meta/repo/meta/domains-README.md`, `src/domains/README.md`, and add a short “How to add a feature” for `client`.

## How to move without breaking routes/func
- Stage aliases first: add new path aliases (`@client`, `@platform`, etc.) while keeping old ones; remove old aliases only after all imports are updated.
- Shim re-exports: after moving a slice, leave a temporary `index.ts` in the old path that re-exports from the new location; delete shims once codemodbed imports are clean.
- Move one slice at a time: pick a bounded slice (e.g., `products`), `git mv`, run an import codemod (jscodeshift/ts-node or ripgrep + sed), then `npm run typecheck`.
- Update routes immediately: fix route/component import paths in shells/layouts/route config right after moving page components; shims catch stragglers.
- Rewire providers/stores: when moving `providers/` or `state/`, update composition roots (app shell/layout wrappers) in the same change.
- Platform extraction: create `platform/*` with identical exports, point domains to `@platform/*`, and remove direct SDK imports from domains in that sweep.
- Testing gates: after each move run `npm run typecheck`; optionally smoke `npm run dev` to load the moved routes; run targeted unit/UI tests if they exist.
- Cleanup pass: once no imports use the legacy paths, remove old aliases and delete shims.

## Execution checklist (detailed)
1) [DONE 2025-12-20] Freeze scope: confirm target domains (`client`, `admin`, `creator`, `blog`, `platform`, `ui-kit`) and flow splits (products, checkout, admin, creator as needed).
2) [DONE 2025-12-20] Inventory aliases: list current aliases from `tsconfig.*`, `vite.config.ts`, ESLint import rules; decide final alias map (`@client`, `@admin`, `@creator`, `@blog`, `@platform`, `@ui-kit`).
3) [DONE 2025-12-20] Add new aliases (keep old): update `tsconfig.*` + `vite.config.ts` to include new aliases while retaining old ones; commit once verified by `npm run typecheck`.
4) [DONE 2025-12-20] Prep codemod scripts: create small scripts/commands to rewrite imports (e.g., jscodeshift or ts-node + ts-morph). Dry-run on a sample file.
5) [DONE 2025-12-20] Plan slice order: move highest-churn slices first to minimize conflicts — order locked: `products` → `cart` → `checkout` → `account` → `rewards` → `marketing (landing/brand)` → `creator` → `blog` → `admin` → `auth` (into platform).
6) [DONE 2025-12-20] Create `platform/` skeleton: add folders (`auth`, `cms`, `commerce`, `feature-flags`, `observability`, `design-tokens`, `storage`) with placeholder index files exporting nothing (for wiring).
7) [DONE 2025-12-20] Create `ui-kit/` skeleton (optional): add minimal primitives folder and README stating scope.
8) [DONE 2025-12-20] Move `products` slice: `git mv src/domains/products src/domains/client/shop/products`; alias `@products` now points to new path (shim optional; deferred).
9) [DONE 2025-12-20] Codemod imports for `products`: rewrote `@products/*` to `@client/shop/products/*`; routes/imports updated via alias; `npm run typecheck -- --noEmit` ✅.
10) [DONE 2025-12-20] Repeat for `cart`: move, add shim, codemod, typecheck.
11) [DONE 2025-12-20] Repeat for `checkout`: include `checkout-flow`/`confirmation` subfolders if splitting now.
12) [DONE 2025-12-20] Move `account` and `rewards` into `client`; update imports and routes; typecheck.
13) [DONE 2025-12-20] Move `landing` + `brand` into `client/marketing`; update marketing routes; typecheck.
14) [DONE 2025-12-20] Rename `creators` → `creator`; update aliases/imports; typecheck.
15) [DONE 2025-12-20] Blog location verified (already under `src/domains/blog`); no move required. Alias `@blog` remains correct; routes/imports unchanged; typecheck previously passing.
16) [DONE 2025-12-20] Admin reorg: create `admin/{catalog,pages,media,blog,orders,analytics,settings}`; move existing admin subfeatures into nearest match; add shims for old admin paths; update imports and admin routes; typecheck.
17) [DONE 2025-12-20] Platform extraction: move auth logic/providers to `platform/auth`; move shared SDK clients to `platform/commerce` or `platform/cms`; update domains to import from `@platform/*`; remove direct SDK imports; typecheck.
18) [DONE 2025-12-20] Remove shims slice by slice: when import searches show zero usage of old paths, delete the shim files for that slice.
19) [DONE 2025-12-20] Prune old aliases: once all shims are gone and imports updated, remove legacy aliases from `tsconfig.*` and `vite.config.ts`; run full `npm run typecheck`.
20) Lint rule guard: add ESLint import-boundary rule (or custom lint) to prevent cross-domain imports except via `@platform` or approved APIs.
21) Clean docs: update `src/domains/README.md`, `docs/08-meta/repo/meta/domains-README.md`, and add per-domain “how to add a feature” notes reflecting new paths.
22) Final QA: run `npm run dev` smoke for primary routes (client shop/account, admin, blog, creator), and any available tests; note follow-ups.

## Codemod playbook (prepared)
- Tooling options:
  - **jscodeshift** (JS): `npx jscodeshift -t ./scripts/codemods/alias-rewrite.js "src/**/*.{ts,tsx}" --oldAlias=@products --newAlias=@client/shop/products`
  - **ts-node + ts-morph** (TS): script to rewrite ImportDeclarations matching a given prefix.
  - **ripgrep + sd** (fast text replace): `rg "@products" src -l | xargs sd "@products/" "@client/shop/products/"`.
- Planned mappings (apply per slice as it moves):
  - `@products/*` → `@client/shop/products/*`
  - `@cart/*` → `@client/shop/cart/*`
  - `@checkout/*` → `@client/shop/checkout/*`
  - `@account/*` → `@client/account/*`
  - `@rewards/*` → `@client/rewards/*` (or `@client/shop/rewards/*` if we nest)
  - `@landing/*` and `@brand/*` → `@client/marketing/*`
  - `@creators/*` → `@creator/*`
  - `@auth/*` → `@platform/auth/*` (logic/providers), UI flows will live in domain-specific paths
  - `@shared/*` → evaluate: either `@platform/commerce/*` / `@platform/cms/*` / `@platform/*` depending on contents
- Dry-run spot check command:
  - `rg "@products" src | head` (before/after) to verify rewrites are scoped.
  - `npm run typecheck -- --noEmit` after each codemod batch.

## Decision log
- 2025-12-20 (Step 1): Scope frozen.
  - Target domains: `client`, `admin`, `creator`, `blog`, `platform`, optional `ui-kit`.
  - Flow splits to apply where big: `products` (pdp, listings, reviews, shared), `checkout` (checkout-flow, confirmation, shared), `admin` (catalog, pages, media, blog, orders, analytics, settings), `creator` (dashboard, links, payouts, content) if/when it grows; `cart` split only if promo/eligibility logic grows; `blog` split only if authoring tools expand.
  - UI-kit: keep tiny and domain-agnostic; location `src/domains/ui-kit/` (alias `@ui-kit`) or `src/ui-kit/`—decide at alias stage.
- 2025-12-20 (Step 2): Alias inventory + target map.
  - Current aliases (tsconfig.app + vite): `@`, `@ui`, `@ui-lib`, `@landing`, `@creators`, `@brand`, `@cart`, `@checkout`, `@products`, `@shared`, `@blog`, `@admin`, `@auth`, `@account`, `@rewards`, `@content`, `@layouts`, `@utils`, `@lib`.
  - ESLint: no path alias rules (clean).
  - Target alias map to add (while keeping old during transition):
    - `@client/*` -> `src/domains/client/*`
    - `@admin/*` -> `src/domains/admin/*` (retains name)
    - `@creator/*` -> `src/domains/creator/*`
    - `@blog/*` -> `src/domains/blog/*` (same as today)
    - `@platform/*` -> `src/domains/platform/*`
    - `@ui-kit/*` -> `src/domains/ui-kit/*` (or `src/ui-kit/*` if we pick outside-domains location)
    - Keep `@/` root for shared lib until platform extraction done.
  - Legacy aliases to retire after moves/codemods: `@landing`, `@brand`, `@cart`, `@checkout`, `@products`, `@creators`, `@auth`, `@account`, `@rewards`, `@shared` (plus adjust `@ui` only if we move primitives to `@ui-kit`).
- 2025-12-20 (Step 3): New aliases added and typechecked.
  - Added to `tsconfig.app.json` and `vite.config.ts`: `@client`, `@creator`, `@platform`, `@ui-kit` (kept all legacy aliases).
  - Chosen UI-kit location: `src/domains/ui-kit/` (alias `@ui-kit`).
  - Verification: `npm run typecheck -- --noEmit` ✅.
- 2025-12-20 (Step 4): Codemod playbook prepared (no code run yet).
  - Options captured: jscodeshift, ts-morph/ts-node, and ripgrep+sd quick replace.
  - Mappings listed per legacy alias to new destinations; added dry-run and typecheck guard commands.
- 2025-12-20 (Step 5): Move order locked.
  - Order: products → cart → checkout → account → rewards → marketing (landing/brand) → creator → blog → admin → auth/platform.
- 2025-12-20 (Steps 6–7): Skeletons created.
  - `src/domains/platform/{auth,cms,commerce,feature-flags,observability,design-tokens,storage}` with placeholder `index.ts`.
  - `src/domains/ui-kit/README.md` stub; alias already wired (`@ui-kit`).
- 2025-12-20 (Step 8): Products slice moved.
  - `src/domains/products` -> `src/domains/client/shop/products`.
  - Alias `@products` now points to the new path (tsconfig + Vite updated); shim deemed optional for now because alias covers legacy imports.
  - Typecheck after move: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Step 9): Products imports codemodded.
  - Rewrote `@products` → `@client/shop/products` across `src` (perl + rg).
  - Typecheck after codemod: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Step 10): Cart slice moved + codemodded.
  - `src/domains/cart` -> `src/domains/client/shop/cart`; aliases updated (`@cart` -> new path).
  - Imports rewritten `@cart` → `@client/shop/cart` across `src` (perl + rg).
  - Typecheck after move/codemod: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Step 11): Checkout slice moved + codemodded.
  - `src/domains/checkout` -> `src/domains/client/shop/checkout`; aliases updated (`@checkout` -> new path).
  - Imports rewritten `@checkout` → `@client/shop/checkout` across `src` (perl + rg).
  - Typecheck after move/codemod: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Step 12): Account + Rewards moved + codemodded.
  - `src/domains/account` -> `src/domains/client/account`; `src/domains/rewards` -> `src/domains/client/rewards`; aliases updated.
  - Imports rewritten `@account` → `@client/account`, `@rewards` → `@client/rewards`.
  - Typecheck after move/codemod: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Step 13): Marketing (landing + brand) moved + codemodded.
  - `src/domains/landing` -> `src/domains/client/marketing`; `src/domains/brand` -> `src/domains/client/marketing/brand`.
  - Aliases updated (`@landing`, `@brand` -> new paths); imports rewritten.
  - Typecheck after move/codemod: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Step 14): Creators renamed → Creator, imports updated.
  - `src/domains/creators` -> `src/domains/creator`; aliases updated (`@creators` now points to new path plus new `@creator` alias).
  - Imports rewritten `@creators` → `@creator` across creator slice.
  - Typecheck after rename: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Step 15): Blog verified (no move needed).
  - Already located at `src/domains/blog`; alias `@blog` correct; no import changes required.
- 2025-12-20 (Step 16): Admin reorg staged with shims.
  - Created `admin/{catalog,pages,media,blog,orders,analytics,settings}`.
  - Moved admin UI pages into slices: catalog (ProductsPage, ProductPreviewFramePage, ComponentsPage, ComponentDetailPage), blog (BlogsPage, BlogDetailPage), media (MediaPage), pages (PagesPage, ContentPage, GlobalsPage), analytics (AnalyticsPage, ActivityPage, DashboardPage). Orders/settings currently empty.
  - Added stub re-export files at old `admin/ui/pages/*` to avoid import breakage; updated `admin/ui/pages/index.ts` to point to new locations.
  - Typecheck after move/shims: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Step 17 partial): Platform auth routed.
  - `@auth` imports codemodded to `@platform/auth`; `src/domains/platform/auth/index.ts` now re-exports the existing auth domain.
  - Typecheck after codemod: ✅ (`npm run typecheck -- --noEmit`).
  - Next: migrate actual auth logic/providers into `platform/auth`, and move shared SDK clients into `platform/commerce` or `platform/cms`; update any remaining direct SDK imports.
- 2025-12-20 (Step 17 cont.): Auth logic moved into platform.
  - Moved `src/domains/auth/{data,hooks,logic,providers,ui/pages}` -> `src/domains/platform/auth/...`.
  - `@platform/auth` now exports from those folders; `src/domains/auth/index.ts` left as a shim re-export (deprecated notice).
  - Typecheck after move: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Step 17 cont.2): Shopify client moved to platform/commerce (legacy approach at the time).
  - Moved `src/lib/shopify` -> `src/domains/platform/commerce/shopify`.
  - Added shims at `src/lib/shopify/{shopify.ts,shopifyCart.ts}` re-exporting platform paths.
  - Typecheck after move: ✅ (`npm run typecheck -- --noEmit`).
  - Note (2025-12-29): This direct Shopify client layer has since been replaced by ports/adapters (`@platform/commerce`, internal-API first) and the legacy `@platform/commerce/shopify/*` surface was removed to avoid accidental coupling.
- 2025-12-20 (Step 17 cont.3): Supabase client moved to platform/storage.
  - Moved `src/lib/supabase.ts` -> `src/domains/platform/storage/supabase.ts`; shim left at `src/lib/supabase.ts`.
  - Updated imports to `@platform/storage/supabase`.
  - Typecheck after move: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Step 17 complete): Shims removed for auth/shopify/supabase; platform is source of truth.
  - Deleted `src/domains/auth` shim and `src/lib/shopify` & `src/lib/supabase` shims after confirming no legacy imports.
  - Updated `src/main.tsx` to use platform/cart and platform/auth providers directly.
  - Typecheck after shim removal: ✅ (`npm run typecheck -- --noEmit`).
- 2025-12-20 (Steps 18–19): Shims cleared, legacy aliases pruned.
  - Removed old alias entries (@landing, @brand, @cart, @checkout, @products, @auth, @account, @rewards, @creators, @shared) from tsconfig/vite; deduped @creator.
  - Typecheck after alias prune: ✅ (`npm run typecheck -- --noEmit`).

## Open questions to decide before moving files
- Do we want `ui-kit` now, or keep everything domain-scoped until duplication appears?
- Should rewards live under `client/shop` or stay a sibling (`client/rewards`)? Depends on ownership (merch vs growth).
- Any embedded-admin / Shopify app code that should remain separate (`shopify/` domain) or fold into `admin`?
- Is creator a first-class domain with its own auth flows, or does it reuse client/admin auth UI?

## Suggested next steps (once approved)
- Confirm the target naming and auth placement.
- Draft alias changes in `tsconfig.*` and `vite.config.ts` (no moves yet).
- Prepare a rename/move checklist with estimated blast radius (imports to touch, providers to re-home).
