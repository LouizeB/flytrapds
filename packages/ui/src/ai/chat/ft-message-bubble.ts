import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../../styles/tokens.js";

@customElement("ft-message-bubble")
export class FtMessageBubble extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }

      .bubble-row {
        display: flex;
        gap: 0.5rem;
        align-items: flex-end;
      }

      :host([role="user"]) .bubble-row { justify-content: flex-end; }
      :host([role="assistant"]) .bubble-row { justify-content: flex-start; }

      .bubble {
        max-width: 80%;
        padding: 0.625rem 0.875rem;
        border-radius: var(--radius, 0.625rem);
        font-size: 0.875rem;
        line-height: 1.6;
        word-break: break-word;
        animation: fadeIn var(--_base) var(--_ease-organic);
      }

      :host([role="user"]) .bubble {
        background: var(--chat-bubble-user-bg, var(--primary, var(--magenta-500)));
        color: var(--chat-bubble-user-fg, var(--primary-foreground, #fff));
        border-bottom-right-radius: 2px;
      }

      :host([role="assistant"]) .bubble {
        background: var(--chat-bubble-assistant-bg, var(--card, var(--neutral-50)));
        color: var(--chat-bubble-assistant-fg, var(--card-foreground, var(--neutral-900)));
        border: 1px solid var(--border, var(--neutral-200));
        border-bottom-left-radius: 2px;
      }

      :host([streaming]) .bubble::after {
        content: "▊";
        animation: blink 1s steps(1) infinite;
        margin-left: 2px;
        color: var(--chat-stream-shimmer, var(--ai-stream-shimmer));
      }

      .timestamp {
        font-size: 0.6875rem;
        color: var(--muted-foreground, var(--neutral-600));
        margin-top: 0.25rem;
        padding: 0 0.25rem;
      }

      :host([role="user"]) .timestamp { text-align: right; }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @container (max-width: 480px) {
        .bubble { max-width: 90%; }
      }
    `,
  ];

  @property({ reflect: true }) role: "user" | "assistant" = "assistant";
  @property({ type: Boolean, reflect: true }) streaming = false;
  @property() timestamp = "";

  render() {
    return html`
      <div class="bubble-row">
        <div>
          <div class="bubble" part="bubble">
            <slot></slot>
          </div>
          ${this.timestamp ? html`<div class="timestamp" part="timestamp">${this.timestamp}</div>` : null}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-message-bubble": FtMessageBubble;
  }
}
