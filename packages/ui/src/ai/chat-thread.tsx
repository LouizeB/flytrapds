import * as React from "react";
import { ErrorIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";
import { EmptyState } from "../components/empty-state";
import { Skeleton } from "../components/skeleton";

export type ChatThreadState = "empty" | "loading" | "ready" | "error";
export interface ChatThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: ChatThreadState;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  errorMessage?: string;
}

export function ChatThread({ state = "ready", emptyTitle = "Start a conversation", emptyDescription = "Send a message to begin.", emptyAction, errorMessage = "The conversation could not be loaded.", className, children, ...props }: ChatThreadProps) {
  return <div aria-busy={state === "loading" || undefined} className={cn("grid min-h-48 content-start gap-3 overflow-y-auto rounded-xl border bg-background p-4", className)} data-slot="chat-thread" data-state={state} role="log" {...props}>
    {state === "empty" && <EmptyState action={emptyAction} className="border-0 shadow-none" description={emptyDescription} title={emptyTitle} />}
    {state === "loading" && <div aria-label="Loading conversation" className="grid gap-3"><Skeleton className="h-16 w-3/4" /><Skeleton className="ml-auto h-12 w-2/3" /><Skeleton className="h-20 w-4/5" /></div>}
    {state === "error" && <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-4 text-sm text-destructive" role="alert"><FlytrapIcon icon={ErrorIcon} />{errorMessage}</div>}
    {state === "ready" && children}
  </div>;
}
