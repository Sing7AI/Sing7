import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  address: string | null;
  balance: string | null;
  chainId: string | null;
  networkName: string | null;
  connected: boolean;
  provider: any | null;
  isConnecting: boolean;
  error: string | null;
}

const initialState: WalletState = {
  address: null,
  balance: null,
  chainId: null,
  networkName: null,
  connected: false,
  provider: null,
  isConnecting: false,
  error: null
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletConnecting: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setWalletConnected: (state, action: PayloadAction<{
      address: string;
      balance: string;
      chainId: string;
      networkName: string;
      provider: any;
    }>) => {
      state.connected = true;
      state.address = action.payload.address;
      state.balance = action.payload.balance;
      state.chainId = action.payload.chainId;
      state.networkName = action.payload.networkName;
      state.provider = action.payload.provider;
      state.isConnecting = false;
      state.error = null;
    },
    updateBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    updateNetwork: (state, action: PayloadAction<{
      chainId: string;
      networkName: string;
    }>) => {
      state.chainId = action.payload.chainId;
      state.networkName = action.payload.networkName;
    },
    disconnectWallet: (state) => {
      state.connected = false;
      state.address = null;
      state.balance = null;
      state.chainId = null;
      state.networkName = null;
      state.provider = null;
    },
    setWalletError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isConnecting = false;
    }
  }
});

export const {
  setWalletConnecting,
  setWalletConnected,
  updateBalance,
  updateNetwork,
  disconnectWallet,
  setWalletError
} = walletSlice.actions;

export default walletSlice.reducer; 