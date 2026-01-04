Title: Shopify Remix App on Vercel with Supabase (Postgres)
Date: 2025-12-06

Overview
- You host your Shopify app server (Remix) on Vercel. Shopify manages app identity/listing and hosts extension bundles you deploy via the CLI. Supabase provides your Postgres database.
- This guide upgrades Prisma from SQLite to Postgres (Supabase) and shows local + production setups.

Repo Changes (done)
- Prisma datasource now uses Postgres with pooled + direct URLs (see `shopify-app/prisma/schema.prisma`).
- Added `shopify-app/.env.example` with all required vars.
- Existing session storage stays on Prisma via `@shopify/shopify-app-session-storage-prisma`.

What you need
- Shopify Partners account + a dev store.
- Supabase project (org/project created).
- Vercel project (one for `shopify-app`).

Supabase setup
1) In Supabase Dashboard → Project Settings → Database → Connection string:
   - Copy the pooled (pgBouncer) Postgres URL — port 6543.
   - Copy the direct Postgres URL — port 5432.
2) Create a dedicated database user for the app (optional but recommended).

Environment variables
- In `shopify-app/.env` locally and in Vercel env:

```
SHOPIFY_API_KEY=...
SHOPIFY_API_SECRET=...
SHOPIFY_APP_URL=https://your-vercel-domain
SCOPES=write_products

DATABASE_URL=postgresql://USER:PASSWORD@POOLER_HOST:6543/postgres?pgbouncer=true&sslmode=require
DIRECT_URL=postgresql://USER:PASSWORD@DIRECT_HOST:5432/postgres?sslmode=require

NODE_ENV=production
```

Reason for two URLs
- Prisma migrations require a direct connection; runtime in serverless benefits from pooled connections to avoid exhausting Postgres connection limits.

Local development
1) Install deps: `cd shopify-app && npm install`
2) Generate Prisma client: `npm run prisma -- generate`
3) Apply schema:
   - First time: `npm run prisma -- migrate dev --name init`
   - Afterwards: `npm run prisma -- migrate dev`
4) Run the app via the Shopify CLI tunnel: `npm run dev`
   - Pick a dev store when prompted. The app installs via OAuth and opens embedded.
5) Smoke test: On the app home, click “Generate a product” → verify in Admin › Products.

Production on Vercel
1) Create a new Vercel project pointing to `shopify-app/` (not the root).
2) Build settings
   - Install: `npm ci`
   - Build: `npm run build`
   - Post-build/Deploy Hook (optional but recommended): `npx prisma migrate deploy`
3) Environment variables (Production + Preview): set the same vars as above (API keys, URLs, DATABASE_URL, DIRECT_URL, SCOPES, NODE_ENV).
4) In Shopify Partners → Your App → App setup
   - App URL: `https://your-vercel-domain/auth`
   - Allowed redirect URL(s): `https://your-vercel-domain/auth/callback` (Remix handles `/auth/*`).
5) From your dev store, install the app from “Test on development store”, or share the install link.

Deploying app config and extensions
- `npm run deploy` (Shopify CLI) updates the remote app configuration and uploads any extensions/Functions. This does not deploy your Vercel server.

Verifying in production
- OAuth: open the app from your store → should land on `/app`.
- Admin API: press “Generate a product” and confirm in Admin.
- Webhooks: uninstall the app; verify session cleanup (see `app/routes/webhooks.app.uninstalled.tsx`).

Troubleshooting
- Redirect mismatch / OAuth loop: ensure App URL + Redirect URLs in Partners match your Vercel domain and that you reinstalled after scope changes.
- “The table main.Session does not exist”: you didn’t run migrations. Run `npx prisma migrate deploy` with `DIRECT_URL` set.
- Too many connections / timeouts: confirm you are using the pooled connection for `DATABASE_URL` and direct only for `DIRECT_URL`.
- SQLite leftovers: remove any `dev.sqlite` references; schema is now Postgres.

Next Steps
- Add your own tables next to `Session` in Prisma, run a new migration, and start persisting app data.
- Consider Vercel Cron for scheduled jobs and a job table in Supabase for webhook processing retries.
