import { CardSubtitle } from "@/components/ui/Card";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function AppHeader({ eyebrow, title, description }: Props) {
  return (
    <header className="mb-1">
      <CardSubtitle>{eyebrow}</CardSubtitle>
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-[var(--os-text)]">
        {title}
      </h2>
      {description && (
        <p className="mt-1 max-w-prose text-[13px] leading-relaxed text-[var(--os-muted)]">
          {description}
        </p>
      )}
    </header>
  );
}
