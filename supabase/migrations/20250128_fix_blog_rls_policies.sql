-- Fix RLS policies for blog posts to allow authenticated users to insert/update
-- This fixes the migration script which uses anon key (no service role key in env)

-- Drop existing restrictive policies
drop policy if exists "Authenticated can view all posts" on public.blog_posts;
drop policy if exists "Service role full access" on public.blog_posts;

-- Add INSERT policy for authenticated users (for admin/migration)
create policy "Authenticated can insert posts" on public.blog_posts for insert
  with check (auth.role() = 'authenticated');

-- Add UPDATE policy for authenticated users (for admin)
create policy "Authenticated can update posts" on public.blog_posts for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Add DELETE policy for authenticated users (for admin)
create policy "Authenticated can delete posts" on public.blog_posts for delete
  using (auth.role() = 'authenticated');

-- Recreate SELECT policy for authenticated users to include drafts
create policy "Authenticated can view all posts" on public.blog_posts for select
  using (auth.role() = 'authenticated' and deleted_at is null);

-- Add similar policies for other blog tables
-- blog_authors
drop policy if exists "Service role full access" on public.blog_authors;
create policy "Authenticated can insert authors" on public.blog_authors for insert
  with check (auth.role() = 'authenticated');
create policy "Authenticated can update authors" on public.blog_authors for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
create policy "Authenticated can delete authors" on public.blog_authors for delete
  using (auth.role() = 'authenticated');

-- blog_categories
drop policy if exists "Service role full access" on public.blog_categories;
create policy "Authenticated can insert categories" on public.blog_categories for insert
  with check (auth.role() = 'authenticated');
create policy "Authenticated can update categories" on public.blog_categories for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
create policy "Authenticated can delete categories" on public.blog_categories for delete
  using (auth.role() = 'authenticated');

-- blog_tags
drop policy if exists "Service role full access" on public.blog_tags;
create policy "Authenticated can insert tags" on public.blog_tags for insert
  with check (auth.role() = 'authenticated');
create policy "Authenticated can update tags" on public.blog_tags for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
create policy "Authenticated can delete tags" on public.blog_tags for delete
  using (auth.role() = 'authenticated');

-- blog_post_tags (junction)
drop policy if exists "Service role full access" on public.blog_post_tags;
create policy "Authenticated can manage post tags" on public.blog_post_tags for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- blog_post_faqs
drop policy if exists "Service role full access" on public.blog_post_faqs;
create policy "Authenticated can manage faqs" on public.blog_post_faqs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
