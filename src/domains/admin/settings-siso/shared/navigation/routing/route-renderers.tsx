import { Navigate } from "react-router-dom";
import type { ComponentType } from "react";
import { getSettingsRouteBySlug } from "./settings-route-registry";

export async function renderSettingsRouteBySlug(slug: string) {
  const route = getSettingsRouteBySlug(slug);
  if (!route) return <Navigate to="/admin/settings" replace />;

  if (route.status === "planned") {
    // planned routes fall back to a lightweight placeholder until shipped
    const mod = await import("@/domains/admin/settings-siso/shared/components/ComingSoonView");
    const ComingSoon = (mod as any).ComingSoonView ?? mod.default;
    return <ComingSoon title={route.title} description={route.description} />;
  }

  if (route.status !== "live" || !route.component) return <Navigate to="/admin/settings" replace />;
  const mod = await route.component();
  const View: ComponentType | undefined = (mod as any).default;
  if (!View) return <Navigate to="/admin/settings" replace />;
  return <View />;
}
