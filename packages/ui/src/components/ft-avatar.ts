import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { resetStyles } from "../styles/tokens.js";

@customElement("ft-avatar")
export class FtAvatar extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }

      .avatar {
        position: relative;
        display: flex;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        background: var(--muted, var(--neutral-100));
      }

      :host([size="sm"]) .avatar { width: 2rem; height: 2rem; font-size: 0.75rem; }
      :host([size="lg"]) .avatar { width: 3rem; height: 3rem; font-size: 1.125rem; }
      :host([size="xl"]) .avatar { width: 4rem; height: 4rem; font-size: 1.5rem; }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--muted-foreground, var(--neutral-600));
        background: var(--muted, var(--neutral-100));
        text-transform: uppercase;
      }
    `,
  ];

  @property() src = "";
  @property() alt = "";
  @property() fallback = "";
  @property({ reflect: true }) size: "sm" | "md" | "lg" | "xl" = "md";

  private _imgError = false;

  private _onError() {
    this._imgError = true;
    this.requestUpdate();
  }

  render() {
    const showImage = this.src && !this._imgError;
    return html`
      <div class="avatar" part="avatar">
        ${showImage
          ? html`<img src=${this.src} alt=${this.alt} @error=${this._onError} part="image" />`
          : html`<span class="fallback" part="fallback">${this.fallback || this.alt?.charAt(0) || "?"}</span>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-avatar": FtAvatar;
  }
}
