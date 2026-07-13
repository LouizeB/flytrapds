import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { MenuIcon } from "../icons";
import { cn } from "../lib/utils";
import { IconButton } from "./button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "./sheet";

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export interface SidebarProviderProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SidebarProvider({ children, defaultOpen = true, open: controlledOpen, onOpenChange }: SidebarProviderProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = React.useCallback((next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }, [controlledOpen, onOpenChange]);
  const toggle = React.useCallback(() => setOpen(!open), [open, setOpen]);
  const value = React.useMemo(() => ({ open, setOpen, toggle, mobileOpen, setMobileOpen }), [open, setOpen, toggle, mobileOpen]);
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar deve ser usado dentro de SidebarProvider");
  return context;
}

export function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { open } = useSidebar();
  return <aside className={cn("hidden h-full shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-(--motion-fast) motion-reduce:transition-none md:flex", open ? "w-64" : "w-16", className)} data-slot="sidebar" data-state={open ? "expanded" : "collapsed"} {...props} />;
}

export interface SidebarMobileProps extends React.ComponentPropsWithoutRef<typeof SheetContent> {
  title?: string;
  description?: string;
}
export function SidebarMobile({ title = "Navigation", description = "Main navigation", children, className, ...props }: SidebarMobileProps) {
  const { mobileOpen, setMobileOpen } = useSidebar();
  return <Sheet onOpenChange={setMobileOpen} open={mobileOpen}><SheetContent className={cn("w-72 p-0 md:hidden", className)} side="left" {...props}><SheetTitle className="sr-only">{title}</SheetTitle><SheetDescription className="sr-only">{description}</SheetDescription>{children}</SheetContent></Sheet>;
}

export function SidebarTrigger({ className, ...props }: Omit<React.ComponentPropsWithoutRef<typeof IconButton>, "icon" | "label">) {
  const { open, toggle } = useSidebar();
  return <IconButton className={className} icon={MenuIcon} label={open ? "Collapse navigation" : "Expand navigation"} onClick={toggle} variant="ghost" {...props} />;
}
export function SidebarMobileTrigger({ className, ...props }: Omit<React.ComponentPropsWithoutRef<typeof IconButton>, "icon" | "label">) {
  const { setMobileOpen } = useSidebar();
  return <IconButton className={cn("md:hidden", className)} icon={MenuIcon} label="Open navigation" onClick={() => setMobileOpen(true)} variant="ghost" {...props} />;
}
export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("flex min-h-16 items-center gap-3 border-b p-3", className)} data-slot="sidebar-header" {...props} />; }
export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("min-h-0 flex-1 overflow-y-auto p-2", className)} data-slot="sidebar-content" {...props} />; }
export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("border-t p-2", className)} data-slot="sidebar-footer" {...props} />; }
export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("grid gap-1 py-2", className)} data-slot="sidebar-group" {...props} />; }
export function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { const { open } = useSidebar(); return <div className={cn("px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground", !open && "sr-only", className)} data-slot="sidebar-group-label" {...props} />; }
export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) { return <ul className={cn("grid gap-1", className)} data-slot="sidebar-menu" {...props} />; }
export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) { return <li className={cn("min-w-0", className)} data-slot="sidebar-menu-item" {...props} />; }

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  active?: boolean;
}
export function SidebarMenuButton({ asChild = false, active = false, className, children, ...props }: SidebarMenuButtonProps) {
  const { open } = useSidebar();
  const Comp = asChild ? Slot : "button";
  return <Comp aria-current={active ? "page" : undefined} className={cn("flex min-h-10 w-full items-center gap-3 overflow-hidden rounded-md px-3 text-left text-sm font-medium outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", !open && "justify-center px-2 [&_[data-sidebar-label]]:hidden", className)} data-active={active} data-slot="sidebar-menu-button" {...props}>{children}</Comp>;
}
export function SidebarMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn("truncate", className)} data-sidebar-label="" {...props} />; }
