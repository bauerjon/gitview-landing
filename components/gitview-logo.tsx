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
      <rect x="1.25" y="1.25" width="13.5" height="13.5" rx="3" fill="url(#gitviewMark)" />
      <path
        d="M5.1 11.1V4.9h2.1c1.7 0 2.8.95 2.8 2.45 0 1.51-1.1 2.45-2.8 2.45H6.6v1.31H5.1Zm1.5-2.62h.6c.86 0 1.33-.44 1.33-1.13 0-.68-.47-1.13-1.33-1.13h-.6v2.26Z"
        fill="white"
        fillOpacity="0.92"
      />
      <path
        d="M10.6 11.1 12.9 4.9h1.6l-2.4 6.2h-1.5Z"
        fill="white"
        fillOpacity="0.78"
      />
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

