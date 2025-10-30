import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { formBenefits } from '@/content/landing'
import { useLinkFallback } from '@/hooks/useLinkFallback'
import { SectionHeading } from '@/components/SectionHeading'
import { WHATSAPP_INVITE_URL } from '@/config/constants'

const formSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .min(7, 'Add a valid phone number')
    .regex(/^[0-9+()\-\s]+$/, 'Use digits and + only'),
  tiktok: z
    .string()
    .min(2, 'TikTok handle is required')
    .regex(/^@?[\w.]+$/, 'Handle should contain only letters, numbers, or dots')
    .transform((val) => (val.startsWith('@') ? val : `@${val}`)),
  instagram: z
    .string()
    .optional()
    .transform((val) => (val && !val.startsWith('@') ? `@${val}` : val)),
  source: z.enum([
    'tiktok-outreach',
    'friend-referral',
    'found-online',
    'other',
  ]),
})

type FormValues = z.infer<typeof formSchema>

export const OnboardingFormSection = () => {
  const [submitted, setSubmitted] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const {
    trigger,
    showFallback,
    closeFallback,
    copyLink,
    isAttempting,
  } = useLinkFallback({
    url: WHATSAPP_INVITE_URL,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: 'tiktok-outreach',
    },
  })

  const onSubmit = (values: FormValues) => {
    console.info('Onboarding submission', values)
    trigger()
    setSubmitted(true)
    reset({ ...values, instagram: values.instagram ?? undefined })
  }

  const handleCopyLink = async () => {
    const success = await copyLink()
    setCopySuccess(success)
    if (success) {
      setTimeout(() => setCopySuccess(false), 2500)
    }
  }

  return (
    <section
      id="join"
      className="bg-brand-blush/15 py-20 text-brand-cocoa"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr,1fr] md:px-6">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Final Step"
            title="Start your creator journey today"
            description="Share a few details so we can prep your onboarding in WhatsApp. Once you hit submit, you’ll jump straight into the creator hub."
          />
          <ul className="space-y-3 rounded-3xl border border-brand-peach/30 bg-white/90 p-6 text-sm text-brand-cocoa/75 shadow-sm">
            {formBenefits.map((benefit) => (
              <li key={benefit} className="flex gap-3">
                <span className="mt-[6px] inline-flex size-1.5 rounded-full bg-brand-cocoa/60" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-3xl border border-brand-peach/30 bg-white/90 p-6 text-sm leading-relaxed text-brand-cocoa/75 shadow-sm">
            <p className="font-semibold text-brand-cocoa">Already invited?</p>
            <p className="mt-2">
              If you have the WhatsApp link saved, you can head straight back to
              the group and drop your latest results. We’re ready for you.
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-brand-peach/40 bg-white p-6 shadow-soft">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold text-brand-cocoa"
              >
                Full name
              </label>
              <input
                id="name"
                {...register('name')}
                className="mt-2 w-full rounded-2xl border border-brand-peach/40 px-4 py-3 text-sm text-brand-cocoa outline-none ring-brand-peach/60 transition focus:ring-2"
                placeholder="Shannon Mitchell"
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-semibold text-brand-cocoa"
              >
                Phone number
              </label>
              <input
                id="phone"
                {...register('phone')}
                className="mt-2 w-full rounded-2xl border border-brand-peach/40 px-4 py-3 text-sm text-brand-cocoa outline-none ring-brand-peach/60 transition focus:ring-2"
                placeholder="+44 7123 456 789"
              />
              {errors.phone ? (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.phone.message}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="tiktok"
                className="text-sm font-semibold text-brand-cocoa"
              >
                TikTok handle
              </label>
              <input
                id="tiktok"
                {...register('tiktok')}
                className="mt-2 w-full rounded-2xl border border-brand-peach/40 px-4 py-3 text-sm text-brand-cocoa outline-none ring-brand-peach/60 transition focus:ring-2"
                placeholder="@yourhandle"
              />
              {errors.tiktok ? (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.tiktok.message}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="instagram"
                className="text-sm font-semibold text-brand-cocoa"
              >
                Instagram handle (optional)
              </label>
              <input
                id="instagram"
                {...register('instagram')}
                className="mt-2 w-full rounded-2xl border border-brand-peach/40 px-4 py-3 text-sm text-brand-cocoa outline-none ring-brand-peach/60 transition focus:ring-2"
                placeholder="@yourinsta"
              />
              {errors.instagram ? (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.instagram.message}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="source"
                className="text-sm font-semibold text-brand-cocoa"
              >
                How did you hear about Lumelle?
              </label>
              <select
                id="source"
                {...register('source')}
                className="mt-2 w-full rounded-2xl border border-brand-peach/40 bg-white px-4 py-3 text-sm text-brand-cocoa outline-none ring-brand-peach/60 transition focus:ring-2"
              >
                <option value="tiktok-outreach">TikTok outreach</option>
                <option value="friend-referral">Friend referral</option>
                <option value="found-online">Found you online</option>
                <option value="other">Other</option>
              </select>
              {errors.source ? (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.source.message}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-full bg-brand-peach px-6 py-3 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-peach/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting || isAttempting
                ? 'Redirecting to WhatsApp…'
                : 'Join the community'}
            </button>
            {submitted ? (
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-600">
                Thanks! We’re opening WhatsApp in a new tab.
              </p>
            ) : null}
          </form>
        </div>
      </div>
      {showFallback ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 text-brand-cocoa shadow-xl">
            <h3 className="font-heading text-2xl">Having trouble?</h3>
            <p className="mt-2 text-sm text-brand-cocoa/70">
              We couldn’t open WhatsApp automatically. Copy the invite link or
              email the team for a fresh one.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleCopyLink}
                className="rounded-full bg-brand-peach px-4 py-3 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-peach/90"
              >
                {copySuccess ? 'Link copied!' : 'Copy invite link'}
              </button>
              <a
                href={WHATSAPP_INVITE_URL}
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
    </section>
  )
}
