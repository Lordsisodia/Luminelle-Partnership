# Admin frontend plan (flagged, staging-first)

Goals:
- Build React-based admin UI under `/admin`, lazy-loaded and gated by `VITE_ENABLE_ADMIN_UI`.
- Use a separate Supabase client pointing to staging project for all admin data.
- Keep bundle impact zero when flag is off.

Stack assumptions:
- React + Vite (existing app).
- State/query: react-query or SWR.
- Forms: React Hook Form + Zod for validation.
- Drag/drop: dnd-kit.
- Rich text/blocks: tiptap or block-editor lite (YouTube embed only).

Component/layout plan:
- `admin/App.tsx` (lazy entry)
  - `AdminGate` (flag + auth + role check)
  - Layout shell (sidebar nav + topbar with env badge)
  - Routes:
    - `/admin` Dashboard
    - `/admin/pages` list
    - `/admin/pages/:slug` detail (sections)
    - `/admin/products` list
    - `/admin/products/:handle`
    - `/admin/blogs` list
    - `/admin/blogs/:slug`
    - `/admin/media`
    - `/admin/globals`
    - `/admin/preview-tokens`
    - `/admin/activity`
    - `/admin/publish-queue` (optional for future approvals)

Data layer:
- `supabaseAdminClient` built from `VITE_SUPABASE_URL_ADMIN` + `VITE_SUPABASE_ANON_KEY_ADMIN`.
- Type bindings generated from Supabase types (staging).
- Helper for signed URL generation (draft bucket).

Common UI pieces:
- Table/list with filters (status, search).
- Form wrapper with Zod schema + RHF.
- MediaPicker (WebP conversion, alt required, focal picker).
- BlockEditor (limited block set: paragraph, heading, list, quote, image, YouTube embed).
- SectionList with drag/reorder.
- SEO panel (slug, meta title/desc, OG image).
- Status pill + publish buttons (call Edge Functions).
- ActivityLog feed.

Feature flags:
- `VITE_ENABLE_ADMIN_UI` controls route mounting and bundle include.
- `VITE_ADMIN_ALLOW_EMBEDS_YOUTUBE=true` (future for embed whitelist).

Telemetry/logging:
- Console/logging to audits via backend; minimal client logging; no PII.

Rollout steps (frontend):
1) Scaffold `admin/` folder with lazy route and gate.
2) Wire admin Supabase client and auth provider.
3) Build shell + nav; hide entry unless flag true.
4) Implement pages list + detail (sections) with reorder + section edit form.
5) Implement products list + detail with media grid + SEO.
6) Implement blogs editor with block editor + hero picker.
7) Implement media library view with bucket tabs + replace flow.
8) Implement globals editor.
9) Wire preview/publish/rollback buttons to Edge Functions (staging).
10) Add activity log feed.
11) Add feature flag checks to prevent accidental prod use.
