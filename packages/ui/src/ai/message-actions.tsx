import * as React from "react";
import { CopyButton } from "../components/copy-button";
import { Button } from "../components/button";
import { cn } from "../lib/utils";

export function MessageActions({ content, onRetry, feedback, className }: { content: string; onRetry?: () => void; feedback?: React.ReactNode; className?: string }) {
  return <div aria-label="Message actions" className={cn("flex flex-wrap items-center gap-2", className)} role="group">
    <CopyButton size="sm" value={content} />
    {onRetry && <Button onClick={onRetry} size="sm" variant="ghost">Try again</Button>}
    {feedback}
  </div>;
}
