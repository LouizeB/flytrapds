import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../styles/tokens.js";

@customElement("ft-tabs")
export class FtTabs extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }

      .tab-list {
        display: inline-flex;
        align-items: center;
        height: 2.5rem;
        border-radius: var(--radius, 0.625rem);
        background: var(--muted, var(--neutral-100));
        padding: 0.25rem;
        gap: 0.125rem;
        overflow-x: auto;
      }

      .tab-trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        padding: 0.375rem 0.75rem;
        border-radius: calc(var(--radius, 0.625rem) - 2px);
        font-size: 0.875rem;
        font-weight: 500;
        font-family: inherit;
        border: none;
        background: transparent;
        color: var(--muted-foreground, var(--neutral-600));
        cursor: pointer;
        transition: color var(--_fast), background var(--_fast), box-shadow var(--_fast);
        outline: none;
      }

      .tab-trigger:hover {
        color: var(--foreground, var(--neutral-900));
      }

      .tab-trigger[aria-selected="true"] {
        background: var(--background, var(--neutral-50));
        color: var(--foreground, var(--neutral-900));
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.06);
      }

      .tab-trigger:focus-visible {
        outline: 2px solid var(--ring, var(--magenta-500));
        outline-offset: -2px;
      }

      .panel {
        margin-top: 0.5rem;
      }

      @container (max-width: 480px) {
        .tab-list { width: 100%; }
        .tab-trigger { flex: 1; }
      }
    `,
  ];

  @property({ type: Array }) tabs: Array<{ id: string; label: string }> = [];
  @state() private _active = "";

  connectedCallback() {
    super.connectedCallback();
    if (this.tabs.length > 0 && !this._active) {
      this._active = this.tabs[0].id;
    }
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("tabs") && this.tabs.length > 0 && !this._active) {
      this._active = this.tabs[0].id;
    }
  }

  private _select(id: string) {
    this._active = id;
    this.dispatchEvent(new CustomEvent("ft-tab-change", { detail: { tab: id }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="tab-list" role="tablist" part="tab-list">
        ${this.tabs.map(
          (t) => html`
            <button
              class="tab-trigger"
              role="tab"
              aria-selected=${this._active === t.id}
              @click=${() => this._select(t.id)}
            >
              ${t.label}
            </button>
          `
        )}
      </div>
      <div class="panel" role="tabpanel" part="panel">
        ${this.tabs.map(
          (t) => html`
            <div style="display:${this._active === t.id ? "block" : "none"}">
              <slot name=${t.id}></slot>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-tabs": FtTabs;
  }
}
