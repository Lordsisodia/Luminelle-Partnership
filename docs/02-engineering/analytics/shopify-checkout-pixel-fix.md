# Fixing Shopify Checkout Content ID Format for Meta Pixel

## Problem Identified

The Meta Pixel Helper shows two different content ID formats:

| Source | Event | Content ID Format | Status |
|--------|-------|-------------------|--------|
| **Our Website Code** | ViewContent, AddToCart | `shopify_GB_56829020504438` | ✅ Correct format |
| **Shopify Checkout** | InitiateCheckout, Purchase | `15488242581878` | ❌ Wrong format |

This mismatch causes:
- **0% Catalog Match Rate** - Facebook can't match Shopify checkout events to catalog items
- **InitiateCheckout not recorded** - Wrong format means event is ignored
- **Purchase events not matched** - Can't attribute sales to ads

---

## Root Cause Analysis

### Why Two Different Formats?

1. **Our Website Code** (`src/lib/analytics/metapixel.ts`)
   - Uses `formatShopifyContentId()` and `formatCartItemId()`
   - Outputs: `shopify_GB_{variant_id}` format
   - Matches Facebook Catalog expectations

2. **Shopify Checkout** (native integration)
   - Shopify's Facebook & Instagram Sales Channel
   - Sends raw Product/Variant IDs from Shopify database
   - Uses Product ID (`15488242581878`) instead of Variant ID (`56829020504438`)
   - Uses `content_type: product_group` instead of `product`

---

## Solution Options

### Option 1: Use Conversions API (CAPI) - RECOMMENDED ⭐

**Best for:** Most accurate tracking, bypasses browser blockers

**How it works:**
- Shopify sends server-to-server events directly to Facebook
- Events bypass the browser pixel entirely
- You control the content ID format

**Setup Steps:**

1. **Install Shopify Facebook Sales Channel**
   - Shopify Admin → Sales Channels → Facebook & Instagram
   - Connect Meta Business account
   - This enables Conversions API automatically

2. **Configure Data Sharing**
   - Go to Settings → Apps → Facebook & Instagram
   - Ensure "Data sharing" is enabled
   - This sends server-side events with proper IDs

3. **Use Pixel Helper to Verify**
   - Check that events show both Pixel and CAPI indicators
   - Content IDs should match catalog format

**Pros:**
- ✅ Works even with ad blockers
- ✅ More reliable tracking
- ✅ Better deduplication
- ✅ Future-proof (Meta is moving toward CAPI)

**Cons:**
- ⚠️ Requires Shopify Facebook Sales Channel setup
- ⚠️ Can't be fully controlled by custom code

---

### Option 2: Configure Catalog to Accept Product IDs

**Best for:** Quick fix without changing Shopify setup

**How it works:**
- Reconfigure Facebook Catalog to use Product ID instead of Variant ID
- All events use the same ID format

**Setup Steps:**

1. **Check Current Catalog ID Format**
   ```
   Meta Business Suite → Commerce Manager → Catalog → Data Sources
   Look at the "Item ID" column for products
   ```

2. **Update Catalog Settings**
   - If catalog uses Variant IDs, change to Product IDs
   - This depends on how Shopify synced the catalog

**Pros:**
- ✅ Quick fix
- ✅ No code changes needed

**Cons:**
- ⚠️ Less granular tracking (can't distinguish variants)
- ⚠️ May affect dynamic ads that need variant-level data

---

### Option 3: Custom Checkout with Our Pixel

**Best for:** Full control over event format

**How it works:**
- Build custom checkout flow instead of using Shopify checkout
- Use our `trackInitiateCheckout()` and `trackPurchase()` functions
- All events use `shopify_GB_{variant_id}` format

**Setup Steps:**

1. **Create custom checkout page**
   ```tsx
   // src/domains/client/shop/checkout/ui/pages/CustomCheckout.tsx
   import { trackInitiateCheckout } from '@/lib/analytics/metapixel'

   function CustomCheckout({ cart }) {
     useEffect(() => {
       const contentIds = cart.items.map(item =>
         formatCartItemId(item.variantId)
       )

       trackInitiateCheckout({
         content_ids: contentIds,
         value: cart.total,
         currency: 'GBP',
         num_items: cart.items.length,
       })
     }, [cart])

     // Your checkout UI...
   }
   ```

2. **Handle payment via Stripe/Payment Element**
   - Don't redirect to Shopify checkout
   - Process payment on your own domain
   - Send order data to Shopify via API after payment

**Pros:**
- ✅ Full control over event format
- ✅ Consistent ID format across all events
- ✅ Can track more custom events

**Cons:**
- ⚠️ Significant development effort
- ⚠️ Lose Shopify checkout features (Shop Pay, etc.)
- ⚠️ PCI compliance burden

---

### Option 4: Disable Shopify Pixel, Use Only Ours

**Best for:** Temporary fix while implementing Option 1

**How it works:**
- Disable Shopify's Facebook & Instagram Sales Channel pixel
- Use only our client-side pixel
- Manually send Purchase events after order completion

**Setup Steps:**

1. **Disable Shopify Pixel**
   - Shopify Admin → Sales Channels → Facebook & Instagram
   - Disconnect or disable pixel tracking

2. **Add Purchase tracking to order confirmation**
   ```tsx
   // src/domains/client/shop/checkout/ui/pages/OrderConfirmationPage.tsx
   import { trackPurchase } from '@/lib/analytics/metapixel'

   function OrderConfirmationPage({ order }) {
     useEffect(() => {
       const contentIds = order.lineItems.map(item =>
         formatCartItemId(item.variantId)
       )

       trackPurchase({
         content_ids: contentIds,
         value: order.totalPrice,
         currency: 'GBP',
         num_items: order.lineItems.length,
       })
     }, [order])

     return <ThankYouPage />
   }
   ```

**Pros:**
- ✅ Consistent ID format
- ✅ Quick to implement

**Cons:**
- ⚠️ Lose server-side tracking
- ⚠️ Events blocked by ad blockers
- ⚠️ Less reliable overall

---

## Recommended Approach

### Phase 1: Immediate Fix (This Week)

**Implement Option 4 - Disable Shopify Pixel, Use Ours**

This gives us:
- ✅ Consistent `shopify_GB_56829020504438` format across all events
- ✅ Working InitiateCheckout and Purchase tracking
- ✅ Improved catalog match rate

**Code changes needed:**
1. Add Purchase event tracking to OrderConfirmationPage
2. Optionally disable Shopify pixel in Facebook & Instagram settings

---

### Phase 2: Long-term Solution (Next Sprint)

**Implement Option 1 - Conversions API**

This gives us:
- ✅ Server-side tracking (can't be blocked)
- ✅ Best possible data accuracy
- ✅ Future-proof setup

**Setup steps:**
1. Configure Shopify Facebook & Instagram Sales Channel
2. Enable Data Sharing in app settings
3. Verify events flow via CAPI
4. Keep our client-side pixel for deduplication

---

## Action Items

### For Developer (You)

- [ ] Add `trackPurchase()` to OrderConfirmationPage
- [ ] Test Purchase event fires correctly
- [ ] Verify content IDs match catalog format
- [ ] Document the changes

### For Client (James)

- [ ] Option A: Disable Shopify pixel in Facebook & Instagram settings
- [ ] Option B: Configure Shopify Facebook & Instagram Sales Channel for CAPI
- [ ] Check catalog ID format in Meta Commerce Manager
- [ ] Verify events after 24-48 hours

---

## Expected Results

### Before Fix

| Metric | Value |
|--------|-------|
| Catalog Match Rate | 0% |
| ViewContent events | ✅ Working |
| AddToCart events | ✅ Working |
| InitiateCheckout events | ⚠️ Wrong ID format |
| Purchase events | ⚠️ Wrong ID format |

### After Fix (Phase 1)

| Metric | Expected |
|--------|----------|
| Catalog Match Rate | 80%+ |
| ViewContent events | ✅ Working |
| AddToCart events | ✅ Working |
| InitiateCheckout events | ✅ Working, correct format |
| Purchase events | ✅ Working, correct format |

### After Fix (Phase 2 - CAPI)

| Metric | Expected |
|--------|----------|
| Catalog Match Rate | 90%+ |
| All events | ✅ Server-side + client-side |
| Ad blocking impact | ✅ Minimal (CAPI bypasses) |
| Data accuracy | ✅ Maximum |

---

## Sources

- [Shopify & Facebook - Catalog content ID mismatch](https://community.shopify.com/t/shopify-facebook-catalog-content-id-mismatch-blocking-use-of-dynamic-catalog-retargeting-ads/194941)
- [How to send content_IDs with facebook pixel](https://community.shopify.com/t/how-to-send-content-ids-with-facebook-pixel/31560)
- [Manage Variants in Your Catalog in Commerce Manager](https://www.facebook.com/business/help/2256580051262113)
- [About managing your catalogue with Shopify](https://en-gb.facebook.com/business/help/1046957249463415)
- [How to Setup Conversion API for Shopify](https://www.customerlabs.com/blog/setup-facebook-conversion-api-on-shopify-native-integration/)
- [Shopify Help: Facebook Data Sharing](https://help.shopify.com/en/manual/promoting-marketing/analyze-marketing/meta-data-sharing)
