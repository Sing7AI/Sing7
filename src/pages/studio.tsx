import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { useWallet } from '@/hooks/useWallet';

// Studio page component
const StudioPage = () => {
  const { connected, connect } = useWallet();
  const [activeTab, setActiveTab] = useState<'rhythm' | 'melody' | 'chord' | 'studio'>('rhythm');

  // Render different components based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'rhythm':
        return <TabContent>Rhythm Lab component will be here</TabContent>;
      case 'melody':
        return <TabContent>Melody Maker component will be here</TabContent>;
      case 'chord':
        return <TabContent>Chord Maker component will be here</TabContent>;
      case 'studio':
        return <TabContent>Studio component will be here</TabContent>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Sing7 Studio | Create Music</title>
        <meta name="description" content="Create and mint music with Sing7's Web3 music creation tools" />
      </Head>
      
      <StudioContainer>
        {!connected ? (
          <ConnectPrompt>
            <ConnectTitle>Connect your wallet to access the studio</ConnectTitle>
            <ConnectDescription>
              You need to connect your wallet to use the Sing7 studio and save your creations as NFTs.
            </ConnectDescription>
            <ConnectButton onClick={connect}>Connect Wallet</ConnectButton>
          </ConnectPrompt>
        ) : (
          <>
            <StudioHeader>
              <StudioTitle>Sing7 Studio</StudioTitle>
              <ProjectInfo>
                <ProjectName>Untitled Project</ProjectName>
                <ProjectStatus>Not saved</ProjectStatus>
              </ProjectInfo>
              <Controls>
                <ControlButton>Save</ControlButton>
                <ControlButton>Export</ControlButton>
                <ControlButton primary>Mint as NFT</ControlButton>
              </Controls>
            </StudioHeader>
            
            <TabBar>
              <Tab 
                active={activeTab === 'rhythm'} 
                onClick={() => setActiveTab('rhythm')}
              >
                Rhythm Lab
              </Tab>
              <Tab 
                active={activeTab === 'melody'} 
                onClick={() => setActiveTab('melody')}
              >
                Melody Maker
              </Tab>
              <Tab 
                active={activeTab === 'chord'} 
                onClick={() => setActiveTab('chord')}
              >
                Chord Maker
              </Tab>
              <Tab 
                active={activeTab === 'studio'} 
                onClick={() => setActiveTab('studio')}
              >
                Studio
              </Tab>
            </TabBar>
            
            {renderContent()}
          </>
        )}
      </StudioContainer>
    </Layout>
  );
};

// Styled components
const StudioContainer = styled.div`
  padding: 2rem;
  min-height: calc(100vh - 60px);
`;

const ConnectPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: rgba(35, 35, 75, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(156, 122, 247, 0.1);
  text-align: center;
  max-width: 500px;
  margin: 5rem auto;
`;

const ConnectTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: white;
`;

const ConnectDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #c2c2e9;
`;

const ConnectButton = styled.button`
  padding: 0.75rem 2rem;
  background: linear-gradient(90deg, #9c7af7 0%, #57b9f8 100%);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(156, 122, 247, 0.3);
  }
`;

const StudioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const StudioTitle = styled.h1`
  font-size: 2rem;
  background: linear-gradient(90deg, #9c7af7 0%, #57b9f8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectName = styled.h3`
  font-size: 1.25rem;
  color: white;
  margin-bottom: 0.25rem;
`;

const ProjectStatus = styled.p`
  font-size: 0.875rem;
  color: #c2c2e9;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const ControlButton = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1.25rem;
  background: ${props => props.primary 
    ? 'linear-gradient(90deg, #9c7af7 0%, #57b9f8 100%)' 
    : 'transparent'};
  color: white;
  font-weight: 500;
  border: ${props => props.primary 
    ? 'none' 
    : '1px solid rgba(156, 122, 247, 0.6)'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary 
      ? 'linear-gradient(90deg, #9c7af7 0%, #57b9f8 100%)' 
      : 'rgba(156, 122, 247, 0.1)'};
    transform: translateY(-2px);
  }
`;

const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(156, 122, 247, 0.2);
  margin-bottom: 2rem;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: ${props => props.active ? '#9c7af7' : '#c2c2e9'};
  font-weight: 500;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#9c7af7' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: #9c7af7;
  }
`;

const TabContent = styled.div`
  padding: 1rem 0;
  min-height: 60vh;
`;

export default StudioPage; 