import LegalDocLayout from "@/domains/admin/settings-siso/07-legal/ui/components/LegalDocLayout";
import MarkdownDoc from "@/domains/admin/settings-siso/07-legal/ui/components/MarkdownDoc";

export default function CookieTrackingPolicyPage() {
  return (
    <LegalDocLayout
      title="Cookie & Tracking Policy"
      description="How we use cookies, analytics, and tracking technologies."
    >
      <MarkdownDoc filePath="public/docs/cookie-tracking-policy.md" />
    </LegalDocLayout>
  );
}
