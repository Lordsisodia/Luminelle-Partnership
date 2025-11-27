-- Orders table to mirror the front-end Order type
create table if not exists public.orders (
  id text primary key,
  "placedAt" timestamptz not null,
  status text not null check (status in ('processing', 'shipped', 'delivered', 'cancelled')),
  items jsonb not null,
  subtotal numeric(12,2) not null,
  shipping numeric(12,2) not null,
  total numeric(12,2) not null,
  events jsonb not null,
  tracking text,
  inserted_at timestamptz not null default now()
);

-- Optional index for quick lookups by created timestamp
create index if not exists idx_orders_placed_at on public.orders using brin ("placedAt");

-- Helpful if you ever join on status
create index if not exists idx_orders_status on public.orders (status);

-- Enable RLS so future auth rules can be layered in (policies can be added later)
alter table public.orders enable row level security;
