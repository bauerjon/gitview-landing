import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";

export default function SamplePage() {
  return (
    <div className="min-h-screen bg-[var(--geist-background)] text-[var(--geist-foreground)]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-background p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Sample page</h1>
          <p className="mt-3 text-muted-foreground">
            All links and buttons route here for now. We can split these into
            real subpages later.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/">Back to landing</Link>
            </Button>
            <Button asChild variant="outline" className="bg-background">
              <Link href="/sample">Reload sample</Link>
            </Button>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
