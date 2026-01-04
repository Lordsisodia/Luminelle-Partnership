"use client";

import type { MobileTabId } from "../types/navigation";

/**
 * Minimal route→tab mapping used by the mobile navigation store.
 * This repo primarily uses the admin shell; partner routes can be filled in later.
 */
export function getTabForPath(pathname: string): MobileTabId {
  if (pathname.startsWith("/admin/settings") || pathname.startsWith("/partners/settings")) return "quick-actions";
  if (pathname.startsWith("/partners/notifications")) return "notifications";
  if (pathname.startsWith("/partners/messages")) return "messages";
  if (pathname.startsWith("/partners/learning")) return "learning";
  return "campus";
}

