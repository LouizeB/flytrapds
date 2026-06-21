import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ft-skeleton")
export class FtSkeleton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .skeleton {
      border-radius: var(--radius, 0.625rem);
      background: var(--muted, var(--neutral-100));
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    :host([circle]) .skeleton {
      border-radius: 50%;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;

  @property() width = "100%";
  @property() height = "1rem";
  @property({ type: Boolean, reflect: true }) circle = false;

  render() {
    return html`<div class="skeleton" style="width:${this.width};height:${this.height}" part="skeleton"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-skeleton": FtSkeleton;
  }
}
