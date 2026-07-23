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
  ChatThread,
  Combobox,
  CopyButton,
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
  PromptInput,
  Progress,
  RecommendationRail,
  SearchIcon,
  SearchField,
  SendIcon,
  Sheet,
  SheetTrigger,
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
} from "@louizeb/flytrap-ui";
import "@louizeb/flytrap-ui/styles";
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
import { DeferredShowcase } from "./living/deferred-showcase";
import {
  CodeBlock,
  ComponentPreview,
  FloatingPanel,
  PillTabs,
  SectionCard,
  SectionHeader,
} from "./living/panels";

const AskFlytrap = React.lazy(async () => {
  const module = await import("./living/ask-flytrap");
  return { default: module.AskFlytrap };
});

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

const streamingPatternSteps = [
  {
    description: "The user explicitly selects a mood. The system can suggest, but never silently hides the control.",
    meta: "1",
    title: "Mood input",
    tone: "success",
  },
  {
    description: "Recommendations, confidence, playback and assistant copy update from the selected mood.",
    meta: "2",
    title: "Adaptive output",
    tone: "info",
  },
  {
    description: "High-impact mood shifts require approval before sensitive content becomes playable.",
    meta: "3",
    title: "Human approval",
    tone: "warning",
  },
] as const;

const streamingPatternChecklist = [
  ["Control", "Mood controls must remain visible and reversible."],
  ["Explanation", "Every recommendation needs a short reason and confidence cue."],
  ["Consent", "Sensitive or high-impact changes require explicit approval."],
  ["Fallback", "Rejected recommendations should return to a safe active item."],
] as const;

const patternLibrary = [
  {
    anchor: "#pattern-ai-managed-streaming",
    accessibility: ["Visible mood control", "Explainable recommendations", "Approval before high-impact shifts"],
    anatomy: ["Mood input", "Recommendation rail", "Playback state", "Approval gate", "Assistant trace"],
    components: ["MoodSelector", "RecommendationRail", "MediaCard", "PlayerControls", "HumanApprovalPrompt"],
    description: "Mood-shaped recommendations with visible control, confidence, playback and human approval.",
    evidence: "Implemented by apps/studio.",
    maturity: "Production candidate",
    problem: "AI streaming experiences often feel magical but opaque. This pattern keeps the user in control while the system adapts.",
    snippet: `function StreamingMoodSurface() {
  return (
    <PersonalizationPanel title="Mood engine">
      <MoodSelector options={moods} value={mood} onValueChange={setMood} />
      <RecommendationRail title="Recommended next">
        <MediaCard title="Neon garden" badge="Calm" active />
      </RecommendationRail>
      <PlayerControls state="playing" progress={64} />
    </PersonalizationPanel>
  );
}`,
    title: "AI-managed streaming flow",
  },
  {
    anchor: "#pattern-dashboard-layout",
    accessibility: ["Persistent landmarks", "Readable KPI labels", "Keyboard-safe navigation"],
    anatomy: ["Sidebar", "Hero status", "KPI row", "Data region", "Activity timeline"],
    components: ["Page", "Sidebar", "KpiStatCard", "SmartDataTable", "Timeline"],
    description: "Sidebar, KPI, table and activity composition for operational product surfaces.",
    evidence: "Implemented by apps/dashboard.",
    maturity: "Stable",
    problem: "Operational surfaces need dense information without becoming a wall of cards. This pattern gives status, priority and history clear places to live.",
    snippet: `function OperationsDashboard() {
  return (
    <Page>
      <Sidebar aria-label="Dashboard navigation" />
      <Section title="Release health">
        <KpiStatCard label="Token adoption" value="87%" />
        <SmartDataTable columns={columns} data={rows} />
        <Timeline aria-label="Recent release activity" />
      </Section>
    </Page>
  );
}`,
    title: "Dashboard layout",
  },
  {
    anchor: "#pattern-release-readiness",
    accessibility: ["Status is not color-only", "Evidence links are explicit", "Checklist order follows release flow"],
    anatomy: ["Gate", "Evidence", "Owner", "Risk", "Decision"],
    components: ["DataList", "Timeline", "StatusIndicator", "InlineNotification", "SmartDataTable"],
    description: "Quality gates for shipping components through adoption, audit and documentation checks.",
    evidence: "Used by CI, adoption report and visual audit reports.",
    maturity: "Governance",
    problem: "A DS release needs traceable proof, not vibes. This pattern turns quality gates into a repeatable release contract.",
    snippet: `function ReleaseReadiness() {
  return (
    <DataList>
      <DataListItem>
        <DataListTerm>Gate</DataListTerm>
        <DataListDescription>Tests, build, adoption and visual audit passed.</DataListDescription>
      </DataListItem>
      <StatusIndicator tone="success">Ready to ship</StatusIndicator>
    </DataList>
  );
}`,
    title: "Release readiness flow",
  },
] as const;

function codeLines(code: string) {
  return code.split("\n").map(line => [{ kind: "plain" as const, text: line }]);
}

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

const componentQualityChecks = [
  ["Keyboard", "Every interactive component exposes focus and supports keyboard navigation."],
  ["Screen reader", "Names, descriptions, live regions, and roles are explicit where the component needs them."],
  ["Tokens", "Component styling resolves through semantic and component token aliases."],
  ["States", "Default, hover, focus, active, disabled, loading, error, and empty states are represented."],
] as const;

const componentDocumentationGroups = [
  {
    accessibility: "Every field needs a visible label, persistent helper text when useful, and an explicit error message connected to the control.",
    anatomy: ["Label", "Control", "Helper text", "Validation message"],
    examples: ["Field", "Input", "SearchField", "Combobox", "FileUpload"],
    id: "component-inputs",
    states: ["Default", "Focus", "Disabled", "Invalid", "Loading"],
    title: "Inputs",
    tokens: ["component.input", "color.border.focus", "color.text.muted"],
    usage: ["Collect product data", "Filter or search lists", "Tune AI and streaming preferences"],
  },
  {
    accessibility: "Navigation should expose the current location, keep landmarks meaningful, and preserve keyboard order.",
    anatomy: ["Landmark", "Item", "Current state", "Nested route"],
    examples: ["Sidebar", "Breadcrumb", "Pagination", "TreeView"],
    id: "component-navigation",
    states: ["Default", "Hover", "Current", "Collapsed", "Expanded"],
    title: "Navigation",
    tokens: ["component.sidebar", "color.surface", "color.border"],
    usage: ["Move across documentation", "Represent hierarchy", "Guide long product flows"],
  },
  {
    accessibility: "Feedback must be announced when it changes state and should not rely on color alone.",
    anatomy: ["Status tone", "Title", "Message", "Action"],
    examples: ["InlineNotification", "Toast", "Progress", "StatusIndicator"],
    id: "component-feedback",
    states: ["Info", "Success", "Warning", "Error", "Loading"],
    title: "Feedback",
    tokens: ["color.status.*", "component.alert", "component.progress"],
    usage: ["Confirm user actions", "Explain async progress", "Surface validation or system health"],
  },
  {
    accessibility: "Data display should include captions, semantic headings, and readable empty or loading states.",
    anatomy: ["Container", "Header", "Rows or values", "Caption"],
    examples: ["SmartDataTable", "Chart", "DataList", "Timeline"],
    id: "component-data-display",
    states: ["Loaded", "Empty", "Loading", "Filtered", "Error"],
    title: "Data display",
    tokens: ["component.table", "color.text", "color.chart.*"],
    usage: ["Compare records", "Show metrics", "Explain system history or adoption"],
  },
  {
    accessibility: "Surfaces should make their interactive affordance explicit and keep focus visible when clickable.",
    anatomy: ["Surface", "Header", "Content", "Action"],
    examples: ["Card", "MediaCard", "InteractiveCard", "ComponentPreview"],
    id: "component-surfaces",
    states: ["Default", "Interactive", "Selected", "Disabled", "Media loaded"],
    title: "Surfaces",
    tokens: ["component.card", "color.surface", "elevation.*"],
    usage: ["Group related content", "Preview media", "Expose selectable product choices"],
  },
  {
    accessibility: "Overlays must trap focus, provide a close action, and return focus to the trigger.",
    anatomy: ["Trigger", "Overlay", "Title", "Content", "Close"],
    examples: ["Dialog", "Sheet", "Popover", "DropdownMenu"],
    id: "component-overlays",
    states: ["Closed", "Open", "Nested", "Dismissed", "Action pending"],
    title: "Overlays",
    tokens: ["component.overlay", "color.backdrop", "motion.duration"],
    usage: ["Confirm decisions", "Expose contextual actions", "Show temporary focused content"],
  },
  {
    accessibility: "AI components must make confidence, status, citations, and user control visible before automation acts.",
    anatomy: ["Signal", "Recommendation", "Reasoning", "Control"],
    examples: ["MoodSelector", "RecommendationRail", "PromptInput", "ReasoningStream"],
    id: "component-ai",
    states: ["Listening", "Thinking", "Recommended", "Approved", "Rejected"],
    title: "AI / Streaming",
    tokens: ["component.ai", "color.accent", "motion.pulse"],
    usage: ["Personalize streaming flows", "Explain AI recommendations", "Ask for approval before high-impact actions"],
  },
] as const;

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [selectedAnatomyLayer, setSelectedAnatomyLayer] = useState(0);
  const handleBootComplete = React.useCallback(() => setBootComplete(true), []);
  const handleAskClose = React.useCallback(() => {
    setAskOpen(false);
    window.requestAnimationFrame(() => document.getElementById("ask-flytrap-trigger")?.focus());
  }, []);
  const selectedAnatomyLayerDetail = anatomyLayerDetails[selectedAnatomyLayer] ?? anatomyLayerDetails[0];

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
            <div className="flex flex-col gap-8">
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
                  <p className="mt-2 text-sm text-editorial-secondary">Satoshi Variable</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-editorial-muted">Fluid · Humanist · Technical</p>
                </SectionCard>
                <SectionCard meta="8pt" title="Grid & Layout">
                  <div aria-hidden="true" className="grid h-20 grid-cols-12 gap-1">
                    {Array.from({ length: 12 }, (_, index) => <span
                      className={["rounded-sm border", [3, 7].includes(index) ? "border-[#F10081]/80 bg-[#F10081]/10 shadow-[0_0_8px_rgba(241,0,129,.4)]" : "border-white/12 bg-white/[.03]"].join(" ")}
                      key={index}
                    />)}
                  </div>
                  <p className="mt-3 text-sm text-editorial-secondary">12 Column Grid</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-editorial-muted">8pt Baseline</p>
                </SectionCard>
                <SectionCard meta="semantic" title="Iconography">
                  <div className="grid grid-cols-4 gap-2 text-editorial-secondary">
                    {iconographySet.map((icon, index) => <span className="grid aspect-square place-items-center rounded-lg border border-white/10 bg-black/30" key={index}>
                      <FlytrapIcon icon={icon} />
                    </span>)}
                  </div>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-editorial-muted">2px line · Rounded</p>
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
            <div className="relative z-20 flex flex-col gap-8">
              <SectionHeader
                id="components"
                index="03"
                lead="Reusable interface organisms for clear, consistent product experiences."
                linkHref="https://github.com/LouizeB/flytrapds/tree/main/packages/ui"
                linkLabel="Browse components"
                title="Components"
              />
              <div className="min-w-0 flex-1">
                <p className="mb-2 max-w-2xl text-sm leading-6 text-editorial-secondary">
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
                <nav aria-label="Component categories" className="sticky top-3 z-30 flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-[#090b12]/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,.45)] backdrop-blur-xl">
                  {componentDocumentationGroups.map(group => <a className="shrink-0 rounded-full border border-white/10 bg-white/[.035] px-3 py-2 text-xs font-medium text-editorial-secondary hover:border-[#ff4fbd]/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8ff35]" href={`#${group.id}`} key={group.id}>{group.title}</a>)}
                </nav>
                <DeferredShowcase anchorIds={componentDocumentationGroups.map(group => group.id)} label="Interactive component demonstrations" minHeight="40rem">
                  <div className="mt-4 grid gap-4">
                  <SectionCard meta="reference" title="Component system map">
                    <div className="grid gap-4 xl:grid-cols-[1fr_1.15fr]">
                      <div>
                        <p className="max-w-2xl text-sm leading-6 text-editorial-secondary">
                          The package currently exposes 77 UI, AI, and chart modules. This map groups them by user intent so the documentation is easier to scan than a flat export list.
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {[
                            ["77", "export modules"],
                            ["7", "groups"],
                            ["4", "quality gates"],
                          ].map(([value, label]) => <div className="rounded-xl border border-white/10 bg-black/35 p-3" key={label}>
                            <p className="font-display text-2xl font-bold text-white">{value}</p>
                            <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-editorial-muted">{label}</p>
                          </div>)}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        {componentQualityChecks.map(([label, description]) => <div className="rounded-xl border border-white/8 bg-white/[.035] p-3" key={label}>
                          <p className="font-display text-sm font-bold text-white/90">{label}</p>
                          <p className="mt-1 text-xs leading-5 text-editorial-muted">{description}</p>
                        </div>)}
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard className="p-5 lg:p-6" meta="interactive anatomy" title="Component anatomy stage">
                    <div className="grid gap-5 2xl:grid-cols-[1.35fr_.65fr]">
                      <div className="relative min-h-[46rem] overflow-hidden rounded-[1.5rem] border border-[#ff4fbd]/24 bg-[radial-gradient(circle_at_50%_20%,rgba(255,79,189,.20),transparent_34%),linear-gradient(145deg,rgba(9,12,21,.92),rgba(2,5,10,.78))] p-5 shadow-[0_30px_90px_rgba(0,0,0,.48)]">
                        <div aria-hidden="true" className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:46px_46px]" />
                        <div aria-hidden="true" className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#ff4fbd]/16 blur-3xl" />
                        <div aria-hidden="true" className="absolute bottom-0 left-8 h-40 w-80 rounded-full bg-[#b8ff35]/8 blur-3xl" />
                        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#ff9bdd]">Layer inspection</p>
                            <h4 className="mt-2 max-w-xl font-display text-2xl font-bold text-white md:text-3xl">
                              Six documented layers before a component ships.
                            </h4>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-editorial-secondary">
                              Each layer has a purpose, a token source, and an accessibility responsibility. The stack below shows how Flytrap components are assembled from surface to expressive bio-field.
                            </p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-black/40 p-3 text-right">
                            <p className="font-display text-3xl font-bold text-white">{anatomyLayerDetails.length}</p>
                            <p className="font-mono text-xs uppercase tracking-[0.16em] text-editorial-muted">visible layers</p>
                          </div>
                        </div>
                        <div className="relative z-20 mt-8 grid min-h-[28rem] place-items-center overflow-hidden rounded-[1.25rem] border border-white/8 bg-[radial-gradient(circle_at_50%_34%,rgba(184,255,53,.12),transparent_32%),radial-gradient(circle_at_52%_70%,rgba(255,79,189,.20),transparent_42%)]">
                          <div aria-hidden="true" className="absolute inset-x-10 top-10 h-px bg-gradient-to-r from-transparent via-[#b8ff35]/45 to-transparent" />
                          <div aria-hidden="true" className="absolute left-[12%] top-[24%] h-36 w-36 rounded-full border border-[#ff4fbd]/18 bg-[#ff4fbd]/8 blur-2xl" />
                          <div aria-hidden="true" className="absolute right-[10%] top-[16%] h-44 w-44 rounded-full border border-[#b8ff35]/16 bg-[#b8ff35]/8 blur-3xl" />
                          <div aria-hidden="true" className="absolute bottom-8 left-1/2 h-28 w-[70%] -translate-x-1/2 rounded-full bg-black/65 blur-2xl" />
                          <CharacterLayer
                            alt="Flytrap alien lying under the component anatomy model, connecting the organism metaphor to the documented component layers."
                            className="absolute bottom-[-7rem] left-1/2 z-10 h-[34rem] w-[min(78rem,118vw)] -translate-x-1/2 opacity-90"
                            float
                            pose="lying"
                            tilt
                          />
                          <div className="absolute left-5 top-5 z-20 max-w-xs rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#b8ff35]">Layer controls moved right</p>
                            <p className="mt-2 text-sm leading-6 text-editorial-secondary">
                              Select a layer in the inspector panel to update the documented anatomy without covering the character.
                            </p>
                          </div>
                          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-[#05060a] via-[#05060a]/80 to-transparent" />
                        </div>
                      </div>
                      <div className="grid content-start gap-3">
                        <div aria-live="polite" className="rounded-[1.35rem] border border-[#b8ff35]/26 bg-[linear-gradient(145deg,rgba(184,255,53,.10),rgba(255,79,189,.09)_44%,rgba(0,0,0,.46))] p-5 shadow-[0_20px_54px_rgba(0,0,0,.42)]">
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#b8ff35]">Selected layer</p>
                          <h4 className="mt-2 font-display text-2xl font-bold text-white">{selectedAnatomyLayer + 1}. {selectedAnatomyLayerDetail.label}</h4>
                          <p className="mt-3 text-sm leading-6 text-editorial-secondary">{selectedAnatomyLayerDetail.description}</p>
                          <div className="mt-5 grid gap-3 rounded-2xl border border-white/8 bg-black/35 p-4 text-sm sm:grid-cols-[6rem_1fr]">
                            <span className="font-mono text-xs uppercase tracking-[0.14em] text-editorial-muted">Example</span>
                            <span className="text-editorial-secondary">{selectedAnatomyLayerDetail.example}</span>
                            <span className="font-mono text-xs uppercase tracking-[0.14em] text-editorial-muted">Token</span>
                            <code className="text-[#ff9bdd]">{selectedAnatomyLayerDetail.token}</code>
                            <span className="font-mono text-xs uppercase tracking-[0.14em] text-editorial-muted">Ship check</span>
                            <span className="text-editorial-secondary">Document behavior, states, token mapping, and keyboard expectations for this layer.</span>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          {anatomyLayerDetails.map((layer, index) => <button
                            aria-pressed={selectedAnatomyLayer === index}
                            className={[
                              "group flex min-h-14 items-center gap-3 rounded-2xl border p-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#b8ff35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060a]",
                              selectedAnatomyLayer === index
                                ? "border-[#ff4fbd]/55 bg-[#ff4fbd]/14"
                                : "border-white/10 bg-black/35 hover:border-[#ff4fbd]/45 hover:bg-[#ff4fbd]/8",
                            ].join(" ")}
                            key={layer.label}
                            onClick={() => setSelectedAnatomyLayer(index)}
                            type="button"
                          >
                            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#ff4fbd]/18 font-mono text-xs text-[#ff9bdd]">{index + 1}</span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-mono text-xs uppercase tracking-[0.16em] text-editorial-secondary">{layer.label}</span>
                              <span className="mt-1 block truncate text-xs text-editorial-muted">{layer.token}</span>
                            </span>
                            <span aria-hidden="true" className="text-[#ff4fbd] transition-transform group-hover:translate-x-1">→</span>
                          </button>)}
                        </div>
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
                          <span className="mt-1 block font-mono text-xs uppercase tracking-[0.16em] text-[#ff9bdd]">{group.count} components · {group.status}</span>
                        </span>
                        <span aria-hidden="true" className="text-[#ff4fbd] transition-transform group-hover:translate-x-1">→</span>
                      </span>
                      <span className="mt-3 block text-sm leading-6 text-editorial-secondary">{group.description}</span>
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {group.examples.map(example => <code className="rounded-full border border-white/10 bg-black/35 px-2 py-1 font-mono text-xs text-editorial-secondary" key={example}>{example}</code>)}
                      </span>
                    </a>)}
                  </div>

                  <div className="grid gap-4">
                    <SectionCard meta="implementation" title="Component contract">
                      <DataList>
                        <DataListItem className="sm:grid-cols-1 xl:grid-cols-[9rem_1fr]">
                          <DataListTerm>Import</DataListTerm>
                          <DataListDescription>@louizeb/flytrap-ui</DataListDescription>
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
                          copyText={`import { Button, Field, Input } from '@louizeb/flytrap-ui';\n\n<Field label=\"Signal name\">\n  <Input placeholder=\"Focus mode\" />\n</Field>\n<Button>Save signal</Button>`}
                          lines={[
                            [{ text: "import", kind: "keyword" }, { text: " { " }, { text: "Button", kind: "component" }, { text: ", " }, { text: "Field", kind: "component" }, { text: ", " }, { text: "Input", kind: "component" }, { text: " } " }, { text: "from", kind: "keyword" }, { text: " " }, { text: "'@louizeb/flytrap-ui'", kind: "string" }, { text: ";" }],
                            [{ text: "" }],
                            [{ text: "<" }, { text: "Field", kind: "component" }, { text: " label=" }, { text: "\"Signal name\"", kind: "string" }, { text: ">" }],
                            [{ text: "  <" }, { text: "Input", kind: "component" }, { text: " placeholder=" }, { text: "\"Focus mode\"", kind: "string" }, { text: " />" }],
                            [{ text: "</" }, { text: "Field", kind: "component" }, { text: ">" }],
                            [{ text: "<" }, { text: "Button", kind: "component" }, { text: ">" }, { text: "Save signal" }, { text: "</" }, { text: "Button", kind: "component" }, { text: ">" }],
                          ]}
                        />
                      </div>
                    </SectionCard>

                    <SectionCard meta="category docs" title="Component documentation guide">
                      <p className="max-w-3xl text-sm leading-6 text-editorial-secondary">
                        Use these category notes as the minimum documentation contract for every component page. Each group defines when to use the pattern, which anatomy to document, which states to test, and which accessibility rule should never be skipped.
                      </p>
                      <div className="mt-4 grid gap-3">
                        {componentDocumentationGroups.map((group, index) => <details
                          className="group scroll-mt-24 rounded-2xl border border-white/10 bg-black/35 p-3 open:border-[#ff4fbd]/45 open:bg-[#ff4fbd]/8"
                          id={group.id}
                          key={group.id}
                          open={index === 0}
                        >
                          <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#b8ff35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060a] [&::-webkit-details-marker]:hidden">
                            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#ff4fbd]/16 font-mono text-xs text-[#ff9bdd]">{String(index + 1).padStart(2, "0")}</span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-display text-base font-bold text-white/90">{group.title}</span>
                              <span className="mt-1 block font-mono text-xs uppercase tracking-[0.16em] text-editorial-muted">{group.examples.join(" · ")}</span>
                            </span>
                            <span aria-hidden="true" className="font-mono text-lg text-[#ff4fbd] transition-transform group-open:rotate-90">›</span>
                          </summary>
                          <div className="mt-4 grid gap-3 xl:grid-cols-[1fr_1fr]">
                            <div className="rounded-xl border border-white/8 bg-white/[.035] p-3">
                              <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#ff9bdd]">Use when</h4>
                              <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-editorial-secondary">
                                {group.usage.map(item => <li className="flex gap-2" key={item}><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#b8ff35]" />{item}</li>)}
                              </ul>
                            </div>
                            <div className="rounded-xl border border-white/8 bg-white/[.035] p-3">
                              <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#ff9bdd]">Accessibility rule</h4>
                              <p className="mt-2 text-sm leading-6 text-editorial-secondary">{group.accessibility}</p>
                            </div>
                            <div className="rounded-xl border border-white/8 bg-white/[.035] p-3">
                              <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#ff9bdd]">Document anatomy</h4>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {group.anatomy.map(item => <span className="rounded-full border border-white/10 bg-black/35 px-2 py-1 font-mono text-xs text-editorial-secondary" key={item}>{item}</span>)}
                              </div>
                            </div>
                            <div className="rounded-xl border border-white/8 bg-white/[.035] p-3">
                              <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#ff9bdd]">States and tokens</h4>
                              <div className="mt-2 grid gap-2">
                                <p className="text-sm leading-6 text-editorial-secondary">{group.states.join(", ")}</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {group.tokens.map(token => <code className="rounded-full border border-[#b8ff35]/20 bg-[#b8ff35]/8 px-2 py-1 font-mono text-xs text-[#d7ff88]" key={token}>{token}</code>)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <nav aria-label={`${group.title} category navigation`} className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs">
                            {index > 0 ? <a className="text-editorial-secondary hover:text-white" href={`#${componentDocumentationGroups[index - 1]?.id}`}>← {componentDocumentationGroups[index - 1]?.title}</a> : <span />}
                            {index < componentDocumentationGroups.length - 1 ? <a className="text-[#ff9bdd] hover:text-white" href={`#${componentDocumentationGroups[index + 1]?.id}`}>{componentDocumentationGroups[index + 1]?.title} →</a> : <a className="text-[#ff9bdd] hover:text-white" href="#patterns">Continue to Patterns →</a>}
                          </nav>
                        </details>)}
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
                  <ComponentPreview id="component-inputs-showcase" title="Input field">
                    <Field label="Type something...">
                      <Input placeholder="Active" />
                    </Field>
                    <Input disabled placeholder="Disabled" />
                  </ComponentPreview>
                  <ComponentPreview id="component-surfaces-showcase" title="Card surface">
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
                  <ComponentPreview id="component-data-display-showcase" title="Data table">
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
                    <div className="mb-1.5 flex justify-between text-xs text-editorial-muted"><span>72%</span></div>
                    <Progress aria-label="Example progress" value={72} />
                  </ComponentPreview>
                  <ComponentPreview title="Toggle">
                    <SwitchField label="On" switchProps={{ "aria-label": "Example switch on", defaultChecked: true }} />
                    <SwitchField label="Off" switchProps={{ "aria-label": "Example switch off" }} />
                  </ComponentPreview>
                  <ComponentPreview className="col-span-2" id="component-overlays-showcase" title="Modal overlay">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full rounded-xl border border-white/12 bg-black/50 p-3 text-left transition-colors hover:border-[#ff4fbd]/40" type="button">
                          <span className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-white/90">Modal Title</span>
                            <span aria-hidden="true" className="text-editorial-muted">×</span>
                          </span>
                          <span className="mt-1 block text-xs text-editorial-secondary">This is a modal.</span>
                          <span className="mt-3 flex justify-end gap-2">
                            <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-editorial-secondary">Cancel</span>
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
                  <SectionCard id="component-feedback-showcase" meta="new wave" title="Inputs and feedback">
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

                  <SectionCard id="component-navigation-showcase" meta="structure" title="Navigation and layout organisms">
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
                            <DataListDescription>@louizeb/flytrap-ui</DataListDescription>
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

                  <SectionCard id="component-ai-showcase" meta="streaming · ai" title="Mood-aware streaming system">
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
                </DeferredShowcase>
              </div>
            </div>
          </section>

          {/* 04 · Patterns */}
          <section aria-label="Patterns" className="relative border-b border-[#ff4fbd]/14 px-6 py-8 md:px-8">
            <img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-5rem] left-[-8rem] z-0 hidden w-[38rem] opacity-90 mix-blend-screen saturate-150 lg:block" draggable={false} src={spriteWideB} />
            <div className="relative z-10 flex flex-col gap-8">
              <SectionHeader
                id="patterns"
                index="04"
                lead="Reusable compositions for common product problems."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/docs/20-pattern-library.md"
                linkLabel="Open pattern guide"
                title="Patterns"
              />
              <div className="grid min-w-0 flex-1 gap-4">
                <SectionCard meta="Library index" title="Pattern library">
                  <p className="max-w-3xl text-sm leading-6 text-editorial-secondary">
                    Patterns are reusable product compositions. Each one documents the problem, core anatomy, accessibility contract, and the components expected to work together.
                  </p>
                  <div className="mt-4 grid gap-4 xl:grid-cols-2">
                    {patternLibrary.map(pattern => <a
                      className="group flex min-h-full flex-col rounded-2xl border border-white/10 bg-black/35 p-4 outline-none transition-colors hover:border-[#ff4fbd]/55 hover:bg-[#ff4fbd]/8 focus-visible:ring-2 focus-visible:ring-[#b8ff35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060a]"
                      href={pattern.anchor}
                      key={pattern.title}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span>
                          <span className="block font-display text-base font-bold text-white/90">{pattern.title}</span>
                          <span className="mt-1 block font-mono text-xs uppercase tracking-[0.16em] text-[#ff9bdd]">{pattern.maturity}</span>
                        </span>
                        <span aria-hidden="true" className="text-[#ff4fbd] transition-transform group-hover:translate-x-1">→</span>
                      </span>
                      <span className="mt-3 block text-sm leading-6 text-editorial-secondary">{pattern.description}</span>
                      <span className="mt-4 block rounded-xl border border-white/8 bg-white/[.035] p-3">
                        <span className="block font-mono text-xs uppercase tracking-[0.16em] text-editorial-muted">Problem</span>
                        <span className="mt-1 block text-sm leading-6 text-editorial-secondary">{pattern.problem}</span>
                      </span>
                      <span className="mt-3 flex flex-wrap gap-2">
                        {pattern.components.slice(0, 3).map(component => <span className="rounded-full border border-[#ff4fbd]/25 bg-[#ff4fbd]/10 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.14em] text-[#ff9bdd]" key={component}>
                          {component}
                        </span>)}
                      </span>
                    </a>)}
                  </div>
                </SectionCard>

                <DeferredShowcase anchorIds={patternLibrary.map(pattern => pattern.anchor.slice(1))} label="Detailed pattern demonstrations" minHeight="32rem">
                <SectionCard meta="Examples" title="Implementation examples">
                  <p className="max-w-3xl text-sm leading-6 text-editorial-secondary">
                    Use these examples as starting points. They are intentionally compact: the full pattern contract lives in the guide, while this page shows how the composition starts to look in code.
                  </p>
                  <div className="mt-4 grid gap-4 xl:grid-cols-2">
                    {patternLibrary.map(pattern => <article className="grid min-h-full gap-4 rounded-2xl border border-white/10 bg-black/35 p-4" key={pattern.title}>
                      <div>
                        <p className="font-display text-base font-bold text-white/90">{pattern.title}</p>
                        <p className="mt-1 text-sm leading-6 text-editorial-secondary">{pattern.evidence}</p>
                      </div>
                      <div className="grid gap-2">
                        {pattern.accessibility.map(item => <div className="flex gap-2 rounded-xl border border-white/8 bg-white/[.035] p-3 text-sm leading-6 text-editorial-secondary" key={item}>
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#b8ff35]" />
                          <span>{item}</span>
                        </div>)}
                      </div>
                      <CodeBlock copyText={pattern.snippet} lines={codeLines(pattern.snippet)} />
                    </article>)}
                  </div>
                </SectionCard>

                <SectionCard id="pattern-ai-managed-streaming" meta="Product pattern" title="AI-managed streaming flow">
                  <div className="grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
                    <div className="grid gap-4">
                      <p className="max-w-3xl text-sm leading-6 text-editorial-secondary">
                        Use this pattern when an AI system adapts a media experience from an explicit mood or intent signal. The Studio consumer implements this as mood selection, adaptive recommendations, player state, human approval and assistant history.
                      </p>
                      <DataList>
                        <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                          <DataListTerm>Use for</DataListTerm>
                          <DataListDescription>Streaming, learning queues, adaptive onboarding and AI-curated product surfaces.</DataListDescription>
                        </DataListItem>
                        <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                          <DataListTerm>Avoid when</DataListTerm>
                          <DataListDescription>The system cannot explain why content changed or cannot offer a safe fallback.</DataListDescription>
                        </DataListItem>
                        <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                          <DataListTerm>Proof</DataListTerm>
                          <DataListDescription><code>apps/studio</code> is the first product-like consumer of this pattern.</DataListDescription>
                        </DataListItem>
                        <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                          <DataListTerm>Components</DataListTerm>
                          <DataListDescription>{patternLibrary[0].components.join(" · ")}</DataListDescription>
                        </DataListItem>
                      </DataList>
                    </div>
                    <Timeline aria-label="AI-managed streaming flow states">
                      {streamingPatternSteps.map(step => <TimelineItem description={step.description} key={step.title} meta={step.meta} title={step.title} tone={step.tone} />)}
                    </Timeline>
                  </div>
                </SectionCard>

                <div className="grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
                  <SectionCard meta="Anatomy" title="Pattern anatomy">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        ["Mood control", "MoodSelector"],
                        ["Recommended media", "RecommendationRail · MediaCard"],
                        ["Playback state", "PlayerControls"],
                        ["Decision safety", "HumanApprovalPrompt"],
                        ["Agent trace", "ReasoningStream · ToolCallBlock"],
                        ["Assistant input", "PromptInput · StreamingMessage"],
                      ].map(([label, value]) => <div className="rounded-xl border border-white/10 bg-black/35 p-3" key={label}>
                        <p className="font-display text-sm font-bold text-white/90">{label}</p>
                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[#ff9bdd]">{value}</p>
                      </div>)}
                    </div>
                  </SectionCard>
                  <SectionCard meta="Accessibility" title="Interaction rules">
                    <div className="grid gap-2">
                      {streamingPatternChecklist.map(([label, description]) => <div className="rounded-xl border border-white/8 bg-white/[.035] p-3" key={label}>
                        <p className="font-display text-sm font-bold text-white/90">{label}</p>
                        <p className="mt-1 text-sm leading-6 text-editorial-secondary">{description}</p>
                      </div>)}
                    </div>
                  </SectionCard>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                  <SectionCard className="flex-1" id="pattern-dashboard-layout" meta="Stable pattern" title="Dashboard layout">
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
                    <p className="mt-4 text-sm leading-6 text-editorial-secondary">
                      Use for operational surfaces that combine navigation, KPIs, tabular status, timelines and agent health.
                    </p>
                    <DataList className="mt-4">
                      <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                        <DataListTerm>Anatomy</DataListTerm>
                        <DataListDescription>{patternLibrary[1].anatomy.join(" · ")}</DataListDescription>
                      </DataListItem>
                      <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                        <DataListTerm>Access</DataListTerm>
                        <DataListDescription>{patternLibrary[1].accessibility.join(" · ")}</DataListDescription>
                      </DataListItem>
                    </DataList>
                  </SectionCard>
                  <SectionCard id="pattern-release-readiness" meta="Governance pattern" title="Release readiness flow">
                    <DataList>
                      <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                        <DataListTerm>Gate</DataListTerm>
                        <DataListDescription>Tokens, APCA, tests, build, adoption report and visual audit.</DataListDescription>
                      </DataListItem>
                      <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                        <DataListTerm>Evidence</DataListTerm>
                        <DataListDescription>Progress notes, screenshots, CI checks and package readiness.</DataListDescription>
                      </DataListItem>
                      <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                        <DataListTerm>Components</DataListTerm>
                        <DataListDescription>Timeline, DataList, StatusIndicator, InlineNotification and SmartDataTable.</DataListDescription>
                      </DataListItem>
                      <DataListItem className="sm:grid-cols-1 xl:grid-cols-[8rem_1fr]">
                        <DataListTerm>Access</DataListTerm>
                        <DataListDescription>{patternLibrary[2].accessibility.join(" · ")}</DataListDescription>
                      </DataListItem>
                    </DataList>
                  </SectionCard>
                </div>
                </DeferredShowcase>
              </div>
            </div>
          </section>

          {/* 05 · Accessibility */}
          <section aria-label="Accessibility" className="relative border-b border-[#ff4fbd]/14 px-6 py-8 md:px-8 lg:pr-[24vw] xl:pr-[20vw]">
            <img alt="" aria-hidden="true" className="pointer-events-none absolute right-[-6rem] top-[-8rem] z-0 hidden w-72 -scale-x-100 rotate-12 opacity-80 mix-blend-screen lg:block" draggable={false} src={spriteCorner} />
            <div className="relative z-10 flex flex-col gap-8">
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
                  <p className="font-display text-3xl font-bold text-white/90">54 <span className="text-base font-medium text-editorial-secondary">approved pairs</span></p>
                  <p className="mt-2 text-sm text-editorial-muted">Text, actions, focus states, and data visualization are validated for the dark experience.</p>
                </SectionCard>
                <SectionCard meta="focus" title="Visible focus">
                  <span className="inline-grid size-14 place-items-center rounded-lg border border-white/20 bg-black/40 font-display text-xl font-bold text-white outline outline-2 outline-offset-2 outline-[#ff4fbd]">Aa</span>
                  <p className="mt-3 text-sm text-editorial-muted">Visible focus rings and keyboard navigation are required for every component.</p>
                </SectionCard>
              </div>
            </div>
          </section>

          {/* 06 · Guidelines */}
          <section aria-label="Guidelines" className="relative border-b border-[#ff4fbd]/14 px-6 py-8 md:px-8">
            <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#b8ff35]/40 to-transparent" />
            <div className="relative z-10 flex flex-col gap-8">
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

          {/* 08 · Code / Develop */}
          <section aria-label="Code / Develop" className="relative border-b border-[#ff4fbd]/14 px-6 py-8 md:px-8">
            <img alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-7rem] right-[8rem] z-0 hidden w-80 opacity-70 mix-blend-screen saturate-150 lg:block" draggable={false} src={organismBr} />
            <div className="relative z-10 flex flex-col gap-8">
              <SectionHeader
                id="code"
                index="08"
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
                      copyText={`import { Button } from '@louizeb/flytrap-ui';\n\n<Button variant="primary" size="md">\n  Engage\n</Button>`}
                      lines={[
                        [{ text: "import", kind: "keyword" }, { text: " { " }, { text: "Button", kind: "component" }, { text: " } " }, { text: "from", kind: "keyword" }, { text: " " }, { text: "'@louizeb/flytrap-ui'", kind: "string" }, { text: ";" }],
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
                    <span className="font-display text-lg font-bold text-white/90">@louizeb/flytrap-ui</span>
                    <span className="font-mono text-xs text-editorial-muted">1.0.0</span>
                  </p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-editorial-muted">Install</p>
                  <code className="mt-1.5 block rounded-lg border border-[#00c970]/30 bg-black/50 px-3 py-2 font-mono text-xs text-[#7de8b4]">pnpm add @louizeb/flytrap-ui</code>
                </FloatingPanel>
              </div>
            </div>
          </section>

          <div className="fixed bottom-5 right-5 z-[100] md:bottom-8 md:right-8">
            <Button className="h-12 rounded-full bg-[#CF006A] px-5 text-white shadow-[0_12px_40px_rgba(241,0,129,.4)] hover:bg-[#A90058]" id="ask-flytrap-trigger" onClick={() => setAskOpen(true)}>
              <FlytrapIcon icon={AiAccentIcon} /> Ask Flytrap
            </Button>
          </div>
          {askOpen ? <React.Suspense fallback={null}><AskFlytrap onClose={handleAskClose} /></React.Suspense> : null}
          <footer aria-label="Flytrap Design System footer" className="relative border-t border-white/10 px-6 py-8 text-editorial-secondary md:px-10">
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
