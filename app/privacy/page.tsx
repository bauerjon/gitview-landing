import { LEGAL } from "@/lib/marketing/legal";
import { SiteHeader } from "@/components/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
import { LegalPage } from "@/components/marketing/legal-page";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[1120px] px-6 py-16">
        <LegalPage
          title={LEGAL.privacy.title}
          intro={LEGAL.privacy.intro}
          sections={LEGAL.privacy.sections}
        />
      </main>
      <MarketingFooter />
    </div>
  );
}

