import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { KpisStats, ProductsStats, PurchasesStats, SalesStats, StatsSlice } from "../../interfaces/dto/dashboard.interface";

interface DashBoardStatsState {
    stats: StatsSlice,
    isLoading: boolean
}

const initialState: DashBoardStatsState = {
    stats: {
        kpisStats: undefined,
        productsStats: undefined,
        purchasesStats: undefined,
        salesStats: undefined
    },
    isLoading: false
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {

        setKpisStats: ( state, { payload }: PayloadAction<KpisStats>) => {
            state.stats.kpisStats = payload
        },

        setSalesStats: (state, { payload }: PayloadAction<SalesStats>) => {
            state.stats.salesStats = payload
        },

        setPurchasesStats: (state, { payload }: PayloadAction<PurchasesStats>) => {
            state.stats.purchasesStats = payload
        },

        setProductsStats: (state, { payload }: PayloadAction<ProductsStats>) => {
            state.stats.productsStats = payload
        },

        setIsLoading: ( state, { payload }: PayloadAction<boolean> ) => {
            state.isLoading = payload
        }
    }
})

export const {
    setKpisStats,
    setSalesStats,
    setPurchasesStats,
    setProductsStats,
    setIsLoading
} = dashboardSlice.actions 