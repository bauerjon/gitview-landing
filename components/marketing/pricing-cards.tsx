import Link from "next/link";
import { Check } from "lucide-react";

import type { PricingPlan } from "@/lib/marketing/pricing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PricingCards({
  plans,
  className,
}: {
  plans: PricingPlan[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-3", className)}>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            "relative rounded-3xl border border-border bg-card p-6 shadow-sm",
            plan.highlighted ? "ring-1 ring-primary/30" : ""
          )}
        >
          {plan.highlighted ? (
            <div className="absolute right-5 top-5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Popular
            </div>
          ) : null}

          <div className="text-sm font-medium text-muted-foreground">
            {plan.name}
          </div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">
            {plan.price}
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {plan.description}
          </p>

          <div className="mt-6">
            <Button
              asChild
              className="w-full rounded-md"
              variant={plan.highlighted ? "default" : "outline"}
            >
              {plan.cta.href.startsWith("http") ? (
                <a href={plan.cta.href}>{plan.cta.label}</a>
              ) : (
                <Link href={plan.cta.href}>{plan.cta.label}</Link>
              )}
            </Button>
          </div>

          <ul className="mt-6 grid gap-3 text-sm">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

