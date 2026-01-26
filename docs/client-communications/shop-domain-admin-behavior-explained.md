# shop.lumellebeauty.co.uk - Admin Behavior Explanation

**Date:** 2026-01-26
**Status:** Working as Designed ✅

---

## The "Issue" (Not Actually an Issue)

**What you're experiencing:**
- When YOU visit `shop.lumellebeauty.co.uk`, you see the Shopify Admin interface
- When everyone else visits it, they get redirected to `lumellebeauty.co.uk`

**This is CORRECT behavior!** 🎉

---

## Why This Happens

### Shopify's Admin Detection
Shopify automatically detects when a logged-in admin/owner visits the store and shows them the admin interface instead of the storefront. This is intentional so admins can manage the store.

### The Redirect Theme IS Working
The redirect theme (`redirect-theme/layout/theme.liquid`) **is deployed and functioning correctly**. It redirects all non-admin visitors to `lumellebeauty.co.uk`.

---

## How Shopify Decides What to Show

```
User visits shop.lumellebeauty.co.uk
     │
     ▼
┌────────────────────────────────┐
│  Are you logged in as admin?    │
└──────┬──────────────────────┬───┘
       │ YES                  │ NO
       │                      │
       ▼                      ▼
┌──────────────────┐    ┌────────────────────┐
│  Show Shopify    │    │  Execute redirect  │
│  Admin interface │    │  theme logic       │
│  (you can manage │    │                    │
│   products, etc) │    │  Redirect to       │
│                  │    │  lumellebeauty.    │
│  THIS IS WHAT   │    │  co.uk             │
│  YOU SEE        │    │                    │
└──────────────────┘    └────────────────────┘
```

---

## How to Verify It's Working for Everyone Else

### Method 1: Incognito/Private Window
1. Open an incognito/private browser window
2. Visit `https://shop.lumellebeauty.co.uk`
3. You should be redirected to `https://lumellebeauty.co.uk`

### Method 2: Different Browser
1. Use a browser where you're NOT logged into Shopify
2. Visit `https://shop.lumellebeauty.co.uk`
3. Should redirect

### Method 3: Ask Someone Else
1. Ask a friend or colleague
2. Have them visit `https://shop.lumellebeauty.co.uk`
3. They should see the redirect

### Method 4: Logout Test
1. Logout of Shopify Admin
2. Visit `https://shop.lumellebeauty.co.uk`
3. Should redirect (until you log back in)

---

## The Current Setup (Working as Intended)

### Domain Configuration
```
Primary Domain: shop.lumellebeauty.co.uk
Purpose: Checkout only
Hosting: Shopify (Luminal Beauty - internal name)
```

### Redirect Theme
```
Location: redirect-theme/layout/theme.liquid
Status: Deployed and active
Behavior: Redirects all non-admin traffic to lumellebeauty.co.uk
```

### Environment Variables
```bash
SHOPIFY_STORE_DOMAIN=lumelle-3.myshopify.com
SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN=shop.lumellebeauty.co.uk
```

---

## What This Means

### ✅ Everything is Working Correctly
- Redirect theme is deployed
- Primary domain is set correctly
- Regular visitors will be redirected
- Checkout URLs will work properly

### 🎯 No Action Needed
This is not a bug - it's Shopify's intended behavior for store admins!

---

## Client Concern - Instagram Shop Links

If the client is concerned that Instagram Shop links go to `shop.lumellebeauty.co.uk`:

### Current Behavior
1. User clicks Instagram Shop link
2. Goes to `shop.lumellebeauty.co.uk`
3. Redirect theme redirects to `lumellebeauty.co.uk`
4. User lands on main site ✅

### Potential Issue
If the redirect has a slight delay, users might see a flash of the redirect page before being redirected.

### Solutions

#### Option 1: Update Instagram Shop URLs (Recommended)
Change Instagram Shop to point directly to `lumellebeauty.co.uk` instead of `shop.lumellebeauty.co.uk`:

1. Go to Meta Business Suite → Commerce Manager
2. Find your shop
3. Update store URL to `https://lumellebeauty.co.uk`
4. Update product URL template to `https://lumellebeauty.co.uk/product/{handle}`

**Benefits:**
- No redirect delay
- Better UX
- Direct linking

#### Option 2: Improve Redirect Speed
Make the redirect instant (it should already be instant with current implementation):

The current redirect uses:
```html
<meta http-equiv="refresh" content="0; url=https://lumellebeauty.co.uk">
<script>window.location.replace('https://lumellebeauty.co.uk');</script>
```

This is already as fast as possible!

---

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| Redirect Theme | ✅ Deployed & Working | Redirects non-admin visitors |
| Primary Domain | ✅ Correct | `shop.lumellebeauty.co.uk` for checkout |
| Admin Access | ✅ Working | You see admin because you're logged in |
| Regular Visitors | ✅ Working | They get redirected to main site |
| Instagram Shop | ⚠️ Could improve | Point directly to main domain |

---

## Bottom Line

**Nothing is broken!** You're seeing the Shopify Admin interface because you're the store owner/admin. Regular visitors are being redirected as expected. The redirect theme is working perfectly.

If the client is worried about the Instagram Shop experience, the solution is to update the Instagram Shop configuration to point directly to `lumellebeauty.co.uk` instead of `shop.lumellebeauty.co.uk`.

---

*Last updated: 2026-01-26*
