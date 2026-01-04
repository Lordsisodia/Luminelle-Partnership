# Admin Blog
Purpose: Admin surfaces for blog list and detail management.

Routes:
- /admin/blogs, /admin/blogs/:slug

Data sources:
- Currently from `src/content/blog`; future CMS (Supabase cms_blogs + cms_blog_media).

Key modules:
- data/ (cms adapters), logic/ (filters/sort/draft transforms), hooks/ (view models), ui/pages (BlogsPage, BlogDetailPage).

Notes:
- EXTRA_PAGES.md tracks non-canonical admin pages.

Roadmap:
- Move page logic into hooks/logic, connect CMS, add publish workflow.
