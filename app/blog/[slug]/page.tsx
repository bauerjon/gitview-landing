import { notFound } from "next/navigation";

import { BLOG_POSTS, getBlogPost } from "@/lib/marketing/blog";
import { SiteHeader } from "@/components/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
import { BlogPostView } from "@/components/marketing/blog-post";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[1120px] px-6 py-16">
        <BlogPostView post={post} />
      </main>
      <MarketingFooter />
    </div>
  );
}

