import type { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function PageTitle({ title, subtitle, action }: PageTitleProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
