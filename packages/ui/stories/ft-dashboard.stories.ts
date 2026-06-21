import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "../src/ai/dashboards/ft-dashboard-shell.js";
import "../src/ai/dashboards/ft-kpi-stat-card.js";
import "../src/ai/dashboards/ft-ai-insight-callout.js";
import "../src/ai/dashboards/ft-filter-bar.js";
import "../src/charts/ft-chart.js";

const meta: Meta = {
  title: "AI/Dashboard",
  component: "ft-dashboard-shell",
};

export default meta;

export const FullDashboard: StoryObj = {
  render: () => html`
    <ft-dashboard-shell heading="Flytrap Analytics">
      <ft-filter-bar
        slot="filters"
        .filters=${[
          { id: "7d", label: "7 days" },
          { id: "30d", label: "30 days" },
          { id: "90d", label: "90 days" },
        ]}
      ></ft-filter-bar>

      <ft-kpi-stat-card label="Token Adoption" value="87%" .delta=${12} description="vs last month"></ft-kpi-stat-card>
      <ft-kpi-stat-card label="APCA Compliance" value="100%" .delta=${0} description="All pairs passing"></ft-kpi-stat-card>
      <ft-kpi-stat-card label="Components Used" value="23/58" .delta=${5} description="across 4 apps"></ft-kpi-stat-card>
      <ft-kpi-stat-card label="AI Queries" value="1.2K" .delta=${-3} description="this period"></ft-kpi-stat-card>

      <ft-chart
        slot="full"
        type="area"
        .data=${[
          { label: "Mon", value: 120 },
          { label: "Tue", value: 180 },
          { label: "Wed", value: 150 },
          { label: "Thu", value: 220 },
          { label: "Fri", value: 310 },
          { label: "Sat", value: 190 },
          { label: "Sun", value: 280 },
        ]}
      ></ft-chart>

      <ft-ai-insight-callout
        slot="full"
        title="Adoption Trend"
        icon="📈"
        severity="success"
      >
        Token adoption increased 12% this month. The biggest gain was in the dashboard app where 8 new components started using semantic tokens.
      </ft-ai-insight-callout>
    </ft-dashboard-shell>
  `,
};
