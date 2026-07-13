import * as React from "react";
import { cn } from "../lib/utils";
import { DataList, DataListDescription, DataListItem, DataListTerm } from "./data-list";
import { ModelConfidence } from "./model-confidence";
import { MoodSignal, MoodTone } from "./mood-signal";

export interface PersonalizationSignal {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface PersonalizationPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  moodLabel: React.ReactNode;
  moodValue: number;
  moodTone?: MoodTone;
  confidence: number;
  signals?: PersonalizationSignal[];
  action?: React.ReactNode;
}

export function PersonalizationPanel({ action, className, confidence, moodLabel, moodTone = "focus", moodValue, signals = [], title = "Personalização ativa", ...props }: PersonalizationPanelProps) {
  return <section className={cn("grid gap-4 rounded-2xl border bg-card p-5 text-card-foreground", className)} data-slot="personalization-panel" {...props}>
    <div className="flex items-start justify-between gap-3">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {action}
    </div>
    <div className="grid gap-3 md:grid-cols-2">
      <MoodSignal label={moodLabel} tone={moodTone} value={moodValue} />
      <ModelConfidence value={confidence} />
    </div>
    {signals.length > 0 ? <DataList>
      {signals.map((signal, index) => <DataListItem key={index}>
        <DataListTerm>{signal.label}</DataListTerm>
        <DataListDescription>{signal.value}</DataListDescription>
      </DataListItem>)}
    </DataList> : null}
  </section>;
}
