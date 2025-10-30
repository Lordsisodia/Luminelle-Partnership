export type MetricBadge = {
  label: string
  value: string
  description: string
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
  callout?: string
}

export type CommissionTier = {
  label: string
  details: string
}

export type LeaderboardEntry = {
  rank: number
  name: string
  handle: string
  sold: number
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
    title: 'Monthly spa escapes',
    description: 'Luxury wellness days for top performers',
    icon: 'Sparkles',
  },
  {
    title: 'Cash performance boosts',
    description: 'Stackable bonuses for every milestone',
    icon: 'Gift',
  },
  {
    title: 'Platinum leaderboard perks',
    description: 'Campaign co-creation with the Lumelle team',
    icon: 'Crown',
  },
  {
    title: 'Creator spotlight features',
    description: 'Get showcased across Lumelle channels',
    icon: 'Trophy',
  },
]

export const journeySteps: JourneyStep[] = [
  {
    title: 'Trial',
    description: 'You already tried our products and know they deliver.',
    caption: 'Product love secured',
  },
  {
    title: 'Learn',
    description:
      'Collect fresh winning scripts, content ideas, and launch playbooks.',
    caption: 'Creator resources unlocked',
  },
  {
    title: 'Launch',
    description:
      'Publish, track, and compete on the leaderboard for bonuses and prizes.',
    caption: 'Start earning immediately',
  },
]

export const storyCards: StoryCard[] = [
  {
    title: 'Our Vision',
    headline: 'Luxury self-care, made accessible',
    body: 'Lumelle elevates everyday routines with beautifully designed shower caps that protect hair and feel good to wear.',
    mediaAlt: 'Founder presenting Lumelle products',
    imageSrc: '/images/brand-lifestyle.jpg',
  },
  {
    title: 'Product Proof',
    headline: 'Built for creators and their audiences',
    body: 'Waterproof, satin-lined, and TikTok beloved—every detail is crafted to photograph beautifully and perform IRL.',
    mediaAlt: 'Close-up of Lumelle shower cap details',
    imageSrc: '/images/product.jpg',
  },
  {
    title: 'Community Wins',
    headline: 'Creators growing together',
    body: 'Weekly workshops, content clinics, and peer reviews ensure you always know what is working right now.',
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
    name: 'Bronze',
    range: '10-20 sales/month',
    rewards: [
      '20% base commission on every sale',
      'Weekly content clinics',
      'Feature in monthly newsletter',
    ],
  },
  {
    name: 'Silver',
    range: '21-35 sales/month',
    rewards: [
      '22% commission boost',
      '£100 cash bonus eligibility',
      'Studio lighting kit raffle',
    ],
  },
  {
    name: 'Gold',
    range: '36+ sales/month',
    rewards: [
      '25% commission boost',
      'Monthly spa day experience',
      'Early access to product drops',
    ],
  },
  {
    name: 'Platinum',
    range: 'Top 3 performers',
    rewards: [
      '30% commission for the next month',
      'Custom campaign co-creation with Lumelle',
      'Exclusive creator spotlight across channels',
    ],
    callout: 'Leaderboard exclusive',
  },
]

export const commissionDetails: CommissionTier[] = [
  {
    label: 'Base',
    details: '20% commission paid weekly via Stripe',
  },
  {
    label: 'Launch Bonus',
    details: 'Extra 5% on your first seven days once your first video is live',
  },
  {
    label: 'Referral Boost',
    details: 'Invite a creator and earn £50 when they hit Gold tier',
  },
]

export const weekOneRoadmap = [
  'Day 1: Join WhatsApp, introduce yourself, pick your content angle.',
  'Day 2: Review winning hooks & scripts, outline your first video.',
  'Day 3: Shoot & edit—submit for peer review to get copy tweaks.',
  'Day 4: Publish with tracking link, log your post in the leaderboard.',
  'Day 5: Share performance, grab new prompts, prep your next drop.',
]

export const whatsappCtaContent: WhatsAppCtaContent = {
  title: 'Ready to start earning?',
  subtitle: 'Join our private WhatsApp creator community and get your launch playbook in minutes.',
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
    avatarAlt: 'Top creator avatar',
    trend: 'up',
  },
  {
    rank: 2,
    name: 'Shannon Mitchell',
    handle: '@shannon_mitch',
    sold: 29,
    avatarAlt: 'Creator avatar',
    trend: 'steady',
  },
  {
    rank: 3,
    name: 'Rachel',
    handle: '@rachelsummergreenie._',
    sold: 23,
    avatarAlt: 'Creator avatar',
    trend: 'up',
  },
]

export const faqItems: FAQItem[] = [
  {
    question: 'What happens after I tap join?',
    answer:
      'You will be redirected to our private WhatsApp group. Say hi, read the pinned playbook, and a Lumelle coach will message you within 24 hours to map your launch.',
  },
  {
    question: 'Do I need to buy inventory up front?',
    answer:
      'No inventory purchases are required. You already have your product sample, and we drop-ship every order directly to your audience.',
  },
  {
    question: 'How are commissions tracked and paid?',
    answer:
      'Every creator receives a unique trackable link. We reconcile weekly and pay out to your bank via Stripe every Friday.',
  },
  {
    question: 'What if I am new to affiliate marketing?',
    answer:
      'The Lumelle coach team and community creators share scripts, templates, and feedback so you are never creating alone.',
  },
  {
    question: 'Can I opt out of WhatsApp?',
    answer:
      'WhatsApp is our real-time operations hub. If you prefer email, let us know— we will send weekly digests and resources directly to you.',
  },
]

export const formBenefits = [
  'Creator launch playbook and scripts',
  'Weekly performance labs & office hours',
  'Access to real-time leaderboard and rewards',
  'Priority shipping on refill inventory',
]
