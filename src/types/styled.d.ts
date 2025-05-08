import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      dark: string;
      background: string;
      cardBackground: string;
      textLight: string;
      textSecondary: string;
      success: string;
      error: string;
      warning: string;
    };
    fonts: {
      primary: string;
      secondary: string;
      mono: string;
    };
    fontWeights: {
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      round: string;
    };
  }
} 