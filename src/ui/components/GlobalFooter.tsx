import { Link as RouterLink } from 'react-router-dom'

type GlobalFooterProps = {
  supportEmail: string
}

export function GlobalFooter({ supportEmail }: GlobalFooterProps) {
  return (
    <footer className="border-t border-brand-blush/40 bg-brand-blush/20" data-sticky-buy-target>
      <div className="mx-auto flex flex-col gap-6 px-4 py-12 md:max-w-6xl md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <p className="font-heading text-lg font-semibold uppercase tracking-[0.3em]">Lumelle</p>
          <p className="mt-2 max-w-sm text-sm text-brand-cocoa/70">
            Creator-grade shower caps designed to keep every silk press, curls, and braids flawless on camera.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm text-brand-cocoa/70 md:items-end">
          <RouterLink to="/terms" className="hover:text-brand-cocoa">Terms &amp; Conditions</RouterLink>
          <RouterLink to="/privacy" className="hover:text-brand-cocoa">Privacy Policy</RouterLink>
          <RouterLink to="/creators" className="hover:text-brand-cocoa">Creators</RouterLink>
          <a href={`mailto:${supportEmail}`} className="hover:text-brand-cocoa">{supportEmail}</a>
        </div>
      </div>
    </footer>
  )
}

export default GlobalFooter
