import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export default function Card({ children, padded = true, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`bg-surface-card border border-border rounded-2xl shadow-soft ${
        padded ? 'p-5' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
