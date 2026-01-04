import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/04-growth/content/blogs/how-to-protect-a-blow-dry-in-the-shower.md?raw'

const post: BlogPost = {
  slug: 'how-to-protect-a-blow-dry-in-the-shower',
  title: 'How to Protect a Blow Dry in the Shower',
  subtitle: 'Steam-proof your blowout with the right cap, edge sealing, and a 30-second reset routine.',
  tag: 'How-to',
  pillar: 'Steam + humidity',
  primaryKeyword: 'protect blow dry in shower',
  secondaryKeywords: ['keep blowout from humidity', 'shower cap for blow dry', 'stop frizz in shower steam'],
  intent: 'how-to',
  status: 'published',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  authorRole: 'Routine editor',
  date: '2025-12-16',
  reviewed: '2025-12-16',
  readTime: '8 min',
  cover: '/uploads/blog/covers/how-to-protect-a-blow-dry-in-the-shower.webp',
  ogImage: '/og/blog/how-to-protect-a-blow-dry-in-the-shower.png',
  teaser: 'Steam is the fastest way to ruin a blow-dry. Here’s how to protect your style in the shower (without giving up your shower).',
  faqs: [
    {
      question: 'Can I shower without ruining my blow-dry?',
      answer:
        'Yes—if you block steam and splashes. Use a waterproof cap with a secure seal, keep the bathroom as cool/ventilated as possible, and avoid lingering in hot steam.',
    },
    {
      question: 'Why does steam ruin a blowout?',
      answer:
        'Humidity reintroduces moisture and relaxes the shape you set with heat. For many hair types, that means frizz, bends at the root, and loss of smoothness.',
    },
    {
      question: 'How do I seal the hairline so steam doesn’t get in?',
      answer:
        'Place the cap just beyond the hairline, tuck side sections first, and smooth the edge around the perimeter. Avoid leaving gaps near the temples and nape.',
    },
    {
      question: 'What if my blow-dry gets slightly frizzy anyway?',
      answer:
        'Do a quick reset: blast cool air for 30–60 seconds, smooth with a tiny amount of serum on ends, and brush through gently. Often you can salvage it without re-styling.',
    },
    {
      question: 'Should I use dry shampoo before showering?',
      answer:
        'If your roots get greasy quickly, a light dry shampoo before can help absorb humidity-related oiliness. Don’t over-apply—heavy build-up can make hair feel dull.',
    },
  ],
  body: stripFrontmatter(raw),
  productCard: {
    title: 'Lumelle Shower Cap',
    badge: 'Steam + splash barrier',
    href: '/product/lumelle-shower-cap',
    image: '/uploads/luminele/hero-desktop.webp',
    caption: 'A satin-lined, waterproof cap designed to help preserve blow-dries, curls, and silk presses on non-wash days.',
  },
}

export default post
