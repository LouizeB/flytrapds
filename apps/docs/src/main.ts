import "@flytrap/ui";
import { html, render } from "lit";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "tokens", label: "Tokens" },
  { id: "components", label: "Components" },
  { id: "charts", label: "Charts" },
  { id: "ai", label: "AI Layer" },
];

const colorScales = ["magenta", "acid", "neutral", "success", "warning", "error"] as const;
const steps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

function renderColorScale(scale: string) {
  return html`
    <div style="margin-bottom:1.5rem">
      <h4 style="font-size:0.875rem;font-weight:600;margin-bottom:0.5rem;text-transform:capitalize">${scale}</h4>
      <div style="display:flex;gap:2px;border-radius:0.625rem;overflow:hidden">
        ${steps.map(
          (step) => html`
            <ft-tooltip text="${scale}-${step}">
              <div style="width:44px;height:44px;background:var(--${scale}-${step})"></div>
            </ft-tooltip>
          `
        )}
      </div>
    </div>
  `;
}

const app = html`
  <div style="display:flex;min-height:100vh">
    <!-- Sidebar -->
    <nav style="width:240px;border-right:1px solid var(--border,#E0D4D6);padding:1.5rem;flex-shrink:0;position:sticky;top:0;height:100vh;overflow-y:auto">
      <div style="font-family:'Fira Sans',sans-serif;font-size:1.25rem;font-weight:700;color:var(--primary,#F10081);margin-bottom:1.5rem">
        Flytrap DS
      </div>
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        ${sections.map(
          (s) => html`
            <a href="#${s.id}" style="padding:0.375rem 0.75rem;border-radius:var(--radius,0.625rem);text-decoration:none;color:var(--foreground);font-size:0.875rem;font-weight:500;transition:background 120ms"
              onmouseover="this.style.background='var(--accent,#FFEEF6)'"
              onmouseout="this.style.background='transparent'"
            >${s.label}</a>
          `
        )}
      </div>
      <ft-separator style="margin:1.5rem 0"></ft-separator>
      <div style="font-size:0.75rem;color:var(--muted-foreground)">v0.1.0 — Web Components</div>
    </nav>

    <!-- Main content -->
    <main style="flex:1;max-width:56rem;padding:2rem 3rem">
      <!-- Overview -->
      <section id="overview" style="margin-bottom:3rem">
        <h1 style="font-family:'Fira Sans',sans-serif;font-size:2rem;font-weight:700;margin-bottom:0.5rem">Flytrap Design System</h1>
        <p style="font-size:1.125rem;color:var(--muted-foreground);margin-bottom:1.5rem">
          Multibrand, AI-first Web Components built on Lit. Framework-agnostic, responsive, accessible.
        </p>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.5rem">
          <ft-badge>Web Components</ft-badge>
          <ft-badge variant="secondary">Lit 3</ft-badge>
          <ft-badge variant="outline">APCA Gate</ft-badge>
          <ft-badge variant="success">Multibrand</ft-badge>
        </div>
        <ft-card>
          <span slot="title">Quick Start</span>
          <span slot="description">Install and use Flytrap components in any project</span>
          <pre style="background:var(--muted);padding:1rem;border-radius:calc(var(--radius) - 2px);font-family:'Roboto Mono',monospace;font-size:0.8125rem;overflow-x:auto"><code>npm install @flytrap/ui @flytrap/tokens

// In your HTML:
&lt;script type="module"&gt;
  import "@flytrap/ui";
&lt;/script&gt;
&lt;link rel="stylesheet" href="@flytrap/tokens/css" /&gt;

&lt;ft-button variant="default"&gt;Get Started&lt;/ft-button&gt;</code></pre>
        </ft-card>
      </section>

      <!-- Tokens -->
      <section id="tokens" style="margin-bottom:3rem">
        <h2 style="font-family:'Fira Sans',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:1rem">Color Scale (HCT 50–950)</h2>
        ${colorScales.map(renderColorScale)}

        <h3 style="font-size:1.125rem;font-weight:600;margin:1.5rem 0 0.75rem">Architecture</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem">
          <ft-card>
            <span slot="title">Layer 1: Primitive</span>
            <code style="font-size:0.8125rem">--magenta-500</code> — raw HCT values. Never consumed by components directly.
          </ft-card>
          <ft-card>
            <span slot="title">Layer 2: Semantic</span>
            <code style="font-size:0.8125rem">--primary</code>, <code>--background</code> — shadcn contract. Brand/mode/theme switch here.
          </ft-card>
          <ft-card>
            <span slot="title">Layer 3: Component</span>
            <code style="font-size:0.8125rem">--button-primary-bg</code> — component-specific decisions referencing semantic tokens.
          </ft-card>
        </div>
      </section>

      <!-- Components -->
      <section id="components" style="margin-bottom:3rem">
        <h2 style="font-family:'Fira Sans',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:1rem">Components</h2>

        <h3 style="font-size:1.125rem;font-weight:600;margin-bottom:0.75rem">Buttons</h3>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.5rem;align-items:center">
          <ft-button variant="default">Default</ft-button>
          <ft-button variant="outline">Outline</ft-button>
          <ft-button variant="secondary">Secondary</ft-button>
          <ft-button variant="destructive">Destructive</ft-button>
          <ft-button variant="ghost">Ghost</ft-button>
          <ft-button variant="link">Link</ft-button>
          <ft-button disabled>Disabled</ft-button>
        </div>

        <h3 style="font-size:1.125rem;font-weight:600;margin-bottom:0.75rem">Inputs</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem">
          <ft-input label="Email" placeholder="you@example.com" type="email"></ft-input>
          <ft-input label="Password" placeholder="Enter password" type="password"></ft-input>
          <ft-input label="With help" placeholder="Type here..." help="This is helper text"></ft-input>
          <ft-input label="Error state" placeholder="Invalid" invalid help="This field is required"></ft-input>
        </div>

        <h3 style="font-size:1.125rem;font-weight:600;margin-bottom:0.75rem">Other</h3>
        <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;margin-bottom:1.5rem">
          <ft-avatar alt="Louize" fallback="LM"></ft-avatar>
          <ft-avatar size="lg" alt="DS" fallback="DS"></ft-avatar>
          <ft-switch label="Dark mode"></ft-switch>
          <ft-progress value="67" max="100" label="Adoption" style="width:200px"></ft-progress>
        </div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.5rem">
          <ft-badge>Default</ft-badge>
          <ft-badge variant="secondary">Secondary</ft-badge>
          <ft-badge variant="outline">Outline</ft-badge>
          <ft-badge variant="success">Success</ft-badge>
          <ft-badge variant="warning">Warning</ft-badge>
          <ft-badge variant="error">Error</ft-badge>
        </div>
        <ft-skeleton width="100%" height="1rem" style="margin-bottom:0.5rem"></ft-skeleton>
        <ft-skeleton width="75%" height="1rem" style="margin-bottom:0.5rem"></ft-skeleton>
        <ft-skeleton width="50%" height="1rem"></ft-skeleton>
      </section>

      <!-- Charts -->
      <section id="charts" style="margin-bottom:3rem">
        <h2 style="font-family:'Fira Sans',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:1rem">Charts</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <ft-card>
            <span slot="title">Bar Chart</span>
            <ft-chart type="bar" .data=${[
              { label: "Jan", value: 120 }, { label: "Feb", value: 180 },
              { label: "Mar", value: 150 }, { label: "Apr", value: 220 },
              { label: "May", value: 310 }, { label: "Jun", value: 280 },
            ]}></ft-chart>
          </ft-card>
          <ft-card>
            <span slot="title">Area Chart</span>
            <ft-chart type="area" .data=${[
              { label: "Mon", value: 40 }, { label: "Tue", value: 65 },
              { label: "Wed", value: 55 }, { label: "Thu", value: 80 },
              { label: "Fri", value: 95 }, { label: "Sat", value: 70 },
            ]}></ft-chart>
          </ft-card>
          <ft-card>
            <span slot="title">Line Chart</span>
            <ft-chart type="line" .data=${[
              { label: "Q1", value: 200 }, { label: "Q2", value: 350 },
              { label: "Q3", value: 280 }, { label: "Q4", value: 420 },
            ]}></ft-chart>
          </ft-card>
          <ft-card>
            <span slot="title">Pie Chart</span>
            <ft-chart type="pie" .data=${[
              { label: "Magenta", value: 40 }, { label: "Acid", value: 25 },
              { label: "Neutral", value: 20 }, { label: "Success", value: 15 },
            ]}></ft-chart>
          </ft-card>
        </div>
      </section>

      <!-- AI Layer -->
      <section id="ai" style="margin-bottom:3rem">
        <h2 style="font-family:'Fira Sans',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:1rem">AI Layer</h2>

        <h3 style="font-size:1.125rem;font-weight:600;margin-bottom:0.75rem">Agent Cards</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem">
          <ft-agent-card name="Token Validator" icon="🔍" status="running" model="gpt-4o" tokens="2.3K">
            Checking APCA contrast ratios...
          </ft-agent-card>
          <ft-agent-card name="Migration Agent" icon="🔄" status="completed" model="claude-3.5" tokens="890">
            Migrated 12 components.
          </ft-agent-card>
        </div>

        <h3 style="font-size:1.125rem;font-weight:600;margin-bottom:0.75rem">Tool Calls & Reasoning</h3>
        <div style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.5rem">
          <ft-tool-call-block name="apca_check" duration="120ms">
            {"text":"#FFFFFF","bg":"#F10081","Lc":72.4,"pass":true}
          </ft-tool-call-block>
          <ft-reasoning-stream streaming>
            Analyzing contrast between magenta-500 and neutral-50...
          </ft-reasoning-stream>
          <ft-cost-token-meter .inputTokens=${4200} .outputTokens=${1850} .cost=${0.0034}></ft-cost-token-meter>
        </div>

        <h3 style="font-size:1.125rem;font-weight:600;margin-bottom:0.75rem">KPI Cards</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem">
          <ft-kpi-stat-card label="Token Adoption" value="87%" .delta=${12}></ft-kpi-stat-card>
          <ft-kpi-stat-card label="APCA Compliance" value="100%" .delta=${0}></ft-kpi-stat-card>
          <ft-kpi-stat-card label="Components" value="23" .delta=${-2}></ft-kpi-stat-card>
        </div>

        <ft-ai-insight-callout title="Design Insight" icon="💡">
          The acid-300 on neutral-50 combination passes APCA for large text (Lc 58) but fails for body text (requires Lc 75).
          Consider using acid-400 or darker for body text on light backgrounds.
        </ft-ai-insight-callout>
      </section>
    </main>
  </div>
`;

render(app, document.getElementById("app")!);
