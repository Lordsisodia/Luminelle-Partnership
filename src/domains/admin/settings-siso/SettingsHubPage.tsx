import { Link } from 'react-router-dom'
import { AdminPageLayout } from '@admin/shared/ui/layouts'
import { SETTINGS_ROUTES } from './shared/navigation/routes'
import { Shield, Lock, FileText, Link2, User, Globe, MonitorSmartphone, Settings } from 'lucide-react'
import { SettingsGroupCallout } from './shared/components/SettingsGroupCallout'

const basics = [
  { id: 'general', title: 'General', to: SETTINGS_ROUTES.base + '/general', icon: Globe },
  { id: 'account', title: 'My Account', to: SETTINGS_ROUTES.account, icon: User },
  { id: 'profile', title: 'Profile', to: SETTINGS_ROUTES.profile, icon: Settings },
  { id: 'devices', title: 'Devices', to: SETTINGS_ROUTES.devices, icon: MonitorSmartphone },
]

const safety = [
  { id: 'security', title: 'Security', to: SETTINGS_ROUTES.security, icon: Shield },
  { id: 'privacy', title: 'Privacy', to: SETTINGS_ROUTES.privacy, icon: Lock },
  { id: 'legal', title: 'Legal', to: SETTINGS_ROUTES.legal, icon: FileText },
]

const integrations = [{ id: 'integrations', title: 'Integrations', to: SETTINGS_ROUTES.integrations, icon: Link2 }]

type RowProps = { title: string; to: string; icon: any; badge?: string }
const Row = ({ title, to, icon: Icon, badge }: RowProps) => (
  <Link
    to={to}
    className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-white transition bg-brand-cocoa/85 hover:bg-brand-cocoa/75"
  >
    <span className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-brand-blush" />
      <span>{title}</span>
    </span>
    <span className="flex items-center gap-2 text-xs text-white/70">
      {badge ? <span className="rounded-full border border-white/20 px-2 py-0.5 text-[11px]">{badge}</span> : null}
      <span className="text-white/60">›</span>
    </span>
  </Link>
)

export default function SettingsHubPage() {
  return (
    <AdminPageLayout title={null} subtitle={null}>
      <div className="space-y-6 pt-3 md:pt-4 text-white">
        {/* Basics & Account */}
        <SettingsGroupCallout
          icon={<Globe className="h-4 w-4" />}
          title="Basics & Account"
          subtitle="General preferences, identity and devices"
          showChevron={false}
          className="border-white/10 bg-brand-cocoa/90 backdrop-blur-sm shadow-soft text-white"
        >
          <div className="divide-y divide-white/12 rounded-2xl border border-white/12 bg-brand-cocoa/85 p-1">
            {basics.map((item) => (
              <Row key={item.id} {...item} />
            ))}
          </div>
        </SettingsGroupCallout>

        {/* Safety & Compliance */}
        <SettingsGroupCallout
          icon={<Shield className="h-4 w-4" />}
          title="Safety & Compliance"
          subtitle="Security, privacy and legal policies"
          showChevron={false}
          className="border-white/10 bg-brand-cocoa/90 backdrop-blur-sm shadow-soft text-white"
        >
          <div className="divide-y divide-white/12 rounded-2xl border border-white/12 bg-brand-cocoa/85 p-1">
            {safety.map((item) => (
              <Row key={item.id} {...item} />
            ))}
          </div>
        </SettingsGroupCallout>

        {/* Integrations */}
        <SettingsGroupCallout
          icon={<Link2 className="h-4 w-4" />}
          title="Integrations"
          subtitle="Connect external tools and data sources"
          showChevron={false}
          className="border-white/10 bg-brand-cocoa/90 backdrop-blur-sm shadow-soft text-white"
        >
          <div className="divide-y divide-white/12 rounded-2xl border border-white/12 bg-brand-cocoa/85 p-1">
            {integrations.map((item) => (
              <Row key={item.id} {...item} />
            ))}
          </div>
        </SettingsGroupCallout>
      </div>
    </AdminPageLayout>
  )
}
