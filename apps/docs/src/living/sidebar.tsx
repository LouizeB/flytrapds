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
  return <svg aria-hidden="true" className="mt-2 h-6 w-full text-[#b8ff35]/70" preserveAspectRatio="none" viewBox="0 0 120 24">
    <polyline
      fill="none"
      points="0,14 8,14 12,6 18,20 24,10 32,14 40,14 46,4 52,18 60,12 70,14 78,8 84,16 92,13 100,14 108,9 114,15 120,12"
      stroke="currentColor"
      strokeWidth="1.5"
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

  return <aside className="relative z-30 flex flex-col gap-5 border-b border-white/10 bg-[#07080d]/92 p-5 text-white backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
    <a className="flex items-center gap-3" href="#overview" onClick={() => setActive("overview")}>
      <span className="grid size-11 place-items-center rounded-full border border-[#ff4fbd]/40 bg-[#ff4fbd]/10 shadow-[0_0_18px_rgba(255,79,189,.35)]">
        <BrandMark className="scale-75" label={null} size={32} />
      </span>
      <span>
        <span className="block font-display text-sm font-bold uppercase tracking-[0.14em]">Living System</span>
        <span className="block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/40">Flytrap · v1.0</span>
      </span>
    </a>

    <nav aria-label="Seções" className="grid gap-1 text-sm">
      {navSections.map(([label, id, icon]) => {
        const isActive = active === id;
        return <a
          className={[
            "group flex items-center gap-2.5 rounded-lg border px-3 py-2 font-medium transition-colors",
            isActive
              ? "border-[#ff4fbd]/50 bg-[#ff4fbd]/15 text-[#ffd7ee] shadow-[0_0_18px_rgba(255,79,189,.25)]"
              : "border-transparent text-white/65 hover:border-white/10 hover:bg-white/5 hover:text-white",
          ].join(" ")}
          href={`#${id}`}
          key={id}
          onClick={() => setActive(id)}
        >
          <span className={isActive ? "text-[#ff4fbd]" : "text-white/35"}><FlytrapIcon icon={icon} size="sm" /></span>
          <span className="flex-1">{label}</span>
          <span aria-hidden="true" className={["font-mono text-xs transition-transform", isActive ? "text-[#ff4fbd]" : "text-white/25 group-hover:translate-x-0.5"].join(" ")}>›</span>
        </a>;
      })}
    </nav>

    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/40">System status</p>
      <p className="mt-2 flex items-center gap-2 text-xs text-white/75">
        <span className="size-1.5 rounded-full bg-[#b8ff35] shadow-[0_0_8px_rgba(184,255,53,.8)]" />
        All systems organic
      </p>
      <p className="mt-1 flex items-center gap-2 text-xs text-white/55">
        <span className="size-1.5 rounded-full bg-[#7cecff]/80" />
        Synced · 230 tokens
      </p>
      <StatusWave />
    </div>

    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
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

    <div className="rounded-xl border border-white/10 bg-black/30 p-3 lg:mt-auto">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/40">Version 1.0.0</p>
      <p className="mt-0.5 font-mono text-[0.55rem] text-white/35">Updated 07.09.2026</p>
      <p className="mt-1 text-xs text-white/55">DTCG · React · APCA</p>
      <a
        className="mt-3 inline-flex rounded-full border border-[#ff4fbd]/45 bg-[#ff4fbd]/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#ff9bdd] transition-colors hover:bg-[#ff4fbd]/20"
        href="https://github.com/LouizeB/flytrapds/blob/main/CHANGELOG.md"
      >View changelog</a>
    </div>
  </aside>;
}
