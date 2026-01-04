export function formatDateShort(date: Date): string {
  // Stable formatting: fixed locale + UTC to avoid timezone drift between environments.
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

