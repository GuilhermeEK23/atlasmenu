import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = '', ...rest }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className="mb-1.5 block text-sm font-medium text-text-primary">
            {label}
          </span>
        )}
        <input
          ref={ref}
          className={`input-base ${error ? 'border-danger/60' : ''} ${className}`}
          {...rest}
        />
        {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
      </label>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
