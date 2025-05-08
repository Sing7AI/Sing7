// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    border: string;
    borderHover: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// IPFS Service types
export interface IPFSResult {
  cid: string;
  path: string;
  size: number;
}

export interface AudioMetadata {
  name: string;
  description: string;
  creator: string;
  image?: string;
  duration?: number;
  bpm?: number;
  key?: string;
  tags?: string[];
  createdAt: number;
}

// Audio Engine types
export interface Note {
  note: string;
  time: number;
  duration: string;
  velocity?: number;
}

export interface Chord {
  chord: string[];
  time: number;
  duration: string;
}

export interface DrumPattern {
  drumId: string;
  steps: boolean[];
}

// Wallet types
export interface WalletState {
  connected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  isConnecting: boolean;
  error: Error | null;
} 