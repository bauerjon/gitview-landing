import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Clock4,
  GitPullRequest,
  LineChart,
  MessagesSquare,
  Shield,
  SlidersHorizontal,
} from "lucide-react";
import type { ReactNode } from "react";

import { MARKETING_COPY } from "@/lib/marketing/copy";
import { APP_LINKS } from "@/lib/marketing/links";
import { getPricingPlans } from "@/lib/marketing/pricing";
import { SiteHeader } from "@/components/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "@/components/marketing/illustrations/dashboard-preview";
import { IntegrationDiagram } from "@/components/marketing/illustrations/integration-diagram";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { Faq } from "@/components/marketing/faq";
import { LineSpark } from "@/components/marketing/charts/line-spark";
import { StackedTimeline } from "@/components/marketing/charts/stacked-timeline";

function SectionHeader({
  title,
  body,
}: {
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {body}
        </p>
      ) : null}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-background text-foreground">
        {icon}
      </div>
      <div className="mt-4 text-base font-semibold tracking-tight">{title}</div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

export default function HomePage() {
  const pricingPlans = getPricingPlans({
    startTrialHref: APP_LINKS.signup(),
    contactHref: "/contact",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(1000px 420px at 30% 20%, rgb(var(--brand) / 0.18), transparent 60%), radial-gradient(900px 380px at 85% 15%, rgb(var(--brand) / 0.12), transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(var(--foreground) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--foreground) / 0.06) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage:
                "radial-gradient(700px 360px at 50% 0%, black 40%, transparent 75%)",
            }}
          />

          <div className="relative mx-auto grid max-w-[1120px] gap-10 px-6 pb-20 pt-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:pt-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {MARKETING_COPY.hero.eyebrow}
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                {MARKETING_COPY.hero.headline}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                {MARKETING_COPY.hero.subhead}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild className="rounded-md">
                  <a href={APP_LINKS.signup()}>
                    {MARKETING_COPY.hero.primaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-md bg-background"
                >
                  <a href={APP_LINKS.login()}>{MARKETING_COPY.hero.secondaryCta}</a>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Read-only access
                </div>
                <div className="inline-flex items-center gap-2">
                  <Clock4 className="h-4 w-4 text-primary" />
                  Flow metrics
                </div>
                <div className="inline-flex items-center gap-2">
                  <GitPullRequest className="h-4 w-4 text-primary" />
                  Review signals
                </div>
              </div>
            </div>

            <DashboardPreview className="mx-auto w-full max-w-[640px]" />
          </div>
        </section>

        <section id="product" className="border-t border-border">
          <div className="mx-auto max-w-[1120px] px-6 py-20">
            <SectionHeader
              title={MARKETING_COPY.sections.actionable.title}
              body={MARKETING_COPY.sections.actionable.body}
            />

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              <FeatureCard
                icon={<BarChart3 className="h-5 w-5" />}
                title="Flow metrics for real productivity"
                body="Track activity, trends, and cycle time so productivity reflects end to end delivery, not just output volume."
              />
              <FeatureCard
                icon={<MessagesSquare className="h-5 w-5" />}
                title="Continuous pulse feedback"
                body="Capture sentiment and drivers through lightweight pulses delivered in Slack or Microsoft Teams."
              />
              <FeatureCard
                icon={<LineChart className="h-5 w-5" />}
                title="Guardrails for AI-assisted shipping"
                body="Pair review signals and reliability metrics with qualitative feedback to ship faster with fewer surprises."
              />
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-card/30">
          <div className="mx-auto grid max-w-[1120px] gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-sm font-medium text-primary">
                Cycle time visibility
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {MARKETING_COPY.sections.throughput.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {MARKETING_COPY.sections.throughput.body}
              </p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <div className="text-xs text-muted-foreground">
                    Last 12 weeks
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold tracking-tight">
                        Median cycle time
                      </div>
                      <div className="mt-1 text-2xl font-semibold tabular-nums">
                        4.2d
                      </div>
                    </div>
                    <LineSpark
                      data={[8.1, 7.5, 6.8, 6.2, 5.8, 5.1, 4.9, 4.6, 4.2]}
                      width={220}
                      height={56}
                      className="hidden sm:block"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-background p-5">
                  <div className="text-sm font-semibold tracking-tight">
                    Where time is spent
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Breakdowns across build, review, and merge.
                  </p>
                  <div className="mt-4">
                    <StackedTimeline
                      segments={[
                        { label: "Build", value: 2, tone: "muted" },
                        { label: "Review", value: 1, tone: "primary" },
                        { label: "Merge", value: 1, tone: "muted" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold tracking-tight">
                    Review + delivery signals
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    A single view for throughput and quality.
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-2">
                  <Clock4 className="h-4 w-4 text-primary" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-xs text-muted-foreground">PRs merged</div>
                  <div className="mt-1 text-2xl font-semibold tabular-nums">
                    128
                  </div>
                  <LineSpark
                    data={[3, 5, 6, 4, 7, 8, 9, 10, 12]}
                    width={200}
                    height={56}
                    className="mt-3"
                  />
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-xs text-muted-foreground">
                    Reviews / PR
                  </div>
                  <div className="mt-1 text-2xl font-semibold tabular-nums">
                    2.4
                  </div>
                  <LineSpark
                    data={[1.6, 1.8, 2.1, 2.4, 2.2, 2.5, 2.4, 2.6, 2.4]}
                    width={200}
                    height={56}
                    className="mt-3"
                  />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-tight">
                    What changed in the last 30 days
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Up
                  </span>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Median cycle time</span>
                    <span className="tabular-nums text-foreground">-18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Helpful review comments</span>
                    <span className="tabular-nums text-foreground">+12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pulse sentiment</span>
                    <span className="tabular-nums text-foreground">+0.3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-[1120px] px-6 py-20">
            <SectionHeader
              title={MARKETING_COPY.sections.signals.title}
              body={MARKETING_COPY.sections.signals.body}
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <BarChart3 className="h-5 w-5" />,
                  title: "Activity + trends",
                  body: "Understand output, churn, and legacy refactors over time.",
                },
                {
                  icon: <Clock4 className="h-5 w-5" />,
                  title: "Workflow & cycle time",
                  body: "Track cycle time and how it breaks down across the lifecycle.",
                },
                {
                  icon: <GitPullRequest className="h-5 w-5" />,
                  title: "Code review stats",
                  body: "See review behavior and impact signals across teams.",
                },
                {
                  icon: <LineChart className="h-5 w-5" />,
                  title: "DORA metrics",
                  body: "Measure deploy frequency, lead time, and reliability signals.",
                },
                {
                  icon: <SlidersHorizontal className="h-5 w-5" />,
                  title: "Custom reports & API",
                  body: "Create dashboards and track custom data points via API.",
                },
                {
                  icon: <MessagesSquare className="h-5 w-5" />,
                  title: "Pulse surveys",
                  body: "Run pulse snapshots and drivers with Slack/Teams delivery.",
                },
              ].map((item) => (
                <FeatureCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-card/30">
          <div className="mx-auto grid max-w-[1120px] gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <div className="text-sm font-medium text-primary">
                Onboarding
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {MARKETING_COPY.sections.onboarding.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Connect your existing tools and start with reports leaders
                already understand.
              </p>

              <ol className="mt-6 grid gap-3">
                {MARKETING_COPY.sections.onboarding.steps.map((step, idx) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-2xl border border-border bg-background p-5">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-semibold tracking-tight">
                      Security & data minimization
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {MARKETING_COPY.sections.onboarding.security}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <div className="text-sm font-semibold tracking-tight">
                Integrations
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Git providers, Jira, and survey delivery.
              </p>
              <div className="mt-6 aspect-[28/11] w-full">
                <IntegrationDiagram className="h-full w-full" />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {["GitHub", "GitLab", "Bitbucket", "Azure DevOps", "Jira"].map(
                  (label) => (
                    <span
                      key={label}
                      className="rounded-full border border-border bg-card px-3 py-1"
                    >
                      {label}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-[1120px] px-6 py-20">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Pricing that scales with your team
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  Start with visibility, then expand into review and reliability
                  metrics as your org grows.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-md bg-background">
                <Link href="/pricing">
                  View full pricing <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10">
              <PricingCards plans={pricingPlans} />
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-card/30">
          <div className="mx-auto max-w-[1120px] px-6 py-20">
            <SectionHeader title="FAQ" body="Quick answers to common questions." />
            <div className="mt-10 mx-auto max-w-3xl">
              <Faq items={MARKETING_COPY.faq} />
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
              <Button asChild className="rounded-md">
                <a href={APP_LINKS.signup()}>
                  Start free trial <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-md bg-background">
                <Link href="/contact">Talk to sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
