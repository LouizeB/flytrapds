import * as React from "react";
import { cn } from "../lib/utils";

export type StatusIndicatorTone = "neutral" | "info" | "success" | "warning" | "error";

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: StatusIndicatorTone;
}

const statusTones: Record<StatusIndicatorTone, string> = {
  neutral: "bg-muted-foreground",
  info: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
};

export function StatusIndicator({ children, className, tone = "neutral", ...props }: StatusIndicatorProps) {
  return <div className={cn("inline-flex items-center gap-2 text-sm", className)} data-slot="status-indicator" role="status" {...props}>
    <span aria-hidden="true" className={cn("size-2.5 rounded-full", statusTones[tone])} />
    {children ? <span>{children}</span> : <span className="sr-only">{tone}</span>}
  </div>;
}
