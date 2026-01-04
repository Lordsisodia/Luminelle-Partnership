# E-commerce Pattern Card

Pattern name: Help Center that surfaces contextual policy answers (shipping/returns/sizing)

Funnel stage: post‑purchase

Problem it solves: Shoppers have policy questions mid-funnel; if answers are slow/hard to find, they abandon or churn to support.

Why it works: Makes trust-critical answers accessible in seconds, reducing hesitation during PDP/cart/checkout; offloads support by making self-serve successful.

Evidence (required):
- Store: Universal Standard
- Page URL: https://www.universalstandard.com/pages/help-center
- Screenshot link: pending (capture during manual audit)
- Notes (what the evidence proves): Dedicated help center exists and is used as a central policy surface.

Implementation notes (for our builds):
- UI placement: footer, checkout trust module link, and PDP “Need help?” link.
- Copy guidance: “Returns & exchanges”, “Shipping”, “Size guide”, “Track my order”.
- Data required: policy content, search, category taxonomy, optional live chat escalation.
- Edge cases: region policies, promotions/coupon exclusions.

Tradeoffs / risks:
- Stale policy pages create more support load than no policy pages.

Related patterns:
- Bot-protection playbook for audits (some brands gate help pages)
- On-site search for policies (not just products)
