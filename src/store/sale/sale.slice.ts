import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SaleResponse } from "../../interfaces/dto/sale.interface";
import type { MetaPagination } from "../../interfaces/dto/pagination.interface";
import type { Filter } from "../../interfaces/ui/filter.interface";

interface SliceState {
    isLoading: boolean,
    saleCreated: SaleResponse | null,
    sales: SaleResponse[],
    selectedSale: SaleResponse | null,
    saleToPrint: SaleResponse | null,
    pagination: MetaPagination & { itemsPerPage: number },
    isPaginationVisible: boolean,
    filter: Omit<Filter, 'supplier'>
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
        price: {
            minPrice: null,
            maxPrice: null
        },
        dates: {
            dateStart: null,
            dateEnd: null
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

        setUserFilter: ( state, {payload}: PayloadAction<Pick<Filter, 'user'>>) => {
            state.filter.user.id = payload.user.id
            state.filter.user.name = payload.user.name
        },

        setPricesFilter: ( state, {payload}: PayloadAction<Pick<Filter, 'price'>> ) => {
            state.filter.price.minPrice = payload.price.minPrice
            state.filter.price.maxPrice = payload.price.minPrice
        },

        setDatesFilter: ( state, {payload}: PayloadAction<Pick<Filter, 'dates'>>) => {
            state.filter.dates.dateStart = payload.dates.dateStart
            state.filter.dates.dateEnd = payload.dates.dateEnd
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

        resetFilter: ( state ) => {
            state.filter = {
                dates: {
                    dateEnd: null,
                    dateStart: null
                },
                price: {
                    maxPrice: null,
                    minPrice: null,
                },
                user: {
                    id: null,
                    name: null
                }
            }
        }
        
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
    resetFilter,
} = saleSlice.actions