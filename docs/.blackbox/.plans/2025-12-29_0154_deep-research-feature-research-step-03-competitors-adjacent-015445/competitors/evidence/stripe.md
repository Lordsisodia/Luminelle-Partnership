# Evidence Extract — Stripe

- slug: `stripe`
- category: merchant-admin-adjacent governance (2FA + API keys)
- license: SaaS / proprietary

## Cycle 6 — Evidence-backed primitives (2FA baseline + API key governance + org scoping)

### Notable features (3)

1) Two-step authentication (2FA) guidance for account security  
Evidence: https://support.stripe.com/questions/two-step-authentication

2) API keys as a first-class surface (credential inventory + usage patterns)  
Evidence: https://docs.stripe.com/keys

3) Organization/account scoping patterns (multi-account governance) appear in docs examples (e.g., `Stripe-Context` header)  
Evidence: https://docs.stripe.com/keys

### Copyable workflows (2)

1) Harden admin access: enable/enforce 2FA for all admins → reduce account takeover risk before sensitive actions  
Evidence: https://support.stripe.com/questions/two-step-authentication

2) Credential hygiene: rotate keys → update services → audit change history (tie into our credential governance surface)  
Evidence: https://docs.stripe.com/keys

### 3 steal ideas (easy / medium / hard)

- Easy: show “2FA enabled” status per admin and prompt/require enabling before sensitive actions.
- Medium: API key inventory UX (created_at, last_used_at, rotate/revoke) tied to audit events.
- Hard: full org/multi-account governance; start with scoped credentials and explicit “acting as store/account” context.

### Thin-slice implementation (1–3 days)

- Day 1: add 2FA enforcement toggle for admin roles (at least for highest privilege roles).
- Day 2: add API key inventory + rotate/revoke + audit events.
- Day 3: add “acting as store/account” context header/selector for multi-store admins.

