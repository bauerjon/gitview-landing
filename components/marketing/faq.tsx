import { cn } from "@/lib/utils";

export type FaqItem = {
  q: string;
  a: string;
};

export function Faq({
  items,
  className,
}: {
  items: readonly FaqItem[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-border bg-card px-5 py-4"
        >
          <summary className="cursor-pointer list-none select-none text-sm font-medium tracking-tight text-foreground [&::-webkit-details-marker]:hidden">
            <div className="flex items-center justify-between gap-3">
              <span>{item.q}</span>
              <span className="text-muted-foreground transition-transform group-open:rotate-45">
                +
              </span>
            </div>
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

