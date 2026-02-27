function GitViewHeaderMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="gitviewMark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(var(--brand))" />
          <stop offset="1" stopColor="rgb(var(--brand) / 0.6)" />
        </linearGradient>
      </defs>
      <rect
        x="1.25"
        y="1.25"
        width="13.5"
        height="13.5"
        rx="3"
        fill="url(#gitviewMark)"
      />
      <text
        x="8"
        y="8.2"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="9"
        fontWeight="700"
        letterSpacing="-0.6"
        fill="white"
        fillOpacity="0.95"
        fontFamily={
          "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
        }
      >
        {"//"}
      </text>
    </svg>
  );
}

function GitViewMark({ className }: { className?: string }) {
  return <GitViewHeaderMark className={className} />;
}

function GitViewWordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-semibold tracking-tight">Git</span>
      <span className="font-medium tracking-tight text-muted-foreground">
        View
      </span>
    </span>
  );
}

export { GitViewHeaderMark, GitViewMark, GitViewWordmark };
