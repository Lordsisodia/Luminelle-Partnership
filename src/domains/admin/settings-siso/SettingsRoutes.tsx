import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// Lazy-load screens from the copied SISO settings bundle (named exports -> wrap to default)
const SettingsHub = lazy(() => import('./SettingsHubPage'))
const GeneralSettings = lazy(() => import('./01-general/ui/screens/GeneralSettingsScreen').then(m => ({ default: m.GeneralSettingsScreen })))
const AccountSettings = lazy(() => import('./02-my-account/ui/screens/AccountSettingsView').then(m => ({ default: m.AccountSettingsView })))
const AccountNotifications = lazy(() => import('./01-general/ui/notifications/AccountNotificationsView').then(m => ({ default: m.AccountNotificationsView })))
const ProfileSettings = lazy(() => import('./03-profile/ui/screens/ProfileSettingsView').then(m => ({ default: m.ProfileSettingsView })))
const DevicesSettings = lazy(() => import('./04-devices/ui/screens/DevicesSettingsScreen').then(m => ({ default: m.DevicesSettingsScreen })))
const SecuritySettings = lazy(() => import('./05-security/ui/screens/SecuritySettingsScreen').then(m => ({ default: m.SecuritySettingsScreen })))
const PrivacySettings = lazy(() => import('./06-privacy/ui/screens/PrivacySettingsScreen').then(m => ({ default: m.PrivacySettingsScreen })))
const PrivacyPolicyPage = lazy(() => import('./06-privacy/ui/screens/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })))
const LegalSettings = lazy(() => import('./07-legal/ui/screens/LegalSettingsScreen').then(m => ({ default: m.LegalSettingsScreen })))
const ComingSoon = lazy(() => import('./shared/components/ComingSoonView'))
const TermsOfServicePage = lazy(() => import('./07-legal/ui/screens/TermsOfServicePage'))
const PartnerAgreementPage = lazy(() => import('./07-legal/ui/screens/PartnerAgreementPage'))
const CommissionTermsPage = lazy(() => import('./07-legal/ui/screens/CommissionTermsPage'))
const ServiceLevelAgreementPage = lazy(() => import('./07-legal/ui/screens/ServiceLevelAgreementPage'))
const CookieTrackingPolicyPage = lazy(() => import('./07-legal/ui/screens/CookieTrackingPolicyPage'))
const UpdatesChangesPolicyPage = lazy(() => import('./07-legal/ui/screens/UpdatesChangesPolicyPage'))
const ComplianceRegulatoryPage = lazy(() => import('./07-legal/ui/screens/ComplianceRegulatoryPage'))
const IntegrationsSettings = lazy(() => import('./08-integrations/ui/screens/IntegrationsSettingsScreen').then(m => ({ default: m.IntegrationsSettingsScreen })))

export const adminSettingsRoutes: RouteObject[] = [
  { path: '', element: <SettingsHub /> },
  { path: 'general', element: <GeneralSettings /> },
  { path: 'appearance', element: <ComingSoon title="Appearance" description="Theme, typography, and density" /> },
  { path: 'language', element: <ComingSoon title="Language & Region" description="Language, timezone, and formatting preferences" /> },
  { path: 'my-account', element: <AccountSettings /> },
  { path: 'my-account/notifications', element: <AccountNotifications /> },
  { path: 'profile', element: <ProfileSettings /> },
  { path: 'devices', element: <DevicesSettings /> },
  { path: 'security', element: <SecuritySettings /> },
  { path: 'privacy', element: <PrivacySettings /> },
  { path: 'privacy/policy', element: <PrivacyPolicyPage /> },
  { path: 'legal', element: <LegalSettings /> },
  { path: 'legal/terms-of-service', element: <TermsOfServicePage /> },
  { path: 'legal/partner-agreement', element: <PartnerAgreementPage /> },
  { path: 'legal/commission-terms', element: <CommissionTermsPage /> },
  { path: 'legal/service-level-agreement', element: <ServiceLevelAgreementPage /> },
  { path: 'legal/cookie-tracking-policy', element: <CookieTrackingPolicyPage /> },
  { path: 'legal/updates-changes-policy', element: <UpdatesChangesPolicyPage /> },
  { path: 'legal/compliance-regulatory', element: <ComplianceRegulatoryPage /> },
  { path: 'integrations', element: <IntegrationsSettings /> },
]

export default adminSettingsRoutes
