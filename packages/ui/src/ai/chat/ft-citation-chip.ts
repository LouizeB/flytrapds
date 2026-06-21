import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles } from "../../styles/tokens.js";

@customElement("ft-citation-chip")
export class FtCitationChip extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }

      a, span.chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.125rem 0.5rem;
        border-radius: 9999px;
        font-size: 0.6875rem;
        font-weight: 600;
        background: color-mix(in srgb, var(--chat-citation, var(--ai-citation, var(--magenta-600))) 12%, transparent);
        color: var(--chat-citation, var(--ai-citation, var(--magenta-600)));
        text-decoration: none;
        transition: opacity 120ms;
        cursor: pointer;
      }

      a:hover { opacity: 0.75; }

      .index {
        font-family: var(--font-mono, "Roboto Mono", monospace);
      }
    `,
  ];

  @property() href = "";
  @property() label = "";
  @property({ type: Number }) index = 0;

  render() {
    const content = html`
      <span class="index">[${this.index}]</span>
      ${this.label}
    `;

    return this.href
      ? html`<a href=${this.href} target="_blank" rel="noopener" part="chip">${content}</a>`
      : html`<span class="chip" part="chip">${content}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-citation-chip": FtCitationChip;
  }
}
