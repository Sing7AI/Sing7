import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  provider: any | null; // Web3Provider
  signer: any | null; // JsonRpcSigner
  connectionType: 'metamask' | 'walletconnect' | 'coinbase' | 'trust' | null;
}

const initialState: WalletState = {
  isConnected: false,
  address: null,
  chainId: null,
  balance: null,
  provider: null,
  signer: null,
  connectionType: null,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setAddress: (state, action: PayloadAction<string | null>) => {
      state.address = action.payload;
    },
    setChainId: (state, action: PayloadAction<number | null>) => {
      state.chainId = action.payload;
    },
    setBalance: (state, action: PayloadAction<string | null>) => {
      state.balance = action.payload;
    },
    setProvider: (state, action: PayloadAction<any | null>) => {
      state.provider = action.payload;
    },
    setSigner: (state, action: PayloadAction<any | null>) => {
      state.signer = action.payload;
    },
    setConnectionType: (
      state,
      action: PayloadAction<'metamask' | 'walletconnect' | 'coinbase' | 'trust' | null>
    ) => {
      state.connectionType = action.payload;
    },
    resetWallet: (state) => {
      state.isConnected = false;
      state.address = null;
      state.chainId = null;
      state.balance = null;
      state.provider = null;
      state.signer = null;
      state.connectionType = null;
    },
  },
});

export const {
  setConnected,
  setAddress,
  setChainId,
  setBalance,
  setProvider,
  setSigner,
  setConnectionType,
  resetWallet,
} = walletSlice.actions;

export default walletSlice.reducer; 