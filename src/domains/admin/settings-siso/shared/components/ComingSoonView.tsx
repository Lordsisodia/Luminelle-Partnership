"use client";

import { Clock, Home } from "lucide-react";
import { SettingsDetailLayout } from "@/domains/admin/settings-siso/shared/components/SettingsDetailLayout";
import { SETTINGS_ROUTES } from "@/domains/admin/settings-siso/shared/navigation/routes";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type ComingSoonProps = {
  title?: string;
  description?: string;
  backHref?: string | null;
  backLabel?: string;
};

export default function ComingSoonView({
  title = "Coming Soon",
  description,
  backHref = SETTINGS_ROUTES.base,
  backLabel = "Back to settings",
}: ComingSoonProps) {
  return (
    <SettingsDetailLayout title="" description="" wrapContent={false} backHref={null} backLabel={backLabel} srTitle={title} hideHeader>
      <div className="space-y-4 pb-32 text-siso-text-primary">
        <Breadcrumb className="text-white">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-white hover:text-white">
                <Home size={14} strokeWidth={2} aria-hidden="true" className="text-white" />
                <span className="sr-only">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/80" />
            <BreadcrumbItem>
              <BreadcrumbLink href={backHref ?? SETTINGS_ROUTES.base} className="text-white hover:text-white">
                {backLabel ?? "Settings"}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/80" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="relative rounded-[26px] border border-white/10 bg-siso-bg-secondary p-5 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
          <div className="pl-2">
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-siso-orange">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold uppercase tracking-[0.2em] text-siso-text-primary">{title}</h2>
            {description ? (
              <p className="text-xs text-siso-text-muted">{description}</p>
            ) : (
              <p className="text-xs text-siso-text-muted">This settings area is not available yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 text-sm text-siso-text-muted">
          We’re putting the finishing touches on this page. Check back soon or explore other settings.
        </div>
      </div>
    </SettingsDetailLayout>
  );
}

export { ComingSoonView };
