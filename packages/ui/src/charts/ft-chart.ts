import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { resetStyles } from "../styles/tokens.js";

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

@customElement("ft-chart")
export class FtChart extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        container-type: inline-size;
      }

      .chart-wrapper {
        width: 100%;
        overflow: hidden;
      }

      svg {
        width: 100%;
        display: block;
      }

      .bar {
        transition: opacity var(--motion-fast, 120ms);
        cursor: pointer;
      }

      .bar:hover { opacity: 0.8; }

      .axis-label {
        font-family: var(--font-sans, "Ubuntu Sans", sans-serif);
        font-size: 11px;
        fill: var(--muted-foreground, #6C6465);
      }

      .grid-line {
        stroke: var(--border, #E0D4D6);
        stroke-dasharray: 4 4;
        stroke-width: 0.5;
      }

      .tooltip-box {
        position: absolute;
        padding: 0.375rem 0.625rem;
        border-radius: calc(var(--radius, 0.625rem) - 2px);
        background: var(--popover, var(--neutral-100));
        border: 1px solid var(--border, var(--neutral-200));
        color: var(--popover-foreground, var(--neutral-900));
        font-size: 0.75rem;
        pointer-events: none;
        box-shadow: 0 2px 6px rgb(0 0 0 / 0.12);
        z-index: 10;
        white-space: nowrap;
      }

      /* Line chart */
      .line-path {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .dot {
        cursor: pointer;
        transition: r var(--motion-fast, 120ms);
      }

      .dot:hover { r: 6; }

      /* Pie */
      .slice {
        cursor: pointer;
        transition: opacity var(--motion-fast, 120ms);
      }

      .slice:hover { opacity: 0.8; }

      /* Area fill */
      .area-fill { opacity: 0.15; }

      .container { position: relative; }

      @container (max-width: 400px) {
        .axis-label { font-size: 9px; }
      }
    `,
  ];

  @property({ type: Array }) data: ChartDataPoint[] = [];
  @property() type: "bar" | "line" | "area" | "pie" = "bar";
  @property({ type: Number }) height = 240;
  @state() private _tooltip: { x: number; y: number; text: string } | null = null;

  private _colors = [
    "var(--chart-1, #DE3981)",
    "var(--chart-2, #129000)",
    "var(--chart-3, #795FFF)",
    "var(--chart-4, #008794)",
    "var(--chart-5, #BE6600)",
  ];

  private _getColor(i: number, item?: ChartDataPoint) {
    return item?.color || this._colors[i % this._colors.length];
  }

  private _showTip(x: number, y: number, text: string) {
    this._tooltip = { x, y, text };
  }

  private _hideTip() {
    this._tooltip = null;
  }

  private _renderBar() {
    if (!this.data.length) return html``;
    const maxVal = Math.max(...this.data.map((d) => d.value), 1);
    const pad = { top: 10, right: 10, bottom: 30, left: 45 };
    const w = 500;
    const h = this.height;
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;
    const barW = Math.min(40, plotW / this.data.length - 4);

    return html`
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">
        ${[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = pad.top + plotH * (1 - f);
          return html`
            <line class="grid-line" x1=${pad.left} x2=${w - pad.right} y1=${y} y2=${y} />
            <text class="axis-label" x=${pad.left - 6} y=${y + 4} text-anchor="end">${Math.round(maxVal * f)}</text>
          `;
        })}
        ${this.data.map((d, i) => {
          const x = pad.left + (plotW / this.data.length) * (i + 0.5) - barW / 2;
          const barH = (d.value / maxVal) * plotH;
          const y = pad.top + plotH - barH;
          return html`
            <rect
              class="bar"
              x=${x} y=${y} width=${barW} height=${barH}
              rx="3" fill=${this._getColor(i, d)}
              @mouseenter=${(e: MouseEvent) => this._showTip(e.offsetX, e.offsetY - 10, `${d.label}: ${d.value}`)}
              @mouseleave=${this._hideTip}
            />
            <text class="axis-label" x=${x + barW / 2} y=${h - 8} text-anchor="middle">${d.label}</text>
          `;
        })}
      </svg>
    `;
  }

  private _renderLine(area = false) {
    if (!this.data.length) return html``;
    const maxVal = Math.max(...this.data.map((d) => d.value), 1);
    const pad = { top: 10, right: 10, bottom: 30, left: 45 };
    const w = 500;
    const h = this.height;
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    const points = this.data.map((d, i) => ({
      x: pad.left + (plotW / Math.max(this.data.length - 1, 1)) * i,
      y: pad.top + plotH - (d.value / maxVal) * plotH,
    }));
    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaD = `${pathD} L ${points[points.length - 1].x} ${pad.top + plotH} L ${points[0].x} ${pad.top + plotH} Z`;
    const color = this._getColor(0);

    return html`
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">
        ${[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = pad.top + plotH * (1 - f);
          return html`
            <line class="grid-line" x1=${pad.left} x2=${w - pad.right} y1=${y} y2=${y} />
            <text class="axis-label" x=${pad.left - 6} y=${y + 4} text-anchor="end">${Math.round(maxVal * f)}</text>
          `;
        })}
        ${area ? html`<path class="area-fill" d=${areaD} fill=${color} />` : null}
        <path class="line-path" d=${pathD} stroke=${color} />
        ${points.map(
          (p, i) => html`
            <circle
              class="dot"
              cx=${p.x} cy=${p.y} r="4" fill=${color}
              @mouseenter=${(e: MouseEvent) => this._showTip(e.offsetX, e.offsetY - 10, `${this.data[i].label}: ${this.data[i].value}`)}
              @mouseleave=${this._hideTip}
            />
          `
        )}
        ${this.data.map(
          (d, i) => html`
            <text class="axis-label" x=${points[i].x} y=${h - 8} text-anchor="middle">${d.label}</text>
          `
        )}
      </svg>
    `;
  }

  private _renderPie() {
    if (!this.data.length) return html``;
    const size = Math.min(this.height, 300);
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.4;
    const total = this.data.reduce((s, d) => s + d.value, 0) || 1;

    let cumAngle = -Math.PI / 2;
    const slices = this.data.map((d, i) => {
      const angle = (d.value / total) * Math.PI * 2;
      const startAngle = cumAngle;
      cumAngle += angle;
      const endAngle = cumAngle;
      const largeArc = angle > Math.PI ? 1 : 0;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const pathD = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      return { pathD, color: this._getColor(i, d), label: d.label, value: d.value };
    });

    return html`
      <svg viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet" style="max-width:${size}px">
        ${slices.map(
          (s) => html`
            <path
              class="slice"
              d=${s.pathD}
              fill=${s.color}
              @mouseenter=${(e: MouseEvent) => this._showTip(e.offsetX, e.offsetY - 10, `${s.label}: ${s.value}`)}
              @mouseleave=${this._hideTip}
            />
          `
        )}
      </svg>
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="chart-wrapper">
          ${this.type === "bar"
            ? this._renderBar()
            : this.type === "line"
              ? this._renderLine()
              : this.type === "area"
                ? this._renderLine(true)
                : this._renderPie()}
        </div>
        ${this._tooltip
          ? html`<div class="tooltip-box" style="left:${this._tooltip.x}px;top:${this._tooltip.y}px">${this._tooltip.text}</div>`
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ft-chart": FtChart;
  }
}
