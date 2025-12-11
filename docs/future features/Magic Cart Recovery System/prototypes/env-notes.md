# Env Notes (not applied yet)

## Client
- `VITE_CART_RECOVERY_ENABLED` (default off)
- `VITE_CART_SHARE_ENABLED` (default off)

## Server
- `CART_RECOVERY_ENABLED` (default off)
- `CART_RECOVERY_CRON_ENABLED` (default off)
- `CART_RECOVERY_DISCOUNT_ENABLED` (default off; gates 10% second-touch)
- `CART_RECOVERY_SECRET` (required for token signing; random 32+ chars)
- `RESEND_API_KEY` (for recovery emails)
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (if cron reads/writes Supabase)

## Deployment notes
- Keep all flags off until QA passes.
- Cron handler should early-return when `CART_RECOVERY_CRON_ENABLED` is false.
- Share/restore endpoints should 404 when `CART_RECOVERY_ENABLED` is false.
