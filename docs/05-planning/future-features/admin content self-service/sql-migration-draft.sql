-- Admin content self-service schema (draft for staging)
-- Safe to run on staging; not applied to prod yet.
-- Assumes pgcrypto for gen_random_uuid()
create extension if not exists "pgcrypto";

-- Status enum
create type public.content_status as enum ('draft', 'in_review', 'published', 'archived');

-- Pages
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status content_status not null default 'draft',
  seo jsonb default '{}'::jsonb,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

-- Sections (per page)
create table public.sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  kind text not null,
  order_index integer not null default 0,
  data jsonb not null default '{}'::jsonb,
  status content_status not null default 'draft',
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  updated_by uuid
);
create index sections_page_order_idx on public.sections(page_id, order_index);

-- Products (mirrors Shopify handle/id but editable copy)
create table public.products (
  id uuid primary key default gen_random_uuid(),
  shopify_id text,
  handle text unique,
  title text not null,
  short_desc text,
  long_desc text,
  badges text[] default '{}',
  specs jsonb default '{}'::jsonb,
  faq jsonb default '[]'::jsonb,
  price numeric(12,2),
  status content_status not null default 'draft',
  seo jsonb default '{}'::jsonb,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

-- Product media
create table public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  path text not null,
  alt text not null,
  focal jsonb default '{}'::jsonb,
  sort integer not null default 0,
  is_primary boolean not null default false,
  status content_status not null default 'draft',
  created_at timestamptz not null default now()
);
create index product_media_product_sort_idx on public.product_media(product_id, sort);

-- Blogs
create table public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  status content_status not null default 'draft',
  hero_media_path text,
  tags text[] default '{}',
  canonical_url text,
  seo jsonb default '{}'::jsonb,
  publish_at timestamptz,
  published_at timestamptz,
  author_id uuid,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

-- Blog blocks (structured content)
create table public.blog_blocks (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.blogs(id) on delete cascade,
  sort integer not null default 0,
  type text not null,
  data jsonb not null default '{}'::jsonb
);
create index blog_blocks_blog_sort_idx on public.blog_blocks(blog_id, sort);

-- Globals (nav/footer/promo/default SEO/social)
create table public.globals (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

-- Versions (snapshots for rollback)
create table public.versions (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  snapshot jsonb not null,
  created_at timestamptz not null default now(),
  created_by uuid
);
create index versions_entity_idx on public.versions(entity_type, entity_id, created_at desc);

-- Audits (activity log)
create table public.audits (
  id uuid primary key default gen_random_uuid(),
  actor uuid,
  action text not null,
  entity_type text,
  entity_id uuid,
  diff jsonb,
  created_at timestamptz not null default now()
);
create index audits_entity_idx on public.audits(entity_type, entity_id, created_at desc);
create index audits_actor_idx on public.audits(actor, created_at desc);

-- RLS (staging draft) --------------------------------------------------
-- Assumes auth.jwt() contains app_metadata.roles array with 'admin'

alter table public.pages enable row level security;
alter table public.sections enable row level security;
alter table public.products enable row level security;
alter table public.product_media enable row level security;
alter table public.blogs enable row level security;
alter table public.blog_blocks enable row level security;
alter table public.globals enable row level security;
alter table public.versions enable row level security;
alter table public.audits enable row level security;

-- Admin-only access policies (staging)
create policy "admin all on pages"
  on public.pages for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on sections"
  on public.sections for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on products"
  on public.products for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on product_media"
  on public.product_media for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on blogs"
  on public.blogs for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on blog_blocks"
  on public.blog_blocks for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on globals"
  on public.globals for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on versions"
  on public.versions for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on audits"
  on public.audits for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');
