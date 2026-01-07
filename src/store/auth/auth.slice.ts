import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthStatus, type User } from "../../interfaces/dto/user.interface";

interface AuthStateI {
    status: AuthStatus
    user: User | null
    isLoading: boolean
}

const initalState: AuthStateI = {
    status: AuthStatus.UNAUTHENTICATED,
    user: null,
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initalState,
    reducers: {

        setIsLoading: ( state, {payload}: PayloadAction<boolean> ) => {
            state.isLoading = payload
        },

        login: ( state, { payload }: PayloadAction<User> ) => {
            state.isLoading = true
            state.status = AuthStatus.AUTHENTICATED
            state.user = payload
        }, 

        logout: (state) => {
            state.status = AuthStatus.UNAUTHENTICATED
            state.user = null
            state.isLoading = false
        }

    }
})

export const {
    login,
    logout,
    setIsLoading
} = authSlice.actions