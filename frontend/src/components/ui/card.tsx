import React from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

export const Card: React.FC<DivProps> = ({ children, className = '', ...props }) => {
  return (
    <div {...props} className={`bg-white ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<DivProps> = ({ children, className = '', ...props }) => {
  return (
    <div {...props} className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
