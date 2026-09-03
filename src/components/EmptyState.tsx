import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-border">
        <Icon size={24} className="text-text-secondary" />
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary">{title}</p>
        {description && (
          <p className="mt-1 max-w-sm text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
