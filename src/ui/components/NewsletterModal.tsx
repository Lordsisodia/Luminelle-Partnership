type NewsletterModalProps = {
  headline: string
  body: string
  placeholder: string
  consent: string
  ctaLabel: string
  success?: string
  triggerText?: string
}

export function NewsletterModal({
  headline,
  body,
  placeholder,
  consent,
  ctaLabel,
  success,
  triggerText,
}: NewsletterModalProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-semantic-text-primary/60">Modal</div>
      <div className="mt-2 text-lg font-semibold text-semantic-text-primary">{headline}</div>
      <p className="mt-1 text-sm text-semantic-text-primary/75">{body}</p>
      <input
        className="mt-3 w-full rounded-xl border border-semantic-legacy-brand-blush/60 px-3 py-2 text-sm"
        placeholder={placeholder}
        readOnly
      />
      <div className="mt-2 text-xs text-semantic-text-primary/60">{consent}</div>
      <button className="mt-3 w-full rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white">
        {ctaLabel}
      </button>
      {success ? <div className="mt-2 text-xs text-semantic-text-primary/60">{success}</div> : null}
      {triggerText ? <div className="mt-1 text-[11px] text-semantic-text-primary/50">{triggerText}</div> : null}
    </div>
  )
}

export default NewsletterModal
