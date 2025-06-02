import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  border?: boolean;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  className = '',
  children,
  padding = 'md',
  shadow = 'md',
  radius = 'md',
  border = false,
  hoverEffect = false,
}) => {
  const paddingMap = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const shadowMap = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };

  const radiusMap = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const borderStyle = border ? 'border border-gray-200' : '';
  
  const hoverStyle = hoverEffect 
    ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1' 
    : '';

  return (
    <div
      className={`
        bg-white
        ${paddingMap[padding]}
        ${shadowMap[shadow]}
        ${radiusMap[radius]}
        ${borderStyle}
        ${hoverEffect ? hoverStyle : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;