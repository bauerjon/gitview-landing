import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogBlock, BlogPost } from "@/lib/marketing/blog";
import { APP_LINKS } from "@/lib/marketing/links";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function BlogBlockView({ block }: { block: BlogBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-foreground">
        {block.text}
      </h2>
    );
  }
  if (block.type === "h3") {
    return (
      <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground">
        {block.text}
      </h3>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-4 grid gap-2 pl-5 text-sm leading-6 text-muted-foreground">
        {block.items.map((item) => (
          <li key={item} className="list-disc">
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "callout") {
    return (
      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="text-sm font-semibold tracking-tight text-foreground">
          {block.title}
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {block.text}
        </p>
      </div>
    );
  }

  return (
    <p className="mt-4 text-sm leading-7 text-muted-foreground">{block.text}</p>
  );
}

export function BlogPostView({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <article className={cn("mx-auto max-w-3xl", className)}>
      <header className="text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          <span>·</span>
          <span>{post.topics.join(" · ")}</span>
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {post.description}
        </p>
      </header>

      <div className="mt-12">
        {post.blocks.map((block, idx) => (
          <BlogBlockView key={idx} block={block} />
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-border bg-card p-8">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="text-sm font-semibold tracking-tight">
              See the dashboards in GitView
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect your Git provider and start exploring delivery + pulse
              signals in minutes.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
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
              <Link href="/pricing">Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

