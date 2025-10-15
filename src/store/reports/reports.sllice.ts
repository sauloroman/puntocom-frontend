import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Reports } from "../../interfaces/report.interface";

interface ReportsStateI {
    isLoading: boolean,
    users: {
        listReport: string,
    },
    suppliers: {
        listReport: string,
    },
    products: {
        listReport: string,
    },
    allReports: Reports | null,
}

const initialState: ReportsStateI = {
    isLoading: false,
    users: {
        listReport: ''
    },
    suppliers: {
        listReport: ''
    },
    products: {
        listReport: ''
    },
    allReports: null,
}

export const reportsSlice = createSlice({
    name: 'reports',
    initialState: initialState,
    reducers: {

        setListReport: ( state, { payload }: PayloadAction<{ type: 'users' | 'suppliers' | 'products', url: string }>) => {
            state[payload.type].listReport = payload.url
        },

        setIsLoading: ( state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },
        
        setAllReports: ( state, { payload }: PayloadAction<Reports>) => {
            state.allReports = payload
        }

    }
})

export const {
    setListReport,
    setIsLoading,
    setAllReports,
} = reportsSlice.actions 