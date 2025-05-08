// This service handles the blockchain interactions for our application

// Import Web3Modal and ethers
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { 
  setWalletConnected,
  setWalletConnecting,
  updateBalance as updateWalletBalance,
  updateNetwork,
  disconnectWallet as disconnectWalletAction,
  setWalletError
} from '../../store/slices/walletSlice';
import { useDispatch } from 'react-redux';

// Define supported networks
const SUPPORTED_NETWORKS = {
  '0x1': "Ethereum Mainnet",
  '0x5': "Goerli Testnet",
  '0x89': "Polygon Mainnet",
  '0x13881': "Mumbai Testnet",
  '0xa4b1': "Arbitrum One",
  '0x66eed': "Arbitrum Goerli",
  '0xa': "Optimism",
  '0x1a4': "Optimism Goerli",
  '0x2105': "Base",
  '0x14a33': "Base Goerli"
};

// Initialize Web3Modal
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Sing7",
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
};

let web3Modal: any;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
    theme: {
      background: '#121212',
      main: '#ffffff',
      secondary: '#BF5AF2',
      border: '#2d2d2d',
      hover: '#A347D1',
    },
  });
}

class Web3Service {
  private provider: ethers.providers.Web3Provider | null = null;
  private web3Modal = web3Modal;
  
  public getProvider() {
    return this.provider;
  }

  public async connectWallet(dispatch: ReturnType<typeof useDispatch>) {
    try {
      dispatch(setWalletConnecting(true));
      
      const instance = await this.web3Modal.connect();
      
      this.provider = new ethers.providers.Web3Provider(instance);
      const signer = this.provider.getSigner();
      const address = await signer.getAddress();
      const network = await this.provider.getNetwork();
      const chainId = '0x' + network.chainId.toString(16);
      const networkName = SUPPORTED_NETWORKS[chainId as keyof typeof SUPPORTED_NETWORKS] || 'Unknown Network';
      const balance = ethers.utils.formatEther(await this.provider.getBalance(address));

      // Update wallet state
      dispatch(setWalletConnected({
        address,
        balance,
        chainId,
        networkName,
        provider: this.provider
      }));

      // Setup listeners
      instance.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          this.disconnectWallet(dispatch);
        } else {
          this.updateBalance(dispatch);
        }
      });

      instance.on('chainChanged', (chainIdHex: string) => {
        const networkName = SUPPORTED_NETWORKS[chainIdHex as keyof typeof SUPPORTED_NETWORKS] || 'Unknown Network';
        dispatch(updateNetwork({
          chainId: chainIdHex,
          networkName
        }));
      });

      instance.on('disconnect', () => {
        this.disconnectWallet(dispatch);
      });

      return {
        provider: this.provider,
        signer,
        address,
        chainId,
        balance,
        networkName
      };
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      dispatch(setWalletError('Failed to connect wallet. Please try again.'));
      return null;
    }
  }

  public async disconnectWallet(dispatch: ReturnType<typeof useDispatch>) {
    if (this.web3Modal) {
      await this.web3Modal.clearCachedProvider();
    }
    this.provider = null;
    dispatch(disconnectWalletAction());
  }

  public async updateBalance(dispatch: ReturnType<typeof useDispatch>) {
    try {
      if (!this.provider) return;
      
      const signer = this.provider.getSigner();
      const address = await signer.getAddress();
      const balance = ethers.utils.formatEther(await this.provider.getBalance(address));
      
      dispatch(updateWalletBalance(balance));
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  }

  public async checkIfWalletIsConnected(dispatch: ReturnType<typeof useDispatch>) {
    if (this.web3Modal && this.web3Modal.cachedProvider) {
      return this.connectWallet(dispatch);
    }
    return null;
  }

  public async switchNetwork(chainId: string) {
    try {
      if (!this.provider) return false;
      
      await this.provider.send('wallet_switchEthereumChain', [{ chainId }]);
      return true;
    } catch (error: any) {
      // If the chain hasn't been added to MetaMask, we can add it
      if (error.code === 4902) {
        try {
          // This is network-specific and would need to be updated for each supported network
          const networkParams = this.getNetworkParams(chainId);
          if (networkParams) {
            await this.provider.send('wallet_addEthereumChain', [networkParams]);
            return true;
          }
        } catch (addError) {
          console.error('Error adding network:', addError);
        }
      }
      console.error('Error switching network:', error);
      return false;
    }
  }

  // Helper function to get network parameters
  private getNetworkParams(chainId: string) {
    // Example for Polygon, adjust for other networks as needed
    if (chainId === '0x89') {
      return {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/'],
      };
    }
    
    // Add other networks as needed
    
    return null;
  }
}

export const web3Service = new Web3Service(); 