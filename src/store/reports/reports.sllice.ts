import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
    }
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
    }
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
        }        

    }
})

export const {
    setListReport,
    setIsLoading,
} = reportsSlice.actions 