# Meta Pixel Integration Guide

This project includes a Meta (Facebook) Pixel integration that sends conversion data to both Meta for ad optimization AND your own analytics systems (PostHog + database).

## Why Use This Integration?

**Dual Tracking Strategy:**
1. **Meta Pixel** → Optimizes Facebook/Instagram ads, enables retargeting
2. **Your Database** → You own the data, can correlate ad performance with customer LTV, repeat purchases, etc.

## Architecture

```
User Action
    ↓
Client Event (trackPurchase, etc.)
    ↓
├─→ Meta Pixel (fbq) → Facebook Ads Manager
└─→ PostHog → Your Analytics Dashboard

Shopify Checkout → Meta Pixel Webhook → Your API → Database
```

## Setup Instructions

### 1. Get Meta Pixel ID

1. Go to [Meta Business Manager](https://business.facebook.com/)
2. Navigate to **Data Sources** → **Pixels**
3. Create a new pixel or find your existing pixel ID
4. Copy the pixel ID (15-17 digit number)

### 2. Configure Environment Variable

Add to your `.env` file:

```bash
VITE_META_PIXEL_ID=1234567890123456
```

### 3. Enable Analytics

```bash
VITE_ANALYTICS_ENABLED=true
```

### 4. Run Database Migration

```bash
# Using Supabase CLI
supabase migration up

# Or apply via the Supabase dashboard
```

### 5. (Optional) Configure Shopify Sales Channel

For most accurate e-commerce tracking, use Shopify's native Facebook & Instagram sales channel:

1. In Shopify Admin, go to **Sales Channels** → **Facebook & Instagram**
2. Connect your Meta Business account
3. Shopify will automatically:
   - Create product catalog
   - Track purchases from checkout
   - Send data to Meta Pixel

## Usage

### Initialize Pixel (App Root)

```tsx
import { initMetaPixel } from '@/lib/analytics/metapixel'

function App() {
  useEffect(() => {
    initMetaPixel()
  }, [])

  return <YourApp />
}
```

### Track Product View

```tsx
import { trackViewContent } from '@/lib/analytics/metapixel'

function ProductPage({ product }) {
  useEffect(() => {
    trackViewContent({
      content_name: product.title,
      content_ids: [product.shopifyId],
      value: product.price,
      currency: 'GBP',
    })
  }, [product])

  return <ProductDetails product={product} />
}
```

### Track Add to Cart

```tsx
import { trackAddToCart } from '@/lib/analytics/metapixel'

function AddToCartButton({ product }) {
  const handleAdd = () => {
    // Add to cart logic...

    trackAddToCart({
      content_name: product.title,
      content_ids: [product.shopifyId],
      value: product.price,
      currency: 'GBP',
    })
  }

  return <button onClick={handleAdd}>Add to Cart</button>
}
```

### Track Purchase

```tsx
import { trackPurchase } from '@/lib/analytics/metapixel'

function CheckoutSuccess({ order }) {
  useEffect(() => {
    trackPurchase({
      content_ids: order.lineItems.map(item => item.shopifyProductId),
      value: order.totalPrice,
      currency: 'GBP',
      num_items: order.lineItems.length,
    })
  }, [order])

  return <ThankYouPage order={order} />
}
```

## Data Flow

### Client-Side Events

When a user takes an action (view, add to cart):

1. Event is sent to Meta Pixel via `fbq()` → Facebook Ads Manager
2. Same event is sent to PostHog via `captureEvent()` → Your analytics
3. You get attribution data in both systems

### Server-Side Events (Purchase)

When a purchase completes in Shopify checkout:

1. Shopify's Meta Pixel integration sends event to Facebook
2. (Optional) Your webhook endpoint receives the event
3. Event is stored in `meta_pixel_events` table
4. You can query this data for ad performance analysis

## Querying Ad Performance

### Get Total Ad-Attributed Revenue

```sql
SELECT
  pixel_id,
  COUNT(*) as conversions,
  SUM(value) as total_revenue,
  AVG(value) as avg_order_value
FROM public.meta_pixel_events
WHERE event_type = 'purchase'
  AND timestamp >= NOW() - INTERVAL '30 days'
GROUP BY pixel_id;
```

### Get Conversions by Product

```sql
SELECT
  UNNEST(content_ids) as product_id,
  COUNT(*) as purchases,
  SUM(value) as revenue
FROM public.meta_pixel_events
WHERE event_type = 'purchase'
GROUP BY product_id
ORDER BY revenue DESC;
```

### Correlate with Customer Data

```sql
SELECT
  mpe.value as ad_attributed_revenue,
  o.total as order_total,
  o.customer_id,
  o.created_at
FROM public.meta_pixel_events mpe
JOIN public.orders o ON o.id = mpe.order_id
WHERE mpe.event_type = 'purchase';
```

## Privacy & Consent

The integration respects user consent:

- Events only fire if `VITE_ANALYTICS_ENABLED=true`
- Respects cookie consent preferences (if implemented)
- No PII sent to Meta (only product IDs and values)

## Troubleshooting

### Pixel Not Firing

1. Check browser console for errors
2. Verify `VITE_META_PIXEL_ID` is set
3. Check Meta Pixel Helper browser extension
4. Ensure `initMetaPixel()` is called

### Events Not Appearing in Meta

1. Events can take up to 20 minutes to appear
2. Check Meta Events Manager
3. Verify pixel ID matches your Meta Business account

### Webhook Not Receiving Data

1. Ensure Shopify Facebook sales channel is configured
2. Check webhook URL is accessible
3. Verify Supabase migration was applied
4. Check server logs for errors

## Important Notes

1. **Test Mode**: Meta Pixel has a test mode - use it during development
2. **GDPR/CCPA**: Ensure you have proper consent mechanisms for EU/California users
3. **Value of Events**: Only `Purchase` events have meaningful monetary value
4. **Attribution Window**: Meta attributes conversions up to 28 days after click
5. **Cost**: Meta Pixel is free, but you'll pay for ad spend
