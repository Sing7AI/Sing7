// 🎨 Sing7 Theme Configuration
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#57b9f8',
    secondary: '#f8ce57',
    dark: '#2a2a2a',
    background: '#0a0a1e',
    cardBackground: '#23234b80',
    textLight: '#ffffff',
    textSecondary: '#c2c2e9',
    success: '#30D158',
    error: '#FF5757',
    warning: '#FFD60A'
  },
  fonts: {
    primary: "'Inter', sans-serif",
    secondary: "'Montserrat', sans-serif",
    mono: "'Roboto Mono', monospace"
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1200px'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50px'
  }
};

export default theme; 