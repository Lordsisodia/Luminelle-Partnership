import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/blogs/satin-vs-silk-for-hair.md?raw'

const post: BlogPost = {
  slug: 'satin-vs-silk-for-hair',
  title: 'Satin vs Silk for Hair',
  subtitle: 'Weave vs fibre, friction vs comfort—and which one is worth it for your routine.',
  tag: 'Science',
  pillar: 'Fabric science',
  primaryKeyword: 'satin vs silk for hair',
  secondaryKeywords: ['satin pillowcase vs silk', 'silk bonnet vs satin bonnet', 'reduce frizz overnight'],
  intent: 'comparison',
  status: 'published',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  authorRole: 'Hair science editor',
  date: '2025-12-16',
  reviewed: '2025-12-16',
  readTime: '8 min',
  cover: '/images/brand-lifestyle.jpg',
  teaser: 'Satin and silk can both help hair—but they’re not the same. Learn the real difference and how to choose based on hair type, comfort, and budget.',
  body: stripFrontmatter(raw),
  productCard: {
    title: 'Lumelle Shower Cap',
    badge: 'Satin-lined',
    href: '/product/lumelle-shower-cap',
    image: '/uploads/luminele/steam-shield-new.webp',
    caption: 'A satin-lined cap helps reduce friction and protect styles from shower steam on non-wash days.',
  },
}

export default post

