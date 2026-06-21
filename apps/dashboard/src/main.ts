import "@flytrap/ui";
import { html, render } from "lit";

const kpis = [
  { label: "Token Adoption", value: "87%", delta: 12, desc: "vs last month" },
  { label: "APCA Compliance", value: "100%", delta: 0, desc: "All pairs passing" },
  { label: "Components Used", value: "23/58", delta: 5, desc: "across 4 apps" },
  { label: "AI Queries", value: "1.2K", delta: -3, desc: "this period" },
];

const chartData = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 180 },
  { label: "Wed", value: 150 },
  { label: "Thu", value: 220 },
  { label: "Fri", value: 310 },
  { label: "Sat", value: 190 },
  { label: "Sun", value: 280 },
];

const pieData = [
  { label: "Button", value: 340 },
  { label: "Card", value: 220 },
  { label: "Input", value: 180 },
  { label: "Badge", value: 120 },
  { label: "Chart", value: 90 },
];

const models = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "claude-3.5", name: "Claude 3.5", provider: "Anthropic" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI" },
];

const app = html`
  <div style="display:flex;min-height:100vh">
    <!-- Sidebar -->
    <nav style="width:220px;background:var(--sidebar,var(--neutral-50));border-right:1px solid var(--sidebar-border,var(--neutral-200));padding:1.25rem;flex-shrink:0;display:flex;flex-direction:column;gap:0.25rem;position:sticky;top:0;height:100vh">
      <div style="font-family:'Fira Sans',sans-serif;font-size:1.125rem;font-weight:700;color:var(--sidebar-primary,#F10081);margin-bottom:1.25rem;padding:0 0.5rem">
        Flytrap
      </div>
      <a href="#dashboard" style="padding:0.5rem 0.75rem;border-radius:var(--radius,0.625rem);text-decoration:none;color:var(--sidebar-foreground);font-size:0.875rem;font-weight:500;background:var(--sidebar-accent,var(--neutral-100))">
        Dashboard
      </a>
      <a href="#playground" style="padding:0.5rem 0.75rem;border-radius:var(--radius,0.625rem);text-decoration:none;color:var(--sidebar-foreground);font-size:0.875rem;font-weight:500"
        onmouseover="this.style.background='var(--sidebar-accent,var(--neutral-100))'"
        onmouseout="this.style.background='transparent'"
      >
        AI Playground
      </a>
      <a href="#agents" style="padding:0.5rem 0.75rem;border-radius:var(--radius,0.625rem);text-decoration:none;color:var(--sidebar-foreground);font-size:0.875rem;font-weight:500"
        onmouseover="this.style.background='var(--sidebar-accent,var(--neutral-100))'"
        onmouseout="this.style.background='transparent'"
      >
        Agents
      </a>
      <div style="flex:1"></div>
      <ft-separator></ft-separator>
      <div style="padding:0.5rem;display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem">
        <ft-avatar size="sm" fallback="LM" alt="Louize"></ft-avatar>
        <span style="font-size:0.8125rem;font-weight:500">Louize</span>
      </div>
    </nav>

    <!-- Main -->
    <main style="flex:1;overflow-y:auto">
      <!-- Dashboard Section -->
      <section id="dashboard">
        <ft-dashboard-shell heading="Design System Analytics">
          <ft-filter-bar
            slot="filters"
            .filters=${[
              { id: "7d", label: "7 dias" },
              { id: "30d", label: "30 dias" },
              { id: "90d", label: "90 dias" },
            ]}
          ></ft-filter-bar>

          ${kpis.map(
            (k) => html`
              <ft-kpi-stat-card
                label=${k.label}
                value=${k.value}
                .delta=${k.delta}
                description=${k.desc}
              ></ft-kpi-stat-card>
            `
          )}

          <ft-card slot="full">
            <span slot="title">Component Usage (week)</span>
            <ft-chart type="area" .data=${chartData} .height=${280}></ft-chart>
          </ft-card>

          <ft-card slot="full">
            <span slot="title">Usage by Component</span>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-items:center">
              <ft-chart type="pie" .data=${pieData} .height=${220}></ft-chart>
              <div>
                ${pieData.map(
                  (p, i) => html`
                    <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.375rem">
                      <div style="width:12px;height:12px;border-radius:2px;background:var(--chart-${i + 1})"></div>
                      <span style="font-size:0.8125rem">${p.label}</span>
                      <span style="font-size:0.75rem;color:var(--muted-foreground);margin-left:auto">${p.value}</span>
                    </div>
                  `
                )}
              </div>
            </div>
          </ft-card>

          <ft-ai-insight-callout slot="full" title="Weekly Insight" icon="📈" severity="success">
            Token adoption grew 12% this week. The biggest gain was in the dashboard app, where 8 new components started
            using semantic tokens instead of hardcoded colors.
          </ft-ai-insight-callout>
        </ft-dashboard-shell>
      </section>

      <!-- AI Playground -->
      <section id="playground" style="padding:1.5rem">
        <h2 style="font-family:'Fira Sans',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:1rem">AI Playground</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;height:520px">
          <!-- Chat Panel -->
          <div style="border:1px solid var(--border,#E0D4D6);border-radius:var(--radius,0.625rem);overflow:hidden;display:flex;flex-direction:column">
            <div style="padding:0.75rem 1rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
              <span style="font-weight:600;font-size:0.875rem">Chat</span>
              <ft-model-selector .models=${models} value="gpt-4o"></ft-model-selector>
            </div>
            <ft-chat-thread style="flex:1">
              <ft-message-bubble role="user">
                What is the APCA contrast of magenta-500 on neutral-50?
              </ft-message-bubble>
              <ft-message-bubble role="assistant">
                The APCA Lc value of #F10081 (magenta-500) on #FFF4F5 (neutral-50) is approximately 52.
                This passes for UI elements (min 45) but fails for body text (min 75).
                <ft-citation-chip .index=${1} label="APCA gate script" href="#"></ft-citation-chip>
              </ft-message-bubble>
              <ft-message-bubble role="user">
                Suggest a fix for body text
              </ft-message-bubble>
              <ft-message-bubble role="assistant" streaming>
                For body text on neutral-50, use magenta-700 (#AD0057) which gives Lc ≈ 78...
              </ft-message-bubble>
              <ft-prompt-input
                slot="input"
                placeholder="Ask about tokens, components, accessibility..."
                .suggestions=${["Show color scale", "Check APCA compliance", "List AI tokens"]}
              ></ft-prompt-input>
            </ft-chat-thread>
          </div>

          <!-- Agent Panel -->
          <div style="display:flex;flex-direction:column;gap:0.75rem;overflow-y:auto">
            <h3 style="font-size:1rem;font-weight:600">Active Agents</h3>
            <ft-agent-card name="Token Validator" icon="🔍" status="running" model="gpt-4o" tokens="2.3K">
              Validating APCA contrast for 66 primitive pairs...
            </ft-agent-card>

            <ft-reasoning-stream streaming>
              Checking magenta-500 (#F10081) on neutral-50 (#FFF4F5). Computing APCA Lc...
              The sRGB → Y conversion gives Y_text ≈ 0.123, Y_bg ≈ 0.932.
            </ft-reasoning-stream>

            <ft-tool-call-block name="apca_check" duration="45ms">
              {"fg":"#F10081","bg":"#FFF4F5","Lc":52.1,"role":"body","min":75,"pass":false}
            </ft-tool-call-block>

            <ft-tool-call-block name="suggest_alternative" duration="120ms">
              {"current":"magenta-500","suggested":"magenta-700","newLc":78.3,"pass":true}
            </ft-tool-call-block>

            <ft-cost-token-meter .inputTokens=${8400} .outputTokens=${3200} .cost=${0.0068}></ft-cost-token-meter>

            <ft-ai-insight-callout title="Contrast Alert" icon="⚠️" severity="warning">
              2 of 66 primitive pairs fail APCA body-text threshold (Lc &lt; 75).
              Run <code>pnpm apca</code> for the full report.
            </ft-ai-insight-callout>
          </div>
        </div>
      </section>

      <!-- Agents Section -->
      <section id="agents" style="padding:1.5rem">
        <h2 style="font-family:'Fira Sans',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:1rem">Agent Overview</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem">
          <ft-agent-card name="Token Validator" icon="🔍" status="completed" model="gpt-4o" tokens="4.1K">
            Validated all 66 primitive color pairs across light/dark modes.
          </ft-agent-card>
          <ft-agent-card name="Migration Agent" icon="🔄" status="idle" model="claude-3.5" tokens="0">
            Ready to migrate components from hardcoded values to semantic tokens.
          </ft-agent-card>
          <ft-agent-card name="Accessibility Auditor" icon="♿" status="running" model="gpt-4o" tokens="1.8K">
            Scanning component tree for ARIA compliance issues...
          </ft-agent-card>
          <ft-agent-card name="Doc Generator" icon="📝" status="error" model="gpt-4o-mini" tokens="320">
            Failed: missing JSDoc annotations in ft-chart component.
          </ft-agent-card>
        </div>
      </section>
    </main>
  </div>
`;

render(app, document.getElementById("app")!);
