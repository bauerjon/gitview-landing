import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { APP_LINKS } from "@/lib/marketing/links";
import { SiteHeader } from "@/components/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Posts coming soon. In the meantime, start exploring dashboards in
            the app.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="rounded-md">
              <a href={APP_LINKS.signup()}>
                Try GitView for free <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-md bg-background"
            >
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Engineering analytics", "Code review", "Pulse surveys"].map(
            (title) => (
              <div
                key={title}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="text-xs text-muted-foreground">Coming soon</div>
                <div className="mt-2 text-base font-semibold tracking-tight">
                  {title}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  We’re working on articles and guides for teams rolling out
                  developer intelligence.
                </p>
              </div>
            )
          )}
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}

