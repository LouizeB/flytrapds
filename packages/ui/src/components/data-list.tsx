import * as React from "react";
import { cn } from "../lib/utils";

export function DataList({ className, ...props }: React.HTMLAttributes<HTMLDListElement>) {
  return <dl className={cn("grid gap-3", className)} data-slot="data-list" {...props} />;
}

export function DataListItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1 rounded-xl border bg-card p-4 text-card-foreground sm:grid-cols-[12rem_1fr] sm:gap-4", className)} data-slot="data-list-item" {...props} />;
}

export function DataListTerm({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <dt className={cn("text-sm font-medium text-muted-foreground", className)} data-slot="data-list-term" {...props} />;
}

export function DataListDescription({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <dd className={cn("text-sm text-foreground", className)} data-slot="data-list-description" {...props} />;
}
