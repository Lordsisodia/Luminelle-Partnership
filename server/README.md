# `server/` (Not a runtime server)

This repository does **not** run an Express/Node server as part of the app.

What this folder is for:
- `server/migrations/*` — SQL migrations intended to be run in Supabase (e.g. via Supabase SQL editor or `psql`).

What this folder is **not** for:
- Running local webhook endpoints. A previous `server/index.ts` webhook server existed historically, but it was stale/non-runnable and has been removed to avoid confusion.

Where webhooks live now:
- Shopify webhooks: `api/shopify/webhooks/*`
- Clerk webhook: `api/webhooks/clerk.ts`

