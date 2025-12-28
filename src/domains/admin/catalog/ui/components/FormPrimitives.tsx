import type { ReactNode } from 'react'

export function Field({ label, description, children }: { label: string; description?: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm font-semibold text-semantic-text-primary">
        <span>{label}</span>
      </div>
      {description ? <p className="text-sm text-semantic-text-primary/70">{description}</p> : null}
      {children}
    </div>
  )
}

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}) {
  return (
    <input
      className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm text-semantic-text-primary shadow-sm focus:border-semantic-legacy-brand-cocoa focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string
  onChange: (val: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <textarea
      className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 font-mono text-[12px] text-semantic-text-primary shadow-sm focus:border-semantic-legacy-brand-cocoa focus:outline-none"
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
    />
  )
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-porcelain px-2.5 py-1 text-[11px] font-semibold text-semantic-text-primary/80">
      {children}
    </span>
  )
}

