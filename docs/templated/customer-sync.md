# Customer Sync (Clerk → Supabase → Shopify Customer Parity)

Goal: Clerk is the primary auth system, but Shopify should still have a corresponding Customer record for each user (for operations, marketing, and customer service).

Decision summary (as of December 13, 2025):
- Blog is public for SEO (unrelated, but affects Clerk mounting strategy).
- Customer profile sync to Supabase happens immediately.
- Shopify customer parity is ensured near real-time (not days later).

---

## What exists in this repo today (observed)

### 1) Clerk → Supabase profile sync (client-side)

- Hook: `src/domains/account/hooks/useSyncUserToSupabase.ts`
- Behavior:
  - When a user is signed in via Clerk, it upserts the user profile to Supabase `customers`.
  - Uses Clerk JWT template `supabase` when available.

### 2) Clerk webhook ingestion (server-side)

- Endpoint: `api/webhooks/clerk.ts`
- Behavior:
  - Verifies webhook with `CLERK_WEBHOOK_SECRET`.
  - Upserts a user record into the DB.

### 3) Shopify → DB capture

There are Shopify webhooks/backfills that store Shopify customer data in the DB:
- Backfill: `api/shopify/backfill/customers.ts`
- Webhooks: `api/shopify/webhooks/customers-*.ts`

---

## What’s missing (to match our desired flow)

We do not yet have the “Clerk user → ensure Shopify Customer exists” direction implemented as a first-class pipeline.

To do near real-time parity, we need:

1) **Customer lookup/create in Shopify (Admin API)**
   - lookup by email
   - create if missing
   - optionally update name/avatar/tags

2) **A stable mapping table**
   - `clerk_user_id`
   - `shopify_shop`
   - `shopify_customer_id`
   - `email` (and last seen timestamps)

3) **An execution model**
   - webhook-first (near real-time)
   - plus reconciliation job (safety net)

---

## Recommended design (template-ready)

### Primary path: webhook-first

On Clerk `user.created` / `user.updated`:
1) Upsert user profile to Supabase/Postgres
2) Call `ensureShopifyCustomer(email, name, phone, tags)`
3) Store mapping `clerk_user_id ↔ shopify_customer_id`

Why webhook-first:
- keeps parity tight (minutes, not days)
- reduces support issues (“why can’t I find this customer in Shopify?”)

### Safety net: reconciliation job

Nightly/weekly:
- find Supabase customers without a Shopify mapping
- ensure Shopify customer exists
- repair mappings

---

## Edge cases to handle (important)

- Email changes in Clerk:
  - you may need to re-link to the correct Shopify customer or update email.
- Existing Shopify customers from guest checkout:
  - lookup by email should link to the existing record (don’t duplicate).
- Multiple stores (if your agency ever runs multiple Shopify shops under one DB):
  - mapping must include `shopify_shop`.

