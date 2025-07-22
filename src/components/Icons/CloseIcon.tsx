import React from 'react';

interface CloseIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({ 
  className = "", 
  size = 36, 
  color = "white" 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      className={className}
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
};

export default CloseIcon; 