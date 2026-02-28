import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { APP_LINKS } from "@/lib/marketing/links";
import { getPricingPlans, PRICING_PROMO } from "@/lib/marketing/pricing";
import { SiteHeader } from "@/components/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const plans = getPricingPlans({
    startTrialHref: APP_LINKS.signup(),
    contactHref: "/contact",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Pricing
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Choose the plan that matches your team size and reporting needs.
          </p>
          {PRICING_PROMO.enabled ? (
            <div className="mt-6 rounded-2xl border border-border bg-card px-5 py-4 text-sm text-muted-foreground">
              {PRICING_PROMO.message}{" "}
              <span className="font-semibold text-foreground">
                {PRICING_PROMO.code}
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-12">
          <PricingCards plans={plans} />
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-card p-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-sm font-medium text-primary">
                Need help choosing?
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Talk to us about rollout and reporting
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                We can recommend the right plan based on your org structure and
                what you want to measure.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button asChild className="rounded-md">
                <a href={APP_LINKS.signup()}>
                  Start free trial <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-md bg-background"
              >
                <Link href="/contact">Contact sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}

