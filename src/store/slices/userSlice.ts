import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  audio: string;
  tokenId: string;
  tokenURI: string;
  creator: string;
  owner: string;
  metadata: any;
}

interface UserState {
  userId: string | null;
  username: string | null;
  profilePic: string | null;
  visitMode: 'visitor' | 'connected';
  isNftLoading: boolean;
  userNfts: NFT[];
}

const initialState: UserState = {
  userId: null,
  username: null,
  profilePic: null,
  visitMode: 'visitor',
  isNftLoading: false,
  userNfts: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: string; username: string; profilePic?: string }>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      if (action.payload.profilePic) {
        state.profilePic = action.payload.profilePic;
      }
    },
    setVisitMode: (state, action: PayloadAction<'visitor' | 'connected'>) => {
      state.visitMode = action.payload;
    },
    resetUser: (state) => {
      state.userId = null;
      state.username = null;
      state.profilePic = null;
      state.visitMode = 'visitor';
    },
    setNftLoading: (state, action: PayloadAction<boolean>) => {
      state.isNftLoading = action.payload;
    },
    setUserNfts: (state, action: PayloadAction<NFT[]>) => {
      state.userNfts = action.payload;
    },
    addUserNft: (state, action: PayloadAction<NFT>) => {
      state.userNfts.push(action.payload);
    }
  }
});

export const { 
  setUser, 
  setVisitMode, 
  resetUser, 
  setNftLoading, 
  setUserNfts, 
  addUserNft 
} = userSlice.actions;

export default userSlice.reducer; 