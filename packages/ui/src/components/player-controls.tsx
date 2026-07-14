import * as React from "react";
import { FlytrapIcon, NextIcon, PauseIcon, PlayIcon, PreviousIcon } from "../icons";
import { cn } from "../lib/utils";

export interface PlayerControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  playing?: boolean;
  progress?: number;
  disabled?: boolean;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function PlayerControls({ className, disabled = false, onNext, onPlayPause, onPrevious, playing = false, progress = 0, ...props }: PlayerControlsProps) {
  const safeProgress = clampProgress(progress);

  return <div className={cn("grid gap-3 rounded-2xl border bg-card p-4 text-card-foreground", className)} data-slot="player-controls" {...props}>
    <div className="flex items-center justify-center gap-2">
      <button aria-label="Previous" className="grid size-10 place-items-center rounded-full hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" disabled={disabled} onClick={onPrevious} type="button">
        <FlytrapIcon icon={PreviousIcon} />
      </button>
      <button aria-label={playing ? "Pause" : "Play"} className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" disabled={disabled} onClick={onPlayPause} type="button">
        <FlytrapIcon icon={playing ? PauseIcon : PlayIcon} />
      </button>
      <button aria-label="Next" className="grid size-10 place-items-center rounded-full hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" disabled={disabled} onClick={onNext} type="button">
        <FlytrapIcon icon={NextIcon} />
      </button>
    </div>
    <div aria-label="Media progress" aria-valuemax={100} aria-valuemin={0} aria-valuenow={safeProgress} className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar">
      <div className="h-full bg-primary transition-all" style={{ width: `${safeProgress}%` }} />
    </div>
  </div>;
}
