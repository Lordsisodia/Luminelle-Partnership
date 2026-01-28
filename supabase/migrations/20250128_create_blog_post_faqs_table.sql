-- Blog Post FAQs table
-- Stores frequently asked questions for blog posts
--
-- Separated into own table for easier querying and management
-- Supports FAQPage schema markup generation

-- Create blog_post_faqs table
create table if not exists public.blog_post_faqs (
  -- Primary identification
  id uuid primary key default gen_random_uuid(),

  -- References
  post_id uuid not null references public.blog_posts(id) on delete cascade,

  -- FAQ content
  question text not null,
  answer text not null,

  -- Display order (for multiple FAQs per post)
  order_index integer default 0,

  -- Optional: Link to related post (for FAQ cross-linking)
  related_post_id uuid references public.blog_posts(id) on delete set null,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Soft delete support
  deleted_at timestamptz
);

-- Create indexes for common queries
create index if not exists idx_blog_post_faqs_post_id on public.blog_post_faqs(post_id) where deleted_at is null;
create index if not exists idx_blog_post_faqs_order_index on public.blog_post_faqs(post_id, order_index) where deleted_at is null;

-- Add a full-text search index for questions and answers
create index if not exists idx_blog_post_faqs_question_search on public.blog_post_faqs using gin(to_tsvector('english', question));
create index if not exists idx_blog_post_faqs_answer_search on public.blog_post_faqs using gin(to_tsvector('english', answer));

-- Add comments for documentation
comment on table public.blog_post_faqs is 'Frequently asked questions for blog posts';
comment on column public.blog_post_faqs.post_id is 'Reference to blog post';
comment on column public.blog_post_faqs.question is 'FAQ question text';
comment on column public.blog_post_faqs.answer is 'FAQ answer text';
comment on column public.blog_post_faqs.order_index is 'Display order for FAQs within a post';
comment on column public.blog_post_faqs.related_post_id is 'Optional link to related blog post';
comment on column public.blog_post_faqs.deleted_at is 'Soft delete timestamp';

-- Enable Row Level Security
alter table public.blog_post_faqs enable row level security;

-- RLS Policies
-- Public can view FAQs for published posts
create policy "Public can view post FAQs" on public.blog_post_faqs for select
  using (
    exists (
      select 1 from public.blog_posts
      where blog_posts.id = blog_post_faqs.post_id
      and blog_posts.status = 'published'
      and blog_posts.deleted_at is null
    )
    and deleted_at is null
  );

-- Authenticated users can view all FAQs
create policy "Authenticated can view all FAQs" on public.blog_post_faqs for select
  using (auth.role() = 'authenticated');

-- Service role has full access
create policy "Service role full access" on public.blog_post_faqs for all
  using (auth.role() = 'service_role');

-- Create function to update updated_at
create or replace function public.update_blog_post_faqs_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Create trigger for updated_at
drop trigger if exists update_blog_post_faqs_updated_at on public.blog_post_faqs;
create trigger update_blog_post_faqs_updated_at
  before update on public.blog_post_faqs
  for each row
  execute function public.update_blog_post_faqs_updated_at();

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant all on public.blog_post_faqs to authenticated;
grant select on public.blog_post_faqs to anon;
