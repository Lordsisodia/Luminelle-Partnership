import type { BlogPost } from '../types'

const post: BlogPost = {
  slug: 'deep-clean-satin-cap',
  title: 'How to clean a satin-lined waterproof cap (lasts 100+ uses)',
  subtitle: 'Step-by-step maintenance to keep the seal strong.',
  tag: 'Care',
  pillar: 'Care & maintenance',
  primaryKeyword: 'how to clean satin lined shower cap',
  secondaryKeywords: ['wash shower cap', 'clean luxury shower cap', 'satin cap care'],
  intent: 'how-to',
  status: 'draft',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  date: '2025-12-13',
  readTime: '5 min',
  cover: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  ogImage: '/og/blog/deep-clean-satin-cap.png',
  teaser: 'The quick weekly clean that prevents odor, keeps seams bonded, and extends cap life past 100 uses.',
  sections: [
    {
      heading: 'Daily: the 30-second rinse',
      paragraphs: [
        'Rinse liner and band with cool water after each use to remove sweat, steam condensate, and product film.',
        'Shake off excess; press (don’t wring) with hands to remove water from the band.',
      ],
    },
    {
      heading: 'Weekly: mild soap wash (2–3 minutes)',
      paragraphs: [
        'Use a pea of gentle soap on the band and liner; massage lightly. Avoid harsh detergents that weaken seam bonding.',
        'Rinse thoroughly until water runs clear. Residual soap can stiffen the band and reduce seal quality.',
      ],
    },
    {
      heading: 'Deodorize without damage',
      paragraphs: [
        'Sprinkle a pinch of baking soda on the damp liner, wait 5–10 minutes, then rinse fully.',
        'Skip vinegar or alcohol—they can degrade TPU bonding over time.',
      ],
    },
    {
      heading: 'Drying: the don’ts and the right way',
      paragraphs: [
        'Never wring, twist, or machine-wash/dry. Heat and torsion stress seams and liners.',
        'Best: blot band with a microfiber towel, reshape the crown, hang open in moving air. Avoid sealed bags while damp.',
      ],
    },
    {
      heading: 'Rotation = longer life',
      paragraphs: [
        'Keep two caps and alternate. A fully dry liner seals better and avoids mildew/odor.',
        'If you sauna/gym daily, wash 2–3x per week; otherwise weekly is enough.',
      ],
    },
    {
      heading: 'FAQs',
      paragraphs: [
        'Can I machine-wash on delicate? No—agitation + heat shorten life and risk seam separation.',
        'Why does the band smell? Oils accumulate there; focus washing on the band and dry it fully open.',
        'What if TPU looks cloudy? Clouding can come from heat/chemicals; switch to cool water, mild soap, and air dry only.',
      ],
    },
  ],
}

export default post
