# How to run the staging migration (when ready)

Prereqs:
- Staging Supabase project ref and service role key (do **not** use prod).
- Supabase CLI installed and linked, or access via Lumelle Supabase MCP.
- SQL file: `docs/05-planning/future-features/admin content self-service/sql-migration-draft.sql`.

### Option A: Supabase CLI (staging)
1) Export env vars (staging):
   ```bash
   export SUPABASE_URL=https://<staging>.supabase.co
   export SUPABASE_SERVICE_ROLE_KEY=<staging-service-role>
   ```
2) Run migration:
   ```bash
   supabase db execute --file "docs/05-planning/future-features/admin content self-service/sql-migration-draft.sql"
   ```

### Option B: Lumelle Supabase MCP
Provide the staging project ref and service role to the assistant, then request:
- Apply `sql-migration-draft.sql` to staging.

### Post-checks (staging)
- Tables/enums exist: pages, sections, products, product_media, blogs, blog_blocks, globals, versions, audits, content_status.
- RLS enabled and admin policy present on each table.
- Test with admin JWT: can insert/select; non-admin blocked.

### Do NOT
- Do not run on prod until sign-off.
- Do not place service role in client bundles; use CLI or secure MCP only.
