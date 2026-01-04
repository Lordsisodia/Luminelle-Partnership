# Template Map (What to Reuse vs Customize)

This doc is a map of what should become part of the agency template vs what should be client-specific.

Guiding idea: template **architecture + integration patterns + repeatable features**, and push client variance into **content + config**.

---

## 1) Architecture (high confidence template)

**Template (copy/paste)**
- Domain-driven layout under `src/domains/*` with consistent split:
  - `ui/` (pages/sections/components/layouts)
  - `logic/` (behavior, no JSX)
  - `data/` (fetchers/mappers/static configs)
  - optional `hooks/`, `providers/`, `state/`
- App routing + lazy boundaries by domain.
- Provider composition (Router → Cart Provider → UI shell providers).
- Shared utilities in `src/lib/*` (SEO, env, Shopify client, Supabase client).
- Serverless backend layout in `api/` with shared code in `api/_lib/*`.

**Template (parameterized)**
- Build/deploy config (`vercel.json`, Vite aliases).
- Env var surface (Shopify, Clerk, Supabase, internal secrets).

---

## 2) Frontend modules (by domain)

### `landing` (marketing pages)
**Template (parameterized)**
- Reusable marketing sections (hero, social proof, FAQ, CTAs).
- Content files under `src/content/*` are the primary “non-code edit surface”.

**Client-specific**
- Brand story, creator program, onboarding flows, imagery, tone.

### `products` (PDP, merchandising, search)
**Template (copy/paste)**
- PDP scaffolding + “section slots” pattern.
- Reusable PDP sections: FAQ, details accordion, proof/reviews patterns, media gallery slot.

**Template (parameterized)**
- “Product content adapter” boundary:
  - merges Shopify product data + configurable content blocks (“sections”)
  - supports metafields/metaobjects as source-of-truth later

**Client-specific**
- Product catalog, handles/variant IDs, merchandising copy, FAQs, galleries, UGC.

### `cart`
**Template (copy/paste)**
- Cart provider and cart mutations pattern.
- Dual-mode cart approach:
  - Direct Storefront API calls
  - Optional server proxy endpoints (`/api/storefront/cart/*`)

**Template (parameterized)**
- Storage key prefix (must not be brand-hardcoded).
- Shipping threshold rules, currency formatting, analytics events.

### `checkout`
**Template (copy/paste)**
- Review → redirect to Shopify checkout (via `checkoutUrl`).

**Template (parameterized)**
- Shipping thresholds, copy, tax messaging, currency.
- Post-checkout routes (confirmation/tracking/returns).

### `blog`
**Template (copy/paste)**
- Blog index + post page structure.
- SEO defaults + JSON-LD injection patterns.

**Template (parameterized)**
- Content adapter (v1: typed content in repo).
- Future: MD/MDX or CMS adapter.

**Decision**
- Blog pages should be **public** for SEO.
- Clerk is used only for interactive features.

**Interactive features (v1)**
- Comments
- Likes

**Privacy/UX decisions**
- Comments are auto-published.
- Likes are public as a count only (no public list of liker identities).

### `auth` + `account`
**Template (copy/paste)**
- Clerk shell pattern (mount Clerk only where needed).
- Account page patterns (nav, layouts, basic profile + order views).

**Template (parameterized)**
- Supabase table names/schema and “what data we store” decisions.
- Shopify customer parity sync toggles (see `docs/07-templates/library/templated/customer-sync.md`).

### `admin`
**Template (copy/paste)**
- Admin guard pattern + internal auth pattern for sensitive endpoints.
- Admin UI primitives: analytics dashboard + content editor + exports.

**Template (parameterized)**
- Admin audience (agency-only vs merchant).
- What metrics exist (depends on DB/webhooks/sync).

---

## 3) Backend/serverless modules (`api/`)

**Template (copy/paste)**
- `api/_lib/*` for shared helpers:
  - internal auth, db pool, Shopify helpers, email sender
- Shopify cart proxy endpoints (`/api/storefront/cart/*`) as an optional layer.
- Shopify webhooks + backfill/sync patterns.
- Metrics endpoints + export endpoints (guarded by internal auth).

**Template (parameterized)**
- Shopify credentials/scopes and which webhooks/sync features are enabled.
- Email provider configuration.
- DB schema / migrations strategy.

---

## 4) Payment provider boundary (future-proofing)

We want Stripe support later.

**Template goal**
- Checkout/payment logic should depend on a single “payment provider” adapter so we can support:
  - Shopify checkout redirect (v1 default)
  - Stripe Checkout redirect (future)
  - Stripe Elements (future)

---

## 5) Template readiness: what’s good + what to fix

**Already strong**
- Clean domain boundaries and clear places to put code.
- Existing patterns for Shopify, Supabase, Clerk, and serverless endpoints.
- Blog system is already modular and easy to replicate.

**Template-hardening needed**
- Remove/parameterize brand-prefixed storage keys (`lumelle_*`) and brand strings.
- Centralize money/currency formatting (avoid hardcoded `£`).
- Clarify “source of truth” for product content (config vs Shopify metafields).
- Implement “Clerk → Shopify customer parity” (currently not fully implemented).
