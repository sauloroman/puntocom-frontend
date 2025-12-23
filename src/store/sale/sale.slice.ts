import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SaleResponse } from "../../interfaces/sale.interface";
import type { MetaPagination } from "../../interfaces/pagination.interface";

interface SliceState {
    isLoading: boolean,
    saleCreated: SaleResponse | null,
    sales: SaleResponse[],
    selectedSale: SaleResponse | null,
    saleToPrint: SaleResponse | null,
    pagination: MetaPagination & { itemsPerPage: number },
    isPaginationVisible: boolean,
    filter: {
        user: {
            id: string | null,
            name: string | null
        },
        prices: {
            priceMin: number | null,
            priceMax: number | null,
        },
        dates: {
            dateFrom: string | null,
            dateTo: string | null
        }
    }
}

const initialState: SliceState = {
    isLoading: false,
    saleCreated: null,
    selectedSale: null,
    saleToPrint: null,
    sales: [],
    pagination: {
        page: 1,
        total: 1,
        totalPages: 1,
        itemsPerPage: 15
    },
    isPaginationVisible: true,
    filter: {
        user: {
            id: null,
            name: null
        },
        prices: {
            priceMax: null,
            priceMin: null
        },
        dates: {
            dateFrom: null,
            dateTo: null
        }
    }
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
        },

        setSales: ( state, { payload }: PayloadAction<SaleResponse[]> ) => {
            state.sales = payload
        },

        addSale: ( state, {payload}: PayloadAction<SaleResponse> ) => {
            state.sales.unshift( payload )
        },

        setSalesMetaPagination: (state, {payload}: PayloadAction<MetaPagination & {itemsPerPage: number}>) => {
            state.pagination = payload
        },

        setUserFilter: ( state, {payload}: PayloadAction<{id: string | null, name: string | null }>) => {
            state.filter.user.id = payload.id
            state.filter.user.name = payload.name
        },

        setPricesFilter: ( state, {payload}: PayloadAction<{priceMax: number | null, priceMin: number | null }>) => {
            state.filter.prices.priceMin = payload.priceMin
            state.filter.prices.priceMax = payload.priceMax
        },

        setDatesFilter: ( state, {payload}: PayloadAction<{dateFrom: string | null, dateTo: string | null}>) => {
            state.filter.dates.dateFrom = payload.dateFrom
            state.filter.dates.dateTo = payload.dateTo
        },

        setPaginationVisible: ( state, {payload}: PayloadAction<boolean>) => {
            state.isPaginationVisible = payload
        },

        setSelectedSale: ( state, {payload}: PayloadAction<SaleResponse>) => {
            state.selectedSale = payload
        },

        setSaleToPrint: ( state, {payload}: PayloadAction<SaleResponse>) => {
            state.saleToPrint = payload
        },

        setPage: ( state, {payload}: PayloadAction<number>) => {
            state.pagination.page = payload
        },
        
    }
})

export const {
    addSale,
    setDatesFilter,
    setIsLoading,
    setPage,
    setPaginationVisible,
    setPricesFilter,
    setSaleCreated,
    setSales,
    setSalesMetaPagination,
    setSelectedSale,
    setUserFilter,
    setSaleToPrint,
} = saleSlice.actions