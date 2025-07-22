import React from 'react';

interface HamburgerIconProps {
  className?: string;
  size?: number;
  color?: string;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ 
  className = "", 
  size = 28, 
  color = "currentColor" 
}) => {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
};

export default HamburgerIcon; 