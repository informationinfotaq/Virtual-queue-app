import React, { createContext, useContext, useState, ReactNode } from 'react';

type ColorPalette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
};

type ThemeColors = {
  light: ColorPalette;
  dark: ColorPalette;
};

const themeColors: ThemeColors = {
  light: {
    primary: '#1976D2', // Cool blue
    secondary: '#03DAC6', // Teal
    accent: '#FF6F00', // Orange
    background: '#FAFAFA', // Soft light gray
    surface: '#FFFFFF', // White
    text: '#212121', // Dark gray
    textSecondary: '#757575', // Medium gray
    border: '#E0E0E0', // Light gray
    error: '#D32F2F', // Red
    success: '#388E3C', // Green
  },
  dark: {
    primary: '#90CAF9', // Lighter blue for dark mode
    secondary: '#80CBC4', // Lighter teal
    accent: '#FFB74D', // Lighter orange
    background: '#121212', // Dark background
    surface: '#1E1E1E', // Slightly lighter dark
    text: '#FFFFFF', // White
    textSecondary: '#B0B0B0', // Light gray
    border: '#333333', // Dark gray
    error: '#EF5350', // Lighter red
    success: '#66BB6A', // Lighter green
  },
};

type ThemeContextType = {
  theme: 'light' | 'dark';
  colors: ColorPalette;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: themeColors.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  const colors = themeColors[theme];
  return <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
