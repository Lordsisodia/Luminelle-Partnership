# Quick Reference: Landing Page Updates

## Task Summary

| # | Section | Task | Files |
|---|---------|------|-------|
| 1a | Hero | Remove "10k+" user count pill | `src/content/landing.ts`, `src/archive/landing/ui/sections/hero/HeroSection.tsx` |
| 1b | Hero | Move stars above "Trusted by 10k users" | `src/archive/landing/ui/sections/hero/HeroSection.tsx` |
| 2a | Stories | Remove profile pictures | `src/archive/landing/ui/sections/success/SuccessStoriesSection.tsx` |
| 2b | Stories | Extract stars from pill | `src/archive/landing/ui/sections/success/SuccessStoriesSection.tsx` |
| 2c | Stories | Make review text longer | `src/content/landing.ts` |
| 2d | Stories | Make names bigger + centered | `src/archive/landing/ui/sections/success/SuccessStoriesSection.tsx` |
| 3a | Wheel | Mix 5%, 10%, 15% segments | *(locate wheel component)* |
| 3b | Wheel | Free shipping over £20 welcome deal | *(locate wheel component)* |
| 4a | Footer | Add L logo | `src/ui/components/GlobalFooter.tsx` |

## Sample Review Text Updates

**Current:**
> "Kept my blowout smooth after a steamy shower — no frizz."

**Expanded:**
> "I've tried dozens of shower caps, but the Lumelle cap is the only one that actually works. After my steamy shower, my blowout was completely smooth with zero frizz. The satin lining makes all the difference - it's like a protective pillowcase for your hair."

Use this pattern for all 6 reviews in `successStories` array.

## Code Snippets

### Remove Avatar (SuccessStoriesSection.tsx)
```tsx
// BEFORE (lines 36-43)
<div className="flex flex-shrink-0 items-center justify-center">
  <img src={featured.avatarSrc} alt={featured.avatarAlt} className="h-20 w-20 rounded-full object-cover" />
</div>

// AFTER
{/* Avatar removed */}
```

### Center Name (SuccessStoriesSection.tsx)
```tsx
// BEFORE (line 45)
<div className="space-y-1 text-center md:text-left">

// AFTER
<div className="space-y-1 text-center">
```

### Add L Logo (GlobalFooter.tsx)
```tsx
// BEFORE (line 58)
<p className="font-heading text-xl font-semibold uppercase tracking-[0.28em]">Lumelle</p>

// AFTER
<img src="/images/logo-l.svg" alt="Lumelle" className="h-8 w-8 mb-2" />
<p className="font-heading text-xl font-semibold uppercase tracking-[0.28em]">Lumelle</p>
```

## Priority Order

1. ✅ **Content First** - Update review text in `landing.ts`
2. ✅ **UI Second** - Update component files
3. ✅ **Test Last** - Verify all changes visually

## Wheel Component Location

If not in standard location, search:
```bash
grep -r "wheel\|spin\|discount\|segment" --include="*.tsx" --include="*.ts" src/
```

Possible locations:
- Gamification folder
- Promotional components
- Modal/popup directory
