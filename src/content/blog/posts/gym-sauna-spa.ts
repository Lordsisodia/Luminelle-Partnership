import type { BlogPost } from '../types'

const post: BlogPost = {
  slug: 'gym-sauna-spa',
  title: 'Gym, sauna, spa: how to keep hair dry everywhere',
  subtitle: 'A creator-tested checklist for wet environments.',
  tag: 'Lifestyle',
  pillar: 'Lifestyle',
  primaryKeyword: 'keep hair dry in sauna',
  secondaryKeywords: ['gym hair protection', 'steam room hair tips', 'sauna shower cap'],
  intent: 'informational',
  status: 'published',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  authorRole: 'Lifestyle editor',
  date: '2025-11-05',
  reviewed: '2025-12-01',
  readTime: '5 min',
  cover: '/uploads/luminele/product-feature-04.webp',
  ogImage: '/og/blog/gym-sauna-spa.png',
  teaser: 'The gear and habits that protect your style beyond the shower.',
  body:
    'Sweat plus steam = frizz. Pre-gym, smooth edges with a lightweight balm and clip lengths up; pop on your shower cap in the steam room—the TPU core blocks moisture better than a towel wrap. Keep a microfiber towel handy to blot sweat before it dries salty.\n\nAt the spa, limit cap time to heat sessions, then air out your hair in a cool lounge to drop humidity before removing. Traveling? Pack a mini kit: cap, microfiber towel, edge brush, satin scrunchie, and a travel-size refresher spray.\n\nAfter any hot session, cool-rinse your cap, air dry it flat, and give roots a cool blow-dry burst to reset volume without heat damage. This routine keeps styles camera-ready from treadmill to sauna.',
  sections: [
    {
      heading: 'Gym & sauna routine',
      paragraphs: [
        'Smooth edges with a lightweight balm, clip lengths up, and wear the cap in the steam room—the TPU core beats a towel wrap.',
        'Blot sweat with a microfiber towel before it dries salty.',
      ],
    },
    {
      heading: 'Spa & travel kit',
      paragraphs: [
        'Limit cap time to heat sessions, then air out hair in a cool lounge. Pack: cap, microfiber towel, edge brush, satin scrunchie, refresher spray.',
      ],
    },
    {
      heading: 'Post-heat reset',
      paragraphs: ['Rinse the cap, air dry flat, and cool-blow roots to reset volume without heat damage.'],
    },
  ],
  faqs: [
    {
      question: 'Can I wear a shower cap in the sauna or steam room?',
      answer:
        'Yes—use a waterproof, satin-lined cap; keep sessions short and blot sweat with a microfiber towel before it dries.',
    },
    {
      question: 'What should I pack to keep hair frizz-free when I work out?',
      answer: 'Shower cap, microfiber towel, edge brush, satin scrunchie, light serum, and a small refresher spray.',
    },
  ],
}

export default post
