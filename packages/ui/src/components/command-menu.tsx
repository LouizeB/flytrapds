import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";

export const Command = React.forwardRef<React.ElementRef<typeof CommandPrimitive>, React.ComponentPropsWithoutRef<typeof CommandPrimitive>>(({ className, label = "Command menu", ...props }, ref) => <CommandPrimitive ref={ref} className={cn("flex size-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground", className)} data-slot="command" label={label} {...props} />);
Command.displayName = CommandPrimitive.displayName;

export interface CommandDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  /** Accessible title rendered visually hidden inside the dialog. */
  title?: string;
  /** Accessible description rendered visually hidden inside the dialog. */
  description?: string;
  /** Command input, list, groups and items rendered inside the dialog surface. */
  children?: React.ReactNode;
}
export function CommandDialog({ title = "Command menu", description = "Search for an action or destination", children, ...props }: CommandDialogProps) {
  return <Dialog {...props}><DialogContent className="overflow-hidden p-0"><DialogTitle className="sr-only">{title}</DialogTitle><DialogDescription className="sr-only">{description}</DialogDescription><Command>{children}</Command></DialogContent></Dialog>;
}

export interface CommandInputProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  /** Search placeholder that explains the command scope. */
  placeholder?: string;
}

export const CommandInput = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Input>, CommandInputProps>(({ className, ...props }, ref) => <div className="flex items-center border-b px-3" data-slot="command-input-wrapper"><FlytrapIcon className="mr-2 opacity-60" icon={SearchIcon} /><CommandPrimitive.Input ref={ref} className={cn("h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} /></div>);
CommandInput.displayName = CommandPrimitive.Input.displayName;

export interface CommandListProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
  /** Command groups, items and empty state. */
  children?: React.ReactNode;
}

export const CommandList = React.forwardRef<React.ElementRef<typeof CommandPrimitive.List>, CommandListProps>(({ className, ...props }, ref) => <CommandPrimitive.List ref={ref} className={cn("max-h-80 overflow-y-auto overflow-x-hidden p-1", className)} {...props} />);
CommandList.displayName = CommandPrimitive.List.displayName;
export const CommandEmpty = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Empty>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>>(({ className, ...props }, ref) => <CommandPrimitive.Empty ref={ref} className={cn("py-8 text-center text-sm text-muted-foreground", className)} {...props} />);
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
export const CommandGroup = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Group>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>>(({ className, ...props }, ref) => <CommandPrimitive.Group ref={ref} className={cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground", className)} {...props} />);
CommandGroup.displayName = CommandPrimitive.Group.displayName;
export const CommandSeparator = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>>(({ className, ...props }, ref) => <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
export interface CommandItemProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  /** Searchable item value used by cmdk filtering and selection. */
  value?: string;
  /** Prevents command selection while preserving the item in the list. */
  disabled?: boolean;
  /** Command label, icon, shortcut or supporting content. */
  children?: React.ReactNode;
}

export const CommandItem = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Item>, CommandItemProps>(({ className, ...props }, ref) => <CommandPrimitive.Item ref={ref} className={cn("relative flex min-h-10 cursor-default select-none items-center gap-2 rounded-md px-2 text-sm outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground", className)} {...props} />);
CommandItem.displayName = CommandPrimitive.Item.displayName;

export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Keyboard shortcut hint displayed after a command item label. */
  children?: React.ReactNode;
}

export function CommandShortcut({ className, ...props }: CommandShortcutProps) { return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />; }
