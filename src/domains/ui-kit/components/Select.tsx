import clsx from 'clsx'
import { forwardRef } from 'react'

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  helpText?: string
  error?: string
  fullWidth?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helpText, error, className, fullWidth, children, id, ...rest },
  ref,
) {
  const selectId = id || rest.name || undefined
  return (
    <label className={clsx('flex flex-col gap-1 text-sm text-semantic-text-primary/80', fullWidth && 'w-full')}>
      {label ? <span className="font-semibold text-semantic-text-primary">{label}</span> : null}
      <select
        id={selectId}
        ref={ref}
        className={clsx(
          'rounded-xl border px-3 py-2 text-sm outline-none transition-colors bg-white',
          error
            ? 'border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
            : 'border-semantic-legacy-brand-blush/60 focus:border-semantic-legacy-brand-blush focus:ring-2 focus:ring-brand-porcelain',
          fullWidth && 'w-full',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      {error ? <span className="text-xs text-rose-600">{error}</span> : helpText ? <span className="text-xs text-semantic-text-primary/60">{helpText}</span> : null}
    </label>
  )
})

export default Select
