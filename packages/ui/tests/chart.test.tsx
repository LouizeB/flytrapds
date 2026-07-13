import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Chart } from "../src";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  AreaChart: ({ children }: { children: React.ReactNode }) => <div data-testid="area-chart">{children}</div>,
  BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
  CartesianGrid: () => null,
  Legend: () => null,
  Line: () => null,
  Area: () => null,
  Bar: () => null,
  XAxis: () => null,
  YAxis: ({ tickFormatter }: { tickFormatter: (value: number) => string }) => <span>{tickFormatter(7)}</span>,
  Tooltip: ({ formatter }: { formatter: (value: number) => string }) => <span>{formatter(8)}</span>,
}));

const data = [
  { period: "Jan", value: 42 },
  { period: "Fev", value: 64 },
];
const series = [{ key: "value", label: "Adoção" }];

describe("Chart", () => {
  it("oferece tabela equivalente aos dados visuais", () => {
    render(<Chart data={data} description="Últimos meses" series={series} title="Adoção" valueFormatter={value => `${value}%`} xKey="period" />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "42%" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "64%" })).toBeInTheDocument();
    expect(screen.getByText("Últimos meses")).toBeVisible();
    expect(screen.getByText("8%")).toBeInTheDocument();
  });

  it.each(["line", "area", "bar"] as const)("renderiza a visualização %s", type => {
    render(<Chart data={[{ period: "Jan", secondary: 2, value: "n/a" }]} series={[{ color: "rebeccapurple", key: "value", label: "Valor" }, { key: "secondary", label: "Secundária" }]} title="Série" type={type} xKey="period" />);
    expect(screen.getByTestId(`${type}-chart`)).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "n/a" })).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it.each([
    ["loading", "Loading chart"],
    ["empty", "No data"],
    ["error", "Chart error"],
  ] as const)("representa o estado %s", (state, text) => {
    render(<Chart data={[]} emptyMessage="Nada encontrado" errorMessage="Falha customizada" series={series} state={state} title="Adoção" xKey="period" />);
    expect(state === "loading" ? screen.getByLabelText(text) : screen.getByText(text)).toBeTruthy();
    if (state === "empty") expect(screen.getByText("Nada encontrado")).toBeVisible();
    if (state === "error") expect(screen.getByText("Falha customizada")).toBeVisible();
  });
});
