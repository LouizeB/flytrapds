import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../styles/tokens.js";

@customElement("ft-tooltip")
export class FtTooltip extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .tip {
        position: absolute;
        z-index: 50;
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
        border-radius: calc(var(--radius, 0.625rem) - 2px);
        border: 1px solid var(--border, var(--neutral-200));
        background: var(--popover, var(--neutral-100));
        color: var(--popover-foreground, var(--neutral-900));
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--_fast);
      }

      :host(:hover) .tip,
      :host(:focus-within) .tip {
        opacity: 1;
      }

      :host(:not([position])) .tip,
      :host([position="top"]) .tip {
        bottom: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
      }

      :host([position="bottom"]) .tip {
        top: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
      }

      :host([position="left"]) .tip {
        right: calc(100% + 6px);
        top: 50%;
        transform: translateY(-50%);
      }

      :host([position="right"]) .tip {
        left: calc(100% + 6px);
        top: 50%;
        transform: translateY(-50%);
      }
    `,
  ];

  @property() text = "";
  @property({ reflect: true }) position: "top" | "bottom" | "left" | "right" = "top";

  render() {
    return html`
      <slot></slot>
      ${this.text ? html`<div class="tip" role="tooltip" part="tooltip">${this.text}</div>` : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-tooltip": FtTooltip;
  }
}
