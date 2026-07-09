import * as React from "react";
import { AiAccentIcon, BrandIcon, Button, ExternalLinkIcon, FlytrapIcon, SendIcon, type FlytrapIconComponent } from "@flytrap/ui";
import { CharacterLayer } from "./character";
import { FloatingPanel } from "./panels";
import plantA from "../assets/flytrap-plant-a.webp";

const syncRows = ["Tokens", "Components", "Patterns", "Documentation"] as const;

const heroStrip: readonly [string, string, FlytrapIconComponent | null][] = [
  ["What's new", "v1.0.0", AiAccentIcon],
  ["Design principles", "Nossa filosofia", BrandIcon],
  ["Contribute", "Entre no ecossistema", SendIcon],
  ["System health", "All systems nominal", null],
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

function OrbitalSystem({ className }: { className?: string }) {
  const orbits = [26, 42, 58, 74, 90];
  const planets = [
    { r: 26, angle: 40, size: 3, color: "#ff9b6a" },
    { r: 42, angle: 160, size: 4, color: "#b8ff35" },
    { r: 58, angle: 300, size: 3.4, color: "#7cecff" },
    { r: 74, angle: 210, size: 5, color: "#ff4fbd" },
    { r: 90, angle: 80, size: 3, color: "#e8d8ff" },
  ];
  return <svg aria-hidden="true" className={className} viewBox="-100 -100 200 200">
    <circle fill="#ffb35c" opacity="0.9" r="9" />
    <circle fill="none" r="14" stroke="rgba(255,179,92,.5)" strokeWidth="0.8" />
    {orbits.map(radius => <circle fill="none" key={radius} r={radius} stroke="rgba(255,255,255,.22)" strokeWidth="0.7" />)}
    {planets.map(({ r, angle, size, color }) => {
      const rad = (angle * Math.PI) / 180;
      return <circle cx={Math.cos(rad) * r} cy={Math.sin(rad) * r} fill={color} key={r} r={size} />;
    })}
  </svg>;
}

export function Hero() {
  return <section aria-labelledby="living-hero-title" className="relative isolate overflow-hidden border-b border-white/10 px-6 pb-10 pt-14 text-white md:px-10 lg:min-h-[92vh]" id="overview">
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4fbd]/60 to-transparent" />
    <div aria-hidden="true" className="flytrap-motion absolute right-[4vw] top-[6%] hidden h-[80vh] w-px animate-[flytrap-scan_5.2s_linear_infinite] bg-gradient-to-b from-transparent via-[#b8ff35]/70 to-transparent md:block" />
    <WireframeMoon className="pointer-events-none absolute left-[38%] top-[-15rem] z-0 hidden size-[34rem] opacity-80 blur-[0.5px] md:block" />
    <OrbitalSystem className="flytrap-motion pointer-events-none absolute right-[23rem] top-[2.5rem] z-0 hidden w-64 animate-[flytrap-panel-float_9s_ease-in-out_infinite] opacity-80 xl:block" />

    <img aria-hidden="true" className="pointer-events-none absolute right-[-2rem] top-[-2.5rem] z-0 hidden w-60 -scale-x-100 rotate-12 opacity-75 mix-blend-screen saturate-125 md:block" draggable={false} src={plantA} />

    <CharacterLayer
      alt="Alienígena Flytrap em pé sobre uma plataforma holográfica, consultando um painel translúcido do Design System."
      className="absolute right-[-16vw] top-[-2%] z-0 hidden h-[min(92vh,920px)] w-[min(92vh,920px)] sm:block lg:right-[-4vw] xl:right-[13rem]"
      pose="standing"
    />

    <div className="relative z-10 max-w-xl">
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-[#ff4fbd]">Design System</p>
      <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl xl:text-6xl" id="living-hero-title">
        A living language
        <span className="block">for <span className="text-[#ff4fbd] drop-shadow-[0_0_24px_rgba(255,79,189,.5)]">future</span> interfaces.</span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-7 text-white/65">
        Um design system orgânico e adaptável que evolui com o seu produto. Biomórfico por natureza. Cibernético por design.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild className="rounded-full bg-[#F10081] px-6 text-white shadow-[0_0_28px_rgba(241,0,129,.45)] hover:bg-[#CF006A]" size="lg">
          <a href="#foundations">Get Started <span aria-hidden="true">→</span></a>
        </Button>
        <Button asChild className="rounded-full border-white/25 bg-white/5 px-6 text-white hover:bg-white/10" size="lg" variant="outline">
          <a href="#tokens">Explore Tokens <span aria-hidden="true" className="ml-1 grid size-5 place-items-center rounded-full border border-white/30 text-[0.6rem]">→</span></a>
        </Button>
      </div>
      <a
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#b8ff35] underline-offset-4 hover:underline"
        href="https://github.com/LouizeB/flytrapds"
      >
        Ver código no GitHub <FlytrapIcon icon={ExternalLinkIcon} size="sm" />
      </a>
    </div>

    <div className="relative z-10 mt-10 hidden w-64 flex-col gap-4 xl:absolute xl:right-10 xl:top-16 xl:flex">
      <FloatingPanel title="System synchronization">
        <div className="flex items-start gap-3">
          <ul className="grid flex-1 gap-2">
            {syncRows.map(row => <li className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/70" key={row}>
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
      <FloatingPanel delay={-2.4} title="Bio-signal feed">
        <p className="absolute right-4 top-4 font-mono text-xs text-white/70">96%</p>
        <div aria-hidden="true" className="flytrap-motion flytrap-organic mx-auto h-16 w-32 animate-[flytrap-pulse_4.6s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,79,189,.9),rgba(241,0,129,.4)_55%,rgba(139,92,246,.18)_75%,transparent_85%)] blur-[1px]" style={{ borderRadius: "48% 52% 60% 40% / 62% 58% 42% 38%" }} />
        <div className="mt-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em]">
          <span className="text-white/50">Stable</span>
          <span className="text-[#00c970]">Enable</span>
        </div>
      </FloatingPanel>
    </div>

    <div className="relative z-10 mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl sm:grid-cols-2 lg:mt-16 lg:max-w-4xl xl:grid-cols-4">
      {heroStrip.map(([title, detail, icon]) => <div className="flex items-center gap-3 bg-[#0a0c14]/85 px-4 py-3" key={title}>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white/60">
          {icon
            ? <FlytrapIcon icon={icon} size="sm" />
            : <span className="size-2 rounded-full bg-[#b8ff35] shadow-[0_0_10px_rgba(184,255,53,.9)]" />}
        </span>
        <span>
          <span className="block text-sm font-medium text-white/85">{title}</span>
          <span className="block text-xs text-white/45">{detail}</span>
        </span>
      </div>)}
    </div>
  </section>;
}
