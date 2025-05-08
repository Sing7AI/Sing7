import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for rhythm patterns
export interface RhythmPattern {
  id: string;
  name: string;
  patterns: boolean[][];
  bpm: number;
}

// Define types for melody sequences
export interface MelodyNote {
  id: string;
  note: string;
  octave: number;
  time: number;
  duration: string;
  velocity: number;
}

export interface MelodySequence {
  id: string;
  name: string;
  notes: MelodyNote[];
  bpm: number;
  scale: string;
}

// Define types for chord progressions
export interface ChordProgression {
  id: string;
  name: string;
  chords: string[];
  durations: string[];
  bpm: number;
}

// Define the state for the audio slice
interface AudioState {
  isInitialized: boolean;
  isPlaying: boolean;
  bpm: number;
  currentProject: {
    id: string | null;
    name: string;
    rhythmPatterns: RhythmPattern[];
    melodySequences: MelodySequence[];
    chordProgressions: ChordProgression[];
    masterVolume: number;
    isModified: boolean;
  };
  availableSamples: {
    drums: string[];
    synths: string[];
    effects: string[];
  };
  exportFormat: 'wav' | 'mp3';
  isExporting: boolean;
  error: string | null;
}

const initialState: AudioState = {
  isInitialized: false,
  isPlaying: false,
  bpm: 120,
  currentProject: {
    id: null,
    name: 'Untitled Project',
    rhythmPatterns: [],
    melodySequences: [],
    chordProgressions: [],
    masterVolume: 0.8,
    isModified: false
  },
  availableSamples: {
    drums: [],
    synths: [],
    effects: []
  },
  exportFormat: 'wav',
  isExporting: false,
  error: null
};

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    initializeAudio: (state) => {
      state.isInitialized = true;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    },
    setProjectName: (state, action: PayloadAction<string>) => {
      state.currentProject.name = action.payload;
      state.currentProject.isModified = true;
    },
    addRhythmPattern: (state, action: PayloadAction<RhythmPattern>) => {
      state.currentProject.rhythmPatterns.push(action.payload);
      state.currentProject.isModified = true;
    },
    updateRhythmPattern: (state, action: PayloadAction<{id: string, pattern: RhythmPattern}>) => {
      const index = state.currentProject.rhythmPatterns.findIndex(
        p => p.id === action.payload.id
      );
      if (index !== -1) {
        state.currentProject.rhythmPatterns[index] = action.payload.pattern;
        state.currentProject.isModified = true;
      }
    },
    deleteRhythmPattern: (state, action: PayloadAction<string>) => {
      state.currentProject.rhythmPatterns = state.currentProject.rhythmPatterns.filter(
        p => p.id !== action.payload
      );
      state.currentProject.isModified = true;
    },
    addMelodySequence: (state, action: PayloadAction<MelodySequence>) => {
      state.currentProject.melodySequences.push(action.payload);
      state.currentProject.isModified = true;
    },
    updateMelodySequence: (state, action: PayloadAction<{id: string, sequence: MelodySequence}>) => {
      const index = state.currentProject.melodySequences.findIndex(
        s => s.id === action.payload.id
      );
      if (index !== -1) {
        state.currentProject.melodySequences[index] = action.payload.sequence;
        state.currentProject.isModified = true;
      }
    },
    deleteMelodySequence: (state, action: PayloadAction<string>) => {
      state.currentProject.melodySequences = state.currentProject.melodySequences.filter(
        s => s.id !== action.payload
      );
      state.currentProject.isModified = true;
    },
    addChordProgression: (state, action: PayloadAction<ChordProgression>) => {
      state.currentProject.chordProgressions.push(action.payload);
      state.currentProject.isModified = true;
    },
    updateChordProgression: (state, action: PayloadAction<{id: string, progression: ChordProgression}>) => {
      const index = state.currentProject.chordProgressions.findIndex(
        p => p.id === action.payload.id
      );
      if (index !== -1) {
        state.currentProject.chordProgressions[index] = action.payload.progression;
        state.currentProject.isModified = true;
      }
    },
    deleteChordProgression: (state, action: PayloadAction<string>) => {
      state.currentProject.chordProgressions = state.currentProject.chordProgressions.filter(
        p => p.id !== action.payload
      );
      state.currentProject.isModified = true;
    },
    setMasterVolume: (state, action: PayloadAction<number>) => {
      state.currentProject.masterVolume = action.payload;
    },
    setAvailableSamples: (state, action: PayloadAction<{
      drums?: string[],
      synths?: string[],
      effects?: string[]
    }>) => {
      if (action.payload.drums) state.availableSamples.drums = action.payload.drums;
      if (action.payload.synths) state.availableSamples.synths = action.payload.synths;
      if (action.payload.effects) state.availableSamples.effects = action.payload.effects;
    },
    setExportFormat: (state, action: PayloadAction<'wav' | 'mp3'>) => {
      state.exportFormat = action.payload;
    },
    setExporting: (state, action: PayloadAction<boolean>) => {
      state.isExporting = action.payload;
    },
    setAudioError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetProject: (state) => {
      state.currentProject = {
        id: null,
        name: 'Untitled Project',
        rhythmPatterns: [],
        melodySequences: [],
        chordProgressions: [],
        masterVolume: 0.8,
        isModified: false
      };
    }
  }
});

export const {
  initializeAudio,
  setPlaying,
  setBpm,
  setProjectName,
  addRhythmPattern,
  updateRhythmPattern,
  deleteRhythmPattern,
  addMelodySequence,
  updateMelodySequence,
  deleteMelodySequence,
  addChordProgression,
  updateChordProgression,
  deleteChordProgression,
  setMasterVolume,
  setAvailableSamples,
  setExportFormat,
  setExporting,
  setAudioError,
  resetProject
} = audioSlice.actions;

export default audioSlice.reducer; 