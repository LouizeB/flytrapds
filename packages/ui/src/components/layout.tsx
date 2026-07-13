import * as React from "react";
import { cn } from "../lib/utils";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} data-slot="container" {...props} />;
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
}

const stackGaps = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export function Stack({ className, gap = "md", ...props }: StackProps) {
  return <div className={cn("flex flex-col", stackGaps[gap], className)} data-slot="stack" {...props} />;
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

const gridColumns = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function Grid({ className, columns = 3, ...props }: GridProps) {
  return <div className={cn("grid gap-4", gridColumns[columns], className)} data-slot="grid" {...props} />;
}
