import * as React from "react";
import { FlytrapIcon, HeartIcon, PlayIcon } from "../icons";
import { cn } from "../lib/utils";
import { Badge } from "./badge";

export interface MediaCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  duration?: React.ReactNode;
  badge?: React.ReactNode;
  active?: boolean;
  action?: React.ReactNode;
}

export function MediaCard({ action, active = false, badge, className, duration, imageAlt = "", imageSrc, subtitle, title, ...props }: MediaCardProps) {
  return <article className={cn("overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm", active && "border-primary ring-2 ring-primary/30", className)} data-active={active || undefined} data-slot="media-card" {...props}>
    <div className="relative aspect-video bg-muted">
      {imageSrc ? <img alt={imageAlt} className="size-full object-cover" src={imageSrc} /> : <div aria-hidden="true" className="grid size-full place-items-center text-primary"><FlytrapIcon icon={PlayIcon} size="lg" /></div>}
      {duration ? <span className="absolute bottom-2 right-2 rounded-md bg-background/85 px-2 py-1 text-xs font-medium">{duration}</span> : null}
      {badge ? <Badge className="absolute left-2 top-2" variant="secondary">{badge}</Badge> : null}
    </div>
    <div className="grid gap-3 p-4">
      <div className="grid gap-1">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        {subtitle ? <p className="text-sm leading-5 text-muted-foreground">{subtitle}</p> : null}
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><FlytrapIcon icon={HeartIcon} size="sm" /> Recomendado</span>
        {action}
      </div>
    </div>
  </article>;
}
