import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Import reducers here
import audioReducer from '../services/audioSlice';
import userReducer from '../services/userSlice';
import walletReducer from '../services/walletSlice';

export const store = configureStore({
  reducer: {
    audio: audioReducer,
    user: userReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in the specified action types
        ignoredActions: ['wallet/setProvider', 'wallet/setSigner'],
      },
    }),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 