import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    avatar?: string;
    userName?: string;
    email?: string;
    authority?: string[];
};

const initialState: UserState = {
    avatar: '',
    userName: '',
    email: '',
    authority: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.avatar = action.payload?.avatar;
            state.email = action.payload?.email;
            state.userName = action.payload?.userName;
            state.authority = action.payload?.authority;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
