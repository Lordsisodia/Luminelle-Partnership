import type { BlogPost } from '../types'

const aboutLumelle: BlogPost = {
  slug: 'about-lumelle',
  title: 'About Lumelle',
  subtitle: 'Designed for steam, loved by all.',
  tag: 'Brand story',
  pillar: 'Brand',
  intent: 'navigational',
  status: 'published',
  author: 'Lumelle',
  authorRole: 'Team',
  date: '2026-01-07',
  readTime: '2 min read',
  cover: '/uploads/luminele/page9-image.webp',
  ogImage: '/uploads/luminele/page9-image.webp',
  teaser:
    'Meet Lumelle: satin-first, steam-proof essentials designed to preserve what makes your hair yours.',
  sections: [
    {
      heading: 'Designed for steam, loved by all',
      paragraphs: [
        'We started with a simple promise: to keep your hair the way it’s meant to be. No frizz. No grease. Just your natural hair, protected and cared for, coming out exactly as it should.',
        'Whether that’s braids, lush curls or smooth, straight strands, Lumelle is designed to preserve what makes your hair yours.',
      ],
      image: '/uploads/luminele/page9-image.webp',
      imageAlt: 'Lumelle shower cap lifestyle image',
    },
    {
      heading: 'What we make',
      paragraphs: [
        'Lumelle creates satin-first, steam-proof hair essentials built for everyday self-care and real routines.',
        'We obsess over the details that matter: comfort, fit, durability, and a finish that looks as premium as it feels.',
      ],
      productCard: {
        title: 'Lumelle Shower Cap',
        price: '£14.99',
        badge: 'Best seller',
        href: '/product/lumelle-shower-cap',
        image: '/uploads/luminele/product-main.webp',
        caption: 'Satin-lined + waterproof. Keeps styles flawless.',
      },
    },
  ],
  faqs: [
    {
      question: 'Where are payments handled?',
      answer: 'Payments are handled securely via Shopify checkout.',
    },
    {
      question: 'Do you store saved cards?',
      answer: 'No — saved payment methods are managed by Shopify at checkout.',
    },
  ],
}

export default aboutLumelle

