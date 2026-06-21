import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../styles/tokens.js";

@customElement("ft-switch")
export class FtSwitch extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      button {
        position: relative;
        display: inline-flex;
        align-items: center;
        width: 2.75rem;
        height: 1.5rem;
        border-radius: 9999px;
        border: 2px solid transparent;
        background: var(--input, var(--neutral-200));
        cursor: pointer;
        transition: background var(--_fast) var(--_ease-liquid);
        outline: none;
        padding: 0;
        flex-shrink: 0;
      }

      button:focus-visible {
        outline: 2px solid var(--ring, var(--magenta-500));
        outline-offset: 2px;
      }

      button[aria-checked="true"] {
        background: var(--primary, var(--magenta-500));
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .thumb {
        display: block;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.15);
        transition: transform var(--_fast) var(--_ease-organic);
        transform: translateX(1px);
      }

      button[aria-checked="true"] .thumb {
        transform: translateX(1.25rem);
      }

      label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--foreground, var(--neutral-900));
        cursor: pointer;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() label = "";

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent("ft-change", { detail: { checked: this.checked }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <button
        role="switch"
        aria-checked=${this.checked}
        ?disabled=${this.disabled}
        @click=${this._toggle}
        part="switch"
      >
        <span class="thumb"></span>
      </button>
      ${this.label ? html`<label @click=${this._toggle} part="label">${this.label}</label>` : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-switch": FtSwitch;
  }
}
