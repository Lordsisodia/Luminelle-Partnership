import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SectionHeading } from '@ui/components/SectionHeading'
import { welcomeHero, welcomeSteps, resourceCards, safetyNotes } from '@content/welcome'
import { WHATSAPP_INVITE_URL } from '@/config/constants'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'

const WelcomePage = () => {
  const [copied, setCopied] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState<null | { tone: 'success' | 'error'; message: string; showLink?: boolean }>(null)

  const inviteLink = useMemo(() => welcomeHero.primaryCta?.href ?? WHATSAPP_INVITE_URL, [])

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 1500)
    return () => window.clearTimeout(t)
  }, [copied])

  useEffect(() => {
    if (!copyFeedback) return
    const t = window.setTimeout(() => setCopyFeedback(null), 2600)
    return () => window.clearTimeout(t)
  }, [copyFeedback])

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(inviteLink)
        setCopied(true)
        setCopyFeedback({ tone: 'success', message: 'Invite link copied.' })
        return
      }

      // Fallback for restricted environments (non-secure contexts, denied permission, older browsers).
      window.prompt('Copy this invite link:', inviteLink)
      setCopyFeedback({ tone: 'success', message: 'Copy the invite link from the prompt.', showLink: true })
    } catch (error) {
      console.error('Failed to copy invite link', error)
      window.prompt('Copy this invite link:', inviteLink)
      setCopyFeedback({ tone: 'error', message: 'Couldn’t copy automatically — use the link below.', showLink: true })
    }
  }

  return (
    <>
      <Seo
        title="Creator Welcome"
        description="Your Lumelle onboarding hub: join WhatsApp, grab the content brief, and log your first launch date."
        url={toPublicUrl('/welcome')}
        type="website"
      />
      <MarketingLayout navItems={[]} subtitle="Creators">
        <div className="bg-white text-semantic-text-primary">
          <section className="bg-gradient-to-b from-brand-porcelain via-white to-white">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-6">
              <div className="space-y-5">
                <p className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/70">
                  Welcome, creator
                </p>
                <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
                  {welcomeHero.headline}
                </h1>
                <p className="text-base text-semantic-text-primary/75 md:text-lg">
                  {welcomeHero.subheadline}
                </p>
	                <div className="flex flex-wrap gap-3">
	                  <a
	                    href={welcomeHero.primaryCta.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                  >
                    {welcomeHero.primaryCta.label}
                  </a>
	                  <button
	                    type="button"
	                    onClick={handleCopyLink}
	                    className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-cocoa px-5 py-2.5 text-sm font-semibold text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/30"
	                  >
	                    {copied ? 'Invite link copied' : welcomeHero.secondaryCta.label}
	                  </button>
	                </div>
	                {copyFeedback ? (
	                  <div
	                    className={`mt-4 rounded-2xl border px-4 py-3 text-sm shadow-soft ${
	                      copyFeedback.tone === 'error'
	                        ? 'border-rose-200 bg-rose-50 text-rose-900'
	                        : 'border-semantic-legacy-brand-blush/60 bg-white text-semantic-text-primary'
	                    }`}
	                    role="status"
	                    aria-live="polite"
	                  >
	                    <div className="font-semibold">{copyFeedback.message}</div>
	                    {copyFeedback.showLink ? (
	                      <div className="mt-2 break-all rounded-xl bg-white/70 px-3 py-2 font-mono text-[12px] text-semantic-text-primary/90">
	                        {inviteLink}
	                      </div>
	                    ) : null}
	                  </div>
	                ) : null}
	                <p className="text-sm text-semantic-text-primary/60">
	                  We use the WhatsApp chat for launch dates, shot lists, and quick feedback — no spam.
	                </p>
              </div>

              <div className="md:ml-auto md:w-full">
                <div className="overflow-hidden rounded-[1.6rem] border border-semantic-accent-cta/50 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  <picture className="block h-full w-full">
                    <source
                      type="image/avif"
                      srcSet="/images/brand-lifestyle-320.avif 320w, /images/brand-lifestyle-640.avif 640w, /images/brand-lifestyle-960.avif 960w"
                      sizes="(min-width: 768px) 40vw, 90vw"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/brand-lifestyle-320.webp 320w, /images/brand-lifestyle-640.webp 640w, /images/brand-lifestyle-960.webp 960w"
                      sizes="(min-width: 768px) 40vw, 90vw"
                    />
                    <img
                      src="/images/brand-lifestyle.jpg"
                      alt="Creators using the Lumelle satin-lined shower cap in a bathroom setting"
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      width={1200}
                      height={800}
                    />
                  </picture>
                </div>
                <div className="-mt-6 ml-4 w-max rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-semantic-text-primary/70 shadow-soft">
                  Creator launch kit
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <SectionHeading
                eyebrow="Quick start"
                title="Your next three moves"
                description="Join the chat, grab the brief, and set a launch date so we can track and boost your first drop."
                alignment="center"
              />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {welcomeSteps.map((step, index) => {
                  const isInternal = step.href?.startsWith('/')
                  const StepTag = isInternal ? Link : 'a'

                  return (
                    <article
                      key={step.title}
                      className="flex h-full flex-col justify-between gap-5 rounded-3xl border border-semantic-accent-cta/35 bg-white p-5 shadow-soft"
                    >
                      <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                          Step {index + 1}
                        </p>
                        <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-semantic-text-primary/75">{step.description}</p>
                      </div>

                      {step.action && step.href ? (
                        <StepTag
                          to={isInternal ? step.href : undefined}
                          href={!isInternal ? step.href : undefined}
                          target={!isInternal ? '_blank' : undefined}
                          rel={!isInternal ? 'noreferrer' : undefined}
                          className="inline-flex w-fit items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                        >
                          {step.action}
                        </StepTag>
                      ) : null}
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="bg-semantic-legacy-brand-blush/12 py-12">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <SectionHeading
                eyebrow="Resources"
                title="Everything you need in one place"
                description="Shot lists, hooks, and a live leaderboard to see what’s working across the creator crew."
                alignment="center"
              />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {resourceCards.map((card) => {
                  const isInternal = card.href.startsWith('/')
                  const CardTag = isInternal ? Link : 'a'

                  return (
                    <article
                      key={card.title}
                      className="flex h-full flex-col justify-between rounded-3xl border border-semantic-accent-cta/35 bg-white p-5 shadow-soft"
                    >
                      <div className="space-y-3">
                        <h3 className="font-heading text-lg font-semibold">{card.title}</h3>
                        <p className="text-sm text-semantic-text-primary/75 leading-relaxed">{card.description}</p>
                      </div>
                      <CardTag
                        to={isInternal ? card.href : undefined}
                        href={!isInternal ? card.href : undefined}
                        target={!isInternal ? '_blank' : undefined}
                        rel={!isInternal ? 'noreferrer' : undefined}
                        className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                      >
                        {card.action}
                      </CardTag>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="mx-auto max-w-5xl rounded-3xl border border-semantic-accent-cta/40 bg-white px-6 py-10 shadow-soft md:px-10">
              <SectionHeading
                eyebrow="House rules"
                title="Keep the program tight"
                description="A few quick reminders so everyone enjoys the perks and the chat stays high-signal."
                alignment="left"
              />
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-semantic-text-primary/75">
                {safetyNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="mt-[6px] h-2.5 w-2.5 rounded-full bg-semantic-legacy-brand-cocoa" aria-hidden />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={inviteLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                >
                  Reopen WhatsApp invite
                </a>
                <Link
                  to="/brief"
                  className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/30"
                >
                  Read the content brief
                </Link>
              </div>
            </div>
          </section>
        </div>
      </MarketingLayout>
    </>
  )
}

export default WelcomePage
