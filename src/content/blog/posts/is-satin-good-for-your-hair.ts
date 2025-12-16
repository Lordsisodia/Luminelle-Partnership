import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/blogs/is-satin-good-for-your-hair.md?raw'

const post: BlogPost = {
  slug: 'is-satin-good-for-your-hair',
  title: 'Is Satin Good for Your Hair?',
  subtitle: 'The real benefits (and myths) of satin pillowcases, bonnets, and satin-lined caps.',
  tag: 'Science',
  pillar: 'Fabric science',
  primaryKeyword: 'is satin good for hair',
  secondaryKeywords: ['satin pillowcase benefits', 'satin bonnet benefits', 'satin vs silk for hair'],
  intent: 'informational',
  status: 'published',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  authorRole: 'Hair science editor',
  date: '2025-12-16',
  reviewed: '2025-12-16',
  readTime: '8 min',
  cover: '/uploads/curler/2.webp',
  teaser: 'Satin can help reduce frizz and breakage because it’s smooth and low-friction. Here’s how it works, who benefits most, and how to use it.',
  body: stripFrontmatter(raw),
  productCard: {
    title: 'Lumelle Shower Cap',
    badge: 'Satin-lined',
    href: '/product/lumelle-shower-cap',
    image: '/uploads/luminele/steam-shield-new.webp',
    caption: 'On non-wash days, a satin-lined cap helps protect styles from steam and friction—two major frizz triggers.',
  },
}

export default post

