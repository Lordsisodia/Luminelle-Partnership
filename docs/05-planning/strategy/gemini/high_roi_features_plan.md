# High ROI / Low Effort Features Plan

You asked for **"Easy Effort, High ROI"** features that provide **1000x value** to the client *right now*.

## 1. The Design Token Engine (Immediate Branding)
**Concept:** Define the brand in *one* JSON file, and the whole app updates.
**Why it's High ROI:**
*   **Client Value:** They see *their* brand instantly.
*   **Dev Value:** You stop hardcoding hex codes.
*   **Effort:** **Low** (1-2 hours).

**Implementation:**
1.  Create `src/theme/tokens.json`:
    ```json
    {
      "colors": {
        "primary": "#FF5733",
        "secondary": "#33FF57",
        "surface": "#FFFFFF"
      },
      "radius": "0.5rem"
    }
    ```
2.  Update `tailwind.config.js` to read this file and map to CSS variables (`--color-primary`).
3.  **Result:** Changing one file re-skins the entire app.

## 2. PWA & Speed Optimization (The "App" Feel)
**Concept:** Make the website installable (Home Screen icon) and work offline.
**Why it's High ROI:**
*   **Client Value:** "We have a mobile app!" (without paying $50k for native).
*   **Speed:** Prefetching pages makes navigation instant.
*   **Effort:** **Low** (Plugin already installed, just needs config).

**Implementation:**
1.  Configure `VitePWA` plugin in `vite.config.ts` (Manifest, Icons, Caching).
2.  Add `ReloadPrompt` component for updates.
3.  **Result:** 100/100 Lighthouse score and "Add to Home Screen" prompt.

## 3. Universal A/B Testing & Personalization
**Concept:** Show different content to different users (e.g., "Returning User" gets a "Welcome Back" banner, "New User" gets "10% Off").
**Why it's High ROI:**
*   **Client Value:** Increases conversion rates (Money!).
*   **Effort:** **Medium** (Build a wrapper component).

**Implementation:**
1.  **The Wrapper:**
    ```tsx
    <Personalize
      segment="returning_customer"
      fallback={<HeroDefault />}
    >
      <HeroWelcomeBack />
    </Personalize>
    ```
2.  **The Logic:** Simple check against LocalStorage (visited before?) or User ID.
3.  **The A/B Test:**
    ```tsx
    <Experiment
      name="hero_cta_color"
      variants={{
        a: <ButtonColor="blue" />,
        b: <ButtonColor="red" />
      }}
    />
    ```
4.  **Analytics:** Send the "winner" event to PostHog/Google Analytics.

## 4. "Magic" Cart Recovery (The Revenue Booster)
**Concept:** If a user closes the tab, save their cart to the URL or LocalStorage. When they come back (even days later), the cart is there.
**Why it's High ROI:**
*   **Client Value:** Direct revenue recovery.
*   **Effort:** **Low** (Zustand `persist` middleware).

**Implementation:**
1.  Add `persist` middleware to your Zustand Cart Store.
2.  **Result:** Cart never dies.

---

## Recommendation
Start with **#1 (Design Tokens)** and **#4 (Magic Cart)**. They are the fastest to build and have the most visible impact.
