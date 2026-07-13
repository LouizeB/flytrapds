import * as React from "react";
import { cn } from "../lib/utils";

export function ButtonGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex rounded-xl border bg-card p-1 text-card-foreground", className)} data-slot="button-group" role="group" {...props} />;
}

export interface ButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function ButtonGroupItem({ className, selected = false, ...props }: ButtonGroupItemProps) {
  return <button
    aria-pressed={selected}
    className={cn("inline-flex min-h-9 items-center justify-center rounded-lg px-3 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", selected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground", className)}
    data-selected={selected || undefined}
    data-slot="button-group-item"
    type="button"
    {...props}
  />;
}
