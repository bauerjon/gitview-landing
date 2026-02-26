import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { APP_LINKS } from "@/lib/marketing/links";
import { SiteHeader } from "@/components/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";

const SALES_EMAIL = "support@gitview.com";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Contact
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Questions about rollout, reporting, or enterprise setup? Email us
            and we’ll get back to you.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-background text-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold tracking-tight">
                Email us
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Send a note with your team size, tools, and what you want to
                measure.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-md">
                  <a href={`mailto:${SALES_EMAIL}`}>Email {SALES_EMAIL}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-md bg-background"
                >
                  <a href={APP_LINKS.signup()}>
                    Start free trial <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="text-sm font-medium text-primary">
                Quick links
              </div>
              <div className="mt-4 grid gap-3 text-sm">
                <a
                  href={APP_LINKS.login()}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  Log in to the app
                </a>
                <a
                  href={APP_LINKS.signup()}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  Create an account
                </a>
                <Link
                  href="/pricing"
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  View pricing
                </Link>
                <a
                  href="https://docs.gitview.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}

