import * as React from "react";
import { cn } from "../lib/utils";

export interface TokenSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  value: string;
  description?: React.ReactNode;
}

export function TokenSwatch({ className, description, name, value, ...props }: TokenSwatchProps) {
  return <div className={cn("grid gap-3 rounded-xl border bg-card p-4 text-card-foreground", className)} data-slot="token-swatch" {...props}>
    <div aria-hidden="true" className="h-14 rounded-lg border shadow-inner" style={{ background: value }} />
    <div className="grid gap-1">
      <p className="font-mono text-sm font-semibold">{name}</p>
      <p className="font-mono text-xs text-muted-foreground">{value}</p>
      {description ? <p className="text-xs leading-5 text-muted-foreground">{description}</p> : null}
    </div>
  </div>;
}
