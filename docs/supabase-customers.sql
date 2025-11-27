-- Customers table that mirrors Clerk user metadata synced from the front-end
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
  updated_at timestamptz not null default now(),
  inserted_at timestamptz not null default now()
);

create index if not exists idx_customers_email on public.customers using btree (lower(email));

alter table public.customers enable row level security;
