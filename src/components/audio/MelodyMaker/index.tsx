import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setPlaying } from '@/services/audioSlice';
import audioEngine from '@/lib/audio/audioEngine';
import PianoRoll from './PianoRoll';

interface MelodyMakerProps {
  className?: string;
}

const MelodyMaker: React.FC<MelodyMakerProps> = ({ className }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.audio.isPlaying);
  
  const [selectedScale, setSelectedScale] = useState<string>('C Major');
  const [melodyTitle, setMelodyTitle] = useState<string>('My Melody');

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

  // Handle melody change
  const handleMelodyChange = (notes: any) => {
    // Process the notes if needed
    console.log('Melody notes updated:', notes);
  };

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMelodyTitle(e.target.value);
  };

  // Handle scale change
  const handleScaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedScale(e.target.value);
  };

  return (
    <MelodyMakerContainer className={className}>
      <LabHeader>
        <ToolTitle>Melody Maker</ToolTitle>
        <HeaderControls>
          <MelodyTitleInput
            type="text"
            value={melodyTitle}
            onChange={handleTitleChange}
            placeholder="Melody Title"
          />
          <ScaleSelect value={selectedScale} onChange={handleScaleChange}>
            <option value="C Major">C Major</option>
            <option value="C Minor">C Minor</option>
            <option value="G Major">G Major</option>
            <option value="F Major">F Major</option>
            <option value="D Minor">D Minor</option>
            <option value="A Minor">A Minor</option>
          </ScaleSelect>
        </HeaderControls>
      </LabHeader>

      <ScaleInfo>
        <ScaleTitle>Scale: {selectedScale}</ScaleTitle>
        <ScaleNotes>
          {/* Display the notes of the selected scale here */}
          {selectedScale === 'C Major' && 'C - D - E - F - G - A - B'}
          {selectedScale === 'C Minor' && 'C - D - Eb - F - G - Ab - Bb'}
          {selectedScale === 'G Major' && 'G - A - B - C - D - E - F#'}
          {selectedScale === 'F Major' && 'F - G - A - Bb - C - D - E'}
          {selectedScale === 'D Minor' && 'D - E - F - G - A - Bb - C'}
          {selectedScale === 'A Minor' && 'A - B - C - D - E - F - G'}
        </ScaleNotes>
      </ScaleInfo>

      <PianoRoll
        scale={selectedScale as any}
        onChange={handleMelodyChange}
      />

      <ControlBar>
        <PlayButton onClick={togglePlayback}>
          {isPlaying ? 'Stop' : 'Play'}
        </PlayButton>
        <SaveButton>Save Melody</SaveButton>
        <ClearButton>Clear</ClearButton>
      </ControlBar>

      <ChordSuggestions>
        <SuggestionTitle>Chord Suggestions</SuggestionTitle>
        <SuggestionList>
          <SuggestionItem>
            <SuggestionButton>Cmaj7</SuggestionButton>
          </SuggestionItem>
          <SuggestionItem>
            <SuggestionButton>Dm7</SuggestionButton>
          </SuggestionItem>
          <SuggestionItem>
            <SuggestionButton>G7</SuggestionButton>
          </SuggestionItem>
          <SuggestionItem>
            <SuggestionButton>Fmaj7</SuggestionButton>
          </SuggestionItem>
        </SuggestionList>
      </ChordSuggestions>

      <HelpSection>
        <HelpTitle>Melody Maker Help</HelpTitle>
        <HelpText>
          Create melodies by clicking or dragging on the piano roll grid.
          Higher notes are at the top, and time flows from left to right.
          Change the note duration and velocity using the controls above the grid.
          Play your melody with the Play button below.
        </HelpText>
      </HelpSection>
    </MelodyMakerContainer>
  );
};

// Styled Components
const MelodyMakerContainer = styled.div`
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
  color: #8338EC;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    margin-top: 12px;
    width: 100%;
  }
`;

const MelodyTitleInput = styled.input`
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  width: 200px;
  
  &:focus {
    border-color: #8338EC;
    outline: none;
  }
`;

const ScaleSelect = styled.select`
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    border-color: #8338EC;
    outline: none;
  }
`;

const ScaleInfo = styled.div`
  margin-bottom: 16px;
  padding: 10px 14px;
  background-color: #2a2a2a;
  border-radius: 6px;
  border-left: 4px solid #8338EC;
`;

const ScaleTitle = styled.h4`
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #8338EC;
`;

const ScaleNotes = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  color: #bbb;
`;

const ControlBar = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const PlayButton = styled.button`
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

const SaveButton = styled.button`
  background-color: #3A86FF;
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
    background-color: #2a76ef;
  }
`;

const ClearButton = styled.button`
  background-color: #333;
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
    background-color: #444;
  }
`;

const ChordSuggestions = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #1d1d1d;
  border-radius: 6px;
`;

const SuggestionTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #8338EC;
`;

const SuggestionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SuggestionItem = styled.li`
  margin: 0;
  padding: 0;
`;

const SuggestionButton = styled.button`
  background-color: #2a2a2a;
  color: #ddd;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 6px 12px;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #8338EC;
    color: white;
    border-color: #8338EC;
  }
`;

const HelpSection = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #1d1d1d;
  border-radius: 6px;
  border-left: 4px solid #8338EC;
`;

const HelpTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #8338EC;
`;

const HelpText = styled.p`
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #bbb;
`;

export default MelodyMaker; 