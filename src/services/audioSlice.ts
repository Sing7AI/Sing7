import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Track {
  id: string;
  name: string;
  type: 'rhythm' | 'melody' | 'harmony' | 'sound';
  data: any; // This will be different based on track type
  muted: boolean;
  solo: boolean;
  volume: number;
  pan: number;
}

interface Project {
  id: string;
  name: string;
  bpm: number;
  createdAt: string;
  updatedAt: string;
  tracks: Track[];
}

interface AudioState {
  currentProject: Project | null;
  projects: Project[];
  isPlaying: boolean;
  currentBpm: number;
  selectedTrackId: string | null;
  selectedTool: 'rhythm' | 'melody' | 'harmony' | 'sound' | 'mixer' | null;
}

const initialState: AudioState = {
  currentProject: null,
  projects: [],
  isPlaying: false,
  currentBpm: 120,
  selectedTrackId: null,
  selectedTool: null,
};

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setBpm: (state, action: PayloadAction<number>) => {
      state.currentBpm = action.payload;
    },
    setSelectedTrackId: (state, action: PayloadAction<string | null>) => {
      state.selectedTrackId = action.payload;
    },
    setSelectedTool: (
      state,
      action: PayloadAction<'rhythm' | 'melody' | 'harmony' | 'sound' | 'mixer' | null>
    ) => {
      state.selectedTool = action.payload;
    },
    addTrack: (state, action: PayloadAction<Track>) => {
      if (state.currentProject) {
        state.currentProject.tracks.push(action.payload);
      }
    },
    updateTrack: (state, action: PayloadAction<{ id: string; updates: Partial<Track> }>) => {
      if (state.currentProject) {
        const { id, updates } = action.payload;
        const trackIndex = state.currentProject.tracks.findIndex(track => track.id === id);
        if (trackIndex !== -1) {
          state.currentProject.tracks[trackIndex] = {
            ...state.currentProject.tracks[trackIndex],
            ...updates,
          };
        }
      }
    },
    removeTrack: (state, action: PayloadAction<string>) => {
      if (state.currentProject) {
        state.currentProject.tracks = state.currentProject.tracks.filter(
          track => track.id !== action.payload
        );
      }
    },
  },
});

export const {
  setCurrentProject,
  addProject,
  setPlaying,
  setBpm,
  setSelectedTrackId,
  setSelectedTool,
  addTrack,
  updateTrack,
  removeTrack,
} = audioSlice.actions;

export default audioSlice.reducer; 