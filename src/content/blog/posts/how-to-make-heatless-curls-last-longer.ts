import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/blogs/how-to-make-heatless-curls-last-longer.md?raw'

const post: BlogPost = {
  slug: 'how-to-make-heatless-curls-last-longer',
  title: 'How to Make Heatless Curls Last Longer',
  subtitle: 'The exact prep, product, and drying tweaks that stop heatless curls from dropping.',
  tag: 'How-to',
  pillar: 'Heatless styling',
  primaryKeyword: 'make heatless curls last longer',
  secondaryKeywords: ['heatless curls overnight', 'refresh heatless curls day 2', 'why heatless curls fall out'],
  intent: 'how-to',
  status: 'published',
  ctaTarget: '/product/satin-overnight-curler',
  author: 'Lumelle Studio',
  authorRole: 'Routine editor',
  date: '2025-12-16',
  reviewed: '2025-12-16',
  readTime: '8 min',
  cover: '/uploads/curler/6.webp',
  teaser: 'Heatless curls can last all day (or several days) with the right dampness, hold, and humidity protection. Here’s the full checklist.',
  body: stripFrontmatter(raw),
  productCard: {
    title: 'Satin Overnight Curler Set',
    badge: 'Comfort-first',
    href: '/product/satin-overnight-curler',
    image: '/uploads/curler/1.webp',
    caption: 'A satin-based heatless set to help reduce friction while you sleep.',
  },
}

export default post

