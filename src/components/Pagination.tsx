import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 pt-2">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-white/5 disabled:opacity-30"
        aria-label="Página anterior"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? 'bg-brand text-white shadow-glow'
              : 'text-text-secondary hover:bg-white/5'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-white/5 disabled:opacity-30"
        aria-label="Próxima página"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
