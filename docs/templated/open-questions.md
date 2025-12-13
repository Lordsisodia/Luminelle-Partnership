# Open Questions (Still to Standardize)

Date: December 13, 2025

This is the list of remaining decisions that affect template design.

---

## Resolved (for clarity)

- Blog pages are **public** for SEO; Clerk is only for interactive features.
- Blog interactive features in v1: **comments + likes**.
- Comments are auto-published.
- Likes are public as **count only** (no public liker list).
- Clerk → Supabase sync is immediate.
- Shopify customer parity should be ensured **near real-time** (webhook-first).
- Template distribution is “copy this repo”.
- Supabase topology (for now): **per-client Supabase**.

---

## Still open

1) **Comments anti-spam / abuse handling**
   - Do we need rate limits, profanity filters, shadow-banning, or a report button?
   - Do we want a “flag comment” flow for the community?

2) **Admin audience + permissions**
   - Agency-only vs merchant-accessible.
   - If merchant-accessible, what’s the permissions model beyond an email allowlist?

3) **Stripe roadmap**
   - First Stripe support should be:
     - Stripe Checkout redirect (simpler), or
     - Stripe Elements embedded (more control).

4) **What “done” means for new clients**
   - What must ship in week 1 for every client?
   - What’s optional add-on scope?
