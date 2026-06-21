import { FlytrapIcon, InsightIcon, WarningIcon } from "../icons";
import { cn } from "../lib/utils";

export function InsightCallout({ title, severity = "info", children, className }: { title: string; severity?: "info" | "warning" | "success"; children: React.ReactNode; className?: string }) {
  const Icon = severity === "warning" ? WarningIcon : InsightIcon;
  return <aside className={cn("rounded-xl border border-primary/20 bg-insight-bg p-5 text-insight-fg", severity === "warning" && "border-warning/30 bg-warning/10 text-foreground", severity === "success" && "border-success/30 bg-success/10 text-foreground", className)}>
    <div className="flex gap-3"><FlytrapIcon icon={Icon} size="lg" className="mt-0.5" /><div><h3 className="font-display font-semibold">{title}</h3><div className="mt-1 text-sm leading-6">{children}</div></div></div>
  </aside>;
}
