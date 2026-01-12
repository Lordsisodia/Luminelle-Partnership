# Landing Page UI Updates - January 2026

**Created:** 2026-01-11
**Status:** Ready for Execution
**Agent Type:** Implementation Agent (UI/React/TypeScript)

## Overview

This plan contains all necessary context and tasks for updating the Lumelle landing page based on client feedback. All changes are pre-designed and require straightforward UI/implementation work.

## Quick Start for Implementation Agent

Execute the following command with this document URL:
```
Update the Lumelle landing page according to the specifications in: [link to this document]
```

## Task Breakdown

### 1. Hero Section Updates

#### 1a. Remove User Count Pill
**Location:** `src/content/landing.ts` (metricBadges section)
**Task:**
- The hero section currently displays metric badges showing "100+ Creators earning now"
- Remove or adjust any "10k+" or "+10k" user count pills as they make the section look cluttered
- Keep the 5 profile images but remove redundant user count indicators

**Current Implementation:**
```typescript
// Lines 101-117 in src/content/landing.ts
export const metricBadges: MetricBadge[] = [
  {
    label: 'Creators earning now',
    value: '100+',
    description: 'Active in the Lumelle community',
  },
  // ... other badges
]
```

**Action:**
- Review `src/archive/landing/ui/sections/hero/HeroSection.tsx`
- Remove any duplicate user count pills while keeping profile images
- Ensure clean, uncluttered layout

#### 1b. Move Stars Above "Trusted by 10k users"
**Location:** `src/archive/landing/ui/sections/hero/HeroSection.tsx`
**Task:**
- Stars are currently displayed below the "Shop Shower Cap" button in a pill
- Move these stars to be positioned above the "Trusted by 10k users" text
- Stars should not be in a pill container

**Current Structure:**
- The metricBadges are displayed in a grid (lines 65-82 in HeroSection.tsx)
- Stars may be part of trustSignals or separate component

**Action:**
- Locate star rating rendering in hero section
- Relocate to appear above "Trusted by 10k users" text
- Remove pill styling from stars

---

### 2. Customer Stories Section Updates

#### 2a. Remove Profile Pictures from Reviews
**Location:** `src/archive/landing/ui/sections/success/SuccessStoriesSection.tsx`
**Task:**
- Remove all avatar/profile image elements from review cards
- This applies to both the featured story (left card) and other stories (right column)

**Current Implementation:**
- Featured story: Lines 36-43 (avatar img)
- Other stories: Lines 95-100 (avatar img)

**Action:**
- Comment out or remove `<img>` elements with `avatarSrc`
- Remove container divs around avatars
- Adjust spacing/layout after removal

#### 2b. Remove Stars from Pill in Reviews
**Location:** `src/archive/landing/ui/sections/success/SuccessStoriesSection.tsx`
**Task:**
- Stars are currently inside a pill/styled container
- Extract stars from the pill and display them standalone

**Current Code:**
- Lines 27-34 show the badge/pill structure with stars potentially inside

**Action:**
- Remove pill container styling from star elements
- Display stars without background/border styling

#### 2c. Make Review Text Longer
**Location:** `src/content/landing.ts` (successStories array)
**Task:**
- Current reviews are concise quotes
- Expand each `quote` field to be more detailed and descriptive
- Add 2-3 sentences per review instead of single short quotes

**Current Examples (lines 212-280):**
```typescript
quote: 'Kept my blowout smooth after a steamy shower — no frizz.',
quote: 'The satin lining makes it feel luxe and my hair stayed bone dry.',
```

**Action:**
- Rewrite each quote to be 2-3 sentences
- Maintain authentic voice but add more detail
- Include specific use cases or benefits mentioned

#### 2d. Make Names Bigger and Centered
**Location:** `src/archive/landing/ui/sections/success/SuccessStoriesSection.tsx`
**Task:**
- Increase font size for reviewer names
- Center-align the names

**Current Implementation:**
- Featured name: Lines 46-48 (`text-2xl font-bold`)
- Other names: Lines 103-105 (`text-xl font-bold`)

**Action:**
- Change `text-2xl` to `text-3xl` or larger
- Change `text-xl` to `text-2xl` or larger
- Add `text-center` class and remove `md:text-left` from name elements

---

### 3. Spin the Wheel Component Updates

#### 3a. Update Wheel Segments (5%, 10%, 15%)
**Location:** Need to locate wheel/spin component (search for "wheel", "spin", "discount", "segment")
**Task:**
- All wheel segments currently show "10%"
- Update to have a mix of 5%, 10%, and 15% segments
- Create realistic distribution (e.g., more 5-10% segments, fewer 15% segments)

**Expected Implementation:**
- Look for discount/percentage array in wheel configuration
- Update to distribute: `['5%', '10%', '15%', '10%', '5%', '10%', '15%', '5%']`

**Action:**
1. Search codebase for wheel component:
   ```bash
   grep -r "wheel\|spin" --include="*.tsx" --include="*.ts" src/
   ```
2. Locate discount configuration
3. Update with varied percentages

#### 3b. Set Free Shipping Welcome Deal
**Location:** Wheel component configuration
**Task:**
- The guaranteed welcome deal should be "Free Shipping on orders over £20"
- Update the default/guaranteed prize text

**Action:**
- Locate "welcome deal" or "guaranteed" text in wheel config
- Update to: "Free Shipping on orders over £20"

---

### 4. Footer Updates

#### 4a. Add L Logo to Footer
**Location:** `src/ui/components/GlobalFooter.tsx`
**Task:**
- Currently shows "Lumelle" text (line 58)
- Add the L logo above or next to the "Lumelle" text
- Logo should be positioned on the left side

**Current Code (lines 57-64):**
```typescript
<div className="space-y-3">
  <p className="font-heading text-xl font-semibold uppercase tracking-[0.28em]">Lumelle</p>
  <p className="max-w-sm text-sm text-semantic-text-primary/75">
    Creator-grade shower caps that keep silk presses, curls, and braids flawless on camera.
  </p>
  {/* ... badge ... */}
</div>
```

**Action:**
- Add L logo image/component above "Lumelle" text
- Use logo path: `/images/logo-l.svg` or similar (verify actual path)
- Ensure proper sizing and alignment

**Suggested Implementation:**
```typescript
<div className="space-y-3">
  <img src="/images/logo-l.svg" alt="Lumelle" className="h-8 w-8" />
  <p className="font-heading text-xl font-semibold uppercase tracking-[0.28em]">Lumelle</p>
  {/* ... rest ... */}
</div>
```

---

## File Structure Reference

```
src/
├── content/
│   └── landing.ts                    # Content data (quotes, metrics, etc.)
├── archive/
│   └── landing/
│       └── ui/
│           ├── sections/
│           │   ├── hero/
│           │   │   └── HeroSection.tsx
│           │   ├── success/
│           │   │   └── SuccessStoriesSection.tsx
│           │   └── [other sections]
├── ui/
│   └── components/
│       └── GlobalFooter.tsx
```

## Testing Checklist

After implementation, verify:

### Hero Section
- [ ] No duplicate user count pills visible
- [ ] Stars appear above "Trusted by 10k users" text
- [ ] Stars are not in a pill container
- [ ] 5 profile images still visible
- [ ] Layout is clean and uncluttered

### Customer Stories
- [ ] No profile pictures in review cards
- [ ] Stars are not inside pills
- [ ] Review quotes are longer (2-3 sentences)
- [ ] Names are larger and centered
- [ ] Layout spacing looks good after avatar removal

### Spin Wheel
- [ ] Wheel segments show varied percentages (5%, 10%, 15%)
- [ ] Welcome deal shows "Free Shipping on orders over £20"
- [ ] Distribution looks realistic (not all same)

### Footer
- [ ] L logo visible above "Lumelle" text
- [ ] Logo properly sized and aligned
- [ ] Overall footer layout looks balanced

## Design Context

- **Brand Colors:** brand-peach, brand-blush, brand-cocoa
- **Typography:** font-heading for headlines, sans-serif for body
- **Styling System:** Tailwind CSS with custom semantic color tokens
- **Layout Pattern:** Rounded containers (rounded-3xl, rounded-2xl), soft shadows (shadow-soft)

## Execution Notes

1. **Order of Operations:**
   - Start with content changes (landing.ts) for reviews
   - Move to UI components (HeroSection, SuccessStoriesSection)
   - Handle wheel component (need to locate first)
   - End with footer updates

2. **Style Consistency:**
   - Maintain existing Tailwind class patterns
   - Use existing color tokens (brand-*, semantic-*)
   - Preserve responsive patterns (md: breakpoints)

3. **Image Assets:**
   - Verify L logo path exists before using
   - If logo not found, check `/images/` or `/public/` directories

4. **Content Writing:**
   - Keep review quotes authentic and natural
   - Match tone of existing quotes
   - Focus on specific product benefits

## Rollback Plan

If issues arise:
- Git revert specific file changes
- Each section is independent, can rollback individually
- Content changes (landing.ts) separate from UI changes

## Related Files

- Design specs: (if available, add path)
- Component documentation: `src/archive/landing/ui/components/README.md`
- Content types: `src/archive/landing/data/archive/home.types.legacy.ts`

---

**Document Status:** Ready for Implementation
**Next Step:** Provide this document URL to implementation agent with execution prompt
