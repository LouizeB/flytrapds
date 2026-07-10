import * as React from "react";
import { AgentStatusIndicator, type AgentExecutionStatus } from "./agent-status";
import { cn } from "../lib/utils";

export interface RunTraceStep {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  status: AgentExecutionStatus;
}

export function RunTraceTimeline({ steps, className }: { steps: RunTraceStep[]; className?: string }) {
  return <ol aria-label="Linha do tempo da execução" className={cn("grid gap-0", className)}>
    {steps.map(step => <li className="relative grid grid-cols-[1rem_1fr] gap-3 pb-5 last:pb-0" key={step.id}>
      <span aria-hidden="true" className="mt-2 size-2 rounded-full bg-primary ring-4 ring-primary/15 after:absolute after:bottom-0 after:left-[3px] after:top-4 after:w-px after:bg-border last:after:hidden" />
      <div className="grid gap-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-medium">{step.title}</span><AgentStatusIndicator status={step.status} /></div>
        {step.description && <p className="text-sm text-muted-foreground">{step.description}</p>}
        {step.duration && <span className="text-xs text-muted-foreground">{step.duration}</span>}
      </div>
    </li>)}
  </ol>;
}
