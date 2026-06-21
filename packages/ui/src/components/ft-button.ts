import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles, motionTokens } from "../styles/tokens.js";

@customElement("ft-button")
export class FtButton extends LitElement {
  static styles = [
    resetStyles,
    motionTokens,
    css`
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        white-space: nowrap;
        font-family: inherit;
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.25rem;
        border: none;
        cursor: pointer;
        border-radius: var(--button-radius, var(--radius, 0.625rem));
        transition: opacity var(--_fast) var(--_ease-liquid),
          background-color var(--_fast) var(--_ease-liquid),
          transform var(--_fast) var(--_ease-organic);
        outline: none;
      }

      button:focus-visible {
        outline: 2px solid var(--ring, var(--magenta-500));
        outline-offset: 2px;
      }

      button:disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      button:active:not(:disabled) {
        transform: scale(0.97);
      }

      /* Sizes */
      :host([size="sm"]) button { height: 2.25rem; padding: 0 0.75rem; font-size: 0.8125rem; }
      :host(:not([size])) button,
      :host([size="md"]) button { height: 2.5rem; padding: 0 1rem; }
      :host([size="lg"]) button { height: 2.75rem; padding: 0 2rem; font-size: 1rem; }
      :host([size="icon"]) button { height: 2.5rem; width: 2.5rem; padding: 0; }

      /* Variants */
      :host(:not([variant])) button,
      :host([variant="default"]) button {
        background: var(--button-primary-bg, var(--primary));
        color: var(--button-primary-fg, var(--primary-foreground, #fff));
      }
      :host(:not([variant])) button:hover,
      :host([variant="default"]) button:hover { opacity: 0.9; }

      :host([variant="outline"]) button {
        background: transparent;
        border: 1px solid var(--button-secondary-outline, var(--magenta-500));
        color: var(--button-secondary-fg, var(--magenta-500));
      }
      :host([variant="outline"]) button:hover {
        background: var(--accent, var(--magenta-100));
        color: var(--accent-foreground, var(--magenta-700));
      }

      :host([variant="secondary"]) button {
        background: var(--secondary, var(--acid-300));
        color: var(--secondary-foreground, var(--neutral-900));
      }
      :host([variant="secondary"]) button:hover { opacity: 0.85; }

      :host([variant="destructive"]) button {
        background: var(--destructive, var(--error-600));
        color: var(--destructive-foreground, #fff);
      }
      :host([variant="destructive"]) button:hover { opacity: 0.9; }

      :host([variant="ghost"]) button {
        background: transparent;
        color: var(--foreground, var(--neutral-900));
      }
      :host([variant="ghost"]) button:hover {
        background: var(--accent, var(--magenta-100));
        color: var(--accent-foreground, var(--magenta-700));
      }

      :host([variant="link"]) button {
        background: transparent;
        color: var(--primary, var(--magenta-500));
        text-decoration: underline;
        text-underline-offset: 4px;
      }

      /* Full width */
      :host([full]) { display: block; }
      :host([full]) button { width: 100%; }

      /* Responsive */
      @container (max-width: 480px) {
        :host([responsive]) button {
          width: 100%;
          justify-content: center;
        }
        :host([responsive]) { display: block; }
      }
    `,
  ];

  @property({ reflect: true }) variant: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link" = "default";
  @property({ reflect: true }) size: "sm" | "md" | "lg" | "icon" = "md";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) full = false;
  @property({ type: Boolean, reflect: true }) responsive = false;

  render() {
    return html`
      <button ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-button": FtButton;
  }
}
