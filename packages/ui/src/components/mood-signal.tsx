import * as React from "react";
import { cn } from "../lib/utils";

export type MoodTone = "calm" | "focus" | "energy" | "melancholy";

export interface MoodSignalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  label: React.ReactNode;
  value: number;
  tone?: MoodTone;
  description?: React.ReactNode;
}

const moodToneClasses: Record<MoodTone, string> = {
  calm: "bg-secondary",
  focus: "bg-primary",
  energy: "bg-warning",
  melancholy: "bg-chart-3",
};

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function MoodSignal({ className, description, label, tone = "focus", value, ...props }: MoodSignalProps) {
  const safeValue = clampPercent(value);

  return <div className={cn("grid gap-2 rounded-xl border bg-card p-4 text-card-foreground", className)} data-slot="mood-signal" {...props}>
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium">{label}</span>
      <span className="font-mono text-xs text-muted-foreground">{safeValue}%</span>
    </div>
    <div aria-label={typeof label === "string" ? label : undefined} aria-valuemax={100} aria-valuemin={0} aria-valuenow={safeValue} className="h-2 overflow-hidden rounded-full bg-muted" role="meter">
      <div className={cn("h-full transition-all", moodToneClasses[tone])} style={{ width: `${safeValue}%` }} />
    </div>
    {description ? <p className="text-xs leading-5 text-muted-foreground">{description}</p> : null}
  </div>;
}
