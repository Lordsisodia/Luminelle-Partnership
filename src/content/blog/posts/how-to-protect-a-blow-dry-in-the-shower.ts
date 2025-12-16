import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/blogs/how-to-protect-a-blow-dry-in-the-shower.md?raw'

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
  cover: '/uploads/luminele/product-feature-01.webp',
  teaser: 'Steam is the fastest way to ruin a blow-dry. Here’s how to protect your style in the shower (without giving up your shower).',
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

