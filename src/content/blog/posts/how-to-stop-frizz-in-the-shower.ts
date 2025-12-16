import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/blogs/how-to-stop-frizz-in-the-shower.md?raw'

const post: BlogPost = {
  slug: 'how-to-stop-frizz-in-the-shower',
  title: 'How to Stop Frizz in the Shower',
  subtitle: 'Water temperature, towel technique, conditioning, and steam protection—made simple.',
  tag: 'How-to',
  pillar: 'Frizz control',
  primaryKeyword: 'stop frizz in the shower',
  secondaryKeywords: ['frizzy hair after shower', 'humidity frizz', 'anti frizz routine', 'shower cap for frizz'],
  intent: 'how-to',
  status: 'published',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  authorRole: 'Hair care editor',
  date: '2025-12-16',
  reviewed: '2025-12-16',
  readTime: '9 min',
  cover: '/uploads/luminele/steam-shield-new.webp',
  teaser: 'A practical, evidence-informed routine to prevent frizz during and right after your shower—without overcomplicating your wash day.',
  body: stripFrontmatter(raw),
  productCard: {
    title: 'Lumelle Shower Cap',
    badge: 'Steam + friction shield',
    href: '/product/lumelle-shower-cap',
    image: '/uploads/luminele/product-main.webp',
    caption: 'Satin-lined + waterproof to help preserve blow-dries, curls, and silk presses on non-wash days.',
  },
}

export default post

