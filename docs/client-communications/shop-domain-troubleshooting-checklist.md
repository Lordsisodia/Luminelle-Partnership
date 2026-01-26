# Shop Domain Redirect Issue - Troubleshooting Checklist

**Use this checklist when diagnosing the shop.lumellebeauty.co.uk redirect issue**

---

## Phase 1: Verify Current State (10 minutes)

### Step 1: Test DNS Resolution
```bash
# Run these commands
dig shop.lumellebeauty.co.uk
nslookup shop.lumellebeauty.co.uk
```

**Expected:** CNAME pointing to `lumelle-3.myshopify.com`
**If fails:** DNS is misconfigured → Go to Phase 2

### Step 2: Test Direct Access
1. Open browser incognito window
2. Visit `https://shop.lumellebeauty.co.uk`
3. Observe what appears

**If you see:**
- Shopify store/theme → Redirect theme not deployed
- Lumelle site → Redirect working correctly
- DNS error → DNS misconfigured
- SSL error → SSL certificate issue

### Step 3: Test Checkout Flow
1. Go to `https://lumellebeauty.co.uk`
2. Add item to cart
3. Click checkout
4. Observe where you go

**Expected:** Either `shop.lumellebeauty.co.uk` or stays on `lumellebeauty.co.uk` with `/cart/c/*` URL

---

## Phase 2: DNS Configuration (15 minutes)

### Check Cloudflare DNS
1. Log into Cloudflare
2. Select `lumellebeauty.co.uk` zone
3. Go to DNS → Records
4. Look for `shop` subdomain

**Required Configuration:**
```
Type: CNAME
Name: shop
Target: lumelle-3.myshopify.com
Proxy Status: DNS Only (grey cloud)
TTL: Auto
```

**If missing:** Add the CNAME record
**If proxied (orange cloud):** Click to turn it DNS-only

---

## Phase 3: Shopify Configuration (20 minutes)

### Step 1: Check Primary Domain
1. Go to Shopify Admin
2. Settings → Domains
3. Find "Primary domain" setting

**Current primary domain should be:** `shop.lumellebeauty.co.uk`

**If set to `lumellebeauty.co.uk`:**
1. Click "Change primary domain"
2. Select `shop.lumellebeauty.co.uk`
3. Confirm change

### Step 2: Verify Connected Domains
In the same Domains settings page, verify:
- `lumellebeauty.co.uk` is connected (not primary)
- `shop.lumellebeauty.co.uk` is connected and primary
- `lumelle-3.myshopify.com` is available

### Step 3: Check Theme Deployment
1. Go to Online Store → Themes
2. Look at "Current theme"

**You should see:**
- Theme named "Redirect" or similar
- When you click "Actions → Edit code", you should see `layout/theme.liquid` with redirect code

**If not deployed:**
1. Find the redirect theme in the theme library
2. Click "Publish"
3. Or upload the redirect theme from `redirect-theme/` directory

### Step 4: Verify Redirect Theme Code
The published theme's `layout/theme.liquid` should contain:
```liquid
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Lumelle — redirecting…</title>
    <meta http-equiv="refresh" content="0; url=https://lumellebeauty.co.uk">
    <script>window.location.replace('https://lumellebeauty.co.uk');</script>
  </head>
  <body>
    <p>Redirecting to <a href="https://lumellebeauty.co.uk">lumellebeauty.co.uk</a>…</p>
  </body>
</html>
```

---

## Phase 4: Instagram/Facebook Shop (15 minutes)

### Step 1: Check Meta Commerce Manager
1. Go to Meta Business Suite
2. Commerce → Commerce Manager
3. Select your shop
4. Go to Settings → Checkout

**Checkout URL should be:** `https://lumellebeauty.co.uk`

**If set to `shop.lumellebeauty.co.uk`:**
1. Update to `https://lumellebeauty.co.uk`
2. Save changes

### Step 2: Verify Catalog Settings
In Commerce Manager:
1. Go to Catalog
2. Check product URLs
3. They should point to `https://lumellebeauty.co.uk/product/[handle]`

**If wrong:**
1. Update product URL template
2. Or sync catalog with correct URLs

---

## Phase 5: Test Complete Flow (10 minutes)

### Test 1: Direct Redirect
1. Visit `https://shop.lumellebeauty.co.uk`
2. Should redirect to `https://lumellebeauty.co.uk`

**If no redirect:** Theme not deployed or domain not primary

### Test 2: Cart to Checkout
1. Go to `https://lumellebeauty.co.uk`
2. Add product to cart
3. Click "Secure checkout"
4. Observe URL

**Expected outcomes:**
- Option A: Goes to `shop.lumellebeauty.co.uk` (Shopify checkout)
- Option B: Stays on `lumellebeauty.co.uk/cart/c/*` (proxy checkout)

Both are valid - depends on configuration preference.

### Test 3: Instagram Shop Link
1. Open Instagram
2. Go to Lumelle's profile
3. Tap Shop button
4. Tap on a product
5. Observe where it goes

**Expected:** `lumellebeauty.co.uk/product/[handle]`

---

## Phase 6: Proxy Configuration (if using proxy)

If you want checkout to stay on `lumellebeauty.co.uk` (using proxy):

### Step 1: Verify Environment Variables
In production (Cloudflare Pages environment):
```
SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN=shop.lumellebeauty.co.uk
```

### Step 2: Test Proxy
1. Add item to cart on `lumellebeauty.co.uk`
2. Click checkout
3. Should see Shopify checkout but URL stays `lumellebeauty.co.uk/cart/c/*`

### Step 3: Check for Errors
If you see "Checkout unavailable" error:
1. Open browser DevTools Console
2. Look for error messages
3. Check Network tab for failed requests

**Common errors:**
- "Upstream host is same as current" → Domain config issue
- "Missing SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN" → Env var missing
- "Shopify redirected back to current host" → Shopify primary domain wrong

---

## Quick Diagnostic Commands

```bash
# DNS check
dig shop.lumellebeauty.co.uk +short

# SSL check
curl -I https://shop.lumellebeauty.co.uk

# Redirect check
curl -I https://shop.lumellebeauty.co.uk 2>&1 | grep -i location

# Trace full redirect chain
curl -v https://shop.lumellebeauty.co.uk 2>&1 | grep -i "< location"
```

---

## Decision Tree: What Approach to Use?

### Question: Do you want Shopify checkout on same domain?

**YES:** Use proxy approach
- Keep `SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN=shop.lumellebeauty.co.uk`
- Ensure redirect theme ONLY redirects non-checkout URLs
- Test proxy functionality

**NO:** Use separate domain
- Deploy redirect theme to redirect everything from shop subdomain
- Let checkout URLs go to `shop.lumellebeauty.co.uk`
- Users will see domain change during checkout

---

## Emergency Rollback

If something breaks:

### Rollback DNS Change
```bash
# In Cloudflare DNS
# Delete or disable the shop CNAME record
```

### Rollback Shopify Primary Domain
1. Shopify Admin → Settings → Domains
2. Change primary back to `lumelle-3.myshopify.com`
3. Save

### Rollback Theme Change
1. Online Store → Themes
2. Publish previous theme
3. unpublish redirect theme

---

## Contact Information

For issues requiring Shopify/Meta access:
- Client should provide admin access
- Or developer guides client through changes

---

## Common Error Messages

### "This checkout link can't load here"
**Meaning:** Checkout URL pointed to main domain instead of Shopify
**Fix:** Check Shopify primary domain configuration

### "Checkout unavailable" with proxy error
**Meaning:** Proxy can't connect to upstream
**Fix:** Verify `SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN` and DNS

### "Too many redirects"
**Meaning:** Redirect loop between domains
**Fix:** Check redirect theme logic and Shopify primary domain

---

*Last updated: 2026-01-26*
