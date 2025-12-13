# New Client Setup Steps (Copy Repo Model)

Goal: take this repo, duplicate it, and get a new client storefront live with predictable changes.

---

## 0) Create the repo

1) Duplicate this repo.
2) Rename the repo and update `package.json` `name`.
3) Decide:
   - `brandName` (human-readable)
   - `appSlug` (short, lowercase identifier; used for storage keys/events later)

---

## 1) Shopify storefront + checkout

Set the Shopify env vars for the client:
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_PUBLIC_TOKEN`
- `SHOPIFY_API_VERSION` (pin a version)

Smoke test:
- `/product/:handle` renders for a real product handle.
- Add to cart works and creates a `checkoutUrl`.
- `/checkout` redirects to Shopify checkout.

---

## 2) Clerk (auth)

Set frontend env vars:
- `VITE_CLERK_PUBLISHABLE_KEY`

Required Clerk config:
- Set allowed redirect URLs for local + production domains.
- Create a Clerk JWT template named `supabase` (used to authenticate Supabase requests).

For Supabase RLS to work with Clerk tokens, ensure the template provides:
- `sub` = Clerk user id (string)
- `role` = `authenticated`

---

## 3) Supabase (DB)

Decision:
- Each client gets their own Supabase project (per-client Supabase).

Frontend env vars:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Backend env vars:
- `DATABASE_URL` (Postgres connection string, typically Supabase DB URL)

Blog social (comments + likes):
- Ensure the Supabase tables exist: `blog_comments`, `blog_likes`.
- Ensure RLS policies match the desired behavior (public reads for published comments, authenticated writes for comments/likes).
- Easiest path: run `server/migrations/2025-12-13_social.sql` in the client’s Supabase SQL editor, then apply any hardening tweaks described in `docs/templated/blog-social.md`.
- See `docs/templated/blog-social.md` for the recommended schema and policies.

Decision reminders:
- Comments are auto-published.
- Likes are public as count only (no public liker list).

---

## 4) Blog (public SEO)

Decision:
- Blog pages are public for SEO.
- Clerk is only for interactive features.

Setup:
- Add initial posts under `src/content/blog/*`.
- Ensure meta + OG image URLs are correct for the new domain/brand.
- Configure Supabase social tables/policies so comments + likes work safely.

---

## 5) Customer sync (Clerk → Supabase → Shopify)

Decision:
- Sync happens near real-time.

Required (to enable this fully):
- Clerk webhook pointing to `/api/webhooks/clerk`
- `CLERK_WEBHOOK_SECRET` in backend env
- Shopify Admin API credentials/scopes (to create/lookup customers)

Note:
- The repo already captures Clerk users and Shopify customers into the DB,
  but the “create Shopify customer from Clerk user” flow still needs to be implemented as template hardening.
  See `docs/templated/customer-sync.md`.

---

## 6) Admin tools (optional to expose)

Frontend:
- `VITE_ADMIN_EMAILS` (comma-separated allowlist)

Backend:
- `INTERNAL_SHARED_SECRET` (protect exports and sensitive endpoints)

---

## 7) Clientization: content + assets

Expected per client:
- Update `src/content/*` (copy, legal pages, brand story, etc.).
- Update product merchandising config (handles, FAQs, galleries).
- Replace imagery under `public/` (or update CDN base URLs).

Use:
- `docs/templated/clientization-inventory.md` as the checklist of rename hotspots.
