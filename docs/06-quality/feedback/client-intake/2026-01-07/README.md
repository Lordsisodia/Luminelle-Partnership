# Client Intake — 2026-01-07

This folder is a **fast, client-facing intake view** of everything reported on **January 7, 2026**.

It intentionally stays scannable and actionable:

- What the client said
- What we already shipped
- What still needs work
- Links to the deeper tracker worklogs (for multi-agent execution)

---

## ✅ Already addressed (shipped fixes)

- Multi-buy discount tiers updated to: **2 → 5%**, **3 → 10%**, **4 → 15%** (removed “5th tier” logic).
- Drawer quantity dropdown made usable (no longer blocked/clipped).
- Landing + shower-cap PDP TikTok videos now scoped so the **shower cap** pages don’t show curler videos.
- Landing card images adjusted so square-ish images don’t look cropped top/bottom.
- “Why you’ll love it” block hidden (code kept; section not rendered).
- Desktop header logo centering improved.
- Storefront Pages Functions hardened so `/api/storefront/*` failures return JSON errors (no Cloudflare HTML exception pages).
- Global CSS guard added to prevent **page-level horizontal scrolling on mobile**.

---

## 📌 Issues to triage / fix next (from client feedback)

Use this as your “today list”. Each item links to the deeper issue worklog in the main tracker.

### 🧾 Checkout + commerce

- ✅ Issue 181 — Multi-buy discounts not applying at checkout (tiers requested).  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-181.md`
- ✅ Issue 182 — Drawer checkout CTA stuck on “Preparing checkout…” (no working checkout CTA).  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-182.md`
- ✅ Issue 184 — `/api/storefront/*` returning 500 / CF Worker 1101 (cart create, landing sections, product fetch).  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-184.md`

### 📱 Mobile layout

- ✅ Issue 183 — Mobile account + footer padding / horizontal scroll.  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-183.md`
- ✅ Issue 185 — Horizontal scroll on all pages (global).  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-185.md`

### 🧑‍🤝‍🧑 Social proof + reviews

- ✅ Issue 186 — “Trusted by 10k users” avatars repeat (needs authenticity).  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-186.md`
- ✅ Issue 187 — Landing reviews section bland on desktop (scrolling, bigger text, less faces).  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-187.md`

### 🎡 Spin wheel / promos

- ✅ Issue 188 — Spin wheel needs visible % labels + “Congrats! You’ve won 20% off…” popup.  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-188.md`

### 🧾 Account + support

- ✅ Issue 189 — Payment methods page has dev artifacts; likely remove/simplify (Shopify is source-of-truth).  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-189.md`
- ✅ Issue 190 — WhatsApp + email support links need verification/simplification.  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-190.md`

### ✍️ Content

- ✅ Issue 191 — Brand story copy update (blocked until exact copy is provided).  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-191.md`
- ✅ Issue 192 — Landing “creators” section should be customer-focused + “Join creators” CTA → “Learn more” (blog link).  
  Worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-192.md`

---

## 🔗 Primary client feedback note

- `docs/06-quality/feedback/2026-01-07-client-feedback.md`
