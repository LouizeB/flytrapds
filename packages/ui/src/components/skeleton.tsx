import * as React from "react";
import { cn } from "../lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "text" | "circle" | "block";
}
export function Skeleton({ shape = "block", className, ...props }: SkeletonProps) {
  return <div aria-hidden="true" className={cn("animate-pulse bg-muted motion-reduce:animate-none", shape === "text" && "h-4 rounded", shape === "circle" && "aspect-square rounded-full", shape === "block" && "rounded-xl", className)} data-slot="skeleton" {...props} />;
}
