-- Blog Authors table
-- Manages blog post authors with bios, avatars, and social links
--
-- This table stores author information separate from user profiles
-- to allow for guest authors and more detailed public-facing bios

-- Create blog_authors table
create table if not exists public.blog_authors (
  -- Primary identification
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,

  -- Basic author info
  display_name text not null,
  bio text,
  avatar_url text,

  -- Professional details
  role text,
  expertise text[], -- Array of expertise areas (e.g., ['hair care', 'protective styles'])

  -- Social media links (for author byline)
  social_twitter_url text,
  social_instagram_url text,
  social_tiktok_url text,
  social_youtube_url text,
  website_url text,

  -- Optional: Link to user profile if author is also a registered user
  user_id uuid references auth.users(id) on delete set null,

  -- SEO
  meta_title text,
  meta_description text,

  -- Status
  is_active boolean default true,

  -- Metadata
  featured_index integer, -- For ordering featured authors

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Soft delete support
  deleted_at timestamptz
);

-- Create indexes for common queries
create index if not exists idx_blog_authors_slug on public.blog_authors(slug);
create index if not exists idx_blog_authors_display_name on public.blog_authors(display_name);
create index if not exists idx_blog_authors_is_active on public.blog_authors(is_active) where deleted_at is null;
create index if not exists idx_blog_authors_featured on public.blog_authors(featured_index) where is_active = true and deleted_at is null;
create index if not exists idx_blog_authors_created_at on public.blog_authors(created_at desc);

-- Create GIN index for expertise array search
create index if not exists idx_blog_authors_expertise on public.blog_authors using gin(expertise);

-- Add comments for documentation
comment on table public.blog_authors is 'Blog post authors with bios, avatars, and social links';
comment on column public.blog_authors.slug is 'URL-friendly identifier for author pages';
comment on column public.blog_authors.display_name is 'Public display name shown on posts';
comment on column public.blog_authors.bio is 'Author biography for author page';
comment on column public.blog_authors.avatar_url is 'URL to author image in Supabase Storage';
comment on column public.blog_authors.role is 'Author title or role (e.g., "Hair Care Expert")';
comment on column public.blog_authors.expertise is 'Array of expertise topics for categorization';
comment on column public.blog_authors.user_id is 'Optional link to authenticated user account';
comment on column public.blog_authors.featured_index is 'Ordering index for featured authors section';
comment on column public.blog_authors.is_active is 'Whether author is active and should be displayed';
comment on column public.blog_authors.deleted_at is 'Soft delete timestamp';

-- Enable Row Level Security
alter table public.blog_authors enable row level security;

-- RLS Policies
-- Public can view active authors
create policy "Public can view active authors" on public.blog_authors for select
  using (is_active = true and deleted_at is null);

-- Authenticated users can view all authors (for admin)
create policy "Authenticated can view all authors" on public.blog_authors for select
  using (auth.role() = 'authenticated');

-- Service role has full access
create policy "Service role full access" on public.blog_authors for all
  using (auth.role() = 'service_role');

-- Create function to update updated_at
create or replace function public.update_blog_authors_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Create trigger for updated_at
drop trigger if exists update_blog_authors_updated_at on public.blog_authors;
create trigger update_blog_authors_updated_at
  before update on public.blog_authors
  for each row
  execute function public.update_blog_authors_updated_at();

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant all on public.blog_authors to authenticated;
grant select on public.blog_authors to anon;
