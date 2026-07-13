import * as React from "react";
import { FlytrapIcon, type FlytrapIconComponent } from "../icons";
import { cn } from "../lib/utils";

export interface InteractiveCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  heading: React.ReactNode;
  description?: React.ReactNode;
  icon?: FlytrapIconComponent;
  selected?: boolean;
}

export function InteractiveCard({ children, className, description, heading, icon, selected = false, ...props }: InteractiveCardProps) {
  return <button
    aria-pressed={selected}
    className={cn("grid w-full gap-3 rounded-xl border bg-card p-5 text-left text-card-foreground shadow-sm outline-none transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-primary focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", selected && "border-primary bg-primary/10", className)}
    data-selected={selected || undefined}
    data-slot="interactive-card"
    type="button"
    {...props}
  >
    <span className="flex items-start gap-3">
      {icon ? <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><FlytrapIcon icon={icon} /></span> : null}
      <span className="grid gap-1">
        <span className="font-display text-base font-semibold">{heading}</span>
        {description ? <span className="text-sm leading-6 text-muted-foreground">{description}</span> : null}
      </span>
    </span>
    {children ? <span className="text-sm leading-6 text-muted-foreground">{children}</span> : null}
  </button>;
}
