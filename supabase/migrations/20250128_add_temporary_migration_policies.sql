-- Temporary Migration Policies
-- These policies allow anon (migration script) to insert data during migration
-- After migration, these policies should be dropped

-- Drop existing migration policies if they exist
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_authors;
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_categories;
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_tags;
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_posts;
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_post_tags;
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_post_faqs;

-- Add temporary anon INSERT policies for migration
CREATE POLICY "Anon can insert during migration" ON public.blog_authors
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can insert during migration" ON public.blog_categories
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can insert during migration" ON public.blog_tags
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can insert during migration" ON public.blog_posts
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can insert during migration" ON public.blog_post_tags
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can insert during migration" ON public.blog_post_faqs
  FOR INSERT TO anon
  WITH CHECK (true);
