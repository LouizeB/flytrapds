import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../styles/tokens.js";

@customElement("ft-progress")
export class FtProgress extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
      }

      .track {
        position: relative;
        width: 100%;
        height: 0.5rem;
        overflow: hidden;
        border-radius: 9999px;
        background: var(--secondary, var(--acid-300));
      }

      :host([size="sm"]) .track { height: 0.25rem; }
      :host([size="lg"]) .track { height: 0.75rem; }

      .bar {
        height: 100%;
        width: 100%;
        border-radius: 9999px;
        background: var(--primary, var(--magenta-500));
        transition: transform var(--_base) var(--_ease-liquid);
      }

      .label {
        font-size: 0.75rem;
        color: var(--muted-foreground, var(--neutral-600));
        margin-bottom: 0.25rem;
      }
    `,
  ];

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ reflect: true }) size: "sm" | "md" | "lg" = "md";
  @property() label = "";

  render() {
    const pct = Math.min(100, Math.max(0, (this.value / this.max) * 100));
    return html`
      ${this.label ? html`<div class="label" part="label">${this.label} — ${Math.round(pct)}%</div>` : null}
      <div class="track" role="progressbar" aria-valuenow=${this.value} aria-valuemin="0" aria-valuemax=${this.max} part="track">
        <div class="bar" style="transform:translateX(-${100 - pct}%)" part="bar"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-progress": FtProgress;
  }
}
