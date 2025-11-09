import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InventorySliceState {
    isLoading: boolean
}

const initialState: InventorySliceState = {
    isLoading: false
} 

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialState,
    reducers: {

        setIsLoading: ( state, { payload }: PayloadAction<boolean> ) => {
            state.isLoading = payload
        }

    }
})

export const {
    setIsLoading
} = inventorySlice.actions