# Analytics Setup Testing Checklist

Step-by-step guide to get PostHog + Clarity working so we can verify the integration.

---

## Good News!

The Clarity integration is **already implemented** using the official `@microsoft/clarity` NPM package. You just need to:

1. Create your PostHog and Clarity accounts
2. Add your API keys to `.env.local`
3. Restart the dev server

That's it!

---

## Part 1: Create Accounts (5 minutes)

### Step 1.1: Create PostHog Account

1. Go to https://posthog.com/
2. Click "Start for free" or "Sign up"
3. Sign up with Email or GitHub
4. Create a new project:
   - Project name: `Lumelle Test`
   - Region: `US` or `EU`
5. **Copy your Project API Key** (starts with `phc_`)

### Step 1.2: Create Microsoft Clarity Project

1. Go to https://clarity.microsoft.com/
2. Sign in with Microsoft account
3. Click "New project"
4. Fill in:
   - Name: `Lumelle Test`
   - URL: `localhost:5173`
5. Click "Create"
6. **Copy your Clarity Project ID**

---

## Part 2: Configure Environment Variables (1 minute)

### Step 2.1: Create `.env.local`

Create `.env.local` in your project root (same folder as `package.json`):

```bash
# Analytics (enable for testing)
VITE_ANALYTICS_ENABLED=true
VITE_HEATMAP_ENABLED=true

# PostHog
VITE_POSTHOG_KEY=phc_YOUR_KEY_HERE
VITE_POSTHOG_HOST=https://us.i.posthog.com  # or eu.i.posthog.com

# Clarity
VITE_CLARITY_PROJECT_ID=YOUR_ID_HERE
```

### Step 2.2: Fill in Your Keys

Replace the placeholder values with your actual keys.

**Example:**
```bash
VITE_POSTHOG_KEY=phc_abc123xyz789
VITE_POSTHOG_HOST=https://us.i.posthog.com
VITE_CLARITY_PROJECT_ID=ab12c3d4
```

---

## Part 3: Start Testing (30 seconds)

### Step 3.1: Restart Dev Server

If running, stop it (Ctrl+C) and restart:

```bash
npm run dev
```

### Step 3.2: Open Your Site

Go to: http://localhost:5173

Navigate around for at least 30 seconds.

---

## Part 4: Verify It's Working (2 minutes)

### Step 4.1: Check Browser Console

Open DevTools (F12) → Console and type:

```javascript
// Check PostHog
posthog

// Check Clarity
typeof window.clarity !== 'undefined'
```

You should see:
- `posthog` → Object with methods like `capture`, `identify`
- `window.clarity` → Either defined (if using script) or not needed (NPM package)

### Step 4.2: Check PostHog Dashboard

1. Go to your PostHog dashboard
2. Click **"Events"**
3. You should see events appearing

### Step 4.3: Check Clarity Dashboard

1. Go to https://clarity.microsoft.com/
2. Click your project → **"Recordings"**
3. Wait 1-2 minutes, refresh
4. You should see your session!

---

## Part 5: Test a Custom Event (optional)

In browser console:

```javascript
// Test PostHog
posthog.capture('test_event', { test: 'value' })

// Test Clarity event (if window.clarity exists)
if (window.clarity) {
  window.clarity('event', 'test_event')
}
```

---

## Part 6: Share With Claude

Once working, share:

1. ✅ PostHog dashboard URL
2. ✅ Clarity dashboard URL
3. ✅ Screenshot of console showing `posthog` object
4. ✅ Any errors (if any)

---

## Troubleshooting

**No events in PostHog?**
- Check `VITE_ANALYTICS_ENABLED=true`
- Restart dev server
- Verify API key (no extra spaces)

**No recordings in Clarity?**
- Check `VITE_HEATMAP_ENABLED=true`
- Wait 2-3 minutes (takes time to process)
- Disable ad blockers for localhost

**Console errors?**
- Copy the error message
- Share with Claude

---

## Summary: What To Do

1. [ ] Create PostHog account → copy key
2. [ ] Create Clarity project → copy ID
3. [ ] Add keys to `.env.local`
4. [ ] Run `npm run dev`
5. [ ] Open localhost:5173
6. [ ] Check console: `posthog` exists
7. [ ] Verify events in PostHog dashboard
8. [ ] Verify recordings in Clarity dashboard
9. [ ] Share dashboard URLs with Claude

**Time:** ~10 minutes
