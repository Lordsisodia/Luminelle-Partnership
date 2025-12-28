# Admin Pages
Purpose: Manage static/extra pages in the admin.

Route:
- /admin/pages

Data sources:
- CMS (Supabase cms_pages or equivalent), static content.

Key modules:
- ui/pages (PagesPage, ContentPage, GlobalsPage), add data/logic/hooks as wiring lands.

Roadmap:
- Define schema, add draft/publish flow, remove or relocate legacy extras if unused.
