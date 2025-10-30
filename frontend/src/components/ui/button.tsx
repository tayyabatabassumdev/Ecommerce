import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button {...props} className={`inline-flex items-center justify-center ${className}`}>
      {children}
    </button>
  );
};

export default Button;
