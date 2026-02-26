import { cn } from "@/lib/utils";

export type BarListItem = {
  label: string;
  value: number;
};

export function BarList({
  items,
  max,
  className,
}: {
  items: BarListItem[];
  max?: number;
  className?: string;
}) {
  const resolvedMax =
    max ?? Math.max(1, ...items.map((item) => Math.max(0, item.value)));

  return (
    <div className={cn("grid gap-2", className)}>
      {items.map((item) => {
        const pct = Math.min(100, (Math.max(0, item.value) / resolvedMax) * 100);
        return (
          <div key={item.label} className="grid gap-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="truncate">{item.label}</span>
              <span className="tabular-nums">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${pct}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

