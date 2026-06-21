import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../../styles/tokens.js";

export interface FilterOption {
  id: string;
  label: string;
}

@customElement("ft-filter-bar")
export class FtFilterBar extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }

      .bar {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        flex-wrap: wrap;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        padding: 0.375rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.8125rem;
        font-family: inherit;
        border: 1px solid var(--border, var(--neutral-200));
        background: var(--background, var(--neutral-50));
        color: var(--foreground, var(--neutral-900));
        cursor: pointer;
        transition: background var(--_fast), border-color var(--_fast);
        outline: none;
      }

      .chip:hover {
        border-color: var(--ring, var(--magenta-500));
      }

      .chip[aria-pressed="true"] {
        background: var(--primary, var(--magenta-500));
        color: var(--primary-foreground, #fff);
        border-color: var(--primary, var(--magenta-500));
      }

      .chip:focus-visible {
        outline: 2px solid var(--ring, var(--magenta-500));
        outline-offset: 2px;
      }

      @container (max-width: 480px) {
        .chip { font-size: 0.75rem; padding: 0.25rem 0.5rem; }
      }
    `,
  ];

  @property({ type: Array }) filters: FilterOption[] = [];
  @state() private _active: Set<string> = new Set();

  private _toggle(id: string) {
    const next = new Set(this._active);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this._active = next;
    this.dispatchEvent(
      new CustomEvent("ft-filter-change", {
        detail: { active: [...this._active] },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="bar" role="group" part="bar">
        ${this.filters.map(
          (f) => html`
            <button
              class="chip"
              role="switch"
              aria-pressed=${this._active.has(f.id)}
              @click=${() => this._toggle(f.id)}
            >
              ${f.label}
            </button>
          `
        )}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-filter-bar": FtFilterBar;
  }
}
