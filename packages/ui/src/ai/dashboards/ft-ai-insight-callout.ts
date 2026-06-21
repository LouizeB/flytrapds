import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../../styles/tokens.js";

@customElement("ft-ai-insight-callout")
export class FtAiInsightCallout extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
      }

      .callout {
        border-radius: var(--radius, 0.625rem);
        background: var(--insight-bg, var(--accent, var(--magenta-100)));
        color: var(--insight-fg, var(--accent-foreground, var(--magenta-700)));
        padding: 0.875rem 1rem;
        display: flex;
        gap: 0.625rem;
        align-items: flex-start;
        border-left: 3px solid currentColor;
      }

      .icon {
        font-size: 1.125rem;
        flex-shrink: 0;
        line-height: 1;
        margin-top: 0.125rem;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-weight: 600;
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
      }

      .body {
        font-size: 0.8125rem;
        line-height: 1.6;
      }

      :host([severity="warning"]) .callout {
        background: color-mix(in srgb, var(--warning, var(--warning-700)) 10%, var(--background, #fff));
        color: var(--warning, var(--warning-700));
      }

      :host([severity="error"]) .callout {
        background: color-mix(in srgb, var(--error, var(--error-600)) 10%, var(--background, #fff));
        color: var(--error, var(--error-600));
      }

      :host([severity="success"]) .callout {
        background: color-mix(in srgb, var(--success, var(--success-700)) 10%, var(--background, #fff));
        color: var(--success, var(--success-700));
      }
    `,
  ];

  @property() title = "";
  @property() icon = "💡";
  @property({ reflect: true }) severity: "info" | "warning" | "error" | "success" = "info";

  render() {
    return html`
      <div class="callout" part="callout">
        <span class="icon">${this.icon}</span>
        <div class="content">
          ${this.title ? html`<div class="title" part="title">${this.title}</div>` : null}
          <div class="body" part="body"><slot></slot></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-ai-insight-callout": FtAiInsightCallout;
  }
}
