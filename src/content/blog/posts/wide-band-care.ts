import type { BlogPost } from '../types'

const post: BlogPost = {
  slug: 'wide-band-shower-cap-care',
  title: 'Wide band 101: caring for bands so edges stay safe',
  subtitle: 'Keep the plush band clean, elastic, and gentle on your hairline.',
  tag: 'Care',
  pillar: 'Care & maintenance',
  primaryKeyword: 'wide band shower cap care',
  secondaryKeywords: ['protect edges shower cap', 'shower cap band care', 'gentle band shower cap'],
  intent: 'informational',
  status: 'draft',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  date: '2025-12-13',
  readTime: '4 min',
  cover: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  ogImage: '/og/blog/wide-band-care.png',
  teaser: 'Band dents and redness are optional—here’s how to keep a wide band clean and gentle.',
  sections: [
    {
      heading: 'Fit check: fingertip rule',
      paragraphs: [
        'After placing the cap 0.5–1 cm beyond your hairline, you should slide one fingertip under the band without force.',
        'If you see lines or redness after 5 minutes, loosen placement or reduce wear time.',
      ],
    },
    {
      heading: 'Keep the band clean',
      paragraphs: [
        'Rinse the band after each use; oils and product build-up make bands stiff and grabby.',
        'Weekly: mild soap on the band, rinse well, blot, and air dry flat or hanging open.',
      ],
    },
    {
      heading: 'Avoid stress that kills elasticity',
      paragraphs: [
        'Never wring or twist the band; it stretches fibers and weakens recovery.',
        'Keep it out of dryers/radiators. Heat accelerates elastic fatigue and can warp seam bonding.',
      ],
    },
    {
      heading: 'Rotate caps',
      paragraphs: [
        'Use two caps if you shower daily. A fully dry band retains elasticity longer and seals better.',
      ],
    },
    {
      heading: 'When to replace the band (or cap)',
      paragraphs: [
        'If the band slides easily even when placed correctly, or dents persist at normal tension, elasticity is down.',
        'If you can’t pass the fingertip test without loosening the seal, it’s time to replace.',
      ],
    },
    {
      heading: 'FAQs',
      paragraphs: [
        'Will a wide band still dent my edges? Only if it’s too tight or left on too long. Fit + time matter; aim for under 10 minutes post-shower before removal.',
        'Can I stretch it intentionally for comfort? Better to adjust placement; deliberate stretching reduces seal quality.',
      ],
    },
  ],
}

export default post
