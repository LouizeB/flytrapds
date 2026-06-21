import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles } from "../../styles/tokens.js";

@customElement("ft-dashboard-shell")
export class FtDashboardShell extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }

      .shell {
        display: grid;
        gap: 1rem;
        padding: 1.5rem;
        min-height: 100%;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .title {
        font-size: 1.5rem;
        font-weight: 700;
        font-family: var(--font-display, "Fira Sans", sans-serif);
        color: var(--foreground, var(--neutral-900));
      }

      .toolbar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      }

      .full-row {
        grid-column: 1 / -1;
      }

      @container (max-width: 640px) {
        .shell { padding: 0.75rem; }
        .grid { grid-template-columns: 1fr; }
        .title { font-size: 1.25rem; }
      }
    `,
  ];

  @property() heading = "";

  render() {
    return html`
      <div class="shell" part="shell">
        <div class="header" part="header">
          <h1 class="title">${this.heading}</h1>
          <div class="toolbar" part="toolbar">
            <slot name="toolbar"></slot>
          </div>
        </div>
        <slot name="filters"></slot>
        <div class="grid" part="grid">
          <slot></slot>
        </div>
        <div class="full-row" part="full-row">
          <slot name="full"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-dashboard-shell": FtDashboardShell;
  }
}
