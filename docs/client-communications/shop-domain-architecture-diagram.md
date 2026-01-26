# Shop Domain Architecture - Visual Guide

## Current Setup (As Configured in Code)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER FLOW                                │
└─────────────────────────────────────────────────────────────────┘

User browses products
     │
     ▼
┌────────────────────────────────────────┐
│  lumellebeauty.co.uk                   │
│  (Cloudflare Pages - Next.js App)      │
│                                        │
│  - Product pages                       │
│  - Cart page                           │
│  - Marketing pages                     │
└────────────────────────────────────────┘
     │
     │ User clicks "Checkout"
     │
     ├─────────────────────────────────────────────────────┐
     │                                                     │
     ▼                                                     ▼
┌──────────────────────┐                    ┌──────────────────────────┐
│  OPTION A: Proxy     │                    │  OPTION B: Redirect      │
│  (Same Domain)       │                    │  (Separate Domain)       │
│                      │                    │                          │
│  URL stays:          │                    │  URL changes to:         │
│  lumellebeauty.co.   │                    │  shop.lumellebeauty.co.  │
│  uk/cart/c/123       │                    │  uk/cart/c/123           │
│                      │                    │                          │
│  Cloudflare Function │                    │  Direct to Shopify       │
│  proxies to Shopify  │                    │                          │
└──────────────────────┘                    └──────────────────────────┘
```

---

## DNS Configuration Required

```
┌─────────────────────────────────────────────────────────────┐
│  CLOUDFLARE DNS                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Type: A / AAAA                                            │
│  Name: @ (root)                                            │
│  Target: [Cloudflare Pages IP]                             │
│  Status: Proxied (orange cloud)                            │
│  → Points to: lumellebeauty.co.uk                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Type: CNAME                                               │
│  Name: shop                                                │
│  Target: lumelle-3.myshopify.com                           │
│  Status: DNS Only (grey cloud) ⚠️ IMPORTANT                │
│  → Points to: shop.lumellebeauty.co.uk                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Shopify Domain Configuration

```
┌─────────────────────────────────────────────────────────────┐
│  SHOPIFY ADMIN → SETTINGS → DOMAINS                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Connected Domains:                                         │
│  ✓ lumellebeauty.co.uk                                     │
│  ✓ shop.lumellebeauty.co.uk                                │
│  ✓ lumelle-3.myshopify.com                                 │
│                                                             │
│  PRIMARY DOMAIN:                                           │
│  ⭐ shop.lumellebeauty.co.uk ⚠️ MUST BE THIS               │
│                                                             │
│  NOT PRIMARY:                                              │
│  ○ lumellebeauty.co.uk                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Why? Because Shopify generates checkout URLs based on PRIMARY domain.
If primary is lumellebeauty.co.uk, checkout URLs will be:
  lumellebeauty.co.uk/cart/c/123
This breaks the headless app (loads SPA instead of checkout)!
```

---

## Redirect Theme Logic

```
┌─────────────────────────────────────────────────────────────┐
│  SHOPIFY ONLINE STORE → THEMES                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Published Theme: "Lumelle Redirect"                        │
│                                                             │
│  Logic in layout/theme.liquid:                              │
│  ┌────────────────────────────────────────┐                │
│  │ IF path is /cart OR /checkouts:        │                │
│  │   → Show Shopify checkout              │                │
│  │ ELSE:                                  │                │
│  │   → Redirect to lumellebeauty.co.uk    │                │
│  └────────────────────────────────────────┘                │
│                                                             │
│  Result:                                                   │
│  shop.lumellebeauty.co.uk           → Redirects            │
│  shop.lumellebeauty.co.uk/cart      → Shopify checkout     │
│  shop.lumellebeauty.co.uk/cart/c/123 → Shopify checkout    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Checkout Proxy (OPTION A)

```
┌─────────────────────────────────────────────────────────────┐
│  CHECKOUT PROXY FLOW (Same Domain)                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User on lumellebeauty.co.uk/cart                           │
│         │                                                   │
│         │ Clicks checkout                                  │
│         ▼                                                   │
│  URL becomes: lumellebeauty.co.uk/cart/c/abc123?key=...    │
│         │                                                   │
│         │ public/_routes.json routes this to Functions     │
│         ▼                                                   │
│  ┌──────────────────────────────────────┐                  │
│  │  functions/cart/c/[[catchall]].ts    │                  │
│  │  (Cloudflare Pages Function)         │                  │
│  └──────────────────────────────────────┘                  │
│         │                                                   │
│         │ Proxies request to upstream                      │
│         ▼                                                   │
│  shop.lumellebeauty.co.uk/cart/c/abc123?key=...            │
│         │                                                   │
│         │ Shopify responds with checkout HTML              │
│         ▼                                                   │
│  ┌──────────────────────────────────────┐                  │
│  │  proxyShopifyCheckout()              │                  │
│  │  Rewrites URLs in HTML               │                  │
│  │  Rewrites cookies                    │                  │
│  │  Returns to user                     │                  │
│  └──────────────────────────────────────┘                  │
│         │                                                   │
│         ▼                                                   │
│  User sees Shopify checkout on lumellebeauty.co.uk         │
│                                                             │
│  Benefits:                                                 │
│  ✓ No domain change (better UX)                           │
│  ✓ Consistent branding                                    │
│                                                             │
│  Drawbacks:                                                │
│  ✗ Uses Cloudflare Functions quota                        │
│  ✗ More complex setup                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Direct Checkout (OPTION B)

```
┌─────────────────────────────────────────────────────────────┐
│  DIRECT CHECKOUT FLOW (Separate Domain)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User on lumellebeauty.co.uk/cart                           │
│         │                                                   │
│         │ Clicks checkout                                  │
│         ▼                                                   │
│  Browser navigates to:                                      │
│  shop.lumellebeauty.co.uk/cart/c/abc123?key=...            │
│         │                                                   │
│         │ Direct connection to Shopify                     │
│         ▼                                                   │
│  User sees Shopify checkout on shop.lumellebeauty.co.uk     │
│                                                             │
│  Benefits:                                                 │
│  ✓ Simple setup                                           │
│  ✓ No Functions quota usage                               │
│  ✓ Native Shopify checkout                                │
│                                                             │
│  Drawbacks:                                                │
│  ✗ Domain change during checkout                          │
│  ✗ Need redirect theme for other paths                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Instagram Shop Integration

```
┌─────────────────────────────────────────────────────────────┐
│  META COMMERCE MANAGER → INSTAGRAM SHOP                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Product Catalog Settings:                                  │
│  ┌──────────────────────────────────────┐                  │
│  │  Product URL Template:               │                  │
│  │  https://lumellebeauty.co.uk/        │                  │
│  │         product/{product_handle}     │                  │
│  └──────────────────────────────────────┘                  │
│                                                             │
│  When user taps product in Instagram:                      │
│  ┌──────────────┐                                          │
│  │ Instagram    │                                          │
│  │ Shop Post    │                                          │
│  └──────┬───────┘                                          │
│         │                                                   │
│         ▼                                                   │
│  Opens: lumellebeauty.co.uk/product/lumelle-shower-cap     │
│         │                                                   │
│         │ User browses, adds to cart                       │
│         ▼                                                   │
│  Checkout → shop.lumellebeauty.co.uk (via OPTION B)        │
│  OR                                                         │
│  Checkout → lumellebeauty.co.uk/cart/c/* (via OPTION A)    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

⚠️ CURRENT ISSUE:
Instagram Shop links go to shop.lumellebeauty.co.uk first
This shows the redirect instead of the product!

FIX: Update product URLs in Meta Commerce Manager to point to
lumellebeauty.co.uk instead of shop.lumellebeauty.co.uk
```

---

## Environment Variables Reference

```bash
# .env configuration

# Shopify Store Domain (for API calls)
SHOPIFY_STORE_DOMAIN=lumelle-3.myshopify.com

# Checkout Upstream Domain (for proxy)
SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN=shop.lumellebeauty.co.uk

# Storefront tokens
SHOPIFY_STOREFRONT_PUBLIC_TOKEN=shpua_...
VITE_SHOPIFY_STORE_DOMAIN=lumelle-3.myshopify.com

# Enable proxy mode (optional)
VITE_SHOPIFY_CHECKOUT_PROXY=1
```

---

## File Structure Reference

```
project/
├── public/
│   └── _routes.json                    # Routes Functions to checkout paths
├── functions/
│   ├── cart/c/
│   │   └── [[catchall]].ts             # Proxy for /cart/c/*
│   ├── checkouts/
│   │   └── [[catchall]].ts             # Proxy for /checkouts/*
│   └── _lib/
│       └── shopifyCheckoutProxy.ts     # Core proxy logic
├── redirect-theme/
│   └── layout/
│       └── theme.liquid                # Shopify redirect theme
└── src/
    └── domains/client/shop/cart/ui/pages/
        ├── CartPage.tsx                # Cart with URL transformation
        └── CheckoutHandoffPage.tsx     # Fallback error page
```

---

## Troubleshooting Flowchart

```
                    User reports issue
                         │
                         ▼
              ┌──────────────────────┐
              │ Can they access       │
              │ lumellebeauty.co.uk?  │
              └──────┬──────────┬─────┘
                     │ YES      │ NO
                     │          └─→ DNS/Cloudflare issue
                     ▼
              ┌──────────────────────┐
              │ Does shop.lumelle    │
              │ .co.uk redirect?     │
              └──────┬──────────┬─────┘
                     │ YES      │ NO
                     │          └─→ Deploy redirect theme
                     ▼
              ┌──────────────────────┐
              │ Does checkout work?  │
              └──────┬──────────┬─────┘
                     │ YES      │ NO
                     │          └─→ Check Shopify primary domain
                     ▼
              ┌──────────────────────┐
              │ Instagram Shop       │
              │ links correct?       │
              └──────┬──────────┬─────┘
                     │ YES      │ NO
                     │          └─→ Update Meta Commerce settings
                     ▼
                     ✓ SOLVED
```

---

## Current Status & Recommendations

### ✅ WORKING
- Main site on `lumellebeauty.co.uk`
- Cart functionality
- Checkout proxy code deployed

### ⚠️ ISSUES IDENTIFIED
1. Redirect theme may not be deployed to Shopify
2. Shopify primary domain might be wrong
3. Instagram Shop pointing to wrong URLs
4. `shop.lumellebeauty.co.uk` might not have DNS configured

### 🎯 RECOMMENDED APPROACH
**Use OPTION B (Direct Checkout)** because:
1. Simpler architecture
2. No Functions quota concerns
3. More reliable
4. Instagram Shop works better

**Steps:**
1. Deploy redirect theme to Shopify
2. Set Shopify primary to `shop.lumellebeauty.co.uk`
3. Configure DNS for `shop` subdomain
4. Update Instagram Shop URLs
5. Test complete flow

---

*Last updated: 2026-01-26*
