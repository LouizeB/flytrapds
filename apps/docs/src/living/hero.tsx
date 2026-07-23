import * as React from "react";
import { AiAccentIcon, BrandIcon, Button, ExternalLinkIcon, FlytrapIcon, SendIcon, type FlytrapIconComponent } from "@louizeb/flytrap-ui";
import { CharacterLayer } from "./character";
import { FloatingPanel } from "./panels";
import spriteCorner from "../assets/flytrap-sprite-corner.webp";
import spriteWideA from "../assets/flytrap-sprite-wide-a.webp";

const syncRows = ["Tokens", "Components", "Patterns", "Documentation"] as const;

const heroStrip: readonly [string, string, FlytrapIconComponent | null][] = [
  ["What's new", "Version 1.0.0", AiAccentIcon],
  ["Principles", "How Flytrap works", BrandIcon],
  ["Contribute", "Join the project", SendIcon],
  ["Status", "Everything is working", null],
] as const;

function WireframeMoon({ className }: { className?: string }) {
  const parallels = [-72, -44, 0, 44, 72];
  const meridians = [88, 62, 34, 0];
  return <svg aria-hidden="true" className={className} viewBox="-100 -100 200 200">
    <defs>
      <radialGradient cx="42%" cy="38%" id="flytrap-moon-glow" r="72%">
        <stop offset="0%" stopColor="#ff5a3c" stopOpacity="0.55" />
        <stop offset="55%" stopColor="#c22c1e" stopOpacity="0.34" />
        <stop offset="100%" stopColor="#3a0d0a" stopOpacity="0.12" />
      </radialGradient>
    </defs>
    <circle fill="url(#flytrap-moon-glow)" r="97" stroke="rgba(255,110,80,.45)" strokeWidth="0.7" />
    {parallels.map(y => <ellipse cx="0" cy={y} fill="none" key={y} rx={Math.sqrt(97 * 97 - y * y)} ry={Math.max(6, Math.abs(y) * 0.22)} stroke="rgba(255,110,80,.3)" strokeWidth="0.6" />)}
    {meridians.map(rx => <ellipse cx="0" cy="0" fill="none" key={rx} rx={rx || 0.5} ry="97" stroke="rgba(255,110,80,.28)" strokeWidth="0.6" />)}
  </svg>;
}

export function Hero() {
  return <header className="relative isolate overflow-hidden border-b border-[#ff4fbd]/20 px-6 pb-9 pt-12 text-white md:px-10 lg:min-h-[510px] xl:min-h-[560px]" id="overview">
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4fbd]/60 to-transparent" />
    <div aria-hidden="true" className="flytrap-motion absolute right-[4vw] top-[6%] hidden h-[80vh] w-px animate-[flytrap-scan_5.2s_linear_infinite] bg-gradient-to-b from-transparent via-[#b8ff35]/70 to-transparent md:block" />
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_63%_24%,rgba(241,0,129,.2),transparent_24rem),radial-gradient(circle_at_80%_4%,rgba(139,92,246,.2),transparent_18rem)]" />
    <WireframeMoon className="pointer-events-none absolute left-[37%] top-[-16rem] z-0 hidden size-[36rem] opacity-85 blur-[0.5px] md:block" />

    <img alt="" aria-hidden="true" className="pointer-events-none absolute right-[-6rem] top-[-4rem] z-0 hidden w-[26rem] -scale-x-100 opacity-95 md:block" draggable={false} src={spriteCorner} />
    <img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-5rem] left-[-4rem] z-0 hidden w-[70%] opacity-90 lg:block" draggable={false} src={spriteWideA} />

    <CharacterLayer
      alt="Flytrap character reading a Design System panel."
      className="absolute right-[-35vw] top-2 z-10 hidden h-[min(78vw,800px)] w-[min(78vw,800px)] sm:block lg:right-[-18vw] xl:right-[3rem] 2xl:right-[10rem]"
      pose="standing"
    />

    <div className="relative z-30 max-w-[30rem]">
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-[#ff4fbd]">Design System</p>
      <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl xl:text-[4.65rem]" id="living-hero-title">
        Consistent interfaces,
        <span className="block">from design to <span className="text-[#ff4fbd] drop-shadow-[0_0_24px_rgba(255,79,189,.5)]">code.</span></span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-7 text-editorial-secondary">
        Find components, styles, and guidance for building products with Flytrap.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild className="rounded-full bg-[#CF006A] px-6 text-white shadow-[0_0_28px_rgba(241,0,129,.45)] hover:bg-[#A90058]" size="lg">
          <a href="#foundations">Get started <span aria-hidden="true">→</span></a>
        </Button>
        <Button asChild className="rounded-full border-white/25 bg-white/5 px-6 text-white hover:bg-white/10" size="lg" variant="outline">
          <a href="#tokens">View tokens <span aria-hidden="true" className="ml-1 grid size-5 place-items-center rounded-full border border-white/30 text-xs">→</span></a>
        </Button>
      </div>
      <a
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#b8ff35] underline-offset-4 hover:underline"
        href="https://github.com/LouizeB/flytrapds"
      >
        View code on GitHub <FlytrapIcon icon={ExternalLinkIcon} size="sm" />
      </a>
    </div>

    <div className="relative z-40 mt-10 hidden w-64 flex-col gap-4 xl:absolute xl:right-10 xl:top-16 xl:flex">
      <FloatingPanel title="System content">
        <div className="flex items-start gap-3">
          <ul className="grid flex-1 gap-2">
            {syncRows.map(row => <li className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-editorial-secondary" key={row}>
              {row}
              <span className="size-1.5 rounded-full bg-[#00c970] shadow-[0_0_8px_rgba(0,201,112,.8)]" />
            </li>)}
          </ul>
          <svg aria-hidden="true" className="flytrap-motion mt-1 w-14 shrink-0 animate-[flytrap-pulse_6s_ease-in-out_infinite]" viewBox="0 0 56 40">
            <defs>
              <linearGradient id="flytrap-torus" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#7cecff" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ff4fbd" />
              </linearGradient>
            </defs>
            <ellipse cx="28" cy="20" fill="none" rx="22" ry="12" stroke="url(#flytrap-torus)" strokeWidth="5" transform="rotate(-18 28 20)" />
            <ellipse cx="28" cy="20" fill="none" opacity="0.5" rx="14" ry="7" stroke="url(#flytrap-torus)" strokeWidth="1.5" transform="rotate(-18 28 20)" />
          </svg>
        </div>
      </FloatingPanel>
      <FloatingPanel className="relative" delay={-2.4} title="System signal">
        <p className="absolute right-4 top-4 font-mono text-xs text-editorial-secondary">96%</p>
        <div aria-hidden="true" className="flytrap-motion flytrap-organic mx-auto h-16 w-32 animate-[flytrap-pulse_4.6s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,79,189,.9),rgba(241,0,129,.4)_55%,rgba(139,92,246,.18)_75%,transparent_85%)] blur-[1px]" style={{ borderRadius: "48% 52% 60% 40% / 62% 58% 42% 38%" }} />
        <div className="mt-3 flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em]">
          <span className="text-editorial-secondary">Stable</span>
          <span className="text-[#00c970]">Active</span>
        </div>
      </FloatingPanel>
    </div>

    <div className="relative z-40 mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#ff4fbd]/20 bg-white/8 shadow-[0_0_38px_rgba(241,0,129,.15)] backdrop-blur-xl sm:grid-cols-2 lg:mt-12 lg:max-w-4xl xl:grid-cols-4">
      {heroStrip.map(([title, detail, icon]) => <div className="flex items-center gap-3 bg-[#0a0c14]/85 px-4 py-3" key={title}>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-editorial-muted">
          {icon
            ? <FlytrapIcon icon={icon} size="sm" />
            : <span className="size-2 rounded-full bg-[#b8ff35] shadow-[0_0_10px_rgba(184,255,53,.9)]" />}
        </span>
        <span>
          <span className="block text-sm font-medium text-white/85">{title}</span>
          <span className="block text-xs text-editorial-muted">{detail}</span>
        </span>
      </div>)}
    </div>
  </header>;
}
