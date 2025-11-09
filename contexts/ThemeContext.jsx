"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    name: 'Light',
    colors: {
      primary: '#000000',
      secondary: '#6B7280',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      border: '#E5E7EB',
      text: '#111827',
      textSecondary: '#6B7280',
      accent: '#3B82F6',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBg: '#FFFFFF',
      cardBorder: '#E5E7EB'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#FFFFFF',
      secondary: '#9CA3AF',
      background: '#111827',
      surface: '#1F2937',
      border: '#374151',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      accent: '#60A5FA',
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
      cardBg: '#1F2937',
      cardBorder: '#374151'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)'
    }
  },
  blue: {
    name: 'Professional Blue',
    colors: {
      primary: '#1E40AF',
      secondary: '#64748B',
      background: '#F8FAFC',
      surface: '#F1F5F9',
      border: '#CBD5E1',
      text: '#0F172A',
      textSecondary: '#475569',
      accent: '#3B82F6',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      cardBg: '#FFFFFF',
      cardBorder: '#E2E8F0'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(30 64 175 / 0.05)',
      md: '0 4px 6px -1px rgb(30 64 175 / 0.1), 0 2px 4px -2px rgb(30 64 175 / 0.1)',
      lg: '0 10px 15px -3px rgb(30 64 175 / 0.1), 0 4px 6px -4px rgb(30 64 175 / 0.1)'
    }
  },
  green: {
    name: 'Legal Green',
    colors: {
      primary: '#065F46',
      secondary: '#6B7280',
      background: '#F0FDF4',
      surface: '#ECFDF5',
      border: '#BBF7D0',
      text: '#064E3B',
      textSecondary: '#047857',
      accent: '#10B981',
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      cardBg: '#FFFFFF',
      cardBorder: '#A7F3D0'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(6 95 70 / 0.05)',
      md: '0 4px 6px -1px rgb(6 95 70 / 0.1), 0 2px 4px -2px rgb(6 95 70 / 0.1)',
      lg: '0 10px 15px -3px rgb(6 95 70 / 0.1), 0 4px 6px -4px rgb(6 95 70 / 0.1)'
    }
  },
  purple: {
    name: 'Royal Purple',
    colors: {
      primary: '#581C87',
      secondary: '#6B7280',
      background: '#FAF5FF',
      surface: '#F3E8FF',
      border: '#C4B5FD',
      text: '#4C1D95',
      textSecondary: '#6D28D9',
      accent: '#8B5CF6',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      cardBg: '#FFFFFF',
      cardBorder: '#DDD6FE'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(88 28 135 / 0.05)',
      md: '0 4px 6px -1px rgb(88 28 135 / 0.1), 0 2px 4px -2px rgb(88 28 135 / 0.1)',
      lg: '0 10px 15px -3px rgb(88 28 135 / 0.1), 0 4px 6px -4px rgb(88 28 135 / 0.1)'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('casecut-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('casecut-theme', currentTheme);
    
    // Apply CSS custom properties
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
    
    // Apply theme class to body
    document.body.className = `theme-${currentTheme}`;
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
