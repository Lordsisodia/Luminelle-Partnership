# Single-Line Execution Prompt

## For Implementation Agent

Copy and paste this prompt to an agent:

```
You are implementing UI updates to the Lumelle landing page. All changes are pre-designed and specified in detail.

Read the full specification at: docs/.blackbox/.plans/2026-01-11_1631_landing-page-ui-updates-jan-2026/PLAN.md

Execute all tasks in the following order:
1. Hero Section - Remove user count pill, move stars
2. Customer Stories - Remove avatars, extract stars from pills, lengthen reviews, center/bigger names
3. Spin Wheel - Update segments to 5%/10%/15% distribution, set free shipping welcome deal
4. Footer - Add L logo

After completing each section, verify the changes match the specification. Use existing Tailwind classes and design patterns.

Note: The spin wheel component may need to be located first - search for discount/wheel/spin related files if not found in the standard landing sections directory.

Report back when all tasks are complete or if you encounter any blockers.
```

## Alternative (with document URL if hosted)

If this document is hosted (e.g., GitHub, notational), replace the file path with the URL:

```
Update the Lumelle landing page according to these specifications: [URL]

Changes:
1. Hero: Remove "10k+" pill, move stars above "Trusted by 10k users" text
2. Customer Stories: Remove profile pics, extract stars from pills, make reviews longer, center/bigger names
3. Spin Wheel: Mix of 5%/10%/15% segments, free shipping over £20 welcome deal
4. Footer: Add L logo

See full spec at the link above for file paths and implementation details.
```

---

## Key Information for Agent

**Files to Modify:**
- `src/content/landing.ts` - Content data
- `src/archive/landing/ui/sections/hero/HeroSection.tsx` - Hero section
- `src/archive/landing/ui/sections/success/SuccessStoriesSection.tsx` - Customer stories
- `src/ui/components/GlobalFooter.tsx` - Footer
- *(Wheel component - to be located)*

**Design System:**
- Tailwind CSS
- Colors: brand-peach, brand-blush, brand-cocoa, semantic-*
- Patterns: rounded-3xl, shadow-soft, responsive breakpoints

**Testing:**
- Check visual appearance after each change
- Ensure responsive behavior maintained
- Verify no console errors
