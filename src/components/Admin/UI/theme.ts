/**
 * Modern Admin Theme Configuration
 * Comprehensive design system for the admin interface
 */

// Design Tokens
export const designTokens = {
  // Color Palette - Modern, professional colors
  colors: {
    // Primary brand colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Main primary
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    
    // Neutral grays
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Semantic colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  
  // Z-index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  
  // Transitions
  transition: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
};

// Ant Design Theme Configuration
export const adminTheme = {
  token: {
    // Color tokens
    colorPrimary: designTokens.colors.primary[500],
    colorSuccess: designTokens.colors.success[500],
    colorWarning: designTokens.colors.warning[500],
    colorError: designTokens.colors.error[500],
    colorInfo: designTokens.colors.info[500],
    
    // Typography
    fontFamily: designTokens.typography.fontFamily.sans.join(', '),
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,
    
    // Layout
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    
    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    
    margin: 16,
    marginLG: 24,
    marginSM: 12,
    marginXS: 8,
    
    // Component specific
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,
    
    // Background colors
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorBgSpotlight: '#fafafa',
    
    // Border colors
    colorBorder: designTokens.colors.neutral[200],
    colorBorderSecondary: designTokens.colors.neutral[100],
    
    // Text colors
    colorText: designTokens.colors.neutral[800],
    colorTextSecondary: designTokens.colors.neutral[600],
    colorTextTertiary: designTokens.colors.neutral[500],
    colorTextQuaternary: designTokens.colors.neutral[400],
    
    // Box shadows
    boxShadow: designTokens.boxShadow.base,
    boxShadowSecondary: designTokens.boxShadow.sm,
    boxShadowTertiary: designTokens.boxShadow.md,
    
    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerHeight: 64,
      headerPadding: '0 24px',
      siderBg: designTokens.colors.neutral[900],
      bodyBg: designTokens.colors.neutral[50],
    },
    
    Menu: {
      darkItemBg: 'transparent',
      darkItemSelectedBg: designTokens.colors.primary[600],
      darkItemHoverBg: designTokens.colors.neutral[800],
      darkItemColor: designTokens.colors.neutral[300],
      darkItemSelectedColor: '#ffffff',
      darkItemHoverColor: '#ffffff',
      itemBorderRadius: 8,
      itemMarginInline: 8,
      itemMarginBlock: 4,
    },
    
    Card: {
      borderRadiusLG: 12,
      paddingLG: 24,
      boxShadowTertiary: designTokens.boxShadow.md,
    },
    
    Button: {
      borderRadius: 8,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
      fontWeight: 500,
    },
    
    Table: {
      borderRadius: 12,
      headerBg: designTokens.colors.neutral[50],
      headerColor: designTokens.colors.neutral[700],
      rowHoverBg: designTokens.colors.neutral[50],
    },
    
    Form: {
      itemMarginBottom: 20,
      labelFontSize: 14,
      labelColor: designTokens.colors.neutral[700],
    },
    
    Input: {
      borderRadius: 8,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
    },
    
    Select: {
      borderRadius: 8,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
    },
    
    Modal: {
      borderRadiusLG: 16,
      paddingContentHorizontalLG: 32,
      paddingMD: 24,
    },
    
    Notification: {
      borderRadiusLG: 12,
    },
    
    Message: {
      borderRadiusLG: 12,
    },
  },
};

// CSS-in-JS styles for custom components
export const adminStyles = {
  // Card styles
  modernCard: {
    borderRadius: designTokens.borderRadius.xl,
    border: `1px solid ${designTokens.colors.neutral[200]}`,
    boxShadow: designTokens.boxShadow.md,
    background: '#ffffff',
    transition: designTokens.transition.normal,
    '&:hover': {
      boxShadow: designTokens.boxShadow.lg,
      transform: 'translateY(-2px)',
    },
  },
  
  // Button styles
  modernButton: {
    borderRadius: designTokens.borderRadius.lg,
    fontWeight: designTokens.typography.fontWeight.medium,
    transition: designTokens.transition.fast,
    border: 'none',
    boxShadow: designTokens.boxShadow.sm,
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: designTokens.boxShadow.md,
    },
  },
  
  // Layout styles
  pageContainer: {
    padding: designTokens.spacing[6],
    background: designTokens.colors.neutral[50],
    minHeight: '100vh',
  },
  
  contentContainer: {
    background: '#ffffff',
    borderRadius: designTokens.borderRadius.xl,
    padding: designTokens.spacing[8],
    boxShadow: designTokens.boxShadow.base,
    border: `1px solid ${designTokens.colors.neutral[200]}`,
  },
  
  // Typography styles
  pageTitle: {
    fontSize: designTokens.typography.fontSize['3xl'],
    fontWeight: designTokens.typography.fontWeight.bold,
    color: designTokens.colors.neutral[900],
    marginBottom: designTokens.spacing[2],
    lineHeight: designTokens.typography.lineHeight.tight,
  },
  
  pageSubtitle: {
    fontSize: designTokens.typography.fontSize.lg,
    color: designTokens.colors.neutral[600],
    marginBottom: designTokens.spacing[6],
    lineHeight: designTokens.typography.lineHeight.normal,
  },
  
  sectionTitle: {
    fontSize: designTokens.typography.fontSize.xl,
    fontWeight: designTokens.typography.fontWeight.semibold,
    color: designTokens.colors.neutral[800],
    marginBottom: designTokens.spacing[4],
  },
};
