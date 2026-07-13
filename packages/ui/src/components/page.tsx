import * as React from "react";
import { cn } from "../lib/utils";

export function Page({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <main className={cn("mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8", className)} data-slot="page" {...props} />;
}

export function PageHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-3 border-b pb-6", className)} data-slot="page-header" {...props} />;
}

export function PageTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("font-display text-3xl font-semibold tracking-tight", className)} data-slot="page-title" {...props} />;
}

export function PageDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("max-w-3xl text-sm leading-6 text-muted-foreground", className)} data-slot="page-description" {...props} />;
}

export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("grid gap-4", className)} data-slot="section" {...props} />;
}

export function SectionHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1", className)} data-slot="section-header" {...props} />;
}

export function SectionTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("font-display text-xl font-semibold tracking-tight", className)} data-slot="section-title" {...props} />;
}

export function SectionDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-6 text-muted-foreground", className)} data-slot="section-description" {...props} />;
}

export function Toolbar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-3 rounded-xl border bg-card p-3 text-card-foreground sm:flex-row sm:items-center sm:justify-between", className)} data-slot="toolbar" role="toolbar" {...props} />;
}
