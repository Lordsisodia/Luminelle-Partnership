# Client Cart
Purpose: Cart experience and checkout handoff.

Routes:
- /cart, /checkout/handoff

Data sources:
- Shopify cart API, Supabase recovery queue (if enabled), local storage.

Key modules:
- logic/shopifyCart, recovery/, providers/CartContext, ui/pages (CartPage, ShopifyCheckoutHandoffPage).

Roadmap:
- Improve recovery robustness, add analytics events, handle multi-currency/tax rules.
