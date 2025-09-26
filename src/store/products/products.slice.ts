import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../interfaces/product.interface";
import type { MetaPagination } from "../../interfaces/pagination.interface";

interface ProductState {
    isLoading: boolean,
    products: Product[] | null,
    productSelected: Product | null,
    filter: { 
        status: boolean | null,
        category: {
            id: string | null,
            name: string | null
        },
        isVisible: boolean
    },
    pagination: MetaPagination & { itemsPerPage: number },
    isPaginationVisible: boolean,
    isOrderedAsc: boolean
}

const initialState: ProductState = {
    isLoading: false,
    products: null,
    productSelected: null,
    filter: {
        status: null,
        category: {
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

        setCategoryFilter: ( state, {payload}: PayloadAction<{ id: string, name: string, isVisible: boolean}>) => {
            state.filter.category.id = payload.id
            state.filter.category.name = payload.name
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
    setOrderedAsc
} = productsSlice.actions