import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles } from "../styles/tokens.js";

@customElement("ft-card")
export class FtCard extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }

      .card {
        border-radius: var(--radius, 0.625rem);
        border: 1px solid var(--border, var(--neutral-200));
        background: var(--card, var(--neutral-50));
        color: var(--card-foreground, var(--neutral-900));
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
        overflow: hidden;
      }

      :host([elevated]) .card {
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      }

      :host([interactive]) .card {
        cursor: pointer;
        transition: box-shadow var(--motion-fast, 120ms) var(--ease-liquid, ease);
      }

      :host([interactive]) .card:hover {
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      }

      .header {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        padding: 1.5rem;
      }

      .content {
        padding: 0 1.5rem 1.5rem;
      }

      .footer {
        display: flex;
        align-items: center;
        padding: 0 1.5rem 1.5rem;
      }

      ::slotted([slot="title"]) {
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.3;
        margin: 0;
      }

      ::slotted([slot="description"]) {
        font-size: 0.875rem;
        color: var(--muted-foreground, var(--neutral-600));
        margin: 0;
      }

      @container (max-width: 400px) {
        .header { padding: 1rem; }
        .content { padding: 0 1rem 1rem; }
        .footer { padding: 0 1rem 1rem; }
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) elevated = false;
  @property({ type: Boolean, reflect: true }) interactive = false;

  render() {
    return html`
      <div class="card" part="card">
        <div class="header" part="header">
          <slot name="title"></slot>
          <slot name="description"></slot>
        </div>
        <div class="content" part="content">
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-card": FtCard;
  }
}
