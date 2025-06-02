import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    options, 
    error, 
    fullWidth = false, 
    helperText,
    className = '',
    onChange,
    ...props 
  }, ref) => {
    const baseSelectStyles = `
      block bg-white rounded-md border-gray-300 shadow-sm
      focus:border-amber-500 focus:ring-amber-500
      disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
    `;

    const widthStyle = fullWidth ? 'w-full' : '';
    const errorStyles = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className={`${widthStyle} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <select
          ref={ref}
          className={`
            ${baseSelectStyles}
            ${widthStyle}
            ${errorStyles}
          `}
          onChange={handleChange}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;