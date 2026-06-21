import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { FlytrapIcon, TrendDownIcon, TrendNeutralIcon, TrendUpIcon } from "../icons";
import { cn } from "../lib/utils";

export function KpiStatCard({ label, value, delta, description, className }: { label: string; value: string; delta?: number; description?: string; className?: string }) {
  const Icon = delta === 0 || delta === undefined ? TrendNeutralIcon : delta > 0 ? TrendUpIcon : TrendDownIcon;
  return <Card className={cn("bg-kpi-card-bg", className)}><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle></CardHeader><CardContent><div className="font-display text-3xl font-bold tracking-tight">{value}</div>{delta !== undefined && <div className={cn("mt-2 flex items-center gap-1 text-xs", delta > 0 ? "text-success" : delta < 0 ? "text-destructive" : "text-muted-foreground")}><FlytrapIcon icon={Icon} size="sm" />{Math.abs(delta)}% {description}</div>}</CardContent></Card>;
}
