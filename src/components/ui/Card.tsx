import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article";
};

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[color:var(--os-border)] bg-[var(--os-panel)] p-5 text-[var(--os-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_28px_-16px_rgba(0,0,0,0.5)] backdrop-blur",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3 className={cn("text-base font-semibold tracking-tight text-[var(--os-text)]", className)}>
      {children}
    </h3>
  );
}

export function CardSubtitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-xs uppercase tracking-[0.18em] text-[color:var(--os-accent)]", className)}>
      {children}
    </p>
  );
}
