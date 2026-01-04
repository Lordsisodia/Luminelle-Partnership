# Admin Content Self‑Service – Status (as of Dec 14 2025)

This doc captures:
- Where the admin UI is at in the app today.
- How to make a Clerk user an admin (so you can test `/admin`).
- What to build next when we come back.

---

## What’s done (Supabase / staging foundation)
- Schema: `cms_*` tables exist and are RLS‑protected (admin-only policies). Key tables: `cms_pages`, `cms_sections`, `cms_products`, `cms_product_media`, `cms_blogs`, `cms_blog_blocks`, `cms_globals`, `cms_versions`, `cms_audits`.
- Enums: `cms_content_status` (`draft`, `in_review`, `published`, `archived`).
- Storage buckets: `public-media`, `product-media`, `blog-media` (public read) and `draft-media` (admin-only).
- Edge Functions deployed (staging): `preview-content`, `publish-content`, `rollback-content` (admin-role protected via JWT claims).
- Seed content exists (draft): a `home` page + sections; example product/blog/globals.

---

## What’s done (app wiring / admin UI)
- Admin root exists at `/admin` and is nested under the Clerk shell (`src/App.tsx`).
- `AdminShell` layout exists (sidebar + mobile nav) and sets `noindex/nofollow` (`src/domains/admin/ui/layouts/AdminShell.tsx`).
- `AdminGuard` exists:
  - Primary gate: Clerk JWT template `supabase` → reads `app_metadata.roles` and requires `"admin"`.
  - Dev-only fallback: `VITE_ADMIN_EMAILS` allowlist can open the UI **only in DEV** (does not bypass Supabase RLS).
  - Implementation: `src/domains/admin/ui/components/AdminGuard.tsx`.
- First real admin screen is wired: `/admin/pages`:
  - Reads `cms_pages` via Supabase with the Clerk JWT bearer token.
  - Shows a “Connection check” panel (Supabase host + detected roles + visible row count).
  - Can create a page row (slug/title) in `cms_pages`.
  - Can call `preview-content` Edge Function to verify the end-to-end chain (Clerk JWT → Supabase RLS → Edge Function auth).
  - Implementation: `src/domains/admin/ui/pages/PagesPage.tsx`.

---

## How to make a Clerk user an admin (recommended)

Goal: ensure the Clerk JWT template `supabase` includes `app_metadata.roles: ["admin"]`.
This is required because:
- `/admin` UI gate checks it (AdminGuard).
- Supabase RLS policies + Edge Functions also check it.

### Step A — set the user’s Public metadata roles
In Clerk Dashboard:
- Users → open the user → **Edit public metadata**
- Set:

```json
{
  "roles": ["admin"]
}
```

### Step B — configure the Clerk JWT template `supabase`
In Clerk Dashboard:
- Configure → JWT Templates → template named `supabase`
- Claims JSON: ensure it includes (merge into existing JSON):

```json
{
  "app_metadata": {
    "roles": "{{user.public_metadata.roles}}"
  }
}
```

### Step C — refresh session/token
- Sign out + sign in again (or hard refresh).
- This ensures the newly-issued token includes the updated `app_metadata.roles`.

### Step D — verify in the app
- Visit `/admin/pages`
- In the “Connection check” panel, confirm:
  - “Roles: admin”
  - “RLS status: OK …”

---

## Optional: CLI script to grant admin role by email

If you don’t want to click around the dashboard, a helper script exists:
- Script: `scripts/clerk-grant-admin.mjs`
- NPM script: `npm run clerk:grant-admin -- <email>`

Example:
```bash
CLERK_SECRET_KEY=sk_... npm run clerk:grant-admin -- fuzeheritage@gmail.com
```

Notes:
- Requires `CLERK_SECRET_KEY` (Clerk Dashboard → API keys → Secret key).
- This updates `public_metadata.roles` for that user (defaults to adding `"admin"`).

---

## Local testing checklist (end-to-end)
1) Go to `/admin` → should render Admin dashboard (no “Access denied”).
2) Go to `/admin/pages`:
   - “Roles: admin” appears in the connection check.
   - Existing pages load (or shows 0 rows if empty).
3) Click “Test preview”:
   - Should return JSON from `preview-content`.
   - This validates Edge Function auth in addition to table RLS.
4) Create a page (`test-page`, “Test Page”):
   - It should insert and show up in the list.

---

## What’s next when we come back

### Next UI build (recommended order)
1) `/admin/pages/:slug` (page detail)
   - Load a single page by `slug`.
   - List/edit related `cms_sections` ordered by `order_index`.
   - Section reorder + basic JSON editor.
2) Publish/rollback controls
   - Wire buttons to Edge Functions: `publish-content`, `rollback-content`.
3) Media library
   - Upload to buckets with constraints (≤25MB, alt text requirements).
4) Activity log
   - Read `cms_audits` and show version history from `cms_versions`.

### Known gotchas / reminders
- `VITE_ADMIN_EMAILS` only bypasses the **UI gate** in dev; it won’t bypass Supabase RLS or Edge Functions.
- Edge Functions typically require both:
  - `Authorization: Bearer <Clerk supabase JWT>`
  - `apikey: <Supabase anon key>`
