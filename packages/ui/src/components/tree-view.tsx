import * as React from "react";
import { ChevronDownIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";

export function TreeView({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("grid gap-1", className)} data-slot="tree-view" role="tree" {...props} />;
}

export interface TreeItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  label: React.ReactNode;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

export function TreeItem({ children, className, disabled = false, expanded, label, selected = false, ...props }: TreeItemProps) {
  const hasChildren = Boolean(children);

  return <li className={cn("grid gap-1", className)} data-slot="tree-item" role="none" {...props}>
    <div
      aria-disabled={disabled || undefined}
      aria-expanded={hasChildren ? Boolean(expanded) : undefined}
      aria-selected={selected || undefined}
      className={cn("flex min-h-9 items-center gap-2 rounded-md px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring", selected && "bg-accent text-accent-foreground", disabled && "pointer-events-none opacity-50")}
      role="treeitem"
      tabIndex={disabled ? undefined : 0}
    >
      {hasChildren ? <FlytrapIcon className={cn("transition-transform", expanded && "rotate-180")} icon={ChevronDownIcon} size="sm" /> : <span className="size-[var(--icon-size-sm)]" />}
      <span>{label}</span>
    </div>
    {hasChildren && expanded ? <ul className="ml-4 grid gap-1 border-l pl-3" role="group">{children}</ul> : null}
  </li>;
}
