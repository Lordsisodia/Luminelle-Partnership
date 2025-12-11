# Magic Cart Recovery System — Implementation Plan (50 Steps)
Date: 2025-12-11  
Goal: Ship a robust, privacy-safe cart recovery system using Shopify Storefront cart, Zustand persist, Vercel-hosted scheduled jobs + Resend email, and Supabase/R2 for restore payloads.

Decisions from stakeholder Q&A (Dec 11, 2025)
- Channels: Email only (Resend). No SMS/push for now.
- Consent: Default opt-in (note: add warning banner for EEA/UK if risk tolerance changes).
- Cadence: 1h → 4h → 24h; up to 5 touches TBD by data (start with 3, expand to 5 via feature flag).
- Discount: Offer 10% on second touch.
- Traffic: Mobile-first priority.
- Hosting: No self-hosted n8n; everything runs in our Vercel codebase. Supabase is available.

## Phases & Steps

### A. Foundations (state, APIs, storage) — 14 steps
1. Inventory current cart flows (domain vs UI providers) and freeze one provider as source of truth.
2. Add Zustand store with `persist` middleware (localStorage) and schema versioning (v2 keys).
3. Implement migration from `lumelle_cart`/`lumelle_shopify_cart_id` → v2 store; include TTL (30 days) and legacy cleanup.
4. Add offline mutation queue structure (memory + persisted) with retry/backoff.
5. Add Shopify cart reconciliation: fetch → diff lines → adjust qty/price drift with flags for UI messaging.
6. Handle cart 404/expired: recreate cart, replay lines, reapply discounts/attributes/email.
7. Add feature flags: `VITE_CART_RECOVERY_ENABLED`, `VITE_CART_SHARE_ENABLED`, `VITE_USE_SERVER_CART`.
8. Centralize Storefront cart client (swap to Nacelle or direct GraphQL with typed helpers).
9. Add Buyer-IP header + retry/backoff to `/api/storefront/cart/*` proxy to avoid 430 rejections.
10. Create shared restore token signer/validator (HMAC-SHA256, 14-day TTL, nonce/version).
11. Create Supabase table or R2 bucket for `cart_shares` (cartId or snapshot ref, nonce, expires_at, email_ref).
12. Add API: `POST /api/storefront/cart/share` → stores payload, returns signed restore URL.
13. Add API: `POST /api/storefront/cart/restore` → validates token, loads payload/cart, replays lines, returns checkoutUrl.
14. Add observability hooks (structured logs) around share/restore failures and 430s.

### B. UX & UI surfaces — 14 steps
15. Design restore banner/toast component (shows “Cart restored from Dec 10, 3:42 PM” + CTA to cart/checkout + dismiss). — Prototype added: `prototypes/ui/RestoreBanner.tsx`.
16. Design exit-intent/lightbox: email capture “Save my cart”; include consent checkbox for “Remember my cart”. — Prototype added: `prototypes/ui/ExitIntentModal.tsx`.
17. Add inline “Copy restore link” button on cart page with success/fail toast.
18. Add “Send to email” on cart page when email present; otherwise prompt email + consent.
19. Add reconciliation notice UI (quantity adjusted, price changed) with highlight styles.
20. Add offline indicator and queued-actions toast (“We’ll sync when you’re back online”).
21. Add restore-from-link landing behavior: detect `?restore=token`, call restore API, show loading/success/fail states.
22. Add “Clear remembered cart” control (settings/banner link) to revoke consent and delete local + server payload.
23. Add empty-state CTA to re-enable recovery when user opted out.
24. Implement keyboard/focus/ARIA for banner, modal, toasts (accessibility).
25. Add analytics event emitters in UI (cart_saved, cart_restored, restore_fail, cart_share_created/opened, email_captured).
26. Mobile-first layout checks for banner, modal, and share-link UI.
27. Visual regression tokens: ensure styles use design tokens and dark/light compatibility if applicable.
28. UX copy review: microcopy for consent, restore, error states.

### C. Orchestration (Vercel cron + Supabase + Resend) — 8 steps
29. Create Supabase table `cart_recovery_jobs` (cartId/ref, email, restore_url, next_send_at, attempt, discount_sent?, status).
30. Emit `cart_abandoned` event to enqueue job (set next_send_at = now + 1h; store cadence array [1h, 4h, 24h, 72h, 120h] but start with first 3 via flag).
31. Add Vercel Cron job (or Supabase pg_cron/Edge Scheduler) every 5 minutes to poll due jobs and send via Resend.
32. Implement Resend email templates (touch1: reminder, touch2: +10% code, touch3: last call); include restore link + checkout CTA; mobile-friendly.
33. On `cart_restored` event, mark job `completed` and cancel future sends.
34. Add per-job backoff and max attempts; log sends/results into Supabase `cart_recovery_events`.
35. Add signing/authorization on cron handler to prevent abuse; rate-limit sends per email/cart/day.
36. Load-test cron handler with sample payloads and Resend sandbox to validate throughput and cost.

### D. Compliance & consent — 5 steps
37. Implement “Remember my cart” checkbox + link to privacy note; default unchecked in EEA/UK.
38. Store consent status in local store and on server payload (consent=true/false, ts, region).
39. Add “forget me” action to delete server payload + clear local keys.
40. Update privacy policy snippet (docs/seo) to include cart recovery storage and TTL.
41. Add blocking gate: if no consent, skip storing email and avoid restore token email_ref.

### E. Analytics, testing, rollout — 9 steps
42. Choose analytics sink (PostHog or GA4); add client init guard by env + safe no-op in dev. — TODO: decide.
43. Instrument events in store and APIs; ensure user IDs/emails are hashed when required.
44. Add unit tests: store persistence, migrations, queue retry, token signer/validator.
45. Add integration tests: restore flow (happy, expired token, tampered token), reconciliation adjustments.
46. Add e2e tests (Playwright/Cypress): restore banner, exit-intent email, copy link, offline/online replay.
47. Add load test for share/restore endpoints (k6 or Artillery).
48. Ship behind `VITE_CART_RECOVERY_ENABLED`; enable on staging; run QA checklist.
49. Monitor logs/metrics for errors and 430s; set alert thresholds.
50. Gradual rollout: enable for 10% traffic, then 50%, then 100%; review recovery-rate KPI after 1–2 weeks.

## How this helps
- Reuses open-source orchestration (n8n) and proven workflow patterns (Medusa-style recover links) to reduce build time.
- Keeps tokens PII-free by storing payload server-side (Supabase/R2) and gating with consent.
- Aligns with Shopify Storefront cart API best practices and adds resilience (offline queue, retry, reconciliation).
- Clear UX surfaces to maximize restores while staying compliant and accessible.
