# Starter Decisions (Baseline Assumptions)

Date: December 13, 2025

This is the “decision log” for the agency starter. When we copy this repo for a new client, these assumptions should hold unless explicitly overridden.

---

## 1) Commerce platform + payments

**Default (v1): Shopify**
- Storefront data comes from Shopify.
- Checkout is Shopify checkout (redirect using the Storefront Cart `checkoutUrl`).

**Future: Stripe / other providers**
- Some clients may later use Stripe or other providers.
- Template principle: add payments via a **payment provider boundary** (adapter) so we don’t rewrite the app to support Stripe.

---

## 2) Auth + accounts

**Default (v1): Clerk**
- Clerk is the primary identity/auth provider.
- Accounts/“logged in user” in the app is Clerk-first (not Shopify customer accounts first).

---

## 3) App database / storage

**Default (v1): Supabase**
- Supabase/Postgres is the application database.
- Frontend can optionally access Supabase via Supabase JS, authenticated with a Clerk JWT template (`supabase`).

---

## 4) Blog

**Default (v1): always included, public for SEO**
- Blog pages are public and indexable by default.
- Clerk is mounted only for interactive features (e.g. commenting, likes, saving posts), not for basic reading.
- Content lives in the repo (typed content under `src/content/blog/*`) for now.

**Interactive features (v1)**
- Comments
- Likes

**Behavior decisions**
- Comments are auto-published (no moderation queue in v1).
- Likes are public as a **count only** (no public list of who liked).

---

## 5) Customer sync: Clerk → Supabase → Shopify (parity)

**Decision: near real-time sync**

Desired behavior:
1) User signs up / updates profile in Clerk
2) Customer profile is upserted to Supabase immediately
3) Backend ensures a Shopify Customer exists for the same email and stores a linkage

Execution model:
- Near real-time via Clerk webhooks (plus a periodic reconciliation job later as a safety net).

See `docs/templated/customer-sync.md` for details and missing pieces.

---

## 6) Admin tools

**Default: included, optionally exposed**
- The starter includes internal admin tools (analytics, exports, content editing).
- Per-client decision: agency-only vs merchant-accessible.

---

## 7) Deployment

**Default (v1): Vercel**
- Frontend + `api/` functions deployed to Vercel.
- Keep code portability in mind so a future move (e.g., Cloudflare) is not a rewrite.

---

## 8) How we distribute the template

**Default: copy this repo**
- This repo is the starter.
- New client projects are created by duplicating it and running the “new client setup” checklist.

---

## 9) Supabase topology (client isolation)

**Decision (for now): per-client Supabase**
- Each client gets their own Supabase project (DB + keys).
- Clients do not typically need ownership of the DB, but per-client isolation keeps the template simple and low-risk.

Future (optional):
- Multi-tenant can be explored later if/when you need centralized ops and you’re ready to enforce tenant isolation rigorously.
- See `docs/templated/supabase-topology.md` for the tradeoffs.
