import * as React from "react";
import { cn } from "../lib/utils";
import { StatusIndicatorTone } from "./status-indicator";

export function Timeline({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("grid gap-4", className)} data-slot="timeline" {...props} />;
}

export interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  tone?: StatusIndicatorTone;
}

const timelineTones: Record<StatusIndicatorTone, string> = {
  neutral: "bg-muted-foreground",
  info: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
};

export function TimelineItem({ className, description, meta, title, tone = "neutral", ...props }: TimelineItemProps) {
  return <li className={cn("grid grid-cols-[auto_1fr] gap-3", className)} data-slot="timeline-item" {...props}>
    <span aria-hidden="true" className={cn("mt-1 size-3 rounded-full", timelineTones[tone])} />
    <span className="grid gap-1">
      <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-medium">{title}</span>
        {meta ? <span className="text-xs text-muted-foreground">{meta}</span> : null}
      </span>
      {description ? <span className="text-sm leading-6 text-muted-foreground">{description}</span> : null}
    </span>
  </li>;
}
