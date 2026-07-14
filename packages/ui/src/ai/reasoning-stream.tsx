import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { AgentRunningIcon, ChevronDownIcon, ErrorIcon, FlytrapIcon, InsightIcon, SuccessIcon } from "../icons";
import { cn } from "../lib/utils";

export type ReasoningStreamStatus = "streaming" | "completed" | "interrupted";
export interface ReasoningStreamProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {
  status: ReasoningStreamStatus;
  title?: string;
  summary: React.ReactNode;
}
const reasoningStatus = {
  streaming: { label: "Analyzing", icon: AgentRunningIcon, className: "text-primary" },
  completed: { label: "Analysis complete", icon: SuccessIcon, className: "text-success" },
  interrupted: { label: "Analysis interrupted", icon: ErrorIcon, className: "text-destructive" },
} as const;

export function ReasoningStream({ status, title = "Analysis summary", summary, className, defaultOpen = false, ...props }: ReasoningStreamProps) {
  const meta = reasoningStatus[status];
  return <CollapsiblePrimitive.Root className={cn("overflow-hidden rounded-xl border bg-card text-card-foreground", className)} data-slot="reasoning-stream" data-status={status} defaultOpen={defaultOpen} {...props}>
    <CollapsiblePrimitive.Trigger className="group flex min-h-12 w-full items-center gap-3 px-4 text-left outline-none hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
      <FlytrapIcon icon={InsightIcon} />
      <span className="min-w-0 flex-1 truncate text-sm font-medium">{title}</span>
      <span aria-live="polite" className={cn("inline-flex items-center gap-1 text-xs font-medium", meta.className)} role="status"><FlytrapIcon className={cn(status === "streaming" && "animate-spin motion-reduce:animate-none")} icon={meta.icon} size="sm" />{meta.label}</span>
      <FlytrapIcon className="transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none" icon={ChevronDownIcon} size="sm" />
    </CollapsiblePrimitive.Trigger>
    <CollapsiblePrimitive.Content className="border-t p-4 text-sm leading-6 text-muted-foreground">
      {summary}
      <p className="mt-3 text-xs">Operational summary; it does not expose hidden chain-of-thought or private model content.</p>
    </CollapsiblePrimitive.Content>
  </CollapsiblePrimitive.Root>;
}
