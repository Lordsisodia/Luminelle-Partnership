import LegalDocLayout from "@/domains/admin/settings-siso/07-legal/ui/components/LegalDocLayout";
import MarkdownDoc from "@/domains/admin/settings-siso/07-legal/ui/components/MarkdownDoc";

export default function TermsOfServicePage() {
  return (
    <LegalDocLayout
      title="Terms of Service"
      description="Review the terms that govern use of the platform."
    >
      <MarkdownDoc filePath="public/docs/terms-of-service.md" />
    </LegalDocLayout>
  );
}
