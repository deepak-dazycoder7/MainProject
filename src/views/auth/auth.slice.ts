import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './auth.interface';


const initialState: AuthState = {
         signedIn: false,
         token: null,
     };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<string>) {
      state.signedIn = true;  
      state.token = action.payload;
    },
    clearAuth(state) {
      state.signedIn = false;
      state.token = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
