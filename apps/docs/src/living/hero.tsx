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

export function Hero() {
  return <section aria-labelledby="living-hero-title" className="relative isolate overflow-hidden border-b border-white/10 px-6 pb-10 pt-14 text-white md:px-10 lg:min-h-[92vh]" id="overview">
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4fbd]/60 to-transparent" />
    <div aria-hidden="true" className="flytrap-motion absolute right-[4vw] top-[6%] hidden h-[80vh] w-px animate-[flytrap-scan_5.2s_linear_infinite] bg-gradient-to-b from-transparent via-[#b8ff35]/70 to-transparent md:block" />

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
          <a href="#foundations">Get started <span aria-hidden="true">→</span></a>
        </Button>
        <Button asChild className="rounded-full border-white/25 bg-white/5 px-6 text-white hover:bg-white/10" size="lg" variant="outline">
          <a href="#tokens">Explore tokens</a>
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
        <ul className="grid gap-2">
          {syncRows.map(row => <li className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/70" key={row}>
            {row}
            <span className="size-1.5 rounded-full bg-[#b8ff35] shadow-[0_0_8px_rgba(184,255,53,.8)]" />
          </li>)}
        </ul>
      </FloatingPanel>
      <FloatingPanel delay={-2.4} title="Bio-signal feed">
        <div className="flex items-center justify-between">
          <div aria-hidden="true" className="flytrap-motion flytrap-organic size-16 animate-[flytrap-pulse_4.6s_ease-in-out_infinite] bg-[radial-gradient(circle_at_40%_40%,rgba(255,79,189,.85),rgba(241,0,129,.35)_60%,transparent_78%)] blur-[1px]" style={{ borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%" }} />
          <p className="font-display text-2xl font-bold text-white/90">98%</p>
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em]">
          <span className="text-white/50">Stable</span>
          <span className="text-[#b8ff35]">Estável</span>
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
