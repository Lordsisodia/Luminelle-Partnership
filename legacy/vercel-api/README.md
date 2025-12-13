# Legacy Vercel API Snapshot

This folder contains a **snapshot copy** of the repo’s original Vercel-style serverless API (`/api/**`).

Why this exists:
- We’re migrating hosting to **Cloudflare Pages + Workers + R2**.
- Cloudflare Workers is not drop-in compatible with the current `api/**` code (it includes Node/Vercel-specific patterns like `@vercel/node` request types and `pg` TCP pooling).
- We keep this snapshot so we can **restore / reuse** the original Vercel API later if we ever move back.

What’s inside:
- `api/` — a byte-for-byte copy of the original `api/` folder at the time of migration.

Notes:
- This code is **not** meant to be deployed on Cloudflare as-is.
- If moving back to Vercel later, you can copy `legacy/vercel-api/api` back to the repo root as `api`.

