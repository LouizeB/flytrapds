import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../styles/tokens.js";

@customElement("ft-input")
export class FtInput extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }

      label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--foreground, var(--neutral-900));
      }

      input,
      textarea {
        display: flex;
        width: 100%;
        border-radius: var(--radius, 0.625rem);
        border: 1px solid var(--input, var(--neutral-200));
        background: var(--background, var(--neutral-50));
        color: var(--foreground, var(--neutral-900));
        font-family: inherit;
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
        transition: border-color var(--_fast), box-shadow var(--_fast);
        outline: none;
      }

      input { height: 2.5rem; }

      textarea {
        min-height: 5rem;
        resize: vertical;
      }

      input::placeholder,
      textarea::placeholder {
        color: var(--muted-foreground, var(--neutral-600));
      }

      input:focus,
      textarea:focus {
        border-color: var(--ring, var(--magenta-500));
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring, var(--magenta-500)) 25%, transparent);
      }

      input:disabled,
      textarea:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      :host([invalid]) input,
      :host([invalid]) textarea {
        border-color: var(--error, var(--error-600));
      }

      :host([invalid]) input:focus,
      :host([invalid]) textarea:focus {
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--error, var(--error-600)) 25%, transparent);
      }

      .help {
        font-size: 0.75rem;
        color: var(--muted-foreground, var(--neutral-600));
      }

      :host([invalid]) .help {
        color: var(--error, var(--error-600));
      }
    `,
  ];

  @property() label = "";
  @property() placeholder = "";
  @property() value = "";
  @property() type: "text" | "email" | "password" | "number" | "search" | "url" | "tel" = "text";
  @property() help = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) invalid = false;
  @property({ type: Boolean }) multiline = false;

  private _onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent("ft-input", { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.label ? html`<label part="label">${this.label}</label>` : null}
        ${this.multiline
          ? html`<textarea
              part="input"
              .value=${this.value}
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
              @input=${this._onInput}
            ></textarea>`
          : html`<input
              part="input"
              type=${this.type}
              .value=${this.value}
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
              @input=${this._onInput}
            />`}
        ${this.help ? html`<span class="help" part="help">${this.help}</span>` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-input": FtInput;
  }
}
