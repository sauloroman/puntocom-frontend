import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../interfaces/product.interface";
import type { MetaPagination } from "../../interfaces/pagination.interface";

interface ProductState {
    isLoading: boolean,
    products: Product[] | null,
    productsLowStock: Product[],
    productWarningStock: Product[],
    productNormalStock: Product[],
    productSelected: Product | null,
    filter: { 
        status: boolean | null,
        category: {
            id: string | null,
            name: string | null
        },
        supplier: {
            id: string | null,
            name: string | null
        }
        isVisible: boolean
    },
    pagination: MetaPagination & { itemsPerPage: number },
    isPaginationVisible: boolean,
    isOrderedAsc: boolean
}

const initialState: ProductState = {
    isLoading: true,
    products: null,
    productSelected: null,
    productNormalStock: [],
    productsLowStock: [],
    productWarningStock: [],
    filter: {
        status: null,
        category: {
            id: null,
            name: null
        },
        supplier: {
            id: null,
            name: null
        },
        isVisible: true
    },
    pagination: {
        page: 1,
        total: 1,
        totalPages: 1,
        itemsPerPage: 20
    },
    isPaginationVisible: true,
    isOrderedAsc: false
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {

        addProducts: ( state, { payload }: PayloadAction<Product> ) => {
            state.products?.unshift(payload)
            state.pagination.total++
        },

        updateProduct: (state, {payload}: PayloadAction<{productId: string, product: Product}>) => {
            state.products = state.products!.map( (product: Product) => {
                if ( product.id === payload.productId) {
                    return payload.product
                }
                return product
            })
        },

        setProducts: ( state, { payload }: PayloadAction<Product[]>) => {
            state.products = payload
        },

        setProductsLowStock: (state, {payload}: PayloadAction<Product[]>) => {
            state.productsLowStock = payload
        },

        setProductsWarningStock: (state, {payload}: PayloadAction<Product[]>) => {
            state.productWarningStock = payload
        },

        setProductsNormalStock: (state, {payload}: PayloadAction<Product[]>) => {
            state.productNormalStock = payload
        },

        setSelectedProduct: (state, { payload }: PayloadAction<Product>) => {
            state.productSelected = payload
        },

        setIsLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.isLoading = payload
        },

        setPage: (state, {payload}: PayloadAction<number>) => {
            state.pagination.page = payload
        },

        setProductsMetaPagination: (state, {payload}: PayloadAction<MetaPagination & {itemsPerPage: number}>) => {
            state.pagination = payload
        },

        setStatusFilter: ( state, {payload}: PayloadAction<{status: boolean | null, isVisible: boolean}>) => {
            state.filter.status = payload.status
            state.filter.isVisible = payload.isVisible
        },

        setCategoryFilter: ( state, {payload}: PayloadAction<{ id: string | null, name: string | null, isVisible: boolean}>) => {
            state.filter.category.id = payload.id
            state.filter.category.name = payload.name
            state.filter.isVisible = payload.isVisible
        },

        setSupplierFilter: ( state, {payload}: PayloadAction<{ id: string | null, name: string | null, isVisible: boolean }>) => {
            state.filter.supplier.id = payload.id
            state.filter.supplier.name = payload.name
            state.filter.isVisible = payload.isVisible
        },

        setPaginationVisible: ( state, {payload}: PayloadAction<boolean>) => {
            state.isPaginationVisible = payload
        },

        setOrderedAsc: (state, {payload}:PayloadAction<boolean>) => {
            state.isOrderedAsc = payload
        }
    }
})

export const {
    addProducts,
    setProducts,
    setSelectedProduct,
    setIsLoading,
    setPage,
    setProductsMetaPagination,
    updateProduct,
    setStatusFilter,
    setCategoryFilter,
    setPaginationVisible,
    setOrderedAsc,
    setSupplierFilter,
    setProductsNormalStock,
    setProductsLowStock,
    setProductsWarningStock,
} = productsSlice.actions