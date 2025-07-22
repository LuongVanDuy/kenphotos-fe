import React from 'react';

interface ArrowRightIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ 
  className = "", 
  size = 16, 
  color = "currentColor" 
}) => {
  return (
    <span aria-hidden="true" className={className}>
      →
    </span>
  );
};

export default ArrowRightIcon; 