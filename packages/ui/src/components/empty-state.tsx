import * as React from "react";
import { FlytrapIcon, type FlytrapIconComponent } from "../icons";
import { cn } from "../lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: FlytrapIconComponent;
  title: string;
  description?: string;
  action?: React.ReactNode;
}
export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return <div className={cn("grid justify-items-center rounded-xl border border-dashed bg-card p-8 text-center", className)} data-slot="empty-state" {...props}>
    {icon && <span className="mb-4 grid size-12 place-items-center rounded-full bg-muted"><FlytrapIcon icon={icon} size="lg" /></span>}
    <h3 className="font-display text-lg font-semibold">{title}</h3>
    {description && <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>;
}
