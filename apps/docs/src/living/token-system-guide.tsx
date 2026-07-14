import tokens from "../../../../packages/tokens/src/flytrap.tokens.json";
import spriteVertical from "../assets/flytrap-sprite-vertical.webp";
import { PillTabs, SectionCard, SectionHeader, TokenRow } from "./panels";

type TokenLeaf = {
  path: string;
  type?: string;
  value: unknown;
};

type TokenNode = {
  $type?: string;
  $value?: unknown;
  [key: string]: unknown;
};

const tokenSections = ["primitive", "foundation", "semantic", "component"] as const;
const colorScales = ["magenta", "acid", "neutral", "success", "warning", "error"] as const;
const magentaSteps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

function isRecord(value: unknown): value is TokenNode {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function collectLeaves(node: unknown, prefix = ""): TokenLeaf[] {
  if (!isRecord(node)) return [];
  if ("$value" in node) return [{ path: prefix, type: typeof node.$type === "string" ? node.$type : undefined, value: node.$value }];

  return Object.entries(node)
    .filter(([key]) => !key.startsWith("$"))
    .flatMap(([key, value]) => collectLeaves(value, prefix ? `${prefix}.${key}` : key));
}

function getByPath(path: string): unknown {
  return path.split(".").reduce<unknown>((current, segment) => isRecord(current) ? current[segment] : undefined, tokens);
}

function rawValue(path: string): unknown {
  const node = getByPath(path);
  return isRecord(node) && "$value" in node ? node.$value : undefined;
}

function resolveValue(value: unknown, depth = 0): string {
  if (depth > 8) return String(value ?? "");
  if (typeof value !== "string") return String(value ?? "");

  const reference = value.match(/^\{(.+)\}$/)?.[1];
  if (!reference) return value;

  return resolveValue(rawValue(reference), depth + 1);
}

function displayValue(path: string): string {
  const value = rawValue(path);
  const resolved = resolveValue(value);

  return typeof value === "string" && value.startsWith("{") ? `${value} → ${resolved}` : resolved;
}

const counts = tokenSections.map(section => ({
  label: section,
  value: collectLeaves(tokens[section]).length,
}));

const semanticColorRows = collectLeaves(tokens.semantic)
  .filter(token => {
    const resolved = resolveValue(token.value);
    return resolved.startsWith("#");
  })
  .slice(0, 10);

const componentTokenGroups = [
  { label: "Button", count: collectLeaves(tokens.component).filter(token => token.path.startsWith("button-")).length },
  { label: "Input", count: collectLeaves(tokens.component).filter(token => token.path.startsWith("input-")).length },
  { label: "AI", count: collectLeaves(tokens.component).filter(token => token.path.includes("agent") || token.path.includes("chat") || token.path.includes("insight")).length },
  { label: "Chart", count: collectLeaves(tokens.component).filter(token => token.path.startsWith("chart-")).length },
];

const typeTokens = collectLeaves(tokens.foundation.font);
const spaceTokens = collectLeaves(tokens.foundation.space);
const radiusTokens = collectLeaves(tokens.foundation.radius);
const motionTokens = collectLeaves(tokens.foundation.motion);
const breakpointTokens = collectLeaves(tokens.foundation.breakpoint);

function TokenMetric({ label, value }: { label: string; value: number | string }) {
  return <div className="rounded-xl border border-white/10 bg-black/35 p-3">
    <p className="font-display text-2xl font-bold text-white">{value}</p>
    <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/55">{label}</p>
  </div>;
}

function TokenList({ items }: { items: TokenLeaf[] }) {
  return <div className="grid gap-2">
    {items.map(item => <div className="grid gap-1 rounded-lg border border-white/8 bg-white/[.03] p-2" key={item.path}>
      <code className="font-mono text-[0.68rem] text-[#ff9bdd]">{item.path}</code>
      <span className="font-mono text-[0.62rem] text-white/62">{displayValue(`foundation.${item.path}`)}</span>
    </div>)}
  </div>;
}

export function TokenSystemGuide() {
  return <section aria-label="Tokens" className="relative border-b border-[#ff4fbd]/14 px-6 py-9 md:px-8">
    <img alt="" aria-hidden="true" className="pointer-events-none absolute left-[-9rem] top-[-6rem] z-0 hidden w-64 opacity-90 lg:block" draggable={false} src={spriteVertical} />
    <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:gap-12">
      <SectionHeader
        id="tokens"
        index="02"
        lead="The variables that connect visual decisions to product intent."
        linkHref="https://github.com/LouizeB/flytrapds/blob/main/packages/tokens/src/flytrap.tokens.json"
        linkLabel="Explore tokens"
        title="Tokens"
      />
      <div className="min-w-0 flex-1">
        <p className="mb-2 max-w-2xl text-sm leading-6 text-white/62">
          Flytrap tokens are organized from raw primitives to component-level aliases. Use this map to understand where a value comes from, what it controls, and when it is safe to use.
        </p>
        <PillTabs
          active={0}
          items={[
            { label: "All tokens", href: "#token-all" },
            { label: "Color", href: "#token-color" },
            { label: "Type", href: "#token-type" },
            { label: "Space", href: "#token-space" },
            { label: "Border", href: "#token-border" },
            { label: "Motion", href: "#token-motion" },
            { label: "Elevation", href: "#token-elevation" },
          ]}
          label="Token groups"
        />

        <div className="mt-4 grid gap-4">
          <SectionCard id="token-all" meta="contract" title="Token architecture">
            <div className="grid gap-4 xl:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="text-sm leading-6 text-white/65">
                  The system follows a layered contract: primitives define raw scales, foundations define reusable design decisions, semantic tokens translate intent, and component tokens bind those decisions to UI.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {counts.map(item => <TokenMetric key={item.label} label={item.label} value={item.value} />)}
                </div>
              </div>
              <div className="grid gap-2 rounded-xl border border-white/10 bg-black/35 p-3">
                {[
                  ["Primitive", "Raw palettes and base values. Do not use directly in product code unless building a new alias."],
                  ["Foundation", "Typography, spacing, radius, motion, breakpoints, and other reusable decisions."],
                  ["Semantic", "Purpose-driven aliases such as background, foreground, primary, border, and feedback colors."],
                  ["Component", "Implementation aliases for buttons, inputs, AI cards, chat bubbles, and charts."],
                ].map(([name, description]) => <div className="grid gap-1 rounded-lg border border-white/8 bg-white/[.03] p-2" key={name}>
                  <p className="font-display text-sm font-bold text-white/90">{name}</p>
                  <p className="text-xs leading-5 text-white/58">{description}</p>
                </div>)}
              </div>
            </div>
          </SectionCard>

          <SectionCard id="token-color" meta="primitive + semantic" title="Color tokens">
            <div className="grid gap-5 xl:grid-cols-[1.2fr_1fr]">
              <div className="grid gap-3">
                {colorScales.map(scale => <div className="grid gap-2" key={scale}>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/58">primitive.{scale}</p>
                    <p className="font-mono text-[0.58rem] text-white/45">11 steps</p>
                  </div>
                  <div className="grid grid-cols-11 overflow-hidden rounded-lg border border-white/12">
                    {magentaSteps.map(step => {
                      const color = resolveValue(rawValue(`primitive.${scale}.${step}`));
                      return <span className="aspect-square" key={`${scale}-${step}`} style={{ background: color }} title={`primitive.${scale}.${step} · ${color}`} />;
                    })}
                  </div>
                </div>)}
              </div>
              <div>
                <p className="mb-3 text-sm leading-6 text-white/62">
                  Product UI should prefer semantic aliases over primitive scales. The resolved value is shown on the right for auditability.
                </p>
                {semanticColorRows.map(token => <TokenRow
                  key={token.path}
                  name={`--${token.path}`}
                  swatch={resolveValue(token.value)}
                  value={displayValue(`semantic.${token.path}`)}
                />)}
              </div>
            </div>
          </SectionCard>

          <div className="grid gap-4 xl:grid-cols-2">
            <SectionCard id="token-type" meta="foundation" title="Type tokens">
              <div className="grid gap-4 md:grid-cols-[12rem_1fr]">
                <div>
                  <p className="font-display text-7xl font-bold leading-none text-[#ff4fbd]">Ag</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">Typography tokens define family, size, weight, and line-height for readable hierarchy.</p>
                </div>
                <TokenList items={typeTokens.slice(0, 12)} />
              </div>
            </SectionCard>

            <SectionCard id="token-space" meta="foundation" title="Space tokens">
              <p className="mb-3 text-sm leading-6 text-white/62">Spacing follows compact increments for controls and larger steps for page rhythm.</p>
              <div className="flex items-end gap-1.5">
                {spaceTokens.slice(0, 12).map(token => {
                  const value = resolveValue(token.value);
                  const pixels = Number.parseFloat(value) * (value.endsWith("rem") ? 16 : 1);
                  return <span className="grid flex-1 gap-2" key={token.path}>
                    <span className="rounded-sm bg-[#009200] shadow-[0_0_10px_rgba(0,146,0,.4)]" style={{ height: `${Math.max(4, Math.min(pixels, 80))}px` }} />
                    <span className="font-mono text-[0.52rem] text-white/50">{token.path.split(".").at(-1)}</span>
                  </span>;
                })}
              </div>
            </SectionCard>

            <SectionCard id="token-border" meta="foundation" title="Border and radius tokens">
              <div className="grid gap-4">
                <TokenList items={radiusTokens} />
                <div className="flex items-end justify-between gap-2">
                  {radiusTokens.map(token => <span className="grid flex-1 place-items-center" key={token.path}>
                    <span className="block size-10 border-2 border-[#ff4fbd]/70 bg-white/[.03]" style={{ borderRadius: resolveValue(token.value) }} />
                    <span className="mt-1.5 font-mono text-[0.52rem] text-white/55">{token.path.split(".").at(-1)}</span>
                  </span>)}
                </div>
              </div>
            </SectionCard>

            <SectionCard id="token-motion" meta="foundation" title="Motion tokens">
              <p className="mb-3 text-sm leading-6 text-white/62">Motion tokens separate quick UI feedback from slower organic ambience.</p>
              <TokenList items={motionTokens} />
            </SectionCard>

            <SectionCard id="token-elevation" meta="component-ready" title="Elevation and layering">
              <p className="text-sm leading-6 text-white/62">Elevation is expressed through component composition: border, surface, shadow, glow, and backdrop blur. Use it to clarify hierarchy without making every card scream.</p>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {[0, 1, 2, 3, 4].map(level => <span className="grid place-items-center gap-2" key={level}>
                  <span
                    className="block size-12 rounded-lg border border-white/12 bg-white/[.06]"
                    style={{ boxShadow: `0 ${level * 5}px ${level * 14}px rgba(0,0,0,.55), 0 0 ${level * 8}px rgba(255,79,189,${level * 0.07})` }}
                  />
                  <span className="font-mono text-[0.55rem] text-white/55">{level}</span>
                </span>)}
              </div>
            </SectionCard>

            <SectionCard meta="responsive" title="Breakpoint tokens">
              <TokenList items={breakpointTokens} />
            </SectionCard>
          </div>

          <SectionCard meta="component aliases" title="Component token coverage">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {componentTokenGroups.map(group => <div className="rounded-xl border border-white/10 bg-black/35 p-3" key={group.label}>
                <p className="font-display text-xl font-bold text-white">{group.label}</p>
                <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#ff9bdd]">{group.count} aliases</p>
              </div>)}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  </section>;
}
