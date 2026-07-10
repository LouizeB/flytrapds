import * as React from "react";
import { Progress } from "../components/progress";
import { cn } from "../lib/utils";

export function CostTokenMeter({ used, limit, cost, className }: { used: number; limit: number; cost?: string; className?: string }) {
  const percentage = Math.min(100, Math.round((used / limit) * 100));
  return <div className={cn("grid gap-2", className)}>
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="font-medium">Tokens</span><span className="text-muted-foreground">{used.toLocaleString()} / {limit.toLocaleString()}{cost && ` · ${cost}`}</span>
    </div>
    <Progress aria-label={`${percentage}% dos tokens utilizados`} value={percentage} />
  </div>;
}
