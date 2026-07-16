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
  ToolIcon,
  type FlytrapIconComponent,
} from "@louizeb/flytrap-ui";

export type Appearance = "dark";

export const navSections: readonly [string, string, FlytrapIconComponent][] = [
  ["Overview", "overview", DashboardIcon],
  ["Foundations", "foundations", BrandIcon],
  ["Tokens", "tokens", AiAccentIcon],
  ["Components", "components", ToolIcon],
  ["Patterns", "patterns", InsightIcon],
  ["Accessibility", "accessibility", ApprovalIcon],
  ["Guidelines", "guidelines", InfoIcon],
  ["Memory Search", "memory", AiAccentIcon],
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

export function Sidebar() {
  const [active, setActive] = React.useState("overview");

  React.useEffect(() => {
    const elements = navSections
      .map(([, id]) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.08, 0.2, 0.45] },
    );

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return <aside className="relative z-30 flex flex-col gap-3 border-b border-[#F10081]/24 bg-[linear-gradient(180deg,rgba(8,10,16,.97),rgba(4,5,10,.94))] p-3 text-white shadow-[1px_0_36px_rgba(241,0,129,.22),inset_-1px_0_0_rgba(255,255,255,.06)] backdrop-blur-2xl lg:sticky lg:top-0 lg:h-screen lg:min-h-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
    <span aria-hidden="true" className="pointer-events-none absolute inset-y-4 right-0 w-px bg-gradient-to-b from-transparent via-[#ff4fbd]/70 to-transparent" />
    <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-28 w-px bg-gradient-to-b from-[#8b5cf6] to-transparent" />
    <a className="flex items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#b8ff35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060a]" href="#overview" onClick={() => setActive("overview")}>
      <span className="relative grid size-12 shrink-0 place-items-center rounded-full border-2 border-[#F10081]/70 bg-black/70 shadow-[0_0_28px_rgba(241,0,129,.65),inset_0_0_18px_rgba(139,92,246,.28)]">
        <span className="absolute inset-1.5 rounded-full border border-[#8b5cf6]/50" />
        <span className="absolute inset-3 rounded-full bg-[#ff4fbd]/20 blur-md" />
        <BrandMark className="relative scale-[.64]" label={null} size={32} />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[0.72rem] font-bold uppercase leading-tight tracking-[0.12em]">Flytrap Design System</span>
        <span className="block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/60">Design · 1.0</span>
      </span>
    </a>

    <nav aria-label="Sections" className="grid overflow-visible rounded-xl border border-white/10 bg-black/25 text-[0.82rem] shadow-[inset_0_0_24px_rgba(139,92,246,.08)]">
      {navSections.map(([label, id, icon]) => {
        const isActive = active === id;
        return <a
          className={[
            "group flex items-center gap-2.5 border-b border-white/7 px-3 py-2 font-medium outline-none transition-colors last:border-b-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#b8ff35]",
            isActive
              ? "border-[#ff64b4]/60 bg-gradient-to-r from-[#F10081] to-[#9b0059] text-white shadow-[0_0_26px_rgba(241,0,129,.55)]"
              : "text-white/68 hover:bg-white/6 hover:text-white",
          ].join(" ")}
          aria-current={isActive ? "page" : undefined}
          href={`#${id}`}
          key={id}
          onClick={() => setActive(id)}
        >
          <span className={isActive ? "text-white" : "text-white/70"}><FlytrapIcon icon={icon} size="sm" /></span>
          <span className="flex-1">{label}</span>
          <span aria-hidden="true" className={["font-mono text-xs transition-transform", isActive ? "text-white" : "text-white/25 group-hover:translate-x-0.5"].join(" ")}>›</span>
        </a>;
      })}
    </nav>

    <div className="relative rounded-xl border border-[rgba(241,0,129,.18)] bg-[rgba(10,11,18,.8)] p-3 shadow-[0_0_22px_rgba(241,0,129,.08)]">
      <span aria-hidden="true" className="absolute right-2.5 top-2.5 font-mono text-[0.6rem] text-white/30">×</span>
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/60">System status</p>
      <p className="mt-2 flex items-center gap-2 text-[0.68rem] text-white/75">
        <span className="size-1.5 rounded-full bg-[#00c970] shadow-[0_0_8px_rgba(0,201,112,.8)]" />
        Flytrap system online
      </p>
      <p className="mt-1 flex items-center gap-2 text-[0.68rem] text-white/70">
        <span className="size-1.5 rounded-full bg-[#F10081]/90 shadow-[0_0_8px_rgba(241,0,129,.7)]" />
        Synced · 230 tokens
      </p>
      <p className="mt-1 flex items-center gap-2 text-[0.68rem] text-white/60">
        <span className="size-1.5 rounded-full bg-[#8b5cf6]/90" />
        v1.0.0
      </p>
      <StatusWave />
    </div>

    <div className="rounded-xl border border-[rgba(241,0,129,.18)] bg-[rgba(10,11,18,.8)] p-3 shadow-[0_0_22px_rgba(241,0,129,.08)]">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/60">Display mode</p>
      <p className="mt-2 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-xs text-white/75">
        Dark experience only while the visual language for alternate themes is refined.
      </p>
    </div>

    <div className="rounded-xl border border-[rgba(241,0,129,.18)] bg-[rgba(10,11,18,.8)] p-3 shadow-[0_0_22px_rgba(241,0,129,.08)] lg:mt-auto">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/60">Version 1.0.0</p>
      <p className="mt-0.5 font-mono text-[0.55rem] text-white/70">Updated: 2026-07-13</p>
      <p className="mt-1 text-xs text-white/70">DTCG · React · APCA</p>
      <a
        aria-label="View changelog on GitHub"
        className="mt-3 inline-flex rounded-full border border-[#ff4fbd]/45 bg-[#ff4fbd]/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#ff9bdd] transition-colors hover:bg-[#ff4fbd]/20"
        href="https://github.com/LouizeB/flytrapds/blob/main/CHANGELOG.md"
      >View changelog</a>
    </div>
  </aside>;
}
