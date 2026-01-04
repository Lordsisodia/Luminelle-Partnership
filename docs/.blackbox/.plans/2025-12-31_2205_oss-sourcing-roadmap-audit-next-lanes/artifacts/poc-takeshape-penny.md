# POC notes — takeshape/penny (storefront reference mining)

Repo: `takeshape/penny` (MIT)  
URL: https://github.com/takeshape/penny  

Goal (1 day): mine a modern Next.js App Router commerce starter for reusable patterns:
- PLP + PDP routing structure
- cart state + checkout handoff “recovery”
- search modal + search state
- component + testing setup (Storybook + Playwright)

This is **pattern mining** (reference implementation), not a commitment to adopt TakeShape/Vendure/etc.

---

## What to mine (high signal)

### 1) Folder structure that stays readable
Key pattern: keep “feature” boundaries explicit (Cart/ProductCategory/ProductPage/Search), separate from shared `components/`.

Pointers:
- Routes:
  - `src/app/(shop)/collections/[...collection]/page.tsx` (collection/PLP route)
  - `src/app/(shop)/products/[...product]/page.tsx` (PDP route)
- Feature modules:
  - `src/features/ProductCategory/*`
  - `src/features/ProductPage/*`
  - `src/features/Cart/*`
  - `src/features/Search/*`

### 2) Cart state: deterministic identity + derived atoms
Key pattern: cart item identity includes more than just `variantId`; it keys by:
- `id` + `variantId` + subscription cadence (`interval`, `intervalCount`) + option attributes (`attributesKey`)

Pointers:
- `src/features/Cart/store.ts`
  - `addToCartAtom` merges quantities by a stable composite key.
  - `cartQuantityAtom` and `cartSubtotalAtom` are derived atoms (cheap and consistent).

### 3) Checkout handoff recovery (success vs cancel)
Key pattern: treat “checkout return” as an explicit state transition using query params:
- `shopify_checkout_action=success` → clear cart + success notification
- `shopify_checkout_action=canceled` → keep cart + cancel notification
- remove query params to keep URLs clean

Pointers:
- `src/features/Cart/CartProvider.tsx`
  - reads `shopify_checkout_action` and `discount` from URL
  - emits a notification and clears/persists cart accordingly

### 4) Search UX and query isolation
Key pattern: keep search query + transforms isolated from UI modal.

Pointers:
- `src/features/Search/useSearch.ts` (search state hook; uses Apollo)
- `src/features/Search/queries.ts` (GraphQL query definition)
- `src/features/Search/Modal/Modal.tsx` (UI shell)
- `src/features/Search/Modal/components/ModalSearchItem.tsx` (result list item)

### 5) “Real app” testing posture
Key pattern: this repo is set up like a production app with:
- Storybook component stories (fast mining + regression harness)
- Playwright tests (end-to-end workflows)

Pointers:
- `src/features/Cart/Cart.stories.tsx` and `src/features/Cart/components/*.stories.tsx`
- `src/features/ProductCategory/ProductCategory.stories.tsx`
- `src/features/ProductPage/ProductPage.stories.tsx`
- `playwright.config.ts` + `playwright/`
- `.storybook/`

---

## Integration touchpoints (for Lumelle)

Even if we don’t adopt this repo, the patterns map cleanly to Lumelle’s needs:
- **Cart / state**: stable cart item identity + derived totals (good for our cart UI primitives).
- **Checkout return handling**: explicit `success|canceled` outcomes as a small state machine.
- **Search modal**: separate query logic/hook from UI (makes it easy to swap Shopify search backend later).

---

## Risks / caveats

- It’s a starter; some decisions may be shaped by TakeShape’s API Mesh and may not transfer 1:1.
- We should treat it as “pattern evidence”, not architecture to copy wholesale.
- Ensure all extracted patterns remain framework-agnostic when we promote them into Blocks Kit contracts.

