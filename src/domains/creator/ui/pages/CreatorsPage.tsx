import type { NavItem } from '@/layouts/MarketingLayout'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { WHATSAPP_INVITE_URL } from '@/config/constants'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'
import { HeroSection } from '../sections/hero/HeroSection'
import { ProofBand } from '../sections/proof/ProofBand'
import { JourneySection } from '../sections/journey/JourneySection'
import { BrandStorySection } from '../sections/brand-story/BrandStorySection'
import { SuccessStoriesSection } from '../sections/success/SuccessStoriesSection'
import { ValueStackSection } from '../sections/value/ValueStackSection'
import { LeaderboardSection } from '../sections/leaderboard/LeaderboardSection'
import { CompetitiveCallout } from '../sections/competitive/CompetitiveCallout'
import { WhatsAppCtaSection } from '../sections/whatsapp/WhatsAppCtaSection'
import { FAQSection } from '../sections/faq/FAQSection'
import { OnboardingFormSection } from '../sections/onboarding/OnboardingFormSection'

const navItems: NavItem[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'journey', label: 'Journey' },
  { id: 'story', label: 'Brand story' },
  { id: 'success', label: 'Proof' },
  { id: 'rewards', label: 'Rewards' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'faq', label: 'FAQ' },
  { id: 'join', label: 'Join' },
]

const scrollToId = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  const headerOffset = 110
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top, behavior: 'smooth' })
}

const CreatorsPage = () => {
  const handleJoinWhatsApp = () => {
    try {
      window.open(WHATSAPP_INVITE_URL, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Failed to open WhatsApp invite', error)
      window.location.assign(WHATSAPP_INVITE_URL)
    }
  }

  return (
    <>
      <Seo
        title="Creators"
        description="Join the Lumelle creator program. Get onboarding in WhatsApp, content briefs, and weekly leaderboard rewards."
        url={toPublicUrl('/creators')}
        type="website"
      />
      <MarketingLayout
        navItems={navItems}
        subtitle="Creators"
        primaryLabel="Join WhatsApp"
        onPrimaryAction={handleJoinWhatsApp}
      >
        <div className="bg-white text-semantic-text-primary">
          <HeroSection onPrimaryAction={handleJoinWhatsApp} onSecondaryAction={() => scrollToId('journey')} />
          <ProofBand />
          <JourneySection />
          <BrandStorySection />
          <SuccessStoriesSection />
          <ValueStackSection />
          <LeaderboardSection onJoinClick={handleJoinWhatsApp} />
          <CompetitiveCallout onJoinClick={handleJoinWhatsApp} />
          <WhatsAppCtaSection onJoinClick={handleJoinWhatsApp} />
          <FAQSection />
          <OnboardingFormSection />
        </div>
      </MarketingLayout>
    </>
  )
}

export default CreatorsPage
