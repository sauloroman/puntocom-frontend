import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SaleResponse } from "../../interfaces/sale.interface";

interface SliceState {
    isLoading: boolean,
    saleCreated: SaleResponse | null
}

const initialState: SliceState = {
    isLoading: false,
    saleCreated: null
}

export const saleSlice = createSlice({
    name: 'sales',
    initialState: initialState,
    reducers: {

        setIsLoading: ( state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },

        setSaleCreated: ( state, {payload}: PayloadAction<SaleResponse>) => {
            state.saleCreated = payload
        }

    }
})

export const {
    setIsLoading,
    setSaleCreated,
} = saleSlice.actions