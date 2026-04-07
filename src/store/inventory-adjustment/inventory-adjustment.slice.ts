import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InventoryAdjustmentResponse } from "../../interfaces/dto/inventory-adjustment.interface";
import type { MetaPagination } from "../../interfaces/dto/pagination.interface";
import type { FilterInventoryAdjustments } from "../../interfaces/ui/filter.interface";

interface InventorySliceState {
    isLoading: boolean,
    adjustments: InventoryAdjustmentResponse[] | null,
    adjustmentSelected: InventoryAdjustmentResponse | null,
    pagination: MetaPagination & { itemsPerPage: number },
    filter: FilterInventoryAdjustments,
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
        user: {
            id: null,
            name: null,
        },
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

        setAdjustmentTypeFilter: ( state, {payload}: PayloadAction<Pick<FilterInventoryAdjustments, 'adjustmentType'>>) => {
            state.filter.adjustmentType = payload.adjustmentType
        },

        setAdjustmentUserFilter: ( state, {payload}: PayloadAction<Pick<FilterInventoryAdjustments, 'user'>>) => {
            state.filter.user = payload.user
        },

        resetFilters: (state) => {
            state.filter = {
                adjustmentType: null,
                user: {
                    id: null,
                    name: null
                }
            }
        },

        setPage: ( state, {payload}: PayloadAction<number> ) => {
            state.pagination.page = payload
        },

        setTableView: (state, {payload}: PayloadAction<boolean>) => {
            state.isTableStyleActive = payload
            state.isGridStyleActive = !payload
        },

        resetInventoryState: (state) => {
            state.isLoading = false
            state.adjustments = null
            state.adjustmentSelected = null
            state.pagination = { page: 1, total: 0, totalPages: 0, itemsPerPage: 10 }
            state.filter = {
                adjustmentType: null,
                user: { id: null, name: null },
            }
            state.isTableStyleActive = true
            state.isGridStyleActive = false
        },
    }
})

export const {
    addInventoryAdjustment,
    resetFilters,
    setAdjustmentsMetaPagination,
    setAdjustmentTypeFilter,
    setAdjustmentUserFilter,
    setInventoryAdjustments,
    setInventoryAdjustmentSelected,
    setIsLoading,
    setPage,
    setTableView,
    resetInventoryState,
} = inventorySlice.actions