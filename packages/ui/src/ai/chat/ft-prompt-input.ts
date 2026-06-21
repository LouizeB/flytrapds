import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../../styles/tokens.js";

@customElement("ft-prompt-input")
export class FtPromptInput extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }

      .wrapper {
        display: flex;
        align-items: flex-end;
        gap: 0.5rem;
        border: 1px solid var(--chat-input-ring, var(--ring, var(--magenta-500)));
        border-radius: var(--radius, 0.625rem);
        padding: 0.5rem;
        background: var(--background, var(--neutral-50));
        transition: box-shadow var(--_fast);
      }

      .wrapper:focus-within {
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring, var(--magenta-500)) 25%, transparent);
      }

      textarea {
        flex: 1;
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: 0.875rem;
        color: var(--foreground, var(--neutral-900));
        resize: none;
        outline: none;
        max-height: 8rem;
        line-height: 1.5;
        padding: 0.25rem;
      }

      textarea::placeholder {
        color: var(--muted-foreground, var(--neutral-600));
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: none;
        background: var(--primary, var(--magenta-500));
        color: var(--primary-foreground, #fff);
        cursor: pointer;
        flex-shrink: 0;
        transition: opacity var(--_fast);
      }

      button:hover { opacity: 0.85; }

      button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .arrow {
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 8px solid currentColor;
        transform: translateY(-1px);
      }

      .suggestions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-bottom: 0.5rem;
      }

      .suggestion-chip {
        font-size: 0.75rem;
        padding: 0.25rem 0.625rem;
        border-radius: 9999px;
        border: 1px solid var(--border, var(--neutral-200));
        background: var(--background, var(--neutral-50));
        color: var(--foreground, var(--neutral-900));
        cursor: pointer;
        font-family: inherit;
        transition: background var(--_fast);
      }

      .suggestion-chip:hover {
        background: var(--accent, var(--magenta-100));
      }
    `,
  ];

  @property() placeholder = "Type a message...";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Array }) suggestions: string[] = [];
  @query("textarea") private _textarea!: HTMLTextAreaElement;

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this._submit();
    }
  }

  private _submit() {
    const val = this._textarea?.value?.trim();
    if (!val || this.disabled || this.loading) return;
    this.dispatchEvent(new CustomEvent("ft-submit", { detail: { message: val }, bubbles: true, composed: true }));
    this._textarea.value = "";
    this._autoResize();
  }

  private _useSuggestion(s: string) {
    if (this._textarea) {
      this._textarea.value = s;
      this._textarea.focus();
    }
  }

  private _autoResize() {
    const ta = this._textarea;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 128)}px`;
  }

  render() {
    return html`
      ${this.suggestions.length > 0
        ? html`
            <div class="suggestions" part="suggestions">
              ${this.suggestions.map(
                (s) => html`
                  <button class="suggestion-chip" @click=${() => this._useSuggestion(s)}>${s}</button>
                `
              )}
            </div>
          `
        : null}
      <div class="wrapper" part="wrapper">
        <textarea
          rows="1"
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @keydown=${this._onKeydown}
          @input=${this._autoResize}
          part="textarea"
        ></textarea>
        <button
          @click=${this._submit}
          ?disabled=${this.disabled || this.loading}
          aria-label="Send"
          part="send"
        >
          <span class="arrow"></span>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-prompt-input": FtPromptInput;
  }
}
