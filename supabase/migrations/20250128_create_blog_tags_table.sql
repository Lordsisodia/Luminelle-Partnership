-- Blog Tags table
-- Manages tags for flexible blog post categorization
--
-- Tags are secondary organizational structure - many-to-many with posts
-- Good for cross-cutting topics like "frizz-free", "beginner", etc.

-- Create blog_tags table
create table if not exists public.blog_tags (
  -- Primary identification
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,

  -- Basic tag info
  name text not null,
  description text,

  -- Display settings
  color text, -- Optional color for tag badges

  -- Content strategy
  is_featured boolean default false, -- Show in featured tags section

  -- Status
  is_active boolean default true,

  -- Metadata
  usage_count integer default 0, -- Cached count of how many posts use this tag

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Soft delete support
  deleted_at timestamptz
);

-- Create indexes for common queries
create index if not exists idx_blog_tags_slug on public.blog_tags(slug);
create index if not exists idx_blog_tags_name on public.blog_tags(name);
create index if not exists idx_blog_tags_is_active on public.blog_tags(is_active) where deleted_at is null;
create index if not exists idx_blog_tags_is_featured on public.blog_tags(is_featured) where is_featured = true and deleted_at is null;
create index if not exists idx_blog_tags_usage_count on public.blog_tags(usage_count desc) where is_active = true and deleted_at is null;

-- Add comments for documentation
comment on table public.blog_tags is 'Blog tags for flexible post categorization (many-to-many)';
comment on column public.blog_tags.slug is 'URL-friendly identifier';
comment on column public.blog_tags.name is 'Tag display name';
comment on column public.blog_tags.description is 'Tag description';
comment on column public.blog_tags.color is 'Optional color for tag badges';
comment on column public.blog_tags.is_featured is 'Whether to show in featured tags section';
comment on column public.blog_tags.is_active is 'Whether tag is active';
comment on column public.blog_tags.usage_count is 'Cached count of posts using this tag';
comment on column public.blog_tags.deleted_at is 'Soft delete timestamp';

-- Enable Row Level Security
alter table public.blog_tags enable row level security;

-- RLS Policies
-- Public can view active tags
create policy "Public can view active tags" on public.blog_tags for select
  using (is_active = true and deleted_at is null);

-- Authenticated users can view all tags
create policy "Authenticated can view all tags" on public.blog_tags for select
  using (auth.role() = 'authenticated');

-- Service role has full access
create policy "Service role full access" on public.blog_tags for all
  using (auth.role() = 'service_role');

-- Create function to update updated_at
create or replace function public.update_blog_tags_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Create trigger for updated_at
drop trigger if exists update_blog_tags_updated_at on public.blog_tags;
create trigger update_blog_tags_updated_at
  before update on public.blog_tags
  for each row
  execute function public.update_blog_tags_updated_at();

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant all on public.blog_tags to authenticated;
grant select on public.blog_tags to anon;
