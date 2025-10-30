import { welcomeHero, welcomeSteps, resourceCards, safetyNotes } from '@/content/welcome'
import { useLinkFallback } from '@/hooks/useLinkFallback'

export const WelcomePage = () => {
  const {
    trigger,
    showFallback,
    closeFallback,
    copyLink,
    isAttempting,
  } = useLinkFallback({ url: welcomeHero.primaryCta.href })

  return (
    <div className="min-h-screen bg-brand-blush/10 px-4 py-12 text-brand-cocoa md:px-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <div className="rounded-3xl border border-brand-peach/40 bg-white/95 p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-cocoa/60">
            Welcome to Lumelle
          </p>
          <h1 className="mt-4 font-heading text-3xl md:text-4xl">
            {welcomeHero.headline}
          </h1>
          <p className="mt-3 text-base text-brand-cocoa/75">
            {welcomeHero.subheadline}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={trigger}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-peach px-6 py-3 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-peach/90"
            >
              {isAttempting ? 'Opening WhatsApp…' : welcomeHero.primaryCta.label}
            </button>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-peach/60 px-6 py-3 text-sm font-semibold text-brand-cocoa/80 transition hover:border-brand-peach hover:text-brand-cocoa"
            >
              {welcomeHero.secondaryCta.label}
            </button>
          </div>
        </div>
        <section className="rounded-3xl border border-brand-peach/30 bg-white/90 p-6 shadow-sm">
          <h2 className="font-heading text-2xl">Your next three moves</h2>
          <div className="mt-4 space-y-4">
            {welcomeSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl bg-brand-blush/30 p-4 text-sm text-brand-cocoa/75"
              >
                <p className="text-sm font-semibold text-brand-cocoa">
                  {step.title}
                </p>
                <p className="mt-1">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-3">
          {resourceCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="rounded-3xl border border-brand-peach/30 bg-white/90 p-6 text-brand-cocoa transition hover:-translate-y-1 hover:shadow-soft"
            >
              <h3 className="font-heading text-xl">{card.title}</h3>
              <p className="mt-2 text-sm text-brand-cocoa/70">
                {card.description}
              </p>
              <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">
                {card.action}
              </span>
            </a>
          ))}
        </section>
        <section className="rounded-3xl border border-brand-peach/40 bg-white p-6 text-sm text-brand-cocoa/75 shadow-sm">
          <h3 className="font-heading text-xl text-brand-cocoa">
            Safety notes
          </h3>
          <ul className="mt-3 space-y-2">
            {safetyNotes.map((note) => (
              <li key={note} className="flex gap-2">
                <span className="mt-[6px] inline-flex size-1.5 rounded-full bg-brand-cocoa/60" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>
        {showFallback ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 text-brand-cocoa shadow-xl">
              <h3 className="font-heading text-2xl">We saved the link</h3>
              <p className="mt-2 text-sm text-brand-cocoa/70">
                Copy the invite link and paste it directly into your browser or
                WhatsApp app.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={copyLink}
                  className="rounded-full bg-brand-peach px-4 py-3 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-peach/90"
                >
                  Copy invite link
                </button>
                <a
                  href={welcomeHero.primaryCta.href}
                  className="text-sm font-semibold text-brand-cocoa underline decoration-brand-peach/60 underline-offset-4"
                >
                  Open link manually
                </a>
              </div>
              <button
                type="button"
                onClick={closeFallback}
                className="mt-6 text-sm font-semibold text-brand-cocoa/60 hover:text-brand-cocoa"
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
