# Template Hardening Backlog (Prioritized)

This is a backlog of **starter kit improvements**. It’s not client feature work; it’s changes that make “copy repo → new client” faster and safer.

Date: December 13, 2025

---

## P0 — Do before client #2 if possible

1) **Single config surface**
   - Add a `siteConfig` concept so brand name, currency, thresholds, URLs, and `appSlug` live in one place.

2) **Remove brand-prefixed storage keys**
   - Replace `lumelle_*` keys with `appSlug`-derived keys everywhere.
   - Same for Supabase client storage keys like `sb-lumelle-*`.

3) **Public blog by default**
   - Ensure blog routes are public and SEO-friendly.
   - Only mount Clerk for interactive blog features (not for reading).

4) **Centralize money/currency formatting**
   - Replace hardcoded `£`/`GBP` assumptions with a single `formatMoney` helper.

5) **Harden blog comments + likes (privacy + anti-spam)**
   - Define baseline Supabase schema + RLS policies for `blog_comments` and `blog_likes`.
   - Ensure public reads don’t leak sensitive identifiers (e.g., user IDs) unnecessarily.
   - Comments are auto-published (decision); add anti-spam guardrails (rate limits, profanity, reporting).
   - Likes should be public as a count only (decision); expose counts without exposing liker identities.

---

## P1 — High ROI next

6) **Define product content source-of-truth**
   - Create a clear adapter/precedence story for:
     - Shopify product data
     - Shopify metafield “sections” content
     - local config defaults

7) **Customer parity: create Shopify customer from Clerk user**
   - Implement webhook-first sync to ensure Shopify Customer exists for Clerk users.
   - Add a mapping table for `clerk_user_id ↔ shopify_customer_id`.
   - Add reconciliation job as safety net.

8) **Clean up template docs and aliases**
   - Ensure docs reflect the real domain structure and current architecture.

---

## P2 — Scale/quality of life

9) **Client generator script**
   - Even if we still copy the repo, add a script that:
     - asks for brand/appSlug/shopify domain
     - applies safe replacements
     - outputs a setup checklist

10) **Module toggles**
   - Feature-flag optional modules:
     - admin tools
     - metrics/exports
     - advanced Shopify sync
     - Stripe payments (future)

11) **Standard smoke test checklist**
   - Define a consistent “does this template spin work?” test plan for every client.
