import React from 'react';
import styled from 'styled-components';
import { NFT } from '../../store/slices/userSlice';

interface NFTCardProps {
  nft: NFT;
  onClick?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  isPlaying?: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ 
  nft, 
  onClick, 
  onPlay, 
  onPause, 
  isPlaying = false 
}) => {
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Card onClick={onClick}>
      <CardImageContainer>
        <CardImage src={nft.image || '/assets/images/default-nft.png'} alt={nft.name} />
        <PlayButton 
          onClick={(e) => {
            e.stopPropagation();
            isPlaying ? onPause && onPause() : onPlay && onPlay();
          }}
        >
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
        </PlayButton>
      </CardImageContainer>
      
      <CardContent>
        <CardTitle>{nft.name}</CardTitle>
        <CardCreator>
          Created by <CreatorAddress>{truncateAddress(nft.creator)}</CreatorAddress>
        </CardCreator>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  background-color: #1E1E1E;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  overflow: hidden;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #FFFFFF;
`;

const CardCreator = styled.p`
  font-size: 14px;
  color: #9E9E9E;
  margin: 0;
`;

const CreatorAddress = styled.span`
  color: #BF5AF2;
  font-weight: 500;
`;

export default NFTCard; 