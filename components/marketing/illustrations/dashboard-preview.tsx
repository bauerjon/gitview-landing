import { Activity, ArrowUpRight, CheckCircle2, GitPullRequest } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { LineSpark } from "@/components/marketing/charts/line-spark";
import { BarList } from "@/components/marketing/charts/bar-list";
import { StackedTimeline } from "@/components/marketing/charts/stacked-timeline";

function MiniCard({
  title,
  value,
  icon,
  children,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-1">
          <div className="text-xs text-muted-foreground">{title}</div>
          <div className="text-lg font-semibold tracking-tight">{value}</div>
        </div>
        <div className="rounded-xl border border-border bg-background p-2 text-foreground">
          {icon}
        </div>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

export function DashboardPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--foreground) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--foreground) / 0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(500px 280px at 50% 0%, black 35%, transparent 75%)",
          opacity: 0.35,
        }}
      />

      <div className="relative grid gap-6 p-6">
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-xs text-muted-foreground">
              GitView dashboard preview
            </div>
            <div className="text-base font-semibold tracking-tight">
              Weekly delivery + team pulse
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Live
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MiniCard
            title="Merged PRs"
            value="128"
            icon={<GitPullRequest className="h-4 w-4" />}
          >
            <LineSpark data={[3, 6, 5, 7, 9, 10, 12, 11, 13]} className="w-full" />
          </MiniCard>
          <MiniCard
            title="Cycle time"
            value="4.2d"
            icon={<Activity className="h-4 w-4" />}
          >
            <StackedTimeline
              segments={[
                { label: "Build", value: 2, tone: "muted" },
                { label: "Review", value: 1, tone: "primary" },
                { label: "Merge", value: 1, tone: "muted" },
              ]}
            />
          </MiniCard>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MiniCard
            title="Review impact"
            value="+18%"
            icon={<CheckCircle2 className="h-4 w-4" />}
          >
            <BarList
              items={[
                { label: "Helpful", value: 42 },
                { label: "Neutral", value: 18 },
                { label: "Needs work", value: 9 },
              ]}
            />
          </MiniCard>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="text-xs text-muted-foreground">Pulse drivers</div>
            <div className="mt-1 text-sm font-semibold tracking-tight">
              What’s improving this month
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Clarity",
                "Quality",
                "On-call",
                "Tooling",
                "Code review",
                "Planning",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-border bg-background p-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Sentiment</span>
                <span className="tabular-nums">4.1 / 5</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "82%" }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
