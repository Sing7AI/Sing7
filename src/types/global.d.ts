// Type definitions for the project

// Import React for JSX
import React from 'react';

// Import TypeScript modules
import 'styled-components';

// Extend existing modules
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      error: string;
      success: string;
      warning: string;
    };
    fonts: {
      body: string;
      heading: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}

// Fix JSX namespace issue
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Add global types and interfaces
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      chainId: string;
      selectedAddress: string | null;
    };
  }
}

// Tone.js specific type extensions
declare module 'tone' {
  interface PlayerOptions {
    url?: string | AudioBuffer;
    buffer?: AudioBuffer;
    onload?: () => void;
    onerror?: (error: Error) => void;
    playbackRate?: number;
    loop?: boolean;
    autostart?: boolean;
    loopStart?: Time;
    loopEnd?: Time;
    reverse?: boolean;
    fadeIn?: Time;
    fadeOut?: Time;
    volume?: Decibels;
  }
} 