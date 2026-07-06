import * as React from "react";
import { cn } from "../lib/utils";

export function Header({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <header className={cn("flex min-h-16 items-center gap-4 border-b bg-background px-4 md:px-6", className)} data-slot="header" {...props} />;
}
export function HeaderBrand({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex min-w-0 items-center gap-3 font-display font-semibold", className)} data-slot="header-brand" {...props} />;
}
export function HeaderTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("truncate font-display text-lg font-semibold", className)} data-slot="header-title" {...props} />;
}
export function HeaderActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ml-auto flex items-center gap-2", className)} data-slot="header-actions" {...props} />;
}
