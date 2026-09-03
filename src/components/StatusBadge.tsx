export type BadgeTone = 'brand' | 'success' | 'info' | 'violet' | 'danger' | 'neutral';

interface StatusBadgeProps {
  label: string;
  tone: BadgeTone;
}

const toneStyles: Record<BadgeTone, string> = {
  brand: 'bg-brand/15 text-brand',
  success: 'bg-success/15 text-success',
  info: 'bg-info/15 text-info',
  violet: 'bg-violet/15 text-violet',
  danger: 'bg-danger/15 text-danger',
  neutral: 'bg-white/10 text-text-secondary',
};

const dotStyles: Record<BadgeTone, string> = {
  brand: 'bg-brand',
  success: 'bg-success',
  info: 'bg-info',
  violet: 'bg-violet',
  danger: 'bg-danger',
  neutral: 'bg-text-secondary',
};

export default function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${toneStyles[tone]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[tone]}`} />
      {label}
    </span>
  );
}
