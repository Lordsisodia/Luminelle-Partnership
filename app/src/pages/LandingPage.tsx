import { useCallback } from 'react'
import { FloatingWhatsAppCta } from '@/components/FloatingWhatsAppCta'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { HeroSection } from '@/sections/HeroSection'
import { ProofBand } from '@/sections/ProofBand'
import { JourneySection } from '@/sections/JourneySection'
import { BrandStorySection } from '@/sections/BrandStorySection'
import { SuccessStoriesSection } from '@/sections/SuccessStoriesSection'
import { WhatsAppCtaSection } from '@/sections/WhatsAppCtaSection'
import { ValueStackSection } from '@/sections/ValueStackSection'
import { LeaderboardSection } from '@/sections/LeaderboardSection'
import { CompetitiveCallout } from '@/sections/CompetitiveCallout'
import { FAQSection } from '@/sections/FAQSection'
import { OnboardingFormSection } from '@/sections/OnboardingFormSection'
import { WHATSAPP_INVITE_URL } from '@/config/constants'

const navItems: NavItem[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'journey', label: 'How it works' },
  { id: 'story', label: 'Brand story' },
  { id: 'success', label: 'Success stories' },
  { id: 'whatsapp', label: 'Community' },
  { id: 'rewards', label: 'Rewards' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'faq', label: 'FAQ' },
  { id: 'join', label: 'Join' },
]

export const LandingPage = () => {
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
    <MarketingLayout
      navItems={navItems}
      activeId={activeId}
      primaryLabel="Join WhatsApp"
      onPrimaryAction={handleJoinClick}
    >
      <HeroSection
        onPrimaryAction={handleJoinClick}
        onSecondaryAction={scrollToJourney}
      />
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
      <FloatingWhatsAppCta
        label="Join WhatsApp"
        onClick={handleJoinClick}
      />
    </MarketingLayout>
  )
}
