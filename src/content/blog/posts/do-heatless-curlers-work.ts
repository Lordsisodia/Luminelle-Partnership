import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/blogs/do-heatless-curlers-work.md?raw'

const post: BlogPost = {
  slug: 'do-heatless-curlers-work',
  title: 'Do Heatless Curlers Work?',
  subtitle: 'Yes—when you nail dampness, tension, and drying time. Here’s the science and the method.',
  tag: 'Science',
  pillar: 'Heatless styling',
  primaryKeyword: 'do heatless curlers work',
  secondaryKeywords: ['heatless curls overnight', 'heatless curls vs curling iron', 'how to do heatless curls'],
  intent: 'informational',
  status: 'published',
  ctaTarget: '/product/satin-overnight-curler',
  author: 'Lumelle Studio',
  authorRole: 'Hair science editor',
  date: '2025-12-16',
  reviewed: '2025-12-16',
  readTime: '8 min',
  cover: '/uploads/curler/1.webp',
  teaser: 'Heatless curlers can work brilliantly with the right prep. Learn how they set hair (hydrogen bonds), who they work best for, and the exact technique.',
  body: stripFrontmatter(raw),
  productCard: {
    title: 'Satin Overnight Curler Set',
    badge: 'Heatless',
    href: '/product/satin-overnight-curler',
    image: '/uploads/curler/3.webp',
    caption: 'Designed for comfortable overnight styling with less friction.',
  },
}

export default post

