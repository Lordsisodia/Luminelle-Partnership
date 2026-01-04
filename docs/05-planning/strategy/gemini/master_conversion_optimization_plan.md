# Master Conversion Optimization Plan

This document consolidates all research, code analysis, and high-ROI feature ideas into a single, prioritized roadmap. It merges the **Original Plan**, **Addendum**, **Deep Research**, and **New Utility Findings**.

## Executive Summary
**Goal:** Transform the app from a "store" into a **high-converting e-commerce engine**.
**Strategy:** Focus on "Safe to Buy" signals, Mobile Friction reduction, and Lifetime Value (LTV) utility.

---

## Phase 1: The "Trust & Mobile" Foundation (Immediate Impact)
*Focus: Removing barriers to the first sale.*

### 1. Sticky Mobile CTA (The "Always-On" Buy Button)
*   **Source:** Deep Research
*   **Problem:** On mobile, the "Add to Cart" button disappears as users scroll down reading details.
*   **Solution:** Implement a `StickyBottomBar` that slides up when the main CTA scrolls out of view.
*   **Code Action:** Create `src/components/StickyBottomBar.tsx` and integrate into `ProductPage.tsx`.

### 2. Trust Injection (The "Safe" Signal)
*   **Source:** Addendum / Deep Research
*   **Problem:** No immediate reassurance near the "Buy Now" button in `ProductPage.tsx`.
*   **Solution:** Inject a `TrustMicroCopy` component immediately below the CTA.
*   **Visual:** Icons for "30-Day Returns", "Secure SSL", "Fast Shipping".

### 3. Design Token Engine (The "Brand" Feel)
*   **Source:** Original Plan
*   **Problem:** Hardcoded hex codes make branding inconsistent and hard to change.
*   **Solution:** Centralize colors/radius in `src/theme/tokens.json`.

---

## Phase 2: The "Conversion" Engine (Revenue Boosters)
*Focus: Increasing Average Order Value (AOV) and recovering lost sales.*

### 4. Slide-Out Cart + Upsells (The "Flow" Keeper)
*   **Source:** Deep Research
*   **Problem:** `CartPage.tsx` is a full page, forcing users to leave the product context.
*   **Solution:** Refactor `useDrawer` to open a **Slide-Out Cart**.
*   **Upgrade:** Add "In-Cart Upsells" (e.g., "Add a Satin Scrunchie for £5") directly in the drawer.

### 5. Magic Cart Recovery (The "Save" Button)
*   **Source:** Original Plan
*   **Problem:** Closing the tab loses the cart.
*   **Solution:** Add `persist` middleware to the Zustand Cart Store.

### 6. Exit-Intent & FOMO (The "Hook")
*   **Source:** Addendum
*   **Solution:**
    *   **Exit Popup:** "Wait! Get 10% off" when mouse leaves the window.
    *   **Low Stock Alert:** "Only 3 left!" on the PDP.

---

## Phase 3: The "Utility" Layer (LTV & Retention)
*Focus: Making life easier for existing customers (New Findings).*

### 7. Self-Service Returns Portal
*   **Source:** New Utility Analysis
*   **Problem:** `AccountPage.tsx` has no returns management, just a link.
*   **Solution:** Build a UI in `src/domains/account/ui/pages/ReturnsPage.tsx` where users can select an order -> select items -> generate a return label (mocked or via API).

### 8. "Subscribe & Save" Toggle
*   **Source:** New Utility Analysis
*   **Problem:** Consumable products (or those that wear out) have no recurring revenue option.
*   **Solution:** Add a "Subscribe & Save 15%" toggle on `ProductPage.tsx`. Even if manual at first, it captures intent.

### 9. Referral Dashboard ("Give £5, Get £5")
*   **Source:** New Utility Analysis
*   **Problem:** No viral growth loop.
*   **Solution:** Add a simple "Refer a Friend" section in `AccountPage.tsx` that generates a unique link.

---

## Phase 4: The "Invisible" Scale (SEO & Tech)
*Focus: Getting more traffic for free.*

### 10. Schema "Supercharge"
*   **Source:** Deep Research
*   **Problem:** Missing FAQ and Video schema in `ProductPage.tsx`.
*   **Solution:** Inject `FAQPage` and `VideoObject` JSON-LD to get rich snippets in Google.

### 11. PWA & Speed
*   **Source:** Original Plan
*   **Solution:** Configure `vite-plugin-pwa` for offline support and "Add to Home Screen".

---

## Phase 5: Dedicated Ad Landing Pages
*Focus: Paid Traffic Efficiency (New Finding).*

### 12. The "Offer" Page
*   **Source:** New Utility Analysis
*   **Problem:** `LandingPage.tsx` is empty. Ads shouldn't go to the generic Home or Product page.
*   **Solution:** Create a stripped-down landing page (No Header/Footer navigation) focused purely on a specific offer/bundle.

---

## Phase 6: Gamification & Engagement (Viral Growth)
*Focus: Turning customers into advocates (New Request).*

### 13. "Lumelle Rewards" (Loyalty Program)
*   **Source:** Gamification Research
*   **Problem:** No incentive to return other than product quality.
*   **Solution:** Simple points system. "Earn 1 point per £1".
*   **Implementation:** Add `PointsBalance` to `AccountPage.tsx`. 100 points = £10 voucher.

### 14. "Find Your Routine" Quiz
*   **Source:** Gamification Research
*   **Problem:** Users unsure which product is right for their hair type.
*   **Solution:** Interactive Quiz in `src/domains/landing/ui/pages/QuizPage.tsx`.
*   **Flow:** "What's your hair type?" -> "What's your struggle?" -> **Recommended Bundle**.

### 15. Referral Engine ("Give £5, Get £5")
*   **Source:** Gamification Research
*   **Solution:** Generate a unique link in `AccountPage.tsx`. When a friend buys, both get a discount.

---

## Recommended Implementation Order
1.  **Sticky Mobile CTA** (Phase 1) - *Highest Mobile Conversion Win*
2.  **Trust Injection** (Phase 1) - *Easiest Trust Win*
3.  **Slide-Out Cart** (Phase 2) - *Best UX Improvement*
4.  **Schema Supercharge** (Phase 4) - *Best SEO Win*
5.  **Self-Service Returns** (Phase 3) - *Best Customer Service Win*
6.  **Product Quiz** (Phase 6) - *Best Engagement Win*
