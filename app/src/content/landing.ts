export type MetricBadge = {
  label: string
  value: string
  description: string
}

export type HeroSpotlightSlide = {
  id: string
  backgroundSrc: string
  label: string
  title: string
  description: string
  imageSrc?: string
}

export type JourneyStep = {
  title: string
  description: string
  caption: string
}

export type StoryCard = {
  title: string
  headline: string
  body: string
  mediaAlt: string
  imageSrc: string
}

export type SuccessStory = {
  name: string
  handle: string
  avatarAlt: string
  avatarSrc: string
  embedUrl: string
  highlight: string
  stats: string
  earnings: string
  quote: string
  badge?: string
  videoUrl: string
}

export type RewardTier = {
  name: string
  range: string
  rewards: string[]
}

export type LeaderboardEntry = {
  rank: number
  name: string
  handle: string
  sold: number
  avatarSrc: string
  avatarAlt: string
  trend: 'up' | 'steady'
}

export type FAQItem = {
  question: string
  answer: string
}

export type RewardHighlight = {
  title: string
  description: string
  icon: 'Gift' | 'Crown' | 'Sparkles' | 'Trophy'
}

export type WhatsAppCtaContent = {
  title: string
  subtitle: string
  primaryCta: string
  benefits: string[]
}

export const heroContent = {
  eyebrow: 'Creator Affiliate Program',
  headline: 'Join the Lumelle Creator Community',
  subheadline: 'Turn your creativity into income with luxury self-care products loved by 100+ creators.',
  primaryCta: 'Join WhatsApp',
  secondaryCta: 'See how it works',
  imageAlt: 'Lumelle luxury shower caps displayed with creator content',
  imageSrc: '/images/hero.jpg',
}

export const heroSpotlightSlides: HeroSpotlightSlide[] = [
  {
    id: 'spa-day',
    backgroundSrc: '/images/brand-lifestyle.jpg',
    imageSrc: '/images/brand-lifestyle.jpg',
    label: 'Creator perk highlight',
    title: 'Luxury spa day escapes',
    description: 'Top three finishers unlock a full spa experience—travel stipend, treatments, and content concierge included.',
  },
  {
    id: 'cash-boost',
    backgroundSrc: '/images/hero.jpg',
    imageSrc:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%23fbe4d6'/><stop offset='100%' stop-color='%23f7c9b8'/></linearGradient><filter id='blur'><feGaussianBlur stdDeviation='12' /></filter></defs><rect width='320' height='160' fill='%23f5d1c0'/><rect x='-20' y='-20' width='360' height='200' fill='url(%23g)' filter='url(%23blur)' opacity='0.9'/><g font-family=\"'Inter',sans-serif\" fill='%2350353a'><text x='26' y='70' font-size='22' font-weight='600'>Natasha · Lumelle</text><text x='26' y='102' font-size='40' font-weight='700'>£1,000 received</text><text x='26' y='128' font-size='18' fill='%2350353a' opacity='0.75'>\"Congrats on topping the board!\"</text></g></svg>",
    label: 'Cash boost',
    title: '£1,000 leaderboard bonus',
    description: 'Hit Gold and screenshot your payout—weekly cash drops land directly in WhatsApp so you can celebrate fast.',
  },
  {
    id: 'product-drops',
    backgroundSrc: '/images/product.jpg',
    imageSrc: '/images/product.jpg',
    label: 'Product drops',
    title: 'Early access product drops',
    description: 'Creators preview every release before it hits the store, complete with creative briefs and shot lists.',
  },
  {
    id: 'community',
    backgroundSrc: '/images/community.jpg',
    imageSrc: '/images/community.jpg',
    label: 'Community wins',
    title: 'Co-create with Lumelle',
    description: 'Join collaborative campaigns, test scripts side-by-side, and tap into the collective brain of 100+ creators.',
  },
]

export const metricBadges: MetricBadge[] = [
  {
    label: 'Creators earning now',
    value: '100+',
    description: 'Active in the Lumelle community',
  },
  {
    label: 'Commission per sale',
    value: '20%',
    description: 'Base commission with weekly bonuses',
  },
  {
    label: 'Activation support',
    value: '48 hrs',
    description: 'From onboarding to first post',
  },
]

export const trustSignals = [
  {
    label: 'Featured in',
    value: 'Vogue Beauty',
  },
  {
    label: 'Avg. creator rating',
    value: '4.9 / 5',
  },
  {
    label: 'Community response time',
    value: '< 15 mins',
  },
]

export const rewardHighlights: RewardHighlight[] = [
  {
    title: 'Leaderboard spa retreats',
    description: 'Gold creators unwind with luxury wellness days and full content glam teams.',
    icon: 'Sparkles',
  },
  {
    title: 'Cash performance boosts',
    description: 'Weekly cash drops when you beat your personal best or bring on new creators.',
    icon: 'Gift',
  },
  {
    title: 'Platinum leaderboard perks',
    description: 'Co-create campaigns and hold a monthly retainer with the Lumelle studio.',
    icon: 'Crown',
  },
  {
    title: 'Creator spotlight features',
    description: 'Front-page features, paid shoots, and newsletter takeovers to grow your brand.',
    icon: 'Trophy',
  },
]

export const journeySteps: JourneyStep[] = [
  {
    title: 'Trial',
    description:
      'Unbox your creator kit, test every product, and capture the unedited reactions that make your audience lean in.',
    caption: 'Product love secured',
  },
  {
    title: 'Learn',
    description:
      'Steal proven storyboards, top-performer scripts, and swipeable content briefs updated every week.',
    caption: 'Creator intel unlocked',
  },
  {
    title: 'Launch',
    description:
      'Drop your first video, get live feedback in WhatsApp, and climb the leaderboard for prizes up to £1,000.',
    caption: 'Bonuses unlocked',
  },
]

export const storyCards: StoryCard[] = [
  {
    title: 'Our Vision',
    headline: 'Luxury self-care, made iconic',
    body: 'We pair heritage beauty craftsmanship with creator-first design so every launch feels like a brand moment.',
    mediaAlt: 'Founder presenting Lumelle products',
    imageSrc: '/images/brand-lifestyle.jpg',
  },
  {
    title: 'Product Proof',
    headline: 'Built for creators and their audiences',
    body: 'Waterproof, satin-lined, and TikTok beloved—every detail photographs beautifully, ships quickly, and delivers results.',
    mediaAlt: 'Close-up of Lumelle shower cap details',
    imageSrc: '/images/product.jpg',
  },
  {
    title: 'Community Wins',
    headline: 'Creators growing together',
    body: 'Weekly labs, analytics drops, and peer breakdowns keep you ahead of trends before they explode.',
    mediaAlt: 'Creators celebrating Lumelle milestone',
    imageSrc: '/images/community.jpg',
  },
]

export const successStories: SuccessStory[] = [
  {
    name: 'Shannon Mitchell',
    handle: '@shannon_mitch',
    avatarAlt: 'Profile photo of Shannon Mitchell',
    avatarSrc: '/images/avatar-shannon.jpg',
    embedUrl: 'https://www.tiktok.com/embed/v2/7562893092957719830',
    highlight: '29 sales in a single video',
    stats: 'Video to cart in under 4 hours',
    earnings: '£340 commission payout',
    quote:
      'Lumelle gave me scripts, hooks, and feedback within minutes—it felt like cheating in the best way.',
    badge: 'Momentum Maker',
    videoUrl: 'https://www.tiktok.com/@shannon_mitch/video/7562893092957719830',
  },
  {
    name: 'Rachel',
    handle: '@rachelsummergreenie._',
    avatarAlt: 'Profile photo of Rachel',
    avatarSrc: '/images/avatar-rachel.jpg',
    embedUrl: 'https://www.tiktok.com/embed/v2/7543668112630058262',
    highlight: '11 sales in 14 days',
    stats: 'Consistent daily conversions',
    earnings: '£210 commission payout',
    quote:
      'The community kept me accountable and the weekly challenges made it fun to keep creating.',
    videoUrl: 'https://www.tiktok.com/@rachelsummergreenie._/video/7543668112630058262',
  },
  {
    name: 'Random Life UK',
    handle: '@randomlifeuk',
    avatarAlt: 'Profile photo of Random Life UK',
    avatarSrc: '/images/avatar-randomlife.jpg',
    embedUrl: 'https://www.tiktok.com/embed/v2/7544353160429587734',
    highlight: 'Top seller last month',
    stats: '41 units sold',
    earnings: '£540 commission payout',
    quote:
      'Knowing the leaderboard updates in real-time pushes me to go after the top spot every week.',
    badge: '🏆 Top Performer',
    videoUrl: 'https://www.tiktok.com/@randomlifeuk/video/7544353160429587734',
  },
]

export const rewardTiers: RewardTier[] = [
  {
    name: 'Gold',
    range: '1st place · Leaderboard finish',
    rewards: [
      '£1,000 cash prize wired within 48 hours',
      'Luxury spa day experience with glam team',
      'Invitation to stay on retainer for the next campaign',
    ],
  },
  {
    name: 'Silver',
    range: '2nd place · Leaderboard finish',
    rewards: [
      '£500 cash prize for your next content sprint',
      'Curated Lumelle gift set delivered to your door',
      'Invitation to stay on retainer for the next campaign',
    ],
  },
  {
    name: 'Bronze',
    range: '3rd place · Leaderboard finish',
    rewards: [
      '£250 cash prize and product allowance',
      'Creator gift set featuring best-selling bundles',
      'Invitation to stay on retainer for the next campaign',
    ],
  },
]

export const whatsappCtaContent: WhatsAppCtaContent = {
  title: 'Ready to start earning?',
  subtitle: 'Join our private WhatsApp creator community and grab the content brief in minutes.',
  primaryCta: 'Join WhatsApp Community',
  benefits: [
    'Daily prompts and winning script templates',
    'Live coaching threads with Lumelle strategists',
    'Leaderboard access + prize announcements',
    'Priority product restock alerts',
  ],
}

export const leaderboardEntries: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Random Life UK',
    handle: '@randomlifeuk',
    sold: 41,
    avatarSrc: '/images/avatar-randomlife.jpg',
    avatarAlt: 'Top creator avatar',
    trend: 'up',
  },
  {
    rank: 2,
    name: 'Shannon Mitchell',
    handle: '@shannon_mitch',
    sold: 29,
    avatarSrc: '/images/avatar-shannon.jpg',
    avatarAlt: 'Creator avatar',
    trend: 'steady',
  },
  {
    rank: 3,
    name: 'Rachel',
    handle: '@rachelsummergreenie._',
    sold: 23,
    avatarSrc: '/images/avatar-rachel.jpg',
    avatarAlt: 'Creator avatar',
    trend: 'up',
  },
]

export const faqItems: FAQItem[] = [
  {
    question: 'What happens after I tap join?',
    answer:
      'You will be redirected to our private WhatsApp group. Say hi, open the pinned content brief, and a Lumelle coach will message you within 24 hours to map your launch.',
  },
  {
    question: 'Why Lumelle instead of another affiliate program?',
    answer:
      'Lumelle blends luxury beauty with proven creator content briefs. You get premium products that convert, fast shipping, and weekly intel so every post feels like a launch—not a gamble.',
  },
  {
    question: 'How does Lumelle help me grow my brand?',
    answer:
      'We position you as the face of a growing luxury brand. Expect spotlight takeovers, co-created campaigns, and resources that make your audience see you as the go-to for self-care ritual upgrades.',
  },
  {
    question: 'Who are we, and where can I learn more?',
    answer:
      'Lumelle is a UK-based beauty studio backed by a team of creator strategists and product developers. Meet the founders and explore our story at https://lumellebeauty.co.uk/about.',
  },
  {
    question: 'What are the commissions and ad spend expectations?',
    answer:
      'Creators earn a baseline 20% commission on every sale and we advise reinvesting 10% of your payouts into ads or content boosts—our team shares best practices to stretch every pound.',
  },
  {
    question: 'What if I am new to affiliate marketing?',
    answer:
      'The Lumelle coach team and community creators share scripts, templates, and feedback so you are never creating alone.',
  },
  {
    question: 'Can I opt out of WhatsApp?',
    answer:
      'WhatsApp is our real-time operations hub. If you prefer email, let us know—we will send weekly digests and resources directly to you.',
  },
]
