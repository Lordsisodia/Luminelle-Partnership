import LegalDocLayout from "@/domains/admin/settings-siso/07-legal/ui/components/LegalDocLayout";
import MarkdownDoc from "@/domains/admin/settings-siso/07-legal/ui/components/MarkdownDoc";

export default function ComplianceRegulatoryPage() {
  return (
    <LegalDocLayout
      title="Compliance & Regulatory"
      description="AML/KYC, international requirements, and industry standards."
    >
      <MarkdownDoc filePath="public/docs/compliance-regulatory.md" />
    </LegalDocLayout>
  );
}
