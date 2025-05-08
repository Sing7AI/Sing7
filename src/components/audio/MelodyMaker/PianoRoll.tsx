import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import audioEngine from '@/lib/audio/audioEngine';

// Define musical scales
const SCALES = {
  'C Major': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'C Minor': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
  'G Major': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'F Major': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'D Minor': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
  'A Minor': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
};

// Define all notes in 5 octaves (C2-C7)
const ALL_NOTES = [
  'C7', 'B6', 'A#6', 'A6', 'G#6', 'G6', 'F#6', 'F6', 'E6', 'D#6', 'D6', 'C#6',
  'C6', 'B5', 'A#5', 'A5', 'G#5', 'G5', 'F#5', 'F5', 'E5', 'D#5', 'D5', 'C#5',
  'C5', 'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4',
  'C4', 'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3',
  'C3', 'B2', 'A#2', 'A2', 'G#2', 'G2', 'F#2', 'F2', 'E2', 'D#2', 'D2', 'C#2', 'C2',
];

// Define note durations
const NOTE_DURATIONS = {
  '1/1': '1n', // whole note
  '1/2': '2n', // half note
  '1/4': '4n', // quarter note
  '1/8': '8n', // eighth note
  '1/16': '16n', // sixteenth note
  '1/32': '32n', // thirty-second note
};

const GRID_COLUMNS = 32; // Number of columns (time steps)

interface Note {
  id: string;
  note: string;
  time: string;
  duration: string;
  velocity: number;
  column: number;
  row: number;
}

interface PianoRollProps {
  scale?: keyof typeof SCALES;
  onChange?: (notes: Note[]) => void;
}

const PianoRoll: React.FC<PianoRollProps> = ({ 
  scale = 'C Major',
  onChange 
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isPlaying = useSelector((state: RootState) => state.audio.isPlaying);
  const currentBpm = useSelector((state: RootState) => state.audio.currentBpm);
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<string>('');
  const [currentDuration, setCurrentDuration] = useState<string>('1/4');
  const [currentVelocity, setCurrentVelocity] = useState<number>(100);
  const [currentColumn, setCurrentColumn] = useState<number>(0);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [noteMode, setNoteMode] = useState<'add' | 'delete'>('add');

  // Filter the notes based on the selected scale
  const getFilteredNotes = () => {
    if (scale === 'Chromatic') {
      return ALL_NOTES;
    }
    
    const scaleNotes = SCALES[scale];
    return ALL_NOTES.filter(note => {
      const baseNote = note.replace(/[0-9]/g, '');
      return scaleNotes.includes(baseNote);
    });
  };

  const filteredNotes = getFilteredNotes();

  // Calculate the position of a note in the grid
  const calculateNotePosition = (event: React.MouseEvent) => {
    if (!gridRef.current) return { row: -1, column: -1 };

    const rect = gridRef.current.getBoundingClientRect();
    const cellWidth = rect.width / GRID_COLUMNS;
    const cellHeight = rect.height / filteredNotes.length;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const column = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);

    return { row, column };
  };

  // Handle mouse down on the grid
  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDrawing(true);

    const { row, column } = calculateNotePosition(event);
    if (row < 0 || column < 0) return;

    const noteAtPosition = notes.find(n => n.row === row && n.column === column);

    if (noteAtPosition) {
      // Delete note if it exists at this position
      setNoteMode('delete');
      setNotes(prevNotes => prevNotes.filter(n => n.id !== noteAtPosition.id));
    } else {
      // Add new note
      setNoteMode('add');
      const noteName = filteredNotes[row];
      
      if (noteName) {
        const newNote: Note = {
          id: `note-${Date.now()}-${Math.random()}`,
          note: noteName,
          time: `0:${column}:0`,
          duration: NOTE_DURATIONS[currentDuration],
          velocity: currentVelocity / 100,
          column,
          row,
        };

        setNotes(prevNotes => [...prevNotes, newNote]);
        setCurrentNote(noteName);
        setCurrentColumn(column);

        // Preview the note sound
        audioEngine.melodySynth?.triggerAttackRelease(noteName, '16n');
      }
    }
  };

  // Handle mouse move on the grid
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDrawing) return;

    const { row, column } = calculateNotePosition(event);
    if (row < 0 || column < 0) return;

    if (column === currentColumn) return; // Avoid adding multiple notes in the same column during drag

    if (noteMode === 'add') {
      const noteName = filteredNotes[row];
      
      if (noteName) {
        const noteAtPosition = notes.find(n => n.row === row && n.column === column);
        
        if (!noteAtPosition) {
          const newNote: Note = {
            id: `note-${Date.now()}-${Math.random()}`,
            note: noteName,
            time: `0:${column}:0`,
            duration: NOTE_DURATIONS[currentDuration],
            velocity: currentVelocity / 100,
            column,
            row,
          };

          setNotes(prevNotes => [...prevNotes, newNote]);
          setCurrentNote(noteName);
          setCurrentColumn(column);

          // Preview the note sound
          audioEngine.melodySynth?.triggerAttackRelease(noteName, '16n');
        }
      }
    } else if (noteMode === 'delete') {
      const noteAtPosition = notes.find(n => n.row === row && n.column === column);
      
      if (noteAtPosition) {
        setNotes(prevNotes => prevNotes.filter(n => n.id !== noteAtPosition.id));
      }
    }
  };

  // Handle mouse up on the grid
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Update parent when notes change
  useEffect(() => {
    if (onChange) {
      onChange(notes);
    }

    // Schedule melody sequence
    const noteEvents = notes.map(note => ({
      note: note.note,
      duration: note.duration,
      time: note.time,
    }));

    audioEngine.scheduleMelodySequence(noteEvents);
  }, [notes, onChange]);

  // Update playback position indicator
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      const stepTime = (60 / currentBpm) * (4 / GRID_COLUMNS) * 1000;
      let position = 0;

      intervalId = setInterval(() => {
        position = (position + 1) % GRID_COLUMNS;
        setCurrentColumn(position);
      }, stepTime);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, currentBpm]);

  return (
    <PianoRollContainer>
      <ControlSection>
        <ControlGroup>
          <label htmlFor="noteDuration">Duration:</label>
          <DurationSelect
            id="noteDuration"
            value={currentDuration}
            onChange={(e) => setCurrentDuration(e.target.value)}
          >
            <option value="1/1">Whole Note</option>
            <option value="1/2">Half Note</option>
            <option value="1/4">Quarter Note</option>
            <option value="1/8">Eighth Note</option>
            <option value="1/16">Sixteenth Note</option>
            <option value="1/32">Thirty-Second Note</option>
          </DurationSelect>
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="velocity">Velocity:</label>
          <VelocityRange
            id="velocity"
            type="range"
            min="1"
            max="127"
            value={currentVelocity}
            onChange={(e) => setCurrentVelocity(parseInt(e.target.value, 10))}
          />
          <VelocityValue>{currentVelocity}</VelocityValue>
        </ControlGroup>
      </ControlSection>

      <RollContainer>
        <KeyLabels>
          {filteredNotes.map((note, index) => (
            <KeyLabel key={note} isBlackKey={note.includes('#')}>
              {note}
            </KeyLabel>
          ))}
        </KeyLabels>

        <Grid
          ref={gridRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <GridBackground>
            {filteredNotes.map((_, rowIndex) => (
              <GridRow key={`row-${rowIndex}`} isBlackKey={filteredNotes[rowIndex]?.includes('#')}>
                {Array.from({ length: GRID_COLUMNS }).map((_, colIndex) => (
                  <GridCell 
                    key={`cell-${rowIndex}-${colIndex}`}
                    isCurrentColumn={colIndex === currentColumn && isPlaying}
                    isBeatStart={colIndex % 4 === 0}
                  />
                ))}
              </GridRow>
            ))}
          </GridBackground>

          <NoteLayer>
            {notes.map(note => (
              <NoteRect
                key={note.id}
                style={{
                  top: `${(note.row / filteredNotes.length) * 100}%`,
                  left: `${(note.column / GRID_COLUMNS) * 100}%`,
                  width: `${(1 / GRID_COLUMNS) * 100}%`,
                  height: `${(1 / filteredNotes.length) * 100}%`,
                }}
              />
            ))}
          </NoteLayer>
        </Grid>
      </RollContainer>

      <HelpText>
        Click and drag to add notes. Click on an existing note to remove it.
      </HelpText>
    </PianoRollContainer>
  );
};

const PianoRollContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 24px;
`;

const ControlSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px;
  background-color: #2a2a2a;
  border-radius: 6px;
  flex-wrap: wrap;
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
`;

const DurationSelect = styled.select`
  background-color: #3a3a3a;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

const VelocityRange = styled.input`
  width: 100px;
  margin: 0 8px;
`;

const VelocityValue = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  color: #e1e1e1;
  width: 30px;
  text-align: right;
`;

const RollContainer = styled.div`
  display: flex;
  height: 400px;
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
`;

const KeyLabels = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
  background-color: #222;
`;

interface KeyLabelProps {
  isBlackKey: boolean;
}

const KeyLabel = styled.div<KeyLabelProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  color: #e1e1e1;
  border-bottom: 1px solid #333;
  background-color: ${props => props.isBlackKey ? '#222' : '#2a2a2a'};
`;

const Grid = styled.div`
  flex: 1;
  position: relative;
  cursor: pointer;
`;

const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface GridRowProps {
  isBlackKey: boolean;
}

const GridRow = styled.div<GridRowProps>`
  flex: 1;
  display: flex;
  background-color: ${props => props.isBlackKey ? '#222' : '#2a2a2a'};
  border-bottom: 1px solid #333;
`;

interface GridCellProps {
  isCurrentColumn: boolean;
  isBeatStart: boolean;
}

const GridCell = styled.div<GridCellProps>`
  flex: 1;
  border-right: 1px solid #333;
  background-color: ${props => 
    props.isCurrentColumn 
      ? 'rgba(58, 134, 255, 0.3)' 
      : props.isBeatStart 
        ? 'rgba(255, 255, 255, 0.03)' 
        : 'transparent'
  };
`;

const NoteLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const NoteRect = styled.div`
  position: absolute;
  background-color: #3A86FF;
  border-radius: 2px;
  box-shadow: 0 0 4px rgba(58, 134, 255, 0.5);
`;

const HelpText = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: #999;
  text-align: center;
`;

export default PianoRoll; 