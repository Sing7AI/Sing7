import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  username: string;
  avatarUrl: string | null;
  bio: string;
  createdAt: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    website?: string;
  };
}

interface UserState {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  visitMode: 'visitor' | 'connected' | 'premium';
  theme: 'light' | 'dark';
  projectsCount: number;
  creationsCount: number;
}

const initialState: UserState = {
  isAuthenticated: false,
  profile: null,
  visitMode: 'visitor',
  theme: 'dark',
  projectsCount: 0,
  creationsCount: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = {
          ...state.profile,
          ...action.payload,
        };
      }
    },
    setVisitMode: (state, action: PayloadAction<'visitor' | 'connected' | 'premium'>) => {
      state.visitMode = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setProjectsCount: (state, action: PayloadAction<number>) => {
      state.projectsCount = action.payload;
    },
    setCreationsCount: (state, action: PayloadAction<number>) => {
      state.creationsCount = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
      state.visitMode = 'visitor';
    },
  },
});

export const {
  setAuthenticated,
  setProfile,
  updateProfile,
  setVisitMode,
  setTheme,
  setProjectsCount,
  setCreationsCount,
  logout,
} = userSlice.actions;

export default userSlice.reducer; 