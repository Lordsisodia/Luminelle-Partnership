import { useCallback } from 'react'
import { FloatingWhatsAppCta } from '@ui/components/FloatingWhatsAppCta'
import { MarketingLayout } from '@layouts/MarketingLayout'
import type { NavItem } from '@layouts/MarketingLayout'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { HeroSection } from '@creators/ui/sections/hero/HeroSection'
import { ProofBand } from '@creators/ui/sections/proof/ProofBand'
import { JourneySection } from '@creators/ui/sections/journey/JourneySection'
import { BrandStorySection } from '@creators/ui/sections/brand-story/BrandStorySection'
import { SuccessStoriesSection } from '@creators/ui/sections/success/SuccessStoriesSection'
import { WhatsAppCtaSection } from '@creators/ui/sections/whatsapp/WhatsAppCtaSection'
import { ValueStackSection } from '@creators/ui/sections/value/ValueStackSection'
import { LeaderboardSection } from '@creators/ui/sections/leaderboard/LeaderboardSection'
import { CompetitiveCallout } from '@creators/ui/sections/competitive/CompetitiveCallout'
import { FAQSection } from '@creators/ui/sections/faq/FAQSection'
import { OnboardingFormSection } from '@creators/ui/sections/onboarding/OnboardingFormSection'
import { WHATSAPP_INVITE_URL } from '@/config/constants'

const navItems: NavItem[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'journey', label: 'How it works' },
  { id: 'story', label: 'Brand story' },
  { id: 'success', label: 'Creator proof' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'faq', label: 'FAQ' },
]

const CreatorsPage = () => {
  const sectionIds = navItems.map((item) => item.id)
  const activeId = useScrollSpy(sectionIds)

  const handleJoinClick = useCallback(() => {
    try {
      window.open(WHATSAPP_INVITE_URL, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Failed to navigate to WhatsApp', error)
    }
  }, [])

  const scrollToJourney = () => {
    const target = document.getElementById('journey')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <MarketingLayout navItems={navItems} activeId={activeId} subtitle="Creators Program">
      <HeroSection onPrimaryAction={handleJoinClick} onSecondaryAction={scrollToJourney} />
      <ProofBand />
      <JourneySection />
      <BrandStorySection />
      <SuccessStoriesSection />
      <WhatsAppCtaSection onJoinClick={handleJoinClick} />
      <ValueStackSection />
      <LeaderboardSection onJoinClick={handleJoinClick} />
      <CompetitiveCallout onJoinClick={handleJoinClick} />
      <FAQSection />
      <OnboardingFormSection />
      <FloatingWhatsAppCta label="Join WhatsApp" onClick={handleJoinClick} />
    </MarketingLayout>
  )
}

export default CreatorsPage
