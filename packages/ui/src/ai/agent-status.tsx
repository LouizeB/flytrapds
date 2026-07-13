import * as React from "react";
import { Badge } from "../components/badge";
import { AgentIdleIcon, AgentRunningIcon, ErrorIcon, FlytrapIcon, SuccessIcon } from "../icons";
import { cn } from "../lib/utils";

export type AgentExecutionStatus = "idle" | "queued" | "running" | "completed" | "error";
const status = {
  idle: ["Idle", AgentIdleIcon, "text-muted-foreground"],
  queued: ["Queued", AgentIdleIcon, "text-warning"],
  running: ["Running", AgentRunningIcon, "text-success"],
  completed: ["Completed", SuccessIcon, "text-success"],
  error: ["Error", ErrorIcon, "text-destructive"],
} as const;

export function AgentStatusIndicator({ status: value, className }: { status: AgentExecutionStatus; className?: string }) {
  const [label, icon, color] = status[value];
  return <Badge className={cn("gap-1.5", color, className)} role="status" variant="outline">
    <FlytrapIcon className={cn(value === "running" && "animate-spin")} icon={icon} size="sm" />{label}
  </Badge>;
}
