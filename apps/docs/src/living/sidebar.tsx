import * as React from "react";
import {
  AgentIcon,
  AiAccentIcon,
  ApprovalIcon,
  BrandIcon,
  BrandMark,
  ChartIcon,
  DashboardIcon,
  FlytrapIcon,
  InfoIcon,
  InsightIcon,
  Switch,
  ToolIcon,
  type FlytrapIconComponent,
} from "@flytrap/ui";

export type Appearance = "light" | "dark" | "vibrant";

export const navSections: readonly [string, string, FlytrapIconComponent][] = [
  ["Overview", "overview", DashboardIcon],
  ["Foundations", "foundations", BrandIcon],
  ["Tokens", "tokens", AiAccentIcon],
  ["Components", "components", ToolIcon],
  ["Patterns", "patterns", InsightIcon],
  ["Accessibility", "accessibility", ApprovalIcon],
  ["Guidelines", "guidelines", InfoIcon],
  ["Code / Develop", "code", ChartIcon],
  ["AI Workflows", "ai-workflows", AgentIcon],
] as const;

function StatusWave() {
  return <svg aria-hidden="true" className="mt-2 h-8 w-full text-[#ff4fbd]" preserveAspectRatio="none" viewBox="0 0 120 28">
    <polyline
      fill="none"
      opacity="0.85"
      points="0,18 6,18 10,8 15,24 20,12 26,18 33,18 38,4 44,23 50,14 58,18 65,9 71,21 78,16 85,18 92,10 98,20 105,15 112,18 120,13"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <polyline
      fill="none"
      opacity="0.3"
      points="0,20 8,19 14,14 20,23 27,17 35,20 42,11 49,24 56,18 64,20 72,14 80,22 88,18 96,20 104,16 112,21 120,17"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>;
}

export function Sidebar({ appearance, onAppearanceChange }: {
  appearance: Appearance;
  onAppearanceChange: (value: Appearance) => void;
}) {
  const [active, setActive] = React.useState("overview");
  const vibrant = appearance === "vibrant";
  const mode = appearance === "light" ? "light" : "dark";

  return <aside className="relative z-30 flex flex-col gap-5 border-b border-[#F10081]/15 bg-[rgba(8,10,16,.92)] p-5 text-white shadow-[1px_0_24px_rgba(241,0,129,.12)] backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
    <a className="flex items-center gap-3" href="#overview" onClick={() => setActive("overview")}>
      <span className="relative grid size-11 place-items-center rounded-full border-2 border-[#F10081]/70 bg-black/60 shadow-[0_0_22px_rgba(241,0,129,.5)]">
        <span className="absolute inset-1.5 rounded-full border border-[#8b5cf6]/50" />
        <BrandMark className="relative scale-[.55]" label={null} size={32} />
      </span>
      <span>
        <span className="block font-display text-sm font-bold uppercase tracking-[0.14em]">Living System</span>
        <span className="block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/40">Design · 1.0</span>
      </span>
    </a>

    <nav aria-label="Seções" className="grid gap-1 text-sm">
      {navSections.map(([label, id, icon]) => {
        const isActive = active === id;
        return <a
          className={[
            "group flex items-center gap-2.5 rounded-lg border px-3 py-2 font-medium transition-colors",
            isActive
              ? "border-[#ff64b4]/60 bg-gradient-to-r from-[#F10081] to-[#c2006a] text-white shadow-[0_0_22px_rgba(241,0,129,.45)]"
              : "border-transparent text-white/65 hover:border-white/10 hover:bg-white/5 hover:text-white",
          ].join(" ")}
          href={`#${id}`}
          key={id}
          onClick={() => setActive(id)}
        >
          <span className={isActive ? "text-white" : "text-white/35"}><FlytrapIcon icon={icon} size="sm" /></span>
          <span className="flex-1">{label}</span>
          <span aria-hidden="true" className={["font-mono text-xs transition-transform", isActive ? "text-white" : "text-white/25 group-hover:translate-x-0.5"].join(" ")}>›</span>
        </a>;
      })}
    </nav>

    <div className="relative rounded-xl border border-[rgba(241,0,129,.18)] bg-[rgba(10,11,18,.8)] p-3 shadow-[0_0_22px_rgba(241,0,129,.08)]">
      <span aria-hidden="true" className="absolute right-2.5 top-2.5 font-mono text-[0.6rem] text-white/30">×</span>
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/40">System status</p>
      <p className="mt-2 flex items-center gap-2 text-xs text-white/75">
        <span className="size-1.5 rounded-full bg-[#00c970] shadow-[0_0_8px_rgba(0,201,112,.8)]" />
        All systems organic
      </p>
      <p className="mt-1 flex items-center gap-2 text-xs text-white/55">
        <span className="size-1.5 rounded-full bg-[#F10081]/90 shadow-[0_0_8px_rgba(241,0,129,.7)]" />
        Synced · 230 tokens
      </p>
      <p className="mt-1 flex items-center gap-2 text-xs text-white/45">
        <span className="size-1.5 rounded-full bg-[#8b5cf6]/90" />
        v1.0.0
      </p>
      <StatusWave />
    </div>

    <div className="rounded-xl border border-[rgba(241,0,129,.18)] bg-[rgba(10,11,18,.8)] p-3 shadow-[0_0_22px_rgba(241,0,129,.08)]">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/40">Theme</p>
      <label className="mt-2 flex items-center justify-between gap-3 text-xs text-white/75">
        Bio-Cyber
        <Switch
          aria-label="Alternar tema Bio-Cyber (vibrant)"
          checked={vibrant}
          onCheckedChange={checked => onAppearanceChange(checked ? "vibrant" : mode)}
        />
      </label>
      <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/40">Mode</p>
      <div aria-label="Modo de cor" className="mt-2 flex gap-1 rounded-lg border border-white/10 bg-black/40 p-1" role="group">
        {(["light", "dark", "auto"] as const).map(value => <button
          aria-pressed={!vibrant && value !== "auto" && mode === value}
          className={[
            "flex-1 rounded-md px-2 py-1 text-xs capitalize transition-colors",
            !vibrant && value !== "auto" && mode === value ? "bg-[#ff4fbd]/20 text-[#ffd7ee]" : "text-white/50 hover:text-white/80",
          ].join(" ")}
          key={value}
          onClick={() => onAppearanceChange(
            value === "auto"
              ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
              : value,
          )}
          type="button"
        >{value}</button>)}
      </div>
    </div>

    <div className="rounded-xl border border-[rgba(241,0,129,.18)] bg-[rgba(10,11,18,.8)] p-3 shadow-[0_0_22px_rgba(241,0,129,.08)] lg:mt-auto">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/40">Version 1.0.0</p>
      <p className="mt-0.5 font-mono text-[0.55rem] text-white/35">Updated: 03.14.2025</p>
      <p className="mt-1 text-xs text-white/55">DTCG · React · APCA</p>
      <a
        className="mt-3 inline-flex rounded-full border border-[#ff4fbd]/45 bg-[#ff4fbd]/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#ff9bdd] transition-colors hover:bg-[#ff4fbd]/20"
        href="https://github.com/LouizeB/flytrapds/blob/main/CHANGELOG.md"
      >View changelog</a>
    </div>
  </aside>;
}
