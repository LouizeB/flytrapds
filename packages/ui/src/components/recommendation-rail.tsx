import * as React from "react";
import { cn } from "../lib/utils";

export interface RecommendationRailProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  empty?: React.ReactNode;
}

export function RecommendationRail({ children, className, description, empty = "Nenhuma recomendação disponível.", title, ...props }: RecommendationRailProps) {
  const titleId = React.useId();
  const hasChildren = React.Children.count(children) > 0;

  return <section aria-labelledby={titleId} className={cn("grid gap-4", className)} data-slot="recommendation-rail" {...props}>
    <div className="grid gap-1">
      <h2 className="font-display text-xl font-semibold" id={titleId}>{title}</h2>
      {description ? <p className="text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
    {hasChildren ? <div className="flex gap-4 overflow-x-auto pb-2" role="list">{children}</div> : <p className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">{empty}</p>}
  </section>;
}
