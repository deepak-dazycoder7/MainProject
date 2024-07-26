
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
        signInSuccess(state, action: PayloadAction<string>) {
            state.signedIn = true;
            state.token = action.payload;
        },
        signOutSuccess(state) {
            state.signedIn = false;
            state.token = null;
        },
        refreshTokenSuccess(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
    },
});

export const { signInSuccess, signOutSuccess, refreshTokenSuccess } = authSlice.actions;
export default authSlice.reducer;
