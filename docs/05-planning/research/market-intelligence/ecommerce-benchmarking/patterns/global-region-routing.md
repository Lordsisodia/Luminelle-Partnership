# E-commerce Pattern Card

Pattern name: Global region routing + localized policy pages

Funnel stage: homepage

Problem it solves: International shoppers face uncertainty about shipping cost, delivery time, duties, and returns eligibility.

Why it works: Localizes key trust signals (currency, delivery, returns) which reduces “surprise costs” and drop-off.

Evidence (required):
- Store: Ganni
- Page URL: https://www.ganni.com/en-vn/help-and-information/delivery.html
- Screenshot link: pending (capture during manual audit)
- Notes (what the evidence proves): Store operates region-specific URLs and policy content is localized per region.

Implementation notes (for our builds):
- UI placement: country selector in header/footer; show “shipping/returns summary” tied to selected region.
- Copy guidance: show delivery window, duties info, free shipping thresholds.
- Data required: region config, policy content per locale, currency + tax rules.
- Edge cases: switching region mid-cart, multi-currency rounding, inventory availability by region.

Tradeoffs / risks:
- Region fragmentation can hurt SEO and complicate analytics if not normalized.

Related patterns:
- Checkout duty/tax estimator
- Delivery estimate in checkout
