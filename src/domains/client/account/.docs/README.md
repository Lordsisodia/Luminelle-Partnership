# Client Account
Purpose: Customer account management.

Routes:
- /account, /account/orders, /account/orders/:id, /account/addresses, /account/payments.

Data sources:
- Supabase user profile, Shopify orders, auth tokens.

Key modules:
- state/ stores, data/ loaders, hooks/ view models, ui/pages (AccountPage, OrdersPage, etc.).

Roadmap:
- Add order sync health, address validation, payment methods integration.
