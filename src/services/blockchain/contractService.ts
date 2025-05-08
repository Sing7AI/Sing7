import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { setNftLoading, setUserNfts, addUserNft } from '../../store/slices/userSlice';
import { web3Service } from './web3Service';
import { ipfsService } from '../storage/ipfsService';

// Contract ABI - will need to be generated after compiling the contract
const MusicNFTABI = [
  // This would be generated from the Solidity contract
  "function mintMusic(address recipient, string memory uri, address royaltyReceiver, uint96 royaltyFeeNumerator) public returns (uint256)",
  "function getCreator(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "event MusicMinted(uint256 indexed tokenId, address indexed creator, string uri)"
];

// Contract addresses on different networks
const CONTRACT_ADDRESSES: { [key: string]: string } = {
  '0x1': '0x...', // Ethereum Mainnet - to be updated after deployment
  '0x89': '0x...', // Polygon - to be updated after deployment
  '0x13881': '0x...', // Mumbai Testnet - to be updated after deployment
};

class ContractService {
  private contract: ethers.Contract | null = null;
  
  /**
   * Initialize the contract instance
   * @param provider Ethereum provider
   * @param chainId Current chain ID
   * @returns Contract instance or null if not supported
   */
  public initContract(provider: ethers.providers.Web3Provider, chainId: string): ethers.Contract | null {
    if (!CONTRACT_ADDRESSES[chainId]) {
      console.error(`Contract not deployed on chain ${chainId}`);
      return null;
    }
    
    const signer = provider.getSigner();
    this.contract = new ethers.Contract(CONTRACT_ADDRESSES[chainId], MusicNFTABI, signer);
    return this.contract;
  }
  
  /**
   * Mint a new Music NFT
   * @param audioData Audio blob data
   * @param metadata Metadata for the NFT
   * @param royaltyPercentage Royalty percentage (0-100)
   * @returns Transaction receipt
   */
  public async mintMusicNFT(
    audioData: Blob,
    metadata: {
      name: string;
      description: string;
      bpm: number;
      key: string;
      tags: string[];
    },
    royaltyPercentage: number
  ): Promise<any> {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }
      
      const provider = web3Service.getProvider();
      if (!provider) {
        throw new Error('Provider not available');
      }
      
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      
      // Upload audio to IPFS
      const result = await ipfsService.uploadAudioToIPFS(audioData, metadata);
      if (!result || !result.tokenURI) {
        throw new Error('Failed to upload to IPFS');
      }
      
      // Convert royalty percentage to basis points (10000 = 100%)
      const royaltyBasisPoints = Math.floor(royaltyPercentage * 100);
      
      // Mint the NFT
      const tx = await this.contract.mintMusic(
        signerAddress,
        result.tokenURI,
        signerAddress, // royalty receiver is the creator
        royaltyBasisPoints
      );
      
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      
      // Parse event logs to get the token ID
      const mintEvent = receipt.events?.find(
        (event: any) => event.event === 'MusicMinted'
      );
      
      const tokenId = mintEvent?.args?.tokenId;
      
      // Return the transaction receipt and token details
      return {
        receipt,
        tokenId: tokenId ? tokenId.toString() : null,
        tokenURI: result.tokenURI,
        metadata: result.metadata
      };
      
    } catch (error) {
      console.error('Error minting Music NFT:', error);
      throw error;
    }
  }
  
  /**
   * Fetch user's NFTs from the contract
   * @param address User's wallet address
   * @returns Array of NFTs owned by the user
   */
  public async fetchUserNFTs(address: string, dispatch: ReturnType<typeof useDispatch>) {
    try {
      dispatch(setNftLoading(true));
      
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }
      
      // This is a simplified approach. In a real application,
      // you would need to use events or a subgraph to efficiently query NFTs
      // owned by a specific user
      
      // For now, we'll return an empty array
      dispatch(setUserNfts([]));
      return [];
      
    } catch (error) {
      console.error('Error fetching user NFTs:', error);
      throw error;
    } finally {
      dispatch(setNftLoading(false));
    }
  }
}

export const contractService = new ContractService(); 