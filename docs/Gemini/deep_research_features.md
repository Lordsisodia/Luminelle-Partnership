# Deep Research: High-ROI Feature Expansion

I've analyzed your actual codebase (`ProductPage.tsx`, `CartPage.tsx`, and `SEO.tsx`) to find specific, code-level gaps. Here are the "hidden" opportunities that will drive conversion.

## 1. The "Sticky" Conversion Bar (Mobile)
**Status:** ❌ Missing in `ProductPage.tsx`.
**The Gap:** On mobile, your product page is long (Hero -> Details -> Reviews -> FAQ). Once a user scrolls past the top, the "Add to Cart" button disappears. They have to scroll *all the way back up* to buy.
**The Fix:** Implement a `StickyBottomBar` component that appears only when the main CTA scrolls out of view.
*   **Content:** Product Title + Price + "Add to Cart" Button.
*   **ROI:** High. Removes the physical friction of scrolling back up.

## 2. The "Trust Injection" (CTA Proximity)
**Status:** ❌ Missing near the Buy Button.
**The Gap:** In `ProductPage.tsx` (lines 597-610), you have the buttons, but no immediate reassurance *right there*. You have a "Secure checkout" box in `CartPage`, but that's too late.
**The Fix:** Inject a `TrustMicroCopy` component immediately below the "Buy Now" button.
*   **Visual:** Small icons (Lock, Box, Calendar) with text: "Guaranteed Delivery by [Date]", "30-Day Returns", "Secure SSL".
*   **ROI:** High. Reduces "hesitation" at the exact moment of decision.

## 3. The "Slide-Out" Cart Upgrade (UX Flow)
**Status:** ⚠️ `useDrawer` exists, but `CartPage` is a full page.
**The Gap:** Sending users to a full `/cart` page (lines 28-143 of `CartPage.tsx`) breaks their shopping flow. They have to click "Back" to keep browsing.
**The Fix:** Ensure the `useDrawer` hook opens a **Slide-Out Cart (Drawer)** instead of navigating away.
*   **Bonus:** Add **In-Cart Upsells** (e.g., "Add a Satin Scrunchie for £5") directly in the drawer.
*   **ROI:** High. Keeps the user on the product page, increasing average order value (AOV).

## 4. Schema "Supercharge" (SEO)
**Status:** ⚠️ Partial (`Product` & `Breadcrumb` exist).
**The Gap:** `ProductPage.tsx` injects basic JSON-LD, but misses two massive opportunities given your content:
*   **FAQPage Schema:** You have a `FaqSectionShop`, but Google doesn't know it's an FAQ. Adding this schema gives you "Questions & Answers" rich snippets in search results.
*   **VideoObject Schema:** You have TikTok videos (`videoSlot`). Google *loves* video. wrapping them in schema helps them appear in the "Videos" tab.
**The Fix:** Update `injectJsonLd` to include these arrays.

## 5. The "Review Mining" Layer
**Status:** ⚠️ `AggregateRating` exists, but individual reviews are hidden.
**The Gap:** You show "4.8 (100+)", but Google prefers seeing the actual review text in the schema to verify it's real.
**The Fix:** Loop through your top 5 reviews and add them to the `review` array in the Product schema.

---

### Implementation Roadmap
1.  **Phase 1 (Trust & Mobile):** Build `StickyBottomBar` and `TrustMicroCopy`. (Highest visible impact).
2.  **Phase 2 (Flow):** Polish the `CartDrawer` and add Upsells.
3.  **Phase 3 (Invisible):** Update `SEO.tsx` with FAQ and Video schema.
