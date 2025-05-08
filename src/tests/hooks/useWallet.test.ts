import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { useWallet } from '../../hooks/useWallet';
import { web3Service } from '../../services/blockchain/web3Service';
import walletReducer from '../../store/slices/walletSlice';
import userReducer from '../../store/slices/userSlice';

// Mock the web3Service
jest.mock('../../services/blockchain/web3Service', () => ({
  web3Service: {
    checkIfWalletIsConnected: jest.fn(),
    connectWallet: jest.fn(),
    disconnectWallet: jest.fn(),
    getProvider: jest.fn(),
    switchNetwork: jest.fn(),
    updateBalance: jest.fn(),
  },
}));

describe('useWallet hook', () => {
  let wrapper: React.FC;
  let store: any;

  beforeEach(() => {
    // Create a mock store for testing
    store = configureStore({
      reducer: {
        wallet: walletReducer,
        user: userReducer,
      },
      preloadedState: {
        wallet: {
          connected: false,
          address: null,
          balance: null,
          chainId: null,
          networkName: null,
          provider: null,
          isConnecting: false,
          error: null,
        },
        user: {
          userId: null,
          username: null,
          profilePic: null,
          visitMode: 'visitor',
          isNftLoading: false,
          userNfts: [],
        },
      },
    });

    // Create a wrapper with the Redux provider
    wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should check wallet connection on mount', async () => {
    renderHook(() => useWallet(), { wrapper });
    expect(web3Service.checkIfWalletIsConnected).toHaveBeenCalledTimes(1);
  });

  it('should connect wallet when connect function is called', async () => {
    const connectResult = { success: true };
    (web3Service.connectWallet as jest.Mock).mockResolvedValue(connectResult);

    const { result } = renderHook(() => useWallet(), { wrapper });

    await act(async () => {
      const response = await result.current.connect();
      expect(response).toEqual(connectResult);
    });

    expect(web3Service.connectWallet).toHaveBeenCalledTimes(1);
  });

  it('should disconnect wallet when disconnect function is called', async () => {
    const { result } = renderHook(() => useWallet(), { wrapper });

    await act(async () => {
      await result.current.disconnect();
    });

    expect(web3Service.disconnectWallet).toHaveBeenCalledTimes(1);
  });

  it('should handle network switching', async () => {
    (web3Service.getProvider as jest.Mock).mockReturnValue(true);
    (web3Service.switchNetwork as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useWallet(), { wrapper });

    await act(async () => {
      const success = await result.current.switchNetwork('0x1');
      expect(success).toBe(true);
    });

    expect(web3Service.switchNetwork).toHaveBeenCalledWith('0x1');
  });

  it('should trigger wallet connection before switching networks if provider is not available', async () => {
    (web3Service.getProvider as jest.Mock).mockReturnValue(false);
    (web3Service.connectWallet as jest.Mock).mockResolvedValue({ success: true });
    (web3Service.switchNetwork as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useWallet(), { wrapper });

    await act(async () => {
      const success = await result.current.switchNetwork('0x1');
      expect(success).toBe(true);
    });

    expect(web3Service.connectWallet).toHaveBeenCalledTimes(1);
    expect(web3Service.switchNetwork).toHaveBeenCalledWith('0x1');
  });
}); 