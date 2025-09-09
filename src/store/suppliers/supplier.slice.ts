import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Supplier } from "../../interfaces/supplier.interface";
import type { MetaPagination } from "../../interfaces/pagination.interface";

interface ISuppliers {
    isLoading: boolean,
    suppliers: Supplier[] | null,
    companies: string[] | null,
    supplierSelected: Supplier | null,
    filter: {
        company: string | null, 
        status: boolean | null, 
        isVisible: boolean 
    },
    pagination: MetaPagination & {itemsPerPage: number},
    isPaginationVisible: boolean,
    isTableStyleActive: boolean,
    isGridStyleActive: boolean,
}

const initialState: ISuppliers = {
    isLoading: false,
    suppliers: null,
    companies: null,
    supplierSelected: null,
    filter: { 
        company: null,
        status: null,
        isVisible: true 
    },
    pagination: {
        page: 1,
        total: 1,
        totalPages: 1,
        itemsPerPage: 10
    },
    isPaginationVisible: true,
    isTableStyleActive: true,
    isGridStyleActive: false
}

export const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState: initialState,
    reducers: {

        setCompanies: (state, {payload}: PayloadAction<string[]>) => {
            state.companies = payload
        },

        setIsLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload
        },

        addSupplier: ( state, {payload}: PayloadAction<Supplier>) => {
            state.suppliers?.unshift( payload )
            state.pagination.total++
        },

        addCompanySupplier: (state, {payload}: PayloadAction<string>) => {
            state.companies?.push(payload)
        },

        updateSupplier:  ( state, {payload}: PayloadAction<{supplierId: string, supplier: Supplier}>) => {
            state.suppliers = state.suppliers!.map( (supplier: Supplier) => {
                if(supplier.id === payload.supplierId) {
                    return payload.supplier
                }
                return supplier
            })
        },

        setSuppliers: ( state, {payload}: PayloadAction<Supplier[]>) => {
            state.suppliers = payload
        },

        setSupplierSelected: (state, {payload}: PayloadAction<Supplier>) => {
            state.supplierSelected = payload
        },

        setSuppliersMetaPagination: (state, {payload}: PayloadAction<MetaPagination & {itemsPerPage: number}>) => {
            state.pagination = payload
        },

        setPage: (state, {payload}: PayloadAction<number>) => {
            state.pagination.page = payload
        },

        resetSuppliers: ( state ) => {
            state.isLoading = false
            state.suppliers = null
            state.supplierSelected = null
        },

        setStatusFilter: (state, { payload}: PayloadAction<{status: boolean | null, isVisible: boolean}>) => {
            state.filter.status = payload.status
            state.filter.isVisible = payload.isVisible
        },

        setCompanyFilter: (state, {payload}: PayloadAction<{company: string | null, isVisible: boolean}>) => {
            state.filter.company = payload.company
            state.filter.isVisible = payload.isVisible
        },

        setPaginationVisible: ( state, {payload}: PayloadAction<boolean>) => {
            state.isPaginationVisible = payload
        },

        setTableView: (state, {payload}: PayloadAction<boolean>) => {
            state.isTableStyleActive = payload
            state.isGridStyleActive = !payload
        },

    }
})

export const {
    setCompanies,
    addSupplier,
    updateSupplier,
    setIsLoading,
    setSuppliers,
    setSupplierSelected,
    resetSuppliers,
    setSuppliersMetaPagination,
    setPage,
    setStatusFilter,
    setCompanyFilter,
    setPaginationVisible,
    setTableView
} = suppliersSlice.actions
