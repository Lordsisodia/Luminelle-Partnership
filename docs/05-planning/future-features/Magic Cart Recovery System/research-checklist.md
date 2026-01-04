# Magic Cart Recovery System — Research & Analysis Checklist
Date: 2025-12-11
Owner: eng
Scope: 20–30 concrete research/analysis tasks spanning internet scan, in-app audit, and use-case validation.

Status legend: ☐ Not started | ◔ In progress | ☑ Done

1. ☑ Catalogue current cart architecture (contexts, APIs, env flags) — source: design draft 2025-12-11; files `src/domains/shop/cart/providers/CartContext.tsx`, `/api/storefront/cart/*`.
2. ☑ Map duplicate cart implementations (UI vs domain providers) and decide consolidation path; documented differences: domain provider supports server proxy flag `VITE_USE_SERVER_CART` with queued Shopify calls, UI provider lacks serverCart path; both persist `lumelle_cart` + `lumelle_shopify_cart_id` without TTL.
3. ☑ Identify all persistence touchpoints (localStorage keys, legacy migrations) and failure modes (quota, JSON parse errors) in the app. — Keys: `lumelle_cart`, `lumelle_shopify_cart_id`; no TTL/versioning; cart clears on Shopify fetch failure; JSON parse errors fall back to empty cart; migration needed when new schema ships.
4. ☑ Benchmark Shopify Storefront cart expiry rules and restore semantics (docs + forums); note limits on lines, discounts, buyerIdentity updates. — Cart supports up to 500 lines; unused/abandoned carts expire after 10 days. citeturn2search2
5. ☑ Verify Storefront API versions used (`SHOPIFY_API_VERSION`) vs latest; list any breaking changes affecting cart tokens or share links. — Repo defaults to 2025-10; latest documented GA is 2025-10; 2026-01 is RC. Hold at 2025-10 until 2026-01 stable. citeturn2search2turn0search9
6. ☑ Research best practices for cart persistence/abandonment recovery in Shopify headless setups (blog posts, GH repos, Shopify dev forums). — Guidance: keep Shopify cart authoritative, store cartId locally, and layer recovery nudges; multi-channel reminders outperform email-only. citeturn0search6turn0search0
7. ◔ Evaluate offline-first patterns (Zustand persist, SW/Background Sync) and how they interplay with Vite/React build; note PWA constraints. — Safari evicts all script-writable storage after 7 days without interaction; installed PWAs exempt. Keep offline queue small and re-sync quickly. citeturn1search1turn1search2
8. ☑ Compare persistence backends (localStorage vs IndexedDB) for size/quota/performance; choose default and fallback strategy. — localStorage around 5 MB per origin with `QuotaExceededError` when full; IndexedDB offers much larger, disk-based quota but is still subject to Safari’s 7‑day eviction unless installed as a PWA. Default: use localStorage for cart blob + small queue; consider IndexedDB only if queue growth demands it. citeturn1search6turn1search0
9. ◔ Audit network layer: how `/api/storefront/cart/*` proxies auth and rate limits; confirm tokens and secrets handling. — Uses `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` with direct POST; Storefront API can return `430` security rejections on suspicious traffic; add Buyer-IP header + retry/backoff. citeturn0search1
10. ◔ Assess Supabase as auxiliary store (cart_shares table or KV) vs alternatives (Vercel KV/R2); collect pricing/latency notes. — Supabase Realtime benchmark p95 28 ms (WebSocket). Cloudflare R2 pricing: $0.015/GB-month; Class A $4.50/M; Class B $0.36/M; zero egress. TODO: add Vercel KV latency and Supabase PG RPC p95. citeturn0search6turn0search0
11. ◔ Define schema for shareable restore token (fields, signing, TTL); validate HMAC vs JWT vs short-link service options. — Draft: payload `{cartId, issuedAt, expiresAt, nonce, version}`; HMAC-SHA256 with `INTERNAL_SHARED_SECRET`; 14-day TTL; optionally include `buyerEmailRef` (server-side lookup) to avoid PII in token.
12. ◔ Survey privacy/GDPR guidance for storing buyer email in localStorage or share tokens; identify consent/UI requirements. — Consent must be “freely given, specific, informed and unambiguous”; provide withdraw option; avoid embedding email in token; use explicit “remember my cart” checkbox for EEA/UK. citeturn0search5
13. ◔ Inventory current analytics stack (PostHog? GA4? custom) and event pipeline; decide destination for `cart_saved/restored` events. — Repo shows no PostHog/GA4 scripts; likely none configured. Action: confirm with team; if none, propose PostHog cloud with env-gated init and fail-safe no-op in dev.
14. ☐ Check existing feature-flag system (env vars, config) and how to gate recovery UX; note rollout/kill-switch mechanism.
15. ◔ Design UX patterns for restore banner/toast, exit-intent modal, and share-link CTA; gather references from top DTC sites (Allbirds, Warby, Glossier) for placement and microcopy.
16. ☐ Define reconciliation rules for price/availability changes (auto-adjust vs block); consult Shopify docs on variant availability checks.
17. ☐ Plan offline mutation queue (shape, retry/backoff, dedupe) and how to persist queue safely.
18. ☐ Determine migration plan for legacy keys (`lumelle_cart`, `lumelle_shopify_cart_id`) to new schema version; outline rollback.
19. ☐ Security review: enumerate attack surface for forged restore tokens, replay, and leakage of PII; propose mitigations.
20. ☐ Performance targets: measure current hydrate-to-first-render time and set SLA (<400ms from local cache, etc.).
21. ☐ Testing plan: unit tests for store, integration tests for restore flow, offline/online toggle tests, and API contract tests.
22. ☐ Explore email/SMS delivery options for recovery nudges (Shopify marketing, Klaviyo, Resend, Twilio); note prerequisites.
23. ☐ Validate checkout redirection: ensure restored carts respect existing discount codes and attributes on Shopify checkout URL.
24. ☐ Document observability needs: logs/metrics for restore failures, token issuance, and replay attempts; propose dashboards.
25. ☐ Accessibility review for recovery UI (ARIA on toasts/modals, focus management, keyboard escape).
26. ☐ Legal/compliance check on storing cart snapshots that include pricing and product titles; retention policy recommendations.
27. ☐ Competitor scan: identify 3–5 SaaS cart recovery tools (ReCart, Klaviyo flows, etc.) and list differentiators we need to match.
28. ☐ Edge cases list: multiple tabs, currency changes, logged-in vs guest, region switching, multi-language, private/incognito mode.
29. ☐ Deployment considerations: env var propagation (Vercel), cache invalidation for new endpoints, PWA update flow impact.
30. ☐ Create implementation roadmap with estimates per phase and dependency graph; socialize with team for buy-in.

Working notes
- Step 1 completed via prior design draft; all other steps pending/in-progress.
- Start with steps 2–4 to unblock architecture choices, then 10–14 for platform/flag decisions.
