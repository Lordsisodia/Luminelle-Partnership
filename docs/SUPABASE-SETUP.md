# Supabase Setup for Lumelle Orders

## 1. Grab the project credentials
- Dashboard: https://supabase.com/dashboard/project/tmsbyiwqzesmirbargxv
- Publishable key (anon): `sb_publishable_e0qvbW6GL0G_02IkjVLfng_dUPmSJd9`
- URL: `https://tmsbyiwqzesmirbargxv.supabase.co`

> Keep the actual values in `app/.env` (or `.env.local`) so they never end up in git history.

```
VITE_SUPABASE_URL=https://tmsbyiwqzesmirbargxv.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_e0qvbW6GL0G_02IkjVLfng_dUPmSJd9
```

## 2. Create the `orders` table
1. Open the Supabase SQL editor.
2. Paste the contents of `docs/supabase-orders.sql`.
3. Run the script — it creates the table, indexes, and enables RLS for future policies.

The schema matches the front-end `Order` type, so no mapping layer is needed. The `items` and `events` columns are `jsonb` arrays that store the cart snapshot + timeline.

> Planning the rest of the database? See `docs/SUPABASE-SCHEMA.md` for the full table blueprint and run `docs/supabase-full-schema.sql` if you want to create every table (creators, cohorts, payouts, content, etc.) in one go.

## 3. (Optional) Seed a demo order
```sql
insert into public.orders (id, "placedAt", status, items, subtotal, shipping, total, events)
values (
  'LUM-DEMO123',
  now(),
  'processing',
  '[{"id":"demo","title":"Creator drop","price":20,"qty":1}]',
  20,
  0,
  20,
  '[{"at": "' || now() || '", "message": "Order placed"}]'
);
```

## 4. Test the connection locally
1. Copy `app/.env.example` → `app/.env` and fill in the Supabase values.
2. `npm install` (already done once) then `npm run dev` from the repo root.
3. Place a test order via the checkout flow; it will insert into Supabase and redirect to `/order/:id/confirm`.
4. Visit `/account/orders` or `/order-tracking` and confirm the order loads from Supabase even after a refresh.

If Supabase is unreachable, the UI falls back to cached `localStorage` data and logs a console warning. Once connectivity returns the cache re-syncs automatically.

## 5. Sync Clerk users into Supabase
1. Run the SQL in `docs/supabase-customers.sql` to create the `customers` table that mirrors Clerk profile data.
2. No further configuration is required—once the table exists, every successful Clerk session automatically upserts the basic profile (id, first/last name, email, avatar, last_sign_in_at).
3. Use the table to power admin dashboards, enrich orders, or join with marketing tooling.

If the table is missing or Supabase is offline, the front-end logs a warning and retries after the next sign-in event.
