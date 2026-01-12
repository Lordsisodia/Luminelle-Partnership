# Landing Page UI Updates - January 2026

**Plan ID:** `2026-01-11_1631_landing-page-ui-updates-jan-2026`
**Status:** ✅ Ready for Execution
**Created:** 2026-01-11
**Client Feedback:** Pre-designed UI updates

## 📋 What This Is

A complete, ready-to-execute plan for updating the Lumelle landing page based on client feedback. All changes are pre-designed and require straightforward implementation work.

## 🚀 Quick Start

### For Implementation Agent:

**Option 1: Detailed Prompt**
```
Read and implement the specification at: docs/.blackbox/.plans/2026-01-11_1631_landing-page-ui-updates-jan-2026/PLAN.md
```

**Option 2: Single-Line with Context**
```
Update the Lumelle landing page:
1. Hero: Remove "10k+" pill, move stars above "Trusted by 10k users"
2. Stories: Remove avatars, extract stars from pills, longer reviews, bigger centered names
3. Wheel: 5%/10%/15% segments, free shipping over £20
4. Footer: Add L logo

Full spec: docs/.blackbox/.plans/2026-01-11_1631_landing-page-ui-updates-jan-2026/PLAN.md
```

## 📁 Documents in This Plan

| File | Purpose |
|------|---------|
| `PLAN.md` | Complete specification with file paths, code snippets, and testing checklist |
| `EXECUTION-PROMPT.md` | Pre-written prompts for implementation agents |
| `QUICK-REFERENCE.md` | Task summary table and code snippets |
| `README.md` | This file - overview and navigation |

## 📊 Task Breakdown

### 1. Hero Section (2 tasks)
- Remove duplicate user count pills
- Relocate star ratings above trust text

### 2. Customer Stories (4 tasks)
- Remove profile pictures from review cards
- Extract stars from pill containers
- Expand review text to 2-3 sentences each
- Increase name size and center-align

### 3. Spin Wheel (2 tasks)
- Update segments with varied percentages (5%, 10%, 15%)
- Set guaranteed deal to "Free Shipping on orders over £20"

### 4. Footer (1 task)
- Add L logo above "Lumelle" text

**Total:** 9 individual implementation tasks

## 📂 Key Files

```
src/
├── content/landing.ts                              # Review text, metrics
├── archive/landing/ui/sections/
│   ├── hero/HeroSection.tsx                       # Hero layout
│   └── success/SuccessStoriesSection.tsx          # Reviews layout
└── ui/components/GlobalFooter.tsx                 # Footer component
```

## ✅ Completion Criteria

All tasks complete when:
- [ ] Hero section has no duplicate user count pills
- [ ] Stars appear above trust text, not in pills
- [ ] Review cards have no profile pictures
- [ ] Review stars are standalone (not in pills)
- [ ] All review quotes are 2-3 sentences long
- [ ] Review names are larger and centered
- [ ] Wheel shows mixed percentage segments
- [ ] Welcome deal mentions free shipping over £20
- [ ] Footer displays L logo

## 🔍 Testing

After implementation:
1. Run development server
2. Navigate to landing page
3. Verify each section against screenshots/design
4. Check responsive behavior (mobile/desktop)
5. Test all interactive elements

## 📝 Notes

- **Design System:** Tailwind CSS with custom semantic tokens
- **Brand Colors:** brand-peach, brand-blush, brand-cocoa
- **Typography:** font-heading for headlines
- **Component Pattern:** Rounded containers (rounded-3xl), soft shadows (shadow-soft)

## 🔄 Rollback

Each section can be reverted independently:
```bash
git checkout HEAD -- src/content/landing.ts
git checkout HEAD -- src/archive/landing/ui/sections/hero/HeroSection.tsx
git checkout HEAD -- src/archive/landing/ui/sections/success/SuccessStoriesSection.tsx
git checkout HEAD -- src/ui/components/GlobalFooter.tsx
```

## 📞 Support

If implementation questions arise:
1. Check `PLAN.md` for detailed specifications
2. Review `QUICK-REFERENCE.md` for code snippets
3. Examine existing component patterns in the codebase

---

**Status:** Ready to hand off to implementation agent ✅
**Estimated Time:** 2-3 hours for all updates
**Complexity:** Low - straightforward UI/content changes
