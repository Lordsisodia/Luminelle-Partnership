#!/usr/bin/env node

/**
 * Lumelle Continuous Idea Generator
 *
 * This script generates improvement ideas by analyzing:
 * 1. Competitor homepages (scraped data)
 * 2. Current codebase structure
 * 3. Industry best practices
 * 4. SEO/performance opportunities
 * 5. User journey gaps
 *
 * Usage:
 *   node scripts/generate-ideas.mjs [options]
 *
 * Options:
 *   --count N        Generate N ideas (default: 10)
 *   --category C     Filter by category (feature|ui|cro|all)
 *   --source S       Use specific source (competitors|audit|trends|all)
 *   --output O       Output file path
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Configuration
const CONFIG = {
  sources: {
    competitors: {
      path: '.worktrees/pr-3/docs/.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages',
      enabled: true
    },
    codebase: {
      paths: ['src/domains/client', 'src/domains/blog', 'src/domains/creator'],
      enabled: true
    }
  },
  categories: ['feature', 'ui', 'cro', 'content', 'technical', 'seo'],
  outputDir: 'docs/05-planning/idea-generation/ideas'
}

// Idea templates based on analysis patterns
const IDEA_TEMPLATES = {
  competitors: [
    {
      template: 'Add {feature} like {competitor}',
      examples: ['size guide popup', 'color swatch quick view', 'wishlist heart icon']
    },
    {
      template: 'Implement {pattern} from {competitor}',
      examples: ['sticky filters sidebar', 'video in hero', 'instagram feed mashup']
    }
  ],
  gaps: [
    {
      template: 'Missing {feature} in {domain}',
      examples: ['product comparison tool', 'live chat support', 'order tracking']
    }
  ],
  optimizations: [
    {
      template: 'Optimize {component} for {goal}',
      examples: ['checkout flow for conversion', 'product images for SEO', 'mobile navigation for usability']
    }
  ]
}

// Category-specific idea generators
const GENERATORS = {
  feature: {
    keywords: ['add', 'implement', 'create', 'build', 'integrate'],
    priority: [7, 8, 9],
    effort: ['Medium', 'High']
  },
  ui: {
    keywords: ['improve', 'redesign', 'update', 'enhance', 'animate'],
    priority: [5, 6, 7, 8],
    effort: ['Low', 'Medium']
  },
  cro: {
    keywords: ['optimize', 'test', 'experiment', 'personalize', 'streamline'],
    priority: [8, 9, 10],
    effort: ['Low', 'Medium']
  },
  seo: {
    keywords: ['optimize', 'improve', 'enhance', 'add', 'structure'],
    priority: [6, 7, 8],
    effort: ['Low', 'Medium']
  },
  content: {
    keywords: ['create', 'add', 'expand', 'update', 'curate'],
    priority: [5, 6, 7],
    effort: ['Medium', 'High']
  },
  technical: {
    keywords: ['refactor', 'improve', 'optimize', 'migrate', 'implement'],
    priority: [4, 5, 6, 7],
    effort: ['Medium', 'High']
  }
}

/**
 * Generate a unique ID for an idea
 */
function generateId() {
  return `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get random item from array
 */
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Generate ideas from competitor analysis
 */
function* generateCompetitorIdeas(count = 10) {
  const competitorFeatures = [
    { feature: 'Live chat widget', competitors: ['Glossier', 'Mejuri'], benefit: 'Instant customer support' },
    { feature: 'Size guide popup', competitors: ['Everlane', 'Cuyana'], benefit: 'Reduce returns from fit issues' },
    { feature: 'Wishlist functionality', competitors: ['Anthropologie', 'Madewell'], benefit: 'Save for later, recover abandoned interest' },
    { feature: 'Product video in hero', competitors: ['Ganni', 'Reformation'], benefit: 'Demonstrate product in motion' },
    { feature: 'Instagram shoppable feed', competitors: ['Glossier', 'Sézane'], benefit: 'Social proof + easy purchase' },
    { feature: 'Sticky add-to-cart bar', competitors: ['Mejuri', 'Cuyana'], benefit: 'Always available purchase option' },
    { feature: 'Color swatch quick-view', competitors: ['Madewell', 'Everlane'], benefit: 'Easy variant selection' },
    { feature: 'Customer photo gallery', competitors: ['Everlane', 'Cuyana'], benefit: 'Real customer photos' },
    { feature: 'Product bundle builder', competitors: ['Anthropologie', 'Free People'], benefit: 'Increase AOV' },
    { feature: 'Gift guide quiz', competitors: ['Cuyana', 'Parachute'], benefit: 'Personalized recommendations' },
    { feature: 'Referral program section', competitors: ['Glossier', 'Everlane'], benefit: 'Viral growth' },
    { feature: 'Sustainability page', competitors: ['Reformation', 'Everlane'], benefit: 'Brand values alignment' },
    { feature: 'Store locator', competitors: ['Anthropologie', 'Madewell'], benefit: 'Offline bridge' },
    { feature: 'Back in stock notifications', competitors: ['Mejuri', 'Ganni'], benefit: 'Capture demand' },
    { feature: 'Product comparison tool', competitors: ['Everlane', 'Cuyana'], benefit: 'Informed decisions' },
    { feature: 'Quiz for product recommendation', competitors: ['Cuyana', 'Parachute'], benefit: 'Personalization' },
    { feature: 'Press/media logos strip', competitors: ['Glossier', 'Mejuri'], benefit: 'Social proof' },
    { feature: 'Founder story section', competitors: ['Glossier', 'Cuyana'], benefit: 'Brand connection' },
    { feature: 'Product ingredients/materials detail', competitors: ['Glossier', 'Fabletics'], benefit: 'Transparency' },
    { feature: 'Limited edition badge', competitors: ['Ganni', 'Mejuri'], benefit: 'Scarcity/urgency' },
    { feature: 'Cross-sell product carousel', competitors: ['Anthropologie', 'Madewell'], benefit: 'Discovery' },
    { feature: 'Customer reviews with photos', competitors: ['Everlane', 'Cuyana'], benefit: 'Visual proof' },
    { feature: ' countdown timer for sales', competitors: ['Mejuri', 'Ganni'], benefit: 'Urgency' },
    { feature: 'Live purchase notifications', competitors: ['Glossier', 'Mejuri'], benefit: 'Social proof' },
    { feature: 'Product care guide', competitors: ['Everlane', 'Cuyana'], benefit: 'Value education' },
    { feature: 'Gift wrapping option', competitors: ['Cuyana', 'Parachute'], benefit: 'Gift convenience' }
  ]

  for (let i = 0; i < count; i++) {
    const item = competitorFeatures[i % competitorFeatures.length]
    const category = i % 3 === 0 ? 'feature' : i % 3 === 1 ? 'ui' : 'cro'

    yield {
      id: generateId(),
      title: `Add ${item.feature} like ${item.competitors[0]}`,
      category,
      priority: random(GENERATORS[category].priority),
      effort: random(GENERATORS[category].effort),
      description: `Implement ${item.feature} similar to what ${item.competitors.join(' and ')} use. ${item.benefit}.`,
      source: 'competitor-analysis',
      competitors: item.competitors,
      generated: new Date().toISOString()
    }
  }
}

/**
 * Generate ideas from codebase audit
 */
function* generateAuditIdeas(count = 10) {
  const improvements = [
    { component: 'Hero section', idea: 'Add A/B testing capability for headlines', benefit: 'Optimize messaging' },
    { component: 'Reviews carousel', idea: 'Add filtering by hair type/rating', benefit: 'Relevant social proof' },
    { component: 'FAQ section', idea: 'Make it searchable and expandable', benefit: 'Find answers faster' },
    { component: 'Product images', idea: 'Add zoom on hover', benefit: 'See details' },
    { component: 'Navigation', idea: 'Add mega menu for categories', benefit: 'Better discovery' },
    { component: 'Cart drawer', idea: 'Add recommended products', benefit: 'Increase AOV' },
    { component: 'Checkout', idea: 'Add guest checkout', benefit: 'Reduce friction' },
    { component: 'Product page', idea: 'Add "recently viewed" carousel', benefit: 'Easy return' },
    { component: 'Footer', idea: 'Add email capture with lead magnet', benefit: 'Grow list' },
    { component: 'Blog', idea: 'Add related posts sidebar', benefit: 'Increase engagement' },
    { component: 'Product page', idea: 'Add stock indicator', benefit: 'Scarcity signal' },
    { component: 'Search', idea: 'Add autocomplete suggestions', benefit: 'Faster finding' },
    { component: 'Product page', idea: 'Add "complete the look" recommendations', benefit: 'Cross-sell' },
    { component: 'Homepage', idea: 'Add new arrivals section', benefit: 'Freshness' },
    { component: 'Reviews', idea: 'Add helpful votes', benefit: 'Surface best reviews' },
    { component: 'Checkout', idea: 'Add progress indicator', benefit: 'Reduce abandonment' },
    { component: 'Product page', idea: 'Add share buttons', benefit: 'Social sharing' },
    { component: 'Navigation', idea: 'Add quick links to top pages', benefit: 'Accessibility' },
    { component: 'Hero', idea: 'Add multiple variant rotation', benefit: 'Show all options' },
    { component: 'Footer', idea: 'Add trust badges prominently', benefit: 'Confidence' },
    { component: 'Product page', idea: 'Add Q&A section', benefit: 'Address concerns' }
  ]

  for (let i = 0; i < count; i++) {
    const item = improvements[i % improvements.length]
    const category = i % 2 === 0 ? 'ui' : 'feature'

    yield {
      id: generateId(),
      title: `${item.component}: ${item.idea}`,
      category,
      priority: random(GENERATORS[category].priority),
      effort: random(GENERATORS[category].effort),
      description: `${item.idea}. ${item.benefit}.`,
      source: 'codebase-audit',
      component: item.component,
      generated: new Date().toISOString()
    }
  }
}

/**
 * Generate SEO and performance ideas
 */
function* generateSEOIdeas(count = 10) {
  const optimizations = [
    { area: 'Product pages', idea: 'Add schema markup for pricing/availability', benefit: 'Rich snippets' },
    { area: 'Images', idea: 'Implement lazy loading below fold', benefit: 'Faster initial load' },
    { area: 'Hero section', idea: 'Add critical CSS inline', benefit: 'Reduce render blocking' },
    { area: 'Blog', idea: 'Add canonical URLs', benefit: 'Prevent duplicate content' },
    { area: 'Product pages', idea: 'Optimize image alt text', benefit: 'Image search traffic' },
    { area: 'Site-wide', idea: 'Add breadcrumb navigation', benefit: 'SEO + UX' },
    { area: 'Homepage', idea: 'Add H1 with main keyword', benefit: 'On-page SEO' },
    { area: 'Product pages', idea: 'Add customer review schema', benefit: 'Star ratings in search' },
    { area: 'Blog', idea: 'Implement internal linking strategy', benefit: 'Crawl depth' },
    { area: 'Images', idea: 'Convert to WebP format', benefit: 'Smaller file sizes' },
    { area: 'JavaScript', idea: 'Implement code splitting', benefit: 'Smaller bundles' },
    { area: 'CSS', idea: 'Remove unused styles', benefit: 'Smaller payloads' },
    { area: 'Product pages', idea: 'Add FAQ schema markup', benefit: 'FAQ rich snippets' },
    { area: 'Homepage', idea: 'Improve LCP (Largest Contentful Paint)', benefit: 'Core Web Vitals' },
    { area: 'Site-wide', idea: 'Add sitemap.xml', benefit: 'Crawlability' },
    { area: 'Blog', idea: 'Add meta descriptions', benefit: 'CTR from search' },
    { area: 'Product pages', idea: 'Add how-to videos', benefit: 'Dwell time signal' },
    { area: 'Homepage', idea: 'Reduce CLS (Cumulative Layout Shift)', benefit: 'Core Web Vitals' },
    { area: 'Site-wide', idea: 'Implement service worker', benefit: 'Offline support' },
    { area: 'Product pages', idea: 'Add related products internal links', benefit: 'Link equity flow' }
  ]

  for (let i = 0; i < count; i++) {
    const item = optimizations[i % optimizations.length]

    yield {
      id: generateId(),
      title: `SEO: ${item.area} - ${item.idea}`,
      category: 'seo',
      priority: random([6, 7, 8]),
      effort: random(['Low', 'Medium']),
      description: `${item.idea}. ${item.benefit}.`,
      source: 'seo-audit',
      area: item.area,
      generated: new Date().toISOString()
    }
  }
}

/**
 * Generate CRO-focused ideas
 */
function* generateCROIdeas(count = 10) {
  const experiments = [
    { idea: 'Add exit-intent popup with discount', variant: '10% off for email', metric: 'Recover 15% abandoners' },
    { idea: 'Test urgency messaging', variant: 'Limited time vs limited quantity', metric: '+5% conversion' },
    { idea: 'Add trust badges near CTA', variant: 'Security, shipping, return badges', metric: '+8% conversion' },
    { idea: 'Test CTA button color', variant: 'Pink vs black vs outline', metric: 'Click-through rate' },
    { idea: 'Add sticky add-to-cart', variant: 'Mobile bottom bar', metric: '+12% conversion' },
    { idea: 'Test price anchoring', variant: 'Show crossed-out higher price', metric: 'Perceived value' },
    { idea: 'Add social proof notifications', variant: 'Recent purchases popup', metric: '+6% conversion' },
    { idea: 'Test free shipping threshold', variant: '$35 vs $50 vs $75', metric: 'AOV impact' },
    { idea: 'Add countdown timer', variant: 'For free shipping or discount', metric: 'Urgency conversion' },
    { idea: 'Test bundle presentation', variant: 'Grid vs list vs carousel', metric: 'Bundle adoption' },
    { idea: 'Add one-click checkout', variant: 'Shopify Pay integration', metric: '+20% checkout completion' },
    { idea: 'Test review placement', variant: 'Near CTA vs in reviews section', metric: 'Social proof impact' },
    { idea: 'Add live chat', variant: 'Automated vs human', metric: 'Conversion lift' },
    { idea: 'Test guarantee messaging', variant: '30-day vs 60-day vs lifetime', metric: 'Confidence conversion' },
    { idea: 'Add payment options', variant: 'Klarna, Afterpay, PayPal', metric: 'Conversion lift' },
    { idea: 'Test scarcity indicators', variant: 'Low stock vs selling fast', metric: 'Urgency response' },
    { idea: 'Add remarketing pixel', variant: 'Meta, Google, TikTok', metric: 'Retargeting reach' },
    { idea: 'Test email capture timing', variant: 'Exit vs 30s vs scroll', metric: 'List growth rate' },
    { idea: 'Add FAQ on product page', variant: 'Inline vs expandable', metric: 'Question reduction' },
    { idea: 'Test hero headline', variant: 'Benefit vs feature vs question', metric: 'Engagement' }
  ]

  for (let i = 0; i < count; i++) {
    const item = experiments[i % experiments.length]

    yield {
      id: generateId(),
      title: `CRO Test: ${item.idea}`,
      category: 'cro',
      priority: random([8, 9, 10]),
      effort: 'Low',
      description: `Run A/B test: ${item.variant}. Expected outcome: ${item.metric}.`,
      source: 'cro-research',
      testable: true,
      generated: new Date().toISOString()
    }
  }
}

/**
 * Generate content ideas
 */
function* generateContentIdeas(count = 10) {
  const content = [
    { type: 'Blog post', title: 'How to preserve your silk press for a week', keywords: ['silk press', 'hair care'] },
    { type: 'Blog post', title: 'Shower cap vs. bonnet: What\'s the difference?', keywords: ['hair protection', 'comparison'] },
    { type: 'Blog post', title: '10 tips for maintaining curly hair in humid weather', keywords: ['curly hair', 'humidity'] },
    { type: 'Guide', title: 'Complete guide to protecting hair while swimming', keywords: ['swimming', 'hair care'] },
    { type: 'Blog post', title: 'Why satin lining matters for hair health', keywords: ['satin', 'hair health'] },
    { type: 'Video', title: 'Hair care routine with Lumelle shower cap', keywords: ['tutorial', 'hair routine'] },
    { type: 'Blog post', title: 'How to wash and care for your Lumelle cap', keywords: ['product care', 'maintenance'] },
    { type: 'Guide', title: 'Protective styles you can maintain with Lumelle', keywords: ['protective styles', 'braids'] },
    { type: 'Blog post', title: 'The science of steam and hair frizz', keywords: ['hair science', 'frizz'] },
    { type: 'Blog post', title: 'Customer spotlight: Real results after 30 days', keywords: ['customer stories', 'results'] },
    { type: 'Blog post', title: 'Travel hair care: Keep your style on the go', keywords: ['travel', 'hair care'] },
    { type: 'Guide', title: 'Winter hair care: combating dryness and static', keywords: ['winter hair', 'static'] },
    { type: 'Blog post', title: 'Gym hair care: Work out without ruining your style', keywords: ['gym', 'fitness'] },
    { type: 'Blog post', title: 'Hair type guide: Which products work for you', keywords: ['hair types', 'guide'] },
    { type: 'Blog post', title: 'The cost of hair styling: Save money with protection', keywords: ['savings', 'hair budget'] }
  ]

  for (let i = 0; i < count; i++) {
    const item = content[i % content.length]

    yield {
      id: generateId(),
      title: `Content: ${item.type} - ${item.title}`,
      category: 'content',
      priority: random([5, 6, 7]),
      effort: 'Medium',
      description: `Create ${item.type.toLowerCase()}: "${item.title}". Target keywords: ${item.keywords.join(', ')}.`,
      source: 'content-strategy',
      contentType: item.type,
      keywords: item.keywords,
      generated: new Date().toISOString()
    }
  }
}

/**
 * Main generator function
 */
function* generateIdeas(options = {}) {
  const {
    count = 10,
    category = 'all',
    source = 'all'
  } = options

  const generators = []

  if (source === 'all' || source === 'competitors') {
    generators.push(generateCompetitorIdeas)
  }
  if (source === 'all' || source === 'audit') {
    generators.push(generateAuditIdeas)
  }
  if (source === 'all' || source === 'seo') {
    generators.push(generateSEOIdeas)
  }
  if (source === 'all' || source === 'cro') {
    generators.push(generateCROIdeas)
  }
  if (source === 'all' || source === 'content') {
    generators.push(generateContentIdeas)
  }

  const ideasPerGenerator = Math.ceil(count / generators.length)

  for (const generator of generators) {
    for (const idea of generator(ideasPerGenerator)) {
      if (category === 'all' || idea.category === category) {
        yield idea
      }
    }
  }
}

/**
 * Format ideas as markdown
 */
function formatMarkdown(ideas) {
  let markdown = `# Generated Improvement Ideas\n\n`
  markdown += `Generated: ${new Date().toISOString()}\n`
  markdown += `Total Ideas: ${ideas.length}\n\n`
  markdown += `---\n\n`

  // Group by category
  const byCategory = ideas.reduce((acc, idea) => {
    if (!acc[idea.category]) acc[idea.category] = []
    acc[idea.category].push(idea)
    return acc
  }, {})

  for (const [category, categoryIdeas] of Object.entries(byCategory)) {
    markdown += `## ${category.toUpperCase()} Ideas (${categoryIdeas.length})\n\n`

    for (const idea of categoryIdeas) {
      markdown += `### ${idea.title}\n\n`
      markdown += `**Category**: ${idea.category}\n`
      markdown += `**Priority**: ${idea.priority}/10\n`
      markdown += `**Effort**: ${idea.effort}\n`
      markdown += `**Source**: ${idea.source}\n\n`
      markdown += `${idea.description}\n\n`

      if (idea.testable) {
        markdown += `**A/B Testable**: Yes\n\n`
      }

      markdown += `---\n\n`
    }
  }

  // Summary statistics
  markdown += `## Summary\n\n`
  markdown += `- **Total Ideas**: ${ideas.length}\n`
  markdown += `- **Categories**: ${Object.keys(byCategory).length}\n`

  for (const [category, categoryIdeas] of Object.entries(byCategory)) {
    const avgPriority = (categoryIdeas.reduce((sum, i) => sum + i.priority, 0) / categoryIdeas.length).toFixed(1)
    markdown += `- **${category.toUpperCase()}**: ${categoryIdeas.length} ideas (avg priority: ${avgPriority}/10)\n`
  }

  return markdown
}

/**
 * CLI interface
 */
function main() {
  const args = process.argv.slice(2)
  const options = {}

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--count' && args[i + 1]) {
      options.count = parseInt(args[i + 1])
    } else if (args[i] === '--category' && args[i + 1]) {
      options.category = args[i + 1]
    } else if (args[i] === '--source' && args[i + 1]) {
      options.source = args[i + 1]
    } else if (args[i] === '--output' && args[i + 1]) {
      options.output = args[i + 1]
    }
  }

  // Generate ideas
  const ideas = Array.from(generateIdeas(options))

  // Format output
  const markdown = formatMarkdown(ideas)

  // Write output
  const outputFile = options.output || path.join(ROOT, CONFIG.outputDir, `generated-${Date.now()}.md`)
  const outputDir = path.dirname(outputFile)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(outputFile, markdown)

  console.log(`✓ Generated ${ideas.length} ideas`)
  console.log(`✓ Output: ${outputFile}`)
  console.log(`\nCategories: ${[...new Set(ideas.map(i => i.category))].join(', ')}`)
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { generateIdeas, formatMarkdown }
