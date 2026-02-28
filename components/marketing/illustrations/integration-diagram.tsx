import { cn } from "@/lib/utils";

function Node({
  label,
  x,
  y,
  tone = "muted",
}: {
  label: string;
  x: number;
  y: number;
  tone?: "muted" | "primary";
}) {
  const fill = tone === "primary" ? "rgb(var(--brand) / 0.25)" : "transparent";
  const stroke = tone === "primary" ? "rgb(var(--brand))" : "rgb(var(--foreground) / 0.18)";

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="-44"
        y="-18"
        width="88"
        height="36"
        rx="14"
        fill={fill}
        stroke={stroke}
      />
      <text
        x="0"
        y="5"
        textAnchor="middle"
        fontSize="11"
        fill="rgb(var(--foreground) / 0.85)"
        fontFamily="var(--font-geist-sans)"
      >
        {label}
      </text>
    </g>
  );
}

export function IntegrationDiagram({ className }: { className?: string }) {
  const stroke = "rgb(var(--foreground) / 0.18)";
  const brand = "rgb(var(--brand))";

  return (
    <svg
      viewBox="0 0 560 220"
      width="100%"
      height="100%"
      className={cn("max-w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brandStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={brand} stopOpacity="0.85" />
          <stop offset="1" stopColor={brand} stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <rect
        x="1"
        y="1"
        width="558"
        height="218"
        rx="22"
        fill="transparent"
        stroke={stroke}
      />

      <Node label="GitHub" x={120} y={62} />
      <Node label="GitLab" x={120} y={110} />
      <Node label="Bitbucket" x={120} y={158} />

      <Node label="Jira" x={440} y={86} />
      <Node label="Slack / Teams" x={440} y={134} />

      <Node label="GitView" x={280} y={110} tone="primary" />

      <path
        d="M164 62 C210 62, 220 92, 236 102"
        fill="none"
        stroke={`url(#brandStroke)`}
        strokeWidth="2"
      />
      <path
        d="M164 110 C210 110, 220 110, 236 110"
        fill="none"
        stroke={`url(#brandStroke)`}
        strokeWidth="2"
      />
      <path
        d="M164 158 C210 158, 220 128, 236 118"
        fill="none"
        stroke={`url(#brandStroke)`}
        strokeWidth="2"
      />

      <path
        d="M324 104 C360 92, 380 86, 396 86"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
      <path
        d="M324 116 C360 128, 380 134, 396 134"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />

      <circle cx="236" cy="110" r="3" fill={brand} />
      <circle cx="396" cy="86" r="3" fill="rgb(var(--foreground) / 0.32)" />
      <circle cx="396" cy="134" r="3" fill="rgb(var(--foreground) / 0.32)" />
    </svg>
  );
}

