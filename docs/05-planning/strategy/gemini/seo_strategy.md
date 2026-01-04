# SEO Strategy & Research: The "SPA" Challenge

You asked: *"What's the SEO like currently? How does it work for web apps?"*

## 1. Current Status: Good (for a Homepage)
I audited your code (`index.html` and `seo.ts`).
*   **✅ Static Tags**: Your `index.html` has excellent hardcoded tags (Title, Description, Open Graph, JSON-LD).
*   **✅ Dynamic Updates**: You have a `setMetaTags` function in `seo.ts` that updates these tags when the user navigates.

**The Rating: 7/10**
It works perfectly for Google (which runs JavaScript).
It works perfectly for the **Homepage**.

## 2. The Problem: "Deep Linking" on Social Media
Since this is a **Single Page App (SPA)** (Vite + React), the server always sends the *same* `index.html` regardless of the URL.
*   **Scenario**: You share a link to `lumelle.com/products/shower-cap`.
*   **Facebook/Twitter Bot**: Fetches the URL -> Gets `index.html` -> Sees "Lumelle | Keep hair dry" (Homepage Title).
*   **Result**: The link preview looks like the homepage, not the specific product.

## 3. The Research: How to Fix This
To get "Perfect" SEO and Social Sharing in a web app, you need one of these strategies:

### Strategy A: Server-Side Rendering (SSR) - *Hard*
*   **What**: The server builds the HTML *before* sending it to the browser.
*   **Pros**: Perfect SEO everywhere.
*   **Cons**: Requires migrating to Next.js or Remix. (Big refactor).

### Strategy B: React Helmet Async - *Standard*
*   **What**: A library that manages the `<head>` tag for you.
*   **Why**: It's cleaner than your manual `seo.ts` file.
*   **Action**: Replace `seo.ts` with `<Helmet><title>Product</title></Helmet>`.

### Strategy C: Vercel OG (Dynamic Images) - *The "Cheat Code"*
*   **What**: Vercel generates a custom image on the fly for social cards.
*   **Why**: Even if the *text* title is generic, the *image* can show the specific product name and price.
*   **Action**: Create an API route `api/og.tsx`.

## 4. Recommended Plan (High ROI)
Don't rewrite the app for SSR yet. Instead:
1.  **Keep the current setup** for Google (it works fine).
2.  **Install `react-helmet-async`** to manage titles cleanly.
3.  **Implement Vercel OG** (`api/og`) to fix the social sharing issue. This gives you 90% of the benefit of SSR with 1% of the effort.

## 5. Structured Data (JSON-LD)
You already have this in `index.html`!
*   **Improvement**: Make it dynamic. When on a Product Page, inject a "Product" schema (Price, Availability) so Google shows the price in search results.
