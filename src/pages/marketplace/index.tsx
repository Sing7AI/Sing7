import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../../store';
import { useWallet } from '../../hooks/useWallet';
import NFTCard from '../../components/marketplace/NFTCard';
import { NFT } from '../../store/slices/userSlice';

// Mock data for NFTs
const MOCK_NFTS: NFT[] = [
  {
    id: '1',
    name: 'Ethereal Dreams',
    description: 'A dreamy ambient piece with lush pads and gentle melodies.',
    image: '/assets/images/nft-1.jpg',
    audio: '/assets/audio/example1.mp3',
    tokenId: '100001',
    tokenURI: 'ipfs://Qm...',
    creator: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    metadata: {
      bpm: 85,
      key: 'A minor',
      tags: ['ambient', 'chill', 'dreamy']
    }
  },
  {
    id: '2',
    name: 'Digital Pulse',
    description: 'An energetic electronic track with driving rhythms and melodic synths.',
    image: '/assets/images/nft-2.jpg',
    audio: '/assets/audio/example2.mp3',
    tokenId: '100002',
    tokenURI: 'ipfs://Qm...',
    creator: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    owner: '0x8F3d35Cc6634C0532925a3b844Bc454e4438f123',
    metadata: {
      bpm: 128,
      key: 'F major',
      tags: ['electronic', 'upbeat', 'synth']
    }
  },
  {
    id: '3',
    name: 'Zen Garden',
    description: 'A peaceful composition featuring natural sounds and gentle instruments.',
    image: '/assets/images/nft-3.jpg',
    audio: '/assets/audio/example3.mp3',
    tokenId: '100003',
    tokenURI: 'ipfs://Qm...',
    creator: '0x912d35Cc6634C0532925a3b844Bc454e4438f78a',
    owner: '0x912d35Cc6634C0532925a3b844Bc454e4438f78a',
    metadata: {
      bpm: 70,
      key: 'D major',
      tags: ['relaxation', 'peaceful', 'meditation']
    }
  },
  {
    id: '4',
    name: 'Urban Rhythms',
    description: 'A hip-hop inspired track with tight beats and melodic samples.',
    image: '/assets/images/nft-4.jpg',
    audio: '/assets/audio/example4.mp3',
    tokenId: '100004',
    tokenURI: 'ipfs://Qm...',
    creator: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    metadata: {
      bpm: 95,
      key: 'G minor',
      tags: ['hip-hop', 'urban', 'beats']
    }
  }
];

const MarketplacePage: NextPage = () => {
  const { address, connected } = useSelector((state: RootState) => state.wallet);
  const { connect } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{[key: string]: HTMLAudioElement}>({});
  const [filter, setFilter] = useState('all'); // 'all', 'owned', 'created'
  
  useEffect(() => {
    // In a real app, this would fetch NFTs from the blockchain
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNfts(MOCK_NFTS);
      setIsLoading(false);
    }, 1000);
    
    // Initialize audio elements
    const audioMap: {[key: string]: HTMLAudioElement} = {};
    MOCK_NFTS.forEach(nft => {
      if (nft.audio) {
        const audio = new Audio(nft.audio);
        audio.addEventListener('ended', () => {
          if (currentlyPlaying === nft.id) {
            setCurrentlyPlaying(null);
          }
        });
        audioMap[nft.id] = audio;
      }
    });
    setAudioElements(audioMap);
    
    return () => {
      // Clean up audio elements
      Object.values(audioMap).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);
  
  const handlePlay = (id: string) => {
    // Stop currently playing audio if any
    if (currentlyPlaying && audioElements[currentlyPlaying]) {
      audioElements[currentlyPlaying].pause();
    }
    
    // Play the selected audio
    if (audioElements[id]) {
      audioElements[id].play();
      setCurrentlyPlaying(id);
    }
  };
  
  const handlePause = (id: string) => {
    if (audioElements[id]) {
      audioElements[id].pause();
      setCurrentlyPlaying(null);
    }
  };
  
  const filteredNfts = () => {
    if (!connected || filter === 'all') return nfts;
    
    if (filter === 'owned') {
      return nfts.filter(nft => nft.owner.toLowerCase() === address?.toLowerCase());
    }
    
    if (filter === 'created') {
      return nfts.filter(nft => nft.creator.toLowerCase() === address?.toLowerCase());
    }
    
    return nfts;
  };
  
  return (
    <Container>
      <Header>
        <Title>Music NFT Marketplace</Title>
        <Description>
          Discover, collect, and trade unique music NFTs created by artists on Sing7
        </Description>
        
        <FilterBar>
          {connected ? (
            <>
              <FilterButton 
                active={filter === 'all'} 
                onClick={() => setFilter('all')}
              >
                All NFTs
              </FilterButton>
              <FilterButton 
                active={filter === 'owned'} 
                onClick={() => setFilter('owned')}
              >
                My Collection
              </FilterButton>
              <FilterButton 
                active={filter === 'created'} 
                onClick={() => setFilter('created')}
              >
                Created by Me
              </FilterButton>
            </>
          ) : (
            <ConnectButton onClick={connect}>
              Connect Wallet to View Your NFTs
            </ConnectButton>
          )}
        </FilterBar>
      </Header>
      
      {isLoading ? (
        <LoadingContainer>
          <div>Loading marketplace...</div>
        </LoadingContainer>
      ) : (
        <Grid>
          {filteredNfts().map(nft => (
            <Link href={`/marketplace/${nft.id}`} key={nft.id} passHref>
              <CardWrapper>
                <NFTCard 
                  nft={nft}
                  isPlaying={currentlyPlaying === nft.id}
                  onPlay={() => handlePlay(nft.id)}
                  onPause={() => handlePause(nft.id)}
                />
              </CardWrapper>
            </Link>
          ))}
          
          {filteredNfts().length === 0 && (
            <EmptyState>
              <EmptyStateMessage>
                {filter === 'owned' 
                  ? "You don't own any music NFTs yet. Browse the marketplace to find something you love."
                  : filter === 'created'
                  ? "You haven't created any music NFTs yet. Create music in the studio and mint it as an NFT."
                  : "No NFTs found. Check back later for new additions."}
              </EmptyStateMessage>
            </EmptyState>
          )}
        </Grid>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #FFFFFF;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  color: #E0E0E0;
  margin: 0 0 32px 0;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

interface FilterButtonProps {
  active: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  background-color: ${props => props.active ? '#BF5AF2' : '#2A2A2A'};
  color: ${props => props.active ? 'white' : '#E0E0E0'};
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#A347D1' : '#3A3A3A'};
  }
`;

const ConnectButton = styled.button`
  background-color: #BF5AF2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #A347D1;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
`;

const CardWrapper = styled.a`
  text-decoration: none;
  color: inherit;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 18px;
  color: #E0E0E0;
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: #1A1A1A;
  border-radius: 12px;
  padding: 24px;
`;

const EmptyStateMessage = styled.p`
  font-size: 18px;
  color: #9E9E9E;
  text-align: center;
  max-width: 600px;
`;

export default MarketplacePage; 