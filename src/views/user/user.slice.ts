import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './user.interface';

// Initial state
const initialState: UserState = {
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ user: UserState }>) {
            const { user } = action.payload;
            state.avatar = user.avatar; 
            state.firstName = user.firstName; 
            state.lastName = user.lastName; 
            state.email = user.email;
            state.role = user.role; 
        },

        clearUser(state) {
            state.avatar = '';
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.role = '';
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
