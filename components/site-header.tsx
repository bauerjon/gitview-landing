"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { VercelHeaderMark, VercelWordmark } from "@/components/vercel-logo";

const SAMPLE_HREF = "/sample";

function MenuItem({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={SAMPLE_HREF}
          className={cn(
            "block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ebebeb] bg-background dark:border-[#1f1f1f]">
      <div className="flex h-16 items-center gap-4 px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-neutral-900 dark:text-white"
          aria-label="Vercel Home"
        >
          <VercelHeaderMark className="h-[14px]" />
          <VercelWordmark className="text-[15px] font-medium" />
        </Link>

        <div className="hidden flex-1 items-center justify-start md:flex">
          <NavigationMenu className="ml-6">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  hideChevron
                  className="leading-none rounded-sm p-2 text-[14px] font-normal text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 data-[state=open]:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:data-[state=open]:bg-neutral-900"
                >
                  Build
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[760px] p-4">
                    <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
                      <Link
                        href={SAMPLE_HREF}
                        className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-foreground/5 to-foreground/0 p-4 hover:bg-accent"
                      >
                        <div className="text-sm font-semibold">
                          Framework-Defined Infrastructure
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          From code to infrastructure in one git push.
                        </p>
                      </Link>
                      <ul className="grid gap-2">
                        <MenuItem
                          title="Previews"
                          description="Ship faster with every change."
                        />
                        <MenuItem
                          title="Integrations"
                          description="Connect tools across your workflow."
                        />
                        <MenuItem
                          title="Observability"
                          description="See performance and errors instantly."
                        />
                        <MenuItem
                          title="Templates"
                          description="Start from proven patterns."
                        />
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  hideChevron
                  className="leading-none rounded-sm p-2 text-[14px] font-normal text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 data-[state=open]:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:data-[state=open]:bg-neutral-900"
                >
                  Scale
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[760px] p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <ul className="grid gap-2">
                        <MenuItem
                          title="Edge Network"
                          description="Global performance by default."
                        />
                        <MenuItem
                          title="Fluid Compute"
                          description="A compute model for all workloads."
                        />
                        <MenuItem
                          title="Analytics"
                          description="Measure real user experience."
                        />
                        <MenuItem
                          title="Caching"
                          description="Instant, consistent results."
                        />
                      </ul>
                      <ul className="grid gap-2">
                        <MenuItem
                          title="Enterprise"
                          description="Controls for large organizations."
                        />
                        <MenuItem
                          title="Teams"
                          description="Scale collaboration with guardrails."
                        />
                        <MenuItem
                          title="SLAs"
                          description="Reliability for critical apps."
                        />
                        <MenuItem
                          title="Support"
                          description="Help when you need it."
                        />
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  hideChevron
                  className="leading-none rounded-sm p-2 text-[14px] font-normal text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 data-[state=open]:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:data-[state=open]:bg-neutral-900"
                >
                  Secure
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[680px] p-4">
                    <ul className="grid gap-2 md:grid-cols-2">
                      <MenuItem
                        title="Security"
                        description="Protect your apps and data."
                      />
                      <MenuItem
                        title="SSO & SCIM"
                        description="Centralize access management."
                      />
                      <MenuItem
                        title="Audit Logs"
                        description="Track and review activity."
                      />
                      <MenuItem
                        title="Compliance"
                        description="Meet enterprise requirements."
                      />
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  hideChevron
                  className="leading-none rounded-sm p-2 text-[14px] font-normal text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 data-[state=open]:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900 dark:data-[state=open]:bg-neutral-900"
                >
                  Learn
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[680px] p-4">
                    <ul className="grid gap-2 md:grid-cols-2">
                      <MenuItem
                        title="Docs"
                        description="Everything you need to build."
                      />
                      <MenuItem
                        title="Guides"
                        description="Best practices and patterns."
                      />
                      <MenuItem
                        title="Changelog"
                        description="What’s new on the platform."
                      />
                      <MenuItem
                        title="Blog"
                        description="Stories and technical deep dives."
                      />
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href={SAMPLE_HREF}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "leading-none rounded-sm p-2 text-[14px] font-normal text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 dark:text-white dark:hover:bg-neutral-900"
                  )}
                >
                  Pricing
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Link
            href={SAMPLE_HREF}
            className="inline-flex h-8 items-center justify-center rounded-[6px] bg-white px-1.5 text-[14px] font-medium leading-5 text-[#171717] shadow-[0_0_0_1px_rgb(235,235,235)] hover:bg-neutral-50 dark:bg-[#0a0a0a] dark:text-[#ededed] dark:shadow-[0_0_0_1px_rgb(46,46,46)] dark:hover:bg-[#111]"
          >
            Log In
          </Link>
          <Link
            href={SAMPLE_HREF}
            className="inline-flex h-8 items-center justify-center rounded-[6px] bg-white px-1.5 text-[14px] font-medium leading-5 text-[#171717] shadow-[0_0_0_1px_rgb(235,235,235)] hover:bg-neutral-50 dark:bg-[#0a0a0a] dark:text-[#ededed] dark:shadow-[0_0_0_1px_rgb(46,46,46)] dark:hover:bg-[#111]"
          >
            Ask AI
          </Link>
          <Link
            href={SAMPLE_HREF}
            className="inline-flex h-8 items-center justify-center rounded-[6px] bg-[#171717] px-1.5 text-[14px] font-medium leading-5 text-white hover:bg-black dark:bg-[#ededed] dark:text-[#0a0a0a] dark:hover:bg-white/90"
          >
            Sign Up
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <div className="grid gap-3">
              <Link
                href={SAMPLE_HREF}
                className="rounded-lg px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Build
              </Link>
              <Link
                href={SAMPLE_HREF}
                className="rounded-lg px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Scale
              </Link>
              <Link
                href={SAMPLE_HREF}
                className="rounded-lg px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Secure
              </Link>
              <Link
                href={SAMPLE_HREF}
                className="rounded-lg px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Learn
              </Link>
              <Separator />
              <Link
                href={SAMPLE_HREF}
                className="rounded-lg px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href={SAMPLE_HREF}
                className="rounded-lg px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
              <Link
                href={SAMPLE_HREF}
                className="rounded-lg px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </Link>
              <Button asChild className="w-full">
                <Link href={SAMPLE_HREF} onClick={() => setMobileOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
