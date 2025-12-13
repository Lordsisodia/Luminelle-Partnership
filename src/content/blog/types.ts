export type BlogIntent = 'informational' | 'how-to' | 'comparison' | 'commercial' | 'navigational'
export type BlogStatus = 'draft' | 'published'

export type BlogPost = {
  slug: string
  title: string
  subtitle: string
  tag: string
  pillar?: string
  primaryKeyword?: string
  secondaryKeywords?: string[]
  intent?: BlogIntent
  status?: BlogStatus
  ctaTarget?: string
  author: string
  authorRole?: string
  authorAvatar?: string
  date: string
  reviewed?: string
  readTime: string
  cover: string
  ogImage?: string
  teaser: string
  body?: string
  sections?: { heading: string; paragraphs: string[] }[]
  featured?: boolean
  faqs?: { question: string; answer: string }[]
}
