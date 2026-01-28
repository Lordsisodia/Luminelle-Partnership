# Analytics Quick Reference

Quick reference for PostHog + Clarity analytics.

---

## Environment Variables

```bash
# Enable analytics (set to true when ready)
VITE_ANALYTICS_ENABLED=true
VITE_HEATMAP_ENABLED=true
VITE_EXPERIMENTS_ENABLED=true  # Only when running experiments

# PostHog
VITE_POSTHOG_KEY=phc_xxxxx
VITE_POSTHOG_HOST=https://us.i.posthog.com  # or eu.i.posthog.com

# Clarity
VITE_CLARITY_PROJECT_ID=xxxxx
```

---

## Code Snippets

### Track an Event

```typescript
import { captureEvent } from '@/lib/analytics/posthog'

captureEvent('cta_clicked', {
  button_id: 'hero_add_to_cart',
  location: 'product_page',
})
```

### Run an A/B Test

```typescript
import { getFeatureFlagVariant } from '@/lib/analytics/posthog'
import { captureExperimentExposure } from '@/lib/analytics/posthog'

// Get variant (or default to control)
const variant = getFeatureFlagVariant('hero_cta_copy') || 'control'

// Log exposure (once per session)
captureExperimentExposure('hero_cta_copy', variant)

// Render based on variant
{variant === 'bold' ? <BoldCTA /> : <DefaultCTA />}
```

### Track Page View

```typescript
import { captureEvent } from '@/lib/analytics/posthog'

captureEvent('page_view', {
  page_title: document.title,
  page_path: window.location.pathname,
})
```

### Custom Clarity Event

```typescript
import { trackClarityEvent } from '@/lib/analytics/clarity'

trackClarityEvent('checkout_started')
```

### Tag Clarity Session

```typescript
import { tagExperimentVariant } from '@/lib/analytics/clarity'

tagExperimentVariant('hero_cta_copy', 'bold')
```

---

## Dashboard Links

| Tool | Dashboard | What to Check |
|------|-----------|---------------|
| **PostHog** | app.posthog.com → Events | All events coming through |
| **PostHog** | app.posthog.com → Funnels | Conversion rates |
| **PostHog** | app.posthog.com → Feature Flags | Active experiments |
| **Clarity** | clarity.microsoft.com → Recordings | User sessions |
| **Clarity** | clarity.microsoft.com → Heatmaps | Click patterns |
| **Clarity** | clarity.microsoft.com → Funnel | Drop-off points |

---

## Event Schema

### Standard Events

| Event | Properties | When to Track |
|-------|------------|---------------|
| `page_view` | `page_path`, `page_title` | On route change |
| `experiment_exposure` | `experiment_key`, `variant` | When variant assigned |
| `cta_click` | `button_id`, `location` | On CTA click |
| `add_to_cart` | `product_id`, `variant` | On add to cart |
| `begin_checkout` | (auto from cart attributes) | Before checkout redirect |
| `purchase` | (server-side from webhook) | On order complete |

### Product Page Specific

| Event | Properties |
|-------|------------|
| `product_view` | `product_handle`, `variant` |
| `gallery_image_changed` | `image_index` |
| `thumbnail_clicked` | `thumbnail_index` |
| `faq_expanded` | `question_index` |
| `qty_changed` | `old_qty`, `new_qty` |

---

## Common Tasks

### Enable Analytics in Staging

```bash
# In .env.staging or platform secrets
VITE_ANALYTICS_ENABLED=true
VITE_HEATMAP_ENABLED=true
```

### Run Control-Only Experiment

```typescript
// In PostHog dashboard, create flag and set to 100% control
// Then in code:
const variant = getFeatureFlagVariant('test_flag') || 'control'
captureExperimentExposure('test_flag', variant)
```

### Filter Clarity by Variant

In Clarity dashboard:
1. Go to Recordings
2. Click "Filters"
3. Add custom filter: `exp_hero_cta_copy = bold`

### Debug Event Tracking

```bash
# In browser console:
localStorage.setItem('debug', 'true')

# Then check Network tab for requests to:
# - app.posthog.com
# - c.clarity.ms
```

---

## PostHog Queries

### Conversion Rate by Variant

```sql
SELECT
  properties.exp_hero_cta_copy as variant,
  count(*) as exposures,
  avg((events.event = 'purchase')::int) as conversion_rate
FROM events
WHERE event = 'experiment_exposure'
GROUP BY properties.exp_hero_cta_copy
```

### Funnel Drop-off

Use PostHog's Funnel UI:
1. Create funnel: page_view → add_to_cart → begin_checkout → purchase
2. Break down by: `exp_hero_cta_copy`
3. Compare control vs variant

---

## Clarity Filters

### Find Rage Clicks

```
Filters → Dead clicks → Yes
Filters → Rage clicks → Yes
```

### Find Users Who Purchased

```
Filters → Custom Event → purchase → exists
```

### Find Confused Users

```
Filters → Dead clicks → > 5
Filters → Session duration → > 2 min
```

---

## Metrics to Track Weekly

| Metric | How | Target |
|--------|-----|--------|
| **Product page conversion** | PostHog Funnel | ↑ Baseline +10% |
| **Add to cart rate** | PostHog Event | ↑ Baseline +5% |
| **Checkout start rate** | PostHog Funnel | ↑ Baseline +5% |
| **Time to first CTA click** | Clarity Recordings | ↓ Baseline -20% |
| **Rage clicks on PDP** | Clarity Heatmaps | ↓ Baseline -50% |

---

## Troubleshooting

### Events not appearing in PostHog

1. Check `VITE_ANALYTICS_ENABLED=true`
2. Check API key in Network tab
3. Check console for errors
4. Verify `hasTrackingConsent()` returns true

### Clarity not recording

1. Check `VITE_HEATMAP_ENABLED=true`
2. Check project ID in env vars
3. Check Clarity dashboard → project is active
4. Wait 2-3 minutes for recordings to appear

### Variant not showing

1. Check PostHog Feature Flag is enabled
2. Check flag has rollout % set
3. Check `getFeatureFlagVariant()` is called
4. Check `captureExperimentExposure()` is called

---

## File Locations

| File | Purpose |
|------|---------|
| `src/lib/analytics/posthog.ts` | PostHog client + events |
| `src/lib/analytics/clarity.ts` | Clarity client + tagging |
| `src/lib/analytics/metapixel.ts` | Meta Pixel tracking |
| `src/experiments/identity.ts` | Anonymous user/session IDs |
| `.env.example` | All env variables (with docs) |

---

## Free Tier Limits

| Tool | Limit | Consequence |
|------|-------|-------------|
| **PostHog** | 1M events/month | Switch to self-host or pay |
| **Clarity** | Unlimited (500k sessions/month/project) | Create new project if needed |

**Safe usage:**
- Track ~10 pageviews/day × 30 days = 300k/month
- Track 5-10 events total (not every click)
- Stay under 1M events easily

---

## Learning Resources

- **PostHog Docs:** https://posthog.com/docs
- **Clarity Docs:** https://learn.microsoft.com/en-us/clarity/
- **Full Setup Guide:** `docs/05-planning/future-features/A-B testing components/analytics-setup-guide.md`
- **Optimization Loop:** `docs/05-planning/future-features/A-B testing components/optimization-loop.md`
