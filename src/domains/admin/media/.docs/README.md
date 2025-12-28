# Admin Media
Purpose: Media library and asset management for admin users.

Route:
- /admin/media

Data sources:
- Storage bucket (Supabase/S3), metadata in Supabase tables (tbd).

Key modules:
- data/ (upload/list adapters), logic/ (grouping/sorting), hooks/ (view models), ui/pages (MediaPage).

Roadmap:
- Add upload pipeline, image transforms, permissions per role.
