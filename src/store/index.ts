import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './slices/audioSlice';
import userReducer from './slices/userSlice';
import walletReducer from './slices/walletSlice';

export const store = configureStore({
  reducer: {
    audio: audioReducer,
    user: userReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 