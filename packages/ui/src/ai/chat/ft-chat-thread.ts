import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { resetStyles } from "../../styles/tokens.js";

@customElement("ft-chat-thread")
export class FtChatThread extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        container-type: inline-size;
      }

      .messages {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1rem;
        scrollbar-width: thin;
        scrollbar-color: var(--border, var(--neutral-200)) transparent;
      }

      .input-area {
        padding: 0.75rem 1rem;
        border-top: 1px solid var(--border, var(--neutral-200));
        background: var(--background, var(--neutral-50));
      }

      @container (max-width: 480px) {
        .messages { padding: 0.5rem; gap: 0.5rem; }
        .input-area { padding: 0.5rem; }
      }
    `,
  ];

  render() {
    return html`
      <div class="messages" part="messages">
        <slot></slot>
      </div>
      <div class="input-area" part="input-area">
        <slot name="input"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-chat-thread": FtChatThread;
  }
}
