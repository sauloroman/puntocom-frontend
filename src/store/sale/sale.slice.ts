import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SaleWithDetailsResponse } from "../../interfaces/dto/sale.interface";
import type { MetaPagination } from "../../interfaces/dto/pagination.interface";
import type { FilterSales } from "../../interfaces/ui/filter.interface";

interface SliceState {
    isLoading: boolean,
    saleCreated: SaleWithDetailsResponse | null,
    sales: SaleWithDetailsResponse[],
    selectedSale: SaleWithDetailsResponse | null,
    saleToPrint: SaleWithDetailsResponse | null,
    pagination: MetaPagination & { itemsPerPage: number },
    isPaginationVisible: boolean,
    filter: FilterSales
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

        setSaleCreated: ( state, {payload}: PayloadAction<SaleWithDetailsResponse>) => {
            state.saleCreated = payload
        },

        setSales: ( state, { payload }: PayloadAction<SaleWithDetailsResponse[]> ) => {
            state.sales = payload
        },

        addSale: ( state, {payload}: PayloadAction<SaleWithDetailsResponse> ) => {
            state.sales?.unshift( payload )
        },

        setSalesMetaPagination: (state, {payload}: PayloadAction<MetaPagination & {itemsPerPage: number}>) => {
            state.pagination = payload
        },

        setUserFilter: ( state, {payload}: PayloadAction<Pick<FilterSales, 'user'>>) => {
            state.filter.user.id = payload.user.id
            state.filter.user.name = payload.user.name
        },

        setPricesFilter: ( state, {payload}: PayloadAction<Pick<FilterSales, 'price'>> ) => {
            state.filter.price.minPrice = payload.price.minPrice
            state.filter.price.maxPrice = payload.price.maxPrice
        },

        setDatesFilter: ( state, {payload}: PayloadAction<Pick<FilterSales, 'dates'>>) => {
            state.filter.dates.dateStart = payload.dates.dateStart
            state.filter.dates.dateEnd = payload.dates.dateEnd
        },

        setPaginationVisible: ( state, {payload}: PayloadAction<boolean>) => {
            state.isPaginationVisible = payload
        },

        setSelectedSale: ( state, {payload}: PayloadAction<SaleWithDetailsResponse>) => {
            state.selectedSale = payload
        },

        setSaleToPrint: ( state, {payload}: PayloadAction<SaleWithDetailsResponse>) => {
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
        },

        resetSalesState: (state) => {
            state.isLoading = false
            state.saleCreated = null
            state.selectedSale = null
            state.saleToPrint = null
            state.sales = []
            state.pagination = { page: 1, total: 1, totalPages: 1, itemsPerPage: 15 }
            state.isPaginationVisible = true
            state.filter = {
                user: { id: null, name: null },
                price: { minPrice: null, maxPrice: null },
                dates: { dateStart: null, dateEnd: null },
            }
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
    resetFilter,
    resetSalesState,
} = saleSlice.actions