# Quick Reference Guide

Quick reference for using the AI Improvement Framework.

---

## File Structure

```
docs/.ai-prompts/improvement-framework/
├── README.md              # Main framework documentation
├── PROMPT-TEMPLATE.md     # Copy this to prompt any AI
├── business-context.md    # Business overview, goals, constraints
├── user-personas.md       # Detailed user personas and journeys
├── tech-stack.md          # Technical architecture and patterns
└── idea-examples.md       # Example properly-formatted ideas
```

---

## How to Use (3 Steps)

### Step 1: Copy the Prompt Template

Copy the entire contents of `PROMPT-TEMPLATE.md`

### Step 2: Fill in Your Target

Replace `[SPECIFY PAGE/FEATURE HERE]` with what you want analyzed:
- `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`
- `src/domains/client/shop/products/ui/pages/ProductPage`
- The reviews section
- The checkout flow

### Step 3: Paste to Any AI

Paste to Claude, ChatGPT, Gemini, or any other AI model.

---

## What You'll Get

10-20 improvement ideas in this format:

```markdown
## [CATEGORY-NNN] Idea Title

**Category**: feature|ui|cro|seo|content|technical
**Priority**: 1-10
**Effort**: xs|s|m|l|xl
**Impact**: Measurable outcome

### Description
### User Value
### Business Value
### Technical Notes
### Success Metrics
### Dependencies
### Risks
### Similar Implementations
```

---

## Idea Categories

| Category | Focus | Examples |
|----------|-------|----------|
| **Feature** | New functionality | Live chat, quiz, wishlist |
| **UI** | Visual improvements | Animations, layout, galleries |
| **CRO** | Conversion optimization | Popups, urgency, trust signals |
| **SEO** | Search optimization | Schema, Core Web Vitals |
| **Content** | Content strategy | Blog posts, videos, guides |
| **Technical** | Performance/infrastructure | Lazy loading, caching |

---

## Effort Scale

| Code | Effort | Examples |
|------|--------|----------|
| **xs** | < 2 hours | Copy changes, CSS tweaks |
| **s** | 2-4 hours | Small components, config |
| **m** | 4-16 hours | Medium features |
| **l** | 16-40 hours | Major features |
| **xl** | > 40 hours | Complex infrastructure |

---

## Priority Scale

| Range | Meaning |
|-------|---------|
| **10** | Critical, immediate impact |
| **8-9** | High impact, do soon |
| **6-7** | Good ROI, plan for |
| **4-5** | Nice to have, backlog |
| **1-3** | Low priority |

---

## Quick Start Commands

### Analyze the Landing Page
```
Read docs/.ai-prompts/improvement-framework/*.md

Analyze: src/domains/client/marketing/ui/pages/ShopLandingPage.tsx

Generate 15 improvement ideas focusing on CRO and UI enhancements.
```

### Analyze Product Page
```
Read docs/.ai-prompts/improvement-framework/*.md

Analyze: src/domains/client/shop/products/ui/pages/ProductPage

Generate 15 improvement ideas focusing on conversion and user experience.
```

### Get Feature Ideas
```
Read docs/.ai-prompts/improvement-framework/*.md

Analyze the current checkout process

Generate 10 feature ideas to reduce cart abandonment.
```

### Get SEO Ideas
```
Read docs/.ai-prompts/improvement-framework/*.md

Analyze the site for SEO opportunities

Generate 10 SEO improvement ideas focusing on Core Web Vitals and schema markup.
```

---

## Tips for Best Results

1. **Be Specific**: Name the exact file or feature to analyze
2. **Set Focus**: Mention which categories to prioritize
3. **Request Quantity**: Ask for 10-20 ideas to get variety
4. **Provide Context**: Share current issues or goals
5. **Iterate**: Ask follow-ups to refine ideas

---

## Common Use Cases

### "I Need Quick Wins"
```
Generate ideas with effort xs or s that will improve conversion rate.
```

### "I Need to Build Trust"
```
Generate ideas that address user uncertainty and build trust on the landing page.
```

### "Mobile Experience Needs Work"
```
Analyze the mobile experience and generate improvements.
```

### "Preparing for a Redesign"
```
Generate comprehensive feature, UI, and technical ideas for the checkout flow.
```

### "Running Low on Ideas"
```
Generate 20 ideas across all categories for the entire site.
```

---

## After Getting Ideas

1. **Review** each idea for feasibility
2. **Prioritize** based on current goals
3. **Estimate** with your team
4. **Test** high-priority ideas
5. **Measure** the results
6. **Iterate** based on data

---

## Framework Benefits

✅ **Model-Agnostic**: Works with any AI
✅ **Standardized**: Consistent format every time
✅ **Context-Aware**: Understands your business
✅ **Actionable**: Ready to implement
✅ **Measured**: Clear success metrics
✅ **Prioritized**: Effort and impact clear

---

## Need Help?

- **Full documentation**: `README.md`
- **Prompt template**: `PROMPT-TEMPLATE.md`
- **Example ideas**: `idea-examples.md`
- **Business context**: `business-context.md`
- **User personas**: `user-personas.md`
- **Tech stack**: `tech-stack.md`

---

**Start generating ideas in seconds by copying `PROMPT-TEMPLATE.md` to any AI!**
