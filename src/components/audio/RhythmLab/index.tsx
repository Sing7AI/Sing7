import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setPlaying } from '@/services/audioSlice';
import audioEngine from '@/lib/audio/audioEngine';
import RhythmGrid from './RhythmGrid';

interface RhythmLabProps {
  className?: string;
}

const RhythmLab: React.FC<RhythmLabProps> = ({ className }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.audio.isPlaying);
  const [sectionTitle, setSectionTitle] = useState<string>('My Rhythm Pattern');
  const [patternLength, setPatternLength] = useState<number>(1);

  // Initialize audio engine on first user interaction
  const initializeAudio = async () => {
    try {
      await audioEngine.initialize();
    } catch (error) {
      console.error('Failed to initialize audio engine:', error);
    }
  };

  // Toggle play/stop
  const togglePlayback = async () => {
    // Ensure audio engine is initialized
    if (!isPlaying) {
      await initializeAudio();
    }

    // Toggle playback state
    if (isPlaying) {
      audioEngine.stop();
      dispatch(setPlaying(false));
    } else {
      audioEngine.play();
      dispatch(setPlaying(true));
    }
  };

  // Handle pattern change from RhythmGrid
  const handlePatternChange = (patterns: Record<string, boolean[]>) => {
    // Process patterns or store them if needed
    console.log('Pattern changed:', patterns);
  };

  // Handle section title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSectionTitle(e.target.value);
  };

  // Handle pattern length change
  const handleLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPatternLength(parseInt(e.target.value, 10));
  };

  return (
    <RhythmLabContainer className={className}>
      <LabHeader>
        <ToolTitle>Rhythm Lab</ToolTitle>
        <HeaderControls>
          <SectionTitleInput
            type="text"
            value={sectionTitle}
            onChange={handleTitleChange}
            placeholder="Section Title"
          />
          <PatternLengthSelect
            value={patternLength}
            onChange={handleLengthChange}
          >
            <option value={1}>1 bar</option>
            <option value={2}>2 bars</option>
            <option value={4}>4 bars</option>
            <option value={8}>8 bars</option>
          </PatternLengthSelect>
        </HeaderControls>
      </LabHeader>

      <RhythmGrid onPatternChange={handlePatternChange} />

      <ControlBar>
        <PlayButton onClick={togglePlayback}>
          {isPlaying ? 'Stop' : 'Play'}
        </PlayButton>
        <SaveButton>Save Pattern</SaveButton>
      </ControlBar>

      <HelpSection>
        <HelpTitle>Rhythm Lab Help</HelpTitle>
        <HelpText>
          Click on the grid cells to activate or deactivate drum hits. Use the controls above to
          adjust the tempo (BPM) and subdivision. Play your pattern with the Play button below.
          Create multiple patterns and arrange them to build your complete rhythm section.
        </HelpText>
      </HelpSection>
    </RhythmLabContainer>
  );
};

// Styled Components
const RhythmLabContainer = styled.div`
  background-color: #121212;
  border-radius: 10px;
  padding: 20px;
  color: #e1e1e1;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
`;

const LabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ToolTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  margin: 0;
  color: #3A86FF;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    margin-top: 12px;
    width: 100%;
  }
`;

const SectionTitleInput = styled.input`
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  width: 200px;
  
  &:focus {
    border-color: #3A86FF;
    outline: none;
  }
`;

const PatternLengthSelect = styled.select`
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    border-color: #3A86FF;
    outline: none;
  }
`;

const ControlBar = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const PlayButton = styled.button`
  background-color: #FF006E;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e0005e;
  }
`;

const SaveButton = styled.button`
  background-color: #8338EC;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #7328dc;
  }
`;

const HelpSection = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #1d1d1d;
  border-radius: 6px;
  border-left: 4px solid #3A86FF;
`;

const HelpTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #3A86FF;
`;

const HelpText = styled.p`
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #bbb;
`;

export default RhythmLab; 