import { SectionHeading } from '@ui/components/SectionHeading'
import { SUPPORT_EMAIL, WHATSAPP_INVITE_URL } from '@/config/constants'

export const OnboardingFormSection = () => {
  const handleJoin = () => {
    try {
      window.open(WHATSAPP_INVITE_URL, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Failed to open WhatsApp invite', error)
    }
  }

  return (
    <section
      id="join"
      className="scroll-mt-24 bg-brand-blush/15 py-20 text-brand-cocoa md:scroll-mt-32 md:py-24"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center md:px-6">
        <SectionHeading
          eyebrow="Final Step"
          title="Ready when you are"
          description="Tap join to hop straight into the WhatsApp hub. We’ll pin the latest content brief and line up a coach to welcome you."
          alignment="center"
        />
        <button
          type="button"
          onClick={handleJoin}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-peach px-10 py-3 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-peach/90"
        >
          Join WhatsApp
        </button>
        <p className="text-sm text-brand-cocoa/70">
          Already in the group or need a fresh invite? Email{' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-semibold text-brand-cocoa underline decoration-brand-peach/60 underline-offset-4 hover:text-brand-cocoa"
          >
            {SUPPORT_EMAIL}
          </a>{' '}
          and we’ll send it over within 12 hours.
        </p>
      </div>
    </section>
  )
}
