import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    leftIcon, 
    rightIcon, 
    fullWidth = false, 
    helperText,
    className = '',
    ...props 
  }, ref) => {
    const baseInputStyles = `
      block bg-white rounded-md border-gray-300 shadow-sm
      focus:border-amber-500 focus:ring-amber-500
      disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
    `;

    const widthStyle = fullWidth ? 'w-full' : '';
    const errorStyles = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '';
    const iconPaddingLeft = leftIcon ? 'pl-10' : '';
    const iconPaddingRight = rightIcon ? 'pr-10' : '';

    return (
      <div className={`${widthStyle} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              ${baseInputStyles}
              ${widthStyle}
              ${errorStyles}
              ${iconPaddingLeft}
              ${iconPaddingRight}
            `}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;