import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/blogs/how-to-reduce-frizz-without-heat.md?raw'

const post: BlogPost = {
  slug: 'how-to-reduce-frizz-without-heat',
  title: 'How to Reduce Frizz Without Heat',
  subtitle: 'Smoother hair without straighteners: friction control, conditioning, and humidity defence.',
  tag: 'How-to',
  pillar: 'Frizz control',
  primaryKeyword: 'reduce frizz without heat',
  secondaryKeywords: ['how to stop frizzy hair naturally', 'anti humidity hair routine', 'frizz control products'],
  intent: 'how-to',
  status: 'published',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  authorRole: 'Hair care editor',
  date: '2025-12-16',
  reviewed: '2025-12-16',
  readTime: '8 min',
  cover: '/images/hero.jpg',
  teaser: 'You don’t need hot tools to reduce frizz. Learn the simple routine upgrades that smooth hair and keep styles intact—especially in humid weather.',
  body: stripFrontmatter(raw),
  productCard: {
    title: 'Lumelle Shower Cap',
    badge: 'Non-wash day essential',
    href: '/product/lumelle-shower-cap',
    image: '/uploads/luminele/steam-shield-new.webp',
    caption: 'Keep hair away from shower steam on non-wash days—one of the highest-impact frizz fixes.',
  },
}

export default post

