import * as React from "react";

import { cn } from "@/lib/utils";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function LineSpark({
  data,
  width = 160,
  height = 44,
  strokeWidth = 2,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const safe = data.length >= 2 ? data : [0, ...(data.length ? data : [1])];
  const min = Math.min(...safe);
  const max = Math.max(...safe);
  const range = max - min || 1;

  const paddingX = 2;
  const paddingY = 4;
  const innerW = width - paddingX * 2;
  const innerH = height - paddingY * 2;

  const points = safe.map((v, i) => {
    const t = i / (safe.length - 1);
    const x = paddingX + t * innerW;
    const y = paddingY + (1 - (v - min) / range) * innerH;
    return [x, y] as const;
  });

  const d = points
    .map(([x, y], idx) => `${idx === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");

  const area = `${d} L${(paddingX + innerW).toFixed(2)},${(paddingY + innerH).toFixed(2)} L${paddingX.toFixed(2)},${(paddingY + innerH).toFixed(2)} Z`;

  const id = React.useId();
  const primary = "rgb(var(--brand))";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={primary} stopOpacity="0.65" />
          <stop offset="0.5" stopColor={primary} stopOpacity="1" />
          <stop offset="1" stopColor={primary} stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={primary} stopOpacity="0.18" />
          <stop offset="1" stopColor={primary} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={area} fill={`url(#${id}-fill)`} />
      <path
        d={d}
        fill="none"
        stroke={`url(#${id}-stroke)`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx={points[points.length - 1]?.[0] ?? 0}
        cy={points[points.length - 1]?.[1] ?? 0}
        r={clamp(strokeWidth * 1.35, 2.5, 4.5)}
        fill="rgb(var(--brand))"
        fillOpacity="0.95"
      />
    </svg>
  );
}

