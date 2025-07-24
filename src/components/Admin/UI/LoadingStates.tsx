"use client";

import React from "react";
import { Spin, Skeleton, Card, Result, Button, Typography, Space } from "antd";
import { LoadingOutlined, ReloadOutlined, InboxOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { AdminCard, AdminButton } from "./StyledComponents";
import { designTokens } from "./theme";

const { Text } = Typography;

// Modern Full Page Loading
interface PageLoadingProps {
  tip?: string;
  size?: "small" | "default" | "large";
  description?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({
  tip = "Loading...",
  size = "large",
  description = "Please wait while we load your content",
}) => (
  <div
    className="flex items-center justify-center min-h-screen"
    style={{
      background: `linear-gradient(135deg, ${designTokens.colors.neutral[50]}, ${designTokens.colors.primary[50]})`,
    }}
  >
    <div className="text-center">
      <Spin
        size={size}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: size === "large" ? 48 : size === "default" ? 32 : 24,
              color: designTokens.colors.primary[500],
            }}
            spin
          />
        }
      />
      <div style={{ marginTop: '24px' }}>
        <Text
          style={{
            fontSize: '18px',
            fontWeight: 500,
            color: designTokens.colors.neutral[700],
            display: 'block',
            marginBottom: '8px',
          }}
        >
          {tip}
        </Text>
        <Text
          style={{
            fontSize: '14px',
            color: designTokens.colors.neutral[500],
          }}
        >
          {description}
        </Text>
      </div>
    </div>
  </div>
);

// Content Loading
interface ContentLoadingProps {
  tip?: string;
  size?: "small" | "default" | "large";
  children?: React.ReactNode;
}

export const ContentLoading: React.FC<ContentLoadingProps> = ({
  tip = "Loading...",
  size = "default",
  children,
}) => (
  <div className="flex items-center justify-center p-8">
    <Spin size={size} tip={tip}>
      {children || <div className="w-32 h-32" />}
    </Spin>
  </div>
);

// Inline Loading
interface InlineLoadingProps {
  loading: boolean;
  children: React.ReactNode;
  tip?: string;
}

export const InlineLoading: React.FC<InlineLoadingProps> = ({
  loading,
  children,
  tip,
}) => (
  <Spin spinning={loading} tip={tip}>
    {children}
  </Spin>
);

// Table Loading Skeleton
export const TableSkeleton: React.FC = () => (
  <Card>
    <Skeleton active paragraph={{ rows: 8 }} />
  </Card>
);

// Form Loading Skeleton
export const FormSkeleton: React.FC = () => (
  <Card>
    <div className="space-y-4">
      <Skeleton.Input active size="large" style={{ width: "100%" }} />
      <Skeleton.Input active size="large" style={{ width: "100%" }} />
      <Skeleton active paragraph={{ rows: 3 }} />
      <Skeleton.Input active size="large" style={{ width: "100%" }} />
      <div className="flex justify-end space-x-2">
        <Skeleton.Button active />
        <Skeleton.Button active />
      </div>
    </div>
  </Card>
);

// Card Loading Skeleton
export const CardSkeleton: React.FC = () => (
  <Card>
    <Skeleton active avatar paragraph={{ rows: 2 }} />
  </Card>
);

// List Loading Skeleton
interface ListSkeletonProps {
  rows?: number;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({ rows = 5 }) => (
  <Card>
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="mb-4 last:mb-0">
        <Skeleton active avatar paragraph={{ rows: 1 }} />
      </div>
    ))}
  </Card>
);

// Modern Error State
interface ErrorStateProps {
  title?: string;
  subTitle?: string;
  onRetry?: () => void;
  retryText?: string;
  type?: "error" | "warning" | "info";
  icon?: React.ReactNode;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  subTitle = "Sorry, an error occurred while loading the content.",
  onRetry,
  retryText = "Try Again",
  type = "error",
  icon,
}) => (
  <AdminCard style={{ textAlign: 'center', padding: '48px 24px' }}>
    <div>
      {icon || (
        <ExclamationCircleOutlined
          style={{
            fontSize: '64px',
            color: type === "error" ? designTokens.colors.error[500] :
                   type === "warning" ? designTokens.colors.warning[500] :
                   designTokens.colors.info[500],
            marginBottom: '24px',
          }}
        />
      )}
      <Text
        style={{
          fontSize: '24px',
          fontWeight: 600,
          color: designTokens.colors.neutral[800],
          display: 'block',
          marginBottom: '12px',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: '16px',
          color: designTokens.colors.neutral[600],
          display: 'block',
          marginBottom: '32px',
          lineHeight: '1.5',
        }}
      >
        {subTitle}
      </Text>
      {onRetry && (
        <AdminButton
          type="primary"
          icon={<ReloadOutlined />}
          onClick={onRetry}
          colorScheme="primary"
          size="middle"
          style={{ height: '48px', minWidth: '140px' }}
        >
          {retryText}
        </AdminButton>
      )}
    </div>
  </AdminCard>
);

// Modern Empty State
interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  image?: React.ReactNode;
  size?: "small" | "default" | "large";
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "There is no data to display at the moment.",
  action,
  image,
  size = "default",
}) => (
  <AdminCard
    style={{
      textAlign: 'center',
      padding: size === "large" ? '64px 32px' :
               size === "small" ? '32px 16px' :
               '48px 24px',
    }}
  >
    <div>
      {image || (
        <InboxOutlined
          style={{
            fontSize: size === "large" ? '80px' :
                     size === "small" ? '48px' :
                     '64px',
            color: designTokens.colors.neutral[400],
            marginBottom: '24px',
          }}
        />
      )}
      <Text
        style={{
          fontSize: size === "large" ? '24px' :
                   size === "small" ? '16px' :
                   '20px',
          fontWeight: 600,
          color: designTokens.colors.neutral[700],
          display: 'block',
          marginBottom: '12px',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: size === "large" ? '16px' :
                   size === "small" ? '13px' :
                   '14px',
          color: designTokens.colors.neutral[500],
          display: 'block',
          marginBottom: action ? '32px' : '0',
          lineHeight: '1.5',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {description}
      </Text>
      {action && (
        <div style={{ marginTop: '24px' }}>
          {action}
        </div>
      )}
    </div>
  </AdminCard>
);

// Loading Button
interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "default" | "dashed" | "link" | "text";
  size?: "small" | "middle" | "large";
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  onClick,
  type = "primary",
  size = "middle",
  disabled = false,
  icon,
}) => (
  <Button
    type={type}
    size={size}
    loading={loading}
    disabled={disabled}
    onClick={onClick}
    icon={!loading ? icon : undefined}
  >
    {children}
  </Button>
);

// Custom Loading Spinner
export const LoadingSpinner: React.FC = () => (
  <Spin
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 24,
          color: "#1890ff",
        }}
        spin
      />
    }
  />
);

// Overlay Loading
interface OverlayLoadingProps {
  loading: boolean;
  children: React.ReactNode;
  tip?: string;
}

export const OverlayLoading: React.FC<OverlayLoadingProps> = ({
  loading,
  children,
  tip = "Loading...",
}) => (
  <div className="relative">
    {children}
    {loading && (
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
        <Spin size="large" tip={tip} />
      </div>
    )}
  </div>
);
