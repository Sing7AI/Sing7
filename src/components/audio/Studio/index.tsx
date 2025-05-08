import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import RhythmLab from '../RhythmLab';
import MelodyMaker from '../MelodyMaker';
import ChordMaker from '../ChordMaker';

interface StudioProps {
  className?: string;
}

type ToolType = 'rhythm' | 'melody' | 'chord' | 'mixer';

const Studio: React.FC<StudioProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<ToolType>('rhythm');
  const [projectName, setProjectName] = useState<string>('New Project');

  // Handle project name change
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  // Render active tool
  const renderActiveTool = () => {
    switch (activeTab) {
      case 'rhythm':
        return <RhythmLab />;
      case 'melody':
        return <MelodyMaker />;
      case 'chord':
        return <ChordMaker />;
      case 'mixer':
        return <MixerPlaceholder />;
      default:
        return <RhythmLab />;
    }
  };

  return (
    <StudioContainer className={className}>
      <StudioHeader>
        <ProjectInfo>
          <ProjectTitle>
            <ProjectIcon>🎵</ProjectIcon>
            <ProjectNameInput
              type="text"
              value={projectName}
              onChange={handleProjectNameChange}
              placeholder="Project Name"
            />
          </ProjectTitle>
          <ProjectActions>
            <ActionButton>Export</ActionButton>
            <ActionButton>Share</ActionButton>
            <ActionButton>Save</ActionButton>
          </ProjectActions>
        </ProjectInfo>
        
        <TabNavigation>
          <TabButton 
            isActive={activeTab === 'rhythm'} 
            onClick={() => setActiveTab('rhythm')}
          >
            <TabIcon>🥁</TabIcon>
            <TabLabel>Rhythm</TabLabel>
          </TabButton>
          <TabButton 
            isActive={activeTab === 'melody'} 
            onClick={() => setActiveTab('melody')}
          >
            <TabIcon>🎹</TabIcon>
            <TabLabel>Melody</TabLabel>
          </TabButton>
          <TabButton 
            isActive={activeTab === 'chord'} 
            onClick={() => setActiveTab('chord')}
          >
            <TabIcon>🎸</TabIcon>
            <TabLabel>Chords</TabLabel>
          </TabButton>
          <TabButton 
            isActive={activeTab === 'mixer'} 
            onClick={() => setActiveTab('mixer')}
          >
            <TabIcon>🎚️</TabIcon>
            <TabLabel>Mixer</TabLabel>
          </TabButton>
        </TabNavigation>
      </StudioHeader>

      <ToolContainer>
        {renderActiveTool()}
      </ToolContainer>

      <StudioFooter>
        <FooterText>Made with <FooterHeart>&hearts;</FooterHeart> by Sing7</FooterText>
        <FooterVersion>v0.1.0</FooterVersion>
      </StudioFooter>
    </StudioContainer>
  );
};

// Placeholder for Mixer component which will be implemented later
const MixerPlaceholder: React.FC = () => (
  <PlaceholderContainer>
    <PlaceholderIcon>🎚️</PlaceholderIcon>
    <PlaceholderTitle>Mixer Coming Soon</PlaceholderTitle>
    <PlaceholderText>
      The audio mixer functionality is under development. 
      Here you'll be able to adjust volumes, panning, and effects for each track.
    </PlaceholderText>
  </PlaceholderContainer>
);

// Styled Components
const StudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #0c0c0c;
  color: #e1e1e1;
`;

const StudioHeader = styled.header`
  background-color: #121212;
  padding: 16px 24px;
  border-bottom: 1px solid #333;
`;

const ProjectInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ProjectTitle = styled.div`
  display: flex;
  align-items: center;
`;

const ProjectIcon = styled.div`
  font-size: 24px;
  margin-right: 12px;
`;

const ProjectNameInput = styled.input`
  background-color: transparent;
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  
  &:focus {
    outline: none;
    border-bottom: 2px solid #8338EC;
  }
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background-color: #2a2a2a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

const TabNavigation = styled.div`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #333;
`;

interface TabButtonProps {
  isActive: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  display: flex;
  align-items: center;
  background-color: ${props => props.isActive ? '#1d1d1d' : 'transparent'};
  color: ${props => props.isActive ? '#fff' : '#999'};
  border: none;
  border-bottom: 3px solid ${props => props.isActive ? '#8338EC' : 'transparent'};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 12px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isActive ? '#1d1d1d' : '#151515'};
    color: #fff;
  }
`;

const TabIcon = styled.span`
  font-size: 18px;
  margin-right: 8px;
`;

const TabLabel = styled.span``;

const ToolContainer = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const StudioFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: #121212;
  border-top: 1px solid #333;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #777;
`;

const FooterText = styled.div`
  display: flex;
  align-items: center;
`;

const FooterHeart = styled.span`
  margin: 0 4px;
`;

const FooterVersion = styled.div``;

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 60px 24px;
  text-align: center;
`;

const PlaceholderIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.7;
`;

const PlaceholderTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 28px;
  margin: 0 0 16px 0;
  color: #8338EC;
`;

const PlaceholderText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #999;
  max-width: 500px;
`;

export default Studio; 