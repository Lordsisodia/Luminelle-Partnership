# Visual Improvement Guide - Specific Recommendations

**Based on:** Review of landing page screenshots 2026-01-11

---

## 1. Reviews Section - Specific Improvements

### Current Issues Identified:
- Profile pictures take up too much space (your fix addresses this)
- Review quotes could be more prominent
- TikTok embeds dominate the visual weight

### Enhancement #1: Better Review Card Layout

**After removing avatars, add this polish:**

```tsx
// SuccessStoriesSection.tsx - Enhanced card styling
<article className="relative rounded-3xl border border-brand-peach/40 bg-white/90 p-6 shadow-soft overflow-hidden group">
  {/* Subtle gradient background for featured */}
  <div className="absolute inset-0 bg-gradient-to-br from-brand-peach/5 to-brand-blush/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

  {/* Featured badge - more prominent */}
  <div className="relative flex items-center justify-between mb-4">
    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-peach to-pink-400 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-white shadow-lg">
      <Sparkles className="h-3 w-3" />
      Featured Story
    </span>
    {/* Add verified badge */}
    <div className="flex items-center gap-1 text-brand-cocoa/70">
      <CheckCircle className="h-4 w-4 text-brand-peach" />
      <span className="text-xs font-medium">Verified Creator</span>
    </div>
  </div>

  {/* Enhanced name display (after your avatar removal) */}
  <div className="relative space-y-1 text-center">
    <h3 className="font-heading text-3xl font-bold text-brand-cocoa tracking-tight">
      {featured.name}
    </h3>
    <p className="text-base font-semibold text-brand-cocoa/60">
      {featured.handle}
    </p>
  </div>

  {/* Product tag - NEW */}
  <div className="relative flex justify-center my-3">
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blush/50 px-3 py-1 text-xs font-semibold text-brand-cocoa/80">
      <ShoppingBag className="h-3 w-3" />
      Used: Shower Cap Deluxe
    </span>
  </div>

  {/* Highlight - more prominent */}
  <p className="relative text-xl font-bold text-brand-cocoa text-center mb-2">
    "{featured.highlight}"
  </p>

  {/* Stats - improved display */}
  <div className="relative flex items-center justify-center gap-4 text-center mb-3">
    <div className="flex items-center gap-1 text-brand-cocoa/70">
      <Eye className="h-4 w-4" />
      <span className="text-sm font-semibold">{featured.stats}</span>
    </div>
    <div className="h-4 w-px bg-brand-cocoa/20" />
    <div className="flex items-center gap-1 text-brand-cocoa/70">
      <TrendingUp className="h-4 w-4" />
      <span className="text-sm font-semibold">{featured.earnings}</span>
    </div>
  </div>

  {/* Quote - enhanced styling */}
  <blockquote className="relative rounded-2xl bg-gradient-to-br from-brand-blush/60 to-brand-peach/40 p-5 text-base leading-relaxed text-brand-cocoa/90 border border-brand-peach/20">
    <Quote className="absolute top-3 left-3 h-6 w-6 text-brand-peach/20" />
    <p className="relative">"{featured.quote}"</p>
  </blockquote>

  {/* TikTok embed */}
  <LazyVisible...>
    {/* your existing embed code */}
  </LazyVisible>

  {/* Add callout below video */}
  <div className="relative mt-4 text-center">
    <p className="text-xs font-semibold text-brand-cocoa/50 uppercase tracking-[0.2em]">
      Watch the full video on TikTok
    </p>
  </div>
</article>
```

### Enhancement #2: Star Rating Display (Outside Pill)

```tsx
// Add to SuccessStoriesSection.tsx
const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))}
  </div>
)

// Display above "Trusted by 10k users" text
<div className="flex flex-col items-center gap-2">
  <StarRating rating={5} />
  <p className="text-sm font-semibold text-brand-cocoa/70">
    Trusted by 10,000+ creators
  </p>
</div>
```

---

## 2. Spin the Wheel Section

### Since I don't see it in screenshots, here's a complete implementation:

```tsx
// SpinTheWheelSection.tsx - NEW FILE
import { useState, useRef } from 'react'
import { Gift, RotateCw } from 'lucide-react'

const SEGMENTS = [
  { percentage: '5%', color: 'from-brand-peach/80 to-brand-peach/60' },
  { percentage: '10%', color: 'from-brand-cocoa/80 to-brand-cocoa/60' },
  { percentage: '15%', color: 'from-pink-400/80 to-pink-400/60' },
  { percentage: '5%', color: 'from-brand-peach/80 to-brand-peach/60' },
  { percentage: '10%', color: 'from-brand-cocoa/80 to-brand-cocoa/60' },
  { percentage: '5%', color: 'from-brand-peach/80 to-brand-peach/60' },
  { percentage: '15%', color: 'from-pink-400/80 to-pink-400/60' },
  { percentage: '10%', color: 'from-brand-cocoa/80 to-brand-cocoa/60' },
]

export const SpinTheWheelSection = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spin = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setResult(null)

    // Random segment (0-7)
    const segmentIndex = Math.floor(Math.random() * 8)
    const segmentAngle = 360 / 8
    const targetAngle = 360 * 5 + segmentIndex * segmentAngle // 5 full rotations + segment

    setRotation(prev => prev + targetAngle)

    setTimeout(() => {
      const prize = SEGMENTS[segmentIndex].percentage
      setResult(prize === '5%' || prize === '10%' ? `${prize} off your order` : 'Free Shipping on orders over £20')
      setIsSpinning(false)
    }, 5000)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-peach/10 to-brand-blush/10 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-brand-peach/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-brand-cocoa/20 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-peach to-pink-400 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg">
          <Gift className="h-4 w-4" />
          Exclusive Welcome Offer
        </div>

        <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-cocoa mb-4">
          Spin to Win Your Welcome Deal
        </h2>

        <p className="text-lg text-brand-cocoa/70 mb-8">
          Guaranteed prize for every new creator! 🎁
        </p>

        {/* Wheel container */}
        <div className="relative mx-auto max-w-md">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="h-0 w-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-brand-cocoa drop-shadow-lg" />
          </div>

          {/* Wheel */}
          <div
            ref={wheelRef}
            className="relative aspect-square rounded-full border-8 border-brand-cocoa bg-white shadow-2xl overflow-hidden transition-transform duration-[5000ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {SEGMENTS.map((segment, i) => (
              <div
                key={i}
                className={`absolute inset-0 bg-gradient-to-br ${segment.color} flex items-center justify-center`}
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 50%)',
                }}
              >
                <span
                  className="font-heading text-2xl font-bold text-white"
                  style={{ transform: `rotate(-${i * 45}deg) translateX(-40px)` }}
                >
                  {segment.percentage}
                </span>
              </div>
            ))}
          </div>

          {/* Center button */}
          <button
            onClick={spin}
            disabled={isSpinning}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-24 w-24 rounded-full bg-gradient-to-br from-brand-peach to-pink-400 text-white font-bold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 transition-all disabled:cursor-not-allowed disabled:opacity-80 flex items-center justify-center gap-2"
          >
            {isSpinning ? (
              <RotateCw className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <span>Spin</span>
                <Gift className="h-5 w-5" />
              </>
            )}
          </button>
        </div>

        {/* Result display */}
        {result && (
          <div className="mt-8 rounded-3xl border-2 border-brand-peach bg-white p-6 shadow-lg animate-bounce">
            <p className="text-sm font-semibold text-brand-cocoa/60 uppercase tracking-[0.2em] mb-2">
              🎉 You Won!
            </p>
            <p className="font-heading text-3xl font-bold text-brand-cocoa">
              {result}
            </p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-cocoa px-6 py-3 text-sm font-semibold text-white hover:bg-brand-cocoa/90 transition">
              Apply Discount
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Social proof */}
        <p className="mt-6 text-sm text-brand-cocoa/60">
          🔥 <span className="font-bold text-brand-peach">1,247 people</span> spun today
        </p>
      </div>
    </section>
  )
}
```

---

## 3. Footer Enhancement

### Complete improved footer:

```tsx
// GlobalFooter.tsx - Enhanced version
export function GlobalFooter({ supportEmail }: GlobalFooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  // ... existing newsletter state ...

  const footerLinks = {
    shop: [
      { label: 'Shower Caps', href: '/shop/shower-caps' },
      { label: 'Satin Bonnets', href: '/shop/bonnets' },
      { label: 'Heatless Curlers', href: '/shop/curlers' },
      { label: 'Gift Sets', href: '/shop/gifts' },
    ],
    creators: [
      { label: 'Join Program', href: '/creators' },
      { label: 'Leaderboard', href: '/creators/leaderboard' },
      { label: 'Success Stories', href: '/creators/stories' },
      { label: 'Creator Resources', href: '/creators/resources' },
    ],
    support: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: `Email: ${supportEmail}`, href: `mailto:${supportEmail}` },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Press', href: '/press' },
      { label: 'Terms & Privacy', href: '/legal' },
    ],
  }

  const trustBadges = [
    { icon: Package, text: 'Made in UK' },
    { icon: Shield, text: '30-Day Returns' },
    { icon: Heart, text: 'Vegan & Cruelty-Free' },
    { icon: Leaf, text: 'Sustainable Packaging' },
  ]

  return (
    <footer className="border-t border-semantic-legacy-brand-blush/30 bg-semantic-legacy-brand-blush/20 text-semantic-text-primary">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-6">
        {/* Logo + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Left: Logo + Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="/images/logo-l.svg" alt="Lumelle" className="h-12 w-12" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-brand-peach animate-pulse" />
              </div>
              <p className="font-heading text-2xl font-bold uppercase tracking-[0.28em]">
                Lumelle
              </p>
            </div>
            <p className="max-w-sm text-sm text-semantic-text-primary/75 leading-relaxed">
              Creator-grade shower caps that keep silk presses, curls, and braids flawless on camera. Join 10,000+ creators earning with luxury self-care.
            </p>
            <div className="flex flex-wrap gap-2">
              {trustBadges.map((badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-semantic-text-primary shadow-soft ring-1 ring-semantic-accent-cta/50"
                >
                  <badge.icon className="h-3 w-3" />
                  {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Newsletter */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-semantic-text-primary/70">
              Get Creator Tips & Deals
            </p>
            <p className="text-sm text-semantic-text-primary/70">
              Join 10,000+ creators for weekly content strategies and exclusive discounts.
            </p>
            <form onSubmit={handleNewsletterSubmit}>
              {/* Your existing newsletter form */}
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-semantic-text-primary/70 mb-4">
              Shop
            </p>
            <div className="space-y-2">
              {footerLinks.shop.map((link) => (
                <RouterLink
                  key={link.label}
                  to={link.href}
                  className="block text-sm text-semantic-text-primary/80 hover:text-semantic-text-primary transition"
                >
                  {link.label}
                </RouterLink>
              ))}
            </div>
          </div>
          {/* Repeat for creators, support, company */}
        </div>

        {/* Bottom: Social + Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-semantic-text-primary/10">
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-semantic-accent-cta/50 bg-white/85 text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-accent-cta/20"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="text-xs text-semantic-text-primary/60">
            © 2026 Lumelle. All rights reserved. Made with 💜 in the UK.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## Testing Checklist

After implementing visual improvements:

### Reviews Section:
- [ ] Cards have hover animation
- [ ] Featured badge is prominent
- [ ] Verified creator badge visible
- [ ] Stars displayed above trust text
- [ ] Quotes are more readable
- [ ] Product tags show what was used

### Spin Wheel:
- [ ] Wheel has mixed percentages
- [ ] Spinning animation is smooth
- [ ] Result display is exciting
- [ ] Confetti or celebration effect
- [ ] Mobile responsive

### Footer:
- [ ] L logo visible with pulse effect
- [ ] Trust badges displayed
- [ ] Newsletter has social proof
- [ ] Links organized in columns
- [ ] Social icons prominent

---

All improvements maintain brand consistency and enhance the already-excellent design!
