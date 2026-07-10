import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { AgentRunningIcon, ChevronDownIcon, ErrorIcon, FlytrapIcon, SuccessIcon, ToolIcon } from "../icons";
import { cn } from "../lib/utils";

export type ToolCallStatus = "pending" | "running" | "success" | "error";
export interface ToolCallBlockProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {
  name: string;
  status: ToolCallStatus;
  input?: React.ReactNode;
  output?: React.ReactNode;
  duration?: string;
  errorMessage?: string;
}
const toolStatus = {
  pending: { label: "Pendente", icon: ToolIcon, className: "text-muted-foreground" },
  running: { label: "Executando", icon: AgentRunningIcon, className: "text-primary" },
  success: { label: "Concluída", icon: SuccessIcon, className: "text-success" },
  error: { label: "Falhou", icon: ErrorIcon, className: "text-destructive" },
} as const;

export function ToolCallBlock({ name, status, input, output, duration, errorMessage, className, defaultOpen = false, ...props }: ToolCallBlockProps) {
  const meta = toolStatus[status];
  return <CollapsiblePrimitive.Root className={cn("overflow-hidden rounded-xl border bg-card text-card-foreground", className)} data-slot="tool-call-block" defaultOpen={defaultOpen} {...props}>
    <CollapsiblePrimitive.Trigger className="group flex min-h-12 w-full items-center gap-3 px-4 text-left outline-none hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
      <FlytrapIcon icon={ToolIcon} />
      <span className="min-w-0 flex-1 truncate font-mono text-sm font-medium">{name}</span>
      {duration && <span className="text-xs text-muted-foreground">{duration}</span>}
      <span className={cn("inline-flex items-center gap-1 text-xs font-medium", meta.className)}><FlytrapIcon className={cn(status === "running" && "animate-spin motion-reduce:animate-none")} icon={meta.icon} size="sm" />{meta.label}</span>
      <FlytrapIcon className="transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none" icon={ChevronDownIcon} size="sm" />
    </CollapsiblePrimitive.Trigger>
    <CollapsiblePrimitive.Content className="border-t">
      {input !== undefined && <section className="grid gap-2 p-4"><h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Entrada</h4><div className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-5">{input}</div></section>}
      {output !== undefined && <section className="grid gap-2 border-t p-4"><h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Saída</h4><div className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-5">{output}</div></section>}
      {status === "error" && <p className="border-t bg-destructive/10 p-4 text-sm text-destructive" role="alert">{errorMessage ?? "A ferramenta falhou sem expor detalhes sensíveis."}</p>}
    </CollapsiblePrimitive.Content>
  </CollapsiblePrimitive.Root>;
}
