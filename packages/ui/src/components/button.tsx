import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { AgentRunningIcon, FlytrapIcon, type FlytrapIconComponent } from "../icons";
import { cn } from "../lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--button-radius)] text-sm font-medium transition-[color,background-color,transform,opacity] duration-(--motion-fast) ease-(--ease-liquid) outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none active:scale-[.97] [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-button-primary-bg text-button-primary-fg hover:bg-button-primary-bg-hover disabled:bg-button-primary-bg-disabled disabled:opacity-70",
        secondary: "bg-button-secondary-bg text-button-secondary-fg hover:bg-button-secondary-bg-hover disabled:opacity-60",
        destructive: "bg-button-destructive-bg text-button-destructive-fg hover:bg-button-destructive-bg-hover disabled:opacity-60",
        outline: "border border-button-outline bg-transparent text-button-outline hover:bg-accent hover:text-accent-foreground disabled:opacity-50",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingAnnouncement?: string;
}

export function Button({
  children,
  className,
  variant,
  size,
  asChild = false,
  disabled,
  loading = false,
  loadingAnnouncement = "Carregando",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const sharedProps = {
    "aria-busy": loading || undefined,
    "aria-disabled": asChild && isDisabled ? true : undefined,
    className: cn(buttonVariants({ variant, size, className }), asChild && isDisabled && "pointer-events-none"),
    "data-loading": loading || undefined,
    "data-slot": "button",
  } as const;

  if (asChild) {
    return <Slot {...sharedProps} {...props}>{children}</Slot>;
  }

  return <button disabled={isDisabled} {...sharedProps} {...props}>
    {loading && <FlytrapIcon className="animate-spin motion-reduce:animate-none" icon={AgentRunningIcon} />}
    {children}
    {loading && <span className="sr-only" role="status">{loadingAnnouncement}</span>}
  </button>;
}

export interface IconButtonProps extends Omit<ButtonProps, "aria-label" | "children" | "loading" | "size"> {
  icon: FlytrapIconComponent;
  label: string;
}

export function IconButton({ icon, label, ...props }: IconButtonProps) {
  return <Button aria-label={label} size="icon" {...props}>
    <FlytrapIcon icon={icon} />
  </Button>;
}
