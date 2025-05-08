import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useWallet } from '../../hooks/useWallet';
import { AudioEngine } from '../../lib/audio/audioEngine';

// Mock function that would fetch an NFT by ID from an API or blockchain
const fetchNFTById = async (id: string) => {
  // In a real app, this would call a backend API or directly interact with the blockchain
  return {
    id,
    name: 'Cosmic Harmony',
    description: 'An ethereal melody inspired by the cosmos, featuring ambient pads and spatial percussion.',
    image: '/assets/images/nft-example.jpg',
    audio: '/assets/audio/example.mp3',
    tokenId: '123456',
    tokenURI: 'ipfs://QmXyZ...',
    creator: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    price: '0.5',
    currency: 'ETH',
    royaltyPercentage: 10,
    createdAt: '2023-04-15T12:00:00Z',
    metadata: {
      bpm: 120,
      key: 'C minor',
      tags: ['ambient', 'electronic', 'spatial'],
      duration: '3:42'
    }
  };
};

const NFTDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { address, connected } = useSelector((state: RootState) => state.wallet);
  const { connect } = useWallet();
  
  const [nft, setNft] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchNFTById(id as string)
        .then(data => {
          setNft(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching NFT:', error);
          setIsLoading(false);
        });
    }
  }, [id]);
  
  useEffect(() => {
    if (nft?.audio) {
      const audio = new Audio(nft.audio);
      setAudioPlayer(audio);
      
      audio.addEventListener('ended', () => setIsPlaying(false));
      
      return () => {
        audio.pause();
        audio.src = '';
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, [nft]);
  
  const togglePlay = () => {
    if (!audioPlayer) return;
    
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleBuy = async () => {
    if (!connected) {
      connect();
      return;
    }
    
    // In a real app, this would initiate a purchase transaction
    alert('Purchase functionality would be implemented here in a complete app');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  if (isLoading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }
  
  if (!nft) {
    return (
      <Container>
        <div>NFT not found</div>
      </Container>
    );
  }
  
  return (
    <Container>
      <LeftColumn>
        <NFTImage src={nft.image} alt={nft.name} />
        <PlayButton onClick={togglePlay}>
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="4" height="16" rx="1" fill="white"/>
              <rect x="14" y="4" width="4" height="16" rx="1" fill="white"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4.75L17.5 12L6 19.25V4.75Z" fill="white"/>
            </svg>
          )}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </PlayButton>
      </LeftColumn>
      
      <RightColumn>
        <Title>{nft.name}</Title>
        <Creator>
          Created by <CreatorAddress>{truncateAddress(nft.creator)}</CreatorAddress> on {formatDate(nft.createdAt)}
        </Creator>
        
        <Description>{nft.description}</Description>
        
        <MetadataSection>
          <MetadataTitle>Music Details</MetadataTitle>
          <MetadataGrid>
            <MetadataItem>
              <MetadataLabel>BPM</MetadataLabel>
              <MetadataValue>{nft.metadata.bpm}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Key</MetadataLabel>
              <MetadataValue>{nft.metadata.key}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Duration</MetadataLabel>
              <MetadataValue>{nft.metadata.duration}</MetadataValue>
            </MetadataItem>
          </MetadataGrid>
          
          <TagsContainer>
            {nft.metadata.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsContainer>
        </MetadataSection>
        
        <PriceContainer>
          <Price>{nft.price} {nft.currency}</Price>
          <RoyaltyInfo>Creator royalty: {nft.royaltyPercentage}%</RoyaltyInfo>
        </PriceContainer>
        
        <ButtonsContainer>
          <BuyButton onClick={handleBuy}>
            {connected ? 'Buy Now' : 'Connect Wallet to Buy'}
          </BuyButton>
        </ButtonsContainer>
        
        <TokenInfo>
          <TokenInfoItem>
            <TokenInfoLabel>Token ID:</TokenInfoLabel>
            <TokenInfoValue>{nft.tokenId}</TokenInfoValue>
          </TokenInfoItem>
          <TokenInfoItem>
            <TokenInfoLabel>Token Standard:</TokenInfoLabel>
            <TokenInfoValue>ERC-721</TokenInfoValue>
          </TokenInfoItem>
          <TokenInfoItem>
            <TokenInfoLabel>Blockchain:</TokenInfoLabel>
            <TokenInfoValue>Ethereum</TokenInfoValue>
          </TokenInfoItem>
        </TokenInfo>
      </RightColumn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 48px;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  position: relative;
  margin-bottom: 32px;
  
  @media (min-width: 1024px) {
    margin-bottom: 0;
  }
`;

const RightColumn = styled.div`
  flex: 1;
`;

const NFTImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  background-color: #1A1A1A;
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #BF5AF2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 16px;
  width: 100%;
  
  &:hover {
    background-color: #A347D1;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #FFFFFF;
`;

const Creator = styled.p`
  font-size: 16px;
  color: #9E9E9E;
  margin: 0 0 24px 0;
`;

const CreatorAddress = styled.span`
  color: #BF5AF2;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #E0E0E0;
  margin: 0 0 32px 0;
`;

const MetadataSection = styled.section`
  background-color: #1A1A1A;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
`;

const MetadataTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #FFFFFF;
`;

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetadataLabel = styled.span`
  font-size: 14px;
  color: #9E9E9E;
  margin-bottom: 4px;
`;

const MetadataValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background-color: #2A2A2A;
  color: #E0E0E0;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 14px;
`;

const PriceContainer = styled.div`
  margin-bottom: 24px;
`;

const Price = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 8px;
`;

const RoyaltyInfo = styled.div`
  font-size: 14px;
  color: #9E9E9E;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

const BuyButton = styled.button`
  background-color: #BF5AF2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;
  
  &:hover {
    background-color: #A347D1;
  }
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #1A1A1A;
  border-radius: 12px;
  padding: 16px;
`;

const TokenInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TokenInfoLabel = styled.span`
  font-size: 14px;
  color: #9E9E9E;
`;

const TokenInfoValue = styled.span`
  font-size: 14px;
  color: #FFFFFF;
`;

export default NFTDetailPage; 