# How to Verify Meta Pixel Fixes

## 1. Browser Console Verification (Immediate)

### Step 1: Open the website
Go to: https://lumellebeauty.co.uk

### Step 2: Open Browser DevTools
- **Chrome/Edge**: F12 or Cmd+Option+I (Mac)
- **Firefox**: F12 or Cmd+Option+I (Mac)

### Step 3: Check Pixel is Loaded
In Console tab, type:
```javascript
typeof fbq
```
**Expected result:** `"function"`

If it returns `"undefined"`, the pixel isn't loaded.

### Step 4: Check Pixel ID
In Console tab, type:
```javascript
fbq.instance?.pixelId
```
**Expected result:** `"1494559081624608"`

### Step 5: Enable Debug Logging
In Console tab, type:
```javascript
fbq('set', 'config', { enableBatching: false })
```

Then check Network tab -> filter by "facebook" -> look for requests

---

## 2. Test Specific Events (Immediate)

### Test ViewContent Event
1. Go to a product page: https://lumellebeauty.co.uk/product/lumelle-shower-cap
2. Open Network tab in DevTools
3. Filter by "facebook" or "fbevents"
4. Look for a POST request to `facebook.com/tr/`
5. Click on it and check Payload
6. **Expected:** Should contain `event_name: "ViewContent"` and `content_ids: ["shopify_GB_56829020504438"]`

### Test AddToCart Event
1. Go to product page
2. Click "Add to cart" button
3. Check Network tab for Facebook request
4. **Expected:** Should contain `event_name: "AddToCart"`

### Test InitiateCheckout Event
1. Add item to cart
2. Go to cart page
3. Click "Secure checkout" button
4. Quickly check Network tab
5. **Expected:** Should contain `event_name: "InitiateCheckout"`

---

## 3. Meta Pixel Helper Chrome Extension

Install the official Meta Pixel Helper:
- Chrome: https://chrome.google.com/webstore/detail/meta-pixel-helper/
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/meta-pixel-helper/

**After installing:**
1. Visit https://lumellebeauty.co.uk
2. Click the Pixel Helper icon in your browser toolbar
3. **Expected result:** 
   - Pixel ID: 1494559081624608
   - Status: Active
   - Last event received: (should show recent events)

---

## 4. Verify Code Changes (Immediate)

Check if the deployed code has the fixes:

1. Open https://lumellebeauty.co.uk
2. View Page Source (Cmd+U on Mac)
3. Search for "1494559081624608" (pixel ID)
4. **Expected:** Should find the pixel initialization code

---

## 5. Events Manager Verification (24-48 hours later)

### Step 1: Go to Meta Events Manager
https://business.facebook.com/events_manager2

### Step 2: Select "Lumelle's pixel" (ID: 1494559081624608)

### Step 3: Check the Dashboard
**After 24-48 hours you should see:**

| Metric | Before | After (Expected) |
|--------|--------|------------------|
| ViewContent events | ❌ Missing | ✅ Received |
| AddToCart events | ❌ Missing | ✅ Received |
| InitiateCheckout events | ❌ Missing | ✅ Received |
| Purchase events | ❌ Missing | ✅ Received* |

*Purchase requires actual checkout completion

### Step 4: Check Test Events
In Events Manager, go to Test Events to see real-time events from your browser.

---

## 6. Catalog Match Rate (48-72 hours later)

In Events Manager → Overview:
- Before: 0% match rate
- After: Should start increasing toward 90%

---

## 7. Server-Side Verification (Check Logs)

Check if Vercel deployed successfully:
https://vercel.com/[your-username]/lumelle/deployments

Look for the latest deployment with commits:
- `fix(meta-pixel): add InitiateCheckout tracking...`
- `fix(products): add hardcoded Shopify product...`

---

## Quick Verification Checklist

| Check | How | Expected Result |
|-------|-----|-----------------|
| Pixel loaded | Console: `typeof fbq` | `"function"` |
| Pixel ID correct | Console: `fbq.instance?.pixelId` | `"1494559081624608"` |
| ViewContent fires | Network tab on product page | Facebook request with ViewContent |
| AddToCart fires | Network tab after adding | Facebook request with AddToCart |
| InitiateCheckout fires | Network tab at checkout | Facebook request with InitiateCheckout |
| Pixel Helper | Browser extension | Shows active pixel |
| Events in Manager | Events Manager dashboard | Events appear after 24-48h |
