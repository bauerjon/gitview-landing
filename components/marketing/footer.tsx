import Link from "next/link";

import { VercelMark, VercelWordmark } from "@/components/vercel-logo";

const SAMPLE_HREF = "/sample";

export function MarketingFooter() {
  return (
    <footer className="border-t border-[#ebebeb] bg-background dark:border-[#1f1f1f]">
      <div className="mx-auto max-w-[1080px] border-x border-[#ebebeb] px-6 py-16 dark:border-[#1f1f1f] lg:px-11">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <VercelMark className="h-4 w-4" />
              <VercelWordmark />
            </Link>
            <p className="max-w-sm text-[12px] leading-5 text-[#666666] dark:text-white/60">
              Vercel provides the developer tools and cloud infrastructure to
              build, scale, and secure a faster, more personalized web.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid gap-3 text-[12px] leading-5">
              <div className="font-medium text-[#171717] dark:text-[#ededed]">
                Resources
              </div>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Docs
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Guides
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Blog
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Changelog
              </Link>
            </div>

            <div className="grid gap-3 text-[12px] leading-5">
              <div className="font-medium text-[#171717] dark:text-[#ededed]">
                Frameworks
              </div>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Next.js
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                SvelteKit
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Nuxt
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Remix
              </Link>
            </div>

            <div className="grid gap-3 text-[12px] leading-5">
              <div className="font-medium text-[#171717] dark:text-[#ededed]">
                Company
              </div>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                About
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Careers
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Security
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Enterprise
              </Link>
            </div>

            <div className="grid gap-3 text-[12px] leading-5">
              <div className="font-medium text-[#171717] dark:text-[#ededed]">
                Community
              </div>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Open Source
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Twitter / X
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                GitHub
              </Link>
              <Link href={SAMPLE_HREF} className="text-[#666666] hover:text-[#171717] dark:text-white/60 dark:hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[#ebebeb] pt-6 text-[12px] leading-5 text-[#666666] dark:border-[#1f1f1f] dark:text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 Vercel Inc.</div>
          <div className="flex items-center gap-4">
            <Link href={SAMPLE_HREF} className="hover:text-[#171717] dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link href={SAMPLE_HREF} className="hover:text-[#171717] dark:hover:text-white">
              Terms
            </Link>
            <Link href={SAMPLE_HREF} className="hover:text-[#171717] dark:hover:text-white">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
