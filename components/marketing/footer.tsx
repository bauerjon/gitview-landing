import Link from "next/link";

import { VercelMark, VercelWordmark } from "@/components/vercel-logo";

const SAMPLE_HREF = "/sample";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/60 bg-[var(--geist-background)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <VercelMark className="h-4 w-4" />
              <VercelWordmark />
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Vercel provides the developer tools and cloud infrastructure to
              build, scale, and secure a faster, more personalized web.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid gap-3 text-sm">
              <div className="font-medium">Resources</div>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Docs
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Guides
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Changelog
              </Link>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="font-medium">Frameworks</div>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Next.js
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                SvelteKit
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Nuxt
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Remix
              </Link>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="font-medium">Company</div>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Careers
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Security
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Enterprise
              </Link>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="font-medium">Community</div>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Open Source
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Twitter / X
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                GitHub
              </Link>
              <Link href={SAMPLE_HREF} className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 Vercel Inc.</div>
          <div className="flex items-center gap-4">
            <Link href={SAMPLE_HREF} className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href={SAMPLE_HREF} className="hover:text-foreground">
              Terms
            </Link>
            <Link href={SAMPLE_HREF} className="hover:text-foreground">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
