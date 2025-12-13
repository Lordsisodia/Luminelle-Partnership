import { Check } from 'lucide-react'
import { whatsappCtaContent } from '@/content/landing'
import { SUPPORT_EMAIL } from '@/config/constants'

type WhatsAppCtaSectionProps = {
  onJoinClick: () => void
}

export const WhatsAppCtaSection = ({
  onJoinClick,
}: WhatsAppCtaSectionProps) => {
  return (
    <section
      id="whatsapp"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 text-brand-cocoa md:scroll-mt-32 md:px-6"
    >
      <div className="overflow-hidden rounded-[3rem] border border-brand-peach/50 bg-gradient-to-br from-brand-peach/30 via-white to-brand-blush/40 px-6 py-12 shadow-soft md:px-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/70">
              Lumelle creator hub
            </p>
            <h2 className="font-heading text-3xl md:text-4xl">
              {whatsappCtaContent.title}
            </h2>
            <p className="text-base text-brand-cocoa/75">
              {whatsappCtaContent.subtitle}
            </p>
            <div className="flex flex-col gap-3 text-sm text-brand-cocoa/75">
              {whatsappCtaContent.benefits.map((benefit) => (
                <p key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-cocoa text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{benefit}</span>
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onJoinClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-cocoa px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-cocoa/90"
              >
                {whatsappCtaContent.primaryCta}
              </button>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-cocoa/20 px-8 py-3 text-sm font-semibold text-brand-cocoa/80 transition hover:border-brand-cocoa"
              >
                Talk to our team
              </a>
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-brand-peach/40 bg-white/85 p-6 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-cocoa/60">
              48-hour launch roadmap
            </p>
            <ol className="mt-4 space-y-3 text-sm text-brand-cocoa/75">
              <li className="rounded-2xl bg-brand-blush/30 px-4 py-3">
                <span className="font-semibold text-brand-cocoa">Day 1:</span>{' '}
                Introduce yourself, grab the pinned content brief, and share your
                launch goal.
              </li>
              <li className="rounded-2xl bg-brand-blush/30 px-4 py-3">
                <span className="font-semibold text-brand-cocoa">Day 2:</span>{' '}
                Workshop your script with Lumelle coaches and peer creators.
              </li>
              <li className="rounded-2xl bg-brand-blush/30 px-4 py-3">
                <span className="font-semibold text-brand-cocoa">Day 3:</span>{' '}
                Publish, log your performance, and chase the leaderboard bonus.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
