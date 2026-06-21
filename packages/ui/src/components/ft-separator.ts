import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ft-separator")
export class FtSeparator extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    hr {
      border: none;
      background: var(--border, var(--neutral-200));
      margin: 0;
    }

    :host(:not([orientation="vertical"])) hr {
      height: 1px;
      width: 100%;
    }

    :host([orientation="vertical"]) {
      display: inline-block;
      height: 100%;
    }

    :host([orientation="vertical"]) hr {
      width: 1px;
      height: 100%;
      min-height: 1rem;
    }
  `;

  @property({ reflect: true }) orientation: "horizontal" | "vertical" = "horizontal";

  render() {
    return html`<hr role="separator" aria-orientation=${this.orientation} part="separator" />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-separator": FtSeparator;
  }
}
