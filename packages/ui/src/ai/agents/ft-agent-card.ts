import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../../styles/tokens.js";

@customElement("ft-agent-card")
export class FtAgentCard extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }

      .agent-card {
        border-radius: var(--radius, 0.625rem);
        border: 1px solid var(--agent-card-border, var(--border, var(--neutral-200)));
        background: var(--agent-card-bg, var(--ai-agent-bg, var(--magenta-100)));
        color: var(--agent-card-fg, var(--ai-agent-fg, var(--magenta-700)));
        padding: 1rem 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
      }

      .identity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        min-width: 0;
      }

      .icon {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        flex-shrink: 0;
        background: color-mix(in srgb, currentColor 15%, transparent);
      }

      .name {
        font-weight: 600;
        font-size: 0.9375rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .status-dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        flex-shrink: 0;
      }

      :host([status="running"]) .status-dot { background: var(--agent-status-run, var(--success)); }
      :host([status="error"]) .status-dot { background: var(--agent-status-error, var(--error)); }
      :host([status="idle"]) .status-dot { background: var(--muted-foreground, var(--neutral-600)); }
      :host([status="completed"]) .status-dot { background: var(--agent-status-run, var(--success)); }

      .status-label {
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: capitalize;
      }

      .body {
        font-size: 0.875rem;
        line-height: 1.5;
      }

      .footer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .meta {
        font-size: 0.75rem;
        opacity: 0.75;
      }

      @container (max-width: 360px) {
        .agent-card { padding: 0.75rem; }
        .name { font-size: 0.8125rem; }
      }
    `,
  ];

  @property() name = "Agent";
  @property() icon = "🤖";
  @property({ reflect: true }) status: "running" | "idle" | "error" | "completed" = "idle";
  @property() model = "";
  @property() tokens = "";

  render() {
    return html`
      <div class="agent-card" part="card">
        <div class="header" part="header">
          <div class="identity">
            <span class="icon" part="icon">${this.icon}</span>
            <span class="name" part="name">${this.name}</span>
          </div>
          <div class="identity">
            <span class="status-dot"></span>
            <span class="status-label">${this.status}</span>
          </div>
        </div>
        <div class="body" part="body">
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          ${this.model ? html`<span class="meta">Model: ${this.model}</span>` : null}
          ${this.tokens ? html`<span class="meta">Tokens: ${this.tokens}</span>` : null}
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-agent-card": FtAgentCard;
  }
}
