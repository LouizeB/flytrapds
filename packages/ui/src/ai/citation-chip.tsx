import * as React from "react";
import { ExternalLinkIcon, FlytrapIcon, WarningIcon } from "../icons";
import { cn } from "../lib/utils";

export interface CitationChipProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  index: number | string;
  source: string;
  missing?: boolean;
}

export function CitationChip({ index, source, missing = false, className, href, ...props }: CitationChipProps) {
  if (missing) {
    return <span aria-label={`Fonte ${index} indisponível: ${source}`} className={cn("inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-xs text-warning", className)} data-slot="citation-chip" data-state="missing"><FlytrapIcon icon={WarningIcon} size="sm" /><span>[{index}] {source}</span></span>;
  }
  return <a aria-label={`Fonte ${index}: ${source} (abre em nova aba)`} className={cn("inline-flex items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 text-xs font-medium text-foreground outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring", className)} data-slot="citation-chip" href={href} rel="noreferrer" target="_blank" {...props}><span>[{index}] {source}</span><FlytrapIcon icon={ExternalLinkIcon} size="sm" /></a>;
}
