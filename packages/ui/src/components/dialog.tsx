import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { CloseIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";
import { buttonVariants } from "./button";

const overlayClass = "fixed inset-0 z-50 bg-foreground/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out";
const contentClass = "fixed left-1/2 top-1/2 z-50 grid max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-xl border bg-background p-6 text-foreground shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Dialog body content. Include DialogTitle and DialogDescription for accessible naming. */
  children?: React.ReactNode;
  /** Optional className for size or layout overrides while keeping the modal surface contract. */
  className?: string;
}

export function DialogContent({ className, children, ...props }: DialogContentProps) {
  return <DialogPrimitive.Portal><DialogPrimitive.Overlay className={overlayClass} /><DialogPrimitive.Content className={cn(contentClass, className)} {...props}>{children}<DialogPrimitive.Close aria-label="Close" className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"><FlytrapIcon icon={CloseIcon} /></DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal>;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header content, usually DialogTitle followed by DialogDescription. */
  children?: React.ReactNode;
}

export function DialogHeader({ className, ...props }: DialogHeaderProps) { return <div className={cn("grid gap-2 text-center sm:text-left", className)} {...props} />; }

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Footer actions. Primary action should appear last in DOM order. */
  children?: React.ReactNode;
}

export function DialogFooter({ className, ...props }: DialogFooterProps) { return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />; }
export const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({ className, ...props }, ref) => <DialogPrimitive.Title ref={ref} className={cn("font-display text-lg font-semibold", className)} {...props} />);
DialogTitle.displayName = DialogPrimitive.Title.displayName;
export const DialogDescription = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(({ className, ...props }, ref) => <DialogPrimitive.Description ref={ref} className={cn("text-sm leading-6 text-muted-foreground", className)} {...props} />);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  /** Confirmation content. Include AlertDialogTitle and AlertDialogDescription for accessible context. */
  children?: React.ReactNode;
  /** Optional className for destructive-confirmation layout overrides. */
  className?: string;
}

export function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
  return <AlertDialogPrimitive.Portal><AlertDialogPrimitive.Overlay className={overlayClass} /><AlertDialogPrimitive.Content className={cn(contentClass, className)} {...props} /></AlertDialogPrimitive.Portal>;
}
export const AlertDialogTitle = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>>(({ className, ...props }, ref) => <AlertDialogPrimitive.Title ref={ref} className={cn("font-display text-lg font-semibold", className)} {...props} />);
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
export const AlertDialogDescription = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>>(({ className, ...props }, ref) => <AlertDialogPrimitive.Description ref={ref} className={cn("text-sm leading-6 text-muted-foreground", className)} {...props} />);
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header content, usually AlertDialogTitle followed by AlertDialogDescription. */
  children?: React.ReactNode;
}

export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) { return <div className={cn("grid gap-2 text-center sm:text-left", className)} {...props} />; }

export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Confirmation actions, typically AlertDialogCancel and AlertDialogAction. */
  children?: React.ReactNode;
}

export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) { return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />; }
export const AlertDialogCancel = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Cancel>, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>>(({ className, ...props }, ref) => <AlertDialogPrimitive.Cancel ref={ref} className={cn(buttonVariants({ variant: "outline" }), className)} {...props} />);
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
export const AlertDialogAction = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Action>, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>>(({ className, ...props }, ref) => <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants({ variant: "destructive" }), className)} {...props} />);
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
