export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // YYYY-MM-DD
  topics: string[];
  blocks: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "engineering-analytics-that-drives-action",
    title: "Engineering analytics that drive action (not vanity metrics)",
    description:
      "A practical approach to measuring productivity using throughput, flow, and reliability—without incentivizing the wrong behaviors.",
    publishedAt: "2026-02-27",
    topics: ["Analytics", "Productivity", "Leadership"],
    blocks: [
      {
        type: "p",
        text: "AI-assisted coding is changing how teams produce software. Output can go up quickly—but that doesn’t automatically mean you’re delivering better outcomes. The goal of engineering analytics isn’t to rank individuals. It’s to help leaders see where the system is constrained and where to invest next.",
      },
      { type: "h2", text: "Start with flow, not volume" },
      {
        type: "p",
        text: "Counting commits or PRs in isolation creates perverse incentives. Instead, focus on flow measures that reflect how work moves from idea to production: cycle time, review time, and the consistency of delivery over time.",
      },
      {
        type: "ul",
        items: [
          "Cycle time trend: are we getting faster or slower?",
          "Where time is spent: build vs review vs merge",
          "Work type trend: new work vs churn vs refactors vs removals",
        ],
      },
      { type: "h2", text: "Add reliability to the productivity picture" },
      {
        type: "p",
        text: "Shipping faster doesn’t help if it increases incidents or rework. Pair flow metrics with reliability signals (like DORA metrics) to see whether improvements are sustainable.",
      },
      { type: "h2", text: "Use qualitative feedback to explain the numbers" },
      {
        type: "p",
        text: "Even great dashboards can’t tell you why things changed. Pulse surveys fill in the missing context—capturing sentiment and drivers like clarity, tooling, on-call load, and process friction.",
      },
      {
        type: "callout",
        title: "A simple rule",
        text: "If a metric can be gamed, it will be. Prefer system-level measures that are hard to game and easy to improve collaboratively.",
      },
      {
        type: "p",
        text: "GitView is built around this idea: unify delivery metrics and pulse feedback so leaders can diagnose constraints, not just track activity.",
      },
    ],
  },
  {
    slug: "code-review-signals-that-scale",
    title: "Code review signals that scale in AI-assisted development",
    description:
      "As PR volume rises, review becomes the guardrail. Here’s how to measure review quality and speed without slowing teams down.",
    publishedAt: "2026-02-27",
    topics: ["Code Review", "Quality", "AI"],
    blocks: [
      {
        type: "p",
        text: "When AI makes it easier to generate code, review becomes the primary quality gate. The challenge is balancing speed with safety—especially as PR volume grows and changes become harder to reason about.",
      },
      { type: "h2", text: "Measure the review system, not the reviewer" },
      {
        type: "p",
        text: "The goal isn’t to create a “reviewer leaderboard” for performance management. It’s to understand whether the review system helps teams ship reliably: review cycle time, participation, and whether feedback is constructive.",
      },
      {
        type: "ul",
        items: [
          "Review time: where do PRs spend time waiting?",
          "Review coverage: are PRs getting enough eyes?",
          "Review impact: do comments correlate with fewer follow-up fixes?",
        ],
      },
      { type: "h2", text: "Triage to keep throughput high" },
      {
        type: "p",
        text: "Not every PR needs the same depth. Use consistent guidelines to route changes: small refactors can move quickly; risky changes deserve deeper review.",
      },
      { type: "h2", text: "Make it easier to do the right thing" },
      {
        type: "p",
        text: "The best review systems reduce cognitive load: clear ownership, predictable expectations, and visibility into bottlenecks.",
      },
      {
        type: "callout",
        title: "In the AI era",
        text: "Review isn’t just about correctness—it’s about maintaining shared context and preventing silent complexity from creeping in.",
      },
    ],
  },
  {
    slug: "pulse-surveys-from-sentiment-to-action",
    title: "Pulse surveys: from sentiment to action",
    description:
      "How to run lightweight pulse snapshots (via Slack or Teams) that actually improve productivity and team health.",
    publishedAt: "2026-02-27",
    topics: ["Pulse", "Leadership", "Developer Experience"],
    blocks: [
      {
        type: "p",
        text: "Qualitative feedback is often the missing piece in engineering analytics. Dashboards show what changed; pulse surveys help you understand why—and what to do next.",
      },
      { type: "h2", text: "Keep it lightweight and consistent" },
      {
        type: "p",
        text: "A pulse program works when it’s easy to answer and safe to be honest. Short, anonymous snapshots beat long annual surveys—especially when they’re delivered in tools teams already use.",
      },
      {
        type: "ul",
        items: [
          "Run a snapshot on a predictable cadence",
          "Use drivers to pinpoint what’s helping or hurting",
          "Close the loop: share what you learned and what you’ll try",
        ],
      },
      { type: "h2", text: "Connect pulse drivers to delivery outcomes" },
      {
        type: "p",
        text: "The biggest value comes from pairing pulse results with delivery metrics. If sentiment drops while cycle time rises, you can investigate review load, on-call interruptions, or unclear planning.",
      },
      {
        type: "callout",
        title: "Avoid survey theater",
        text: "If you run pulses but never act, trust will drop. Treat feedback like production telemetry: observe, diagnose, intervene, and verify.",
      },
    ],
  },
  {
    slug: "productivity-in-the-age-of-ai",
    title: "Productivity in the age of AI: what to measure now",
    description:
      "AI changes how work is produced. Here’s a modern measurement framework that stays aligned with outcomes, quality, and sustainable pace.",
    publishedAt: "2026-02-27",
    topics: ["AI", "Productivity", "Metrics"],
    blocks: [
      {
        type: "p",
        text: "AI is accelerating the “construction” part of software. That shifts the bottlenecks to planning, integration, review, and operating in production. If your measurement system is still centered on output volume, it will quickly drift away from what matters.",
      },
      { type: "h2", text: "The new bottleneck is coordination" },
      {
        type: "p",
        text: "As code becomes cheaper to produce, coordination costs become more visible: review queues, unclear ownership, integration conflicts, and rework.",
      },
      {
        type: "ul",
        items: [
          "Cycle time and its components (build/review/merge)",
          "Queue time and wait states",
          "Rework signals (churn) vs new work",
        ],
      },
      { type: "h2", text: "Reliability stays non-negotiable" },
      {
        type: "p",
        text: "Teams can ship faster with AI and still regress reliability. Pair speed with reliability metrics (like DORA) to ensure improvements stick.",
      },
      { type: "h2", text: "Use feedback loops to keep humans in the system" },
      {
        type: "p",
        text: "Pulse surveys help you measure what dashboards can’t: clarity, cognitive load, confidence, and whether teams feel in control of the system they’re shipping.",
      },
      {
        type: "callout",
        title: "Modern productivity",
        text: "In the AI era, productivity is a system property: fast flow, high review quality, and stable operations—supported by continuous feedback loops.",
      },
    ],
  },
  {
    slug: "governance-for-ai-assisted-shipping",
    title: "Governance for AI-assisted shipping (without slowing down)",
    description:
      "A practical playbook for guardrails: review quality, deploy reliability, and healthy developer experience—measured at the org level.",
    publishedAt: "2026-02-27",
    topics: ["AI", "Governance", "Delivery"],
    blocks: [
      {
        type: "p",
        text: "The biggest AI risk isn’t that code is “wrong.” It’s that complexity increases quietly while teams ship faster—until reliability and maintainability degrade. Governance doesn’t have to mean heavy process. It can mean better feedback loops.",
      },
      { type: "h2", text: "Guardrail 1: review health" },
      {
        type: "p",
        text: "If review time spikes, throughput will collapse. Track review bottlenecks and participation patterns to keep the system moving.",
      },
      { type: "h2", text: "Guardrail 2: delivery reliability" },
      {
        type: "p",
        text: "Speed is only valuable if it stays safe. Use reliability metrics alongside throughput: deploy frequency, lead time, and recovery time.",
      },
      { type: "h2", text: "Guardrail 3: human sustainability" },
      {
        type: "p",
        text: "AI can reduce toil—but it can also increase cognitive load through more context switching and larger change surfaces. Capture continuous feedback with pulse drivers and act on trends early.",
      },
      {
        type: "callout",
        title: "The goal",
        text: "Ship faster, with fewer surprises: measurable flow, measurable reliability, and measurable team health.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

