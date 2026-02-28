import * as React from "react";

import { cn } from "@/lib/utils";

function VercelHeaderMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 74 64"
      aria-hidden="true"
      className={cn("h-4 w-auto overflow-visible", className)}
    >
      <path
        d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function VercelMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1155 1000"
      aria-hidden="true"
      className={cn("h-4 w-4", className)}
    >
      <path d="m577.3 0 577.4 1000H0z" fill="currentColor" />
    </svg>
  );
}

function VercelWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("text-sm font-semibold tracking-tight", className)}>
      Vercel
    </span>
  );
}

export { VercelMark, VercelWordmark };
export { VercelHeaderMark };
