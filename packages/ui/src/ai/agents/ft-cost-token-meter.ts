import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles } from "../../styles/tokens.js";

@customElement("ft-cost-token-meter")
export class FtCostTokenMeter extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.75rem;
      }

      .metric {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      .label {
        color: var(--muted-foreground, var(--neutral-600));
      }

      .value {
        font-weight: 600;
        font-family: var(--font-mono, "Roboto Mono", monospace);
        color: var(--foreground, var(--neutral-900));
      }

      .separator {
        width: 1px;
        height: 1rem;
        background: var(--border, var(--neutral-200));
      }
    `,
  ];

  @property({ type: Number }) inputTokens = 0;
  @property({ type: Number }) outputTokens = 0;
  @property({ type: Number }) cost = 0;
  @property() currency = "$";

  private _fmt(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
  }

  render() {
    return html`
      <div class="metric">
        <span class="label">In:</span>
        <span class="value">${this._fmt(this.inputTokens)}</span>
      </div>
      <div class="separator"></div>
      <div class="metric">
        <span class="label">Out:</span>
        <span class="value">${this._fmt(this.outputTokens)}</span>
      </div>
      ${this.cost > 0
        ? html`
            <div class="separator"></div>
            <div class="metric">
              <span class="label">Cost:</span>
              <span class="value">${this.currency}${this.cost.toFixed(4)}</span>
            </div>
          `
        : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-cost-token-meter": FtCostTokenMeter;
  }
}
