import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setPlaying } from '@/services/audioSlice';
import audioEngine from '@/lib/audio/audioEngine';

interface ChordMakerProps {
  className?: string;
}

// Define chord types
const CHORD_TYPES = [
  { id: 'major', name: 'Major', symbol: '' },
  { id: 'minor', name: 'Minor', symbol: 'm' },
  { id: 'seventh', name: '7th', symbol: '7' },
  { id: 'major7', name: 'Major 7th', symbol: 'maj7' },
  { id: 'minor7', name: 'Minor 7th', symbol: 'm7' },
  { id: 'sus4', name: 'Sus4', symbol: 'sus4' },
  { id: 'sus2', name: 'Sus2', symbol: 'sus2' },
  { id: 'dim', name: 'Diminished', symbol: 'dim' },
  { id: 'aug', name: 'Augmented', symbol: 'aug' },
  { id: 'sixth', name: '6th', symbol: '6' },
  { id: 'ninth', name: '9th', symbol: '9' },
  { id: 'add9', name: 'Add9', symbol: 'add9' },
];

// Define root notes
const ROOT_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Define common chord progressions
const COMMON_PROGRESSIONS = [
  { id: 'i-iv-v', name: 'I-IV-V', description: 'Classic progression', chords: ['C', 'F', 'G'] },
  { id: 'i-v-vi-iv', name: 'I-V-vi-IV', description: 'Pop progression', chords: ['C', 'G', 'Am', 'F'] },
  { id: 'ii-v-i', name: 'ii-V-I', description: 'Jazz progression', chords: ['Dm7', 'G7', 'Cmaj7'] },
  { id: 'vi-iv-i-v', name: 'vi-IV-I-V', description: 'Sad progression', chords: ['Am', 'F', 'C', 'G'] },
  { id: 'i-vi-iv-v', name: 'I-vi-IV-V', description: '50s progression', chords: ['C', 'Am', 'F', 'G'] },
  { id: 'i-iv-vi-v', name: 'I-IV-vi-V', description: 'Emotional progression', chords: ['C', 'F', 'Am', 'G'] },
];

// Helper function to get chord notes
const getChordNotes = (root: string, type: string): string[] => {
  const noteIndex = ROOT_NOTES.indexOf(root);
  if (noteIndex === -1) return [];
  
  switch (type) {
    case 'major':
      return [root, ROOT_NOTES[(noteIndex + 4) % 12], ROOT_NOTES[(noteIndex + 7) % 12]];
    case 'minor':
      return [root, ROOT_NOTES[(noteIndex + 3) % 12], ROOT_NOTES[(noteIndex + 7) % 12]];
    case 'seventh':
      return [root, ROOT_NOTES[(noteIndex + 4) % 12], ROOT_NOTES[(noteIndex + 7) % 12], ROOT_NOTES[(noteIndex + 10) % 12]];
    case 'major7':
      return [root, ROOT_NOTES[(noteIndex + 4) % 12], ROOT_NOTES[(noteIndex + 7) % 12], ROOT_NOTES[(noteIndex + 11) % 12]];
    case 'minor7':
      return [root, ROOT_NOTES[(noteIndex + 3) % 12], ROOT_NOTES[(noteIndex + 7) % 12], ROOT_NOTES[(noteIndex + 10) % 12]];
    case 'sus4':
      return [root, ROOT_NOTES[(noteIndex + 5) % 12], ROOT_NOTES[(noteIndex + 7) % 12]];
    case 'sus2':
      return [root, ROOT_NOTES[(noteIndex + 2) % 12], ROOT_NOTES[(noteIndex + 7) % 12]];
    case 'dim':
      return [root, ROOT_NOTES[(noteIndex + 3) % 12], ROOT_NOTES[(noteIndex + 6) % 12]];
    case 'aug':
      return [root, ROOT_NOTES[(noteIndex + 4) % 12], ROOT_NOTES[(noteIndex + 8) % 12]];
    case 'sixth':
      return [root, ROOT_NOTES[(noteIndex + 4) % 12], ROOT_NOTES[(noteIndex + 7) % 12], ROOT_NOTES[(noteIndex + 9) % 12]];
    case 'ninth':
      return [root, ROOT_NOTES[(noteIndex + 4) % 12], ROOT_NOTES[(noteIndex + 7) % 12], ROOT_NOTES[(noteIndex + 10) % 12], ROOT_NOTES[(noteIndex + 14) % 12]];
    case 'add9':
      return [root, ROOT_NOTES[(noteIndex + 4) % 12], ROOT_NOTES[(noteIndex + 7) % 12], ROOT_NOTES[(noteIndex + 14) % 12]];
    default:
      return [root];
  }
};

const ChordMaker: React.FC<ChordMakerProps> = ({ className }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.audio.isPlaying);
  
  const [selectedRoot, setSelectedRoot] = useState<string>('C');
  const [selectedType, setSelectedType] = useState<string>('major');
  const [chordProgression, setChordProgression] = useState<Array<{ root: string, type: string }>>([
    { root: 'C', type: 'major' },
    { root: 'G', type: 'major' },
    { root: 'A', type: 'minor' },
    { root: 'F', type: 'major' },
  ]);
  const [progressionName, setProgressionName] = useState<string>('My Progression');
  const [currentChordIndex, setCurrentChordIndex] = useState<number>(-1);
  const [tempo, setTempo] = useState<number>(120);

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
      
      // Schedule the chord progression
      const chordEvents = chordProgression.map((chord, index) => {
        const notes = getChordNotes(chord.root, chord.type);
        return {
          chord: notes,
          duration: '2n',
          time: `0:${index * 2}:0`
        };
      });
      
      audioEngine.scheduleChordProgression(chordEvents);
    }

    // Toggle playback state
    if (isPlaying) {
      audioEngine.stop();
      dispatch(setPlaying(false));
      setCurrentChordIndex(-1);
    } else {
      audioEngine.play();
      dispatch(setPlaying(true));
      setCurrentChordIndex(0);
      
      // Set up animation for current chord
      const interval = setInterval(() => {
        setCurrentChordIndex(prev => {
          const next = (prev + 1) % chordProgression.length;
          return next;
        });
      }, (60 / tempo) * 2 * 1000); // Each chord lasts 2 beats
      
      return () => clearInterval(interval);
    }
  };

  // Play a single chord
  const playChord = (root: string, type: string) => {
    const notes = getChordNotes(root, type);
    audioEngine.playChord(notes, '2n');
  };

  // Add chord to progression
  const addChord = () => {
    setChordProgression([...chordProgression, { root: selectedRoot, type: selectedType }]);
  };

  // Remove chord from progression
  const removeChord = (index: number) => {
    const newProgression = [...chordProgression];
    newProgression.splice(index, 1);
    setChordProgression(newProgression);
  };

  // Clear all chords
  const clearProgression = () => {
    setChordProgression([]);
  };

  // Load a preset chord progression
  const loadProgression = (id: string) => {
    const progression = COMMON_PROGRESSIONS.find(p => p.id === id);
    if (progression) {
      const newProgression = progression.chords.map(chordStr => {
        // Parse chord string (e.g., "Cmaj7" -> { root: "C", type: "major7" })
        const match = chordStr.match(/([A-G][#]?)(.+)?/);
        if (match) {
          const [_, root, suffix] = match;
          let type = 'major';
          
          if (suffix === 'm' || suffix === 'min') type = 'minor';
          else if (suffix === '7') type = 'seventh';
          else if (suffix === 'maj7') type = 'major7';
          else if (suffix === 'm7') type = 'minor7';
          else if (suffix === 'sus4') type = 'sus4';
          else if (suffix === 'sus2') type = 'sus2';
          else if (suffix === 'dim') type = 'dim';
          else if (suffix === 'aug') type = 'aug';
          else if (suffix === '6') type = 'sixth';
          else if (suffix === '9') type = 'ninth';
          else if (suffix === 'add9') type = 'add9';
          
          return { root, type };
        }
        return { root: 'C', type: 'major' };
      });
      
      setChordProgression(newProgression);
      setProgressionName(progression.name);
    }
  };

  // Handle progression name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgressionName(e.target.value);
  };

  // Handle tempo change
  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTempo = parseInt(e.target.value, 10);
    setTempo(newTempo);
    audioEngine.setBPM(newTempo);
  };

  return (
    <ChordMakerContainer className={className}>
      <LabHeader>
        <ToolTitle>Chord Maker</ToolTitle>
        <HeaderControls>
          <ProgressionTitleInput
            type="text"
            value={progressionName}
            onChange={handleNameChange}
            placeholder="Progression Name"
          />
          <TempoInput
            type="number"
            value={tempo}
            onChange={handleTempoChange}
            min={40}
            max={240}
            placeholder="BPM"
          />
        </HeaderControls>
      </LabHeader>

      <ChordSelector>
        <SelectorSection>
          <SectionTitle>Root Note</SectionTitle>
          <NoteGrid>
            {ROOT_NOTES.map(note => (
              <NoteButton
                key={note}
                isSelected={note === selectedRoot}
                onClick={() => setSelectedRoot(note)}
              >
                {note}
              </NoteButton>
            ))}
          </NoteGrid>
        </SelectorSection>

        <SelectorSection>
          <SectionTitle>Chord Type</SectionTitle>
          <ChordTypeGrid>
            {CHORD_TYPES.map(type => (
              <ChordTypeButton
                key={type.id}
                isSelected={type.id === selectedType}
                onClick={() => setSelectedType(type.id)}
              >
                {type.name}
              </ChordTypeButton>
            ))}
          </ChordTypeGrid>
        </SelectorSection>

        <ChordPreview>
          <PreviewLabel>Selected Chord:</PreviewLabel>
          <CurrentChord>
            {selectedRoot + CHORD_TYPES.find(t => t.id === selectedType)?.symbol}
          </CurrentChord>
          <PreviewButton 
            onClick={() => playChord(selectedRoot, selectedType)}
          >
            Play
          </PreviewButton>
          <AddButton onClick={addChord}>Add to Progression</AddButton>
        </ChordPreview>
      </ChordSelector>

      <ProgressionSection>
        <ProgressionHeader>
          <SectionTitle>Chord Progression</SectionTitle>
          <ClearButton onClick={clearProgression}>Clear</ClearButton>
        </ProgressionHeader>
        
        <ChordProgression>
          {chordProgression.length > 0 ? (
            chordProgression.map((chord, index) => (
              <ProgressionChord 
                key={index}
                isPlaying={index === currentChordIndex && isPlaying}
              >
                <ChordName>
                  {chord.root + CHORD_TYPES.find(t => t.id === chord.type)?.symbol}
                </ChordName>
                <ChordControls>
                  <ChordButton onClick={() => playChord(chord.root, chord.type)}>
                    Play
                  </ChordButton>
                  <ChordButton onClick={() => removeChord(index)}>
                    X
                  </ChordButton>
                </ChordControls>
              </ProgressionChord>
            ))
          ) : (
            <EmptyProgression>
              Add chords to create a progression
            </EmptyProgression>
          )}
        </ChordProgression>
      </ProgressionSection>

      <ControlBar>
        <PlayButton onClick={togglePlayback}>
          {isPlaying ? 'Stop' : 'Play Progression'}
        </PlayButton>
        <SaveButton>Save Progression</SaveButton>
      </ControlBar>

      <PresetSection>
        <SectionTitle>Common Progressions</SectionTitle>
        <PresetGrid>
          {COMMON_PROGRESSIONS.map(progression => (
            <PresetCard 
              key={progression.id}
              onClick={() => loadProgression(progression.id)}
            >
              <PresetName>{progression.name}</PresetName>
              <PresetDescription>{progression.description}</PresetDescription>
              <PresetChords>
                {progression.chords.join(' -> ')}
              </PresetChords>
            </PresetCard>
          ))}
        </PresetGrid>
      </PresetSection>

      <HelpSection>
        <HelpTitle>Chord Maker Help</HelpTitle>
        <HelpText>
          Create chord progressions by selecting a root note and chord type, then clicking "Add to Progression".
          Play individual chords or the entire progression. Choose from common progressions or create your own.
          Use the controls to adjust tempo and save your work.
        </HelpText>
      </HelpSection>
    </ChordMakerContainer>
  );
};

// Styled Components
const ChordMakerContainer = styled.div`
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
  color: #FF006E;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    margin-top: 12px;
    width: 100%;
  }
`;

const ProgressionTitleInput = styled.input`
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  width: 200px;
  
  &:focus {
    border-color: #FF006E;
    outline: none;
  }
`;

const TempoInput = styled.input`
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  width: 80px;
  
  &:focus {
    border-color: #FF006E;
    outline: none;
  }
`;

const ChordSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SelectorSection = styled.div`
  background-color: #1d1d1d;
  border-radius: 8px;
  padding: 16px;
`;

const SectionTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  margin: 0 0 12px 0;
  color: #FF006E;
`;

const NoteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

interface NoteButtonProps {
  isSelected: boolean;
}

const NoteButton = styled.button<NoteButtonProps>`
  background-color: ${props => props.isSelected ? '#FF006E' : '#2a2a2a'};
  color: ${props => props.isSelected ? 'white' : '#e1e1e1'};
  border: 1px solid ${props => props.isSelected ? '#FF006E' : '#444'};
  border-radius: 4px;
  padding: 8px 4px;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isSelected ? '#FF006E' : '#3a3a3a'};
  }
`;

const ChordTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

interface ChordTypeButtonProps {
  isSelected: boolean;
}

const ChordTypeButton = styled.button<ChordTypeButtonProps>`
  background-color: ${props => props.isSelected ? '#FF006E' : '#2a2a2a'};
  color: ${props => props.isSelected ? 'white' : '#e1e1e1'};
  border: 1px solid ${props => props.isSelected ? '#FF006E' : '#444'};
  border-radius: 4px;
  padding: 8px 4px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isSelected ? '#FF006E' : '#3a3a3a'};
  }
`;

const ChordPreview = styled.div`
  background-color: #1d1d1d;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
`;

const CurrentChord = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
`;

const PreviewButton = styled.button`
  background-color: #3A86FF;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 8px;
  width: 100%;
  
  &:hover {
    background-color: #2a76ef;
  }
`;

const AddButton = styled.button`
  background-color: #FF006E;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  
  &:hover {
    background-color: #d80057;
  }
`;

const ProgressionSection = styled.div`
  background-color: #1d1d1d;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

const ProgressionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ClearButton = styled.button`
  background-color: #444;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #555;
  }
`;

const ChordProgression = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 80px;
`;

interface ProgressionChordProps {
  isPlaying: boolean;
}

const ProgressionChord = styled.div<ProgressionChordProps>`
  background-color: ${props => props.isPlaying ? '#FF006E' : '#2a2a2a'};
  border-radius: 6px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s;
  transform: ${props => props.isPlaying ? 'scale(1.05)' : 'scale(1)'};
  box-shadow: ${props => props.isPlaying ? '0 0 12px rgba(255, 0, 110, 0.5)' : 'none'};
`;

const ChordName = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
`;

const ChordControls = styled.div`
  display: flex;
  gap: 8px;
`;

const ChordButton = styled.button`
  background-color: #3a3a3a;
  color: #ddd;
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #555;
  }
`;

const EmptyProgression = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-family: 'Inter', sans-serif;
  font-style: italic;
  border: 1px dashed #444;
  border-radius: 6px;
`;

const ControlBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
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
    background-color: #d80057;
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

const PresetSection = styled.div`
  margin-bottom: 24px;
`;

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const PresetCard = styled.div`
  background-color: #1d1d1d;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #333;
  
  &:hover {
    background-color: #2a2a2a;
    border-color: #FF006E;
  }
`;

const PresetName = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
`;

const PresetDescription = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #999;
  margin-bottom: 12px;
`;

const PresetChords = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  color: #FF006E;
`;

const HelpSection = styled.div`
  padding: 16px;
  background-color: #1d1d1d;
  border-radius: 6px;
  border-left: 4px solid #FF006E;
`;

const HelpTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #FF006E;
`;

const HelpText = styled.p`
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #bbb;
`;

export default ChordMaker; 