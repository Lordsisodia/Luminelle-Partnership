-- Remove Temporary Migration Policies
-- After migration is complete, these temporary policies should be removed
--
-- Production RLS Policies Summary:
--
-- blog_posts:
--   - Public can view published posts (anon)
--   - Authenticated can view all posts
--   - Authenticated can insert/update
--   - Service role has full access
--
-- blog_authors, blog_categories, blog_tags:
--   - Public can view active records (anon)
--   - Authenticated can insert/update
--   - Service role has full access
--
-- blog_post_tags, blog_post_faqs:
--   - Public can view for published posts
--   - Authenticated can insert/update
--   - Service role has full access

-- Drop temporary anon policies
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_authors;
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_categories;
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_tags;
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_posts;
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_post_tags;
DROP POLICY IF EXISTS "Anon can insert during migration" ON public.blog_post_faqs;

DROP POLICY IF EXISTS "Anon can select during migration" ON public.blog_authors;
DROP POLICY IF EXISTS "Anon can select during migration" ON public.blog_categories;
DROP POLICY IF EXISTS "Anon can select during migration" ON public.blog_tags;
DROP POLICY IF EXISTS "Anon can select during migration" ON public.blog_posts;
