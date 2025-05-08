import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export type WalletConnectionState = {
  connected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  isConnecting: boolean;
  error: Error | null;
};

export const useWallet = () => {
  const [state, setState] = useState<WalletConnectionState>({
    connected: false,
    address: null,
    chainId: null,
    balance: null,
    isConnecting: false,
    error: null,
  });

  /**
   * Connect to the wallet
   */
  const connect = async () => {
    if (!window.ethereum) {
      setState(prev => ({
        ...prev,
        error: new Error('No Ethereum provider found. Please install MetaMask or another wallet.'),
      }));
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      // Request accounts from the provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const chainIdHex = await provider.send('eth_chainId', []);
      const chainId = parseInt(chainIdHex, 16);
      const balanceWei = await provider.getBalance(address);
      const balance = ethers.utils.formatEther(balanceWei);

      // Update state with connection info
      setState({
        connected: true,
        address,
        chainId,
        balance,
        isConnecting: false,
        error: null,
      });

      // Save connection info to localStorage
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', address);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error : new Error('Failed to connect to wallet'),
      }));
    }
  };

  /**
   * Disconnect from the wallet
   */
  const disconnect = () => {
    setState({
      connected: false,
      address: null,
      chainId: null,
      balance: null,
      isConnecting: false,
      error: null,
    });

    // Remove connection info from localStorage
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
  };

  /**
   * Switch to the specified network
   */
  const switchNetwork = async (chainId: number) => {
    if (!window.ethereum) {
      setState(prev => ({
        ...prev,
        error: new Error('No Ethereum provider found. Please install MetaMask or another wallet.'),
      }));
      return;
    }

    const chainIdHex = `0x${chainId.toString(16)}`;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    } catch (error: any) {
      // If the chain hasn't been added to the user's wallet
      if (error.code === 4902) {
        // Add the chain - would need more parameters in a real implementation
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdHex,
                // These would need to be properly configured for the actual network
                chainName: 'Network Name',
                nativeCurrency: {
                  name: 'Native Token',
                  symbol: 'TOKEN',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc-url'],
                blockExplorerUrls: ['https://explorer-url'],
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding network:', addError);
          setState(prev => ({
            ...prev,
            error: addError instanceof Error ? addError : new Error('Failed to add network'),
          }));
        }
      } else {
        console.error('Error switching network:', error);
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error : new Error('Failed to switch network'),
        }));
      }
    }
  };

  // Check if wallet was previously connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      const wasConnected = localStorage.getItem('walletConnected') === 'true';
      
      if (wasConnected && window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const chainIdHex = await provider.send('eth_chainId', []);
            const chainId = parseInt(chainIdHex, 16);
            const balanceWei = await provider.getBalance(address);
            const balance = ethers.utils.formatEther(balanceWei);
            
            setState({
              connected: true,
              address,
              chainId,
              balance,
              isConnecting: false,
              error: null,
            });
          } else {
            // User disconnected wallet in metamask
            localStorage.removeItem('walletConnected');
            localStorage.removeItem('walletAddress');
          }
        } catch (error) {
          console.error('Error checking connection:', error);
          localStorage.removeItem('walletConnected');
          localStorage.removeItem('walletAddress');
        }
      }
    };
    
    checkConnection();
  }, []);

  // Update balance periodically
  useEffect(() => {
    if (!state.connected || !state.address) return;
    
    const updateBalance = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balanceWei = await provider.getBalance(state.address!);
        const balance = ethers.utils.formatEther(balanceWei);
        
        setState(prev => ({
          ...prev,
          balance,
        }));
      } catch (error) {
        console.error('Error updating balance:', error);
      }
    };
    
    const intervalId = setInterval(updateBalance, 10000); // Update every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [state.connected, state.address]);

  // Listen for account and chain changes
  useEffect(() => {
    if (!window.ethereum) return;
    
    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected
        disconnect();
      } else if (state.connected) {
        // Account changed
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const address = accounts[0];
          const balanceWei = await provider.getBalance(address);
          const balance = ethers.utils.formatEther(balanceWei);
          
          setState(prev => ({
            ...prev,
            address,
            balance,
          }));
          
          localStorage.setItem('walletAddress', address);
        } catch (error) {
          console.error('Error handling account change:', error);
        }
      }
    };
    
    const handleChainChanged = (chainIdHex: string) => {
      const chainId = parseInt(chainIdHex, 16);
      
      setState(prev => ({
        ...prev,
        chainId,
      }));
      
      // You could also reload the page as recommended by MetaMask
      // window.location.reload();
    };
    
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [state.connected]);

  return {
    ...state,
    connect,
    disconnect,
    switchNetwork,
  };
};

export default useWallet; 