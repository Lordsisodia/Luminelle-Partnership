# Lumelle Idea Generation System

Continuous improvement idea generator for the Lumelle e-commerce platform.

## Quick Start

Generate your first batch of ideas:

```bash
# Generate 10 ideas (default)
node scripts/generate-ideas.mjs

# Generate 100 ideas from all sources
node scripts/generate-ideas.mjs --count 100

# Generate only CRO ideas
node scripts/generate-ideas.mjs --category cro --count 20

# Generate from specific source
node scripts/generate-ideas.mjs --source competitors --count 15

# Custom output file
node scripts/generate-ideas.mjs --count 50 --output my-ideas.md
```

## Generated Files

- `/docs/05-planning/idea-generation/ideas/INITIAL-10.md` - Hand-picked initial ideas
- `/docs/05-planning/idea-generation/ideas/GENERATED-100.md` - 100 auto-generated ideas
- `/docs/05-planning/idea-generation/IDEA-GENERATION-SYSTEM.md` - System documentation

## Idea Categories

### Feature Ideas
New functionality that adds value to the platform
- Product features
- User capabilities
- Integrations
- Tools and utilities

### UI Ideas
Visual and interaction improvements
- Component enhancements
- Layout changes
- Animations
- Responsive improvements

### CRO Ideas
Conversion Rate Optimization focused
- A/B test variations
- Urgency and scarcity tactics
- Trust signals
- Friction reduction

### SEO Ideas
Search engine optimization
- Technical SEO
- On-page optimization
- Core Web Vitals
- Structured data

### Content Ideas
Content strategy and marketing
- Blog posts
- Guides and tutorials
- Video content
- Social media

## Idea Sources

### 1. Competitor Analysis
Analyzes 100+ competitor homepages from existing research data:
```
.worktrees/pr-3/docs/.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/
```

Competitors analyzed include:
- Glossier, Mejuri, Everlane, Cuyana
- Reformation, Ganni, Anthropologie, Madewell
- And 90+ more fashion/beauty brands

### 2. Codebase Audit
Reviews existing components and identifies gaps:
- Marketing pages
- Shop functionality
- Account management
- Blog and content

### 3. SEO & Performance
Identifies optimization opportunities:
- Core Web Vitals improvements
- Schema markup opportunities
- Image optimization
- Code splitting

### 4. CRO Research
Conversion-focused experiment ideas:
- A/B test variations
- Psychological triggers
- Trust building
- Friction reduction

### 5. Content Strategy
Content gap analysis and opportunities:
- Blog topics
- Video tutorials
- Guides and how-tos
- Social media content

## Approval Workflow

### Step 1: Review Ideas
```bash
# Open the generated ideas file
cat docs/05-planning/idea-generation/ideas/GENERATED-100.md
```

### Step 2: Mark Approved Ideas
For each idea you want to implement, add it to the approved list:

```markdown
## Approved Ideas

- [ ] Idea #1: Add live chat widget like Glossier
- [x] Idea #2: Sticky add-to-cart with price anchor
- [ ] Idea #3: Product comparison tool
```

### Step 3: Add to Blackbox Project Memory
Once approved, create a task for implementation:

```bash
# Use the Blackbox task system to create implementation tasks
# Each approved idea becomes a tracked task
```

### Step 4: Implementation
Ideas are implemented by priority and effort:
1. Quick wins (Low effort, High impact)
2. Medium effort (Good ROI)
3. Strategic investments (High effort, High impact)

## Idea Template

Each generated idea includes:

```markdown
### [Title]

**Category**: feature|ui|cro|seo|content
**Priority**: 1-10
**Effort**: Low|Medium|High
**Source**: competitors|audit|seo|cro|content

[Description of the idea and its benefits]

**Success Metric**: [Measurable outcome]
```

## Priority Scoring

- **10**: Critical, immediate impact, low effort
- **8-9**: High impact, medium effort
- **6-7**: Good ROI, requires planning
- **4-5**: Nice to have, lower priority
- **1-3**: Backlog, future consideration

## Effort Estimation

- **Low**: < 4 hours, minimal changes
- **Medium**: 4-16 hours, some complexity
- **High**: > 16 hours, significant development

## Continuous Generation

### Manual Trigger
```bash
node scripts/generate-ideas.mjs --count 20
```

### Automated (Future)
- Weekly scheduled generation
- Git hook on merge
- Analytics alert trigger
- Manual agent invocation

## Integration with Development Workflow

1. **Generate** ideas using this system
2. **Review** and prioritize based on current goals
3. **Approve** ideas that align with roadmap
4. **Create** tasks in Blackbox project memory
5. **Implement** following development process
6. **Measure** impact using success metrics
7. **Iterate** based on results

## Example: From Idea to Implementation

### 1. Generated Idea
```markdown
### Add sticky add-to-cart with price anchor

**Category**: cro
**Priority**: 9/10
**Effort**: Low

Add a sticky bottom bar on mobile and side panel on desktop that appears
after scrolling past the hero, showing current price and Add to Cart button.

**Success Metric**: Increase conversion rate by 8-12%
```

### 2. Approved
Mark as approved in review document

### 3. Task Created
```bash
# Added to Blackbox task queue
- Task: Implement sticky add-to-cart bar
- Priority: High
- Estimated: 4 hours
```

### 4. Implemented
Development creates component following existing patterns

### 5. Measured
Analytics show 10% conversion increase → Success!

### 6. Documented
Add to wins/learnings document

## Metrics to Track

For each implemented idea, track:
- Conversion rate impact
- Revenue impact
- User engagement changes
- Support ticket changes
- Technical performance impact

## Customization

### Add Custom Idea Sources
Edit `scripts/generate-ideas.mjs` to add new generators:

```javascript
function* generateCustomIdeas(count = 10) {
  const customIdeas = [
    // Your custom ideas here
  ]

  for (const idea of customIdeas) {
    yield {
      id: generateId(),
      title: idea.title,
      category: 'custom',
      // ... other fields
    }
  }
}
```

### Modify Templates
Update the `IDEA_TEMPLATES` object to customize generated ideas.

## Contributing

To add new ideas or improve the generator:

1. Edit the source lists in `scripts/generate-ideas.mjs`
2. Test generation with `--count 5`
3. Update documentation
4. Commit changes

## Next Steps

1. Review the initial 10 ideas: `INITIAL-10.md`
2. Generate custom ideas: `node scripts/generate-ideas.mjs --count 20`
3. Approve high-priority ideas
4. Add to Blackbox project memory
5. Begin implementation

## Questions?

Refer to:
- System documentation: `IDEA-GENERATION-SYSTEM.md`
- Initial ideas: `ideas/INITIAL-10.md`
- Generated ideas: `ideas/GENERATED-100.md`
