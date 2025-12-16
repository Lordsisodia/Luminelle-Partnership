import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/blogs/how-to-protect-hair-while-sleeping.md?raw'

const post: BlogPost = {
  slug: 'how-to-protect-hair-while-sleeping',
  title: 'How to Protect Hair While Sleeping',
  subtitle: 'Reduce frizz, tangles, and breakage overnight with satin, low-tension styles, and simple routines.',
  tag: 'Care',
  pillar: 'Overnight care',
  primaryKeyword: 'protect hair while sleeping',
  secondaryKeywords: ['satin bonnet vs pillowcase', 'stop frizz overnight', 'reduce hair breakage at night'],
  intent: 'how-to',
  status: 'published',
  ctaTarget: '/product/satin-overnight-curler',
  author: 'Lumelle Studio',
  authorRole: 'Routine editor',
  date: '2025-12-16',
  reviewed: '2025-12-16',
  readTime: '8 min',
  cover: '/uploads/curler/4.webp',
  teaser: 'Your hair can frizz and break overnight from friction and tangles. Here are the best low-effort ways to protect it while you sleep.',
  body: stripFrontmatter(raw),
  productCard: {
    title: 'Satin Overnight Curler Set',
    badge: 'Heatless + satin',
    href: '/product/satin-overnight-curler',
    image: '/uploads/curler/1.webp',
    caption: 'A comfortable way to wake up with curls—without relying on high heat.',
  },
}

export default post

