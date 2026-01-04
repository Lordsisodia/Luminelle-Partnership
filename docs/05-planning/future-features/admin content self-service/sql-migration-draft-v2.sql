-- Admin content self-service schema (v2, non-conflicting)
-- Uses cms_* table names to avoid existing tables (products etc).
create extension if not exists "pgcrypto";

create type public.cms_content_status as enum ('draft', 'in_review', 'published', 'archived');

create table public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status cms_content_status not null default 'draft',
  seo jsonb default '{}'::jsonb,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

create table public.cms_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.cms_pages(id) on delete cascade,
  kind text not null,
  order_index integer not null default 0,
  data jsonb not null default '{}'::jsonb,
  status cms_content_status not null default 'draft',
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  updated_by uuid
);
create index cms_sections_page_order_idx on public.cms_sections(page_id, order_index);

create table public.cms_products (
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
  status cms_content_status not null default 'draft',
  seo jsonb default '{}'::jsonb,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

create table public.cms_product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.cms_products(id) on delete cascade,
  path text not null,
  alt text not null,
  focal jsonb default '{}'::jsonb,
  sort integer not null default 0,
  is_primary boolean not null default false,
  status cms_content_status not null default 'draft',
  created_at timestamptz not null default now()
);
create index cms_product_media_product_sort_idx on public.cms_product_media(product_id, sort);

create table public.cms_blogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  status cms_content_status not null default 'draft',
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

create table public.cms_blog_blocks (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.cms_blogs(id) on delete cascade,
  sort integer not null default 0,
  type text not null,
  data jsonb not null default '{}'::jsonb
);
create index cms_blog_blocks_blog_sort_idx on public.cms_blog_blocks(blog_id, sort);

create table public.cms_globals (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

create table public.cms_versions (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  snapshot jsonb not null,
  created_at timestamptz not null default now(),
  created_by uuid
);
create index cms_versions_entity_idx on public.cms_versions(entity_type, entity_id, created_at desc);

create table public.cms_audits (
  id uuid primary key default gen_random_uuid(),
  actor uuid,
  action text not null,
  entity_type text,
  entity_id uuid,
  diff jsonb,
  created_at timestamptz not null default now()
);
create index cms_audits_entity_idx on public.cms_audits(entity_type, entity_id, created_at desc);
create index cms_audits_actor_idx on public.cms_audits(actor, created_at desc);

-- RLS (admin-only)
do $$
begin
  perform 1;
exception when others then null;
end$$;

alter table public.cms_pages enable row level security;
alter table public.cms_sections enable row level security;
alter table public.cms_products enable row level security;
alter table public.cms_product_media enable row level security;
alter table public.cms_blogs enable row level security;
alter table public.cms_blog_blocks enable row level security;
alter table public.cms_globals enable row level security;
alter table public.cms_versions enable row level security;
alter table public.cms_audits enable row level security;

create policy "admin all on cms_pages"
  on public.cms_pages for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on cms_sections"
  on public.cms_sections for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on cms_products"
  on public.cms_products for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on cms_product_media"
  on public.cms_product_media for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on cms_blogs"
  on public.cms_blogs for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on cms_blog_blocks"
  on public.cms_blog_blocks for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on cms_globals"
  on public.cms_globals for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on cms_versions"
  on public.cms_versions for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');

create policy "admin all on cms_audits"
  on public.cms_audits for all
  using ((auth.jwt()->'app_metadata'->'roles') ? 'admin')
  with check ((auth.jwt()->'app_metadata'->'roles') ? 'admin');
