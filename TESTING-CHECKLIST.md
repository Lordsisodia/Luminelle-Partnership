# Testing Checklist - Lumelle App

## Environment Setup
- [x] `.env` file configured with all required variables
- [x] `USE_REAL_COMMERCE=true` added to .env for development
- [x] `VITE_SHOPIFY_STORE_DOMAIN` configured
- [x] Shopify API keys configured
- [x] Supabase configured
- [x] Clerk authentication configured

## Code Fixes Applied
- [x] Fixed TrustBar animation style conflict (replaced shorthand with longhand properties)
- [x] Fixed ARIA accessibility warning (replaced `aria-hidden` with `inert` attribute)
- [x] Reverted broken PublicHeader.tsx changes to restore cart functionality

## Local Development Testing
- [ ] Dev server restarted with new env vars: `pnpm dev`
- [ ] Homepage loads without errors
- [ ] Product page loads with real Shopify data (not mock)
- [ ] "Add to Cart" button adds items to cart
- [ ] Cart drawer shows added items
- [ ] Cart subtotal calculates correctly
- [ ] Checkout button is enabled and redirects to Shopify
- [ ] Account page loads (may show "Loading" without authentication)

## Production/Deployment Testing
- [ ] Deploy to Cloudflare Pages staging
- [ ] Test full user flow in staging:
  - [ ] Browse products
  - [ ] Add to cart
  - [ ] View cart
  - [ ] Proceed to checkout (redirects to Shopify)
  - [ ] Complete test purchase
- [ ] Test authentication flow (sign in/sign up)
- [ ] Test account order history
- [ ] Verify Shopify webhooks are receiving orders
- [ ] Test Supabase data sync

## Known Limitations (Local Dev)
- **Mock Mode**: Local development with `pnpm dev` uses mock commerce adapter by design
- **Cloudflare Functions**: Shopify integration requires Functions to run
- **Real Commerce**: Set `USE_REAL_COMMERCE=true` in .env (requires Functions deployment)

## Environment-Specific Behavior
- **Local (pnpm dev)**: Mock mode unless `USE_REAL_COMMERCE=true` + Functions running
- **Staging/Production**: Full Shopify integration via Cloudflare Pages Functions

## Next Steps
1. Stop dev server (Ctrl+C)
2. Restart: `pnpm dev`
3. If still showing mock mode, deploy to staging to test full integration
4. Verify all UI issues from client feedback are addressed
