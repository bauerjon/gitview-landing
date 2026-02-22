import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VercelHeaderMark } from "@/components/vercel-logo";

const SAMPLE_HREF = "/sample";

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-secondary-foreground">
          {icon}
        </span>
        {title}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="mt-5">
        <Button asChild variant="link" className="px-0">
          <Link href={SAMPLE_HREF}>
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--geist-background)] text-[var(--geist-foreground)]">
      <SiteHeader />

      <main className="px-4">
        <section className="pt-16" data-slot="vercel-hero">
          <div className="mx-auto max-w-[1080px]">
            <div className="relative h-[720px] overflow-hidden rounded-none border border-neutral-200 bg-[#fafafa] dark:border-white/10 dark:bg-black">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 opacity-60 dark:hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
                  backgroundSize: "90px 90px",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 hidden opacity-60 dark:block"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "90px 90px",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-4 z-20 h-4 w-4 opacity-40 dark:opacity-30"
              >
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-400 dark:bg-white/40" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-neutral-400 dark:bg-white/40" />
              </div>

              <div className="relative z-20 flex h-full flex-col items-center px-6 pt-36 text-center">
                <h1 className="text-balance text-[56px] font-semibold leading-[1.05] tracking-tight text-neutral-900 dark:text-white">
                  Build and deploy on the AI Cloud.
                </h1>
                <p className="mt-6 max-w-2xl text-balance text-lg leading-7 text-neutral-600 dark:text-white/70">
                  Vercel provides the developer tools and cloud infrastructure
                  to build, scale, and secure a faster, more personalized web.
                </p>

                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    className="h-12 w-full bg-[#171717] px-3.5 text-[16px] font-medium leading-6 text-white hover:bg-black sm:w-[181px] dark:bg-[#ededed] dark:text-[#0a0a0a] dark:hover:bg-white/90"
                  >
                    <Link href={SAMPLE_HREF}>
                      <VercelHeaderMark className="h-4 w-auto" />
                      Start Deploying
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="h-12 w-full bg-white px-3.5 text-[16px] font-medium leading-6 text-[#171717] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] hover:bg-neutral-50 sm:w-[181px] dark:bg-[#0a0a0a] dark:text-[#ededed] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14)] dark:hover:bg-[#111]"
                  >
                    <Link href={SAMPLE_HREF}>Get a Demo</Link>
                  </Button>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 z-0 overflow-hidden"
              >
                <div
                  className="absolute inset-0 z-0 dark:hidden"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "conic-gradient(from 180deg at 50% 70%, rgba(250, 250, 250, 0) 0deg, rgb(238, 195, 45) 72deg, rgb(236, 75, 75) 144deg, rgb(112, 154, 185) 216deg, rgb(77, 255, 191) 288deg, rgba(250, 250, 250, 0) 360deg)",
                    mixBlendMode: "hard-light",
                  }}
                />
                <div
                  className="absolute inset-0 z-0 hidden dark:block"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "conic-gradient(from 180deg at 50% 70%, rgba(0, 0, 0, 0) 0deg, rgba(0, 89, 171, 0.8) 72deg, rgba(15, 255, 169, 0.8) 144deg, rgba(255, 206, 32, 0.8) 216deg, rgba(197, 0, 0, 0.8) 288deg, rgba(0, 0, 0, 0) 360deg)",
                    mixBlendMode: "hard-light",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vercel-hero-0.svg"
                  alt=""
                  className="absolute inset-0 z-10 h-full w-full dark:hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vercel-hero-1.svg"
                  alt=""
                  className="absolute inset-0 z-10 h-full w-full dark:hidden"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vercel-hero-0-dark.svg"
                  alt=""
                  className="absolute inset-0 z-10 hidden h-full w-full dark:block"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vercel-hero-1-dark.svg"
                  alt=""
                  className="absolute inset-0 z-10 hidden h-full w-full dark:block"
                />
                <div
                  className="absolute inset-0 z-20 dark:hidden"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(250,250,250,1) 0%, rgba(250,250,250,1) 46%, rgba(250,250,250,0) 72%)",
                  }}
                />
                <div
                  className="absolute inset-0 z-20 hidden dark:block"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 46%, rgba(0,0,0,0) 72%)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title="Scale your Enterprise without compromising Security"
              description="Deploy once, deliver everywhere. When you push code to Vercel, we make it instantly available across the globe."
            />

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="outline" className="bg-background">
                <Link href={SAMPLE_HREF}>Learn about Enterprise</Link>
              </Button>
              <Button asChild variant="outline" className="bg-background">
                <Link href={SAMPLE_HREF}>Explore Security</Link>
              </Button>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <FeatureCard
                title="Fast by default"
                description="Ship with performance primitives built in—from edge caching to server rendering."
                icon={<Zap className="h-4 w-4" />}
              />
              <FeatureCard
                title="Secure by design"
                description="Enterprise controls and compliance features to protect your teams and your users."
                icon={<ShieldCheck className="h-4 w-4" />}
              />
              <FeatureCard
                title="Global infrastructure"
                description="A platform that delivers your web experiences close to every user, everywhere."
                icon={<ArrowRight className="h-4 w-4" />}
              />
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Deploy your first app in seconds.
                </h3>
                <p className="mt-3 text-base text-muted-foreground">
                  Start deploying with the built-in platform tools developers
                  love.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-7">
                  <Link href={SAMPLE_HREF}>Get Started</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 px-7 bg-background"
                >
                  <Link href={SAMPLE_HREF}>Contact Sales</Link>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="build" className="mt-10">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="build">Build</TabsTrigger>
                  <TabsTrigger value="scale">Scale</TabsTrigger>
                  <TabsTrigger value="secure">Secure</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="build">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="text-sm font-medium">Build</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      From local dev to preview deployments, your workflow stays
                      fast and consistent.
                    </p>
                    <div className="mt-4 grid gap-3">
                      <div className="rounded-xl border border-border bg-background p-4 text-sm">
                        Git-based deployments
                      </div>
                      <div className="rounded-xl border border-border bg-background p-4 text-sm">
                        Preview URLs for every commit
                      </div>
                      <div className="rounded-xl border border-border bg-background p-4 text-sm">
                        Framework-aware optimizations
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-gradient-to-br from-foreground/5 to-foreground/0 p-6">
                    <div className="text-sm font-medium">Preview</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      A Vercel-style, polished UI with modern defaults—built
                      with shadcn + Tailwind.
                    </p>
                    <div className="mt-6 h-48 rounded-xl border border-border bg-background" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scale">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="text-sm font-medium">Scale</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Deliver dynamic content quickly with globally distributed
                      primitives.
                    </p>
                    <div className="mt-4 grid gap-3">
                      <div className="rounded-xl border border-border bg-background p-4 text-sm">
                        Edge caching and routing
                      </div>
                      <div className="rounded-xl border border-border bg-background p-4 text-sm">
                        Active CPU pricing
                      </div>
                      <div className="rounded-xl border border-border bg-background p-4 text-sm">
                        Analytics and insights
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-gradient-to-br from-foreground/5 to-foreground/0 p-6">
                    <div className="text-sm font-medium">Global</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Low-latency experiences across regions with sensible
                      defaults.
                    </p>
                    <div className="mt-6 h-48 rounded-xl border border-border bg-background" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="secure">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="text-sm font-medium">Secure</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Protect teams and production with enterprise-grade access
                      controls.
                    </p>
                    <div className="mt-4 grid gap-3">
                      <div className="rounded-xl border border-border bg-background p-4 text-sm">
                        SSO & SCIM provisioning
                      </div>
                      <div className="rounded-xl border border-border bg-background p-4 text-sm">
                        Audit logs and governance
                      </div>
                      <div className="rounded-xl border border-border bg-background p-4 text-sm">
                        Compliance and reporting
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-gradient-to-br from-foreground/5 to-foreground/0 p-6">
                    <div className="text-sm font-medium">Controls</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Configure guardrails and visibility to match your org.
                    </p>
                    <div className="mt-6 h-48 rounded-xl border border-border bg-background" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
