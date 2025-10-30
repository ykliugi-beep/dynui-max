import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Theme, ThemeName } from '@dynui-max/design-tokens';
import { lightTheme, darkTheme, themes } from '@dynui-max/design-tokens';

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
}

/**
 * ThemeProvider component that provides theme context and CSS variable injection
 */
export function ThemeProvider({ 
  children, 
  defaultTheme = 'light',
  storageKey = 'dynui-theme'
}: ThemeProviderProps) {
  const [themeName, setThemeNameState] = useState<ThemeName>(defaultTheme);
  const theme = themes[themeName];

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as ThemeName;
      if (stored && themes[stored]) {
        setThemeNameState(stored);
      }
    }
  }, [storageKey]);

  // Apply theme class to document root
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Remove existing theme classes
      Object.keys(themes).forEach(name => {
        root.classList.remove(`theme-${name}`);
      });
      
      // Add current theme class
      root.classList.add(`theme-${themeName}`);
      
      // Set data attribute for CSS selectors
      root.setAttribute('data-theme', themeName);
    }
  }, [themeName]);

  const setTheme = (newThemeName: ThemeName) => {
    setThemeNameState(newThemeName);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newThemeName);
    }
  };

  const toggleTheme = () => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const contextValue: ThemeContextValue = {
    theme,
    themeName,
    setTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}