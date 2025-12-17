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
  cover: '/uploads/blog/covers/satin-vs-silk-for-hair.webp',
  ogImage: '/og/blog/satin-vs-silk-for-hair.png',
  teaser: 'Satin and silk can both help hair—but they’re not the same. Learn the real difference and how to choose based on hair type, comfort, and budget.',
  faqs: [
    {
      question: 'Is silk better than satin for hair?',
      answer:
        'Not automatically. Both can be low-friction and hair-friendly—silk is a natural fibre, while satin is a weave that can be made from different fibres. Quality and smoothness matter most.',
    },
    {
      question: 'Why does satin help reduce frizz?',
      answer:
        'Satin is smooth, so hair slides more easily and experiences less friction, which can help reduce roughness, tangling, and frizz—especially overnight.',
    },
    {
      question: 'Does satin make hair greasy?',
      answer:
        'It doesn’t create oil, but some people feel build-up more quickly if they use heavy products. Keep pillowcases/accessories clean and use lightweight products on the roots.',
    },
    {
      question: 'Is satin good for curly hair?',
      answer:
        'Yes—curly and coily hair tends to be drier and more prone to tangles, so reducing friction can make a noticeable difference to definition and breakage.',
    },
    {
      question: 'What should I buy first: satin pillowcase, bonnet, or satin-lined cap?',
      answer:
        'If frizz is mostly overnight, start with a pillowcase or bonnet. If frizz is from shower steam on non-wash days, a waterproof satin-lined shower cap is often the most “instant” fix.',
    },
  ],
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
