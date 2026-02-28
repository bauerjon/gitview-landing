export type PricingPlan = {
  id: "visibility" | "premium" | "enterprise";
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

export const PRICING_PROMO = {
  enabled: true,
  message:
    "New customer offer: Get 25% off your first month with promo code NEW25",
  code: "NEW25",
} as const;

export function getPricingPlans(cta: {
  startTrialHref: string;
  contactHref: string;
}): PricingPlan[] {
  return [
    {
      id: "visibility",
      name: "Visibility",
      price: "$15 / Developer",
      description: "Get baseline visibility and trends across your org.",
      features: [
        "Up to 15 developers",
        "6 months data retention",
        "Visualize team activity",
        "Measure productivity over time",
        "Code output leaderboard",
      ],
      cta: { label: "Start free trial", href: cta.startTrialHref },
    },
    {
      id: "premium",
      name: "Premium",
      price: "$20 / Developer",
      description:
        "Unlock deeper insights across delivery, review, and team health.",
      features: [
        "Up to 30 developers",
        "12 months data retention",
        "Visualize team activity",
        "Measure productivity over time",
        "Code output leaderboard",
        "Code review leaderboard",
      ],
      cta: { label: "Start free trial", href: cta.startTrialHref },
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "CUSTOM PRICING",
      description: "Scale to larger orgs with custom data and governance.",
      features: [
        "Unlimited developers",
        "Unlimited repositories",
        "All premium features",
        "DORA Metrics",
        "Custom Reports & API",
        "Private database access",
      ],
      cta: { label: "Contact sales", href: cta.contactHref },
    },
  ];
}

