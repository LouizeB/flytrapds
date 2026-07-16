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
type ApprovalState = "pending" | "approved" | "rejected";
type ConversationMessage = {
  id: number;
  mood: Mood;
  prompt: string;
};
type CatalogItem = {
  duration: string;
  fitByMood: Record<Mood, number>;
  requiresApproval: boolean;
  summary: string;
  title: string;
  targetMood: Mood;
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

const moodCopy: Record<Mood, { choiceLoad: string; confidence: number; continuity: string; label: string; prompt: string; reasoning: string; value: number }> = {
  calm: {
    choiceLoad: "Very low",
    confidence: 87,
    continuity: "24m",
    label: "Calm evening mode",
    prompt: "Build a calm queue for a viewer who wants soft science fiction and low-intensity visuals.",
    reasoning: "The system reduces novelty, slows pacing and avoids sudden autoplay because the selected mood asks for quiet control.",
    value: 64,
  },
  focus: {
    choiceLoad: "Low",
    confidence: 92,
    continuity: "18m",
    label: "Focused discovery mode",
    prompt: "Recommend a concise queue for someone who wants to learn the system quickly.",
    reasoning: "The system selected a concise queue because the viewer mood indicates focus. It reduced novelty and prioritized explainable recommendations.",
    value: 82,
  },
  energy: {
    choiceLoad: "High",
    confidence: 89,
    continuity: "11m",
    label: "High-energy premiere mode",
    prompt: "Create a bold queue with vivid trailers, fast pacing and social moments.",
    reasoning: "The system increases preview density, highlights trailers and raises motion intensity while keeping sensitive changes reversible.",
    value: 91,
  },
  noir: {
    choiceLoad: "Medium",
    confidence: 84,
    continuity: "32m",
    label: "Noir narrative mode",
    prompt: "Curate moody cinematic episodes with atmospheric pacing and fewer interruptions.",
    reasoning: "The system favors slower arcs, darker cinematic material and fewer interruptions because the selected mood asks for atmosphere.",
    value: 58,
  },
};

const catalogRows: CatalogItem[] = [
  {
    duration: "12m",
    fitByMood: { calm: 74, energy: 82, focus: 96, noir: 78 },
    requiresApproval: false,
    summary: "A compact first episode that explains the world and avoids overwhelming the viewer.",
    targetMood: "focus",
    title: "Adaptive pilot cut",
  },
  {
    duration: "2m",
    fitByMood: { calm: 62, energy: 91, focus: 76, noir: 70 },
    requiresApproval: false,
    summary: "A vivid preview with fast transitions, character beats and high-discovery momentum.",
    targetMood: "energy",
    title: "Neon organism trailer",
  },
  {
    duration: "18m",
    fitByMood: { calm: 81, energy: 68, focus: 75, noir: 84 },
    requiresApproval: true,
    summary: "A darker archival episode with slower pacing and sensitive mood-shift potential.",
    targetMood: "noir",
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
  const [activeTitle, setActiveTitle] = useState(catalogRows[0].title);
  const [approvalState, setApprovalState] = useState<ApprovalState>("pending");
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [playing, setPlaying] = useState(true);
  const [queueFilter, setQueueFilter] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [segment, setSegment] = useState("recommended");
  const [studioView, setStudioView] = useState<"experience" | "signals" | "agent">("experience");

  const currentMood = moodCopy[mood];
  const activeItem = catalogRows.find((row) => row.title === activeTitle) ?? catalogRows[0];
  const playerProgress = playing ? Math.min(96, currentMood.value + 8) : Math.max(8, currentMood.value - 24);
  const tableRows = useMemo(() => catalogRows.map((row) => {
    const fit = row.fitByMood[mood];
    const isActive = row.title === activeTitle;
    return {
      fit: `${fit}%`,
      mood: row.targetMood[0].toUpperCase() + row.targetMood.slice(1),
      status: row.requiresApproval
        ? <StatusIndicator tone={approvalState === "approved" ? "success" : approvalState === "rejected" ? "error" : "warning"}>{approvalState === "approved" ? "Approved" : approvalState === "rejected" ? "Rejected" : "Needs consent"}</StatusIndicator>
        : <StatusIndicator tone={isActive ? "success" : "info"}>{isActive ? "Now playing" : "Ready"}</StatusIndicator>,
      title: row.title,
    };
  }), [activeTitle, approvalState, mood]);
  const filteredRows = useMemo(() => {
    const query = queueFilter.trim().toLowerCase();
    const segmentRows = segment === "all"
      ? tableRows
      : segment === "approval"
        ? tableRows.filter((row) => catalogRows.find((item) => item.title === row.title)?.requiresApproval)
        : tableRows.filter((row) => row.mood.toLowerCase() === mood || segment === "recommended");

    if (!query) return segmentRows;
    return segmentRows.filter((row) => [row.title, row.mood, row.fit].some((value) => String(value).toLowerCase().includes(query)));
  }, [mood, queueFilter, segment, tableRows]);

  function chooseMood(value: string) {
    const nextMood = value as Mood;
    const nextItem = catalogRows
      .filter((item) => !item.requiresApproval || approvalState === "approved")
      .sort((left, right) => right.fitByMood[nextMood] - left.fitByMood[nextMood])[0] ?? catalogRows[0];
    setMood(nextMood);
    setPrompt(moodCopy[nextMood].prompt);
    setActiveTitle(nextItem.title);
  }

  function submitPrompt(nextPrompt: string) {
    setPrompt(nextPrompt);
    setConversation((messages) => [{ id: Date.now(), mood, prompt: nextPrompt }, ...messages].slice(0, 3));
    setSessionStarted(true);
  }

  return <div className="dark min-h-screen bg-background text-foreground" style={{ colorScheme: "dark" }}>
    <div className="min-h-screen lg:grid lg:grid-cols-[264px_1fr]">
      <aside className="border-b bg-sidebar p-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <BrandLockup descriptor="Experience Studio" />
        <nav aria-label="Studio sections" className="mt-8 grid gap-1 text-sm">
          <button className="flex min-h-10 items-center gap-3 rounded-md bg-sidebar-accent px-3 py-2 text-left font-medium" onClick={() => setStudioView("experience")}>
            <FlytrapIcon icon={BrandIcon} /> Experience
          </button>
          <button className="flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-left font-medium hover:bg-sidebar-accent" onClick={() => setStudioView("signals")}>
            <FlytrapIcon icon={ChartIcon} /> Results
          </button>
          <button className="flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-left font-medium hover:bg-sidebar-accent" onClick={() => setStudioView("agent")}>
            <FlytrapIcon icon={AgentIcon} /> AI details
          </button>
        </nav>
        <div className="mt-8 grid gap-3 rounded-xl border bg-background/50 p-4">
          <StatusIndicator tone="success">Studio available</StatusIndicator>
          <StatusIndicator tone="info">Personalization active</StatusIndicator>
        </div>
      </aside>

      <Page className="max-w-none">
        <PageHeader>
          <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
            <div>
              <PageDescription>Flytrap Design System</PageDescription>
              <PageTitle>Personalized experience preview</PageTitle>
              <PageDescription>
                Choose a mood and see how the experience responds. You stay in control of every change.
              </PageDescription>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={() => {
                  setSessionStarted(true);
                  setPlaying(true);
                }}>{sessionStarted ? "Session active" : "Start preview"}</Button>
                <Button onClick={() => setStudioView("signals")} variant="outline">View results</Button>
              </div>
            </div>
            <PersonalizationPanel
              action={<Badge variant={sessionStarted ? "success" : "secondary"}>{sessionStarted ? "Live session" : "Preview mode"}</Badge>}
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

        <Section aria-labelledby="experience-title" id="experience" style={{ display: studioView === "experience" ? undefined : "none" }}>
          <SectionHeader>
            <SectionTitle id="experience-title">Choose the experience</SectionTitle>
            <SectionDescription>Select a mood to update the recommendations.</SectionDescription>
          </SectionHeader>
          <MoodSelector
            options={moodOptions}
            value={mood}
            onValueChange={chooseMood}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiStatCard delta={12} description="session fit" label="Mood match" value={`${currentMood.value}%`} />
            <KpiStatCard delta={4} description="recommendation lift" label="Affinity" value={`${currentMood.confidence}%`} />
            <KpiStatCard delta={mood === "energy" ? 14 : -8} description="adaptive density" label="Choice load" value={currentMood.choiceLoad} />
            <KpiStatCard delta={6} description="queue stability" label="Continuity" value={currentMood.continuity} />
          </div>
        </Section>

        <Section aria-labelledby="queue-title" style={{ display: studioView === "experience" ? undefined : "none" }}>
          <SectionHeader>
            <SectionTitle id="queue-title">Recommendations</SectionTitle>
            <SectionDescription>Choose what to play or filter the list.</SectionDescription>
          </SectionHeader>
          <FilterBar onValueChange={setQueueFilter} placeholder="Search queue, signals or episodes…" value={queueFilter}>
            <ButtonGroup aria-label="Queue segment">
              <ButtonGroupItem onClick={() => setSegment("recommended")} selected={segment === "recommended"}>Recommended</ButtonGroupItem>
              <ButtonGroupItem onClick={() => setSegment("all")} selected={segment === "all"}>All</ButtonGroupItem>
              <ButtonGroupItem onClick={() => setSegment("approval")} selected={segment === "approval"}>Approval</ButtonGroupItem>
            </ButtonGroup>
          </FilterBar>
          <RecommendationRail description="The first card follows the selected mood; secondary cards remain available for exploration." title="Recommended now">
            {catalogRows.map((item) => {
              const active = item.title === activeTitle;
              const locked = item.requiresApproval && approvalState !== "approved";
              return <div className="min-w-[260px] flex-1" key={item.title} role="listitem">
                <MediaCard
                  active={active}
                  action={<Button disabled={locked} onClick={() => {
                    setActiveTitle(item.title);
                    setSessionStarted(true);
                    setPlaying(true);
                  }} size="sm" variant={active ? "secondary" : "outline"}>{locked ? "Needs approval" : active ? "Playing" : "Play next"}</Button>}
                  badge={item.targetMood.toUpperCase()}
                  duration={item.duration}
                  subtitle={`${item.summary} Fit for ${currentMood.label}: ${item.fitByMood[mood]}%.`}
                  title={item.title}
                />
              </div>;
            })}
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

        <Section aria-labelledby="signals-title" id="signals" style={{ display: studioView === "signals" ? undefined : "none" }}>
          <SectionHeader>
            <SectionTitle id="signals-title">Results</SectionTitle>
            <SectionDescription>See the information used to shape the recommendations.</SectionDescription>
          </SectionHeader>
          <div className="grid gap-4 xl:grid-cols-[1.3fr_.7fr]">
            {studioView === "signals" && <Chart
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
            />}
            <Card>
              <CardHeader>
                <CardTitle>Session contract</CardTitle>
                <CardDescription>Rules that keep personalization understandable.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataList>
                  <DataListItem>
                    <DataListTerm>Now playing</DataListTerm>
                    <DataListDescription>{activeItem.title} · {activeItem.fitByMood[mood]}% fit</DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Control</DataListTerm>
                    <DataListDescription>Users can change mood, filter the queue, pause playback or reset recommendations.</DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Safety</DataListTerm>
                    <DataListDescription>High-impact mood shifts request human approval before content can play.</DataListDescription>
                  </DataListItem>
                </DataList>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section aria-labelledby="agent-title" id="agent" style={{ display: studioView === "agent" ? undefined : "none" }}>
          <SectionHeader>
            <SectionTitle id="agent-title">How the AI works</SectionTitle>
            <SectionDescription>Review the AI's reasoning, actions, and approval requests.</SectionDescription>
          </SectionHeader>
          <div className="grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
            <div className="grid gap-4">
              <AgentCard model="Flytrap Recommender" name="Mood curator" status={sessionStarted ? "running" : "idle"} tokens={sessionStarted ? "3.2K" : "0.8K"}>
                {sessionStarted
                  ? `Actively shaping ${activeItem.title} for ${currentMood.label}.`
                  : "Waiting for an adaptive session to start."}
              </AgentCard>
              <CostTokenMeter cost={sessionStarted ? "$0.18" : "$0.04"} limit={8000} used={sessionStarted ? 3260 : 780} />
              <ModelConfidence description="Confidence that the current queue matches the selected mood without over-personalizing." value={currentMood.confidence} />
              <PlayerControls
                onNext={() => {
                  const currentIndex = catalogRows.findIndex((item) => item.title === activeTitle);
                  const nextItem = catalogRows[(currentIndex + 1) % catalogRows.length];
                  if (nextItem.requiresApproval && approvalState !== "approved") {
                    setSegment("approval");
                    return;
                  }
                  setActiveTitle(nextItem.title);
                  setSessionStarted(true);
                }}
                onPlayPause={() => {
                  setSessionStarted(true);
                  setPlaying((value) => !value);
                }}
                onPrevious={() => {
                  const currentIndex = catalogRows.findIndex((item) => item.title === activeTitle);
                  const previousItem = catalogRows[(currentIndex - 1 + catalogRows.length) % catalogRows.length];
                  setActiveTitle(previousItem.title);
                  setSessionStarted(true);
                }}
                playing={playing}
                progress={playerProgress}
              />
            </div>
            <div className="grid gap-4">
              <ReasoningStream defaultOpen status={sessionStarted ? "streaming" : "completed"} summary={currentMood.reasoning}>
                {sessionStarted ? "Live adaptation running" : "Analysis ready"}
              </ReasoningStream>
              <ToolCallBlock
                defaultOpen
                duration="420ms"
                input={<code>{JSON.stringify({ active: activeItem.title, mood, safety: "approval-required", segment }, null, 2)}</code>}
                name="recommendation.rankQueue"
                output={<code>{JSON.stringify({ confidence: currentMood.confidence, selected: activeItem.title, status: activeItem.requiresApproval ? approvalState : "ready" }, null, 2)}</code>}
                status="success"
              />
              <HumanApprovalPrompt
                description="This would change the session from calm pacing to high-energy autoplay. The viewer should confirm before the system applies it."
                details="Approval keeps the AI helpful without letting mood inference silently reshape a sensitive experience."
                expiresAt="in 4 minutes"
                onApprove={() => {
                  setApprovalState("approved");
                  setSegment("recommended");
                }}
                onReject={() => {
                  setApprovalState("rejected");
                  setActiveTitle(catalogRows[0].title);
                }}
                status={approvalState}
                title="Approve high-impact mood shift"
              />
            </div>
          </div>
        </Section>

        <Section aria-labelledby="assistant-title" style={{ display: studioView === "agent" ? undefined : "none" }}>
          <SectionHeader>
            <SectionTitle id="assistant-title">Ask the assistant</SectionTitle>
            <SectionDescription>Describe what you want to change in the experience.</SectionDescription>
          </SectionHeader>
          <div className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
            <Card>
              <CardHeader>
                <CardTitle>Conversation preview</CardTitle>
                <CardDescription>Visible model output keeps recommendations inspectable.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <StreamingMessage status="completed">
                  I adjusted <strong>{activeItem.title}</strong> for <strong>{currentMood.label}</strong>. The active recommendation has a {activeItem.fitByMood[mood]}% fit and keeps user control visible.
                </StreamingMessage>
                {conversation.map((message) => <StreamingMessage key={message.id} status="completed">
                  Request received: “{message.prompt}” · Applied through {moodCopy[message.mood].label}.
                </StreamingMessage>)}
                <PromptInput
                  footer={<span className="text-xs text-muted-foreground">{conversation.length > 0 ? `${conversation.length} local prompt${conversation.length > 1 ? "s" : ""} in session history.` : "Submit to update the local recommendation history."}</span>}
                  label="Streaming assistant prompt"
                  onSubmitPrompt={submitPrompt}
                  onValueChange={setPrompt}
                  placeholder="Describe the viewer mood or session goal…"
                  value={prompt}
                />
                <SuggestedPrompts
                  onSelect={(nextPrompt) => {
                    setPrompt(nextPrompt);
                    submitPrompt(nextPrompt);
                  }}
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
                    { description: `Mood controls are shaping ${activeItem.title}.`, duration: sessionStarted ? "current" : "ready", id: "mood", status: sessionStarted ? "running" : "queued", title: "Behavior mapped" },
                    { description: "Visual audit targets this app in desktop and mobile.", duration: "done", id: "audit", status: "completed", title: "Audit extension" },
                  ]}
                />
                <Timeline aria-label="Studio roadmap">
                  <TimelineItem description="Use DS primitives in product context." meta="Done" title="Create Studio consumer" tone="success" />
                  <TimelineItem description="Mood, prompt, approval and playback controls mutate visible state." meta="Current" title="Make Studio interactive" tone="info" />
                </Timeline>
              </CardContent>
            </Card>
          </div>
          <InlineNotification title="Consumer app milestone" variant="success">
            Flytrap now has an interactive product-like consumer separate from documentation and internal operations.
          </InlineNotification>
        </Section>
      </Page>
    </div>
  </div>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
