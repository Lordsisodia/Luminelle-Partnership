export const SETTINGS_ROUTES = {
  base: "/admin/settings",
  account: "/admin/settings/my-account",
  notifications: "/admin/settings/my-account/notifications",
  profile: "/admin/settings/profile",
  devices: "/admin/settings/devices",
  security: "/admin/settings/security",
  privacy: "/admin/settings/privacy",
  legal: "/admin/settings/legal",
  integrations: "/admin/settings/integrations",
} as const;

export type SettingsRouteKey = keyof typeof SETTINGS_ROUTES;
