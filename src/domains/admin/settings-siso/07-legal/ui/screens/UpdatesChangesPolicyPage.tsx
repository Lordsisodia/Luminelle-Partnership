import LegalDocLayout from "@/domains/admin/settings-siso/07-legal/ui/components/LegalDocLayout";
import MarkdownDoc from "@/domains/admin/settings-siso/07-legal/ui/components/MarkdownDoc";

export default function UpdatesChangesPolicyPage() {
  return (
    <LegalDocLayout
      title="Updates & Changes Policy"
      description="How we notify you about policy changes and new requirements."
    >
      <MarkdownDoc filePath="public/docs/updates-changes-policy.md" />
    </LegalDocLayout>
  );
}
