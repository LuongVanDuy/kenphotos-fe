"use client";

import React from "react";
import { Card, Button, Badge, Space } from "antd";
import { designTokens } from "./theme";

// Modern Admin Card Component
interface AdminCardProps {
  children: React.ReactNode;
  title?: any;
  extra?: React.ReactNode;
  hoverable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'default';
  loading?: boolean;
  bordered?: boolean;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  children,
  title,
  extra,
  hoverable = true,
  className = '',
  style = {},
  size = 'default',
  loading = false,
  bordered = true,
  ...props
}) => {
  const cardStyle: React.CSSProperties = {
    borderRadius: designTokens.borderRadius.xl,
    border: bordered ? `1px solid ${designTokens.colors.neutral[200]}` : 'none',
    boxShadow: designTokens.boxShadow.md,
    background: '#ffffff',
    transition: designTokens.transition.normal,
    ...style,
  };

  const hoverStyle: React.CSSProperties = hoverable ? {
    cursor: 'pointer',
  } : {};

  const hoverClass = hoverable ? 'admin-card-hover' : '';

  return (
    <Card
      title={title}
      extra={extra}
      size={size}
      loading={loading}
      bordered={false}
      className={`admin-card ${hoverClass} ${className}`}
      style={{ ...cardStyle, ...hoverStyle }}
      {...props}
    >
      {children}
    </Card>
  );
};

// Modern Admin Button Component
interface AdminButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  size?: 'small' | 'middle' | 'large';
  variant?: 'solid' | 'outline' | 'ghost';
  colorScheme?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  block?: boolean;
  danger?: boolean;
}

export const AdminButton: React.FC<AdminButtonProps> = ({
  children,
  type = 'default',
  size = 'middle',
  variant = 'solid',
  colorScheme = 'primary',
  loading = false,
  disabled = false,
  icon,
  onClick,
  className = '',
  style = {},
  block = false,
  danger = false,
  ...props
}) => {
  const getButtonColors = () => {
    const colors = designTokens.colors;
    
    if (danger) {
      return {
        bg: colors.error[500],
        hoverBg: colors.error[600],
        color: '#ffffff',
        borderColor: colors.error[500],
      };
    }

    switch (colorScheme) {
      case 'success':
        return {
          bg: colors.success[500],
          hoverBg: colors.success[600],
          color: '#ffffff',
          borderColor: colors.success[500],
        };
      case 'warning':
        return {
          bg: colors.warning[500],
          hoverBg: colors.warning[600],
          color: '#ffffff',
          borderColor: colors.warning[500],
        };
      case 'error':
        return {
          bg: colors.error[500],
          hoverBg: colors.error[600],
          color: '#ffffff',
          borderColor: colors.error[500],
        };
      case 'neutral':
        return {
          bg: colors.neutral[100],
          hoverBg: colors.neutral[200],
          color: colors.neutral[700],
          borderColor: colors.neutral[300],
        };
      default: // primary
        return {
          bg: colors.primary[500],
          hoverBg: colors.primary[600],
          color: '#ffffff',
          borderColor: colors.primary[500],
        };
    }
  };

  const buttonColors = getButtonColors();
  
  const buttonStyle: React.CSSProperties = {
    borderRadius: designTokens.borderRadius.lg,
    fontWeight: designTokens.typography.fontWeight.medium,
    transition: designTokens.transition.fast,
    border: variant === 'outline' ? `1px solid ${buttonColors.borderColor}` : 'none',
    boxShadow: variant === 'solid' ? designTokens.boxShadow.sm : 'none',
    backgroundColor: variant === 'solid' ? buttonColors.bg : 
                    variant === 'outline' ? 'transparent' : 
                    'transparent',
    color: variant === 'solid' ? buttonColors.color :
           variant === 'outline' ? buttonColors.bg :
           buttonColors.bg,
    ...style,
  };

  return (
    <Button
      type={type}
      size={size}
      loading={loading}
      disabled={disabled}
      icon={icon}
      onClick={onClick}
      block={block}
      danger={danger}
      className={`admin-btn admin-button-${variant} admin-button-${colorScheme} ${className}`}
      style={buttonStyle}
      {...props}
    >
      {children}
    </Button>
  );
};

// Modern Admin Badge Component
interface AdminBadgeProps {
  children: React.ReactNode;
  status?: 'success' | 'processing' | 'error' | 'warning' | 'default';
  color?: string;
  variant?: 'solid' | 'outline' | 'soft';
  size?: 'small' | 'default' | 'large';
  className?: string;
  style?: React.CSSProperties;
}

export const AdminBadge: React.FC<AdminBadgeProps> = ({
  children,
  status = 'default',
  color,
  variant = 'solid',
  size = 'default',
  className = '',
  style = {},
  ...props
}) => {
  const getBadgeColors = () => {
    const colors = designTokens.colors;
    
    if (color) {
      return {
        bg: color,
        color: '#ffffff',
        borderColor: color,
      };
    }

    switch (status) {
      case 'success':
        return {
          bg: colors.success[500],
          color: '#ffffff',
          borderColor: colors.success[500],
          softBg: colors.success[50],
          softColor: colors.success[700],
        };
      case 'processing':
        return {
          bg: colors.info[500],
          color: '#ffffff',
          borderColor: colors.info[500],
          softBg: colors.info[50],
          softColor: colors.info[700],
        };
      case 'error':
        return {
          bg: colors.error[500],
          color: '#ffffff',
          borderColor: colors.error[500],
          softBg: colors.error[50],
          softColor: colors.error[700],
        };
      case 'warning':
        return {
          bg: colors.warning[500],
          color: '#ffffff',
          borderColor: colors.warning[500],
          softBg: colors.warning[50],
          softColor: colors.warning[700],
        };
      default:
        return {
          bg: colors.neutral[500],
          color: '#ffffff',
          borderColor: colors.neutral[500],
          softBg: colors.neutral[100],
          softColor: colors.neutral[700],
        };
    }
  };

  const badgeColors = getBadgeColors();
  
  const badgeStyle: React.CSSProperties = {
    borderRadius: designTokens.borderRadius.full,
    fontWeight: designTokens.typography.fontWeight.medium,
    fontSize: size === 'small' ? designTokens.typography.fontSize.xs :
              size === 'large' ? designTokens.typography.fontSize.sm :
              designTokens.typography.fontSize.xs,
    padding: size === 'small' ? '2px 8px' :
             size === 'large' ? '6px 12px' :
             '4px 10px',
    backgroundColor: variant === 'solid' ? badgeColors.bg :
                    variant === 'soft' ? badgeColors.softBg :
                    'transparent',
    color: variant === 'solid' ? badgeColors.color :
           variant === 'soft' ? badgeColors.softColor :
           badgeColors.bg,
    border: variant === 'outline' ? `1px solid ${badgeColors.borderColor}` : 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };

  return (
    <span
      className={`admin-badge admin-badge-${variant} admin-badge-${status} ${className}`}
      style={badgeStyle}
      {...props}
    >
      {children}
    </span>
  );
};

// Status Badge Helper Component
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'suspended' | 'verified' | 'unverified';
  size?: 'small' | 'default' | 'large';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'default' }) => {
  const statusConfig = {
    active: { status: 'success' as const, text: 'Active' },
    inactive: { status: 'error' as const, text: 'Inactive' },
    pending: { status: 'warning' as const, text: 'Pending' },
    suspended: { status: 'error' as const, text: 'Suspended' },
    verified: { status: 'success' as const, text: 'Verified' },
    unverified: { status: 'warning' as const, text: 'Unverified' },
  };

  const config = statusConfig[status];

  return (
    <AdminBadge status={config.status} variant="soft" size={size}>
      {config.text}
    </AdminBadge>
  );
};

// Role Badge Helper Component
interface RoleBadgeProps {
  role: 'admin' | 'editor' | 'user' | 'moderator' | 'viewer';
  size?: 'small' | 'default' | 'large';
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, size = 'default' }) => {
  const roleConfig = {
    admin: { status: 'error' as const, text: 'Admin' },
    editor: { status: 'processing' as const, text: 'Editor' },
    moderator: { status: 'warning' as const, text: 'Moderator' },
    user: { status: 'default' as const, text: 'User' },
    viewer: { status: 'default' as const, text: 'Viewer' },
  };

  const config = roleConfig[role];

  return (
    <AdminBadge status={config.status} variant="solid" size={size}>
      {config.text}
    </AdminBadge>
  );
};
