# Client Checkout
Purpose: Checkout, order confirmation, tracking, returns.

Routes:
- /checkout, /order/confirmation, /order/tracking, /returns

Data sources:
- Shopify checkout, Supabase for confirmation/tracking data.

Key modules:
- ui/pages (CheckoutPage, OrderConfirmationPage, OrderTrackingPage, ReturnsPage); add data/hooks/logic as needed.

Roadmap:
- Payment status handling, order tracking integration, error/retry paths.
