import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { APP_LINKS } from "@/lib/marketing/links";
import { BLOG_POSTS } from "@/lib/marketing/blog";
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
            Practical guidance on engineering productivity, delivery analytics,
            and leading teams in the AI age.
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
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-accent/30"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                <span>·</span>
                <span className="truncate">{post.topics.join(" · ")}</span>
              </div>
              <div className="mt-3 text-base font-semibold tracking-tight text-foreground group-hover:underline underline-offset-4">
                {post.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Read post <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
