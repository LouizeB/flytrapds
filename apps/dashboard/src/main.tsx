import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AgentCard,
  AgentIcon,
  Badge,
  BrandLockup,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartIcon,
  DashboardIcon,
  DataList,
  DataListDescription,
  DataListItem,
  DataListTerm,
  FilterBar,
  FlytrapIcon,
  InlineNotification,
  InsightCallout,
  InteractiveCard,
  KpiStatCard,
  MediaCard,
  MessageBubble,
  ModelConfidence,
  MoodSelector,
  Page,
  PageDescription,
  PageHeader,
  PageTitle,
  PersonalizationPanel,
  PlayerControls,
  Progress,
  RecommendationRail,
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
  SendIcon,
  SmartDataTable,
  StatusIndicator,
  Timeline,
  TimelineItem,
  Toolbar,
  TreeItem,
  TreeView,
} from "@flytrap/ui";
import "@flytrap/ui/styles";

const adoption = [44, 61, 54, 78, 68, 89, 83, 96, 72, 91, 100, 87];

const recommendationActions = [
  {
    active: true,
    badge: "P0",
    subtitle: "Connect a non-docs product to @flytrap/ui.",
    title: "External app integration",
  },
  {
    active: false,
    badge: "P1",
    subtitle: "Compare manual Figma variables with DTCG tokens.",
    title: "Figma drift check",
  },
  {
    active: false,
    badge: "P2",
    subtitle: "Track Three.js and public-art payload costs.",
    title: "Performance budget",
  },
] as const;

const moodOptions = [
  { value: "calm", label: "Calm", tone: "calm" as const, description: "Reduce density and keep the review flow quiet." },
  { value: "focus", label: "Focus", tone: "focus" as const, description: "Prioritize release blockers, accessibility and token drift." },
  { value: "energy", label: "Energy", tone: "energy" as const, description: "Surface high-signal wins and adoption momentum." },
  { value: "noir", label: "Noir", tone: "melancholy" as const, description: "Slow the pace for deeper audit and narrative review." },
];

type ReleaseRow = {
  item: React.ReactNode;
  owner: React.ReactNode;
  risk: React.ReactNode;
  status: React.ReactNode;
};

const releaseRows: ReleaseRow[] = [
  { item: "Component category guide", owner: "Docs", risk: "Low", status: <StatusIndicator tone="success">Shipped</StatusIndicator> },
  { item: "Experience visual audit", owner: "QA", risk: "Low", status: <StatusIndicator tone="success">Automated</StatusIndicator> },
  { item: "Dashboard consumer", owner: "Product", risk: "Medium", status: <StatusIndicator tone="info">In progress</StatusIndicator> },
  { item: "External product adoption", owner: "Delivery", risk: "High", status: <StatusIndicator tone="warning">Next</StatusIndicator> },
];

function App() {
  const [filter, setFilter] = useState("");
  const [view, setView] = useState("health");

  const filteredRows = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return releaseRows;

    return releaseRows.filter((row) => String(row.item).toLowerCase().includes(query) || String(row.owner).toLowerCase().includes(query));
  }, [filter]);

  return <div className="dark" style={{ colorScheme: "dark" }}>
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="border-b bg-sidebar p-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <BrandLockup descriptor="System overview" />
        <nav aria-label="Dashboard sections" className="mt-8 grid gap-1 text-sm">
          <button className="flex min-h-10 items-center gap-3 rounded-md bg-sidebar-accent px-3 py-2 text-left font-medium" onClick={() => setView("health")}><FlytrapIcon icon={DashboardIcon} />Overview</button>
          <button className="flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-left font-medium hover:bg-sidebar-accent" onClick={() => setView("release")}><FlytrapIcon icon={ChartIcon} />Releases</button>
          <button className="flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-left font-medium hover:bg-sidebar-accent" onClick={() => setView("ai")}><FlytrapIcon icon={AgentIcon} />AI tools</button>
        </nav>
        <div className="mt-8 grid gap-3 rounded-xl border bg-background/50 p-4">
          <StatusIndicator tone="success">System available</StatusIndicator>
          <StatusIndicator tone="info">230 tokens updated</StatusIndicator>
        </div>
      </aside>

      <Page className="max-w-none">
        <PageHeader className="gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <PageDescription>Flytrap Design System</PageDescription>
              <PageTitle>System overview</PageTitle>
              <PageDescription>
                Check system quality, releases, and AI tools in one place.
              </PageDescription>
            </div>
          </div>
          <Toolbar>
            <FilterBar onValueChange={setFilter} placeholder="Filter release items…" value={filter}>
              <ButtonGroup aria-label="Dashboard view">
                <ButtonGroupItem onClick={() => setView("health")} selected={view === "health"}>Overview</ButtonGroupItem>
                <ButtonGroupItem onClick={() => setView("release")} selected={view === "release"}>Releases</ButtonGroupItem>
                <ButtonGroupItem onClick={() => setView("ai")} selected={view === "ai"}>AI tools</ButtonGroupItem>
              </ButtonGroup>
            </FilterBar>
          </Toolbar>
        </PageHeader>

        <Section aria-labelledby="health-title" id="health" style={{ display: view === "health" ? undefined : "none" }}>
          <SectionHeader>
            <SectionTitle id="health-title">How the system is doing</SectionTitle>
            <SectionDescription>A quick view of the most important checks.</SectionDescription>
          </SectionHeader>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiStatCard delta={12} description="semantic usage" label="Token adoption" value="87%" />
            <KpiStatCard delta={0} description="validated pairs" label="APCA compliance" value="100%" />
            <KpiStatCard delta={7} description="documented groups" label="Component docs" value="7/7" />
            <KpiStatCard delta={-18} description="remaining in public art" label="Hardcoded values" value="14" />
          </div>
          <InlineNotification action={<Badge variant="success">Active</Badge>} title="Automatic checks are running" variant="success">
            Navigation, labels, and screen overflow are checked automatically.
          </InlineNotification>
        </Section>

        <Section aria-labelledby="adoption-title" id="adoption" style={{ display: view === "release" ? undefined : "none" }}>
          <SectionHeader>
            <SectionTitle id="adoption-title">Release readiness</SectionTitle>
            <SectionDescription>See what is ready and what still needs attention.</SectionDescription>
          </SectionHeader>
          <div className="grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
            <Card>
              <CardHeader>
                <CardTitle>Weekly adoption</CardTitle>
                <CardDescription>Semantic token and component usage across Flytrap surfaces.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-56 items-end gap-2" role="img" aria-label="Weekly adoption chart from 44 percent to 87 percent">
                  {adoption.map((value, index) => <div
                    className="group relative flex-1 rounded-t-md bg-primary/20 transition-colors hover:bg-primary"
                    key={index}
                    style={{ height: `${value}%` }}
                  >
                    <span className="sr-only">Week {index + 1}: {value}% adoption</span>
                  </div>)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Release contract</CardTitle>
                <CardDescription>Minimum checks before a component graduates.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataList>
                  <DataListItem>
                    <DataListTerm>Coverage</DataListTerm>
                    <DataListDescription>190 tests · 100%</DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Visual QA</DataListTerm>
                    <DataListDescription>Desktop and mobile audit passing</DataListDescription>
                  </DataListItem>
                  <DataListItem>
                    <DataListTerm>Package</DataListTerm>
                    <DataListDescription>@flytrap/ui · dist ready</DataListDescription>
                  </DataListItem>
                </DataList>
              </CardContent>
            </Card>
          </div>
          <SmartDataTable
            caption="Release readiness items"
            columns={[
              { key: "item", header: "Item" },
              { key: "owner", header: "Owner" },
              { key: "risk", header: "Risk" },
              { key: "status", header: "Status" },
            ]}
            getRowId={(row) => String(row.item)}
            rows={filteredRows}
          />
        </Section>

        <Section aria-labelledby="agents-title" id="agents" style={{ display: view === "ai" ? undefined : "none" }}>
          <SectionHeader>
            <SectionTitle id="agents-title">AI tools</SectionTitle>
            <SectionDescription>Review what each agent is doing and why.</SectionDescription>
          </SectionHeader>
          <div className="grid gap-4 xl:grid-cols-[.85fr_1.15fr]">
            <div className="grid gap-4">
              <AgentCard model="Codex" name="Docs QA agent" status="running" tokens="2.8K">
                Watching anchors, accessible names, release notes and generated visual-audit reports.
              </AgentCard>
              <AgentCard model="Codex" name="Adoption agent" status="completed" tokens="1.1K">
                Static adoption report is current and ready for product-owner review.
              </AgentCard>
              <InsightCallout severity="warning" title="Next strategic gap">
                The DS still needs a product outside the documentation surface to prove external adoption.
              </InsightCallout>
            </div>
            <PersonalizationPanel
              action={<Button size="sm" variant="outline">Recalibrate</Button>}
              confidence={91}
              moodLabel="Review mode"
              moodTone="focus"
              moodValue={82}
              signals={[
                { label: "Priority", value: "Accessibility and component adoption" },
                { label: "Surface", value: "Dashboard, docs and public DS" },
                { label: "Risk", value: "External consumer still pending" },
              ]}
              title="AI review engine"
            />
          </div>
          <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
            <MoodSelector defaultValue="focus" options={moodOptions} />
            <Card>
              <CardHeader>
                <CardTitle>Playback simulation</CardTitle>
                <CardDescription>Streaming controls reused for release pacing and walkthrough demos.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <ModelConfidence description="Confidence that the current release is safe to preview." value={91} />
                <Progress aria-label="Release readiness" value={82} />
                <PlayerControls playing progress={64} />
              </CardContent>
            </Card>
          </div>
          <RecommendationRail description="AI-ranked next actions for the Flytrap DS roadmap." title="Recommended next actions">
            {recommendationActions.map(({ active, badge, subtitle, title }) => <div className="min-w-[240px] flex-1" key={title} role="listitem">
              <MediaCard active={Boolean(active)} badge={badge} subtitle={subtitle} title={title} />
            </div>)}
          </RecommendationRail>
        </Section>

        <Section aria-labelledby="structure-title" style={{ display: view === "release" ? undefined : "none" }}>
          <SectionHeader>
            <SectionTitle id="structure-title">Delivery steps</SectionTitle>
            <SectionDescription>Follow the work from validation to product use.</SectionDescription>
          </SectionHeader>
          <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
            <Timeline aria-label="Design system delivery timeline">
              <TimelineItem description="Tokens, tests and CI gates are enforced." meta="Done" title="Confidence foundation" tone="success" />
              <TimelineItem description="Documentation categories and visual QA are now active." meta="Current" title="Documentation quality" tone="info" />
              <TimelineItem description="A product consumer must validate the DS outside docs." meta="Next" title="External adoption" tone="warning" />
            </Timeline>
            <TreeView aria-label="Dashboard component tree">
              <TreeItem expanded label="Dashboard consumer" selected>
                <TreeItem label="System health" />
                <TreeItem label="Release readiness" />
                <TreeItem label="AI workflow" />
              </TreeItem>
            </TreeView>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <InteractiveCard description="Route to the component documentation guide." heading="Open component docs" icon={DashboardIcon} selected>
              Component categories now define usage, anatomy, states, accessibility and token expectations.
            </InteractiveCard>
            <InteractiveCard description="Prepare a consuming product for the next adoption milestone." heading="Connect product surface" icon={AgentIcon}>
              This is the next real validation step after the internal dashboard consumer.
            </InteractiveCard>
          </div>
        </Section>

        <Card style={{ display: view === "ai" ? undefined : "none" }}>
          <CardHeader>
            <CardTitle>Ask about the system</CardTitle>
            <CardDescription>Get help choosing components and release checks.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <MessageBubble role="user">Which component should I use for a release decision?</MessageBubble>
            <MessageBubble role="assistant">Use DataList for structured facts, InlineNotification for status and HumanApprovalPrompt when an action needs explicit approval.</MessageBubble>
            <form className="flex gap-2" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="dashboard-message">Message</label>
              <input className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" id="dashboard-message" placeholder="Ask about tokens, components or release gates…" />
              <Button aria-label="Send message" size="icon"><FlytrapIcon icon={SendIcon} /></Button>
            </form>
          </CardContent>
        </Card>
      </Page>
    </div>
  </div>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
