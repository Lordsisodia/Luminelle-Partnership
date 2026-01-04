# New Client Intake Checklist

This checklist collects the info you need so “new client setup” becomes mostly config + content.

---

## ✅ Outputs (what you should have after completing this doc)

- A filled checklist for each section
- A single “source of truth” folder/link for assets and credentials
- A clear “week 1 scope” vs “later scope” list (if applicable)

## 🧭 Stage 1 — Brand + creative

- Brand name + tagline
- Logo assets (SVG/PNG) + favicon set
- Fonts (licensed? Google Fonts?) + usage rules
- Color palette
- Tone of voice (3–5 adjectives) + banned phrases
- Social handles and links
- Product photography and lifestyle imagery

---

## 🧭 Stage 2 — Shopify store details

- Shopify store domain (e.g., `example.myshopify.com`)
- Storefront API access token (public)
- Product handles + primary SKUs
- Discounts/offers (bundles, buy-2-save, etc.)
- Shipping rules:
  - free shipping threshold
  - shipping prices and supported regions
- Returns policy + URL
- Taxes/VAT messaging requirements

---

## 🧭 Stage 3 — Blog / SEO content

**Defaults (starter assumptions)**
- Blog is included.
- Blog pages are public for SEO.
- Content lives in the repo (typed content) for now.
- Interactive features: **comments (auto-published) + likes (public count only)**.
  - Requires Clerk + Supabase tables/policies (see `docs/07-templates/library/templated/blog-social.md`).

Collect:
- 3–5 content pillars
- 10–20 starter post titles + target keywords
- Any required static pages (About, Privacy, Terms, Returns, Contact)

---

## 🧭 Stage 4 — Auth + accounts (Clerk + Supabase)

**Defaults**
- Clerk is the identity provider.
- Customer profiles are stored in Supabase.
- Shopify customer parity is ensured near real-time (by email).
- Supabase is per-client (each client has their own Supabase project).

Collect:
- Admin emails (for internal tools)
- What account features to ship:
  - order history
  - saved addresses
  - saved payment methods (or placeholders)

---

## 🧭 Stage 5 — Admin tools

Admin tools exist in the starter, but per client decide:
- agency-only vs merchant-accessible
- which dashboards/features to expose (analytics, exports, content editing)

---

## 🧭 Stage 6 — Deployment / hosting

Defaults:
- Vercel for now.

Collect:
- production domain and any staging domains
- asset/CDN strategy (Supabase storage vs other)
- required tracking integrations (GA4, Meta, TikTok, etc.)

---

## ✅ Definition of done

- You can run `docs/07-templates/library/templated/new-client-setup-steps.md` without guessing missing inputs.
