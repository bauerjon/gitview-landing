import Link from "next/link";

import { APP_LINKS } from "@/lib/marketing/links";
import { GitViewMark, GitViewWordmark } from "@/components/gitview-logo";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <GitViewMark className="h-4 w-4" />
              <GitViewWordmark className="text-[15px]" />
            </Link>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Developer intelligence that unifies delivery metrics and continuous
              team feedback—so you can lead with clarity.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={APP_LINKS.signup()}
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                Try GitView for free
              </a>
              <span className="text-muted-foreground">·</span>
              <a
                href={APP_LINKS.login()}
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                Log in
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid gap-3 text-sm">
              <div className="font-medium">Product</div>
              <Link
                href="/#product"
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Overview
              </Link>
              <Link
                href="/pricing"
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Contact sales
              </Link>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="font-medium">Resources</div>
              <a
                href="https://docs.gitview.com/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Documentation
              </a>
              <Link
                href="/blog"
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Blog
              </Link>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="font-medium">Company</div>
              <Link
                href="/privacy"
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Terms
              </Link>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="font-medium">App</div>
              <a
                href={APP_LINKS.signup()}
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Create account
              </a>
              <a
                href={APP_LINKS.login()}
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} GitView LLC</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="underline-offset-4 hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

