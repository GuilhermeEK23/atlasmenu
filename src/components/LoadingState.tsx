interface LoadingStateProps {
  rows?: number;
  label?: string;
}

export default function LoadingState({ rows = 4, label }: LoadingStateProps) {
  return (
    <div className="py-6" role="status" aria-live="polite">
      {label && <p className="mb-3 text-sm text-text-secondary">{label}</p>}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-xl bg-white/5"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
