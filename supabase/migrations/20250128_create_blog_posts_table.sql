-- Blog Posts table
-- Main content storage for blog posts with flexible JSON structure
--
-- Content is stored as jsonb for maximum flexibility while maintaining queryability
-- Supports sections, FAQs, product cards, and rich metadata

-- Create blog_posts table
create table if not exists public.blog_posts (
  -- Primary identification
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,

  -- Basic post info
  title text not null,
  subtitle text,
  excerpt text,

  -- Content (flexible JSON structure)
  content jsonb not null default '[]'::jsonb, -- Array of content sections
  body text, -- Optional raw markdown/HTML body

  -- Categorization
  category_id uuid references public.blog_categories(id) on delete set null,
  author_id uuid references public.blog_authors(id) on delete restrict,

  -- Display
  cover_image_url text,
  og_image_url text, -- Open Graph image (can differ from cover)

  -- SEO
  meta_title text,
  meta_description text,
  meta_keywords text[], -- Array of keywords
  schema_markup jsonb, -- Article, BlogPosting, FAQPage schemas
  primary_keyword text,
  secondary_keywords text[],
  intent text check (intent in ('informational', 'how-to', 'comparison', 'commercial', 'navigational')),

  -- Content strategy
  pillar_cluster text, -- Which content cluster this belongs to
  is_pillar boolean default false, -- Is this a pillar post?
  is_featured boolean default false, -- Show in featured section
  featured_index integer, -- Order in featured section

  -- Reading experience
  read_time_minutes integer, -- Estimated reading time
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),

  -- Product integration
  related_product_id uuid, -- Link to main product if applicable
  product_card jsonb, -- Embedded product card data

  -- Publishing
  status text default 'draft' check (status in ('draft', 'published', 'scheduled', 'archived')),
  published_at timestamptz,
  scheduled_for timestamptz,
  reviewed_at timestamptz,
  updated_review_at timestamptz, -- Last content review date

  -- CTA
  cta_target text, -- Call-to-action destination
  cta_text text, -- Custom CTA text

  -- Engagement
  view_count integer default 0,
  like_count integer default 0,
  comment_count integer default 0,

  -- Internal linking
  related_post_ids uuid[], -- Array of related post IDs
  internal_links jsonb, -- Structured internal link data

  -- Author links
  author_link text, -- Author's personal website link
  author_role_long text, -- Extended author role description

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  first_published_at timestamptz, -- Never changes after first publish

  -- Soft delete support
  deleted_at timestamptz
);

-- Create indexes for common queries
create index if not exists idx_blog_posts_slug on public.blog_posts(slug);
create index if not exists idx_blog_posts_title on public.blog_posts(title);
create index if not exists idx_blog_posts_status on public.blog_posts(status) where deleted_at is null;
create index if not exists idx_blog_posts_category_id on public.blog_posts(category_id) where deleted_at is null;
create index if not exists idx_blog_posts_author_id on public.blog_posts(author_id) where deleted_at is null;
create index if not exists idx_blog_posts_published_at on public.blog_posts(published_at desc) where status = 'published' and deleted_at is null;
create index if not exists idx_blog_posts_created_at on public.blog_posts(created_at desc) where deleted_at is null;
create index if not exists idx_blog_posts_is_featured on public.blog_posts(is_featured, featured_index) where is_featured = true and status = 'published' and deleted_at is null;
create index if not exists idx_blog_posts_is_pillar on public.blog_posts(is_pillar) where is_pillar = true and status = 'published' and deleted_at is null;
create index if not exists idx_blog_posts_view_count on public.blog_posts(view_count desc) where status = 'published' and deleted_at is null;

-- Create GIN index for jsonb content searching
create index if not exists idx_blog_posts_content on public.blog_posts using gin(content);
create index if not exists idx_blog_posts_schema_markup on public.blog_posts using gin(schema_markup);

-- Create GIN index for keyword arrays
create index if not exists idx_blog_posts_meta_keywords on public.blog_posts using gin(meta_keywords);
create index if not exists idx_blog_posts_secondary_keywords on public.blog_posts using gin(secondary_keywords);

-- Add comments for documentation
comment on table public.blog_posts is 'Blog posts with flexible JSON content structure';
comment on column public.blog_posts.slug is 'URL-friendly identifier (unique)';
comment on column public.blog_posts.title is 'Post title';
comment on column public.blog_posts.subtitle is 'Post subtitle/deck';
comment on column public.blog_posts.excerpt is 'Short summary for cards and meta description';
comment on column public.blog_posts.content is 'JSON array of content sections (headings, paragraphs, images, etc.)';
comment on column public.blog_posts.body is 'Optional raw markdown/HTML body';
comment on column public.blog_posts.category_id is 'Primary category';
comment on column public.blog_posts.author_id is 'Post author';
comment on column public.blog_posts.cover_image_url is 'Featured image URL';
comment on column public.blog_posts.og_image_url is 'Open Graph image (social sharing)';
comment on column public.blog_posts.meta_title is 'SEO title (50-60 chars)';
comment on column public.blog_posts.meta_description is 'SEO description (150-160 chars)';
comment on column public.blog_posts.meta_keywords is 'Array of SEO keywords';
comment on column public.blog_posts.schema_markup is 'JSON-LD schema markup (Article, FAQPage, etc.)';
comment on column public.blog_posts.primary_keyword is 'Primary SEO keyword';
comment on column public.blog_posts.secondary_keywords is 'Array of secondary keywords';
comment on column public.blog_posts.intent is 'Search intent: informational, how-to, comparison, commercial, navigational';
comment on column public.blog_posts.pillar_cluster is 'Content cluster identifier (e.g., "Frizz-Free Hair")';
comment on column public.blog_posts.is_pillar is 'Is this a pillar content post?';
comment on column public.blog_posts.is_featured is 'Show in featured section';
comment on column public.blog_posts.featured_index is 'Order in featured section';
comment on column public.blog_posts.read_time_minutes is 'Estimated reading time';
comment on column public.blog_posts.difficulty is 'Difficulty level: beginner, intermediate, advanced';
comment on column public.blog_posts.related_product_id is 'Link to main product';
comment on column public.blog_posts.product_card is 'Embedded product card data';
comment on column public.blog_posts.status is 'Publication status: draft, published, scheduled, archived';
comment on column public.blog_posts.published_at is 'Publication date';
comment on column public.blog_posts.scheduled_for is 'Scheduled publication date';
comment on column public.blog_posts.reviewed_at is 'Initial content review date';
comment on column public.blog_posts.updated_review_at is 'Last content review date';
comment on column public.blog_posts.cta_target is 'Call-to-action destination URL';
comment on column public.blog_posts.cta_text is 'Custom CTA button text';
comment on column public.blog_posts.view_count is 'Cached view count';
comment on column public.blog_posts.like_count is 'Cached like count';
comment on column public.blog_posts.comment_count is 'Cached comment count';
comment on column public.blog_posts.related_post_ids is 'Array of related post IDs';
comment on column public.blog_posts.internal_links is 'Structured internal link data';
comment on column public.blog_posts.first_published_at is 'First publication date (never changes)';
comment on column public.blog_posts.deleted_at is 'Soft delete timestamp';

-- Enable Row Level Security
alter table public.blog_posts enable row level security;

-- RLS Policies
-- Public can view published posts
create policy "Public can view published posts" on public.blog_posts for select
  using (status = 'published' and deleted_at is null);

-- Authenticated users can view all non-deleted posts (for admin)
create policy "Authenticated can view all posts" on public.blog_posts for select
  using (auth.role() = 'authenticated' and deleted_at is null);

-- Service role has full access
create policy "Service role full access" on public.blog_posts for all
  using (auth.role() = 'service_role');

-- Create function to update updated_at
create or replace function public.update_blog_posts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();

  -- Set first_published_at on initial publish
  if new.status = 'published' and old.status is distinct from 'published' and new.first_published_at is null then
    new.first_published_at := now();
  end if;

  return new;
end;
$$;

-- Create trigger for updated_at
drop trigger if exists update_blog_posts_updated_at on public.blog_posts;
create trigger update_blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.update_blog_posts_updated_at();

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant all on public.blog_posts to authenticated;
grant select on public.blog_posts to anon;
