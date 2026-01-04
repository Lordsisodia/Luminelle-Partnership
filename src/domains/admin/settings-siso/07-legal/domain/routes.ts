export const LEGAL_ROUTES = {
  base: "/admin/settings/legal",
  terms: "/admin/settings/legal/terms-of-service",
  partnerAgreement: "/admin/settings/legal/partner-agreement",
  commissionTerms: "/admin/settings/legal/commission-terms",
  serviceLevelAgreement: "/admin/settings/legal/service-level-agreement",
  cookiePolicy: "/admin/settings/legal/cookie-tracking-policy",
  updatesChanges: "/admin/settings/legal/updates-changes-policy",
  compliance: "/admin/settings/legal/compliance-regulatory",
} as const;

export type LegalRouteKey = keyof typeof LEGAL_ROUTES;
