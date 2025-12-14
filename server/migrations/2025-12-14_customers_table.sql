-- Unified customers table (Clerk + Shopify app usage)
-- This matches the schema expected by `api/_lib/customers.ts` and Cloudflare Functions `functions/_lib/customers.ts`.

create table if not exists public.customers (
  id text primary key,
  email text,
  first_name text,
  last_name text,
  full_name text,
  username text,
  phone text,
  avatar_url text,
  last_sign_in_at timestamptz,
  updated_at timestamptz,
  raw jsonb
);

create index if not exists customers_email_lower_idx on public.customers(lower(email));

