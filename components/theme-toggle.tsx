"use client";

import * as React from "react";
import { Laptop, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/components/theme-provider";

function ThemeIcon({ theme }: { theme: "system" | "light" | "dark" }) {
  if (theme === "light") return <Sun className="h-4 w-4" />;
  if (theme === "dark") return <Moon className="h-4 w-4" />;
  return <Laptop className="h-4 w-4" />;
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const items: Array<{
    value: "system" | "light" | "dark";
    label: string;
    description: string;
  }> = [
    { value: "system", label: "System", description: "Follow OS setting" },
    { value: "light", label: "Light", description: "Always light" },
    { value: "dark", label: "Dark", description: "Always dark" },
  ];

  return (
    <div
      data-visual-ignore
      className={cn("fixed right-5 bottom-5 z-[60]", className)}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-full bg-background/70 backdrop-blur"
            aria-label="Toggle theme"
          >
            <ThemeIcon theme={theme} />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60">
          <div className="grid gap-1">
            {items.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setTheme(item.value)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-accent",
                  theme === item.value ? "bg-accent" : ""
                )}
              >
                <span className="mt-0.5 text-muted-foreground">
                  <ThemeIcon theme={item.value} />
                </span>
                <span className="grid gap-0.5">
                  <span className="font-medium leading-5">{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

