import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "muted";
  className?: string;
};

const VARIANTS: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "border-[color:var(--os-border)] bg-[var(--os-control)] text-[var(--os-text)]",
  accent:
    "border-orange-500/30 bg-orange-500/10 text-[color:var(--os-accent)]",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  muted:
    "border-[color:var(--os-border)] bg-[var(--os-control)] text-[var(--os-muted)]",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium leading-5",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
