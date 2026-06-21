import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../../styles/tokens.js";

@customElement("ft-kpi-stat-card")
export class FtKpiStatCard extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }

      .kpi {
        border-radius: var(--radius, 0.625rem);
        border: 1px solid var(--border, var(--neutral-200));
        background: var(--kpi-card-bg, var(--card, var(--neutral-50)));
        color: var(--card-foreground, var(--neutral-900));
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .label {
        font-size: 0.8125rem;
        color: var(--muted-foreground, var(--neutral-600));
        font-weight: 500;
      }

      .value-row {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
      }

      .value {
        font-size: 1.75rem;
        font-weight: 700;
        font-family: var(--font-display, "Fira Sans", sans-serif);
        line-height: 1.2;
      }

      .delta {
        font-size: 0.8125rem;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 0.125rem;
      }

      .delta[data-dir="up"] { color: var(--kpi-delta-up, var(--success)); }
      .delta[data-dir="down"] { color: var(--kpi-delta-down, var(--error)); }

      .description {
        font-size: 0.75rem;
        color: var(--muted-foreground, var(--neutral-600));
        margin-top: 0.25rem;
      }

      .sparkline {
        margin-top: 0.5rem;
      }

      @container (max-width: 200px) {
        .value { font-size: 1.25rem; }
        .kpi { padding: 0.75rem; }
      }
    `,
  ];

  @property() label = "";
  @property() value = "";
  @property({ type: Number }) delta = 0;
  @property() description = "";

  render() {
    const dir = this.delta > 0 ? "up" : this.delta < 0 ? "down" : null;
    const arrow = dir === "up" ? "↑" : dir === "down" ? "↓" : "";
    return html`
      <div class="kpi" part="kpi">
        <span class="label" part="label">${this.label}</span>
        <div class="value-row">
          <span class="value" part="value">${this.value}</span>
          ${dir
            ? html`<span class="delta" data-dir=${dir}>${arrow} ${Math.abs(this.delta)}%</span>`
            : null}
        </div>
        ${this.description ? html`<span class="description" part="description">${this.description}</span>` : null}
        <div class="sparkline" part="sparkline">
          <slot name="sparkline"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-kpi-stat-card": FtKpiStatCard;
  }
}
