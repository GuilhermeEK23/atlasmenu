import type { SelectHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, error, options, className = '', ...rest }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className="mb-1.5 block text-sm font-medium text-text-primary">
            {label}
          </span>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`input-base appearance-none pr-10 ${
              error ? 'border-danger/60' : ''
            } ${className}`}
            {...rest}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
          />
        </div>
        {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
      </label>
    );
  }
);

SelectInput.displayName = 'SelectInput';

export default SelectInput;
