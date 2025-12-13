import type { BlogPost } from '../types'

const post: BlogPost = {
  slug: 'wash-day-mistakes',
  title: 'Wash-day mistakes that cause frizz (and quick fixes)',
  subtitle: 'Simple corrections that keep styles intact longer.',
  tag: 'How-to',
  pillar: 'Silk press care',
  primaryKeyword: 'wash day mistakes frizz',
  secondaryKeywords: ['wash day frizz fix', 'silk press wash day tips', 'avoid frizz after shower'],
  intent: 'how-to',
  status: 'published',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  date: '2025-10-27',
  readTime: '5 min',
  cover: '/uploads/luminele/product-feature-01.webp',
  ogImage: '/og/blog/wash-day-mistakes.png',
  teaser: 'Avoid these common traps to protect curls and blowouts.',
  body:
    'Mistake 1: Hot water blasting the crown—angle the spray down your back and cap the moment steam rises. Mistake 2: Tight elastics that leave dents—swap for a comfort band cap. Mistake 3: Leaving hair damp under the cap—always cool the room and let roots dry before styling.\n\nQuick fixes: finish showers cool, pat cap dry, and release hair only after temperature drops. For curls, scrunch a lightweight refresher mist post-shower only if needed. For blowouts, use a cool shot to reset volume.\n\nWeekly reset: clarify scalp, deep-condition lengths, and wash the cap liner so residue doesn’t transfer back to your hair.',
  sections: [
    {
      heading: 'Common mistakes',
      paragraphs: [
        'Hot water blasting the crown, tight elastics that dent edges, leaving hair damp under the cap—these trigger frizz fast.',
      ],
    },
    {
      heading: 'Quick fixes',
      paragraphs: [
        'Finish showers cool, pat the cap dry, release hair after the room cools. For blowouts, use a cool shot; for curls, only mist if needed.',
      ],
    },
    {
      heading: 'Weekly reset',
      paragraphs: [
        'Clarify scalp, deep-condition, and wash the cap liner weekly so residue doesn’t transfer back to your hair.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Why does my hair frizz after showering on wash day?',
      answer:
        'Common culprits: hot water on the crown, no venting, and leaving hair damp under the cap. Use cooler finishes and let hair cool before styling.',
    },
    {
      question: 'How do I avoid dents on wash day?',
      answer:
        'Skip tight elastics and use a wide comfort band; remove the cap front-to-back and let hair cool before brushing or heat styling.',
    },
  ],
}

export default post
