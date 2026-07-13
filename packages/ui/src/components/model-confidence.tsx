import * as React from "react";
import { cn } from "../lib/utils";

export interface ModelConfidenceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  value: number;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

function clampConfidence(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function ModelConfidence({ className, description, label = "Model confidence", value, ...props }: ModelConfidenceProps) {
  const safeValue = clampConfidence(value);

  return <div className={cn("grid gap-2 rounded-xl border bg-card p-4 text-card-foreground", className)} data-slot="model-confidence" {...props}>
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium">{label}</span>
      <span className="font-mono text-xs text-muted-foreground">{safeValue}%</span>
    </div>
    <div aria-label={typeof label === "string" ? label : undefined} aria-valuemax={100} aria-valuemin={0} aria-valuenow={safeValue} className="h-2 overflow-hidden rounded-full bg-muted" role="meter">
      <div className="h-full bg-secondary transition-all" style={{ width: `${safeValue}%` }} />
    </div>
    {description ? <p className="text-xs leading-5 text-muted-foreground">{description}</p> : null}
  </div>;
}
