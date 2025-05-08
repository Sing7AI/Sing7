import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import audioEngine from '@/lib/audio/audioEngine';
import { setBpm } from '@/services/audioSlice';

const DRUM_TYPES = [
  { id: 'kick', name: 'Kick', color: '#FF006E' },
  { id: 'snare', name: 'Snare', color: '#3A86FF' },
  { id: 'hihat', name: 'Hi-Hat', color: '#8338EC' },
  { id: 'clap', name: 'Clap', color: '#FB5607' },
  { id: 'tom1', name: 'Tom 1', color: '#FFBE0B' },
  { id: 'tom2', name: 'Tom 2', color: '#06D6A0' },
  { id: 'ride', name: 'Ride', color: '#118AB2' },
  { id: 'crash', name: 'Crash', color: '#073B4C' },
  { id: 'perc1', name: 'Perc 1', color: '#7209B7' },
  { id: 'perc2', name: 'Perc 2', color: '#B5179E' },
  { id: 'rimshot', name: 'Rimshot', color: '#480CA8' },
  { id: 'shaker', name: 'Shaker', color: '#4CC9F0' },
];

const DEFAULT_STEPS = 16;
const DEFAULT_PATTERNS: Record<string, boolean[]> = {};
DRUM_TYPES.forEach(drum => {
  DEFAULT_PATTERNS[drum.id] = Array(DEFAULT_STEPS).fill(false);
});

interface RhythmGridProps {
  onPatternChange?: (patterns: Record<string, boolean[]>) => void;
}

const RhythmGrid: React.FC<RhythmGridProps> = ({ onPatternChange }) => {
  const dispatch = useDispatch();
  const currentBpm = useSelector((state: RootState) => state.audio.currentBpm);
  const isPlaying = useSelector((state: RootState) => state.audio.isPlaying);
  
  const [patterns, setPatterns] = useState<Record<string, boolean[]>>(DEFAULT_PATTERNS);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [subdivision, setSubdivision] = useState<string>('16n');
  const [bpm, setBpmState] = useState<number>(currentBpm);

  // Initialize samples (in a real app, these would be loaded from a CDN or local assets)
  useEffect(() => {
    const loadSamples = async () => {
      try {
        // These URLs would be replaced with actual sample URLs
        await audioEngine.loadRhythmSample('kick', '/samples/kick.wav');
        await audioEngine.loadRhythmSample('snare', '/samples/snare.wav');
        await audioEngine.loadRhythmSample('hihat', '/samples/hihat.wav');
        // Load other samples...
      } catch (error) {
        console.error('Failed to load rhythm samples:', error);
      }
    };

    loadSamples();
  }, []);

  // Update BPM when changed
  useEffect(() => {
    audioEngine.setBPM(bpm);
    dispatch(setBpm(bpm));
  }, [bpm, dispatch]);

  // Update step counter animation when playing
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      const stepTime = (60 / bpm) * (4 / DEFAULT_STEPS) * 1000;
      intervalId = setInterval(() => {
        setCurrentStep(step => (step + 1) % DEFAULT_STEPS);
      }, stepTime);
    } else {
      setCurrentStep(-1);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, bpm]);

  // Schedule patterns when they change
  useEffect(() => {
    if (onPatternChange) {
      onPatternChange(patterns);
    }

    // Schedule each drum pattern
    Object.entries(patterns).forEach(([drumId, pattern]) => {
      audioEngine.scheduleRhythmPattern(drumId, pattern, subdivision);
    });
  }, [patterns, subdivision, onPatternChange]);

  // Toggle a cell in the grid
  const toggleCell = (drumId: string, step: number) => {
    setPatterns(prevPatterns => {
      const newPatterns = {
        ...prevPatterns,
        [drumId]: [...prevPatterns[drumId]],
      };
      newPatterns[drumId][step] = !newPatterns[drumId][step];
      return newPatterns;
    });
  };

  // Handle BPM change
  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBpm = parseInt(event.target.value, 10);
    setBpmState(newBpm);
  };

  // Clear all patterns
  const clearPatterns = () => {
    const emptyPatterns: Record<string, boolean[]> = {};
    DRUM_TYPES.forEach(drum => {
      emptyPatterns[drum.id] = Array(DEFAULT_STEPS).fill(false);
    });
    setPatterns(emptyPatterns);
  };

  // Random patterns generator
  const generateRandomPatterns = () => {
    const randomPatterns: Record<string, boolean[]> = {};
    DRUM_TYPES.forEach(drum => {
      randomPatterns[drum.id] = Array(DEFAULT_STEPS).fill(false).map(() => Math.random() > 0.75);
    });
    setPatterns(randomPatterns);
  };

  return (
    <RhythmGridContainer>
      <ControlsSection>
        <ControlGroup>
          <label htmlFor="bpm">BPM:</label>
          <BpmInput
            type="number"
            id="bpm"
            value={bpm}
            onChange={handleBpmChange}
            min={40}
            max={240}
          />
        </ControlGroup>
        <ControlGroup>
          <SubdivisionSelect
            value={subdivision}
            onChange={(e) => setSubdivision(e.target.value)}
          >
            <option value="4n">Quarter Notes</option>
            <option value="8n">Eighth Notes</option>
            <option value="16n">Sixteenth Notes</option>
            <option value="32n">Thirty-Second Notes</option>
            <option value="8t">Eighth Triplets</option>
            <option value="16t">Sixteenth Triplets</option>
          </SubdivisionSelect>
        </ControlGroup>
        <ButtonGroup>
          <PatternButton onClick={clearPatterns}>Clear</PatternButton>
          <PatternButton onClick={generateRandomPatterns}>Random</PatternButton>
        </ButtonGroup>
      </ControlsSection>

      <GridSection>
        <DrumLabels>
          {DRUM_TYPES.map(drum => (
            <DrumLabel key={drum.id} color={drum.color}>
              {drum.name}
            </DrumLabel>
          ))}
        </DrumLabels>

        <Grid>
          {DRUM_TYPES.map(drum => (
            <GridRow key={drum.id}>
              {patterns[drum.id].map((isActive, step) => (
                <GridCell
                  key={`${drum.id}-${step}`}
                  isActive={isActive}
                  isCurrentStep={step === currentStep}
                  color={drum.color}
                  onClick={() => toggleCell(drum.id, step)}
                />
              ))}
            </GridRow>
          ))}
        </Grid>
      </GridSection>
    </RhythmGridContainer>
  );
};

// Styled components
const RhythmGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 24px;
`;

const ControlsSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px;
  background-color: #2a2a2a;
  border-radius: 6px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  margin-bottom: 8px;

  label {
    margin-right: 8px;
    font-weight: 500;
    color: #e1e1e1;
  }

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const BpmInput = styled.input`
  width: 60px;
  background-color: #3a3a3a;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  color: #fff;
  font-family: 'Roboto Mono', monospace;
`;

const SubdivisionSelect = styled.select`
  background-color: #3a3a3a;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const PatternButton = styled.button`
  background-color: #3A86FF;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a76ef;
  }
`;

const GridSection = styled.div`
  display: flex;
`;

const DrumLabels = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
`;

const DrumLabel = styled.div<{ color: string }>`
  height: 40px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 500;
  background-color: ${props => props.color};
  border-radius: 4px;
  margin-bottom: 4px;
  font-size: 14px;
  width: 80px;
  text-align: center;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const GridRow = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

interface GridCellProps {
  isActive: boolean;
  isCurrentStep: boolean;
  color: string;
}

const GridCell = styled.div<GridCellProps>`
  width: 40px;
  height: 40px;
  background-color: ${props => (props.isActive ? props.color : '#2a2a2a')};
  border: 1px solid #333;
  margin-right: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.1s;
  box-shadow: ${props => (props.isActive ? `0 0 8px ${props.color}` : 'none')};
  opacity: ${props => (props.isCurrentStep && !props.isActive ? 0.7 : 1)};
  transform: ${props => (props.isCurrentStep ? 'scale(1.05)' : 'scale(1)')};

  &:hover {
    background-color: ${props => (props.isActive ? props.color : '#3a3a3a')};
  }
`;

export default RhythmGrid; 