import Link from "next/link";

import { cn } from "@/lib/utils";

export function TopBar({
  message,
  href,
  className,
}: {
  message: string;
  href?: string;
  className?: string;
}) {
  const content = (
    <div
      className={cn(
        "flex h-10 items-center justify-center px-4 text-xs text-muted-foreground",
        className
      )}
    >
      <span className="truncate">{message}</span>
    </div>
  );

  if (!href) return <div className="border-b border-border">{content}</div>;

  return (
    <div className="border-b border-border">
      <Link
        href={href}
        className="block hover:bg-accent/40"
        prefetch={false}
      >
        {content}
      </Link>
    </div>
  );
}

