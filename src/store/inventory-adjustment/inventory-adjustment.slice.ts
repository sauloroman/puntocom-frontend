import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AdjustmentEnum, InventoryAdjustmentResponse } from "../../interfaces/dto/inventory-adjustment.interface";
import type { MetaPagination } from "../../interfaces/dto/pagination.interface";

interface InventorySliceState {
    isLoading: boolean,
    adjustments: InventoryAdjustmentResponse[] | null,
    adjustmentSelected: InventoryAdjustmentResponse | null,
    pagination: MetaPagination & { itemsPerPage: number },
    filter: {
        adjustmentType: AdjustmentEnum | null,
        adjustmentUserId: string | null,
    },
    isTableStyleActive: boolean,
    isGridStyleActive: boolean,
}

const initialState: InventorySliceState = {
    isLoading: false,
    adjustments: null,
    adjustmentSelected: null,
    pagination: {
        page: 1,
        total: 0,
        totalPages: 0,
        itemsPerPage: 10
    },
    filter: {
        adjustmentType: null,
        adjustmentUserId: null,
    },
    isTableStyleActive: true,
    isGridStyleActive: false
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
        },

        setAdjustmentUserFilter: ( state, {payload}: PayloadAction<string | null>) => {
            state.filter.adjustmentUserId = payload
        },

        setPage: ( state, {payload}: PayloadAction<number> ) => {
            state.pagination.page = payload
        },

        setTableView: (state, {payload}: PayloadAction<boolean>) => {
            state.isTableStyleActive = payload
            state.isGridStyleActive = !payload
        },
    }
})

export const {
    addInventoryAdjustment,
    setAdjustmentsMetaPagination,
    setAdjustmentTypeFilter,
    setAdjustmentUserFilter,
    setInventoryAdjustments,
    setInventoryAdjustmentSelected,
    setIsLoading,
    setPage,
    setTableView,
} = inventorySlice.actions