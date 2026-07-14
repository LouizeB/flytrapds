import * as React from "react";
import { AgentRunningIcon, ErrorIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";
import { Button } from "../components/button";

export type StreamingMessageStatus = "streaming" | "completed" | "interrupted";

export interface StreamingMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StreamingMessageStatus;
  onRetry?: () => void;
  retryLabel?: string;
}

const announcements: Record<StreamingMessageStatus, string> = {
  streaming: "Response in progress",
  completed: "Response complete",
  interrupted: "Response interrupted",
};

export function StreamingMessage({ status, onRetry, retryLabel = "Try again", className, children, ...props }: StreamingMessageProps) {
  return <div className={cn("grid max-w-[85%] gap-3 rounded-2xl rounded-bl-sm border bg-chat-bubble-assistant-bg px-4 py-3 text-chat-bubble-assistant-fg", className)} data-slot="streaming-message" data-status={status} {...props}>
    <div className="text-sm leading-6">{children}</div>
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {status === "streaming" && <FlytrapIcon className="animate-spin motion-reduce:animate-none" icon={AgentRunningIcon} size="sm" />}
      {status === "interrupted" && <FlytrapIcon icon={ErrorIcon} size="sm" />}
      <span aria-live="polite" role="status">{announcements[status]}</span>
      {status === "interrupted" && onRetry && <Button className="ml-auto h-8" onClick={onRetry} size="sm" variant="ghost">{retryLabel}</Button>}
    </div>
  </div>;
}
