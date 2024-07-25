import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './auth.interface'

const initialState: AuthState = {
    signedIn: false,
    token: null,
}

const authSlice = createSlice({
    name: `/auth`,
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<string>) {
            state.signedIn = true
            state.token = action.payload
        },
        signOutSuccess(state) {
            state.signedIn = false
            state.token = null
        },
        refreshTokenSuccess(state, action: PayloadAction<string>) {
            state.token = action.payload
        },
    },
})

export const { signInSuccess, signOutSuccess, refreshTokenSuccess } = authSlice.actions
export default authSlice.reducer





//example code

// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { SLICE_BASE_NAME } from './constants'

// export interface SessionState {
//     signedIn: boolean
//     token: string | null
// }

// const initialState: SessionState = {
//     signedIn: false,
//     token: null,
// }

// const sessionSlice = createSlice({
//     name: `${SLICE_BASE_NAME}/session`,
//     initialState,
//     reducers: {
//         signInSuccess(state, action: PayloadAction<string>) {
//             state.signedIn = true
//             state.token = action.payload
//         },
//         signOutSuccess(state) {
//             state.signedIn = false
//             state.token = null
//         },
//     },
// })

// export const { signInSuccess, signOutSuccess } = sessionSlice.actions
// export default sessionSlice.reducer
