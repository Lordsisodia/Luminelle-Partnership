# Magic Cart Recovery — Status (as of 2025-12-11)

## What’s landed (dark / flag-off)
- Recovery utilities in codebase under `src/domains/shop/cart/recovery/`:
  - `env.ts` feature flags/secrets.
  - `storeV2.ts` Zustand store with persist, TTL, legacy migration (not wired to UI).
  - `token.ts`, `snapshot.ts`, `reconcile.ts`, `queue.ts` helpers.
- Flagged API stubs:
  - `api/storefront/cart/share.ts` (404 unless `CART_RECOVERY_ENABLED` + secret).
  - `api/storefront/cart/restore.ts` (404 unless enabled; stubbed restore response).
  - `api/internal/recovery-cron.ts` (no-op unless cron flag on; returns 501).
- Prototypes remain in `docs/future features/Magic Cart Recovery System/prototypes/`:
  - Cron logic, Supabase/Resend shims, Supabase migration draft, UI prototypes (RestoreBanner, ExitIntentModal), email templates, env notes.
  - Unit test stubs for token/reconcile/queue/share/restore/cron logic (doc-only).
- Flags default OFF; nothing wired to existing UI; no runtime change.

## Decisions captured
- Channels: Email via Resend only. Cadence 1h → 4h → 24h (up to 5 touches via flag). 10% discount on second touch.
- Hosting: No n8n; cron will run in Vercel (or Supabase scheduler) with Supabase storage.
- Consent: Default opt-in; “Remember my cart” checkbox for EEA/UK when we wire UI.

## Open actions (next picks)
- Implement real Supabase/Resend clients in share/restore/cron handlers (still flag-gated).
- Add CI tests (port doc tests into repo test suite).
- Choose analytics sink (PostHog vs GA4) and add env-gated init.
- Wire V2 store + UI surfaces behind `VITE_CART_RECOVERY_ENABLED` when ready.

## Safety
- All entrypoints check flags; defaults keep features disabled.
- No existing providers/components modified; V2 store unused.
