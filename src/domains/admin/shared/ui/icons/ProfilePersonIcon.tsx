export default function ProfilePersonIcon({ className = '', 'aria-hidden': ariaHidden }: { className?: string; 'aria-hidden'?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
    >
      <circle cx="12" cy="8.5" r="3.25" />
      <path d="M5.25 19.25c1.7-2.2 4.1-3.25 6.75-3.25s5.05 1.05 6.75 3.25" />
    </svg>
  )
}
