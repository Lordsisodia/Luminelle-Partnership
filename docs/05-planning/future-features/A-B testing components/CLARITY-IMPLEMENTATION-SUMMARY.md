# Analytics Implementation Summary

## What Was Implemented

### 1. Microsoft Clarity Integration

**Files Created:**
- `src/lib/analytics/clarity.ts` - Main Clarity SDK wrapper
- `src/types/clarity.d.ts` - TypeScript declarations for Clarity API

**Files Modified:**
- `src/main.tsx` - Added Clarity initialization alongside PostHog
- `src/lib/analytics/posthog.ts` - Auto-tag Clarity when experiments are exposed

**Features:**
- ✅ Heatmaps (click, scroll, dead clicks, rage clicks)
- ✅ Session replay (unlimited, free)
- ✅ Experiment variant tagging (filter recordings by A/B test variant)
- ✅ Anonymous user/session ID tagging for lookup
- ✅ Consent/DNT gating
- ✅ Environment variable control

---

### 2. Documentation

**Created:**
- `docs/05-planning/future-features/A-B testing components/analytics-setup-guide.md`
  - Complete step-by-step setup guide
  - PostHog + Clarity account creation
  - Environment configuration
  - Verification steps
  - Troubleshooting

- `docs/05-planning/future-features/A-B testing components/analytics-quick-reference.md`
  - Quick reference card
  - Code snippets
  - Dashboard links
  - Event schema
  - Common queries

---

## How It Works

### Architecture

```
Browser
  ├─ PostHog (analytics + funnels + experiments)
  │   └─ Captures: pageview, experiment_exposure, cta_click, add_to_cart, etc.
  │
  └─ Clarity (heatmaps + session replay)
      ├─ Records: clicks, scrolls, rage clicks
      ├─ Sessions: full video replay
      └─ Tags: exp_hero_cta_copy=variant
```

### Data Flow

1. **User visits site**
   - PostHog init: Captures events, assigns experiments
   - Clarity init: Starts recording, tags session

2. **Experiment exposure**
   - PostHog: `captureExperimentExposure()` logs event
   - Clarity: Auto-tags session with variant
   - Result: Can filter Clarity recordings by experiment variant

3. **Purchase**
   - Browser: Sends `lumelle_anon_id` and `exp_*` to Shopify cart
   - Shopify webhook: Extracts attributes
   - Server: Sends `purchase` event to PostHog with attribution

---

## Environment Variables

```bash
# Enable tracking
VITE_ANALYTICS_ENABLED=true    # PostHog events
VITE_HEATMAP_ENABLED=true       # Clarity recording
VITE_EXPERIMENTS_ENABLED=true   # A/B test flags

# PostHog
VITE_POSTHOG_KEY=phc_xxxxx
VITE_POSTHOG_HOST=https://us.i.posthog.com

# Clarity
VITE_CLARITY_PROJECT_ID=xxxxx
```

---

## Usage Examples

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

const variant = getFeatureFlagVariant('hero_cta_copy') || 'control'
captureExperimentExposure('hero_cta_copy', variant)

// Render based on variant
{variant === 'bold' ? <BoldCTA /> : <DefaultCTA />}
```

### Tag Clarity Session

```typescript
import { tagExperimentVariant } from '@/lib/analytics/clarity'

tagExperimentVariant('hero_cta_copy', 'bold')
// Now can filter Clarity recordings by this variant
```

---

## Next Steps

### Immediate (Testing)

1. [ ] Create PostHog account at posthog.com
2. [ ] Create Clarity project at clarity.microsoft.com
3. [ ] Add env vars to `.env.local` for testing
4. [ ] Run dev server: `npm run dev`
5. [ ] Verify PostHog events in dashboard
6. [ ] Verify Clarity recordings appear

### Staging Deployment

1. [ ] Set env vars in staging platform (Cloudflare/Vercel)
2. [ ] Deploy to staging
3. [ ] Enable `VITE_ANALYTICS_ENABLED=true` and `VITE_HEATMAP_ENABLED=true`
4. [ ] Run baseline for 24-48 hours
5. [ ] Review initial data (funnels, heatmaps, recordings)

### Production Launch

1. [ ] Set env vars in production
2. [ ] Start with control-only (no variants, just tracking)
3. [ ] Monitor for 24 hours
4. [ ] Verify free tier usage (stay under 1M events/month)
5. [ ] Launch first experiment (50/50 split)

---

## Free Tier Math

**PostHog (1M events/month limit):**
- ~10k pageviews/day × 30 = 300k pageviews/month
- 5 core events × 300k = 1.5M events (over limit)
- **Solution:** Track only essential events:
  - `experiment_exposure` (once per session)
  - `add_to_cart`
  - `begin_checkout`
  - `purchase` (server-side)
- **Result:** ~400k events/month (safe margin)

**Clarity (500k sessions/month limit):**
- 10k pageviews/day = ~8k sessions/day
- 8k × 30 = 240k sessions/month
- **Result:** Well within limits

---

## Feature Comparison

| Feature | PostHog | Clarity | Combined |
|---------|---------|---------|----------|
| Pageviews | ✅ | ❌ | ✅ |
| Custom events | ✅ | ✅ | ✅ |
| Funnels | ✅ | ❌ | ✅ |
| A/B testing | ✅ | ❌ | ✅ |
| Click heatmaps | ❌ | ✅ | ✅ |
| Scroll heatmaps | ❌ | ✅ | ✅ |
| Session replay | 💰 | ✅ | ✅ |
| Rage clicks | ❌ | ✅ | ✅ |
| Dead clicks | ❌ | ✅ | ✅ |
| Cost | Free tier | Free | **Free** |

---

## Troubleshooting

**Events not in PostHog:**
- Check `VITE_ANALYTICS_ENABLED=true`
- Check API key in Network tab
- Verify `hasTrackingConsent()` returns true

**Clarity not recording:**
- Check `VITE_HEATMAP_ENABLED=true`
- Check project ID in env vars
- Wait 2-3 minutes for recordings to appear
- Check for ad blockers

**Experiments not working:**
- Check PostHog Feature Flag is enabled
- Check flag has rollout % set
- Verify `getFeatureFlagVariant()` is called
- Check `captureExperimentExposure()` is called

---

## File Locations

| File | Purpose |
|------|---------|
| `src/lib/analytics/posthog.ts` | PostHog client + events |
| `src/lib/analytics/clarity.ts` | Clarity client + tagging |
| `src/lib/analytics/metapixel.ts` | Meta Pixel tracking |
| `src/experiments/identity.ts` | Anonymous IDs |
| `src/main.tsx` | Initialization |
| `src/types/clarity.d.ts` | TypeScript types |

---

## Resources

- **Setup Guide:** `docs/05-planning/future-features/A-B testing components/analytics-setup-guide.md`
- **Quick Reference:** `docs/05-planning/future-features/A-B testing components/analytics-quick-reference.md`
- **Implementation Plan:** `docs/05-planning/future-features/A-B testing components/implementation-plan.md`
- **Optimization Loop:** `docs/05-planning/future-features/A-B testing components/optimization-loop.md`
- **PostHog Docs:** https://posthog.com/docs
- **Clarity Docs:** https://learn.microsoft.com/en-us/clarity/

---

## Summary

You now have **enterprise-grade analytics completely free**:

- ✅ PostHog for funnels, conversion tracking, and A/B testing
- ✅ Clarity for heatmaps and unlimited session replay
- ✅ Automatic experiment tagging (filter Clarity by variant)
- ✅ Privacy-first (consent gated, no PII by default)
- ✅ Free forever (stays within free tiers)

**Cost: $0/month**
**Features: $500+/month equivalent** (FullStory + Optimizely + Amplitude)
