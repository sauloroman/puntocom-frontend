import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Supplier } from "../../interfaces/dto/supplier.interface";
import type { MetaPagination } from "../../interfaces/dto/pagination.interface";
import type { FilterSuppliers } from "../../interfaces/ui/filter.interface";

interface ISuppliers {
    isLoading: boolean,
    suppliers: Supplier[] | null,
    allSuppliers: Supplier[] | null,
    companies: string[] | null,
    supplierSelected: Supplier | null,
    filter: FilterSuppliers,
    pagination: MetaPagination & {itemsPerPage: number},
    isPaginationVisible: boolean,
    isTableStyleActive: boolean,
    isGridStyleActive: boolean,
    isOrderedAsc: boolean,
}

const initialState: ISuppliers = {
    isLoading: false,
    suppliers: null,
    allSuppliers: null,
    companies: null,
    supplierSelected: null,
    filter: { 
        company: null,
        status: null,
        supplierName: null
    },
    pagination: {
        page: 1,
        total: 1,
        totalPages: 1,
        itemsPerPage: 8
    },
    isPaginationVisible: true,
    isTableStyleActive: true,
    isGridStyleActive: false,
    isOrderedAsc: false,
}

export const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState: initialState,
    reducers: {

        setOrderedAsc: (state, {payload}:PayloadAction<boolean>) => {
            state.isOrderedAsc = payload
        },

        setAllSuppliers: (state, {payload}: PayloadAction<Supplier[]>) => {
            state.allSuppliers = payload
        },

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

        resetFilter: ( state ) => {
            state.filter = {
                company: null,
                status: null,
                supplierName: null
            }
        },

        setPage: (state, {payload}: PayloadAction<number>) => {
            state.pagination.page = payload
        },

        resetSuppliers: ( state ) => {
            state.isLoading = false
            state.suppliers = null
            state.supplierSelected = null
        },

        setSuppliersStatusFilter: (state, { payload}: PayloadAction<Pick<FilterSuppliers, 'status'>>) => {
            state.filter.status = payload.status
        },

        setSuppliersCompanyFilter: (state, {payload}: PayloadAction<Pick<FilterSuppliers, 'company'>>) => {
            state.filter.company = payload.company
        },

        setSuppliersNameFilter: (state, {payload}: PayloadAction<Pick<FilterSuppliers, 'supplierName'>>) => {
            state.filter.supplierName = payload.supplierName
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
    addSupplier,
    resetFilter,
    resetSuppliers,
    setAllSuppliers,
    setCompanies,
    setIsLoading,
    setOrderedAsc,
    setPage,
    setPaginationVisible,
    setSuppliers,
    setSuppliersCompanyFilter,
    setSupplierSelected,
    setSuppliersMetaPagination,
    setSuppliersNameFilter,
    setSuppliersStatusFilter,
    setTableView,
    updateSupplier,
} = suppliersSlice.actions
