import type { BlogPost } from '../types'
import { stripFrontmatter } from '../utils'
import raw from '../../../../docs/04-growth/content/blogs/how-to-protect-hair-while-sleeping.md?raw'

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
  cover: '/uploads/blog/covers/how-to-protect-hair-while-sleeping.webp',
  ogImage: '/og/blog/how-to-protect-hair-while-sleeping.png',
  teaser: 'Your hair can frizz and break overnight from friction and tangles. Here are the best low-effort ways to protect it while you sleep.',
  faqs: [
    {
      question: 'What’s the best way to protect hair while sleeping?',
      answer:
        'Reduce friction and tangling: use a satin/silk pillowcase or bonnet, keep hair loosely contained (pineapple, low braid, or loose twist), and avoid tight elastics.',
    },
    {
      question: 'Is a bonnet better than a satin pillowcase?',
      answer:
        'A bonnet gives the most consistent protection because it keeps hair fully covered, but a satin pillowcase is a great low-effort option (and a useful backup if a bonnet slips off).',
    },
    {
      question: 'Should I sleep with hair wet?',
      answer:
        'Try not to. Damp hair is more fragile and can stretch or tangle more easily. If you must, keep it loosely secured and use a gentle fabric to minimise friction.',
    },
    {
      question: 'How do I protect curls overnight without flattening them?',
      answer:
        'Use a “pineapple” (loose high pony) or a loose top bun, then cover with a bonnet or use a satin pillowcase so curls aren’t crushed against rough fabric.',
    },
    {
      question: 'How do I refresh hair in the morning without heat?',
      answer:
        'Lightly mist, smooth with a tiny amount of leave-in or serum on the ends, and reshape with fingers. For curls, scrunch gently and let it air dry for a few minutes.',
    },
  ],
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
