import LegalDocLayout from "@/domains/admin/settings-siso/07-legal/ui/components/LegalDocLayout";
import MarkdownDoc from "@/domains/admin/settings-siso/07-legal/ui/components/MarkdownDoc";

export default function PartnerAgreementPage() {
  return (
    <LegalDocLayout
      title="Partner Agreement"
      description="Partnership obligations, commissions, and mutual commitments."
    >
      <MarkdownDoc filePath="public/docs/partner-agreement.md" />
    </LegalDocLayout>
  );
}
