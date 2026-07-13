import * as React from "react";
import { Button, CopyIcon, ConfirmIcon, FlytrapIcon, type FlytrapIconComponent } from "@flytrap/ui";

export function FloatingPanel({ title, className, children, delay = 0 }: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return <div
    className={["flytrap-panel flytrap-motion relative overflow-hidden animate-[flytrap-panel-float_6.8s_ease-in-out_infinite] rounded-2xl border border-[rgba(241,0,129,.34)] bg-[linear-gradient(145deg,rgba(16,18,30,.9),rgba(3,5,10,.74))] p-4 text-white shadow-[0_22px_65px_rgba(0,0,0,.72),0_0_36px_rgba(241,0,129,.18),inset_0_0_24px_rgba(139,92,246,.08)] backdrop-blur-[22px]", className].filter(Boolean).join(" ")}
    style={{ animationDelay: `${delay}s` }}
  >
    <span aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4fbd]/70 to-transparent" />
    <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-[#ff4fbd]/10 blur-2xl" />
    {title && <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/60">{title}</p>}
    {children}
  </div>;
}

export function SectionHeader({ index, id, title, lead, linkLabel, linkHref }: {
  index: string;
  id: string;
  title: string;
  lead: string;
  linkLabel: string;
  linkHref: string;
}) {
  return <div className="max-w-[14.5rem] shrink-0" id={id}>
    <span className="grid size-9 place-items-center rounded-full border border-[#ff4fbd]/45 bg-black/60 font-mono text-sm text-white shadow-[0_0_18px_rgba(241,0,129,.35)]">{index}</span>
    <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.08em] text-[#ff4fbd]">{title}</h2>
    <p className="mt-3 text-sm leading-6 text-white/60">{lead}</p>
    <a className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#ff4fbd] underline-offset-4 hover:underline" href={linkHref}>
      {linkLabel}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
    </a>
  </div>;
}

export function SectionCard({ title, meta, className, children }: {
  title: string;
  meta?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return <article className={["flytrap-card relative overflow-hidden rounded-[1.15rem] border border-[rgba(241,0,129,.22)] bg-[linear-gradient(145deg,rgba(14,18,28,.84),rgba(2,5,10,.72))] p-4 shadow-[0_18px_52px_rgba(0,0,0,.62),0_0_30px_rgba(139,92,246,.1),inset_0_0_18px_rgba(255,255,255,.025)] backdrop-blur-[20px]", className].filter(Boolean).join(" ")}>
    <span aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4fbd]/65 to-transparent" />
    <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#ff4fbd]/50 via-transparent to-[#8b5cf6]/40" />
    <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-[#ff4fbd]/8 blur-2xl" />
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="font-display text-lg font-bold text-white/90">{title}</h3>
      {meta && <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/60">{meta}</p>}
    </div>
    <div className="mt-4">{children}</div>
  </article>;
}

export function PillTabs({ items, active = 0, label }: { items: readonly string[]; active?: number; label: string }) {
  return <div aria-label={label} className="flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-black/25 p-1.5 backdrop-blur" role="list">
    {items.map((item, index) => <span
      aria-current={index === active ? "true" : undefined}
      className={[
        "whitespace-nowrap rounded-md border px-2.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em]",
        index === active ? "border-[#ff4fbd]/45 bg-[#ff4fbd]/12 text-[#ffd2ef]" : "border-white/8 bg-white/[.03] text-white/62",
      ].join(" ")}
      key={item}
      role="listitem"
    >{item}</span>)}
  </div>;
}

export function ComponentPreview({ title, className, children }: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return <article className={["flytrap-preview relative overflow-hidden rounded-[1rem] border border-[rgba(241,0,129,.2)] bg-[rgba(5,8,14,.78)] p-3 shadow-[0_14px_38px_rgba(0,0,0,.62),0_0_24px_rgba(139,92,246,.11)] backdrop-blur-[18px]", className].filter(Boolean).join(" ")}>
    <span aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/60">{title}</p>
    <div className="mt-3 grid gap-3">{children}</div>
  </article>;
}

export function TokenRow({ name, value, swatch }: { name: string; value: string; swatch: string }) {
  return <div className="flex items-center justify-between gap-3 border-b border-white/6 py-2 last:border-b-0">
    <code className="font-mono text-xs text-[#ff9bdd]">{name}</code>
    <span className="flex items-center gap-2">
      <span className="size-4 rounded-sm border border-white/20" style={{ background: swatch }} />
      <code className="font-mono text-xs text-white/70">{value}</code>
    </span>
  </div>;
}

const codeTokenStyles: Record<string, string> = {
  keyword: "text-[#ff4fbd]",
  string: "text-[#b8ff35]",
  component: "text-[#7cecff]",
  plain: "text-white/80",
  comment: "text-white/70",
};

export type CodeToken = { text: string; kind?: keyof typeof codeTokenStyles };

export function CodeBlock({ lines, copyText }: { lines: CodeToken[][]; copyText: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return <div className="flytrap-codeblock relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c14] shadow-2xl shadow-black/40">
    <div className="flex items-center gap-1.5 border-b border-white/8 px-4 py-2.5">
      <span className="size-2 rounded-full bg-[#ff4fbd]/60" />
      <span className="size-2 rounded-full bg-[#b8ff35]/50" />
      <span className="size-2 rounded-full bg-white/20" />
    </div>
    <pre className="overflow-x-auto p-5 font-mono text-sm leading-7">
      {lines.map((line, lineIndex) => <div key={lineIndex}>
        {line.map((token, tokenIndex) => <span className={codeTokenStyles[token.kind ?? "plain"]} key={tokenIndex}>{token.text}</span>)}
      </div>)}
    </pre>
    <Button className="absolute bottom-3 right-3 border-[#ff4fbd]/40 bg-[#ff4fbd]/10 text-[#ff9bdd] hover:bg-[#ff4fbd]/20" onClick={copy} size="sm" variant="outline">
      <FlytrapIcon icon={copied ? ConfirmIcon : CopyIcon} size="sm" />
      {copied ? "Copied" : "Copy"}
    </Button>
  </div>;
}

export function WorkflowCard({ icon, title, description }: {
  icon: FlytrapIconComponent;
  title: string;
  description: string;
}) {
  return <article className="flytrap-workflow-card rounded-2xl border border-white/10 bg-white/[.04] p-5 text-center shadow-2xl shadow-black/25 backdrop-blur-xl">
    <h3 className="font-display text-base font-bold text-white/90">{title}</h3>
    <p className="mt-2 text-xs leading-5 text-white/70">{description}</p>
    <span className="mx-auto mt-5 grid size-12 place-items-center rounded-xl border border-[#ff4fbd]/30 bg-[#ff4fbd]/10 text-[#ff9bdd] shadow-[0_0_22px_rgba(255,79,189,.25)]">
      <FlytrapIcon icon={icon} size="lg" />
    </span>
  </article>;
}
