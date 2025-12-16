import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/blogs/best-shower-cap-for-frizz-prone-hair.md?raw'

const post: BlogPost = {
  slug: 'best-shower-cap-for-frizz-prone-hair',
  title: 'Best Shower Cap for Frizz-Prone Hair',
  subtitle: 'What to look for in a cap that blocks steam and reduces friction (plus fit tips).',
  tag: 'Tips',
  pillar: 'Steam + humidity',
  primaryKeyword: 'best shower cap for frizz',
  secondaryKeywords: ['satin lined shower cap', 'shower cap for blow dry', 'stop frizz in shower'],
  intent: 'commercial',
  status: 'published',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  authorRole: 'Product education',
  date: '2025-12-16',
  reviewed: '2025-12-16',
  readTime: '8 min',
  cover: '/uploads/luminele/product-main.webp',
  teaser: 'The best shower cap for frizz-prone hair is waterproof, seals well, and has a satin lining to reduce friction. Here’s how to choose.',
  body: stripFrontmatter(raw),
  productCard: {
    title: 'Lumelle Shower Cap',
    badge: 'Best seller',
    href: '/product/lumelle-shower-cap',
    image: '/uploads/luminele/product-feature-03.webp',
    caption: 'Waterproof outer + satin-lined inner designed to protect styles from steam and friction.',
  },
}

export default post

