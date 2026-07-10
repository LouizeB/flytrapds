import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "../components/alert";
import { EmptyState } from "../components/empty-state";
import { Skeleton } from "../components/skeleton";
import { ChartIcon } from "../icons";
import { cn } from "../lib/utils";

export type ChartType = "line" | "area" | "bar";
export type ChartState = "ready" | "loading" | "empty" | "error";
export type ChartDatum = Record<string, string | number>;
export interface ChartSeries {
  key: string;
  label: string;
  color?: string;
}
export interface ChartProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  data: ChartDatum[];
  series: ChartSeries[];
  xKey: string;
  type?: ChartType;
  state?: ChartState;
  height?: number;
  valueFormatter?: (value: number) => string;
  emptyMessage?: string;
  errorMessage?: string;
}

const defaultColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export function Chart({
  title,
  description,
  data,
  series,
  xKey,
  type = "line",
  state = "ready",
  height = 280,
  valueFormatter = value => String(value),
  emptyMessage = "Não há dados para exibir.",
  errorMessage = "Não foi possível carregar os dados.",
  className,
  ...props
}: ChartProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const commonChartProps = { data, accessibilityLayer: true };
  const axes = <>
    <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
    <XAxis axisLine={false} dataKey={xKey} fontSize={12} stroke="var(--chart-axis)" tickLine={false} />
    <YAxis axisLine={false} fontSize={12} stroke="var(--chart-axis)" tickFormatter={valueFormatter} tickLine={false} width={48} />
    <Tooltip contentStyle={{ background: "var(--chart-tooltip-bg)", border: "1px solid var(--chart-tooltip-border)", borderRadius: "var(--chart-radius)", color: "var(--chart-tooltip-fg)" }} formatter={(value) => valueFormatter(Number(value))} />
    <Legend />
  </>;

  const visualization = type === "bar"
    ? <BarChart {...commonChartProps}>{axes}{series.map((item, index) => <Bar dataKey={item.key} fill={item.color ?? defaultColors[index % defaultColors.length]} key={item.key} name={item.label} radius={[4, 4, 0, 0]} />)}</BarChart>
    : type === "area"
      ? <AreaChart {...commonChartProps}>{axes}{series.map((item, index) => <Area dataKey={item.key} fill={item.color ?? defaultColors[index % defaultColors.length]} fillOpacity={0.16} key={item.key} name={item.label} stroke={item.color ?? defaultColors[index % defaultColors.length]} strokeWidth={2} type="monotone" />)}</AreaChart>
      : <LineChart {...commonChartProps}>{axes}{series.map((item, index) => <Line activeDot={{ r: 5 }} dataKey={item.key} dot={false} key={item.key} name={item.label} stroke={item.color ?? defaultColors[index % defaultColors.length]} strokeWidth={2} type="monotone" />)}</LineChart>;

  return <section aria-describedby={description ? descriptionId : undefined} aria-labelledby={titleId} className={cn("grid gap-4 rounded-xl border bg-card p-5 text-card-foreground", className)} data-slot="chart" data-state={state} {...props}>
    <header><h3 className="font-display text-lg font-semibold" id={titleId}>{title}</h3>{description && <p className="mt-1 text-sm text-muted-foreground" id={descriptionId}>{description}</p>}</header>
    {state === "loading" && <div aria-label="Carregando gráfico" className="grid gap-3" style={{ height }}><Skeleton className="h-full w-full" /></div>}
    {state === "empty" && <EmptyState className="border-0" description={emptyMessage} icon={ChartIcon} title="Sem dados" />}
    {state === "error" && <Alert variant="error"><AlertTitle>Erro no gráfico</AlertTitle><AlertDescription>{errorMessage}</AlertDescription></Alert>}
    {state === "ready" && <>
      <div aria-hidden="true" style={{ height }}><ResponsiveContainer height="100%" minWidth={1} width="100%">{visualization}</ResponsiveContainer></div>
      <details className="rounded-lg border"><summary className="cursor-pointer px-3 py-2 text-sm font-medium">Tabela de dados</summary><div className="overflow-x-auto border-t"><table className="w-full text-left text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-3 py-2">{xKey}</th>{series.map(item => <th className="px-3 py-2" key={item.key}>{item.label}</th>)}</tr></thead><tbody>{data.map((datum, index) => <tr className="border-b last:border-0" key={`${String(datum[xKey])}-${index}`}><th className="px-3 py-2 font-medium">{datum[xKey]}</th>{series.map(item => <td className="px-3 py-2" key={item.key}>{typeof datum[item.key] === "number" ? valueFormatter(datum[item.key] as number) : datum[item.key]}</td>)}</tr>)}</tbody></table></div></details>
    </>}
  </section>;
}
