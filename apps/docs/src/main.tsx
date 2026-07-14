import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AgentIcon,
  AiAccentIcon,
  ApprovalIcon,
  Badge,
  BrandIcon,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartIcon,
  Combobox,
  DashboardIcon,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  DatePickerField,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ErrorIcon,
  Field,
  FileUpload,
  FlytrapIcon,
  InlineNotification,
  Input,
  InsightIcon,
  InteractiveCard,
  MenuIcon,
  MediaCard,
  ModelConfidence,
  MoodSelector,
  MoodSignal,
  PersonalizationPanel,
  PlayerControls,
  Progress,
  RecommendationRail,
  SearchIcon,
  SearchField,
  SendIcon,
  SliderField,
  SmartDataTable,
  StatusIndicator,
  SuccessIcon,
  SwitchField,
  Timeline,
  TimelineItem,
  ToolIcon,
  TreeItem,
  TreeView,
} from "@flytrap/ui";
import "@flytrap/ui/styles";
import "./site.css";
import { AtmosphereLayer, OrganicBackground, TechFrame } from "./living/organic-background";
import { BootLoader } from "./living/boot-loader";
import organismBr from "./assets/flytrap-organism-br.webp";
import spriteWideB from "./assets/flytrap-sprite-wide-b.webp";
import spriteCorner from "./assets/flytrap-sprite-corner.webp";
import spritePlatform from "./assets/flytrap-sprite-platform.webp";
import { CharacterLayer } from "./living/character";
import { Sidebar } from "./living/sidebar";
import { Hero } from "./living/hero";
import { TokenSystemGuide } from "./living/token-system-guide";
import {
  CodeBlock,
  ComponentPreview,
  FloatingPanel,
  PillTabs,
  SectionCard,
  SectionHeader,
  WorkflowCard,
} from "./living/panels";

const anatomyLayerDetails = [
  {
    description: "The visible shell: background, border, radius, elevation, and density.",
    example: "Card, input, modal panel",
    label: "Surface",
    token: "semantic.card",
  },
  {
    description: "The readable content layer: copy, icon, media, table rows, or input value.",
    example: "Title, hint, media, rows",
    label: "Content",
    token: "semantic.foreground",
  },
  {
    description: "The structure that groups content and defines spacing, alignment, and layout behavior.",
    example: "Header, body, footer",
    label: "Container",
    token: "foundation.space",
  },
  {
    description: "The interaction layer for hover, focus, selected, disabled, error, and loading.",
    example: "Focus ring, selected card",
    label: "State layer",
    token: "semantic.ring",
  },
  {
    description: "The timing layer that controls transitions without hiding information.",
    example: "Panel entrance, feedback",
    label: "Motion layer",
    token: "foundation.motion",
  },
  {
    description: "The Flytrap expressive layer: glow, organism atmosphere, and AI/streaming mood signals.",
    example: "Glow, pulse, bio-signal",
    label: "Bio-field",
    token: "public art",
  },
] as const;

const iconographySet = [AiAccentIcon, ToolIcon, ApprovalIcon, AgentIcon, ChartIcon, DashboardIcon, SearchIcon, MenuIcon] as const;

const workflowCards = [
  { icon: AiAccentIcon, title: "Generate UI", description: "Describe the intent and assemble screens with the system components." },
  { icon: ApprovalIcon, title: "Audit", description: "Check accessibility, APCA contrast, token usage, and component consistency." },
  { icon: ToolIcon, title: "Refactor", description: "Improve structure without breaking semantic contracts or visual intent." },
  { icon: BrandIcon, title: "Document", description: "Turn code and component states into clear system documentation." },
] as const;

const comboboxOptions: React.ComponentProps<typeof Combobox>["options"] = [
  { value: "foundation", label: "Foundations" },
  { value: "tokens", label: "Tokens" },
  { value: "components", label: "Components" },
  { value: "streaming", label: "Streaming AI" },
];

const moodOptions: React.ComponentProps<typeof MoodSelector>["options"] = [
  { value: "calm", label: "Calm", tone: "calm", description: "Reduces stimulation and supports soft discovery." },
  { value: "focus", label: "Focus", tone: "focus", description: "Prioritizes continuity, clarity, and the next best action." },
  { value: "energy", label: "Energy", tone: "energy", description: "Raises pace, contrast, and high-signal recommendations." },
  { value: "melancholy", label: "Noir", tone: "melancholy", description: "Creates a deeper, more reflective curation mode." },
];

const recommendationCards: Array<{
  active?: boolean;
  badge: string;
  duration: string;
  subtitle: string;
  title: string;
}> = [
  { title: "Bio-signal playlist", subtitle: "A sequence tuned to the detected mood.", duration: "24m", badge: "AI", active: true },
  { title: "Neon garden", subtitle: "Visual content that slows the pace without losing presence.", duration: "11m", badge: "Calm" },
  { title: "Pulse protocol", subtitle: "A high-energy recommendation with faster transitions.", duration: "18m", badge: "Energy" },
];

const componentReferenceGroups = [
  {
    anchor: "#component-inputs",
    count: 14,
    description: "Forms, search, selection, upload, date, slider, switch, and control composition.",
    examples: ["Input", "SearchField", "Combobox", "FileUpload"],
    name: "Inputs",
    status: "Ready",
  },
  {
    anchor: "#component-navigation",
    count: 10,
    description: "Page structure, sidebar, breadcrumbs, pagination, command menus, and tree navigation.",
    examples: ["Sidebar", "Breadcrumb", "Pagination", "TreeView"],
    name: "Navigation",
    status: "Ready",
  },
  {
    anchor: "#component-feedback",
    count: 12,
    description: "Alerts, inline notifications, progress, status, skeleton, spinner, and toast feedback.",
    examples: ["InlineNotification", "Toast", "Progress", "StatusIndicator"],
    name: "Feedback",
    status: "Ready",
  },
  {
    anchor: "#component-data-display",
    count: 9,
    description: "Tables, charts, token swatches, data lists, timelines, KPI cards, and structured values.",
    examples: ["SmartDataTable", "Chart", "DataList", "Timeline"],
    name: "Data display",
    status: "Ready",
  },
  {
    anchor: "#component-surfaces",
    count: 11,
    description: "Cards, media, previews, interactive surfaces, empty states, layout primitives, and headers.",
    examples: ["Card", "MediaCard", "InteractiveCard", "ComponentPreview"],
    name: "Surfaces",
    status: "Ready",
  },
  {
    anchor: "#component-overlays",
    count: 7,
    description: "Dialog, sheet, popover, dropdown menu, tooltip, command dialog, and alert dialog behavior.",
    examples: ["Dialog", "Sheet", "Popover", "DropdownMenu"],
    name: "Overlays",
    status: "Ready",
  },
  {
    anchor: "#component-ai",
    count: 14,
    description: "AI-native message, reasoning, approval, trace, tool call, citation, and personalization components.",
    examples: ["ChatThread", "PromptInput", "ReasoningStream", "ToolCallBlock"],
    name: "AI / Streaming",
    status: "Specialized",
  },
] as const;

const componentAnatomy = ["Root", "Label", "Content", "State", "Feedback", "Motion"] as const;

const componentQualityChecks = [
  ["Keyboard", "Every interactive component exposes focus and supports keyboard navigation."],
  ["Screen reader", "Names, descriptions, live regions, and roles are explicit where the component needs them."],
  ["Tokens", "Component styling resolves through semantic and component token aliases."],
  ["States", "Default, hover, focus, active, disabled, loading, error, and empty states are represented."],
] as const;

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const handleBootComplete = React.useCallback(() => setBootComplete(true), []);

  React.useEffect(() => {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.classList.add("dark");
    document.body.style.background = "#05060a";
  }, []);

  React.useEffect(() => {
    document.documentElement.style.overflow = bootComplete ? "" : "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [bootComplete]);

  return <div className="dark">
    <a
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-[#b8ff35] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#071006] focus:shadow-[0_0_24px_rgba(184,255,53,.45)]"
      href="#main-content"
    >
      Skip to main content
    </a>
    {!bootComplete && <BootLoader onComplete={handleBootComplete} />}
    <div className="min-h-screen bg-[#05060a] text-white lg:grid lg:grid-cols-[268px_1fr]">
      <Sidebar />

      <main aria-label="Flytrap Design System documentation" className="relative min-w-0 overflow-hidden" id="main-content" tabIndex={-1}>
        <OrganicBackground enable3D={bootComplete} light={false} />
        <AtmosphereLayer />
        <TechFrame />
        <div className="relative z-10 mx-auto max-w-[1440px] border-x border-white/6 bg-black/[.08] shadow-[0_0_80px_rgba(0,0,0,.45)]">
          <Hero />

          {/* 01 · Foundations */}
          <section aria-label="Foundations" className="relative border-b border-[#ff4fbd]/14 px-6 py-9 md:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              <SectionHeader
                id="foundations"
                index="01"
                lead="The core principles that shape the Flytrap interface system."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md"
                linkLabel="View foundations"
                title="Foundations"
              />
              <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <SectionCard meta="8 scales" title="Color">
                  <div className="flex gap-1.5">
                    {["#F10081", "#FF64A4", "#8B5CF6", "#00C970", "#C9C2C4", "#837A7B", "#3A3540", "#16141A"].map(color => <span className="h-14 flex-1 rounded-md border border-white/15" key={color} style={{ background: color }} />)}
                  </div>
                  <span aria-hidden="true" className="mt-3 inline-grid size-7 place-items-center rounded-full border border-[#F10081]/50 bg-[#F10081]/15 shadow-[0_0_14px_rgba(241,0,129,.4)]">
                    <span className="size-2.5 rounded-full bg-[#F10081]" />
                  </span>
                </SectionCard>
                <SectionCard meta="fluid" title="Typography">
                  <p className="font-display text-6xl font-bold text-[#ff4fbd]">Ag</p>
                  <p className="mt-2 text-sm text-white/70">Satoshi Variable</p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/60">Fluid · Humanist · Technical</p>
                </SectionCard>
                <SectionCard meta="8pt" title="Grid & Layout">
                  <div aria-hidden="true" className="grid h-20 grid-cols-12 gap-1">
                    {Array.from({ length: 12 }, (_, index) => <span
                      className={["rounded-sm border", [3, 7].includes(index) ? "border-[#F10081]/80 bg-[#F10081]/10 shadow-[0_0_8px_rgba(241,0,129,.4)]" : "border-white/12 bg-white/[.03]"].join(" ")}
                      key={index}
                    />)}
                  </div>
                  <p className="mt-3 text-sm text-white/70">12 Column Grid</p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/60">8pt Baseline</p>
                </SectionCard>
                <SectionCard meta="semantic" title="Iconography">
                  <div className="grid grid-cols-4 gap-2 text-white/70">
                    {iconographySet.map((icon, index) => <span className="grid aspect-square place-items-center rounded-lg border border-white/10 bg-black/30" key={index}>
                      <FlytrapIcon icon={icon} />
                    </span>)}
                  </div>
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/60">2px line · Rounded</p>
                </SectionCard>
              </div>
            </div>
          </section>

          {/* 02 · Tokens */}
          <TokenSystemGuide />

          {/* 03 · Components */}
          <section aria-label="Components" className="relative min-h-[420px] overflow-hidden border-b border-[#ff4fbd]/14 px-6 py-9 [contain:paint] md:px-8">
            <CharacterLayer
              alt="Flytrap alien lying on a holographic circuit board while inspecting the component repository."
              className="absolute right-0 top-[8%] z-0 hidden h-[min(50vw,720px)] w-[min(58vw,860px)] lg:block xl:right-0"
              pose="lying"
            />
            <img
              alt=""
              aria-hidden="true"
              className="flytrap-motion pointer-events-none absolute right-0 top-[38%] z-0 hidden w-[min(52vw,820px)] animate-[flytrap-panel-float_8.4s_ease-in-out_infinite] opacity-95 drop-shadow-[0_30px_80px_rgba(139,92,246,.48)] lg:block"
              draggable={false}
              src={spritePlatform}
            />
            <img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-5rem] right-0 z-0 hidden w-[54rem] opacity-95 lg:block" draggable={false} src={spriteWideB} />
            <FloatingPanel className="absolute right-8 top-14 z-40 hidden w-80 xl:block" title="Component anatomy">
              <p className="text-xs leading-5 text-white/58">
                Inspect the six layers that every Flytrap component should document before it ships.
              </p>
              <div aria-hidden="true" className="relative mx-auto mt-3 h-32 w-48 [perspective:760px]">
                {anatomyLayerDetails.map((layer, index) => <span
                  className="absolute inset-x-3 grid h-11 place-items-center rounded-xl border border-[#ff4fbd]/45 bg-[linear-gradient(135deg,rgba(255,79,189,.18),rgba(139,92,246,.08))] px-3 text-center font-mono text-[0.54rem] uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm"
                  key={layer.label}
                  style={{ top: `${index * 12}px`, transform: "rotateX(58deg) rotateZ(-30deg)", opacity: 1 - index * 0.08, zIndex: anatomyLayerDetails.length - index }}
                >
                  {index + 1} · {layer.label}
                </span>)}
              </div>
              <div className="mt-4 grid gap-1.5">
                {anatomyLayerDetails.map((layer, index) => <details
                  className="group rounded-xl border border-white/8 bg-white/[.035] p-2 open:border-[#ff4fbd]/35 open:bg-[#ff4fbd]/8"
                  key={layer.label}
                  open={index === 0}
                >
                  <summary className="flex min-h-8 cursor-pointer list-none items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#b8ff35] [&::-webkit-details-marker]:hidden">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#ff4fbd]/16 font-mono text-[0.55rem] text-[#ff9bdd]">{index + 1}</span>
                    <span className="flex-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/72">{layer.label}</span>
                    <span aria-hidden="true" className="font-mono text-xs text-white/35 transition-transform group-open:rotate-90">›</span>
                  </summary>
                  <div className="mt-2 grid gap-2 pl-7">
                    <p className="text-xs leading-5 text-white/62">{layer.description}</p>
                    <div className="grid grid-cols-[4.5rem_1fr] gap-2 text-[0.62rem] leading-5">
                      <span className="font-mono uppercase tracking-[0.14em] text-white/40">Example</span>
                      <span className="text-white/66">{layer.example}</span>
                      <span className="font-mono uppercase tracking-[0.14em] text-white/40">Token</span>
                      <code className="text-[#ff9bdd]">{layer.token}</code>
                    </div>
                  </div>
                </details>)}
              </div>
            </FloatingPanel>
            <div className="relative z-20 flex flex-col gap-8 lg:flex-row lg:gap-12">
              <SectionHeader
                id="components"
                index="03"
                lead="Reusable interface organisms for clear, consistent product experiences."
                linkHref="https://github.com/LouizeB/flytrapds/tree/main/packages/ui"
                linkLabel="Browse components"
                title="Components"
              />
              <div className="min-w-0 flex-1 lg:max-w-[68%] xl:max-w-[72%] 2xl:max-w-[76%]">
                <p className="mb-2 max-w-2xl text-sm leading-6 text-white/62">
                  Component groups link to the documented examples below. Use them as section shortcuts, not filter controls.
                </p>
                <PillTabs
                  active={0}
                  items={[
                    { label: "All", href: "#components" },
                    { label: "Inputs", href: "#component-inputs" },
                    { label: "Navigation", href: "#component-navigation" },
                    { label: "Feedback", href: "#component-feedback" },
                    { label: "Data display", href: "#component-data-display" },
                    { label: "Surfaces", href: "#component-surfaces" },
                    { label: "Overlays", href: "#component-overlays" },
                    { label: "AI / Streaming", href: "#component-ai" },
                  ]}
                  label="Component groups"
                />
                <div className="mt-4 grid gap-4">
                  <SectionCard meta="reference" title="Component system map">
                    <div className="grid gap-4 xl:grid-cols-[1fr_1.15fr]">
                      <div>
                        <p className="max-w-2xl text-sm leading-6 text-white/64">
                          The package currently exposes 77 UI, AI, and chart modules. This map groups them by user intent so the documentation is easier to scan than a flat export list.
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {[
                            ["77", "export modules"],
                            ["7", "groups"],
                            ["4", "quality gates"],
                          ].map(([value, label]) => <div className="rounded-xl border border-white/10 bg-black/35 p-3" key={label}>
                            <p className="font-display text-2xl font-bold text-white">{value}</p>
                            <p className="mt-1 font-mono text-[0.56rem] uppercase tracking-[0.15em] text-white/55">{label}</p>
                          </div>)}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        {componentQualityChecks.map(([label, description]) => <div className="rounded-xl border border-white/8 bg-white/[.035] p-3" key={label}>
                          <p className="font-display text-sm font-bold text-white/90">{label}</p>
                          <p className="mt-1 text-xs leading-5 text-white/58">{description}</p>
                        </div>)}
                      </div>
                    </div>
                  </SectionCard>

                  <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
                    {componentReferenceGroups.map(group => <a
                      className="group rounded-[1rem] border border-[rgba(241,0,129,.22)] bg-[linear-gradient(145deg,rgba(14,18,28,.78),rgba(2,5,10,.66))] p-4 text-white shadow-[0_14px_34px_rgba(0,0,0,.48)] outline-none transition-colors hover:border-[#ff4fbd]/55 hover:bg-[#ff4fbd]/8 focus-visible:ring-2 focus-visible:ring-[#b8ff35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060a]"
                      href={group.anchor}
                      key={group.name}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span>
                          <span className="block font-display text-lg font-bold text-white">{group.name}</span>
                          <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#ff9bdd]">{group.count} components · {group.status}</span>
                        </span>
                        <span aria-hidden="true" className="text-[#ff4fbd] transition-transform group-hover:translate-x-1">→</span>
                      </span>
                      <span className="mt-3 block text-sm leading-6 text-white/62">{group.description}</span>
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {group.examples.map(example => <code className="rounded-full border border-white/10 bg-black/35 px-2 py-1 font-mono text-[0.56rem] text-white/62" key={example}>{example}</code>)}
                      </span>
                    </a>)}
                  </div>

                  <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                    <SectionCard meta="anatomy" title="Component anatomy model">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="relative min-h-48 rounded-xl border border-white/10 bg-black/35 p-4">
                          {componentAnatomy.map((layer, index) => <div
                            className="absolute left-6 right-6 rounded-xl border border-[#ff4fbd]/35 bg-[#ff4fbd]/10 px-3 py-2 text-xs font-semibold text-white/75 backdrop-blur"
                            key={layer}
                            style={{ top: `${1 + index * 1.65}rem`, transform: `translateY(${index * 7}px) rotateX(52deg) rotateZ(-9deg)`, opacity: 1 - index * 0.08 }}
                          >
                            {layer}
                          </div>)}
                        </div>
                        <div className="grid gap-2">
                          {componentAnatomy.map(layer => <div className="rounded-lg border border-white/8 bg-white/[.035] p-2" key={layer}>
                            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#ff9bdd]">{layer}</p>
                            <p className="mt-1 text-xs leading-5 text-white/58">
                              {layer === "Root" && "Owns role, layout, data attributes, and state boundaries."}
                              {layer === "Label" && "Provides accessible name, visible copy, and required context."}
                              {layer === "Content" && "Holds product information, icons, media, or user input."}
                              {layer === "State" && "Represents hover, focus, active, selected, disabled, loading, and error."}
                              {layer === "Feedback" && "Communicates validation, progress, status, or system response."}
                              {layer === "Motion" && "Uses tokenized timing and respects reduced-motion preferences."}
                            </p>
                          </div>)}
                        </div>
                      </div>
                    </SectionCard>

                    <SectionCard meta="implementation" title="Component contract">
                      <DataList>
                        <DataListItem className="sm:grid-cols-1 xl:grid-cols-[9rem_1fr]">
                          <DataListTerm>Import</DataListTerm>
                          <DataListDescription>@flytrap/ui</DataListDescription>
                        </DataListItem>
                        <DataListItem className="sm:grid-cols-1 xl:grid-cols-[9rem_1fr]">
                          <DataListTerm>Styling</DataListTerm>
                          <DataListDescription>Semantic tokens first, component aliases for repeated behavior.</DataListDescription>
                        </DataListItem>
                        <DataListItem className="sm:grid-cols-1 xl:grid-cols-[9rem_1fr]">
                          <DataListTerm>Accessibility</DataListTerm>
                          <DataListDescription>Accessible names, visible focus, ARIA only when native HTML is not enough.</DataListDescription>
                        </DataListItem>
                        <DataListItem className="sm:grid-cols-1 xl:grid-cols-[9rem_1fr]">
                          <DataListTerm>Docs</DataListTerm>
                          <DataListDescription>Every shipped component should document usage, states, tokens, and keyboard behavior.</DataListDescription>
                        </DataListItem>
                      </DataList>
                      <div className="mt-4">
                        <CodeBlock
                          copyText={`import { Button, Field, Input } from '@flytrap/ui';\n\n<Field label=\"Signal name\">\n  <Input placeholder=\"Focus mode\" />\n</Field>\n<Button>Save signal</Button>`}
                          lines={[
                            [{ text: "import", kind: "keyword" }, { text: " { " }, { text: "Button", kind: "component" }, { text: ", " }, { text: "Field", kind: "component" }, { text: ", " }, { text: "Input", kind: "component" }, { text: " } " }, { text: "from", kind: "keyword" }, { text: " " }, { text: "'@flytrap/ui'", kind: "string" }, { text: ";" }],
                            [{ text: "" }],
                            [{ text: "<" }, { text: "Field", kind: "component" }, { text: " label=" }, { text: "\"Signal name\"", kind: "string" }, { text: ">" }],
                            [{ text: "  <" }, { text: "Input", kind: "component" }, { text: " placeholder=" }, { text: "\"Focus mode\"", kind: "string" }, { text: " />" }],
                            [{ text: "</" }, { text: "Field", kind: "component" }, { text: ">" }],
                            [{ text: "<" }, { text: "Button", kind: "component" }, { text: ">" }, { text: "Save signal" }, { text: "</" }, { text: "Button", kind: "component" }, { text: ">" }],
                          ]}
                        />
                      </div>
                    </SectionCard>
                  </div>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <ComponentPreview title="Button">
                    <div className="grid justify-items-start gap-2">
                      <Button className="rounded-full bg-[#F10081] px-5 shadow-[0_0_18px_rgba(241,0,129,.4)] hover:bg-[#CF006A]">Primary</Button>
                      <Button className="rounded-full border border-white/15 bg-white/8 px-5 text-white hover:bg-white/15">Secondary</Button>
                    </div>
                  </ComponentPreview>
                  <ComponentPreview id="component-inputs" title="Input field">
                    <Field label="Type something...">
                      <Input placeholder="Active" />
                    </Field>
                    <Input disabled placeholder="Disabled" />
                  </ComponentPreview>
                  <ComponentPreview id="component-surfaces" title="Card surface">
                    <Card>
                      <CardHeader>
                        <CardTitle>Title</CardTitle>
                        <CardDescription>Supporting text</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#ff4fbd]">
                          <span className="size-1.5 rounded-full bg-[#F10081]" /> Action
                        </span>
                      </CardContent>
                    </Card>
                  </ComponentPreview>
                  <ComponentPreview id="component-data-display" title="Data table">
                    <SmartDataTable
                      caption="Component records"
                      columns={[{ key: "name", header: "Name" }, { key: "status", header: "Status" }]}
                      getRowId={row => row.name}
                      rows={[{ name: "Item 1", status: "Active" }, { name: "Item 2", status: "Pending" }, { name: "Item 3", status: "Inactive" }]}
                    />
                  </ComponentPreview>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 xl:grid-cols-4">
                  <ComponentPreview title="Tag">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline">Default</Badge>
                      <Badge variant="success">Success</Badge>
                    </div>
                  </ComponentPreview>
                  <ComponentPreview title="Progress">
                    <div className="mb-1.5 flex justify-between text-xs text-white/60"><span>72%</span></div>
                    <Progress value={72} />
                  </ComponentPreview>
                  <ComponentPreview title="Toggle">
                    <SwitchField label="On" switchProps={{ "aria-label": "Example switch on", defaultChecked: true }} />
                    <SwitchField label="Off" switchProps={{ "aria-label": "Example switch off" }} />
                  </ComponentPreview>
                  <ComponentPreview className="col-span-2" id="component-overlays" title="Modal overlay">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full rounded-xl border border-white/12 bg-black/50 p-3 text-left transition-colors hover:border-[#ff4fbd]/40" type="button">
                          <span className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-white/90">Modal Title</span>
                            <span aria-hidden="true" className="text-white/60">×</span>
                          </span>
                          <span className="mt-1 block text-xs text-white/65">This is a modal.</span>
                          <span className="mt-3 flex justify-end gap-2">
                            <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">Cancel</span>
                            <span className="rounded-full bg-[#F10081] px-3 py-1 text-xs font-medium text-white shadow-[0_0_12px_rgba(241,0,129,.45)]">Confirm</span>
                          </span>
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Modal Title</DialogTitle>
                          <DialogDescription>This modal keeps focus inside the overlay and preserves context.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter><Button variant="outline">Cancel</Button><Button className="bg-[#F10081] hover:bg-[#CF006A]">Confirm</Button></DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </ComponentPreview>
                </div>
                <div className="mt-5 grid gap-4">
                  <SectionCard id="component-feedback" meta="new wave" title="Inputs and feedback">
                    <div className="grid gap-4 2xl:grid-cols-[1fr_1fr]">
                      <div className="grid gap-3">
                        <SearchField aria-label="Search components" defaultValue="mood selector" />
                        <Combobox defaultValue="streaming" options={comboboxOptions} />
                        <DatePickerField defaultValue="2026-07-13" hint="Native inputs keep the demo accessible and keyboard friendly." label="Release target" />
                        <SliderField defaultValue={76} hint="Controls how strongly the AI adapts the content experience." label="Bio-signal intensity" valueLabel="76%" />
                      </div>
                      <div className="grid gap-3">
                        <InlineNotification title="Components synchronized" variant="success">
                          The newest components are now visible in the public documentation.
                        </InlineNotification>
                        <FileUpload description="Example upload state for product and brand assets." label="Import system asset" multiple />
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusIndicator tone="success">Tokens active</StatusIndicator>
                          <StatusIndicator tone="info">Docs updated</StatusIndicator>
                          <StatusIndicator tone="warning">Visual audit recommended</StatusIndicator>
                        </div>
                        <ButtonGroup aria-label="Documentation views">
                          <ButtonGroupItem selected>Docs</ButtonGroupItem>
                          <ButtonGroupItem>Usage</ButtonGroupItem>
                          <ButtonGroupItem>API</ButtonGroupItem>
                        </ButtonGroup>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard id="component-navigation" meta="structure" title="Navigation and layout organisms">
                    <div className="grid gap-4 2xl:grid-cols-[1fr_1fr]">
                      <div className="grid gap-3 xl:grid-cols-2">
                        <InteractiveCard description="A selected action card with visible focus and clear supporting text." heading="Interactive card" icon={AiAccentIcon} selected>
                          Use it for flow choices, agents, and system modes.
                        </InteractiveCard>
                        <InteractiveCard description="A neutral card for navigable documentation patterns." heading="Pattern surface" icon={DashboardIcon}>
                          Uses surface, border, and state tokens.
                        </InteractiveCard>
                      </div>
                      <div className="grid gap-4">
                        <DataList>
                          <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                            <DataListTerm>Package</DataListTerm>
                            <DataListDescription>@flytrap/ui</DataListDescription>
                          </DataListItem>
                          <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                            <DataListTerm>Coverage</DataListTerm>
                            <DataListDescription>100% exported components</DataListDescription>
                          </DataListItem>
                        </DataList>
                        <div className="grid gap-4 2xl:grid-cols-2">
                          <Timeline aria-label="Adoption timeline">
                            <TimelineItem description="Inputs, feedback, and previews." meta="P0" title="Foundation" tone="success" />
                            <TimelineItem description="Documentation structure and layout primitives." meta="P1" title="Layout" tone="info" />
                            <TimelineItem description="Mood-aware streaming components." meta="P2" title="AI layer" tone="warning" />
                          </Timeline>
                          <TreeView aria-label="Component tree">
                            <TreeItem expanded label="Components" selected>
                              <TreeItem label="Controls" />
                              <TreeItem label="Data display" />
                              <TreeItem label="Streaming AI" />
                            </TreeItem>
                          </TreeView>
                        </div>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard id="component-ai" meta="streaming · ai" title="Mood-aware streaming system">
                    <div className="grid gap-5">
                      <MoodSelector defaultValue="focus" options={moodOptions} />
                      <div className="grid gap-4 2xl:grid-cols-[1fr_1.15fr]">
                        <div className="grid gap-3">
                          <MoodSignal description="Dominant signal used to tune pace, intensity, and narrative." label="Focus signal" tone="focus" value={82} />
                          <ModelConfidence description="Recommendation confidence based on mood, history, and session context." value={91} />
                          <PlayerControls playing progress={64} />
                        </div>
                        <PersonalizationPanel
                          action={<Button size="sm" variant="outline">Recalibrate</Button>}
                          confidence={91}
                          moodLabel="Bio-mood"
                          moodTone="focus"
                          moodValue={82}
                          signals={[
                            { label: "Atmosphere", value: "Cyber-botanical · low neon" },
                            { label: "Pace", value: "Progressive sequence, low friction" },
                            { label: "Interface", value: "Dense cards, measured glow, clear focus" },
                          ]}
                          title="AI personalization engine"
                        />
                      </div>
                      <RecommendationRail description="A recommendation rail for a streaming experience that adapts to mood." title="Intelligent recommendations">
                        {recommendationCards.map((card, index) => <div className="min-w-[220px] flex-1" key={card.title} role="listitem">
                          <MediaCard
                            active={card.active}
                            badge={card.badge}
                            duration={card.duration}
                            imageAlt={`Abstract visual for ${card.title}`}
                            imageSrc={index === 0 ? spriteCorner : index === 1 ? organismBr : spriteWideB}
                            subtitle={card.subtitle}
                            title={card.title}
                          />
                        </div>)}
                      </RecommendationRail>
                      <div className="flex flex-wrap gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">Component actions</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Documentation</DropdownMenuLabel>
                            <DropdownMenuItem>Copy snippet</DropdownMenuItem>
                            <DropdownMenuItem>View states</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Audit accessibility</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button className="bg-[#F10081] hover:bg-[#CF006A]">View package components</Button>
                      </div>
                    </div>
                  </SectionCard>
                </div>
              </div>
            </div>
          </section>

          {/* 04 · Patterns */}
          <section aria-label="Patterns" className="relative border-b border-[#ff4fbd]/14 px-6 py-8 md:px-8 lg:pr-[30vw] xl:pr-[26vw]">
            <img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-5rem] left-[-8rem] z-0 hidden w-[38rem] opacity-90 mix-blend-screen saturate-150 lg:block" draggable={false} src={spriteWideB} />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
              <SectionHeader
                id="patterns"
                index="04"
                lead="Reusable compositions for common product problems."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md"
                linkLabel="Explore patterns"
                title="Patterns"
              />
              <SectionCard className="flex-1" meta="Example pattern" title="Dashboard layout">
                <div aria-hidden="true" className="grid h-36 grid-cols-[64px_1fr] gap-2 rounded-xl border border-white/10 bg-black/40 p-2">
                  <span className="rounded-md bg-[#ff4fbd]/20" />
                  <span className="grid grid-rows-[24px_1fr] gap-2">
                    <span className="rounded-md bg-white/10" />
                    <span className="grid grid-cols-3 gap-2">
                      <span className="rounded-md bg-[#b8ff35]/15" />
                      <span className="rounded-md bg-white/8" />
                      <span className="rounded-md bg-[#ff4fbd]/12" />
                    </span>
                  </span>
                </div>
              </SectionCard>
            </div>
          </section>

          {/* 05 · Accessibility */}
          <section aria-label="Accessibility" className="relative border-b border-[#ff4fbd]/14 px-6 py-8 md:px-8 lg:pr-[24vw] xl:pr-[20vw]">
            <img alt="" aria-hidden="true" className="pointer-events-none absolute right-[-6rem] top-[-8rem] z-0 hidden w-72 -scale-x-100 rotate-12 opacity-80 mix-blend-screen lg:block" draggable={false} src={spriteCorner} />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
              <SectionHeader
                id="accessibility"
                index="05"
                lead="Designed for keyboard, screen reader, contrast, and readability needs."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md"
                linkLabel="View guidelines"
                title="Accessibility"
              />
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <SectionCard meta="APCA" title="Contrast">
                  <p className="font-display text-3xl font-bold text-white/90">54 <span className="text-base font-medium text-white/65">approved pairs</span></p>
                  <p className="mt-2 text-sm text-white/60">Text, actions, focus states, and data visualization are validated for the dark experience.</p>
                </SectionCard>
                <SectionCard meta="focus" title="Visible focus">
                  <span className="inline-grid size-14 place-items-center rounded-lg border border-white/20 bg-black/40 font-display text-xl font-bold text-white outline outline-2 outline-offset-2 outline-[#ff4fbd]">Aa</span>
                  <p className="mt-3 text-sm text-white/60">Visible focus rings and keyboard navigation are required for every component.</p>
                </SectionCard>
              </div>
            </div>
          </section>

          {/* 06 · Guidelines */}
          <section aria-label="Guidelines" className="relative border-b border-[#ff4fbd]/14 px-6 py-8 md:px-8">
            <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#b8ff35]/40 to-transparent" />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
              <SectionHeader
                id="guidelines"
                index="06"
                lead="Guidance for keeping interfaces clear, intentional, and consistent."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/CONTRIBUTING.md"
                linkLabel="Read guidelines"
                title="Guidelines"
              />
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <SectionCard meta="Do" title="Use clear hierarchy">
                  <span className="inline-flex items-center gap-2 text-sm text-[#b8ff35]">
                    <FlytrapIcon icon={SuccessIcon} /> Clear hierarchy helps users understand the page quickly.
                  </span>
                </SectionCard>
                <SectionCard meta="Don't" title="Overuse accents">
                  <span className="inline-flex items-center gap-2 text-sm text-[#ff4fbd]">
                    <FlytrapIcon icon={ErrorIcon} /> Too many accents compete for attention and reduce focus.
                  </span>
                  <div aria-hidden="true" className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#ff4fbd] to-[#F10081]" />
                  </div>
                </SectionCard>
              </div>
            </div>
          </section>

          {/* 07 · Code / Develop */}
          <section aria-label="Code / Develop" className="relative border-b border-[#ff4fbd]/14 px-6 py-8 md:px-8">
            <img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-7rem] right-[8rem] z-0 hidden w-80 opacity-70 mix-blend-screen saturate-150 lg:block" draggable={false} src={organismBr} />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:gap-12">
              <SectionHeader
                id="code"
                index="07"
                lead="Build with the system across product and documentation surfaces."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md#trilha-development"
                linkLabel="View documentation"
                title="Code / Develop"
              />
              <div className="grid min-w-0 flex-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
                <div className="min-w-0">
                  <PillTabs active={0} items={["React", "Vue", "Web components", "CSS"]} label="Supported platforms" />
                  <div className="mt-3">
                    <CodeBlock
                      copyText={`import { Button } from '@flytrap/ui';\n\n<Button variant="primary" size="md">\n  Engage\n</Button>`}
                      lines={[
                        [{ text: "import", kind: "keyword" }, { text: " { " }, { text: "Button", kind: "component" }, { text: " } " }, { text: "from", kind: "keyword" }, { text: " " }, { text: "'@flytrap/ui'", kind: "string" }, { text: ";" }],
                        [{ text: "" }],
                        [{ text: "<" }, { text: "Button", kind: "component" }, { text: " variant=" }, { text: "\"primary\"", kind: "string" }, { text: " size=" }, { text: "\"md\"", kind: "string" }, { text: ">" }],
                        [{ text: "  Engage" }],
                        [{ text: "</" }, { text: "Button", kind: "component" }, { text: ">" }],
                      ]}
                    />
                  </div>
                </div>
                <FloatingPanel className="self-start" title="NPM package">
                  <p className="flex items-baseline justify-between">
                    <span className="font-display text-lg font-bold text-white/90">@flytrap/ui</span>
                    <span className="font-mono text-xs text-white/60">1.0.0</span>
                  </p>
                  <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/60">Install</p>
                  <code className="mt-1.5 block rounded-lg border border-[#00c970]/30 bg-black/50 px-3 py-2 font-mono text-xs text-[#7de8b4]">pnpm add @flytrap/ui</code>
                </FloatingPanel>
              </div>
            </div>
          </section>

          {/* 08 · AI Workflows */}
          <section aria-label="AI Workflows" className="relative px-6 py-8 md:px-8">
            <img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-2rem] right-[-1rem] z-0 hidden w-72 opacity-95 mix-blend-screen saturate-125 lg:block" draggable={false} src={organismBr} />
            <img alt="" aria-hidden="true" className="pointer-events-none absolute left-[-5rem] top-[-6rem] z-0 hidden w-72 rotate-[160deg] opacity-70 lg:block" draggable={false} src={spriteCorner} />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:gap-12">
              <SectionHeader
                id="ai-workflows"
                index="08"
                lead="AI-assisted workflows for generation, review, refactoring, and documentation."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md"
                linkLabel="Explore workflows"
                title="AI Workflows"
              />
              <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {workflowCards.map(card => <WorkflowCard description={card.description} icon={card.icon} key={card.title} title={card.title} />)}
              </div>
            </div>
          </section>

          <footer aria-label="Flytrap Design System footer" className="relative border-t border-white/10 px-6 py-8 text-white/65 md:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <p className="inline-flex items-center gap-2">
                <FlytrapIcon icon={InsightIcon} size="sm" />
                Flytrap DS · A living system of tokens, components, and accessibility guidance.
              </p>
              <a className="inline-flex items-center gap-1 font-medium text-[#ff9bdd] hover:underline" href="https://github.com/LouizeB/flytrapds">
                GitHub <FlytrapIcon icon={SendIcon} size="sm" />
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  </div>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
