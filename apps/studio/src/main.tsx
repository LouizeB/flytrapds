import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AgentCard,
  AgentIcon,
  Badge,
  BrandIcon,
  BrandLockup,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Chart,
  ChartIcon,
  CostTokenMeter,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  FilterBar,
  FlytrapIcon,
  HumanApprovalPrompt,
  InlineNotification,
  InsightCallout,
  KpiStatCard,
  MediaCard,
  ModelConfidence,
  MoodSelector,
  type MoodSelectorOption,
  Page,
  PageDescription,
  PageHeader,
  PageTitle,
  PersonalizationPanel,
  PlayerControls,
  PromptInput,
  ReasoningStream,
  RecommendationRail,
  RunTraceTimeline,
  SearchIcon,
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
  SmartDataTable,
  StatusIndicator,
  StreamingMessage,
  SuggestedPrompts,
  Timeline,
  TimelineItem,
  ToolCallBlock,
} from "@flytrap/ui";
import "@flytrap/ui/styles";

type Mood = "calm" | "focus" | "energy" | "noir";
type CatalogItem = {
  requiresApproval: boolean;
  title: React.ReactNode;
  mood: React.ReactNode;
  fit: React.ReactNode;
  status: React.ReactNode;
};

const moodOptions: MoodSelectorOption[] = [
  {
    description: "Soft pacing, low contrast transitions and quiet recommendations.",
    label: "Calm",
    tone: "calm",
    value: "calm",
  },
  {
    description: "Prioritize fewer choices, sharper hierarchy and short-form learning.",
    label: "Focus",
    tone: "focus",
    value: "focus",
  },
  {
    description: "Boost discovery density, motion previews and high-energy trailers.",
    label: "Energy",
    tone: "energy",
    value: "energy",
  },
  {
    description: "Favor cinematic, mysterious and slower narrative arcs.",
    label: "Noir",
    tone: "melancholy",
    value: "noir",
  },
];

const moodCopy: Record<Mood, { confidence: number; label: string; prompt: string; value: number }> = {
  calm: {
    confidence: 87,
    label: "Calm evening mode",
    prompt: "Build a calm queue for a viewer who wants soft science fiction and low-intensity visuals.",
    value: 64,
  },
  focus: {
    confidence: 92,
    label: "Focused discovery mode",
    prompt: "Recommend a concise queue for someone who wants to learn the system quickly.",
    value: 82,
  },
  energy: {
    confidence: 89,
    label: "High-energy premiere mode",
    prompt: "Create a bold queue with vivid trailers, fast pacing and social moments.",
    value: 91,
  },
  noir: {
    confidence: 84,
    label: "Noir narrative mode",
    prompt: "Curate moody cinematic episodes with atmospheric pacing and fewer interruptions.",
    value: 58,
  },
};

const catalogRows: CatalogItem[] = [
  {
    fit: "96%",
    mood: "Focus",
    requiresApproval: false,
    status: <StatusIndicator tone="success">Ready</StatusIndicator>,
    title: "Adaptive pilot cut",
  },
  {
    fit: "91%",
    mood: "Energy",
    requiresApproval: false,
    status: <StatusIndicator tone="info">Preview</StatusIndicator>,
    title: "Neon organism trailer",
  },
  {
    fit: "84%",
    mood: "Noir",
    requiresApproval: true,
    status: <StatusIndicator tone="warning">Needs consent</StatusIndicator>,
    title: "Slow-burn archive",
  },
];

const signalData = [
  { minute: "00", attention: 72, affinity: 64 },
  { minute: "05", attention: 78, affinity: 69 },
  { minute: "10", attention: 83, affinity: 76 },
  { minute: "15", attention: 81, affinity: 82 },
  { minute: "20", attention: 88, affinity: 86 },
  { minute: "25", attention: 92, affinity: 90 },
];

function App() {
  const [mood, setMood] = useState<Mood>("focus");
  const [prompt, setPrompt] = useState(moodCopy.focus.prompt);
  const [queueFilter, setQueueFilter] = useState("");
  const [segment, setSegment] = useState("recommended");

  const currentMood = moodCopy[mood];
  const filteredRows = useMemo(() => {
    const query = queueFilter.trim().toLowerCase();
    const segmentRows = segment === "all"
      ? catalogRows
      : segment === "approval"
        ? catalogRows.filter((row) => row.requiresApproval)
        : catalogRows.filter((row) => String(row.mood).toLowerCase() === mood || segment === "recommended");

    if (!query) return segmentRows;
    return segmentRows.filter((row) => [row.title, row.mood, row.fit].some((value) => String(value).toLowerCase().includes(query)));
  }, [mood, queueFilter, segment]);

  return <div className="dark min-h-screen bg-background text-foreground">
    <div className="min-h-screen lg:grid lg:grid-cols-[264px_1fr]">
      <aside className="border-b bg-sidebar p-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <BrandLockup descriptor="Stream Studio" />
        <nav aria-label="Studio sections" className="mt-8 grid gap-1 text-sm">
          <a className="flex min-h-10 items-center gap-3 rounded-md bg-sidebar-accent px-3 py-2 font-medium" href="#experience">
            <FlytrapIcon icon={BrandIcon} /> Experience
          </a>
          <a className="flex min-h-10 items-center gap-3 rounded-md px-3 py-2 font-medium hover:bg-sidebar-accent" href="#signals">
            <FlytrapIcon icon={ChartIcon} /> Signals
          </a>
          <a className="flex min-h-10 items-center gap-3 rounded-md px-3 py-2 font-medium hover:bg-sidebar-accent" href="#agent">
            <FlytrapIcon icon={AgentIcon} /> AI agent
          </a>
        </nav>
        <div className="mt-8 grid gap-3 rounded-xl border bg-background/50 p-4">
          <StatusIndicator tone="success">Studio online</StatusIndicator>
          <StatusIndicator tone="info">Mood model active</StatusIndicator>
          <StatusIndicator tone="warning">Sensitive shift approval required</StatusIndicator>
        </div>
      </aside>

      <Page className="max-w-none">
        <PageHeader>
          <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
            <div>
              <PageDescription>Flytrap Design System · product consumer</PageDescription>
              <PageTitle>AI-managed streaming studio</PageTitle>
              <PageDescription>
                A product-facing surface that proves Flytrap UI outside docs and operations. The interface adapts recommendations, pacing and review actions from the selected viewer mood.
              </PageDescription>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button>Start adaptive session</Button>
                <Button variant="outline">Review model signals</Button>
              </div>
            </div>
            <PersonalizationPanel
              action={<Badge variant="success">Live session</Badge>}
              confidence={currentMood.confidence}
              moodLabel={currentMood.label}
              moodTone={mood === "noir" ? "melancholy" : mood}
              moodValue={currentMood.value}
              signals={[
                { label: "Primary signal", value: "Viewer mood and pacing tolerance" },
                { label: "Recommendation mode", value: "Transparent and reversible" },
                { label: "Safety rule", value: "Escalate sensitive changes to human approval" },
              ]}
              title="Personalization engine"
            />
          </div>
        </PageHeader>

        <Section aria-labelledby="experience-title" id="experience">
          <SectionHeader>
            <SectionTitle id="experience-title">Mood-shaped experience</SectionTitle>
            <SectionDescription>Select a mood to reshape the queue, confidence model and agent prompt.</SectionDescription>
          </SectionHeader>
          <MoodSelector
            options={moodOptions}
            value={mood}
            onValueChange={(value) => {
              const nextMood = value as Mood;
              setMood(nextMood);
              setPrompt(moodCopy[nextMood].prompt);
            }}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiStatCard delta={12} description="session fit" label="Mood match" value={`${currentMood.value}%`} />
            <KpiStatCard delta={4} description="recommendation lift" label="Affinity" value={`${currentMood.confidence}%`} />
            <KpiStatCard delta={-8} description="reduced friction" label="Choice load" value="Low" />
            <KpiStatCard delta={6} description="queue stability" label="Continuity" value="18m" />
          </div>
        </Section>

        <Section aria-labelledby="queue-title">
          <SectionHeader>
            <SectionTitle id="queue-title">Adaptive queue</SectionTitle>
            <SectionDescription>Content cards, filters and tables use the same DS primitives that power the documentation.</SectionDescription>
          </SectionHeader>
          <FilterBar onValueChange={setQueueFilter} placeholder="Search queue, signals or episodes…" value={queueFilter}>
            <ButtonGroup aria-label="Queue segment">
              <ButtonGroupItem onClick={() => setSegment("recommended")} selected={segment === "recommended"}>Recommended</ButtonGroupItem>
              <ButtonGroupItem onClick={() => setSegment("all")} selected={segment === "all"}>All</ButtonGroupItem>
              <ButtonGroupItem onClick={() => setSegment("approval")} selected={segment === "approval"}>Approval</ButtonGroupItem>
            </ButtonGroup>
          </FilterBar>
          <RecommendationRail description="The first card follows the selected mood; secondary cards remain available for exploration." title="Recommended now">
            <div className="min-w-[260px] flex-1" role="listitem">
              <MediaCard active badge={mood.toUpperCase()} duration="12m" subtitle={`${currentMood.label} · confidence ${currentMood.confidence}%`} title="Mood-fit feature cut" />
            </div>
            <div className="min-w-[260px] flex-1" role="listitem">
              <MediaCard badge="TRAILER" duration="2m" subtitle="Fast preview with reversible personalization." title="Signal-aware trailer" />
            </div>
            <div className="min-w-[260px] flex-1" role="listitem">
              <MediaCard badge="DEEP DIVE" duration="18m" subtitle="Explains why the model changed the session." title="Recommendation anatomy" />
            </div>
          </RecommendationRail>
          <SmartDataTable
            caption="Adaptive queue readiness"
            columns={[
              { key: "title", header: "Title" },
              { key: "mood", header: "Mood" },
              { key: "fit", header: "Fit" },
              { key: "status", header: "Status" },
            ]}
            getRowId={(row) => String(row.title)}
            rows={filteredRows}
          />
        </Section>

        <Section aria-labelledby="signals-title" id="signals">
          <SectionHeader>
            <SectionTitle id="signals-title">Viewer signals</SectionTitle>
            <SectionDescription>Observable metrics stay readable and available as data tables for assistive technology.</SectionDescription>
          </SectionHeader>
          <div className="grid gap-4 xl:grid-cols-[1.3fr_.7fr]">
            <Chart
              data={signalData}
              description="Attention and affinity are monitored as transparent signals, not hidden manipulation."
              series={[
                { key: "attention", label: "Attention" },
                { key: "affinity", label: "Affinity" },
              ]}
              title="Mood model signal curve"
              type="area"
              valueFormatter={(value) => `${value}%`}
              xKey="minute"
            />
            <Card>
              <CardHeader>
                <CardTitle>Session contract</CardTitle>
                <CardDescription>Rules that keep personalization understandable.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataList>
                  <DataListItem>
                    <DataListTerm>Transparency</DataListTerm>
                    <DataListDescription>Every queue change includes a visible reason.</DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Control</DataListTerm>
                    <DataListDescription>Users can change mood or reset recommendations at any time.</DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Safety</DataListTerm>
                    <DataListDescription>High-impact mood shifts request human approval.</DataListDescription>
                  </DataListItem>
                </DataList>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section aria-labelledby="agent-title" id="agent">
          <SectionHeader>
            <SectionTitle id="agent-title">AI workflow</SectionTitle>
            <SectionDescription>The agent layer uses DS components for traceability, consent and prompt-driven curation.</SectionDescription>
          </SectionHeader>
          <div className="grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
            <div className="grid gap-4">
              <AgentCard model="Flytrap Recommender" name="Mood curator" status="running" tokens="3.2K">
                Adjusts content density, preview order and session tone from explicit mood controls.
              </AgentCard>
              <CostTokenMeter cost="$0.18" limit={8000} used={3260} />
              <ModelConfidence description="Confidence that the current queue matches the selected mood without over-personalizing." value={currentMood.confidence} />
              <PlayerControls playing progress={68} />
            </div>
            <div className="grid gap-4">
              <ReasoningStream defaultOpen status="completed" summary="The system selected a concise queue because the viewer mood indicates focus. It reduced novelty and prioritized explainable recommendations.">
                Analysis complete
              </ReasoningStream>
              <ToolCallBlock
                defaultOpen
                duration="420ms"
                input={<code>{JSON.stringify({ mood, safety: "approval-required", queue: "adaptive" }, null, 2)}</code>}
                name="recommendation.rankQueue"
                output={<code>{JSON.stringify({ selected: "Mood-fit feature cut", confidence: currentMood.confidence }, null, 2)}</code>}
                status="success"
              />
              <HumanApprovalPrompt
                description="This would change the session from calm pacing to high-energy autoplay. The viewer should confirm before the system applies it."
                details="Approval keeps the AI helpful without letting mood inference silently reshape a sensitive experience."
                expiresAt="in 4 minutes"
                title="Approve high-impact mood shift"
              />
            </div>
          </div>
        </Section>

        <Section aria-labelledby="assistant-title">
          <SectionHeader>
            <SectionTitle id="assistant-title">Assistant console</SectionTitle>
            <SectionDescription>Prompt, streaming and suggested-action primitives composed into a product workflow.</SectionDescription>
          </SectionHeader>
          <div className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
            <Card>
              <CardHeader>
                <CardTitle>Conversation preview</CardTitle>
                <CardDescription>Visible model output keeps recommendations inspectable.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <StreamingMessage status="completed">
                  I adjusted the queue for <strong>{currentMood.label}</strong>. The next item has a {currentMood.confidence}% fit and keeps user control visible.
                </StreamingMessage>
                <PromptInput
                  footer={<span className="text-xs text-muted-foreground">No request is sent in this static consumer app.</span>}
                  label="Streaming assistant prompt"
                  onSubmitPrompt={setPrompt}
                  onValueChange={setPrompt}
                  placeholder="Describe the viewer mood or session goal…"
                  value={prompt}
                />
                <SuggestedPrompts
                  onSelect={setPrompt}
                  prompts={[
                    "Explain why this queue changed",
                    "Make the experience calmer",
                    "Show only accessible motion",
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Release trace</CardTitle>
                <CardDescription>Product readiness mapped to implementation steps.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <RunTraceTimeline
                  steps={[
                    { description: "The app imports components from @flytrap/ui.", duration: "done", id: "consumer", status: "completed", title: "Consumer connected" },
                    { description: "Mood controls reshape the recommendation surface.", duration: "current", id: "mood", status: "running", title: "Behavior mapped" },
                    { description: "Visual audit can target this app in a later phase.", duration: "next", id: "audit", status: "idle", title: "Audit extension" },
                  ]}
                />
                <Timeline aria-label="Studio roadmap">
                  <TimelineItem description="Use DS primitives in product context." meta="Done" title="Create Studio consumer" tone="success" />
                  <TimelineItem description="Add visual and accessibility audit coverage." meta="Next" title="Audit Studio" tone="info" />
                </Timeline>
              </CardContent>
            </Card>
          </div>
          <InlineNotification title="Consumer app milestone" variant="success">
            Flytrap now has a product-like consumer separate from documentation and internal operations.
          </InlineNotification>
        </Section>
      </Page>
    </div>
  </div>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
