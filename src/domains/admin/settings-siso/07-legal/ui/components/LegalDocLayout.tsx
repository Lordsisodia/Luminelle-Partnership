import type { ReactNode } from "react";
import { FileText, Home } from "lucide-react";
import { SettingsDetailLayout } from "@/domains/admin/settings-siso/shared/components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { LEGAL_ROUTES } from "@/domains/admin/settings-siso/07-legal/domain/routes";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type LegalDocLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function LegalDocLayout({ title, description, children }: LegalDocLayoutProps) {
  return (
    <SettingsDetailLayout title="" description="" wrapContent={false} backHref={null} hideHeader showBackground>
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
              <BreadcrumbLink href={LEGAL_ROUTES.base} className="text-white hover:text-white">Legal</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/80" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="relative">
          <HighlightCard
            color="orange"
            className="w-full max-w-none text-left"
            title={title}
            description={description ?? "Review the current policy and obligations."}
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] font-semibold text-[26px] leading-[1.2]"
            descriptionClassName="text-xs"
            icon={<FileText className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            fullWidth
          />
        </div>

        <div className="rounded-3xl border border-siso-border bg-siso-bg-secondary/60 p-4 text-sm text-siso-text-muted">
          {children}
        </div>
      </div>
    </SettingsDetailLayout>
  );
}

export default LegalDocLayout;
