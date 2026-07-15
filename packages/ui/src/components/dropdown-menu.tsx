import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ConfirmIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  /** Offset between the trigger and menu content. */
  sideOffset?: number;
  /** Menu items, groups, labels, separators or submenus rendered in the portal. */
  children?: React.ReactNode;
}

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 6, ...props }, ref) => <DropdownMenuPrimitive.Portal>
  <DropdownMenuPrimitive.Content
    ref={ref}
    className={cn("z-50 min-w-48 overflow-hidden rounded-xl border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out", className)}
    data-slot="dropdown-menu-content"
    sideOffset={sideOffset}
    {...props}
  />
</DropdownMenuPrimitive.Portal>);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  /** Action label or item content. */
  children?: React.ReactNode;
  /** Prevents pointer and keyboard selection while keeping the item visible. */
  disabled?: boolean;
}

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, ...props }, ref) => <DropdownMenuPrimitive.Item
  ref={ref}
  className={cn("relative flex min-h-9 cursor-default select-none items-center gap-2 rounded-md px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}
  data-slot="dropdown-menu-item"
  {...props}
/>);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export interface DropdownMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
  /** Checked state for multi-select menu options. */
  checked?: boolean | "indeterminate";
  /** Checkbox item label or content. */
  children?: React.ReactNode;
  /** Prevents interaction while preserving visible context. */
  disabled?: boolean;
}

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ checked, children, className, ...props }, ref) => <DropdownMenuPrimitive.CheckboxItem
  ref={ref}
  checked={checked}
  className={cn("relative flex min-h-9 cursor-default select-none items-center gap-2 rounded-md py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}
  data-slot="dropdown-menu-checkbox-item"
  {...props}
>
  <span className="absolute left-2 grid size-4 place-items-center">
    <DropdownMenuPrimitive.ItemIndicator><FlytrapIcon icon={ConfirmIcon} size="sm" /></DropdownMenuPrimitive.ItemIndicator>
  </span>
  {children}
</DropdownMenuPrimitive.CheckboxItem>);
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

export interface DropdownMenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
  /** Radio value controlled by the parent DropdownMenuRadioGroup. */
  value: string;
  /** Radio item label or content. */
  children?: React.ReactNode;
  /** Prevents selection while preserving the option in the menu. */
  disabled?: boolean;
}

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ children, className, ...props }, ref) => <DropdownMenuPrimitive.RadioItem
  ref={ref}
  className={cn("relative flex min-h-9 cursor-default select-none items-center gap-2 rounded-md py-2 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}
  data-slot="dropdown-menu-radio-item"
  {...props}
>
  <span className="absolute left-2 grid size-4 place-items-center">
    <DropdownMenuPrimitive.ItemIndicator><span className="size-2 rounded-full bg-current" /></DropdownMenuPrimitive.ItemIndicator>
  </span>
  {children}
</DropdownMenuPrimitive.RadioItem>);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => <DropdownMenuPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)} data-slot="dropdown-menu-label" {...props} />);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} data-slot="dropdown-menu-separator" {...props} />);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export interface DropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Keyboard shortcut text displayed at the far edge of a menu item. */
  children?: React.ReactNode;
}

export function DropdownMenuShortcut({ className, ...props }: DropdownMenuShortcutProps) {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} data-slot="dropdown-menu-shortcut" {...props} />;
}
