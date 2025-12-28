# UI issue ratings (batches of 7)

This file records the calibrated first-pass scoring for issues `1–180` in `docs/reviews/app-ui-review-2025-12-26.md`.

Scales (see `docs/feedback/black-box/ai-loop.md`):
- Impact: 1–5
- Reach: 1–5
- Effort: 1–5
- Confidence: 1–3

Priority formula: `(Impact × Reach × Confidence) − Effort`.

Note: These scores are meant to be *updated* as issues are verified; they are a starting point for autonomous sequencing.

## Batch 01 (Issues 1–7)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 1 | Client | 5 | 5 | 4 | 2 | 46 | Checkout is a stub page (breaks the purchase flow) | This is the highest-intent page in the funnel; a dead end here collapses conversion and trust. |
| 2 | Client | 4 | 4 | 4 | 2 | 28 | Post-purchase support pages are also stubs (creates “we don’t support you” vibes) | Returns + tracking are customer-trust-critical. Even if Shopify handles fulfillment, the site routes should not look broken. |
| 3 | Client | 4 | 4 | 4 | 2 | 28 | The entire account area is stubbed (users can’t manage anything) | The header includes “Account” entry points, so users will hit these dead ends frequently. |
| 4 | Client | 2 | 3 | 3 | 2 | 9 | “Spin to win” is shipped as a placeholder component (looks unfinished and off-brand) | Placeholder copy and generic neutral styling reads like a dev artifact, not a premium storefront. It also risks covering content on small screens (floating fixed CTA). |
| 5 | Client | 4 | 5 | 3 | 2 | 37 | Cart UI shows incorrect product media + fake compare-at pricing | This directly impacts trust (“is this the item I added?”) and can create refund/support issues if users think they’re buying something else. |
| 6 | Client | 2 | 5 | 3 | 2 | 17 | Visually “disabled” checkout CTA is still a clickable link | Users can click through to an already-broken checkout and experience a double failure (“cart is empty” + “checkout unavailable”). |
| 7 | Client | 4 | 4 | 3 | 2 | 29 | Search results page is “fake” and contains dead links (`#`) | Search is a primary way users recover from confusion. Dead links and placeholder catalog makes the app feel untrustworthy. |

## Batch 02 (Issues 8–14)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 8 | Client | 2 | 3 | 3 | 2 | 9 | In-page section nav is defined but not rendered (users can’t jump to “Reviews / FAQ / …”) | The UI signals structured sections (ids like `#reviews`, `#faq`) but provides no navigation to them; this hurts scanability and mobile usability. |
| 9 | Client | 2 | 5 | 3 | 2 | 17 | Header redundancy + responsive layout risk | Navigation is the most-used UI surface; redundancy and collisions increase confusion and reduce perceived quality. |
| 10 | Client | 3 | 3 | 3 | 2 | 15 | Landmark semantics: nested `<main>` elements (accessibility + screen reader navigation) | Screen readers and accessibility tooling expect a single main landmark; nesting hurts navigation and can fail audits. |
| 11 | Client | 2 | 5 | 3 | 2 | 17 | Right-side drawer doesn’t actually animate (appears/disappears instantly) | The drawer is a primary navigation + cart surface. Abrupt appearance feels “buggy” and lowers perceived quality (especially on mobile where it’s used constantly). |
| 12 | Client | 4 | 5 | 3 | 2 | 37 | Drawer uses fake “people checking out now” urgency | This is **fake social proof**. Users increasingly recognize it as a dark pattern; it can backfire on trust and can create compliance risk depending on jurisdiction. |
| 13 | Client | 4 | 5 | 3 | 2 | 37 | Drawer shows “Total savings” based on invented compare-at pricing | This can misrepresent discounts. Even if it “looks good”, it’s a trust killer and a potential consumer-protection problem. |
| 14 | Client | 2 | 5 | 3 | 2 | 17 | Drawer shows quantity “Save X%” labels that don’t actually apply | This is an explicit mismatch between UI claim and behavior. Users will notice at checkout and feel tricked. |

## Batch 03 (Issues 15–21)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 15 | Client | 3 | 5 | 3 | 2 | 27 | Drawer accessibility is incomplete (labeling + tab semantics + focus handling) | This can create **keyboard traps** and fails basic a11y expectations for dialogs. It’s also a common reason for Lighthouse/axe failures. |
| 16 | Client | 3 | 4 | 3 | 2 | 21 | Product spotlight carousel hides its entire content from screen readers | Screen reader users lose access to a key conversion section (“Product spotlight”). |
| 17 | Creator | 2 | 3 | 3 | 2 | 9 | Public “Creators” page is visibly placeholder content | This route is linked in the drawer and footer. Seeing placeholder blocks damages credibility immediately. |
| 18 | Client | 2 | 3 | 3 | 2 | 9 | Discounts / promo codes / rewards UI is present but the underlying logic is stubbed | This is “UI that lies” — users do the right thing and nothing happens. It creates support load and churn. |
| 19 | Platform | 2 | 3 | 3 | 2 | 9 | Internal navigation sometimes uses raw `<a href>` links (full reload + state loss) | Full reload is slower and can reset transient UI state (open drawer, scroll position, in-progress interactions). It also makes the app feel less “native”. |
| 20 | Admin | 2 | 2 | 3 | 2 | 5 | Admin on mobile: drawer can’t be opened (no “burger” button) | On mobile, the admin nav is effectively inaccessible. |
| 21 | Client | 2 | 3 | 3 | 2 | 9 | “Benefits” section is a stub (renders nothing) | This looks like the site is “missing chunks” and breaks the in-page narrative (especially when nav/anchors reference it). |

## Batch 04 (Issues 22–28)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 22 | Client | 2 | 3 | 3 | 2 | 9 | “Bundle cards” section is a stub (renders nothing) | Bundles are typically the highest AOV lever; shipping an empty section reduces conversion and makes the page feel unfinished. |
| 23 | Client | 2 | 3 | 3 | 2 | 9 | Newsletter “Get 10% off” form has no submission behavior | It promises a discount and captures high-intent emails; when nothing happens, users assume the site is broken or scammy. |
| 24 | Client | 4 | 3 | 3 | 2 | 21 | Reviews section is biased: it filters to only 5★ reviews | This is misleading social proof. It can backfire on trust if users realize only perfect reviews are shown. |
| 25 | TBD | 3 | 3 | 3 | 2 | 15 | The 3D reviews carousel is not accessibility-friendly (and can be motion-heavy) | Carousels without accessible controls are a common audit failure and can frustrate users who don’t drag (keyboard-only, assistive tech, some mobile users). |
| 26 | Client | 4 | 4 | 3 | 2 | 29 | PDP delivery countdown / delivery date are “fake” (not tied to real shipping rules) | This can be wrong for weekends, holidays, cutoffs, or regions — and incorrect delivery promises are a top trust + support risk. |
| 27 | Client | 3 | 3 | 3 | 2 | 15 | Policy/support pages link to broken routes | People click these links when they’re anxious (returns/tracking). Broken support flows massively amplify distrust. |
| 28 | Platform | 4 | 3 | 3 | 1 | 9 | Auth pages likely render “double layout” (squashed/overflowing sign-in UI) | Sign-in/sign-up is a core entry point; if it looks cramped/broken, users bounce immediately. |

## Batch 05 (Issues 29–35)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 29 | Platform | 2 | 3 | 3 | 2 | 9 | “Sign out” UI exists but sign-out behavior is a no-op | Users can’t reliably switch accounts; in admin this becomes a serious UX + security footgun (shared devices). |
| 30 | Client | 2 | 3 | 3 | 2 | 9 | Discount messaging is shown widely, but there’s no working discount system in the app | This creates “promise vs reality” churn: users expect a discount, don’t get it, and assume the brand is misleading. |
| 31 | Client | 2 | 4 | 3 | 1 | 5 | PDP “video” media likely renders at 0 height (looks broken when you tap the video thumbnail) | Users will tap the “video” thumbnail and see a blank/empty media area, which reads like the site is broken. |
| 32 | Client | 2 | 5 | 3 | 2 | 17 | Cart access is hidden behind the hamburger menu (no cart icon / qty badge in the header) | On ecommerce sites, “view cart” is a top navigation action. Hiding it adds friction and increases abandonment (especially after “Add to Basket”). |
| 33 | Client | 2 | 5 | 3 | 2 | 17 | Signed-in drawer profile uses a random “placekitten” avatar fallback | It’s off-brand, looks unprofessional, and introduces a third-party dependency that can break (blocked, slow, mixed-content/CSP issues). |
| 34 | Blog | 2 | 2 | 3 | 2 | 5 | Blog “social” section is blank (component returns `null`), creating dead whitespace | Readers hit a “dead zone” in the page flow and assume something failed to load. |
| 35 | Blog | 3 | 2 | 3 | 2 | 9 | Blog author links fall back to `#` (dead link + unexpected page jump) | Dead links are a trust killer and create confusing navigation behavior. |

## Batch 06 (Issues 36–42)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 36 | Platform | 2 | 5 | 4 | 2 | 16 | Two different `cdnUrl` helpers exist (inconsistent asset loading + CDN-bypass mismatch) | You can end up with images working in one section and 404’ing in another depending on CDN config, which looks like random broken imagery. |
| 37 | Platform | 2 | 3 | 4 | 2 | 8 | Shopify Storefront client is stubbed (dynamic content never loads) | The UI looks “wired” but stays static and can drift from Shopify reality (copy, galleries, FAQs). |
| 38 | Client | 2 | 4 | 4 | 2 | 12 | Product fetching is stubbed (PDP can’t reflect real Shopify title/price/images) | You risk showing the wrong price/media vs Shopify, and you can’t scale beyond hard-coded config. |
| 39 | Client | 2 | 4 | 3 | 2 | 13 | PDP always shows the “New Heatless Curler Launched” banner (even on the curler PDP) | On the curler PDP it’s redundant/odd (“new curler launched” while you’re already there), and on other PDPs it can distract from the current product. |
| 40 | Platform | 2 | 3 | 3 | 2 | 9 | Announcement + newsletter components don’t match the “configurable components” system (broken UX if enabled) | If these blocks are turned on in the “components” system, users will click things that don’t work or end up on 404s — classic “site is broken” perception. |
| 41 | Client | 2 | 5 | 3 | 2 | 17 | Hamburger “menu” can reopen as the Cart tab (tab state leaks between opens) | It violates user expectation (“I tapped menu, why am I seeing cart?”) and makes navigation feel unpredictable. |
| 42 | Client | 2 | 5 | 4 | 2 | 16 | Two different header components exist, and they disagree on core navigation patterns | This fragments UX and makes navigation inconsistent depending on which header is mounted (and increases maintenance risk). |

## Batch 07 (Issues 43–49)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 43 | Client | 2 | 3 | 3 | 2 | 9 | Star rating “half star” uses a non-unique SVG gradient id (can render incorrectly when multiple ratings exist) | Star ratings show up in high-trust areas (PDP, proof strip, spotlight). Rendering glitches undermine polish. |
| 44 | Client | 2 | 4 | 3 | 2 | 13 | Hero “carousel” is effectively disabled even if gallery images are provided | This creates a mismatch between content/config expectations and what users see (“why isn’t this rotating?”), and wastes provided gallery assets. |
| 45 | Client | 5 | 5 | 3 | 2 | 47 | Drawer “Checkout” button is effectively unusable (disabled with no explanation) | It looks like a broken button in the most important conversion surface (cart drawer). |
| 46 | Client | 2 | 3 | 3 | 2 | 9 | Spin wheel is not actually random (it always lands on the same “best value” prize) | This is deceptive if presented as “try your luck”. It can backfire on trust and create compliance risk (promotions/lotteries rules). |
| 47 | Client | 3 | 3 | 3 | 2 | 15 | Promo text rotation does not respect “prefers-reduced-motion” | Motion-sensitive users will still get changing UI. This is a common accessibility audit failure. |
| 48 | Blog | 2 | 2 | 3 | 2 | 5 | Blog “Shop now” CTAs use raw `<a href>` even for internal routes (full reload + state loss) | It makes the app feel slower/less native and can break flow (e.g., back button behavior, scroll state, drawer state). |
| 49 | Admin | 2 | 2 | 3 | 2 | 5 | Admin “Components” editor isn’t truly an admin system (localStorage-only, not publishable) | Admin users will expect edits to affect the real site. Instead, changes are local, ephemeral, and won’t show to customers. |

## Batch 08 (Issues 50–56)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 50 | Client | 2 | 3 | 4 | 2 | 8 | Two different “spin wheel” experiences exist (inconsistent UX + obvious duplication) | Users see inconsistent behavior and “unfinished” copy depending on page, which undermines polish and trust. |
| 51 | Client | 2 | 4 | 3 | 2 | 13 | FAQ “search” logic exists, but there is no search input (copy refers to missing UI) | FAQ is a key pre-purchase objection handler; referencing missing functionality (“search”) makes the UI feel unfinished and lowers trust. |
| 52 | Client | 2 | 4 | 3 | 2 | 13 | PDP “Share” button gives no success feedback and can fail silently | Users will reasonably interpret “nothing happened” as “button is broken,” which hurts polish and reduces sharing/referrals. |
| 53 | Client | 2 | 4 | 3 | 2 | 13 | Product PDP “sections” are loaded globally (not per product), so multiple products can show wrong copy/media | Showing the wrong care instructions/gallery/FAQ for a product is a high-trust failure (and can lead to support tickets and returns). |
| 54 | Client | 3 | 4 | 3 | 2 | 21 | Unknown product handles fall back to the shower cap instead of a 404 (wrong content on the wrong URL) | Users can land on a URL and see a different product than expected (SEO/social shares can spread incorrect URLs, and “Back” behavior becomes confusing). |
| 55 | Platform | 2 | 3 | 3 | 2 | 9 | Auth pages promise features that aren’t implemented (onboarding → dead ends) | This is a high-intent UX moment — promising dashboards and then delivering dead-end pages feels misleading and drives immediate bounce. |
| 56 | Admin | 4 | 2 | 3 | 2 | 13 | Admin “Analytics” page is mock data (can mislead, includes routes that don’t exist in this app) | If this UI is reachable in production, it risks admins making decisions based on fake numbers — a severe trust and ops risk. |

## Batch 09 (Issues 57–63)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 57 | Admin | 2 | 2 | 3 | 2 | 5 | Admin “Activity log” is a nav-linked placeholder (“Not wired yet”) | Admin navigation dead ends degrade confidence in the admin console and waste operator time. |
| 58 | Admin | 4 | 2 | 3 | 2 | 13 | Admin component “detail” route is a hard-coded placeholder (editing drilldown doesn’t work) | The admin UI implies there’s a detail editor, but clicking into a component yields a dead end — classic “unfinished admin” signal. |
| 59 | Admin | 2 | 2 | 3 | 2 | 5 | Admin “Media” library is entirely in-memory mock content (no persistence or real upload) | Admin users will expect asset changes to affect the live site. A non-persistent media UI creates confusion and can lead to lost work. |
| 60 | Admin | 2 | 2 | 3 | 2 | 5 | Admin “Product content” editor lacks error handling and success confirmation (silent failure risk) | This is a high-stakes UI (it edits customer-facing copy). Silent failure increases the chance of shipping incorrect content or thinking updates are live when they aren’t. |
| 61 | Platform | 2 | 3 | 3 | 2 | 9 | Auth can silently break if Clerk is not configured (placeholder key) | Sign-in is a core flow (admin + account). A misconfigured auth key turns major routes into confusing failures instead of a clear, fixable error state. |
| 62 | Admin | 2 | 2 | 3 | 2 | 5 | Admin sign-in flow doesn’t preserve “return to admin” (users land on `/account`) | This creates a confusing loop (“I tried to open admin, signed in, and got sent somewhere else”), increasing drop-off and support requests. |
| 63 | Admin | 2 | 2 | 3 | 2 | 5 | Admin “Pages” is presented as an editor, but it’s a static mock (no real edits/publish) | This is a core admin workflow surface. If it’s reachable in production, it signals “admin isn’t real” and wastes operator time. |

## Batch 10 (Issues 64–70)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 64 | Admin | 2 | 2 | 3 | 2 | 5 | Admin “Blogs” list has non-functional controls and placeholder metrics (looks like a dashboard, acts like a mock) | Blog admin users expect basic CRUD + filtering + real status control. A list that looks interactive but does nothing is a high-friction credibility hit. |
| 65 | Admin | 2 | 2 | 3 | 2 | 5 | Admin blog “Save / Publish” buttons are no-ops (no persistence) | Editors will assume changes are saved/published and only discover the truth after losing work. That’s a severe admin UX failure. |
| 66 | Admin | 2 | 2 | 3 | 2 | 5 | Admin blog editor inputs are not wired to the “draft” state and preview is not a live draft | Even if you add persistence later, the current UI gives editors zero feedback loop (“I typed… nothing changed”), which reads as broken. |
| 67 | Blog | 2 | 2 | 3 | 2 | 5 | Blog “Related reads” carousel hides scrollbars and provides no accessible controls | This hides content discoverability (especially on desktop trackpads/mice) and fails common accessibility expectations for carousels. |
| 68 | TBD | 2 | 3 | 3 | 2 | 9 | Typography system conflicts: `font-heading` is defined twice with different fonts | Heading typography becomes unpredictable and inconsistent with the design system (and changes to Tailwind tokens won’t take effect). |
| 69 | Client | 2 | 4 | 3 | 2 | 13 | PDP quantity selector hard-codes “Buy 2, save 10%” for every product (even when not applicable) | This is misleading merchandising. Users will expect a discount that may not exist for that SKU and will feel tricked when totals don’t reflect it. |
| 70 | Client | 2 | 4 | 3 | 2 | 13 | PDP bottom CTA uses static urgency copy (“Last chance today”) regardless of stock/time | Fake urgency is a trust killer and can create compliance risk. Users notice when urgency is always-on and stop believing the rest of the site. |

## Batch 11 (Issues 71–77)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 71 | Client | 3 | 5 | 3 | 2 | 27 | Drawer hijacks ArrowLeft/ArrowRight globally to switch tabs (surprising keyboard UX) | It creates unpredictable keyboard behavior and can break accessibility expectations. Keyboard users lose control of navigation because arrow keys are repurposed globally. |
| 72 | Client | 2 | 3 | 3 | 2 | 9 | Free-shipping threshold + shipping copy is inconsistent across the site (trust + conversion hit) | This is a classic conversion-killer inconsistency: users hesitate when pricing/shipping rules change between surfaces (and it increases support load). |
| 73 | Client | 4 | 4 | 3 | 2 | 29 | Homepage hero social proof is hard-coded (rating + “Trusted by 10k”) instead of data-driven | Above-the-fold trust claims are scrutinized. Hard-coded proof can drift from reality and becomes a reputational/compliance risk. |
| 74 | Client | 5 | 5 | 3 | 2 | 47 | Cart page links users to broken support/account routes and claims “secure checkout” while checkout is unavailable | The cart is the highest-intent page. Sending users from cart → broken returns/account pages (or a disabled checkout) compounds frustration and kills confidence. |
| 75 | Admin | 2 | 2 | 3 | 2 | 5 | Admin product cards say “Updated” but don’t show an updated timestamp (low utility + confusion) | Recency is a key admin decision signal (“is this the latest content?”). Omitting it makes the UI less trustworthy and harder to operate. |
| 76 | Client | 2 | 4 | 3 | 2 | 13 | Multiple production-facing UI files disable TypeScript checks (`@ts-nocheck`) (higher risk of shipping broken UI) | These are high-visibility surfaces; type-check opt-outs commonly correlate with “it works locally but breaks in prod” UI bugs. |
| 77 | Client | 2 | 3 | 3 | 2 | 9 | `LazyVisible` assumes `IntersectionObserver` exists (can throw in some browsers/webviews) | This component gates “content appears” behavior (TikTok embeds, video cards). If it fails, users see blank/“Loading…” placeholders indefinitely (or console errors). |

## Batch 12 (Issues 78–84)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 78 | TBD | 2 | 3 | 3 | 2 | 9 | `useMediaQuery` uses `matchMedia.addEventListener` only (no Safari/legacy fallback) | A single runtime error inside a shared hook can break entire sections (and perceived site stability) on affected devices. |
| 79 | Client | 2 | 3 | 3 | 2 | 9 | Spin-wheel “Sign in to claim” loses the user’s place (no redirect back to the wheel) | This breaks the incentive loop: users “win” a reward, then get sent away from the purchase flow and may never return to apply it. |
| 80 | Client | 2 | 4 | 4 | 2 | 12 | The same product is linked by multiple URLs/handles (duplicate pages + confusing navigation) | Users (and analytics/SEO) see duplicate URLs for the same product, which fragments attribution, complicates support, and can make back/forward navigation feel inconsistent. |
| 81 | Client | 3 | 5 | 3 | 2 | 27 | Header promo strip uses opacity-only hiding, so “hidden” promos can still intercept clicks/focus | This is a trust-killer interaction bug: users can click what looks like “Free shipping…” and get navigated somewhere else (or tab into an invisible link). It also fails basic accessibility expectat… |
| 82 | Client | 2 | 5 | 3 | 2 | 17 | PDP hero image preload can miss the CDN URL (wasted bandwidth + slower hero render) | PDP load speed is conversion-critical. A mis-targeted preload adds bandwidth and CPU work without improving LCP, especially painful on mobile. |
| 83 | Client | 3 | 4 | 2 | 2 | 22 | PDP quantity picker uses ARIA “listbox” semantics but lacks keyboard listbox behavior | Quantity selection is a core purchase step. This pattern is likely to fail accessibility audits and frustrate keyboard users (and some mobile assistive tech). |
| 84 | Client | 2 | 5 | 3 | 2 | 17 | Drawer uses extremely small type (`text-[9px]`) for high-salience information | 9px type is borderline unreadable on mobile and is an accessibility failure for many users. When important cart trust signals are hard to read, confidence drops at the exact moment you want convers… |

## Batch 13 (Issues 85–91)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 85 | Admin | 2 | 2 | 3 | 1 | 1 | Admin sidebar icon active-state styling likely never activates (current section is harder to spot) | Admin navigation clarity matters. If active state is ambiguous, operators lose orientation and make more navigation mistakes. |
| 86 | Admin | 3 | 2 | 3 | 2 | 9 | Admin “collapsed sidebar” mode creates unlabeled icon-only navigation (a11y + usability) | This makes the admin navigation effectively unusable for assistive tech users and reduces discoverability for everyone. |
| 87 | Client | 4 | 3 | 3 | 2 | 21 | TikTok section hides the “Watch on TikTok” fallback link on mobile (no escape hatch if embeds fail) | This is a content + trust section (“As seen on TikTok”). If embeds fail on the most common device class (mobile), users see “Loading…”/blank cards with no way out. |
| 88 | Client | 3 | 5 | 3 | 2 | 27 | PDP hero media uses generic alt text for key product imagery (accessibility + SEO loss) | Product imagery is the core of e-commerce comprehension. Generic alt text hurts screen-reader users and reduces semantic clarity for search/sharing. It also makes the site feel less polished. |
| 89 | Client | 2 | 4 | 3 | 2 | 13 | Non-standard Tailwind utilities are used in production UI (silent styling failures) | Silent class failures are hard to catch and lead to inconsistent UI spacing/animation cues across environments. These are the “paper cuts” users interpret as “site feels buggy/unpolished”. |
| 90 | Client | 2 | 4 | 3 | 2 | 13 | Footer “Stay in the loop” CTA is a `mailto:` link (not a real signup; breaks expectation on many devices) | This is a key retention/capture surface. A mailto “signup” is high-friction, untrackable, and feels like a broken newsletter flow. |
| 91 | Blog | 2 | 3 | 3 | 2 | 9 | Blog post contains internal links to slugs that don’t exist (dead navigation inside the article) | Blog posts are meant to be “sticky” and internally linked. Dead links destroy trust, hurt retention, and make the site feel unfinished. |

## Batch 14 (Issues 92–98)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 92 | Blog | 2 | 2 | 3 | 2 | 5 | Blog markdown renders internal links as plain `<a href>` (full reload + state loss in a SPA) | Blog pages are link-dense. Full reload navigation feels slow, can reset scroll and transient state, and makes the app feel less polished. |
| 93 | Client | 4 | 4 | 3 | 2 | 29 | Search results show hard-coded prices that don’t match actual product pricing | Pricing inconsistencies are a top conversion and trust killer (“Am I being overcharged?” / “Which price is real?”). |
| 94 | Client | 3 | 5 | 3 | 2 | 27 | Cart stepper controls and promo input lack accessible labels (hard for screen readers) | Cart is a critical flow; unlabeled controls are a common accessibility audit failure and can make the cart unusable for assistive tech users. |
| 95 | Admin | 2 | 2 | 3 | 1 | 1 | Admin product-count badge likely never updates (sessionStorage + `storage` listener doesn’t fire in-tab) | The UI advertises a helpful affordance (product count) but fails silently. That hurts admin trust and makes navigation less informative. |
| 96 | Client | 4 | 4 | 3 | 2 | 29 | PDP “Hero proof strip” trust claims are hard-coded (including “Source: TikTok Shop + verified store reviews”) | Trust strips sit directly under the buy flow. Hard-coded proof statements can drift from reality and create “this feels fake” reactions (and potential compliance risk). |
| 97 | Client | 4 | 5 | 3 | 2 | 37 | PDP structured data hard-codes review rating/count (can contradict what the UI displays) | Review/social proof consistency matters. If structured data and visible UI diverge, it undermines credibility and can create SEO/trust issues. |
| 98 | Admin | 3 | 2 | 2 | 2 | 10 | Shared `Button` component has no focus-visible styling (keyboard users lose their place) | Visible focus is a basic accessibility requirement and a key usability affordance for power users/admins. |

## Batch 15 (Issues 99–105)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 99 | Platform | 2 | 3 | 3 | 2 | 9 | Support/contact + social identity is inconsistent across surfaces (trust drift) | Inconsistent “who are we / how do I contact you” info is a trust killer and can lead to missed support requests. |
| 100 | Blog | 4 | 4 | 2 | 2 | 30 | Blog promotes a “travel variant” URL but PDP ignores variant query params (misleading deep link) | Variant deep links are high-intent. If they don’t work, the user assumes the store is broken or bait-and-switching product options. |
| 101 | Creator | 2 | 3 | 3 | 2 | 9 | Creator “Download brief” CTAs can point to an `example.com` placeholder (broken onboarding resource) | This is a top-of-funnel creator onboarding step. If the “brief” link is broken, the program feels fake/unfinished and you lose creators before they ever produce content. |
| 102 | Creator | 3 | 4 | 3 | 2 | 21 | Welcome page “View leaderboard” card is a dead link and opens in a new tab | The welcome hub is supposed to be the “single source of truth” for onboarding. Dead links (especially ones that unexpectedly open new tabs) instantly signal “this site is broken”. |
| 103 | Blog | 2 | 2 | 2 | 2 | 6 | Blog index “tag” chips look like filters but are inert, and pillar filtering is effectively unreachable | Blog discovery is retention. UI that looks interactive but isn’t (and categories that exist but can’t be selected) makes the blog feel sloppy and hurts content engagement. |
| 104 | Platform | 4 | 5 | 3 | 2 | 37 | Canonical URLs / breadcrumb JSON-LD / share links hard-code `https://lumelle.com` (breaks on staging/custom domains) | Wrong canonicals + OG URLs cause share previews to mislead users, can split SEO signals across domains, and can route customers to production when testing on staging (confusing + risky). |
| 105 | Client | 2 | 5 | 3 | 2 | 17 | Brand story page has no SEO metadata (browser tab title/share preview can be stale or wrong) | Brand/story pages are high-trust and high-share. A stale title/description makes the site feel broken and reduces share/SEO quality. |

## Batch 16 (Issues 106–112)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 106 | Client | 2 | 5 | 3 | 2 | 17 | `Seo` auto-prefixing + titles that already contain “Lumelle \| …” yields awkward double-brand tab titles | The tab title is user-facing polish and a key SEO/share signal. Redundant branding looks sloppy and makes the app feel less premium. |
| 107 | Client | 4 | 5 | 3 | 2 | 37 | Drawer upsell cards fabricate compare-at pricing + review counts (trust risk in cart) | The cart/drawer is a conversion-critical, high-trust surface. Fake social proof and synthetic compare-at pricing can backfire hard (“this feels scammy”) and creates compliance risk. |
| 108 | Client | 2 | 5 | 4 | 2 | 16 | Shopify checkout/cart handoff page doesn’t provide a direct “Open on Shopify” link even when the domain is known | This is a direct conversion blocker in a known failure mode. The UI should help the user complete checkout, not just explain why it broke. |
| 109 | Blog | 3 | 5 | 3 | 2 | 27 | Blog pages don’t consistently apply `cdnUrl` to images (CDN toggle won’t apply; can cause broken imagery/perf regressions) | Blog is image-heavy. Random broken images or inconsistent load performance makes the site feel unreliable and hurts engagement. |
| 110 | Client | 2 | 3 | 3 | 2 | 9 | Some above-the-fold hero images omit explicit sizing (risk of layout shift/jank) | Layout shift is a “polish killer” on first impression, especially on mobile. It makes the UI feel janky and can hurt conversion. |
| 111 | Platform | 4 | 5 | 3 | 2 | 37 | `noindex` robots meta can “stick” across SPA navigation (you can accidentally noindex the whole site) | This can silently deindex pages and makes SEO/share behavior unpredictable. It’s also a QA trap: one “noindex page” visit can poison the rest of the session. |
| 112 | Client | 4 | 3 | 3 | 2 | 21 | Several key routes don’t set page metadata (tab title/description can be stale from the previous page) | Wrong tab titles feel broken, harm accessibility (screen readers rely on page titles), and produce misleading share previews. |

## Batch 17 (Issues 113–119)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 113 | Client | 2 | 5 | 3 | 2 | 17 | Spin wheel “Saved — add to cart” state is dead (saved discount code is never used later) | This is a classic “UI says success but nothing happens later” trust killer, especially in promo/reward surfaces. |
| 114 | Platform | 2 | 5 | 3 | 2 | 17 | Drawer sign-in copy promises “manage subscriptions” (but there is no subscription management UI) | Overpromising features that aren’t present makes the store feel untrustworthy and confuses users right at the “sign in” moment. |
| 115 | Platform | 4 | 4 | 3 | 2 | 29 | Successful sign-in redirects users to a broken destination (`afterSignInUrl="/account"` but `/account` is unavailable) | It makes auth feel broken and wastes the user’s intent immediately after they complete a high-friction step. |
| 116 | Client | 4 | 5 | 3 | 2 | 37 | `index.html` structured data advertises a site search (`SearchAction`) but search UX/data is not real | This is misleading to both users and search engines, can create bad sitelinks/UX expectations, and reinforces the “placeholder” feeling. |
| 117 | Creator | 2 | 4 | 4 | 2 | 12 | Duplicate “content source of truth” files increase copy drift risk (welcome/brief/legal exist twice) | Content is part of the UI. Duplication leads to inconsistency, slows iteration, and increases “why didn’t my change show up?” confusion for the team. |
| 118 | Platform | 2 | 3 | 3 | 2 | 9 | Social URL config exists but isn’t used; UI hard-codes social links so env vars can’t fix them | Social links are trust surfaces. If a handle changes or a link is wrong, you can’t fix it via config and different surfaces can drift. |
| 119 | Client | 2 | 3 | 3 | 2 | 9 | TikTok embeds are inconsistently sandboxed across pages (inconsistent behavior + privacy/security risk) | Third-party embeds are high-impact on performance and can have privacy/security implications. Inconsistent embed policies reduce predictability and polish. |

## Batch 18 (Issues 120–126)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 120 | Client | 2 | 3 | 4 | 2 | 8 | Two different color token systems are used in global UI (`brand-*` vs `semantic-legacy-brand-*`) (design consistency drift risk) | Inconsistent tokens lead to subtle mismatched shades across pages and make future theming/refactors expensive (premium UI depends on consistency). |
| 121 | Creator | 2 | 3 | 3 | 2 | 9 | WhatsApp CTAs are inconsistent (and one is mislabeled): “Message WhatsApp” points to a group invite link | WhatsApp is a high-trust, high-intent channel. If “Message” unexpectedly joins a group, or if links vary unpredictably, users assume the site is sloppy or scammy. It also creates support load (“I c… |
| 122 | Client | 2 | 4 | 3 | 2 | 13 | Product spotlight discount UI depends on parsing a human-written price string (fragile + easy to break) | Price presentation is a conversion + trust surface. Fragile parsing creates inconsistent discount display across releases (“why did the discount vanish?”) and makes non-GBP or alternate price forma… |
| 123 | Creator | 4 | 3 | 3 | 2 | 21 | Creator “Leaderboard” claims it updates daily, but it’s hard-coded static data | Leaderboards and “units sold” are credibility-sensitive. If users suspect it’s fake, it undermines the entire creator program narrative and can create compliance/trust issues (especially if rewards… |
| 124 | Platform | 2 | 4 | 3 | 2 | 13 | Sign-in / sign-up pages promise capabilities that don’t exist (orders/addresses/commissions) | This is a trust + drop-off multiplier: users take a high-friction action (sign-in) and are immediately met with missing functionality, which reads like a broken site. |
| 125 | Platform | 5 | 3 | 3 | 2 | 27 | The “Sign up” page uses the `signIn` Clerk API (sign-up flow is ambiguous and may fail) | Auth is core funnel infrastructure. If sign-up breaks or behaves inconsistently, users can’t access admin/account flows and will bounce immediately. |
| 126 | TBD | 4 | 5 | 3 | 2 | 37 | No global error boundary: any runtime error or chunk-load failure can white-screen the app | These failures are rare but catastrophic and feel like “the site is down”. Without a recovery path, users just leave (especially mobile). |

## Batch 19 (Issues 127–133)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 127 | Client | 2 | 4 | 3 | 2 | 13 | Homepage reviews section tells users to “visit our TikTok shop product page” but provides no link | Reviews are a trust surface. If you reference an external “source of truth” but don’t link it, users can’t verify claims and the UI feels unfinished. |
| 128 | Creator | 2 | 4 | 3 | 2 | 13 | Welcome onboarding says “Log your launch date” but offers no action to actually do it | Onboarding flows must be action-oriented. “Do X” with no affordance creates uncertainty and churn (creators don’t know where to report the date, so they do nothing). |
| 129 | Client | 2 | 4 | 3 | 2 | 13 | Marketing pages use raw hex colors in Tailwind classes (bypasses the token system and increases drift) | Token drift is how UIs become subtly “off” over time (slightly different whites/pinks across pages). It also makes theming and accessibility/contrast tuning harder because you can’t fix colors in o… |
| 130 | Client | 2 | 3 | 4 | 2 | 8 | Duplicate `StarRating` components exist (UI drift + bug fixes won’t apply consistently) | Ratings are a high-trust surface. If half-stars render inconsistently or bug fixes only land in one component, the UI feels unpolished and “patched together.” |
| 131 | Client | 2 | 4 | 3 | 2 | 13 | Social proof mismatch: homepage teaser shows 4.9★ / 1240 reviews, but the PDP shows 4.8 / 100+ | Social proof is a trust and conversion surface. Showing “better” numbers on the landing page and “worse” numbers on the PDP reads like bait-and-switch (even if it’s just placeholder data), which ca… |
| 132 | Client | 2 | 4 | 3 | 2 | 13 | Search results page has no search input (users can’t refine or try again) | Search is a core recovery flow (users use it when they’re confused). Removing the ability to iterate makes the page feel unfinished and increases abandonment, especially on mobile. |
| 133 | Client | 2 | 3 | 3 | 2 | 9 | Above-the-fold hero images are lazy-loaded (blank hero risk + worse perceived quality) | These are first-impression, conversion-critical pages. A delayed hero image makes the UI feel cheap/janky and can hurt LCP/perceived speed. |

## Batch 20 (Issues 134–140)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 134 | Client | 2 | 3 | 3 | 2 | 9 | Trust bar uses a marquee animation with a clickable link (moving target + no pause control) | Moving text is harder to read, increases mis-taps on mobile, and is an accessibility risk (WCAG “Pause, Stop, Hide” expectations for content that moves automatically). It also feels visually dated… |
| 135 | Platform | 2 | 5 | 3 | 2 | 17 | `Seo` allows relative `og:image` / `twitter:image` URLs (share previews can fail) | Broken share previews reduce click-through on shared links (WhatsApp, iMessage, Slack, Twitter/X) and make the brand look unpolished. |
| 136 | Client | 3 | 3 | 3 | 2 | 15 | Global `overflow-x-hidden` can clip focus rings/shadows and hides layout bugs instead of fixing them | This is a “paper over cracks” fix: it can create subtle accessibility problems (focus rings not visible) and make UI issues harder to detect early. |
| 137 | Client | 2 | 4 | 3 | 2 | 13 | PDP hero preload link is only ever added once (stale preload when navigating between products) | PDP speed is conversion-critical. Stale preloads waste bandwidth and can make subsequent PDP navigations slower (the browser preloads the wrong image instead of the next hero). |
| 138 | Client | 2 | 4 | 3 | 2 | 13 | PDP thumbnail strip hides the scrollbar and has no “more media” affordance | Product imagery is one of the highest-leverage conversion elements. If users miss angles/details, they hesitate or bounce; if they buy without enough context, returns and support contacts increase. |
| 139 | TBD | 2 | 3 | 3 | 2 | 9 | Fonts are loaded via CSS `@import` (render-blocking and can worsen first paint) | Typography is a core brand signal on the landing/PDP. Slow font loading causes visible text shifts and makes the site feel less premium — especially on mobile. |
| 140 | Client | 2 | 3 | 3 | 2 | 9 | Fixed bottom CTAs don’t respect iOS safe-area insets (can overlap the home indicator / browser UI) | This affects the highest-intent actions on the most common device class (mobile). If a CTA is even slightly clipped/hard to tap, conversion drops and users assume the site is buggy. |

## Batch 21 (Issues 141–147)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 141 | Client | 4 | 5 | 3 | 2 | 37 | Two SEO components exist (`Seo` vs `SEO`) with different defaults and URL/image handling (meta drift risk) | Metadata issues show up as “the tab title is weird” and “share previews look wrong,” which are high-impact polish signals. Duplication also makes future fixes (OG image normalization, canonical rul… |
| 142 | Client | 2 | 4 | 4 | 2 | 12 | Multiple “design primitives” are duplicated across `src/ui` and marketing domain (drift + inconsistent fixes) | In a UI-heavy product, primitives are the “atoms” that define consistency. Duplication guarantees mismatched spacing/typography/a11y fixes over time and increases the chance of regressions. |
| 143 | Client | 2 | 4 | 3 | 2 | 13 | PDP “review count” in HeroProofStrip is derived by stripping digits from a label string (brittle + can show wrong numbers) | Social proof numbers are credibility-sensitive. A label like “10k+” turning into “10” is an obvious trust-killer, and this brittleness makes future copy changes risky. |
| 144 | Admin | 5 | 2 | 3 | 2 | 17 | Admin Products “Save” can report success even when nothing was persisted (especially in “config fallback” mode) | This is a severe admin UX failure: editors believe changes are live when they aren’t. It causes wasted time and erodes trust in the admin console. |
| 145 | Admin | 2 | 2 | 3 | 2 | 5 | Admin Products list silently hides any CMS products not present in `product-config` (admin ≠ source of truth) | Admin tools should be authoritative. Silently hiding data is confusing (“where did my product go?”) and makes scaling beyond the hard-coded catalog impossible without code changes. |
| 146 | Admin | 2 | 2 | 3 | 2 | 5 | Admin product live preview is only available on XL screens (most editors won’t see a preview) | Live preview is one of the most valuable parts of a content editor. Hiding it for most screen sizes removes the feedback loop and increases publish mistakes. |
| 147 | Admin | 2 | 2 | 3 | 2 | 5 | Admin product gallery selection can’t truly be closed (state forces `editingMediaIdx` back to 0) | Media editing is a core admin task. UI that “won’t close” or unexpectedly jumps feels broken and slows down editing workflows. |

## Batch 22 (Issues 148–154)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 148 | Admin | 2 | 2 | 3 | 2 | 5 | Admin “Upload” relies on Cloudinary’s external widget script with no loading/progress UI (fragile + inconsistent asset pipeline) | Upload is a high-frequency workflow. If the script is slow/blocked, the button appears broken. Mixed asset sources also create inconsistent performance and complicate CDN/SEO/image resizing strategy. |
| 149 | Client | 2 | 5 | 3 | 2 | 17 | App-level `Suspense` fallback removes the site chrome (header/footer vanish during route loads) | This hits first impressions and navigation polish. Losing navigation chrome during loads feels like a full page crash/refresh, especially on slower networks. |
| 150 | Client | 2 | 5 | 3 | 2 | 17 | Drawer scroll-lock can cause horizontal “page jump” (scrollbar disappears with no compensation) | Navigation should feel stable. A subtle layout jump reads as poor polish and is especially noticeable on desktop. |
| 151 | Client | 4 | 5 | 3 | 2 | 37 | JSON-LD structured data uses relative URLs (logo/images), which can break rich results | It’s a silent failure: the site “looks fine” to users, but search/social surfaces can degrade (missing logo/image in rich results), which is high-impact for discovery and trust. |
| 152 | Client | 1 | 5 | 1 | 2 | 9 | Terminology inconsistency: PDP says “Basket” while the rest of the UI says “Cart” | Microcopy consistency is a trust and comprehension signal. In ecommerce, inconsistent terminology increases friction right at the conversion moment (“where did my basket go?”). |
| 153 | Client | 3 | 3 | 2 | 2 | 16 | Responsive image variants exist, but key pages still load a single full-size JPG without `srcSet`/AVIF | Performance is UX. Extra image weight increases time-to-paint and makes the site feel sluggish — especially on mobile, where most ecommerce traffic lives. |
| 154 | Admin | 2 | 2 | 3 | 2 | 5 | Admin “Pages” UI shows `/{slug}` as if it’s the live route, but `brand-story` doesn’t exist (`/brand` is the real route) | Admin tools should reduce mistakes, not create them. Wrong URL mental models lead to broken links in campaigns, support pings, and confusion during QA. |

## Batch 23 (Issues 155–161)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 155 | Platform | 2 | 3 | 3 | 2 | 9 | Tailwind color `brand-porcelain` is referenced but not defined (styles silently fail) | This silently breaks the design system across core surfaces (admin backgrounds, hover feedback, and focus rings on inputs). Missing focus rings is also an accessibility regression (keyboard users l… |
| 156 | TBD | 4 | 5 | 3 | 2 | 37 | Service worker returns `offline.html` for failed asset requests (can break images/JS on flaky networks) | Offline and “spotty network” are exactly when you need predictable degradation. Returning HTML for asset requests can create confusing broken UI states (or even crash the app if a JS chunk is repla… |
| 157 | Client | 4 | 5 | 3 | 2 | 37 | PDP meta description (and Product JSON-LD description) always appends “Blocks steam…” even for non-shower-cap products | SEO/share snippets are often the first user impression. Inaccurate claims reduce credibility and can cause higher bounce (“this isn’t the product I expected”). |
| 158 | Platform | 4 | 5 | 3 | 2 | 37 | App sets a persistent `lumelle_anon_id` cookie with no consent UI (trust + compliance risk) | Users expect transparency and control over tracking identifiers. Setting a persistent cookie with no consent UX is a trust hit and can create compliance risk in UK/EU-style consent regimes (and sim… |
| 159 | Admin | 2 | 2 | 3 | 2 | 5 | Admin Products silently hides `satin-overnight-curler-set` via `ADMIN_HIDDEN_HANDLES` (product can’t be managed) | Silent data hiding makes admins think content was deleted or “didn’t save.” It also prevents managing a SKU/handle from the primary admin surface. |
| 160 | Admin | 5 | 2 | 3 | 2 | 17 | Admin Products list can’t reliably open the editor (selection is cleared unless URL includes `/admin/products/:handle`) | This is a core admin workflow (editing products). If you can’t reliably open an editor, the admin tool is effectively unusable. |
| 161 | Admin | 2 | 2 | 3 | 2 | 5 | Admin Products list view shows a disabled “Save changes” button even when no product is selected | Disabled primary actions with no explanation reduce trust in admin tooling and waste space/attention on the most-used screen (the product list). |

## Batch 24 (Issues 162–168)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 162 | Client | 2 | 5 | 3 | 2 | 17 | Product gallery asset filenames include spaces and inconsistent casing (fragile URLs + CDN friction) | Image reliability is conversion-critical. Fragile asset naming increases the chance of broken product imagery (especially after migrations, CDN moves, or asset optimization pipelines). |
| 163 | Platform | 4 | 3 | 3 | 2 | 21 | `crypto.randomUUID()` is used without a fallback in browser-executed code (can crash on older browsers) | These are “high intent” paths (cart/checkout attribution, cart recovery). A runtime exception here can break checkout flows or crash UI for a segment of users. |
| 164 | Client | 4 | 5 | 3 | 2 | 37 | Client cart recovery feature flags are parsed incorrectly (`Boolean(...)` makes `'0'`/`'false'` truthy) | Feature gating becomes unreliable, which can expose incomplete/experimental UI unexpectedly (bad for QA and production trust). |
| 165 | Admin | 2 | 5 | 3 | 2 | 17 | Curler config defines two public handles (`satin-overnight-curler` vs `satin-overnight-curler-set`) and admin hides one (URL/SEO duplication + ops confusion) | Multiple URLs for effectively the same product can split SEO signals and analytics attribution. Hiding one handle in admin makes it harder for operators to reason about which URL is canonical and w… |
| 166 | Client | 4 | 5 | 3 | 2 | 37 | Checkout attribution writes to `localStorage`/cookies without guarding storage failures (can crash checkout in privacy-restricted browsers) | Checkout is the most conversion-critical step. Storage errors should never prevent a user from completing checkout. |
| 167 | TBD | 2 | 5 | 3 | 2 | 17 | Service worker forces immediate activation (`skipWaiting` + `clients.claim`) with no “Update available” UX | This is a classic source of hard-to-debug UI breakage (“it was fine, then suddenly weird”). It increases support burden and decreases trust. |
| 168 | Client | 2 | 5 | 3 | 2 | 17 | Client cart recovery env module mixes `process.env` with `import.meta.env` (browser-unsafe footgun) | It’s easy to accidentally import this module into browser code while building “cart recovery” UI. That turns into a high-impact production failure mode (cart/checkout screens breaking due to `proce… |

## Batch 25 (Issues 169–175)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 169 | Admin | 5 | 2 | 3 | 2 | 17 | Admin Products editor can lose unsaved changes with no warning when switching products | This is a high-stakes admin workflow. Losing edits is one of the fastest ways to destroy trust in a CMS/editor and creates real operational cost. |
| 170 | Client | 4 | 4 | 3 | 2 | 29 | PDP bottom CTA chips are hard-coded to shower-cap features (“Waterproof satin”, “No-frizz seal”) for every product | This is on the final conversion section of the PDP. Incorrect feature claims reduce trust and can increase returns/refunds (“not what I thought I was buying”). |
| 171 | Platform | 2 | 3 | 3 | 2 | 9 | Tailwind `line-clamp-*` utilities are used but the line-clamp plugin is not enabled (text overflow + layout breakage) | “Silent CSS failures” create inconsistent UI across the app and make layouts unpredictable (especially in admin list/grid views where truncation is expected to prevent cards from becoming uneven). |
| 172 | Client | 3 | 3 | 2 | 2 | 16 | No “Skip to content” link (keyboard + screen-reader usability regression) | This is a common accessibility audit failure and materially slows down navigation for keyboard users (and some screen-reader workflows), especially with sticky/frequent header controls. |
| 173 | Client | 3 | 3 | 3 | 2 | 15 | “Just added” CTAs use `animate-pulse` without respecting `prefers-reduced-motion` (motion a11y) | Reduced-motion preference is specifically for preventing motion-triggered discomfort. Shipping motion on high-frequency UI feedback (cart actions) is a fast way to fail accessibility expectations a… |
| 174 | Client | 2 | 5 | 3 | 2 | 17 | Public header shows two “Account” links on desktop (redundant + wastes header space) | Redundant primary-nav actions make the header feel cluttered/unpolished and reduce space available for more important CTAs (like cart, search, or “Shop”). |
| 175 | Creator | 2 | 4 | 3 | 2 | 13 | Welcome page “Copy invite link” failure has no user-visible fallback (onboarding friction) | This page is a creator onboarding hub. When the “copy link” action silently fails, it creates immediate confusion (“did it copy?”) and adds friction exactly at the moment you want to reduce drop-off. |

## Batch 26 (Issues 176–180)

| ID | Area | I | R | E | C | P | Title | Why it matters |
|---:|:-----|:-:|:-:|:-:|:-:|--:|:------|:-------------|
| 176 | Admin | 3 | 2 | 3 | 2 | 9 | Admin blog editor relies on placeholders instead of real labels (accessibility + clarity issue) | Admin workflows are “high-stakes typing.” Placeholder-only labeling is a known accessibility issue and also increases operator error (people forget what a field is for after they’ve typed into it). |
| 177 | Platform | 3 | 5 | 3 | 2 | 27 | CDN URL encoding is inconsistent, which is brittle with space/case filenames (broken images / wrong preloads / bad previews) | Image reliability is conversion-critical. Inconsistent URL encoding becomes a “works on my machine” class of bug (especially when you toggle CDN mode) and makes caching/preload behavior unpredictable. |
| 178 | Client | 3 | 3 | 2 | 2 | 16 | Floating “Buy Now” CTA is hidden with `opacity-0` but remains focusable (invisible focus target) | Invisible-but-focusable controls are a classic UX/a11y footgun. Users can “tab into nothing”, lose focus position, and assume the page is broken. |
| 179 | Creator | 3 | 3 | 3 | 2 | 15 | Floating WhatsApp CTA has the same invisible-focus problem (and exists in two copies) | This is a high-salience CTA. If keyboard focus can land on an invisible fixed button, it breaks navigation and creates a “ghost UI” feeling. |
| 180 | Admin | 3 | 2 | 2 | 2 | 10 | Admin mobile drawer is “hidden” only by transform (no `aria-hidden`/`inert`, still reachable in the DOM) | Screen-reader users and some keyboard flows can still reach off-screen navigation items, creating confusing focus jumps and “invisible navigation”. It also makes it harder to meet basic dialog/draw… |
