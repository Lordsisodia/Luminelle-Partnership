import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/blogs/do-shower-caps-really-protect-hair.md?raw'

const post: BlogPost = {
  slug: 'do-shower-caps-really-protect-hair',
  title: 'Do Shower Caps Really Protect Hair?',
  subtitle: 'Yes—when they seal well. Here’s what they protect against (and what they don’t).',
  tag: 'Science',
  pillar: 'Steam + humidity',
  primaryKeyword: 'do shower caps protect hair',
  secondaryKeywords: ['shower cap for frizz', 'protect blow dry in shower', 'satin lined shower cap'],
  intent: 'informational',
  status: 'published',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  authorRole: 'Hair care editor',
  date: '2025-12-16',
  reviewed: '2025-12-16',
  readTime: '8 min',
  cover: '/uploads/luminele/hero-desktop.webp',
  teaser: 'Shower caps help protect hair from splashes, steam, and friction—if the fit is right. Learn which types work best and how to use them.',
  body: stripFrontmatter(raw),
  productCard: {
    title: 'Lumelle Shower Cap',
    badge: 'Waterproof + satin-lined',
    href: '/product/lumelle-shower-cap',
    image: '/uploads/luminele/product-feature-06.webp',
    caption: 'Designed to help preserve blow-dries, curls, braids, and silk presses on non-wash days.',
  },
}

export default post

