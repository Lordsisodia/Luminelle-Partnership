-- Blog Categories table
-- Manages blog post categories with hierarchical support (nested categories)
--
-- Categories are the primary organizational structure for blog posts
-- Each post belongs to one category

-- Create blog_categories table
create table if not exists public.blog_categories (
  -- Primary identification
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,

  -- Basic category info
  name text not null,
  description text,

  -- Hierarchical structure (parent/child categories)
  parent_id uuid references public.blog_categories(id) on delete set null,

  -- Display settings
  color text, -- Brand color for category badges (e.g., "#E8B4B8")
  icon text, -- Icon name or emoji

  -- SEO
  meta_title text,
  meta_description text,
  og_image_url text,

  -- Content strategy
  is_pillar boolean default false, -- Is this a pillar content category?
  pillar_content_url text, -- Link to main pillar post

  -- Status
  is_active boolean default true,

  -- Metadata
  display_order integer, -- For ordering in navigation

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Soft delete support
  deleted_at timestamptz
);

-- Create indexes for common queries
create index if not exists idx_blog_categories_slug on public.blog_categories(slug);
create index if not exists idx_blog_categories_name on public.blog_categories(name);
create index if not exists idx_blog_categories_parent_id on public.blog_categories(parent_id) where deleted_at is null;
create index if not exists idx_blog_categories_is_active on public.blog_categories(is_active) where deleted_at is null;
create index if not exists idx_blog_categories_is_pillar on public.blog_categories(is_pillar) where is_pillar = true and deleted_at is null;
create index if not exists idx_blog_categories_display_order on public.blog_categories(display_order) where deleted_at is null;

-- Add comments for documentation
comment on table public.blog_categories is 'Blog post categories with hierarchical support';
comment on column public.blog_categories.slug is 'URL-friendly identifier';
comment on column public.blog_categories.name is 'Category display name';
comment on column public.blog_categories.description is 'Category description for category pages';
comment on column public.blog_categories.parent_id is 'Parent category ID for nested categories';
comment on column public.blog_categories.color is 'Brand color hex code for UI badges';
comment on column public.blog_categories.icon is 'Icon name or emoji';
comment on column public.blog_categories.is_pillar is 'Whether this is a pillar content category (major topic)';
comment on column public.blog_categories.pillar_content_url is 'Link to main pillar post for this category';
comment on column public.blog_categories.is_active is 'Whether category is active';
comment on column public.blog_categories.display_order is 'Display order in navigation';
comment on column public.blog_categories.deleted_at is 'Soft delete timestamp';

-- Enable Row Level Security
alter table public.blog_categories enable row level security;

-- RLS Policies
-- Public can view active categories
create policy "Public can view active categories" on public.blog_categories for select
  using (is_active = true and deleted_at is null);

-- Authenticated users can view all categories
create policy "Authenticated can view all categories" on public.blog_categories for select
  using (auth.role() = 'authenticated');

-- Service role has full access
create policy "Service role full access" on public.blog_categories for all
  using (auth.role() = 'service_role');

-- Create function to update updated_at
create or replace function public.update_blog_categories_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Create trigger for updated_at
drop trigger if exists update_blog_categories_updated_at on public.blog_categories;
create trigger update_blog_categories_updated_at
  before update on public.blog_categories
  for each row
  execute function public.update_blog_categories_updated_at();

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant all on public.blog_categories to authenticated;
grant select on public.blog_categories to anon;
