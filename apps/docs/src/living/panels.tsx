import * as React from "react";
import { Button, CopyIcon, ConfirmIcon, FlytrapIcon, type FlytrapIconComponent } from "@flytrap/ui";

export function FloatingPanel({ title, className, children, delay = 0 }: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return <div
    className={["flytrap-motion animate-[flytrap-panel-float_6.8s_ease-in-out_infinite] rounded-2xl border border-white/12 bg-black/40 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur-xl", className].filter(Boolean).join(" ")}
    style={{ animationDelay: `${delay}s` }}
  >
    {title && <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/45">{title}</p>}
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
  return <div className="max-w-xs shrink-0" id={id}>
    <span className="grid size-9 place-items-center rounded-full border border-white/20 bg-black/40 font-mono text-xs text-white/70">{index}</span>
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
  return <article className={["rounded-2xl border border-white/10 bg-white/[.045] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl transition-colors hover:border-[#ff4fbd]/35", className].filter(Boolean).join(" ")}>
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="font-display text-lg font-bold text-white/90">{title}</h3>
      {meta && <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/40">{meta}</p>}
    </div>
    <div className="mt-4">{children}</div>
  </article>;
}

export function PillTabs({ items, active = 0, label }: { items: readonly string[]; active?: number; label: string }) {
  return <div aria-label={label} className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-black/30 p-1 backdrop-blur" role="tablist">
    {items.map((item, index) => <span
      aria-selected={index === active}
      className={[
        "whitespace-nowrap rounded-lg px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em]",
        index === active ? "bg-[#ff4fbd] text-[#1c0313] shadow-[0_0_18px_rgba(255,79,189,.45)]" : "text-white/55",
      ].join(" ")}
      key={item}
      role="tab"
    >{item}</span>)}
  </div>;
}

export function ComponentPreview({ title, className, children }: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return <article className={["rounded-2xl border border-white/10 bg-black/35 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl transition-colors hover:border-[#b8ff35]/35", className].filter(Boolean).join(" ")}>
    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/45">{title}</p>
    <div className="mt-3 grid gap-3">{children}</div>
  </article>;
}

export function TokenRow({ name, value, swatch }: { name: string; value: string; swatch: string }) {
  return <div className="flex items-center justify-between gap-3 border-b border-white/6 py-2 last:border-b-0">
    <code className="font-mono text-xs text-[#ff9bdd]">{name}</code>
    <span className="flex items-center gap-2">
      <span className="size-4 rounded-sm border border-white/20" style={{ background: swatch }} />
      <code className="font-mono text-xs text-white/55">{value}</code>
    </span>
  </div>;
}

const codeTokenStyles: Record<string, string> = {
  keyword: "text-[#ff4fbd]",
  string: "text-[#b8ff35]",
  component: "text-[#7cecff]",
  plain: "text-white/80",
  comment: "text-white/35",
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

  return <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c14] shadow-2xl shadow-black/40">
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
    <Button className="absolute right-3 top-12 border-[#ff4fbd]/40 bg-[#ff4fbd]/10 text-[#ff9bdd] hover:bg-[#ff4fbd]/20" onClick={copy} size="sm" variant="outline">
      <FlytrapIcon icon={copied ? ConfirmIcon : CopyIcon} size="sm" />
      {copied ? "Copiado" : "Copy"}
    </Button>
  </div>;
}

export function WorkflowCard({ icon, title, description }: {
  icon: FlytrapIconComponent;
  title: string;
  description: string;
}) {
  return <article className="group rounded-2xl border border-white/10 bg-white/[.04] p-5 text-center shadow-2xl shadow-black/25 backdrop-blur-xl transition-colors hover:border-[#ff4fbd]/40">
    <h3 className="font-display text-base font-bold text-white/90">{title}</h3>
    <p className="mt-2 text-xs leading-5 text-white/55">{description}</p>
    <span className="mx-auto mt-5 grid size-12 place-items-center rounded-xl border border-[#ff4fbd]/30 bg-[#ff4fbd]/10 text-[#ff9bdd] shadow-[0_0_22px_rgba(255,79,189,.25)] transition-transform group-hover:scale-110">
      <FlytrapIcon icon={icon} size="lg" />
    </span>
  </article>;
}
