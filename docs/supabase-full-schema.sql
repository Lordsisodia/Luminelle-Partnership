-- Lumelle Supabase full schema
-- Run this in the SQL editor (or via supabase cli) after linking the project.

create extension if not exists "pgcrypto";

----------------------------------------------------------------
-- Cohorts
----------------------------------------------------------------
create table if not exists public.cohorts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brief_url text,
  whatsapp_group_url text,
  capacity integer not null default 250,
  status text not null default 'active',
  start_at timestamptz,
  end_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.cohorts enable row level security;
drop policy if exists "cohorts service role" on public.cohorts;
create policy "cohorts service role" on public.cohorts for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_cohorts_status on public.cohorts(status);

----------------------------------------------------------------
-- Creators + intake
----------------------------------------------------------------
create table if not exists public.creators (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text unique,
  email text,
  tiktok_handle text unique,
  instagram_handle text,
  audience_size_band text,
  status text not null default 'invited' check (status in ('invited','active','paused','archived')),
  cohort_id uuid references public.cohorts(id) on delete set null,
  joined_whatsapp_at timestamptz,
  invite_source text,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.creators enable row level security;
drop policy if exists "creators service role" on public.creators;
create policy "creators service role" on public.creators for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_creators_cohort on public.creators(cohort_id);

create table if not exists public.creator_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  tiktok_handle text,
  instagram_handle text,
  audience_size_band text,
  heard_from text,
  notes text,
  status text not null default 'submitted' check (status in ('submitted','reviewing','accepted','rejected')),
  submitted_at timestamptz not null default timezone('utc', now()),
  processed_by text,
  processed_at timestamptz
);

alter table public.creator_applications enable row level security;
drop policy if exists "creator applications service role" on public.creator_applications;
create policy "creator applications service role" on public.creator_applications for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create unique index if not exists idx_creator_applications_phone_tiktok on public.creator_applications (phone, tiktok_handle);

create table if not exists public.creator_cohort_activity (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators(id) on delete cascade,
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  event_type text not null check (event_type in ('joined','left','resource_view','note')),
  metadata jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.creator_cohort_activity enable row level security;
drop policy if exists "creator cohort activity service role" on public.creator_cohort_activity;
create policy "creator cohort activity service role" on public.creator_cohort_activity for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_creator_cohort on public.creator_cohort_activity(creator_id, cohort_id);

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
  updated_at timestamptz
);

alter table public.customers enable row level security;
drop policy if exists "customers service role" on public.customers;
create policy "customers self manage" on public.customers
  for all using (id = auth.jwt()->>'sub') with check (id = auth.jwt()->>'sub');

create index if not exists idx_customers_email on public.customers(email);

----------------------------------------------------------------
-- Products & commerce
----------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  title text not null,
  description text,
  price numeric(12,2) not null check (price >= 0),
  image_url text,
  tags text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.products enable row level security;
drop policy if exists "products service role" on public.products;
create policy "products service role" on public.products for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_products_active on public.products(is_active);

-- Orders: augment existing table if needed
create table if not exists public.orders (
  id text primary key,
  "placedAt" timestamptz not null,
  status text not null default 'processing' check (status in ('processing','shipped','delivered','cancelled')),
  items jsonb not null,
  subtotal numeric(12,2) not null,
  shipping numeric(12,2) not null,
  total numeric(12,2) not null,
  events jsonb not null,
  tracking text,
  inserted_at timestamptz not null default timezone('utc', now())
);

alter table public.orders enable row level security;
drop policy if exists "orders service role" on public.orders;
create policy "orders service role" on public.orders for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_orders_placed_at on public.orders using brin("placedAt");

alter table public.orders add column if not exists creator_id uuid references public.creators(id) on delete set null;
alter table public.orders add column if not exists source text default 'checkout_demo' check (source in ('checkout_demo','shopify','manual'));
alter table public.orders add column if not exists fulfillment_status text;
alter table public.orders add column if not exists ship_date timestamptz;
alter table public.orders add column if not exists cancel_reason text;
alter table public.orders add column if not exists commission_rate numeric(5,2);

create index if not exists idx_orders_creator on public.orders(creator_id);
create index if not exists idx_orders_fulfillment_status on public.orders(fulfillment_status);
create index if not exists idx_orders_source on public.orders(source);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  sku text,
  title text,
  unit_price numeric(12,2) not null,
  qty integer not null,
  subtotal numeric(12,2) generated always as (unit_price * qty) stored
);

alter table public.order_items enable row level security;
drop policy if exists "order items service role" on public.order_items;
create policy "order items service role" on public.order_items for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_order_items_order on public.order_items(order_id);
create index if not exists idx_order_items_product on public.order_items(product_id);

----------------------------------------------------------------
-- Earnings & payouts
----------------------------------------------------------------
create table if not exists public.payout_batches (
  id uuid primary key default gen_random_uuid(),
  period_start date not null,
  period_end date not null,
  issued_at timestamptz,
  method text not null default 'bank_transfer',
  reference text,
  total_amount numeric(12,2),
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.payout_batches enable row level security;
drop policy if exists "payout batches service role" on public.payout_batches;
create policy "payout batches service role" on public.payout_batches for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create unique index if not exists idx_payout_batches_period on public.payout_batches(period_start, period_end);

create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  order_id text not null references public.orders(id) on delete cascade,
  order_item_id uuid references public.order_items(id) on delete set null,
  creator_id uuid not null references public.creators(id) on delete cascade,
  amount numeric(12,2) not null,
  rate numeric(5,2),
  status text not null default 'pending' check (status in ('pending','approved','paid','hold')),
  payout_batch_id uuid references public.payout_batches(id) on delete set null,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.commissions enable row level security;
drop policy if exists "commissions service role" on public.commissions;
create policy "commissions service role" on public.commissions for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_commissions_creator on public.commissions(creator_id);
create index if not exists idx_commissions_status on public.commissions(status);
create index if not exists idx_commissions_payout on public.commissions(payout_batch_id);

create table if not exists public.compliance_documents (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators(id) on delete cascade,
  type text not null check (type in ('w9','invoice','id_verification')),
  file_url text not null,
  verified_at timestamptz,
  uploaded_by text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.compliance_documents enable row level security;
drop policy if exists "compliance docs service role" on public.compliance_documents;
create policy "compliance docs service role" on public.compliance_documents for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create unique index if not exists idx_compliance_creator_type on public.compliance_documents(creator_id, type);

----------------------------------------------------------------
-- Content & engagement
----------------------------------------------------------------
create table if not exists public.content_assets (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid references public.cohorts(id) on delete set null,
  title text not null,
  type text not null check (type in ('brief','script','footage','template')),
  url text not null,
  version integer not null default 1,
  is_published boolean not null default false,
  updated_by text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.content_assets enable row level security;
drop policy if exists "content assets service role" on public.content_assets;
create policy "content assets service role" on public.content_assets for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_content_assets_publish on public.content_assets(cohort_id, type, is_published);

create table if not exists public.leaderboard_snapshots (
  id uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null,
  metric text not null,
  creator_id uuid not null references public.creators(id) on delete cascade,
  rank integer,
  value numeric,
  notes text
);

alter table public.leaderboard_snapshots enable row level security;
drop policy if exists "leaderboard snapshots service role" on public.leaderboard_snapshots;
create policy "leaderboard snapshots service role" on public.leaderboard_snapshots for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_leaderboard_metric on public.leaderboard_snapshots(metric, captured_at);
create index if not exists idx_leaderboard_creator on public.leaderboard_snapshots(creator_id);

create table if not exists public.tracking_events (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.creators(id) on delete set null,
  event_name text not null,
  page text,
  session_id text,
  metadata jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.tracking_events enable row level security;
drop policy if exists "tracking events service role" on public.tracking_events;
create policy "tracking events service role" on public.tracking_events for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_tracking_events_created on public.tracking_events using brin(created_at);
create index if not exists idx_tracking_events_event on public.tracking_events(event_name, created_at);
create index if not exists idx_tracking_events_metadata on public.tracking_events using gin(metadata);

create table if not exists public.whatsapp_groups (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid references public.cohorts(id) on delete cascade,
  label text not null,
  invite_url text not null,
  capacity integer not null default 250,
  current_members integer not null default 0,
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.whatsapp_groups enable row level security;
drop policy if exists "whatsapp groups service role" on public.whatsapp_groups;
create policy "whatsapp groups service role" on public.whatsapp_groups for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_whatsapp_groups_cohort on public.whatsapp_groups(cohort_id, status);

----------------------------------------------------------------
-- Ops utilities
----------------------------------------------------------------
create table if not exists public.feature_flags (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.feature_flags enable row level security;
drop policy if exists "feature flags service role" on public.feature_flags;
create policy "feature flags service role" on public.feature_flags for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor text,
  action text not null,
  target_table text,
  target_id text,
  payload jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.audit_logs enable row level security;
drop policy if exists "audit logs service role" on public.audit_logs;
create policy "audit logs service role" on public.audit_logs for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_audit_target on public.audit_logs(target_table, target_id);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.creators(id) on delete set null,
  channel text not null check (channel in ('email','sms','whatsapp')),
  template text not null,
  payload jsonb,
  status text not null default 'queued' check (status in ('queued','sent','failed','cancelled')),
  error text,
  scheduled_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.notifications enable row level security;
drop policy if exists "notifications service role" on public.notifications;
create policy "notifications service role" on public.notifications for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists idx_notifications_status on public.notifications(status);
create index if not exists idx_notifications_schedule on public.notifications(scheduled_at);
