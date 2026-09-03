import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: ReactNode;
  children?: ReactNode;
}

export default function Button({
  variant = 'primary',
  icon,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<string, string> = {
    primary: 'bg-brand text-white shadow-glow hover:bg-brand-light',
    secondary:
      'border border-border bg-surface-raised text-text-primary hover:border-brand/40 hover:bg-white/5',
    ghost: 'text-text-secondary hover:text-white hover:bg-white/5',
    danger: 'bg-danger text-white hover:bg-danger/90',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {icon}
      {children}
    </button>
  );
}
