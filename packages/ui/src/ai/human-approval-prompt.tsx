import * as React from "react";
import { ApprovalIcon, ErrorIcon, FlytrapIcon, SuccessIcon, WarningIcon } from "../icons";
import { cn } from "../lib/utils";
import { Button } from "../components/button";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "expired";
export interface HumanApprovalPromptProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  status?: ApprovalStatus;
  details?: React.ReactNode;
  expiresAt?: string;
  onApprove?: () => void;
  onReject?: () => void;
  pending?: boolean;
}
const approvalMeta = {
  pending: { label: "Aguardando decisão", icon: ApprovalIcon, className: "text-warning" },
  approved: { label: "Aprovado", icon: SuccessIcon, className: "text-success" },
  rejected: { label: "Rejeitado", icon: ErrorIcon, className: "text-destructive" },
  expired: { label: "Expirado", icon: WarningIcon, className: "text-muted-foreground" },
} as const;

export function HumanApprovalPrompt({ title, description, status = "pending", details, expiresAt, onApprove, onReject, pending = false, className, ...props }: HumanApprovalPromptProps) {
  const meta = approvalMeta[status];
  const titleId = React.useId();
  const descriptionId = React.useId();
  return <section aria-describedby={descriptionId} aria-labelledby={titleId} className={cn("grid gap-4 rounded-xl border border-warning/40 bg-card p-5 text-card-foreground", className)} data-slot="human-approval-prompt" data-status={status} {...props}>
    <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-warning/10"><FlytrapIcon icon={ApprovalIcon} /></span><div className="min-w-0 flex-1"><h3 className="font-display font-semibold" id={titleId}>{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground" id={descriptionId}>{description}</p></div></div>
    {details && <div className="rounded-lg bg-muted p-3 text-sm leading-6">{details}</div>}
    <div className="flex flex-wrap items-center gap-2">
      <span aria-live="polite" className={cn("inline-flex items-center gap-1.5 text-xs font-medium", meta.className)}><FlytrapIcon icon={meta.icon} size="sm" />{meta.label}</span>
      {expiresAt && status === "pending" && <span className="text-xs text-muted-foreground">Expira {expiresAt}</span>}
      {status === "pending" && <div className="ml-auto flex gap-2"><Button disabled={pending} onClick={onReject} size="sm" variant="outline">Rejeitar</Button><Button loading={pending} loadingAnnouncement="Aplicando aprovação" onClick={onApprove} size="sm">Aprovar</Button></div>}
    </div>
  </section>;
}
