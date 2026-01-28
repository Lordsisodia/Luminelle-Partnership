-- Blog Post Tags junction table
-- Many-to-many relationship between posts and tags
--
-- Allows posts to have multiple tags and tags to be used across multiple posts

-- Create blog_post_tags table
create table if not exists public.blog_post_tags (
  -- Composite primary key
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,

  -- Timestamps
  created_at timestamptz default now(),

  -- Primary key constraint (prevents duplicate tag assignments)
  primary key (post_id, tag_id)
);

-- Create indexes for common queries
create index if not exists idx_blog_post_tags_post_id on public.blog_post_tags(post_id);
create index if not exists idx_blog_post_tags_tag_id on public.blog_post_tags(tag_id);

-- Add comments for documentation
comment on table public.blog_post_tags is 'Junction table for many-to-many relationship between posts and tags';
comment on column public.blog_post_tags.post_id is 'Reference to blog post';
comment on column public.blog_post_tags.tag_id is 'Reference to tag';

-- Enable Row Level Security
alter table public.blog_post_tags enable row level security;

-- RLS Policies
-- Public can view tags for published posts
create policy "Public can view post tags" on public.blog_post_tags for select
  using (
    exists (
      select 1 from public.blog_posts
      where blog_posts.id = blog_post_tags.post_id
      and blog_posts.status = 'published'
      and blog_posts.deleted_at is null
    )
  );

-- Authenticated users can view all post tags
create policy "Authenticated can view all post tags" on public.blog_post_tags for select
  using (auth.role() = 'authenticated');

-- Service role has full access
create policy "Service role full access" on public.blog_post_tags for all
  using (auth.role() = 'service_role');

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant all on public.blog_post_tags to authenticated;
grant select on public.blog_post_tags to anon;
