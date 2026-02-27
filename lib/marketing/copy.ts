export const MARKETING_COPY = {
  hero: {
    eyebrow: "Engineering productivity, measured end-to-end",
    headline: "Ship faster with AI—and stay in control.",
    subhead:
      "AI increases output. GitView helps leaders measure what matters: flow, review quality, reliability, and continuous team feedback—so productivity improves without surprises.",
    primaryCta: "Try GitView for free",
    secondaryCta: "Log in",
  },
  sections: {
    actionable: {
      title: "Actionable insights from qualitative + quantitative signals",
      body: "When code is cheaper to produce, coordination becomes the constraint. Unify delivery metrics with pulse feedback to see what’s slowing teams down and why.",
    },
    throughput: {
      title: "Increase throughput by finding bottlenecks fast",
      body: "Break down cycle time across build, review, and merge. Identify queue time and wait states, then track improvements over time.",
    },
    review: {
      title: "Improve code review quality without guesswork",
      body: "As PR volume rises, review is your guardrail. Use review stats and impact signals to improve quality without grinding throughput to a halt.",
    },
    signals: {
      title: "One place for engineering signals",
      body: "From activity and trends to DORA metrics and custom dashboards, GitView helps you stay aligned on what’s happening and what to do next.",
    },
    onboarding: {
      title: "Simple onboarding, fast time-to-value",
      steps: [
        "Connect your Git provider and Jira",
        "Ingest recent history and start tracking trends",
        "Invite leaders and teams to dashboards",
        "Launch pulse surveys to capture continuous feedback",
      ],
      security:
        "Read-only access to your tools. GitView doesn’t host your repositories and stores only the data needed to compute insights.",
    },
  },
  faq: [
    {
      q: "What is GitView?",
      a: "GitView is a software engineering intelligence platform that helps engineering leaders make better decisions by combining delivery metrics with continuous team feedback.",
    },
    {
      q: "Who is GitView for?",
      a: "GitView is designed for engineering managers, directors, and CTOs who need a clear, org-wide view of delivery performance and team health—especially in larger teams.",
    },
    {
      q: "What makes GitView different?",
      a: "Most tools focus on a single angle (only delivery metrics or only surveys). GitView brings both together so you can prioritize changes that move business outcomes and developer experience.",
    },
    {
      q: "How secure is GitView?",
      a: "GitView uses standard encryption best practices and limits the data it stores. Integrations use least-privilege, read-only access where possible.",
    },
    {
      q: "Do you store our code?",
      a: "GitView does not host your repositories. It analyzes metadata and change information needed to generate insights and stores derived metrics and supporting metadata for reporting.",
    },
    {
      q: "What support do you offer?",
      a: "We offer responsive email support and can help you validate dashboards and roll out reporting with your team.",
    },
  ],
} as const;
