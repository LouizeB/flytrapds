import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { cn } from "../lib/utils";

export function KpiStatCard({ label, value, delta, description, className }: { label: string; value: string; delta?: number; description?: string; className?: string }) {
  const Icon = delta === 0 || delta === undefined ? Minus : delta > 0 ? ArrowUpRight : ArrowDownRight;
  return <Card className={cn("bg-kpi-card-bg", className)}><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle></CardHeader><CardContent><div className="font-display text-3xl font-bold tracking-tight">{value}</div>{delta !== undefined && <div className={cn("mt-2 flex items-center gap-1 text-xs", delta > 0 ? "text-success" : delta < 0 ? "text-destructive" : "text-muted-foreground")}><Icon className="size-3.5" />{Math.abs(delta)}% {description}</div>}</CardContent></Card>;
}
