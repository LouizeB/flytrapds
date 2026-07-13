import * as React from "react";
import { cn } from "../lib/utils";
import { MoodTone } from "./mood-signal";

export interface MoodSelectorOption {
  value: string;
  label: React.ReactNode;
  tone?: MoodTone;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface MoodSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: MoodSelectorOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const moodSelectorToneClasses: Record<MoodTone, string> = {
  calm: "data-[selected=true]:border-secondary data-[selected=true]:bg-secondary/10",
  focus: "data-[selected=true]:border-primary data-[selected=true]:bg-primary/10",
  energy: "data-[selected=true]:border-warning data-[selected=true]:bg-warning/10",
  melancholy: "data-[selected=true]:border-chart-3 data-[selected=true]:bg-chart-3/10",
};

export function MoodSelector({ className, defaultValue, onValueChange, options, value, ...props }: MoodSelectorProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? options[0]?.value ?? "");
  const currentValue = isControlled ? value : internalValue;

  function select(nextValue: string) {
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  return <div className={cn("grid gap-2 sm:grid-cols-2", className)} data-slot="mood-selector" role="radiogroup" {...props}>
    {options.map((option) => {
      const selected = option.value === currentValue;
      const tone = option.tone ?? "focus";
      return <button
        key={option.value}
        aria-checked={selected}
        className={cn("grid gap-1 rounded-xl border bg-card p-4 text-left text-card-foreground outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", moodSelectorToneClasses[tone])}
        data-selected={selected}
        disabled={option.disabled}
        onClick={() => select(option.value)}
        role="radio"
        type="button"
      >
        <span className="text-sm font-medium">{option.label}</span>
        {option.description ? <span className="text-xs leading-5 text-muted-foreground">{option.description}</span> : null}
      </button>;
    })}
  </div>;
}
