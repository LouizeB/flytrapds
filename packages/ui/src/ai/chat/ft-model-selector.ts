import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../../styles/tokens.js";

export interface ModelOption {
  id: string;
  name: string;
  provider?: string;
}

@customElement("ft-model-selector")
export class FtModelSelector extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      button.trigger {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 0.75rem;
        border-radius: var(--radius, 0.625rem);
        border: 1px solid var(--border, var(--neutral-200));
        background: var(--background, var(--neutral-50));
        color: var(--foreground, var(--neutral-900));
        font-size: 0.8125rem;
        font-family: inherit;
        cursor: pointer;
        transition: border-color var(--_fast);
        outline: none;
      }

      button.trigger:hover { border-color: var(--ring, var(--magenta-500)); }

      .chevron { font-size: 0.625rem; opacity: 0.6; }

      .dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        min-width: 12rem;
        border: 1px solid var(--border, var(--neutral-200));
        border-radius: var(--radius, 0.625rem);
        background: var(--popover, var(--neutral-100));
        color: var(--popover-foreground, var(--neutral-900));
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
        z-index: 50;
        padding: 0.25rem;
        animation: fadeIn var(--_fast) var(--_ease-organic);
      }

      .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: none;
        border-radius: calc(var(--radius, 0.625rem) - 2px);
        background: transparent;
        color: inherit;
        font-size: 0.8125rem;
        font-family: inherit;
        cursor: pointer;
        text-align: left;
      }

      .option:hover { background: var(--accent, var(--magenta-100)); }
      .option[data-selected] { font-weight: 600; }

      .provider {
        font-size: 0.6875rem;
        opacity: 0.6;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
  ];

  @property({ type: Array }) models: ModelOption[] = [];
  @property() value = "";
  @state() private _open = false;

  private _toggle() {
    this._open = !this._open;
  }

  private _select(model: ModelOption) {
    this.value = model.id;
    this._open = false;
    this.dispatchEvent(new CustomEvent("ft-model-change", { detail: { model }, bubbles: true, composed: true }));
  }

  private _clickOutside = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) this._open = false;
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this._clickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._clickOutside);
  }

  render() {
    const selected = this.models.find((m) => m.id === this.value);
    return html`
      <button class="trigger" @click=${this._toggle} part="trigger">
        ${selected?.name || "Select model"}
        <span class="chevron">▼</span>
      </button>
      ${this._open
        ? html`
            <div class="dropdown" part="dropdown">
              ${this.models.map(
                (m) => html`
                  <button class="option" ?data-selected=${m.id === this.value} @click=${() => this._select(m)}>
                    <span>${m.name}</span>
                    ${m.provider ? html`<span class="provider">${m.provider}</span>` : null}
                  </button>
                `
              )}
            </div>
          `
        : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-model-selector": FtModelSelector;
  }
}
