import * as React from "react";
import { SearchIcon } from "../icons";
import { Input } from "./input";
import { cn } from "../lib/utils";

export function FilterBar({ value, onValueChange, children, placeholder = "Filter results…", className }: { value: string; onValueChange: (value: string) => void; children?: React.ReactNode; placeholder?: string; className?: string }) {
  return <div className={cn("flex flex-col gap-3 rounded-lg border bg-card p-3 sm:flex-row sm:items-center", className)}>
    <div className="relative min-w-0 flex-1">
      <SearchIcon aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input aria-label="Filter results" className="pl-9" onChange={event => onValueChange(event.target.value)} placeholder={placeholder} type="search" value={value} />
    </div>
    {children}
  </div>;
}
