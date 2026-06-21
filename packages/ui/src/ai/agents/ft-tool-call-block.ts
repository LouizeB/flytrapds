import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../../styles/tokens.js";

@customElement("ft-tool-call-block")
export class FtToolCallBlock extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
      }

      .block {
        border-radius: calc(var(--radius, 0.625rem) - 2px);
        background: var(--tool-call-bg, var(--ai-tool-bg, var(--neutral-100)));
        border: 1px solid var(--border, var(--neutral-200));
        font-family: var(--font-mono, "Roboto Mono", monospace);
        font-size: 0.8125rem;
        overflow: hidden;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        user-select: none;
        gap: 0.5rem;
      }

      .header:hover { opacity: 0.8; }

      .fn-name {
        font-weight: 600;
        color: var(--primary, var(--magenta-500));
      }

      .chevron {
        transition: transform var(--_fast);
        font-size: 0.75rem;
      }

      .chevron[data-open] { transform: rotate(90deg); }

      .body {
        padding: 0.5rem 0.75rem;
        border-top: 1px solid var(--border, var(--neutral-200));
        white-space: pre-wrap;
        word-break: break-all;
        line-height: 1.6;
        max-height: 20rem;
        overflow-y: auto;
      }

      .duration {
        font-size: 0.6875rem;
        opacity: 0.6;
      }
    `,
  ];

  @property() name = "";
  @property() duration = "";
  @state() private _open = false;

  private _toggle() {
    this._open = !this._open;
  }

  render() {
    return html`
      <div class="block" part="block">
        <div class="header" @click=${this._toggle} part="header">
          <span class="fn-name">${this.name || "tool_call"}</span>
          <span>
            ${this.duration ? html`<span class="duration">${this.duration}</span>` : null}
            <span class="chevron" ?data-open=${this._open}>▶</span>
          </span>
        </div>
        ${this._open
          ? html`<div class="body" part="body"><slot></slot></div>`
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-tool-call-block": FtToolCallBlock;
  }
}
