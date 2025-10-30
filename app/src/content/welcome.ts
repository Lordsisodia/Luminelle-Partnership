import { CONTENT_BRIEF_URL, SUPPORT_EMAIL, WHATSAPP_INVITE_URL } from '@/config/constants'

export const welcomeHero = {
  headline: 'You’re in, Creator!',
  subheadline: 'Your Lumelle onboarding hub is ready—jump into WhatsApp to claim your bonuses.',
  primaryCta: {
    label: 'Join WhatsApp now',
    href: WHATSAPP_INVITE_URL,
  },
  secondaryCta: {
    label: 'Copy invite link',
    href: '#copy-link',
  },
}

export const welcomeSteps = [
  {
    title: 'Join the WhatsApp crew',
    description: 'Tap the button above, introduce yourself, and pin the creator playbook.',
  },
  {
    title: 'Download the content brief',
    description: 'Grab shot lists, hooks, and examples to map your first two videos.',
  },
  {
    title: 'Log your launch date',
    description: 'Tell us when your content goes live so we can celebrate and track results.',
  },
]

export const resourceCards = [
  {
    title: 'Creator Content Brief',
    description: 'Scripts, hooks, and visual direction for TikTok-ready posts.',
    action: 'Download brief',
    href: CONTENT_BRIEF_URL,
  },
  {
    title: 'Leaderboard Snapshot',
    description: 'See the top performers and their winning angles.',
    action: 'View leaderboard',
    href: '#leaderboard',
  },
  {
    title: 'Creator Concierge',
    description: 'Need help? Email the team and we will respond within 12 hours.',
    action: `Email ${SUPPORT_EMAIL}`,
    href: `mailto:${SUPPORT_EMAIL}`,
  },
]

export const safetyNotes = [
  'Keep the WhatsApp invite private—spots are limited each month.',
  'Respect creator confidentiality and follow community guidelines pinned in chat.',
  'Having trouble joining? Email us and we will send a fresh invite link.',
]
