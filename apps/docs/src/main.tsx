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
import spriteVertical from "./assets/flytrap-sprite-vertical.webp";
import spriteWideB from "./assets/flytrap-sprite-wide-b.webp";
import spriteCorner from "./assets/flytrap-sprite-corner.webp";
import spritePlatform from "./assets/flytrap-sprite-platform.webp";
import { CharacterLayer } from "./living/character";
import { Sidebar, type Appearance } from "./living/sidebar";
import { Hero } from "./living/hero";
import {
  CodeBlock,
  ComponentPreview,
  FloatingPanel,
  PillTabs,
  SectionCard,
  SectionHeader,
  TokenRow,
  WorkflowCard,
} from "./living/panels";

const appearanceStorageKey = "flytrap:appearance";

const magentaSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const spaceSteps = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];
const radiusSteps = [0, 4, 8, 12, 16, 24, 32];
const elevationSteps = [0, 1, 2, 3, 4, 5];

const semanticTokens = [
  ["--color-primary", "#F10081", "#F10081"],
  ["--color-secondary", "#00C970", "#00C970"],
  ["--color-background", "#0F0F12", "#0F0F12"],
  ["--color-surface", "#1F1F24", "#1F1F24"],
  ["--color-text", "#E1E1EA", "#E1E1EA"],
  ["--color-disabled", "#6B6B7B", "#6B6B7B"],
] as const;

const anatomyLayers = ["Surface", "Content", "Container", "State layer", "Motion layer", "Bio-field"] as const;

const iconographySet = [AiAccentIcon, ToolIcon, ApprovalIcon, AgentIcon, ChartIcon, DashboardIcon, SearchIcon, MenuIcon] as const;

const workflowCards = [
  { icon: AiAccentIcon, title: "Generate UI", description: "Descreva a intenção e gere composições com os componentes do organismo." },
  { icon: ApprovalIcon, title: "Audit", description: "Analise acessibilidade, contraste APCA e consistência de tokens." },
  { icon: ToolIcon, title: "Refactor", description: "Melhore a estrutura automaticamente sem quebrar o contrato semântico." },
  { icon: BrandIcon, title: "Document", description: "Gere documentação viva instantaneamente a partir do código." },
] as const;

const comboboxOptions: React.ComponentProps<typeof Combobox>["options"] = [
  { value: "foundation", label: "Foundations" },
  { value: "tokens", label: "Tokens" },
  { value: "components", label: "Components" },
  { value: "streaming", label: "Streaming AI" },
];

const moodOptions: React.ComponentProps<typeof MoodSelector>["options"] = [
  { value: "calm", label: "Calm", tone: "calm", description: "Reduz estímulo e favorece descobertas suaves." },
  { value: "focus", label: "Focus", tone: "focus", description: "Prioriza continuidade, clareza e próxima ação." },
  { value: "energy", label: "Energy", tone: "energy", description: "Aumenta ritmo, contraste e recomendações pulsantes." },
  { value: "melancholy", label: "Noir", tone: "melancholy", description: "Curadoria contemplativa e atmosfera mais profunda." },
];

const recommendationCards: Array<{
  active?: boolean;
  badge: string;
  duration: string;
  subtitle: string;
  title: string;
}> = [
  { title: "Bio-signal playlist", subtitle: "Sequência ajustada ao humor detectado.", duration: "24m", badge: "AI", active: true },
  { title: "Neon garden", subtitle: "Conteúdo visual para desacelerar sem perder presença.", duration: "11m", badge: "Calm" },
  { title: "Pulse protocol", subtitle: "Recomendação de alta energia com transições rápidas.", duration: "18m", badge: "Energy" },
];

function getInitialAppearance(): Appearance {
  if (typeof window === "undefined") return "dark";

  const saved = window.localStorage.getItem(appearanceStorageKey);
  if (saved === "light" || saved === "dark" || saved === "vibrant") return saved;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function App() {
  const [appearance, setAppearance] = useState<Appearance>(getInitialAppearance);
  const [bootComplete, setBootComplete] = useState(false);
  const appearanceClass = appearance === "light" ? "flytrap-light" : appearance;
  const lightMode = appearance === "light";
  const handleBootComplete = React.useCallback(() => setBootComplete(true), []);

  React.useEffect(() => {
    document.documentElement.dataset.theme = appearance;
    document.documentElement.classList.toggle("dark", appearance !== "light");
    document.body.style.background = lightMode ? "#fff7fb" : "#05060a";
    window.localStorage.setItem(appearanceStorageKey, appearance);
  }, [appearance, lightMode]);

  React.useEffect(() => {
    document.documentElement.style.overflow = bootComplete ? "" : "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [bootComplete]);

  return <div className={appearanceClass}>
    <a
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-[#b8ff35] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#071006] focus:shadow-[0_0_24px_rgba(184,255,53,.45)]"
      href="#main-content"
    >
      Pular para o conteúdo principal
    </a>
    {!bootComplete && <BootLoader onComplete={handleBootComplete} />}
    <div className={["min-h-screen text-white lg:grid lg:grid-cols-[268px_1fr]", lightMode ? "bg-[#fff7fb]" : "bg-[#05060a]"].join(" ")}>
      <Sidebar appearance={appearance} onAppearanceChange={setAppearance} />

      <main aria-label="Flytrap Design System documentation" className="relative min-w-0 overflow-hidden" id="main-content" tabIndex={-1}>
        <OrganicBackground enable3D={bootComplete} light={lightMode} />
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
                lead="Os princípios atômicos que moldam nosso organismo digital."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md"
                linkLabel="View foundations"
                title="Foundations"
              />
              <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <SectionCard meta="8 escalas" title="Color">
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
          <section aria-label="Tokens" className="relative border-b border-[#ff4fbd]/14 px-6 py-9 md:px-8">
            <img aria-hidden="true" className="pointer-events-none absolute left-[-9rem] top-[-6rem] z-0 hidden w-64 opacity-90 lg:block" draggable={false} src={spriteVertical} />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:gap-12">
              <SectionHeader
                id="tokens"
                index="02"
                lead="As variáveis vivas que alimentam nosso sistema. Primitive entrega valor, semantic entrega intenção."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/packages/tokens/src/flytrap.tokens.json"
                linkLabel="Explore tokens"
                title="Tokens"
              />
              <div className="min-w-0 flex-1">
                <PillTabs active={0} items={["All tokens", "Color", "Type", "Space", "Border", "Motion", "Elevation"]} label="Categorias de tokens" />
                <div className="mt-3 grid gap-3 xl:grid-cols-[1.05fr_1.4fr]">
                  <SectionCard meta="DTCG" title="Semantic">
                    {semanticTokens.map(([name, hex, swatch]) => <TokenRow key={name} name={name} swatch={swatch} value={hex} />)}
                  </SectionCard>
                  <div className="grid gap-4">
                    <SectionCard meta="11 steps" title="Scale · Magenta">
                      <div className="grid grid-cols-11 overflow-hidden rounded-lg border border-white/15">
                        {magentaSteps.map(step => <span
                          className={["aspect-square", step === 500 ? "ring-2 ring-inset ring-white" : ""].join(" ")}
                          key={step}
                          style={{ background: `var(--magenta-${step})` }}
                          title={`--magenta-${step}`}
                        />)}
                      </div>
                      <div className="mt-2 grid grid-cols-11 text-center font-mono text-[0.55rem] text-white/60">
                        {magentaSteps.map(step => <span key={step}>{step}</span>)}
                      </div>
                    </SectionCard>
                    <SectionCard meta="8pt" title="Space scale">
                      <div className="flex items-end gap-1.5">
                        {spaceSteps.map(step => <span
                          className="rounded-sm bg-[#009200] shadow-[0_0_10px_rgba(0,146,0,.4)]"
                          key={step}
                          style={{ height: `${Math.min(step, 64)}px`, width: "100%" }}
                          title={`${step}px`}
                        />)}
                      </div>
                      <div className="mt-2 flex justify-between font-mono text-[0.55rem] text-white/60">
                        {spaceSteps.map(step => <span key={step}>{step}</span>)}
                      </div>
                    </SectionCard>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <SectionCard title="Border radius">
                        <div className="flex items-end justify-between gap-2">
                          {radiusSteps.map(radius => <span className="grid flex-1 place-items-center" key={radius}>
                            <span
                              className={["block size-9 border-2", radius === 16 ? "border-[#ff4fbd] shadow-[0_0_14px_rgba(255,79,189,.5)]" : "border-white/30"].join(" ")}
                              style={{ borderRadius: radius }}
                            />
                            <span className="mt-1.5 font-mono text-[0.55rem] text-white/60">{radius}</span>
                          </span>)}
                        </div>
                      </SectionCard>
                      <SectionCard title="Elevation">
                        <div className="flex items-end justify-between gap-2">
                          {elevationSteps.map(level => <span className="grid flex-1 place-items-center" key={level}>
                            <span
                              className={["block size-9 rounded-md bg-white/12", level === 3 ? "ring-2 ring-[#F10081] shadow-[0_0_14px_rgba(241,0,129,.45)]" : ""].join(" ")}
                              style={{ boxShadow: `0 ${level * 4}px ${level * 9}px rgba(0,0,0,.55), 0 0 ${level * 3}px rgba(255,79,189,${level * 0.05})` }}
                            />
                            <span className={["mt-1.5 font-mono text-[0.55rem]", level === 3 ? "text-[#ff4fbd]" : "text-white/60"].join(" ")}>{level}</span>
                          </span>)}
                        </div>
                      </SectionCard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 03 · Components */}
          <section aria-label="Components" className="relative min-h-[420px] border-b border-[#ff4fbd]/14 px-6 py-9 md:px-8">
            <CharacterLayer
              alt="Alienígena Flytrap deitada sobre uma placa de circuito holográfica, inspecionando o repositório de componentes."
              className="absolute right-[-25vw] top-[8%] z-0 hidden h-[min(54vw,780px)] w-[min(66vw,980px)] lg:block xl:right-[-14vw]"
              pose="lying"
            />
            <img
              alt=""
              aria-hidden="true"
              className="flytrap-motion pointer-events-none absolute right-[-22vw] top-[38%] z-0 hidden w-[min(58vw,940px)] animate-[flytrap-panel-float_8.4s_ease-in-out_infinite] opacity-95 drop-shadow-[0_30px_80px_rgba(139,92,246,.48)] lg:block xl:right-[-13vw]"
              draggable={false}
              src={spritePlatform}
            />
            <img aria-hidden="true" className="pointer-events-none absolute bottom-[-5rem] right-[-12rem] z-0 hidden w-[62rem] opacity-95 lg:block" draggable={false} src={spriteWideB} />
            <FloatingPanel className="absolute right-8 top-14 z-40 hidden w-56 xl:block" title="Component anatomy">
              <div aria-hidden="true" className="relative mx-auto h-28 w-36 [perspective:600px]">
                {anatomyLayers.map((_, index) => <span
                  className="absolute inset-x-2 h-10 rounded-lg border border-[#ff4fbd]/45 bg-[#ff4fbd]/10 backdrop-blur-sm"
                  key={index}
                  style={{ top: `${index * 13}px`, transform: "rotateX(58deg) rotateZ(-38deg)", opacity: 1 - index * 0.12 }}
                />)}
              </div>
              <ul className="mt-3 grid gap-1.5">
                {anatomyLayers.map(layer => <li className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/60" key={layer}>
                  <span className="size-1 rounded-full bg-[#ff4fbd]" />{layer}
                </li>)}
              </ul>
            </FloatingPanel>
            <div className="relative z-20 flex flex-col gap-8 lg:flex-row lg:gap-12">
              <SectionHeader
                id="components"
                index="03"
                lead="Organismos reutilizáveis que compõem experiências com significado."
                linkHref="https://github.com/LouizeB/flytrapds/tree/main/packages/ui"
                linkLabel="Browse components"
                title="Components"
              />
              <div className="min-w-0 flex-1 lg:max-w-[54%] xl:max-w-[58%]">
                <PillTabs active={0} items={["All", "Inputs", "Navigation", "Feedback", "Data display", "Surfaces", "Overlays"]} label="Categorias de componentes" />
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <ComponentPreview title="Button">
                    <div className="grid justify-items-start gap-2">
                      <Button className="rounded-full bg-[#F10081] px-5 shadow-[0_0_18px_rgba(241,0,129,.4)] hover:bg-[#CF006A]">Primary</Button>
                      <Button className="rounded-full border border-white/15 bg-white/8 px-5 text-white hover:bg-white/15">Secondary</Button>
                    </div>
                  </ComponentPreview>
                  <ComponentPreview title="Input field">
                    <Field label="Type something...">
                      <Input placeholder="Active" />
                    </Field>
                    <Input disabled placeholder="Disabled" />
                  </ComponentPreview>
                  <ComponentPreview title="Card">
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
                  <ComponentPreview title="Data table">
                    <SmartDataTable
                      caption="Registros do organismo"
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
                    <SwitchField label="On" switchProps={{ defaultChecked: true }} />
                    <SwitchField label="Off" />
                  </ComponentPreview>
                  <ComponentPreview className="col-span-2" title="Modal">
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
                          <DialogDescription>This is a modal. Overlays preservam foco e contexto.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter><Button variant="outline">Cancel</Button><Button className="bg-[#F10081] hover:bg-[#CF006A]">Confirm</Button></DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </ComponentPreview>
                </div>
                <div className="mt-5 grid gap-4">
                  <SectionCard meta="new wave" title="Controls · inputs · feedback">
                    <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                      <div className="grid gap-3">
                        <SearchField aria-label="Buscar componente" defaultValue="mood selector" />
                        <Combobox defaultValue="streaming" options={comboboxOptions} />
                        <DatePickerField defaultValue="2026-07-13" hint="A documentação usa inputs nativos e rotulagem acessível." label="Release target" />
                        <SliderField defaultValue={76} hint="Controla intensidade da curadoria inteligente." label="Bio-signal intensity" valueLabel="76%" />
                      </div>
                      <div className="grid gap-3">
                        <InlineNotification title="Componentes sincronizados" variant="success">
                          Novos organismos estão renderizados na página pública e prontos para inspeção visual.
                        </InlineNotification>
                        <FileUpload description="Exemplo de estado pronto para anexar assets do DS." label="Importar asset do organismo" multiple />
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusIndicator tone="success">Tokens ativos</StatusIndicator>
                          <StatusIndicator tone="info">Docs atualizada</StatusIndicator>
                          <StatusIndicator tone="warning">Visual audit recomendado</StatusIndicator>
                        </div>
                        <ButtonGroup aria-label="Modos de documentação">
                          <ButtonGroupItem selected>Docs</ButtonGroupItem>
                          <ButtonGroupItem>Usage</ButtonGroupItem>
                          <ButtonGroupItem>API</ButtonGroupItem>
                        </ButtonGroup>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard meta="structure" title="Layout organisms">
                    <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <InteractiveCard description="Ação principal com estado selecionado, foco visível e descrição." heading="Interactive card" icon={AiAccentIcon} selected>
                          Usado para escolhas de fluxo, agentes e modos do sistema.
                        </InteractiveCard>
                        <InteractiveCard description="Cartão neutro para padrões navegáveis." heading="Pattern surface" icon={DashboardIcon}>
                          Herda tokens de superfície, borda e estado.
                        </InteractiveCard>
                      </div>
                      <div className="grid gap-4">
                        <DataList>
                          <DataListItem>
                            <DataListTerm>Package</DataListTerm>
                            <DataListDescription>@flytrap/ui</DataListDescription>
                          </DataListItem>
                          <DataListItem>
                            <DataListTerm>Coverage</DataListTerm>
                            <DataListDescription>100% componentes exportados</DataListDescription>
                          </DataListItem>
                        </DataList>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Timeline aria-label="Linha do tempo de adoção">
                            <TimelineItem description="Inputs, feedback e preview." meta="P0" title="Foundation" tone="success" />
                            <TimelineItem description="Estrutura para docs robusta." meta="P1" title="Layout" tone="info" />
                            <TimelineItem description="Streaming moldado por humor." meta="P2" title="AI layer" tone="warning" />
                          </Timeline>
                          <TreeView aria-label="Árvore de componentes">
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

                  <SectionCard meta="streaming · ai" title="Mood-aware streaming system">
                    <div className="grid gap-5">
                      <MoodSelector defaultValue="focus" options={moodOptions} />
                      <div className="grid gap-4 xl:grid-cols-[1fr_1.15fr]">
                        <div className="grid gap-3">
                          <MoodSignal description="Sinal dominante usado para ajustar ritmo, intensidade e narrativa." label="Focus signal" tone="focus" value={82} />
                          <ModelConfidence description="Modelo recomenda com base em humor, histórico e contexto da sessão." value={91} />
                          <PlayerControls playing progress={64} />
                        </div>
                        <PersonalizationPanel
                          action={<Button size="sm" variant="outline">Recalibrar</Button>}
                          confidence={91}
                          moodLabel="Bio-mood"
                          moodTone="focus"
                          moodValue={82}
                          signals={[
                            { label: "Atmosfera", value: "Cyber-botânica · neon baixo" },
                            { label: "Ritmo", value: "Sequência progressiva, baixa fricção" },
                            { label: "Interface", value: "Cards densos, glow moderado, foco alto" },
                          ]}
                          title="AI personalization engine"
                        />
                      </div>
                      <RecommendationRail description="Exemplo de rail para uma experiência de streaming que muda conforme o humor." title="Recomendações inteligentes">
                        {recommendationCards.map((card, index) => <div className="min-w-[220px] flex-1" key={card.title} role="listitem">
                          <MediaCard
                            active={card.active}
                            badge={card.badge}
                            duration={card.duration}
                            imageAlt={`Visual abstrato do conteúdo ${card.title}`}
                            imageSrc={index === 0 ? spriteCorner : index === 1 ? organismBr : spriteWideB}
                            subtitle={card.subtitle}
                            title={card.title}
                          />
                        </div>)}
                      </RecommendationRail>
                      <div className="flex flex-wrap gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">Ações do componente</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Documentar</DropdownMenuLabel>
                            <DropdownMenuItem>Copiar snippet</DropdownMenuItem>
                            <DropdownMenuItem>Ver estados</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Auditar acessibilidade</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button className="bg-[#F10081] hover:bg-[#CF006A]">Ver componentes no pacote</Button>
                      </div>
                    </div>
                  </SectionCard>
                </div>
              </div>
            </div>
          </section>

          {/* 04 · Patterns */}
          <section aria-label="Patterns" className="relative border-b border-[#ff4fbd]/14 px-6 py-8 md:px-8 lg:pr-[30vw] xl:pr-[26vw]">
            <img aria-hidden="true" className="pointer-events-none absolute bottom-[-5rem] left-[-8rem] z-0 hidden w-[38rem] opacity-90 mix-blend-screen saturate-150 lg:block" draggable={false} src={spriteWideB} />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
              <SectionHeader
                id="patterns"
                index="04"
                lead="Combinações comprovadas que resolvem problemas complexos."
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
            <img aria-hidden="true" className="pointer-events-none absolute right-[-6rem] top-[-8rem] z-0 hidden w-72 -scale-x-100 rotate-12 opacity-80 mix-blend-screen lg:block" draggable={false} src={spriteCorner} />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
              <SectionHeader
                id="accessibility"
                index="05"
                lead="Inclusivo por design. Usável por qualquer pessoa."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md"
                linkLabel="View guidelines"
                title="Accessibility"
              />
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <SectionCard meta="APCA" title="Contrast">
                  <p className="font-display text-3xl font-bold text-white/90">54 <span className="text-base font-medium text-white/65">pares aprovados</span></p>
                  <p className="mt-2 text-sm text-white/60">Conteúdo, ações, foco e dataviz validados em light, dark e vibrant.</p>
                </SectionCard>
                <SectionCard meta="focus" title="Visible focus">
                  <span className="inline-grid size-14 place-items-center rounded-lg border border-white/20 bg-black/40 font-display text-xl font-bold text-white outline outline-2 outline-offset-2 outline-[#ff4fbd]">Aa</span>
                  <p className="mt-3 text-sm text-white/60">Anel de foco visível e navegação por teclado em todos os componentes.</p>
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
                lead="Regras de engajamento para uma experiência consistente."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/CONTRIBUTING.md"
                linkLabel="Read guidelines"
                title="Guidelines"
              />
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <SectionCard meta="Do" title="Use clear hierarchy">
                  <span className="inline-flex items-center gap-2 text-sm text-[#b8ff35]">
                    <FlytrapIcon icon={SuccessIcon} /> Hierarquia tipográfica orienta a leitura sem esforço.
                  </span>
                </SectionCard>
                <SectionCard meta="Don't" title="Overuse accents">
                  <span className="inline-flex items-center gap-2 text-sm text-[#ff4fbd]">
                    <FlytrapIcon icon={ErrorIcon} /> Acentos em excesso disputam atenção e quebram o foco.
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
            <img aria-hidden="true" className="pointer-events-none absolute bottom-[-7rem] right-[8rem] z-0 hidden w-80 opacity-70 mix-blend-screen saturate-150 lg:block" draggable={false} src={organismBr} />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:gap-12">
              <SectionHeader
                id="code"
                index="07"
                lead="Construa com o nosso sistema em qualquer ambiente."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md#trilha-development"
                linkLabel="View documentation"
                title="Code / Develop"
              />
              <div className="grid min-w-0 flex-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
                <div className="min-w-0">
                  <PillTabs active={0} items={["React", "Vue", "Web components", "CSS"]} label="Plataformas" />
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
            <img aria-hidden="true" className="pointer-events-none absolute bottom-[-2rem] right-[-1rem] z-0 hidden w-72 opacity-95 mix-blend-screen saturate-125 lg:block" draggable={false} src={organismBr} />
            <img aria-hidden="true" className="pointer-events-none absolute left-[-5rem] top-[-6rem] z-0 hidden w-72 rotate-[160deg] opacity-70 lg:block" draggable={false} src={spriteCorner} />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:gap-12">
              <SectionHeader
                id="ai-workflows"
                index="08"
                lead="Design na velocidade da inteligência: o metabolismo do organismo."
                linkHref="https://github.com/LouizeB/flytrapds/blob/main/docs/README.md"
                linkLabel="Explore workflows"
                title="AI Workflows"
              />
              <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {workflowCards.map(card => <WorkflowCard description={card.description} icon={card.icon} key={card.title} title={card.title} />)}
              </div>
            </div>
          </section>

          <footer aria-label="Informações finais do Flytrap Design System" className="relative border-t border-white/10 px-6 py-8 text-white/65 md:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <p className="inline-flex items-center gap-2">
                <FlytrapIcon icon={InsightIcon} size="sm" />
                Flytrap DS · Um organismo vivo de tokens, componentes e acessibilidade.
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
