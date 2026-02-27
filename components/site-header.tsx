"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { APP_LINKS } from "@/lib/marketing/links";
import { PRICING_PROMO } from "@/lib/marketing/pricing";
import { Button } from "@/components/ui/button";
import { GitViewHeaderMark, GitViewWordmark } from "@/components/gitview-logo";
import { TopBar } from "@/components/marketing/top-bar";

const NAV_ITEMS: Array<{ href: string; label: string }> = [
  { href: "/#product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        "border-b border-border",
        className
      )}
    >
      {PRICING_PROMO.enabled ? (
        <TopBar message={PRICING_PROMO.message} href="/pricing" />
      ) : null}

      <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-4 px-6">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="GitView home"
          onClick={() => setMobileOpen(false)}
        >
          <GitViewHeaderMark className="h-5 w-5" />
          <GitViewWordmark className="text-[15px]" />
        </Link>

        <nav className="hidden flex-1 items-center justify-start gap-1 md:flex md:pl-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-9 rounded-md bg-background"
          >
            <a href={APP_LINKS.login()}>Log in</a>
          </Button>
          <Button asChild size="sm" className="h-9 rounded-md">
            <a href={APP_LINKS.signup()}>Try GitView for free</a>
          </Button>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto max-w-[1120px] px-6 py-4">
            <div className="grid gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 grid gap-2">
              <Button
                asChild
                variant="outline"
                className="w-full rounded-md bg-background"
              >
                <a href={APP_LINKS.login()}>Log in</a>
              </Button>
              <Button asChild className="w-full rounded-md">
                <a href={APP_LINKS.signup()}>Try GitView for free</a>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
