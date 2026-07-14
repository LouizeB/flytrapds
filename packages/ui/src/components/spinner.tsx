import * as React from "react";
import { AgentRunningIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "size-4",
  md: "size-5",
  lg: "size-8",
};

export function Spinner({ className, label = "Loading", size = "md", ...props }: SpinnerProps) {
  return <div aria-label={label} className={cn("inline-flex items-center justify-center text-primary", className)} data-slot="spinner" role="status" {...props}>
    <FlytrapIcon className={cn("animate-spin motion-reduce:animate-none", sizes[size])} icon={AgentRunningIcon} />
    <span className="sr-only">{label}</span>
  </div>;
}
