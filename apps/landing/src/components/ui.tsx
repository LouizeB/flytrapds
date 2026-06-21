import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none'

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  secondary:
    'border border-[var(--magenta-500)] text-[var(--magenta-500)] bg-transparent hover:bg-accent',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
}

const BUTTON_SIZE: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(BUTTON_BASE, BUTTON_VARIANT[variant], BUTTON_SIZE[size], className)}
      {...props}
    />
  )
}

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

const BADGE_VARIANT: Record<BadgeVariant, string> = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-[var(--success-100)] text-[var(--success-700)]',
  warning: 'bg-[var(--warning-100)] text-[var(--warning-700)]',
  error: 'bg-[var(--error-100)] text-[var(--error-700)]',
  info: 'bg-accent text-accent-foreground',
}

export function Badge({
  variant = 'default',
  className,
  children,
}: {
  variant?: BadgeVariant
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        BADGE_VARIANT[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card text-card-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
      {children}
    </span>
  )
}
