"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { adminTheme, designTokens } from './theme';

// Theme configuration interface
interface ThemeConfig {
  mode: 'light' | 'dark';
  primaryColor: string;
  borderRadius: number;
  compactMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

// Default theme configuration
const defaultThemeConfig: ThemeConfig = {
  mode: 'light',
  primaryColor: designTokens.colors.primary[500],
  borderRadius: 8,
  compactMode: false,
  fontSize: 'medium',
  colorScheme: 'blue',
};

// Theme context
interface ThemeContextType {
  config: ThemeConfig;
  updateConfig: (updates: Partial<ThemeConfig>) => void;
  resetConfig: () => void;
  toggleMode: () => void;
  applyColorScheme: (scheme: ThemeConfig['colorScheme']) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Color scheme configurations
const colorSchemes = {
  blue: {
    primary: designTokens.colors.primary,
    name: 'Blue',
  },
  green: {
    primary: designTokens.colors.success,
    name: 'Green',
  },
  purple: {
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    name: 'Purple',
  },
  orange: {
    primary: designTokens.colors.warning,
    name: 'Orange',
  },
  red: {
    primary: designTokens.colors.error,
    name: 'Red',
  },
};

// Font size configurations
const fontSizeConfigs = {
  small: {
    base: 13,
    scale: 0.9,
  },
  medium: {
    base: 14,
    scale: 1,
  },
  large: {
    base: 16,
    scale: 1.1,
  },
};

// Theme provider component
interface AdminThemeProviderProps {
  children: React.ReactNode;
  defaultConfig?: Partial<ThemeConfig>;
}

export const AdminThemeProvider: React.FC<AdminThemeProviderProps> = ({
  children,
  defaultConfig = {},
}) => {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin-theme-config');
      if (saved) {
        try {
          return { ...defaultThemeConfig, ...JSON.parse(saved), ...defaultConfig };
        } catch (error) {
          console.warn('Failed to parse saved theme config:', error);
        }
      }
    }
    return { ...defaultThemeConfig, ...defaultConfig };
  });

  // Save to localStorage whenever config changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-theme-config', JSON.stringify(config));
    }
  }, [config]);

  // Apply CSS custom properties for theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const colorScheme = colorSchemes[config.colorScheme];
      const fontConfig = fontSizeConfigs[config.fontSize];

      // Apply color scheme
      Object.entries(colorScheme.primary).forEach(([shade, color]) => {
        root.style.setProperty(`--admin-primary-${shade}`, color);
      });

      // Apply primary color
      root.style.setProperty('--admin-primary', config.primaryColor);

      // Apply font size
      root.style.setProperty('--admin-font-size-base', `${fontConfig.base}px`);
      root.style.setProperty('--admin-font-scale', fontConfig.scale.toString());

      // Apply border radius
      root.style.setProperty('--admin-border-radius', `${config.borderRadius}px`);

      // Apply mode
      root.setAttribute('data-theme', config.mode);
      
      // Apply compact mode
      if (config.compactMode) {
        root.classList.add('admin-compact');
      } else {
        root.classList.remove('admin-compact');
      }
    }
  }, [config]);

  const updateConfig = (updates: Partial<ThemeConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(defaultThemeConfig);
  };

  const toggleMode = () => {
    setConfig(prev => ({ ...prev, mode: prev.mode === 'light' ? 'dark' : 'light' }));
  };

  const applyColorScheme = (scheme: ThemeConfig['colorScheme']) => {
    const colorScheme = colorSchemes[scheme];
    setConfig(prev => ({
      ...prev,
      colorScheme: scheme,
      primaryColor: colorScheme.primary[500],
    }));
  };

  // Generate Ant Design theme based on current config
  const generateAntdTheme = () => {
    const colorScheme = colorSchemes[config.colorScheme];
    const fontConfig = fontSizeConfigs[config.fontSize];

    return {
      ...adminTheme,
      token: {
        ...adminTheme.token,
        colorPrimary: config.primaryColor,
        borderRadius: config.borderRadius,
        borderRadiusLG: config.borderRadius + 4,
        borderRadiusSM: config.borderRadius - 2,
        fontSize: fontConfig.base,
        fontSizeHeading1: Math.round(fontConfig.base * 2.25 * fontConfig.scale),
        fontSizeHeading2: Math.round(fontConfig.base * 1.75 * fontConfig.scale),
        fontSizeHeading3: Math.round(fontConfig.base * 1.5 * fontConfig.scale),
        fontSizeHeading4: Math.round(fontConfig.base * 1.25 * fontConfig.scale),
        fontSizeHeading5: Math.round(fontConfig.base * 1.125 * fontConfig.scale),
        // Compact mode adjustments
        controlHeight: config.compactMode ? 32 : 40,
        controlHeightLG: config.compactMode ? 40 : 48,
        controlHeightSM: config.compactMode ? 24 : 32,
        padding: config.compactMode ? 12 : 16,
        paddingLG: config.compactMode ? 16 : 24,
        paddingSM: config.compactMode ? 8 : 12,
        margin: config.compactMode ? 12 : 16,
        marginLG: config.compactMode ? 16 : 24,
        marginSM: config.compactMode ? 8 : 12,
      },
      components: {
        ...adminTheme.components,
        Layout: {
          ...adminTheme.components?.Layout,
          headerHeight: config.compactMode ? 56 : 64,
        },
        Card: {
          ...adminTheme.components?.Card,
          paddingLG: config.compactMode ? 16 : 24,
        },
        Table: {
          ...adminTheme.components?.Table,
          cellPaddingBlock: config.compactMode ? 8 : 12,
        },
      },
    };
  };

  const contextValue: ThemeContextType = {
    config,
    updateConfig,
    resetConfig,
    toggleMode,
    applyColorScheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={generateAntdTheme()}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useAdminTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAdminTheme must be used within AdminThemeProvider');
  }
  return context;
};

// Theme customization component
export const ThemeCustomizer: React.FC = () => {
  const { config, updateConfig, resetConfig, toggleMode, applyColorScheme } = useAdminTheme();

  return (
    <div className="admin-theme-customizer">
      <h3>Theme Customization</h3>
      
      {/* Mode Toggle */}
      <div className="theme-option">
        <label>Theme Mode:</label>
        <button onClick={toggleMode}>
          {config.mode === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        </button>
      </div>

      {/* Color Scheme */}
      <div className="theme-option">
        <label>Color Scheme:</label>
        <div className="color-scheme-options">
          {Object.entries(colorSchemes).map(([key, scheme]) => (
            <button
              key={key}
              onClick={() => applyColorScheme(key as ThemeConfig['colorScheme'])}
              className={config.colorScheme === key ? 'active' : ''}
              style={{ backgroundColor: scheme.primary[500] }}
            >
              {scheme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="theme-option">
        <label>Font Size:</label>
        <select
          value={config.fontSize}
          onChange={(e) => updateConfig({ fontSize: e.target.value as ThemeConfig['fontSize'] })}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Border Radius */}
      <div className="theme-option">
        <label>Border Radius:</label>
        <input
          type="range"
          min="0"
          max="16"
          value={config.borderRadius}
          onChange={(e) => updateConfig({ borderRadius: parseInt(e.target.value) })}
        />
        <span>{config.borderRadius}px</span>
      </div>

      {/* Compact Mode */}
      <div className="theme-option">
        <label>
          <input
            type="checkbox"
            checked={config.compactMode}
            onChange={(e) => updateConfig({ compactMode: e.target.checked })}
          />
          Compact Mode
        </label>
      </div>

      {/* Reset */}
      <div className="theme-option">
        <button onClick={resetConfig}>Reset to Default</button>
      </div>
    </div>
  );
};

// Export color schemes and font configs for external use
export { colorSchemes, fontSizeConfigs };
