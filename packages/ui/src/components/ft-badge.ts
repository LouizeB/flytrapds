import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles } from "../styles/tokens.js";

@customElement("ft-badge")
export class FtBadge extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        border-radius: 9999px;
        padding: 0.125rem 0.625rem;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1.5;
        transition: color var(--motion-fast, 120ms), background-color var(--motion-fast, 120ms);
      }

      :host(:not([variant])) .badge,
      :host([variant="default"]) .badge {
        background: var(--primary, var(--magenta-500));
        color: var(--primary-foreground, #fff);
      }

      :host([variant="secondary"]) .badge {
        background: var(--secondary, var(--acid-300));
        color: var(--secondary-foreground, var(--neutral-900));
      }

      :host([variant="outline"]) .badge {
        border: 1px solid var(--border, var(--neutral-200));
        color: var(--foreground, var(--neutral-900));
        background: transparent;
      }

      :host([variant="destructive"]) .badge {
        background: var(--destructive, var(--error-600));
        color: var(--destructive-foreground, #fff);
      }

      :host([variant="success"]) .badge {
        background: var(--success, var(--success-700));
        color: #fff;
      }

      :host([variant="warning"]) .badge {
        background: var(--warning, var(--warning-700));
        color: #fff;
      }

      :host([variant="error"]) .badge {
        background: var(--error, var(--error-600));
        color: #fff;
      }
    `,
  ];

  @property({ reflect: true }) variant: "default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "error" = "default";

  render() {
    return html`<span class="badge" part="badge"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-badge": FtBadge;
  }
}
