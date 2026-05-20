import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-orange-500 hover:bg-orange-400 text-white shadow-[0_8px_24px_-12px_rgba(249,115,22,0.6)]",
  secondary:
    "bg-[var(--os-control)] hover:bg-[var(--os-control-hover)] text-[var(--os-text)] border border-[color:var(--os-border)]",
  ghost:
    "bg-transparent hover:bg-[var(--os-control)] text-[var(--os-text)]",
  danger:
    "bg-red-500/90 hover:bg-red-500 text-white",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex select-none items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
