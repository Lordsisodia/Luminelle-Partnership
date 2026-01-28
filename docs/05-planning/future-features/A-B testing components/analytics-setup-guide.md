# Analytics & Heatmaps Setup Guide

Complete guide to setting up free analytics, heatmaps, session replay, and A/B testing for Lumelle.

---

## What You're Setting Up

| Tool | Purpose | Cost | Features |
|------|---------|------|----------|
| **PostHog** | Analytics + Funnels + A/B Testing | Free tier (up to 1M events/month) | Conversion tracking, experiments, dashboards |
| **Microsoft Clarity** | Heatmaps + Session Replay | 100% Free | Click heatmaps, scroll maps, session recordings |

**Together they give you:**
- ✅ See where users click (heatmaps)
- ✅ Watch user sessions (replay)
- ✅ Measure conversion funnels
- ✅ Run A/B tests
- ✅ All completely free

---

## Step 1: Create PostHog Account

1. Go to [posthog.com](https://posthog.com/)
2. Click "Start for free" → Sign up with email/GitHub
3. Create a new project (name it "Lumelle" or "[Client Name]")
4. **Choose region:** US (us.i.posthog.com) or EU (eu.i.posthog.com)
5. **Installation:** Select "Frontend only" (we'll use the browser SDK)
6. Copy your **Project API Key** (starts with `phc_`)

---

## Step 2: Create Microsoft Clarity Project

1. Go to [clarity.microsoft.com](https://clarity.microsoft.com/)
2. Sign in with Microsoft account (create one if needed)
3. Click "New project" → "Create"
4. Enter project details:
   - Name: "Lumelle" or "[Client Site]"
   - URL: Your production domain (e.g., `lumelle.com`)
5. Copy your **Clarity Project ID** (from the setup screen)

---

## Step 3: Configure Environment Variables

### For Local Development (.env.local)

```bash
# Enable analytics
VITE_ANALYTICS_ENABLED=true
VITE_HEATMAP_ENABLED=true

# PostHog
VITE_POSTHOG_KEY=phc_xxxxxxxxxxxxx  # Replace with your key
VITE_POSTHOG_HOST=https://us.i.posthog.com  # Or eu.i.posthog.com

# Clarity
VITE_CLARITY_PROJECT_ID=xxxxx  # Replace with your ID
```

### For Staging/Production

Set the same variables as **platform secrets**:
- **Cloudflare Pages:** Settings → Environment variables
- **Vercel:** Settings → Environment Variables
- **Other:** Check your deployment platform's docs

**Important:** Set `VITE_ANALYTICS_ENABLED=true` and `VITE_HEATMAP_ENABLED=true` in staging first for testing.

---

## Step 4: Verify Installation

### 1. Check PostHog

1. Start your dev server: `npm run dev`
2. Open your site in a browser
3. Go to PostHog dashboard → "Events"
4. You should see `pageview` events (if autocapture is on) or `experiment_exposure` events
5. Check "Live" tab to see events in real-time

### 2. Check Clarity

1. On your site, open browser DevTools → Console
2. You should see: `Clarity: Initialized with project ID [your-id]`
3. Go to Clarity dashboard → Your project
4. After a few minutes, you should see:
   - Recordings appearing
   - Heatmaps generating (usually takes ~100 pageviews)

---

## Step 5: Enable Experiments (When Ready)

### Option A: Use PostHog Feature Flags (Recommended)

1. In PostHog dashboard, go to "Feature Flags"
2. Create new flag: `hero_cta_copy`
3. Set variants: `control`, `bold`
4. Set rollout: 50% each (for testing)
5. Save

### Option B: Use Existing Experiments SDK

Your code already has experiments scaffolding at `src/experiments/`. To enable:

```bash
VITE_EXPERIMENTS_ENABLED=true
```

---

## Step 6: Test the Integration

### Test PostHog Events

```bash
# In your browser console, check:
posthog.capture('test_event', { foo: 'bar' })

# Then check PostHog dashboard → Events → search for "test_event"
```

### Test Clarity Recording

1. Navigate around your site for 30+ seconds
2. Go to Clarity dashboard → "Recordings"
3. You should see your session appear (usually within 1-2 minutes)

### Test Experiment Tagging

```bash
# In browser console:
import { captureExperimentExposure } from '@/lib/analytics/posthog'
captureExperimentExposure('test_experiment', 'variant_a')

# Check PostHog for the event
# Check Clarity dashboard → Filter by "exp_test_experiment = variant_a"
```

---

## Step 7: Run First Baseline (24-48 hours)

Before running any experiments, collect baseline data:

1. **Enable tracking on staging** (with `VITE_ANALYTICS_ENABLED=true`)
2. **Let it run for 24-48 hours** with normal traffic
3. **Review:**
   - PostHog: Funnel conversion rates (view → add to cart → purchase)
   - Clarity: Heatmaps for high-traffic pages
   - Clarity: Recordings for user behavior patterns

---

## Step 8: Launch First Experiment

### Hero CTA Copy Test

1. **Hypothesis:** "Shorter, more direct CTA copy will increase click-through rate"
2. **Variants:**
   - `control`: Current CTA text
   - `bold`: Shorter, punchier text
3. **Metric:** CTA click-through rate
4. **Duration:** 7-14 days (minimum sample size)

**Setup:**
```typescript
// In your hero component
import { captureExperimentExposure } from '@/lib/analytics/posthog'

const variant = getFeatureFlagVariant('hero_cta_copy') || 'control'
captureExperimentExposure('hero_cta_copy', variant)

// Render different CTA based on variant
```

---

## Step 9: Monitor and Iterate

### Weekly Tasks

| Day | Task |
|-----|------|
| **Mon** | Review PostHog funnels (conversion rates) |
| **Wed** | Watch 3-5 Clarity recordings (look for friction) |
| **Fri** | Review heatmaps (identify dead clicks/rage clicks) |
| **Ongoing** | Run 1-2 experiments at a time |

### Key Metrics to Track

**Conversion Funnel:**
- Product page view → Add to cart
- Add to cart → Begin checkout
- Begin checkout → Purchase

**Engagement:**
- Time on page
- Scroll depth
- Session recordings watched

**Experiment Results:**
- Variant exposure counts
- Conversion rate per variant
- Statistical significance (p < 0.05)

---

## Troubleshooting

### PostHog Events Not Appearing

**Check:**
- `VITE_ANALYTICS_ENABLED=true` in env vars
- PostHog API key is correct (no extra spaces)
- Browser console for errors
- Network tab for failed requests to PostHog

### Clarity Not Recording

**Check:**
- `VITE_HEATMAP_ENABLED=true` in env vars
- Clarity project ID is correct
- Consent cookie is accepted (check `hasTrackingConsent()`)
- No ad blockers blocking Clarity

### Experiments Not Working

**Check:**
- `VITE_EXPERIMENTS_ENABLED=true`
- Feature flag exists in PostHog dashboard
- Flag is "enabled" (not disabled)
- Flag has rollout % set (not 0%)

---

## Best Practices

1. **Always test in staging first** - Never enable analytics in prod without testing
2. **Respect user consent** - Only track after consent is granted
3. **Keep event budget low** - Track only essential events (stay under 1M/month free tier)
4. **One experiment at a time** - Don't run multiple tests on the same users
5. **Document your learnings** - Keep a log of experiments and results

---

## Privacy & Compliance

The implementation includes:

- ✅ **Consent gating** - PostHog and Clarity only load after consent
- ✅ **DNT respect** - Respects "Do Not Track" browser setting
- ✅ **No PII** - No personal identifiable info in events by default
- ✅ **Cookie compliance** - Works with your cookie consent banner

---

## Next Steps

After setup is complete:

1. **[ ]** Create PostHog account
2. **[ ]** Create Clarity project
3. **[ ]** Add env vars to staging
4. **[ ]** Test in staging environment
5. **[ ]** Run 24h baseline
6. **[ ]** Review heatmaps + recordings
7. **[ ]** Launch first experiment
8. **[ ]** Measure and iterate

---

## Resources

- **PostHog Docs:** https://posthog.com/docs
- **Clarity Docs:** https://learn.microsoft.com/en-us/clarity/
- **Your Implementation Plan:** `docs/05-planning/future-features/A-B testing components/implementation-plan.md`
- **Optimization Loop:** `docs/05-planning/future-features/A-B testing components/optimization-loop.md`
