import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "../src/ai/agents/ft-agent-card.js";
import "../src/ai/agents/ft-tool-call-block.js";
import "../src/ai/agents/ft-reasoning-stream.js";
import "../src/ai/agents/ft-cost-token-meter.js";

const meta: Meta = {
  title: "AI/Agent",
  component: "ft-agent-card",
};

export default meta;

export const AgentCard: StoryObj = {
  render: () => html`
    <div style="max-width:420px;display:flex;flex-direction:column;gap:1rem">
      <ft-agent-card name="Token Validator" icon="🔍" status="running" model="gpt-4o" tokens="2.3K">
        Checking APCA contrast ratios for the latest token update...
      </ft-agent-card>

      <ft-agent-card name="Migration Agent" icon="🔄" status="completed" model="claude-3.5" tokens="890">
        Successfully migrated 12 components to semantic tokens.
      </ft-agent-card>

      <ft-agent-card name="Error Reporter" icon="⚠️" status="error" model="gpt-4o-mini" tokens="450">
        Failed to validate color scale: missing neutral-950 in brand "acme".
      </ft-agent-card>
    </div>
  `,
};

export const ToolCalls: StoryObj = {
  render: () => html`
    <div style="max-width:480px;display:flex;flex-direction:column;gap:0.5rem">
      <ft-tool-call-block name="apca_check" duration="120ms">
        {"text":"#FFFFFF","bg":"#F10081","Lc":72.4,"role":"ui","pass":true}
      </ft-tool-call-block>
      <ft-tool-call-block name="fetch_tokens" duration="340ms">
        {"brand":"flytrap","scales":["magenta","acid","neutral"],"total":66}
      </ft-tool-call-block>
    </div>
  `,
};

export const Reasoning: StoryObj = {
  render: () => html`
    <div style="max-width:480px">
      <ft-reasoning-stream streaming>
        The user wants to check if magenta-500 on neutral-50 passes APCA for body text.
        Body text requires Lc >= 75. Let me compute the contrast...
      </ft-reasoning-stream>
    </div>
  `,
};

export const TokenMeter: StoryObj = {
  render: () => html`
    <ft-cost-token-meter .inputTokens=${4200} .outputTokens=${1850} .cost=${0.0034}></ft-cost-token-meter>
  `,
};
