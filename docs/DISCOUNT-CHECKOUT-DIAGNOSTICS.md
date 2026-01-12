# Discount & Checkout Diagnostics Guide

## Overview

Comprehensive diagnostic logging has been added to track the entire discount and checkout flow. This will help identify where the issue occurs when users buy multiple items and the discount doesn't link properly to Shopify checkout.

## What's Been Instrumented

### 1. CartContext (`src/domains/client/shop/cart/providers/CartContext.tsx`)

**Added logging for:**
- `withCheckoutDiscountCode()` - Tracks when discount codes are appended to checkout URLs
- `syncCheckoutUrl()` - Tracks checkout URL generation from Shopify
- `syncVolumeDiscountFromItems()` - Tracks volume discount calculation and application
- `applyDiscountToBackendIfSupported()` - Tracks discount application to Shopify backend
- `add()` - Tracks items being added to cart
- `checkoutUrlWithDiscount` - Tracks when the final checkout URL with discount is recalculated

### 2. Shopify Checkout Adapter (`src/domains/platform/commerce/adapters/shopify/internal-api/checkout.ts`)

**Added logging for:**
- `beginCheckout()` - Tracks the entire checkout URL generation process
- Cart key retrieval
- Shopify cart fetch
- URL transformation (first-party proxy)

### 3. Shopify Cart Adapter (`src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts`)

**Added logging for:**
- `addLine()` - Tracks items being added to Shopify cart
- `applyDiscount()` - Tracks discount codes being sent to Shopify

## How to Test

### Step 1: Open Browser DevTools

1. Open your browser (Chrome/Firefox/Safari)
2. Navigate to your app
3. Open DevTools (F12 or Cmd+Option+I)
4. Go to the **Console** tab
5. Filter by: `🔍` to see only diagnostic logs

### Step 2: Clear Existing Cart Data

```javascript
// In browser console, run:
localStorage.removeItem('lumelle_cart')
localStorage.removeItem('lumelle_cart_discount_code')
localStorage.removeItem('lumelle_cart_key')
// Then refresh the page
location.reload()
```

### Step 3: Test the Discount Flow

**For Shower Caps (Volume Discounts):**

1. Navigate to a shower cap product page
2. Add 1 shower cap to cart
3. Add another shower cap (should trigger 5% discount - CAP2SAVE5)
4. Add a third shower cap (should upgrade to 10% discount - CAP3SAVE10)
5. Add a fourth shower cap (should upgrade to 15% discount - CAP4SAVE15)

**Watch the console for:**
- `[🔍 CART-DIAGNOSTIC]` - Cart operations
- `[🔍 CHECKOUT-DIAGNOSTIC]` - Checkout URL generation
- `[🔍 SHOPIFY-CART-DIAGNOSTIC]` - Shopify API calls

### Step 4: Test Checkout Flow

1. Open the cart (cart page or drawer)
2. Click the "Checkout" button
3. Observe the logs for:
  - Checkout URL generation
  - Discount code appending
  - Final URL with `?discount=` parameter

### Step 5: Verify in Shopify

1. The checkout URL should have `?discount=CODE` at the end
2. When redirected to Shopify, the discount should be applied
3. Check that the order total reflects the discount

## Expected Log Flow

When adding 2 shower caps:

```
[🔍 CART-DIAGNOSTIC] add called {item: {...}, qty: 1}
[🔍 CART-DIAGNOSTIC] Updated items list {nextItems: [...]}
[🔍 CART-DIAGNOSTIC] syncVolumeDiscountFromItems called {nextItems: [...]}
[🔍 CART-DIAGNOSTIC] Current discount state {current: null, currentIsVolume: false}
[🔍 CART-DIAGNOSTIC] Volume discount calculation {desiredTier: {...}, desired: "CAP2SAVE5", shouldManage: true}
[🔍 CART-DIAGNOSTIC] Updating discount code {old: null, new: "CAP2SAVE5"}
[🔍 CART-DIAGNOSTIC] Volume discount result {managed: true, code: "CAP2SAVE5"}
[🔍 SHOPIFY-CART-DIAGNOSTIC] addLine called {variantKey: "...", qty: 1}
[🔍 SHOPIFY-CART-DIAGNOSTIC] Line added, cart updated {cart: {...}}
[🔍 CART-DIAGNOSTIC] Cart updated {cart: {...}}
[🔍 CART-DIAGNOSTIC] Applying volume discount to backend
[🔍 CART-DIAGNOSTIC] applyDiscountToBackendIfSupported called {code: "CAP2SAVE5"}
[🔍 CART-DIAGNOSTIC] Calling commerce.cart.applyDiscount {code: "CAP2SAVE5"}
[🔍 SHOPIFY-CART-DIAGNOSTIC] applyDiscount called {code: "CAP2SAVE5"}
[🔍 SHOPIFY-CART-DIAGNOSTIC] Applying discount to cart {rawCartId: "...", code: "CAP2SAVE5"}
[🔍 SHOPIFY-CART-DIAGNOSTIC] Discount applied, cart updated {cart: {...}}
```

When clicking checkout:

```
[🔍 CART-DIAGNOSTIC] syncCheckoutUrl called
[🔍 CHECKOUT-DIAGNOSTIC] beginCheckout called
[🔍 CHECKOUT-DIAGNOSTIC] Stored cart key {stored: "..."}
[🔍 CHECKOUT-DIAGNOSTIC] Fetching cart {rawCartId: "..."}
[🔍 CHECKOUT-DIAGNOSTIC] Shopify cart checkout URL {checkoutUrl: "https://..."}
[🔍 CHECKOUT-DIAGNOSTIC] Final checkout URL (after handoff transformation) {url: "..."}
[🔍 CART-DIAGNOSTIC] beginCheckout response {start: {...}}
[🔍 CART-DIAGNOSTIC] Setting checkout URL {url: "..."}
[🔍 CART-DIAGNOSTIC] checkoutUrlWithDiscount recalculated {checkoutUrl: "...", discountCode: "CAP2SAVE5"}
[🔍 CART-DIAGNOSTIC] withCheckoutDiscountCode called {url: "...", code: "CAP2SAVE5"}
[🔍 CART-DIAGNOSTIC] Normalized discount code {normalized: "CAP2SAVE5", original: "CAP2SAVE5"}
[🔍 CART-DIAGNOSTIC] Discount appended to URL {finalUrl: "...?discount=CAP2SAVE5"}
```

## What to Look For

### Issues to Identify:

1. **Missing Discount Code in URL**
   - If the final URL doesn't have `?discount=CODE`, the `withCheckoutDiscountCode` function isn't working
   - Check if `discountCode` state is set correctly

2. **Discount Not Applied to Shopify Cart**
   - If you don't see `[🔍 SHOPIFY-CART-DIAGNOSTIC] applyDiscount called`, the backend isn't being called
   - Check if `commerce.cart.applyDiscount` exists

3. **Race Condition**
   - If checkout URL is fetched before discount is applied to Shopify
   - Look for timestamps: `applyDiscountToBackendIfSupported` should complete before `syncCheckoutUrl`

4. **Volume Discount Not Calculated**
   - If `syncVolumeDiscountFromItems` returns `managed: false`
   - Check if the variant key matches `variant.lumelle-shower-cap.default`

5. **Checkout URL Not Updated**
   - If discount changes but checkout URL doesn't recalculate
   - Check if `checkoutUrlWithDiscount` useMemo dependencies are correct

## Common Scenarios

### Scenario 1: Volume Discount Works But Checkout URL Missing Discount

**Problem:** Discount is calculated and applied to Shopify, but checkout URL doesn't have `?discount=`

**Check:**
- Is `discountCode` state set when `checkoutUrlWithDiscount` is calculated?
- Does `withCheckoutDiscountCode` receive both `url` and `code`?

### Scenario 2: Discount Calculated But Not Applied to Shopify

**Problem:** `syncVolumeDiscountFromItems` calculates discount, but `applyDiscountToBackendIfSupported` isn't called

**Check:**
- Is `managed` returned as `true` from `syncVolumeDiscountFromItems`?
- Does the `add()` function call `applyDiscountToBackendIfSupported(code)`?

### Scenario 3: No Volume Discount Calculated

**Problem:** Adding multiple items doesn't trigger volume discount

**Check:**
- Does the item's `id` match `variant.lumelle-shower-cap.default`?
- Is the quantity being calculated correctly?

## Next Steps After Testing

Once you've run through the test flow:

1. **Copy the console logs** from start to finish
2. **Note any errors** or unexpected behavior
3. **Check the final checkout URL** - does it have `?discount=`?
4. **Test in Shopify** - does the discount actually apply?
5. **Report findings** with:
   - The exact sequence of logs
   - Any deviations from expected flow
   - Screenshots if applicable

## Removing the Diagnostics

After fixing the issue, you can remove the diagnostic logs by searching for:
- `[🔍 CART-DIAGNOSTIC]`
- `[🔍 CHECKOUT-DIAGNOSTIC]`
- `[🔍 SHOPIFY-CART-DIAGNOSTIC]`

And removing the associated `console.log()` statements.

---

**Created:** 2026-01-12
**Purpose:** Diagnose discount/checkout flow issues with multiple items
