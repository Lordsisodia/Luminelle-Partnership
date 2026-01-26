# shop.lumellebeauty.co.uk Redirect Issue - Deep Dive Analysis

**Date:** 2026-01-26
**Status:** Critical - Client Frustrated
**Priority:** High

---

## Executive Summary

The client is experiencing frustration because links (particularly from Instagram Shop) are directing users to `shop.lumellebeauty.co.uk`, which either:
1. Shows a generic Shopify app page instead of the custom headless storefront
2. Should redirect to `lumellebeauty.co.uk` but the redirection isn't working consistently

**Root Cause:** The headless architecture setup with Shopify requires specific DNS and domain configuration that appears to be partially incomplete or misconfigured.

---

## Current Architecture Overview

### Domain Setup
```
lumellebeauty.co.uk        → Cloudflare Pages (Headless App)
shop.lumellebeauty.co.uk   → Shopify (intended as checkout/backend domain)
lumelle-3.myshopify.com    → Shopify internal domain
```

### Environment Configuration
```bash
# From .env
SHOPIFY_STORE_DOMAIN=lumelle-3.myshopify.com
SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN=shop.lumellebeauty.co.uk
VITE_SHOPIFY_STORE_DOMAIN=lumelle-3.myshopify.com
```

### Intended Flow
1. **Main Site:** `lumellebeauty.co.uk` serves the Next.js headless storefront
2. **Checkout:** When user clicks "Checkout", they should be redirected to `shop.lumellebeauty.co.uk` for Shopify checkout
3. **Shopify:** `shop.lumellebeauty.co.uk` serves Shopify's checkout pages
4. **Return Path:** After checkout, users return to `lumellebeauty.co.uk`

---

## The Problem: What's Actually Happening

### Issue 1: Instagram Shop Links
- **Expected:** Instagram shop links should go to `lumellebeauty.co.uk/product/*` or have a seamless redirect
- **Actual:** Links go to `shop.lumellebeauty.co.uk`, showing the Shopify app interface
- **User Impact:** Confusing, inconsistent branding, users see generic Shopify instead of custom Lumelle experience

### Issue 2: Redirect Theme Not Working
The project has a redirect theme at `redirect-theme/layout/theme.liquid`:
```liquid
<meta http-equiv="refresh" content="0; url=https://lumellebeauty.co.uk">
<script>window.location.replace('https://lumellebeauty.co.uk');</script>
```

**Critical Question:** Is this redirect theme actually deployed to the Shopify store?

If NOT deployed: When users visit `shop.lumellebeauty.co.uk`, they see the default Shopify "Online Store" theme instead of being redirected.

### Issue 3: Shopify Primary Domain Configuration
From `docs/02-engineering/technical/shopify-integration.md`:
> In Shopify Admin → Settings → Domains, set Shopify's primary domain to a Shopify-served domain (recommended: a dedicated subdomain like `shop.yourbrand.com`)

**Required Action:** Shopify's primary domain MUST be set to `shop.lumellebeauty.co.uk`, NOT `lumellebeauty.co.uk`

---

## Technical Deep Dive: Checkout Proxy Architecture

### How It Should Work

The codebase includes a sophisticated checkout proxy system at:
- `functions/cart/c/[[catchall]].ts` - Proxies `/cart/c/*` requests
- `functions/checkouts/[[catchall]].ts` - Proxies `/checkouts/*` requests
- `functions/_lib/shopifyCheckoutProxy.ts` - Core proxy logic

**What the proxy does:**
1. Intercepts requests to `/cart/c/*` and `/checkouts/*` on the main domain
2. Forwards them to the upstream Shopify domain (`shop.lumellebeauty.co.uk`)
3. Rewrites URLs in the response to keep users on the main domain
4. Handles cookies and redirects transparently

**Key Validation** (from `shopifyCheckoutProxy.ts:213-223`):
```typescript
if (upstreamHost.toLowerCase() === currentHost.toLowerCase()) {
  return new Response(
    errorHtml({
      currentHost,
      upstreamHost,
      requestedPath: currentPath,
      reason: `Upstream host is configured as the same as the current host (${currentHost}). This would self-fetch and loop.`,
    }),
    { status: 500, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } },
  )
}
```

**This confirms:** The proxy expects `SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN` to be DIFFERENT from the current host.

### Current Configuration Check
```bash
SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN=shop.lumellebeauty.co.uk
```

This is CORRECT - it's different from `lumellebeauty.co.uk`.

---

## Root Cause Analysis

### Scenario A: Redirect Theme Not Deployed
**Symptoms:**
- Visiting `shop.lumellebeauty.co.uk` shows Shopify default theme
- No redirect occurs

**Fix:**
1. Go to Shopify Admin → Online Store → Themes
2. Upload/publish the `redirect-theme` as the main theme
3. Set it as the published theme for `shop.lumellebeauty.co.uk`

### Scenario B: Shopify Primary Domain Misconfigured
**Symptoms:**
- Checkout URLs from Shopify API point to `lumellebeauty.co.uk/cart/c/*`
- These URLs load the SPA instead of Shopify checkout

**Fix:**
1. Go to Shopify Admin → Settings → Domains
2. Set primary domain to `shop.lumellebeauty.co.uk`
3. Ensure `lumellebeauty.co.uk` is NOT set as primary in Shopify

### Scenario C: DNS Not Configured
**Symptoms:**
- `shop.lumellebeauty.co.uk` doesn't resolve
- Shows DNS error

**Fix:**
1. In Cloudflare DNS, add CNAME record:
   - **Name:** `shop`
   - **Target:** `lumelle-3.myshopify.com`
   - **Proxy:** DNS Only (not proxied)

### Scenario D: Instagram Shop Configuration
**Symptoms:**
- Instagram shop links point to wrong domain

**Fix:**
1. Go to Meta Business Suite → Commerce → Instagram Shop
2. Update shop URL to `lumellebeauty.co.uk` instead of `shop.lumellebeauty.co.uk`
3. OR configure Instagram to use the correct product URLs from Shopify catalog

---

## Client's Specific Complaint (from WhatsApp)

The client mentioned that clicking on `shop.lumellebeauty.co.uk` "keeps taking them to the Shopify app" and they expect a redirect to happen.

**Expected Behavior:**
- `shop.lumellebeauty.co.uk` → redirects to → `lumellebeauty.co.uk`

**Why This Should Happen:**
The redirect theme should handle this, but it may not be deployed.

**Alternative Approach:**
If we want `shop.lumellebeauty.co.uk` to serve Shopify checkout, then:
1. Keep checkout URLs pointing to `shop.lumellebeauty.co.uk`
2. Don't redirect the homepage
3. Only redirect product/collection pages

---

## Immediate Action Items

### 1. Verify Redirect Theme Deployment
**Status:** Unknown
**Action Required:**
- [ ] Log into Shopify Admin
- [ ] Check if `redirect-theme` is published
- [ ] If not, deploy it immediately

### 2. Verify Shopify Primary Domain
**Status:** Unknown
**Action Required:**
- [ ] Go to Shopify Admin → Settings → Domains
- [ ] Confirm primary domain is `shop.lumellebeauty.co.uk`
- [ ] Confirm `lumellebeauty.co.uk` is connected but not primary

### 3. Verify DNS Configuration
**Status:** Unknown
**Action Required:**
- [ ] Check Cloudflare DNS for `shop.lumellebeauty.co.uk`
- [ ] Verify CNAME points to `lumelle-3.myshopify.com`
- [ ] Ensure it's DNS-only (grey cloud)

### 4. Update Instagram Shop Configuration
**Status:** Not Done
**Action Required:**
- [ ] Go to Meta Business Suite
- [ ] Update Instagram Shop URLs
- [ ] Use `lumellebeauty.co.uk` for product links
- [ ] Use `shop.lumellebeauty.co.uk` only for checkout

### 5. Test Complete Flow
**Status:** Not Done
**Action Required:**
- [ ] Test: `shop.lumellebeauty.co.uk` → should redirect or show Shopify
- [ ] Test: Checkout from cart → should go to `shop.lumellebeauty.co.uk`
- [ ] Test: Instagram shop link → should go to `lumellebeauty.co.uk`
- [ ] Test: Complete purchase flow

---

## Recommended Solution

### Option A: Redirect Everything (Simpler)
Make `shop.lumellebeauty.co.uk` redirect ALL traffic to `lumellebeauty.co.uk`:

**Pros:**
- All traffic goes to custom storefront
- Consistent branding
- Simpler to manage

**Cons:**
- No Shopify-hosted checkout (checkout runs through proxy)
- Uses more Cloudflare Functions quota
- Instagram shop may have issues

### Option B: Hybrid Approach (Recommended)
Keep Shopify checkout on `shop.lumellebeauty.co.uk` but redirect non-checkout traffic:

**Pros:**
- Native Shopify checkout experience
- Less Functions quota usage
- Better Instagram Shop integration

**Cons:**
- More complex setup
- Need to configure which paths redirect

**Implementation:**
```liquid
{%# redirect-theme/layout/theme.liquid #}
{% if request.path != '/cart' and request.path != '/cart/' and request.path != '/account' %}
  <script>window.location.replace('https://lumellebeauty.co.uk');</script>
{% else %}
  {{ content_for_layout }}
{% endif %}
```

---

## Documentation References

### Relevant Files
- `redirect-theme/layout/theme.liquid` - Redirect theme (needs deployment)
- `functions/_lib/shopifyCheckoutProxy.ts` - Checkout proxy logic
- `functions/cart/c/[[catchall]].ts` - Cart route handler
- `functions/checkouts/[[catchall]].ts` - Checkout route handler
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx` - Cart page with URL transformation

### Documentation
- `docs/02-engineering/technical/shopify-integration.md` - Architecture guide
- `docs/for-james/meta-pixel-status.md` - Meta integration status

---

## Questions for Investigation

1. **Is the redirect theme actually deployed to Shopify?**
   - If not, this is the primary issue

2. **What is Shopify's primary domain set to?**
   - Should be `shop.lumellebeauty.co.uk`

3. **How is Instagram Shop configured?**
   - Where does it pull product URLs from?

4. **Does the client want Shopify checkout on the same domain or separate?**
   - Affects whether we use proxy or redirect

5. **What exactly does the client see when they click the link?**
   - Need screenshots of current behavior

---

## Next Steps

1. **Immediate:** Get access to Shopify Admin to verify theme deployment
2. **Today:** Fix redirect theme or Shopify domain configuration
3. **This Week:** Update Instagram Shop configuration
4. **Ongoing:** Monitor and test the complete user flow

---

*This analysis is based on code review and documentation. Actual Shopify Admin configuration may differ.*
