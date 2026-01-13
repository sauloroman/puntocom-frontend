import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DashboardStats } from "../../interfaces/dto/dashboard.interface";

interface DashBoardStatsState {
    stats: DashboardStats | null,
    isLoading: boolean
}

const initialState: DashBoardStatsState = {
    stats: null,
    isLoading: false
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {

        setDashboardStats: ( state, { payload }: PayloadAction<DashboardStats>) => {
            state.stats = payload
        },

        setIsLoading: ( state, { payload }: PayloadAction<boolean> ) => {
            state.isLoading = payload
        }

    }
})

export const {
    setDashboardStats,
    setIsLoading
} = dashboardSlice.actions 