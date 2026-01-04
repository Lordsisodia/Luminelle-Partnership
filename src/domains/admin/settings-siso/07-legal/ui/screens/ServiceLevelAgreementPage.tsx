import LegalDocLayout from "@/domains/admin/settings-siso/07-legal/ui/components/LegalDocLayout";
import MarkdownDoc from "@/domains/admin/settings-siso/07-legal/ui/components/MarkdownDoc";

export default function ServiceLevelAgreementPage() {
  return (
    <LegalDocLayout
      title="Service Level Agreement"
      description="Uptime guarantees, support commitments, and response times."
    >
      <MarkdownDoc filePath="public/docs/service-level-agreement.md" />
    </LegalDocLayout>
  );
}
