import type { BlogPost } from '../types'

const post: BlogPost = {
  slug: 'lumelle-journal-launch',
  title: 'Welcome to the Lumelle Journal',
  subtitle: 'Your hub for frizz-free hair care, creator tips, and product know-how.',
  tag: 'Journal',
  pillar: 'Journal',
  primaryKeyword: 'Lumelle journal',
  secondaryKeywords: ['Lumelle blog', 'frizz-free hair journal', 'hair care blog'],
  intent: 'informational',
  status: 'published',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  authorRole: 'Editorial team',
  date: '2025-12-05',
  reviewed: '2025-12-08',
  readTime: '3 min',
  cover: '/uploads/luminele/product-feature-01.webp',
  ogImage: '/og/blog/lumelle-journal-launch.png',
  teaser:
    'We’re opening up our playbook: routines that keep styles flawless, creator scripts that convert, and the science behind our satin-lined caps.',
  body:
    'We built Lumelle to solve one problem: keep every style camera-ready, even in steam. The Journal will house quick routines, deeper science explainers, and creator-tested scripts you can swipe for your next video. Expect short reads, visual how-tos, and honest benchmarks from the community.\\n\\nComing up: our weekly “Frizz Report,” TikTok hooks that sell without sounding salesy, and care guides for silk presses, curls, braids, and locs. Bookmark this space—we’ll keep it fresh.',
  featured: true,
  sections: [
    { heading: 'What to expect', paragraphs: ['Frizz-free routines, creator scripts, and product science—kept short and actionable.'] },
    { heading: 'Who it’s for', paragraphs: ['Creators, stylists, and anyone who refuses to let steam ruin their style.'] },
  ],
  faqs: [
    {
      question: 'What will the Lumelle Journal cover?',
      answer: 'Frizz-free routines, product science, creator scripts, and benchmarks from the community—kept short and actionable.',
    },
    {
      question: 'How often will you publish?',
      answer: 'We aim for weekly drops with quick reads and visuals so you can apply tips immediately.',
    },
  ],
}

export default post
