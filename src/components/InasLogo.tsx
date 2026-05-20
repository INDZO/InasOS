import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  compact?: boolean;
};

/** InasOS mark: a laptop with the "IH" monogram on its screen. */
export function LaptopMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="InasOS logo"
    >
      <defs>
        <linearGradient id="inas-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2638" />
          <stop offset="1" stopColor="#0a0f1a" />
        </linearGradient>
        <radialGradient id="inas-glow" cx="0.74" cy="0.22" r="0.7">
          <stop offset="0" stopColor="#f97316" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="inas-mono" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdba74" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="14" fill="url(#inas-bg)" />
      <rect width="64" height="64" rx="14" fill="url(#inas-glow)" />

      {/* Laptop screen */}
      <rect
        x="15"
        y="12"
        width="34"
        height="26"
        rx="4"
        fill="#070b14"
        stroke="#f97316"
        strokeWidth="2.1"
      />
      <circle cx="32" cy="15.4" r="0.95" fill="#64748b" />
      <text
        x="32"
        y="29.6"
        textAnchor="middle"
        fontFamily="'Inter','Segoe UI',Arial,sans-serif"
        fontSize="14.5"
        fontWeight="700"
        letterSpacing="0.5"
        fill="url(#inas-mono)"
      >
        IH
      </text>

      {/* Laptop base */}
      <path
        d="M10.5 40.5H53.5L57.4 48.2C57.9 49.2 57.2 50.4 56 50.4H8C6.8 50.4 6.1 49.2 6.6 48.2Z"
        fill="#cbd5e1"
      />
      <path
        d="M10.5 40.5H53.5L54.4 42.3H9.6Z"
        fill="#94a3b8"
      />
      <rect x="27.5" y="40.4" width="9" height="2" rx="1" fill="#475569" />
    </svg>
  );
}

export function InasLogo({
  className,
  markClassName,
  showWordmark = true,
  compact = false,
}: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LaptopMark
        className={cn(compact ? "h-6 w-6" : "h-9 w-9", markClassName)}
      />
      {showWordmark && (
        <span className="font-semibold tracking-tight text-[var(--os-text)]">
          InasOS
        </span>
      )}
    </div>
  );
}
