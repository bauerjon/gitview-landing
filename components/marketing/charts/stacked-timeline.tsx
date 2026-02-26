import { cn } from "@/lib/utils";

export type TimelineSegment = {
  label: string;
  value: number;
  tone?: "primary" | "muted";
};

export function StackedTimeline({
  segments,
  className,
}: {
  segments: TimelineSegment[];
  className?: string;
}) {
  const total = Math.max(
    1,
    segments.reduce((sum, seg) => sum + Math.max(0, seg.value), 0)
  );

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex h-3 overflow-hidden rounded-full bg-muted">
        {segments.map((seg) => {
          const pct = (Math.max(0, seg.value) / total) * 100;
          const tone =
            seg.tone === "muted"
              ? "bg-foreground/10 dark:bg-foreground/15"
              : "bg-primary";
          return (
            <div
              key={seg.label}
              className={tone}
              style={{ width: `${pct}%` }}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2 text-xs">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                seg.tone === "muted"
                  ? "bg-foreground/15"
                  : "bg-primary"
              )}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{seg.label}</span>
            <span className="ml-auto tabular-nums text-foreground">
              {seg.value}d
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

