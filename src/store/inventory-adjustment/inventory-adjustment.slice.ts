import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AdjustmentEnum, InventoryAdjustmentResponse } from "../../interfaces/inventory-adjustment.interface";
import type { MetaPagination } from "../../interfaces/pagination.interface";

interface InventorySliceState {
    isLoading: boolean,
    adjustments: InventoryAdjustmentResponse[] | null,
    adjustmentSelected: InventoryAdjustmentResponse | null,
    pagination: MetaPagination & { itemsPerPage: number },
    filter: {
        adjustmentType: AdjustmentEnum | null,
    }
}

const initialState: InventorySliceState = {
    isLoading: false,
    adjustments: null,
    adjustmentSelected: null,
    pagination: {
        page: 1,
        total: 0,
        totalPages: 0,
        itemsPerPage: 15
    },
    filter: {
        adjustmentType: null
    }
} 

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialState,
    reducers: {

        setIsLoading: ( state, { payload }: PayloadAction<boolean> ) => {
            state.isLoading = payload
        },

        setInventoryAdjustments: ( state, {payload}: PayloadAction<InventoryAdjustmentResponse[] | null> ) => {
            state.adjustments = payload
        },

        setInventoryAdjustmentSelected: ( state, {payload}: PayloadAction<InventoryAdjustmentResponse | null>) => {
            state.adjustmentSelected = payload
        },

        addInventoryAdjustment: ( state, {payload}: PayloadAction<InventoryAdjustmentResponse>) => {
            state.adjustments?.unshift(payload)
        },

        setAdjustmentsMetaPagination: (state, {payload}: PayloadAction<MetaPagination & {itemsPerPage: number}>) => {
            state.pagination = payload
        },

        setAdjustmentTypeFilter: ( state, {payload}: PayloadAction<AdjustmentEnum | null>) => {
            state.filter.adjustmentType = payload
        }

    }
})

export const {
    setIsLoading,
    setInventoryAdjustments,
    setAdjustmentsMetaPagination,
    addInventoryAdjustment,
    setAdjustmentTypeFilter,
    setInventoryAdjustmentSelected,
} = inventorySlice.actions