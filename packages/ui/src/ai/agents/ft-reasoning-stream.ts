import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../../styles/tokens.js";

@customElement("ft-reasoning-stream")
export class FtReasoningStream extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
      }

      .reasoning {
        font-size: 0.8125rem;
        line-height: 1.7;
        color: var(--reasoning-fg, var(--ai-thinking, var(--neutral-600)));
        font-style: italic;
        padding: 0.75rem 1rem;
        border-left: 2px solid var(--border, var(--neutral-200));
        position: relative;
      }

      :host([streaming]) .reasoning::after {
        content: "▊";
        animation: blink 1s steps(1) infinite;
        color: var(--primary, var(--magenta-500));
        margin-left: 2px;
      }

      .label {
        font-size: 0.6875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.25rem;
        font-style: normal;
        opacity: 0.6;
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) streaming = false;

  render() {
    return html`
      <div class="reasoning" part="reasoning">
        <div class="label">Thinking...</div>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-reasoning-stream": FtReasoningStream;
  }
}
