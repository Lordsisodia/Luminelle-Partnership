# Edge Functions plan (preview/publish, staging-first)

Purpose: Serve draft/preview data and handle publish/rollback with minimal app coupling.

## Functions (staging)
1) `preview-content`
   - Input: JWT (admin), query params: `type` (page/product/blog), `slug`, optional `locale`.
   - Logic: authorize admin; select rows with status in ('draft','in_review'); sign draft-media URLs (short TTL); return JSON shaped like live API.
   - Cache: `Cache-Control: private, max-age=60`.
2) `publish-content`
   - Input: entity type/id; action by admin.
   - Logic: wrap in transaction: snapshot → set status=published, published_at=now → write audit → bump version param if needed.
3) `rollback-content`
   - Input: entity type/id/version id.
   - Logic: restore snapshot into tables; audit; optional cache-bust.

## Config
- Use staging Supabase URL/service role for server-side reads/writes.
- Restrict invocation to admin JWTs (role check).
- Log errors to `audits` or Edge logs.

## Notes for Free plan
- No Smart CDN: rely on versioned asset paths on publish; append `?v=<timestamp>` for public assets.
- Keep signed URL TTL short (e.g., 5–10 min) for draft-media.

## Deployment steps
- Author functions in repo under `edge/` (later).
- Deploy to staging project first.
- Wire admin UI actions (Preview/Publish/Rollback) to these endpoints; gate behind flag.
