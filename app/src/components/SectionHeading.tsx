import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  alignment?: 'left' | 'center'
  actions?: ReactNode
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  alignment = 'left',
  actions,
}: SectionHeadingProps) => {
  const alignmentClass =
    alignment === 'center' ? 'items-center text-center' : 'items-start'

  return (
    <div
      className={`flex flex-col gap-4 ${alignmentClass} text-brand-cocoa`}
    >
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-brand-blush/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa/70">
          {eyebrow}
        </span>
      ) : null}
      <div
        className={`flex w-full flex-col gap-3 ${
          alignment === 'center' ? 'items-center' : ''
        }`}
      >
        <h2 className="font-heading text-3xl font-semibold md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-brand-cocoa/75">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex gap-3">{actions}</div> : null}
    </div>
  )
}
