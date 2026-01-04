# Deepen Notes: “Section kits” for blog + marketing blocks (FAQ/pricing/testimonials/newsletter + more)

Purpose: convert the latest “sections/components” discovery into **actionable mining targets** (file pointers + mapping),
so we can implement our Blocks Kit without re-running discovery.

This is **pattern mining** (no cloning/vendoring). Only copy/adapt from `license_bucket=safe` repos with attribution.

## High-signal sources (net-new or newly emphasized)

### 1) `ant-design/ant-design-landing` (MIT) — explicit section elements library
Why it’s useful:
- Has a large catalog of “landing page” sections in one place (Nav/Banner/Content/Pricing/Teams/Footer).
- Strong for “whole section composition” rather than isolated primitives.

Where to mine (file pointers):
- Section element library root:
  - `site/templates/template/element/`
- Pricing variants:
  - `site/templates/template/element/Pricing0/index.jsx`
  - `site/templates/template/element/Pricing1/index.jsx`
  - `site/templates/template/element/Pricing2/index.jsx`
- Teams / social proof variants:
  - `site/templates/template/element/Teams0/index.jsx`
  - `site/templates/template/element/Teams1/index.jsx`
  - `site/templates/template/element/Teams2/index.jsx`
  - `site/templates/template/element/Teams3/index.jsx`
- Footer + navigation variants:
  - `site/templates/template/element/Footer0/index.jsx`
  - `site/templates/template/element/Footer1/index.jsx`
  - `site/templates/template/element/Footer2/index.jsx`
  - `site/templates/template/element/Nav0/index.jsx`
  - `site/templates/template/element/Nav1/index.jsx`
  - `site/templates/template/element/Banner0/index.jsx`

How it maps to Blocks Kit contracts:
- `PricingSection` → Pricing0/1/2
- (Future) `HeroSection` → Banner*
- (Future) `NavHeader` / `Footer` → Nav*, Footer*
- (Future) `FeatureGrid` / `StatsSection` → Content*/Feature*/Stats* folders (scan as needed)

### 2) `LiveDuo/destack` (MIT) — aggregator: TSX/HTML blocks + preview images
Why it’s useful:
- Includes multiple “themes” (HyperUI/Flowbite/Preline/Tailblocks) with blocks in TSX and preview PNGs.
- Great for quickly picking 1–2 canonical variants per block (reduces combinatorial explosion).

Where to mine (file pointers):
- Theme packs:
  - `lib/themes/hyperui/*`
  - `lib/themes/flowbite/*`
  - `lib/themes/preline/*`
  - `lib/themes/tailblocks/*`
- Examples (HyperUI pack):
  - FAQ: `lib/themes/hyperui/Faq1/index.tsx` (+ `preview.png`)
  - Testimonials: `lib/themes/hyperui/Testimonials1/index.tsx` (+ `preview.png`)
  - Stats: `lib/themes/hyperui/Stats1/index.tsx` (+ `preview.png`)
  - Navigation: `lib/themes/hyperui/Navigation1/index.tsx` (+ `preview.png`)

How it maps to Blocks Kit contracts:
- `FaqSection` → `Faq*`
- `TestimonialsSection` → `Testimonials*`
- `NewsletterSignup` → `Form*` variants (pick 1 canonical email capture)
- (Future) `StatsSection` → `Stats*`
- (Future) `CtaSection` → `Cta*`

### 3) `AlexandroMtzG/remix-blocks` (MIT) — real app skeleton with “blocks” routes
Why it’s useful:
- Not just static blocks: includes **forms + action handlers** patterns (good for newsletter/waitlist submit flows).
- Also includes “table/list” patterns that are admin-adjacent.

Where to mine (file pointers):
- Newsletter + contact examples:
  - `app/routes/blocks/email/newsletter-with-convertkit.tsx`
  - `app/routes/blocks/email/contact-form-with-formspree.tsx`
- Forms patterns:
  - `app/routes/blocks/forms/simple-form.tsx`
  - `app/routes/blocks/forms/form-with-confirmation-dialog.tsx`
- Table/list UI:
  - `app/routes/blocks/lists/table.tsx`
- Pricing/subscriptions glue:
  - `app/routes/blocks/subscriptions/create-pricing-plans-with-stripe.tsx`

How it maps to Blocks Kit contracts:
- `NewsletterSignup` → newsletter route (submit UX + validation)
- (Future) `AdminTable` → table route (filtering/sorting patterns if present)
- `PricingSection` → subscription/pricing glue (not for UI visuals; for “pricing + submit” pattern)

## Recommended mining output (keep it tight)
For each contract, pick **1–2 canonical variants** and record:
- a screenshot link (if present in repo)
- the exact file pointer(s)
- the “behavior contract” notes (a11y, keyboard nav, states)

Suggested defaults:
- `FaqSection`: 1 accordion style + 1 “multi-open” style
- `PricingSection`: 1 card grid + 1 “most popular” variant
- `TestimonialsSection`: 1 grid + 1 slider variant (if we need slider)
- `NewsletterSignup`: 1 compact and 1 full-width variant

