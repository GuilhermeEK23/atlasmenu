import { Search } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function SearchInput({ className = '', ...rest }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
      />
      <input
        type="text"
        className="input-base pl-10"
        {...rest}
      />
    </div>
  );
}
