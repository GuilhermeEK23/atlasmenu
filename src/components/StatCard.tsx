import type { LucideIcon } from 'lucide-react';

type Tone = 'brand' | 'violet' | 'success' | 'info' | 'danger';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone?: Tone;
  trend?: string;
  helper?: string;
}

const toneStyles: Record<Tone, { bg: string; text: string }> = {
  brand: { bg: 'bg-brand/15', text: 'text-brand' },
  violet: { bg: 'bg-violet/15', text: 'text-violet' },
  success: { bg: 'bg-success/15', text: 'text-success' },
  info: { bg: 'bg-info/15', text: 'text-info' },
  danger: { bg: 'bg-danger/15', text: 'text-danger' },
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  tone = 'brand',
  trend,
  helper,
}: StatCardProps) {
  const styles = toneStyles[tone];

  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.bg}`}>
        <Icon size={22} className={styles.text} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-text-secondary">{label}</p>
        <p className="mt-0.5 text-2xl font-bold text-text-primary">{value}</p>
        {(trend || helper) && (
          <p
            className={`mt-0.5 text-xs ${
              trend ? 'text-success' : 'text-text-secondary'
            }`}
          >
            {trend ?? helper}
          </p>
        )}
      </div>
    </div>
  );
}
