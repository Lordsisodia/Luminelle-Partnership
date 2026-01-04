# App UI Review — 26 Dec 2025

Scope: quick static audit of the current UI code (no live browser walkthrough). Focused on storefront + checkout/account + global navigation. This is intentionally “major issues only”.

## Top 10 Major UI Flaws

### 1) Checkout is a stub page (breaks the purchase flow)
- **What happens:** `/checkout` renders as plain text (“Checkout temporarily unavailable”) with no layout, no branding, no next steps.
- **Where:** `src/domains/client/shop/checkout/ui/pages/CheckoutPage.tsx`
- **Why it’s major:** This is the highest-intent page in the funnel; a dead end here collapses conversion and trust.
- **Suggested fix:** Either (a) wire up the real checkout handoff flow, or (b) ship a branded “Checkout is down” fallback with clear CTAs (back to cart, contact support, retry) + telemetry.

### 2) Post-purchase support pages are also stubs (creates “we don’t support you” vibes)
- **What happens:** Order confirmation, tracking, and returns routes render “temporarily unavailable” placeholders.
- **Where:**
  - `src/domains/client/shop/checkout/ui/pages/OrderConfirmationPage.tsx`
  - `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`
  - `src/domains/client/shop/checkout/ui/pages/ReturnsPage.tsx`
- **Why it’s major:** Returns + tracking are customer-trust-critical. Even if Shopify handles fulfillment, the site routes should not look broken.
- **Suggested fix:** Replace stubs with simple, branded pages (even if they embed/redirect to Shopify or a helpdesk).

### 3) The entire account area is stubbed (users can’t manage anything)
- **What happens:** `/account` and all subpages render “temporarily unavailable”.
- **Where:**
  - `src/domains/client/account/ui/pages/AccountPage.tsx`
  - `src/domains/client/account/ui/pages/OrdersPage.tsx`
  - `src/domains/client/account/ui/pages/OrderDetailPage.tsx`
  - `src/domains/client/account/ui/pages/AddressesPage.tsx`
  - `src/domains/client/account/ui/pages/PaymentMethodsPage.tsx`
- **Why it’s major:** The header includes “Account” entry points, so users will hit these dead ends frequently.
- **Suggested fix:** At minimum, show a branded account home with links that are enabled/disabled based on what’s implemented, and/or remove entry points until ready.

### 4) “Spin to win” is shipped as a placeholder component (looks unfinished and off-brand)
- **What happens:** PDPs mount a floating “Spin to win” CTA. Opening the modal reveals “Spin wheel placeholder / Replace with marketing spin wheel component”.
- **Where:** `src/domains/client/shop/products/ui/components/SpinWheelPrompt.tsx`
- **Why it’s major:** Placeholder copy and generic neutral styling reads like a dev artifact, not a premium storefront. It also risks covering content on small screens (floating fixed CTA).
- **Suggested fix:** Feature-flag this behind a config toggle (default off) until a real component exists, and add proper modal a11y (focus trap, initial focus, restore focus).

### 5) Cart UI shows incorrect product media + fake compare-at pricing
- **What happens:**
  - Cart line items always show the same hard-coded image, regardless of what the user added.
  - Compare-at price is hard-coded to `£19.99` for every item.
- **Where:** `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
- **Why it’s major:** This directly impacts trust (“is this the item I added?”) and can create refund/support issues if users think they’re buying something else.
- **Suggested fix:** Render `item.image` (or a safe fallback) and only show compare-at when it exists for that SKU.

### 6) Visually “disabled” checkout CTA is still a clickable link
- **What happens:** When `items.length === 0`, the UI renders a disabled-looking link, but it’s still a `<RouterLink to="/checkout">`.
- **Where:** `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
- **Why it’s major:** Users can click through to an already-broken checkout and experience a double failure (“cart is empty” + “checkout unavailable”).
- **Suggested fix:** Use a `<button disabled>` for the disabled state, or conditionally render no link/CTA at all until the cart has items.

### 7) Search results page is “fake” and contains dead links (`#`)
- **What happens:**
  - Search uses a hard-coded `CATALOG` array instead of real product search.
  - Two results have `href: '#'`, leading to dead clicks.
  - Internal navigation uses `<a href>` instead of router navigation.
- **Where:** `src/domains/client/shop/products/ui/pages/SearchResultsPage.tsx`
- **Why it’s major:** Search is a primary way users recover from confusion. Dead links and placeholder catalog makes the app feel untrustworthy.
- **Suggested fix:** Replace with real catalog data and use `<RouterLink>` for internal navigation; add an explicit “0 results” empty state with recommendations.

### 8) In-page section nav is defined but not rendered (users can’t jump to “Reviews / FAQ / …”)
- **What happens:** Multiple pages pass `navItems` to `MarketingLayout`, but `MarketingLayout` doesn’t render any nav UI from those props.
- **Where:**
  - `src/layouts/MarketingLayout.tsx` (props unused)
  - Example callers: `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`, `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
- **Why it’s major:** The UI signals structured sections (ids like `#reviews`, `#faq`) but provides no navigation to them; this hurts scanability and mobile usability.
- **Suggested fix:** Either remove `navItems` entirely (if not part of the UI), or implement a simple sticky section-nav / drawer section links.

### 9) Header redundancy + responsive layout risk
- **What happens:**
  - On desktop (`md`), header shows both an “Account” button and an “Account” icon link, which is redundant and visually noisy.
  - The brand wordmark is absolutely centered; on smaller widths this can collide with the left/right control clusters.
- **Where:** `src/ui/components/PublicHeader.tsx`
- **Why it’s major:** Navigation is the most-used UI surface; redundancy and collisions increase confusion and reduce perceived quality.
- **Suggested fix:** Show either the icon *or* the button depending on breakpoint; avoid `absolute` centering or reserve layout space so the center block never overlaps.

### 10) Landmark semantics: nested `<main>` elements (accessibility + screen reader navigation)
- **What happens:** `MarketingLayout` wraps children in a `<main>`, but some pages also render their own `<main>` element as a child, creating nested main landmarks.
- **Where:**
  - Layout: `src/layouts/MarketingLayout.tsx`
  - Example pages: `src/domains/client/marketing/ui/pages/WelcomePage.tsx`, `src/domains/client/marketing/ui/pages/TermsPage.tsx`
- **Why it’s major:** Screen readers and accessibility tooling expect a single main landmark; nesting hurts navigation and can fail audits.
- **Suggested fix:** Make `MarketingLayout` accept a `mainClassName` and render a `<div>` wrapper instead of nested `<main>` in pages (or remove `<main>` from the layout and let pages own it).

## Quick “trust-killer” inconsistencies worth resolving next
- Shipping threshold copy varies (`£19.99` vs `£20+`) across surfaces (promo strip, cart, SEO copy).
- Prices appear inconsistent across different UIs (e.g. search vs cart/upsells), which reads as bait-and-switch even if it’s just placeholder content.
- Several files use `@ts-nocheck` and placeholder copy; if any of this is production-facing, it will show up in UX QA immediately.

## Additional Major UI / UX Issues (found in code)

### 11) Right-side drawer doesn’t actually animate (appears/disappears instantly)
- **What happens:** Drawer markup only mounts when `menuOpen === true`, so the `transition-transform` never runs on open/close (it starts already at `translateX(0)` and unmounts on close).
- **Where:** `src/ui/providers/DrawerProvider.tsx`
- **Why it’s a big issue:** The drawer is a primary navigation + cart surface. Abrupt appearance feels “buggy” and lowers perceived quality (especially on mobile where it’s used constantly).
- **Suggested fix:** Keep the drawer mounted and toggle transform/opacity states (or use a dialog/drawer component that supports enter/exit transitions).

### 12) Drawer uses fake “people checking out now” urgency
- **What happens:** It shows a random number (e.g., 87/121/205/240/310/480) as “people are checking out now”.
- **Where:** `src/ui/providers/DrawerProvider.tsx`
- **Why it’s a big issue:** This is **fake social proof**. Users increasingly recognize it as a dark pattern; it can backfire on trust and can create compliance risk depending on jurisdiction.
- **Suggested fix:** Remove it, or only show real, audited metrics (and only if you can back them up).

### 13) Drawer shows “Total savings” based on invented compare-at pricing
- **What happens:** If an item doesn’t have a compare-at price, the UI invents one (`~1.3×` price) and then computes “savings” off that.
- **Where:** `src/ui/providers/DrawerProvider.tsx` (`getUnitPricing`, `displayCompareAtTotal`, `savings`)
- **Why it’s a big issue:** This can misrepresent discounts. Even if it “looks good”, it’s a trust killer and a potential consumer-protection problem.
- **Suggested fix:** Only show compare-at/savings when the product actually has compare-at metadata, otherwise hide those lines entirely.

### 14) Drawer shows quantity “Save X%” labels that don’t actually apply
- **What happens:** Quantity dropdown shows “Save 15/20/30/50%” for higher quantities, but cart pricing doesn’t apply any discount logic (it’s still `price × qty`).
- **Where:** `src/ui/providers/DrawerProvider.tsx` (`discountForQty`)
- **Why it’s a big issue:** This is an explicit mismatch between UI claim and behavior. Users will notice at checkout and feel tricked.
- **Suggested fix:** Remove the “Save %” badges until quantity-based pricing is actually implemented (or implement real tier pricing/automatic discounts).

### 15) Drawer accessibility is incomplete (labeling + tab semantics + focus handling)
- **What happens:**
  - `aria-labelledby="drawer-title"` points to an element that doesn’t exist.
  - Tabs use `role="tab"` but there are no `role="tabpanel"` regions and no `aria-controls` wiring.
  - Focus trap uses a snapshot of focusable elements from initial open; switching tabs unmounts/remounts content which can break keyboard navigation.
- **Where:** `src/ui/providers/DrawerProvider.tsx`
- **Why it’s a big issue:** This can create **keyboard traps** and fails basic a11y expectations for dialogs. It’s also a common reason for Lighthouse/axe failures.
- **Suggested fix:** Add a real title element with `id="drawer-title"`, implement proper tab/tabpanel semantics, and either re-compute focusables on tab switch or use a battle-tested dialog + tabs library.

### 16) Product spotlight carousel hides its entire content from screen readers
- **What happens:** When there is more than 1 slide, the slide track sets `aria-hidden="true"`, which hides the active slide content/CTA from assistive tech.
- **Where:** `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx`
- **Why it’s a big issue:** Screen reader users lose access to a key conversion section (“Product spotlight”).
- **Suggested fix:** Remove the `aria-hidden` on the track; instead, mark non-active slides as inert/hidden (or implement a standard carousel pattern with accessible controls).

### 17) Public “Creators” page is visibly placeholder content
- **What happens:** `/creators` renders a stack of “Placeholder content for the creators landing page.”
- **Where:** `src/domains/creator/ui/pages/CreatorsPage.tsx`
- **Why it’s a big issue:** This route is linked in the drawer and footer. Seeing placeholder blocks damages credibility immediately.
- **Suggested fix:** Hide the route until ready, or replace with real, minimal content (even a single strong hero + CTA + FAQ beats placeholders).

### 18) Discounts / promo codes / rewards UI is present but the underlying logic is stubbed
- **What happens:** Cart UI includes a promo code input + “Apply”, spin wheel tries to apply a discount code, but `applyDiscount` is a no-op and `checkoutUrl` is always `undefined`.
- **Where:**
  - `src/domains/client/shop/cart/providers/CartContext.tsx`
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
  - `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- **Why it’s a big issue:** This is “UI that lies” — users do the right thing and nothing happens. It creates support load and churn.
- **Suggested fix:** Either implement real Shopify cart/discount integration end-to-end, or hide these controls until they work.

### 19) Internal navigation sometimes uses raw `<a href>` links (full reload + state loss)
- **What happens:** Some internal routes are navigated with `<a href>` rather than router navigation.
- **Where (examples):**
  - `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx` (links to product)
  - `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx` (CTA)
  - `src/domains/admin/shared/ui/components/AdminGuard.tsx` (sign-in)
- **Why it’s a big issue:** Full reload is slower and can reset transient UI state (open drawer, scroll position, in-progress interactions). It also makes the app feel less “native”.
- **Suggested fix:** Use `RouterLink` (or a shared Link component) for internal navigation; reserve `<a>` for external links.

### 20) Admin on mobile: drawer can’t be opened (no “burger” button)
- **What happens:** `AdminShell` has mobile drawer state (`drawerOpen`) and a drawer component, but no UI control sets `drawerOpen` to `true`.
- **Where:** `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
- **Why it’s a big issue:** On mobile, the admin nav is effectively inaccessible.
- **Suggested fix:** Add an “Open menu” button in the admin top bar that calls `setDrawerOpen(true)` (with proper `aria-controls` / `aria-expanded`).

### 21) “Benefits” section is a stub (renders nothing)
- **What happens:** The landing page includes a “Benefits” section anchor, but the section component returns `null`, so users scroll/jump into empty content.
- **Where:**
  - Stub component: `src/domains/client/marketing/ui/sections/shop/benefits-section/BenefitsSection.tsx`
  - Used in: `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (`<section id="benefits">…`)
- **Why it’s a big issue:** This looks like the site is “missing chunks” and breaks the in-page narrative (especially when nav/anchors reference it).
- **Suggested fix:** Either implement the section or remove the anchor + nav item until it’s ready.

### 22) “Bundle cards” section is a stub (renders nothing)
- **What happens:** The landing page renders `<BundleCards />`, but the component returns `null`.
- **Where:**
  - Stub component: `src/domains/client/marketing/ui/sections/shop/bundle-cards/BundleCards.tsx`
  - Used in: `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`
- **Why it’s a big issue:** Bundles are typically the highest AOV lever; shipping an empty section reduces conversion and makes the page feel unfinished.
- **Suggested fix:** Hide the section entirely until implemented, or ship a minimal “bundles coming soon” card with real products.

### 23) Newsletter “Get 10% off” form has no submission behavior
- **What happens:** The email capture section renders a `<form>` but there is no `onSubmit` handler and no `action`, so pressing “Subscribe” will default-submit (page reload / navigation) and doesn’t visibly do anything useful.
- **Where:** `src/domains/client/marketing/ui/sections/shop/email-capture-band/EmailCaptureBand.tsx`
- **Why it’s a big issue:** It promises a discount and captures high-intent emails; when nothing happens, users assume the site is broken or scammy.
- **Suggested fix:** Implement real submission + success state (and actually deliver the code), or remove the discount promise until it’s wired up.

### 24) Reviews section is biased: it filters to only 5★ reviews
- **What happens:** The reviews carousel filters the dataset to only reviews with `stars >= 5` when possible.
- **Where:** `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx`
- **Why it’s a big issue:** This is misleading social proof. It can backfire on trust if users realize only perfect reviews are shown.
- **Suggested fix:** Show a representative mix, or be explicit (e.g. “Showing 5★ highlights”) and provide a link to the full reviews source.

### 25) The 3D reviews carousel is not accessibility-friendly (and can be motion-heavy)
- **What happens:** Reviews are displayed on a rotating 3D cylinder with drag interaction; there are no explicit previous/next buttons and no keyboard controls for changing the active card.
- **Where:** `src/components/ui/3d-carousel.tsx`
- **Why it’s a big issue:** Carousels without accessible controls are a common audit failure and can frustrate users who don’t drag (keyboard-only, assistive tech, some mobile users).
- **Suggested fix:** Add visible buttons + keyboard controls, provide a reduced-motion/static alternative, and ensure content is readable without interacting.

### 26) PDP delivery countdown / delivery date are “fake” (not tied to real shipping rules)
- **What happens:** PDP shows “Order within X hrs Y mins…” and “Free delivery {weekday, day, month}” computed from the user’s local clock (`now + 2 days`, countdown to midnight).
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx` (`deliveryInfo`)
- **Why it’s a big issue:** This can be wrong for weekends, holidays, cutoffs, or regions — and incorrect delivery promises are a top trust + support risk.
- **Suggested fix:** Drive this from real fulfillment rules (carrier/cutoff calendar) or simplify copy (“Ships in 48h”) without a ticking timer.

### 27) Policy/support pages link to broken routes
- **What happens:** Terms/Privacy/Cart encourage users to visit `/returns` and other support routes, but those routes are currently “temporarily unavailable”.
- **Where (examples):**
  - `src/domains/client/marketing/ui/pages/TermsPage.tsx` (links to `/returns`)
  - `src/domains/client/marketing/ui/pages/PrivacyPage.tsx` (links to `/returns`)
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (“View returns” / “track an order”)
- **Why it’s a big issue:** People click these links when they’re anxious (returns/tracking). Broken support flows massively amplify distrust.
- **Suggested fix:** Don’t link to stub pages; either implement minimal support pages or link out to Shopify/helpdesk until ready.

### 28) Auth pages likely render “double layout” (squashed/overflowing sign-in UI)
- **What happens:** `AuthLayout` wraps content in a fixed ~480px wide card, but `SignInPage` and `SignUpPage` render large multi-column layouts meant for full-width.
- **Where:**
  - Wrapper: `src/domains/platform/auth/ui/layouts/index.tsx`
  - Pages: `src/domains/platform/auth/ui/pages/SignInPage.tsx`, `src/domains/platform/auth/ui/pages/SignUpPage.tsx`
- **Why it’s a big issue:** Sign-in/sign-up is a core entry point; if it looks cramped/broken, users bounce immediately.
- **Suggested fix:** Decide on one layout system: either (a) make `AuthLayout` a full-page wrapper, or (b) simplify the sign-in/up pages to fit the compact card.

### 29) “Sign out” UI exists but sign-out behavior is a no-op
- **What happens:** The auth context exposes `signOut`, but it’s implemented as `async () => {}`. Any UI that calls it will appear to do nothing.
- **Where:** `src/domains/platform/auth/providers/AuthContext.impl.tsx`
- **Why it’s a big issue:** Users can’t reliably switch accounts; in admin this becomes a serious UX + security footgun (shared devices).
- **Suggested fix:** Wire `signOut` to Clerk’s sign-out method (and confirm redirects/cleanup).

### 30) Discount messaging is shown widely, but there’s no working discount system in the app
- **What happens:** UI repeatedly promises discounts (“Buy 2, save 10%”, “Get 10% off your first order”, spin-wheel rewards), but there’s no functional cart/checkout discount application in the current client cart implementation.
- **Where (examples):**
  - PDP quantity UI: `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
  - Promo strip: `src/layouts/MarketingLayout.tsx`
  - Trust bar: `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx`
  - Email capture: `src/domains/client/marketing/ui/sections/shop/email-capture-band/EmailCaptureBand.tsx`
  - Cart/discount plumbing: `src/domains/client/shop/cart/providers/CartContext.tsx`
- **Why it’s a big issue:** This creates “promise vs reality” churn: users expect a discount, don’t get it, and assume the brand is misleading.
- **Suggested fix:** Either implement real Shopify discount flows end-to-end, or remove discount promises until the system is live.

### 31) PDP “video” media likely renders at 0 height (looks broken when you tap the video thumbnail)
- **What happens:** The main media area renders the video as an absolutely-positioned `<iframe>` inside a container with no explicit height/aspect ratio. Because absolutely positioned children don’t contribute to parent height, the container can collapse to ~0px.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx`
- **Why it’s a big issue:** Users will tap the “video” thumbnail and see a blank/empty media area, which reads like the site is broken.
- **Suggested fix:** Give the media container a fixed aspect ratio (e.g. `aspect-square`) or keep the iframe in normal flow (non-absolute) so it defines height.

### 32) Cart access is hidden behind the hamburger menu (no cart icon / qty badge in the header)
- **What happens:** The public header has a menu button and account links, but no dedicated cart button or cart quantity indicator. The only cart UI is buried inside the drawer’s second tab.
- **Where:**
  - Header: `src/ui/components/PublicHeader.tsx`
  - Drawer/cart tab: `src/ui/providers/DrawerProvider.tsx`
- **Why it’s a big issue:** On ecommerce sites, “view cart” is a top navigation action. Hiding it adds friction and increases abandonment (especially after “Add to Basket”).
- **Suggested fix:** Add a cart icon/button in the header with a qty badge (using `useCart().qty`) and open the drawer directly to the cart tab.

### 33) Signed-in drawer profile uses a random “placekitten” avatar fallback
- **What happens:** When signed in, if `user.imageUrl` is missing it falls back to `https://placekitten.com/80/80` as the avatar.
- **Where:** `src/ui/providers/DrawerProvider.tsx`
- **Why it’s a big issue:** It’s off-brand, looks unprofessional, and introduces a third-party dependency that can break (blocked, slow, mixed-content/CSP issues).
- **Suggested fix:** Use a brand-safe fallback (initials avatar, a local asset, or Clerk’s default) and keep it on your own domain/CDN.

### 34) Blog “social” section is blank (component returns `null`), creating dead whitespace
- **What happens:** The blog post page renders a dedicated section for social/engagement, but `BlogSocial` is literally `() => null`, so you get an empty padded section.
- **Where:**
  - Component: `src/domains/blog/ui/components/BlogSocial.tsx`
  - Used in: `src/domains/blog/ui/pages/BlogPostPage.tsx`
- **Why it’s a big issue:** Readers hit a “dead zone” in the page flow and assume something failed to load.
- **Suggested fix:** Remove the section until implemented, or ship a minimal working block (share links, newsletter CTA, related posts, etc).

### 35) Blog author links fall back to `#` (dead link + unexpected page jump)
- **What happens:** Multiple author links use `post.authorLink || '#'`. When no author link exists, clicking the author/avatar jumps to the top of the page.
- **Where:** `src/domains/blog/ui/pages/BlogPostPage.tsx`
- **Why it’s a big issue:** Dead links are a trust killer and create confusing navigation behavior.
- **Suggested fix:** If there’s no author page, render the author name as plain text (not a link) or link to a real “About” page.

### 36) Two different `cdnUrl` helpers exist (inconsistent asset loading + CDN-bypass mismatch)
- **What happens:** There are two `cdnUrl` implementations; one contains special-case CDN bypass logic and the other doesn’t. Different parts of the app import different versions.
- **Where:**
  - `src/lib/utils/cdn.ts` (has bypass logic)
  - `src/utils/cdn.ts` (no bypass logic)
  - Example consumer: `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` imports `@/utils/cdn`
- **Why it’s a big issue:** You can end up with images working in one section and 404’ing in another depending on CDN config, which looks like random broken imagery.
- **Suggested fix:** Standardize to a single `cdnUrl` helper and make all imports consistent (then remove the duplicate).

### 37) Shopify Storefront client is stubbed (dynamic content never loads)
- **What happens:** The Storefront runner returns `{}` and `shopifyEnabled` is `false`, so any GraphQL-powered sections (hero subtitles, galleries, FAQ, etc) silently produce empty data.
- **Where:**
  - `src/domains/platform/commerce/shopify/index.ts`
  - Affected loader: `src/lib/sections.ts`
- **Why it’s a big issue:** The UI looks “wired” but stays static and can drift from Shopify reality (copy, galleries, FAQs).
- **Suggested fix:** Either connect the real Shopify client (and feature-flag properly), or remove UI that implies Shopify-backed dynamic content while stubbed.

### 38) Product fetching is stubbed (PDP can’t reflect real Shopify title/price/images)
- **What happens:** `fetchProductByHandle` returns a “Stub product / Placeholder description” object. Loaders then discard it as stub, so the PDP never updates from live data.
- **Where:**
  - Stub: `src/lib/product.ts`
  - Loader: `src/domains/client/shop/products/data/product-loaders.ts`
  - Consumer: `src/domains/client/shop/products/hooks/useProductContent.ts`
- **Why it’s a big issue:** You risk showing the wrong price/media vs Shopify, and you can’t scale beyond hard-coded config.
- **Suggested fix:** Replace the stub with real product fetch logic or remove the live-load path and make the “static config” approach explicit.

### 39) PDP always shows the “New Heatless Curler Launched” banner (even on the curler PDP)
- **What happens:** The hero media block unconditionally renders a promo link to `/product/satin-overnight-curler`.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx`
- **Why it’s a big issue:** On the curler PDP it’s redundant/odd (“new curler launched” while you’re already there), and on other PDPs it can distract from the current product.
- **Suggested fix:** Make the banner conditional (only show on the cap PDP, or only when the current handle isn’t the curler).

### 40) Announcement + newsletter components don’t match the “configurable components” system (broken UX if enabled)
- **What happens:**
  - `AnnouncementBar` “dismissible” mode shows an × but it’s not clickable (no state, no handler).
  - The CTA defaults to `'#'` when `ctaLabel` is provided without a valid link.
  - `NewsletterModal` input is `readOnly` and has no real submit behavior (it’s a static mock, not a working signup).
  - Component config references routes that aren’t defined (example: announcement CTA points to `/shipping`, but there is no `/shipping` route).
- **Where:**
  - UI: `src/ui/components/AnnouncementBar.tsx`, `src/ui/components/NewsletterModal.tsx`
  - Config: `src/domains/admin/shared/data/componentMeta.ts` (announcement/newsletter)
  - Routes: `src/App.tsx`
- **Why it’s a big issue:** If these blocks are turned on in the “components” system, users will click things that don’t work or end up on 404s — classic “site is broken” perception.
- **Suggested fix:** Implement real dismiss + submission behavior, remove `'#'` fallbacks, and validate config links against real routes.

### 41) Hamburger “menu” can reopen as the Cart tab (tab state leaks between opens)
- **What happens:** The drawer’s `openMenu()` function only sets `menuOpen=true` and does not reset `activeTab` to `'menu'`. If a user last viewed the cart tab, the hamburger can reopen the drawer showing the cart instead of navigation.
- **Where:** `src/ui/providers/DrawerProvider.tsx` (drawer API: `openMenu`)
- **Why it’s a big issue:** It violates user expectation (“I tapped menu, why am I seeing cart?”) and makes navigation feel unpredictable.
- **Suggested fix:** Set `activeTab` explicitly in `openMenu()` (and optionally reset to `menu` on close).

### 42) Two different header components exist, and they disagree on core navigation patterns
- **What happens:** There’s a `GlobalHeader` component that includes a cart button wired to `drawer.openCart()`, but the storefront uses `PublicHeader` instead, which has no cart icon and different nav behavior.
- **Where:**
  - Used by storefront layout: `src/layouts/MarketingLayout.tsx` → `src/ui/components/PublicHeader.tsx`
  - Alternate header: `src/ui/components/GlobalHeader.tsx`
- **Why it’s a big issue:** This fragments UX and makes navigation inconsistent depending on which header is mounted (and increases maintenance risk).
- **Suggested fix:** Standardize on one header component and ensure it supports the required nav primitives (menu, cart, account, promos) consistently.

### 43) Star rating “half star” uses a non-unique SVG gradient id (can render incorrectly when multiple ratings exist)
- **What happens:** The half-star uses `<linearGradient id="half">` and references `url(#half)`. Multiple instances on a page can introduce duplicate IDs, which can cause odd rendering/glitches in some browsers.
- **Where:** `src/ui/components/StarRating.tsx`
- **Why it’s a big issue:** Star ratings show up in high-trust areas (PDP, proof strip, spotlight). Rendering glitches undermine polish.
- **Suggested fix:** Generate a unique gradient id per component instance (e.g., via `useId()`), or avoid ids by using a mask/clipPath approach.

### 44) Hero “carousel” is effectively disabled even if gallery images are provided
- **What happens:** `HeroShop` slices `config.gallery` to only the first image (`slice(0, 1)`), so the hero never behaves like a real slideshow even if the config includes multiple slides.
- **Where:** `src/domains/client/marketing/ui/sections/shop/hero-shop/HeroShop.tsx`
- **Why it’s a big issue:** This creates a mismatch between content/config expectations and what users see (“why isn’t this rotating?”), and wastes provided gallery assets.
- **Suggested fix:** Either remove carousel assumptions from the config (make it single-image explicitly) or restore real multi-slide behavior (auto-advance + controls).

### 45) Drawer “Checkout” button is effectively unusable (disabled with no explanation)
- **What happens:** The drawer checkout button is disabled when `checkoutUrl` is missing. In the current cart implementation, `checkoutUrl` is always `undefined`, so the primary checkout CTA is never actionable.
- **Where:**
  - Disabled CTA: `src/ui/providers/DrawerProvider.tsx`
  - Root cause: `src/domains/client/shop/cart/providers/CartContext.tsx` (`checkoutUrl: undefined`)
- **Why it’s a big issue:** It looks like a broken button in the most important conversion surface (cart drawer).
- **Suggested fix:** Implement real checkout URL generation, or replace the disabled button with a clear message + a working fallback path.

### 46) Spin wheel is not actually random (it always lands on the same “best value” prize)
- **What happens:** The wheel animation is set up to always land on the `"10% + free shipping"` slice (targetIndex is selected by matching that label).
- **Where:** `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- **Why it’s a big issue:** This is deceptive if presented as “try your luck”. It can backfire on trust and create compliance risk (promotions/lotteries rules).
- **Suggested fix:** Either make it truly random (and truthful) or rewrite the UX/copy to present it as a deterministic “welcome deal unlock”.

### 47) Promo text rotation does not respect “prefers-reduced-motion”
- **What happens:** The top promo strip rotates messages every 4 seconds regardless of motion preference.
- **Where:**
  - Rotation timer: `src/layouts/MarketingLayout.tsx`
  - Rendering: `src/ui/components/PublicHeader.tsx`
- **Why it’s a big issue:** Motion-sensitive users will still get changing UI. This is a common accessibility audit failure.
- **Suggested fix:** Disable rotation when `prefers-reduced-motion: reduce` is set (show the first promo statically), or add a user-visible pause control.

### 48) Blog “Shop now” CTAs use raw `<a href>` even for internal routes (full reload + state loss)
- **What happens:** Blog product cards link with `<a href={...}>` instead of router navigation; if the href is an internal route it can cause full reload and lose SPA state.
- **Where:** `src/domains/blog/ui/pages/BlogPostPage.tsx` (product card CTAs)
- **Why it’s a big issue:** It makes the app feel slower/less native and can break flow (e.g., back button behavior, scroll state, drawer state).
- **Suggested fix:** Use `RouterLink` for internal links and `<a>` only for external destinations; optionally add a shared “AppLink” component to enforce this.

### 49) Admin “Components” editor isn’t truly an admin system (localStorage-only, not publishable)
- **What happens:** Component configs are saved to `window.localStorage` on the current device. There is no persistence, sharing, or publish pipeline; the UI itself calls this “layout-only”.
- **Where:**
  - Storage logic: `src/domains/admin/shared/hooks/useComponentConfig.ts`
  - Admin page copy: `src/domains/admin/catalog/ui/pages/ComponentsPage.tsx`
- **Why it’s a big issue:** Admin users will expect edits to affect the real site. Instead, changes are local, ephemeral, and won’t show to customers.
- **Suggested fix:** Either clearly label this as “local preview only” everywhere, or back it with real storage (Supabase) + publish/versioning.

### 50) Two different “spin wheel” experiences exist (inconsistent UX + obvious duplication)
- **What happens:** The PDP mounts a `SpinWheelPrompt` that is explicitly a placeholder, while the landing page final CTA mounts a different wheel implementation with different visuals/logic.
- **Where:**
  - Placeholder prompt: `src/domains/client/shop/products/ui/components/SpinWheelPrompt.tsx`
  - Landing wheel: `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
  - Mounted by: `src/domains/client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx`
- **Why it’s a big issue:** Users see inconsistent behavior and “unfinished” copy depending on page, which undermines polish and trust.
- **Suggested fix:** Consolidate to a single spin wheel system (feature-flagged), and ensure it’s consistent across PDP and landing or remove it from one surface.

### 51) FAQ “search” logic exists, but there is no search input (copy refers to missing UI)
- **What happens:**
  - The FAQ component has filtering logic and an empty state that says “No answers matched that search…”, but the `query` state is hard-coded to `''` and there’s no input field to change it.
  - The result is a confusing mismatch: the component appears to support search/filtering, but users can’t actually search FAQs.
- **Where:** `src/domains/client/shop/products/ui/sections/faq-section-shop/FaqSectionShop.tsx`
- **Why it’s a big issue:** FAQ is a key pre-purchase objection handler; referencing missing functionality (“search”) makes the UI feel unfinished and lowers trust.
- **Suggested fix:** Either (a) add a real search input bound to `query` (and keep the empty state), or (b) remove the unused query/filter code and adjust copy so it doesn’t mention search/reset.

### 52) PDP “Share” button gives no success feedback and can fail silently
- **What happens:** The share button attempts `navigator.share(...)` and falls back to `navigator.clipboard.writeText(...)`, but there’s no confirmation UI (toast, inline message, aria-live), and failures are swallowed.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx` (share button handler)
- **Why it’s a big issue:** Users will reasonably interpret “nothing happened” as “button is broken,” which hurts polish and reduces sharing/referrals.
- **Suggested fix:** Add explicit success/error feedback (“Link copied”), and a robust fallback for browsers without `navigator.share`/clipboard permissions (e.g., open a modal with a selectable link).

### 53) Product PDP “sections” are loaded globally (not per product), so multiple products can show wrong copy/media
- **What happens:**
  - `loadSections(handle)` ignores `handle` and always loads the same global metaobjects (`hero`, `essentials`, `reasons`, `how`, `care`, `faq`, `gallery`).
  - `useProductContent(handle)` then applies those sections to any product handle — meaning different products can inherit the shower-cap’s copy/FAQ/gallery.
- **Where:**
  - Loader: `src/domains/client/shop/products/data/product-loaders.ts` (`loadSections`)
  - Data source: `src/lib/sections.ts` (`fetchSections` GraphQL metaobjects)
  - Consumption: `src/domains/client/shop/products/hooks/useProductContent.ts`
- **Why it’s a big issue:** Showing the wrong care instructions/gallery/FAQ for a product is a high-trust failure (and can lead to support tickets and returns).
- **Suggested fix:** Make sections keyed per product (by handle/SKU/type), or gate applying fetched sections so they only override config for the intended product(s).

### 54) Unknown product handles fall back to the shower cap instead of a 404 (wrong content on the wrong URL)
- **What happens:** `getConfig(handle)` falls back to `productConfigs['shower-cap']` for unknown handles, so `/product/<invalid>` renders the shower-cap PDP instead of a not-found state.
- **Where:** `src/domains/client/shop/products/data/product-loaders.ts` (`getConfig`)
- **Why it’s a big issue:** Users can land on a URL and see a different product than expected (SEO/social shares can spread incorrect URLs, and “Back” behavior becomes confusing).
- **Suggested fix:** If a handle isn’t recognized, render a proper 404/“Product not found” state (or redirect to `/`), and avoid silently substituting a different product.

### 55) Auth pages promise features that aren’t implemented (onboarding → dead ends)
- **What happens:** Sign-in/sign-up pages advertise account capabilities (orders, shipping progress, addresses, commissions/perks), but the linked account + tracking flows are currently stubs (“temporarily unavailable”).
- **Where:**
  - Auth pages: `src/domains/platform/auth/ui/pages/SignInPage.tsx`, `src/domains/platform/auth/ui/pages/SignUpPage.tsx`
  - Stubbed destinations: `src/domains/client/account/ui/pages/*`, `src/domains/client/shop/checkout/ui/pages/OrderTrackingPage.tsx`
- **Why it’s a big issue:** This is a high-intent UX moment — promising dashboards and then delivering dead-end pages feels misleading and drives immediate bounce.
- **Suggested fix:** Update copy to match current shipped functionality (or hide links/features behind flags), and only advertise features once the routes are working.

### 56) Admin “Analytics” page is mock data (can mislead, includes routes that don’t exist in this app)
- **What happens:** Admin analytics uses hard-coded `MOCK_*` datasets for revenue/orders/traffic and includes example paths like `/collection/hair` and `/products/...` which don’t match the current routing structure.
- **Where:** `src/domains/admin/analytics/ui/pages/AnalyticsPage.tsx`
- **Why it’s a big issue:** If this UI is reachable in production, it risks admins making decisions based on fake numbers — a severe trust and ops risk.
- **Suggested fix:** Add an unmistakable “Demo data” banner + disable in production until wired, or connect it to real data sources and align referenced routes to the actual app.

### 57) Admin “Activity log” is a nav-linked placeholder (“Not wired yet”)
- **What happens:** The Activity page renders a planned spec, not an actual audit log, but it is linked in the admin sidebar and dashboard.
- **Where:**
  - Page: `src/domains/admin/analytics/ui/pages/ActivityPage.tsx`
  - Nav links: `src/domains/admin/shared/ui/layouts/AdminShell.tsx`, `src/domains/admin/analytics/ui/pages/DashboardPage.tsx`
- **Why it’s a big issue:** Admin navigation dead ends degrade confidence in the admin console and waste operator time.
- **Suggested fix:** Hide the nav entry until a minimal working audit log exists, or implement a simple read-only log first (even if it’s “last N events”).

### 58) Admin component “detail” route is a hard-coded placeholder (editing drilldown doesn’t work)
- **What happens:** `/admin/components/:key` renders a placeholder message saying the UI is stubbed.
- **Where:** `src/domains/admin/catalog/ui/pages/ComponentDetailPage.tsx`
- **Why it’s a big issue:** The admin UI implies there’s a detail editor, but clicking into a component yields a dead end — classic “unfinished admin” signal.
- **Suggested fix:** Either implement at least a read-only detail view + route back, or remove/hide the detail route until it’s ready.

### 59) Admin “Media” library is entirely in-memory mock content (no persistence or real upload)
- **What happens:** The media library is driven by `MOCK_MEDIA` and contains no network/storage integration, so any “upload”/edit workflow can’t be real or persistent.
- **Where:** `src/domains/admin/media/ui/pages/MediaPage.tsx`
- **Why it’s a big issue:** Admin users will expect asset changes to affect the live site. A non-persistent media UI creates confusion and can lead to lost work.
- **Suggested fix:** Add a clear “Mock / demo UI” banner and disable destructive actions until wired, or integrate with real storage (Supabase Storage) + persistence + publish flow.

### 60) Admin “Product content” editor lacks error handling and success confirmation (silent failure risk)
- **What happens:**
  - Load/save requests don’t check `res.ok` and no errors are shown if the API rejects the request (e.g., missing/invalid auth header).
  - There’s no “Saved” confirmation, so admins can’t tell whether changes actually persisted.
- **Where:** `src/domains/admin/pages/ui/pages/ContentPage.tsx`
- **Why it’s a big issue:** This is a high-stakes UI (it edits customer-facing copy). Silent failure increases the chance of shipping incorrect content or thinking updates are live when they aren’t.
- **Suggested fix:** Add explicit error/success states (inline banners/toasts), validate auth before enabling save, and show API response status with actionable guidance.

### 61) Auth can silently break if Clerk is not configured (placeholder key)
- **What happens:** If `VITE_CLERK_PUBLISHABLE_KEY` is missing, the app falls back to a literal `'pk_test_placeholder'` and still boots. In practice this usually means auth UI either fails unpredictably or looks “broken” with no clear explanation to the user.
- **Where:** `src/main.tsx` (ClerkProvider `publishableKey` fallback)
- **Why it’s a big issue:** Sign-in is a core flow (admin + account). A misconfigured auth key turns major routes into confusing failures instead of a clear, fixable error state.
- **Suggested fix:** Fail fast with a branded configuration error screen when the key is missing (and/or block mounting ClerkProvider), and remove the placeholder fallback in production builds.

### 62) Admin sign-in flow doesn’t preserve “return to admin” (users land on `/account`)
- **What happens:** When signed out and hitting an admin route, the “Sign in” CTA links to `/sign-in` with no redirect parameter. Your sign-in page defaults redirects to `/account`, so admins don’t return to the page they tried to access.
- **Where:** `src/domains/admin/shared/ui/components/AdminGuard.tsx` (SignedOut state sign-in link)
- **Why it’s a big issue:** This creates a confusing loop (“I tried to open admin, signed in, and got sent somewhere else”), increasing drop-off and support requests.
- **Suggested fix:** Use a router link to `/sign-in?redirect=<currentPath>` (or pass a redirect param), and consider capturing the intended route in state/session storage for reliability.

### 63) Admin “Pages” is presented as an editor, but it’s a static mock (no real edits/publish)
- **What happens:** The Pages UI is driven by a hard-coded `PAGES` array and renders a “detail preview/editor” experience without any real editing controls, persistence, or publish actions.
- **Where:** `src/domains/admin/pages/ui/pages/PagesPage.tsx`
- **Why it’s a big issue:** This is a core admin workflow surface. If it’s reachable in production, it signals “admin isn’t real” and wastes operator time.
- **Suggested fix:** Either wire it to real storage + publish flow (Supabase) or clearly label it as a spec/mock and hide it behind a dev-only flag until it’s functional.

### 64) Admin “Blogs” list has non-functional controls and placeholder metrics (looks like a dashboard, acts like a mock)
- **What happens:**
  - Toolbar buttons (“Reload”, “Filters”, “New blog”) have no actions wired.
  - Rows are built from static `blogPosts`, but analytics-like metrics are hard-coded to zeros (views/reads/likes/comments).
- **Where:** `src/domains/admin/blog/ui/pages/BlogsPage.tsx`
- **Why it’s a big issue:** Blog admin users expect basic CRUD + filtering + real status control. A list that looks interactive but does nothing is a high-friction credibility hit.
- **Suggested fix:** Either implement real actions (create, filter, reload) and real metrics, or add a prominent “Demo UI” banner and remove non-functional controls.

### 65) Admin blog “Save / Publish” buttons are no-ops (no persistence)
- **What happens:** The blog editor shows “Save” and “Publish” actions, but there are no handlers wired and nothing persists — changes are effectively disposable.
- **Where:** `src/domains/admin/blog/ui/pages/BlogDetailPage.tsx` (header actions)
- **Why it’s a big issue:** Editors will assume changes are saved/published and only discover the truth after losing work. That’s a severe admin UX failure.
- **Suggested fix:** Disable these buttons until real save/publish exists, or implement at least a draft save to Supabase + a clear “Saved” confirmation.

### 66) Admin blog editor inputs are not wired to the “draft” state and preview is not a live draft
- **What happens:**
  - Many fields use `defaultValue={post.*}` without binding to `draft` state, so editing doesn’t update the in-memory draft.
  - The “Preview” iframe always points to the live `/blog/:slug` route, so changes won’t appear in preview anyway.
- **Where:** `src/domains/admin/blog/ui/pages/BlogDetailPage.tsx` (hero fields + preview iframe)
- **Why it’s a big issue:** Even if you add persistence later, the current UI gives editors zero feedback loop (“I typed… nothing changed”), which reads as broken.
- **Suggested fix:** Bind inputs to `draft` state (value/onChange), and make the preview render from draft (either via query param + draft loader, or postMessage draft payload into the iframe).

### 67) Blog “Related reads” carousel hides scrollbars and provides no accessible controls
- **What happens:** The related posts list is a horizontal scroller with hidden scrollbars and non-interactive dot indicators. Keyboard and screen-reader users get no explicit way to navigate the carousel.
- **Where:** `src/domains/blog/ui/pages/BlogPostPage.tsx` (related section scroller + dots)
- **Why it’s a big issue:** This hides content discoverability (especially on desktop trackpads/mice) and fails common accessibility expectations for carousels.
- **Suggested fix:** Add explicit previous/next buttons (with aria-labels), make dots interactive buttons, and consider keeping scrollbars visible or adding gradient affordances.

### 68) Typography system conflicts: `font-heading` is defined twice with different fonts
- **What happens:** Tailwind config defines `fontFamily.heading` as `"The Seasons"`, but `src/index.css` also defines a `.font-heading` class that forces `'Playfair Display'` and will override Tailwind’s utility class.
- **Where:**
  - Tailwind config: `tailwind.config.js` (`fontFamily.heading`)
  - CSS override: `src/index.css` (`.font-heading`)
- **Why it’s a big issue:** Heading typography becomes unpredictable and inconsistent with the design system (and changes to Tailwind tokens won’t take effect).
- **Suggested fix:** Choose a single source of truth: remove the custom `.font-heading` CSS override or align it to the Tailwind `fontFamily.heading` token.

### 69) PDP quantity selector hard-codes “Buy 2, save 10%” for every product (even when not applicable)
- **What happens:** The quantity UI always displays “Buy 2, save 10%” and shows “Save 10%” for qty ≥ 2, regardless of which product is being viewed (e.g., the curler set still shows the shower-cap promo).
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx` (quantity dropdown copy)
- **Why it’s a big issue:** This is misleading merchandising. Users will expect a discount that may not exist for that SKU and will feel tricked when totals don’t reflect it.
- **Suggested fix:** Drive promo copy from product config/offer data, and only show the savings label when the offer is actually active for that product.

### 70) PDP bottom CTA uses static urgency copy (“Last chance today”) regardless of stock/time
- **What happens:** The PDP renders a “Last chance today” banner near the bottom CTA as a static string with no supporting inventory/time logic.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (bottom CTA section)
- **Why it’s a big issue:** Fake urgency is a trust killer and can create compliance risk. Users notice when urgency is always-on and stop believing the rest of the site.
- **Suggested fix:** Remove the urgency claim unless it’s backed by real, auditable rules (inventory windows, promo expiry), and/or move to truthful urgency (“Ships in 48h”, “Free returns”) that you can guarantee.

### 71) Drawer hijacks ArrowLeft/ArrowRight globally to switch tabs (surprising keyboard UX)
- **What happens:** When the drawer is open, pressing ArrowLeft/ArrowRight toggles between Menu/Cart tabs regardless of what control has focus. This can cause unexpected tab switches while using arrow keys inside other UI (e.g., navigating text, sliders, listboxes).
- **Where:** `src/ui/providers/DrawerProvider.tsx` (drawer `keydown` handler)
- **Why it’s a big issue:** It creates unpredictable keyboard behavior and can break accessibility expectations. Keyboard users lose control of navigation because arrow keys are repurposed globally.
- **Suggested fix:** Only handle arrow-key tab switching when focus is within the tablist (or the active tab button), and follow the WAI-ARIA tabs pattern (`aria-controls`, `role="tabpanel"`).

### 72) Free-shipping threshold + shipping copy is inconsistent across the site (trust + conversion hit)
- **What happens:** Users see multiple different thresholds/copy for “free shipping” depending on where they look (promo strip vs trust bar vs cart/drawer vs landing config).
- **Where (examples):**
  - Header promo: `src/layouts/MarketingLayout.tsx` (“Free shipping over £19.99”)
  - Trust bar: `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx` (“Free shipping on orders £20+”)
  - Landing hero assurances: `src/content/home.config.ts` (“Free shipping £20+”)
  - Cart math: `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (`FREE_SHIP_THRESHOLD = 19.99`)
  - Drawer math: `src/ui/providers/DrawerProvider.tsx` (`FREE_SHIP_THRESHOLD = 19.99`)
- **Why it’s a big issue:** This is a classic conversion-killer inconsistency: users hesitate when pricing/shipping rules change between surfaces (and it increases support load).
- **Suggested fix:** Centralize shipping thresholds in one constant/config and render the same copy everywhere (including formats like `£19.99` vs `£20+`).

### 73) Homepage hero social proof is hard-coded (rating + “Trusted by 10k”) instead of data-driven
- **What happens:** The hero UI displays “Trusted by 10k users” and a fixed “4.8 (100+)” with 5 filled stars, regardless of real review counts/ratings.
- **Where:** `src/domains/client/marketing/ui/sections/shop/hero-shop/HeroShop.tsx`
- **Why it’s a big issue:** Above-the-fold trust claims are scrutinized. Hard-coded proof can drift from reality and becomes a reputational/compliance risk.
- **Suggested fix:** Drive social proof from one audited source (e.g., Shopify reviews aggregate or a CMS field), and ensure all hero proof matches the same canonical values used elsewhere.

### 74) Cart page links users to broken support/account routes and claims “secure checkout” while checkout is unavailable
- **What happens:** The cart page suggests help actions (“View returns”, “track an order”) and shows payment reassurance (“Apple Pay, Shop Pay…”) even though the linked destinations are currently stubs/unavailable.
- **Where:** `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (help links + “Secure checkout” box)
- **Why it’s a big issue:** The cart is the highest-intent page. Sending users from cart → broken returns/account pages (or a disabled checkout) compounds frustration and kills confidence.
- **Suggested fix:** Hide/disable these help links until the routes work, and ensure reassurance copy matches the actual checkout path that users can complete today.

### 75) Admin product cards say “Updated” but don’t show an updated timestamp (low utility + confusion)
- **What happens:** Product cards include an “Updated” label with no actual date/time value, despite the data model having `updated_at`.
- **Where:** `src/domains/admin/catalog/ui/cards/ProductCard.tsx`
- **Why it’s a big issue:** Recency is a key admin decision signal (“is this the latest content?”). Omitting it makes the UI less trustworthy and harder to operate.
- **Suggested fix:** Render `updated_at` (or a formatted relative time) and remove the label if the timestamp isn’t available.

### 76) Multiple production-facing UI files disable TypeScript checks (`@ts-nocheck`) (higher risk of shipping broken UI)
- **What happens:** Several key user-facing components/pages opt out of TypeScript validation, which makes runtime UI regressions more likely (props drift, undefined access, invalid JSX).
- **Where (examples):**
  - Blog post page: `src/domains/blog/ui/pages/BlogPostPage.tsx`
  - Reviews carousel: `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx`
  - TikTok section: `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`
  - Final CTA: `src/domains/client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx`
  - Product spotlight: `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx`
- **Why it’s a big issue:** These are high-visibility surfaces; type-check opt-outs commonly correlate with “it works locally but breaks in prod” UI bugs.
- **Suggested fix:** Remove `@ts-nocheck` and fix types incrementally (or isolate the untyped bits into small adapters) so core pages remain type-safe.

### 77) `LazyVisible` assumes `IntersectionObserver` exists (can throw in some browsers/webviews)
- **What happens:** `LazyVisible` instantiates `new IntersectionObserver(...)` without feature detection. In environments where IO is missing/disabled, effects can throw and sections won’t render reliably.
- **Where:** `src/ui/components/LazyVisible.tsx`
- **Why it’s a big issue:** This component gates “content appears” behavior (TikTok embeds, video cards). If it fails, users see blank/“Loading…” placeholders indefinitely (or console errors).
- **Suggested fix:** Add a safe fallback: if `IntersectionObserver` is unavailable, immediately render children (or use a polyfill).

### 78) `useMediaQuery` uses `matchMedia.addEventListener` only (no Safari/legacy fallback)
- **What happens:** `useMediaQuery` uses `matchMedia.addEventListener("change", ...)`, which isn’t supported in all browsers (older Safari uses `addListener/removeListener`). That can break components relying on it (e.g., the 3D reviews carousel sizing).
- **Where:** `src/components/ui/3d-carousel.tsx` (`useMediaQuery`)
- **Why it’s a big issue:** A single runtime error inside a shared hook can break entire sections (and perceived site stability) on affected devices.
- **Suggested fix:** Add a fallback to `matchMedia.addListener/removeListener` when `addEventListener` isn’t available.

### 79) Spin-wheel “Sign in to claim” loses the user’s place (no redirect back to the wheel)
- **What happens:** The wheel’s sign-in CTA uses `window.location.assign('/sign-in')` without a redirect parameter. After sign-in, users typically land on `/account` instead of returning to finish applying the reward.
- **Where:** `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx` (sign-in helper + CTA)
- **Why it’s a big issue:** This breaks the incentive loop: users “win” a reward, then get sent away from the purchase flow and may never return to apply it.
- **Suggested fix:** Route to `/sign-in?redirect=<currentPath>` (preserve landing page), or open a modal sign-in flow that returns directly to the wheel state.

### 80) The same product is linked by multiple URLs/handles (duplicate pages + confusing navigation)
- **What happens:** Different parts of the app link to the shower cap using different handles (`/product/shower-cap` vs `/product/lumelle-shower-cap`), while product config keys/handles don’t align cleanly.
- **Where (examples):**
  - Drawer: `src/ui/providers/DrawerProvider.tsx` (`/product/shower-cap`)
  - Cart: `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (`/product/lumelle-shower-cap`)
  - Landing config: `src/content/home.config.ts` (`ctaHref: '/product/lumelle-shower-cap'`)
  - Promo strip: `src/layouts/MarketingLayout.tsx` (`href: '/product/shower-cap'`)
  - Config mismatch: `src/domains/client/shop/products/data/product-config.ts` (key `'shower-cap'` has `handle: 'lumelle-shower-cap'`)
- **Why it’s a big issue:** Users (and analytics/SEO) see duplicate URLs for the same product, which fragments attribution, complicates support, and can make back/forward navigation feel inconsistent.
- **Suggested fix:** Standardize on one canonical handle per product, update all internal links to that handle, and 301/redirect aliases to the canonical route.

### 81) Header promo strip uses opacity-only hiding, so “hidden” promos can still intercept clicks/focus
- **What happens:** The promo strip renders *all* promo messages as absolutely positioned elements and hides inactive ones using `opacity-0`. Because they remain in the DOM, an “invisible” promo (including a link) can still sit on top of the visible one and intercept pointer events and/or receive keyboard focus.
- **Where:** `src/ui/components/PublicHeader.tsx` (promo strip `promoMessages.map(...)` using `absolute` + `opacity-0`)
- **Why it’s a big issue:** This is a trust-killer interaction bug: users can click what looks like “Free shipping…” and get navigated somewhere else (or tab into an invisible link). It also fails basic accessibility expectations (hidden items should not be focusable/clickable).
- **Suggested fix:** Render only the active promo message (conditional render), or explicitly disable interaction for inactive items (`pointer-events-none`, `tabIndex={-1}`, or `inert`), and ensure the active message is the only focusable element.

### 82) PDP hero image preload can miss the CDN URL (wasted bandwidth + slower hero render)
- **What happens:** The PDP injects a `<link rel="preload" as="image">` using `heroImage` derived from the raw gallery path, while the actual rendered hero image uses `cdnUrl(...)`. In CDN mode this can preload the *wrong URL*, causing duplicate requests (preload doesn’t warm the real hero image).
- **Where:**
  - Preload injection: `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (effect adding `link[rel="preload"][data-hero="pdp-hero"]`)
  - Rendered image URL: `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` (`toCdn(cdnUrl(...))`)
- **Why it’s a big issue:** PDP load speed is conversion-critical. A mis-targeted preload adds bandwidth and CPU work without improving LCP, especially painful on mobile.
- **Suggested fix:** Compute the hero URL once (including CDN + encoding) and reuse it for both preload and `<img src>`. If you can’t guarantee a stable hero URL, remove the preload and rely on `fetchPriority="high"`/`loading="eager"` for the first image only.

### 83) PDP quantity picker uses ARIA “listbox” semantics but lacks keyboard listbox behavior
- **What happens:** The quantity UI declares `aria-haspopup="listbox"` and renders a `role="listbox"`, but there’s no arrow-key navigation, no Escape-to-close, no roving focus, and no click-outside/blur close. It behaves like a click-only custom dropdown.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx` (quantity dropdown)
- **Why it’s a big issue:** Quantity selection is a core purchase step. This pattern is likely to fail accessibility audits and frustrate keyboard users (and some mobile assistive tech).
- **Suggested fix:** Prefer a native `<select>` for quantity (fastest + most accessible). If you keep a custom dropdown, implement the full ARIA listbox pattern (roving tab index, arrow keys, Escape, click-outside close, and correct `aria-activedescendant` / `aria-selected` behavior).

### 84) Drawer uses extremely small type (`text-[9px]`) for high-salience information
- **What happens:** The drawer renders key messages (e.g., badge-style labels and the “people checking out now” line) at 9px with uppercase + tracking.
- **Where:** `src/ui/providers/DrawerProvider.tsx` (e.g., `text-[9px]` badges and the sticky cart footer line)
- **Why it’s a big issue:** 9px type is borderline unreadable on mobile and is an accessibility failure for many users. When important cart trust signals are hard to read, confidence drops at the exact moment you want conversion.
- **Suggested fix:** Raise minimum body/support text size (aim ~12–14px), reduce tracking on small text, and reserve “micro” type only for truly decorative labels.

### 85) Admin sidebar icon active-state styling likely never activates (current section is harder to spot)
- **What happens:** The nav uses Tailwind selectors like `group-[.active]:...` on the icon/label, but the `NavLink` class logic doesn’t add an `.active` class to the element. Result: icons can stay in the “inactive” color even while the item is active.
- **Where:** `src/domains/admin/shared/ui/layouts/AdminShell.tsx` (`NavItemLink` icon/text classes using `group-[.active]`)
- **Why it’s a big issue:** Admin navigation clarity matters. If active state is ambiguous, operators lose orientation and make more navigation mistakes.
- **Suggested fix:** Drive icon/text active classes directly from `isActive` (in the `className` callback) or add an explicit `active` class when `isActive === true` so the `group-[.active]` selector has something to match.

### 86) Admin “collapsed sidebar” mode creates unlabeled icon-only navigation (a11y + usability)
- **What happens:** When the sidebar is collapsed, the label text is not rendered and the icon is `aria-hidden`, leaving the `NavLink` with no accessible name. Screen readers/keyboard users can’t tell what each icon does.
- **Where:** `src/domains/admin/shared/ui/layouts/AdminShell.tsx` (`NavItemLink` when `collapsed === true`)
- **Why it’s a big issue:** This makes the admin navigation effectively unusable for assistive tech users and reduces discoverability for everyone.
- **Suggested fix:** Add `aria-label={label}` (and optionally `title={label}`) on the `NavLink` when collapsed, or keep labels visually hidden (`sr-only`) instead of not rendering them.

### 87) TikTok section hides the “Watch on TikTok” fallback link on mobile (no escape hatch if embeds fail)
- **What happens:** The “Watch on TikTok” link is only rendered on `md` and up. On mobile, users rely entirely on the embedded iframes, which can fail to load (network/cookie/embedding restrictions), leaving users with no fallback path.
- **Where:** `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx` (link container uses `hidden md:block`)
- **Why it’s a big issue:** This is a content + trust section (“As seen on TikTok”). If embeds fail on the most common device class (mobile), users see “Loading…”/blank cards with no way out.
- **Suggested fix:** Provide a visible fallback link on all breakpoints (even a compact “Open in TikTok” button), and add a timeout/error state when an embed doesn’t load.

### 88) PDP hero media uses generic alt text for key product imagery (accessibility + SEO loss)
- **What happens:** The main PDP image uses a generic alt like “Lumelle product detail”, and videos use a generic “Lumelle product video”, regardless of which product is being viewed.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` (main `<img>` alt + `<iframe>` title)
- **Why it’s a big issue:** Product imagery is the core of e-commerce comprehension. Generic alt text hurts screen-reader users and reduces semantic clarity for search/sharing. It also makes the site feel less polished.
- **Suggested fix:** Pass `productTitle` into `HeroMedia` and use it to generate accurate alt/title strings (e.g., “Lumelle Shower Cap — product photo 1”, “Satin Overnight Curler Set — demo video”).

### 89) Non-standard Tailwind utilities are used in production UI (silent styling failures)
- **What happens:** Several components use Tailwind classes that aren’t in the default scale (and aren’t defined in `tailwind.config.js`), so styles silently don’t apply (padding/transition/cursor affordances).
- **Where (examples):**
  - `src/ui/components/PublicHeader.tsx` (`duration-400`)
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` (`py-1.25`)
  - `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx` (`dragging:cursor-grabbing`)
- **Why it’s a big issue:** Silent class failures are hard to catch and lead to inconsistent UI spacing/animation cues across environments. These are the “paper cuts” users interpret as “site feels buggy/unpolished”.
- **Suggested fix:** Replace with valid Tailwind utilities (`duration-300/500`, `py-1/py-1.5`) and use supported variants (e.g., `[&.dragging]:cursor-grabbing` with an actual `.dragging` class), or extend Tailwind config to explicitly support the desired values.

### 90) Footer “Stay in the loop” CTA is a `mailto:` link (not a real signup; breaks expectation on many devices)
- **What happens:** The footer’s “Get style tips & launches” CTA opens an email composer via `mailto:` instead of signing the user up to a list. Many users (especially mobile) don’t have an email client configured, so the CTA effectively does nothing.
- **Where:** `src/ui/components/GlobalFooter.tsx` (mailto-based “Stay in the loop” CTA)
- **Why it’s a big issue:** This is a key retention/capture surface. A mailto “signup” is high-friction, untrackable, and feels like a broken newsletter flow.
- **Suggested fix:** Replace with a real email capture form (and actual provider integration), or reword it to be honest (“Email us for updates”) and keep the CTA secondary until signup is implemented.

### 91) Blog post contains internal links to slugs that don’t exist (dead navigation inside the article)
- **What happens:** The “Welcome to the Lumelle Journal” post contains internal links to blog routes that have no matching `slug` in `blogPosts`. Clicking them sends users to a blog detail URL, which then redirects back to `/blog` because the post can’t be found.
- **Where:**
  - Broken links live in: `src/content/blog/posts/lumelle-journal-launch.ts`
  - Slugs registry: `src/content/blog/index.ts`
  - Missing examples (linked but not defined): `/blog/frizz-free-showers`, `/blog/hair-hooks-that-convert`, `/blog/satin-vs-waterproof`, `/blog/travel-hair-kit`
- **Why it’s a big issue:** Blog posts are meant to be “sticky” and internally linked. Dead links destroy trust, hurt retention, and make the site feel unfinished.
- **Suggested fix:** Align content links with actual slugs (rename the target post slugs or update the links), and consider adding a redirect/alias map for legacy slugs if these URLs were previously used.

### 92) Blog markdown renders internal links as plain `<a href>` (full reload + state loss in a SPA)
- **What happens:** Blog paragraphs/sections are rendered via `markdown-to-jsx`, and internal links inside markdown become normal `<a href="/...">` anchors. That forces full page reloads for internal navigation instead of client-side routing.
- **Where:** `src/domains/blog/ui/pages/BlogPostPage.tsx` (`<Markdown>{...}</Markdown>` usage without link overrides)
- **Why it’s a big issue:** Blog pages are link-dense. Full reload navigation feels slow, can reset scroll and transient state, and makes the app feel less polished.
- **Suggested fix:** Configure `markdown-to-jsx` with an override for `a` tags: if `href` starts with `/`, render a `RouterLink` instead; otherwise render a normal `<a>` for external URLs.

### 93) Search results show hard-coded prices that don’t match actual product pricing
- **What happens:** The search results list uses a hard-coded catalog with prices that don’t match the actual PDP/config pricing (e.g., shower cap and curler show `£24.00` in search, while other parts of the app use ~`£14.99/£16.99`).
- **Where:** `src/domains/client/shop/products/ui/pages/SearchResultsPage.tsx` (`CATALOG` array)
- **Why it’s a big issue:** Pricing inconsistencies are a top conversion and trust killer (“Am I being overcharged?” / “Which price is real?”).
- **Suggested fix:** Source search results from the same canonical data as PDPs (Shopify/Storefront API or the same `product-config`), and ensure one source of truth for price display.

### 94) Cart stepper controls and promo input lack accessible labels (hard for screen readers)
- **What happens:**
  - Cart quantity +/- buttons are unlabeled and only show “−” / “+”.
  - Promo code input uses only a placeholder, not a real `<label>`.
- **Where:** `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (quantity stepper + promo code input)
- **Why it’s a big issue:** Cart is a critical flow; unlabeled controls are a common accessibility audit failure and can make the cart unusable for assistive tech users.
- **Suggested fix:** Add `aria-label` to stepper buttons (“Decrease quantity”, “Increase quantity”), and add an associated label (`<label className="sr-only" htmlFor="promo-code">Promo code</label>` + `id` on the input).

### 95) Admin product-count badge likely never updates (sessionStorage + `storage` listener doesn’t fire in-tab)
- **What happens:** `AdminShell` reads `admin:productCount` from `sessionStorage` and listens for `storage` events to update it. `ProductsPage` writes the count into `sessionStorage`, but `storage` events don’t fire in the same tab (and `sessionStorage` isn’t shared across tabs), so the badge will usually stay missing/stale.
- **Where:**
  - Reader: `src/domains/admin/shared/ui/layouts/AdminShell.tsx` (`admin:productCount` effect + `storage` listener)
  - Writer: `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (`sessionStorage.setItem('admin:productCount', ...)`)
- **Why it’s a big issue:** The UI advertises a helpful affordance (product count) but fails silently. That hurts admin trust and makes navigation less informative.
- **Suggested fix:** Lift this state into React (context/store) and pass the count into `AdminShell`, or dispatch a custom in-tab event when ProductsPage updates the count (and listen for that event instead of `storage`).

### 96) PDP “Hero proof strip” trust claims are hard-coded (including “Source: TikTok Shop + verified store reviews”)
- **What happens:** The PDP proof strip shows a static “Source: TikTok Shop + verified store reviews” line and uses a hard-coded quick-facts list (“Proven”, “Dispatch”, “Guarantee”) regardless of product and regardless of whether those claims are verifiable.
- **Where:** `src/domains/client/shop/products/ui/sections/hero-proof-strip/HeroProofStrip.tsx`
- **Why it’s a big issue:** Trust strips sit directly under the buy flow. Hard-coded proof statements can drift from reality and create “this feels fake” reactions (and potential compliance risk).
- **Suggested fix:** Drive proof copy + source attribution from a single audited source (product config/CMS), or remove the “Source:” claim unless it’s verifiably true.

### 97) PDP structured data hard-codes review rating/count (can contradict what the UI displays)
- **What happens:** The PDP computes `ratingValue` and `ratingCountLabel`, but the JSON-LD `aggregateRating` is hard-coded to `ratingValue: '4.8'` and `reviewCount: '100'` for every product.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (`productJsonLd.aggregateRating`)
- **Why it’s a big issue:** Review/social proof consistency matters. If structured data and visible UI diverge, it undermines credibility and can create SEO/trust issues.
- **Suggested fix:** Populate `aggregateRating` from the same values the UI uses (or omit it until you have a real, audited data source).

### 98) Shared `Button` component has no focus-visible styling (keyboard users lose their place)
- **What happens:** The shared `Button` component doesn’t add any `focus-visible` ring/outline styling. Pages that use it (notably admin UIs) can become hard to operate by keyboard because focus location is invisible.
- **Where:**
  - Component: `src/domains/ui-kit/components/Button.tsx`
  - Used in: `src/domains/admin/blog/ui/pages/BlogsPage.tsx`, `src/domains/admin/blog/ui/pages/BlogDetailPage.tsx`
- **Why it’s a big issue:** Visible focus is a basic accessibility requirement and a key usability affordance for power users/admins.
- **Suggested fix:** Add a consistent focus-visible ring to the base button styles (aligned with your design tokens).

### 99) Support/contact + social identity is inconsistent across surfaces (trust drift)
- **What happens:** Different parts of the app advertise different contact emails and social handles:
  - Blog post footer text hard-codes `hello@lumelle.com`
  - The site constants and legal pages use `SUPPORT_EMAIL` (`info@lumellebeauty.co.uk`)
  - Metadata in `index.html` references `lumellehair`, while the visible footer links to `lumelleuk`
- **Where:**
  - Constants: `src/config/constants.ts`
  - Blog: `src/domains/blog/ui/pages/BlogPostPage.tsx`
  - Footer socials: `src/ui/components/GlobalFooter.tsx`
  - Metadata: `index.html` (JSON-LD `sameAs`)
- **Why it’s a big issue:** Inconsistent “who are we / how do I contact you” info is a trust killer and can lead to missed support requests.
- **Suggested fix:** Centralize contact + social URLs into one config and reuse it everywhere (UI + metadata + content templates).

### 100) Blog promotes a “travel variant” URL but PDP ignores variant query params (misleading deep link)
- **What happens:** A blog product card links to `/product/lumelle-shower-cap?variant=travel`, implying a variant/option selection, but the PDP route only uses `:handle` and does not read the query param—so users land on the same PDP with no variant selection.
- **Where:**
  - Link source: `src/content/blog/posts/lumelle-journal-launch.ts` (`href: '/product/lumelle-shower-cap?variant=travel'`)
  - PDP routing/logic: `src/App.tsx` (`/product/:handle`), `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (uses only `params.handle`)
- **Why it’s a big issue:** Variant deep links are high-intent. If they don’t work, the user assumes the store is broken or bait-and-switching product options.
- **Suggested fix:** Either implement variant support (read query params and reflect the selected option in UI/pricing) or remove the variant claim/link until variants are real.

### 101) Creator “Download brief” CTAs can point to an `example.com` placeholder (broken onboarding resource)
- **What happens:** `CONTENT_BRIEF_URL` falls back to `https://example.com/lumelle-creator-brief.pdf` when the env var isn’t set. That means key CTAs like “Download PDF brief” / “Download PDF” / “Download brief” can send creators to a placeholder domain instead of a real document.
- **Where:**
  - Constant: `src/config/constants.ts` (`CONTENT_BRIEF_URL`)
  - Used by onboarding: `src/content/welcome.ts` (`resourceCards`)
  - Used by creator brief page: `src/domains/client/marketing/ui/pages/BriefPage.tsx` (`href={CONTENT_BRIEF_URL}`)
  - Shared brief content: `src/content/brief.ts`
- **Why it’s a big issue:** This is a top-of-funnel creator onboarding step. If the “brief” link is broken, the program feels fake/unfinished and you lose creators before they ever produce content.
- **Suggested fix:** Require a real `VITE_CONTENT_BRIEF_URL` in production (fail fast if missing), or host the PDF in your own `public/` (or CMS) and link to a stable first-party URL. Add a visible error state if the link is unavailable.

### 102) Welcome page “View leaderboard” card is a dead link and opens in a new tab
- **What happens:** The welcome resources include `href: '#leaderboard'`. `WelcomePage` treats anything not starting with `/` as “external”, so it renders an `<a>` with `target="_blank"`. Clicking it opens a new tab to `/welcome#leaderboard` and does not scroll anywhere (because WelcomePage has no `id="leaderboard"` section).
- **Where:**
  - Link source: `src/content/welcome.ts` (`resourceCards` → `href: '#leaderboard'`)
  - Link rendering logic: `src/domains/client/marketing/ui/pages/WelcomePage.tsx` (`isInternal = href.startsWith('/')`)
- **Why it’s a big issue:** The welcome hub is supposed to be the “single source of truth” for onboarding. Dead links (especially ones that unexpectedly open new tabs) instantly signal “this site is broken”.
- **Suggested fix:** Point to a real destination (e.g., `/creators#leaderboard` or a dedicated `/leaderboard` route), and treat hash links (`#...`) as same-page navigation (no `_blank`). Also ensure the target `id` exists on the destination page.

### 103) Blog index “tag” chips look like filters but are inert, and pillar filtering is effectively unreachable
- **What happens:**
  - The blog hero renders “tags” as styled pills (`<span>`), so they look clickable but don’t do anything.
  - The actual filter UI is built from `post.tag`, but filtering logic also checks `post.pillar`. Because `tagOptions` doesn’t include pillars, users cannot actually filter by pillar even though the data model supports it.
- **Where:** `src/domains/blog/ui/pages/BlogIndexPage.tsx` (`tags` chips + `tagOptions` + filter predicate)
- **Why it’s a big issue:** Blog discovery is retention. UI that looks interactive but isn’t (and categories that exist but can’t be selected) makes the blog feel sloppy and hurts content engagement.
- **Suggested fix:** Decide what the primary taxonomy is (tag vs pillar), then build a single filter UI from that source. If both matter, expose both explicitly (e.g., “Pillars” chips + “Tags” chips) and make them actual buttons with a clear active state.

### 104) Canonical URLs / breadcrumb JSON-LD / share links hard-code `https://lumelle.com` (breaks on staging/custom domains)
- **What happens:** Many routes generate canonical URLs and structured data using the hard-coded production domain (`https://lumelle.com`). If the app is deployed on any other host (staging, Vercel preview, custom domain), shares and SEO metadata can point at the wrong site.
- **Where (examples):**
  - Blog: `src/domains/blog/ui/pages/BlogIndexPage.tsx`, `src/domains/blog/ui/pages/BlogPostPage.tsx`
  - Storefront: `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`, `src/domains/client/shop/products/ui/pages/SearchResultsPage.tsx`, `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
  - Legal/creator pages: `src/domains/client/marketing/ui/pages/TermsPage.tsx`, `src/domains/client/marketing/ui/pages/PrivacyPage.tsx`, `src/domains/client/marketing/ui/pages/WelcomePage.tsx`, `src/domains/client/marketing/ui/pages/BriefPage.tsx`
  - Legacy SEO helper: `src/ui/components/SEO.tsx` (default meta image URL)
- **Why it’s a big issue:** Wrong canonicals + OG URLs cause share previews to mislead users, can split SEO signals across domains, and can route customers to production when testing on staging (confusing + risky).
- **Suggested fix:** Centralize a `publicBaseUrl` (env-driven, e.g. `VITE_PUBLIC_BASE_URL`) and build canonical/OG URLs from it. For purely client-side apps, `window.location.origin` can be a fallback (with care if you ever add SSR).

### 105) Brand story page has no SEO metadata (browser tab title/share preview can be stale or wrong)
- **What happens:** `/brand` renders without a `<Seo />` component, so the document title/description/OG tags may remain from whatever page the user visited previously.
- **Where:** `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx` (no `Seo` usage), routed from `src/App.tsx` (`/brand`)
- **Why it’s a big issue:** Brand/story pages are high-trust and high-share. A stale title/description makes the site feel broken and reduces share/SEO quality.
- **Suggested fix:** Add `<Seo title="Brand story" ... />` with a good description, canonical URL, and a representative image (and optionally JSON-LD Organization/About schema).

### 106) `Seo` auto-prefixing + titles that already contain “Lumelle | …” yields awkward double-brand tab titles
- **What happens:** The `Seo` component always prefixes the page title with `LUMELLE™ |`. Some pages pass a title that already contains the brand and a delimiter (e.g., `Lumelle | Satin-lined waterproof shower cap`). The result becomes `LUMELLE™ | Lumelle | Satin-lined waterproof shower cap`.
- **Where:**
  - Title building: `src/components/Seo.tsx` (`siteTitle` + `fullTitle`)
  - Example caller: `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (`title = 'Lumelle | Satin-lined waterproof shower cap'`)
- **Why it’s a big issue:** The tab title is user-facing polish and a key SEO/share signal. Redundant branding looks sloppy and makes the app feel less premium.
- **Suggested fix:** Standardize titles to be page-specific only (no brand, no separators), or make `Seo` smart enough to strip/dedupe brand prefixes.

### 107) Drawer upsell cards fabricate compare-at pricing + review counts (trust risk in cart)
- **What happens:** Upsell cards in the drawer show:
  - Review counts from a hard-coded map, falling back to “4.8 ★ · 100 reviews” for unknown products.
  - A strike-through compare-at price calculated as `price * 1.3` (not product data).
- **Where:** `src/ui/providers/DrawerProvider.tsx` (`reviewMeta` + `renderUpsellCard` pricing/review display)
- **Why it’s a big issue:** The cart/drawer is a conversion-critical, high-trust surface. Fake social proof and synthetic compare-at pricing can backfire hard (“this feels scammy”) and creates compliance risk.
- **Suggested fix:** Pull rating/review/compare-at from a real audited data source (Shopify or a verified reviews provider). If data isn’t available yet, remove the proof/strike-through until it is (or show “New” instead of a fake rating).

### 108) Shopify checkout/cart handoff page doesn’t provide a direct “Open on Shopify” link even when the domain is known
- **What happens:** When a user lands on a Shopify-style checkout/cart URL (`/cart/c/*`), the app displays an explanation and only offers “Back to cart” / “Home”. Even though the page reads `SHOPIFY_STORE_DOMAIN`, it doesn’t construct a clickable URL to the Shopify-hosted version of the same path.
- **Where:** `src/domains/client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage.tsx` (reads `env('SHOPIFY_STORE_DOMAIN')` but doesn’t use it for a CTA)
- **Why it’s a big issue:** This is a direct conversion blocker in a known failure mode. The UI should help the user complete checkout, not just explain why it broke.
- **Suggested fix:** If `SHOPIFY_STORE_DOMAIN` exists, render a primary CTA to `https://${SHOPIFY_STORE_DOMAIN}${fullPath}` (and/or auto-redirect after a short delay). Keep the technical “Developer details” secondary or gated.

### 109) Blog pages don’t consistently apply `cdnUrl` to images (CDN toggle won’t apply; can cause broken imagery/perf regressions)
- **What happens:** Blog SEO images are passed through `cdnUrl(...)`, but many visible `<img>` tags render raw `post.cover` / `item.cover`. If `VITE_USE_ASSET_CDN=1` and the production build expects assets from the CDN, blog covers/cards can bypass the CDN or even 404.
- **Where:**
  - Index: `src/domains/blog/ui/pages/BlogIndexPage.tsx` (SEO `heroImage` uses `cdnUrl`, cards use `src={post.cover}`)
  - Post: `src/domains/blog/ui/pages/BlogPostPage.tsx` (cover + related cards use `src={post.cover}` / `src={item.cover}`)
  - CDN helper: `src/lib/utils/cdn.ts`
- **Why it’s a big issue:** Blog is image-heavy. Random broken images or inconsistent load performance makes the site feel unreliable and hurts engagement.
- **Suggested fix:** Normalize image rendering: for any non-absolute URL, always wrap in the canonical `cdnUrl` helper before passing to `<img src>`.

### 110) Some above-the-fold hero images omit explicit sizing (risk of layout shift/jank)
- **What happens:** Key hero images are rendered without `width`/`height` attributes (and not always inside a fixed-aspect container). That prevents the browser from reserving space and can cause layout shift as images load.
- **Where:**
  - `src/domains/client/marketing/ui/pages/WelcomePage.tsx` (hero lifestyle image)
  - `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx` (hero image)
- **Why it’s a big issue:** Layout shift is a “polish killer” on first impression, especially on mobile. It makes the UI feel janky and can hurt conversion.
- **Suggested fix:** Add `width`/`height` attributes or enforce an aspect-ratio wrapper for these hero images (align with how other pages reserve space for blog/hero imagery). Also consider consistent `decoding="async"` and `fetchPriority` for above-the-fold media.

### 111) `noindex` robots meta can “stick” across SPA navigation (you can accidentally noindex the whole site)
- **What happens:** Some routes call `setNoIndex()` which mutates `<meta name="robots">` to `noindex` (or `noindex,nofollow` in the other helper). In a client-side SPA, that meta tag persists after navigation unless explicitly reset, so visiting `/cart` or a 404 can cause subsequent pages (home/PDP/blog) to remain `noindex` until a hard refresh.
- **Where:**
  - Meta mutation helpers: `src/lib/seo.ts`, `src/domains/client/marketing/logic/seo.ts`
  - Call sites: `src/domains/client/shop/cart/ui/pages/CartPage.tsx`, `src/ui/pages/NotFoundPage.tsx`, `src/domains/client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage.tsx`
- **Why it’s a big issue:** This can silently deindex pages and makes SEO/share behavior unpredictable. It’s also a QA trap: one “noindex page” visit can poison the rest of the session.
- **Suggested fix:** Manage robots meta per-route via `react-helmet-async` (default to indexable), and only set `noindex` for specific routes while they’re mounted; ensure it resets on unmount/navigation.

### 112) Several key routes don’t set page metadata (tab title/description can be stale from the previous page)
- **What happens:** Some high-intent pages render without `<Seo />`. In a SPA, that means the document title/description and OG metadata can remain from whatever page the user visited previously (e.g., you’re on Cart but the tab still says Blog).
- **Where:**
  - No `<Seo />`: `src/domains/client/shop/cart/ui/pages/CartPage.tsx`, `src/ui/pages/NotFoundPage.tsx`, `src/domains/client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage.tsx`
- **Why it’s a big issue:** Wrong tab titles feel broken, harm accessibility (screen readers rely on page titles), and produce misleading share previews.
- **Suggested fix:** Add minimal `<Seo />` to these routes (even if you keep them `noindex`), and keep metadata consistent across navigation.

### 113) Spin wheel “Saved — add to cart” state is dead (saved discount code is never used later)
- **What happens:** When the user has no cart, the wheel sets `localStorage['lumelle_pending_discount_code']` and shows a “Saved — add to cart” confirmation. But there is no code anywhere that reads this localStorage key, so the “saved reward” never actually applies when the user later adds items.
- **Where:**
  - Writer: `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx` (`localStorage.setItem('lumelle_pending_discount_code', ...)`)
  - No consumer: there are no other references to `lumelle_pending_discount_code` in `src/`
- **Why it’s a big issue:** This is a classic “UI says success but nothing happens later” trust killer, especially in promo/reward surfaces.
- **Suggested fix:** Either implement consumption (read + apply the pending code when cart becomes non-empty / when cart drawer opens), or remove the “Saved” UI and be honest about the requirement.

### 114) Drawer sign-in copy promises “manage subscriptions” (but there is no subscription management UI)
- **What happens:** The signed-out drawer login card claims users can “manage subscriptions”, but the app has no subscription routes or subscription management features.
- **Where:** `src/ui/providers/DrawerProvider.tsx` (signed-out menu footer card copy)
- **Why it’s a big issue:** Overpromising features that aren’t present makes the store feel untrustworthy and confuses users right at the “sign in” moment.
- **Suggested fix:** Reword the copy to only reflect real capabilities (orders, addresses) or implement a minimal subscription/preferences page before advertising it.

### 115) Successful sign-in redirects users to a broken destination (`afterSignInUrl="/account"` but `/account` is unavailable)
- **What happens:** Clerk is configured to send users to `/account` after sign-in/sign-up, but `/account` currently renders “temporarily unavailable”. So the “success” moment of auth ends in a dead page.
- **Where:**
  - Redirect config: `src/main.tsx` (`afterSignInUrl="/account"`, `afterSignUpUrl="/account"`)
  - Destination is stubbed: `src/domains/client/account/ui/pages/AccountPage.tsx` (and other account subpages)
- **Why it’s a big issue:** It makes auth feel broken and wastes the user’s intent immediately after they complete a high-friction step.
- **Suggested fix:** Redirect to a working page by default (e.g., `/` or `/cart`), and support a `redirect` param so users return to what they were doing.

### 116) `index.html` structured data advertises a site search (`SearchAction`) but search UX/data is not real
- **What happens:** The base HTML includes a JSON-LD `WebSite` schema with `SearchAction` targeting `/search?q=...`, implying a functional on-site search. In the app, search results are driven by a hard-coded catalog (with dead `href: '#'` items) and there’s no real search entrypoint UI.
- **Where:**
  - JSON-LD SearchAction: `index.html` (`"potentialAction": { "@type": "SearchAction", ... }`)
  - Search page implementation: `src/domains/client/shop/products/ui/pages/SearchResultsPage.tsx` (`CATALOG` array with `href: '#'`)
- **Why it’s a big issue:** This is misleading to both users and search engines, can create bad sitelinks/UX expectations, and reinforces the “placeholder” feeling.
- **Suggested fix:** Remove the SearchAction schema until real search exists, or implement real search backed by the same product source-of-truth as PDPs (and remove dead links).

### 117) Duplicate “content source of truth” files increase copy drift risk (welcome/brief/legal exist twice)
- **What happens:** There are parallel content trees (e.g., `src/content/*` and `src/domains/client/marketing/data/*`) containing the same concepts (welcome, brief, legal), sometimes identical and sometimes slightly different. This makes it easy to edit the wrong file and ship inconsistent UI copy.
- **Where (examples):**
  - Welcome: `src/content/welcome.ts` vs `src/domains/client/marketing/data/welcome.ts`
  - Brief: `src/content/brief.ts` vs `src/domains/client/marketing/data/brief.ts`
  - Legal: `src/content/legal.ts` vs `src/domains/client/marketing/data/legal.ts`
- **Why it’s a big issue:** Content is part of the UI. Duplication leads to inconsistency, slows iteration, and increases “why didn’t my change show up?” confusion for the team.
- **Suggested fix:** Consolidate to one source of truth (pick one folder), delete or redirect the other, and enforce consistent imports (e.g., via lint rule or path alias conventions).

### 118) Social URL config exists but isn’t used; UI hard-codes social links so env vars can’t fix them
- **What happens:** The repo defines social URL constants with env-var support (`INSTAGRAM_URL`, `TIKTOK_URL`, `TWITTER_URL`), but the UI hard-codes social profile URLs instead. That means changing environment variables won’t update footer links (and defaults like `https://instagram.com` aren’t even a real profile).
- **Where:**
  - Config constants: `src/config/constants.ts` (INSTAGRAM_URL/TIKTOK_URL/TWITTER_URL)
  - Hard-coded UI links: `src/ui/components/GlobalFooter.tsx`
  - Hard-coded admin component meta: `src/domains/admin/shared/data/componentMeta.ts`
- **Why it’s a big issue:** Social links are trust surfaces. If a handle changes or a link is wrong, you can’t fix it via config and different surfaces can drift.
- **Suggested fix:** Centralize socials into one config and use it everywhere (footer + metadata + admin component presets). Make defaults point to the real brand handles.

### 119) TikTok embeds are inconsistently sandboxed across pages (inconsistent behavior + privacy/security risk)
- **What happens:** Some TikTok iframes include a restrictive `sandbox` attribute, but other TikTok embeds (notably in the featured TikTok section) don’t. This inconsistency can lead to different behavior between pages and increases risk from third-party embeds.
- **Where:**
  - Sandboxed: `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`, `src/domains/client/marketing/ui/sections/success/SuccessStoriesSection.tsx`
  - Not sandboxed: `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`
- **Why it’s a big issue:** Third-party embeds are high-impact on performance and can have privacy/security implications. Inconsistent embed policies reduce predictability and polish.
- **Suggested fix:** Standardize embed policy (sandbox consistently with the minimal allowed capabilities), and consider click-to-load + “Watch on TikTok” fallbacks for reliability.

### 120) Two different color token systems are used in global UI (`brand-*` vs `semantic-legacy-brand-*`) (design consistency drift risk)
- **What happens:** Global UI components mix two different token namespaces (`bg-brand-*`/`text-brand-*` vs `bg-semantic-legacy-brand-*`/`text-semantic-*`). Even if they map to similar colors today, this increases drift risk and makes the design system harder to maintain consistently.
- **Where:**
  - `brand-*` tokens in header: `src/ui/components/PublicHeader.tsx`
  - `semantic-legacy-brand-*` tokens across most other surfaces: `src/layouts/MarketingLayout.tsx`, `src/ui/components/GlobalFooter.tsx`, many storefront sections
  - Token definitions: `tailwind.config.js` (brand CSS variables + semantic colors)
- **Why it’s a big issue:** Inconsistent tokens lead to subtle mismatched shades across pages and make future theming/refactors expensive (premium UI depends on consistency).
- **Suggested fix:** Pick one token system as the public design API, migrate the other, and enforce usage (e.g., ban direct `brand-*` usage in app UI if semantic tokens are the standard).

### 121) WhatsApp CTAs are inconsistent (and one is mislabeled): “Message WhatsApp” points to a group invite link
- **What happens:** Different parts of the app send users to different WhatsApp destinations (creator group invite vs concierge DM), and at least one CTA is mislabeled: on the brief page, “Message WhatsApp” uses `WHATSAPP_INVITE_URL` (a `chat.whatsapp.com/...` group invite), which is not a “message” flow and can pull users out of the site in the same tab.
- **Where:**
  - Creator invite constant: `src/config/constants.ts` (`WHATSAPP_INVITE_URL`)
  - “Message WhatsApp” button uses invite URL: `src/domains/client/marketing/ui/pages/BriefPage.tsx`
  - Welcome hero “Join WhatsApp now”: `src/content/welcome.ts`, rendered by `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
  - Shop FAQ “concierge” uses a different WhatsApp link: `src/domains/client/shop/products/ui/sections/faq-section-shop/FaqSectionShop.tsx` (`https://wa.me/message/...`)
- **Why it’s a big issue:** WhatsApp is a high-trust, high-intent channel. If “Message” unexpectedly joins a group, or if links vary unpredictably, users assume the site is sloppy or scammy. It also creates support load (“I clicked message and it asked me to join a group”).
- **Suggested fix:** Split WhatsApp URLs by intent (e.g., `CREATOR_WHATSAPP_INVITE_URL` vs `SUPPORT_WHATSAPP_DM_URL`) and use the right one per surface. Make labels explicit (“Join Creator WhatsApp” vs “Chat with concierge”). Ensure external WhatsApp CTAs consistently open in a new tab with safe rel attributes.

### 122) Product spotlight discount UI depends on parsing a human-written price string (fragile + easy to break)
- **What happens:** The marketing “product spotlight” tries to compute and display a discount badge by regex-parsing the `teaser.price` string (expects a format like `£14.99 (was £19.99)`). Any copy change (spacing, “RRP”, different currency, missing parentheses) breaks the discount UI and silently falls back to a plain price label.
- **Where:**
  - Regex parser + UI logic: `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx` (`parsePrice`)
  - Source strings: `src/content/home.config.ts` (`pdpTeaser.price`)
- **Why it’s a big issue:** Price presentation is a conversion + trust surface. Fragile parsing creates inconsistent discount display across releases (“why did the discount vanish?”) and makes non-GBP or alternate price formats risky.
- **Suggested fix:** Move price data to structured fields (`priceNow`, `priceWas`, `currency`) and compute discount from numbers. Keep `price` as display-only text if needed, but don’t parse UI copy to derive logic.

### 123) Creator “Leaderboard” claims it updates daily, but it’s hard-coded static data
- **What happens:** The creators leaderboard UI presents “Top creators this month” and “Updated daily”, but the rows are imported from a static content array. There’s no data source, refresh, or timestamp, so it cannot actually be “updated daily” unless someone edits code and redeploys.
- **Where:**
  - Leaderboard UI + “Updated daily” copy: `src/domains/creator/ui/sections/leaderboard/LeaderboardSection.tsx`
  - Data source is static: `src/content/landing.ts` (`leaderboardEntries`)
- **Why it’s a big issue:** Leaderboards and “units sold” are credibility-sensitive. If users suspect it’s fake, it undermines the entire creator program narrative and can create compliance/trust issues (especially if rewards/competition are implied).
- **Suggested fix:** Either (a) clearly label this as “Example leaderboard” until wired, or (b) connect it to a real backend (Shopify/Affiliate tracking) and show “last updated” with a real timestamp.

### 124) Sign-in / sign-up pages promise capabilities that don’t exist (orders/addresses/commissions)
- **What happens:** Auth pages market features like tracking shipping, managing orders/addresses, and tracking commissions — but the account area is stubbed/unavailable. This creates a “sign in → nothing works” experience even when auth succeeds.
- **Where:**
  - Sign-in promises: `src/domains/platform/auth/ui/pages/SignInPage.tsx`
  - Sign-up promises: `src/domains/platform/auth/ui/pages/SignUpPage.tsx`
  - Account routes are placeholders: `src/domains/client/account/ui/pages/AccountPage.tsx`, `src/domains/client/account/ui/pages/OrdersPage.tsx`, `src/domains/client/account/ui/pages/AddressesPage.tsx`, `src/domains/client/account/ui/pages/PaymentMethodsPage.tsx`
- **Why it’s a big issue:** This is a trust + drop-off multiplier: users take a high-friction action (sign-in) and are immediately met with missing functionality, which reads like a broken site.
- **Suggested fix:** Make auth page copy match what’s actually available today (e.g., “creator onboarding hub”), and/or ship a minimal working account home (orders list, addresses, payment methods) before advertising these benefits.

### 125) The “Sign up” page uses the `signIn` Clerk API (sign-up flow is ambiguous and may fail)
- **What happens:** `SignUpPage` uses `useSignIn()` and calls `signIn.authenticateWithRedirect(...)` even though the UI is explicitly “Create your account / Join instantly”. This is at best confusing, and at worst can cause edge-case failures or misrouted errors for first-time users.
- **Where:** `src/domains/platform/auth/ui/pages/SignUpPage.tsx` (uses `useSignIn` + `signIn.authenticateWithRedirect`)
- **Why it’s a big issue:** Auth is core funnel infrastructure. If sign-up breaks or behaves inconsistently, users can’t access admin/account flows and will bounce immediately.
- **Suggested fix:** Use the correct Clerk sign-up flow (`useSignUp` / `signUp.authenticateWithRedirect`) or explicitly reframe the page as “Continue with Google” where Clerk handles new vs returning users transparently. Add a clear error state and retry guidance.

### 126) No global error boundary: any runtime error or chunk-load failure can white-screen the app
- **What happens:** Routes are lazy-loaded via `React.lazy`, and the app uses `Suspense` for loading — but there is no error boundary. If a component throws during render/effects or if a dynamic chunk fails to load (network/cached SW edge cases), the user can end up on a blank/broken screen with no recovery UI.
- **Where:**
  - Lazy routes: `src/App.tsx` (`lazy(() => import(...))`)
  - Root render wraps only in `Suspense`: `src/main.tsx` (no ErrorBoundary)
- **Why it’s a big issue:** These failures are rare but catastrophic and feel like “the site is down”. Without a recovery path, users just leave (especially mobile).
- **Suggested fix:** Add a top-level error boundary with a branded fallback (refresh, go home, contact support) and optionally special-case chunk-load errors with an automatic retry prompt.

### 127) Homepage reviews section tells users to “visit our TikTok shop product page” but provides no link
- **What happens:** The reviews carousel description says “To see more reviews visit our TikTok shop product page.” but there is no clickable link/CTA to the TikTok shop page, leaving users with an instruction they can’t follow.
- **Where:** `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx` (default heading description), rendered on the homepage by `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (no heading override passed there).
- **Why it’s a big issue:** Reviews are a trust surface. If you reference an external “source of truth” but don’t link it, users can’t verify claims and the UI feels unfinished.
- **Suggested fix:** Add an explicit “View on TikTok Shop” link/button (config-driven), or remove the claim. If you keep it, ensure the link is visible on mobile and has a reliable fallback path.

### 128) Welcome onboarding says “Log your launch date” but offers no action to actually do it
- **What happens:** The welcome page copy repeatedly instructs creators to “log” or “set” a launch date, but there’s no form, CTA, or explicit “post this in WhatsApp” action to complete the step — it’s just text.
- **Where:**
  - Content step: `src/content/welcome.ts` (`welcomeSteps` → “Log your launch date”)
  - Page-level copy repeats it: `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
- **Why it’s a big issue:** Onboarding flows must be action-oriented. “Do X” with no affordance creates uncertainty and churn (creators don’t know where to report the date, so they do nothing).
- **Suggested fix:** Add a concrete action: a “Post launch date in WhatsApp” button (pre-fills a message), a lightweight form that stores the date, or update the copy to explicitly say “Share your date in the WhatsApp chat.”

### 129) Marketing pages use raw hex colors in Tailwind classes (bypasses the token system and increases drift)
- **What happens:** Several hero backgrounds use `from-[#...]`/`via-[#...]`/`to-[#...]` gradients instead of semantic tokens. This quietly bypasses the design-token system, making brand colors inconsistent and harder to adjust globally.
- **Where (examples):**
  - Welcome page gradients: `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
  - Brief page gradients: `src/domains/client/marketing/ui/pages/BriefPage.tsx`
  - Brand story gradients: `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`
- **Why it’s a big issue:** Token drift is how UIs become subtly “off” over time (slightly different whites/pinks across pages). It also makes theming and accessibility/contrast tuning harder because you can’t fix colors in one place.
- **Suggested fix:** Add semantic tokens for these background shades and use token-based classes everywhere. Consider linting/reporting raw color usage (the repo already includes token tooling scripts) to prevent regressions.

### 130) Duplicate `StarRating` components exist (UI drift + bug fixes won’t apply consistently)
- **What happens:** There are two separate `StarRating` implementations (one in global UI, one in marketing). This increases the chance of inconsistent visuals and duplicated bugs (e.g., both use the same `linearGradient id="half"` pattern, which can glitch when multiple ratings are rendered on a page).
- **Where:**
  - Global UI rating: `src/ui/components/StarRating.tsx`
  - Marketing rating: `src/domains/client/marketing/ui/components/StarRating.tsx`
- **Why it’s a big issue:** Ratings are a high-trust surface. If half-stars render inconsistently or bug fixes only land in one component, the UI feels unpolished and “patched together.”
- **Suggested fix:** Consolidate to a single shared `StarRating` component and remove the duplicate. Ensure any SVG ids are unique per instance (e.g., `useId()`), and keep styling variants configurable via props instead of copying code.

### 131) Social proof mismatch: homepage teaser shows 4.9★ / 1240 reviews, but the PDP shows 4.8 / 100+
- **What happens:** The marketing “product teaser” shows stronger social proof than the product detail page for the same product. On the homepage teaser, the shower cap is presented as 4.9★ with 1240 reviews; on the PDP, the shower cap uses a 4.8 override and a “100+” count label.
- **Where:**
  - Homepage teaser values: `src/content/home.config.ts` (`pdpTeaserCap.rating`, `pdpTeaserCap.reviews`)
  - PDP overrides: `src/domains/client/shop/products/data/product-config.ts` (`productConfigs['shower-cap'].ratingValueOverride`, `ratingCountLabelOverride`)
  - PDP uses those values: `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (computes `ratingValue`/`ratingCountLabel`)
- **Why it’s a big issue:** Social proof is a trust and conversion surface. Showing “better” numbers on the landing page and “worse” numbers on the PDP reads like bait-and-switch (even if it’s just placeholder data), which can tank conversion and increase support questions.
- **Suggested fix:** Make rating + review count a single source of truth. Either (a) derive the homepage teaser from the PDP config (or real backend data), or (b) keep the same placeholder values everywhere and label them consistently. If these are not real, avoid showing precise counts like “1240” and use a clearly non-specific label (e.g., “100+ verified reviews”) across all surfaces until real data exists.

### 132) Search results page has no search input (users can’t refine or try again)
- **What happens:** `/search` only reads `q` from the URL and prints “Query: …”, but offers no search field or controls to change the query. The only way to refine the search is to edit the URL or navigate away and come back.
- **Where:** `src/domains/client/shop/products/ui/pages/SearchResultsPage.tsx`
- **Why it’s a big issue:** Search is a core recovery flow (users use it when they’re confused). Removing the ability to iterate makes the page feel unfinished and increases abandonment, especially on mobile.
- **Suggested fix:** Add a proper search input at the top that is bound to the query param (`useSearchParams`) with an explicit submit action. Add an empty state (“No results for …”) with a “Clear search” action and suggested popular products.

### 133) Above-the-fold hero images are lazy-loaded (blank hero risk + worse perceived quality)
- **What happens:** Some hero images that are clearly above-the-fold are set to `loading="lazy"`, so the browser may defer fetching them until later. That can cause the hero to appear empty or “pop in” late on first paint (especially on slower mobile networks).
- **Where:**
  - Welcome hero image: `src/domains/client/marketing/ui/pages/WelcomePage.tsx` (`<img ... loading="lazy" />`)
  - Brand story hero image: `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx` (`<img ... loading="lazy" />`)
- **Why it’s a big issue:** These are first-impression, conversion-critical pages. A delayed hero image makes the UI feel cheap/janky and can hurt LCP/perceived speed.
- **Suggested fix:** For true above-the-fold hero media, use `loading="eager"` and set `fetchPriority="high"` (where supported). Keep `loading="lazy"` for below-the-fold media (avatars, galleries). Pair with explicit sizing/aspect-ratio so the layout doesn’t shift as images arrive.

### 134) Trust bar uses a marquee animation with a clickable link (moving target + no pause control)
- **What happens:** The trust bar auto-scrolls horizontally using a marquee animation and includes a “Shop now” link inside the moving content. There’s no pause-on-hover/focus and no explicit pause control; it only disables motion when `prefers-reduced-motion` is set.
- **Where:**
  - Animated trust bar: `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx` (inline `animation: marquee ...`)
  - Keyframes: `src/index.css` (`@keyframes marquee`)
- **Why it’s a big issue:** Moving text is harder to read, increases mis-taps on mobile, and is an accessibility risk (WCAG “Pause, Stop, Hide” expectations for content that moves automatically). It also feels visually dated compared to a modern, static trust strip.
- **Suggested fix:** Replace with a static row/stack of trust bullets (or a manual carousel with buttons). If you keep animation, pause it on hover/focus, provide a visible pause toggle, and keep the primary CTA static (not moving).

### 135) `Seo` allows relative `og:image` / `twitter:image` URLs (share previews can fail)
- **What happens:** The `Seo` component renders `og:image` and `twitter:image` exactly as provided. Many call sites pass relative paths (often via `cdnUrl('/uploads/...')`, which returns a relative URL when the CDN toggle is off). Social scrapers and link previews frequently require absolute URLs for images, so previews can render without an image.
- **Where:**
  - SEO component: `src/components/Seo.tsx` (writes `<meta property="og:image" content={image} />`)
  - CDN helper can return relative paths: `src/lib/utils/cdn.ts`, `src/utils/cdn.ts`
- **Why it’s a big issue:** Broken share previews reduce click-through on shared links (WhatsApp, iMessage, Slack, Twitter/X) and make the brand look unpolished.
- **Suggested fix:** Normalize images to absolute URLs inside `Seo`. If `image` starts with `/`, prefix it using a known origin (prefer `url`’s origin if provided, otherwise `window.location.origin` or an env `SITE_URL`). Consider also adding `og:image:alt` and a default fallback image.

### 136) Global `overflow-x-hidden` can clip focus rings/shadows and hides layout bugs instead of fixing them
- **What happens:** The app applies `overflow-x-hidden` globally (on `body`) and also on the `MarketingLayout` wrapper. This can clip focus outlines, drop shadows, and any intentional horizontal overflow (carousels/thumbnail strips). It can also mask underlying layout issues that should be addressed at the component level.
- **Where:**
  - Global body styles: `src/index.css` (`@apply ... overflow-x-hidden`)
  - Marketing layout wrapper: `src/layouts/MarketingLayout.tsx` (`overflow-x-hidden`)
- **Why it’s a big issue:** This is a “paper over cracks” fix: it can create subtle accessibility problems (focus rings not visible) and make UI issues harder to detect early.
- **Suggested fix:** Remove the global overflow lock and fix the actual overflowing component(s). If you need a safety net, prefer `overflow-x-clip` on specific wrappers and ensure focus styles still render outside the element (or add `outline-offset`/focus ring padding).

### 137) PDP hero preload link is only ever added once (stale preload when navigating between products)
- **What happens:** The PDP injects a `<link rel="preload" as="image">` for the hero image, but only if a link with `data-hero="pdp-hero"` doesn’t already exist. In SPA navigation, if the user visits multiple PDPs, the preload `href` can remain stuck on the first product’s hero image, preloading the wrong asset thereafter.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (`useEffect` that appends `link[rel="preload"][data-hero="pdp-hero"]`)
- **Why it’s a big issue:** PDP speed is conversion-critical. Stale preloads waste bandwidth and can make subsequent PDP navigations slower (the browser preloads the wrong image instead of the next hero).
- **Suggested fix:** If the preload link already exists, update its `href` when `heroImage` changes (or remove + recreate). Ensure the preload URL matches the actual rendered image URL (including CDN + encoding) to avoid duplicate requests.

### 138) PDP thumbnail strip hides the scrollbar and has no “more media” affordance
- **What happens:** The PDP thumbnail row is horizontally scrollable but explicitly hides scrollbars. Without arrows, gradients, or a visible “more” affordance, many users (especially desktop mouse users) won’t discover there are additional images.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` (thumbnail scroller uses `overflow-x-auto` + hidden scrollbar styles)
- **Why it’s a big issue:** Product imagery is one of the highest-leverage conversion elements. If users miss angles/details, they hesitate or bounce; if they buy without enough context, returns and support contacts increase.
- **Suggested fix:** Keep scrollbars visible or add clear affordances (left/right arrow buttons, edge fades, or a “+N more” indicator). Make controls keyboard accessible and ensure the active thumbnail scrolls into view when selected.

### 139) Fonts are loaded via CSS `@import` (render-blocking and can worsen first paint)
- **What happens:** The app loads Google Fonts via a CSS `@import` at the top of `index.css`. CSS imports delay stylesheet processing and can slow down first paint; it also prevents using proper preconnect/preload hints for font domains.
- **Where:** `src/index.css` (Google Fonts `@import url(...)`)
- **Why it’s a big issue:** Typography is a core brand signal on the landing/PDP. Slow font loading causes visible text shifts and makes the site feel less premium — especially on mobile.
- **Suggested fix:** Move font loading to `index.html` with `rel="preconnect"` to the font domains and a standard `<link rel="stylesheet" ...>` (or self-host the fonts). Keep `display=swap` (or equivalent) and consider preloading critical font files if self-hosted.

### 140) Fixed bottom CTAs don’t respect iOS safe-area insets (can overlap the home indicator / browser UI)
- **What happens:** Several mobile CTAs are positioned with fixed `bottom-*` classes but don’t include `env(safe-area-inset-bottom)`. On iPhones (and many in-app browsers), fixed bottom UI can sit under the home indicator or browser chrome, reducing tap targets and creating “can’t click the button” complaints.
- **Where:**
  - Mobile floating buy CTA: `src/domains/client/marketing/ui/components/FloatingBuyCta.tsx` (`fixed ... bottom-6`)
  - Spin wheel floating prompt: `src/domains/client/shop/products/ui/components/SpinWheelPrompt.tsx` (`fixed bottom-5 ...`)
- **Why it’s a big issue:** This affects the highest-intent actions on the most common device class (mobile). If a CTA is even slightly clipped/hard to tap, conversion drops and users assume the site is buggy.
- **Suggested fix:** Add safe-area-aware spacing, e.g. `bottom-[calc(1.5rem+env(safe-area-inset-bottom))]` or a wrapper with `pb-[env(safe-area-inset-bottom)]`. Verify in iOS Safari and in-app webviews.

### 141) Two SEO components exist (`Seo` vs `SEO`) with different defaults and URL/image handling (meta drift risk)
- **What happens:** The repo contains two separate Helmet-based SEO components:
  - `src/components/Seo.tsx` (`Seo`) which prefixes titles as `LUMELLE™ | {pageTitle}` and only sets `og:url`/canonical when provided.
  - `src/ui/components/SEO.tsx` (`SEO`) which builds titles differently and defaults `url` to `window.location.href` and `image` to a hard-coded absolute URL.
  Even if only one is currently used, having two competing “SEO” components makes it easy to accidentally mix them and ship inconsistent metadata behavior across pages.
- **Where:**
  - `src/components/Seo.tsx`
  - `src/ui/components/SEO.tsx`
- **Why it’s a big issue:** Metadata issues show up as “the tab title is weird” and “share previews look wrong,” which are high-impact polish signals. Duplication also makes future fixes (OG image normalization, canonical rules, noindex behavior) easy to apply in one place and forget in the other.
- **Suggested fix:** Consolidate to a single SEO component and delete the unused one. Document the rules (absolute URLs, canonical, defaults, title format) in one place and ensure all routes use the same component.

### 142) Multiple “design primitives” are duplicated across `src/ui` and marketing domain (drift + inconsistent fixes)
- **What happens:** Several shared UI building blocks exist twice (often copy-pasted), which creates inevitable drift and “fix it in one place, it’s still broken elsewhere” behavior.
- **Where (examples):**
  - Avatar is duplicated and identical: `src/ui/components/Avatar.tsx` and `src/domains/client/marketing/ui/components/Avatar.tsx`
  - SectionHeading exists twice with small behavior differences: `src/ui/components/SectionHeading.tsx` and `src/domains/client/marketing/ui/components/SectionHeading.tsx`
  - Floating WhatsApp CTA exists twice: `src/ui/components/FloatingWhatsAppCta.tsx` and `src/domains/client/marketing/ui/components/FloatingWhatsAppCta.tsx`
- **Why it’s a big issue:** In a UI-heavy product, primitives are the “atoms” that define consistency. Duplication guarantees mismatched spacing/typography/a11y fixes over time and increases the chance of regressions.
- **Suggested fix:** Choose a single canonical location for primitives (e.g., `src/ui/components/*`). Re-export from there and delete duplicates. Add lint or a simple check to prevent duplicate component names across domains.

### 143) PDP “review count” in HeroProofStrip is derived by stripping digits from a label string (brittle + can show wrong numbers)
- **What happens:** The PDP passes `count` to `HeroProofStrip` by converting `ratingCountLabel` into a number via `replace(/[^0-9]/g, '')`. This works for labels like `100+`, but breaks for formats like `10k+`, `1.2k`, or “10,000+” (commas/letters collapse into incorrect values). It also creates a hidden dependency: a purely display string becomes a data source.
- **Where:**
  - Conversion logic: `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`
  - Display: `src/domains/client/shop/products/ui/sections/hero-proof-strip/HeroProofStrip.tsx` (renders `({count.toLocaleString()})`)
- **Why it’s a big issue:** Social proof numbers are credibility-sensitive. A label like “10k+” turning into “10” is an obvious trust-killer, and this brittleness makes future copy changes risky.
- **Suggested fix:** Treat review count as structured data: keep a numeric `reviewCount` field separate from a `reviewCountLabel` field. Pass the numeric count into `HeroProofStrip` directly, and only use labels for UI where labels are actually intended.

### 144) Admin Products “Save” can report success even when nothing was persisted (especially in “config fallback” mode)
- **What happens:** When Supabase has no `cms_products` rows, the admin products list falls back to in-repo `productConfigs` and uses `id: cfg.handle`. The editor still allows changes and “Save,” but saving uses `update(...).eq('id', product.id)` and does not verify that a row was actually updated. If the product row doesn’t exist (or the `id` type doesn’t match), the UI can appear to save (updates snapshot + “last saved”) while persisting nothing.
- **Where:**
  - Fallback products (no DB rows): `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (“Fallback to in-repo product config…” block)
  - Save logic uses update-by-id and doesn’t validate affected rows: `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (`.from('cms_products').update(...).eq('id', product.id)`)
- **Why it’s a big issue:** This is a severe admin UX failure: editors believe changes are live when they aren’t. It causes wasted time and erodes trust in the admin console.
- **Suggested fix:** Make persistence explicit:
  - If a product is “config fallback,” disable Save and show a banner (“Read-only until CMS rows exist”).
  - Or implement an upsert-by-handle/create flow so saving works in fresh environments.
  - Always validate that an update affected at least 1 row, otherwise show an error (“Nothing saved — product record not found”).

### 145) Admin Products list silently hides any CMS products not present in `product-config` (admin ≠ source of truth)
- **What happens:** The products loader filters Supabase rows to only handles that exist in the in-repo `productConfigs` set. Any product content in `cms_products` with a handle outside that set is silently excluded from the UI.
- **Where:** `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (`CONFIG_HANDLES` + filter `CONFIG_HANDLES.has(handle)`)
- **Why it’s a big issue:** Admin tools should be authoritative. Silently hiding data is confusing (“where did my product go?”) and makes scaling beyond the hard-coded catalog impossible without code changes.
- **Suggested fix:** Either (a) make the admin explicitly “config-backed only” with clear copy + warnings, or (b) remove the filter and allow admin to manage all CMS products (and then decide how storefront discovery happens separately).

### 146) Admin product live preview is only available on XL screens (most editors won’t see a preview)
- **What happens:** The product editor includes an iPhone preview card, but it renders `hidden xl:block`, so on common laptop widths (and all tablets) there is no preview at all.
- **Where:**
  - Preview card breakpoint: `src/domains/admin/shared/ui/preview/IPhonePreviewCard.tsx` (`hidden xl:block`)
  - Used by product editor: `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (`previewSlot`)
- **Why it’s a big issue:** Live preview is one of the most valuable parts of a content editor. Hiding it for most screen sizes removes the feedback loop and increases publish mistakes.
- **Suggested fix:** Make preview responsive: allow it to appear below the form on smaller screens, or add a toggle (“Show preview”) that opens a drawer/modal. Don’t hard-require XL breakpoints.

### 147) Admin product gallery selection can’t truly be closed (state forces `editingMediaIdx` back to 0)
- **What happens:** The gallery thumbnails try to toggle the selected media panel on/off (`setEditingMediaIdx(idx === editingMediaIdx ? null : idx)`), but an effect forces `editingMediaIdx` to `0` any time it’s `null` while media exists. This makes “close” behavior impossible and can cause confusing jumps back to the first image.
- **Where:** `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (effect that sets `editingMediaIdx(0)` + thumbnail click handler)
- **Why it’s a big issue:** Media editing is a core admin task. UI that “won’t close” or unexpectedly jumps feels broken and slows down editing workflows.
- **Suggested fix:** Decide on one behavior:
  - If a panel must always be open, remove the toggle-to-null behavior.
  - If closing is allowed, remove the effect that forces index `0` when `editingMediaIdx` is `null`.

### 148) Admin “Upload” relies on Cloudinary’s external widget script with no loading/progress UI (fragile + inconsistent asset pipeline)
- **What happens:** Clicking “Upload” dynamically injects Cloudinary’s widget script (`https://widget.cloudinary.com/...`) and opens a third-party upload flow. There’s no visible loading state while the script loads, and this introduces a second media pipeline (Cloudinary URLs) alongside the existing `/uploads/...` assets and CDN tooling.
- **Where:** `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (`loadCloudinaryWidget`, `handleUpload`)
- **Why it’s a big issue:** Upload is a high-frequency workflow. If the script is slow/blocked, the button appears broken. Mixed asset sources also create inconsistent performance and complicate CDN/SEO/image resizing strategy.
- **Suggested fix:** Add explicit loading/error UI for “Upload” (spinner + “Loading uploader…”). Standardize on one media pipeline (Supabase Storage or Cloudinary) and ensure the storefront can reliably render the resulting URLs everywhere.

### 149) App-level `Suspense` fallback removes the site chrome (header/footer vanish during route loads)
- **What happens:** The entire router is wrapped in a single `Suspense` with a plain text fallback. During lazy route loads, users see a blank-ish “Loading…” screen with no header/footer, causing jarring transitions and perceived instability.
- **Where:** `src/App.tsx` (top-level `<Suspense fallback={<div>Loading…</div>}>`)
- **Why it’s a big issue:** This hits first impressions and navigation polish. Losing navigation chrome during loads feels like a full page crash/refresh, especially on slower networks.
- **Suggested fix:** Keep layout chrome mounted and only suspend the route content (e.g., move `Suspense` inside `MarketingLayout` or use per-route suspense boundaries). Use a branded skeleton loader that preserves page structure.

### 150) Drawer scroll-lock can cause horizontal “page jump” (scrollbar disappears with no compensation)
- **What happens:** When the drawer opens, the app sets `document.documentElement.style.overflow = 'hidden'`. On platforms with visible scrollbars, this removes the scrollbar and can shift the page horizontally (content “jumps” left/right) when opening/closing the drawer.
- **Where:** `src/ui/providers/DrawerProvider.tsx` (effect that toggles `document.documentElement.style.overflow`)
- **Why it’s a big issue:** Navigation should feel stable. A subtle layout jump reads as poor polish and is especially noticeable on desktop.
- **Suggested fix:** Use a scroll-lock approach that preserves layout width: add `scrollbar-gutter: stable;` globally, or calculate and apply `padding-right` equal to scrollbar width when locking scroll. Prefer a well-tested scroll-lock utility if possible.

### 151) JSON-LD structured data uses relative URLs (logo/images), which can break rich results
- **What happens:** The app emits JSON-LD with relative URLs for fields that many schema validators/crawlers expect to be absolute (e.g., `Organization.logo`, `Product.image`). Depending on crawler behavior, this can lead to ignored structured data or missing rich previews/results.
- **Where:**
  - Organization schema: `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (`jsonLd.logo: cdnUrl('/l-icon.svg')`)
  - Product schema: `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (`productJsonLd.image: [heroImage]`, where `heroImage` is typically `/uploads/...`)
- **Why it’s a big issue:** It’s a silent failure: the site “looks fine” to users, but search/social surfaces can degrade (missing logo/image in rich results), which is high-impact for discovery and trust.
- **Suggested fix:** Normalize JSON-LD URLs to absolute URLs at the point of generation (prefer a single `publicBaseUrl`/`SITE_URL` env). If a URL starts with `/`, prefix it with that origin before writing JSON-LD.

### 152) Terminology inconsistency: PDP says “Basket” while the rest of the UI says “Cart”
- **What happens:** Product pages use “Add to Basket” CTAs, while navigation and cart UI use “Cart”. This creates a “two systems” feel and can confuse users (especially US users where “Cart” is the dominant term).
- **Where:**
  - PDP CTAs: `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx` (`Add to Basket`)
  - PDP bottom CTA: `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (`Add to Basket`)
  - Cart UI label: `src/ui/providers/DrawerProvider.tsx` (tab label “Cart”)
- **Why it’s a big issue:** Microcopy consistency is a trust and comprehension signal. In ecommerce, inconsistent terminology increases friction right at the conversion moment (“where did my basket go?”).
- **Suggested fix:** Pick one term (usually “Cart” for US/global, “Basket” for UK) and apply it everywhere: CTA labels, drawer tab label, page titles, analytics event names if exposed, etc.

### 153) Responsive image variants exist, but key pages still load a single full-size JPG without `srcSet`/AVIF
- **What happens:** The repo ships multiple pre-generated responsive image variants (AVIF/WEBP in multiple widths), but some pages still load the base `.jpg` directly with no `srcSet`, forcing unnecessary bytes and slowing LCP on mobile.
- **Where:**
  - Available variants: `public/images/*-320.{avif,webp}`, `*-640.*`, `*-960.*` (e.g. `brand-lifestyle-*`, `hero-*`, `community-*`, `product-*`)
  - Still using the base JPG: `src/domains/client/marketing/ui/pages/WelcomePage.tsx` (`src="/images/brand-lifestyle.jpg"`)
- **Why it’s a big issue:** Performance is UX. Extra image weight increases time-to-paint and makes the site feel sluggish — especially on mobile, where most ecommerce traffic lives.
- **Suggested fix:** Switch to a `<picture>` pattern (AVIF → WEBP → JPG fallback) with `srcSet` + `sizes`, or use an image component helper that selects the right variant based on viewport.

### 154) Admin “Pages” UI shows `/{slug}` as if it’s the live route, but `brand-story` doesn’t exist (`/brand` is the real route)
- **What happens:** The Pages admin lists and details display pages as `/{slug}` (e.g., `/brand-story`). In the actual router, brand story is served at `/brand`. Admin users are likely to share/bookmark the wrong URL or assume the slug is live.
- **Where:**
  - Slug display: `src/domains/admin/pages/ui/pages/PagesPage.tsx` (shows `/{page.slug}` and includes a page with `slug: 'brand-story'`)
  - Actual route: `src/App.tsx` (`/brand`)
- **Why it’s a big issue:** Admin tools should reduce mistakes, not create them. Wrong URL mental models lead to broken links in campaigns, support pings, and confusion during QA.
- **Suggested fix:** Store/display the real public route per page (e.g., `publicPath: '/brand'`), or add a slug→route map and show both (“Slug: brand-story · Route: /brand”). Avoid presenting `/{slug}` as authoritative if it isn’t.

### 155) Tailwind color `brand-porcelain` is referenced but not defined (styles silently fail)
- **What happens:** Many components use `bg-brand-porcelain`, `hover:bg-brand-porcelain/60`, and `focus:ring-brand-porcelain`, but Tailwind only defines `brand.peach/cocoa/blush` (no `brand.porcelain`). These utilities won’t generate CSS, so backgrounds/hover/focus styles simply don’t show up.
- **Where:**
  - Tailwind theme colors: `tailwind.config.js` (no `brand.porcelain`)
  - Used across UI: `src/ui/components/CtaRibbon.tsx`, `src/domains/ui-kit/components/TextField.tsx`, `src/domains/ui-kit/components/Button.tsx`, `src/domains/admin/shared/ui/layouts/AdminLayout.tsx`, `src/domains/admin/catalog/ui/cards/ProductCard.tsx`
- **Why it’s a big issue:** This silently breaks the design system across core surfaces (admin backgrounds, hover feedback, and focus rings on inputs). Missing focus rings is also an accessibility regression (keyboard users lose visible focus).
- **Suggested fix:** Either define `brand.porcelain` in Tailwind (preferably via design tokens / CSS var so opacity variants work), or replace all `brand-porcelain` utilities with an existing semantic token (`bg-semantic-bg-subtle`, `bg-semantic-legacy-brand-blush/20`, etc.). Ensure UI-kit focus ring colors reference real tokens.

### 156) Service worker returns `offline.html` for failed asset requests (can break images/JS on flaky networks)
- **What happens:** If a non-document request (image/script/style) fails, the service worker falls back to `OFFLINE_URL` (`/offline.html`). That means an `<img>` or `<script>` request can receive an HTML document instead of the expected content, resulting in broken images or JS parse errors.
- **Where:** `public/sw.js` (static asset branch `catch { return await cache.match(OFFLINE_URL) }`)
- **Why it’s a big issue:** Offline and “spotty network” are exactly when you need predictable degradation. Returning HTML for asset requests can create confusing broken UI states (or even crash the app if a JS chunk is replaced with HTML).
- **Suggested fix:** Only return `/offline.html` for document navigations. For non-doc requests, return the cached asset if present; otherwise return `Response.error()` (or a small, type-appropriate fallback like a placeholder image for `request.destination === 'image'`).

### 157) PDP meta description (and Product JSON-LD description) always appends “Blocks steam…” even for non-shower-cap products
- **What happens:** The PDP SEO description is built as `${productDesc} • Blocks steam for silk presses, curls, and braids…` for all products. That copy is accurate for the shower cap, but inaccurate for the curler set, creating misleading previews in search/shares and inconsistent product positioning.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
  - `<Seo description={\`\${productDesc} • Blocks steam...\`}>`
  - `productJsonLd.description` uses the same appended claim
- **Why it’s a big issue:** SEO/share snippets are often the first user impression. Inaccurate claims reduce credibility and can cause higher bounce (“this isn’t the product I expected”).
- **Suggested fix:** Make the appended description product-specific (e.g., derive from `config` or a `seoDescription` field). Only include “Blocks steam…” for the shower cap (or for products where it’s verifiably true).

### 158) App sets a persistent `lumelle_anon_id` cookie with no consent UI (trust + compliance risk)
- **What happens:** Checkout attribution creates an anonymous id and session id and writes them to storage:
  - `getOrCreateAnonId()` sets both `localStorage` and a 1-year cookie (`Max-Age=31536000`) named `lumelle_anon_id`.
  - This runs during “begin checkout” on both the cart page and the drawer, regardless of whether analytics capture is enabled.
  - There is no cookie consent banner or preferences UI to opt out or reset.
- **Where:**
  - Cookie + storage writer: `src/experiments/identity.ts` (`document.cookie = ... lumelle_anon_id ...`)
  - Attribution builder: `src/lib/analytics/posthog.ts` (`buildCheckoutAttributionAttributes`)
  - Called by checkout CTAs: `src/domains/client/shop/cart/ui/pages/CartPage.tsx`, `src/ui/providers/DrawerProvider.tsx`
  - Policy copy references cookies: `src/domains/client/marketing/ui/pages/PrivacyPage.tsx` (“Cookies & tracking”)
- **Why it’s a big issue:** Users expect transparency and control over tracking identifiers. Setting a persistent cookie with no consent UX is a trust hit and can create compliance risk in UK/EU-style consent regimes (and similar privacy expectations elsewhere).
- **Suggested fix:** Add a real consent flow (banner + preferences) and only create/store tracking ids after consent. Provide a “reset” path that clears `lumelle_anon_id` from both cookie and localStorage, and ensure checkout still works if consent is declined.

### 159) Admin Products silently hides `satin-overnight-curler-set` via `ADMIN_HIDDEN_HANDLES` (product can’t be managed)
- **What happens:** The admin products list filters out a real handle (`satin-overnight-curler-set`) using a hard-coded denylist. Even if the product exists in `cms_products` (or in `productConfigs` fallback), it will not appear in the admin UI, and there’s no in-UI explanation.
- **Where:**
  - `src/domains/admin/catalog/data/useProducts.ts` (`ADMIN_HIDDEN_HANDLES`)
  - `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (filters with `!ADMIN_HIDDEN_HANDLES.has(handle)`)
- **Why it’s a big issue:** Silent data hiding makes admins think content was deleted or “didn’t save.” It also prevents managing a SKU/handle from the primary admin surface.
- **Suggested fix:** Remove the hidden-handles filter, or render hidden items in a “Hidden” section with an explicit reason + a way to unhide. If the intent is to de-duplicate aliases, add a canonical-handle strategy instead of hiding.

### 160) Admin Products list can’t reliably open the editor (selection is cleared unless URL includes `/admin/products/:handle`)
- **What happens:** The page treats the URL (`/admin/products/:handle`) as the source of truth for which product is selected. If there is no `:handle` param, an effect clears `selectedId`. In list view, product cards call `setSelectedId(p.id)` but do not navigate to `/admin/products/${p.handle}`, so selection is immediately cleared — making the editor flash/close or feel “broken.”
- **Where:**
  - URL-as-source-of-truth effect: `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (effect that clears `selectedId` when `!routeHandle`)
  - Product card click: `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (`onOpen={() => setSelectedId(p.id)}`)
  - Card implementation: `src/domains/admin/catalog/ui/cards/ProductCard.tsx` (`onClick={onOpen}`)
- **Why it’s a big issue:** This is a core admin workflow (editing products). If you can’t reliably open an editor, the admin tool is effectively unusable.
- **Suggested fix:** On product click, navigate instead of setting local selection: `navigate(\`/admin/products/${p.handle}\`)`. Alternatively, remove the “URL is source of truth” clearing behavior and let `selectedId` drive the editor.

### 161) Admin Products list view shows a disabled “Save changes” button even when no product is selected
- **What happens:** In the `!hasSelection` branch, the UI renders a “Save changes” button that is disabled because `product` is `null` (and `dirty` is false). This looks like a broken control and adds confusing affordances to the list view.
- **Where:** `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (list view header actions)
- **Why it’s a big issue:** Disabled primary actions with no explanation reduce trust in admin tooling and waste space/attention on the most-used screen (the product list).
- **Suggested fix:** Hide the Save button when no product is selected, and only show save actions inside the editor view. In list view, show list-relevant actions instead (reload, filters, create).

### 162) Product gallery asset filenames include spaces and inconsistent casing (fragile URLs + CDN friction)
- **What happens:** The in-repo gallery for the shower cap references assets like `/uploads/luminele/main (1).webp` and `/uploads/luminele/2ND PHOTO.webp`. Spaces and inconsistent casing make URLs brittle (encoding differences, manual copy/paste errors) and can create friction when moving assets through CDNs/build pipelines.
- **Where:**
  - Config: `src/domains/client/shop/products/data/product-config.ts` (`CAP_GALLERY`)
  - Files: `public/uploads/luminele/*` (e.g. `main (1).webp`, `2ND PHOTO.webp`)
- **Why it’s a big issue:** Image reliability is conversion-critical. Fragile asset naming increases the chance of broken product imagery (especially after migrations, CDN moves, or asset optimization pipelines).
- **Suggested fix:** Rename assets to normalized, lowercase, URL-safe filenames (e.g. `main-1.webp`, `photo-2.webp`) and update references. If these URLs are already shared/indexed, add redirects or keep compatibility copies during migration.

### 163) `crypto.randomUUID()` is used without a fallback in browser-executed code (can crash on older browsers)
- **What happens:** Some code calls `crypto.randomUUID()` directly. In browsers/environments where `randomUUID` isn’t available, this throws at runtime.
- **Where:**
  - Anonymous id generator: `src/experiments/identity.ts` (`const uuid = () => crypto.randomUUID()`)
  - Cart recovery queue: `src/domains/client/shop/cart/recovery/queue.ts` (`id: crypto.randomUUID()`)
- **Why it’s a big issue:** These are “high intent” paths (cart/checkout attribution, cart recovery). A runtime exception here can break checkout flows or crash UI for a segment of users.
- **Suggested fix:** Use a guarded helper everywhere (e.g. `crypto.randomUUID?.() ?? <fallback>`, as in `src/lib/anon.ts`), or adopt a small UUID helper so the browser support surface is consistent.

### 164) Client cart recovery feature flags are parsed incorrectly (`Boolean(...)` makes `'0'`/`'false'` truthy)
- **What happens:** Client-side flags are derived via `Boolean(import.meta?.env?.VITE_CART_RECOVERY_ENABLED)` (and share). Any non-empty string becomes `true`, including `'0'` and `'false'`, so “turning it off” by setting `0` can still enable the feature.
- **Where:** `src/domains/client/shop/cart/recovery/env.ts` (`CART_RECOVERY_ENABLED_CLIENT`, `CART_SHARE_ENABLED_CLIENT`)
- **Why it’s a big issue:** Feature gating becomes unreliable, which can expose incomplete/experimental UI unexpectedly (bad for QA and production trust).
- **Suggested fix:** Parse explicitly (`=== '1'` or `=== 'true'`) and document the convention in `.env.example` so environments can’t accidentally enable features.

### 165) Curler config defines two public handles (`satin-overnight-curler` vs `satin-overnight-curler-set`) and admin hides one (URL/SEO duplication + ops confusion)
- **What happens:** `productConfigs` includes both `satin-overnight-curler` and `satin-overnight-curler-set` (the latter is a clone with a different `handle`). Separately, the admin UI filters out `satin-overnight-curler-set` via `ADMIN_HIDDEN_HANDLES`. This creates an inconsistent mapping between “handle”, storefront route params, and admin management.
- **Where:**
  - Product config entries: `src/domains/client/shop/products/data/product-config.ts` (both keys)
  - Admin hide: `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`, `src/domains/admin/catalog/data/useProducts.ts`
- **Why it’s a big issue:** Multiple URLs for effectively the same product can split SEO signals and analytics attribution. Hiding one handle in admin makes it harder for operators to reason about which URL is canonical and which SKU is “real.”
- **Suggested fix:** Pick one canonical public handle. Treat alternate handles as redirects/aliases (or internal item IDs), not as separate “public” PDPs. Remove the hide-list once canonical routing is enforced.

### 166) Checkout attribution writes to `localStorage`/cookies without guarding storage failures (can crash checkout in privacy-restricted browsers)
- **What happens:** `getOrCreateAnonId()` reads/writes `localStorage` and sets `document.cookie` with no `try/catch`. In some environments (Safari private mode, hardened privacy settings, storage-disabled contexts), these calls can throw and break the “begin checkout” flow.
- **Where:** `src/experiments/identity.ts` (direct `localStorage.*` + `document.cookie` usage), invoked via `src/lib/analytics/posthog.ts` and called from `CartPage.tsx` / `DrawerProvider.tsx`
- **Why it’s a big issue:** Checkout is the most conversion-critical step. Storage errors should never prevent a user from completing checkout.
- **Suggested fix:** Wrap storage access in `try/catch` and degrade gracefully (skip attribution or use an in-memory id). Combine with consent gating so tracking writes don’t happen when users opt out.

### 167) Service worker forces immediate activation (`skipWaiting` + `clients.claim`) with no “Update available” UX
- **What happens:** The service worker activates immediately (`skipWaiting()` in install + `clients.claim()` in activate), but the app doesn’t show any update banner/toast. Users can get a mid-session version swap, which can create “weird” broken UI if cached assets and in-memory app state diverge.
- **Where:**
  - Service worker lifecycle: `public/sw.js` (`self.skipWaiting()`, `self.clients.claim()`)
  - Registration: `src/main.tsx` (registers `/sw.js` but doesn’t handle updates)
- **Why it’s a big issue:** This is a classic source of hard-to-debug UI breakage (“it was fine, then suddenly weird”). It increases support burden and decreases trust.
- **Suggested fix:** Implement an update flow (detect `updatefound`, notify the user, and only activate on “Reload”). Or remove `skipWaiting`/`clients.claim` so updates apply on next page load.

### 168) Client cart recovery env module mixes `process.env` with `import.meta.env` (browser-unsafe footgun)
- **What happens:** A file under `src/` exports server-style flags using `process.env` alongside client flags using `import.meta.env`. If this module is imported by client code (now or later), `process` may be undefined in the browser and can cause runtime crashes/white screens.
- **Where:** `src/domains/client/shop/cart/recovery/env.ts` (exports `CART_RECOVERY_*` from `process.env`)
- **Why it’s a big issue:** It’s easy to accidentally import this module into browser code while building “cart recovery” UI. That turns into a high-impact production failure mode (cart/checkout screens breaking due to `process` not defined).
- **Suggested fix:** Split into `env.server.ts` (Node `process.env`) and `env.client.ts` (`import.meta.env`), and ensure browser code only imports the client module. Keep server env reading in `api/_lib/cartRecovery/env.ts`.

### 169) Admin Products editor can lose unsaved changes with no warning when switching products
- **What happens:** The editor tracks a `dirty` state, but selecting another product (`onOpen={() => setSelectedId(p.id)}`) doesn’t prompt the user. Unsaved changes can be lost silently just by clicking a different product card (or navigating away).
- **Where:** `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (dirty state + `ProductCard` `onOpen` selection)
- **Why it’s a big issue:** This is a high-stakes admin workflow. Losing edits is one of the fastest ways to destroy trust in a CMS/editor and creates real operational cost.
- **Suggested fix:** Add an unsaved-changes guard:
  - Prompt before changing `selectedId` if `dirty === true`.
  - Add a `beforeunload` handler when dirty to protect against accidental refresh/close.
  - Consider React Router navigation blocking for route changes while dirty.

### 170) PDP bottom CTA chips are hard-coded to shower-cap features (“Waterproof satin”, “No-frizz seal”) for every product
- **What happens:** The PDP’s bottom CTA renders a static set of feature chips. On non-cap products (e.g., the curler set), these chips can be misleading because the product isn’t “waterproof satin” and doesn’t have a “seal”.
- **Where:** `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (bottom CTA chips)
- **Why it’s a big issue:** This is on the final conversion section of the PDP. Incorrect feature claims reduce trust and can increase returns/refunds (“not what I thought I was buying”).
- **Suggested fix:** Drive chips from product config/CMS per handle (or remove chips entirely until the copy is product-accurate). At minimum, conditionally render cap-specific chips only for the cap.

### 171) Tailwind `line-clamp-*` utilities are used but the line-clamp plugin is not enabled (text overflow + layout breakage)
- **What happens:** Multiple UI surfaces use `line-clamp-*` classes, but Tailwind’s line-clamp plugin isn’t registered in `tailwind.config.js`. Result: those classes silently do nothing and long titles/descriptions can overflow, wrap unexpectedly, or blow up card heights.
- **Where:**
  - Tailwind plugin is installed: `package.json` (`@tailwindcss/line-clamp`)
  - Tailwind config does not enable it: `tailwind.config.js` (no `@tailwindcss/line-clamp` in `plugins`)
  - Examples of usage:
    - Admin product cards: `src/domains/admin/catalog/ui/cards/ProductCard.tsx` (`line-clamp-1`, `line-clamp-2`)
    - Admin pages list: `src/domains/admin/pages/ui/pages/PagesPage.tsx` (`line-clamp-3`)
    - Admin media list: `src/domains/admin/media/ui/pages/MediaPage.tsx` (`line-clamp-1`)
    - Blog pages: `src/domains/blog/ui/pages/BlogIndexPage.tsx`, `src/domains/blog/ui/pages/BlogPostPage.tsx` (`line-clamp-2`)
- **Why it’s a big issue:** “Silent CSS failures” create inconsistent UI across the app and make layouts unpredictable (especially in admin list/grid views where truncation is expected to prevent cards from becoming uneven).
- **Suggested fix:** Enable the plugin in `tailwind.config.js` (add `import lineClamp from '@tailwindcss/line-clamp'` and include it in `plugins`). If you don’t want the plugin, remove `line-clamp-*` usage and replace with a deliberate truncation strategy (`truncate`, fixed heights, or custom CSS).

### 172) No “Skip to content” link (keyboard + screen-reader usability regression)
- **What happens:** Global layouts render a top header/nav, but there’s no “Skip to content” link. Keyboard users must tab through the menu and header controls on every page before reaching main content.
- **Where:** Layout/header composition in `src/layouts/MarketingLayout.tsx` → `src/ui/components/PublicHeader.tsx` (no skip link rendered).
- **Why it’s a big issue:** This is a common accessibility audit failure and materially slows down navigation for keyboard users (and some screen-reader workflows), especially with sticky/frequent header controls.
- **Suggested fix:** Add a skip link as the first focusable element (e.g., `<a href="#main" className="sr-only focus:not-sr-only ...">Skip to content</a>`) and ensure the main content container has `id="main"`. Apply the same pattern to admin (`AdminShell`) if it’s not using `MarketingLayout`.

### 173) “Just added” CTAs use `animate-pulse` without respecting `prefers-reduced-motion` (motion a11y)
- **What happens:** When `justAdded` is true, the primary CTAs apply `animate-pulse`, which creates motion even when a user has enabled reduced motion at the OS/browser level.
- **Where:**
  - PDP main “Add to Basket” button: `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx` (`justAdded ? 'animate-pulse' : ''`)
  - PDP bottom CTA “Add to Basket” button: `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx` (`props.justAdded ? 'animate-pulse' : ''`)
- **Why it’s a big issue:** Reduced-motion preference is specifically for preventing motion-triggered discomfort. Shipping motion on high-frequency UI feedback (cart actions) is a fast way to fail accessibility expectations and annoy sensitive users.
- **Suggested fix:** Use Tailwind’s motion variants:
  - Prefer `motion-safe:animate-pulse` (only animate when motion is allowed), or
  - Add `motion-reduce:animate-none` alongside `animate-pulse` (disable when reduced).

### 174) Public header shows two “Account” links on desktop (redundant + wastes header space)
- **What happens:** On `md` and up, the header renders both an “Account” text button and an Account icon button — both linking to `/account`.
- **Where:** `src/ui/components/PublicHeader.tsx`
  - Text account link: `className="hidden ... md:inline-flex"`
  - Icon account link: always rendered (`className="inline-flex h-10 w-10 ..."`)
- **Why it’s a big issue:** Redundant primary-nav actions make the header feel cluttered/unpolished and reduce space available for more important CTAs (like cart, search, or “Shop”).
- **Suggested fix:** Render a single account entry per breakpoint (e.g., icon-only on mobile, text+icon on desktop, but not both). If you want both, differentiate them (e.g., “Sign in” vs “Account”), and conditionally show based on auth state.

### 175) Welcome page “Copy invite link” failure has no user-visible fallback (onboarding friction)
- **What happens:** The welcome page offers a “copy invite link” flow using the Clipboard API. If `navigator.clipboard.writeText` fails (common in non-secure contexts, restricted browsers, or permission-denied scenarios), the app logs to console but shows no error UI and provides no fallback method to get the link.
- **Where:** `src/domains/client/marketing/ui/pages/WelcomePage.tsx` (`handleCopyLink` catch → `console.error(...)`, no visible error state)
- **Why it’s a big issue:** This page is a creator onboarding hub. When the “copy link” action silently fails, it creates immediate confusion (“did it copy?”) and adds friction exactly at the moment you want to reduce drop-off.
- **Suggested fix:** Add a visible fallback:
  - On failure, show an inline alert/toast with the URL and a “Copy” fallback (or `window.prompt`) and announce via `aria-live`.
  - Consider feature-detecting `navigator.clipboard` and showing a deterministic fallback UI when unavailable.

### 176) Admin blog editor relies on placeholders instead of real labels (accessibility + clarity issue)
- **What happens:** The blog editor uses many inputs/textareas with placeholders like “CTA title”, “Price”, “Badge”, “Link”, “Image”, “Caption”, “Primary keyword”, etc., but provides little/no explicit `<label>` elements or help text. Once a field has content, the placeholder disappears and the field loses context.
- **Where:** `src/domains/admin/blog/ui/pages/BlogDetailPage.tsx` (multiple `<textarea ... placeholder="...">` and inputs without associated labels)
- **Why it’s a big issue:** Admin workflows are “high-stakes typing.” Placeholder-only labeling is a known accessibility issue and also increases operator error (people forget what a field is for after they’ve typed into it).
- **Suggested fix:** Add explicit labels (visible or `sr-only`) with `htmlFor`/`id`, and add small helper text via `aria-describedby` for “what format goes here” fields (price format, URL format, image path expectations).

### 177) CDN URL encoding is inconsistent, which is brittle with space/case filenames (broken images / wrong preloads / bad previews)
- **What happens:** The codebase mixes:
  - `encodeURI(cdnUrl(...))` in some places, and
  - raw `cdnUrl(...)` in others.
  Meanwhile, product galleries include filenames with spaces and caps (e.g., `/uploads/luminele/main (1).webp`, `2ND PHOTO.webp`). This makes image URL behavior inconsistent across components and environments (CDN vs local), and increases the chance of broken imagery or duplicate requests.
- **Where:**
  - Problematic filenames: `src/domains/client/shop/products/data/product-config.ts` (`CAP_GALLERY`)
  - CDN helper returns unencoded URLs: `src/lib/utils/cdn.ts`, `src/utils/cdn.ts`
  - Mixed call sites:
    - Encoded: `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` (`encodeURI(cdnUrl(...))`)
    - Unencoded: `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (`cdnUrl(homeConfig.hero.image)`)
    - Unencoded: `src/domains/blog/ui/pages/BlogIndexPage.tsx` (hero image via `cdnUrl(...)`)
- **Why it’s a big issue:** Image reliability is conversion-critical. Inconsistent URL encoding becomes a “works on my machine” class of bug (especially when you toggle CDN mode) and makes caching/preload behavior unpredictable.
- **Suggested fix:** Centralize URL encoding:
  - Either encode inside the `cdnUrl` helper (or provide `cdnUrlEncoded`) and use it everywhere, and/or
  - Normalize filenames to URL-safe, lowercase names (best long-term), then remove ad-hoc encoding at call sites.

### 178) Floating “Buy Now” CTA is hidden with `opacity-0` but remains focusable (invisible focus target)
- **What happens:** The floating buy CTA stays mounted in the DOM and is hidden via `opacity-0` when it shouldn’t show. Because it’s still a real `<a>` element, it can still be reached via keyboard tabbing and can be announced by assistive tech even while invisible.
- **Where:** `src/domains/client/marketing/ui/components/FloatingBuyCta.tsx` (`${show ? 'opacity-100' : 'opacity-0'}` with an always-rendered `<a href=...>`)
- **Why it’s a big issue:** Invisible-but-focusable controls are a classic UX/a11y footgun. Users can “tab into nothing”, lose focus position, and assume the page is broken.
- **Suggested fix:** Conditionally render the CTA only when visible (`show ? <a ...> : null`). If you keep it mounted for animation, also set `aria-hidden={!show}` and prevent focus when hidden (`tabIndex={-1}`) or use `inert` on the container when hidden.

### 179) Floating WhatsApp CTA has the same invisible-focus problem (and exists in two copies)
- **What happens:** The floating WhatsApp CTA uses the same “opacity-only hide” pattern, which leaves an invisible `<button>` in the tab order when it’s “hidden”. There are also two versions of this component, increasing drift risk.
- **Where:**
  - Marketing version: `src/domains/client/marketing/ui/components/FloatingWhatsAppCta.tsx`
  - Global UI version: `src/ui/components/FloatingWhatsAppCta.tsx`
- **Why it’s a big issue:** This is a high-salience CTA. If keyboard focus can land on an invisible fixed button, it breaks navigation and creates a “ghost UI” feeling.
- **Suggested fix:** Same as above: conditionally render when visible, or set `aria-hidden` + remove focusability when hidden. Also consolidate to a single shared component so fixes apply everywhere.

### 180) Admin mobile drawer is “hidden” only by transform (no `aria-hidden`/`inert`, still reachable in the DOM)
- **What happens:** The admin mobile drawer lives in the DOM at all times and is toggled via `translate-x` classes. When closed, it is off-screen but still contains focusable links/buttons and has no `aria-hidden`, `inert`, or dialog semantics.
- **Where:** `src/domains/admin/shared/ui/layouts/AdminShell.tsx` (mobile drawer container `id="admin-drawer"` with `drawerOpen ? 'translate-x-0' : '-translate-x-full'`)
- **Why it’s a big issue:** Screen-reader users and some keyboard flows can still reach off-screen navigation items, creating confusing focus jumps and “invisible navigation”. It also makes it harder to meet basic dialog/drawer accessibility requirements.
- **Suggested fix:** When closed, make it truly non-interactive (`aria-hidden`, `inert`, or conditional render). When open, treat it like a dialog: add `role="dialog" aria-modal="true"`, trap focus inside, and restore focus to the opener on close.
