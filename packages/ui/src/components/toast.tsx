import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { CloseIcon, FlytrapIcon } from "../icons";
import { cn } from "../lib/utils";

export const ToastProvider = ToastPrimitive.Provider;

const toastVariants = cva("group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl border bg-popover p-4 pr-10 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out", {
  variants: {
    variant: {
      default: "border-border",
      success: "border-success/40",
      warning: "border-warning/40",
      error: "border-destructive/40",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, VariantProps<typeof toastVariants> {}
export const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(({ className, variant, ...props }, ref) => <ToastPrimitive.Root ref={ref} className={cn(toastVariants({ variant }), className)} data-slot="toast" {...props} />);
Toast.displayName = ToastPrimitive.Root.displayName;

export const ToastAction = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Action>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>>(({ className, ...props }, ref) => <ToastPrimitive.Action ref={ref} className={cn("inline-flex h-8 shrink-0 items-center rounded-md border px-3 text-xs font-medium outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", className)} {...props} />);
ToastAction.displayName = ToastPrimitive.Action.displayName;
export const ToastClose = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Close>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>>(({ className, ...props }, ref) => <ToastPrimitive.Close ref={ref} aria-label="Close notification" className={cn("absolute right-2 top-2 rounded-md p-1 text-muted-foreground outline-none opacity-70 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring", className)} {...props}><FlytrapIcon icon={CloseIcon} size="sm" /></ToastPrimitive.Close>);
ToastClose.displayName = ToastPrimitive.Close.displayName;
export const ToastTitle = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Title>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>>(({ className, ...props }, ref) => <ToastPrimitive.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />);
ToastTitle.displayName = ToastPrimitive.Title.displayName;
export const ToastDescription = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Description>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>>(({ className, ...props }, ref) => <ToastPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />);
ToastDescription.displayName = ToastPrimitive.Description.displayName;
export const ToastViewport = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Viewport>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>>(({ className, ...props }, ref) => <ToastPrimitive.Viewport ref={ref} className={cn("fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-sm", className)} {...props} />);
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;
