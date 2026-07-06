import { Badge } from "../components/badge";
import { AiAvatar } from "../components/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { AgentIdleIcon, AgentRunningIcon, ErrorIcon, FlytrapIcon, SuccessIcon, type FlytrapIconComponent } from "../icons";
import { cn } from "../lib/utils";

export type AgentStatus = "idle" | "running" | "completed" | "error";

const statusMeta = {
  idle: { label: "Idle", icon: AgentIdleIcon, className: "text-muted-foreground" },
  running: { label: "Running", icon: AgentRunningIcon, className: "text-success" },
  completed: { label: "Completed", icon: SuccessIcon, className: "text-success" },
  error: { label: "Error", icon: ErrorIcon, className: "text-destructive" }
} satisfies Record<AgentStatus, { label: string; icon: FlytrapIconComponent; className: string }>;

export function AgentCard({ name, status, model, tokens, children, className }: { name: string; status: AgentStatus; model?: string; tokens?: string; children?: React.ReactNode; className?: string }) {
  const meta = statusMeta[status];
  const StatusIcon = meta.icon;
  return <Card className={cn("border-agent-card-border bg-agent-card-bg text-agent-card-fg", className)}>
    <CardHeader className="flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-3"><AiAvatar size="sm" status={status === "running" ? "processing" : status === "error" ? "offline" : "online"} /><CardTitle>{name}</CardTitle></div>
      <Badge variant="outline" className={cn("gap-1 bg-background/60", meta.className)}><FlytrapIcon icon={StatusIcon} size="sm" className={cn(status === "running" && "animate-spin")} />{meta.label}</Badge>
    </CardHeader>
    <CardContent className="grid gap-4"><div className="text-sm leading-6">{children}</div>{(model || tokens) && <div className="flex gap-4 text-xs text-muted-foreground">{model && <span>{model}</span>}{tokens && <span>{tokens} tokens</span>}</div>}</CardContent>
  </Card>;
}
