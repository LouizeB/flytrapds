import { css } from "lit";

/**
 * Shared token-based styles consumed via Shadow DOM.
 * CSS custom properties pierce Shadow DOM, so host pages that load
 * flytrap-globals.css (or set the vars manually) automatically theme
 * every Flytrap Web Component.
 */
export const resetStyles = css`
  :host {
    box-sizing: border-box;
    font-family: var(--font-sans, "Ubuntu Sans", sans-serif);
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }
`;

export const motionTokens = css`
  :host {
    --_fast: var(--motion-fast, 120ms);
    --_base: var(--motion-base, 240ms);
    --_fluid: var(--motion-fluid, 480ms);
    --_ease-organic: var(--ease-organic, cubic-bezier(0.34, 1.56, 0.64, 1));
    --_ease-liquid: var(--ease-liquid, cubic-bezier(0.65, 0, 0.35, 1));
  }
`;
