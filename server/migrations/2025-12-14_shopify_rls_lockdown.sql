-- Lock down Shopify sync tables (PII + tokens) via RLS.
--
-- These tables are written/read by server-only code (Cloudflare Pages Functions / Workers) using the
-- Supabase `service_role` key, which bypasses RLS.
--
-- Important: Without RLS, these tables would be accessible via the public Supabase anon key.

alter table public."ShopOrders" enable row level security;
alter table public."ShopCustomers" enable row level security;
alter table public."ShopWebhookDeliveries" enable row level security;
alter table public."Session" enable row level security;

